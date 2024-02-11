import React, {useState} from "react"
import { BsSearch } from "react-icons/bs"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { chatLogAtom } from "@/atoms/globalAtoms"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useAtom } from "jotai"


import SearchBar from "../section-components/searchbar"

const Favorites = () => {

    const[chatLog, setChatLog] = useAtom(chatLogAtom)

  return (
    <React.Fragment>
      <div className="h-[90%]">
        <>
            {chatLog.map((log) => {
                return (
                  <div
                    className="flex space-y-1 gap-2  ml-3"
                  >
                    <Label className="flex">

                     
                      <div
                        className={cn("flex items-center")}
                        style={{fontSize: "26pt"}}
                      >
                        {log.chatTitle}
                      </div>
                    </Label>
                  </div>
                )
              })}
        </>
    </div>
    </React.Fragment>
  )
}

export default Favorites
