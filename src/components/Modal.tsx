'use client'

import { useState } from 'react'
import AviasalesMapWidget from './AviaSalesMapWidget'

const Modal = () => {
	const [visible, setVisible] = useState(true)

	if (!visible) {
		return null
	}

	return (
		<div className='absolute left-[50%] top-[50%] z-40'>
			<button onClick={() => setVisible(false)}>Close</button>
			<AviasalesMapWidget />
		</div>
	)
}

export default Modal
