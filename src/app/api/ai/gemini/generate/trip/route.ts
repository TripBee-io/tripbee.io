import { GoogleGenerativeAI } from '@google/generative-ai'
import { NextRequest } from 'next/server'

export const runtime = 'edge'

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!)

export async function POST(req: NextRequest) {
	try {
		const { days, location, travelers, budget } = await req.json()

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
      "googleImage": "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=36.1146,-115.1728",
      "cost": "Free/$XX",
      "idealTime": "10:00 AM - 12:00 PM",
      "visitDuration": "1-2 hours",
      "type": "Landmark/Park/Museum",
      "rating": 4.5
    }
  ],
  "Day 2": [
    // Similar structure
  ]
}

Requirements:
- ${days} days total in the JSON structure
- Locations must be geographically clustered per day
- Real coordinates from actual places in ${location}
- Google Street View image URLs using coordinates
- Include 3-4 locations per day
- Order locations by optimal visiting sequence
- Budget-friendly options for ${budget} category
- Valid JSON syntax (NO COMMENTS, NO TRAILING COMMAS)
- No markdown formatting
- Include all fields shown in example

Example valid response:
{
  "Day 1": [
    {
      "name": "Fremont Street Experience",
      "description": "Vibrant pedestrian mall with free light shows",
      "coordinates": {"lat": 36.1699, "lng": -115.1398},
      "googleImage": "https://maps.googleapis.com/maps/api/streetview?size=400x400&location=36.1699,-115.1398",
      "cost": "Free",
      "idealTime": "7:00 PM - 9:00 PM",
      "visitDuration": "1-2 hours",
      "type": "Entertainment District",
      "rating": 4.4
    }
  ]
}
`.trim()

		const result = await model.generateContent(prompt)
		const response = await result.response
		const text = response.text()

		// Clean Gemini response
		const cleaned = text
			.replace(/```json/g, '')
			.replace(/```/g, '')
			.trim()

		return new Response(cleaned, {
			headers: { 'Content-Type': 'application/json' },
		})
	} catch (error) {
		return new Response(
			JSON.stringify({ error: 'Failed to generate plan' }),
			{ status: 500 }
		)
	}
}
