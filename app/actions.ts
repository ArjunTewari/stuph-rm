"use server"

import { put } from "@vercel/blob"

export async function uploadTextBlob(filename: string, content: string) {
  try {
    const blob = await put(`articles/${filename}`, content, {
      access: "public",
    })
    console.log("Blob uploaded successfully:", blob.url)
    return { success: true, url: blob.url, message: `File "${filename}" uploaded successfully!` }
  } catch (error) {
    console.error("Error uploading blob:", error)
    return { success: false, message: "Failed to upload blob." }
  }
}
