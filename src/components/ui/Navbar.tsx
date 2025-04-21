// import { auth, signIn, signOut } from '@/auth'
import Image from 'next/image'
import Link from 'next/link'

const Navbar = async () => {
	// const session = await auth()

	return (
		<nav className='flex justify-between items-center w-full gap-6 py-8 max-w-6xl mx-auto hor-padding'>
			<div className='flex items-center justify-start gap-6'>
				<Link href='/'>
					<Image
						src='/logo-orange.svg'
						alt='Tripbee logo'
						height={100}
						width={100}
					/>
				</Link>
				{/* <Link href='/flights'>
					<p>Flights</p>
				</Link>
				<Link href='/stays'>
					<p>Stays</p>
				</Link>
				<Link href='/rental'>
					<p>Rental</p>
				</Link>
				<Link href='/trip-planner'>
					<p>Trip Planner</p>
				</Link>
				<Link href='/blog'>
					<p>Blog</p>
				</Link> */}
			</div>
			{/* <div className='flex items-center justify-end gap-6'>
				<Link href='/support'>
					<p>Support</p>
				</Link>
				<Link href='/language'>
					<p>Language</p>
				</Link>
				{session && session?.user ? (
					<form
						action={async () => {
							'use server'
							await signOut({ redirectTo: '/blog' })
						}}>
						<button
							type='submit'
							className='bg-[#F03800] rounded-full py-4 px-5 font-bold text-base text-white w-full max-w-24'>
							Logout
						</button>
					</form>
				) : (
					<form
						action={async () => {
							'use server'
							await signIn('google')
						}}>
						<button
							type='submit'
							className='bg-[#F03800] rounded-full py-4 px-5 font-bold text-base text-white w-full max-w-24'>
							Login
						</button>
					</form>
				)}
			</div> */}
		</nav>
	)
}

export default Navbar
