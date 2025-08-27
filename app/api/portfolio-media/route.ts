import { type NextRequest, NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

const MEDIA_FILE_PATH = path.join(process.cwd(), "lib", "portfolio-media.json")

export async function POST(request: NextRequest) {
  try {
    const mediaItem = await request.json()

    // Read existing data
    const fileContent = await fs.readFile(MEDIA_FILE_PATH, "utf8")
    const portfolioData = JSON.parse(fileContent)

    // Add new media item to the appropriate portfolio
    if (!portfolioData[mediaItem.portfolioSlug]) {
      portfolioData[mediaItem.portfolioSlug] = []
    }

    portfolioData[mediaItem.portfolioSlug].push(mediaItem)

    // Write back to file
    await fs.writeFile(MEDIA_FILE_PATH, JSON.stringify(portfolioData, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error updating portfolio media:", error)
    return NextResponse.json({ error: "Failed to update media" }, { status: 500 })
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { id } = await request.json()

    // Read existing data
    const fileContent = await fs.readFile(MEDIA_FILE_PATH, "utf8")
    const portfolioData = JSON.parse(fileContent)

    // Remove media item from all portfolios
    Object.keys(portfolioData).forEach((slug) => {
      portfolioData[slug] = portfolioData[slug].filter((item: any) => item.id !== id)
    })

    // Write back to file
    await fs.writeFile(MEDIA_FILE_PATH, JSON.stringify(portfolioData, null, 2))

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting portfolio media:", error)
    return NextResponse.json({ error: "Failed to delete media" }, { status: 500 })
  }
}
