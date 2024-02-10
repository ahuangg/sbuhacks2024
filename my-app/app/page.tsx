'use client'
import Link from "next/link"

import { siteConfig } from "@/config/site"
import { buttonVariants } from "@/components/ui/button"
import Ract, { useEffect, useState } from "react"



export default function IndexPage() {

  const [message, setMessage] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8080/response")
    .then(res => res.json())
    .then(
      (data) => {
        setMessage(data.message)
        console.log(data)
      })
  }, [])


  return (
    <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
      <p>{message}</p>
    </section>
  )
}
