"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Play,
  Music,
  ImageIcon,
  Mail,
  Search,
  Filter,
  Heart,
  Share,
  Clock,
  Eye,
  Star,
  Sparkles,
  Users,
  Calendar,
} from "lucide-react"

const contentData = {
  videos: [
    {
      id: 1,
      title: "BTS Behind the Scenes: Studio Sessions",
      description: "Exclusive footage from the latest recording sessions",
      duration: "12:34",
      thumbnail: "/bts-studio-recording-session.jpg",
      views: "2.1M",
      uploadDate: "2 hours ago",
      artist: "BTS",
      isNew: true,
    },
    {
      id: 2,
      title: "V's Art Gallery Tour",
      description: "Personal tour of V's favorite art exhibitions",
      duration: "8:45",
      thumbnail: "/v-art-gallery-modern-paintings.jpg",
      views: "1.8M",
      uploadDate: "1 day ago",
      artist: "V",
      isNew: true,
    },
    {
      id: 3,
      title: "Jungkook's Workout Routine",
      description: "Get fit with Jungkook's personal training tips",
      duration: "15:22",
      thumbnail: "/jungkook-workout-gym-fitness.jpg",
      views: "3.2M",
      uploadDate: "3 days ago",
      artist: "Jungkook",
      isNew: false,
    },
  ],
  music: [
    {
      id: 1,
      title: "Untitled Demo #47",
      artist: "RM",
      duration: "3:21",
      description: "Raw demo from upcoming album sessions",
      releaseDate: "Exclusive Preview",
      isNew: true,
    },
    {
      id: 2,
      title: "Spring Day (Acoustic Version)",
      artist: "BTS",
      duration: "4:15",
      description: "Intimate acoustic arrangement",
      releaseDate: "ARMY Exclusive",
      isNew: false,
    },
    {
      id: 3,
      title: "Serendipity (Piano Demo)",
      artist: "Jimin",
      duration: "2:58",
      description: "Original piano composition",
      releaseDate: "Fan Letter Special",
      isNew: false,
    },
  ],
  photos: [
    {
      id: 1,
      title: "Concept Photos - Purple Era",
      count: 24,
      thumbnail: "/bts-purple-concept-photos-artistic.jpg",
      description: "Exclusive concept photography",
      uploadDate: "1 week ago",
      isNew: false,
    },
    {
      id: 2,
      title: "Behind the Scenes - Music Video",
      count: 18,
      thumbnail: "/bts-music-video-behind-scenes-filming.jpg",
      description: "On-set photography from latest MV",
      uploadDate: "2 days ago",
      isNew: true,
    },
    {
      id: 3,
      title: "Stage Design Sketches",
      count: 12,
      thumbnail: "/concert-stage-design-sketches-artistic.jpg",
      description: "Original stage concept art",
      uploadDate: "5 days ago",
      isNew: false,
    },
  ],
  letters: [
    {
      id: 1,
      author: "RM",
      title: "To ARMY, with love",
      preview: "Thank you for always being by our side through this incredible journey...",
      date: "2 hours ago",
      readTime: "3 min read",
      isNew: true,
    },
    {
      id: 2,
      author: "Jimin",
      title: "Reflecting on our growth",
      preview: "Looking back at how much we've all grown together makes my heart full...",
      date: "1 day ago",
      readTime: "2 min read",
      isNew: true,
    },
    {
      id: 3,
      author: "V",
      title: "Art and inspiration",
      preview: "I wanted to share some thoughts about creativity and what inspires me...",
      date: "3 days ago",
      readTime: "4 min read",
      isNew: false,
    },
  ],
}

export function ContentHub() {
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedFilter, setSelectedFilter] = useState("all")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Exclusive Content Hub
          </h1>
          <p className="text-muted-foreground">
            Discover behind-the-scenes content, unreleased music, and personal messages
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search content..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 w-64 border-primary/20 focus:border-primary"
            />
          </div>
          <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
            <Filter className="h-4 w-4 mr-2" />
            Filter
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="border-primary/20">
          <CardContent className="p-4 text-center">
            <Play className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">127</div>
            <div className="text-sm text-muted-foreground">Videos</div>
          </CardContent>
        </Card>
        <Card className="border-primary/20">
          <CardContent className="p-4 text-center">
            <Music className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">89</div>
            <div className="text-sm text-muted-foreground">Audio Tracks</div>
          </CardContent>
        </Card>
        <Card className="border-primary/20">
          <CardContent className="p-4 text-center">
            <ImageIcon className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">1.2K</div>
            <div className="text-sm text-muted-foreground">Photos</div>
          </CardContent>
        </Card>
        <Card className="border-primary/20">
          <CardContent className="p-4 text-center">
            <Mail className="h-8 w-8 text-primary mx-auto mb-2" />
            <div className="text-2xl font-bold">24</div>
            <div className="text-sm text-muted-foreground">Fan Letters</div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="videos" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="videos" className="flex items-center space-x-2">
            <Play className="h-4 w-4" />
            <span>Videos</span>
          </TabsTrigger>
          <TabsTrigger value="music" className="flex items-center space-x-2">
            <Music className="h-4 w-4" />
            <span>Music</span>
          </TabsTrigger>
          <TabsTrigger value="photos" className="flex items-center space-x-2">
            <ImageIcon className="h-4 w-4" />
            <span>Photos</span>
          </TabsTrigger>
          <TabsTrigger value="letters" className="flex items-center space-x-2">
            <Mail className="h-4 w-4" />
            <span>Letters</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="videos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentData.videos.map((video) => (
              <Card key={video.id} className="border-primary/20 hover:border-primary/40 transition-colors group">
                <div className="relative">
                  <img
                    src={video.thumbnail || "/placeholder.svg"}
                    alt={video.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                    <Button size="lg" className="rounded-full w-16 h-16 p-0">
                      <Play className="h-6 w-6" />
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2 flex space-x-2">
                    {video.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      {video.duration}
                    </Badge>
                  </div>
                  <div className="absolute top-2 right-2">
                    <Button variant="ghost" size="sm" className="text-white hover:bg-white/20">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2 line-clamp-2">{video.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3 line-clamp-2">{video.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <div className="flex items-center space-x-4">
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        {video.views}
                      </span>
                      <span className="flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {video.uploadDate}
                      </span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {video.artist}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="music" className="space-y-6">
          <div className="space-y-4">
            {contentData.music.map((track) => (
              <Card key={track.id} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-4">
                  <div className="flex items-center space-x-4">
                    <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                      <Music className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-1">
                        <h3 className="font-semibold">{track.title}</h3>
                        {track.isNew && <Badge className="bg-primary text-primary-foreground text-xs">New</Badge>}
                      </div>
                      <p className="text-sm text-muted-foreground mb-1">{track.artist}</p>
                      <p className="text-xs text-muted-foreground">{track.description}</p>
                    </div>
                    <div className="text-right space-y-2">
                      <div className="text-sm font-medium">{track.duration}</div>
                      <Badge variant="secondary" className="text-xs">
                        {track.releaseDate}
                      </Badge>
                    </div>
                    <div className="flex flex-col space-y-2">
                      <Button size="sm" className="w-10 h-10 p-0 rounded-full">
                        <Play className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm" className="w-10 h-10 p-0 rounded-full">
                        <Heart className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="photos" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {contentData.photos.map((gallery) => (
              <Card key={gallery.id} className="border-primary/20 hover:border-primary/40 transition-colors group">
                <div className="relative">
                  <img
                    src={gallery.thumbnail || "/placeholder.svg"}
                    alt={gallery.title}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity rounded-t-lg flex items-center justify-center">
                    <Button variant="secondary" className="bg-white/90 text-black hover:bg-white">
                      <ImageIcon className="h-4 w-4 mr-2" />
                      View Gallery
                    </Button>
                  </div>
                  <div className="absolute top-2 left-2">
                    {gallery.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                  </div>
                  <div className="absolute bottom-2 right-2">
                    <Badge variant="secondary" className="bg-black/70 text-white">
                      {gallery.count} photos
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold mb-2">{gallery.title}</h3>
                  <p className="text-sm text-muted-foreground mb-3">{gallery.description}</p>
                  <div className="flex items-center justify-between text-xs text-muted-foreground">
                    <span className="flex items-center">
                      <Calendar className="h-3 w-3 mr-1" />
                      {gallery.uploadDate}
                    </span>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Heart className="h-3 w-3" />
                      </Button>
                      <Button variant="ghost" size="sm" className="h-6 w-6 p-0">
                        <Share className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="letters" className="space-y-6">
          <div className="space-y-4">
            {contentData.letters.map((letter) => (
              <Card key={letter.id} className="border-primary/20 hover:border-primary/40 transition-colors">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <Avatar className="w-12 h-12 border-2 border-primary/20">
                      <AvatarImage
                        src={`/abstract-geometric-shapes.png?height=48&width=48&query=${letter.author} BTS member`}
                      />
                      <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white font-bold">
                        {letter.author[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-semibold text-lg">{letter.title}</h3>
                        {letter.isNew && <Badge className="bg-primary text-primary-foreground">New</Badge>}
                      </div>
                      <div className="flex items-center space-x-4 mb-3 text-sm text-muted-foreground">
                        <span className="flex items-center">
                          <Users className="h-3 w-3 mr-1" />
                          From {letter.author}
                        </span>
                        <span className="flex items-center">
                          <Clock className="h-3 w-3 mr-1" />
                          {letter.date}
                        </span>
                        <span className="flex items-center">
                          <Star className="h-3 w-3 mr-1" />
                          {letter.readTime}
                        </span>
                      </div>
                      <p className="text-muted-foreground mb-4 leading-relaxed">{letter.preview}</p>
                      <div className="flex items-center space-x-2">
                        <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                          Read Full Letter
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Heart className="h-4 w-4 mr-2" />
                          Save
                        </Button>
                        <Button variant="ghost" size="sm">
                          <Share className="h-4 w-4 mr-2" />
                          Share
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured Content */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Featured This Week</span>
          </CardTitle>
          <CardDescription>Don't miss these exclusive highlights</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-background/50 border border-primary/10">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                <Play className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">FESTA 2024 Documentary</h4>
                <p className="text-sm text-muted-foreground">Behind-the-scenes of anniversary celebrations</p>
                <Badge className="mt-2 bg-primary text-primary-foreground">Premiering Soon</Badge>
              </div>
            </div>
            <div className="flex items-center space-x-4 p-4 rounded-lg bg-background/50 border border-primary/10">
              <div className="w-16 h-16 rounded-lg bg-gradient-to-r from-accent to-primary flex items-center justify-center">
                <Music className="h-8 w-8 text-white" />
              </div>
              <div className="flex-1">
                <h4 className="font-semibold">Unreleased Vocal Line Harmonies</h4>
                <p className="text-sm text-muted-foreground">Exclusive vocal arrangements and demos</p>
                <Badge className="mt-2 bg-accent text-accent-foreground">ARMY Exclusive</Badge>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
