import type React from "react"
import { MinecraftIcon } from "../../minecraft-icon"

export function MinecraftMoonIcon(props: React.ComponentProps<typeof MinecraftIcon>) {
  return (
    <MinecraftIcon {...props}>
      <path
        fill="currentColor"
        d="M8 3h1v1H8zM9 4h1v1H9zM10 5h1v1h-1zM11 6h1v4h-1zM10 10h1v1h-1zM9 11h1v1H9zM8 12h1v1H8zM5 11h4v1H5zM4 10h1v1H4zM3 6h1v4H3zM4 5h1v1H4zM5 4h1v1H5zM6 3h2v1H6z"
      />
    </MinecraftIcon>
  )
}
