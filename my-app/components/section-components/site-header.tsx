"use client"

import React from "react"
import { pageStateAtom, userAtom } from "@/atoms/globalAtoms"
import axios from "axios"
import { useAtom } from "jotai"

import { siteConfig } from "@/config/site"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { MainNav } from "@/components/section-components/main-nav"
import { ThemeToggle } from "@/components/theme-toggle"

export function SiteHeader() {
  const [name, setName] = React.useState("")
  const [email, setEmail] = React.useState("")
  const [password, setPassword] = React.useState("")
  const [userName, setUserName] = useAtom(userAtom)
  const [currPageState, setPageState] = useAtom(pageStateAtom)

  const handleLogin = async () => {
    const res = await axios.post("http://localhost:8080/login", {
      email,
      password,
    })
    setUserName(res.data.name)
    setPageState("home")
  }

  const handleRegister = async () => {
    await axios.post("http://localhost:8080/register", {
      name,
      email,
      password,
    })

    setUserName(name)
    setPageState("home")
  }

  return (
    <header className="bg-background sticky top-0 z-40 w-full border-b">
      <div className="container flex h-16 items-center space-x-4 sm:justify-between sm:space-x-0">
        <MainNav items={siteConfig.mainNav} />
        <div className="flex flex-1 items-center justify-end space-x-4">
          <nav className="flex items-center space-x-1">
            <ThemeToggle />
            {userName === "Guest" ? (
              <>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="ghost">Login</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Login</DialogTitle>
                      <DialogDescription>
                        Enter email and password to login your account.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          value={email}
                          className="col-span-3"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                          Password
                        </Label>
                        <Input
                          id="password"
                          value={password}
                          className="col-span-3"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() => {
                          handleLogin()
                        }}
                      >
                        Login
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>

                <Dialog>
                  <DialogTrigger asChild>
                    <Button>Register</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader>
                      <DialogTitle>Register</DialogTitle>
                      <DialogDescription>
                        Enter credentials to create a account
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="name" className="text-right">
                          Username
                        </Label>
                        <Input
                          id="name"
                          value={name}
                          className="col-span-3"
                          onChange={(e) => setName(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="email" className="text-right">
                          Email
                        </Label>
                        <Input
                          id="email"
                          value={email}
                          className="col-span-3"
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label htmlFor="password" className="text-right">
                          Password
                        </Label>
                        <Input
                          id="password"
                          value={password}
                          className="col-span-3"
                          type="password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                    </div>
                    <DialogFooter>
                      <Button
                        type="submit"
                        onClick={() => {
                          handleRegister()
                        }}
                      >
                        Register
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </>
            ) : (
              <Avatar>
                <AvatarFallback>AH</AvatarFallback>
              </Avatar>
            )}
          </nav>
        </div>
      </div>
    </header>
  )
}
