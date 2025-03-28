import Image from 'next/image'
import AviasalesSearchFormWidget from './AviaSalesSearchFormWidget'
import Link from 'next/link'

export default function Hero() {
	return (
		<div className='bg-gradient-to-r from-[#562A83] to-[#2F0743] w-full h-[90vh] md:h-[60vh] flex flex-col justify-between items-center pt-6 pb-14 px-6'>
			<nav className='max-w-7xl w-full'>
				<Link href={'/'}>
					<Image
						src='/logo.png'
						alt='Tripbee logo'
						height={100}
						width={100}
					/>
				</Link>
			</nav>
			<div className='w-full max-w-7xl flex flex-col items-start justify-center gap-10'>
				<div className='relative'>
					<h1 className='font-semibold text-2xl md:font-extrabold md:text-[46px] max-w-[730px] text-white text-start leading-normal'>
						Stop Overpaying for Flights, Grab the Cheapest Deals
						Now!
					</h1>
					<Image
						src='/streak.svg'
						alt='Underline for the heading'
						width={250}
						height={100}
						className='absolute right-[30%]'
					/>
				</div>
				<AviasalesSearchFormWidget />
			</div>
		</div>
	)
}
