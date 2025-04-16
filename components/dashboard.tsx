"use client"

import { useState, useEffect, useRef } from "react"
import { DashboardHeader } from "./dashboard-header"
import { DashboardSidebar } from "./dashboard-sidebar"
import { TaskList } from "./task-list"
import { ProjectOverview } from "./project-overview"
import { SidebarProvider } from "@/components/ui/sidebar"

interface DashboardProps {
  heroVariant?: 1 | 2 | 3
  pixelationLevel?: number
}

export default function Dashboard({ heroVariant = 1, pixelationLevel = 3 }: DashboardProps) {
  const [selectedView, setSelectedView] = useState<"tasks" | "projects" | "team" | "analytics">("tasks")
  const [activeComponent, setActiveComponent] = useState<string | null>(null)
  const sidebarRef = useRef<HTMLDivElement>(null)

  const handleActivateComponent = (componentName: string) => {
    setActiveComponent((prev) => (prev === componentName ? null : componentName))
  }

  const handleDeactivateAll = () => {
    setActiveComponent(null)
  }

  // Handle escape key press to deactivate components
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && activeComponent) {
        handleDeactivateAll()
      }
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [activeComponent])

  // Handle click outside to deactivate components
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      // If we have an active component and the click is outside the sidebar
      if (activeComponent === "sidebar" && sidebarRef.current && !sidebarRef.current.contains(e.target as Node)) {
        handleDeactivateAll()
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [activeComponent])

  // Render dashboard content with consistent spacing across all variants
  const renderDashboardContent = () => {
    if (selectedView === "tasks") {
      return (
        <div className="flex h-full flex-col">
          {/* Show ProjectOverview for all variants for consistent spacing */}
          <ProjectOverview />
          <TaskList className="flex-1" heroVariant={heroVariant} pixelationLevel={pixelationLevel} />
        </div>
      )
    } else {
      return (
        <div className="h-full p-4">
          <h2 className="text-xl font-semibold">{selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}</h2>
          <p className="text-muted-foreground">Your {selectedView} will appear here.</p>
        </div>
      )
    }
  }

  return (
    <SidebarProvider>
      <div className="flex h-full w-full overflow-hidden bg-background relative z-10">
        <DashboardSidebar
          selectedView={selectedView}
          setSelectedView={setSelectedView}
          isActive={activeComponent === "sidebar"}
          onActivate={(e) => {
            e?.stopPropagation?.()
            handleActivateComponent("sidebar")
          }}
          ref={sidebarRef}
          onDeactivate={handleDeactivateAll}
          heroVariant={heroVariant}
        />
        <div className="flex flex-1 flex-col overflow-hidden border-l border-border dark:border-border/90">
          <DashboardHeader heroVariant={heroVariant} pixelationLevel={pixelationLevel} />
          <main className="flex-1 overflow-auto p-0">{renderDashboardContent()}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
