"use client"

import { useState } from "react"
import { DashboardSidebar } from "./dashboard-sidebar"
import { DashboardHeader } from "./dashboard-header"
import { DashboardOverview } from "./dashboard-overview"
import { UserProfile } from "./user-profile"
import { ContentHub } from "./content-hub"
import { EventsConcerts } from "./events-concerts"
import { SidebarProvider } from "@/components/ui/sidebar"
import { MerchCollectibles } from "./merch-collectibles"
import { RewardsGamification } from "./rewards-gamification"
import { HybeHeader } from "@/components/layout/hybe-header"
import { HybeFooter } from "@/components/layout/hybe-footer"
import { FanFeed } from "./fan-feed"

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview")
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  const renderContent = () => {
    switch (activeSection) {
      case "overview":
        return <DashboardOverview />
      case "profile":
        return <UserProfile />
      case "content":
        return <ContentHub />
      case "events":
        return <EventsConcerts />
      case "merch":
        return <MerchCollectibles />
      case "rewards":
        return <RewardsGamification />
      case "settings":
        return <div className="p-4 sm:p-6">Account Settings - Coming Soon</div>
      default:
        return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider>
      <HybeHeader />
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <DashboardSidebar
          activeSection={activeSection}
          onSectionChange={setActiveSection}
          isOpen={isSidebarOpen}
          onClose={() => setIsSidebarOpen(false)}
        />
        <div className="lg:pl-64">
          <DashboardHeader onMenuClick={() => setIsSidebarOpen(true)} />
          <main className="p-3 sm:p-6">{renderContent()}</main>
        </div>
      </div>
      <HybeFooter />
    </SidebarProvider>
  )
}
