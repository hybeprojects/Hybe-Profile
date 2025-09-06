"use client"

import { Home, User, Play, Calendar, ShoppingBag, Trophy, Settings, Sparkles, Crown, Heart } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface DashboardSidebarProps {
  activeSection: string
  onSectionChange: (section: string) => void
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

export function DashboardSidebar({ activeSection, onSectionChange }: DashboardSidebarProps) {
  return (
    <div className="fixed inset-y-0 left-0 z-50 w-64 bg-card/95 backdrop-blur-sm border-r border-border lg:block hidden">
      <div className="flex flex-col h-full">
        {/* Header */}
        <div className="p-6 border-b border-border">
          <div className="flex items-center space-x-2">
            <Sparkles className="h-8 w-8 text-primary animate-pulse" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                HYBE ACCOUNT
              </h1>
              <p className="text-xs text-muted-foreground">Digital Fan Passport</p>
            </div>
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Crown className="h-5 w-5 text-white" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">ARMY Member</p>
              <div className="flex items-center space-x-1">
                <Badge variant="secondary" className="text-xs">
                  Premium
                </Badge>
                <Heart className="h-3 w-3 text-red-500 fill-current" />
              </div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-4 space-y-2">
          {navigationItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id

            return (
              <Button
                key={item.id}
                variant={isActive ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start h-10 px-3",
                  isActive && "bg-primary/10 text-primary border-primary/20",
                )}
                onClick={() => onSectionChange(item.id)}
              >
                <Icon className="h-4 w-4 mr-3" />
                <span className="flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <Badge variant={item.badge === "New" ? "default" : "secondary"} className="ml-2 text-xs">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            )
          })}
        </nav>

        {/* Footer */}
        <div className="p-4 border-t border-border">
          <div className="text-center space-y-1">
            <p className="text-xs text-muted-foreground">FESTA 2024</p>
            <div className="flex items-center justify-center space-x-1">
              <Sparkles className="h-3 w-3 text-primary" />
              <span className="text-xs font-medium text-primary">11 Years with BTS</span>
              <Sparkles className="h-3 w-3 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
