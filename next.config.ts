import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	async rewrites() {
		return [
			{
				source: '/ingest/static/:path*',
				destination: 'https://eu-assets.i.posthog.com/static/:path*',
			},
			{
				source: '/ingest/:path*',
				destination: 'https://eu.i.posthog.com/:path*',
			},
			{
				source: '/ingest/decide',
				destination: 'https://eu.i.posthog.com/decide',
			},
		]
	},
	// This is required to support PostHog trailing slash API requests
	skipTrailingSlashRedirect: true,
	images: {
		domains: ['www.akshaybenny.com'], // allow loading images from this domain
	},
	experimental: {
		ppr: 'incremental',
	},
	devIndicators: {
		appIsrStatus: true,
		buildActivity: true,
		buildActivityPosition: 'bottom-right',
	},
	typescript: {
		ignoreBuildErrors: true,
	},
	eslint: {
		ignoreDuringBuilds: true,
	},
}

export default nextConfig
