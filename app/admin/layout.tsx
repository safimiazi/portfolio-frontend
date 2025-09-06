import type React from "react"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      <AdminLayout>{children}</AdminLayout>
    </div>
  )
}
