'use client'

import * as React from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { DayPicker } from 'react-day-picker'

import { cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
	className,
	classNames,
	showOutsideDays = true,
	...props
}: CalendarProps) {
	return (
		<DayPicker
			showOutsideDays={showOutsideDays}
			className={cn(
				'px-5 py-[18px] bg-white rounded-[12px] shadow-lg border-[1.5px] border-[#E6E8EC]',
				className
			)}
			classNames={{
				months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
				month: 'space-y-4',
				caption: 'flex justify-center pt-1 relative items-center',
				caption_label: 'text-sm font-medium',
				nav: 'space-x-1 flex items-center',
				nav_button: cn(
					buttonVariants({ variant: 'outline' }),
					'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'
				),
				nav_button_previous: 'absolute left-1',
				nav_button_next: 'absolute right-1',
				table: 'w-full border-collapse space-y-1',
				head_row: 'flex',
				head_cell:
					'text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]',
				row: 'flex w-full mt-2',

				// each cell container: no generic selected colouring here
				cell: cn(
					'relative p-0 text-center text-sm focus-within:relative focus-within:z-20',
					// light hover for any cell
					'hover:bg-[#F5802F]/50 rounded-md',
					// rounding for range endpoints
					props.mode === 'range'
						? '[&:has(>.day-range-start)]:rounded-l-md [&:has(>.day-range-end)]:rounded-r-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md'
						: '',
					classNames?.cell
				),

				// the <button> inside each cell
				day: cn(
					buttonVariants({ variant: 'ghost' }),
					'h-8 w-8 p-0 font-normal aria-selected:opacity-100'
				),

				// single-day selection (non-range)
				day_selected:
					'bg-[#FF641A] text-white hover:bg-[#FF641A] focus:bg-[#FF641A] focus:text-white',

				// range endpoints
				day_range_start: 'day-range-start bg-[#FF641A] text-white',
				day_range_end: 'day-range-end   bg-[#FF641A] text-white',

				// in-between days at 10% opacity of #F5802F
				day_range_middle:
					'day-range-middle bg-[#F5802F]/10 text-[#001E48] opacity-100',

				// today marker
				day_today: 'border border-[#FF641A] text-[#FF641A]',

				// outside days
				day_outside: 'day-outside text-muted-foreground',

				// disabled, hidden
				day_disabled: 'text-muted-foreground opacity-50',
				day_hidden: 'invisible',

				// allow overrides via props
				...classNames,
			}}
			components={{
				IconLeft: ({ className, ...props }) => (
					<ChevronLeft
						className={cn('h-4 w-4', className)}
						{...props}
					/>
				),
				IconRight: ({ className, ...props }) => (
					<ChevronRight
						className={cn('h-4 w-4', className)}
						{...props}
					/>
				),
			}}
			{...props}
		/>
	)
}

Calendar.displayName = 'Calendar'
export { Calendar }
