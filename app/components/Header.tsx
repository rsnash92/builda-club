'use client'

import Link from 'next/link'
import Image from 'next/image'
import { AuthButton } from './AuthButton'
import { useEffect, useState } from 'react'

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      if (scrollTop > 50) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-in-out ${
        isScrolled 
          ? 'bg-[#15161a]/95 backdrop-blur-md shadow-lg py-2 border-b border-[#24252a]' 
          : 'bg-[#15161a] shadow-sm py-4 border-b border-[#24252a]'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <Image 
                src="/images/logo/builda-logo.webp"
                alt="builda.club"
                width={isScrolled ? 24 : 32}
                height={isScrolled ? 24 : 32}
                className={`transition-all duration-300 ease-in-out`}
                priority
              />
              <span 
                className={`font-bold text-white transition-all duration-300 ease-in-out ${
                  isScrolled ? 'text-xl' : 'text-2xl'
                }`}
              >
                builda.club
              </span>
            </Link>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link 
              href="/" 
              className={`text-white hover:text-violet-400 px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}
            >
              Communities
            </Link>
            <Link 
              href="/projects" 
              className={`text-gray-300 hover:text-violet-400 px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}
            >
              Projects
            </Link>
            <Link 
              href="/economics" 
              className={`text-gray-300 hover:text-violet-400 px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}
            >
              Economics
            </Link>
            <Link 
              href="/create-club" 
              className={`text-gray-300 hover:text-violet-400 px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}
            >
              Create Club
            </Link>
            <Link 
              href="/whitepaper" 
              className={`text-gray-300 hover:text-violet-400 px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                isScrolled ? 'text-sm' : 'text-base'
              }`}
            >
              Whitepaper
            </Link>
          </nav>

          {/* Auth Button */}
          <div className="flex items-center space-x-4">
            <AuthButton />
          </div>
        </div>
      </div>
    </header>
  )
}
