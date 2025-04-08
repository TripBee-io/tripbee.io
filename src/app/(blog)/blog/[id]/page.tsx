import { client } from '@/sanity/lib/client'
import { BLOG_BY_ID_QUERY } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import markdownit from 'markdown-it'

const md = markdownit()

export const experimental_ppr = true

export default async function BlogDetailsPage({
	params,
}: {
	params: Promise<{ id: string }>
}) {
	const id = (await params).id

	const post = await client.fetch(BLOG_BY_ID_QUERY, { id })

	if (!post) return notFound()

	const parsedArticle = md.render(post?.article || '')

	return (
		<div>
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
