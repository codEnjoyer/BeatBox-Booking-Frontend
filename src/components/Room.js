import Image from "next/image"
import Link from "next/link"

export default function Room({ room }) {
	return <Link href="/room" className="block cool-card max-w-[360px]">
		<div className="top flex justify-between mb-4">
			<span className="title block text-lg font-semibold">{room.title}</span>
			<span className="title block text-sm text-secondary">от {room.price} ₽</span>
		</div>
		<Image src={room.image} alt="" width={320} height={150} />
		<p className="text-sm mt-4">{room.desc}</p>
	</Link>
}