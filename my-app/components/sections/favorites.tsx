import React, { useState } from "react"
import { chatLogAtom } from "@/atoms/globalAtoms"
import { useAtom } from "jotai"
import { BsSearch } from "react-icons/bs"

import { cn } from "@/lib/utils"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"

import ClothCard from "../section-components/cloth-card"

const Favorites = () => {
  const [chatLog, setChatLog] = useAtom(chatLogAtom)
  console.log(chatLog)
  return (
    <React.Fragment>
      <div className="h-[90%]">
        <>
          {chatLog.map((log) => {
            return (
              <div
                className="flex space-y-1 gap-2  ml-3"
                style={{ display: "grid" }}
              >
                <Label className="flex">
                  <div style={{ fontSize: "26pt", width: "100%" }}>
                    {log.userText}
                  </div>
                </Label>
                <div>
                  <p className="text-sm font-medium text-slate-600"></p>
                  <div className="my-2">
                    <ClothCard clothingDetails={[log.favorite]} />
                  </div>
                </div>
              </div>
            )
          })}
        </>
      </div>
    </React.Fragment>
  )
}

export default Favorites
