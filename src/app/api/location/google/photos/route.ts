import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@googlemaps/google-maps-services-js'

export async function POST(req: NextRequest) {
	try {
		const { place_ids, width = 203, height = 111 } = await req.json()

		if (
			!Array.isArray(place_ids) ||
			!place_ids.every((id) => typeof id === 'string')
		) {
			return NextResponse.json(
				{ error: 'place_ids must be a string[]' },
				{ status: 400 }
			)
		}

		const client = new Client()
		const results = await Promise.all(
			place_ids.map(async (pid) => {
				const detail = await client.placeDetails({
					params: {
						place_id: pid,
						fields: ['photos'],
						key: process.env.GOOGLE_MAPS_API_KEY!,
					},
				})
				const photoRef = detail.data.result.photos?.[0]?.photo_reference
				const photoUrl = photoRef
					? `https://maps.googleapis.com/maps/api/place/photo` +
					  `?maxwidth=${width}` +
					  `&maxheight=${height}` +
					  `&photoreference=${encodeURIComponent(photoRef)}` +
					  `&key=${process.env.GOOGLE_MAPS_API_KEY}`
					: ''
				return { place_id: pid, photoUrl }
			})
		)

		return NextResponse.json({ photos: results })
	} catch (e) {
		console.error(e)
		return NextResponse.json(
			{ error: 'Failed to batch-fetch photos' },
			{ status: 500 }
		)
	}
}
