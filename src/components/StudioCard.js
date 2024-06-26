import Image from "next/image"
import Link from "next/link"
import { openTime } from "@/utils/format";


export default function StudioCard({ studio }) {
	return <Link href={`/studio/${studio.id}`} className="studio-card bg-black rounded-xl overflow-hidden shadow-black/20 shadow-md block max-w-[256px]">
		<div className="image-parent">
			<Image className="mb-4 w-[256px] h-[256px] object-cover" src={studio.image} alt="" width={300} height={300} />
		</div>
		<div className="top flex flex-col mb-4 mx-4">
			<span className="title block text-lg font-semibold">{studio.name}</span>
			<div className="details flex flex-col gap-2 text-sm my-1.5 text-secondary">
				<span>{openTime(studio)}</span>
				{studio.average_grade !== 0 &&
					<span className="title">★ {studio.average_grade}</span>
				}
			</div>
		</div>
	</Link>
}
