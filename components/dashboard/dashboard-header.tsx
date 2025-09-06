"use client"

import { Bell, Search, Menu, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

interface DashboardHeaderProps {
  onMenuClick?: () => void
}

export function DashboardHeader({ onMenuClick }: DashboardHeaderProps) {
  return (
    <header className="sticky top-0 z-30 bg-background/95 backdrop-blur-sm border-b border-border">
      <div className="flex items-center justify-between px-3 sm:px-6 py-3 sm:py-4">
        {/* Mobile menu button */}
        <Button variant="ghost" size="sm" className="lg:hidden p-2" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
        </Button>

        {/* Search */}
        <div className="flex-1 max-w-md mx-2 sm:mx-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search..."
              className="pl-10 bg-muted/50 border-primary/20 focus:border-primary text-sm h-9 sm:h-10"
            />
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-1 sm:space-x-2">
          {/* Notifications */}
          <Button variant="ghost" size="sm" className="relative p-2 h-9 w-9 sm:h-10 sm:w-10">
            <Bell className="h-4 w-4 sm:h-5 sm:w-5" />
            <Badge className="absolute -top-1 -right-1 h-4 w-4 sm:h-5 sm:w-5 rounded-full p-0 flex items-center justify-center text-xs bg-primary">
              3
            </Badge>
          </Button>

          {/* User menu */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="flex items-center space-x-2 p-2 h-9 sm:h-10">
                <div className="w-6 h-6 sm:w-8 sm:h-8 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <span className="text-white text-xs sm:text-sm font-medium">A</span>
                </div>
                <span className="hidden md:block text-sm">ARMY Member</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem>
                <span>Profile Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Membership Details</span>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <span>Billing & Payments</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-red-600">
                <LogOut className="mr-2 h-4 w-4" />
                <span>Sign Out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
