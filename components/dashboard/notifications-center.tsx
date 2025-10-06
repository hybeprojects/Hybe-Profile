"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { Bell, Calendar, Gift, Heart, MessageCircle, Play, ShoppingBag, Star, Ticket } from "lucide-react"

export type NotificationItem = {
  id: number
  title: string
  description: string
  time: string
  type: "content" | "event" | "merch" | "reward" | "social"
  unread?: boolean
}

const initialNotifications: NotificationItem[] = [
  {
    id: 1,
    title: "VIP Presale Opens",
    description: "BTS World Tour presale starts now for ARMY members.",
    time: "Just now",
    type: "event",
    unread: true,
  },
  {
    id: 2,
    title: "New Exclusive Video",
    description: "Behind the Scenes: Studio Sessions is now available.",
    time: "2h",
    type: "content",
    unread: true,
  },
  {
    id: 3,
    title: "Limited Merch Drop",
    description: "ARMY Bomb Ver.4 Special Edition is almost sold out.",
    time: "5h",
    type: "merch",
  },
  {
    id: 4,
    title: "Reward Unlocked",
    description: "You earned enough ARMY Points for a 15% merch discount.",
    time: "1d",
    type: "reward",
  },
  {
    id: 5,
    title: "New Comment on Your Post",
    description: "PurpleHeart_ARMY replied: ‘This made my day!’",
    time: "1d",
    type: "social",
  },
]

function TypeIcon({ type }: { type: NotificationItem["type"] }) {
  switch (type) {
    case "content":
      return <Play className="h-4 w-4 text-primary" />
    case "event":
      return <Ticket className="h-4 w-4 text-primary" />
    case "merch":
      return <ShoppingBag className="h-4 w-4 text-primary" />
    case "reward":
      return <Gift className="h-4 w-4 text-primary" />
    case "social":
      return <MessageCircle className="h-4 w-4 text-primary" />
    default:
      return <Bell className="h-4 w-4 text-primary" />
  }
}

export function NotificationsCenter() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initialNotifications)

  const markAllRead = () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })))
  }

  const unreadCount = notifications.filter((n) => n.unread).length

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold">Notifications</h2>
          <p className="text-sm text-muted-foreground">You have {unreadCount} unread</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="border-primary/20 bg-transparent" onClick={markAllRead}>
            Mark all read
          </Button>
        </div>
      </div>

      <Card className="border-primary/20">
        <CardHeader className="p-4">
          <CardTitle className="text-sm">Latest Updates</CardTitle>
          <CardDescription className="text-xs">HYBE platform and artist announcements</CardDescription>
        </CardHeader>
        <CardContent className="p-0">
          <ul className="divide-y divide-border">
            {notifications.map((n) => (
              <li key={n.id} className="p-4 hover:bg-muted/40">
                <div className="flex items-start space-x-3">
                  <div className="mt-0.5">
                    <TypeIcon type={n.type} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-sm truncate">{n.title}</h4>
                      <span className="text-xs text-muted-foreground ml-2 whitespace-nowrap">{n.time}</span>
                    </div>
                    <p className="text-sm text-muted-foreground mt-0.5">{n.description}</p>
                    <div className="mt-2 flex items-center space-x-2">
                      {n.type === "event" && <Badge className="bg-primary text-primary-foreground">Presale</Badge>}
                      {n.type === "content" && <Badge variant="secondary">Exclusive</Badge>}
                      {n.type === "merch" && <Badge className="bg-red-500 text-white">Limited</Badge>}
                    </div>
                  </div>
                  {n.unread && <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />}
                </div>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>

      <Card className="border-primary/20">
        <CardHeader className="p-4">
          <CardTitle className="text-sm">Upcoming</CardTitle>
          <CardDescription className="text-xs">Dates you should know</CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center text-sm text-muted-foreground">
                <Calendar className="h-4 w-4 mr-2" /> FESTA 2024 Preview
              </div>
              <Badge variant="secondary">Dec 20</Badge>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <div className="flex items-center text-sm text-muted-foreground">
                <Ticket className="h-4 w-4 mr-2" /> World Tour Presale
              </div>
              <Badge variant="secondary">Dec 15</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Separator />
      <div className="text-center text-xs text-muted-foreground">All caught up • HYBE</div>
    </div>
  )
}
