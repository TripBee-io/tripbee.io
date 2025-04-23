import { useDraggable } from '@dnd-kit/core'
import Image from 'next/image'
import { CSS } from '@dnd-kit/utilities'
export default function DraggableImage({ id }: { id: string }) {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id,
		})

	const style = {
		transform: CSS.Translate.toString(transform),
		zIndex: 999,
	}

	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className='relative flex-shrink-0 cursor-grab active:cursor-grabbing'>
			<div className='w-24 h-24 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow'>
				<Image
					src='/companies/american.png'
					fill
					alt='Draggable'
					className='object-cover rounded-lg'
				/>
			</div>
		</div>
	)
}
