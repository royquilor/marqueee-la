import type React from "react"
import { MinecraftIcon } from "../../minecraft-icon"

export function MinecraftBellIcon(props: React.ComponentProps<typeof MinecraftIcon>) {
  return (
    <MinecraftIcon {...props}>
      <path
        fill="currentColor"
        d="M7 3h2v1H7zM6 4h1v1H6zM9 4h1v1H9zM5 5h1v5H5zM10 5h1v5h-1zM4 10h1v1H4zM11 10h1v1h-1zM5 11h6v1H5zM7 12h2v1H7z"
      />
    </MinecraftIcon>
  )
}
