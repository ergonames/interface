import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import SearchBoxModal from "@/components/searchBoxModal"

export default function Home() {
  return (
    <main>
      <div className="bg-slate-800 h-screen">
        <Navbar />
        <SearchBoxModal />
        <Footer />
      </div>
    </main>
  )
}
