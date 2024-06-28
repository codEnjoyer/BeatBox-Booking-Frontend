import Image from "next/image";

export default function Footer() {
	return <footer className="mt-8 py-12 flex flex-col items-center text-secondary">
		<div className="flex gap-1 text-2xl font-bold mb-2">
			<Image className="secondary" src="/logo.svg" width={32} height={32} alt="B" />
			<span>BeatBox Booking</span>
		</div>
		<span className="text-sm">Copyright &copy; {new Date().getFullYear()}</span>
	</footer>
}