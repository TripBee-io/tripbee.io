'use client'

import { useState } from 'react'
import { ItineraryPlace } from '@/types/itinerary'
import Image from 'next/image'

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
import { CircleXIcon, GripVerticalIcon } from 'lucide-react'
import Recommended from './Recommended'
import AddPlaceInput from './AddPlaceInput'
import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js'

interface DayPlanProps {
	items: ItineraryPlace[]
	day: string
}

export default function DayPlan({ items, day }: DayPlanProps) {
	const sensors = useSensors(useSensor(PointerSensor))

	const [dayList, setDayList] = useState<ItineraryPlace[]>([])
	const [recommended, setRecommended] = useState<ItineraryPlace[]>(items)

	// click to move into day list
	const addToPlan = (place: ItineraryPlace): void => {
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

	const handleSelect = async (p: PlaceAutocompleteResult) => {
		const res = await fetch('/api/location/google/autocomplete/details', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ place_id: p.place_id }),
		})
		const { place } = (await res.json()) as { place: ItineraryPlace }
		addToPlan(place)
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
					items={dayList.map((p, index) => p.name)}
					strategy={verticalListSortingStrategy}>
					<div className='space-y-[20px] mb-5'>
						{dayList.map((place, index) => (
							<SortableItem
								key={index}
								place={place}
								onRemove={removeFromPlan}
								index={index}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>

			<AddPlaceInput onSelect={handleSelect} />
			{/* Recommended */}
			{recommended.length > 0 && (
				<div className='mt-5'>
					<h4 className='font-semibold mb-2'>Recommended Places</h4>
					<Recommended
						recommended={recommended}
						addToPlan={addToPlan}
					/>
				</div>
			)}
			<br className='color-black opacity-[6%]' />
		</section>
	)
}

function SortableItem({
	place,
	onRemove,
	index,
}: {
	place: ItineraryPlace
	onRemove: (place: ItineraryPlace) => void
	index: number
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
			className='flex items-center justify-between gap-3'>
			<div className='flex items-center justify-between pr-4 bg-white rounded-2xl border border-black border-opacity-[6%] w-full relative'>
				<div className='absolute -top-2 -left-2 bg-[#348CFF]  z-20 size-[26px] rounded-full border-[3px] border-white'>
					<p className='text-sm font-bold text-center text-white'>
						{index + 1}
					</p>
				</div>
				<div className='flex items-center gap-4'>
					<img
						src={`/api/image-proxy?url=${encodeURIComponent(
							place.googleImage
						)}`}
						className='rounded-l-xl object-cover w-[124px] h-[85px]'
						alt={place.name}
					/>

					<div className='space-y-[4px]'>
						<p className='font-semibold text-lg text-darkText'>
							{place.name}
						</p>
						<p className='text-sm text-lightText'>
							{place.idealTime}
						</p>
					</div>
				</div>

				<div className='flex items-center gap-2'>
					{/* Remove button */}
					<button
						onClick={() => onRemove(place)}
						className=''>
						<CircleXIcon className='text-lightText size-[22px]' />
					</button>
				</div>
			</div>
			<button
				{...attributes}
				{...listeners}
				className=''>
				<GripVerticalIcon className='color-lightText size-6' />
			</button>
		</div>
	)
}
