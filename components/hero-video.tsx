"use client"

export default function HeroVideo() {
  const videoSrc =
    "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/stuph%20showreel%20(1).mp4?alt=media&token=f5813f85-776e-4e72-a912-8cc1c9a203fa"

  return (
    <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 order-2 lg:order-2">
      <div className="relative w-full aspect-[9/16]">
        <video src={videoSrc} autoPlay muted loop playsInline className="w-full h-full object-cover" />
        {/* Subtle overlay for better video presentation */}
        <div className="absolute inset-0 bg-black/10 rounded-2xl"></div>
      </div>
    </div>
  )
}
