'use client'
import Scheduler from "./Scheduler";
import Link from "next/link";

export default function Room({ room, studio }) {
    const storagePath = `${studio.id}/${room.id}/books`
    const tryGetLocalStorageBooks = () => {
        return typeof window !== 'undefined'
            ? localStorage.getItem(storagePath)
                ? JSON.parse(localStorage.getItem(storagePath))
                : []
            : []
    }

    const data = [
        ...tryGetLocalStorageBooks()
    ]

    const startTime = +studio.openTime.split(':')[0]
    const closeTime = +studio.closeTime.split(':')[0] ? +studio.closeTime.split(':')[0] : 24

    return (
        <div className="container">
            <div className="flex justify-between mb-4">
                <div className="flex items-center gap-10">
                    <h1 className="text-2xl font-semibold">{room.title}</h1>
                    <Link href="/" className="text-text/70 block">{studio.title}</Link>
                </div>
                <span className="text-lg">Цена: от {room.price} ₽</span>
            </div>

            <p>{room.desc}</p>

            <Scheduler
                from={startTime}
                to={closeTime}
                data={data}
                storagePath={storagePath} />
        </div>
    );
}