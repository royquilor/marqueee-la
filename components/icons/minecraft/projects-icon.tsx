import type React from "react"
import { MinecraftIcon } from "../../minecraft-icon"

export function MinecraftProjectsIcon(props: React.ComponentProps<typeof MinecraftIcon>) {
  return (
    <MinecraftIcon {...props}>
      <path fill="currentColor" d="M3 3h4v4H3zM9 3h4v4H9zM3 9h4v4H3zM9 9h4v4H9z" />
    </MinecraftIcon>
  )
}
