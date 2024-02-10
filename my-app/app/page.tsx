import SearchBar from "@/components/section-components/searchbar"
import Home from "@/components/sections/home"

export default function IndexPage() {
  return (
    <section className="container h-full after:gap-6 pb-8 pt-6 md:py-10 ">
      <Home />
      <div className="flex justify-bottom">
        <SearchBar />
      </div>
    </section>
  )
}
