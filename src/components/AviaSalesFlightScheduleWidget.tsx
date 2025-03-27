'use client'

import { useEffect } from 'react'

const AviasalesFlightScheduleWidget = () => {
	useEffect(() => {
		const script = document.createElement('script')
		script.src =
			'https://tp.media/content?currency=usd&trs=401184&shmarker=617174.search_form&color_button=%23FF0000&target_host=www.aviasales.com%2Fsearch&locale=en&powered_by=true&origin=LON&destination=BKK&with_fallback=false&non_direct_flights=true&min_lines=5&border_radius=14&color_background=%23FFFFFF&color_text=%23000000&color_border=%23FFFFFF&promo_id=2811&campaign_id=100'
		script.async = true

		const container = document.getElementById(
			'travelpayouts-sch-widget-container'
		)
		if (container) {
			container.appendChild(script)
		} else {
			console.error('Widget container not found')
		}
	}, [])

	return <div id='travelpayouts-sch-widget-container' className='max-w-7xl'></div>
}

export default AviasalesFlightScheduleWidget
