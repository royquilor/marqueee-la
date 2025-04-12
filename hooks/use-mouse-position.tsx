"use client"

import { useState, useEffect } from "react"

interface MousePosition {
  x: number
  y: number
}

export function useMousePosition() {
  const [mousePosition, setMousePosition] = useState<MousePosition | null>(null)

  useEffect(() => {
    const updateMousePosition = (ev: MouseEvent) => {
      setMousePosition({ x: ev.clientX, y: ev.clientY })
    }

    window.addEventListener("mousemove", updateMousePosition)

    return () => {
      window.removeEventListener("mousemove", updateMousePosition)
    }
  }, [])

  return mousePosition
}
