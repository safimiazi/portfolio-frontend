"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"

export default function AdminRootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem("accessToken")
    if (!token) {
      router.push("/login") // redirect if no token
    } else {
      setLoading(false) // allow render
    }
  }, [router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          {/* Spinner */}
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>

          {/* Text */}
          <p className="text-muted-foreground text-lg font-medium animate-pulse">
            Checking authentication...
          </p>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-background">
      <AdminLayout>{children}</AdminLayout>
    </div>
  )
}
