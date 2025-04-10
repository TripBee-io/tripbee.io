/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {},
			fontFamily: {
				sans: ['var(--font-dm-sans)', 'ui-sans-serif', 'system-ui'],
			},
		},
	},
	plugins: [
		require('tailwindcss-animate'),
		require('@tailwindcss/typography'),
	],
}
