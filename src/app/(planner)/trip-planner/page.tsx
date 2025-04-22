// app/components/TripPlanner.tsx

import PlanTripForm from '@/components/planner/PlanTripForm'

// interface LocationData {
// 	name: string
// 	description: string
// 	coordinates: { lat: number; lng: number }
// 	googleImage: string
// 	cost: string
// 	idealTime: string
// 	visitDuration: string
// 	type: string
// 	rating: number
// }

export default function TripPlanner() {
	// const [itinerary, setItinerary] = useState<Record<string, LocationData[]>>(
	// 	{}
	// )
	// const [loading, setLoading] = useState(false)
	// const [error, setError] = useState<string | null>(null)
	// const [input, setInput] = useState({
	// 	days: '3',
	// 	location: 'Las Vegas',
	// 	travelers: 'couple',
	// 	budget: 'cheap',
	// })

	// const handleSubmit = async (e: React.FormEvent) => {
	// 	e.preventDefault()
	// 	setLoading(true)
	// 	setError(null)
	// 	setItinerary({})

	// 	try {
	// 		const res = await fetch('/api/ai/gemini/generate/trip', {
	// 			method: 'POST',
	// 			headers: { 'Content-Type': 'application/json' },
	// 			body: JSON.stringify({
	// 				days: parseInt(input.days),
	// 				location: input.location,
	// 				travelers: input.travelers,
	// 				budget: input.budget,
	// 			}),
	// 		})

	// 		if (!res.ok) {
	// 			throw new Error(`HTTP error! status: ${res.status}`)
	// 		}

	// 		const data = await res.json()
	// 		console.log(data)
	// 		setItinerary(data)
	// 	} catch (err) {
	// 		setError(
	// 			err instanceof Error ? err.message : 'Failed to generate plan'
	// 		)
	// 	} finally {
	// 		setLoading(false)
	// 	}
	// }

	return (
		<main className='min-h-[70vh] flex items-center justify-center'>
			<PlanTripForm />
		</main>
	)
}

// <div className='p-4 max-w-4xl mx-auto'>
// 			<form
// 				onSubmit={handleSubmit}
// 				className='mb-8'>
// 				<div className='grid grid-cols-1 md:grid-cols-4 gap-4'>
// 					<input
// 						type='number'
// 						value={input.days}
// 						onChange={(e) =>
// 							setInput((p) => ({ ...p, days: e.target.value }))
// 						}
// 						className='p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none'
// 						placeholder='Number of days'
// 						min='1'
// 						max='10'
// 						required
// 					/>
// 					<input
// 						type='text'
// 						value={input.location}
// 						onChange={(e) =>
// 							setInput((p) => ({
// 								...p,
// 								location: e.target.value,
// 							}))
// 						}
// 						className='p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none'
// 						placeholder='Destination'
// 						required
// 					/>
// 					<select
// 						value={input.travelers}
// 						onChange={(e) =>
// 							setInput((p) => ({
// 								...p,
// 								travelers: e.target.value,
// 							}))
// 						}
// 						className='p-2 border rounded focus:ring-2 focus:ring-blue-500 outline-none'>
// 						<option value='solo'>Solo</option>
// 						<option value='couple'>Couple</option>
// 						<option value='family'>Family</option>
// 						<option value='friends'>Friends</option>
// 					</select>
// 					<button
// 						type='submit'
// 						disabled={loading}
// 						className='bg-blue-500 text-white p-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition-colors'>
// 						{loading ? 'Generating Plan...' : 'Generate Trip Plan'}
// 					</button>
// 				</div>
// 			</form>

// 			{error && (
// 				<div className='mb-4 p-4 bg-red-100 text-red-700 rounded-lg'>
// 					Error: {error}
// 				</div>
// 			)}

// 			<div className='space-y-8'>
// 				{Object.entries(itinerary).map(([day, locations]) => (
// 					<div
// 						key={day}
// 						className='animate-fade-in'>
// 						<h2 className='text-2xl font-bold mb-4 text-gray-800'>
// 							{day}
// 						</h2>
// 						<div className='space-y-4'>
// 							{locations.map((location, index) => (
// 								<div
// 									key={`${day}-${index}`}
// 									className='border border-gray-200 p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow'>
// 									<div className='flex flex-col md:flex-row gap-4'>
// 										<img
// 											src={location.googleImage}
// 											alt={location.name}
// 											className='w-full md:w-48 h-48 object-cover rounded-lg'
// 										/>
// 										<div className='flex-1'>
// 											<h3 className='text-xl font-semibold text-gray-900 mb-2'>
// 												{location.name}
// 											</h3>
// 											<p className='text-gray-600 mb-3'>
// 												{location.description}
// 											</p>

// 											<div className='grid grid-cols-1 md:grid-cols-2 gap-2 text-sm'>
// 												<div className='flex items-center gap-1'>
// 													<span className='font-medium text-gray-700'>
// 														Cost:
// 													</span>
// 													<span className='text-gray-600'>
// 														{location.cost}
// 													</span>
// 												</div>
// 												<div className='flex items-center gap-1'>
// 													<span className='font-medium text-gray-700'>
// 														Best Time:
// 													</span>
// 													<span className='text-gray-600'>
// 														{location.idealTime}
// 													</span>
// 												</div>
// 												<div className='flex items-center gap-1'>
// 													<span className='font-medium text-gray-700'>
// 														Duration:
// 													</span>
// 													<span className='text-gray-600'>
// 														{location.visitDuration}
// 													</span>
// 												</div>
// 												<div className='flex items-center gap-1'>
// 													<span className='font-medium text-gray-700'>
// 														Rating:
// 													</span>
// 													<span className='text-gray-600'>
// 														{location.rating}/5
// 													</span>
// 												</div>
// 												<div className='col-span-full flex items-center gap-1'>
// 													<span className='font-medium text-gray-700'>
// 														Coordinates:
// 													</span>
// 													<span className='text-gray-600'>
// 														{location.coordinates.lat.toFixed(
// 															4
// 														)}
// 														,{' '}
// 														{location.coordinates.lng.toFixed(
// 															4
// 														)}
// 													</span>
// 												</div>
// 											</div>
// 										</div>
// 									</div>
// 								</div>
// 							))}
// 						</div>
// 					</div>
// 				))}
// 			</div>

// 			{loading && !error && (
// 				<div className='text-center p-4 text-gray-500'>
// 					Generating your perfect itinerary...
// 				</div>
// 			)}
// 		</div>
