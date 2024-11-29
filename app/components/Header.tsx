"use client"

import * as React from "react"
import Link from "next/link"
import { ModeToggle } from "./ModeToggle"
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { NavigationMobile } from "./NavigationMobile"
import { Bot, Sparkles } from "lucide-react"

const components = [
  {
    title: "Dashboard",
    href: "/ai-assistant",
    description: "View your learning dashboard"
  },
  {
    title: "Summarize",
    href: "/summarize",
    description: "Generate AI summaries of your documents"
  },
  {
    title: "Podcast",
    href: "/podcast",
    description: "Convert PDFs to engaging podcast conversations"
  },
  {
    title: "Materials",
    href: "/materials",
    description: "Manage your learning materials"
  },
  {
    title: "Quiz",
    href: "/quiz",
    description: "Create quizzes based on your documents"
  }
]

export function Header() {
  return (
    <header className="supports-backdrop-blur:bg-background/90 sticky top-0 z-40 w-full bg-background/40 backdrop-blur-lg border-b border-border">
      <div className="flex h-16 items-center justify-between px-4 max-w-7xl mx-auto">
        <div className="flex items-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image src="/learning-hub-logo.png" alt="Learning Hub" width={32} height={32} />
            <span className="text-xl font-bold">Learning Hub</span>
          </Link>
        </div>
        <div className="hidden md:block">
          <NavigationMenu>
            <NavigationMenuList>
              {components.map((item) => (
                <NavigationMenuItem key={item.title}>
                  <Link href={item.href} legacyBehavior passHref>
                    <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                      {item.title}
                    </NavigationMenuLink>
                  </Link>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>
        </div>
        <nav className="flex items-center space-x-4">
          <div className="md:hidden">
            <NavigationMobile components={components} />
          </div>
          <ModeToggle />
          <Button 
            variant="ghost" 
            size="sm" 
            className="hidden relative group"
            asChild
          >
            <Link href="/ai-assistant" className="flex items-center gap-2">
              <Bot className="h-5 w-5 text-primary transition-transform group-hover:scale-110" />
              <span className="font-medium">Assistant</span>
              <Sparkles className="absolute -top-1 -right-1 h-3 w-3 text-primary opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  )
}