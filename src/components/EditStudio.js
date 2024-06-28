'use client'
import {useEffect, useState} from 'react'
import {get, getImage, put, putAuth} from "@/utils/requests";
import Image from "next/image";
import {getTime} from "@/utils/format";
import Contact from "@/components/Contact";
import {read} from "@/utils/storage";
import RoomCard from "@/components/RoomCard";
import Link from "next/link";
import {redirect} from "@/utils/redirect";

export default function EditStudio({ id }) {
	const [domLoaded, setDomLoaded] = useState(false);
	const [studio, setStudio] = useState({
		"name": "",
		"description": "",
		"opening_at": "",
		"closing_at": "",
		"site": "",
		"contact_phone_number": "",
		"tg": "",
		"vk": "",
		"whats_app": "",
		"id": 0,
		"average_grade": 0
	})
	const [rooms, setRooms] = useState([])
	const [image, setImage] = useState("/noimage.jpg")

	// useEffect(() => {
	// 	setDomLoaded(true)
	// }, [])

	useEffect(() => {
		(async () => {
			setStudio(await get(`/studios/${id}`));
			setImage(await getImage(`/studios/${id}/banner`))
			const _rooms = await get(`/studios/${id}/rooms`)
			const rooms = []
			for (let room of _rooms) {
				const roomBanner = await getImage(`/studios/${id}/rooms/${room.id}/banner`)
				rooms.push({...room, image: roomBanner})
			}
			setRooms(rooms)
			setDomLoaded(true);
		})()
	}, [])

	const onBannerSubmit = async e => {
		e.preventDefault();
		e.stopPropagation();
		const data = new FormData(e.target)
		await putAuth(`/studios/${id}/banner`, data, read('token'))
		redirect(window, '', '')
	}

	const onStudioSubmit = async e => {
		e.preventDefault();
		const formData = new FormData(e.target)
		const data = studio
		data['name'] = formData.get('name') || data['name']
		data['description'] = formData.get('description') || data['description']
		data['opening_at'] = `${formData.get('open') - 5 >= 10 ? '' : 0}${formData.get('open') - 5}:00:00Z` || data['opening_at']
		data['closing_at'] = `${formData.get('close') - 5 >= 10 ? '' : 0}${formData.get('close') - 5}:00:00Z` || data['closing_at']
		console.log(await putAuth(`/studios/${id}`, JSON.stringify(data), read('token'), {'Content-Type': 'application/json'}))
	}

	return <div className="relative">
		{domLoaded &&
			<form className="mb-4 container absolute top-[10px] left-1/2 -translate-x-1/2 z-10 pt-4" onSubmit={onBannerSubmit}>
				<p className="mb-2"><label htmlFor="bannerInput" className="text-secondary">Главное изображение
					студии (1040px x 360px)</label></p>
				<p className="mb-2"><input type="file" name="file" id="bannerInput"/></p>
				<button type="submit" className="text-secondary border-secondary border-[1px] p-1 hover:bg-text/20">Загрузить</button>
			</form>
		}
		<form className="relative top-0 w-full" onSubmit={onStudioSubmit}>
			<div className="top mb-6">
				<div className="bg-black relative">
					<div className="wide-image-parent">
						<Image className="rounded-2xl bottom-right-shadow mb-6 max-h-[360px] max-w-full object-cover"
							   src={image} width={1040} height={360} alt=""/>
					</div>
					<div className="absolute container left-1/2 -translate-x-1/2 bottom-6">

						<input type="text"
							   name="name"
							   className="bg-transparent w-full max-w-full text-text text-2xl font-bold mb-1.5"
							   defaultValue={studio.name}/>
						<textarea className="bg-transparent w-full text-secondary block mb-6"
								  name="description"
								  defaultValue={studio.description}/>

						<div className="flex text-lg mb-4 gap-10 items-center">
							<span>🕔 {domLoaded && <>
								<input
									className="bg-transparent text-right w-[2ch]"
									name="open"
									type="number"
									min={0}
									max={23}
									defaultValue={+studio.opening_at.slice(0, studio.opening_at.indexOf(':')) + 5}/>:00
								— <input
									className="bg-transparent text-right w-[2ch]"
									name="close"
									type="number"
									min={1}
									max={24}
									defaultValue={+studio.closing_at.slice(0, studio.closing_at.indexOf(':')) + 5}/>:00
							</>}</span>
						</div>

						<div className="flex gap-6 items-center">
							{Object.entries(studio).map(([key, value]) =>
								<Contact contact={{name: key, value: value}} key={key}/> || value
							)}
						</div>
					</div>
				</div>
			</div>

			<div className="container">
				<div className="rooms mb-6">
					<h2 className="text-lg font-semibold mb-3 relative">Комнаты:
						<Link href={`/studio/${id}/room/create`} className="inline-flex justify-center items-center ml-2 text-base w-7 h-7 border-[1px] border-text hover:bg-text/20">+</Link>
					</h2>
					<div className="rooms flex justify-between gap-4 flex-wrap mx-auto conte">{
						rooms.map((room, index) =>
							<RoomCard room={room} studioId={id} key={index}/>
						)
					}</div>
				</div>

				<p className="text-center">
					<button type="submit" className="p-2 bg-accent border-[1px] border-text hover:bg-accent/80">Сохранить</button>
				</p>
			</div>
		</form>
	</div>
}