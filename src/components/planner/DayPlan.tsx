'use client'

import { useState } from 'react'
import { ItineraryPlace } from '@/types/itinerary'
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

	const addToPlan = (place: ItineraryPlace) => {
		setRecommended((r) => r.filter((p) => p.name !== place.name))
		setDayList((d) => [...d, place])
	}

	const removeFromPlan = (place: ItineraryPlace) => {
		setDayList((d) => d.filter((p) => p.name !== place.name))
		setRecommended((r) => [...r, place])
	}

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

			<DndContext
				sensors={sensors}
				collisionDetection={closestCenter}
				onDragEnd={handleDragEnd}>
				<SortableContext
					items={dayList.map((p) => p.name)}
					strategy={verticalListSortingStrategy}>
					<div className='space-y-[20px] mb-5'>
						{dayList.map((place, index) => (
							<SortableItem
								key={place.name}
								place={place}
								index={index}
								onRemove={removeFromPlan}
							/>
						))}
					</div>
				</SortableContext>
			</DndContext>

			<AddPlaceInput onSelect={handleSelect} />

			{recommended.length > 0 && (
				<div className='mt-5'>
					<h4 className='font-semibold mb-2'>Recommended Places</h4>
					<Recommended
						recommended={recommended}
						addToPlan={addToPlan}
					/>
				</div>
			)}
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
	} = useSortable({
		id: place.name,
		// turn off *all* built-in layout-change animations
		animateLayoutChanges: () => false,
	})

	// apply exactly the transition dnd-kit gives you (no spring bounce)
	const style: React.CSSProperties = {
		transform: CSS.Transform.toString(transform),
		transition: isDragging ? 'none' : transition,
		opacity: isDragging ? 0.8 : 1,
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			className='flex items-center justify-between gap-3'>
			<div className='flex items-center justify-between pr-4 bg-white rounded-2xl border border-black border-opacity-[6%] w-full relative'>
				<div className='absolute -top-2 -left-2 bg-[#348CFF] z-20 w-[26px] h-[26px] rounded-full border-[3px] border-white flex items-center justify-center'>
					<p className='text-sm font-bold text-white'>{index + 1}</p>
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
				<button onClick={() => onRemove(place)}>
					<CircleXIcon className='text-lightText w-5 h-5' />
				</button>
			</div>
			<button
				{...attributes}
				{...listeners}>
				<GripVerticalIcon className='text-lightText w-6 h-6' />
			</button>
		</div>
	)
}
