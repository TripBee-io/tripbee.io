import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { PostHogProvider } from '../components/PostHogProvider'
import { Analytics } from '@vercel/analytics/react'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'Organization',
	name: 'Tripbee.io',
	url: 'https://tripbee.io',
	logo: 'https://tripbee.io/fav.svg', // Example: link to your actual logo
	sameAs: [
		'https://www.instagram.com/tripbee',
		'https://www.twitter.com/tripbee',
	],
	contactPoint: [
		{
			'@type': 'ContactPoint',
			telephone: '+1-555-TRIPBEE',
			contactType: 'Customer Support',
		},
	],
}

export const metadata: Metadata = {
	title: 'Tripbee.io | Find and Book Flights Easily',
	icons: 'fav.svg',
	description:
		'Tripbee.io helps you find the best flights at the best prices. Book your dream trip with ease and confidence.',
	keywords: [
		'tripbee',
		'travel',
		'flights',
		'flight comparison',
		'cheap flights',
		'airline tickets',
	],
	robots: 'index, follow',
	openGraph: {
		title: 'Tripbee.io | Find and Book Flights Easily',
		description:
			'Tripbee.io helps you find the best flights at the best prices. Book your dream trip with ease and confidence.',
		url: 'https://tripbee.io',
		images: [
			{
				url: 'https://tripbee.io/opengraph.png',
				width: 1200,
				height: 630,
			},
		],
	},
	alternates: {
		canonical: 'https://tripbee.io',
	},
}
export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en'>
			<head>
				<Script
					id='json-ld'
					type='application/ld+json'
					strategy='beforeInteractive'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>
				<Script
					src='https://emrldtp.cc/NDAxMTg0.js?t=401184'
					strategy='afterInteractive'
					async
					data-noptimize='1'
					data-cfasync='false'
					data-wpfc-render='false'
				/>
			</head>
			<body
				className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<Analytics />
				<PostHogProvider>{children}</PostHogProvider>
			</body>
		</html>
	)
}
