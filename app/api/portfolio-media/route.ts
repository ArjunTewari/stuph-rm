import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

interface MediaItem {
  id: string
  type: "image" | "video"
  url: string
  portfolioSlug: string
  timestamp: number
}

export async function POST(request: NextRequest) {
  try {
    const mediaItems: MediaItem[] = await request.json()

    // Read current portfolio media
    const filePath = path.join(process.cwd(), "lib", "portfolio-media.json")
    let portfolioMedia: Record<string, MediaItem[]> = {}

    try {
      const fileContent = await fs.readFile(filePath, "utf8")
      portfolioMedia = JSON.parse(fileContent)
    } catch (error) {
      // File doesn't exist or is empty, start with empty object
      console.log("Creating new portfolio-media.json file")
    }

    // Add new media items to their respective portfolios
    for (const item of mediaItems) {
      if (!portfolioMedia[item.portfolioSlug]) {
        portfolioMedia[item.portfolioSlug] = []
      }
      portfolioMedia[item.portfolioSlug].push(item)
    }

    // Write updated data back to file
    await fs.writeFile(filePath, JSON.stringify(portfolioMedia, null, 2))

    return NextResponse.json({
      success: true,
      message: `Successfully added ${mediaItems.length} media item(s)`,
      addedItems: mediaItems.length,
    })
  } catch (error) {
    console.error("Error updating portfolio media:", error)
    return NextResponse.json({ success: false, error: "Failed to update portfolio media" }, { status: 500 })
  }
}
