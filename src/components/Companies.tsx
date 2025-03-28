import Image from 'next/image'

export default function Companies() {
	return (
		<>
			<h2 className='font-normal text-2xl text-center mt-14 pb-10'>
				We compare and serve you the{' '}
				<span className='font-bold text-[#FF641A]'>Best Deals</span>
			</h2>
			<div className='flex flex-wrap items-center justify-center gap-6'>
				{/* Air India */}
				<div className='flex flex-col items-center'>
					{/* Mobile */}
					<Image
						alt='Logo of Air India (mobile)'
						src='/companies/india.png'
						width={100}
						height={100}
						className='sm:hidden'
					/>
					{/* Larger screens */}
					<Image
						alt='Logo of Air India (desktop)'
						src='/companies/india.png'
						width={250}
						height={250}
						className='hidden sm:block'
					/>
				</div>

				{/* British Airways */}
				<div className='flex flex-col items-center'>
					<Image
						alt='Logo of British Airways (mobile)'
						src='/companies/british.png'
						width={100}
						height={100}
						className='sm:hidden'
					/>
					<Image
						alt='Logo of British Airways (desktop)'
						src='/companies/british.png'
						width={250}
						height={250}
						className='hidden sm:block'
					/>
				</div>

				{/* American Airlines */}
				<div className='flex flex-col items-center'>
					<Image
						alt='Logo of American Airlines (mobile)'
						src='/companies/american.png'
						width={100}
						height={100}
						className='sm:hidden'
					/>
					<Image
						alt='Logo of American Airlines (desktop)'
						src='/companies/american.png'
						width={250}
						height={250}
						className='hidden sm:block'
					/>
				</div>

				{/* Qatar Airways */}
				<div className='flex flex-col items-center'>
					<Image
						alt='Logo of Qatar Airways (mobile)'
						src='/companies/qatar.png'
						width={100}
						height={100}
						className='sm:hidden'
					/>
					<Image
						alt='Logo of Qatar Airways (desktop)'
						src='/companies/qatar.png'
						width={250}
						height={250}
						className='hidden sm:block'
					/>
				</div>

				{/* United Airlines */}
				<div className='flex flex-col items-center'>
					<Image
						alt='Logo of United Airlines (mobile)'
						src='/companies/united.png'
						width={100}
						height={100}
						className='sm:hidden'
					/>
					<Image
						alt='Logo of United Airlines (desktop)'
						src='/companies/united.png'
						width={250}
						height={250}
						className='hidden sm:block'
					/>
				</div>

				{/* Turkish Airlines */}
				<div className='flex flex-col items-center'>
					<Image
						alt='Logo of Turkish Airlines (mobile)'
						src='/companies/turkish.png'
						width={100}
						height={100}
						className='sm:hidden'
					/>
					<Image
						alt='Logo of Turkish Airlines (desktop)'
						src='/companies/turkish.png'
						width={250}
						height={250}
						className='hidden sm:block'
					/>
				</div>
			</div>
		</>
	)
}
