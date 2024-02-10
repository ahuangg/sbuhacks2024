import React from "react"
import { BsStars } from "react-icons/bs"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

const Home = () => {
  let recommendations = [
    {
      occasion: "Wedding Anniversary",
      description:
        "Celebrates the years since a couple's wedding with romantic dinners, gifts, or parties.",
    },
    {
      occasion: "Graduation Ceremony",
      description:
        "Marks the completion of academic achievements with formal ceremonies and celebrations.",
    },
    {
      occasion: "Birthday Party",
      description:
        "An annual celebration with cake, gifts, and gatherings to honor someone's birth.",
    },
    {
      occasion: "Baby Shower",
      description:
        "A party for an expectant mother, offering support and gifts for the new baby.",
    },
    {
      occasion: "Retirement Party",
      description:
        "Celebrates the end of a professional career with colleagues, friends, and family.",
    },
    {
      occasion: "Housewarming Party",
      description:
        "Welcomes guests to a new home, showcasing the space and receiving gifts.",
    },
  ]

  return (
    <div className="h-[90%]">
      <h1 className="text-5xl font-medium bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
        Hello, Alan.
      </h1>
      <h1 className="text-5xl font-medium text-slate-600">
        What occasion are you attending today?
      </h1>

      <div className="h-full flex justify-center items-center">
        <div className="grid grid-cols-3 gap-4">
          {recommendations.map((recc) => {
            return (
              <Card>
                <CardHeader>
                  <CardTitle>{recc.occasion}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600">{recc.description}</p>
                </CardContent>
                <CardFooter className="flex justify-end">
                  <BsStars />
                </CardFooter>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Home
