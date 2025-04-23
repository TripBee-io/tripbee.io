import Planner from '@/components/planner/Planner'

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
		<div>
			<Planner
				location={location}
				travelers={travelers}
				budget={budget}
				days={days}
				startDate={startDate}
				endDate={endDate}
			/>
		</div>
	)
}

export default UserTripPlannerPage
