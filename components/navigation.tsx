"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/services", label: "Services" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 w-full z-50 transition-all duration-500 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center group bg-white text-center gap-x-2 justify-start mx-0 px-2">
            <div className="relative w-10 h-10 mr-2 transition-transform duration-300 group-hover:scale-110">
              <Image src="/images/stuph-logo.png" alt="stuph studio" fill className="object-contain" />
            </div>
            <span className="text-lg font-semibold text-black group-hover:text-gray-600 transition-colors duration-300 text-left">
              STUPH STUDIO
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`relative text-sm font-medium transition-all duration-300 hover:text-gray-600 ${
                  pathname === item.href ? "text-black" : "text-gray-500"
                } animate-fade-in-up animate-delay-${index * 100}`}
              >
                {item.label}
                {pathname === item.href && (
                  <span className="absolute -bottom-1 left-0 w-full h-0.5 bg-black rounded-full transition-all duration-300"></span>
                )}
              </Link>
            ))}
            <Button className="btn-primary ml-4 animate-fade-in-up animate-delay-500">Get Started</Button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-black hover:bg-gray-100 transition-all duration-300"
            >
              <div className="relative w-6 h-6">
                <Menu
                  className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-0 rotate-180" : "opacity-100 rotate-0"}`}
                />
                <X
                  className={`absolute inset-0 transition-all duration-300 ${isOpen ? "opacity-100 rotate-0" : "opacity-0 -rotate-180"}`}
                />
              </div>
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-500 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          } overflow-hidden`}
        >
          <div className="px-2 pt-2 pb-6 space-y-1 bg-white/95 backdrop-blur-md rounded-lg mt-2 shadow-lg">
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className={`block px-4 py-3 text-base font-medium transition-all duration-300 rounded-lg hover:bg-gray-50 ${
                  pathname === item.href ? "text-black bg-gray-50" : "text-gray-500"
                } animate-fade-in-left animate-delay-${index * 100}`}
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
            <div className="px-4 py-2">
              <Button className="w-full btn-primary animate-fade-in-left animate-delay-500">Get Started</Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}
