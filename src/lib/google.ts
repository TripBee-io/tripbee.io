'use server'
import { Client } from '@googlemaps/google-maps-services-js'

const client = new Client()
export const autocomplete = async (input: string) => {
	try {
		const response = await client.placeAutocomplete({
			params: {
				input: input,
				key: 'AIzaSyCQYdoD9e4bp-zl_gCo2znws8yWNpufdSs',
			},
		})
		return response.data.predictions
	} catch (error) {
		console.log(error)
	}
}
