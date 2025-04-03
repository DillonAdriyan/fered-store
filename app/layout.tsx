import type React from "react"
import type { Metadata } from "next"

import "./globals.css"


export const metadata: Metadata = {
  title: 'Fered Store',
  description: 'Topup E-Wallet & All Games',
  developer: 'hidillon.my.id',
  'google-site-verification': '3XJdJdZsMgFBGXE4ZCJHGQ89Bju3MIFTF927v2ppWrk',
  

}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
