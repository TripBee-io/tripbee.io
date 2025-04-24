'use client'

import { useDroppable } from '@dnd-kit/core'
import DraggableImage from './DraggableImage'

export default function RecommendedPlaces({ items }: { items: string[] }) {
	console.log('items:::', items)
	const { setNodeRef } = useDroppable({ id: 'bottom-zone' })

	return (
		<div>
			<p className='font-bold text-sm text-black mb-[14px]'>
				Recommended Places
			</p>
			<div
				ref={setNodeRef}
				className='p-4 border-2 border-dashed rounded-lg border-gray-200 bg-gray-50 overflow-x-auto'>
				<div className='flex gap-4 pr-4'>
					{items.map((item) => (
						<DraggableImage
							key={item}
							id={item}
							placeName={item}
                            isInTopZone={false}
						/>
					))}
					{items.length === 0 && (
						<div className='w-full text-center text-gray-400'>
							No Places Available
						</div>
					)}
				</div>
			</div>
		</div>
	)
}
