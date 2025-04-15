import SearchForm from './SearchForm'

const BlogHero = ({ query }: { query?: string }) => {
	return (
		<section className='text-darkText max-w-6xl mx-auto max-w-screen flex flex-col justify-start items-center w-full md:pt-16 hor-padding'>
			<div className='mb-9 md:mb-12'>
				<h1 className='text-center font-bold text-4xl md:text-[56px] text-darkText leading-[100%]'>
					Blogs
				</h1>
				<p className='text-center text-[#777E90] font-normal text-base pt-2'>
					Explore top travel spots, must-know hacks, and pro planning
					tips—all in one place
				</p>
			</div>
			<SearchForm query={query} />
		</section>
	)
}

export default BlogHero
