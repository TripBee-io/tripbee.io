import AviaSalesCalendarWidget from '@/components/AviaSalesCalendarWidget'
import AviasalesFlightScheduleWidget from '@/components/AviaSalesFlightScheduleWidget'
import AviasalesMapWidget from '@/components/AviaSalesMapWidget'
import AviaSalesPopularWidget from '@/components/AviaSalesPopularWidget'
import AviasalesSearchFormWidget from '@/components/AviaSalesSearchFormWidget'
import Modal from '@/components/Modal'

export default function Home() {
	return (
		<div className='bg-[#47B1E0] text-black min-h-screen max-w-screen flex flex-col space-y-[64px] items-center justify-center relative py-20'>
			{/* <Modal /> */}
			<AviasalesSearchFormWidget />
			<AviasalesFlightScheduleWidget />
			<AviasalesMapWidget />
			<AviaSalesCalendarWidget />
			<AviaSalesPopularWidget />
		</div>
	)
}
