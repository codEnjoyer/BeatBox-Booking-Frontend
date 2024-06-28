'use client'
import Header from "@/components/Header"
import Studio from "@/components/Studio"
import Footer from "@/components/Footer";
import {redirect} from "@/utils/redirect";
import {read} from "@/utils/storage";
import EditStudio from "@/components/EditStudio";

export default function EditStudioPage({ params }) {
	if (typeof window !== 'undefined' && read('studio_id') !== "" + params.studio_id && read('superuser') !== 'true')
		redirect(window, '/edit', '/')
	return (
		<>
			<Header />
			<main>
				<EditStudio id={params.studio_id} />
			</main>
			<Footer />
		</>
	);
}
