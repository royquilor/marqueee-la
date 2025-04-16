/**
 * Pixelates an image and returns a data URL
 * @param src Source image URL
 * @param pixelSize Size of each pixel block
 * @param width Output width
 * @param height Output height
 * @returns Promise that resolves to a data URL of the pixelated image
 */
export async function pixelateImage(src: string, pixelSize = 4, width = 64, height = 64): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      // Create canvas
      const canvas = document.createElement("canvas")
      canvas.width = width
      canvas.height = height
      const ctx = canvas.getContext("2d")

      if (!ctx) {
        reject(new Error("Could not get canvas context"))
        return
      }

      // Draw small version
      const smallSize = Math.ceil(width / pixelSize)
      const tempCanvas = document.createElement("canvas")
      tempCanvas.width = smallSize
      tempCanvas.height = smallSize
      const tempCtx = tempCanvas.getContext("2d")

      if (!tempCtx) {
        reject(new Error("Could not get temp canvas context"))
        return
      }

      // Draw original image at small size
      tempCtx.drawImage(img, 0, 0, smallSize, smallSize)

      // Draw pixelated version
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(tempCanvas, 0, 0, smallSize, smallSize, 0, 0, width, height)

      // Convert to data URL
      resolve(canvas.toDataURL("image/png"))
    }

    img.onerror = () => {
      reject(new Error("Failed to load image"))
    }

    img.src = src
  })
}

/**
 * Cache for pixelated images to improve performance
 */
const pixelatedImageCache: Record<string, string> = {}

/**
 * Pixelates an image with caching for better performance
 * @param src Source image URL
 * @param pixelSize Size of each pixel block
 * @param width Output width
 * @param height Output height
 * @returns Promise that resolves to a data URL of the pixelated image
 */
export async function pixelateImageCached(src: string, pixelSize = 4, width = 64, height = 64): Promise<string> {
  const cacheKey = `${src}_${pixelSize}_${width}_${height}`

  if (pixelatedImageCache[cacheKey]) {
    return pixelatedImageCache[cacheKey]
  }

  try {
    const dataUrl = await pixelateImage(src, pixelSize, width, height)
    pixelatedImageCache[cacheKey] = dataUrl
    return dataUrl
  } catch (error) {
    console.error("Error pixelating image:", error)
    return src // Return original source on error
  }
}
