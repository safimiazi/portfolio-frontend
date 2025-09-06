"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { AdminLayout } from "@/components/admin/admin-layout"
import { ImageUpload } from "@/components/image-upload"
import { EnhancedImageSlider } from "@/components/enhanced-image-slider"
import { Save, ArrowLeft, Plus, X } from "lucide-react"
import Link from "next/link"

export default function NewProjectPage() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    technologies: [] as string[],
    images: [] as string[],
    liveUrl: "",
    githubUrl: "",
    featured: false,
    status: "in-progress" as "completed" | "in-progress" | "planned",
  })

  const [newTech, setNewTech] = useState("")
  const [isSaving, setIsSaving] = useState(false)

  const handleInputChange = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const addTechnology = () => {
    if (newTech.trim() && !formData.technologies.includes(newTech.trim())) {
      setFormData((prev) => ({
        ...prev,
        technologies: [...prev.technologies, newTech.trim()],
      }))
      setNewTech("")
    }
  }

  const removeTechnology = (tech: string) => {
    setFormData((prev) => ({
      ...prev,
      technologies: prev.technologies.filter((t) => t !== tech),
    }))
  }

  const handleSave = async () => {
    setIsSaving(true)
    // Simulate save operation
    await new Promise((resolve) => setTimeout(resolve, 2000))
    setIsSaving(false)
    // Here you would typically save to your backend/database
  }

  return (
    <AdminLayout>
      <div className="space-y-6 max-w-6xl">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Link href="/admin/projects">
            <Button variant="ghost" className="group">
              <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
              Back to Projects
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">Add New Project</h1>
            <p className="text-muted-foreground">Create a new project for your portfolio</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>Basic Information</CardTitle>
                <CardDescription>Essential details about your project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="title">Project Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => handleInputChange("title", e.target.value)}
                    placeholder="My Awesome Project"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="description">Short Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => handleInputChange("description", e.target.value)}
                    placeholder="A brief description of your project..."
                    rows={3}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="longDescription">Detailed Description</Label>
                  <Textarea
                    id="longDescription"
                    value={formData.longDescription}
                    onChange={(e) => handleInputChange("longDescription", e.target.value)}
                    placeholder="A comprehensive description of your project, its features, and technical details..."
                    rows={5}
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="status">Status</Label>
                    <Select value={formData.status} onValueChange={(value) => handleInputChange("status", value)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="completed">Completed</SelectItem>
                        <SelectItem value="in-progress">In Progress</SelectItem>
                        <SelectItem value="planned">Planned</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => handleInputChange("featured", e.target.checked)}
                        className="rounded"
                      />
                      Featured Project
                    </Label>
                    <p className="text-xs text-muted-foreground">Show this project prominently on the homepage</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Technologies */}
            <Card>
              <CardHeader>
                <CardTitle>Technologies Used</CardTitle>
                <CardDescription>Add the technologies and tools used in this project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex gap-2">
                  <Input
                    value={newTech}
                    onChange={(e) => setNewTech(e.target.value)}
                    placeholder="e.g., React, Node.js, MongoDB"
                    onKeyDown={(e) => e.key === "Enter" && addTechnology()}
                  />
                  <Button onClick={addTechnology} disabled={!newTech.trim()}>
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>

                <div className="flex flex-wrap gap-2">
                  {formData.technologies.map((tech) => (
                    <Badge key={tech} variant="secondary" className="group">
                      {tech}
                      <button
                        onClick={() => removeTechnology(tech)}
                        className="ml-2 hover:text-destructive transition-colors"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Links */}
            <Card>
              <CardHeader>
                <CardTitle>Project Links</CardTitle>
                <CardDescription>Links to live demo and source code</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="liveUrl">Live Demo URL</Label>
                  <Input
                    id="liveUrl"
                    value={formData.liveUrl}
                    onChange={(e) => handleInputChange("liveUrl", e.target.value)}
                    placeholder="https://myproject.vercel.app"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="githubUrl">GitHub Repository</Label>
                  <Input
                    id="githubUrl"
                    value={formData.githubUrl}
                    onChange={(e) => handleInputChange("githubUrl", e.target.value)}
                    placeholder="https://github.com/username/project"
                  />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Images and Preview */}
          <div className="space-y-6">
            {/* Image Upload */}
            <Card>
              <CardHeader>
                <CardTitle>Project Images</CardTitle>
                <CardDescription>Upload screenshots and images of your project</CardDescription>
              </CardHeader>
              <CardContent>
                <ImageUpload
                  images={formData.images}
                  onImagesChange={(images) => handleInputChange("images", images)}
                  maxImages={8}
                />
              </CardContent>
            </Card>

            {/* Preview */}
            {formData.images.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Preview</CardTitle>
                  <CardDescription>How your project will appear in the portfolio</CardDescription>
                </CardHeader>
                <CardContent>
                  <EnhancedImageSlider
                    images={formData.images}
                    alt={formData.title || "Project preview"}
                    autoPlay={true}
                    autoPlayInterval={3000}
                    showThumbnails={true}
                    showCounter={true}
                    showFullscreen={true}
                  />
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Save Button */}
        <div className="flex justify-end gap-4 pt-6 border-t">
          <Link href="/admin/projects">
            <Button variant="outline">Cancel</Button>
          </Link>
          <Button onClick={handleSave} disabled={isSaving} size="lg" className="group">
            {isSaving ? (
              "Saving..."
            ) : (
              <>
                <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Save Project
              </>
            )}
          </Button>
        </div>
      </div>
    </AdminLayout>
  )
}
