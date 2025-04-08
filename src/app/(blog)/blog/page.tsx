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
			<section className='text-black min-h-screen max-w-screen'>
				<div className='flex items-center justify-center'>
					<h1 className='text-center'>Blogs</h1>
					<p className='text-center'>
						Explore top travel spots, must-know hacks, and pro
						planning tips—all in one place
					</p>
				</div>
				<SearchForm query={query} />
				<p>{query ? `Search results for "${query}"` : 'All blogs'}</p>
				<div>
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
