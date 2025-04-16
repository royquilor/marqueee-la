"use client"

import { useEffect, useState } from "react"
import { cn } from "@/utils/utils"

interface MinecraftStarsBackgroundProps {
  className?: string
  starCount?: number
  starColor?: string
}

interface Star {
  id: number
  size: number
  x: number
  y: number
  opacity: number
  animationDuration: number
  animationDelay: number
}

export function MinecraftStarsBackground({
  className,
  starCount = 30,
  starColor = "#ffdd00",
}: MinecraftStarsBackgroundProps) {
  const [stars, setStars] = useState<Star[]>([])

  useEffect(() => {
    // Generate random stars
    const newStars: Star[] = []
    for (let i = 0; i < starCount; i++) {
      newStars.push({
        id: i,
        size: Math.random() * 3 + 1, // 1-4px
        x: Math.random() * 100, // 0-100%
        y: Math.random() * 100, // 0-100%
        opacity: Math.random() * 0.5 + 0.3, // 0.3-0.8
        animationDuration: Math.random() * 20 + 10, // 10-30s
        animationDelay: Math.random() * 5, // 0-5s
      })
    }
    setStars(newStars)
  }, [starCount])

  return (
    <div className={cn("absolute inset-0 overflow-hidden pointer-events-none z-0 minecraft-pixelated", className)}>
      {stars.map((star) => (
        <div
          key={star.id}
          className="absolute minecraft-pixelated"
          style={{
            width: `${star.size}px`,
            height: `${star.size}px`,
            backgroundColor: starColor,
            left: `${star.x}%`,
            top: `${star.y}%`,
            opacity: star.opacity,
            animation: `float-star ${star.animationDuration}s infinite ease-in-out`,
            animationDelay: `${star.animationDelay}s`,
          }}
        />
      ))}
    </div>
  )
}
