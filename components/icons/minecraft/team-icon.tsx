import type React from "react"
import { MinecraftIcon } from "../../minecraft-icon"

export function MinecraftTeamIcon(props: React.ComponentProps<typeof MinecraftIcon>) {
  return (
    <MinecraftIcon {...props}>
      <path fill="currentColor" d="M4 4h2v2H4zM10 4h2v2h-2zM3 7h10v3H3z" />
      <path fill="currentColor" d="M6 10h4v2H6z" />
    </MinecraftIcon>
  )
}
