"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, ImageIcon, Video, Trash2, ExternalLink } from "lucide-react"
import { caseStudies } from "@/lib/case-studies"

interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  title: string
  description: string
  portfolioSlug: string
  timestamp: number
}

export default function PortfolioMediaPage() {
  const [selectedPortfolio, setSelectedPortfolio] = useState("all")
  const [mediaType, setMediaType] = useState<"image" | "video">("image")
  const [mediaUrl, setMediaUrl] = useState("")
  const [mediaTitle, setMediaTitle] = useState("")
  const [mediaDescription, setMediaDescription] = useState("")
  const [existingMedia, setExistingMedia] = useState<MediaItem[]>([])
  const [isUploading, setIsUploading] = useState(false)

  // Load existing media from Firebase Storage URLs
  useEffect(() => {
    loadExistingMedia()
  }, [])

  const loadExistingMedia = () => {
    try {
      const stored = localStorage.getItem("firebase-portfolio-media")
      if (stored) {
        const media = JSON.parse(stored) as MediaItem[]
        setExistingMedia(media)
      }
    } catch (error) {
      console.error("Error loading media:", error)
    }
  }

  const saveMedia = () => {
    if (!selectedPortfolio || !mediaUrl || !mediaTitle) {
      alert("Please fill in all required fields")
      return
    }

    setIsUploading(true)

    // Validate Firebase Storage URL
    if (!mediaUrl.includes("firebasestorage.googleapis.com")) {
      alert("Please use a valid Firebase Storage URL")
      setIsUploading(false)
      return
    }

    const newMedia: MediaItem = {
      id: Date.now().toString(),
      type: mediaType,
      url: mediaUrl,
      title: mediaTitle,
      description: mediaDescription,
      portfolioSlug: selectedPortfolio,
      timestamp: Date.now(),
    }

    try {
      const updatedMedia = [...existingMedia, newMedia]
      localStorage.setItem("firebase-portfolio-media", JSON.stringify(updatedMedia))
      setExistingMedia(updatedMedia)

      // Reset form
      setMediaUrl("")
      setMediaTitle("")
      setMediaDescription("")

      alert("Media uploaded successfully!")
    } catch (error) {
      console.error("Error saving media:", error)
      alert("Error saving media")
    } finally {
      setIsUploading(false)
    }
  }

  const deleteMedia = (id: string) => {
    if (confirm("Are you sure you want to delete this media item?")) {
      const updatedMedia = existingMedia.filter((item) => item.id !== id)
      localStorage.setItem("firebase-portfolio-media", JSON.stringify(updatedMedia))
      setExistingMedia(updatedMedia)
    }
  }

  const portfolioMedia = existingMedia.filter((item) =>
    selectedPortfolio && selectedPortfolio !== "all" ? item.portfolioSlug === selectedPortfolio : true,
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Media Manager</h1>
          <p className="text-gray-600">Upload and manage media content for portfolio pages using Firebase Storage</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload New Media</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="portfolio">Portfolio *</Label>
                <Select value={selectedPortfolio} onValueChange={setSelectedPortfolio}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a portfolio" />
                  </SelectTrigger>
                  <SelectContent>
                    {caseStudies.map((study) => (
                      <SelectItem key={study.slug} value={study.slug}>
                        {study.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mediaType">Media Type *</Label>
                <Select value={mediaType} onValueChange={(value: "image" | "video") => setMediaType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="image">Image</SelectItem>
                    <SelectItem value="video">Video</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="mediaUrl">Firebase Storage URL *</Label>
                <Input
                  id="mediaUrl"
                  value={mediaUrl}
                  onChange={(e) => setMediaUrl(e.target.value)}
                  placeholder="https://firebasestorage.googleapis.com/..."
                  className="font-mono text-sm"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Must be a valid Firebase Storage URL with proper CORS configuration
                </p>
              </div>

              <div>
                <Label htmlFor="mediaTitle">Title *</Label>
                <Input
                  id="mediaTitle"
                  value={mediaTitle}
                  onChange={(e) => setMediaTitle(e.target.value)}
                  placeholder="Enter media title"
                />
              </div>

              <div>
                <Label htmlFor="mediaDescription">Description</Label>
                <Textarea
                  id="mediaDescription"
                  value={mediaDescription}
                  onChange={(e) => setMediaDescription(e.target.value)}
                  placeholder="Optional description"
                  rows={3}
                />
              </div>

              <Button onClick={saveMedia} disabled={isUploading} className="w-full">
                {isUploading ? "Uploading..." : "Upload Media"}
              </Button>
            </CardContent>
          </Card>

          {/* Media Management */}
          <Card>
            <CardHeader>
              <CardTitle>Existing Media</CardTitle>
              <div className="flex items-center space-x-2">
                <Select value={selectedPortfolio} onValueChange={setSelectedPortfolio}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by portfolio" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Portfolios</SelectItem>
                    {caseStudies.map((study) => (
                      <SelectItem key={study.slug} value={study.slug}>
                        {study.title}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Badge variant="secondary">{portfolioMedia.length} items</Badge>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {portfolioMedia.length === 0 ? (
                  <p className="text-gray-500 text-center py-8">No media items found</p>
                ) : (
                  portfolioMedia.map((item) => (
                    <div key={item.id} className="flex items-start space-x-3 p-3 border rounded-lg">
                      <div className="flex-shrink-0">
                        {item.type === "image" ? (
                          <ImageIcon className="h-5 w-5 text-blue-500" />
                        ) : (
                          <Video className="h-5 w-5 text-green-500" />
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-sm">{item.title}</p>
                        <p className="text-xs text-gray-500 truncate">{item.url}</p>
                        {item.description && <p className="text-xs text-gray-600 mt-1">{item.description}</p>}
                        <div className="flex items-center space-x-2 mt-2">
                          <Badge variant="outline" className="text-xs">
                            {caseStudies.find((s) => s.slug === item.portfolioSlug)?.title || item.portfolioSlug}
                          </Badge>
                          <Badge variant="secondary" className="text-xs">
                            {item.type}
                          </Badge>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" onClick={() => window.open(item.url, "_blank")}>
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => deleteMedia(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Firebase Configuration Guide */}
        <Card className="mt-8 border-orange-200 bg-orange-50">
          <CardHeader>
            <CardTitle className="text-orange-800">Firebase Storage Configuration</CardTitle>
          </CardHeader>
          <CardContent className="text-orange-700">
            <p className="mb-4">
              To ensure media works in both preview and production, configure Firebase Storage CORS:
            </p>
            <div className="bg-orange-100 p-4 rounded-lg font-mono text-sm mb-4">
              <p className="mb-2">1. Create cors.json:</p>
              <code className="block bg-white p-2 rounded">
                {`[
  {
    "origin": ["https://www.stuph.co", "https://preview-*.vercel.app"],
    "method": ["GET"],
    "maxAgeSeconds": 3600,
    "responseHeader": ["Content-Type"]
  }
]`}
              </code>
              <p className="mt-2 mb-2">2. Apply CORS configuration:</p>
              <code className="block bg-white p-2 rounded">
                gsutil cors set cors.json gs://stuph-studio.firebasestorage.app
              </code>
            </div>
            <p className="text-sm">
              This ensures your Firebase Storage media will load properly in both development and production
              environments.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
