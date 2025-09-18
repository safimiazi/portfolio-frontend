"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Loader2, Lock, User } from "lucide-react"
import { toast } from "@/hooks/use-toast"
import { useRouter } from "next/navigation"

export default function LoginPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [loading, setLoading] = useState(false)
  const navigate = useRouter()
  useEffect(() => {
    setIsVisible(true)
  }, [])

const handleLogin = async (e: React.FormEvent) => {
  e.preventDefault()

  try {
    setLoading(true)

    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    })

    const data = await res.json() // ✅ Always parse here

    if (!res.ok) {
      // Login failed
      toast({
        title: "Login failed ❌",
        description: data?.message || "Invalid credentials, please try again.",
        variant: "destructive",
      })
      return // stop execution, don’t continue
    }

    // ✅ Login successful
    localStorage.setItem("accessToken", data.data.accessToken)

    toast({
      title: "Login successful 🎉",
      description: "Welcome back!",
    })

    // Optional: wait 1.5s before redirect so user sees toast
    setTimeout(() => {
      navigate.push("/admin")
    }, 1500)
  } catch (error: any) {
    console.error(error)
    toast({
      title: "Error",
      description: error.message || "Something went wrong",
      variant: "destructive",
    })
  } finally {
    setLoading(false) // ✅ Always reset loading
  }
}


  return (
    <div className="min-h-screen flex items-center justify-center bg-background transition-theme">
      <Card
        className={`w-full max-w-md rounded-2xl border border-border shadow-xl transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
      >
        <CardHeader className="pb-4 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">Welcome Back</h2>
          <p className="text-muted-foreground">Login to your account</p>
        </CardHeader>

        <CardContent className="space-y-6">
          <form className="space-y-4" onSubmit={handleLogin}>
            {/* Email */}
            <div className="space-y-1">
              <Label>Email</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1">
              <Label>Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground w-5 h-5" />
                <Input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full mt-2 bg-primary text-primary-foreground hover:bg-primary/80 transition flex items-center justify-center"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2 className="animate-spin mr-2 h-5 w-5" />
                  Logging in...
                </>
              ) : (
                "Login"
              )}
            </Button>
          </form>

          {/* Footer */}
          <div className="text-center text-sm text-muted-foreground mt-4">
            Don't have an account?{" "}
            <a href="#" className="text-accent hover:underline font-semibold">
              Sign up
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
