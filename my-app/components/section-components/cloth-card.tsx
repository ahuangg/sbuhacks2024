import React, {useState} from "react"
import { chatLogAtom, logIndexAtom, pageStateAtom } from "@/atoms/globalAtoms"
import { useAtom } from "jotai"
import { BsBoxArrowInUpRight, BsHeart, BsHeartFill } from "react-icons/bs"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ClothCardProps {
  clothingDetails: any,
  chatId: number
}

const ClothCard = (props: ClothCardProps) => {
  const [chatLog, setChatLog] = useAtom(chatLogAtom)
  const [logIndex] = useAtom(logIndexAtom)
  const [currPageState] = useAtom(pageStateAtom)
  const [inFav, setInFav] = useState(false)

  console.log(chatLog[logIndex].favorite)

  const handleFav = (cloth: any) => {
    console.log(cloth)
    let temp = []
    if(currPageState === "chat"){
      temp = chatLog[logIndex].favorite
    } else if(currPageState === "favorites"){
      temp = chatLog[props.chatId].favorite
    }
    //remvoe from favorites
    if (temp.includes(cloth)) {
      let indexToRemove = temp.indexOf(cloth)
      if (indexToRemove !== -1) {
        temp.splice(indexToRemove, 1)
      }
      setInFav(false)
    }
    //add to favorites
    else {
      temp.push(cloth)
      setInFav(true)
    }
    if(currPageState === "chat"){
      chatLog[logIndex].favorite = temp
    } else if(currPageState === "favorites"){
      chatLog[props.chatId].favorite = temp
    }
    setChatLog([...chatLog])
  }

  const renderCards = () => {
    return props.clothingDetails[0].map((cloth: any) => {
      return (
        <div>
          <Card className="p-4 m-0 w-[400px] mr-6">
            <div className="grid grid-cols-2">
              <div className="flex flex-wrap">
                <img
                  className="h-[150px] w-[150px] object-cover"
                  src={cloth[1]}
                ></img>
              </div>

              <div className=" flex flex-col justify-between">
                <div className="text-sm font-medium ">{cloth[0]}</div>
                <div className="flex justify-between">
                  <a href={cloth[2]} target="_blank">
                    <BsBoxArrowInUpRight
                      className={cn(
                        "cursor-pointer bg-background text-3xl text-foreground"
                      )}
                    />
                  </a>
                  
                  <BsHeart
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
  }
  return props.clothingDetails ? <div className="flex flex-row  overflow-x-auto">{renderCards()}</div> : ""
}

export default ClothCard
