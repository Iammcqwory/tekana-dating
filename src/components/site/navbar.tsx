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
import { Menu, X, Sun, Moon, Heart, MessageSquare, User, Users, Calendar, Globe, Crown, Flame, Zap } from "lucide-react"
import { useTheme } from "next-themes"
import { useState, useEffect } from "react"

export function Navbar() {
  const { theme, setTheme } = useTheme()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll, { passive: true })
    handleScroll()
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <header className={cn(
      "sticky top-0 z-50 w-full transition-all duration-300",
      scrolled
        ? "border-b border-border/40 bg-background/80 backdrop-blur-xl shadow-sm"
        : "bg-transparent"
    )}>
      <div className="container flex h-16 max-w-screen-xl items-center justify-between mx-auto px-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
          <a href="/" className="flex items-center gap-2 group">
            <div className="relative">
              <Heart className="h-6 w-6 text-rose-500 transition-transform group-hover:scale-110" />
              <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-foreground to-foreground/80 bg-clip-text">Tekana</span>
          </a>
        </div>

        {/* Mobile Menu */}
        <div className={cn(
          "fixed inset-0 top-16 z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md md:hidden bg-background/95 backdrop-blur-xl",
          isMenuOpen ? "animate-fade-in" : "hidden"
        )}>
          <div className="relative z-20 grid gap-6 rounded-md p-4">
            <a href="/discover" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg hover:text-rose-500 transition-colors">
              <Users className="h-5 w-5" /> Discover
            </a>
            <a href="/messages" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg hover:text-rose-500 transition-colors">
              <MessageSquare className="h-5 w-5" /> Messages
            </a>
            <a href="/events" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg hover:text-rose-500 transition-colors">
              <Calendar className="h-5 w-5" /> Events
            </a>
            <a href="/community" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg hover:text-rose-500 transition-colors">
              <Globe className="h-5 w-5" /> Community
            </a>
            <a href="/premium" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg font-medium text-amber-600">
              <Crown className="h-5 w-5" /> Premium
            </a>
            <a href="/rewards" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg font-medium text-rose-600">
              <Flame className="h-5 w-5" /> Rewards (7d Streak)
            </a>
            <a href="/profile" onClick={() => setIsMenuOpen(false)} className="flex items-center gap-3 text-lg hover:text-rose-500 transition-colors">
              <User className="h-5 w-5" /> Profile
            </a>
            <div className="flex items-center gap-2 pt-4 border-t border-border/40">
              <Button onClick={() => setTheme("light")} variant={theme === "light" ? "default" : "ghost"} size="icon" aria-label="Light Mode">
                <Sun className="h-5 w-5" />
              </Button>
              <Button onClick={() => setTheme("dark")} variant={theme === "dark" ? "default" : "ghost"} size="icon" aria-label="Dark Mode">
                <Moon className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden gap-1 md:flex items-center">
          <a href="/discover" className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Users className="h-4 w-4" /> Discover
          </a>
          <a href="/messages" className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
            <MessageSquare className="h-4 w-4" /> Messages
          </a>
          <a href="/events" className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Calendar className="h-4 w-4" /> Events
          </a>
          <a href="/community" className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg hover:bg-muted/50 transition-colors">
            <Globe className="h-4 w-4" /> Community
          </a>
          <a href="/premium" className="flex items-center gap-1.5 text-sm font-medium px-3 py-2 rounded-lg text-amber-600 dark:text-amber-500 hover:bg-amber-50 dark:hover:bg-amber-950/30 transition-colors">
            <Crown className="h-4 w-4" /> Premium
          </a>
          <a href="/rewards" className="flex items-center gap-1.5 text-sm font-medium bg-rose-50 dark:bg-rose-950/30 px-3 py-1.5 rounded-full text-rose-600 group hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors">
            <Flame className="h-4 w-4 fill-rose-500 animate-pulse" />
            <span className="font-bold">7</span>
            <Zap className="h-4 w-4 fill-amber-400 text-amber-500 ml-0.5" />
            <span className="text-xs">1.2k</span>
          </a>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden md:flex">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Toggle Theme" className="relative">
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Toggle theme</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => setTheme("light")}>
                  <Sun className="h-4 w-4 mr-2" /> Light
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setTheme("dark")}>
                  <Moon className="h-4 w-4 mr-2" /> Dark
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
            <Button variant="default" size="sm" className="bg-rose-500 hover:bg-rose-600 text-white shadow-lg shadow-rose-500/20 hover:shadow-rose-500/30 transition-all hover:-translate-y-0.5">
              Sign In
            </Button>
          </a>
        </div>
      </div>
    </header>
  )
}
