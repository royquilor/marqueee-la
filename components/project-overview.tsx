"use client"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

interface ProjectOverviewProps {
  heroVariant?: 1 | 2 | 3
}

export function ProjectOverview({ heroVariant }: ProjectOverviewProps) {
  // Add custom styling for Tron theme
  const tronCardClass = heroVariant === 3 ? "border-primary/30 bg-card/50" : ""

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4 mb-2 px-4 pt-3">
      <Card className={`flex flex-col overflow-hidden ${tronCardClass}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-3 px-3">
          <div className="text-xs font-medium">Active Tasks</div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 justify-between pb-3 pt-0 px-3">
          <div className="flex flex-col mb-4">
            <div className="text-xl font-bold">12</div>
          </div>
          <Progress value={45} className="mt-auto h-1" />
        </CardContent>
      </Card>
      <Card className={`flex flex-col overflow-hidden ${tronCardClass}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-3 px-3">
          <div className="text-xs font-medium">Team Workload</div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 justify-between pb-3 pt-0 px-3">
          <div className="flex flex-col mb-4">
            <div className="text-xl font-bold">78%</div>
          </div>
          <Progress value={78} className="mt-auto h-1" />
        </CardContent>
      </Card>
      <Card className={`flex flex-col overflow-hidden ${tronCardClass}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-3 px-3">
          <div className="text-xs font-medium">Upcoming Deadlines</div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 justify-between pb-3 pt-0 px-3">
          <div className="flex flex-col mb-4">
            <div className="text-xl font-bold">3</div>
          </div>
          <Progress value={65} className="mt-auto h-1" />
        </CardContent>
      </Card>
      <Card className={`flex flex-col overflow-hidden ${tronCardClass}`}>
        <CardHeader className="flex flex-row items-center justify-between pb-2 pt-3 px-3">
          <div className="text-xs font-medium">AI Insights</div>
        </CardHeader>
        <CardContent className="flex flex-col flex-1 justify-between pb-3 pt-0 px-3">
          <div className="flex flex-col mb-4">
            <div className="text-xl font-bold">5</div>
          </div>
          <Progress value={55} className="mt-auto h-1" />
        </CardContent>
      </Card>
    </div>
  )
}
