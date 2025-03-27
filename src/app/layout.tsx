import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import Script from 'next/script'
import { PostHogProvider } from '../components/PostHogProvider'

const geistSans = Geist({
	variable: '--font-geist-sans',
	subsets: ['latin'],
})

const geistMono = Geist_Mono({
	variable: '--font-geist-mono',
	subsets: ['latin'],
})

export const metadata: Metadata = {
	title: 'TripBee',
	description: 'Find your flight destination now.',
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
					src='https://emrldtp.cc/NDAxMTg0.js?t=401184'
					strategy='afterInteractive'
					async
					data-noptimize='1'
					data-cfasync='false'
					data-wpfc-render='false'
				/>
			</head>
			<body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
				<PostHogProvider>
					{children}
				</PostHogProvider>
			</body>
		</html>
	)
}
