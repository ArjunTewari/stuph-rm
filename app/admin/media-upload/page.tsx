"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Upload, ImageIcon, Video, Trash2, ExternalLink, Plus, Copy, Check } from "lucide-react"
import { caseStudies } from "@/lib/case-studies"
import { getAllPortfolioMedia } from "@/lib/portfolio-media"

interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  portfolioSlug: string
  timestamp: number
}

interface BulkMediaItem {
  id: string
  type: "image" | "video"
  url: string
}

export default function PortfolioMediaPage() {
  const [selectedPortfolio, setSelectedPortfolio] = useState("all")
  const [bulkMediaItems, setBulkMediaItems] = useState<BulkMediaItem[]>([{ id: "1", type: "image", url: "" }])
  const [existingMedia, setExistingMedia] = useState<MediaItem[]>([])
  const [isValidating, setIsValidating] = useState(false)
  const [clipboardCopied, setClipboardCopied] = useState(false)

  useEffect(() => {
    const allMedia = getAllPortfolioMedia()
    const mediaArray: MediaItem[] = []
    Object.entries(allMedia).forEach(([slug, items]) => {
      mediaArray.push(...items)
    })
    setExistingMedia(mediaArray)
  }, [])

  const addMediaItem = () => {
    const newItem: BulkMediaItem = {
      id: Date.now().toString(),
      type: "image",
      url: "",
    }
    setBulkMediaItems([...bulkMediaItems, newItem])
  }

  const removeMediaItem = (id: string) => {
    if (bulkMediaItems.length > 1) {
      setBulkMediaItems(bulkMediaItems.filter((item) => item.id !== id))
    }
  }

  const updateMediaItem = (id: string, field: keyof BulkMediaItem, value: string) => {
    setBulkMediaItems(bulkMediaItems.map((item) => (item.id === id ? { ...item, [field]: value } : item)))
  }

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      setClipboardCopied(true)
      setTimeout(() => setClipboardCopied(false), 2000)
    } catch (err) {
      console.error("Failed to copy to clipboard:", err)
      // Fallback for older browsers
      const textArea = document.createElement("textarea")
      textArea.value = text
      document.body.appendChild(textArea)
      textArea.select()
      document.execCommand("copy")
      document.body.removeChild(textArea)
      setClipboardCopied(true)
      setTimeout(() => setClipboardCopied(false), 2000)
    }
  }

  const validateAndGenerateJSON = async () => {
    if (!selectedPortfolio || selectedPortfolio === "all") {
      alert("Please select a specific portfolio")
      return
    }

    // Validate all media items
    const validItems = bulkMediaItems.filter((item) => {
      if (!item.url) return false
      if (!item.url.includes("firebasestorage.googleapis.com")) return false
      return true
    })

    if (validItems.length === 0) {
      alert("Please fill in at least one valid Firebase Storage URL")
      return
    }

    setIsValidating(true)

    try {
      // Generate JSON entries for manual pasting
      const mediaItems = validItems.map((item) => ({
        id: Date.now().toString() + Math.random().toString(36).substr(2, 9),
        type: item.type,
        url: item.url,
        portfolioSlug: selectedPortfolio,
        timestamp: Date.now(),
      }))

      // Create JSON string for clipboard
      const jsonEntries = mediaItems
        .map((item) => `    ${JSON.stringify(item, null, 2).replace(/\n/g, "\n    ")}`)
        .join(",\n")

      const jsonOutput = `Media validated! Please manually add these entries to lib/portfolio-media.json under "${selectedPortfolio}" array:\n\n${jsonEntries}`

      await copyToClipboard(jsonOutput)

      alert(
        `✅ Media validated! ${validItems.length} items copied to clipboard.\n\nPlease manually paste the JSON entries into lib/portfolio-media.json`,
      )

      // Reset form
      setBulkMediaItems([{ id: "1", type: "image", url: "" }])
    } catch (error) {
      console.error("Validation error:", error)
      alert(
        `❌ Error: Failed to validate media. Please try again.\n\n${error instanceof Error ? error.message : "Unknown error"}`,
      )
    } finally {
      setIsValidating(false)
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
                  <Label>Media Items ({bulkMediaItems.length})</Label>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={addMediaItem}
                    className="flex items-center space-x-1 bg-transparent"
                  >
                    <Plus className="h-4 w-4" />
                    <span>Add More</span>
                  </Button>
                </div>

                {bulkMediaItems.map((item, index) => (
                  <div key={item.id} className="border rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm font-medium">#{index + 1}</Label>
                      {bulkMediaItems.length > 1 && (
                        <Button
                          type="button"
                          variant="ghost"
                          size="sm"
                          onClick={() => removeMediaItem(item.id)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    <div>
                      <Label className="text-xs">Media Type *</Label>
                      <Select
                        value={item.type}
                        onValueChange={(value: "image" | "video") => updateMediaItem(item.id, "type", value)}
                      >
                        <SelectTrigger className="h-8">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="image">Image</SelectItem>
                          <SelectItem value="video">Video</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label className="text-xs">Firebase Storage URL *</Label>
                      <Input
                        value={item.url}
                        onChange={(e) => updateMediaItem(item.id, "url", e.target.value)}
                        placeholder="https://firebasestorage.googleapis.com/..."
                        className="font-mono text-xs h-8"
                      />
                      <p className="text-xs text-gray-500 mt-1">
                        Must be a valid Firebase Storage URL with proper CORS configuration
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <Button onClick={validateAndGenerateJSON} disabled={isValidating} className="w-full">
                <div className="flex items-center space-x-2">
                  {clipboardCopied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                  <span>
                    {isValidating
                      ? "Validating..."
                      : clipboardCopied
                        ? "Copied to Clipboard!"
                        : `Validate & Copy ${bulkMediaItems.length} Media Items`}
                  </span>
                </div>
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
