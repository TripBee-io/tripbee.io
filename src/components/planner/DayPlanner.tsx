'use client'

import { useState } from 'react'
import {
	DndContext,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
	UniqueIdentifier,
} from '@dnd-kit/core'

import { rectIntersection } from '@dnd-kit/core'
import { ItineraryPlace } from '@/types/itinerary'
import DayPlan from './DayPlan'
import RecommendedPlaces from './RecommendedPlaces'

interface DayPlannerProps {
	day: string
	places: ItineraryPlace[]
}

export default function DayPlanner({ day, places }: DayPlannerProps) {
	const [containers] = useState(['top-zone', 'bottom-zone'])
	const [items, setItems] = useState<Record<string, string[]>>({
		'top-zone': [], // Empty array for initial plan
		'bottom-zone': places.map((place) => place.name),
	})

	const sensors = useSensors(
		useSensor(PointerSensor, {
			activationConstraint: {
				distance: 8,
			},
		})
	)

	function handleDragEnd(event: DragEndEvent) {
		const { active, over } = event
		if (!over) return

		const activeContainer = findContainer(active.id)
		const overContainer = over.id.toString()

		if (
			!activeContainer ||
			!containers.includes(overContainer) ||
			activeContainer === overContainer
		) {
			return
		}

		setItems((prev) => ({
			...prev,
			[activeContainer]: prev[activeContainer].filter(
				(item) => item !== active.id
			),
			[overContainer]: [...prev[overContainer], active.id as string],
		}))
	}

	const findContainer = (id: UniqueIdentifier) => {
		return Object.keys(items).find((key) =>
			items[key].includes(id.toString())
		)
	}

	return (
		<DndContext
			sensors={sensors}
			collisionDetection={rectIntersection}
			onDragEnd={handleDragEnd}>
			<div className='flex flex-col gap-8 p-4'>
				<DayPlan
					day={day}
					items={items['top-zone']}
				/>
				<RecommendedPlaces items={items['bottom-zone']} />
			</div>
		</DndContext>
	)
}
