"use client"

import { Home, User, Play, Calendar, ShoppingBag, Trophy, Settings, Building2, X, MessageCircle } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DashboardSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
  isOpen?: boolean
  onClose?: () => void
}

const navigationItems = [
  { id: "overview", label: "Dashboard", icon: Home },
  { id: "profile", label: "ARMY Profile", icon: User, badge: "VIP" },
  { id: "content", label: "Exclusive Content", icon: Play, badge: "New" },
  { id: "events", label: "Events & Concerts", icon: Calendar },
  { id: "merch", label: "Merch & Collectibles", icon: ShoppingBag },
  { id: "rewards", label: "Rewards", icon: Trophy, badge: "12" },
  { id: "settings", label: "Settings", icon: Settings },
]

export function DashboardSidebar({ activeSection, onSectionChange, isOpen = false, onClose }: DashboardSidebarProps) {
  const handleSectionChange = (section: string) => {
    onSectionChange(section)
    if (onClose) {
      onClose()
    }
  }

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && <div className="fixed inset-0 z-40 bg-black/50 lg:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 bg-black border-r border-gray-800 transform transition-transform duration-300 ease-in-out",
          "lg:translate-x-0 lg:static lg:z-40",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
        )}
      >
        <div className="flex flex-col h-full">
          {/* Mobile close button */}
          <div className="flex items-center justify-between p-4 lg:hidden">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 text-white" />
              <h1 className="text-lg font-bold text-white hybe-logo">HYBE</h1>
            </div>
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-gray-800">
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Desktop header */}
          <div className="hidden lg:block p-4 sm:p-6 border-b border-gray-800">
            <div className="flex items-center space-x-2">
              <Building2 className="h-6 w-6 sm:h-8 sm:w-8 text-white" />
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-white hybe-logo">HYBE ACCOUNT</h1>
                <p className="text-xs text-gray-400">Digital Fan Platform</p>
              </div>
            </div>
          </div>

          {/* User info */}
          <div className="p-3 sm:p-4 border-b border-gray-800">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white text-black flex items-center justify-center font-bold text-sm">
                A
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-medium text-sm text-white truncate">ARMY Member</p>
                <div className="flex items-center space-x-1">
                  <Badge variant="secondary" className="text-xs bg-gray-800 text-white border-gray-700">
                    Premium
                  </Badge>
                </div>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-3 sm:p-4 space-y-1 sm:space-y-2 overflow-y-auto">
            {navigationItems.map((item) => {
              const Icon = item.icon
              const isActive = activeSection === item.id

              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={cn(
                    "w-full justify-start h-9 sm:h-10 px-3 text-gray-300 hover:text-white hover:bg-gray-900 text-sm",
                    isActive && "bg-white text-black hover:bg-gray-100 hover:text-black",
                  )}
                  onClick={() => handleSectionChange(item.id)}
                >
                  <Icon className="h-4 w-4 mr-3 flex-shrink-0" />
                  <span className="flex-1 text-left truncate">{item.label}</span>
                  {item.badge && (
                    <Badge
                      variant="secondary"
                      className={cn(
                        "ml-2 text-xs flex-shrink-0",
                        isActive ? "bg-black text-white" : "bg-gray-800 text-white border-gray-700",
                      )}
                    >
                      {item.badge}
                    </Badge>
                  )}
                </Button>
              )
            })}
          </nav>

          {/* Footer */}
          <div className="p-3 sm:p-4 border-t border-gray-800">
            <div className="text-center space-y-1">
              <p className="text-xs text-gray-500">© HYBE. All Rights Reserved</p>
              <div className="flex items-center justify-center">
                <span className="text-xs font-medium text-gray-400">Official Fan Platform</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
