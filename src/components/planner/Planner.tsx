'use client'

import { Itinerary } from '@/types/itinerary'
import { useEffect, useState } from 'react'
import DayPlan from './DayPlan'
import Map from './Map'

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
							<DayPlanSkeleton
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

function DayPlanSkeleton({ day }: { day: string }) {
	return (
		<section className='mx-12 animate-pulse'>
			<div className='h-6 w-24 mb-4 bg-gray-200 rounded' />

			<div className='h-10 mb-6 bg-gray-200 rounded' />

			<div className='flex justify-start items-end gap-2'>
				{Array.from({ length: 4 }).map((_, i) => (
					<div
						key={i}
						className='h-[111px] w-[203px] bg-gray-200 rounded-lg'
					/>
				))}
			</div>
		</section>
	)
}
