// app/components/TripPlanner.tsx

import PlanTripForm from '@/components/planner/PlanTripForm'

export default function TripPlanner() {
	return (
		<main className='min-h-[70vh] flex items-center justify-center'>
			<PlanTripForm />
		</main>
	)
}

const data = {
	'Day 1': [
		{
			name: 'Buckingham Palace',
			description: 'Witness the Changing of the Guard ceremony',
			coordinates: {
				lat: 51.5014,
				lng: -0.1419,
			},
			googleImage:
				'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=51.5014,-0.1419',
			cost: 'Free',
			idealTime: '10:00 AM - 11:30 AM',
			visitDuration: '1.5 hours',
			type: 'Landmark',
			rating: 4.7,
		},
		{
			name: "St. James's Park",
			description: 'Relaxing stroll through the park',
			coordinates: {
				lat: 51.5033,
				lng: -0.1322,
			},
			googleImage:
				'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=51.5033,-0.1322',
			cost: 'Free',
			idealTime: '11:30 AM - 1:00 PM',
			visitDuration: '1.5 hours',
			type: 'Park',
			rating: 4.6,
		},
		{
			name: 'Westminster Abbey',
			description: 'Explore the historic abbey',
			coordinates: {
				lat: 51.503,
				lng: -0.1278,
			},
			googleImage:
				'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=51.5030,-0.1278',
			cost: '$30',
			idealTime: '1:00 PM - 3:00 PM',
			visitDuration: '2 hours',
			type: 'Landmark',
			rating: 4.8,
		},
		{
			name: 'Houses of Parliament & Big Ben',
			description: 'Admire the iconic architecture',
			coordinates: {
				lat: 51.5007,
				lng: -0.1246,
			},
			googleImage:
				'https://maps.googleapis.com/maps/api/streetview?size=400x400&location=51.5007,-0.1246',
			cost: 'Free',
			idealTime: '3:00 PM - 4:00 PM',
			visitDuration: '1 hour',
			type: 'Landmark',
			rating: 4.9,
		},
	],
}
