"use client"

import * as React from "react"
import { CheckCircle2, Circle, Clock, ListFilter, MoreHorizontal, Plus } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table"

// Task type definition
type Task = {
  id: string
  title: string
  priority: "high" | "medium" | "low"
  status: "completed" | "in-progress" | "todo"
  dueDate: string
  assignee: {
    name: string
    avatar: string
    initials: string
  }
  project: string
}

// Team member avatars
const teamAvatars = {
  "Alex Kim": "/images/team/alex-kim.png",
  "Alex Kim (New)": "/images/team/alex-new.png",
  "Taylor Swift": "/images/team/taylor-swift.png",
  "Taylor Swift (New)": "/images/team/taylor-new.png",
  "Taylor Swift (Wireframes)": "/images/team/taylor-wireframes.png",
  "Jordan Lee": "/images/team/jordan-lee.png",
  "Jordan Lee (New)": "/images/team/jordan-new.png",
  "Morgan Chen": "/images/team/morgan-chen.png",
  "Morgan Chen (New)": "/images/team/morgan-new.png",
  "Roy Quilos": "/images/team/roy-quilos.jpeg",
  "Roy Quilos (New)": "/images/team/roy-quilos-new.jpeg",
}

// Sample task data
const tasks: Task[] = [
  {
    id: "task-1",
    title: "Website Redesign - Homepage",
    priority: "high",
    status: "in-progress",
    dueDate: "2023-06-15",
    assignee: {
      name: "Roy Quilos",
      avatar: teamAvatars["Roy Quilos (New)"],
      initials: "RQ",
    },
    project: "XYZ Corp Rebrand",
  },
  {
    id: "task-2",
    title: "Brand Guidelines Document",
    priority: "medium",
    status: "todo",
    dueDate: "2023-06-18",
    assignee: {
      name: "Taylor Swift",
      avatar: teamAvatars["Taylor Swift (New)"],
      initials: "TS",
    },
    project: "XYZ Corp Rebrand",
  },
  {
    id: "task-3",
    title: "Social Media Assets",
    priority: "low",
    status: "todo",
    dueDate: "2023-06-20",
    assignee: {
      name: "Jordan Lee",
      avatar: teamAvatars["Jordan Lee (New)"],
      initials: "JL",
    },
    project: "XYZ Corp Rebrand",
  },
  {
    id: "task-4",
    title: "Client Presentation",
    priority: "high",
    status: "in-progress",
    dueDate: "2023-06-14",
    assignee: {
      name: "Morgan Chen",
      avatar: teamAvatars["Morgan Chen (New)"],
      initials: "MC",
    },
    project: "ABC Inc App Design",
  },
  {
    id: "task-5",
    title: "User Testing Coordination",
    priority: "medium",
    status: "completed",
    dueDate: "2023-06-10",
    assignee: {
      name: "Alex Kim",
      avatar: teamAvatars["Alex Kim (New)"],
      initials: "AK",
    },
    project: "ABC Inc App Design",
  },
  // 5 more tasks
  {
    id: "task-6",
    title: "Mobile App Wireframes",
    priority: "high",
    status: "todo",
    dueDate: "2023-06-25",
    assignee: {
      name: "Taylor Swift",
      avatar: teamAvatars["Taylor Swift (Wireframes)"],
      initials: "TS",
    },
    project: "ABC Inc App Design",
  },
  {
    id: "task-7",
    title: "Logo Refinement",
    priority: "medium",
    status: "in-progress",
    dueDate: "2023-06-13",
    assignee: {
      name: "Jordan Lee",
      avatar: teamAvatars["Jordan Lee"],
      initials: "JL",
    },
    project: "XYZ Corp Rebrand",
  },
  {
    id: "task-8",
    title: "Marketing Website Copy",
    priority: "low",
    status: "completed",
    dueDate: "2023-06-08",
    assignee: {
      name: "Morgan Chen",
      avatar: teamAvatars["Morgan Chen"],
      initials: "MC",
    },
    project: "ABC Inc App Design",
  },
  {
    id: "task-9",
    title: "Email Template Design",
    priority: "medium",
    status: "todo",
    dueDate: "2023-06-22",
    assignee: {
      name: "Roy Quilos",
      avatar: teamAvatars["Roy Quilos"],
      initials: "RQ",
    },
    project: "XYZ Corp Rebrand",
  },
  {
    id: "task-10",
    title: "Onboarding Flow Revisions",
    priority: "high",
    status: "in-progress",
    dueDate: "2023-06-17",
    assignee: {
      name: "Roy Quilos",
      avatar: teamAvatars["Roy Quilos"],
      initials: "RQ",
    },
    project: "ABC Inc App Design",
  },
]

interface TaskListProps {
  className?: string
}

export function TaskList({ className }: TaskListProps) {
  const [sorting, setSorting] = React.useState<SortingState>([])
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([])
  const [rowSelection, setRowSelection] = React.useState({})

  // Define columns
  const columns: ColumnDef<Task>[] = [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && "indeterminate")}
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "title",
      header: "Task",
      cell: ({ row }) => <div className="font-medium">{row.getValue("title")}</div>,
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => {
        const status = row.getValue("status") as string
        return (
          <div className="flex items-center gap-2">
            {status === "completed" ? (
              <CheckCircle2 className="h-3 w-3 text-green-500" />
            ) : status === "in-progress" ? (
              <Clock className="h-3 w-3 text-orange-500" />
            ) : (
              <Circle className="h-3 w-3" />
            )}
            <span className="capitalize text-xs">{status.replace("-", " ")}</span>
          </div>
        )
      },
    },
    {
      accessorKey: "priority",
      header: "Priority",
      cell: ({ row }) => {
        const priority = row.getValue("priority") as string
        return (
          <div
            className={cn(
              "text-[10px] px-2 py-0.5 rounded-full inline-block font-medium",
              priority === "high" && "bg-red-100 text-red-800 dark:bg-red-950/50 dark:text-red-400",
              priority === "medium" && "bg-orange-100 text-orange-800 dark:bg-orange-950/50 dark:text-orange-400",
              priority === "low" && "bg-green-100 text-green-800 dark:bg-green-950/50 dark:text-green-400",
            )}
          >
            {priority}
          </div>
        )
      },
    },
    {
      accessorKey: "dueDate",
      header: "Due",
      cell: ({ row }) => <span className="text-xs">{formatDate(row.getValue("dueDate"))}</span>,
    },
    {
      accessorKey: "assignee",
      header: "Assignee",
      cell: ({ row }) => {
        const assignee = row.getValue("assignee") as Task["assignee"]
        return (
          <Avatar className="h-6 w-6">
            <AvatarImage src={assignee.avatar || "/placeholder.svg"} alt={assignee.name} />
            <AvatarFallback>{assignee.initials}</AvatarFallback>
          </Avatar>
        )
      },
    },
    {
      id: "actions",
      cell: ({ row }) => {
        const task = row.original
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-7 w-7">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">Open menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48 dark:border-border/90">
              <DropdownMenuLabel className="text-xs">Actions</DropdownMenuLabel>
              <DropdownMenuItem className="text-xs">Edit task</DropdownMenuItem>
              <DropdownMenuItem className="text-xs">Change assignee</DropdownMenuItem>
              <DropdownMenuItem className="text-xs">Set priority</DropdownMenuItem>
              <DropdownMenuSeparator className="dark:border-border/90" />
              <DropdownMenuItem className="text-xs text-red-600">Delete task</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        )
      },
    },
  ]

  const table = useReactTable({
    data: tasks,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      rowSelection,
    },
  })

  return (
    <div className={cn("flex flex-col overflow-hidden bg-background", className)}>
      {/* Header - with horizontal padding */}
      <div className="flex flex-row items-center justify-between py-2 px-4">
        <div className="space-y-0.5">
          <h2 className="text-lg font-semibold">Tasks</h2>
        </div>
        <div className="flex items-center gap-1.5">
          <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
            <ListFilter className="h-3 w-3" />
            <span>Filter</span>
          </Button>
          <Button size="sm" className="h-7 gap-1 text-xs">
            <Plus className="h-3 w-3" />
            <span>Add Task</span>
          </Button>
        </div>
      </div>

      {/* DataTable - full width with no horizontal padding or border radius */}
      <div className="border-t border-b dark:border-border/90">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="text-xs font-medium">
                    {header.isPlaceholder ? null : (
                      <div className="truncate">{flexRender(header.column.columnDef.header, header.getContext())}</div>
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No tasks found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

function formatDate(dateString: string): string {
  const date = new Date(dateString)
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
  }).format(date)
}

function cn(...classes: (string | boolean | undefined)[]) {
  return classes.filter(Boolean).join(" ")
}
