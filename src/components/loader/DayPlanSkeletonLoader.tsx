export default function DayPlanSkeletonLoader({ day }: { day: string }) {
	return (
		<section className='mx-12 animate-pulse'>
			<div className='h-6 w-24 mb-4 bg-gray-200 rounded' />

			<div className='h-10 mb-6 bg-gray-200 rounded' />

			<div className='flex justify-start items-end gap-2'>
				{Array.from({ length: 4 }).map((_, i) => (
					<div
						key={i}
						className='h-[111px] w-[203px] bg-gray-200 rounded-lg'
					/>
				))}
			</div>
		</section>
	)
}
