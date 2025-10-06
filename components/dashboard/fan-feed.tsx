"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Heart, MessageCircle, Share2, ImageIcon, ListChecks, Sparkles, Send, ThumbsUp } from "lucide-react"

type FeedPost = {
  id: number
  author: string
  avatar?: string
  timestamp: string
  content: string
  image?: string
  likes: number
  comments: number
  liked?: boolean
  tags?: string[]
}

const initialPosts: FeedPost[] = [
  {
    id: 1,
    author: "Moonchild_94",
    avatar: "/army-avatar-3.jpg",
    timestamp: "5m",
    content: "The new studio session clip had me in tears. The harmonies are unreal!",
    image: "/bts-studio-recording-session.jpg",
    likes: 1254,
    comments: 148,
    liked: true,
    tags: ["#BTS", "#Studio", "#PurpleHeart"],
  },
  {
    id: 2,
    author: "Dynamite_Dancer",
    avatar: "/army-avatar-5.jpg",
    timestamp: "1h",
    content: "Poll: Which track should open the next tour setlist?",
    likes: 342,
    comments: 97,
    tags: ["#Poll", "#Tour"],
  },
]

export function FanFeed() {
  const [posts, setPosts] = useState<FeedPost[]>(initialPosts)
  const [composerText, setComposerText] = useState("")

  const toggleLike = (id: number) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === id ? { ...p, liked: !p.liked, likes: p.liked ? p.likes - 1 : p.likes + 1 } : p)),
    )
  }

  const addPost = () => {
    if (!composerText.trim()) return
    const newPost: FeedPost = {
      id: Date.now(),
      author: "ARMY Member",
      timestamp: "Just now",
      content: composerText.trim(),
      likes: 0,
      comments: 0,
      tags: ["#ARMY"],
    }
    setPosts((prev) => [newPost, ...prev])
    setComposerText("")
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Fan Feed
          </h1>
          <p className="text-muted-foreground">Share moments, vote in polls, and connect with ARMY</p>
        </div>
        <Badge className="bg-primary text-primary-foreground">Beta</Badge>
      </div>

      {/* Composer */}
      <Card className="border-primary/20">
        <CardContent className="p-4 sm:p-6">
          <div className="flex items-start space-x-3">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/army-profile-avatar.jpg" />
              <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">A</AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-3">
              <Input
                placeholder="Share an update with ARMY..."
                value={composerText}
                onChange={(e) => setComposerText(e.target.value)}
                className="h-10 border-primary/20"
              />
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 text-muted-foreground">
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <ImageIcon className="h-4 w-4 mr-1" /> Media
                  </Button>
                  <Button variant="ghost" size="sm" className="h-8 px-2">
                    <Poll className="h-4 w-4 mr-1" /> Poll
                  </Button>
                </div>
                <Button onClick={addPost} className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                  <Send className="h-4 w-4 mr-2" /> Post
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Feed */}
      <div className="space-y-4">
        {posts.map((post) => (
          <Card key={post.id} className="border-primary/20">
            <CardHeader className="p-4 sm:p-6 pb-2">
              <div className="flex items-start justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage src={post.avatar || "/placeholder.svg"} />
                    <AvatarFallback className="bg-gradient-to-r from-primary to-accent text-white">
                      {post.author[0]}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="text-sm">{post.author}</CardTitle>
                    <CardDescription className="text-xs">{post.timestamp}</CardDescription>
                  </div>
                </div>
                <div className="flex flex-wrap gap-1">
                  {post.tags?.map((t) => (
                    <Badge key={t} variant="secondary" className="text-xs">
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-2">
              <p className="text-sm mb-3 leading-relaxed">{post.content}</p>
              {post.image && (
                <img
                  src={post.image}
                  alt="post media"
                  className="w-full max-h-[380px] object-cover rounded-lg border border-primary/10"
                />)
              }
              <div className="flex items-center space-x-4 mt-3 text-sm text-muted-foreground">
                <button
                  className={`flex items-center ${post.liked ? "text-primary" : "hover:text-primary"}`}
                  onClick={() => toggleLike(post.id)}
                >
                  <Heart className={`h-4 w-4 mr-1 ${post.liked ? "fill-current" : ""}`} /> {post.likes}
                </button>
                <button className="flex items-center hover:text-primary">
                  <MessageCircle className="h-4 w-4 mr-1" /> {post.comments}
                </button>
                <button className="flex items-center hover:text-primary">
                  <Share2 className="h-4 w-4 mr-1" /> Share
                </button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Poll highlight */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Community Poll</span>
          </CardTitle>
          <CardDescription>Vote and see what ARMY thinks</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <p className="font-medium">Which track should open the next tour setlist?</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {["Mic Drop", "ON", "RUN", "IDOL"].map((opt) => (
                <Button key={opt} variant="outline" className="justify-start border-primary/20 bg-transparent">
                  <ThumbsUp className="h-4 w-4 mr-2" /> {opt}
                </Button>
              ))}
            </div>
            <div className="text-xs text-muted-foreground">Results visible after voting</div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
