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
import DroppableZone from './DroppableZone'

interface DayPlannerProps {
	day: string
	places: ItineraryPlace[]
}

export default function DayPlanner({ day, places }: DayPlannerProps) {
	const [containers] = useState(['top-zone', 'bottom-zone'])
	const [items, setItems] = useState<Record<string, string[]>>({
		'top-zone': [],
		'bottom-zone': Array.from({ length: 6 }, (_, i) => `item-${i}`),
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
		const overContainer = over.id

		if (
			!activeContainer ||
			!containers.includes(overContainer.toString()) ||
			activeContainer === overContainer
		) {
			return
		}

		setItems((prev) => {
			const newItems = { ...prev }
			const activeIndex = newItems[activeContainer].indexOf(
				active.id as string
			)

			// Remove from active container
			const [removed] = newItems[activeContainer].splice(activeIndex, 1)
			// Add to over container
			newItems[overContainer.toString()].push(removed)

			return newItems
		})
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
				<DroppableZone
					id='top-zone'
					items={items['top-zone']}
				/>
				<DroppableZone
					id='bottom-zone'
					items={items['bottom-zone']}
					isScrollable
				/>
			</div>
		</DndContext>
	)
}
