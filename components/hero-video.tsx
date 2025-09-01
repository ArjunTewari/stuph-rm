"use client"
import { useEffect, useRef } from "react"

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.play().catch(() => {
              // Fallback: show controls if autoplay fails
              video.controls = true
            })
          }
        })
      },
      { threshold: 0.1 },
    )

    observer.observe(video)

    return () => {
      observer.disconnect()
    }
  }, [])

  return (
    <div className="relative w-full aspect-[9/16] rounded-lg overflow-hidden shadow">
      <video
        ref={videoRef}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        controlsList="nodownload nofullscreen noremoteplayback"
        className="w-full h-full object-cover"
        poster="/placeholder.svg?height=400&width=225&text=Loading+Video"
        src="https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/Showreel%20v3.mp4?alt=media&token=6f41a8f4-e146-41e5-86ca-b92d6f2448c5&_stream=true"
      />
      {/* Subtle overlay for better video presentation */}
      <div className="absolute inset-0 bg-black/10 rounded-2xl pointer-events-none"></div>
    </div>
  )
}
