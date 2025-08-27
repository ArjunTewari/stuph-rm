"use client"

import { useState, useEffect } from "react"
import { notFound } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ExternalLink, RefreshCw } from "lucide-react"
import { caseStudies } from "@/lib/case-studies"

interface StoredMediaItem {
  id: string
  type: "image" | "video"
  url: string
  subheading: string
  alt?: string
  portfolioSlug: string
  timestamp: number
  path?: string
}

type MediaLoadState = {
  [key: string]: "loading" | "loaded" | "error"
}

export default function PortfolioDetailPage({ params }: { params: { slug: string } }) {
  const [uploadedMedia, setUploadedMedia] = useState<StoredMediaItem[]>([])
  const [mediaLoadState, setMediaLoadState] = useState<MediaLoadState>({})
  const [retryCount, setRetryCount] = useState<{ [key: string]: number }>({})

  const study = caseStudies.find((s) => s.slug === params.slug)

  if (!study) {
    notFound()
  }

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

        setUploadedMedia(portfolioMedia)

        // Initialize media load states
        const initialLoadState: MediaLoadState = {}
        portfolioMedia.forEach((item) => {
          initialLoadState[item.id] = "loading"
        })
        setMediaLoadState(initialLoadState)
      } catch (error) {
        console.error("[v0] Error loading media from localStorage:", error)
      }
    }

    loadPortfolioMedia()
  }, [params.slug])

  const handleMediaLoad = (mediaId: string, url: string) => {
    console.log("[v0] Media loaded successfully:", mediaId, url)
    setMediaLoadState((prev) => ({ ...prev, [mediaId]: "loaded" }))
  }

  const handleMediaError = (mediaId: string, url: string) => {
    console.error("[v0] Media failed to load:", mediaId, url)
    setMediaLoadState((prev) => ({ ...prev, [mediaId]: "error" }))
  }

  const retryMediaLoad = (mediaId: string) => {
    console.log("[v0] Retrying media load for:", mediaId)
    setRetryCount((prev) => ({ ...prev, [mediaId]: (prev[mediaId] || 0) + 1 }))
    setMediaLoadState((prev) => ({ ...prev, [mediaId]: "loading" }))

    // Force reload by updating the image src
    const mediaElement = document.querySelector(`[data-media-id="${mediaId}"]`) as HTMLImageElement | HTMLVideoElement
    if (mediaElement) {
      const originalSrc = mediaElement.src
      mediaElement.src = ""
      setTimeout(() => {
        mediaElement.src = originalSrc
      }, 100)
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link href="/portfolio" className="inline-flex items-center text-gray-600 hover:text-black mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Portfolio
          </Link>
          <div className="flex items-center space-x-4 mb-6">
            <Badge variant="secondary" className="text-sm">
              {study.category}
            </Badge>
            <span className="text-gray-500">•</span>
            <span className="text-gray-600">{study.year}</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-black mb-4">{study.title}</h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">{study.description}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Challenge Section */}
        <section className="mb-16 animate-fade-in-up">
          <h2 className="text-3xl font-bold text-black mb-6">The Challenge</h2>
          <p className="text-gray-700 leading-relaxed text-lg">{study.challenge}</p>
        </section>

        {/* Solution Section */}
        <section className="mb-16 animate-fade-in-up animate-delay-200">
          <h2 className="text-3xl font-bold text-black mb-6">Our Solution</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8">{study.solution}</p>

          {/* Key Features */}
          {study.keyFeatures && study.keyFeatures.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {study.keyFeatures.map((feature, index) => (
                <Card key={index} className="bg-gray-50 border-gray-200">
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-black mb-2">{feature.title}</h3>
                    <p className="text-gray-600">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </section>

        {/* Results Section */}
        <section className="mb-16 animate-fade-in-up animate-delay-400">
          <h2 className="text-3xl font-bold text-black mb-6">Results</h2>
          <p className="text-gray-700 leading-relaxed text-lg mb-8">{study.results}</p>

          {/* Metrics */}
          {study.metrics && study.metrics.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {study.metrics.map((metric, index) => (
                <Card key={index} className="bg-black text-white">
                  <CardContent className="p-6 text-center">
                    <div className="text-3xl font-bold mb-2">{metric.value}</div>
                    <div className="text-gray-300">{metric.label}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
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
            </div>
          </section>
        )}

        {/* Technologies Used */}
        {study.technologies && study.technologies.length > 0 && (
          <section className="mb-16 animate-fade-in-up animate-delay-600">
            <h2 className="text-3xl font-bold text-black mb-6">Technologies Used</h2>
            <div className="flex flex-wrap gap-3">
              {study.technologies.map((tech, index) => (
                <Badge key={index} variant="outline" className="text-sm py-2 px-4">
                  {tech}
                </Badge>
              ))}
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="text-center py-16 animate-fade-in-up animate-delay-800">
          <h2 className="text-3xl font-bold text-black mb-6">Ready to Start Your Project?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Let's create something amazing together. Get in touch to discuss your next project.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button className="btn-primary">
                Start Your Project
                <ArrowLeft className="ml-2 h-4 w-4 rotate-180" />
              </Button>
            </Link>
            <Link href="/portfolio">
              <Button variant="outline" className="border-gray-300 text-gray-700 hover:bg-gray-50 bg-transparent">
                View More Work
              </Button>
            </Link>
          </div>
        </section>
      </div>
    </div>
  )
}
