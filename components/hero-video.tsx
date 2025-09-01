"use client"

export default function HeroVideo() {
  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 order-2 lg:order-2">
      <div className="relative w-full aspect-[9/16]">
        <video
          muted
          loop
          playsInline
          preload="metadata" // Changed from "auto" to "metadata" for faster initial loading
          controls={false}
          disablePictureInPicture
          controlsList="nodownload nofullscreen noremoteplayback"
          className="w-full h-full object-cover"
          poster="/placeholder.svg?height=400&width=225&text=Loading+Video" // Added poster for immediate visual feedback
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
          onCanPlay={(e) => {
            e.currentTarget.play().catch(() => {
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
        <div className="absolute inset-0 bg-black/10 rounded-2xl pointer-events-none"></div>{" "}
        {/* Added pointer-events-none for better interaction */}
      </div>
    </div>
  )
}
