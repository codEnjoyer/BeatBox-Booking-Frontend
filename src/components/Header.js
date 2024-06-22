import Link from "next/link"
import Image from "next/image"

export default function Header() {
	return (
		<header className="flex justify-between items-center container py-5 relative">
			<Link href="/" className="text-2xl font-semibold flex gap-2 items-center">
				<Image src="/logo.svg" alt="" width={32} height={32} /> BoomBox Booking</Link>
			<Link href="/user" className="flex gap-2.5 items-center">Артемий В.
				<Image src={"/account_circle.svg"} alt={"Профиль"} width={32} height={32} />
			</Link>
		</header>
	)
}
