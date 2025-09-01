"use client"

import { useState } from "react"
import Image from "next/image"

export default function HeroVideo() {
  const [isLoading, setIsLoading] = useState(true)

  const videoSrc =
    "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/stuph%20showreel%20(1).mp4?alt=media&token=f5813f85-776e-4e72-a912-8cc1c9a203fa"

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 order-2 lg:order-2">
      <div className="relative w-full aspect-[9/16]">
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center z-10">
            <div className="flex flex-col items-center space-y-4">
              <Image
                src="/images/stuph-logo.png"
                alt="STUPH STUDIO"
                width={80}
                height={80}
                className="animate-pulse"
                onError={() => {
                  // Fallback to text if logo fails to load
                  console.log("[v0] Logo failed to load, using text fallback")
                }}
              />
              <div className="text-xs text-gray-500">Loading video...</div>
            </div>
          </div>
        )}

        <video
          muted
          loop
          playsInline
          preload="metadata"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("[v0] Hero video failed to load:", e.currentTarget.error)
            setIsLoading(false)
          }}
          onCanPlay={(e) => {
            console.log("[v0] Hero video can play")
            setIsLoading(false)
            e.currentTarget.play().catch((playError) => {
              console.log("[v0] Autoplay prevented:", playError)
              e.currentTarget.controls = true
            })
          }}
          onLoadStart={() => {
            console.log("[v0] Hero video loading started")
            setIsLoading(true)
          }}
          onLoadedData={() => {
            console.log("[v0] Hero video loaded successfully")
          }}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>

        <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
      </div>
    </div>
  )
}
