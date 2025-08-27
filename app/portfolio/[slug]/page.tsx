"use client"

import { notFound } from "next/navigation"
import { useParams } from "next/navigation"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { caseStudies } from "@/lib/case-studies"
import { getStorage, ref, getDownloadURL } from "firebase/storage"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ExternalLink, RefreshCw } from "lucide-react"
import Image from "next/image"

interface StoredMediaItem {
  id: string
  type: "image" | "video"
  url: string
  subheading: string
  alt?: string
  portfolioSlug: string
  timestamp: number
  path?: string // Added optional path for Firebase Storage
}

interface MediaLoadState {
  [key: string]: "loading" | "loaded" | "error"
}

export default function CaseStudyPage() {
  const params = useParams()
  const study = caseStudies.find((s) => s.slug === params.slug)
  const [uploadedMedia, setUploadedMedia] = useState<StoredMediaItem[]>([])
  const [mediaLoadState, setMediaLoadState] = useState<MediaLoadState>({})
  const [retryCount, setRetryCount] = useState<{ [key: string]: number }>({})
  const [socialVideos, setSocialVideos] = useState<
    {
      id: string
      path: string
      title: string
      videoUrl: string
      videoLoadState: "loading" | "loaded" | "error"
    }[]
  >([])

  useEffect(() => {
    console.log("[v0] Loading portfolio media for slug:", params.slug)
    console.log("[v0] Current domain:", window.location.hostname)
    console.log("[v0] Current protocol:", window.location.protocol)

    const resolveUrls = async () => {
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
        const withFreshUrls = await Promise.all(
          portfolioMedia.map(async (item) => {
            // If we have a path, get fresh URL; otherwise keep existing URL
            if (item.path) {
              const storageRef = ref(storage, item.path)
              try {
                const freshUrl = await getDownloadURL(storageRef)
                console.log("[v0] Resolved fresh URL for", item.path, ":", freshUrl)
                return { ...item, url: freshUrl }
              } catch (error) {
                console.error("[v0] getDownloadURL failed for", item.path, error)
                return item // keep whatever URL we had
              }
            }
            return item
          }),
        )

        setUploadedMedia(withFreshUrls)

        // Initialize media load states
        const initialLoadState: MediaLoadState = {}
        withFreshUrls.forEach((item) => {
          initialLoadState[item.id] = "loading"
        })
        setMediaLoadState(initialLoadState)
      } catch (error) {
        console.error("[v0] Error loading media from localStorage:", error)
      }
    }

    resolveUrls()
  }, [params.slug])

  useEffect(() => {
    if (study?.slug === "itc-right-shift") {
      const initialVideos = [
        {
          id: "social-video-1",
          path: "ITC Social/50 Strong Series.MP4",
          title: "50 Strong Series",
          videoUrl: "",
          videoLoadState: "loading" as "loading" | "loaded" | "error",
        },
        {
          id: "social-video-2",
          path: "ITC Social/Trend - RS_Thumka.mp4",
          title: "Trend - RS Thumka",
          videoUrl: "",
          videoLoadState: "loading" as "loading" | "loaded" | "error",
        },
      ]

      const resolveVideoUrls = async () => {
        const storage = getStorage()
        const updatedVideos = await Promise.all(
          initialVideos.map(async (video) => {
            try {
              const videoRef = ref(storage, video.path)
              const url = await getDownloadURL(videoRef)
              console.log("[v0] Resolved video URL for", video.path, ":", url)
              return { ...video, videoUrl: url, videoLoadState: "loaded" as "loading" | "loaded" | "error" }
            } catch (error) {
              console.error("[v0] Failed to resolve video URL for", video.path, error)
              return { ...video, videoLoadState: "error" as "loading" | "loaded" | "error" }
            }
          }),
        )
        setSocialVideos(updatedVideos)
      }

      resolveVideoUrls()
    }
  }, [study?.slug])

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

      // Force reload by adding timestamp
      setTimeout(() => {
        const mediaElement = document.querySelector(`[data-media-id="${mediaId}"]`) as
          | HTMLImageElement
          | HTMLVideoElement
        if (mediaElement) {
          const originalSrc = mediaElement.src.split("&_retry=")[0]
          mediaElement.src = `${originalSrc}&_retry=${Date.now()}`
        }
      }, 100)
    }
  }

  const processFirebaseUrl = (url: string): string => {
    if (!url.includes("firebasestorage.googleapis.com")) {
      return url
    }

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
                  const processedUrl = processFirebaseUrl(item.url)
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
                                    className="text-xs ml-2"
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
                        <div className="relative w-full aspect-[9/16] cursor-pointer group">
                          {loadState === "loading" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 z-10">
                              <div className="text-center">
                                <RefreshCw className="h-6 w-6 animate-spin text-gray-400 mx-auto mb-2" />
                                <p className="text-sm text-gray-500">Loading video...</p>
                              </div>
                            </div>
                          )}

                          <video
                            data-media-id={item.id}
                            src={processedUrl}
                            playsInline
                            preload="metadata"
                            loop
                            muted
                            crossOrigin="anonymous"
                            className={`w-full h-full object-cover rounded-lg transition-opacity duration-300 ${
                              loadState === "loaded" ? "opacity-100" : "opacity-0"
                            }`}
                            onClick={(e) => {
                              if (loadState === "loaded") {
                                const video = e.currentTarget
                                if (video.paused) {
                                  video.play()
                                } else {
                                  video.pause()
                                }
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
                                    className="text-xs ml-2"
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

                      {item.subheading && (
                        <div className="p-4">
                          <p className="text-gray-800 font-medium text-sm">{item.subheading}</p>
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-8 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                <h3 className="font-semibold text-blue-800 mb-2">🔧 Firebase Storage Configuration</h3>
                <p className="text-blue-700 text-sm mb-3">
                  If media fails to load, verify your Firebase Storage CORS configuration matches your production
                  domain.
                </p>
                <div className="bg-blue-100 p-4 rounded text-xs font-mono text-blue-800 mb-4">
                  <div className="mb-3 font-bold">Current CORS Configuration Check:</div>
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
                  <strong>Troubleshooting:</strong> Use the "Open Direct" button to test if Firebase URLs work in a new
                  tab. If they work directly but not embedded, it's a CORS issue.
                </div>
                <div className="text-blue-600 text-xs">
                  <strong>Alternative:</strong> Consider migrating to Vercel Blob storage for better integration with
                  your deployment.
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

              {/* Social Media Videos Section */}
              <div className="mb-12">
                <h3 className="text-xl font-bold text-gray-800 mb-6">Social Media Videos</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                  {socialVideos.map((video) => {
                    const processedVideoUrl = processFirebaseUrl(video.videoUrl)
                    return (
                      <div
                        key={video.id}
                        className="bg-gray-100 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300"
                      >
                        <div className="relative w-full aspect-[9/16]">
                          {video.videoLoadState === "loading" && !video.videoUrl && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-200">
                              <div className="text-gray-500">Loading video...</div>
                            </div>
                          )}
                          {video.videoLoadState === "error" && (
                            <div className="absolute inset-0 flex items-center justify-center bg-red-50">
                              <div className="text-red-500 text-center p-4">
                                <div className="mb-2">Failed to load video</div>
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => {
                                    // Retry logic would go here
                                  }}
                                >
                                  Retry
                                </Button>
                              </div>
                            </div>
                          )}
                          {video.videoUrl && (
                            <video
                              src={processedVideoUrl}
                              controls
                              className="w-full h-full object-cover"
                              onLoadStart={() =>
                                setSocialVideos((prev) =>
                                  prev.map((v) => (v.id === video.id ? { ...v, videoLoadState: "loading" } : v)),
                                )
                              }
                              onCanPlay={() =>
                                setSocialVideos((prev) =>
                                  prev.map((v) => (v.id === video.id ? { ...v, videoLoadState: "loaded" } : v)),
                                )
                              }
                              onError={() =>
                                setSocialVideos((prev) =>
                                  prev.map((v) => (v.id === video.id ? { ...v, videoLoadState: "error" } : v)),
                                )
                              }
                            >
                              Your browser does not support the video tag.
                            </video>
                          )}
                        </div>
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-800">{video.title}</h4>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>

              {/* Social Section */}
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
                        src="https://firebasestorage.googleapis.com/v0/b/stuph-studio.firebasestorage.app/o/ITC_E-COMMERCE%2FRS_SBV_ATTA_2025_May15.mp4?alt=media&token=58120bf8-07a7-4fd0-a1b2-c3d4e5f67890"
                        controls
                        className="w-full h-full object-cover"
                      >
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </div>
  )
}
