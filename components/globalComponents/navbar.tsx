'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import { Menu, X, Search, User, Sparkles as SparklesIcon } from 'lucide-react'
import { motion } from 'framer-motion'
import { Button } from '../ui/button'
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar'
import { Sheet, SheetContent, SheetTrigger } from '../ui/sheet'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu'
import { Sparkles } from '../ui/sparkles'
import { ThemeToggle } from './theme-toggle'
import { UserButton } from '@clerk/nextjs'

export default function Navbar() {
  const path = usePathname()
  const router = useRouter()

  const links = [
    { path: '/', text: 'Home' },
    { path: '/idea', text: 'New Idea' },
    { path: '/hackathons', text: 'Hackathons' },
    { path: '/myIdeas', text: 'My Ideas' },
    { path: '/sample', text: 'All Ideas' },
  ]

  return (
    <header className="fixed left-0 top-0 z-50 w-full backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-20 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <motion.div
              initial={{ scale: 0.8, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Sparkles>
                <h1 className="text-2xl font-bold tracking-tight text-orange-600 font-orbitron">
                  HackScraper
                </h1>
              </Sparkles>
            </motion.div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-2">
            {links.map((link) => (
              <Button
                key={link.path}
                variant={path === link.path ? "default" : "ghost"}
                onClick={() => router.push(link.path)}
                className="rounded-full transition-all"
              >
                {link.text}
              </Button>
            ))}
          </nav>

          {/* Search and User Actions */}
          <div className="flex items-center gap-3">
            <ThemeToggle />

            <UserButton />

            {/* Mobile Menu */}
            <Sheet>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon" className="rounded-full">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent>
                <div className="flex flex-col gap-6 pt-6">
                  {links.map((link) => (
                    <Link key={link.path} href={link.path}>
                      <Button
                        variant={path === link.path ? "default" : "ghost"}
                        className="w-full justify-start"
                      >
                        {link.text}
                      </Button>
                    </Link>
                  ))}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}
