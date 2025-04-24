'use client'

import { useDroppable } from '@dnd-kit/core'
import DraggableImage from './DraggableImage'

export default function DayPlan({
	items,
	day,
}: {
	items: string[]
	day: string
}) {
	const { setNodeRef } = useDroppable({ id: 'top-zone' })

	return (
		<section>
			<h3 className='text-lg font-semibold mb-2'>{day}</h3>
			<div
				ref={setNodeRef}
				className='p-4 border-2 border-dashed rounded-lg min-h-[200px] border-blue-400 bg-blue-50'>
				<div className='flex gap-4'>
					{items.map((item) => (
						<DraggableImage
							key={item}
							id={item}
							placeName={item}
							isInTopZone={true}
						/>
					))}
					{items.length === 0 && (
						<div className='w-full text-center text-gray-400'>
							Drag Places here
						</div>
					)}
				</div>
			</div>
		</section>
	)
}
