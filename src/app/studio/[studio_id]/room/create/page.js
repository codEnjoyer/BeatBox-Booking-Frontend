'use client'
import Header from "@/components/Header"
import Footer from "@/components/Footer";
import EditRoom from "@/components/EditRoom";


export default function CreateRoomPage({ params }) {
	return <>
		<Header />
		<EditRoom studioId={params.studio_id} />
		<Footer />
	</>
}