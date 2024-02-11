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
  const [error, setError] = React.useState("")

  const handleClose = async() => {
    setName("")
    setEmail("")
    setPassword("")
    setError("")
  };

  const handleLogin = async () => {
    setError("")

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    let res = null; 
    try {
      res = await axios.post("http://localhost:8080/login", {
        email,
        password,
      });
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 401) {
          setError("Invalid password.");
          return
        } 
        if (error.response?.status === 402) {
          setError("No account attached to given email."); 
          return
        }
        else {
          setError("An error occured during login.")
        }
        return; 
      }
    }
    if (res) { 
      setUserName(res.data.name);
      setPageState("home");
    }
  };

  const handleRegister = async () => {
    setError("")
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must be at least 8 characters long.");
      return;
    }

    if (name.length < 5) {
      setError("Username must be at least 5 characters long.");
      return;
    }
    try {
      await axios.post("http://localhost:8080/register", {
        name,
        email,
        password,
      });
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response?.status === 409) {
          setError("The username or email supplied is already registered to an account.");
        } else {
          setError("An error occurred during registration.");
        }
      }
      return
    }
    setUserName(name)
    setPageState("home")
  };

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
                  <DialogTrigger asChild onClick={handleClose}>
                    <Button variant="ghost">Login</Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[425px]">
                    <DialogHeader >
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
                          type="password"
                          value={password}
                          className="col-span-3"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                      </div>
                      {error && (
                        <p className="text-red-500 text-sm-center">{error}</p>
                      )}
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
                  <DialogTrigger asChild onClick={handleClose}>
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
                          required
                          title="Password must contain at least one number,  
                          one alphabet, one symbol, and be at  
                          least 8 characters long"
                        />
                      </div>
                      {error && (
                        <p className="text-red-500 text-sm-center">{error}</p>
                      )}
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
