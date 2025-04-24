export interface Coordinate {
	lat: number
	lng: number
}

export interface ItineraryPlace {
	name: string
	description: string
	coordinates: Coordinate
	googleImage: string
	cost: string
	idealTime: string
	visitDuration: string
	type: string
	rating: number
}

export type Itinerary = Record<string, ItineraryPlace[]>
