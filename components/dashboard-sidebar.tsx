"use client"

import type React from "react"

import { useState, useEffect, useRef, forwardRef } from "react"
import { BarChart3, CheckSquare, ChevronDown, Circle, Layout, Settings, Users, User } from "lucide-react"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getProfessionalPortraitAvatar } from "@/utils/avatar"

interface DashboardSidebarProps {
  selectedView: "tasks" | "projects" | "team" | "analytics"
  setSelectedView: (view: "tasks" | "projects" | "team" | "analytics") => void
  isActive: boolean
  onActivate: (e?: React.MouseEvent) => void
  onDeactivate: () => void
}

export const DashboardSidebar = forwardRef<HTMLDivElement, DashboardSidebarProps>(
  ({ selectedView, setSelectedView, isActive, onActivate, onDeactivate }, ref) => {
    const [variant, setVariant] = useState<1 | 2 | 3>(1)
    const innerRef = useRef<HTMLDivElement>(null)

    // Combine refs
    const sidebarRef = (ref || innerRef) as React.RefObject<HTMLDivElement>

    // Handle keyboard navigation
    useEffect(() => {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (!isActive) return

        if (e.key === "ArrowRight") {
          setVariant((prev) => (prev === 3 ? 1 : ((prev + 1) as 1 | 2 | 3)))
        } else if (e.key === "ArrowLeft") {
          setVariant((prev) => (prev === 1 ? 3 : ((prev - 1) as 1 | 2 | 3)))
        }
      }

      window.addEventListener("keydown", handleKeyDown)
      return () => window.removeEventListener("keydown", handleKeyDown)
    }, [isActive])

    // Render different variants based on the current variant state
    const renderVariant = () => {
      // Base sidebar class that includes the inner ring when active but no border
      const sidebarClass = `${isActive ? "ring-2 ring-primary ring-inset" : ""}`

      switch (variant) {
        case 1:
          return (
            <Sidebar variant="floating" collapsible="icon" className={sidebarClass}>
              <SidebarHeader className="flex items-start p-2 px-4">
                <div className="flex items-center gap-2">
                  <Circle className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold">Marqueee</span>
                </div>
              </SidebarHeader>
              <SidebarContent className="px-2 py-3">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "tasks"}
                      onClick={() => setSelectedView("tasks")}
                      tooltip="Tasks"
                      className="text-sm"
                    >
                      <CheckSquare className="h-4 w-4" />
                      <span>Tasks</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "projects"}
                      onClick={() => setSelectedView("projects")}
                      tooltip="Projects"
                      className="text-sm"
                    >
                      <Layout className="h-4 w-4" />
                      <span>Projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "team"}
                      onClick={() => setSelectedView("team")}
                      tooltip="Team"
                      className="text-sm"
                    >
                      <Users className="h-4 w-4" />
                      <span>Team</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "analytics"}
                      onClick={() => setSelectedView("analytics")}
                      tooltip="Analytics"
                      className="text-sm"
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>
              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings" className="text-sm">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
              <SidebarRail />
            </Sidebar>
          )

        case 2:
          return (
            <Sidebar variant="floating" collapsible="icon" className={sidebarClass}>
              <SidebarHeader className="flex flex-col gap-2 p-2">
                <div className="flex items-center gap-2 px-2">
                  <Circle className="h-4 w-4 text-primary" />
                  <span className="text-base font-semibold tracking-tight">Marqueee</span>
                </div>

                {/* Team Switcher */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="w-full justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-sm bg-primary/20"></div>
                        <span>Design Team</span>
                      </div>
                      <ChevronDown className="h-3 w-3 opacity-50" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-[--radix-dropdown-menu-trigger-width]">
                    <DropdownMenuItem className="text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-sm bg-blue-500/20"></div>
                        <span>Marketing Team</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-4 w-4 rounded-sm bg-green-500/20"></div>
                        <span>Development Team</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarHeader>

              <SidebarContent className="px-2 py-3">
                {/* First Group */}
                <SidebarGroup>
                  <SidebarGroupLabel>Workspace</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={selectedView === "tasks"}
                          onClick={() => setSelectedView("tasks")}
                          tooltip="Tasks"
                          className="text-sm"
                        >
                          <CheckSquare className="h-4 w-4" />
                          <span>Tasks</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={selectedView === "projects"}
                          onClick={() => setSelectedView("projects")}
                          tooltip="Projects"
                          className="text-sm"
                        >
                          <Layout className="h-4 w-4" />
                          <span>Projects</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>

                {/* Second Group */}
                <SidebarGroup>
                  <SidebarGroupLabel>Organization</SidebarGroupLabel>
                  <SidebarGroupContent>
                    <SidebarMenu>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={selectedView === "team"}
                          onClick={() => setSelectedView("team")}
                          tooltip="Team"
                          className="text-sm"
                        >
                          <Users className="h-4 w-4" />
                          <span>Team</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          isActive={selectedView === "analytics"}
                          onClick={() => setSelectedView("analytics")}
                          tooltip="Analytics"
                          className="text-sm"
                        >
                          <BarChart3 className="h-4 w-4" />
                          <span>Analytics</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </SidebarMenu>
                  </SidebarGroupContent>
                </SidebarGroup>
              </SidebarContent>

              <SidebarFooter>
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton tooltip="Settings" className="text-sm">
                      <Settings className="h-4 w-4" />
                      <span>Settings</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarFooter>
              <SidebarRail />
            </Sidebar>
          )

        case 3:
          return (
            <Sidebar variant="floating" collapsible="icon" className={sidebarClass}>
              <SidebarHeader className="flex items-center justify-between p-2 px-4">
                <div className="flex items-center gap-2">
                  <Circle className="h-4 w-4 text-primary" />
                  <span className="text-base font-semibold tracking-tight">Marqueee</span>
                </div>

                {/* Team Switcher in Header */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-6 w-6">
                      <div className="h-3 w-3 rounded-sm bg-primary/20"></div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem className="text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-sm bg-primary/20"></div>
                        <span>Design Team</span>
                      </div>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs">
                      <div className="flex items-center gap-2">
                        <div className="h-3 w-3 rounded-sm bg-blue-500/20"></div>
                        <span>Marketing Team</span>
                      </div>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarHeader>

              <SidebarContent className="px-2 py-3">
                <SidebarMenu>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "tasks"}
                      onClick={() => setSelectedView("tasks")}
                      tooltip="Tasks"
                      className="text-sm"
                    >
                      <CheckSquare className="h-4 w-4" />
                      <span>Tasks</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "projects"}
                      onClick={() => setSelectedView("projects")}
                      tooltip="Projects"
                      className="text-sm"
                    >
                      <Layout className="h-4 w-4" />
                      <span>Projects</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "team"}
                      onClick={() => setSelectedView("team")}
                      tooltip="Team"
                      className="text-sm"
                    >
                      <Users className="h-4 w-4" />
                      <span>Team</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      isActive={selectedView === "analytics"}
                      onClick={() => setSelectedView("analytics")}
                      tooltip="Analytics"
                      className="text-sm"
                    >
                      <BarChart3 className="h-4 w-4" />
                      <span>Analytics</span>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </SidebarMenu>
              </SidebarContent>

              <SidebarFooter className="p-2">
                {/* User Menu in Footer */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm" className="w-full justify-start gap-2 px-2">
                      <Avatar className="h-6 w-6">
                        <AvatarImage src={getProfessionalPortraitAvatar() || "/placeholder.svg"} alt="User" />
                        <AvatarFallback>JD</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col items-start text-xs">
                        <span className="font-medium">John Doe</span>
                        <span className="text-muted-foreground">john@example.com</span>
                      </div>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-[200px]">
                    <DropdownMenuItem className="text-xs">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-xs text-red-600">
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </SidebarFooter>
              <SidebarRail />
            </Sidebar>
          )
      }
    }

    return (
      <div className="relative" onClick={onActivate} ref={sidebarRef}>
        {renderVariant()}
        {isActive && (
          <div className="absolute -top-8 left-0 right-0 bg-background/80 backdrop-blur-sm text-xs text-center py-1 rounded-t-md">
            Variant {variant}/3 (Use ← → to navigate)
          </div>
        )}
      </div>
    )
  },
)

DashboardSidebar.displayName = "DashboardSidebar"
