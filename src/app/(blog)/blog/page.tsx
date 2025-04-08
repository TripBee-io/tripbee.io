import BlogCard, { BlogTypeCard } from '@/components/BlogCard'
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
		<>
			<section className='text-black min-h-screen max-w-screen flex flex-col justify-center items-center w-full'>
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
			<section>
				<p>{query ? `Search results for "${query}"` : 'All blogs'}</p>
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
			<SanityLive />
		</>
	)
}
