import { redirect } from 'next/navigation'
import { differenceInDays } from 'date-fns'
import { DatePicker } from './DatePicker'
import { AddressSearchInput } from './AddressSearchInput'

const PlanTripForm = async () => {
	async function handleSubmit(formData: FormData) {
		'use server'
		const startDateStr = formData.get('startDate') as string
		const endDateStr = formData.get('endDate') as string
		const days = differenceInDays(
			new Date(endDateStr),
			new Date(startDateStr)
		).toString()

		const params = new URLSearchParams({
			location: formData.get('location') as string,
			travelers: formData.get('travelers') as string,
			budget: formData.get('budget') as string,
			days: days,
			startDate: startDateStr,
			endDate: endDateStr,
		})

		redirect(`/trip-planner/itinerary?${params.toString()}`)
	}

	return (
		<form
			action={handleSubmit}
			className='max-w-lg mx-auto'>
			<h2 className='text-black md:font-black text-[32px] text-center'>
				Plan a new trip
			</h2>
			<p className='text-lightText text-sm text-center'>
				Create trip plan by choosing location and preferred date
			</p>

			<div className='flex flex-col gap-5 mt-8'>
				{/* Location */}
				{/* <div className='flex flex-col gap-2 w-full'> */}
				{/* <label
						htmlFor='location'
						className='font-bold text-sm text-black'>
						Where to?
					</label> */}
				{/* <input
						type='text'
						name='location'
						placeholder='Eg: Paris, London, Japan'
						className='border-[1.5px] border-[#E6E8EC] rounded-xl py-[18px] px-5 placeholder:text-lightText w-full'
					/> */}

				<AddressSearchInput />
				{/* </div> */}

				{/* Travellers & Budget */}
				<div className='flex gap-5'>
					<div className='flex flex-col gap-2 w-full'>
						<label
							htmlFor='travelers'
							className='font-bold text-sm text-black'>
							How many travellers?
						</label>
						<input
							type='text'
							name='travelers'
							placeholder='e.g., 2'
							className='border-[1.5px] border-[#E6E8EC] rounded-xl py-[18px] px-5 placeholder:text-lightText w-full'
						/>
					</div>
					<div className='flex flex-col gap-2 w-full'>
						<label
							htmlFor='budget'
							className='font-bold text-sm text-black'>
							What is your budget?
						</label>
						<input
							type='text'
							name='budget'
							placeholder='e.g., $1500'
							className='border-[1.5px] border-[#E6E8EC] rounded-xl py-[18px] px-5 placeholder:text-lightText w-full'
						/>
					</div>
				</div>

				{/* Date Pickers */}
				<div className='flex gap-5'>
					<DatePicker
						name='startDate'
						label='Start Date'
					/>
					<DatePicker
						name='endDate'
						label='End Date'
					/>
				</div>
			</div>

			<button
				type='submit'
				className='bg-brightOrange px-5 py-4 font-bold text-base text-white rounded-xl w-full mt-8'>
				Start Planning
			</button>
		</form>
	)
}

export default PlanTripForm
