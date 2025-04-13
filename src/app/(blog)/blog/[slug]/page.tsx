import { client } from '@/sanity/lib/client'
import { BLOG_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import markdownit from 'markdown-it'
import Breadcrumbs from '@/components/ui/Breadcrumb'

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
		<div>
			<Breadcrumbs segments={['blog', slug]} blogTitle={post.title} />
			<h1>{post.title}</h1>
			{parsedArticle ? (
				<article
					className='prose break-all'
					dangerouslySetInnerHTML={{ __html: parsedArticle }}
				/>
			) : (
				<p>No details provided.</p>
			)}
		</div>
	)
}

// export async function generateStaticParams() {
// 	const { data: blogs } = await client.fetch(BLOGS_QUERY)
// 	return blogs.map((blog: any) => ({
// 		slug: blog.slug.current,
// 	}))
// }
