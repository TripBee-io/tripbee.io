import { useDraggable } from '@dnd-kit/core'
import Image from 'next/image'
import { CSS } from '@dnd-kit/utilities'
export default function DraggableImage({
	id,
	placeName,
	isInTopZone = false,
}: {
	id: string
	placeName: string
	isInTopZone?: boolean
}) {
	const { attributes, listeners, setNodeRef, transform, isDragging } =
		useDraggable({
			id,
		})

	const style = {
		transform: CSS.Translate.toString(transform),
		zIndex: 999,
	}

	if (isInTopZone) {
		return (
			<div
				ref={setNodeRef}
				style={style}
				{...listeners}
				{...attributes}
				className='relative flex-shrink-0 cursor-grab active:cursor-grabbing w-32 h-32'>
				<div className='relative ring-2 ring-blue-500'>
					<Image
						src='/place-demo.png'
						height={128}
						width={256}
						className='object-cover rounded-lg border-2 border-blue-500'
						alt={placeName}
					/>
					<button className='absolute top-1 right-1 bg-red-500 text-white rounded-full w-5 h-5 text-xs'>
						×
					</button>
					<p className='absolute bottom-2 left-3 font-bold text-sm text-white drop-shadow-md'>
						{placeName}
					</p>
				</div>
			</div>
		)
	}

	// Bottom zone
	return (
		<div
			ref={setNodeRef}
			style={style}
			{...listeners}
			{...attributes}
			className='relative flex-shrink-0 cursor-grab active:cursor-grabbing w-24 h-24'>
			<div className='relative'>
				<Image
					src='/place-demo.png'
					height={111}
					width={203}
					className='object-cover rounded-lg'
					alt={placeName}
				/>
				<p className='absolute bottom-2 left-3 font-bold text-xs text-white drop-shadow-md'>
					{placeName}
				</p>
			</div>
		</div>
	)
}
