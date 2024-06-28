'use client'
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import EditRoom from "@/components/EditRoom";


export default function EditRoomPage({ params }) {
	return <>
		<Header />
		<EditRoom roomId={params.room_id} studioId={params.studio_id} />
		<Footer />
	</>
}