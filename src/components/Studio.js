"use client"
import {useState, useEffect} from "react"
import Image from "next/image"
import RoomCard from './RoomCard'
import Review from './Review'
import Contact from './Contact'
// import { studios as utils } from '@/utils/utils'
import {get, getImage, postAuth} from '@/utils/requests'
import {openTime} from "@/utils/format";
import {read} from '@/utils/storage'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import {faPen} from "@fortawesome/free-solid-svg-icons";
import { Rating } from 'primereact/rating'
import Link from "next/link";

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
	const [domLoaded, setDomLoaded] = useState(false);
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
	const [showReviewForm, setShowReviewForm] = useState(false)
	const [reviewDetail, setReviewDetail] = useState("")
	const [reviewRating, setReviewRating] = useState(0)
	const [_, update] = useState(0)
	const [roomById, setRoomById] = useState({})

	useEffect(() => {
		setDomLoaded(true);
	}, [])

	useEffect(() => {
		(async () => {
			const _studio = await get(`/studios/${id}`)
			const _rooms = await get(`/studios/${id}/rooms`)
			const _roomById = {}
			const rooms = []
			for (let room of _rooms) {
				const roomBanner = await getImage(`/studios/${id}/rooms/${room.id}/banner`)
				console.log(roomBanner)
				rooms.push({...room, image: roomBanner})
				_roomById[room.id] = room
			}
			const reviews = await get(`/studios/${id}/reviews`)
			const _banner = await getImage(`/studios/${id}/banner`)
			console.log(_banner)
			console.log(_studio)
			setStudio({..._studio, rooms: rooms, image: _banner, reviews: reviews})
			setRoomById(_roomById)
		})()
	}, [])

	const onReviewSubmit = async e => {
		e.preventDefault();
		const formData = new FormData(e.target)
		const data = {
			"grade": reviewRating,
			"text": formData.get('text'),
			"room_id": +formData.get('room')
		}
		debugger;
		const res = await postAuth(`/studios/${id}/reviews`, JSON.stringify(data), read('token'), {'Content-Type': 'application/json'})
		if (res.detail && typeof res.detail === 'string')
			setReviewDetail(res.detail)
		else if (res.detail)
			setReviewDetail(res.detail[0].msg)
		else
			update(0)
	}

	return (
		<article>
			<div className="top mb-6">
				<div className="bg-black relative">
					<div className="wide-image-parent">
						<Image className="rounded-2xl bottom-right-shadow mb-6 max-h-[360px] max-w-full object-cover" src={studio.image} width={1040} height={360} alt="" />
					</div>
					<div className="absolute container left-1/2 -translate-x-1/2 bottom-6">
						{domLoaded && (read('studio_id') === "" + id || read('superuser') === 'true') &&
							<a className="text-secondary text-sm inline-block mb-2" href={`/studio/${id}/edit`}><FontAwesomeIcon icon={faPen}/> Редактировать студию</a>
						}
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
					<div className="rooms mb-6">
						<h2 className="text-lg font-semibold mb-3 relative">Комнаты:</h2>
						<div className="rooms flex justify-between gap-4 flex-wrap mx-auto conte">{
							studio.rooms.map((room, index) =>
								<RoomCard room={room} studioId={id} key={index}/>
							)
						}</div>
					</div>


						<div className="mb-6">
							<h2 className="text-lg font-semibold mb-3 relative">Отзывы:</h2>
							<button
								type="button"
								className={showReviewForm ? 'hidden' : ''}
								onClick={() => setShowReviewForm(true)}
							>Оставить отзыв</button>
							{showReviewForm &&
								<form onSubmit={onReviewSubmit}>
									{reviewDetail.length > 0 && <div
										className="block border-orange-700 border-2 mx-auto w-fit px-8 py-2">Ошибка!<br/>
										{reviewDetail}
									</div>}
									<p className="mb-2">Отзыв:</p>
									<textarea name="text" required rows={1} className="w-full text-bg p-1 px-2 mb-3"/>
									<p className="mb-2">Оценка:</p>
									<Rating className="mt-2 mb-6 w-fit" value={reviewRating} cancel={false}
											onChange={(e) => setReviewRating(e.value)}/>

									<p className="mb-2">Комната:</p>
									<select name="room"
											className="mb-5 bg-bg border border-text text-text text-sm focus:ring-blue-500 focus:border-blue-500 block w-full p-2">
										{studio.rooms && studio.rooms.map((room) =>
											<option value={room.id} key={room.id}>{room.name}</option>
										)}
									</select>

									<button type="submit"
											className="p-1 px-2 border-[1px] bg-accent border-text disabled:bg-transparent disabled:border-secondary disabled:text-secondary"
											disabled={reviewRating === 0}>Добавить
									</button>
								</form>
							}
							{studio.reviews &&
								<div className="flex flex-col gap-10 items-center">
									{studio.reviews.map((review, index) =>
										<Review review={review} key={index} roomById={roomById} />
									)}
								</div>
							}
						</div>
					</div>
					: 'Загрузка...'}
			</div>
		</article>
	)
}
