"use client"
import {useState, useEffect} from "react"
import Image from "next/image"
import RoomCard from './RoomCard'
import Review from './Review'
import Contact from './Contact'
import { studios as data } from '@/data/data'

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
	const studio = data.find(s => +s.id === +id)
		|| {title: "",
			image: "",
			desc: "",
			rating: "0",
			openTime: "",
			closeTime: "",
			options: "",
			contacts: [],
			rooms: [],
			reviews: []}

	return (
		<article>
			<div className="top mb-6">
				<div className="bg-black relative">
					<div className="wide-image-parent">
						<Image className="rounded-2xl bottom-right-shadow mb-6 max-h-[360px] max-w-full object-cover" src={studio.image} width={1040} height={360} alt="" />
					</div>
					<div className="absolute container left-1/2 -translate-x-1/2 bottom-6">
						<h1 className="text-2xl font-bold mb-1.5">{studio.title}</h1>
						<span className="text-secondary block mb-6">{studio.desc}</span>

						<div className="flex text-lg mb-4 gap-10 items-center">
							<span>★ {studio.average_grade ? studio.average_grade : '—'}</span>
							<span>🕔 {studio.openTime} — {studio.closeTime}</span>
						</div>

						<div className="flex gap-6 items-center">
							{studio.contacts && studio.contacts.map((contact, index) =>
								<div key={index} className="flex items-center gap-2">
									<Contact contact={contact}/>
								</div>
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="container">
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
		</article>
	)
}
