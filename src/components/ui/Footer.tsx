import { Globe } from 'lucide-react'
import React from 'react'

const Footer = () => {
	const year = new Date().getFullYear().toString()
	return (
		<footer className='bg-greyBackground w-full h-36 md:mt-16 place-content-center hor-padding'>
			<ul className='w-full flex items-center justify-between max-w-6xl mx-auto'>
				<li className='flex items-center justify-start gap-2'>
					<Globe
						color='#222222'
						size={16}
					/>
					<p className='font-semibold md:font-bold text-sm'>
						English (UK)
					</p>
				</li>
				<li>© {year} Tripbee</li>
			</ul>
		</footer>
	)
}

export default Footer
