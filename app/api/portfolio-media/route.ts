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
    console.log("[v0] API: Received media items:", mediaItems.length)

    const filePath = path.join(process.cwd(), "public", "portfolio-media.json")
    console.log("[v0] API: File path:", filePath)

    let portfolioMedia: Record<string, MediaItem[]> = {}

    try {
      const fileContent = await fs.readFile(filePath, "utf8")
      portfolioMedia = JSON.parse(fileContent)
      console.log("[v0] API: Loaded existing data")
    } catch (error) {
      console.log("[v0] API: Creating new file, error:", error)
      // Initialize with empty arrays for all portfolios
      portfolioMedia = {
        flipkart: [],
        "itc-right-shift": [],
        "hdfc-sky": [],
        voyaah: [],
        gastronomix: [],
        tify: [],
        boldfit: [],
        "boom-pizza": [],
        "humpy-farms": [],
        "disco-panda": [],
      }
    }

    // Add new media items to their respective portfolios
    for (const item of mediaItems) {
      if (!portfolioMedia[item.portfolioSlug]) {
        portfolioMedia[item.portfolioSlug] = []
      }
      portfolioMedia[item.portfolioSlug].push(item)
      console.log("[v0] API: Added item to", item.portfolioSlug)
    }

    try {
      await fs.writeFile(filePath, JSON.stringify(portfolioMedia, null, 2))
      console.log("[v0] API: Successfully wrote file")
    } catch (writeError) {
      console.error("[v0] API: Write error:", writeError)
      throw new Error(`Failed to write file: ${writeError}`)
    }

    return NextResponse.json({
      success: true,
      message: `Successfully added ${mediaItems.length} media item(s)`,
      addedItems: mediaItems.length,
    })
  } catch (error) {
    console.error("[v0] API: Full error:", error)
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update portfolio media",
        details: error instanceof Error ? error.message : String(error),
      },
      { status: 500 },
    )
  }
}
