'use client'

import React, { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import {
	Popover,
	PopoverTrigger,
	PopoverContent,
} from '@radix-ui/react-popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import type { DateRange, SelectRangeEventHandler } from 'react-day-picker'

export function DateRangePicker() {
	// allow state to be undefined so we can clear it if needed
	const [range, setRange] = useState<DateRange | undefined>(undefined)
	const from = range?.from
	const to = range?.to

	// adapter handles `undefined` payloads
	const handleSelect: SelectRangeEventHandler = (selected) => {
		// if the user clicks outside or clears, `selected` may be undefined
		setRange(selected ?? undefined)
	}

	return (
		<div className='flex flex-col gap-2 w-full'>
			<label className='font-bold text-sm text-black'>Travel Dates</label>
			<Popover>
				<PopoverTrigger asChild>
					<div className='flex gap-5'>
						<Button
							type='button'
							variant='outline'
							className='w-full flex justify-start items-center font-normal px-5 py-[17px] text-sm rounded-xl'>
							<CalendarIcon className='h-4 w-4 opacity-50' />
							{from ? (
								format(from, 'MMM d, yyyy')
							) : (
								<span className='text-lightText'>
									Select start date
								</span>
							)}
						</Button>
						<Button
							type='button'
							variant='outline'
							className='w-full flex justify-start items-center font-normal px-5 py-[17px] text-sm rounded-xl'>
							<CalendarIcon className='h-4 w-4 opacity-50' />
							{to ? (
								format(to, 'MMM d, yyyy')
							) : (
								<span className='text-lightText'>
									Select end date
								</span>
							)}
						</Button>
					</div>
				</PopoverTrigger>

				<PopoverContent
					align='center'
					className='p-0'>
					<Calendar
						mode='range'
						selected={range}
						onSelect={handleSelect}
						numberOfMonths={2}
					/>
				</PopoverContent>
			</Popover>

			<input
				type='hidden'
				name='startDate'
				value={from ? format(from, 'yyyy-MM-dd') : ''}
			/>
			<input
				type='hidden'
				name='endDate'
				value={to ? format(to, 'yyyy-MM-dd') : ''}
			/>
		</div>
	)
}
