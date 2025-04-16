"use client"

import { motion } from "framer-motion"
import { Loader2 } from "lucide-react"
import { MinecraftStarsBackground } from "./minecraft-stars-background"
import { MinecraftBlockLoader } from "./minecraft-block-loader"

interface ThemeLoaderProps {
  variant: 1 | 2 | 3
  message?: string
  progress?: number
}

export function ThemeLoader({ variant, message = "Cooking theme...", progress = 0 }: ThemeLoaderProps) {
  // Determine the appropriate loader style based on variant
  const getLoaderStyle = () => {
    switch (variant) {
      case 2:
        return {
          fontFamily: "var(--minecraft-heading-font)",
          className: "minecraft-pixelated minecraft-text-yellow",
          iconClass: "minecraft-pixelated",
          bgClass: "minecraft-night-sky",
        }
      case 3:
        return {
          fontFamily: "var(--heading-font-family)",
          className: "text-primary",
          iconClass: "",
          bgClass: "bg-background",
        }
      default:
        return {
          fontFamily: "var(--heading-font-family)",
          className: "text-primary",
          iconClass: "",
          bgClass: "bg-background",
        }
    }
  }

  const style = getLoaderStyle()

  return (
    <div
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center ${style.bgClass}`}
      style={{ fontFamily: style.fontFamily }}
    >
      {variant === 2 && <MinecraftStarsBackground starCount={20} starColor="#ffdd00" />}

      <motion.div
        className="flex flex-col items-center justify-center gap-6"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        transition={{ duration: 0.3 }}
      >
        {variant === 2 ? (
          <MinecraftBlockLoader size={16} color="#ffdd00" />
        ) : (
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
          >
            <Loader2 className={`w-12 h-12 ${style.iconClass} ${style.className}`} />
          </motion.div>
        )}

        <motion.p
          className={`text-xl font-medium ${style.className}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          {message}
        </motion.p>

        {/* Progress bar */}
        <motion.div
          className={`w-48 h-2 ${variant === 2 ? "" : "rounded-full"} bg-background/20 overflow-hidden mt-2`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <motion.div
            className={`h-full ${variant === 2 ? "minecraft-pixelated" : ""} ${variant === 2 ? "bg-yellow-400" : "bg-primary"}`}
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </motion.div>
      </motion.div>
    </div>
  )
}
