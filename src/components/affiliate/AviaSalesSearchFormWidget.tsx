'use client'

import { useEffect } from 'react'

const AviasalesSearchFormWidget = () => {
	useEffect(() => {
		const script = document.createElement('script')
		script.src =
			'https://tp.media/content?currency=usd&trs=401184&shmarker=617174&show_hotels=true&powered_by=true&locale=en&searchUrl=www.aviasales.com%2Fsearch&primary_override=%23F03800&color_button=%23F03800&color_icons=%23F03800&dark=%23262626&light=%23FFFFFF&secondary=%23FFFFFF&special=%23C4C4C4&color_focused=%23F03800&border_radius=11&no_labels=&plain=true&promo_id=7879&campaign_id=100'
		script.async = true

		const container = document.getElementById(
			'travelpayouts-form-widget-container'
		)
		if (container) {
			container.appendChild(script)
		} else {
			console.error('Widget container not found')
		}
	}, [])

	return (
		<div
			id='travelpayouts-form-widget-container'
			className=''></div>
	)
}

export default AviasalesSearchFormWidget
