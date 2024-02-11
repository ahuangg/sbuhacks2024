import React from "react"
import { BsBoxArrowInUpRight, BsStar } from "react-icons/bs"

import { cn } from "@/lib/utils"
import { useAtom } from "jotai"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import {chatLogAtom, logIndexAtom } from "@/atoms/globalAtoms"

interface ClothCardProps {
  clothingDetails: any
}

const ClothCard = (props: ClothCardProps) => {
  const [chatLog, setChatLog] = useAtom(chatLogAtom)
  const [logIndex] = useAtom(logIndexAtom)
  console.log(chatLog[logIndex].favorite)
  const renderCards = () => {

    const handleFav = (cloth: any) => {
      console.log(cloth)
      let temp = chatLog[logIndex].favorite
      //remvoe from favorites
      if(temp.includes(cloth)){
        let indexToRemove = temp.indexOf(cloth);
        if (indexToRemove !== -1) {
          temp.splice(indexToRemove, 1);
        }

      } 
      //add to favorites
      else{

      temp.push(cloth)
      }
    setChatLog([
      ...chatLog,
      {
        favorite: temp,
      },
    ])
    }


    return props.clothingDetails[0].map((cloth: any) => {
      return (
        <div>
          <Card className="p-3 m-0 w-[400px] mr-6">
            <div className="flex">
              <img className="h-[200px] w-[200px]" src={cloth[1]}></img>
              <div className="ml-3 flex flex-col justify-between">
                <div className="text-sm font-medium ">{cloth[0]}</div>
                <div className="flex justify-between">
                  <a href={cloth[2]} target="_blank">
                    <BsBoxArrowInUpRight
                      className={cn(
                        "cursor-pointer bg-background text-3xl text-foreground"
                      )}
                    />
                  </a>
                  <BsStar
                    className={cn(
                      "cursor-pointer bg-background text-3xl text-foreground"
                    )}
                    onClick={() => handleFav(cloth)}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    })
    // let content: any = []

    // for (const key in props.clothingDetails) {
    //   content.push()
    // }

    // return content
  }
  return <div className="flex flex-row  overflow-x-auto">{renderCards()}</div>
}

export default ClothCard
