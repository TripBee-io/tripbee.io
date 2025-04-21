import Image from 'next/image'

const Newsletter = () => {
	return (
		<div className='px-4 bg-[#F03800] rounded-t-[32px] md:rounded-[72px] flex flex-col items-center justify-center text-white pt-12 md:py-[92px] md:mt-[120px]'>
			<h4 className='font-bold text-[40px] md:text-[56px] text-center '>
				Never Miss Any Travel Deals
			</h4>
			<p className='text-base text-center opacity-80'>
				Enter your email and will inform you about the exclusive travel
				deals
			</p>
			<form className='border border-[#000000] border-opacity-[12%] w-full max-w-xl rounded-full py-[6px] pl-6 pr-[6px] flex items-center gap-3 md:mt-8 bg-white mt-8'>
				<input
					name='query'
					type='text'
					placeholder='Enter Your Mail'
					className='appearance-none outline-none border-none ring-0  w-full bg-white text-black'
				/>
				<button
					className='bg-[#F03800] rounded-full py-4 px-5 font-bold text-base text-white w-fit '
					type='submit'>
					Subscribe
				</button>
			</form>
			<Image
				src='/mailbox.svg'
				alt='Image of a mailbox'
				width={210}
				height={200}
				className='mt-8 block md:hidden'
			/>
		</div>
	)
}

export default Newsletter
