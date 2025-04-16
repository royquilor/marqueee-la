"use client"

import { useEffect, useRef, useState } from "react"
import { cn } from "@/utils/utils"

interface MarqueeHeadingProps {
  text: string
  className?: string
  speed?: number // Speed in pixels per second
  gap?: number // Gap between repeated text in pixels
  repeat?: number // Number of times to repeat the text
}

export function MarqueeHeading({ text, className, speed = 20, gap = 100, repeat = 3 }: MarqueeHeadingProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [containerWidth, setContainerWidth] = useState(0)
  const [animationDuration, setAnimationDuration] = useState(0)

  useEffect(() => {
    if (!containerRef.current) return

    const updateWidth = () => {
      if (containerRef.current) {
        const width = containerRef.current.offsetWidth
        setContainerWidth(width)

        // Calculate animation duration based on content width and speed
        const contentWidth = width + gap
        const durationInSeconds = contentWidth / speed
        setAnimationDuration(durationInSeconds)
      }
    }

    updateWidth()
    window.addEventListener("resize", updateWidth)
    return () => window.removeEventListener("resize", updateWidth)
  }, [gap, speed, text])

  // Create repeated text array
  const repeatedText = Array(repeat).fill(text)

  return (
    <div
      ref={containerRef}
      className={cn("overflow-hidden whitespace-nowrap w-full uppercase m-0 p-0", className)}
      style={{ width: "100vw", marginLeft: "calc(-50vw + 50%)" }}
      aria-label={text}
    >
      <div
        className="inline-block animate-marquee"
        style={{
          animationDuration: `${animationDuration}s`,
          animationTimingFunction: "linear",
          animationIterationCount: "infinite",
          width: "max-content",
        }}
      >
        {repeatedText.map((item, index) => (
          <span key={index} className="inline-block" style={{ marginRight: `${gap}px` }}>
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
