import Link from "next/link"

export default function Header() {
	return (
		<header className="flex justify-between items-center container py-5 relative">
			<Link href="/" className="text-2xl font-semibold">BoomBox Booking</Link>
			<Link href="/user">Артемий В.</Link>
		</header>
	)
}
