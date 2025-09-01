"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Hls from "hls.js"

export default function HeroVideo() {
  const [isLoading, setIsLoading] = useState(true)
  const videoRef = useRef<HTMLVideoElement>(null)
  const hlsRef = useRef<Hls | null>(null)


  const hlsUrl =
    "https://storage.googleapis.com/stuph-studio.firebasestorage.app/hls/showreel/master.m3u8"

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    // Safari/iOS first (native HLS)
    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = hlsUrl
      video.addEventListener(
        "loadedmetadata",
        () => {
          setIsLoading(false)
          video.play().catch(() => (video.controls = true))
        },
        { once: true }
      )
      return
    }

    // Other browsers: hls.js
    if (Hls.isSupported()) {
      const hls = new Hls({
        enableWorker: true,
        lowLatencyMode: false,             // ✅ VOD
        startLevel: -1,
        capLevelToPlayerSize: true,
        maxBufferLength: 30,
        maxMaxBufferLength: 60,
      })
      hlsRef.current = hls
      hls.loadSource(hlsUrl)
      hls.attachMedia(video)

      hls.on(Hls.Events.MANIFEST_PARSED, () => {
        setIsLoading(false)
        video.play().catch(() => (video.controls = true))
      })
      hls.on(Hls.Events.ERROR, (_, data) => {
        console.error("[HLS]", data)
        if (data.fatal) {
          hls.destroy()
        }
      })
    } else {
      // very old browsers fallback
      video.src = hlsUrl
    }

    return () => {
      hlsRef.current?.destroy()
      hlsRef.current = null
    }
  }, [hlsUrl])

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg">
      <div className="relative w-full aspect-[9/16]">
        {isLoading && (
          <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center z-10">
            <div className="flex flex-col items-center space-y-4">
              <Image src="/images/stuph-logo.png" alt="STUPH STUDIO" width={80} height={80} className="animate-pulse" />
              <div className="text-xs text-gray-500">Loading video...</div>
            </div>
          </div>
        )}
        <video
          ref={videoRef}
          muted
          loop
          playsInline
          preload="metadata"
          className="w-full h-full object-cover"
          onLoadStart={() => setIsLoading(true)}
          onError={(e) => {
            console.error("[v0] video error:", e.currentTarget.error)
            setIsLoading(false)
          }}
        />
        <div className="absolute inset-0 bg-black/10 rounded-2xl" />
      </div>
    </div>
  )
}
