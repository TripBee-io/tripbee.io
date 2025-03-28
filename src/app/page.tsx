import Companies from '@/components/Companies'
import Hero from '@/components/Hero'

export default function Home() {
	return (
		<div className='text-black min-h-screen max-w-screen'>
			<Hero />
			<Companies />
		</div>
	)
}
