"use client"
import {useState, useEffect} from "react"
import Header from "@/components/Header"
import StudioCard from "@/components/StudioCard"
import { studios as data } from '@/mock/data'


export default function Home() {
  const [studios, setStudios] = useState(data)

  // useEffect(() => {
  //   setStudios([{
  //     title: "Tema studio",
  //     image: "https://www.funnyart.club/uploads/posts/2022-02/1644887147_47-www-funnyart-club-p-fon-muzikalnaya-studiya-krasivo-63.jpg",
  //     desc: "Студия с акцентом на качество звукоизоляции",
  //     rating: "4.4",
  //     openTime: "10:00",
  //     closeTime: "22:00",
  //     id: 1,
  //   },
  //   {
  //     title: "Tema studio 2",
  //     image: "https://styledejouy.ru/images/myz-study-import/37.jpg",
  //     desc: "Лучшие инструменты в городе",
  //     rating: "4.3",
  //     openTime: "11:00",
  //     closeTime: "22:00",
  //     id: 2,
  //   },
  //   {
  //     title: "Другая студия",
  //     image: "https://kartinki.pibig.info/uploads/posts/2023-04/1681775348_kartinki-pibig-info-p-muzikalnaya-studiya-kartinki-arti-krasivo-4.jpg",
  //     desc: "Студия для гитаристов и басистов",
  //     rating: "3.2",
  //     openTime: "10:00",
  //     closeTime: "22:00",
  //     id: 3,
  //   },
  //   {
  //     title: "Studio the studio",
  //     image: "https://i.pinimg.com/originals/b3/2b/aa/b32baa52ceefbbee3a23e37912a139e3.jpg",
  //     desc: "Студия для всех-всех",
  //     rating: "3.9",
  //     openTime: "8:00",
  //     closeTime: "23:00",
  //     id: 4,
  //   }
  // ])}, [])

  return (
    <>
      <Header />
      <main className="container">
        <div className="studios grid grid-cols-2 gap-10 justify-between my-5">
          {studios.length > 0
            ? studios.map((studio, index) =>
                <StudioCard key={index} studio={studio} />
              )
            : "Загрузка..."}
        </div>
      </main>
    </>
  );
}
