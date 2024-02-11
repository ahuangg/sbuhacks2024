import React from "react"
import { BsBoxArrowInUpRight, BsStar } from "react-icons/bs"

import { cn } from "@/lib/utils"
import { Card, CardContent, CardFooter } from "@/components/ui/card"

interface ClothCardProps {
  clothingDetails: any
}

const ClothCard = (props: ClothCardProps) => {
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
                  <BsStar
                    className={cn(
                      "cursor-pointer bg-background text-3xl text-foreground"
                    )}
                  />
                </div>
              </div>
            </div>
          </Card>
        </div>
      )
    })
  }
  return <div className="flex flex-row  overflow-x-auto">{renderCards()}</div>
}

export default ClothCard
