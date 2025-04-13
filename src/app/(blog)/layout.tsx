import Navbar from '@/components/ui/Navbar'
import 'easymde/dist/easymde.min.css'
export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<main className='px-4 md:px-0'>
			<Navbar />
			{children}
		</main>
	)
}
