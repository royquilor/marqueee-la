import { getSubscriptions } from "@/lib/supabase"
import { formatDistanceToNow } from "date-fns"
import Link from "next/link"
import { Download } from "lucide-react"

export const dynamic = "force-dynamic"
export const revalidate = 0

export default async function SubscriptionsPage() {
  // Fetch subscriptions using our new function
  const subscriptions = await getSubscriptions()

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Email Subscriptions</h1>

      <div className="flex justify-between items-center mb-4">
        <div className="text-sm text-muted-foreground">
          {subscriptions.length} {subscriptions.length === 1 ? "subscription" : "subscriptions"} found
        </div>
        <div className="flex gap-2">
          {subscriptions.length > 0 && (
            <a
              href="/api/export-subscriptions"
              className="inline-flex items-center px-3 py-1.5 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
            >
              <Download className="h-3.5 w-3.5 mr-1.5" />
              Export CSV
            </a>
          )}
          <Link
            href="/"
            className="inline-flex items-center px-3 py-1.5 text-sm bg-secondary text-secondary-foreground rounded-md hover:bg-secondary/90"
          >
            Back to Homepage
          </Link>
        </div>
      </div>

      <div className="bg-card border rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-muted/50">
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Email</th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Subscribed</th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Status</th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">IP Address</th>
                <th className="px-4 py-2 text-left font-medium text-muted-foreground">Referrer</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {subscriptions.length > 0 ? (
                subscriptions.map((subscription) => (
                  <tr key={subscription.id} className="hover:bg-muted/50">
                    <td className="px-4 py-3 text-sm">{subscription.email}</td>
                    <td className="px-4 py-3 text-sm text-muted-foreground">
                      {formatDistanceToNow(new Date(subscription.created_at), { addSuffix: true })}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                          subscription.status === "active"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400"
                        }`}
                      >
                        {subscription.status || "active"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-xs text-muted-foreground">{subscription.ip_address}</td>
                    <td className="px-4 py-3 text-xs text-muted-foreground truncate max-w-xs">
                      {subscription.referrer || "-"}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-6 text-center text-muted-foreground">
                    No subscriptions yet
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
