// lib/data/products.ts
import {
  GamepadIcon as GameController,
  Wallet,
  Smartphone,
  Wifi,
} from "lucide-react"
// Product categories
export const productCategories = [
  { id: "games", name: "Games", icon: GameController, color: "bg-purple-500" },
  { id: "ewallet", name: "E-Wallet", icon: Wallet, color: "bg-blue-500" },
  { id: "data", name: "Data Packages", icon: Wifi, color: "bg-green-500" },
  { id: "pulsa", name: "Pulsa", icon: Smartphone, color: "bg-orange-500" },
];
// Game Categories
export const gameCategories = [
  { id: "all", name: "All Games" },
  { id: "moba", name: "MOBA" },
  { id: "fps", name: "FPS" },
  { id: "rpg", name: "RPG" },
  { id: "battle-royale", name: "Battle Royale" },
  { id: "mmorpg", name: "MMORPG" },
];

// Popular Games
export const popularGames = [
  {
    id: "mobile-legends",
    name: "Mobile Legends",
    image: "/logo/mlbb.webp",
    category: "MOBA",
  },
  {
    id: "pubg-mobile",
    name: "PUBG Mobile",
    image: "/logo/pubg.webp",
    category: "Battle Royale",
  },
  {
    id: "genshin-impact",
    name: "Genshin Impact",
    image: "/logo/gensin.webp",
    category: "RPG",
  },
  {
    id: "free-fire",
    name: "Free Fire",
    image: "/logo/ff.webp",
    category: "Battle Royale",
  },
  {
    id: "call-of-duty-mobile",
    name: "Call of Duty Mobile",
    image: "/logo/codm.webp",
    category: "FPS",
  },
  {
    id: "valorant",
    name: "Valorant",
    image: "/logo/valorant.webp",
    category: "FPS",
  },
];

// E-Wallet Options
export const ewalletOptions = [
  {
    id: "gopay",
    name: "GoPay",
    image: "/logo/gopay.webp",
    color: "blue-500",
  },
  {
    id: "ovo",
    name: "OVO",
    image: "/logo/ovo.webp",
    color: "purple-500",
  },
  {
    id: "dana",
    name: "DANA",
    image: "/logo/dana.webp",
    color: "blue-400",
  },
  {
    id: "linkaja",
    name: "LinkAja",
    image: "/logo/linkaja.webp",
    color: "red-500",
  },
  {
    id: "shopeepay",
    name: "ShopeePay",
    image: "/logo/shopepay.webp",
    color: "orange-500",
  },
];

// Data Package Providers
export const dataProviders = [
  {
    id: "telkomsel",
    name: "Telkomsel",
    image: "/logo/telkomsel.webp",
    color: "red-500",
  },
  {
    id: "xl",
    name: "XL",
    image: "/logo/xl.webp",
    color: "blue-500",
  },
  {
    id: "indosat",
    name: "Indosat",
    image: "/logo/indosat.webp",
    color: "yellow-500",
  },
  {
    id: "tri",
    name: "Tri",
    image: "/logo/tri.webp",
    color: "purple-500",
  },
  {
    id: "smartfren",
    name: "Smartfren",
    image: "/logo/smartfren.webp",
    color: "red-600",
  },
];

// Pulsa Providers
export const pulsaProviders = [
  {
    id: "telkomsel",
    name: "Telkomsel",
    image: "/logo/telkomsel.webp",
    color: "red-500",
  },
  {
    id: "xl",
    name: "XL",
    image: "/logo/xl.webp",
    color: "blue-500",
  },
  {
    id: "indosat",
    name: "Indosat",
    image: "/logo/indosat.webp",
    color: "yellow-500",
  },
  {
    id: "tri",
    name: "Tri",
    image: "/logo/tri.webp",
    color: "purple-500",
  },
  {
    id: "smartfren",
    name: "Smartfren",
    image: "/logo/smartfren.webp",
    color: "red-600",
  },
];
// Top-Up Options untuk Free Fire
export const topupOptionsFreeFire = [
  { id: "ff-10", name: "10 Diamonds", price: 2500, discount: 0 },
  { id: "ff-20", name: "20 Diamonds", price: 5000, discount: 0 },
  { id: "ff-50", name: "50 Diamonds", price: 13000, discount: 0 },
  { id: "ff-70", name: "70 Diamonds", price: 18000, discount: 0 },
  { id: "ff-100", name: "100 Diamonds", price: 14000, discount: 0 },
  { id: "ff-140", name: "140 Diamonds", price: 20000, discount: 0 },
  { id: "ff-355", name: "355 Diamonds", price: 50000, discount: 0 },
  { id: "ff-405", name: "405 Diamonds", price: 58000, discount: 0 },
  { id: "ff-475", name: "475 Diamonds", price: 65000, discount: 0 },
  { id: "ff-720", name: "720 Diamonds", price: 95000, discount: 0 },
  { id: "ff-1000", name: "1000 Diamonds", price: 135000, discount: 0 },
  { id: "ff-1450", name: "1450 Diamonds", price: 200000, discount: 0 },
];

// Top-Up Options untuk Mobile Legends
export const topupOptionsMobileLegends = [
  { id: "ml-12", name: "12 Diamonds", price: 5000, discount: 0 },
  { id: "ml-19", name: "19 Diamonds", price: 8000, discount: 0 },
  { id: "ml-36", name: "36 Diamonds", price: 12000, discount: 0 },
  { id: "ml-86", name: "86 Diamonds", price: 28000, discount: 0 },
  { id: "ml-172", name: "172 Diamonds", price: 48000, discount: 0 },
  { id: "ml-194", name: "194 Diamonds", price: 55000, discount: 0 },
  { id: "ml-222", name: "222 Diamonds", price: 60000, discount: 0 },
  { id: "ml-257", name: "257 Diamonds", price: 70000, discount: 0 },
  { id: "ml-296", name: "296 Diamonds", price: 80000, discount: 0 },
  { id: "ml-370", name: "370 Diamonds", price: 100000, discount: 0 },
];

export const topupOptions = [
  { id: "diamonds-100", name: "100 Diamonds", price: 20000, discount: 0 },
  { id: "diamonds-300", name: "300 Diamonds", price: 50000, discount: 5 },
  { id: "diamonds-500", name: "500 Diamonds", price: 80000, discount: 10 },
  { id: "diamonds-1000", name: "1000 Diamonds", price: 150000, discount: 15 },
  { id: "diamonds-2000", name: "2000 Diamonds", price: 290000, discount: 20 },
];

// E-Wallet Top-Up Options
export const ewalletTopupOptions = [
  { id: "ewallet-10k", name: "Rp 10.000", price: 11000, discount: 0 },
  { id: "ewallet-20k", name: "Rp 20.000", price: 21000, discount: 0 },
  { id: "ewallet-50k", name: "Rp 50.000", price: 51000, discount: 2 },
  { id: "ewallet-100k", name: "Rp 100.000", price: 101000, discount: 3 },
  { id: "ewallet-200k", name: "Rp 200.000", price: 201000, discount: 5 },
  { id: "ewallet-500k", name: "Rp 500.000", price: 500000, discount: 7 },
];

// Data Package Options
export const dataPackageOptions = [
  {
    id: "data-1gb-1day",
    name: "1GB - 1 Day",
    price: 10000,
    discount: 0,
    description: "1GB internet for 1 day",
  },
  {
    id: "data-3gb-3days",
    name: "3GB - 3 Days",
    price: 15000,
    discount: 0,
    description: "3GB internet for 3 days",
  },
  {
    id: "data-5gb-7days",
    name: "5GB - 7 Days",
    price: 35000,
    discount: 5,
    description: "5GB internet for 7 days",
  },
  {
    id: "data-10gb-30days",
    name: "10GB - 30 Days",
    price: 60000,
    discount: 10,
    description: "10GB internet for 30 days",
  },
  {
    id: "data-25gb-30days",
    name: "25GB - 30 Days",
    price: 100000,
    discount: 15,
    description: "25GB internet for 30 days",
  },
];

// Pulsa Options
export const pulsaOptions = [
  { id: "pulsa-5k", name: "Rp 5.000", price: 6000, discount: 0 },
  { id: "pulsa-10k", name: "Rp 10.000", price: 11000, discount: 0 },
  { id: "pulsa-20k", name: "Rp 20.000", price: 21000, discount: 0 },
  { id: "pulsa-50k", name: "Rp 50.000", price: 50500, discount: 1 },
  { id: "pulsa-100k", name: "Rp 100.000", price: 100000, discount: 2 },
];
