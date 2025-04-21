import type { Metadata } from 'next'
import './globals.css'
import Script from 'next/script'
import { PostHogProvider } from '../components/PostHogProvider'
import { Analytics } from '@vercel/analytics/react'

import { DM_Sans } from 'next/font/google'

const dmSans = DM_Sans({
	subsets: ['latin'],
	variable: '--font-dm-sans',
})

const jsonLd = {
	'@context': 'https://schema.org',
	'@type': 'TravelAgency',
	name: 'Tripbee',
	url: 'https://tripbee.io',
	logo: 'https://tripbee.io/logo.png',
	image: 'https://tripbee.io/opengraph-tripbee.png',
}

export const metadata: Metadata = {
	title: 'Cheap Flights - Compare & Book Flights Worldwide | TripBee',
	description:
		'Search hundreds of sites to find cheap flights worldwide. Compare airfare deals and book flights online with TripBee. Add a hotel to your flight and save more.',
	icons: {
		icon: '/fav.svg',
	},
	openGraph: {
		title: 'TripBee - Cheap Flights & Travel Deals',
		description:
			'Compare cheap flights from 100+ airlines and travel sites on TripBee. Find the best flight deals and book your flights (and hotels) online at the lowest prices.',
		url: 'https://tripbee.io/',
		siteName: 'TripBee',
		locale: 'en_US',
		type: 'website',
		images: [
			{
				url: 'https://tripbee.io/opengraph-tripbee.png',
				width: 800,
				height: 600,
				alt: 'TripBee - Cheap Flights Search',
			},
		],
	},
	twitter: {
		card: 'summary_large_image',
		title: 'TripBee - Cheap Flights & Flight Comparison',
		description:
			'Find and book cheap flights worldwide with TripBee. We compare flights across hundreds of airlines to get you the best deals. Start your journey here!',
		images: ['https://tripbee.io/opengraph-tripbee.png'],
	},
	alternates: {
		canonical: 'https://www.tripbee.io/',
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
				{/* Google Tag Manager */}
				<Script
					id='gtm-script'
					strategy='beforeInteractive'
					dangerouslySetInnerHTML={{
						__html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'? '&l='+l : '';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;
              f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-5DJKPMHZ');`,
					}}
				/>

				{/* JSON-LD */}
				<Script
					id='json-ld'
					type='application/ld+json'
					strategy='beforeInteractive'
					dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
				/>

				{/* Other third-party scripts */}
				<Script
					src='https://emrldtp.cc/NDAxMTg0.js?t=401184'
					strategy='afterInteractive'
					async
					data-noptimize='1'
					data-cfasync='false'
					data-wpfc-render='false'
				/>
			</head>
			<body className={`${dmSans.variable} antialiased`}>
				{/* Google Tag Manager (noscript) */}
				<noscript>
					<iframe
						src='https://www.googletagmanager.com/ns.html?id=GTM-5DJKPMHZ'
						height='0'
						width='0'
						style={{ display: 'none', visibility: 'hidden' }}
					/>
				</noscript>

				<Analytics />
				<PostHogProvider>{children}</PostHogProvider>
			</body>
		</html>
	)
}
