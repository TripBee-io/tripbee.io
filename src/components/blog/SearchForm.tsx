import Form from 'next/form'
const SearchForm = ({ query }: { query?: string }) => {
	return (
		<Form
			action='/blog'
			scroll={false}
			className='border border-[#000000] border-opacity-[12%] w-full max-w-xl rounded-full py-[6px] pl-6 pr-[6px] flex items-center gap-3'>
			<input
				name='query'
				defaultValue={query}
				type='text'
				placeholder='Search Blog here...'
				className='appearance-none outline-none border-none ring-0  w-full text-'
			/>
			<button
				className='bg-[#F03800] rounded-full py-4 px-5 font-bold text-base text-white w-full max-w-24'
				type='submit'>
				Search
			</button>
		</Form>
	)
}

export default SearchForm
