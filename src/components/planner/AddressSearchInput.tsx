'use client'

import { useState, useEffect, useRef, useCallback } from 'react'
import type { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js'

export function AddressSearchInput() {
	const [input, setInput] = useState('')
	const [predictions, setPredictions] = useState<PlaceAutocompleteResult[]>(
		[]
	)
	const [isOpen, setIsOpen] = useState(false)
	const timeoutRef = useRef<NodeJS.Timeout | null>(null)
	const controllerRef = useRef<AbortController | null>(null)

	const debouncedFetch = useCallback((searchTerm: string) => {
		if (timeoutRef.current) clearTimeout(timeoutRef.current)

		timeoutRef.current = setTimeout(async () => {
			if (controllerRef.current) {
				controllerRef.current.abort()
			}

			controllerRef.current = new AbortController()

			try {
				const response = await fetch(
					'/api/location/google/autocomplete',
					{
						method: 'POST',
						headers: { 'Content-Type': 'application/json' },
						body: JSON.stringify({ input: searchTerm }),
						signal: controllerRef.current.signal,
					}
				)

				if (!response.ok) throw new Error(response.statusText)

				const data = await response.json()
				setPredictions(data.predictions || [])
				setIsOpen(data.predictions?.length > 0)
			} catch (err) {
				if (err instanceof Error && err.name !== 'AbortError') {
					console.error('Fetch error:', err)
					setPredictions([])
					setIsOpen(false)
				}
			}
		}, 150)
	}, [])

	useEffect(() => {
		if (!input.trim()) {
			setPredictions([])
			setIsOpen(false)
			return
		}

		debouncedFetch(input)

		return () => {
			if (timeoutRef.current) clearTimeout(timeoutRef.current)
			if (controllerRef.current) controllerRef.current.abort()
		}
	}, [input, debouncedFetch])

	return (
		<div className='flex flex-col gap-2 w-full'>
			<label
				htmlFor='location'
				className='font-bold text-sm text-black'>
				Where to?
			</label>
			<div className='relative'>
				<input
					type='text'
					name='location'
					id='location'
					value={input}
					onChange={(e) => setInput(e.target.value)}
					placeholder='Eg: Paris, London, Japan'
					className='border-[1.5px] border-[#E6E8EC] rounded-xl py-[18px] px-5 placeholder:text-lightText w-full'
				/>

				{isOpen && (
					<div className='absolute top-full left-0 right-0 z-10 mt-1 bg-white border border-[#E6E8EC] rounded-xl shadow-lg max-h-60 overflow-y-auto custom-scrollbar'>
						{predictions.map((p) => (
							<button
								key={p.place_id}
								type='button'
								onClick={() => {
									setInput(p.description)
									setIsOpen(false)
								}}
								className='w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors'>
								{p.description}
							</button>
						))}
					</div>
				)}
			</div>
		</div>
	)
}
