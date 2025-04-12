"use client"

import type { ReactNode } from "react"
import { useTheme } from "@/components/theme-provider"

interface ContainerProps {
  children: ReactNode
  className?: string
}

export function Container({ children, className = "" }: ContainerProps) {
  const theme = useTheme()

  return (
    <div className={`container px-4 md:px-6 mx-auto ${className}`} style={{ maxWidth: theme.containerWidth }}>
      {children}
    </div>
  )
}
