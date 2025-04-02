<<<<<<< HEAD
import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "TopUpZone - Game, E-Wallet, Data & Pulsa Top-Up",
  description: "The fastest and most reliable top-up service for games, e-wallets, data packages, and mobile credits.",
    generator: 'v0.dev'
=======
import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fered Store',
  description: 'Topup E-Wallet & All Games',
  developer: 'hidillon.my.id',
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
<<<<<<< HEAD
    <html lang="en" className={inter.variable}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
      </head>
=======
    <html lang="en">
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
      <body>{children}</body>
    </html>
  )
}
<<<<<<< HEAD



import './globals.css'
=======
>>>>>>> 05328758480f2ca0e80c357fdbd5c34d986925b5
