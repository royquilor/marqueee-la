"use client"

import { Bell, Search } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "./theme-toggle"
import { getProfessionalPortraitAvatar } from "@/utils/avatar"
import { MinecraftSearchIcon, MinecraftBellIcon } from "@/components/icons/minecraft"
import { MinecraftAvatar } from "./minecraft-avatar"

interface DashboardHeaderProps {
  heroVariant?: 1 | 2 | 3
  pixelationLevel?: number
}

export function DashboardHeader({ heroVariant = 1, pixelationLevel = 3 }: DashboardHeaderProps) {
  // Determine which icons to use based on heroVariant
  const SearchIconComponent = heroVariant === 2 ? MinecraftSearchIcon : Search
  const BellIconComponent = heroVariant === 2 ? MinecraftBellIcon : Bell

  return (
    <header className="sticky top-0 z-10 flex h-12 items-center gap-3 bg-background px-3">
      <SidebarTrigger className="md:hidden" />
      <div className="relative flex-1">
        <SearchIconComponent className="absolute left-2 top-1.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search tasks..."
          className="h-7 w-full rounded-full pl-8 max-w-full md:max-w-xs border-0 bg-muted/50 focus-visible:ring-0 focus-visible:ring-offset-0"
        />
      </div>
      <div className="flex items-center gap-2">
        <ThemeToggle heroVariant={heroVariant} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative h-7 w-7">
              <BellIconComponent className="h-4 w-4" />
              <span className="absolute right-1 top-1 flex h-1.5 w-1.5 rounded-full bg-primary"></span>
              <span className="sr-only">Notifications</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[280px]">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <span>New comment on "Brand Redesign"</span>
                <span className="text-xs text-muted-foreground">2 minutes ago</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <div className="flex flex-col space-y-1">
                <span>AI suggested task optimization</span>
                <span className="text-xs text-muted-foreground">1 hour ago</span>
              </div>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="justify-center text-sm font-medium">View all</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative h-7 w-7 rounded-full overflow-hidden p-0">
              {heroVariant === 2 ? (
                <MinecraftAvatar
                  src={getProfessionalPortraitAvatar() || "/placeholder.svg"}
                  alt="User"
                  fallback="JD"
                  size={7}
                  pixelSize={pixelationLevel}
                />
              ) : (
                <Avatar className="h-7 w-7">
                  <AvatarImage src={getProfessionalPortraitAvatar() || "/placeholder.svg"} alt="User" />
                  <AvatarFallback className="hidden">JD</AvatarFallback>
                </Avatar>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Log out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
