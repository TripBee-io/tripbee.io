import { client } from '@/sanity/lib/client'
import { BLOG_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import markdownit from 'markdown-it'
import Breadcrumbs from '@/components/ui/Breadcrumb'
import AuthorDate from '@/components/blog/AuthorDate'
import Image from 'next/image'

const md = markdownit()

export const experimental_ppr = true

export default async function BlogDetailsPage({
	params,
}: {
	params: { slug: string }
}) {
	const { slug } = params

	const post = await client.fetch(BLOG_BY_SLUG_QUERY, { slug })
	if (!post) return notFound()

	const parsedArticle = md.render(post?.article || '')

	return (
		<>
			<Breadcrumbs
				segments={['blog', slug]}
				blogTitle={post.title}
			/>
			<div className='max-w-6xl mx-auto hor-padding mb-12'>
				<h1 className='pt-8 font-bold md:text-[56px] text-start text-darkText pb-3'>
					{post.title}
				</h1>
				{post && (
					<AuthorDate
						date={post._createdAt}
						author={post.author}
					/>
				)}
				<Image
					src={post.image}
					alt={`Image representing ${post.title}`}
					width={1172}
					height={423}
					className='mt-12 mb-16 rounded-[32px] '
				/>
				{parsedArticle ? (
					<article
						className='prose break-all mt-6 md:mt-12'
						dangerouslySetInnerHTML={{ __html: parsedArticle }}
					/>
				) : (
					<p>No details provided.</p>
				)}
			</div>
		</>
	)
}

// export async function generateStaticParams() {
// 	const { data: blogs } = await client.fetch(BLOGS_QUERY)
// 	return blogs.map((blog: any) => ({
// 		slug: blog.slug.current,
// 	}))
// }
