"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Plus, Edit, Trash2, Quote, User, Briefcase } from "lucide-react"
import { getPortfolioData } from "@/lib/portfolio-data"

export default function TestimonialsAdminPage() {
  const data = getPortfolioData()
  const [testimonials, setTestimonials] = useState(data.testimonials)
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [newTestimonial, setNewTestimonial] = useState({
    name: "",
    position: "",
    content: "",
    avatar: "",
  })

  const handleAddTestimonial = () => {
    if (newTestimonial.name && newTestimonial.content) {
      setTestimonials([
        ...testimonials,
        {
          ...newTestimonial,
          avatar: newTestimonial.avatar || `/placeholder.svg?height=60&width=60`,
        },
      ])
      setNewTestimonial({
        name: "",
        position: "",
        content: "",
        avatar: "",
      })
    }
  }

  const handleDeleteTestimonial = (index: number) => {
    setTestimonials(testimonials.filter((_, i) => i !== index))
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
            <label className="text-sm font-medium text-foreground mb-2 block">Avatar URL (Optional)</label>
            <Input
              placeholder="https://example.com/avatar.jpg"
              value={newTestimonial.avatar}
              onChange={(e) => setNewTestimonial({ ...newTestimonial, avatar: e.target.value })}
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
            key={index}
            className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarImage src={testimonial.avatar || "/placeholder.svg"} alt={testimonial.name} />
                    <AvatarFallback className="bg-primary/10 text-primary">
                      {testimonial.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <CardTitle className="flex items-center gap-2 text-lg">
                      <User className="h-4 w-4 text-primary" />
                      {testimonial.name}
                    </CardTitle>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Briefcase className="h-3 w-3" />
                      {testimonial.position}
                    </p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(isEditing === index ? null : index)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteTestimonial(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
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
