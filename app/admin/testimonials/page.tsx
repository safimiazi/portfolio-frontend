"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Quote, User, Briefcase } from "lucide-react"

interface Testimonial {
  id?: number
  name: string
  position: string
  content: string
  avatar?: string
}

export default function TestimonialsAdminPage() {
      const token = localStorage.getItem("accessToken")
  const [testimonials, setTestimonials] = useState<Testimonial[]>([])
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [newTestimonial, setNewTestimonial] = useState<Testimonial>({
    name: "",
    position: "",
    content: "",
    avatar: "",
  })
  const [newAvatarFile, setNewAvatarFile] = useState<File | null>(null)
  const [editAvatarFiles, setEditAvatarFiles] = useState<Record<number, File>>({})

  // ✅ Fetch testimonials
  const fetchTestimonials = async () => {
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/get-all?limit=100&page=1`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setTestimonials(data.data.items)
    } catch (err) {
      console.error(err)
    }
  }

  useEffect(() => {
    fetchTestimonials()
  }, [])

  // ✅ Add testimonial with avatar
  const handleAddTestimonial = async () => {
    if (!newTestimonial.name || !newTestimonial.content) return alert("Name & Content required")
    try {
      const form = new FormData()
      form.append("name", newTestimonial.name)
      form.append("position", newTestimonial.position || "")
      form.append("content", newTestimonial.content)
      if (newAvatarFile) form.append("avatar", newAvatarFile)

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/create`, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      })
      const data = await res.json()
      setTestimonials([...testimonials, data.data])
      setNewTestimonial({ name: "", position: "", content: "", avatar: "" })
      setNewAvatarFile(null)
    } catch (err) {
      console.error(err)
      alert("Failed to add testimonial")
    }
  }

  // ✅ Update testimonial with avatar
  const handleUpdateTestimonial = async (id: number, index: number) => {
    const testimonial = testimonials[index]
    if (!testimonial) return
    try {
      const form = new FormData()
      form.append("name", testimonial.name)
      form.append("position", testimonial.position || "")
      form.append("content", testimonial.content)
      if (editAvatarFiles[index]) form.append("avatar", editAvatarFiles[index])

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/${id}`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` },
        body: form,
      })
      const data = await res.json()
      setTestimonials(testimonials.map((t) => (t.id === id ? data.data : t)))
      setIsEditing(null)
      setEditAvatarFiles((prev) => {
        const updated = { ...prev }
        delete updated[index]
        return updated
      })
    } catch (err) {
      console.error(err)
      alert("Failed to update testimonial")
    }
  }

  // ✅ Delete testimonial
  const handleDeleteTestimonial = async (id: number) => {
    if (!confirm("Are you sure to delete this testimonial?")) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/testimonials/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setTestimonials(testimonials.filter((t) => t.id !== id))
    } catch (err) {
      console.error(err)
      alert("Failed to delete testimonial")
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Testimonials Management</h1>
          <p className="text-muted-foreground">Manage client testimonials and recommendations</p>
        </div>
      </div>

      {/* Add New Testimonial */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Testimonial
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Name</label>
              <Input
                placeholder="Client name"
                value={newTestimonial.name}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, name: e.target.value })}
                className="bg-background/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Position</label>
              <Input
                placeholder="Job title and company"
                value={newTestimonial.position}
                onChange={(e) => setNewTestimonial({ ...newTestimonial, position: e.target.value })}
                className="bg-background/50"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Avatar (Optional)</label>
            <Input
              type="file"
              accept="image/*"
              onChange={(e) => e.target.files?.[0] && setNewAvatarFile(e.target.files[0])}
              className="bg-background/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Testimonial Content</label>
            <Textarea
              placeholder="What did they say about your work?"
              value={newTestimonial.content}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, content: e.target.value })}
              className="bg-background/50 min-h-[120px]"
            />
          </div>

          <Button onClick={handleAddTestimonial} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Testimonial
          </Button>
        </CardContent>
      </Card>

      {/* Testimonials List */}
      <div className="grid gap-4">
        {testimonials.map((testimonial, index) => (
          <Card
            key={testimonial.id || index}
            className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4 flex-1">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.name.split(" ").map((n) => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>

                  <div className="flex-1">
                    {isEditing === index ? (
                      <div className="space-y-2">
                        <Input
                          value={testimonial.name}
                          onChange={(e) => {
                            const t = [...testimonials]
                            t[index].name = e.target.value
                            setTestimonials(t)
                          }}
                        />
                        <Input
                          value={testimonial.position}
                          onChange={(e) => {
                            const t = [...testimonials]
                            t[index].position = e.target.value
                            setTestimonials(t)
                          }}
                        />
                        <Textarea
                          value={testimonial.content}
                          onChange={(e) => {
                            const t = [...testimonials]
                            t[index].content = e.target.value
                            setTestimonials(t)
                          }}
                        />
                        <Input
                          type="file"
                          accept="image/*"
                          onChange={(e) =>
                            e.target.files?.[0] &&
                            setEditAvatarFiles((prev) => ({ ...prev, [index]: e.target.files![0] }))
                          }
                        />
                        <Button onClick={() => handleUpdateTestimonial(testimonial.id!, index)} className="w-full">
                          Save Changes
                        </Button>
                      </div>
                    ) : (
                      <>
                        <CardTitle className="flex items-center gap-2 text-lg">
                          <User className="h-4 w-4 text-primary" />
                          {testimonial.name}
                        </CardTitle>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <Briefcase className="h-3 w-3" />
                          {testimonial.position}
                        </p>
                      </>
                    )}
                  </div>
                </div>

                {isEditing !== index && (
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" onClick={() => setIsEditing(index)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDeleteTestimonial(testimonial.id!)}
                      className="text-destructive hover:text-destructive"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <Quote className="h-8 w-8 text-primary/20 absolute -top-2 -left-2" />
                <p className="text-muted-foreground leading-relaxed pl-6 italic">"{testimonial.content}"</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
