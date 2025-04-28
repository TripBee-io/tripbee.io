import Image from 'next/image'
import React from 'react'

const Map = () => {
	return (
		<div className='relative'>
			<div className='absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full flex flex-col items-center justify-center'>
				<p className='font-black text-2xl text-black text-center w-full'>
					Get Detailed Informations
				</p>
				<p className='text-base text-black w-[303px] text-center pt-2'>
					Realtime map preview, location details, reviews and more by
					unlocking Premium
				</p>
				<button className='bg-white rounded-full py-[10px] px-8 font-bold text-sm mt-8'>
					Coming Soon{' '}
					<span className='bg-brightOrange pt-[2.5px] pb-[3.5px] px-1 rounded-sm ml-[6px] text-white'>
						PRO
					</span>
				</button>
			</div>
			<Image
				src='/map.png'
				width={496}
				height={669}
				alt='Picture of an image'
			/>
		</div>
	)
}

export default Map
