import portfolioMediaData from "./portfolio-media.json"

export interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  title: string
  description: string
  portfolioSlug: string
  timestamp: number
}

export function getPortfolioMedia(slug: string): MediaItem[] {
  return portfolioMediaData[slug as keyof typeof portfolioMediaData] || []
}

export function getAllPortfolioMedia(): Record<string, MediaItem[]> {
  return portfolioMediaData
}
