import { getSubscriptions } from "@/lib/supabase"
import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Get all subscriptions
    const subscriptions = await getSubscriptions()

    // Convert to CSV
    const headers = ["Email", "Status", "Subscribed At", "IP Address", "Referrer"]
    const rows = subscriptions.map((sub) => [
      sub.email,
      sub.status || "active",
      new Date(sub.created_at).toISOString(),
      sub.ip_address || "",
      sub.referrer || "",
    ])

    // Create CSV content
    let csv = headers.join(",") + "\n"
    rows.forEach((row) => {
      // Properly escape fields that might contain commas
      const escapedRow = row.map((field) => {
        // If field contains comma, quote, or newline, wrap in quotes and escape quotes
        if (field.includes(",") || field.includes('"') || field.includes("\n")) {
          return `"${field.replace(/"/g, '""')}"`
        }
        return field
      })
      csv += escapedRow.join(",") + "\n"
    })

    // Return CSV as a downloadable file
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="subscriptions-${new Date().toISOString().split("T")[0]}.csv"`,
      },
    })
  } catch (error) {
    console.error("Error exporting subscriptions:", error)
    return NextResponse.json({ error: "Failed to export subscriptions" }, { status: 500 })
  }
}
