'use client'

import { Itinerary } from '@/types/itinerary'
import { useEffect, useState } from 'react'
import DayPlan from './DayPlan'
import Map from './Map'
import DayPlanSkeletonLoader from '../loader/DayPlanSkeletonLoader'

interface PlannerProps {
	location: string
	travelers: string
	budget: string
	days: number
	startDate: string
	endDate: string
}

export default function Planner({
	location,
	travelers,
	budget,
	days,
	startDate,
	endDate,
}: PlannerProps) {
	const [itinerary, setItinerary] = useState<Itinerary>({})
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchTripPlan = async () => {
			setItinerary({})
			setError(null)

			try {
				const res = await fetch('/api/ai/gemini/generate/trip/v2', {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						days,
						location,
						travelers,
						budget,
						startDate,
						endDate,
					}),
				})
				if (!res.ok) throw new Error(`Status ${res.status}`)
				if (!res.body) throw new Error('Streaming not supported')

				const reader = res.body.getReader()
				const decoder = new TextDecoder()
				let buffer = ''
				let done = false

				while (!done) {
					const { value, done: streamDone } = await reader.read()
					done = streamDone

					if (value) {
						buffer += decoder.decode(value, { stream: true })
						const lines = buffer.split('\n')
						buffer = lines.pop()!

						for (const line of lines) {
							if (!line.trim()) continue
							const dayObj = JSON.parse(line)
							setItinerary((prev) => ({ ...prev, ...dayObj }))
						}
					}
				}
			} catch (err) {
				setError(err instanceof Error ? err.message : 'Unknown error')
			}
		}

		fetchTripPlan()
	}, [location, travelers, budget, days, startDate, endDate])

	if (error) {
		return (
			<div className='flex items-center justify-center w-full h-full text-red-600'>
				Error: {error}
			</div>
		)
	}

	const dayIndices = Array.from({ length: days }, (_, i) => i + 1)

	return (
		<div className='flex justify-between items-start'>
			<div className='space-y-8 w-full'>
				<h1 className='font-extrabold text-[#222222] text-[40px] text-center'>
					My Trip to {location}
				</h1>
				{dayIndices.map((dayNum) => {
					const key = `Day ${dayNum}`
					if (itinerary[key]) {
						return (
							<DayPlan
								key={key}
								day={key}
								items={itinerary[key]!}
							/>
						)
					} else {
						return (
							<DayPlanSkeletonLoader
								key={key}
								day={key}
							/>
						)
					}
				})}
			</div>
			<Map />
		</div>
	)
}
