"use client"
import {useState, useEffect} from "react"
import Image from "next/image"
import Header from "@/components/Header"
import StudioCard from "@/components/StudioCard"
import { studios } from '@/mock/data'


export default function Home() {
	return (
		<>
			<Header />
			<div className="hero bg-black relative">
				<div className="wide-image-parent relative">
					<Image className="max-h-[340px]" src="/hat.jpg" width={1280} height={360} alt="" />
				</div>
				<div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center">
					<Image src="/logo.svg" alt="" width={96} height={96} className="mb-8" />
					<h1 className="text-3xl mb-2 font-bold">Записывайся в один клик!</h1>
					<p className="text-text/70">Сервис для бронирования мест в звукозаписывающих студиях.</p>
				</div>
			</div>
			<main>
				<div className="container pt-8">
					<h2 className="text-2xl font-semibold">Популярные студии</h2>
					<p className="text-text/70 relative">Список самых популярных студий в вашем регионе</p>
					<div className="studios grid grid-cols-3 gap-10 justify-between my-5">
						{studios.length > 0
							? studios.map((studio, index) =>
								<StudioCard key={index} studio={studio}/>
							)
							: "Загрузка..."}
					</div>
				</div>

			</main>
		</>
	);
}
