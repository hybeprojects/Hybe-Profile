"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ShoppingCart,
  Heart,
  Star,
  Clock,
  Package,
  Sparkles,
  Trophy,
  Zap,
  Eye,
  Download,
  Share,
  Filter,
  Search,
  Grid,
  List,
  Crown,
  Gem,
  Medal,
  Bell,
} from "lucide-react"
import { Input } from "@/components/ui/input"

const merchItems = [
  {
    id: 1,
    name: "BTS Map of the Soul Hoodie",
    category: "Apparel",
    price: "$65",
    originalPrice: "$85",
    image: "/bts-map-soul-hoodie-purple.jpg",
    isLimited: true,
    stock: 23,
    rating: 4.9,
    reviews: 1247,
    isExclusive: true,
    discount: 24,
  },
  {
    id: 2,
    name: "ARMY Bomb Ver. 4 Special Edition",
    category: "Accessories",
    price: "$120",
    image: "/army-bomb-special-edition-purple.jpg",
    isLimited: true,
    stock: 5,
    rating: 5.0,
    reviews: 892,
    isPreOrder: true,
    releaseDate: "2024-12-20",
  },
  {
    id: 3,
    name: "Love Yourself Vinyl Collection",
    category: "Music",
    price: "$180",
    image: "/love-yourself-vinyl-collection-set.jpg",
    isLimited: true,
    stock: 12,
    rating: 4.8,
    reviews: 456,
    isExclusive: true,
  },
  {
    id: 4,
    name: "TXT Minisode Photo Book",
    category: "Books",
    price: "$35",
    image: "/txt-minisode-photo-book-cover.jpg",
    stock: 156,
    rating: 4.7,
    reviews: 234,
  },
]

const digitalCollectibles = [
  {
    id: 1,
    name: "Golden Maknae Digital Card",
    type: "Digital Card",
    rarity: "Legendary",
    image: "/golden-maknae-digital-card-jungkook.jpg",
    owned: true,
    serialNumber: "#0847",
    value: "2.5 ETH",
    artist: "BTS",
  },
  {
    id: 2,
    name: "Purple Heart Badge",
    type: "Achievement Badge",
    rarity: "Epic",
    image: "/purple-heart-badge-army.jpg",
    owned: true,
    earnedDate: "2024-11-15",
    description: "Earned by attending 5+ concerts",
  },
  {
    id: 3,
    name: "Map of the Soul NFT",
    type: "NFT Artwork",
    rarity: "Rare",
    image: "/map-soul-nft-artwork-abstract.jpg",
    owned: false,
    price: "0.8 ETH",
    artist: "BTS",
  },
  {
    id: 4,
    name: "ARMY Anniversary Medal",
    type: "Digital Medal",
    rarity: "Common",
    image: "/army-anniversary-medal-2024.jpg",
    owned: true,
    earnedDate: "2024-06-13",
    description: "ARMY since 2019",
  },
]

const wishlistItems = [
  {
    id: 1,
    name: "BTS World Tour Merchandise Box",
    price: "$299",
    image: "/bts-world-tour-merch-box.jpg",
    inStock: false,
    notifyWhenAvailable: true,
  },
  {
    id: 2,
    name: "Limited Edition ARMY Ring",
    price: "$85",
    image: "/limited-edition-army-ring-silver.jpg",
    inStock: true,
    discount: 15,
  },
]

export function MerchCollectibles() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [selectedCategory, setSelectedCategory] = useState("all")

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

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case "digital card":
        return <Sparkles className="h-4 w-4" />
      case "achievement badge":
        return <Medal className="h-4 w-4" />
      case "nft artwork":
        return <Gem className="h-4 w-4" />
      case "digital medal":
        return <Trophy className="h-4 w-4" />
      default:
        return <Star className="h-4 w-4" />
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between space-y-4 md:space-y-0">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Merch & Collectibles
          </h1>
          <p className="text-muted-foreground">Exclusive merchandise and digital collectibles for ARMY</p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="border-primary/20 bg-transparent">
            <Heart className="h-4 w-4 mr-2" />
            Wishlist ({wishlistItems.length})
          </Button>
          <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
            <ShoppingCart className="h-4 w-4 mr-2" />
            Cart
          </Button>
        </div>
      </div>

      {/* VIP Benefits Banner */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
        <CardContent className="p-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <Crown className="h-6 w-6 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-lg">VIP Member Benefits</h3>
              <p className="text-muted-foreground">
                Early access to limited editions, exclusive items, and 15% discount on all merchandise
              </p>
            </div>
            <div className="flex space-x-2">
              <Badge className="bg-primary text-primary-foreground">15% OFF</Badge>
              <Badge className="bg-accent text-accent-foreground">Early Access</Badge>
            </div>
          </div>
        </CardContent>
      </Card>

      <Tabs defaultValue="merchandise" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="merchandise">Merchandise</TabsTrigger>
          <TabsTrigger value="digital">Digital Collectibles</TabsTrigger>
          <TabsTrigger value="wishlist">Wishlist</TabsTrigger>
          <TabsTrigger value="collection">My Collection</TabsTrigger>
        </TabsList>

        <TabsContent value="merchandise" className="space-y-6">
          {/* Search and Filters */}
          <div className="flex flex-col md:flex-row md:items-center space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search merchandise..." className="pl-10 border-primary/20" />
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <div className="flex border border-primary/20 rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Limited Time Offers */}
          <Card className="border-red-200 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/20 dark:to-pink-950/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2 text-red-600">
                <Zap className="h-5 w-5" />
                <span>Limited Time Offers</span>
              </CardTitle>
              <CardDescription>Exclusive deals ending soon</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {merchItems.slice(0, 3).map((item) => (
                  <div key={item.id} className="relative">
                    <Card className="border-primary/20 hover:border-primary/40 transition-colors">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        {item.discount && (
                          <div className="absolute top-2 left-2">
                            <Badge className="bg-red-500 text-white">-{item.discount}%</Badge>
                          </div>
                        )}
                        {item.isLimited && (
                          <div className="absolute top-2 right-2">
                            <Badge className="bg-primary text-primary-foreground">Limited</Badge>
                          </div>
                        )}
                        <Button
                          variant="ghost"
                          size="sm"
                          className="absolute bottom-2 right-2 text-white hover:bg-white/20"
                        >
                          <Heart className="h-4 w-4" />
                        </Button>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-1">{item.name}</h4>
                        <div className="flex items-center space-x-2 mb-2">
                          <span className="font-bold text-lg">{item.price}</span>
                          {item.originalPrice && (
                            <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                          )}
                        </div>
                        <div className="flex items-center justify-between text-sm text-muted-foreground mb-3">
                          <div className="flex items-center">
                            <Star className="h-3 w-3 text-yellow-400 fill-current mr-1" />
                            <span>{item.rating}</span>
                            <span className="ml-1">({item.reviews})</span>
                          </div>
                          <span>{item.stock} left</span>
                        </div>
                        <Button size="sm" className="w-full">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      </CardContent>
                    </Card>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* All Merchandise */}
          <div
            className={
              viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
            }
          >
            {merchItems.map((item) => (
              <Card key={item.id} className="border-primary/20 hover:border-primary/40 transition-colors">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4 flex flex-col space-y-2">
                    {item.isExclusive && (
                      <Badge className="bg-gradient-to-r from-primary to-accent text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        Exclusive
                      </Badge>
                    )}
                    {item.isLimited && <Badge className="bg-red-500 text-white">Limited Edition</Badge>}
                    {item.isPreOrder && <Badge className="bg-blue-500 text-white">Pre-Order</Badge>}
                  </div>
                  <Button variant="ghost" size="sm" className="absolute top-4 right-4 text-white hover:bg-white/20">
                    <Heart className="h-4 w-4" />
                  </Button>
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-primary/20">
                      {item.category}
                    </Badge>
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Package className="h-3 w-3 mr-1" />
                      <span>{item.stock} left</span>
                    </div>
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  <div className="flex items-center space-x-2 mb-3">
                    <span className="font-bold text-xl">{item.price}</span>
                    {item.originalPrice && (
                      <span className="text-sm text-muted-foreground line-through">{item.originalPrice}</span>
                    )}
                    {item.discount && <Badge className="bg-red-500 text-white text-xs">-{item.discount}%</Badge>}
                  </div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center text-sm text-muted-foreground">
                      <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                      <span>{item.rating}</span>
                      <span className="ml-1">({item.reviews} reviews)</span>
                    </div>
                  </div>
                  {item.isPreOrder && item.releaseDate && (
                    <div className="flex items-center text-sm text-muted-foreground mb-3">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Ships {new Date(item.releaseDate).toLocaleDateString()}</span>
                    </div>
                  )}
                  <div className="flex space-x-2">
                    <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                      <ShoppingCart className="h-4 w-4 mr-2" />
                      {item.isPreOrder ? "Pre-Order" : "Add to Cart"}
                    </Button>
                    <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="digital" className="space-y-6">
          {/* Digital Collection Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <Sparkles className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">Digital Cards</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <Medal className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Badges Earned</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <Gem className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">NFT Artworks</div>
              </CardContent>
            </Card>
            <Card className="border-primary/20">
              <CardContent className="p-4 text-center">
                <Trophy className="h-8 w-8 text-primary mx-auto mb-2" />
                <div className="text-2xl font-bold">8.5</div>
                <div className="text-sm text-muted-foreground">Total Value (ETH)</div>
              </CardContent>
            </Card>
          </div>

          {/* Digital Collectibles Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {digitalCollectibles.map((item) => (
              <Card key={item.id} className="border-primary/20 hover:border-primary/40 transition-colors">
                <div className="relative">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-48 object-cover rounded-t-lg"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className={getRarityColor(item.rarity)}>
                      {getTypeIcon(item.type)}
                      <span className="ml-1">{item.rarity}</span>
                    </Badge>
                  </div>
                  {item.owned && (
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">
                        <Crown className="h-3 w-3 mr-1" />
                        Owned
                      </Badge>
                    </div>
                  )}
                  {item.serialNumber && (
                    <div className="absolute bottom-4 left-4">
                      <Badge variant="secondary">{item.serialNumber}</Badge>
                    </div>
                  )}
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="border-primary/20">
                      {item.type}
                    </Badge>
                    {item.artist && <span className="text-sm text-muted-foreground">{item.artist}</span>}
                  </div>
                  <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                  {item.description && <p className="text-sm text-muted-foreground mb-3">{item.description}</p>}
                  <div className="flex items-center justify-between mb-4">
                    {item.value && <span className="font-bold text-lg">{item.value}</span>}
                    {item.price && <span className="font-bold text-lg">{item.price}</span>}
                    {item.earnedDate && (
                      <span className="text-sm text-muted-foreground">
                        Earned {new Date(item.earnedDate).toLocaleDateString()}
                      </span>
                    )}
                  </div>
                  <div className="flex space-x-2">
                    {item.owned ? (
                      <>
                        <Button variant="outline" className="flex-1 border-primary/20 bg-transparent">
                          <Download className="h-4 w-4 mr-2" />
                          Download
                        </Button>
                        <Button variant="outline" size="sm" className="border-primary/20 bg-transparent">
                          <Share className="h-4 w-4" />
                        </Button>
                      </>
                    ) : (
                      <Button className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                        <Gem className="h-4 w-4 mr-2" />
                        Purchase
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="wishlist" className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="h-5 w-5 text-primary" />
                <span>Your Wishlist</span>
              </CardTitle>
              <CardDescription>Items you're interested in purchasing</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {wishlistItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4 p-4 border border-primary/20 rounded-lg">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-20 h-20 rounded-lg object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold text-lg">{item.name}</h4>
                      <div className="flex items-center space-x-2 mt-1">
                        <span className="font-bold text-xl">{item.price}</span>
                        {item.discount && <Badge className="bg-red-500 text-white">-{item.discount}%</Badge>}
                      </div>
                      <div className="flex items-center mt-2">
                        {item.inStock ? (
                          <Badge className="bg-green-500 text-white">In Stock</Badge>
                        ) : (
                          <Badge variant="secondary">Out of Stock</Badge>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col space-y-2">
                      {item.inStock ? (
                        <Button className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90">
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          Add to Cart
                        </Button>
                      ) : (
                        <Button variant="outline" className="border-primary/20 bg-transparent">
                          <Bell className="h-4 w-4 mr-2" />
                          Notify Me
                        </Button>
                      )}
                      <Button variant="ghost" size="sm">
                        Remove
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="collection" className="space-y-6">
          <Card className="border-primary/20">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Trophy className="h-5 w-5 text-primary" />
                <span>My Collection</span>
              </CardTitle>
              <CardDescription>Your owned merchandise and digital collectibles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {digitalCollectibles
                  .filter((item) => item.owned)
                  .map((item) => (
                    <Card key={item.id} className="border-primary/20">
                      <div className="relative">
                        <img
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-t-lg"
                        />
                        <div className="absolute top-2 left-2">
                          <Badge className={getRarityColor(item.rarity)}>{item.rarity}</Badge>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h4 className="font-semibold mb-1">{item.name}</h4>
                        <p className="text-sm text-muted-foreground mb-2">{item.type}</p>
                        {item.earnedDate && (
                          <p className="text-xs text-muted-foreground">
                            Acquired {new Date(item.earnedDate).toLocaleDateString()}
                          </p>
                        )}
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
