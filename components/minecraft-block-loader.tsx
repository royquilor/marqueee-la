"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

interface MinecraftBlockLoaderProps {
  size?: number
  color?: string
  className?: string
}

export function MinecraftBlockLoader({ size = 16, color = "#ffdd00", className = "" }: MinecraftBlockLoaderProps) {
  const [blocks, setBlocks] = useState<{ id: number; x: number; y: number; delay: number }[]>([])

  useEffect(() => {
    // Create a 3x3 grid of blocks
    const newBlocks = []
    let id = 0

    for (let y = 0; y < 3; y++) {
      for (let x = 0; x < 3; x++) {
        // Skip the center block to create a hollow square
        if (x === 1 && y === 1) continue

        newBlocks.push({
          id: id++,
          x,
          y,
          delay: id * 0.1, // Stagger the animation
        })
      }
    }

    setBlocks(newBlocks)
  }, [])

  return (
    <div
      className={`relative minecraft-pixelated ${className}`}
      style={{
        width: size * 3,
        height: size * 3,
      }}
    >
      {blocks.map((block) => (
        <motion.div
          key={block.id}
          className="absolute"
          style={{
            width: size,
            height: size,
            left: block.x * size,
            top: block.y * size,
            backgroundColor: color,
          }}
          initial={{ opacity: 0.3 }}
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{
            duration: 1.5,
            repeat: Number.POSITIVE_INFINITY,
            delay: block.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  )
}
