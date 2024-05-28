"use client"
import {useState, useEffect} from "react"
import Header from "@/components/Header"
import StudioCard from "@/components/StudioCard"
import { studios } from '@/mock/data'


export default function Home() {
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
