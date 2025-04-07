import React from 'react'
import Form from 'next/form'
const SearchForm = ({ query }: { query?: string }) => {
	return (
		<Form
			action='/blog'
			scroll={false}>
			<input
				name='query'
				defaultValue={query}
				type='text'
				placeholder='Search places'
			/>
			<button type='submit'>Search</button>
		</Form>
	)
}

export default SearchForm
