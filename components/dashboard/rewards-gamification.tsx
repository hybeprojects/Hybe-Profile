"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Progress } from "@/components/ui/progress"
import {
  Trophy,
  Star,
  Target,
  Gift,
  Crown,
  Medal,
  Flame,
  Calendar,
  Users,
  TrendingUp,
  Award,
  Sparkles,
  Clock,
  CheckCircle,
  Lock,
  Music,
  Video,
  MessageCircle,
  Share,
  Eye,
} from "lucide-react"

const userStats = {
  currentTier: "Gold",
  armyPoints: 12450,
  nextTierPoints: 15000,
  level: 28,
  nextLevelXP: 2850,
  currentLevelXP: 2340,
  dailyStreak: 47,
  longestStreak: 89,
  totalAchievements: 34,
  monthlyRank: 156,
}

const tiers = [
  { name: "Bronze", minPoints: 0, color: "bg-amber-600", benefits: ["Basic rewards", "Monthly newsletter"] },
  { name: "Silver", minPoints: 2500, color: "bg-gray-400", benefits: ["5% merch discount", "Early content access"] },
  {
    name: "Gold",
    minPoints: 7500,
    color: "bg-yellow-500",
    benefits: ["10% merch discount", "Exclusive content", "Priority support"],
  },
  {
    name: "Diamond",
    minPoints: 15000,
    color: "bg-blue-500",
    benefits: ["15% merch discount", "VIP events", "Direct artist messages"],
  },
]

const dailyChallenges = [
  {
    id: 1,
    title: "Daily Login",
    description: "Log in to your HYBE account",
    progress: 1,
    target: 1,
    reward: 50,
    completed: true,
    type: "login",
  },
  {
    id: 2,
    title: "Watch 3 Videos",
    description: "Watch exclusive content videos",
    progress: 2,
    target: 3,
    reward: 100,
    completed: false,
    type: "video",
  },
  {
    id: 3,
    title: "Share Content",
    description: "Share a piece of content with friends",
    progress: 0,
    target: 1,
    reward: 75,
    completed: false,
    type: "share",
  },
  {
    id: 4,
    title: "Comment on Posts",
    description: "Engage with community posts",
    progress: 1,
    target: 2,
    reward: 60,
    completed: false,
    type: "comment",
  },
]

const weeklyMissions = [
  {
    id: 1,
    title: "Content Explorer",
    description: "View 20 pieces of exclusive content",
    progress: 14,
    target: 20,
    reward: 500,
    daysLeft: 3,
    type: "content",
  },
  {
    id: 2,
    title: "Community Contributor",
    description: "Make 10 comments or reactions",
    progress: 7,
    target: 10,
    reward: 300,
    daysLeft: 3,
    type: "community",
  },
  {
    id: 3,
    title: "Event Participant",
    description: "Attend 2 virtual events",
    progress: 1,
    target: 2,
    reward: 750,
    daysLeft: 3,
    type: "events",
  },
]

const achievements = [
  {
    id: 1,
    title: "First Steps",
    description: "Complete your first day as ARMY",
    icon: <Star className="h-6 w-6" />,
    earned: true,
    earnedDate: "2024-01-15",
    rarity: "Common",
    points: 100,
  },
  {
    id: 2,
    title: "Dedicated Fan",
    description: "Maintain a 30-day login streak",
    icon: <Flame className="h-6 w-6" />,
    earned: true,
    earnedDate: "2024-02-14",
    rarity: "Rare",
    points: 500,
  },
  {
    id: 3,
    title: "Content Connoisseur",
    description: "View 100 exclusive videos",
    icon: <Video className="h-6 w-6" />,
    earned: true,
    earnedDate: "2024-03-10",
    rarity: "Epic",
    points: 750,
  },
  {
    id: 4,
    title: "Concert Veteran",
    description: "Attend 10 virtual concerts",
    icon: <Music className="h-6 w-6" />,
    earned: false,
    progress: 7,
    target: 10,
    rarity: "Legendary",
    points: 1000,
  },
  {
    id: 5,
    title: "Community Leader",
    description: "Get 1000 likes on your comments",
    icon: <Crown className="h-6 w-6" />,
    earned: false,
    progress: 743,
    target: 1000,
    rarity: "Legendary",
    points: 1500,
  },
]

const leaderboard = [
  { rank: 1, username: "PurpleHeart_ARMY", points: 45230, tier: "Diamond", avatar: "/army-avatar-1.jpg" },
  { rank: 2, username: "BTS_Forever_21", points: 42150, tier: "Diamond", avatar: "/army-avatar-2.jpg" },
  { rank: 3, username: "Moonchild_94", points: 38920, tier: "Diamond", avatar: "/army-avatar-3.jpg" },
  { rank: 4, username: "Golden_Maknae_Fan", points: 35670, tier: "Diamond", avatar: "/army-avatar-4.jpg" },
  { rank: 5, username: "Dynamite_Dancer", points: 32450, tier: "Gold", avatar: "/army-avatar-5.jpg" },
]

const rewards = [
  {
    id: 1,
    title: "Exclusive Wallpaper Pack",
    description: "Limited edition BTS wallpapers",
    cost: 500,
    type: "digital",
    available: true,
    image: "/exclusive-wallpaper-pack-bts.jpg",
  },
  {
    id: 2,
    title: "15% Merch Discount",
    description: "One-time discount on any merchandise",
    cost: 1000,
    type: "discount",
    available: true,
    image: "/merch-discount-coupon.jpg",
  },
  {
    id: 3,
    title: "Early Concert Access",
    description: "Priority ticket purchasing for next tour",
    cost: 2500,
    type: "access",
    available: true,
    image: "/early-concert-access-pass.jpg",
  },
  {
    id: 4,
    title: "Virtual Meet & Greet",
    description: "Exclusive virtual fan meeting opportunity",
    cost: 5000,
    type: "experience",
    available: false,
    image: "/virtual-meet-greet-ticket.jpg",
  },
]

export function RewardsGamification() {
  const [selectedTab, setSelectedTab] = useState("overview")

  const getCurrentTier = () => {
    return tiers.find((tier) => tier.name === userStats.currentTier) || tiers[0]
  }

  const getNextTier = () => {
    const currentIndex = tiers.findIndex((tier) => tier.name === userStats.currentTier)
    return currentIndex < tiers.length - 1 ? tiers[currentIndex + 1] : null
  }

  const getRarityColor = (rarity: string) => {
    switch (rarity.toLowerCase()) {
      case "legendary":
        return "bg-gradient-to-r from-yellow-400 to-orange-500 text-white"
      case "epic":
        return "bg-gradient-to-r from-purple-500 to-pink-500 text-white"
      case "rare":
        return "bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
      default:
        return "bg-gray-500 text-white"
    }
  }

  const getChallengeIcon = (type: string) => {
    switch (type) {
      case "login":
        return <Calendar className="h-4 w-4" />
      case "video":
        return <Video className="h-4 w-4" />
      case "share":
        return <Share className="h-4 w-4" />
      case "comment":
        return <MessageCircle className="h-4 w-4" />
      case "content":
        return <Eye className="h-4 w-4" />
      case "community":
        return <Users className="h-4 w-4" />
      case "events":
        return <Calendar className="h-4 w-4" />
      default:
        return <Target className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Rewards & Achievements
          </h1>
          <p className="text-muted-foreground">Earn ARMY Points and unlock exclusive rewards</p>
        </div>
        <div className="flex items-center space-x-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-primary">{userStats.armyPoints.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">ARMY Points</div>
          </div>
          <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
            <Trophy className="h-6 w-6 text-white" />
          </div>
        </div>
      </div>

      {/* Progress Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className={`w-12 h-12 rounded-full ${getCurrentTier().color} flex items-center justify-center`}>
                <Crown className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-lg">{userStats.currentTier} Tier</div>
                <div className="text-sm text-muted-foreground">
                  {getNextTier()
                    ? `${userStats.nextTierPoints - userStats.armyPoints} to ${getNextTier()?.name}`
                    : "Max Tier"}
                </div>
                {getNextTier() && (
                  <Progress value={(userStats.armyPoints / userStats.nextTierPoints) * 100} className="mt-2 h-2" />
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-orange-400 to-red-500 flex items-center justify-center">
                <Flame className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-lg">{userStats.dailyStreak} Days</div>
                <div className="text-sm text-muted-foreground">Current Streak</div>
                <div className="text-xs text-muted-foreground">Best: {userStats.longestStreak} days</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-green-400 to-blue-500 flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-lg">Level {userStats.level}</div>
                <div className="text-sm text-muted-foreground">
                  {userStats.nextLevelXP - userStats.currentLevelXP} XP to next
                </div>
                <Progress value={(userStats.currentLevelXP / userStats.nextLevelXP) * 100} className="mt-2 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-primary/20">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-r from-purple-400 to-pink-500 flex items-center justify-center">
                <Award className="h-6 w-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-lg">{userStats.totalAchievements}</div>
                <div className="text-sm text-muted-foreground">Achievements</div>
                <div className="text-xs text-muted-foreground">Rank #{userStats.monthlyRank} this month</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="challenges">Challenges</TabsTrigger>
          <TabsTrigger value="achievements">Achievements</TabsTrigger>
          <TabsTrigger value="leaderboard">Leaderboard</TabsTrigger>
          <TabsTrigger value="rewards">Rewards</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-6">
          {/* Daily Challenges */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="h-5 w-5 text-primary" />
                <span>Daily Challenges</span>
              </CardTitle>
              <CardDescription>Complete daily tasks to earn ARMY Points</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dailyChallenges.map((challenge) => (
                  <div
                    key={challenge.id}
                    className="flex items-center space-x-4 p-4 border border-primary/20 rounded-lg"
                  >
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center ${
                        challenge.completed ? "bg-green-500" : "bg-primary/20"
                      }`}
                    >
                      {challenge.completed ? (
                        <CheckCircle className="h-5 w-5 text-white" />
                      ) : (
                        getChallengeIcon(challenge.type)
                      )}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold">{challenge.title}</h4>
                      <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      <div className="flex items-center space-x-2 mt-2">
                        <Progress value={(challenge.progress / challenge.target) * 100} className="flex-1 h-2" />
                        <span className="text-sm text-muted-foreground">
                          {challenge.progress}/{challenge.target}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-semibold text-primary">+{challenge.reward}</div>
                      <div className="text-xs text-muted-foreground">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Recent Achievements */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Medal className="h-5 w-5 text-primary" />
                <span>Recent Achievements</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {achievements
                  .filter((a) => a.earned)
                  .slice(0, 3)
                  .map((achievement) => (
                    <div
                      key={achievement.id}
                      className="flex items-center space-x-4 p-4 border border-primary/20 rounded-lg"
                    >
                      <div
                        className={`w-12 h-12 rounded-full flex items-center justify-center ${getRarityColor(achievement.rarity)}`}
                      >
                        {achievement.icon}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{achievement.title}</h4>
                        <p className="text-sm text-muted-foreground">{achievement.description}</p>
                        <div className="flex items-center space-x-2 mt-1">
                          <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                          <span className="text-xs text-muted-foreground">
                            Earned {new Date(achievement.earnedDate!).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-semibold text-primary">+{achievement.points}</div>
                        <div className="text-xs text-muted-foreground">points</div>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="challenges" className="space-y-6">
          {/* Weekly Missions */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Calendar className="h-5 w-5 text-primary" />
                <span>Weekly Missions</span>
              </CardTitle>
              <CardDescription>Complete weekly goals for bigger rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {weeklyMissions.map((mission) => (
                  <div key={mission.id} className="p-6 border border-primary/20 rounded-lg">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h4 className="font-semibold text-lg">{mission.title}</h4>
                        <p className="text-muted-foreground">{mission.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-xl text-primary">+{mission.reward}</div>
                        <div className="text-sm text-muted-foreground">points</div>
                        <div className="flex items-center text-sm text-muted-foreground mt-1">
                          <Clock className="h-3 w-3 mr-1" />
                          {mission.daysLeft} days left
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between text-sm">
                        <span>Progress</span>
                        <span>
                          {mission.progress}/{mission.target}
                        </span>
                      </div>
                      <Progress value={(mission.progress / mission.target) * 100} className="h-3" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* All Daily Challenges */}
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle>Today's Challenges</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {dailyChallenges.map((challenge) => (
                  <div key={challenge.id} className="p-4 border border-primary/20 rounded-lg">
                    <div className="flex items-center space-x-3 mb-3">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          challenge.completed ? "bg-green-500" : "bg-primary"
                        }`}
                      >
                        {challenge.completed ? (
                          <CheckCircle className="h-4 w-4 text-white" />
                        ) : (
                          getChallengeIcon(challenge.type)
                        )}
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold">{challenge.title}</h4>
                        <p className="text-sm text-muted-foreground">{challenge.description}</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Progress value={(challenge.progress / challenge.target) * 100} className="h-2" />
                      <div className="flex items-center justify-between text-sm">
                        <span>
                          {challenge.progress}/{challenge.target}
                        </span>
                        <span className="text-primary font-semibold">+{challenge.reward} pts</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="achievements" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {achievements.map((achievement) => (
              <Card
                key={achievement.id}
                className={`border-primary/20 ${achievement.earned ? "bg-primary/5" : "opacity-75"}`}
              >
                <CardContent className="p-6">
                  <div className="flex items-center space-x-4 mb-4">
                    <div
                      className={`w-16 h-16 rounded-full flex items-center justify-center ${
                        achievement.earned ? getRarityColor(achievement.rarity) : "bg-gray-300"
                      }`}
                    >
                      {achievement.earned ? achievement.icon : <Lock className="h-6 w-6 text-gray-500" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg">{achievement.title}</h3>
                      <p className="text-sm text-muted-foreground">{achievement.description}</p>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Badge className={getRarityColor(achievement.rarity)}>{achievement.rarity}</Badge>
                      <span className="font-semibold text-primary">+{achievement.points} pts</span>
                    </div>

                    {achievement.earned ? (
                      <div className="text-sm text-muted-foreground">
                        Earned {new Date(achievement.earnedDate!).toLocaleDateString()}
                      </div>
                    ) : achievement.progress !== undefined ? (
                      <div className="space-y-1">
                        <Progress value={(achievement.progress / achievement.target!) * 100} className="h-2" />
                        <div className="text-sm text-muted-foreground">
                          {achievement.progress}/{achievement.target}
                        </div>
                      </div>
                    ) : (
                      <div className="text-sm text-muted-foreground">Not yet unlocked</div>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="leaderboard" className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span>Monthly Leaderboard</span>
              </CardTitle>
              <CardDescription>Top ARMY members this month</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {leaderboard.map((user, index) => (
                  <div
                    key={user.rank}
                    className={`flex items-center space-x-4 p-4 rounded-lg ${
                      index < 3
                        ? "bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20"
                        : "border border-primary/10"
                    }`}
                  >
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white ${
                        index === 0
                          ? "bg-yellow-500"
                          : index === 1
                            ? "bg-gray-400"
                            : index === 2
                              ? "bg-amber-600"
                              : "bg-primary"
                      }`}
                    >
                      {index < 3 ? <Crown className="h-6 w-6" /> : user.rank}
                    </div>
                    <img
                      src={user.avatar || "/placeholder.svg"}
                      alt={user.username}
                      className="w-10 h-10 rounded-full"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{user.username}</h4>
                      <div className="flex items-center space-x-2">
                        <Badge className={tiers.find((t) => t.name === user.tier)?.color || "bg-gray-500"}>
                          {user.tier}
                        </Badge>
                        <span className="text-sm text-muted-foreground">{user.points.toLocaleString()} points</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-2xl">#{user.rank}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* User's Position */}
              <div className="mt-6 p-4 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center font-bold text-white">
                    {userStats.monthlyRank}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold">Your Position</h4>
                    <div className="flex items-center space-x-2">
                      <Badge className={getCurrentTier().color}>{userStats.currentTier}</Badge>
                      <span className="text-sm text-muted-foreground">
                        {userStats.armyPoints.toLocaleString()} points
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-bold text-2xl">#{userStats.monthlyRank}</div>
                    <div className="text-sm text-muted-foreground">This month</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="rewards" className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Gift className="h-5 w-5 text-primary" />
                <span>Reward Store</span>
              </CardTitle>
              <CardDescription>Redeem your ARMY Points for exclusive rewards</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rewards.map((reward) => (
                  <Card key={reward.id} className="border-primary/20">
                    <div className="relative">
                      <img
                        src={reward.image || "/placeholder.svg"}
                        alt={reward.title}
                        className="w-full h-32 object-cover rounded-t-lg"
                      />
                      {!reward.available && (
                        <div className="absolute inset-0 bg-black/50 flex items-center justify-center rounded-t-lg">
                          <Badge variant="secondary">Coming Soon</Badge>
                        </div>
                      )}
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold mb-2">{reward.title}</h4>
                      <p className="text-sm text-muted-foreground mb-4">{reward.description}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Sparkles className="h-4 w-4 text-primary" />
                          <span className="font-bold text-primary">{reward.cost.toLocaleString()}</span>
                          <span className="text-sm text-muted-foreground">points</span>
                        </div>
                        <Button
                          size="sm"
                          disabled={!reward.available || userStats.armyPoints < reward.cost}
                          className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                        >
                          {userStats.armyPoints >= reward.cost ? "Redeem" : "Not Enough Points"}
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
