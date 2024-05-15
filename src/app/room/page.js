import Header from "@/components/Header"
import Room from "@/components/Room"

export default function RoomPage() {
  return (
    <>
      <Header />
      <main className="container">
        <Room room={{title: "Tema studio"}}/>
      </main>
    </>
  );
}
