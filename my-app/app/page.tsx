"use client"

import { pageStateAtom } from "@/atoms/globalAtoms"
import { useAtom } from "jotai"

import SearchBar from "@/components/section-components/searchbar"
import Chat from "@/components/sections/chat"
import Home from "@/components/sections/home"

export default function IndexPage() {
  const [currPageState] = useAtom(pageStateAtom)

  const handlePageState = () => {
    if (currPageState === "chat") {
      return <Chat />
    } else {
      return <Home />
    }
  }

  return (
    <section className="container h-full after:gap-6 pb-8 pt-6 md:py-10 ">
      {handlePageState()}
    </section>
  )
}
