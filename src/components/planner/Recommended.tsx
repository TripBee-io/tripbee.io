'use client'

import { Itinerary, ItineraryPlace } from '@/types/itinerary'
import Image from 'next/image'
import React from 'react'

const Recommended = ({
	recommended,
	addToPlan,
}: {
	recommended: ItineraryPlace[]
	addToPlan: (place: ItineraryPlace) => void
}) => {
	return (
		<div className='flex gap-4 flex-wrap'>
			{recommended.map((place, index) => (
				<div
					key={index}
					onClick={() => addToPlan(place)}
					className='cursor-pointer relative'>
					<Image
						src={place.googleImage}
						alt={place.name}
						width={203}
						height={111}
						className='rounded-xl'
					/>
					<p className='text-xs font-bold absolute bottom-2 left-3 text-white z-20 text-start truncate w-full max-w-[90px] text-nowrap'>
						{place.name}
					</p>
				</div>
			))}
		</div>
	)
}

export default Recommended
