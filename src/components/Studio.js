"use client"
import {useState, useEffect} from "react"
import Image from "next/image"
import RoomCard from './RoomCard'
import Review from './Review'
import Contact from './Contact'
// import { studios as utils } from '@/utils/utils'
import {get, getImage} from '@/utils/requests'
import {openTime} from "@/utils/format";
import moment from 'moment'

const getLines = text => {
	const lines = text.split("\n")
	return lines.map((line, index) => {
		return (
			<p key={index} className="relative">
				{line}
			</p>
		)
	})
}

export default function Studio({ id }) {
	const [studio, setStudio] = useState({name: "",
		image: "",
		description: "",
		grade: "0",
		opening_at: "",
		closing_at: "",
		options: "",
		contacts: [],
		rooms: [],
		reviews: [],
		id: null});


	useEffect(() => {
		(async () => {
			const _studio = await get(`/studios/${id}`)
			const _rooms = await get(`/studios/${id}/rooms`)
			const rooms = []
			for (let room of _rooms) {
				const roomBanner = await getImage(`/studios/${id}/rooms/${room.id}/banner`)
				console.log(roomBanner)
				rooms.push({...room, image: roomBanner})
			}
			const _banner = await getImage(`/studios/${id}/banner`)
			console.log(_banner)
			console.log(_studio)
			setStudio({..._studio, rooms: rooms, image: _banner})
		})()
	}, [])

	return (
		<article>
			<div className="top mb-6">
				<div className="bg-black relative">
					<div className="wide-image-parent">
						<Image className="rounded-2xl bottom-right-shadow mb-6 max-h-[360px] max-w-full object-cover" src={studio.image} width={1040} height={360} alt="" />
					</div>
					<div className="absolute container left-1/2 -translate-x-1/2 bottom-6">
						<h1 className="text-2xl font-bold mb-1.5">{studio.name}</h1>
						<span className="text-secondary block mb-6">{studio.description}</span>

						<div className="flex text-lg mb-4 gap-10 items-center">
							<span>★ {studio.average_grade ? studio.average_grade : '—'}</span>
							<span>🕔 {openTime(studio)}</span>
						</div>

						<div className="flex gap-6 items-center">
							{Object.entries(studio).map(([key, value]) =>
								<Contact contact={{name: key, value: value}} key={key} />
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				{studio.id !== null ? <div>
					{studio.options &&
						<div className="mb-6 options">
							<h2 className="text-lg font-semibold mb-3 relative">Дополнительные опции</h2>
							{getLines(studio.options)}
						</div>
					}

					<div className="rooms mb-6">
						<h2 className="text-lg font-semibold mb-3 relative">Комнаты:</h2>
						<div className="rooms flex justify-between gap-4 flex-wrap mx-auto conte">{
							studio.rooms.map((room, index) =>
								<RoomCard room={room} studioId={id} key={index}/>
							)
						}</div>
					</div>

					{studio.reviews &&
						<div className="mb-6 options">
							<h2 className="text-lg font-semibold mb-3 relative">Отзывы:</h2>
							<div className="flex flex-col gap-10 items-center">
								{studio.reviews.map((review, index) =>
									<Review review={review} key={index}/>
								)}
							</div>
						</div>
					}
					</div>
				: 'Загрузка...'}
			</div>
		</article>
	)
}
