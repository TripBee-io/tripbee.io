/** @type {import('tailwindcss').Config} */
module.exports = {
	darkMode: ['class'],
	content: [
		'./src/pages/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/components/**/*.{js,ts,jsx,tsx,mdx}',
		'./src/app/**/*.{js,ts,jsx,tsx,mdx}',
	],
	theme: {
		extend: {
			colors: {
				darkText: '#23262F',
				brightBg: '#F03800',
				greyBackground: '#F3F4F5',
				darkGrey: '#777E90',
			},
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
