"use client"

import React from "react"
import { BsArrowLeftShort } from "react-icons/bs"

import { cn } from "@/lib/utils"
import { useSidebar } from "@/hooks/useSidebar"

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
        !isOpen ? "w-72" : "w-[78px]"
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
          <div className="mt-3 space-y-1"></div>
        </div>
      </div>
    </nav>
  )
}

export default Sidebar
