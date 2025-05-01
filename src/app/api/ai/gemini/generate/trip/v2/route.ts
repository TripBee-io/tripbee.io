import { NextRequest } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const runtime = 'edge'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
	const { days, location, travelers, budget } = await req.json()
	const numDays = Number(days)
	const encoder = new TextEncoder()

	const stream = new ReadableStream({
		async start(controller) {
			for (let day = 1; day <= numDays; day++) {
				// generate only Day N
				const prompt = `
Generate a JSON array of 3–4 budget-friendly places for Day ${day} in ${location}, clustered geographically.
Respond ONLY with the JSON array (no markdown), e.g.:
[
  { "name": "...", /* etc */ },
  …
]
`.trim()

				const model = genAI.getGenerativeModel({
					model: 'gemini-1.5-flash',
				})
				const result = await model.generateContent(prompt)
				const raw = await (await result.response).text()
				const arr = JSON.parse(raw.replace(/```json|```/g, '').trim())

				// look up place_id & photos exactly as before…
				const enriched = await Promise.all(
					arr.map(async (item: any) => {
						const lookup = await fetch(
							`https://maps.googleapis.com/maps/api/place/findplacefromtext/json` +
								`?input=${encodeURIComponent(
									item.name + ', ' + location
								)}` +
								`&inputtype=textquery&fields=place_id` +
								`&key=${process.env.GOOGLE_MAPS_API_KEY}`
						)
						const { candidates } = await lookup.json()
						return {
							...item,
							place_id: candidates?.[0]?.place_id ?? null,
						}
					})
				)

				const placeIds = enriched
					.map((i) => i.place_id)
					.filter((pid): pid is string => Boolean(pid))

				const photoRes = await fetch(
					`${req.nextUrl.origin}/api/location/google/photos`,
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ place_ids: placeIds }),
					}
				)
				const { photos } = await photoRes.json()
				const photoMap = new Map(
					photos.map((p: any) => [p.place_id, p.photoUrl])
				)

				const finalItems = enriched.map((item) => {
					if (item.place_id && photoMap.has(item.place_id)) {
						item.googleImage = photoMap.get(item.place_id)
					}
					delete item.place_id
					return item
				})

				// stream one NDJSON line per day
				const dayLine = JSON.stringify({ [`Day ${day}`]: finalItems })
				controller.enqueue(encoder.encode(dayLine + '\n'))
			}

			controller.close()
		},
	})

	// **Use native Response**, not NextResponse, to ensure each enqueue is flushed:
	return new Response(stream, {
		headers: {
			'Content-Type': 'application/x-ndjson; charset=utf-8',
			'Cache-Control': 'no-cache', // help prevent proxies from buffering
		},
	})
}
