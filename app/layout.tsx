import type { Metadata, Viewport } from 'next'
import './globals.css'

export const viewport: Viewport = {
  themeColor: '#03060C',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: 'cover',
}

export const metadata: Metadata = {
  title: 'Morning Wellness — Ivan | Moodish',
  description: 'Daily mood & wellness dashboard powered by Spotify listening analysis',
  manifest: '/manifest.json',
  applicationName: 'Moodish',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'black-translucent',
    title: 'Moodish',
  },
  icons: {
    icon: '/moodish-logo.png',
    apple: '/moodish-logo.png',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Moodish" />
        <meta name="theme-color" content="#03060C" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/moodish-logo.png" />
      </head>
      <body suppressHydrationWarning>{children}</body>
    </html>
  )
}
