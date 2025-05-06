import { NextRequest } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const runtime = 'edge'
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
	const { days, location, travelers, budget } = await req.json()
	const numDays = Number(days)
	const encoder = new TextEncoder()

	const seenNames: string[] = []

	const stream = new ReadableStream({
		async start(controller) {
			try {
				for (let day = 1; day <= numDays; day++) {
					const avoidClause = seenNames.length
						? `Previously selected (a place can have multiple names as well avoid all places which you think refer to the same location): ${seenNames.join(
								', '
						  )}. Do not repeat these.`
						: ''

					const prompt = `
						Generate a JSON array of 5-6 *popular, highly rated* places for Day ${day} in ${location}
						(for ${travelers} travelers on a ${budget} budget). Choose only bucket-list landmarks,
						top museums or historic sites with rating ≥ 4.0. ${avoidClause}
	
						Respond *only* with the JSON array, for example:
						[
						{
							"name": "The British Museum",
							"description": "World-class historical artifacts and exhibits",
							"coordinates": { "lat": 51.5194, "lng": -0.1269 },
							"cost": "Free",
							"idealTime": "10:00 AM - 1:00 PM",
							"visitDuration": "2-3 hours",
							"type": "Museum",
							"rating": 4.7
						},
						…
						]
						`.trim()

					// call Gemini
					const model = genAI.getGenerativeModel({
						model: 'gemini-1.5-flash',
					})
					const result = await model.generateContent(prompt)
					const raw = await (await result.response).text()

					// clean and parse
					const cleaned = raw
						.replace(/```json/g, '')
						.replace(/```/g, '')
						.trim()
					let arr: any[]
					try {
						arr = JSON.parse(cleaned)
					} catch (err) {
						console.error('JSON parse error:', err, {
							raw,
							cleaned,
						})
						throw err
					}

					// record names so we can avoid them next iteration
					arr.forEach((item) => {
						if (item.name && !seenNames.includes(item.name)) {
							seenNames.push(item.name)
						}
					})

					// look up place_id for each and collect them
					const enriched = await Promise.all(
						arr.map(async (item) => {
							const lookupRes = await fetch(
								`https://maps.googleapis.com/maps/api/place/findplacefromtext/json` +
									`?input=${encodeURIComponent(
										item.name + ', ' + location
									)}` +
									`&inputtype=textquery&fields=place_id` +
									`&key=${process.env.GOOGLE_MAPS_API_KEY}`
							)
							const lookupJson = await lookupRes.json()
							return {
								...item,
								place_id:
									lookupJson.candidates?.[0]?.place_id ??
									null,
							}
						})
					)

					// batch-fetch photos for all place_ids in one request
					const placeIds = enriched
						.map((i) => i.place_id)
						.filter((pid): pid is string => Boolean(pid))
					const photoRes = await fetch(
						`${req.nextUrl.origin}/api/location/google/photos`,
						{
							method: 'POST',
							headers: { 'Content-Type': 'application/json' },
							body: JSON.stringify({
								place_ids: placeIds,
								width: 203,
								height: 111,
							}),
						}
					)
					const { photos } = await photoRes.json()
					const photoMap = new Map(
						photos.map((p: any) => [p.place_id, p.photoUrl])
					)

					// stitch watermark-free photoUrl back into each item
					const finalItems = enriched.map((item) => {
						const { place_id, ...rest } = item
						return place_id && photoMap.has(place_id)
							? { ...rest, googleImage: photoMap.get(place_id) }
							: rest
					})

					// enqueue one NDJSON line per day
					const dayLine = JSON.stringify({
						[`Day ${day}`]: finalItems,
					})
					controller.enqueue(encoder.encode(dayLine + '\n'))
				}

				controller.close()
			} catch (err) {
				console.error('❌ Trip-generator failed:', err)
				controller.error(err)
			}
		},
	})

	return new Response(stream, {
		headers: {
			'Content-Type': 'application/x-ndjson; charset=utf-8',
			'Cache-Control': 'no-cache',
		},
	})
}
