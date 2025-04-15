export async function GET(_request: Request): Promise<Response> {
	const robotsTxt = `User-agent: *
  Disallow: /private/
  Disallow: /studio/
  Disallow: stg/tripbee.io/
  
  Sitemap: https://www.tripbee.io/sitemap.xml`
	return new Response(robotsTxt, {
		status: 200,
		headers: { 'Content-Type': 'text/plain' },
	})
}
