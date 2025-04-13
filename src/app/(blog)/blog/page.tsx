import BlogCard, { BlogTypeCard } from '@/components/blog/BlogCard'
import BlogHero from '@/components/blog/BlogHero'
import Newsletter from '@/components/blog/Newsletter'
import SearchForm from '@/components/blog/SearchForm'
import Breadcrumbs from '@/components/ui/Breadcrumb'
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
			<Breadcrumbs segments={['blog']} />
			<BlogHero query={query} />
			<section className='mt-8 md:mt-[72px]'>
				{/* <p>{query ? `Search results for "${query}"` : 'All blogs'}</p> */}
				<div className='flex flex-wrap gap-y-8 md:gap-x-8 md:gap-y-16 items-center justify-center'>
					{blogs &&
						blogs?.map((blog: BlogTypeCard) => (
							<BlogCard
								key={blog._id}
								post={blog}
							/>
						))}
				</div>
			</section>
			<section className='mt-16 md:mt-[120px]'>
				<Newsletter />
			</section>
			<SanityLive />
		</div>
	)
}
