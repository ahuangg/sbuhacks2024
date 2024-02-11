import React from "react"

import ClothCard from "./cloth-card"

interface ClothContentProps {
  contentData: any
}

const ClothContent = (props: ClothContentProps) => {
  console.log(props.contentData)
  return (

    <div>
      {props.contentData.clothes.map((cloth: string, index: number) => {
        return (
          <div>
            <h1 className="text-l font-semibold">{cloth}</h1>
            <p className="text-sm font-medium text-slate-600">
              {props.contentData.description[index]}
            </p>
            <div className="my-2">
              <ClothCard
                clothingDetails={props.contentData.details[`item${index}`]}
                chatId={0}
              />
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default ClothContent
