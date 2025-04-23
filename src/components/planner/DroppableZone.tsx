import { useDroppable } from "@dnd-kit/core"
import DraggableImage from "./DraggableImage"

export default function DroppableZone({
	id,
	items,
	isScrollable = false,
}: {
	id: string
	items: string[]
	isScrollable?: boolean
}) {
	const { setNodeRef } = useDroppable({ id })

	return (
		<div
			ref={setNodeRef}
			className={`p-4 border-2 border-dashed rounded-lg ${
				id === 'top-zone'
					? 'min-h-[200px] border-blue-400 bg-blue-50'
					: 'border-gray-200 bg-gray-50'
			} ${isScrollable ? 'overflow-x-auto' : ''}`}>
			<div className={`flex gap-4 ${isScrollable ? 'pr-4' : ''}`}>
				{items.map((id) => (
					<DraggableImage
						key={id}
						id={id}
					/>
				))}
				{items.length === 0 && (
					<div className='w-full text-center text-gray-400'>
						{id === 'top-zone'
							? 'Drag images here'
							: 'No images available'}
					</div>
				)}
			</div>
		</div>
	)
}
