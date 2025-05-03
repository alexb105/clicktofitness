import type React from "react"
import type { Metadata } from "next"
import { Montserrat } from "next/font/google"
import "../globals.css"

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-montserrat",
})

export const metadata: Metadata = {
  title: "Admin Dashboard - Click2Fitness",
  description: "Admin dashboard for Click2Fitness website",
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={montserrat.className}>{children}</body>
    </html>
  )
}
