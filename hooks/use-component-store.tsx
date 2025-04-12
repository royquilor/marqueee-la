"use client"

import { create } from "zustand"
import { persist } from "zustand/middleware"
import { useHistoryStore } from "./use-history-store"

interface ComponentContent {
  [key: string]: {
    [key: string]: string
  }
}

interface ElementSelection {
  componentId: string
  elementId: string
}

interface ComponentState {
  components: string[]
  content: ComponentContent
  selectedComponent: number | null
  selectedElement: ElementSelection | null
  lastAddedComponent: number | null
  addComponent: (componentId: string) => void
  removeComponent: (index: number) => void
  reorderComponents: (fromIndex: number, toIndex: number) => void
  updateContent: (componentId: string, elementId: string, content: string) => void
  removeElement: (componentId: string, elementId: string) => void
  selectComponent: (index: number | null) => void
  selectElement: (selection: ElementSelection | null) => void
  removeSelectedComponent: () => void
  removeSelectedElement: () => void
  clearLastAdded: () => void
}

// Create the store with persistence
export const useComponentStore = create<ComponentState>()(
  persist(
    (set, get) => ({
      components: [],
      content: {},
      selectedComponent: null,
      selectedElement: null,
      lastAddedComponent: null,

      addComponent: (componentId) => {
        // Record current state for undo
        const currentState = {
          components: get().components,
          content: get().content,
        }
        useHistoryStore.getState().recordChange(currentState)

        set((state) => {
          const newIndex = state.components.length

          // Initialize default content for nav component if it's being added for the first time
          const newContent = { ...state.content }
          if (componentId === "nav" && !newContent["nav"]) {
            newContent["nav"] = {
              brand: "Brand",
              link1: "Home",
              link2: "Features",
              link3: "Pricing",
              link4: "About",
              link5: "Contact",
              cta: "Sign Up",
            }
          }

          return {
            components: [...state.components, componentId],
            lastAddedComponent: newIndex,
            selectedComponent: newIndex, // Also select the new component
            selectedElement: null, // Clear element selection
            content: newContent,
          }
        })
      },

      removeComponent: (index) => {
        // Record current state for undo
        const currentState = {
          components: get().components,
          content: get().content,
        }
        useHistoryStore.getState().recordChange(currentState)

        set((state) => ({
          components: state.components.filter((_, i) => i !== index),
          selectedComponent:
            state.selectedComponent === index
              ? null
              : state.selectedComponent && state.selectedComponent > index
                ? state.selectedComponent - 1
                : state.selectedComponent,
          selectedElement: null, // Clear element selection
          lastAddedComponent:
            state.lastAddedComponent === index
              ? null
              : state.lastAddedComponent && state.lastAddedComponent > index
                ? state.lastAddedComponent - 1
                : state.lastAddedComponent,
        }))
      },

      reorderComponents: (fromIndex, toIndex) => {
        // Record current state for undo
        const currentState = {
          components: get().components,
          content: get().content,
        }
        useHistoryStore.getState().recordChange(currentState)

        set((state) => {
          const newComponents = [...state.components]
          const [movedItem] = newComponents.splice(fromIndex, 1)
          newComponents.splice(toIndex, 0, movedItem)
          return {
            components: newComponents,
            selectedComponent: state.selectedComponent === fromIndex ? toIndex : state.selectedComponent,
            selectedElement: null, // Clear element selection
            lastAddedComponent: state.lastAddedComponent === fromIndex ? toIndex : state.lastAddedComponent,
          }
        })
      },

      updateContent: (componentId, elementId, content) => {
        // Record current state for undo
        const currentState = {
          components: get().components,
          content: get().content,
        }
        useHistoryStore.getState().recordChange(currentState)

        set((state) => {
          const newContent = { ...state.content }
          if (!newContent[componentId]) {
            newContent[componentId] = {}
          }
          newContent[componentId][elementId] = content
          return { content: newContent }
        })
      },

      removeElement: (componentId, elementId) => {
        // Record current state for undo
        const currentState = {
          components: get().components,
          content: get().content,
        }
        useHistoryStore.getState().recordChange(currentState)

        set((state) => {
          const newContent = { ...state.content }
          if (newContent[componentId] && newContent[componentId][elementId]) {
            const componentContent = { ...newContent[componentId] }
            delete componentContent[elementId]
            newContent[componentId] = componentContent
          }
          return {
            content: newContent,
            selectedElement: null, // Clear element selection
          }
        })
      },

      selectComponent: (index) =>
        set({
          selectedComponent: index,
          selectedElement: null, // Clear element selection when selecting a component
        }),

      selectElement: (selection) =>
        set({
          selectedElement: selection,
          // Don't clear component selection when selecting an element
        }),

      removeSelectedComponent: () => {
        const { selectedComponent } = get()
        if (selectedComponent !== null) {
          get().removeComponent(selectedComponent)
        }
      },

      removeSelectedElement: () => {
        const { selectedElement } = get()
        if (selectedElement) {
          get().removeElement(selectedElement.componentId, selectedElement.elementId)
        }
      },

      clearLastAdded: () => set({ lastAddedComponent: null }),
    }),
    {
      name: "landing-page-storage", // name of the item in localStorage
      partialize: (state) => ({
        components: state.components,
        content: state.content,
        // Don't persist selection states
      }),
    },
  ),
)
