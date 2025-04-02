import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Fered Store',
  description: 'Topup E-Wallet & All Games',
  developer: 'hidillon.my.id',
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
