"use client"

import { useState, useEffect } from "react"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ThemeSettings } from "@/components/theme-settings"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Save, Bell, Shield, Database, Download } from "lucide-react"

export default function AdminSettingsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const [settings, setSettings] = useState({
    notifications: true,
    autoSave: true,
    analytics: false,
    backupFrequency: "weekly",
  })

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleSettingChange = (key: string, value: boolean | string) => {
    setSettings((prev) => ({ ...prev, [key]: value }))
  }

  return (
 
      <div className="space-y-8 max-w-4xl">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-3xl font-bold">Settings</h1>
          <p className="text-muted-foreground">Manage your portfolio and admin preferences</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Theme Settings */}
          <div
            className={`transition-all duration-1000 delay-200 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <ThemeSettings />
          </div>

          {/* General Settings */}
          <div
            className={`space-y-6 transition-all duration-1000 delay-400 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            {/* Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Notifications
                </CardTitle>
                <CardDescription>Configure your notification preferences</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Email Notifications</Label>
                    <p className="text-xs text-muted-foreground">Receive updates via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications}
                    onCheckedChange={(value) => handleSettingChange("notifications", value)}
                  />
                </div>

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Auto Save</Label>
                    <p className="text-xs text-muted-foreground">Automatically save changes</p>
                  </div>
                  <Switch
                    checked={settings.autoSave}
                    onCheckedChange={(value) => handleSettingChange("autoSave", value)}
                  />
                </div>
              </CardContent>
            </Card>

            {/* Privacy & Security */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5" />
                  Privacy & Security
                </CardTitle>
                <CardDescription>Manage your privacy and security settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-sm font-medium">Analytics</Label>
                    <p className="text-xs text-muted-foreground">Allow usage analytics collection</p>
                  </div>
                  <Switch
                    checked={settings.analytics}
                    onCheckedChange={(value) => handleSettingChange("analytics", value)}
                  />
                </div>

                <Separator />

                <div className="space-y-2">
                  <Label htmlFor="backup" className="text-sm font-medium">
                    Backup Frequency
                  </Label>
                  <select
                    id="backup"
                    value={settings.backupFrequency}
                    onChange={(e) => handleSettingChange("backupFrequency", e.target.value)}
                    className="w-full p-2 border rounded-md bg-background"
                  >
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                    <option value="never">Never</option>
                  </select>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Data Management */}
        <div
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Database className="w-5 h-5" />
                Data Management
              </CardTitle>
              <CardDescription>Import, export, and manage your portfolio data</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                <Button variant="outline" className="group bg-transparent">
                  <Download className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Export Data
                </Button>
                <Button variant="outline" className="group bg-transparent">
                  <Database className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Import Data
                </Button>
                <Button variant="outline" className="group bg-transparent">
                  <Shield className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                  Backup Now
                </Button>
              </div>

              <div className="p-4 bg-muted/50 rounded-lg">
                <p className="text-sm text-muted-foreground">
                  Last backup: <span className="font-medium">2 days ago</span>
                </p>
                <p className="text-sm text-muted-foreground">
                  Data size: <span className="font-medium">2.4 MB</span>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Save Button */}
        <div
          className={`flex justify-end transition-all duration-1000 delay-800 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Button size="lg" className="group">
            <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Save All Settings
          </Button>
        </div>
      </div>
   
  )
}
