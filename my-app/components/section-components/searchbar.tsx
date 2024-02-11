"use client"

import React, { useEffect, useState } from "react"
import {
  chatLogAtom,
  logIndexAtom,
  pageStateAtom,
  searchTextAtom,
} from "@/atoms/globalAtoms"
import axios from "axios"
import { useAtom } from "jotai"
import { BsArrowUpCircle } from "react-icons/bs"

import { cn } from "@/lib/utils"
import { Input } from "@/components/ui/input"

const SearchBar = () => {
  const [placeholder, setPlaceHolder] = useState<string>("")
  const placeholders: string[] = ["Enter a prompt here"]
  const [currPageState, setCurrPageState] = useAtom(pageStateAtom)
  const [currSearchText, setSearchText] = useAtom(searchTextAtom)
  const [chatLog, setChatLog] = useAtom(chatLogAtom)
  const [logIndex, setLogIndex] = useAtom(logIndexAtom)

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
  })

  const handleSearch = async () => {
    let gptText = await axios.post("http://localhost:8080/response", {
      data: { text: currSearchText },
    })

    console.log(gptText)

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
