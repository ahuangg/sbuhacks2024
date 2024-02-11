"use client"

import React from "react"
import { chatLogAtom, logIndexAtom, pageStateAtom } from "@/atoms/globalAtoms"
import { useAtom } from "jotai"
import { BsArrowLeftShort, BsChat, BsHeart, BsPlusCircle } from "react-icons/bs"

import { cn } from "@/lib/utils"
import { useSidebar } from "@/hooks/useSidebar"
import { Label } from "@/components/ui/label"

const Sidebar = () => {
  const { isOpen, toggle } = useSidebar()
  const [status, setStatus] = React.useState(false)
  const [currPageState, setPageState] = useAtom(pageStateAtom)
  const [chatLog, setChatLog] = useAtom(chatLogAtom)
  const [logIndex, setLogIndex] = useAtom(logIndexAtom)

  const handleToggle = () => {
    setStatus(true)
    toggle()
    setTimeout(() => setStatus(false), 500)
  }

  return (
    <nav
      className={cn(
        `relative hidden h-screen border-r pt-20 md:block`,
        status && "duration-500",
        !isOpen ? "w-64" : "w-[78px]"
      )}
    >
      <BsArrowLeftShort
        className={cn(
          "absolute -right-3 top-20 cursor-pointer rounded-full border bg-background text-3xl text-foreground",
          isOpen && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4 ml-3">
        <div className="px-3 py-2">
        <div
            className="flex mt-6 space-y-1  gap-2"
            onClick={() => {
              setPageState("favorites")
              console.log("favorites page")
            }}
          >
        <Label className="flex">
              <BsHeart
                className={cn(
                  "cursor-pointer text-3xl text-foreground"
                )}
              />
              <div className={cn("flex items-center", !isOpen && "ml-3")}>
                {!isOpen ? "Favorites" : ""}
              </div>
            </Label>
          </div>
          <div
            className="flex mt-6 space-y-1  gap-2"
            onClick={() => {
              setPageState("home")
            }}
          >
            <Label className="flex">
              <BsPlusCircle
                className={cn(
                  "cursor-pointer rounded-full border text-3xl text-foreground"
                )}
              />
              <div className={cn("flex items-center", !isOpen && "ml-3")}>
                {!isOpen ? "New Chat" : ""}
              </div>
            </Label>
            
          </div>

          {isOpen ? (
            ""
          ) : (
            <>
              <p className="text-sm font-medium text-slate-500 mt-6 mb-3">
                Recents
              </p>
              {chatLog.map((log) => {
                return (
                  <div
                    className="flex space-y-1 gap-2  ml-3"
                    onClick={() => {
                      setLogIndex(log.chatId)
                      setPageState("chat")
                    }}
                  >
                    <Label className="flex">
                      <BsChat
                        className={cn(
                          "cursor-pointer bg-background text-3xl text-foreground"
                        )}
                      />
                      <div
                        className={cn(
                          "flex items-center text-sm",
                          !isOpen && "ml-3"
                        )}
                      >
                        {log.userText}
                      </div>
                    </Label>
                  </div>
                )
              })}
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
