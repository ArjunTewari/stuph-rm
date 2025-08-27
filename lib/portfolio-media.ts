export interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  portfolioSlug: string
  timestamp: number
}

export async function getPortfolioMedia(slug: string): Promise<MediaItem[]> {
  try {
    const response = await fetch("/portfolio-media.json")
    if (!response.ok) {
      console.log("[v0] No portfolio media file found, returning empty array")
      return []
    }
    const portfolioMediaData: Record<string, MediaItem[]> = await response.json()
    return portfolioMediaData[slug] || []
  } catch (error) {
    console.error("[v0] Error loading portfolio media:", error)
    return []
  }
}

export async function getAllPortfolioMedia(): Promise<Record<string, MediaItem[]>> {
  try {
    const response = await fetch("/portfolio-media.json")
    if (!response.ok) {
      return {}
    }
    return await response.json()
  } catch (error) {
    console.error("[v0] Error loading all portfolio media:", error)
    return {}
  }
}
