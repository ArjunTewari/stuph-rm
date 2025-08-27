"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, RefreshCw, CheckCircle } from "lucide-react"
import { caseStudies } from "@/lib/case-studies"
import { getStorage, ref, getDownloadURL } from "firebase/storage"

interface StoredMediaItem {
  id: string
  url: string
  path?: string // Firebase Storage path
  type: string
  alt?: string
  subheading?: string
  portfolioSlug: string
}

interface MediaLoadState {
  [key: string]: "loading" | "loaded" | "error"
}

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const [uploadedMedia, setUploadedMedia] = useState<StoredMediaItem[]>([])
  const [mediaLoadState, setMediaLoadState] = useState<MediaLoadState>({})
  const [retryCount, setRetryCount] = useState<{ [key: string]: number }>({})

  const study = caseStudies.find((study) => study.slug === params.slug)

  useEffect(() => {
    const loadPortfolioMedia = async () => {
      console.log("[v0] Loading portfolio media for slug:", params.slug)
      console.log("[v0] Current domain:", window.location.hostname)
      console.log("[v0] Current protocol:", window.location.protocol)

      try {
        const rawData = localStorage.getItem("portfolio-media")
        console.log("[v0] Raw localStorage data:", rawData)

        if (!rawData) {
          console.log("[v0] No portfolio-media found in localStorage")
          return
        }

        const storedMedia = JSON.parse(rawData) as StoredMediaItem[]
        console.log("[v0] Parsed stored media:", storedMedia)
        console.log("[v0] Total stored items:", storedMedia.length)

        const portfolioMedia = storedMedia.filter((item) => {
          console.log("[v0] Checking item:", item.portfolioSlug, "against", params.slug)
          return item.portfolioSlug === params.slug
        })

        console.log("[v0] Filtered portfolio media:", portfolioMedia)

        const storage = getStorage()
        const resolveUrls = async () => {
          const withFreshUrls = await Promise.all(
            portfolioMedia.map(async (m) => {
              // If we have a Firebase Storage path, get fresh URL
              if (m.path) {
                const storageRef = ref(storage, m.path)
                try {
                  const freshUrl = await getDownloadURL(storageRef)
                  console.log("[v0] Resolved fresh URL for", m.path, ":", freshUrl)
                  return { ...m, url: freshUrl }
                } catch (e) {
                  console.error("[v0] getDownloadURL failed for", m.path, e)
                  return m // keep whatever URL we had
                }
              }
              return m
            }),
          )

          setUploadedMedia(withFreshUrls)

          // Initialize media load states
          const initialLoadState: MediaLoadState = {}
          withFreshUrls.forEach((item) => {
            initialLoadState[item.id] = "loading"
          })
          setMediaLoadState(initialLoadState)
        }

        await resolveUrls()
      } catch (error) {
        console.error("[v0] Error loading media from localStorage:", error)
      }
    }

    loadPortfolioMedia()
  }, [params.slug])

  const handleMediaError = (mediaId: string, url: string) => {
    console.error("[v0] Media failed to load:", url)
    setMediaLoadState((prev) => ({ ...prev, [mediaId]: "error" }))
  }

  const handleMediaLoad = (mediaId: string, url: string) => {
    console.log("[v0] Media loaded successfully:", url)
    setMediaLoadState((prev) => ({ ...prev, [mediaId]: "loaded" }))
  }

  const retryMediaLoad = (mediaId: string) => {
    const currentRetries = retryCount[mediaId] || 0
    if (currentRetries < 3) {
      setRetryCount((prev) => ({ ...prev, [mediaId]: currentRetries + 1 }))
      setMediaLoadState((prev) => ({ ...prev, [mediaId]: "loading" }))

      setTimeout(async () => {
        const mediaItem = uploadedMedia.find((item) => item.id === mediaId)
        if (mediaItem?.path) {
          try {
            const storage = getStorage()
            const storageRef = ref(storage, mediaItem.path)
            const freshUrl = await getDownloadURL(storageRef)

            // Update the media item with fresh URL
            setUploadedMedia((prev) => prev.map((item) => (item.id === mediaId ? { ...item, url: freshUrl } : item)))

            console.log("[v0] Retry: Got fresh URL for", mediaItem.path, ":", freshUrl)
          } catch (e) {
            console.error("[v0] Retry failed for", mediaItem.path, e)
          }
        }
      }, 100)
    }
  }

  const processFirebaseUrl = (url: string): string => {
    if (!url.includes("firebasestorage.googleapis.com")) {
      return url
    }

    // Only add cache busting, don't manipulate tokens
    const urlObj = new URL(url)
    urlObj.searchParams.set("_cb", Date.now().toString())
    return urlObj.toString()
  }

  if (!study) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-32 pb-20 lg:pt-40 lg:pb-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-purple-600 font-semibold mb-4 animate-fade-in-up">{study.category}</p>
          <h1 className="text-4xl md:text-6xl font-bold text-black mb-6 leading-tight animate-fade-in-up animate-delay-100">
            {study.title}
          </h1>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed animate-fade-in-up animate-delay-200">
            {study.brief}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
        {/* The Problem */}
        <section className="animate-fade-in-up animate-delay-300">
          <h2 className="text-3xl font-bold text-black mb-6">The Problem</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{study.problem}</p>
        </section>

        {/* Our Role */}
        <section className="animate-fade-in-up animate-delay-400">
          <h2 className="text-3xl font-bold text-black mb-8">Our Role</h2>
          <div className="space-y-4">
            {study.role?.map((item, index) => (
              <div key={index} className="flex items-start space-x-4">
                <CheckCircle className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                <p className="text-gray-700 leading-relaxed text-lg">{item}</p>
              </div>
            )) || <p className="text-gray-700 leading-relaxed text-lg">Role details coming soon...</p>}
          </div>
        </section>

        {/* The Outcome */}
        <section className="animate-fade-in-up animate-delay-500">
          <h2 className="text-3xl font-bold text-black mb-8">The Outcome</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {study.outcome?.map((item, index) => (
              <Card key={index} className="bg-gray-50 border-gray-200 hover-lift">
                <CardContent className="p-6">
                  <p className="text-gray-800 font-medium text-lg">{item}</p>
                </CardContent>
              </Card>
            )) || (
              <Card className="bg-gray-50 border-gray-200">
                <CardContent className="p-6">
                  <p className="text-gray-800 font-medium text-lg">Outcome details coming soon...</p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* Enhanced Project Gallery Section */}
        {uploadedMedia.length > 0 && (
          <section className="py-20 bg-gray-50 animate-fade-in-up animate-delay-500">
            <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 002 2z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Project Gallery</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Additional media content showcasing various aspects of this project.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedMedia.map((item) => {
                  const getMediaType = (url: string, storedType: string) => {
                    const extension = url.toLowerCase().split(".").pop()?.split("?")[0]
                    if (extension && ["mp4", "webm", "ogg", "mov", "avi"].includes(extension)) {
                      return "video"
                    }
                    if (extension && ["jpg", "jpeg", "png", "gif", "webp", "svg"].includes(extension)) {
                      return "image"
                    }
                    return storedType
                  }

                  const actualType = getMediaType(item.url, item.type)
                  const processedUrl = item.url
                  const loadState = mediaLoadState[item.id] || "loading"
                  const retries = retryCount[item.id] || 0

                  return (
                    <div
                      key={item.id}
                      className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      {actualType === "image" ? (
                        <div className="relative w-full aspect-[9/16]">
                          {loadState === "loading" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <div className="text-center">
                                <RefreshCw className="h-6 w-6 animate-spin text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Loading image...</p>
                              </div>
                            </div>
                          )}

                          <Image
                            data-media-id={item.id}
                            src={processedUrl || "/placeholder.svg"}
                            alt={item.alt || item.subheading || "Project gallery image"}
                            width={400}
                            height={500}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                              loadState === "loaded" ? "opacity-100" : "opacity-0"
                            }`}
                            crossOrigin="anonymous"
                            onError={() => handleMediaError(item.id, item.url)}
                            onLoad={() => handleMediaLoad(item.id, item.url)}
                          />

                          {loadState === "error" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <div className="text-center p-4">
                                <div className="mb-3 text-3xl">📷</div>
                                <div className="font-medium text-gray-700 mb-2">Image unavailable</div>
                                <div className="text-xs text-gray-500 mb-3">
                                  {item.url.includes("firebasestorage.googleapis.com")
                                    ? "Firebase Storage access issue"
                                    : "Media loading failed"}
                                </div>
                                <div className="space-y-2">
                                  {retries < 3 && (
                                    <Button
                                      onClick={() => retryMediaLoad(item.id)}
                                      variant="outline"
                                      size="sm"
                                      className="text-xs"
                                    >
                                      <RefreshCw className="h-3 w-3 mr-1" />
                                      Retry ({retries}/3)
                                    </Button>
                                  )}
                                  <Button
                                    onClick={() => window.open(item.url, "_blank")}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Open Direct
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      ) : (
                        <div className="relative w-full aspect-[9/16]">
                          {loadState === "loading" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <div className="text-center">
                                <RefreshCw className="h-6 w-6 animate-spin text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Loading video...</p>
                              </div>
                            </div>
                          )}

                          <video
                            data-media-id={item.id}
                            src={processedUrl}
                            className={`w-full h-full object-cover transition-opacity duration-300 ${
                              loadState === "loaded" ? "opacity-100" : "opacity-0"
                            }`}
                            controls
                            preload="metadata"
                            crossOrigin="anonymous"
                            onClick={(e) => {
                              const video = e.target as HTMLVideoElement
                              if (video.paused) {
                                video.play()
                              } else {
                                video.pause()
                              }
                            }}
                            onError={() => handleMediaError(item.id, item.url)}
                            onLoadStart={() => console.log("[v0] Video loading started:", item.url)}
                            onCanPlay={() => handleMediaLoad(item.id, item.url)}
                          />

                          {loadState === "error" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <div className="text-center p-4">
                                <div className="mb-3 text-3xl">🎥</div>
                                <div className="font-medium text-gray-700 mb-2">Video unavailable</div>
                                <div className="text-xs text-gray-500 mb-3">
                                  {item.url.includes("firebasestorage.googleapis.com")
                                    ? "Firebase Storage access issue"
                                    : "Video loading failed"}
                                </div>
                                <div className="space-y-2">
                                  {retries < 3 && (
                                    <Button
                                      onClick={() => retryMediaLoad(item.id)}
                                      variant="outline"
                                      size="sm"
                                      className="text-xs"
                                    >
                                      <RefreshCw className="h-3 w-3 mr-1" />
                                      Retry ({retries}/3)
                                    </Button>
                                  )}
                                  <Button
                                    onClick={() => window.open(item.url, "_blank")}
                                    variant="outline"
                                    size="sm"
                                    className="text-xs"
                                  >
                                    <ExternalLink className="h-3 w-3 mr-1" />
                                    Open Direct
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      )}

                      <div className="p-4">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {item.subheading || `${actualType === "image" ? "Image" : "Video"} ${item.id}`}
                        </h3>
                        <p className="text-sm text-gray-600 mb-3">
                          {item.alt || `Portfolio ${actualType} for ${study.title}`}
                        </p>
                        <div className="flex justify-between items-center text-xs text-gray-500">
                          <span>Type: {actualType}</span>
                          <span>Status: {loadState}</span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🔧 Firebase Storage Configuration</h3>
                <p className="text-blue-700 text-sm mb-3">
                  Media now uses fresh Firebase Storage URLs resolved from paths for better reliability.
                </p>
                <div className="bg-blue-100 p-4 rounded text-xs font-mono text-blue-800 mb-4">
                  <div className="mb-3 font-bold">CORS Configuration:</div>
                  <div className="mb-2">Your cors.json should include:</div>
                  <div className="bg-white p-2 rounded mb-2 text-black">
                    {`[{
    "origin": ["https://www.stuph.co", "https://stuph.co", "http://localhost:3000"],
    "method": ["GET", "HEAD", "OPTIONS"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type", "Access-Control-Allow-Origin", "Authorization"]
  }]`}
                  </div>
                  <div className="mb-2">Apply with:</div>
                  <div className="bg-white p-2 rounded text-black">
                    gsutil cors set cors.json gs://stuph-studio.firebasestorage.app
                  </div>
                </div>
                <div className="text-blue-600 text-xs mb-2">
                  <strong>New Approach:</strong> Media URLs are now resolved fresh from Firebase Storage paths on each
                  page load, eliminating token expiration issues.
                </div>
                <div className="text-blue-600 text-xs">
                  <strong>Troubleshooting:</strong> Use the "Open Direct" button to test if Firebase URLs work in a new
                  tab. If they work directly but not embedded, it's a CORS issue.
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ITC Right Shift specific sections */}
        {study.slug === "itc-right-shift" && (
          <>
            <section className="animate-fade-in-up animate-delay-600">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Social</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Our innovative social media campaign for ITC Right Shift featured creative toy package-style personas
                representing different lifestyle segments. This unique approach made healthy eating relatable and
                engaging across diverse demographics, from fitness enthusiasts to busy professionals.
              </p>

              {/* Social Media Videos with Enhanced Error Handling */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Social Media Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {[
                    {
                      id: "social-video-1",
                      src: "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/ITC%20Social%2F50%20Strong%20Series.MP4?alt=media&token=33f98570-377c-47d1-bf76-9f3e1f2c3da1",
                      title: "50 Strong Series",
                    },
                    {
                      id: "social-video-2",
                      src: "https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/ITC%20Social%2FTrend%20-%20RS_Thumka.mp4?alt=media&token=4d7a96ff-5b5c-4799-8d1c-137c4c23cc51",
                      title: "Trend - RS Thumka",
                    },
                  ].map((video) => (
                    <div
                      key={video.id}
                      className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                    >
                      <div className="relative w-full aspect-[9/16]">
                        <video
                          src={processFirebaseUrl(video.src)}
                          playsInline
                          preload="metadata"
                          controls
                          loop
                          muted
                          crossOrigin="anonymous"
                          className="w-full h-full object-cover"
                          aria-label={`ITC Right Shift ${video.title}`}
                          onError={(e) => {
                            console.error("[v0] Firebase video failed to load:", video.src)
                            const fallback = e.currentTarget.parentElement?.querySelector(".video-error-fallback")
                            if (fallback) {
                              fallback.classList.remove("hidden")
                              e.currentTarget.style.display = "none"
                            }
                          }}
                          onLoadStart={() => {
                            console.log("[v0] Firebase video loading:", video.src)
                          }}
                        >
                          Your browser does not support the video tag.
                        </video>
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm hidden video-error-fallback">
                          <div className="text-center p-4">
                            <div className="mb-3 text-3xl">🎥</div>
                            <div className="font-medium text-gray-700 mb-2">{video.title}</div>
                            <div className="text-xs text-gray-500 mb-3">Firebase video unavailable</div>
                            <Button
                              onClick={() => window.open(video.src, "_blank")}
                              variant="outline"
                              size="sm"
                              className="text-xs"
                            >
                              <ExternalLink className="h-3 w-3 mr-1" />
                              Open Direct Link
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Social Section */}
            <section className="animate-fade-in-up animate-delay-600">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Social</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Our innovative social media campaign for ITC Right Shift featured creative toy package-style personas
                representing different lifestyle segments. This unique approach made healthy eating relatable and
                engaging across diverse demographics, from fitness enthusiasts to busy professionals.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/images/itc-social-sporty-grandad.jpeg"
                    alt="Sporty Grandad - ITC Right Shift Social Campaign"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">Sporty Grandad</h3>
                    <p className="text-sm text-gray-600 mt-1">Active seniors lifestyle persona</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/images/itc-social-on-the-go-mom.jpeg"
                    alt="On-The-Go Mom - ITC Right Shift Social Campaign"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">On-The-Go Mom</h3>
                    <p className="text-sm text-gray-600 mt-1">Busy professional mother persona</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/images/itc-social-sprinter-aunty.jpeg"
                    alt="Sprinter Aunty - ITC Right Shift Social Campaign"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">Sprinter Aunty</h3>
                    <p className="text-sm text-gray-600 mt-1">Fitness-focused middle-aged persona</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/images/itc-social-hiker-dad.jpeg"
                    alt="Hiker Dad - ITC Right Shift Social Campaign"
                    width={400}
                    height={500}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">Hiker Dad</h3>
                    <p className="text-sm text-gray-600 mt-1">Adventure-loving father persona</p>
                  </div>
                </div>

                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/images/itc-social-advice-anuradha.jpeg"
                    alt="Real Customer Story - Anuradha"
                    width={400}
                    height={400}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-800">Customer Stories</h3>
                    <p className="text-sm text-gray-600 mt-1">Real testimonials and advice</p>
                  </div>
                </div>
              </div>
              {/* Social Media Videos */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Social Media Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative w-full aspect-[9/16]">
                      <video
                        src="https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/ITC%20Social%2F50%20Strong%20Series.MP4?alt=media&token=33f98570-377c-47d1-bf76-9f3e1f2c3da1"
                        playsInline
                        preload="metadata"
                        controls
                        loop
                        muted
                        className="w-full h-full object-cover"
                        aria-label="ITC Right Shift Social Media Content 1"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative w-full aspect-[9/16]">
                      <video
                        src="https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/ITC%20Social%2FTrend%20-%20RS_Thumka.mp4?alt=media&token=4d7a96ff-5b5c-4799-8d1c-137c4c23cc51"
                        playsInline
                        preload="metadata"
                        controls
                        loop
                        muted
                        className="w-full h-full object-cover"
                        aria-label="ITC Right Shift Social Media Content 2"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* E-Commerce Section */}
            <section className="animate-fade-in-up animate-delay-900">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">E-Commerce</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Strategic e-commerce campaigns designed for major online platforms including Amazon, Flipkart, and
                direct-to-consumer channels. Our approach combines festival marketing, seasonal promotions, and
                platform-specific optimization to drive online sales and brand visibility.
              </p>

              {/* E-Commerce Videos */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">E-Commerce Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative w-full aspect-[9/16]">
                      <video
                        src="https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/ITC_E-COMMERCE%2FRS_SBV_ATTA_2025_May15.mp4?alt=media&token=58120bf8-07a7-4fd8-94b7-dcb1fb6c48fc"
                        playsInline
                        preload="metadata"
                        controls
                        loop
                        muted
                        className="w-full h-full object-cover"
                        aria-label="ITC Right Shift E-commerce Content 1"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>

                  <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <div className="relative w-full aspect-[9/16]">
                      <video
                        src="https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/ITC_E-COMMERCE%2FRS_PCA_Namkeen_9x16_June06%2010.36.10%E2%80%AFAM.mp4?alt=media&token=b2148ef1-a9e7-40b6-9ba6-3efd8828d94b"
                        playsInline
                        preload="metadata"
                        controls
                        loop
                        muted
                        className="w-full h-full object-cover"
                        aria-label="ITC Right Shift E-commerce Content 2"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>

              {/* Festival & Seasonal Campaigns */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Festival & Seasonal Campaigns</h3>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-ecommerce-holi-banner.png"
                      alt="Holi Festival E-commerce Campaign - Right Shift"
                      width={800}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Holi Festival Campaign</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        "Rang Barse, Junk Na Barse" - Creative festival campaign promoting healthy alternatives during
                        celebrations
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          Festival Marketing
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          15% OFF Promotion
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Multi-Product Display
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Marketplace Banners */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Marketplace Optimization</h3>
                <div className="grid grid-cols-1 lg:grid-cols-1 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-ecommerce-amazon-banner.png"
                      alt="Amazon Store Banner - Right Shift Multigrain Atta"
                      width={800}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Amazon Store Banner</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Platform-optimized banner highlighting key product benefits with visual strength metaphors
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                          Amazon Optimization
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          Product Focus
                        </span>
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                          Benefit Highlighting
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Packaging Section */}
            <section className="animate-fade-in-up animate-delay-800">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Packaging</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Comprehensive packaging design system for the entire ITC Right Shift product range. Each package
                features consistent branding with the distinctive "V" checkmark, vibrant color coding for different
                categories, and clear communication of health benefits and nutritional information.
              </p>

              {/* Breakfast Cereals & Oats */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Breakfast Cereals & Oats</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-spinach-oats.jpeg"
                      alt="Millet Masala Oats - Spinach and Corn"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Millet Masala Oats</h4>
                      <p className="text-sm text-gray-600 mt-1">Spinach and Corn</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-oats-plus.jpeg"
                      alt="Oats++ with Millets and Seeds"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Oats++</h4>
                      <p className="text-sm text-gray-600 mt-1">With Millets and Seeds</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-tangy-tomato-oats.jpeg"
                      alt="Millet Masala Oats - Tangy Tomato"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Millet Masala Oats</h4>
                      <p className="text-sm text-gray-600 mt-1">Tangy Tomato</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-millet-oatmeal.jpeg"
                      alt="Millet Oatmeal with Fruits, Nuts and Seeds"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Millet Oatmeal</h4>
                      <p className="text-sm text-gray-600 mt-1">With Fruits, Nuts and Seeds</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Flour & Atta */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Flour & Atta</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-multigrain-atta.jpeg"
                      alt="Multi grain+ Atta"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Multi grain+ Atta</h4>
                      <p className="text-sm text-gray-600 mt-1">With Soya, Chana and Oats</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-multi-millet-mix.jpeg"
                      alt="Multi-Millet Mix"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Multi-Millet Mix</h4>
                      <p className="text-sm text-gray-600 mt-1">With Jowar, Navane, Bajra, Ragi, Quinoa</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Snacks & Namkeen */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Snacks & Namkeen</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-navrattan-namkeen.jpeg"
                      alt="Navrattan Multigrain Mixture"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Navrattan Multigrain Mixture</h4>
                      <p className="text-sm text-gray-600 mt-1">With Chana, Masur & Oats</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-khatta-meetha.jpeg"
                      alt="Khatta Meetha Millets Chana Mixture"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Khatta Meetha Millets</h4>
                      <p className="text-sm text-gray-600 mt-1">Chana Mixture</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Cookies & Desserts */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Cookies & Desserts</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-jaggery-cookies.jpeg"
                      alt="Jaggery Oats Cookies"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Jaggery Oats Cookies</h4>
                      <p className="text-sm text-gray-600 mt-1">With Almond and Seeds</p>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/itc-packaging-kheer-mix.jpeg"
                      alt="Millet Oats Kheer Mix"
                      width={300}
                      height={300}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-4">
                      <h4 className="font-semibold text-gray-800">Millet Oats Kheer Mix</h4>
                      <p className="text-sm text-gray-600 mt-1">With Nuts, Dates and Raisins</p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}

        {/* Tify specific sections */}
        {study.slug === "tify" && (
          <>
            {/* Retail Branding Section */}
            <section className="animate-fade-in-up animate-delay-700">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Retail Branding</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Comprehensive retail branding strategy designed to establish Tify's presence across multiple touchpoints
                - from mobile marketing and trade shows to educational materials and product showcases. Our approach
                focused on creating memorable brand experiences that drive product trial and purchase intent.
              </p>

              {/* Mobile Marketing */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Mobile Marketing</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/tify-mobile-truck-mockup.jpeg"
                      alt="Tify Mobile Food Truck Marketing Campaign"
                      width={800}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Mobile Food Truck Campaign</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        "Tify in a Jiffy!" mobile marketing campaign featuring branded food trucks with QR code
                        integration for instant ordering and promotional offers
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                          Mobile Marketing
                        </span>
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          QR Code Integration
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          20% OFF Promotion
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/tify-mobile-marketing-panel.jpeg"
                      alt="Tify Mobile Marketing Side Panel Design"
                      width={800}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Mobile Marketing Panels</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        Eye-catching side panel designs for mobile marketing vehicles featuring energetic brand
                        messaging and product integration
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          Brand Energy
                        </span>
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">
                          Product Integration
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          Mobile Advertising
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Exhibition & Trade Shows */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Exhibition & Trade Shows</h3>
                <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <Image
                    src="/images/tify-exhibition-stall-mockup.jpeg"
                    alt="Tify Exhibition Stall Design - 36 sq.mtr"
                    width={1000}
                    height={600}
                    className="w-full h-auto object-cover"
                  />
                  <div className="p-6">
                    <h4 className="font-semibold text-gray-800 mb-2">Trade Show Stall Design</h4>
                    <p className="text-sm text-gray-600 mb-4">
                      Comprehensive 36 sq.mtr exhibition stall design featuring strategic product displays, interactive
                      chef demonstration area, and optimized customer flow for maximum engagement
                    </p>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div className="text-center">
                        <h5 className="font-semibold text-gray-700">Total Area</h5>
                        <p className="text-sm text-gray-600">36 sq.mtr</p>
                      </div>
                      <div className="text-center">
                        <h5 className="font-semibold text-gray-700">Chef Table</h5>
                        <p className="text-sm text-gray-600">2mtr x 2mtr</p>
                      </div>
                      <div className="text-center">
                        <h5 className="font-semibold text-gray-700">Display Area</h5>
                        <p className="text-sm text-gray-600">7 mtr frontage</p>
                      </div>
                      <div className="text-center">
                        <h5 className="font-semibold text-gray-700">Storage</h5>
                        <p className="text-sm text-gray-600">Multiple zones</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        Interactive Design
                      </span>
                      <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                        Chef Demonstrations
                      </span>
                      <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                        Product Sampling
                      </span>
                      <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                        Brand Experience
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Educational Materials */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Educational Materials</h3>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/tify-burger-education-poster.jpeg"
                      alt="Tify Burger Recipe Educational Poster"
                      width={600}
                      height={800}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Recipe Education Poster</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        "Make Your Burger, A Buh-Gahhh" - Creative educational poster showing how multiple Tify products
                        can enhance burger preparation with detailed ingredient breakdown
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                          Recipe Education
                        </span>
                        <span className="px-3 py-1 bg-yellow-100 text-yellow-700 text-xs rounded-full">
                          Product Usage
                        </span>
                        <span className="px-3 py-1 bg-red-100 text-red-700 text-xs rounded-full">Visual Learning</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <Image
                      src="/images/tify-product-showcase-banner.jpeg"
                      alt="Tify Product Range Showcase Banner"
                      width={800}
                      height={400}
                      className="w-full h-auto object-cover"
                    />
                    <div className="p-6">
                      <h4 className="font-semibold text-gray-800 mb-2">Product Showcase Banner</h4>
                      <p className="text-sm text-gray-600 mb-3">
                        "Fresh on the Block. Filled with Flavour!" - Comprehensive product range display showcasing the
                        complete Tify portfolio including pickles, sauces, and condiments
                      </p>
                      <div className="flex flex-wrap gap-2">
                        <span className="px-3 py-1 bg-orange-100 text-orange-700 text-xs rounded-full">
                          Product Portfolio
                        </span>
                        <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs rounded-full">
                          Brand Messaging
                        </span>
                        <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs rounded-full">
                          Visual Impact
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Packaging Section */}
            <section className="animate-fade-in-up animate-delay-800">
              <div className="flex items-center space-x-3 mb-8">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    />
                  </svg>
                </div>
                <h2 className="text-3xl font-bold text-black">Packaging</h2>
              </div>
              <p className="text-gray-700 leading-relaxed text-lg mb-8">
                Modern packaging design that positioned Tify as a premium clean-label food brand. Our design approach
                emphasized the natural, nutritious qualities while ensuring strong shelf appeal and easy product
                navigation across different SKUs.
              </p>

              {/* Product Showcase */}
              <div className="mb-12">
                {/* Sauces & Pastes */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Sauces & Pastes</h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src="/images/tify-pizza-pasta-sauce-packaging.jpeg"
                        alt="Tify Pizza Pasta Sauce - Front and Back Packaging"
                        width={400}
                        height={500}
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src="/images/tify-ginger-paste-front.jpeg"
                        alt="Tify Ginger Paste - Front Packaging"
                        width={400}
                        height={500}
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src="/images/tify-ginger-paste-back.jpeg"
                        alt="Tify Ginger Paste - Back Packaging with Nutritional Information"
                        width={400}
                        height={500}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>

                {/* Chutneys & Condiments */}
                <div className="mb-8">
                  <h4 className="text-lg font-semibold text-gray-700 mb-4">Chutneys & Condiments</h4>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src="/images/tify-desi-hari-chutney-promo.png"
                        alt="Tify Desi Hari Chutney - Dilli Style Promotional Design"
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                      />
                    </div>

                    <div className="bg-white rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                      <Image
                        src="/images/tify-tamarind-dates-chutney.png"
                        alt="Tify Tamarind & Dates Chutney - 100% Desi Imli Chutney"
                        width={800}
                        height={600}
                        className="w-full h-auto object-cover"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </section>
            {/* Social Media Videos */}
            <div className="mb-12">
              <h3 className="text-xl font-bold text-gray-800 mb-6">Social Media Videos</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative w-full aspect-[9/16]">
                    <video
                      src="https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/tiffy_social%2FA%20things%20indian%20moms%20say.mp4?alt=media&token=cc116fe2-915d-4fd4-a3da-cc14812ec164"
                      playsInline
                      preload="metadata"
                      controls
                      loop
                      muted
                      className="w-full h-full object-cover"
                      aria-label="Tify Social Media Content 1"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>

                <div className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <div className="relative w-full aspect-[9/16]">
                    <video
                      src="https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/tiffy_social%2FInfluencer%20Collab.mp4?alt=media&token=3df65395"
                      playsInline
                      preload="metadata"
                      controls
                      loop
                      muted
                      className="w-full h-full object-cover"
                      aria-label="Tify Social Media Content 2"
                    >
                      Your browser does not support the video tag.
                    </video>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Back to Portfolio Button */}
        <div className="mt-24 text-center animate-fade-in-up animate-delay-900">
          <Link
            href="/portfolio"
            className="inline-flex items-center text-gray-700 hover:text-purple-600 transition-colors duration-200"
          >
            <ArrowLeft className="h-5 w-5 mr-2" />
            Back to Portfolio
          </Link>
        </div>
      </div>
    </div>
  )
}
