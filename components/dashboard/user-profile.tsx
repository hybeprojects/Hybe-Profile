"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Crown, Star, Heart, Calendar, QrCode, Upload, Edit, Sparkles, Clock, Gift, Users, Music } from "lucide-react"

const fanClubMemberships = [
  { name: "BTS", tier: "Diamond", expiry: "2024-12-31", color: "from-purple-500 to-pink-500" },
  { name: "TXT", tier: "Gold", expiry: "2024-11-15", color: "from-blue-500 to-cyan-500" },
  { name: "ENHYPEN", tier: "Silver", expiry: "2024-10-20", color: "from-orange-500 to-red-500" },
  { name: "LE SSERAFIM", tier: "Bronze", expiry: "2024-09-30", color: "from-green-500 to-emerald-500" },
]

const btsEras = [
  { id: "hyyh", name: "HYYH", color: "from-orange-400 to-pink-400" },
  { id: "ly", name: "Love Yourself", color: "from-pink-400 to-purple-400" },
  { id: "mots", name: "Map of the Soul", color: "from-purple-400 to-blue-400" },
  { id: "be", name: "BE", color: "from-blue-400 to-cyan-400" },
  { id: "proof", name: "Proof", color: "from-gray-400 to-gray-600" },
]

const armyJourney = [
  { year: "2013", event: "Became ARMY", description: "First discovered BTS" },
  { year: "2018", event: "First Concert", description: "Love Yourself World Tour" },
  { year: "2020", event: "Map of the Soul ON:E", description: "Virtual concert experience" },
  { year: "2022", event: "Permission to Dance", description: "Las Vegas concert series" },
  { year: "2024", event: "FESTA Celebration", description: "11th anniversary celebration" },
]

export function UserProfile() {
  const [selectedEra, setSelectedEra] = useState("proof")
  const [selectedBias, setSelectedBias] = useState("RM")

  return (
    <div className="space-y-6">
      {/* Profile Header */}
      <Card className="border-primary/20">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="relative">
              <Avatar className="w-24 h-24 border-4 border-primary/20">
                <AvatarImage src="/army-profile-avatar.jpg" />
                <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white text-2xl font-bold">
                  A
                </AvatarFallback>
              </Avatar>
              <Button
                size="sm"
                className="absolute -bottom-2 -right-2 rounded-full w-8 h-8 p-0 bg-primary hover:bg-primary/90"
              >
                <Upload className="h-4 w-4" />
              </Button>
            </div>

            <div className="flex-1 space-y-3">
              <div className="flex items-center space-x-3">
                <h1 className="text-2xl font-bold">ARMY Member</h1>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                </Button>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                  <Crown className="h-3 w-3 mr-1" />
                  VIP Member
                </Badge>
                <Badge variant="secondary">HYBE ID: army2013</Badge>
                <Badge variant="outline" className="border-red-200 text-red-600">
                  <Heart className="h-3 w-3 mr-1 fill-current" />
                  ARMY Since 2013
                </Badge>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-2">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">11</div>
                  <div className="text-xs text-muted-foreground">Years</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">47</div>
                  <div className="text-xs text-muted-foreground">Collectibles</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">12</div>
                  <div className="text-xs text-muted-foreground">Concerts</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">89</div>
                  <div className="text-xs text-muted-foreground">Day Streak</div>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="memberships" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="memberships">Memberships</TabsTrigger>
          <TabsTrigger value="passport">ARMY Passport</TabsTrigger>
          <TabsTrigger value="journey">Journey</TabsTrigger>
          <TabsTrigger value="preferences">Preferences</TabsTrigger>
        </TabsList>

        <TabsContent value="memberships" className="space-y-6">
          {/* Subscription Status */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Crown className="h-5 w-5 text-primary" />
                <span>HYBE Subscription</span>
              </CardTitle>
              <CardDescription>Your current subscription and benefits</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 rounded-lg bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
                <div>
                  <h3 className="font-semibold text-lg">VIP Membership</h3>
                  <p className="text-sm text-muted-foreground">All-access pass to exclusive content</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">Renews on December 31, 2024</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-primary">$29.99</div>
                  <div className="text-sm text-muted-foreground">/month</div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2 fill-current" />
                  <h4 className="font-medium">Priority Access</h4>
                  <p className="text-xs text-muted-foreground">First access to tickets & merch</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Gift className="h-8 w-8 text-primary mx-auto mb-2" />
                  <h4 className="font-medium">Exclusive Content</h4>
                  <p className="text-xs text-muted-foreground">Behind-the-scenes & unreleased</p>
                </div>
                <div className="text-center p-4 rounded-lg bg-muted/50">
                  <Users className="h-8 w-8 text-accent mx-auto mb-2" />
                  <h4 className="font-medium">Community Access</h4>
                  <p className="text-xs text-muted-foreground">VIP forums & events</p>
                </div>
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                Manage Subscription
              </Button>
            </CardContent>
          </Card>

          {/* Fan Club Memberships */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Music className="h-5 w-5 text-primary" />
                <span>Fan Club Memberships</span>
              </CardTitle>
              <CardDescription>Your artist-specific memberships and tiers</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {fanClubMemberships.map((membership) => (
                  <Card key={membership.name} className="border-primary/10">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div
                          className={`w-12 h-12 rounded-lg bg-gradient-to-r ${membership.color} flex items-center justify-center`}
                        >
                          <span className="text-white font-bold text-lg">{membership.name[0]}</span>
                        </div>
                        <Badge variant={membership.tier === "Diamond" ? "default" : "secondary"}>
                          {membership.tier}
                        </Badge>
                      </div>
                      <h3 className="font-semibold">{membership.name} Fan Club</h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        Expires: {new Date(membership.expiry).toLocaleDateString()}
                      </p>
                      <div className="flex space-x-2">
                        <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                          <QrCode className="h-4 w-4 mr-1" />
                          QR Card
                        </Button>
                        <Button size="sm" className="flex-1">
                          Renew
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="passport" className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Sparkles className="h-5 w-5 text-primary" />
                <span>Digital ARMY Passport</span>
              </CardTitle>
              <CardDescription>Your personalized fan passport with holographic design</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Era Theme Selection */}
              <div>
                <h3 className="font-medium mb-3">Choose Your Era Theme</h3>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {btsEras.map((era) => (
                    <Button
                      key={era.id}
                      variant={selectedEra === era.id ? "default" : "outline"}
                      className={`h-16 ${
                        selectedEra === era.id
                          ? `bg-gradient-to-r ${era.color} text-white border-0`
                          : "border-primary/20"
                      }`}
                      onClick={() => setSelectedEra(era.id)}
                    >
                      {era.name}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Bias Selection */}
              <div>
                <h3 className="font-medium mb-3">Bias Spotlight</h3>
                <div className="grid grid-cols-4 md:grid-cols-7 gap-2">
                  {["RM", "Jin", "Suga", "J-Hope", "Jimin", "V", "Jungkook"].map((member) => (
                    <Button
                      key={member}
                      variant={selectedBias === member ? "default" : "outline"}
                      size="sm"
                      className={selectedBias === member ? "bg-primary" : "border-primary/20"}
                      onClick={() => setSelectedBias(member)}
                    >
                      {member}
                    </Button>
                  ))}
                </div>
              </div>

              {/* Passport Preview */}
              <div className="relative">
                <div
                  className={`p-6 rounded-xl bg-gradient-to-br ${btsEras.find((e) => e.id === selectedEra)?.color} text-white`}
                >
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-xl font-bold">ARMY PASSPORT</h2>
                      <p className="text-sm opacity-90">Digital Fan Passport</p>
                    </div>
                    <Sparkles className="h-8 w-8 opacity-80" />
                  </div>
                  <div className="space-y-2">
                    <p className="text-sm">Member: ARMY Member</p>
                    <p className="text-sm">Since: 2013</p>
                    <p className="text-sm">Bias: {selectedBias}</p>
                    <p className="text-sm">Era: {btsEras.find((e) => e.id === selectedEra)?.name}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="journey" className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5 text-primary" />
                <span>Your ARMY Journey</span>
              </CardTitle>
              <CardDescription>Timeline of your special moments with BTS</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {armyJourney.map((milestone, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center text-white font-bold text-sm">
                        {milestone.year.slice(-2)}
                      </div>
                    </div>
                    <div className="flex-1 pb-6 border-b border-border last:border-b-0">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{milestone.event}</h3>
                        <Badge variant="outline" className="text-xs">
                          {milestone.year}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">{milestone.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Button variant="outline" className="w-full mt-4 border-primary/20 bg-transparent">
                Add Memory
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="preferences" className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Profile Preferences</CardTitle>
              <CardDescription>Customize your HYBE experience</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">Receive updates about new content and events</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Privacy Settings</h4>
                    <p className="text-sm text-muted-foreground">Control who can see your profile and activity</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Manage
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <h4 className="font-medium">Data & Security</h4>
                    <p className="text-sm text-muted-foreground">Download your data or delete your account</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Settings
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
