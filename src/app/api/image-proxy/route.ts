// src/app/api/image-proxy/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
	const { searchParams } = new URL(req.url)
	const url = searchParams.get('url')
	if (!url) {
		return NextResponse.json({ error: 'Missing url' }, { status: 400 })
	}

	// Fetch the 302 → final image
	const res = await fetch(url)
	if (!res.ok) {
		return NextResponse.json(
			{ error: 'Image fetch failed' },
			{ status: 500 }
		)
	}

	// Read bytes and forward them
	const arrayBuffer = await res.arrayBuffer()
	const buffer = Buffer.from(arrayBuffer)
	const contentType = res.headers.get('content-type') || 'image/jpeg'

	return new NextResponse(buffer, {
		status: 200,
		headers: { 'Content-Type': contentType },
	})
}
