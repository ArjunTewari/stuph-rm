"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Trash2, Plus, Upload, ImageIcon, Video, Eye, CheckCircle } from "lucide-react"
import { caseStudies } from "@/lib/case-studies"

interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  subheading: string
  alt?: string
}

interface StoredMediaItem extends MediaItem {
  portfolioSlug: string
  timestamp: number
}

export default function MediaUploadPage() {
  const [selectedPortfolio, setSelectedPortfolio] = useState<string>("")
  const [mediaItems, setMediaItems] = useState<MediaItem[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [uploadSuccess, setUploadSuccess] = useState(false)
  const [existingMedia, setExistingMedia] = useState<StoredMediaItem[]>([])
  const [selectedPortfolioForManagement, setSelectedPortfolioForManagement] = useState<string>("")

  // Portfolio options from existing case studies
  const portfolioOptions = caseStudies.map((study) => ({
    value: study.slug,
    label: study.title,
    category: study.category,
  }))

  const loadExistingMedia = (portfolioSlug: string) => {
    try {
      const existingMedia = JSON.parse(localStorage.getItem("portfolio-media") || "[]") as StoredMediaItem[]
      const portfolioMedia = existingMedia.filter((item) => item.portfolioSlug === portfolioSlug)
      setExistingMedia(portfolioMedia)
      console.log("[v0] Loaded existing media for", portfolioSlug, ":", portfolioMedia)
    } catch (error) {
      console.error("[v0] Error loading existing media:", error)
      setExistingMedia([])
    }
  }

  const removeExistingMedia = (mediaId: string) => {
    try {
      const allMedia = JSON.parse(localStorage.getItem("portfolio-media") || "[]") as StoredMediaItem[]
      const updatedMedia = allMedia.filter((item) => item.id !== mediaId)
      localStorage.setItem("portfolio-media", JSON.stringify(updatedMedia))

      // Reload existing media for current portfolio
      if (selectedPortfolioForManagement) {
        loadExistingMedia(selectedPortfolioForManagement)
      }

      console.log("[v0] Removed media item:", mediaId)
    } catch (error) {
      console.error("[v0] Error removing media:", error)
    }
  }

  const addMediaItem = () => {
    const newItem: MediaItem = {
      id: Date.now().toString(),
      type: "image",
      url: "",
      subheading: "",
      alt: "",
    }
    setMediaItems([...mediaItems, newItem])
  }

  const updateMediaItem = (id: string, field: keyof MediaItem, value: string) => {
    setMediaItems((items) => items.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const removeMediaItem = (id: string) => {
    setMediaItems((items) => items.filter((item) => item.id !== id))
  }

  const saveMediaToStorage = (portfolioSlug: string, mediaItems: MediaItem[]) => {
    try {
      const existingMedia = JSON.parse(localStorage.getItem("portfolio-media") || "[]") as StoredMediaItem[]

      const newMediaItems: StoredMediaItem[] = mediaItems
        .filter((item) => item.url) // Only save items with URLs
        .map((item) => ({
          ...item,
          portfolioSlug,
          timestamp: Date.now(),
        }))

      const updatedMedia = [...existingMedia, ...newMediaItems]
      localStorage.setItem("portfolio-media", JSON.stringify(updatedMedia))

      console.log("[v0] Saved media to localStorage:", newMediaItems)
      return true
    } catch (error) {
      console.error("[v0] Error saving media:", error)
      return false
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setUploadSuccess(false)

    try {
      const validItems = mediaItems.filter((item) => item.url.trim())

      console.log("[v0] Submitting media upload:", {
        portfolio: selectedPortfolio,
        mediaItems: validItems,
      })

      // Save to localStorage
      const success = saveMediaToStorage(selectedPortfolio, validItems)

      if (success) {
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 1500))

        // Reset form after successful submission
        setMediaItems([])
        setSelectedPortfolio("")
        setUploadSuccess(true)

        if (selectedPortfolioForManagement) {
          loadExistingMedia(selectedPortfolioForManagement)
        }

        // Hide success message after 3 seconds
        setTimeout(() => setUploadSuccess(false), 3000)
      } else {
        throw new Error("Failed to save media")
      }
    } catch (error) {
      console.error("[v0] Upload error:", error)
      alert("Upload failed. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const previewMedia = (item: MediaItem) => {
    if (!item.url) return null

    return (
      <div className="mt-2 p-2 bg-gray-50 rounded-lg">
        <div className="flex items-center gap-2 mb-2">
          {item.type === "image" ? (
            <ImageIcon className="h-4 w-4 text-blue-500" />
          ) : (
            <Video className="h-4 w-4 text-purple-500" />
          )}
          <span className="text-sm font-medium">{item.subheading || "No caption"}</span>
        </div>
        {item.type === "image" ? (
          <img
            src={item.url || "/placeholder.svg"}
            alt={item.alt || item.subheading || "Uploaded image"}
            className="w-full h-32 object-cover rounded border"
            onError={(e) => {
              e.currentTarget.style.display = "none"
            }}
          />
        ) : (
          <video
            src={item.url}
            className="w-full h-32 object-cover rounded border"
            controls={false}
            muted
            onError={(e) => {
              e.currentTarget.style.display = "none"
            }}
          />
        )}
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-black mb-2">Media Upload Center</h1>
          <p className="text-gray-600">
            Upload multiple images and videos to your portfolio sections. Add media links, optional subheadings, and
            select the target portfolio.
          </p>
        </div>

        {uploadSuccess && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-3">
            <CheckCircle className="h-5 w-5 text-green-600" />
            <p className="text-green-800 font-medium">Media uploaded successfully! View it on the portfolio page.</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Portfolio Selection */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="h-5 w-5" />
                Select Portfolio Section
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="portfolio-select">Target Portfolio</Label>
                  <Select value={selectedPortfolio} onValueChange={setSelectedPortfolio}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a portfolio to add media to..." />
                    </SelectTrigger>
                    <SelectContent>
                      {portfolioOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex items-center justify-between w-full">
                            <span>{option.label}</span>
                            <Badge variant="secondary" className="ml-2 text-xs">
                              {option.category}
                            </Badge>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Media Items */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span className="flex items-center gap-2">
                  <ImageIcon className="h-5 w-5" />
                  Media Items ({mediaItems.length})
                </span>
                <Button
                  type="button"
                  onClick={addMediaItem}
                  variant="outline"
                  size="sm"
                  className="flex items-center gap-2 bg-transparent"
                >
                  <Plus className="h-4 w-4" />
                  Add Media
                </Button>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mediaItems.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                  <p>No media items added yet. Click "Add Media" to get started.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {mediaItems.map((item, index) => (
                    <div key={item.id} className="border rounded-lg p-4 bg-white">
                      <div className="flex items-center justify-between mb-4">
                        <h4 className="font-medium text-gray-900">Media Item #{index + 1}</h4>
                        <Button
                          type="button"
                          onClick={() => removeMediaItem(item.id)}
                          variant="ghost"
                          size="sm"
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-4">
                          <div>
                            <Label>Media Type</Label>
                            <Select
                              value={item.type}
                              onValueChange={(value: "image" | "video") => updateMediaItem(item.id, "type", value)}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="image">
                                  <div className="flex items-center gap-2">
                                    <ImageIcon className="h-4 w-4" />
                                    Image
                                  </div>
                                </SelectItem>
                                <SelectItem value="video">
                                  <div className="flex items-center gap-2">
                                    <Video className="h-4 w-4" />
                                    Video
                                  </div>
                                </SelectItem>
                              </SelectContent>
                            </Select>
                          </div>

                          <div>
                            <Label>Media URL *</Label>
                            <Input
                              type="url"
                              placeholder="https://example.com/media.jpg"
                              value={item.url}
                              onChange={(e) => updateMediaItem(item.id, "url", e.target.value)}
                            />
                          </div>

                          <div>
                            <Label>Subheading (Optional)</Label>
                            <Input
                              placeholder="Enter a descriptive subheading..."
                              value={item.subheading}
                              onChange={(e) => updateMediaItem(item.id, "subheading", e.target.value)}
                            />
                          </div>

                          {item.type === "image" && (
                            <div>
                              <Label>Alt Text (Optional)</Label>
                              <Input
                                placeholder="Describe the image for accessibility..."
                                value={item.alt || ""}
                                onChange={(e) => updateMediaItem(item.id, "alt", e.target.value)}
                              />
                            </div>
                          )}
                        </div>

                        <div>
                          <Label className="flex items-center gap-2 mb-2">
                            <Eye className="h-4 w-4" />
                            Preview
                          </Label>
                          {item.url ? (
                            previewMedia(item)
                          ) : (
                            <div className="h-32 bg-gray-100 rounded border-2 border-dashed border-gray-300 flex items-center justify-center">
                              <p className="text-gray-500 text-sm">Add URL to see preview</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Submit Section */}
          <Card>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">
                    Ready to upload {mediaItems.filter((item) => item.url.trim()).length} media items
                    {selectedPortfolio && (
                      <span> to {portfolioOptions.find((p) => p.value === selectedPortfolio)?.label}</span>
                    )}
                  </p>
                </div>
                <div className="flex gap-3">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => {
                      setMediaItems([])
                      setSelectedPortfolio("")
                    }}
                  >
                    Clear All
                  </Button>
                  <Button
                    type="submit"
                    disabled={
                      !selectedPortfolio || mediaItems.filter((item) => item.url.trim()).length === 0 || isSubmitting
                    }
                    className="min-w-[120px]"
                  >
                    {isSubmitting ? (
                      <span className="loading-dots">Uploading</span>
                    ) : (
                      <>
                        <Upload className="h-4 w-4 mr-2" />
                        Upload Media
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>

        {/* Media Management Section */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Trash2 className="h-5 w-5" />
              Manage Existing Media
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="management-portfolio-select">Select Portfolio to Manage</Label>
                <Select
                  value={selectedPortfolioForManagement}
                  onValueChange={(value) => {
                    setSelectedPortfolioForManagement(value)
                    if (value) {
                      loadExistingMedia(value)
                    } else {
                      setExistingMedia([])
                    }
                  }}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Choose a portfolio to manage media..." />
                  </SelectTrigger>
                  <SelectContent>
                    {portfolioOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        <div className="flex items-center justify-between w-full">
                          <span>{option.label}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {option.category}
                          </Badge>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {selectedPortfolioForManagement && (
                <div className="mt-6">
                  <h3 className="font-medium text-gray-900 mb-4">Existing Media ({existingMedia.length} items)</h3>

                  {existingMedia.length === 0 ? (
                    <div className="text-center py-8 text-gray-500 bg-gray-50 rounded-lg">
                      <ImageIcon className="h-12 w-12 mx-auto mb-4 opacity-50" />
                      <p>No media found for this portfolio.</p>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                      {existingMedia.map((item) => (
                        <div key={item.id} className="border rounded-lg p-4 bg-white">
                          <div className="flex items-center justify-between mb-2">
                            <Badge variant={item.type === "video" ? "default" : "secondary"}>
                              {item.type === "video" ? (
                                <>
                                  <Video className="h-3 w-3 mr-1" /> Video
                                </>
                              ) : (
                                <>
                                  <ImageIcon className="h-3 w-3 mr-1" /> Image
                                </>
                              )}
                            </Badge>
                            <Button
                              onClick={() => {
                                if (confirm("Are you sure you want to remove this media item?")) {
                                  removeExistingMedia(item.id)
                                }
                              }}
                              variant="ghost"
                              size="sm"
                              className="text-red-500 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>

                          <div className="mb-2">
                            {item.type === "image" ? (
                              <img
                                src={item.url || "/placeholder.svg"}
                                alt={item.alt || item.subheading || "Media item"}
                                className="w-full h-24 object-cover rounded border"
                                onError={(e) => {
                                  e.currentTarget.style.display = "none"
                                }}
                              />
                            ) : (
                              <video
                                src={item.url}
                                className="w-full h-24 object-cover rounded border"
                                controls={false}
                                muted
                                onError={(e) => {
                                  e.currentTarget.style.display = "none"
                                }}
                              />
                            )}
                          </div>

                          <div className="text-sm">
                            <p className="font-medium text-gray-900 truncate">{item.subheading || "No caption"}</p>
                            <p className="text-gray-500 text-xs mt-1">
                              Added: {new Date(item.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Instructions */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="text-lg">Upload Instructions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3 text-sm text-gray-600">
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Media URLs:</strong> Only the media URL is required. Subheadings and alt text are optional but
                  recommended for better presentation.
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Media Dimensions:</strong> Images and videos will automatically match existing portfolio
                  dimensions (aspect-[9/16] for mobile-first vertical format)
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Supported URLs:</strong> Direct links to images (jpg, png, gif) and videos (mp4, webm).
                  Firebase Storage, Vercel Blob, and other CDN URLs work perfectly
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  <strong>Instant Display:</strong> Uploaded media will appear immediately in a "Project Gallery"
                  section on the selected portfolio page
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
