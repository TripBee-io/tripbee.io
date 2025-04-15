import { Author, Blog } from '@/sanity/types'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import React from 'react'
import AuthorDate from './AuthorDate'

export type BlogTypeCard = Omit<Blog, 'author'> & { author?: Author }
const BlogCard = ({ post }: { post: BlogTypeCard }) => {
	const { _createdAt, author, title, slug, image, _id } = post

	// const authorId = author?._id
	// console.log(author)

	if (!slug || !slug.current) return notFound()

	return (
		<Link
			href={`/blog/${slug.current}`}
			className='text-black'>
			{image && (
				<Image
					src={image}
					width={325}
					height={256}
					alt='Blog image'
					className='rounded-3xl mb-5'
				/>
			)}
			{/* <div className='flex items-center justify-start gap-2 pt-5'>
				<p className='text-[#777E90] text-xs'>
					{formatDate(_createdAt)}
				</p>
				{author && author.name && (
					<>
						<div className='w-[6px] h-[6px] rounded-full bg-[#000000] bg-opacity-[16%]'></div>
						<p className='text-[#777E90] text-xs'>{author.name}</p>
					</>
				)}
			</div> */}
			<AuthorDate
				date={_createdAt}
				author={author}
			/>
			<p className='font-bold text-xl pt-2'>{title}</p>
		</Link>
	)
}

export default BlogCard
