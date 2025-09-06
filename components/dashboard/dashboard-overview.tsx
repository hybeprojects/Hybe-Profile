"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Calendar, Play, ShoppingBag, Users, Heart, Star, Sparkles, Clock, Gift } from "lucide-react"

export function DashboardOverview() {
  return (
    <div className="space-y-4 sm:space-y-6 p-3 sm:p-6">
      {/* Welcome Section */}
      <div className="text-center space-y-3 sm:space-y-4 py-4 sm:py-8">
        <div className="flex items-center justify-center space-x-2">
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-pulse" />
          <h1 className="text-2xl sm:text-4xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Welcome back, ARMY!
          </h1>
          <Sparkles className="h-6 w-6 sm:h-8 sm:w-8 text-primary animate-pulse" />
        </div>
        <p className="text-muted-foreground text-sm sm:text-lg px-4">
          Your exclusive HYBE experience awaits. Discover new content, connect with fellow ARMY, and never miss a
          moment.
        </p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">ARMY Since</CardTitle>
            <Heart className="h-3 w-3 sm:h-4 sm:w-4 text-red-500 fill-current" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">2013</div>
            <p className="text-xs text-muted-foreground">11 years of purple love</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Collectibles</CardTitle>
            <Star className="h-3 w-3 sm:h-4 sm:w-4 text-yellow-500 fill-current" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">47</div>
            <p className="text-xs text-muted-foreground">Digital items collected</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Events Attended</CardTitle>
            <Calendar className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">Concerts & fan meets</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 p-3 sm:p-6">
            <CardTitle className="text-xs sm:text-sm font-medium">Streak</CardTitle>
            <Gift className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
          </CardHeader>
          <CardContent className="p-3 sm:p-6 pt-0">
            <div className="text-lg sm:text-2xl font-bold">89</div>
            <p className="text-xs text-muted-foreground">Days logged in</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
        {/* Latest Content */}
        <Card className="lg:col-span-2 border-primary/20">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
              <Play className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span>Latest Exclusive Content</span>
              <Badge className="bg-primary/10 text-primary text-xs">New</Badge>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Fresh content just for ARMY members</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-muted/50 border border-primary/10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center flex-shrink-0">
                <Play className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm sm:text-base truncate">BTS Behind the Scenes: Studio Sessions</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Exclusive footage from the latest recording sessions
                </p>
                <div className="flex items-center space-x-2 mt-1 sm:mt-2">
                  <Badge variant="secondary" className="text-xs">
                    Video
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />2 hours ago
                  </span>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-4 p-3 sm:p-4 rounded-lg bg-muted/50 border border-primary/10">
              <div className="w-12 h-12 sm:w-16 sm:h-16 rounded-lg bg-gradient-to-r from-accent to-primary flex items-center justify-center flex-shrink-0">
                <Users className="h-4 w-4 sm:h-6 sm:w-6 text-white" />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-sm sm:text-base truncate">ARMY Letter from RM</h4>
                <p className="text-xs sm:text-sm text-muted-foreground">
                  Personal message to fans about the upcoming projects
                </p>
                <div className="flex items-center space-x-2 mt-1 sm:mt-2">
                  <Badge variant="secondary" className="text-xs">
                    Letter
                  </Badge>
                  <span className="text-xs text-muted-foreground flex items-center">
                    <Clock className="h-3 w-3 mr-1" />1 day ago
                  </span>
                </div>
              </div>
            </div>

            <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-sm sm:text-base h-9 sm:h-10">
              View All Content
            </Button>
          </CardContent>
        </Card>

        {/* Upcoming Events */}
        <Card className="border-primary/20">
          <CardHeader className="p-4 sm:p-6">
            <CardTitle className="flex items-center space-x-2 text-sm sm:text-base">
              <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              <span>Upcoming Events</span>
            </CardTitle>
            <CardDescription className="text-xs sm:text-sm">Don't miss these exclusive experiences</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 sm:space-y-4 p-4 sm:p-6 pt-0">
            <div className="space-y-2 sm:space-y-3">
              <div className="p-2 sm:p-3 rounded-lg bg-primary/5 border border-primary/20">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <Badge className="bg-primary text-primary-foreground text-xs">Priority Access</Badge>
                  <span className="text-xs text-muted-foreground">Dec 15</span>
                </div>
                <h4 className="font-medium text-xs sm:text-sm">BTS World Tour Presale</h4>
                <p className="text-xs text-muted-foreground">Exclusive ARMY presale starts</p>
              </div>

              <div className="p-2 sm:p-3 rounded-lg bg-accent/5 border border-accent/20">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <Badge variant="secondary" className="text-xs">
                    Virtual Event
                  </Badge>
                  <span className="text-xs text-muted-foreground">Dec 20</span>
                </div>
                <h4 className="font-medium text-xs sm:text-sm">FESTA 2024 Preview</h4>
                <p className="text-xs text-muted-foreground">Special preview for members</p>
              </div>

              <div className="p-2 sm:p-3 rounded-lg bg-muted/50 border border-border">
                <div className="flex items-center justify-between mb-1 sm:mb-2">
                  <Badge variant="outline" className="text-xs">
                    Merch Drop
                  </Badge>
                  <span className="text-xs text-muted-foreground">Dec 25</span>
                </div>
                <h4 className="font-medium text-xs sm:text-sm">Holiday Collection</h4>
                <p className="text-xs text-muted-foreground">Limited edition items</p>
              </div>
            </div>

            <Button
              variant="outline"
              className="w-full border-primary/20 hover:bg-primary/5 bg-transparent text-sm h-9 sm:h-10"
            >
              View All Events
            </Button>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4">
        <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
          <CardContent className="p-4 sm:p-6 text-center">
            <ShoppingBag className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2 sm:mb-3" />
            <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Exclusive Merch</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Shop limited edition items</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
          <CardContent className="p-4 sm:p-6 text-center">
            <Users className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2 sm:mb-3" />
            <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">ARMY Community</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Connect with fellow fans</p>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:border-primary/40 transition-colors cursor-pointer">
          <CardContent className="p-4 sm:p-6 text-center">
            <Star className="h-6 w-6 sm:h-8 sm:w-8 text-primary mx-auto mb-2 sm:mb-3" />
            <h3 className="font-medium mb-1 sm:mb-2 text-sm sm:text-base">Collect Rewards</h3>
            <p className="text-xs sm:text-sm text-muted-foreground">Earn points and badges</p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
