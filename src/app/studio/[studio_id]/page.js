import Header from "@/components/Header"
import Studio from "@/components/Studio"

export default function StudioPage({ params }) {
  return (
    <>
      <Header />
      <main>
        <Studio id={params.studio_id} />
      </main>
    </>
  );
}
