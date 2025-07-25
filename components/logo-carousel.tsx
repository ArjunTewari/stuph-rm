"use client"

import Image from "next/image"
import { useState } from "react"

const LogoCarousel = () => {
  const [isPaused, setIsPaused] = useState(false)

  const logos = [
    {
      name: "ITC Right Shift",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%201-uWX2jyEARuXMQKDsxIkPiusvw4Pjjo.png",
      alt: "ITC Right Shift - Enduring Value",
    },
    {
      name: "Voyaah.com",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%202-eXW191V6I6WM8ypprMYgCGLlrI2UzU.png",
      alt: "Voyaah.com - Your luxury travel partner",
    },
    {
      name: "Raising Superstars",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%203-Txi3x7bZhZ2qOKKNFNiipsJxWxfBrP.png",
      alt: "Raising Superstars",
    },
    {
      name: "Flipkart",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%204-5yLp8Odj3gYdJcArVjQabwM5HOFki2.png",
      alt: "Flipkart",
    },
    {
      name: "Flipkart Reset",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%205-DAd7xWEh4p2NbcspD3LULu3TPa2pIX.png",
      alt: "Flipkart Reset",
    },
    {
      name: "Great Indian Gin",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%206-NPbvewIyQOh58qyIIPUc7a3lCjDVRW.png",
      alt: "Great Indian Gin",
    },
    {
      name: "Disco Panda",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%207-ZsRwxsEROLAPUFEPPHSPQ2pk0jf5aB.png",
      alt: "Disco Panda",
    },
    {
      name: "Humpy Farms",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%208-Wxz6JJtDfh9vICivRJ5FmsDBhWzx8v.png",
      alt: "Humpy Farms",
    },
    {
      name: "Renue Minerals",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%209-4b3Gz1GsT97JOP7ud9CWeI9n8U46B7.png",
      alt: "Renue Minerals",
    },
    {
      name: "Only Earth",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%2010-FPUEUYg90zknfhtZxazNjWjtwX5UuR.png",
      alt: "Only Earth",
    },
    {
      name: "BoldFit",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%2011-CT871eiogf9nvbEVosB0XKBAGcC7qA.png",
      alt: "BoldFit",
    },
    {
      name: "Beyond The Sugar",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%2012-2sttqbbpBhNnLHIIaxwLvkSVJ5ASnh.png",
      alt: "Beyond The Sugar",
    },
    {
      name: "ZEVO",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%2013-UcCi9pDBszdaIfhlk5K93DIdn9Rvve.png",
      alt: "ZEVO",
    },
    {
      name: "Mia by TANISHQ",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%2014-H8mxoQMyetDJZr0gyD8t0Sxchzm3MN.png",
      alt: "Mia by TANISHQ",
    },
    {
      name: "HDFC SKY",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/logo%2015-4BekrRdISgSrxw8J72Da5q4i1WC7Zu.png",
      alt: "HDFC SKY - Make Money Matter",
    },
    {
      name: "NIPPU KODI",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DXESn8fXnuAlZnEZmFXQJyR7T28Fh8.png",
      alt: "NIPPU KODI",
    },
    {
      name: "El Chaapo",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-f9FmA63waCesH44rxQB4lvYfKPw3iq.png",
      alt: "El Chaapo",
    },
    {
      name: "BOOM PIZZA",
      src: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-zOxGil1G9FYspsulF6KWA1DHCs8Fxl.png",
      alt: "BOOM PIZZA",
    },
  ]

  // Duplicate logos for seamless infinite scroll
  const duplicatedLogos = [...logos, ...logos]

  return (
    <section className="py-16 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-black mb-4">Companies We've Worked With</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Trusted by leading brands across industries to create impactful content and drive growth
          </p>
        </div>

        {/* Logo Carousel */}
        <div className="relative">
          {/* Gradient fade edges */}
          <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

          {/* Scrolling container */}
          <div
            className={`flex space-x-12 md:space-x-16 lg:space-x-20 ${isPaused ? "animation-paused" : ""}`}
            style={{
              animation: "scroll 90s linear infinite",
              width: "fit-content",
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {duplicatedLogos.map((logo, index) => (
              <div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 flex items-center justify-center w-32 md:w-40 lg:w-48 h-16 md:h-20 lg:h-24 bg-white rounded-lg shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer group"
              >
                <div className="relative w-full h-full p-2 md:p-3">
                  <Image
                    src={logo.src || "/placeholder.svg"}
                    alt={logo.alt}
                    fill
                    className="object-contain transition-all duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animation-paused {
          animation-play-state: paused !important;
        }
      `}</style>
    </section>
  )
}

export default LogoCarousel
