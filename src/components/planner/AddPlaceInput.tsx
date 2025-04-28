'use client'

import { PlaceAutocompleteResult } from '@googlemaps/google-maps-services-js'
import { MapPinIcon } from 'lucide-react'
import { useCallback, useEffect, useRef, useState } from 'react'

interface AddPlaceInputProps {
	onSelect: (place: PlaceAutocompleteResult) => void
}
const AddPlaceInput = ({ onSelect }: AddPlaceInputProps) => {
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
				console.log(data)
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

	const submitHandler = async () => {}
	return (
		<form
			onSubmit={submitHandler}
			className='w-full flex items-center justify-start gap-[10px] bg-[#F5F5F5] pl-5 rounded-[12px] relative'>
			<MapPinIcon className='text-[#999999]' />
			<input
				className='w-full py-[15px] ring-0 border-none outline-none bg-[#F5F5F5] placeholder:text-[#999999]'
				type='text'
				value={input}
				onChange={(e) => setInput(e.target.value)}
				placeholder='Add a place'
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
								onSelect(p)
							}}
							className='w-full text-left px-5 py-3 hover:bg-gray-50 transition-colors'>
							{p.description}
						</button>
					))}
				</div>
			)}
		</form>
	)
}

export default AddPlaceInput
