import BlogCard, { BlogTypeCard } from '@/components/BlogCard'
import Newsletter from '@/components/Newsletter'
import SearchForm from '@/components/SearchForm'
import { client } from '@/sanity/lib/client'
import { sanityFetch, SanityLive } from '@/sanity/lib/live'
import { BLOGS_QUERY } from '@/sanity/lib/queries'

export default async function BlogHome({
	searchParams,
}: {
	searchParams: Promise<{ query?: string }>
}) {
	const query = (await searchParams).query
	const params = { search: query || null }
	const { data: blogs } = await sanityFetch({ query: BLOGS_QUERY, params })
	return (
		<div className='max-w-6xl mx-auto'>
			<section className='text-black  max-w-screen flex flex-col justify-start items-center w-full md:pt-16'>
				<div className='pb-12'>
					<h1 className='text-center font-bold text-[56px] text-[#23262F]'>
						Blogs
					</h1>
					<p className='text-center text-[#777E90] font-normal text-base pt-2'>
						Explore top travel spots, must-know hacks, and pro
						planning tips—all in one place
					</p>
				</div>
				<SearchForm query={query} />
			</section>
			<section className='md:mt-[72px]'>
				{/* <p>{query ? `Search results for "${query}"` : 'All blogs'}</p> */}
				<div className='flex flex-wrap gap-8 items-center justify-center'>
					{blogs &&
						blogs?.map((blog: BlogTypeCard) => (
							<BlogCard
								key={blog._id}
								post={blog}
							/>
						))}
				</div>
			</section>
			<section>
				<Newsletter />
			</section>
			<SanityLive />
		</div>
	)
}
