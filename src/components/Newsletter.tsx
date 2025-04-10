const Newsletter = () => {
	return (
		<div className='bg-[#F03800] rounded-[72px] flex flex-col items-center justify-center text-white py-[92px] md:mt-[120px]'>
			<h4 className='font-bold text-[56px] text-center '>
				Never Miss Any Travel Deals
			</h4>
			<p className='text-base text-center opacity-80'>
				Enter your email and will inform you about the exclusive travel
				deals
			</p>
			<form className='border border-[#000000] border-opacity-[12%] w-full max-w-xl rounded-full py-[6px] pl-6 pr-[6px] flex items-center gap-3 md:mt-8 bg-white'>
				<input
					name='query'
					type='text'
					placeholder='Enter Your Mail'
					className='appearance-none outline-none border-none ring-0  w-full bg-white'
				/>
				<button
					className='bg-[#F03800] rounded-full py-4 px-5 font-bold text-base text-white w-full max-w-24'
					type='submit'>
					Subscribe
				</button>
			</form>
		</div>
	)
}

export default Newsletter
