"use client"

import { notFound } from "next/navigation"
import { caseStudies } from "@/lib/case-studies"
import { CheckCircle } from "lucide-react"
import { useEffect, useState } from "react"
import Image from "next/image"

interface StoredMediaItem {
  id: string
  type: "image" | "video"
  url: string
  subheading: string
  alt?: string
  portfolioSlug: string
  timestamp: number
}

const autoPopulateFirebaseMedia = () => {
  const existingFirebaseMedia: StoredMediaItem[] = [
    // ITC Right Shift media
    {
      id: "itc-social-1",
      type: "video",
      url: "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/ITC%20Social%2F50%20Strong%20Series.MP4?alt=media&token=33f98570-377c-47d1-bf76-9f3e1f2c3da1",
      subheading: "50 Strong Series - Social Media Campaign",
      portfolioSlug: "itc-right-shift",
      timestamp: Date.now() - 86400000,
    },
    {
      id: "itc-social-2",
      type: "video",
      url: "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/ITC%20Social%2FTrend%20-%20RS_Thumka.mp4?alt=media&token=4d7a96ff-5b5c-4799-8d1c-137c4c23cc51",
      subheading: "Trend - RS Thumka Social Content",
      portfolioSlug: "itc-right-shift",
      timestamp: Date.now() - 86400000,
    },
    {
      id: "itc-ecommerce-1",
      type: "video",
      url: "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/ITC_E-COMMERCE%2FRS_SBV_ATTA_2025_May15.mp4?alt=media&token=58120bf8-07a7-4fd8-94b7-dcb1fb6c48fc",
      subheading: "Right Shift Atta E-commerce Video",
      portfolioSlug: "itc-right-shift",
      timestamp: Date.now() - 86400000,
    },
    {
      id: "itc-ecommerce-2",
      type: "video",
      url: "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/ITC_E-COMMERCE%2FRS_PCA_Namkeen_9x16_June06%2010.36.10%E2%80%AFAM.mp4?alt=media&token=b2148ef1-a9e7-40b6-9ba6-3efd8828d94b",
      subheading: "Right Shift Namkeen E-commerce Video",
      portfolioSlug: "itc-right-shift",
      timestamp: Date.now() - 86400000,
    },
    // Tify media
    {
      id: "tify-social-1",
      type: "video",
      url: "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/tiffy_social%2FA%20things%20indian%20moms%20say.mp4?alt=media&token=cc116fe2-915d-4fd4-a3da-cc14812ec164",
      subheading: "Things Indian Moms Say - Social Content",
      portfolioSlug: "tify",
      timestamp: Date.now() - 86400000,
    },
    {
      id: "tify-social-2",
      type: "video",
      url: "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/tiffy_social%2FInfluencer%20Collab.mp4?alt=media&token=3df65395-3471-4b49-8acb-4611a0068b3a",
      subheading: "Influencer Collaboration Content",
      portfolioSlug: "tify",
      timestamp: Date.now() - 86400000,
    },
    {
      id: "tify-social-3",
      type: "video",
      url: "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/tiffy_social%2FProfile%20visit%20ad.mp4?alt=media&token=4041835c-7cce-4fb7-b2f7-3e916e1a1e42",
      subheading: "Profile Visit Advertisement",
      portfolioSlug: "tify",
      timestamp: Date.now() - 86400000,
    },
    // Voyaah media
    {
      id: "voyaah-video-1",
      type: "video",
      url: "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/Voyaah%2FVoyaah_Promo.mp4?alt=media&token=12345678-1234-1234-1234-123456789012",
      subheading: "Voyaah Promotional Video",
      portfolioSlug: "voyaah",
      timestamp: Date.now() - 86400000,
    },
    // Nippu Kodi media
    {
      id: "nippu-kodi-1",
      type: "video",
      url: "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/Nippu_kodi%2FF86D0082-6DD8-492B-B4A8-F0F3518C4058.mov?alt=media&token=87654321-4321-4321-4321-210987654321",
      subheading: "Nippu Kodi Brand Content",
      portfolioSlug: "gastronomix",
      timestamp: Date.now() - 86400000,
    },
  ]

  // Get existing data from localStorage
  const existingData = localStorage.getItem("portfolio-media")
  let currentMedia: StoredMediaItem[] = []

  if (existingData) {
    try {
      currentMedia = JSON.parse(existingData)
    } catch (e) {
      console.error("[v0] Error parsing existing media data:", e)
    }
  }

  // Add new media items if they don't already exist
  const existingUrls = new Set(currentMedia.map((item) => item.url))
  const newMedia = existingFirebaseMedia.filter((item) => !existingUrls.has(item.url))

  if (newMedia.length > 0) {
    const updatedMedia = [...currentMedia, ...newMedia]
    localStorage.setItem("portfolio-media", JSON.stringify(updatedMedia))
    console.log(`[v0] Auto-populated ${newMedia.length} Firebase media items`)
  }
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug)
  const [uploadedMedia, setUploadedMedia] = useState<StoredMediaItem[]>([])

  useEffect(() => {
    window.scrollTo(0, 0)

    autoPopulateFirebaseMedia()

    console.log("[v0] Portfolio page mounted for slug:", params.slug)
    console.log("[v0] Current domain:", window.location.hostname)
    console.log("[v0] Current protocol:", window.location.protocol)
    console.log("[v0] localStorage available:", typeof Storage !== "undefined")

    // Check all localStorage keys
    console.log("[v0] All localStorage keys:", Object.keys(localStorage))
    console.log("[v0] localStorage length:", localStorage.length)

    // Check specifically for our key
    const hasPortfolioMedia = localStorage.getItem("portfolio-media")
    console.log("[v0] portfolio-media exists:", !!hasPortfolioMedia)
    console.log("[v0] portfolio-media length:", hasPortfolioMedia?.length || 0)

    try {
      const rawData = localStorage.getItem("portfolio-media")
      console.log("[v0] Raw localStorage data:", rawData)

      if (!rawData) {
        console.log("[v0] No portfolio-media found in localStorage")
        console.log("[v0] This could mean:")
        console.log("[v0] 1. No media was ever uploaded")
        console.log("[v0] 2. localStorage was cleared")
        console.log("[v0] 3. Different domain/subdomain")
        return
      }

      const allMedia: StoredMediaItem[] = JSON.parse(rawData)
      console.log("[v0] Parsed media data:", allMedia)
      console.log("[v0] Total media items:", allMedia.length)

      // Filter media for this specific portfolio
      const filteredMedia = allMedia.filter((item) => item.portfolioSlug === params.slug)
      console.log("[v0] Loaded media for portfolio:", params.slug, filteredMedia)

      if (filteredMedia.length === 0) {
        console.log("[v0] No media found for portfolio:", params.slug)
        console.log("[v0] Available portfolio slugs:", [...new Set(allMedia.map((item) => item.portfolioSlug))])
      }

      console.log("[v0] All stored media:", allMedia)
      setUploadedMedia(filteredMedia)
    } catch (error) {
      console.error("[v0] Error loading media from localStorage:", error)
      console.log("[v0] Raw data that failed to parse:", localStorage.getItem("portfolio-media"))
    }
  }, [params.slug])

  if (!study) {
    notFound()
  }

  const getActualMediaType = (item: StoredMediaItem): "image" | "video" => {
    const url = item.url.toLowerCase()
    if (url.includes(".mp4") || url.includes(".mov") || url.includes(".webm") || url.includes(".avi")) {
      return "video"
    }
    return "image"
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in-left">
              <div className="inline-flex items-center px-4 py-2 bg-purple-100 text-purple-700 rounded-full text-sm font-medium mb-6">
                {study.category}
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
                {study.title}
              </h1>
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">{study.brief}</p>
            </div>
            <div className="animate-fade-in-right">
              <div className="relative">
                <Image
                  src={study.mainImage || "/placeholder.svg"}
                  alt={`${study.title} main image`}
                  width={600}
                  height={400}
                  className="rounded-2xl shadow-2xl w-full h-auto"
                />
                <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-white rounded-2xl shadow-lg flex items-center justify-center">
                  <Image
                    src={study.logoImage || "/placeholder.svg"}
                    alt={`${study.title} logo`}
                    width={60}
                    height={60}
                    className="object-contain"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Problem Section */}
          <div className="mb-16 animate-fade-in-up animate-delay-200">
            <div className="flex items-center space-x-3 mb-8">
              <div className="w-8 h-8 bg-red-100 rounded-lg flex items-center justify-center">
                <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                  />
                </svg>
              </div>
              <h2 className="text-3xl font-bold text-black">The Challenge</h2>
            </div>
            <p className="text-gray-700 leading-relaxed text-lg">{study.problem}</p>
          </div>

          {/* Role Section */}
          {study.role && study.role.length > 0 && (
            <div className="mb-16 animate-fade-in-up animate-delay-400">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Our Approach</h2>
              </div>
              <div className="space-y-6">
                {study.role.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Outcome Section */}
          {study.outcome && study.outcome.length > 0 && (
            <div className="mb-16 animate-fade-in-up animate-delay-600">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">The Results</h2>
              </div>
              <div className="space-y-6">
                {study.outcome.map((item, index) => (
                  <div key={index} className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-6 h-6 bg-green-600 rounded-full flex items-center justify-center mt-1">
                      <CheckCircle className="w-4 h-4 text-white" />
                    </div>
                    <p className="text-gray-700 leading-relaxed">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {uploadedMedia.length > 0 && (
            <div className="mb-16 animate-fade-in-up animate-delay-800">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Project Gallery</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedMedia.map((item) => {
                  const actualType = getActualMediaType(item)
                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative w-full aspect-[9/16]">
                        {actualType === "image" ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={item.url || "/placeholder.svg"}
                              alt={item.alt || item.subheading}
                              fill
                              className="object-cover"
                              crossOrigin="anonymous"
                              onError={(e) => {
                                console.error("[v0] Image failed to load:", item.url)
                                const target = e.currentTarget
                                const parent = target.parentElement
                                if (parent) {
                                  parent.innerHTML = `
                                    <div class="w-full h-full bg-gradient-to-br from-red-50 to-red-100 flex flex-col items-center justify-center p-4">
                                      <div class="text-red-500 text-4xl mb-2">⚠️</div>
                                      <div class="text-red-700 font-medium text-center mb-2">Image unavailable</div>
                                      <p class="text-xs text-gray-600 mb-3">
                                        CORS error: Firebase Storage not configured for production domain
                                      </p>
                                      <div class="text-xs text-gray-500 mb-3 text-left">
                                        <p class="font-medium mb-1">To fix this:</p>
                                        <ol class="list-decimal list-inside space-y-1">
                                          <li>Create cors.json file:</li>
                                          <pre class="bg-gray-200 p-2 rounded text-xs mt-1 mb-2">
[{
  "origin": ["https://www.stuph.co"],
  "method": ["GET"],
  "maxAgeSeconds": 3600
}]</pre>
                                          <li>
                                            Run: <code class="bg-gray-200 px-1 rounded">
                                              gsutil cors set cors.json gs://stuph-studio.firebasestorage.app
                                            </code>
                                          </li>
                                        </ol>
                                      </div>
                                      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 text-xs underline">
                                        Open direct link
                                      </a>
                                    </div>
                                  `
                                }
                              }}
                              onLoad={() => {
                                console.log("[v0] Image loaded successfully:", item.url)
                              }}
                            />
                          </div>
                        ) : (
                          <div className="relative w-full h-full group">
                            <video
                              src={item.url}
                              playsInline
                              preload="metadata"
                              loop
                              muted
                              className="w-full h-full object-cover cursor-pointer"
                              crossOrigin="anonymous"
                              onClick={(e) => {
                                const video = e.currentTarget
                                if (video.paused) {
                                  video.play()
                                } else {
                                  video.pause()
                                }
                              }}
                              onError={(e) => {
                                console.error("[v0] Video failed to load:", item.url)
                                const target = e.currentTarget
                                const parent = target.parentElement
                                if (parent) {
                                  parent.innerHTML = `
                                    <div class="w-full h-full bg-gradient-to-br from-red-50 to-red-100 flex flex-col items-center justify-center p-4">
                                      <div class="text-red-500 text-4xl mb-2">⚠️</div>
                                      <div class="text-red-700 font-medium text-center mb-2">Video unavailable</div>
                                      <p class="text-xs text-gray-600 mb-3">
                                        Check Firebase Storage configuration
                                      </p>
                                      <a href="${item.url}" target="_blank" rel="noopener noreferrer" class="text-blue-600 hover:text-blue-800 text-xs underline">
                                        Open direct link
                                      </a>
                                    </div>
                                  `
                                }
                              }}
                              onLoadStart={() => {
                                console.log("[v0] Video loading started:", item.url)
                              }}
                              onCanPlay={() => {
                                console.log("[v0] Video can play:", item.url)
                              }}
                              onLoadedData={() => {
                                console.log("[v0] Video loaded successfully:", item.url)
                              }}
                            >
                              Your browser does not support the video tag.
                            </video>
                            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                              <div className="w-12 h-12 bg-white bg-opacity-80 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <svg className="w-6 h-6 text-gray-800 ml-1" fill="currentColor" viewBox="0 0 24 24">
                                  <path d="M8 5v14l11-7z" />
                                </svg>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      {item.subheading && (
                        <div className="p-4">
                          <p className="text-sm font-medium text-gray-800">{item.subheading}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
