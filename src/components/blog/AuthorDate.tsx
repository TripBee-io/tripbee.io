import { Author } from '@/sanity/types'
import formatDate from '@/utils/formatDate'
import React from 'react'

const AuthorDate = ({
	author,
	date,
}: {
	author: Author | undefined
	date: string
}) => {
	return (
		<div className='flex items-center justify-start gap-2'>
			<p className='text-[#777E90] text-xs md:text-base'>
				{formatDate(date)}
			</p>
			{author && author.name && (
				<>
					<div className='w-[6px] h-[6px] rounded-full bg-[#000000] bg-opacity-[16%]'></div>
					<p className='text-[#777E90] text-xs md:text-base'>
						{author.name}
					</p>
				</>
			)}
		</div>
	)
}

export default AuthorDate
