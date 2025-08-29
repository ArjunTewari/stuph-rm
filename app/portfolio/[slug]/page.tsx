"use client"

import { notFound } from "next/navigation"
import { caseStudies } from "@/lib/case-studies"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"
import { useEffect } from "react"
import Image from "next/image"
import { getPortfolioMedia } from "@/lib/portfolio-media"

interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  title: string
  description: string
  portfolioSlug: string
  timestamp: number
}

export default function CaseStudyPage({ params }: { params: { slug: string } }) {
  const study = caseStudies.find((s) => s.slug === params.slug)
  const uploadedMedia = getPortfolioMedia(params.slug)

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [])

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

        {params.slug === "humpy-farms" && (
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

        {uploadedMedia.length > 0 && (
          <section className="animate-fade-in-up animate-delay-600">
            <h2 className="text-3xl font-bold text-black mb-8">Portfolio Media</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {uploadedMedia.map((item) => (
                <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden">
                  <div
                    className={`relative ${item.type === "image" ? "flex items-center justify-center" : "aspect-[9/16]"}`}
                  >
                    {item.type === "image" ? (
                      <Image
                        src={item.url || "/placeholder.svg"}
                        alt={item.title}
                        width={400}
                        height={400}
                        className="w-full h-auto object-contain rounded-t-lg max-h-96"
                        style={{ aspectRatio: "auto" }}
                      />
                    ) : (
                      <video src={item.url} autoPlay muted loop playsInline className="w-full h-full object-cover" />
                    )}
                  </div>
                  {(item.title || item.description) && (
                    <div className="p-4">
                      {item.title && <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>}
                      {item.description && <p className="text-sm text-gray-600">{item.description}</p>}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  )
}
