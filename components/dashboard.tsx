"use client"

import { useState, useEffect, useRef } from "react"
import { DashboardHeader } from "./dashboard-header"
import { DashboardSidebar } from "./dashboard-sidebar"
import { TaskList } from "./task-list"
import { ProjectOverview } from "./project-overview"
import { SidebarProvider } from "@/components/ui/sidebar"

interface DashboardProps {
  heroVariant?: 1 | 2 | 3
  pixelationLevel?: number // Add this line
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

  // Render different dashboard content based on hero variant
  const renderDashboardContent = () => {
    switch (heroVariant) {
      case 1:
        return (
          <>
            {selectedView === "tasks" && (
              <div className="flex h-full flex-col">
                <ProjectOverview />
                <TaskList className="flex-1" heroVariant={heroVariant} pixelationLevel={pixelationLevel} />
              </div>
            )}
            {selectedView === "projects" && (
              <div className="h-full p-4">
                <h2 className="text-xl font-semibold">Projects</h2>
                <p className="text-muted-foreground">Your projects will appear here.</p>
              </div>
            )}
            {selectedView === "team" && (
              <div className="h-full p-4">
                <h2 className="text-xl font-semibold">Team</h2>
                <p className="text-muted-foreground">Your team members will appear here.</p>
              </div>
            )}
            {selectedView === "analytics" && (
              <div className="h-full p-4">
                <h2 className="text-xl font-semibold">Analytics</h2>
                <p className="text-muted-foreground">Your analytics will appear here.</p>
              </div>
            )}
          </>
        )

      case 2:
        return (
          <>
            {selectedView === "tasks" && (
              <div className="flex h-full flex-col">
                <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 mb-2 px-4 pt-3">
                  <div className="bg-card p-4 rounded-lg border border-border/50">
                    <h3 className="text-sm font-medium mb-2">Active Tasks</h3>
                    <div className="text-2xl font-bold">12</div>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border/50">
                    <h3 className="text-sm font-medium mb-2">Team Workload</h3>
                    <div className="text-2xl font-bold">78%</div>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border/50">
                    <h3 className="text-sm font-medium mb-2">Upcoming Deadlines</h3>
                    <div className="text-2xl font-bold">3</div>
                  </div>
                  <div className="bg-card p-4 rounded-lg border border-border/50">
                    <h3 className="text-sm font-medium mb-2">AI Insights</h3>
                    <div className="text-2xl font-bold">5</div>
                  </div>
                </div>
                <TaskList className="flex-1" heroVariant={heroVariant} />
              </div>
            )}
            {selectedView !== "tasks" && (
              <div className="h-full p-4">
                <h2 className="text-xl font-semibold">
                  {selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}
                </h2>
                <p className="text-muted-foreground">Your {selectedView} will appear here.</p>
              </div>
            )}
          </>
        )

      case 3:
        return (
          <>
            {selectedView === "tasks" && (
              <div className="flex h-full flex-col">
                {/* Project overview is hidden for variant 3 */}
                <TaskList className="flex-1" heroVariant={heroVariant} />
              </div>
            )}
            {selectedView !== "tasks" && (
              <div className="h-full p-4">
                <h2 className="text-xl font-semibold">
                  {selectedView.charAt(0).toUpperCase() + selectedView.slice(1)}
                </h2>
                <p className="text-muted-foreground">Your {selectedView} will appear here.</p>
              </div>
            )}
          </>
        )

      default:
        return null
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
