import type React from "react"
import "./globals.css"
import { Montserrat } from "next/font/google"
import type { Metadata } from "next"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Click2Fittness - Premium Websites for Fitness Coaches & Influencers",
  description:
    "We create stunning, high-performance websites for fitness coaches and influencers that turn your social media followers into paying clients.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css" />
        <script src="https://js.stripe.com/v3/" async></script>
      </head>
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
