'use client'

import { Itinerary, ItineraryPlace } from '@/types/itinerary'
import { useEffect, useState } from 'react'
import { mockData } from './mock-data'
import DayPlan from './DayPlan'

interface PlannerProps {
	location: string
	travelers: string
	budget: string
	days: number
	startDate: string
	endDate: string
}

const Planner = ({
	location,
	travelers,
	budget,
	days,
	startDate,
	endDate,
}: PlannerProps) => {
	const [loading, setLoading] = useState<boolean>(false)
	// const [itinerary, setItinerary] = useState<Itinerary>({})
	const [itinerary, setItinerary] = useState<Itinerary>(mockData)
	const [error, setError] = useState<string | null>()
	useEffect(() => {
		const fetchTripPlan = async () => {
			try {
				const res = await fetch('/api/ai/gemini/generate/trip', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						days: days,
						location: location,
						travelers: travelers,
						budget: budget,
					}),
				})
				if (!res.ok)
					throw new Error(`HTTP error! status: ${res.status}`)

				const data: Itinerary | null = await res.json()
				if (!data) {
					setLoading(false)
					setError('Something went wrong')
					return
				}
				setItinerary(data)
			} catch (err) {
				setError(
					err instanceof Error
						? err.message
						: 'Failed to generate plan'
				)
			} finally {
				setLoading(false)
			}
		}

		// fetchTripPlan()
	}, [location, travelers, budget, days, startDate, endDate])
	if (loading)
		return (
			<div className='flex items-center justify-center w-full h-full'>
				Loading...
			</div>
		)

	if (Object.keys(itinerary).length <= 0)
		return <div>No trip plan found!</div>

	return (
		<div>
			<div className='space-y-8'>
				{Object.entries(itinerary).map(([day, items]) => (
					<DayPlan
						key={day}
						day={day}
						items={items}
					/>
				))}
			</div>
		</div>
	)
}

export default Planner
