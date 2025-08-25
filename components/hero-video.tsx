"use client"

export default function HeroVideo() {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 order-2 lg:order-2">
      <div className="relative w-full aspect-[9/16]">
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
            console.log("[v0] Hero video failed to load")
            e.currentTarget.style.display = "none"
          }}
          onCanPlay={(e) => {
            e.currentTarget.play().catch(() => {
              console.log("[v0] Autoplay prevented, showing controls")
              e.currentTarget.controls = true
            })
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
