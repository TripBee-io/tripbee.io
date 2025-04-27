'use client'

import { useState } from 'react'
import { ItineraryPlace } from '@/types/itinerary'
import Image from 'next/image'

// dnd-kit core + sortable
import {
	DndContext,
	closestCenter,
	PointerSensor,
	useSensor,
	useSensors,
	DragEndEvent,
} from '@dnd-kit/core'
import {
	SortableContext,
	arrayMove,
	useSortable,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'

interface DayPlanProps {
	items: ItineraryPlace[]
	day: string
}

export default function DayPlan({ items, day }: DayPlanProps) {
	const sensors = useSensors(useSensor(PointerSensor))

	// state for your day list & recommended
	const [dayList, setDayList] = useState<ItineraryPlace[]>([])
	const [recommended, setRecommended] = useState<ItineraryPlace[]>(items)

	// click to move into day list
	const addToPlan = (place: ItineraryPlace) => {
		setRecommended((r) => r.filter((p) => p.name !== place.name))
		setDayList((d) => [...d, place])
	}

	// click × to remove back to recommended
	const removeFromPlan = (place: ItineraryPlace) => {
		setDayList((d) => d.filter((p) => p.name !== place.name))
		setRecommended((r) => [...r, place])
	}

	// handle reorder inside day list
	const handleDragEnd = (event: DragEndEvent) => {
		const { active, over } = event
		if (!over || active.id === over.id) return

		const oldIndex = dayList.findIndex((p) => p.name === active.id)
		const newIndex = dayList.findIndex((p) => p.name === over.id)
		setDayList((list) => arrayMove(list, oldIndex, newIndex))
	}

	return (
		<section className='mx-12'>
			<h3 className='text-lg font-semibold mb-4'>{day}</h3>

			{/* Day List: draggable/reorderable */}
			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}>
				<SortableContext
					items={dayList.map((p) => p.name)}
					strategy={verticalListSortingStrategy}>
					<div className='space-y-2 mb-6'>
						{dayList.map((place) => (
							<SortableItem
								key={place.name}
								place={place}
								onRemove={removeFromPlan}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>

			{/* Recommended */}
			<h4 className='font-semibold mb-2'>Recommended Places</h4>
			<div className='flex gap-4 flex-wrap'>
				{recommended.map((place) => (
					<div
						key={place.name}
						onClick={() => addToPlan(place)}
						className='w-[100px] text-center cursor-pointer'>
						<Image
							src={'/place-demo.png'}
							alt={place.name}
							width={100}
							height={100}
							className='rounded-lg mb-1'
						/>
						<p className='text-sm'>{place.name}</p>
					</div>
				))}
			</div>
		</section>
	)
}

function SortableItem({
	place,
	onRemove,
}: {
	place: ItineraryPlace
	onRemove: (place: ItineraryPlace) => void
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id: place.name })

	return (
		<div
			ref={setNodeRef}
			style={{
				transform: CSS.Transform.toString(transform),
				transition,
				opacity: isDragging ? 0.8 : 1,
			}}
			className='flex items-center justify-between p-3 bg-white rounded-lg shadow'>
			<div className='flex items-center gap-4'>
				<Image
					src={'/place-demo.png'}
					alt={place.name}
					width={60}
					height={60}
					className='rounded'
				/>
				<div>
					<p className='font-semibold'>{place.name}</p>
					<p className='text-sm text-gray-500'>{place.idealTime}</p>
				</div>
			</div>

			<div className='flex items-center gap-2'>
				{/* Remove button */}
				<button
					onClick={() => onRemove(place)}
					className='text-red-500 font-bold px-2'>
					×
				</button>

				{/* Drag-handle “Move” */}
				<button
					{...attributes}
					{...listeners}
					className='text-blue-500 px-2'>
					Move
				</button>
			</div>
		</div>
	)
}
