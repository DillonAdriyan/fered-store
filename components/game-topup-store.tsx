"use client"

import { useState } from "react"
import {
  Bell,
  CreditCard,
  GamepadIcon as GameController,
  Menu,
  QrCode,
  Search,
  ShoppingCart,
  Star,
  Store,
  User,
  Wallet,
  Smartphone,
  Wifi,
  CreditCardIcon,
  Zap,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
} from "@/components/ui/sidebar"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import BannerCarousel from "./banner-carousel"
import CheckoutPage from "./checkout-page"
import ProductsPage from "./products-page"

// Product categories
const productCategories = [
  { id: "games", name: "Games", icon: GameController, color: "bg-purple-500" },
  { id: "ewallet", name: "E-Wallet", icon: Wallet, color: "bg-blue-500" },
  { id: "data", name: "Data Packages", icon: Wifi, color: "bg-green-500" },
  { id: "pulsa", name: "Pulsa", icon: Smartphone, color: "bg-orange-500" },
]

// Game categories
const gameCategories = [
  { id: "all", name: "All Games" },
  { id: "moba", name: "MOBA" },
  { id: "fps", name: "FPS" },
  { id: "rpg", name: "RPG" },
  { id: "battle-royale", name: "Battle Royale" },
  { id: "mmorpg", name: "MMORPG" },
]

// Popular games
const popularGames = [
  {
    id: 1,
    name: "Mobile Legends",
    image: "/logo/mlbb.webp",
    category: "MOBA",
  },
  {
    id: 2,
    name: "PUBG Mobile",
    image: "/logo/pubg.webp",
    category: "Battle Royale",
  },
  {
    id: 3,
    name: "Genshin Impact",
    image: "/logo/gensin.webp",
    category: "RPG",
  },
  {
    id: 4,
    name: "Free Fire",
    image: "/logo/ff.webp",
    category: "Battle Royale",
  },
  {
    id: 5,
    name: "Call of Duty Mobile",
    image: "/logo/codm.webp",
    category: "FPS",
  },
  {
    id: 6,
    name: "Valorant",
    image: "/logo/valorant.webp",
    category: "FPS",
  },
]

// E-Wallet options
const ewalletOptions = [
  {
    id: 1,
    name: "GoPay",
    image: "/logo/gopay.webp",
    color: "bg-blue-500",
    icon: Wallet,
  },
  {
    id: 2,
    name: "OVO",
    image: "/logo/ovo.webp",
    color: "bg-purple-500",
    icon: Wallet,
  },
  {
    id: 3,
    name: "DANA",
    image: "/logo/dana.webp",
    color: "bg-blue-400",
    icon: Wallet,
  },
  {
    id: 4,
    name: "LinkAja",
    image: "/logo/linkaja.webp",
    color: "bg-red-500",
    icon: Wallet,
  },
  {
    id: 5,
    name: "ShopeePay",
    image: "/logo/shopepay.webp",
    color: "bg-orange-500",
    icon: Wallet,
  },
]

// Data package providers
const dataProviders = [
  {
    id: 1,
    name: "Telkomsel",
    image: "/logo/telkomsel.webp",
    color: "bg-red-500",
    icon: Wifi,
  },
  {
    id: 2,
    name: "XL",
    image: "/logo/xl.webp",
    color: "bg-blue-500",
    icon: Wifi,
  },
  {
    id: 3,
    name: "Indosat",
    image: "/logo/indosat.webp",
    color: "bg-yellow-500",
    icon: Wifi,
  },
  {
    id: 4,
    name: "Tri",
    image: "/logo/tri.webp",
    color: "bg-purple-500",
    icon: Wifi,
  },
  {
    id: 5,
    name: "Smartfren",
    image: "/logo/smartfren.webp",
    color: "bg-red-600",
    icon: Wifi,
  },
]

// Pulsa providers
const pulsaProviders = [
  {
    id: 1,
    image: "/logo/telkomsel.webp",
    name: "Telkomsel",
    color: "bg-red-500",
    icon: Smartphone,
  },
  {
    id: 2,
    name: "XL",
    image: "/logo/xl.webp",
    color: "bg-blue-500",
    icon: Smartphone,
  },
  {
    id: 3,
    name: "Indosat",
    image: "/logo/indosat.webp",
    color: "bg-yellow-500",
    icon: Smartphone,
  },
  {
    id: 4,
    name: "Tri",
    image: "/logo/tri.webp",
    color: "bg-purple-500",
    icon: Smartphone,
  },
  {
    id: 5,
    name: "Smartfren",
    image: "/logo/smartfren.webp",
    color: "bg-red-600",
    icon: Smartphone,
  },
]

// Top-up options
const topupOptions = [
  { id: 1, name: "100 Diamonds", price: 20000, discount: 0 },
  { id: 2, name: "300 Diamonds", price: 50000, discount: 5 },
  { id: 3, name: "500 Diamonds", price: 80000, discount: 10 },
  { id: 4, name: "1000 Diamonds", price: 150000, discount: 15 },
  { id: 5, name: "2000 Diamonds", price: 290000, discount: 20 },
]

// E-Wallet top-up options
const ewalletTopupOptions = [
  { id: 1, name: "Rp 10.000", price: 11000, discount: 0 },
  { id: 2, name: "Rp 20.000", price: 21000, discount: 0 },
  { id: 3, name: "Rp 50.000", price: 51000, discount: 2 },
  { id: 4, name: "Rp 100.000", price: 101000, discount: 3 },
  { id: 5, name: "Rp 200.000", price: 201000, discount: 5 },
  { id: 6, name: "Rp 500.000", price: 500000, discount: 7 },
]

// Data package options
const dataPackageOptions = [
  { id: 1, name: "1GB - 1 Day", price: 10000, discount: 0, description: "1GB internet for 1 day" },
  { id: 2, name: "3GB - 3 Days", price: 15000, discount: 0, description: "3GB internet for 3 days" },
  { id: 3, name: "5GB - 7 Days", price: 35000, discount: 5, description: "5GB internet for 7 days" },
  { id: 4, name: "10GB - 30 Days", price: 60000, discount: 10, description: "10GB internet for 30 days" },
  { id: 5, name: "25GB - 30 Days", price: 100000, discount: 15, description: "25GB internet for 30 days" },
]

// Pulsa options
const pulsaOptions = [
  { id: 1, name: "Rp 5.000", price: 6000, discount: 0 },
  { id: 2, name: "Rp 10.000", price: 11000, discount: 0 },
  { id: 3, name: "Rp 20.000", price: 21000, discount: 0 },
  { id: 4, name: "Rp 50.000", price: 50500, discount: 1 },
  { id: 5, name: "Rp 100.000", price: 100000, discount: 2 },
]

// Payment methods
const paymentMethods = [
  {
    id: 1,
    name: "Credit/Debit Card",
    icon: CreditCard,
    description: "Visa, Mastercard, JCB",
    type: "card",
  },
  {
    id: 2,
    name: "E-Wallet",
    icon: Wallet,
    description: "GoPay, OVO, Dana, LinkAja, ShopeePay",
    type: "ewallet",
    options: [
      { id: "gopay", name: "GoPay" },
      { id: "ovo", name: "OVO" },
      { id: "dana", name: "DANA" },
      { id: "linkaja", name: "LinkAja" },
      { id: "shopeepay", name: "ShopeePay" },
    ],
  },
  {
    id: 3,
    name: "Convenience Store",
    icon: Store,
    description: "Indomaret, Alfamart, Alfamidi",
    type: "store",
    options: [
      { id: "indomaret", name: "Indomaret" },
      { id: "alfamart", name: "Alfamart" },
      { id: "alfamidi", name: "Alfamidi" },
    ],
  },
  {
    id: 4,
    name: "QRIS",
    icon: QrCode,
    description: "Scan to pay with any QRIS-compatible app",
    type: "qris",
  },
]

// Banner data
const banners = [
  {
    id: 1,
    image: "/placeholder.svg?height=400&width=1200",
    title: "Special Promo: 50% Bonus Diamonds",
    description: "Top up now and get extra diamonds for Mobile Legends!",
  },
  {
    id: 2,
    image: "/placeholder.svg?height=400&width=1200",
    title: "New Game Release: Genshin Impact 2.0",
    description: "Be the first to experience the new update with special bonuses!",
  },
  {
    id: 3,
    image: "/placeholder.svg?height=400&width=1200",
    title: "Weekend Special: Double Credits",
    description: "Top up this weekend and receive double game credits!",
  },
]

export default function GameTopupStore() {
  const [activeProductCategory, setActiveProductCategory] = useState("games")
  const [activeTab, setActiveTab] = useState("all")
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [selectedGame, setSelectedGame] = useState<number | null>(null)
  const [selectedEwallet, setSelectedEwallet] = useState<number | null>(null)
  const [selectedDataProvider, setSelectedDataProvider] = useState<number | null>(null)
  const [selectedPulsaProvider, setSelectedPulsaProvider] = useState<number | null>(null)
  const [checkoutData, setCheckoutData] = useState<{
    product: any
    productType: string
    topupOption: any
    paymentMethod: any
    userId: string
  } | null>(null)

  const handleProceedToCheckout = (
    product: any,
    productType: string,
    topupOption: any,
    paymentMethod: any,
    userId: string,
  ) => {
    setCheckoutData({
      product,
      productType,
      topupOption,
      paymentMethod,
      userId,
    })
  }

  const handleBackToHome = () => {
    setSelectedGame(null)
    setSelectedEwallet(null)
    setSelectedDataProvider(null)
    setSelectedPulsaProvider(null)
    setCheckoutData(null)
  }

  // Determine which product is selected
  const isProductSelected =
    selectedGame !== null || selectedEwallet !== null || selectedDataProvider !== null || selectedPulsaProvider !== null

  return (
    <SidebarProvider>
      <div className="flex min-h-screen flex-col">
        {/* Navbar */}
        <header className="sticky top-0 z-40 border-b bg-background">
          <div className="container flex h-16 items-center justify-between px-4">
            <div className="flex items-center gap-2 lg:gap-4">
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="outline" size="icon" className="lg:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[240px] p-0">
                  <div className="flex h-16 items-center border-b px-4">
                    <Link href="/" className="flex items-center gap-2 font-bold">
                      <Zap className="h-5 w-5 text-primary" />
                      <span>TopUpZone</span>
                    </Link>
                  </div>
                  <nav className="grid gap-2 p-2">
                    {productCategories.map((category) => (
                      <Link
                        key={category.id}
                        href="#"
                        className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent"
                        onClick={() => {
                          setActiveProductCategory(category.id)
                          handleBackToHome()
                        }}
                      >
                        <category.icon className="h-4 w-4" />
                        {category.name}
                      </Link>
                    ))}
                    <div className="h-px bg-border my-2"></div>
                    <Link href="#" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent">
                      <Star className="h-4 w-4" />
                      Promotions
                    </Link>
                    <Link href="#" className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-accent">
                      <User className="h-4 w-4" />
                      Account
                    </Link>
                  </nav>
                </SheetContent>
              </Sheet>
              <Link href="/" className="flex items-center gap-2 font-bold" onClick={handleBackToHome}>
                <Zap className="h-5 w-5 text-primary" />
                <span className="hidden sm:inline-block">TopUpZone</span>
              </Link>
            </div>
            <div className="hidden flex-1 items-center justify-center md:flex">
              <div className="relative w-full max-w-md">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  className="w-full rounded-full bg-muted pl-8 pr-4"
                />
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <Bell className="h-5 w-5" />
                <span className="sr-only">Notifications</span>
              </Button>
              <Button variant="ghost" size="icon" className="hidden md:flex">
                <ShoppingCart className="h-5 w-5" />
                <span className="sr-only">Cart</span>
              </Button>
              <Button variant="outline" size="sm" className="hidden md:flex">
                <User className="mr-2 h-4 w-4" />
                Login
              </Button>
              <Button size="sm" className="hidden md:flex">
                Register
              </Button>
              <Button variant="outline" size="icon" className="md:hidden">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Button>
              <Button variant="outline" size="icon" className="md:hidden">
                <User className="h-5 w-5" />
                <span className="sr-only">Account</span>
              </Button>
            </div>
          </div>
        </header>

        <div className="flex flex-1">
          {/* Sidebar - Desktop Only */}
          <Sidebar variant="inset" collapsible="icon" className="hidden lg:flex">
            <SidebarHeader>
              <div className="flex items-center gap-2 px-4 py-2">
                <Zap className="h-5 w-5 text-primary" />
                <span className="font-bold">Categories</span>
              </div>
            </SidebarHeader>
            <SidebarContent>
              <SidebarMenu>
                {productCategories.map((category) => (
                  <SidebarMenuItem key={category.id}>
                    <SidebarMenuButton
                      isActive={activeProductCategory === category.id}
                      onClick={() => {
                        setActiveProductCategory(category.id)
                        handleBackToHome()
                      }}
                    >
                      <category.icon className="h-4 w-4" />
                      <span>{category.name}</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>

              {activeProductCategory === "games" && (
                <>
                  <div className="px-4 py-2 text-xs text-muted-foreground">Game Categories</div>
                  <SidebarMenu>
                    {gameCategories.map((category) => (
                      <SidebarMenuItem key={category.id}>
                        <SidebarMenuButton
                          isActive={activeTab === category.id}
                          onClick={() => setActiveTab(category.id)}
                        >
                          <GameController className="h-4 w-4" />
                          <span>{category.name}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </>
              )}
            </SidebarContent>
            <SidebarFooter>
              <div className="p-4">
                <div className="rounded-lg bg-muted p-4">
                  <h4 className="mb-2 font-medium">Need Help?</h4>
                  <p className="text-sm text-muted-foreground">Contact our customer support for assistance</p>
                  <Button className="mt-4 w-full" size="sm">
                    Contact Support
                  </Button>
                </div>
              </div>
            </SidebarFooter>
          </Sidebar>

          {/* Main Content */}
          <main className="flex-1">
            {checkoutData ? (
              <CheckoutPage
                product={checkoutData.product}
                productType={checkoutData.productType}
                topupOption={checkoutData.topupOption}
                paymentMethod={checkoutData.paymentMethod}
                userId={checkoutData.userId}
                onBack={() => setCheckoutData(null)}
              />
            ) : selectedGame ? (
              <ProductsPage
                product={popularGames.find((g) => g.id === selectedGame)!}
                productType="game"
                topupOptions={topupOptions}
                paymentMethods={paymentMethods}
                onBack={handleBackToHome}
                onProceedToCheckout={(product, option, payment, userId) =>
                  handleProceedToCheckout(product, "game", option, payment, userId)
                }
              />
            ) : selectedEwallet ? (
              <ProductsPage
                product={ewalletOptions.find((e) => e.id === selectedEwallet)!}
                productType="ewallet"
                topupOptions={ewalletTopupOptions}
                paymentMethods={paymentMethods}
                onBack={handleBackToHome}
                onProceedToCheckout={(product, option, payment, userId) =>
                  handleProceedToCheckout(product, "ewallet", option, payment, userId)
                }
              />
            ) : selectedDataProvider ? (
              <ProductsPage
                product={dataProviders.find((d) => d.id === selectedDataProvider)!}
                productType="data"
                topupOptions={dataPackageOptions}
                paymentMethods={paymentMethods}
                onBack={handleBackToHome}
                onProceedToCheckout={(product, option, payment, userId) =>
                  handleProceedToCheckout(product, "data", option, payment, userId)
                }
              />
            ) : selectedPulsaProvider ? (
              <ProductsPage
                product={pulsaProviders.find((p) => p.id === selectedPulsaProvider)!}
                productType="pulsa"
                topupOptions={pulsaOptions}
                paymentMethods={paymentMethods}
                onBack={handleBackToHome}
                onProceedToCheckout={(product, option, payment, userId) =>
                  handleProceedToCheckout(product, "pulsa", option, payment, userId)
                }
              />
            ) : (
              <>
                {/* Hero Banner Carousel */}
                <section className="relative">
                  <div className="container px-4 py-6">
                    <div className="overflow-hidden rounded-xl">
                      <BannerCarousel banners={banners} />
                    </div>
                  </div>
                </section>

                {/* Mobile Category Tabs */}
                <div className="container px-4 py-2 lg:hidden">
                  <div className="overflow-x-auto pb-2">
                    <Tabs value={activeProductCategory} onValueChange={setActiveProductCategory} className="w-full">
                      <TabsList className="inline-flex w-max">
                        {productCategories.map((category) => (
                          <TabsTrigger key={category.id} value={category.id}>
                            <category.icon className="mr-2 h-4 w-4" />
                            {category.name}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </Tabs>
                  </div>
                </div>

                {/* Product Categories */}
                {activeProductCategory === "games" && (
                  <>
                    {/* Mobile Game Categories */}
                    <div className="container px-4 py-2 lg:hidden">
                      <div className="overflow-x-auto pb-2">
                        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                          <TabsList className="inline-flex w-max">
                            {gameCategories.map((category) => (
                              <TabsTrigger key={category.id} value={category.id}>
                                {category.name}
                              </TabsTrigger>
                            ))}
                          </TabsList>
                        </Tabs>
                      </div>
                    </div>

                    {/* Popular Games */}
                    <section className="container px-4 py-6">
                      <h2 className="text-2xl font-bold mb-6">Popular Games</h2>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                        {popularGames.map((game) => (
                          <div key={game.id} className="group cursor-pointer" onClick={() => setSelectedGame(game.id)}>
                            <div className="aspect-square overflow-hidden rounded-xl bg-muted relative">
                              <Image
                                src={game.image || "/placeholder.svg"}
                                alt={game.name}
                                fill
                                className="object-cover transition-transform group-hover:scale-105"
                              />
                            </div>
                            <div className="mt-2">
                              <h3 className="font-medium line-clamp-1">{game.name}</h3>
                              <p className="text-xs text-muted-foreground">{game.category}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                  </>
                )}

                {activeProductCategory === "ewallet" && (
                  <section className="container px-4 py-6">
                    <h2 className="text-2xl font-bold mb-6">E-Wallet Top-Up</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {ewalletOptions.map((ewallet) => (
                        <div
                          key={ewallet.id}
                          className="group cursor-pointer"
                          onClick={() => setSelectedEwallet(ewallet.id)}
                        >
                          <div
                            className={`aspect-square overflow-hidden rounded-xl ${ewallet.color} relative flex items-center justify-center`}
                          >
                            <ewallet.icon className="h-16 w-16 text-white" />
                          </div>
                          <div className="mt-2">
                            <h3 className="font-medium text-center">{ewallet.name}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {activeProductCategory === "data" && (
                  <section className="container px-4 py-6">
                    <h2 className="text-2xl font-bold mb-6">Data Packages</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {dataProviders.map((provider) => (
                        <div
                          key={provider.id}
                          className="group cursor-pointer"
                          onClick={() => setSelectedDataProvider(provider.id)}
                        >
                          <div
                            className={`aspect-square overflow-hidden rounded-xl ${provider.color} relative flex items-center justify-center`}
                          >
                            <provider.icon className="h-16 w-16 text-white" />
                          </div>
                          <div className="mt-2">
                            <h3 className="font-medium text-center">{provider.name}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {activeProductCategory === "pulsa" && (
                  <section className="container px-4 py-6">
                    <h2 className="text-2xl font-bold mb-6">Mobile Credit (Pulsa)</h2>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                      {pulsaProviders.map((provider) => (
                        <div
                          key={provider.id}
                          className="group cursor-pointer"
                          onClick={() => setSelectedPulsaProvider(provider.id)}
                        >
                          <div
                            className={`aspect-square overflow-hidden rounded-xl ${provider.color} relative flex items-center justify-center`}
                          >
                            <provider.icon className="h-16 w-16 text-white" />
                          </div>
                          <div className="mt-2">
                            <h3 className="font-medium text-center">{provider.name}</h3>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>
                )}

                {/* Featured Promotions */}
                {!isProductSelected && (
                  <section className="bg-muted py-8">
                    <div className="container px-4">
                      <h2 className="text-2xl font-bold mb-6">Featured Promotions</h2>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {banners.map((banner) => (
                          <div key={banner.id} className="overflow-hidden rounded-xl bg-card">
                            <div className="aspect-video relative">
                              <Image
                                src={banner.image || "/placeholder.svg"}
                                alt={banner.title}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="p-4">
                              <h3 className="font-bold mb-1">{banner.title}</h3>
                              <p className="text-sm text-muted-foreground mb-3">{banner.description}</p>
                              <Button variant="outline" size="sm">
                                Learn More
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </section>
                )}

                {/* How It Works */}
                {!isProductSelected && (
                  <section className="container px-4 py-12">
                    <h2 className="text-2xl font-bold mb-8 text-center">How It Works</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                      <div className="flex flex-col items-center text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                          <GameController className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">1. Choose Your Product</h3>
                        <p className="text-muted-foreground">
                          Select from our wide variety of games, e-wallets, data packages, or pulsa
                        </p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                          <CreditCardIcon className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">2. Select Top-Up Amount</h3>
                        <p className="text-muted-foreground">Choose how much credit you want to purchase</p>
                      </div>
                      <div className="flex flex-col items-center text-center">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary mb-4">
                          <Zap className="h-6 w-6" />
                        </div>
                        <h3 className="text-lg font-medium mb-2">3. Receive Instantly</h3>
                        <p className="text-muted-foreground">Get your credits delivered to your account instantly</p>
                      </div>
                    </div>
                  </section>
                )}
              </>
            )}
          </main>
        </div>

        {/* Footer */}
        <footer className="border-t bg-muted">
          <div className="container px-4 py-8">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              <div>
                <div className="flex items-center gap-2 font-bold mb-4">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>TopUpZone</span>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  The fastest and most reliable top-up service. Get your credits instantly!
                </p>
                <div className="flex gap-4">
                  <Button variant="ghost" size="icon">
                    <span className="sr-only">Facebook</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <span className="sr-only">Twitter</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
                    </svg>
                  </Button>
                  <Button variant="ghost" size="icon">
                    <span className="sr-only">Instagram</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="h-5 w-5"
                    >
                      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                    </svg>
                  </Button>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-4">Products</h3>
                <ul className="grid gap-2">
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Games
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      E-Wallet
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Data Packages
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Pulsa
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      View All Products
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Support</h3>
                <ul className="grid gap-2">
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Help Center
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      FAQs
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Contact Us
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Terms of Service
                    </Link>
                  </li>
                  <li>
                    <Link href="#" className="text-sm text-muted-foreground hover:text-foreground">
                      Privacy Policy
                    </Link>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold mb-4">Payment Methods</h3>
                <div className="grid grid-cols-3 gap-2">
                  {Array.from({ length: 6 }).map((_, i) => (
                    <div key={i} className="aspect-[3/2] rounded bg-background p-2 flex items-center justify-center">
                      <CreditCardIcon className="h-6 w-6 text-muted-foreground" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-8 border-t pt-6 text-center text-sm text-muted-foreground">
              <p>© {new Date().getFullYear()} TopUpZone. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </SidebarProvider>
  )
}

