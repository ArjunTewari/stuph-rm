"use client"

import { notFound } from "next/navigation"
import { caseStudies } from "@/lib/case-studies"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, ExternalLink, FileText } from "lucide-react"
import { use, useEffect, useState } from "react"
import Image from "next/image"
import { getPortfolioMedia, type MediaItem } from "@/lib/portfolio-media"

function getMediaType(item: MediaItem): MediaItem["type"] {
  if (item.type === "pdf" || /\.pdf(?:$|[?#])/i.test(item.url)) {
    return "pdf"
  }

  return item.type
}

function getMediaLabel(item: MediaItem): string {
  if (item.title) return item.title

  try {
    const objectPath = new URL(item.url).pathname.split("/o/").pop()
    const fileName = decodeURIComponent(objectPath || "").split("/").pop()
    return fileName || "Portfolio document"
  } catch {
    return "Portfolio document"
  }
}

export default function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params)
  const study = caseStudies.find((s) => s.slug === slug)
  const [uploadedMedia, setUploadedMedia] = useState<MediaItem[]>([])
  const [isLoadingMedia, setIsLoadingMedia] = useState(true)

  useEffect(() => {
    window.scrollTo(0, 0)

    const loadMedia = async () => {
      try {
        console.log("[v0] Loading media for portfolio:", slug)
        const media = await getPortfolioMedia(slug)
        console.log("[v0] Loaded media items:", media.length)
        setUploadedMedia(media)
      } catch (error) {
        console.error("[v0] Error loading media:", error)
        setUploadedMedia([])
      } finally {
        setIsLoadingMedia(false)
      }
    }

    loadMedia()
  }, [slug])

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
        {study.problem && (
          <section className="animate-fade-in-up animate-delay-300">
            <h2 className="text-3xl font-bold text-black mb-6">The Problem</h2>
            <p className="text-gray-700 leading-relaxed text-lg">{study.problem}</p>
          </section>
        )}

        {/* Our Role */}
        {study.role && study.role.length > 0 && (
          <section className="animate-fade-in-up animate-delay-400">
            <h2 className="text-3xl font-bold text-black mb-8">Our Role</h2>
            <div className="space-y-4">
              {study.role.map((item, index) => (
                <div key={index} className="flex items-start space-x-4">
                  <CheckCircle className="h-6 w-6 text-purple-600 mt-1 flex-shrink-0" />
                  <p className="text-gray-700 leading-relaxed text-lg">{item}</p>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* The Outcome */}
        {study.outcome && study.outcome.length > 0 && (
          <section className="animate-fade-in-up animate-delay-500">
            <h2 className="text-3xl font-bold text-black mb-8">The Outcome</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {study.outcome.map((item, index) => (
                <Card key={index} className="bg-gray-50 border-gray-200 hover-lift">
                  <CardContent className="p-6">
                    <p className="text-gray-800 font-medium text-lg">{item}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}

        {slug === "humpy-farms" && (
          <section className="animate-fade-in-up animate-delay-550 -mx-4 sm:-mx-6 lg:-mx-8">
            <div className="w-full">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Humpy%20repackaging-er3vX2VuHErvQL3RsKDHukzgXWmPkX.png"
                alt="Humpy Farms Product Showcase - Complete organic product line with repackaging"
                width={1600}
                height={800}
                className="w-full h-auto object-cover"
                priority
              />
            </div>
          </section>
        )}

        {(uploadedMedia.length > 0 || isLoadingMedia) && (
          <section className="animate-fade-in-up animate-delay-600">
            <h2 className="text-3xl font-bold text-black mb-8">Portfolio Media</h2>
            {isLoadingMedia ? (
              <div className="text-center py-8">
                <p className="text-gray-600">Loading media...</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {uploadedMedia.map((item) => {
                  const mediaType = getMediaType(item)
                  const mediaLabel = getMediaLabel(item)

                  return (
                    <div
                      key={item.id}
                      className={`bg-white rounded-lg shadow-lg overflow-hidden ${
                        mediaType === "pdf" ? "md:col-span-2 lg:col-span-3" : ""
                      }`}
                    >
                      {mediaType === "pdf" ? (
                        <div>
                          <div className="flex items-center justify-between gap-4 border-b border-gray-200 px-4 py-3">
                            <div className="flex min-w-0 items-center gap-2">
                              <FileText className="h-5 w-5 flex-shrink-0 text-purple-600" />
                              <span className="truncate font-medium text-gray-900">{mediaLabel}</span>
                            </div>
                            <a
                              href={item.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex flex-shrink-0 items-center gap-2 text-sm font-medium text-purple-600 hover:text-purple-800"
                            >
                              Open PDF
                              <ExternalLink className="h-4 w-4" />
                            </a>
                          </div>
                          <iframe
                            src={`${item.url}#view=FitH`}
                            title={mediaLabel}
                            loading="lazy"
                            className="h-[70vh] min-h-[520px] w-full bg-gray-100"
                          />
                        </div>
                      ) : (
                        <div
                          className={`relative ${
                            mediaType === "image" ? "flex items-center justify-center" : "aspect-[9/16]"
                          }`}
                        >
                          {mediaType === "image" ? (
                        <Image
                          src={item.url || "/placeholder.svg"}
                          alt={mediaLabel}
                          width={400}
                          height={400}
                          className="w-full h-auto object-contain rounded-t-lg max-h-96"
                          style={{ aspectRatio: "auto" }}
                        />
                          ) : (
                            <video
                              src={item.url}
                              title={mediaLabel}
                              autoPlay
                              muted
                              loop
                              playsInline
                              controls
                              className="w-full h-full object-cover"
                            />
                          )}
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </section>
        )}
      </div>
    </div>
  )
}
