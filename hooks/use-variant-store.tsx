"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useHistoryStore } from "./use-history-store"

interface VariantState {
  variants: Record<string, number> // componentId -> variant index
  cycleVariant: (componentId: string, direction: "next" | "prev") => void
  getVariant: (componentId: string) => number
  resetVariants: () => void
}

export const useVariantStore = create<VariantState>()(
  persist(
    (set, get) => ({
      variants: {},

      cycleVariant: (componentId, direction) => {
        // Record current state for undo
        const currentState = {
          variants: { ...get().variants },
        }
        useHistoryStore.getState().recordChange({ variants: currentState.variants })

        set((state) => {
          const currentVariant = state.variants[componentId] || 0
          const maxVariants = getMaxVariants(componentId)

          let newVariant: number
          if (direction === "next") {
            newVariant = (currentVariant + 1) % maxVariants
          } else {
            newVariant = (currentVariant - 1 + maxVariants) % maxVariants
          }

          return {
            variants: {
              ...state.variants,
              [componentId]: newVariant,
            },
          }
        })
      },

      getVariant: (componentId) => {
        return get().variants[componentId] || 0
      },

      resetVariants: () => {
        // Record current state for undo
        const currentState = {
          variants: { ...get().variants },
        }
        useHistoryStore.getState().recordChange({ variants: currentState.variants })

        set({ variants: {} })
      },
    }),
    {
      name: "landing-page-variants",
    },
  ),
)

// Helper function to get the maximum number of variants for a component
function getMaxVariants(componentId: string): number {
  const variantCounts: Record<string, number> = {
    nav: 3,
    hero: 3,
    features: 3,
    testimonials: 2,
    pricing: 2,
    cta: 2,
    footer: 2,
  }

  return variantCounts[componentId] || 1
}
