"use client"

import { useEffect, useRef } from "react"

export default function HeroVideo() {
  const vref = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    // If autoplay fails, show controls so the user can start playback
    const v = vref.current
    if (!v) return
    v.play().catch(() => {
      v.controls = true
    })
  }, [])

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 order-2 lg:order-2">
      <div className="relative w-full aspect-[9/16]">
        <video
          ref={vref}
          muted
          loop
          playsInline
          preload="metadata"             // <— key change
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="w-full h-full object-cover"
          poster="/placeholder.svg?height=400&width=225&text=Loading+Video"
          onError={(e) => {
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
          onLoadStart={() => console.log("[v0] Video streaming started")}
          onProgress={() => console.log("[v0] Video buffering in progress")}
        >
          <source
            src="https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/stuph%20showreel.mp4?alt=media&token=d13f7604-d4fc-4ec5-9ae4-8f789c05785f"
            type="video/mp4"
          />
        </video>
        <div className="absolute inset-0 bg-black/10 rounded-2xl pointer-events-none" />
      </div>
    </div>
  )
}
