'use client'

import { useEffect } from 'react'

const AviaSalesCalendarWidget = () => {
	useEffect(() => {
		const script = document.createElement('script')
		script.src =
			'https://tp.media/content?currency=usd&trs=401184&shmarker=617174&target_host=www.aviasales.com%2Fsearch&locale=en&limit=10&powered_by=true&primary=%230085FF&promo_id=4044&campaign_id=100'
		script.async = true

		const container = document.getElementById(
			'travelpayouts-pop-widget-container'
		)
		if (container) {
			container.appendChild(script)
		} else {
			console.error('Widget container not found')
		}
	}, [])

	return (
		<div
			id='travelpayouts-pop-widget-container'
			className='max-w-7xl'></div>
	)
}

export default AviaSalesCalendarWidget
