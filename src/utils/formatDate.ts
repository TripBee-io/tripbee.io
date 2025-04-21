export default function formatDate(date: string) {
	return new Date(date).toLocaleString('en-US', {
		month: 'long',
		day: 'numeric',
		year: 'numeric',
	})
}
