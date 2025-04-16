import type React from "react"
import { MinecraftIcon } from "../../minecraft-icon"

export function MinecraftAnalyticsIcon(props: React.ComponentProps<typeof MinecraftIcon>) {
  return (
    <MinecraftIcon {...props}>
      <path fill="currentColor" d="M2 12h12v1H2zM4 8h2v4H4zM7 5h2v7H7zM10 9h2v3h-2z" />
    </MinecraftIcon>
  )
}
