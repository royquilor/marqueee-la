import type React from "react"
import { MinecraftIcon } from "../../minecraft-icon"

export function MinecraftCompletedIcon(props: React.ComponentProps<typeof MinecraftIcon>) {
  return (
    <MinecraftIcon {...props}>
      <path
        fill="currentColor"
        d="M8 3h1v1H8zM7 4h1v1H7zM9 4h1v1H9zM6 5h1v1H6zM10 5h1v1h-1zM5 6h1v1H5zM11 6h1v1h-1zM4 7h1v2H4zM12 7h1v2h-1zM5 9h1v1H5zM11 9h1v1h-1zM6 10h1v1H6zM10 10h1v1h-1zM7 11h1v1H7zM9 11h1v1H9zM8 12h1v1H8z"
      />
      <path fill="currentColor" d="M6 7h1v1H6zM7 8h1v1H7zM8 9h1v1H8zM9 8h1v1H9zM10 7h1v1h-1z" />
    </MinecraftIcon>
  )
}
