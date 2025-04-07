import { Author, Blog } from '@/sanity/types'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

export type BlogTypeCard = Omit<Blog, 'author'> & { author?: Author }
const BlogCard = ({ post }: { post: BlogTypeCard }) => {
	const {
		_createdAt,
		views,
		author,
		title,
		category,
		_id,
		image,
		description,
	} = post

	const authorId = author?._id
	return (
		<div className='text-black'>
			<p>{title}</p>
			{image && (
				<Image
					src={image}
					width={100}
					height={100}
					alt='Blog image'
				/>
			)}
			<Link href={`/blog/${_id}`}>Read more</Link>
		</div>
	)
}

export default BlogCard
