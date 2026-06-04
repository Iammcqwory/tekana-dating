"use client"

import * as React from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Menu, X, Sun, Moon, Heart, MessageSquare, User, Home, Users, Calendar, Globe, Crown, Flame, Zap, Trophy } from "lucide-react"
import { useTheme } from "next-themes"
import { useState } from "react"

export function Navbar() {
  const { setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-xl items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <a href="/" className="flex items-center gap-2">
            <Heart className="h-6 w-6 text-rose-500" />
            <span className="text-xl font-bold">Tekana</span>
          </a>
        </div>

        <div className={cn(
          "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in md:hidden bg-background",
          isMenuOpen ? "slide-in-from-bottom-80" : "hidden"
        )}>
          <div className="relative z-20 grid gap-6 rounded-md p-4">
            <a href="/discover" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-lg">
              <Users className="h-5 w-5" /> Discover
            </a>
            <a href="/messages" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-lg">
              <MessageSquare className="h-5 w-5" /> Messages
            </a>
            <a href="/events" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-lg">
              <Calendar className="h-5 w-5" /> Events
            </a>
            <a href="/community" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-lg">
              <Globe className="h-5 w-5" /> Community
            </a>
            <a href="/premium" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-lg font-medium text-amber-600">
              <Crown className="h-5 w-5" /> Premium
            </a>
            <a href="/rewards" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-lg font-medium text-rose-600">
              <Flame className="h-5 w-5" /> Rewards (7d Streak)
            </a>
            <a href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-2 text-lg">
              <User className="h-5 w-5" /> Profile
            </a>
            <div className="flex items-center">
              <Button onClick={() => setTheme("light")} variant="ghost" size="icon" aria-label="Light Mode">
                <Sun className="h-5 w-5" />
              </Button>
              <Button onClick={() => setTheme("dark")} variant="ghost" size="icon" aria-label="Dark Mode">
                <Moon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        <nav className="hidden gap-6 md:flex">
          <a href="/discover" className="flex items-center gap-1 text-sm font-medium">
            <Users className="h-4 w-4" /> Discover
          </a>
          <a href="/messages" className="flex items-center gap-1 text-sm font-medium">
            <MessageSquare className="h-4 w-4" /> Messages
          </a>
          <a href="/events" className="flex items-center gap-1 text-sm font-medium">
            <Calendar className="h-4 w-4" /> Events
          </a>
          <a href="/community" className="flex items-center gap-1 text-sm font-medium">
            <Globe className="h-4 w-4" /> Community
          </a>
          <a href="/premium" className="flex items-center gap-1 text-sm font-medium text-amber-600 dark:text-amber-500">
            <Crown className="h-4 w-4" /> Premium
          </a>
          <a href="/rewards" className="flex items-center gap-1 text-sm font-medium bg-rose-50 dark:bg-rose-950/30 px-2 py-1 rounded-full text-rose-600 group hover:bg-rose-100 transition-colors">
            <Flame className="h-4 w-4 fill-rose-500 animate-pulse" />
            <span className="font-bold">7</span>
            <Zap className="h-4 w-4 fill-amber-400 text-amber-500 ml-1" />
            <span className="text-xs">1.2k</span>
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle Theme">
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  Dark
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("system")}>
                  System
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          <a href="/profile">
            <Button variant="ghost" size="icon" className="hidden md:flex">
              <User className="h-5 w-5" />
              <span className="sr-only">Profile</span>
            </Button>
          </a>

          <a href="/auth/login">
            <Button variant="default" size="sm" className="bg-rose-500 hover:bg-rose-600">
              Sign In
            </Button>
          </a>
        </div>
      </div>
    </header>
  )
}
