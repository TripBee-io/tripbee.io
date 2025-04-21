import Footer from '@/components/ui/Footer'
import Navbar from '@/components/ui/Navbar'
import 'easymde/dist/easymde.min.css'
export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<main className=''>
			<Navbar />
			{children}
			<Footer />
		</main>
	)
}
