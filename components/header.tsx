"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { MobileSidebar } from "@/components/mobile-sidebar"

// শুধুমাত্র প্রয়োজনীয় আইটেমগুলো রাখা হয়েছে: Home এবং Converter
const navigationItems = [
  {
    name: "Home",
    href: "#home",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
        <polyline points="9,22 9,12 15,12 15,22" />
      </svg>
    ),
  },
  {
    name: "Converter",
    href: "#converter",
    icon: (
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
        <circle cx="9" cy="9" r="2" />
        <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
      </svg>
    ),
  },
]

export function Header() {
  // Dark Mode স্টেট ম্যানেজমেন্ট
  const [isDarkMode, setIsDarkMode] = useState(false)
  // মোবাইল সাইডবার স্টেট ম্যানেজমেন্ট
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  // Dark Mode টগল ফাংশন
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
    // CSS ক্লাস টগল করে থিম পরিবর্তন করে
    document.documentElement.classList.toggle("dark")
  }

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center justify-between px-4">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center bg-primary text-primary-foreground">
              <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                <circle cx="9" cy="9" r="2" />
                <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">OSPixel</h1>
              <p className="text-xs text-muted-foreground font-manrope">Advanced Converter</p>
            </div>
          </div>

          {/* Navigation Links (Desktop) */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigationItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground hover:text-primary hover:bg-muted transition-all duration-200 group"
              >
                <div className="text-muted-foreground group-hover:text-primary transition-colors">{item.icon}</div>
                <span>{item.name}</span>
              </a>
            ))}
          </nav>

          {/* Actions - "Get Started" removed */}
          <div className="flex items-center gap-3">
            {/* Dark/Light Mode Toggle Button */}
            <Button variant="ghost" size="sm" onClick={toggleDarkMode} className="h-9 w-9 p-0">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isDarkMode ? "hidden" : "block"}
              >
                <circle cx="12" cy="12" r="5" />
                <path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42" />
              </svg>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className={isDarkMode ? "block" : "hidden"}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
              </svg>
            </Button>

            {/* "Get Started" Button removed from here */}

            {/* Mobile Sidebar Toggle Button */}
            <Button variant="ghost" size="sm" className="lg:hidden h-9 w-9 p-0" onClick={() => setIsSidebarOpen(true)}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="4" x2="20" y1="12" y2="12" />
                <line x1="4" x2="20" y1="6" y2="6" />
                <line x1="4" x2="20" y1="18" y2="18" />
              </svg>
            </Button>
          </div>
        </div>
      </header>
      
      {/* MobileSidebar কম্পোনেন্ট আপডেট করা প্রয়োজন যাতে এটি শুধুমাত্র Home এবং Converter দেখায় */}
      <MobileSidebar 
        isOpen={isSidebarOpen} 
        onClose={() => setIsSidebarOpen(false)} 
        navigationItems={navigationItems} // এখন শুধুমাত্র Home এবং Converter থাকবে
      />
    </>
  )
}
