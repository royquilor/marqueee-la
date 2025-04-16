import type React from "react"
import { cn } from "@/utils/utils"

interface MinecraftIconProps extends React.SVGProps<SVGSVGElement> {
  className?: string
}

export const MinecraftIcon: React.FC<MinecraftIconProps> = ({
  className,
  children,
  width = 16,
  height = 16,
  viewBox = "0 0 16 16",
  ...props
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={viewBox}
      className={cn("minecraft-pixelated", className)}
      style={{
        imageRendering: "pixelated",
        shapeRendering: "crispEdges",
      }}
      {...props}
    >
      {children}
    </svg>
  )
}
