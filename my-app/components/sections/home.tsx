import React from "react"
import {
  chatLogAtom,
  logIndexAtom,
  pageStateAtom,
  searchTextAtom,
  userAtom,
} from "@/atoms/globalAtoms"
import {
  babyshower,
  birthday,
  graduation,
  housewarming,
  retirement,
  wedding,
} from "@/data/data"
import { useAtom } from "jotai"
import { BsSearch } from "react-icons/bs"

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import SearchBar from "../section-components/searchbar"

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

let occasion_mapping: any = {
  "Wedding Anniversary": wedding,
  "Graduation Ceremony": graduation,
  "Birthday Party": birthday,
  "Baby Shower": babyshower,
  "Retirement Party": retirement,
  "Housewarming Party": housewarming,
}

const Home = () => {
  const [currPageState, setCurrPageState] = useAtom(pageStateAtom)
  const [logIndex, setLogIndex] = useAtom(logIndexAtom)
  const [chatLog, setChatLog] = useAtom(chatLogAtom)
  const [currSearchText, setSearchText] = useAtom(searchTextAtom)
  const [userName, setUserName] = useAtom(userAtom)

  const handleRecommendations = (occasion: any) => {
    let gptText = occasion_mapping[occasion]
    setChatLog([
      ...chatLog,
      {
        chatId: chatLog.length,
        userText: occasion,
        gptText: `Here is your response for ${occasion}`,
        maleRes: gptText.male,
        femaleRes: gptText.female,
        favorite: [],
      },
    ])

    setLogIndex(() => chatLog.length)
    setSearchText("")
    setCurrPageState("chat")
  }
  return (
    <React.Fragment>
      <div className="h-[90%]">
        <h1 className="text-5xl font-medium bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
          {`Hello, ${userName}`}
        </h1>
        <h1 className="text-5xl font-medium text-slate-600">
          What occasion are you attending today?
        </h1>

        <div className="h-full flex justify-center items-center">
          <div className="grid grid-cols-3 gap-4">
            {recommendations.map((recc) => {
              return (
                <Card
                  onClick={() => {
                    handleRecommendations(recc.occasion)
                    setCurrPageState("chat")
                  }}
                >
                  <CardHeader>
                    <CardTitle>{recc.occasion}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600">{recc.description}</p>
                  </CardContent>
                  <CardFooter className="flex justify-end">
                    <BsSearch />
                  </CardFooter>
                </Card>
              )
            })}
          </div>
        </div>
      </div>
      <div className="flex justify-bottom">
        <SearchBar />
      </div>
    </React.Fragment>
  )
}

export default Home
