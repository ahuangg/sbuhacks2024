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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ClothCard from "../section-components/cloth-card"


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
                    style={{display: "grid"}}
                  >
                    <Label className="flex">

                     
                      <div
                        // className={cn("flex items-center")}
                        style={{fontSize: "26pt", width: "100%"}}
                      >
                        {log.userText}
                        
                      </div>
                      
                    </Label>
                  <div>
                    {log.favorite?.map((item) => {
                      return (
                  <div>
                
                <p className="text-sm font-medium text-slate-600">
              
            </p>
            <div className="my-2">
              <ClothCard
                clothingDetails={item}
              />
            </div>
          </div>
        )
      })}
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