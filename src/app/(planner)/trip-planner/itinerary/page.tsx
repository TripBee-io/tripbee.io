const UserTripPlanner = async ({ userId }: { userId: Promise<string> }) => {
	const param = await userId
	console.log(param)
	return <div>UserTripPlanner</div>
}

export default UserTripPlanner
