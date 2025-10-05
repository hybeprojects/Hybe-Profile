"use client"

"use client"

import { useState } from "react"
import { Logo } from "@/components/ui/logo"
import { Button } from "@/components/ui/button"
import { Menu, X, ChevronDown } from "lucide-react"

export function HybeHeader() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  const navigation = [
    {
      name: "COMPANY",
      items: [
        { name: "기업소개", href: "/company/info" },
        { name: "아티스트", href: "/company/artist" },
        { name: "비즈니스", href: "/company/business" },
        { name: "윤리경영", href: "/company/ethical" },
      ],
    },
    {
      name: "INVESTORS",
      items: [
        { name: "IR자료실", href: "/ir/archive" },
        { name: "IR행사일정", href: "/ir/event" },
        { name: "주식정보", href: "/ir/share" },
        { name: "재무정보", href: "/ir/finance" },
      ],
    },
    {
      name: "NEWSROOM",
      items: [
        { name: "보도자료", href: "/news/news" },
        { name: "알려드립니다", href: "/news/announcements" },
        { name: "안내사항", href: "/news/notice" },
      ],
    },
    {
      name: "CAREERS",
      items: [
        { name: "HYBE DNA", href: "/career/crew" },
        { name: "지원하기", href: "https://careers.hybecorp.com/?locale=ko_KR" },
      ],
    },
  ]

  const languages = [
    { code: "KOR", name: "한국어", active: true },
    { code: "ENG", name: "English" },
    { code: "CHN", name: "中文" },
    { code: "JPN", name: "日本語" },
  ]

  return (
    <header className="header bg-black text-white relative z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <h1 className="logo">
            <a href="/" className="text-2xl lg:text-3xl font-bold tracking-tight hover:opacity-80 transition-opacity">
              !hybe
            </a>
          </h1>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            <div className="flex items-center space-x-8">
              {navigation.map((item) => (
                <div
                  key={item.name}
                  className="relative group"
                  onMouseEnter={() => setActiveDropdown(item.name)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <button className="text-sm font-medium hover:opacity-80 transition-opacity py-2">{item.name}</button>

                  {/* Dropdown Menu */}
                  <div
                    className={`absolute top-full left-0 mt-2 w-48 bg-black border border-gray-800 rounded-md shadow-lg transition-all duration-200 ${
                      activeDropdown === item.name ? "opacity-100 visible" : "opacity-0 invisible"
                    }`}
                  >
                    <div className="py-2">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block px-4 py-2 text-sm hover:bg-gray-900 transition-colors"
                          target={subItem.href.startsWith("http") ? "_blank" : undefined}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Language Selector */}
            <div className="relative group">
              <button className="flex items-center space-x-1 text-sm font-medium hover:opacity-80 transition-opacity">
                <span>KOR</span>
                <ChevronDown className="w-4 h-4" />
              </button>

              <div className="absolute top-full right-0 mt-2 w-24 bg-black border border-gray-800 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                <div className="py-2">
                  {languages.map((lang) => (
                    <a
                      key={lang.code}
                      href="#"
                      className={`block px-4 py-2 text-sm hover:bg-gray-900 transition-colors ${
                        lang.active ? "text-purple-400" : ""
                      }`}
                    >
                      {lang.code}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-gray-900"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black border-t border-gray-800">
            <div className="container mx-auto px-4 py-4">
              <nav className="space-y-4">
                {navigation.map((item) => (
                  <div key={item.name} className="space-y-2">
                    <div className="font-medium text-sm text-gray-300">{item.name}</div>
                    <div className="pl-4 space-y-2">
                      {item.items.map((subItem) => (
                        <a
                          key={subItem.name}
                          href={subItem.href}
                          className="block text-sm hover:text-purple-400 transition-colors"
                          target={subItem.href.startsWith("http") ? "_blank" : undefined}
                        >
                          {subItem.name}
                        </a>
                      ))}
                    </div>
                  </div>
                ))}

                {/* Mobile Language Selector */}
                <div className="pt-4 border-t border-gray-800">
                  <div className="font-medium text-sm text-gray-300 mb-2">Language</div>
                  <div className="flex space-x-4">
                    {languages.map((lang) => (
                      <a
                        key={lang.code}
                        href="#"
                        className={`text-sm hover:text-purple-400 transition-colors ${
                          lang.active ? "text-purple-400" : ""
                        }`}
                      >
                        {lang.code}
                      </a>
                    ))}
                  </div>
                </div>
              </nav>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
