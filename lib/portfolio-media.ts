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
    const portfolioMediaData = await response.json()
    return portfolioMediaData[slug] || []
  } catch (error) {
    console.error("Error loading portfolio media:", error)
    return []
  }
}

export async function getAllPortfolioMedia(): Promise<Record<string, MediaItem[]>> {
  try {
    const response = await fetch("/portfolio-media.json")
    return await response.json()
  } catch (error) {
    console.error("Error loading portfolio media:", error)
    return {}
  }
}
