import AviasalesFlightScheduleWidget from '@/components/AviaSalesFlightScheduleWidget'
import AviasalesMapWidget from '@/components/AviaSalesMapWidget'
import AviasalesSearchFormWidget from '@/components/AviaSalesSearchFormWidget'

export default function Home() {
	return (
		<div className='bg-[#47B1E0] text-black min-h-screen w-screen flex space-y-[64px] items-center justify-center'>
			<AviasalesSearchFormWidget />
			<AviasalesFlightScheduleWidget />
			<AviasalesMapWidget />
		</div>
	)
}
