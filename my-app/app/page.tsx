import SearchBar from "@/components/section-components/searchbar"

export default function IndexPage() {
  return (
    <section className="container h-full after:gap-6 pb-8 pt-6 md:py-10 ">
      <div className="h-[90%]"></div>
      <div className="flex justify-bottom">
        <SearchBar />
      </div>
    </section>
  )
}
