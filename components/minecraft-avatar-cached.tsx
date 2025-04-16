"use client"

import { useEffect, useState } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { pixelateImageCached } from "@/utils/image-utils"

export interface MinecraftAvatarCachedProps {
  src: string
  alt: string
  fallback: string
  size?: number
  pixelSize?: number
  className?: string
}

export function MinecraftAvatarCached({
  src,
  alt,
  fallback,
  size = 6,
  pixelSize = 4,
  className,
}: MinecraftAvatarCachedProps) {
  const [pixelatedSrc, setPixelatedSrc] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (!src) return

    setIsLoading(true)

    pixelateImageCached(src, pixelSize, size * 8, size * 8)
      .then((dataUrl) => {
        setPixelatedSrc(dataUrl)
        setIsLoading(false)
      })
      .catch(() => {
        setIsLoading(false)
      })
  }, [src, pixelSize, size])

  return (
    <Avatar className={`h-${size} w-${size} minecraft-pixelated ${className || ""}`}>
      {!isLoading && pixelatedSrc ? (
        <AvatarImage src={pixelatedSrc || "/placeholder.svg"} alt={alt} />
      ) : (
        <AvatarImage src={src || "/placeholder.svg"} alt={alt} className="minecraft-pixelated" />
      )}
      <AvatarFallback>{fallback}</AvatarFallback>
    </Avatar>
  )
}
