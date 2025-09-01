"use client"

import { useState } from "react"

export default function HeroVideo() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 order-2 lg:order-2">
      <div className="relative w-full aspect-[9/16]">
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center z-10">
            <div className="flex space-x-1">
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.3s]"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce [animation-delay:-0.15s]"></div>
              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
            </div>
          </div>
        )}

        <video
          muted
          loop
          playsInline
          preload="auto"
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="w-full h-full object-cover"
          onError={(e) => {
            console.error("[v0] Hero video failed to load:", e.currentTarget.src)
            console.error("[v0] Hero video error details:", e.currentTarget.error)
            setIsLoading(false)
            e.currentTarget.style.display = "none"
            const parent = e.currentTarget.parentElement
            if (parent) {
              parent.innerHTML = `
                <div class="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                  <div class="text-center text-gray-600">
                    <div class="text-4xl mb-2">🎬</div>
                    <div class="font-medium">Video Loading...</div>
                  </div>
                </div>
              `
            }
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
          <source
            src="https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/stuph%20showreel.mp4?alt=media&token=d13f7604-d4fc-4ec5-9ae4-8f789c05785f"
            type="video/mp4"
          />
        </video>
        {/* Subtle overlay for better video presentation */}
        <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
      </div>
    </div>
  )
}
