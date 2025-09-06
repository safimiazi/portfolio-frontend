"use client"

import { useState, useEffect } from "react"
import { useTheme } from "next-themes"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Sun, Moon, Monitor, Palette, Settings } from "lucide-react"

export function ThemeSettings() {
  const { theme, setTheme, systemTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const [autoSwitch, setAutoSwitch] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Settings className="w-5 h-5" />
            Theme Settings
          </CardTitle>
          <CardDescription>Loading theme preferences...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="animate-pulse space-y-4">
            <div className="h-4 bg-muted rounded w-3/4"></div>
            <div className="h-4 bg-muted rounded w-1/2"></div>
          </div>
        </CardContent>
      </Card>
    )
  }

  const currentTheme = theme === "system" ? systemTheme : theme

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Palette className="w-5 h-5" />
          Theme Settings
        </CardTitle>
        <CardDescription>Customize your viewing experience</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Theme Selection */}
        <div className="space-y-3">
          <Label className="text-sm font-medium">Choose Theme</Label>
          <RadioGroup value={theme} onValueChange={setTheme} className="grid grid-cols-1 gap-3">
            <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="light" id="light" />
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-md bg-background border">
                  <Sun className="w-4 h-4" />
                </div>
                <div>
                  <Label htmlFor="light" className="font-medium cursor-pointer">
                    Light
                  </Label>
                  <p className="text-sm text-muted-foreground">Clean and bright interface</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="dark" id="dark" />
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-md bg-background border">
                  <Moon className="w-4 h-4" />
                </div>
                <div>
                  <Label htmlFor="dark" className="font-medium cursor-pointer">
                    Dark
                  </Label>
                  <p className="text-sm text-muted-foreground">Easy on the eyes in low light</p>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-3 rounded-lg border p-3 hover:bg-muted/50 transition-colors">
              <RadioGroupItem value="system" id="system" />
              <div className="flex items-center gap-3 flex-1">
                <div className="p-2 rounded-md bg-background border">
                  <Monitor className="w-4 h-4" />
                </div>
                <div>
                  <Label htmlFor="system" className="font-medium cursor-pointer">
                    System
                  </Label>
                  <p className="text-sm text-muted-foreground">Follows your device settings ({systemTheme})</p>
                </div>
              </div>
            </div>
          </RadioGroup>
        </div>

        {/* Current Theme Display */}
        <div className="p-4 rounded-lg bg-muted/50 border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Current Theme</p>
              <p className="text-sm text-muted-foreground capitalize">
                {currentTheme} {theme === "system" && "(Auto)"}
              </p>
            </div>
            <div className="p-2 rounded-md bg-background border">
              {currentTheme === "dark" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="space-y-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label className="text-sm font-medium">Auto Theme Switching</Label>
              <p className="text-xs text-muted-foreground">
                Automatically switch between light and dark themes based on time
              </p>
            </div>
            <Switch checked={autoSwitch} onCheckedChange={setAutoSwitch} />
          </div>

          {autoSwitch && (
            <div className="pl-4 space-y-2 text-sm text-muted-foreground">
              <p>• Light theme: 6:00 AM - 6:00 PM</p>
              <p>• Dark theme: 6:00 PM - 6:00 AM</p>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="flex gap-2 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme("light")}
            className={theme === "light" ? "bg-primary text-primary-foreground" : ""}
          >
            <Sun className="w-4 h-4 mr-2" />
            Light
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme("dark")}
            className={theme === "dark" ? "bg-primary text-primary-foreground" : ""}
          >
            <Moon className="w-4 h-4 mr-2" />
            Dark
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setTheme("system")}
            className={theme === "system" ? "bg-primary text-primary-foreground" : ""}
          >
            <Monitor className="w-4 h-4 mr-2" />
            Auto
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}
