import Header from "@/components/Header"
import Room from "@/components/Room"
import { studios } from "@/mock/data"

export default function RoomPage({ params }) {
	const studio = studios.find((studio) => +studio.id === +params.studio_id)
	const room = studio.rooms.find((room) => +room.id === +params.room_id)
	return <>
		<Header />
		<Room room={room} studio={studio} />
	</>
}