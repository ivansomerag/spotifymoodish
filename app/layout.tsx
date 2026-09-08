import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Morning Wellness — Ivan',
  description: 'Daily mood & wellness dashboard powered by Spotify listening analysis',
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
