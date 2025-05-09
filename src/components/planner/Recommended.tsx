'use client'

import { ItineraryPlace } from '@/types/itinerary'
import { PlusIcon } from 'lucide-react'
import React from 'react'

const Recommended = ({
	recommended,
	addToPlan,
}: {
	recommended: ItineraryPlace[]
	addToPlan: (place: ItineraryPlace) => void
}) => {
	return (
		<div className='flex gap-2 flex-wrap'>
			{recommended.map((place, index) => (
				<div
					key={index}
					className='cursor-pointer relative group'>
					<img
						src={`/api/image-proxy?url=${encodeURIComponent(
							place.googleImage
						)}`}
						className='rounded-xl object-cover w-[203px] h-[111px]'
						alt={place.name}
					/>
					<p className='text-xs font-bold absolute bottom-2 left-3 text-white z-20 text-start truncate w-full max-w-[90px] text-nowrap'>
						{place.name}
					</p>
					<div className='rounded-xl absolute top-0 left-0 w-[203px] h-[111px] bg-gradient-to-b from-black/0 to-black/40 z-10'></div>
					<div className='absolute z-20 inset-0 rounded-xl bg-black bg-opacity-50 flex items-center justify-center opacity-0 pointer-events-none group-hover:opacity-100 group-hover:pointer-events-auto transition-opacity duration-300 ease-in-out transform '>
						<button
							onClick={() => addToPlan(place)}
							className='p-2 rounded-full bg-white'>
							<PlusIcon className='w-4 h-4 text-black' />
						</button>
					</div>
				</div>
			))}
		</div>
	)
}

export default Recommended
