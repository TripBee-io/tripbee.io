import Image from 'next/image'

export default function Companies() {
	return (
		<div>
			<h2 className='font-normal text-2xl text-center mt-14 pb-10'>
				We compare and serve you the{' '}
				<span className='font-bold text-[#FF641A]'>Best Deals</span>
			</h2>
			<div className='w-full flex flex-wrap items-center justify-center'>
				<Image
					alt='Logo of Air India'
					src='/companies/india.png'
					height={250}
					width={250}
				/>
				<Image
					alt='Logo of British Airways'
					src='/companies/british.png'
					height={250}
					width={250}
				/>
				<Image
					alt='Logo of American Airlines'
					src='/companies/american.png'
					height={250}
					width={250}
				/>
				<Image
					alt='Logo of Qatar Airways'
					src='/companies/qatar.png'
					height={250}
					width={250}
				/>
				<Image
					alt='Logo of United Airlines'
					src='/companies/united.png'
					height={250}
					width={250}
				/>
				<Image
					alt='Logo of Turkish Airlines'
					src='/companies/turkish.png'
					height={250}
					width={250}
				/>
			</div>
		</div>
	)
}
