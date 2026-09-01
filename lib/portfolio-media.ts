import portfolioMediaData from "./portfolio-media.json"

export interface MediaItem {
  id: string
  type: "image" | "video" | "pdf"
  url: string
  title?: string
  description?: string
  portfolioSlug: string
  timestamp: number
}

const portfolioMedia = portfolioMediaData as Record<string, MediaItem[]>

export function getPortfolioMedia(slug: string): MediaItem[] {
  return portfolioMedia[slug] || []
}

export function getAllPortfolioMedia(): Record<string, MediaItem[]> {
  return portfolioMedia
}
