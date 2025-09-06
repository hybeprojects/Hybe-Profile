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

export function Dashboard() {
  const [activeSection, setActiveSection] = useState("overview")

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
        return <div className="p-6">Account Settings - Coming Soon</div>
      default:
        return <DashboardOverview />
    }
  }

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-primary/5 via-background to-accent/5">
        <DashboardSidebar activeSection={activeSection} onSectionChange={setActiveSection} />
        <div className="lg:pl-64">
          <DashboardHeader />
          <main className="p-6">{renderContent()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
