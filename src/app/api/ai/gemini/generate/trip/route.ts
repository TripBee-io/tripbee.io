import { NextRequest, NextResponse } from 'next/server'
import { GoogleGenerativeAI } from '@google/generative-ai'

export const runtime = 'edge'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
	try {
		const { days, location, travelers, budget, startDate, endDate } =
			await req.json()
		
		const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' })
		const prompt = `
Generate a ${days}-day travel itinerary for ${location} targeting ${travelers} with a ${budget} budget.
Respond in STRICT JSON FORMAT without any markdown using this structure:
{
  "Day 1": [
    {
      "name": "Location Name",
      "description": "Brief activity description",
      "coordinates": { "lat": 36.1146, "lng": -115.1728 },
      "googleImage": "STREET_OR_STATICMAP_URL",
      "cost": "Free/$XX",
      "idealTime": "10:00 AM - 12:00 PM",
      "visitDuration": "1-2 hours",
      "type": "Landmark/Park/Museum",
      "rating": 4.5
    }
  ],
  "Day 2": [ /* … */ ]
}
Requirements:
- ${days} days total, cluster geographically per day
- Real coordinates from actual places in ${location}
- 3-4 locations/day, efficient routing, budget-friendly
- Valid JSON only (no comments, no trailing commas)
`.trim()

		const result = await model.generateContent(prompt)
		const response = await result.response
		const rawText = await response.text()

		const cleaned = rawText
			.replace(/```json/g, '')
			.replace(/```/g, '')
			.trim()
		const parsedData: Record<string, any[]> = JSON.parse(cleaned)

		const allPlaceIds: string[] = []

		for (const dayKey of Object.keys(parsedData)) {
			for (const item of parsedData[dayKey]) {
				const lookupRes = await fetch(
					`https://maps.googleapis.com/maps/api/place/findplacefromtext/json` +
						`?input=${encodeURIComponent(
							item.name + ', ' + location
						)}` +
						`&inputtype=textquery` +
						`&fields=place_id` +
						`&key=${process.env.GOOGLE_MAPS_API_KEY}`
				)
				const lookupJson = await lookupRes.json()
				const pid = lookupJson.candidates?.[0]?.place_id as
					| string
					| undefined

				if (pid) {
					item.place_id = pid
					allPlaceIds.push(pid)
				} else {
					item.place_id = null
				}
			}
		}

		const origin = req.nextUrl.origin
		const batchRes = await fetch(`${origin}/api/location/google/photos`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ place_ids: allPlaceIds }),
		})
		const { photos } = (await batchRes.json()) as {
			photos: { place_id: string; photoUrl: string }[]
		}

		const photoMap = new Map<string, string>(
			photos.map((p) => [p.place_id, p.photoUrl])
		)

		for (const dayKey of Object.keys(parsedData)) {
			parsedData[dayKey] = parsedData[dayKey].map((item) => ({
				...item,
				googleImage:
					item.place_id && photoMap.has(item.place_id)
						? photoMap.get(item.place_id)
						: item.googleImage,
				...(delete item.place_id && {}),
			}))
		}

		return NextResponse.json(parsedData)
	} catch (e) {
		console.error('Trip-generator error', e)
		return NextResponse.json(
			{ error: 'Failed to generate plan' },
			{ status: 500 }
		)
	}
}
