// app/api/location/google/details/route.ts  (or pages/api/…)
import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@googlemaps/google-maps-services-js'

export async function POST(req: NextRequest) {
	const { place_id } = await req.json()
	const client = new Client()

	const res = await client.placeDetails({
		params: {
			place_id,
			fields: [
				'name',
				'formatted_address',
				'geometry',
				'photos',
				'rating',
				'price_level',
				'types',
			],
			key: process.env.GOOGLE_MAPS_API_KEY!,
		},
	})

	const result = res.data.result
	const photoRef = result.photos?.[0]?.photo_reference
	const photoUrl = photoRef
		? `https://maps.googleapis.com/maps/api/place/photo?maxwidth=203&maxHeight=111&photoreference=${photoRef}&key=${process.env.GOOGLE_MAPS_API_KEY}`
		: ''

	return NextResponse.json({
		place: {
			name: result.name,
			description: result.formatted_address,
			coordinates: {
				lat: result.geometry && result.geometry.location.lat,
				lng: result.geometry && result.geometry.location.lng,
			},
			googleImage: photoUrl,
			cost: result.price_level?.toString() ?? '',
			idealTime: '', // you’ll need your own logic here...
			visitDuration: '', // …or prompt the user for this
			type: result.types?.[0] ?? '',
			rating: result.rating ?? 0,
		},
	})
}
