import Planner from '@/components/planner/Planner'
import Navbar from '@/components/ui/Navbar'

const UserTripPlannerPage = async ({
	searchParams,
}: {
	searchParams: Promise<{
		location?: string
		travelers?: string
		budget?: string
		days?: number
		startDate?: string
		endDate?: string
	}>
}) => {
	const { location, travelers, budget, days, startDate, endDate } =
		await searchParams

	if (!location || !travelers || !budget || !startDate || !endDate || !days)
		return <div>Invalid page</div>

	return (
		<>
			<Planner
				location={location}
				travelers={travelers}
				budget={budget}
				days={days}
				startDate={startDate}
				endDate={endDate}
			/>
		</>
	)
}

export default UserTripPlannerPage
