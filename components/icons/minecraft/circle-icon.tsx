import type React from "react"
import { MinecraftIcon } from "../../minecraft-icon"

export function MinecraftCircleIcon(props: React.ComponentProps<typeof MinecraftIcon>) {
  return (
    <MinecraftIcon {...props}>
      <path fill="currentColor" d="M4 4h8v8H4z" />
      <path fill="currentColor" d="M3 5h1v6H3zM12 5h1v6h-1zM5 3h6v1H5zM5 12h6v1H5z" />
    </MinecraftIcon>
  )
}
