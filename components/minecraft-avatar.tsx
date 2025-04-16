"use client"

import { useEffect, useRef, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface MinecraftAvatarProps {
  src: string
  alt: string
  fallback: string
  size?: number
  pixelSize?: number
  className?: string
}

export function MinecraftAvatar({ src, alt, fallback, size = 6, pixelSize = 4, className }: MinecraftAvatarProps) {
  const [pixelatedSrc, setPixelatedSrc] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    if (!src) return

    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = () => {
      if (!canvasRef.current) return

      const canvas = canvasRef.current
      const ctx = canvas.getContext("2d")
      if (!ctx) return

      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      // Draw small version
      const smallSize = Math.ceil(canvas.width / pixelSize)
      const tempCanvas = document.createElement("canvas")
      tempCanvas.width = smallSize
      tempCanvas.height = smallSize
      const tempCtx = tempCanvas.getContext("2d")
      if (!tempCtx) return

      // Draw original image at small size
      tempCtx.drawImage(img, 0, 0, smallSize, smallSize)

      // Draw pixelated version
      ctx.imageSmoothingEnabled = false
      ctx.drawImage(tempCanvas, 0, 0, smallSize, smallSize, 0, 0, canvas.width, canvas.height)

      // Convert to data URL
      setPixelatedSrc(canvas.toDataURL("image/png"))
    }

    img.src = src
  }, [src, pixelSize])

  return (
    <>
      <canvas ref={canvasRef} width={size * 8} height={size * 8} style={{ display: "none" }} />
      <Avatar className={`h-${size} w-${size} minecraft-pixelated ${className || ""}`}>
        {pixelatedSrc ? (
          <AvatarImage src={pixelatedSrc || "/placeholder.svg"} alt={alt} />
        ) : (
          <AvatarImage src={src || "/placeholder.svg"} alt={alt} className="minecraft-pixelated" />
        )}
        <AvatarFallback>{fallback}</AvatarFallback>
      </Avatar>
    </>
  )
}
