import type React from "react"
import { MinecraftIcon } from "../../minecraft-icon"

export function MinecraftSearchIcon(props: React.ComponentProps<typeof MinecraftIcon>) {
  return (
    <MinecraftIcon {...props}>
      {/* Glass part (circle) */}
      <path
        fill="currentColor"
        d="M6 3h3v1H6zM5 4h1v1H5zM9 4h1v1H9zM4 5h1v3H4zM10 5h1v3h-1zM5 8h1v1H5zM9 8h1v1H9zM6 9h3v1H6z"
      />
      {/* Handle part */}
      <path fill="currentColor" d="M10 9h1v1h-1zM11 10h1v1h-1zM12 11h1v1h-1zM13 12h1v1h-1z" />
      {/* Optional: inner part of the glass to make it look hollow */}
      <path fill="currentColor" d="M6 5h3v3H6z" opacity="0.5" />
    </MinecraftIcon>
  )
}
