"use client"

import React, { useEffect, useState } from "react"

import { Input } from "@/components/ui/input"

const SearchBar = () => {
  const [placeholder, setPlaceHolder] = useState<string>("")
  const placeholders: string[] = [
    "I need ideas for my high school reunion",
    "I want a nice suit for my prom",
    "Daughters piano recital",
    "Black t-shirt",
    "Need suggestions for meeting my girlfriend's parents",
  ]

  useEffect(() => {
    let currentPlaceholder: string = ""
    let currentIndex: number = 0
    let typingEffect: NodeJS.Timeout = setInterval(() => {
      if (currentPlaceholder.length === placeholders[currentIndex].length) {
        currentIndex = (currentIndex + 1) % placeholders.length
        currentPlaceholder = ""
      }
      currentPlaceholder = placeholders[currentIndex].slice(
        0,
        currentPlaceholder.length + 1
      )
      setPlaceHolder(currentPlaceholder)
    }, 75)

    return () => clearInterval(typingEffect)
  }, [])

  return <Input type="text" placeholder={placeholder} />
}

export default SearchBar
