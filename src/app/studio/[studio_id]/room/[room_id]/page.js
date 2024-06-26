'use client'
import Header from "@/components/Header"
import Room from "@/components/Room"


export default function RoomPage({ params }) {
	return <>
		<Header />
		<Room roomId={params.room_id} studioId={params.studio_id} />
	</>
}