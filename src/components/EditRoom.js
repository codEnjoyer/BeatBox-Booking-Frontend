import {useState, useEffect} from 'react'
import Image from "next/image";
import Contact from "@/components/Contact";
import {get, getImage, postAuth, putAuth} from "@/utils/requests";
import Link from "next/link";
import {toJson} from "@/utils/formData";
import {read} from "@/utils/storage";
import {redirect} from "@/utils/redirect";

export default function EditRoom({ roomId=-1, studioId }) {
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
	const [room, setRoom] = useState({
		"name": "",
		"description": "",
		"equipment": "",
		"additional_services": "",
		"id": 0})
	const [image, setImage] = useState('/noimage.jpg')
	const [images, setImages] = useState([])
	const [domLoaded, setDomLoaded] = useState(false)

	useEffect(() => {
		(async () => {
			setStudio(await get(`/studios/${studioId}`))
			if (roomId === -1)
				return setDomLoaded(true);
			setRoom(await get(`/studios/${studioId}/rooms/${roomId}`))
			setImage(await getImage(`/studios/${studioId}/rooms/${roomId}/banner`))
			setImages(await get(`/studios/${studioId}/rooms/${roomId}/images`))
			setDomLoaded(true)
		})()
	}, [])

	const onBannerSubmit = async e => {
		e.preventDefault()
		const res = await (`/studios/${studioId}/rooms/${roomId}/banner`, new FormData(e.target), read('token'))
		setImage(res)
	}

	const onSubmit = async e => {
		e.preventDefault()
		if (roomId === -1) {
			const data = toJson(new FormData(e.target))
			const res = await postAuth(`/studios/${studioId}/rooms`, data, read('token'), {'Content-Type': 'application/json'})
			redirect('/create', '/' + res.id)
		}
	}

	const loadImages = async e => {
		e.preventDefault()
		const res = await postAuth(`/studios/${studioId}/rooms/${roomId}/images`, new FormData(e.target), read('token'))
		console.log(res)
		if (typeof res.detail === 'undefined')
			setImages([...images, ...res])
	}

	return <div className="relative">
		{domLoaded && roomId !== -1 &&
			<form className="mb-4 container absolute top-[10px] left-1/2 -translate-x-1/2 z-10 pt-4" onSubmit={onBannerSubmit}>
				<p className="mb-2"><label htmlFor="bannerInput" className="text-secondary">Главное изображение
					студии (1040px x 360px)</label></p>
				<p className="mb-2"><input type="file" name="file" id="bannerInput"/></p>
				<button type="submit" className="text-secondary border-secondary border-[1px] p-1 hover:bg-text/20">Загрузить</button>
			</form>
		}
		<form onSubmit={onSubmit}>
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
						<input type="text"
							   name="name"
							   className="border-b border-text bg-transparent w-full max-w-full text-text text-2xl font-bold mb-1.5"
							   defaultValue={room.name}
							   required />
						<textarea className="border-b border-text bg-transparent w-full text-secondary block mb-6"
								  name="description"
								  defaultValue={room.description}
								  required/>
					</div>
				</div>
			</div>
			<div className="container">
				<h2 className="text-2xl font-semibold mb-3 mt-6">Оборудование</h2>
				<textarea className="border-b border-text bg-transparent w-full text-secondary block mb-6"
						  name="equipment" defaultValue={room.equipment} required/>

				<h2 className="text-2xl font-semibold mb-3 mt-6">Дополнительные услуги</h2>
				<textarea className="border-b border-text bg-transparent w-full text-secondary block mb-6"
						  name="additional_services" defaultValue={room.additional_services} required/>
				<p className="text-center">
					<button type="submit"
							className="p-2 bg-accent border-[1px] border-text hover:bg-accent/80">Сохранить
					</button>
				</p>
			</div>
		</form>

		<div className="container">
			<h2 className="text-2xl font-semibold mb-3 mt-6">Дополнительные изображения:</h2>
			<form onSubmit={loadImages}>
				<input type="file" name="files" multiple={true} />
				<button type="submit" className="p-2 bg-accent border-[1px] border-text hover:bg-accent/80">Загрузить</button>
			</form>
			<div className="grid grid-cols-3 gap-8 py-4">
			{images.map((item, index) =>
				<Image className="object-cover aspect-square" width={320} height={320} key={index} src={item} alt="" />)}
			</div>
		</div>
	</div>
}