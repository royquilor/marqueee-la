import type React from "react"
import { MinecraftIcon } from "../../minecraft-icon"

export function MinecraftArrowIcon(props: React.ComponentProps<typeof MinecraftIcon>) {
  return (
    <MinecraftIcon {...props}>
      <path
        fill="currentColor"
        d="M2 7h10v2H2zM12 6h1v1h-1zM12 9h1v1h-1zM13 5h1v1h-1zM13 10h1v1h-1zM14 4h1v1h-1zM14 11h1v1h-1z"
      />
    </MinecraftIcon>
  )
}
