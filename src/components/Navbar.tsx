import { auth, signIn, signOut } from '@/auth'

const Navbar = async () => {
	const session = await auth()
	console.log(session)
	return (
		<div>
			{session && session?.user ? (
				<form
					action={async () => {
						'use server'
						await signOut({ redirectTo: '/blog' })
					}}>
					<button
						type='submit'
						className='bg-black text-white'>
						Logout
					</button>
				</form>
			) : (
				<form
					action={async () => {
						'use server'
						await signIn('google')
					}}>
					<button type='submit'>Login</button>
				</form>
			)}
		</div>
	)
}

export default Navbar
