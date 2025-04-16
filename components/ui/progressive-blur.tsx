"use client"

import { cn } from "@/utils/utils"
import { motion, type HTMLMotionProps } from "framer-motion"

export const GRADIENT_ANGLES = {
  top: 0,
  right: 90,
  bottom: 180,
  left: 270,
}

export type ProgressiveBlurProps = {
  direction?: keyof typeof GRADIENT_ANGLES
  blurLayers?: number
  className?: string
  blurIntensity?: number
} & HTMLMotionProps<"div">

export function ProgressiveBlur({
  direction = "bottom",
  blurLayers = 8,
  className,
  blurIntensity = 0.25,
  ...props
}: ProgressiveBlurProps) {
  const layers = Math.max(blurLayers, 2)
  const segmentSize = 1 / (layers + 1)

  return (
    <div className={cn("relative", className)}>
      {Array.from({ length: layers }).map((_, index) => {
        const angle = GRADIENT_ANGLES[direction]

        // Create more pronounced gradient stops with higher contrast
        const gradientStops = [
          `rgba(255, 255, 255, 0) ${index * segmentSize * 100}%`,
          `rgba(255, 255, 255, 1) ${(index + 0.5) * segmentSize * 100}%`,
          `rgba(255, 255, 255, 1) ${(index + 1.5) * segmentSize * 100}%`,
          `rgba(255, 255, 255, 0) ${(index + 2) * segmentSize * 100}%`,
        ]

        const gradient = `linear-gradient(${angle}deg, ${gradientStops.join(", ")})`

        return (
          <motion.div
            key={index}
            className="pointer-events-none absolute inset-0 rounded-[inherit]"
            style={{
              maskImage: gradient,
              WebkitMaskImage: gradient,
              backdropFilter: `blur(${(index + 1) * blurIntensity * 2}px)`,
            }}
            {...props}
          />
        )
      })}
    </div>
  )
}
