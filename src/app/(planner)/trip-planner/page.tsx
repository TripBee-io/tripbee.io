// app/components/TripPlanner.tsx

import PlanTripForm from '@/components/planner/PlanTripForm'
import Navbar from '@/components/ui/Navbar'

export default function TripPlanner() {
	return (
		<main className='min-h-[70vh] flex items-center justify-center'>
			<PlanTripForm />
		</main>
	)
}
