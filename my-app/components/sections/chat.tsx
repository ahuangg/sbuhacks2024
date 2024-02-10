import React from "react"
import { chatLogAtom, logIndexAtom, pageStateAtom } from "@/atoms/globalAtoms"
import { useAtom } from "jotai"
import { BsStars } from "react-icons/bs"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const Chat = () => {
  const [currPageState, setCurrPageState] = useAtom(pageStateAtom)
  const [chatLog, setChatLog] = useAtom(chatLogAtom)
  const [logIndex] = useAtom(logIndexAtom)

  React.useEffect(() => {}, [logIndex])

  return (
    <div className="h-[90%]">
      <div className="p-3 flex">
        <Avatar>
          <AvatarFallback>AH</AvatarFallback>
        </Avatar>
        <div className="ml-3">{chatLog[logIndex].userText}</div>
      </div>

      <div className="p-3 flex">
        <Avatar>
          <AvatarFallback>
            <BsStars />
          </AvatarFallback>
        </Avatar>
        <div className="ml-3">{chatLog[logIndex].gptText}</div>
      </div>
	    </div>
  )
}

export default Chat
