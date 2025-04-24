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

interface DatePickerProps {
	name: string
	label: string
	minDate?: Date
	maxDate?: Date
}

export function DatePicker({ name, label, minDate, maxDate }: DatePickerProps) {
	const [date, setDate] = useState<Date | undefined>()

	return (
		<div className='flex flex-col gap-2 w-full '>
			<label
				htmlFor={name}
				className='font-bold text-sm text-black'>
				{label}
			</label>
			<Popover>
				<PopoverTrigger asChild>
					<Button
						variant='outline'
						className='w-full justify-start font-normal'>
						{date ? (
							format(date, 'PPP')
						) : (
							<span className='text-lightText'>
								Select {label.toLowerCase()}
							</span>
						)}
						<CalendarIcon className='ml-auto h-4 w-4 opacity-50' />
					</Button>
				</PopoverTrigger>
				<PopoverContent
					align='center'
					className='p-0'>
					<Calendar
						mode='single'
						selected={date}
						onSelect={(d: Date | undefined) => setDate(d)}
						disabled={(d: Date) =>
							(minDate ? d < minDate : false) ||
							(maxDate ? d > maxDate : false)
						}
						initialFocus
					/>
				</PopoverContent>
			</Popover>
			<input
				type='hidden'
				name={name}
				value={date ? format(date, 'yyyy-MM-dd') : ''}
			/>
		</div>
	)
}
