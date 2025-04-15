// src/components/Breadcrumbs.tsx
import Link from 'next/link'
import React from 'react'

interface Breadcrumb {
	label: string
	href: string
}

interface BreadcrumbsProps {
	/**
	 * An array of route segments.
	 * For example:
	 * - Blog homepage: ['blog']
	 * - Blog detail: ['blog', 'a-test-readme']
	 */
	segments: string[]
	/**
	 * Optionally provide the blog post title for blog detail pages.
	 * If provided, this is used as the final breadcrumb label.
	 */
	blogTitle?: string
}

export default function Breadcrumbs({ segments, blogTitle }: BreadcrumbsProps) {
	// Start with the Home link.
	const crumbs: Breadcrumb[] = [{ label: 'Home', href: '/' }]

	// Handle the /blog branch of routes.
	if (segments[0]?.toLowerCase() === 'blog') {
		crumbs.push({ label: 'Blog', href: '/blog' })
		// If there's a second segment then we're on a detail page.
		if (segments.length > 1) {
			crumbs.push({
				label: blogTitle ? blogTitle : segments[1],
				href: `/blog/${segments[1]}`,
			})
		}
	} else {
		// In case you want a generic handler for other pages.
		let currentPath = ''
		segments.forEach((segment) => {
			currentPath += `/${segment}`
			crumbs.push({
				label: segment.charAt(0).toUpperCase() + segment.slice(1),
				href: currentPath,
			})
		})
	}

	return (
		<nav
			aria-label='Breadcrumb'
			className='bg-greyBackground py-3 md:py-[14px]'>
			<ol className='flex items-center space-x-2 max-w-6xl mx-auto hor-padding'>
				{crumbs.map((crumb, index) => (
					<li
						key={index}
						className='flex items-center'>
						<Link href={crumb.href}>
							<span
								className={`text-sm font-medium ${
									index < crumbs.length
										? 'text-darkGrey'
										: 'text-black text-opacity-[24%]'
								} hover:text-gray-700`}>
								{crumb.label}
							</span>
						</Link>
						{index < crumbs.length - 1 && (
							<svg
								className='h-4 w-4 text-gray-400 mx-2'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
								fill='currentColor'
								aria-hidden='true'>
								<path
									fillRule='evenodd'
									d='M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z'
									clipRule='evenodd'
								/>
							</svg>
						)}
					</li>
				))}
			</ol>
		</nav>
	)
}
