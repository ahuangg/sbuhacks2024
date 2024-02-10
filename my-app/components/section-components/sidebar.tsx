"use client"

import React from "react"
import { BsArrowLeftShort, BsPlusCircle } from "react-icons/bs"

import { cn } from "@/lib/utils"
import { useSidebar } from "@/hooks/useSidebar"
import { Label } from "@/components/ui/label"

const Sidebar = () => {
  const { isOpen, toggle } = useSidebar()
  const [status, setStatus] = React.useState(false)

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
          !isOpen && "rotate-180"
        )}
        onClick={handleToggle}
      />
      <div className="space-y-4 py-4">
        <div className="px-3 py-2">
          <div className="flex mt-6 space-y-1 justify-center gap-2 ">
            <Label className="flex">
              <BsPlusCircle
                className={cn(
                  "cursor-pointer rounded-full border bg-background text-3xl text-foreground"
                )}
              />
              <div className={cn("flex items-center", !isOpen && "ml-3")}>
                {!isOpen ? "New Chat" : ""}
              </div>
            </Label>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
