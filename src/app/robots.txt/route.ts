export async function GET(request: Request): Promise<Response> {
	const url = new URL(request.url)
	let robotsTxt: string

	if (url.hostname === 'stg.tripbee.io') {
		// Staging
		robotsTxt = `User-agent: *
  Disallow: /`
	} else {
		// Production
		robotsTxt = `User-agent: *
  Disallow: /studio/
  Sitemap: https://www.tripbee.io/sitemap.xml`
	}

	return new Response(robotsTxt, {
		status: 200,
		headers: { 'Content-Type': 'text/plain' },
	})
}
