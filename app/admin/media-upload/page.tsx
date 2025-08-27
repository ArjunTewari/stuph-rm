"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, ImageIcon, Video, Trash2, ExternalLink, Plus, Minus } from "lucide-react"
import { caseStudies } from "@/lib/case-studies"
import { getAllPortfolioMedia } from "@/lib/portfolio-media"

interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  portfolioSlug: string
  timestamp: number
}

interface MediaUpload {
  id: string
  type: "image" | "video"
  url: string
}

export default function PortfolioMediaPage() {
  const [selectedPortfolio, setSelectedPortfolio] = useState("")
  const [mediaUploads, setMediaUploads] = useState<MediaUpload[]>([{ id: "1", type: "image", url: "" }])
  const [existingMedia, setExistingMedia] = useState<MediaItem[]>([])
  const [isUploading, setIsUploading] = useState(false)
  const [uploadStatus, setUploadStatus] = useState<string>("")

  // Load existing media from JSON file instead of localStorage
  useEffect(() => {
    const allMedia = getAllPortfolioMedia()
    const mediaArray: MediaItem[] = []
    Object.entries(allMedia).forEach(([slug, items]) => {
      mediaArray.push(...items)
    })
    setExistingMedia(mediaArray)
  }, [])

  const loadExistingMedia = () => {}

  const addMediaRow = () => {
    setMediaUploads([
      ...mediaUploads,
      {
        id: Date.now().toString(),
        type: "image",
        url: "",
      },
    ])
  }

  const removeMediaRow = (id: string) => {
    if (mediaUploads.length > 1) {
      setMediaUploads(mediaUploads.filter((upload) => upload.id !== id))
    }
  }

  const updateMediaUpload = (id: string, field: keyof MediaUpload, value: string) => {
    setMediaUploads(mediaUploads.map((upload) => (upload.id === id ? { ...upload, [field]: value } : upload)))
  }

  const saveMedia = async () => {
    if (!selectedPortfolio) {
      setUploadStatus("Please select a portfolio")
      return
    }

    const validUploads = mediaUploads.filter((upload) => upload.url.trim())
    if (validUploads.length === 0) {
      setUploadStatus("Please add at least one media URL")
      return
    }

    setIsUploading(true)
    setUploadStatus("Validating and uploading media...")

    try {
      // Validate all Firebase Storage URLs
      const invalidUrls = validUploads.filter((upload) => !upload.url.includes("firebasestorage.googleapis.com"))

      if (invalidUrls.length > 0) {
        setUploadStatus(`${invalidUrls.length} invalid Firebase Storage URLs found`)
        setIsUploading(false)
        return
      }

      // Create media items
      const newMediaItems = validUploads.map((upload) => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: upload.type,
        url: upload.url,
        portfolioSlug: selectedPortfolio,
        timestamp: Date.now(),
      }))

      const response = await fetch("/api/portfolio-media", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newMediaItems),
      })

      const result = await response.json()

      if (result.success) {
        setUploadStatus(`✅ Successfully uploaded ${result.addedItems} media items to ${selectedPortfolio} portfolio!`)

        // Reset form
        setMediaUploads([{ id: "1", type: "image", url: "" }])
        setSelectedPortfolio("")

        // Reload existing media to show new items
        const allMedia = getAllPortfolioMedia()
        const mediaArray: MediaItem[] = []
        Object.entries(allMedia).forEach(([slug, items]) => {
          mediaArray.push(...items)
        })
        setExistingMedia(mediaArray)
      } else {
        setUploadStatus(`❌ Error: ${result.error}`)
      }
    } catch (error) {
      setUploadStatus("❌ Error: Failed to upload media. Please try again.")
      console.error("Upload error:", error)
    } finally {
      setIsUploading(false)
    }
  }

  const deleteMedia = (id: string) => {
    alert("To delete this media, please manually remove the entry from lib/portfolio-media.json")
  }

  const portfolioMedia = existingMedia.filter((item) =>
    selectedPortfolio && selectedPortfolio !== "all" ? item.portfolioSlug === selectedPortfolio : true,
  )

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Portfolio Media Manager</h1>
          <p className="text-gray-600">
            Upload and manage multiple media files for portfolio pages using Firebase Storage
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Upload Form */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Upload className="h-5 w-5" />
                <span>Upload Multiple Media</span>
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

              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label>Media Items ({mediaUploads.length})</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMediaRow}
                    className="flex items-center space-x-1 bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add More</span>
                  </Button>
                </div>

                {mediaUploads.map((upload, index) => (
                  <div key={upload.id} className="flex items-end space-x-2 p-3 border rounded-lg bg-gray-50">
                    <div className="flex-1 space-y-2">
                      <div className="flex items-center space-x-2">
                        <Select
                          value={upload.type}
                          onValueChange={(value: "image" | "video") => updateMediaUpload(upload.id, "type", value)}
                        >
                          <SelectTrigger className="w-24">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="image">Image</SelectItem>
                            <SelectItem value="video">Video</SelectItem>
                          </SelectContent>
                        </Select>
                        <span className="text-sm text-gray-500">#{index + 1}</span>
                      </div>
                      <Input
                        value={upload.url}
                        onChange={(e) => updateMediaUpload(upload.id, "url", e.target.value)}
                        placeholder="https://firebasestorage.googleapis.com/..."
                        className="font-mono text-sm"
                      />
                    </div>
                    {mediaUploads.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeMediaRow(upload.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </div>

              {uploadStatus && (
                <div
                  className={`p-3 rounded-lg text-sm ${
                    uploadStatus.includes("✅")
                      ? "bg-green-50 text-green-700"
                      : uploadStatus.includes("Error")
                        ? "bg-red-50 text-red-700"
                        : "bg-blue-50 text-blue-700"
                  }`}
                >
                  {uploadStatus}
                </div>
              )}

              <Button onClick={saveMedia} disabled={isUploading} className="w-full">
                {isUploading
                  ? "Processing..."
                  : `Upload ${mediaUploads.filter((u) => u.url.trim()).length} Media Items`}
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
                        <p className="text-xs text-gray-500 truncate">{item.url}</p>
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
