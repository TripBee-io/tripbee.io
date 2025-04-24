import { NextRequest, NextResponse } from 'next/server'
import { Client } from '@googlemaps/google-maps-services-js'

export async function POST(request: NextRequest) {
	try {
		const { input } = await request.json()

		if (!input || typeof input !== 'string') {
			return NextResponse.json(
				{ error: 'Missing input parameter', predictions: [] },
				{ status: 400 }
			)
		}

		const client = new Client()
		const res = await client.placeAutocomplete({
			params: {
				input,
				key: 'AIzaSyCCf_eBEDl5p3KwkcYic9SnHonQqX0AFsw',
				language: 'en',
			},
		})

		return NextResponse.json({
			predictions: res.data.predictions || [],
		})
	} catch (err) {
		console.error('API Error:', err)
		return NextResponse.json(
			{
				error: 'Failed to fetch autocomplete results',
				predictions: [],
			},
			{ status: 500 }
		)
	}
}
