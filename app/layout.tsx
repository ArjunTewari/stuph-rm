import type React from "react"
import type { Metadata } from "next"
import { Poppins } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"
import Footer from "@/components/footer"

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "stuph studio - Content Marketing Agency",
  description:
    "Creative content marketing solutions that tell your story and drive results. We craft compelling narratives that connect brands with their audiences.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans`}>
        <Navigation />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}
