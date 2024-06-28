'use client'
import Scheduler from "./Scheduler";
import Link from "next/link";
import {useState, useEffect} from "react";
import {get, getAuth} from "@/utils/requests";
import Image from "next/image";
import {openTime} from "@/utils/format";
import Contact from "@/components/Contact";
import {getImage} from "@/utils/requests";
import {read} from "@/utils/storage";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPen} from "@fortawesome/free-solid-svg-icons";
import Review from "@/components/Review";

export default function Room({ roomId, studioId }) {
	const [studio, setStudio] = useState(null);
	const [room, setRoom] = useState(null);
	const [image, setImage] = useState('/noimage.jpg')
	const [images, setImages] = useState([])
	const [data, setData] = useState([])
	const [reviews, setReviews] = useState([])


	const getBooksData = (books) => {
		const _data = []
		books.filter(x => x.status !== 'cancelled').forEach((book) => {
			_data.push([book.starts_at, book.ends_at, book.user.email === read('email'), book.user.employee !== null && book.name === 'closed']);
		})
		return _data
	}

	useEffect(() => {
		(async () => {
			// console.log(await get(`/studios/${studioId}`))
			setStudio(await get(`/studios/${studioId}`))
			setRoom(await get(`/studios/${studioId}/rooms/${roomId}`))
			setImage(await getImage(`/studios/${studioId}/rooms/${roomId}/banner`))
			setImages(await get(`/studios/${studioId}/rooms/${roomId}/images`))
			setReviews(await get(`/studios/${studioId}/rooms/${roomId}/reviews`))

			setData(getBooksData(await getAuth(`/studios/${studioId}/rooms/${roomId}/bookings`, read('token'))))
		})()
	}, [])

	if (studio === null || room === null)
		return <div className="container">Загрузка...</div>


	const startTime = +studio.opening_at.split(':')[0] + 5
	const closeTime = +studio.closing_at.split(':')[0] + 5 ? +studio.closing_at.split(':')[0] + 5 : 24

	return <article>
		<div className="top mb-6">
			<div className="bg-black relative">
				<div className="wide-image-parent">
					<Image className="rounded-2xl bottom-right-shadow mb-6 max-h-[360px] max-w-full object-cover"
						   src={image} width={1040} height={360} alt=""/>
				</div>
				<div className="absolute container left-1/2 -translate-x-1/2 bottom-6">
					{(read('studio_id') === "" + studioId || read('superuser') === 'true') &&
						<a className="text-secondary text-sm inline-block mb-2" href={`/studio/${studioId}/room/${roomId}/edit`}><FontAwesomeIcon icon={faPen}/> Редактировать комнату</a>
					}
					<Link href={`/studio/${studio.id}`} className="text-text/70 block">
						<span className="text-secondary block mb-1.5">{studio.name}</span>
					</Link>
					<h1 className="text-2xl font-bold mb-1.5">{room.name}</h1>
					<span className="text-secondary block mb-6">{room.description}</span>
				</div>
			</div>
		</div>

		<div className="container">

			<Scheduler
				from={startTime}
				to={closeTime}
				data={data}
				studioId={studio.id}
				roomId={room.id}
			/>

			{room.equipment && <>
				<h2 className="text-2xl font-semibold mb-3 mt-6">Оборудование</h2>
				<p className="whitespace-pre-wrap">{room.equipment}</p>
			</>}

			{room.additional_services && <>
				<h2 className="text-2xl font-semibold mb-3 mt-6">Дополнительные услуги</h2>
				<p className="whitespace-pre-wrap">{room.additional_services}</p>
			</>}

			{images.length > 0 &&
				<div>
				<h2 className="text-2xl font-semibold mb-3 mt-6">Галерея</h2>

				<div className="grid grid-cols-3 gap-8 py-4">
					{images.map((item, index) =>
						<Image className="object-cover aspect-square" width={320} height={320} key={index} src={item} alt=""/>)}
				</div>
				</div>
			}


			{reviews.length > 0 &&
				<div>
					<h2>Отзывы</h2>
					<div className="flex flex-col gap-10 items-center">
						{reviews.map((item, index) =>
						<Review key={index} review={item} name={room.name} />)}
					</div>
				</div>
			}
		</div>
	</article>
}