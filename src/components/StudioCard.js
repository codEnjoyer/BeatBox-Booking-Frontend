import Image from "next/image"
import Link from "next/link"


export default function StudioCard({ studio }) {
	return <Link href={`/studio/${studio.id}`} className="block cool-card max-w-[360px]">
		<div className="top flex justify-between mb-4 items-center">
			<span className="title block text-lg font-semibold">{studio.title}</span>
			<div className="details flex gap-4 text-sm text-secondary">
				<span>{studio.openTime} — {studio.closeTime}</span>
				<span className="title">★ {studio.rating}</span>
			</div>
		</div>
		<Image className="mb-4 max-w-[320px] max-h-[150px] object-cover" src={studio.image} alt="" width={320} height={150} />
		{studio.desc}
	</Link>
}
