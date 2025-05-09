import BlogCard, { BlogTypeCard } from '@/components/blog/BlogCard'
import BlogHero from '@/components/blog/BlogHero'
import Newsletter from '@/components/blog/Newsletter'
import Breadcrumbs from '@/components/ui/Breadcrumb'
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
		<div className=''>
			<Breadcrumbs segments={['blog']} />
			<BlogHero query={query} />
			<section className='mt-8 md:mt-[72px] max-w-6xl mx-auto hor-padding'>
				{/* <p>{query ? `Search results for "${query}"` : 'All blogs'}</p> */}
				<div className='flex flex-wrap gap-y-8 md:gap-x-8 md:gap-y-16 items-start justify-start'>
					{blogs &&
						blogs?.map((blog: BlogTypeCard) => (
							<BlogCard
								key={blog._id}
								post={blog}
							/>
						))}
				</div>
			</section>
			<section className='max-w-6xl mx-auto mt-16 md:mt-[120px]'>
				<Newsletter />
			</section>
			<SanityLive />
		</div>
	)
}
