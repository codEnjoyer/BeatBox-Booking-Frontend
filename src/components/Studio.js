"use client"
import {useState, useEffect} from "react"
import Image from "next/image"
import RoomCard from './RoomCard'
import Review from './Review'
import Contact from './Contact'
import { studios as data } from '@/mock/data'

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

	return (
		<article>
			<div className="top mb-6">
				<Image className="rounded-2xl bottom-right-shadow mb-6 max-h-[240px] max-w-full object-cover" src={studio.image} width="800" height="240" alt="" />
				<h1 className="text-2xl font-bold mb-3">{studio.title}</h1>
				<span className="text-secondary block mb-4">{studio.desc}</span>

				<div className="flex text-lg gap-10 items-center">
					<span>★ {studio.rating ? studio.rating : '—'}</span>
					<span>🕔 {studio.openTime} — {studio.closeTime}</span>
					{studio.contacts && studio.contacts.map((contact, index) =>
						<div key={index} className="flex items-center gap-2">
							<Contact contact={contact} />
						</div>
					)}
				</div>
			</div>

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
						<RoomCard room={room} key={index} />
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
		</article>
	)
}
