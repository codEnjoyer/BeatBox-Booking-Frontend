'use client'
import Scheduler from "./Scheduler";
import Link from "next/link";
import {useState, useEffect} from "react";
import {get} from "@/utils/requests";
import Image from "next/image";
import {openTime} from "@/utils/format";
import Contact from "@/components/Contact";
import {getImage} from "@/utils/requests";

export default function Room({ roomId, studioId }) {
	const [studio, setStudio] = useState(null);
	const [room, setRoom] = useState(null);
	const [image, setImage] = useState('')

	useEffect(() => {
		(async () => {
			// console.log(await get(`/studios/${studioId}`))
			setStudio(await get(`/studios/${studioId}`))
			setRoom(await get(`/studios/${studioId}/rooms/${roomId}`))
			setImage(await getImage(`/studios/${studioId}/rooms/${roomId}/banner`))
		})()
	}, [])

	if (studio === null || room === null)
		return <div className="container">Загрузка...</div>

	const storagePath = `${studio.id}/${room.id}/books`
	console.log(room, studio)
	const tryGetLocalStorageBooks = () => {
		return typeof window !== 'undefined'
			? localStorage.getItem(storagePath)
				? JSON.parse(localStorage.getItem(storagePath))
				: []
			: []
	}

	const data = [
		...tryGetLocalStorageBooks()
	]

	const startTime = +studio.opening_at.split(':')[0]
	const closeTime = +studio.closing_at.split(':')[0] ? +studio.closing_at.split(':')[0] : 24

	return <article>
		<div className="top mb-6">
			<div className="bg-black relative">
				<div className="wide-image-parent">
					<Image className="rounded-2xl bottom-right-shadow mb-6 max-h-[360px] max-w-full object-cover"
						   src={image} width={1040} height={360} alt=""/>
				</div>
				<div className="absolute container left-1/2 -translate-x-1/2 bottom-6">
					<Link href={`/studio/${studio.id}`} className="text-text/70 block">
						<span className="text-secondary block mb-1.5">{studio.name}</span>
					</Link>
					<h1 className="text-2xl font-bold mb-1.5">{room.name}</h1>
					<span className="text-secondary block mb-6">{room.description}</span>
				</div>
			</div>
		</div>

		<div className="container">
			<h2 className="text-2xl font-semibold">Забронировать</h2>

			<p>{room.description}</p>

			<Scheduler
				from={startTime}
				to={closeTime}
				data={data}
				storagePath={storagePath}/>

			{room.equipment && <>
				<h2 className="text-2xl font-semibold mb-3 mt-6">Оборудование</h2>
				<p>{room.equipment}</p>
			</>}

			{room.additional_services && <>
				<h2 className="text-2xl font-semibold mb-3 mt-6">Дополнительные услуги</h2>
				<p>{room.additional_services}</p>
			</>}
		</div>
	</article>
}