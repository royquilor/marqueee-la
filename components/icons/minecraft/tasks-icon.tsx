import type React from "react"
import { MinecraftIcon } from "../../minecraft-icon"

export function MinecraftTasksIcon(props: React.ComponentProps<typeof MinecraftIcon>) {
  return (
    <MinecraftIcon {...props}>
      <path fill="currentColor" d="M2 3h12v2H2zM2 7h12v2H2zM2 11h12v2H2z" />
      <path fill="currentColor" d="M13 4h1v1h-1zM13 8h1v1h-1zM13 12h1v1h-1z" />
    </MinecraftIcon>
  )
}
