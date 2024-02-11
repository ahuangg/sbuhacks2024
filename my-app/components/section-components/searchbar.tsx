"use client"

import React, { useEffect, useState } from "react"
import {
  chatLogAtom,
  isLoadingAtom,
  logIndexAtom,
  pageStateAtom,
  progressAtom,
  searchTextAtom,
} from "@/atoms/globalAtoms"
import axios from "axios"
import { useAtom } from "jotai"
import { BsArrowUpCircle } from "react-icons/bs"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const SearchBar = () => {
  const [placeholder, setPlaceholder] = useState("")
  const placeholders: string[] = ["Enter a prompt here", "I need outfit ideas for my high school reunion",
  "I want a nice suit for my prom", 
  "Daughters piano recital",
  "Black t-shirt",
  "Need suggestions for meeting my girlfriend's parents"];
  const [currPageState, setCurrPageState] = useAtom(pageStateAtom)
  const [currSearchText, setSearchText] = useAtom(searchTextAtom)
  const [chatLog, setChatLog] = useAtom(chatLogAtom)
  const [logIndex, setLogIndex] = useAtom(logIndexAtom)
  const [progress, setProgress] = useAtom(progressAtom)
  const [isLoading, setIsLoading] = useAtom(isLoadingAtom)

  useEffect(() => {
    let currentPlaceholder = ""
    let currentIndex = 0
    let charIndex = 0
    let direction = 1

    const updatePlaceholder = () => {
      const text = placeholders[currentIndex]

      charIndex += direction

      if (charIndex === text.length || charIndex === 0) {
        direction *= -1

        if (charIndex === text.length + 1) {
          setTimeout(() => {
            setPlaceholder((prev) => prev.slice(0, -1))
          }, 500)
          return
        }

        if (charIndex === 0 && direction === 1) {
          currentIndex = (currentIndex + 1) % placeholders.length
        }
      }

      currentPlaceholder = text.slice(0, charIndex)
      setPlaceholder(currentPlaceholder)
    }

    const typingEffect = setInterval(updatePlaceholder, 150)

    return () => clearInterval(typingEffect)
  }, [])

  const handleSearch = async () => {
    setIsLoading(true)

    let gptText = await axios.post("http://localhost:8080/response", {
      data: { text: currSearchText },
      onDownloadProgress: function (progressEvent: any) {
        const progress =
          progressEvent.loaded /
          progressEvent.event.target.getResponseHeader("x-file-size")
        const percent = Math.round(progress * 100)
        console.log(percent)
      },
    })

    setChatLog([
      ...chatLog,
      {
        chatId: chatLog.length,
        userText: currSearchText,
        gptText: "Here is your response for " + currSearchText,
        maleRes: gptText.data.male,
        femaleRes: gptText.data.female,
        recommendations: [],
        favorite: [],
      },
    ])

    setLogIndex(() => chatLog.length)

    setSearchText("")
    setCurrPageState("chat")
    setIsLoading(false)
  }

  return (
    <div className="flex items-center gap-3 w-full">
      <Input
        type="text"
        placeholder={placeholder}
        value={currSearchText}
        onChange={(e) => setSearchText(e.target.value)}
      ></Input>
      <BsArrowUpCircle
        className={cn(
          "cursor-pointer rounded-full border bg-background text-3xl text-foreground"
        )}
        onClick={() => {
          handleSearch()
        }}
      />
    </div>
  )
}

export default SearchBar
