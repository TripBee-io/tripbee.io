import Navbar from '@/components/Navbar'
import 'easymde/dist/easymde.min.css'
export default function Layout({
	children,
}: Readonly<{ children: React.ReactNode }>) {
	return (
		<main>
			<Navbar />
			{children}
		</main>
	)
}
