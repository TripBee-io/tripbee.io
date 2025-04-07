'use client'

import { useEffect } from 'react'

const AviaSalesCalendarWidget = () => {
	useEffect(() => {
		const script = document.createElement('script')
		script.src =
			'https://tp.media/content?currency=usd&trs=401184&shmarker=617174&searchUrl=www.aviasales.com%2Fsearch&locale=en&powered_by=true&one_way=false&only_direct=false&period=year&range=7%2C14&primary=%230C73FE&color_background=%23ffffff&dark=%23262626&light=%23FFFFFF&achieve=%2345AD35&promo_id=4041&campaign_id=100'
		script.async = true

		const container = document.getElementById(
			'travelpayouts-cal-widget-container'
		)
		if (container) {
			container.appendChild(script)
		} else {
			console.error('Widget container not found')
		}
	}, [])

	return (
		<div
			id='travelpayouts-cal-widget-container'
			className='max-w-7xl'></div>
	)
}

export default AviaSalesCalendarWidget
