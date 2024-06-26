import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

export default function RoomCard({ room, studioId }) {
	const router = useRouter()

	return <Link href={`/studio/${studioId}/room/${room.id}`} className="block bg-black room-card rounded-md overflow-hidden max-w-[360px]">

		<div className="wide-image-parent">
			<Image className="max-h-[280px] max-w-full object-cover" src={room.image} width={360} height={280} alt=""/>
		</div>

		<div className="top flex flex-col justify-between mb-1.5 p-3">
			<span className="title block text-lg font-semibold">{room.name}</span>
			<p className="text-sm mt-1.5 text-secondary">{room.description}</p>
		</div>

	</Link>
}