import React from "react"
import { chatLogAtom, logIndexAtom, pageStateAtom } from "@/atoms/globalAtoms"
import { useAtom } from "jotai"
import { BsStars } from "react-icons/bs"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

import ClothContent from "../section-components/cloth-content"

const Chat = () => {
  const [currPageState, setCurrPageState] = useAtom(pageStateAtom)
  const [chatLog, setChatLog] = useAtom(chatLogAtom)
  const [logIndex] = useAtom(logIndexAtom)

  React.useEffect(() => {}, [logIndex])

  return (
    <div className="h-[90%]">
      <div className="p-3 flex items-center">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>AH</AvatarFallback>
        </Avatar>
        <div className="ml-3">{chatLog[logIndex].userText}</div>
      </div>
      <div className="p-3 flex items-center">
        <Avatar>
          <AvatarFallback>
            <BsStars />
          </AvatarFallback>
        </Avatar>
        <div className="ml-3">{chatLog[logIndex].gptText}</div>
      </div>

      <Tabs defaultValue="female" className="w-full p-3 ml-[45px]">
        <TabsList>
          <TabsTrigger value="female">Female</TabsTrigger>
          <TabsTrigger value="male">Male</TabsTrigger>
        </TabsList>

        <TabsContent value="female">
          <ClothContent contentData={chatLog[logIndex].femaleRes} />
        </TabsContent>
        <TabsContent value="male">
          <ClothContent contentData={chatLog[logIndex].maleRes} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

export default Chat
