"use client"
import Link from "next/link"
import Image from "next/image"
import {read} from '@/utils/storage'
import {useState, useEffect} from 'react'

export default function Header() {
	const token = read('token')
	const nickname = read('nickname')

	const [link, setLink] = useState('Загрузка')
	useEffect(() => {
		setLink(token
			? <Link href="/profile" className="flex gap-2.5 items-center">
				{nickname !== 'undefined' && nickname !== null ? nickname : 'Профиль'}
				<Image src={"/account_circle.svg"} alt={"Профиль"} width={32} height={32} />
			</Link>
			: <Link href="/login" className="hover:underline">Войти</Link>
		)
	}, [nickname, token])

	return (
		<header className="flex justify-between items-center container py-5 relative">
			<Link href="/" className="text-2xl font-semibold flex gap-2 items-center">
				<Image src="/logo.svg" alt="" width={32} height={32} />BeatBox Booking</Link>
			{link}
		</header>
	)
}
