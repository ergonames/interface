import Footer from "@/components/footer"
import Navbar from "@/components/navbar"
import SearchBoxModal from "@/components/searchBoxModal"

export default function Home() {
  return (
    <main>
      <div className="bg-blue-400 h-screen">
        <Navbar />
        <SearchBoxModal />
        <Footer />
      </div>
    </main>
  )
}
