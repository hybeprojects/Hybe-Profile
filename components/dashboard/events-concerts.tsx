"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Calendar,
  MapPin,
  Clock,
  Users,
  Ticket,
  Video,
  Star,
  Bell,
  Download,
  Share,
  Heart,
  QrCode,
  Sparkles,
  Music,
  Globe,
  CheckCircle,
  AlertCircle,
} from "lucide-react"

const upcomingEvents = [
  {
    id: 1,
    title: "BTS World Tour 2024 - Seoul",
    type: "Concert",
    date: "2024-12-15",
    time: "19:00 KST",
    venue: "Olympic Stadium",
    location: "Seoul, South Korea",
    status: "presale",
    priority: "VIP Priority",
    image: "/bts-world-tour-concert-stage-lights.jpg",
    ticketsAvailable: true,
    isVirtual: false,
    price: "$150 - $300",
  },
  {
    id: 2,
    title: "FESTA 2024 Virtual Celebration",
    type: "Virtual Event",
    date: "2024-12-20",
    time: "20:00 KST",
    venue: "HYBE Virtual Studio",
    location: "Online Exclusive",
    status: "confirmed",
    priority: "ARMY Exclusive",
    image: "/festa-virtual-celebration-purple-stage.jpg",
    ticketsAvailable: false,
    isVirtual: true,
    price: "Free for Members",
  },
  {
    id: 3,
    title: "TXT Fan Meeting - Tokyo",
    type: "Fan Meeting",
    date: "2024-12-28",
    time: "18:00 JST",
    venue: "Tokyo Dome City Hall",
    location: "Tokyo, Japan",
    status: "lottery",
    priority: "MOA Priority",
    image: "/txt-fan-meeting-tokyo-interactive.jpg",
    ticketsAvailable: true,
    isVirtual: false,
    price: "$80 - $120",
  },
]

const pastEvents = [
  {
    id: 1,
    title: "BTS Permission to Dance - Las Vegas",
    date: "2022-04-16",
    venue: "Allegiant Stadium",
    location: "Las Vegas, USA",
    type: "Concert",
    attended: true,
    rating: 5,
    image: "/bts-las-vegas-concert-purple-lights.jpg",
  },
  {
    id: 2,
    title: "Map of the Soul ON:E Virtual Concert",
    date: "2020-10-24",
    venue: "Virtual Stage",
    location: "Online",
    type: "Virtual Concert",
    attended: true,
    rating: 5,
    image: "/map-soul-virtual-concert-stage.jpg",
  },
  {
    id: 3,
    title: "Love Yourself World Tour - London",
    date: "2018-10-09",
    venue: "The O2 Arena",
    location: "London, UK",
    type: "Concert",
    attended: true,
    rating: 5,
    image: "/love-yourself-tour-london-arena.jpg",
  },
]

const liveEvents = [
  {
    id: 1,
    title: "BTS Soundcheck Live",
    status: "live",
    viewers: "127K",
    startTime: "30 minutes ago",
    image: "/bts-soundcheck-live-rehearsal.jpg",
  },
  {
    id: 2,
    title: "Behind the Scenes: Stage Setup",
    status: "starting-soon",
    viewers: "45K",
    startTime: "Starting in 15 minutes",
    image: "/stage-setup-behind-scenes-crew.jpg",
  },
]

export function EventsConcerts() {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "presale":
        return "bg-primary text-primary-foreground"
      case "confirmed":
        return "bg-green-500 text-white"
      case "lottery":
        return "bg-yellow-500 text-white"
      case "sold-out":
        return "bg-red-500 text-white"
      default:
        return "bg-secondary text-secondary-foreground"
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "confirmed":
        return <CheckCircle className="h-3 w-3" />
      case "lottery":
        return <AlertCircle className="h-3 w-3" />
      default:
        return <Ticket className="h-3 w-3" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Events & Concerts
          </h1>
          <p className="text-muted-foreground">Your exclusive access to HYBE artist events and experiences</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="border-primary/20 bg-transparent">
            <Calendar className="h-4 w-4 mr-2" />
            Sync Calendar
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
            <Bell className="h-4 w-4 mr-2" />
            Notifications
          </Button>
        </div>
      </div>

      {/* Live Events Banner */}
      {liveEvents.length > 0 && (
        <Card className="border-red-200 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2 text-red-600">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse" />
              <span>Live Now</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {liveEvents.map((event) => (
                <div
                  key={event.id}
                  className="flex items-center space-x-4 p-4 rounded-lg bg-background/80 border border-red-200"
                >
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold">{event.title}</h4>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span className="flex items-center">
                        <Users className="h-3 w-3 mr-1" />
                        {event.viewers} watching
                      </span>
                      <span>{event.startTime}</span>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    className={
                      event.status === "live"
                        ? "bg-red-500 hover:bg-red-600 text-white"
                        : "bg-primary hover:bg-primary/90"
                    }
                  >
                    <Video className="h-4 w-4 mr-2" />
                    {event.status === "live" ? "Watch Live" : "Join Soon"}
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <Tabs defaultValue="upcoming" className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="upcoming">Upcoming Events</TabsTrigger>
          <TabsTrigger value="history">Event History</TabsTrigger>
          <TabsTrigger value="virtual">Virtual Experiences</TabsTrigger>
        </TabsList>

        <TabsContent value="upcoming" className="space-y-6">
          {/* Priority Access Banner */}
          <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
            <CardContent className="p-6">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Star className="h-6 w-6 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">VIP Priority Access</h3>
                  <p className="text-muted-foreground">
                    Get first access to tickets, exclusive presales, and priority entry to all HYBE events
                  </p>
                </div>
                <Badge className="bg-primary text-primary-foreground">Active</Badge>
              </div>
            </CardContent>
          </Card>

          {/* Upcoming Events Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {upcomingEvents.map((event) => (
              <Card key={event.id} className="border-primary/20 hover:border-primary/40 transition-colors">
                <div className="relative">
                  <img
                    src={event.image || "/placeholder.svg"}
                    alt={event.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 flex space-x-2">
                    <Badge className={getStatusColor(event.status)}>
                      {getStatusIcon(event.status)}
                      <span className="ml-1 capitalize">{event.status}</span>
                    </Badge>
                    <Badge variant="secondary">{event.type}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                  {event.isVirtual && (
                    <div className="absolute bottom-4 right-4">
                      <Badge className="bg-blue-500 text-white">
                        <Globe className="h-3 w-3 mr-1" />
                        Virtual
                      </Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <h3 className="font-bold text-xl mb-2">{event.title}</h3>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()} at {event.time}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <MapPin className="h-4 w-4 mr-2" />
                      {event.venue}, {event.location}
                    </div>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Ticket className="h-4 w-4 mr-2" />
                      {event.price}
                    </div>
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <Badge variant="outline" className="border-primary/20">
                      {event.priority}
                    </Badge>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      <Clock className="h-3 w-3" />
                      <span>
                        {Math.ceil((new Date(event.date).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))}{" "}
                        days left
                      </span>
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    {event.ticketsAvailable ? (
                      <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                        <Ticket className="h-4 w-4 mr-2" />
                        Get Tickets
                      </Button>
                    ) : (
                      <Button className="flex-1" disabled>
                        <CheckCircle className="h-4 w-4 mr-2" />
                        Registered
                      </Button>
                    )}
                    <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
                      <Share className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="history" className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <Music className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Concerts Attended</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <Users className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Fan Meetings</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <Video className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">15</div>
                <div className="text-sm text-muted-foreground">Virtual Events</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <Globe className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">7</div>
                <div className="text-sm text-muted-foreground">Countries Visited</div>
              </CardContent>
            </Card>
          </div>

          {/* Event History */}
          <div className="space-y-4">
            {pastEvents.map((event) => (
              <Card key={event.id} className="border-primary/20">
                <CardContent className="p-6">
                  <div className="flex items-center space-x-6">
                    <img
                      src={event.image || "/placeholder.svg"}
                      alt={event.title}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{event.title}</h3>
                        {event.attended && (
                          <Badge className="bg-green-500 text-white">
                            <CheckCircle className="h-3 w-3 mr-1" />
                            Attended
                          </Badge>
                        )}
                      </div>
                      <div className="space-y-1 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="h-3 w-3 mr-2" />
                          {new Date(event.date).toLocaleDateString()}
                        </div>
                        <div className="flex items-center">
                          <MapPin className="h-3 w-3 mr-2" />
                          {event.venue}, {event.location}
                        </div>
                      </div>
                      {event.rating && (
                        <div className="flex items-center mt-2">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`h-4 w-4 ${
                                i < event.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                              }`}
                            />
                          ))}
                          <span className="ml-2 text-sm text-muted-foreground">Your Rating</span>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
                        <Download className="h-4 w-4 mr-2" />
                        Memories
                      </Button>
                      <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
                        <QrCode className="h-4 w-4 mr-2" />
                        Ticket
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="virtual" className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Exclusive Virtual Experiences</span>
              </CardTitle>
              <CardDescription>HYBE-only virtual concerts, soundchecks, and behind-the-scenes access</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-primary/20 bg-primary/5">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <Video className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Virtual Soundcheck Access</h4>
                        <p className="text-sm text-muted-foreground">Watch rehearsals before concerts</p>
                      </div>
                    </div>
                    <Button size="sm" className="w-full">
                      Join Next Soundcheck
                    </Button>
                  </div>

                  <div className="p-4 rounded-lg border border-primary/20 bg-accent/5">
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                        <Users className="h-5 w-5 text-white" />
                      </div>
                      <div>
                        <h4 className="font-semibold">Virtual Meet & Greet</h4>
                        <p className="text-sm text-muted-foreground">Exclusive fan interactions</p>
                      </div>
                    </div>
                    <Button size="sm" variant="outline" className="w-full border-primary/20 bg-transparent">
                      View Schedule
                    </Button>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-4 rounded-lg border border-primary/20">
                    <h4 className="font-semibold mb-2">Upcoming Virtual Events</h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>BTS Studio Session Live</span>
                        <Badge variant="secondary">Dec 18</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>TXT Behind the Scenes</span>
                        <Badge variant="secondary">Dec 22</Badge>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span>ENHYPEN Dance Practice</span>
                        <Badge variant="secondary">Dec 25</Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
