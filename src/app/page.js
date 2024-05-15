"use client"
import {useState, useEffect} from "react"
import Header from "@/components/Header"
import StudioCard from "@/components/StudioCard"


export default function Home() {
  const [studios, setStudios] = useState([])

  useEffect(() => {
    setStudios([{
      title: "Tema studio",
      image: "https://placehold.co/320x150.png",
      desc: "Самые вкусные пирожки с картошкой",
      rating: "4.4",
      openTime: "10:00",
      closeTime: "22:00",
    },
    {
      title: "Tema studio 2",
      image: "https://placehold.co/320x150.png",
      desc: "неСамые вкусные пирожки с картошкой",
      rating: "4.3",
      openTime: "10:00",
      closeTime: "22:00",
    }
  ])}, [])

  return (
    <>
      <Header />
      <main className="container">
        <div className="studios flex gap-10 justify-between my-5">
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
