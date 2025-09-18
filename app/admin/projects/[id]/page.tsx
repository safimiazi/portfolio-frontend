"use client"

import { useEffect, useState } from "react"
import { useRouter, useParams } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Plus, Save, X } from "lucide-react"
import { ImageUploadWithFile } from "@/components/image-upload-with-file"

export default function EditProjectPage() {
  const router = useRouter()
  const params = useParams()
  const projectId = params.id

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    longDescription: "",
    technologies: [] as string[],
    images: [] as File[],
    liveUrl: "",
    githubFrontendURL: "",
    githubBackendURL: "",

    featured: false,
    status: "in-progress" as "completed" | "in-progress" | "planned",
  })
  const [newTech, setNewTech] = useState("")
  const [loading, setLoading] = useState(true)
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

  // Fetch project details
  useEffect(() => {
    async function fetchProject() {
      try {
        setLoading(true)
        const token = localStorage.getItem("accessToken")
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
          headers: { Authorization: `Bearer ${token}` },
        })
        const data = await res.json()
        if (res.ok) {
          setFormData({
            title: data.title || "",
            description: data.shortDesc || "",
            longDescription: data.detailsDesc || "",
            technologies: data.usedTechnologies || [],
            images: [], // Use File[] via upload, URLs not editable
            liveUrl: data.liveLink || "",
            githubFrontendURL: data.githubFrontendLink || "",
            githubBackendURL: data.githubBackendURL || "",

            featured: data.isFeatured || false,
            status: data.status || "in-progress",
          })
        } else {
          alert(data.message || "Failed to fetch project")
        }
      } catch (err) {
        console.error(err)
        alert("Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchProject()
  }, [projectId])

  const handleUpdate = async () => {
    setIsSaving(true)
    try {
      const token = localStorage.getItem("accessToken")
      const payload = new FormData()
      payload.append("title", formData.title)
      payload.append("shortDesc", formData.description)
      payload.append("detailsDesc", formData.longDescription)
      payload.append("status", formData.status)
      payload.append("isFeatured", String(formData.featured))
      payload.append("usedTechnologies", JSON.stringify(formData.technologies))
      payload.append("liveLink", formData.liveUrl)
      payload.append("githubFrontendLink", formData.githubFrontendURL)
      payload.append("githubBackendLink", formData.githubBackendURL)

      formData.images.forEach((file) => {
        payload.append("images", file)
      })

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${projectId}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: payload,
      })

      const data = await res.json()
      if (res.ok) {
        alert("Project updated successfully!")
        router.push("/admin/projects")
      } else {
        alert(data.message || "Failed to update project")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setIsSaving(false)
    }
  }

  if (loading) return <div>Loading project details...</div>

  return (
    <div className="space-y-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/admin/projects">
          <Button variant="ghost" className="group">
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Projects
          </Button>
        </Link>
        <div>
          <h1 className="text-3xl font-bold">Edit Project</h1>
          <p className="text-muted-foreground">Update details for your project</p>
        </div>
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* Left Column: Form */}
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
                  placeholder="A comprehensive description of your project..."
                  rows={5}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleInputChange("status", value)}
                  >
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

          {/* Project Links */}
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
                <Label htmlFor="githubFrontendURL">GitHub Frontend Repository</Label>
                <Input
                  id="githubFrontendURL"
                  value={formData.githubFrontendURL}
                  onChange={(e) => handleInputChange("githubFrontendURL", e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="githubBackendURL">GitHub Backend Repository</Label>
                <Input
                  id="githubBackendURL"
                  value={formData.githubBackendURL}
                  onChange={(e) => handleInputChange("githubBackendURL", e.target.value)}
                  placeholder="https://github.com/username/project"
                />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Images */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Images</CardTitle>
              <CardDescription>Upload screenshots and images of your project</CardDescription>
            </CardHeader>
            <CardContent>
              <ImageUploadWithFile
                images={formData.images}
                onImagesChange={(images) => handleInputChange("images", images)}
                maxImages={8}
              />
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end gap-4 pt-6 border-t">
        <Link href="/admin/projects">
          <Button variant="outline">Cancel</Button>
        </Link>
        <Button onClick={handleUpdate} disabled={isSaving} size="lg" className="group">
          {isSaving ? (
            "Updating..."
          ) : (
            <>
              <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
              Update Project
            </>
          )}
        </Button>
      </div>
    </div>
  )
}
