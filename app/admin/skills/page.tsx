"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { Plus, Trash2, Save, Code } from "lucide-react"

interface Technology {
  id?: number
  name: string
  proficiency: number
}

interface SkillCategory {
  id?: number
  category: string
  technologies: Technology[]
}

export default function AdminSkillsPage() {
  const [skills, setSkills] = useState<SkillCategory[]>([])
  const [isVisible, setIsVisible] = useState(false)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    fetchSkills()
  }, [])

  // ✅ Fetch all skills from API
  const fetchSkills = async () => {
    try {
      const token = localStorage.getItem("accessToken")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/get-all?page=1&limit=100`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      if (res.ok) {
        // Transform flat skills list to category-based structure
        const grouped: Record<string, Technology[]> = {}
        data.data.items.forEach((skill: any) => {
          if (!grouped[skill.category]) grouped[skill.category] = []
          grouped[skill.category].push({ id: skill.id, name: skill.name, proficiency: skill.proficiency })
        })
        const categories: SkillCategory[] = Object.entries(grouped).map(([category, technologies]) => ({
          category,
          technologies,
        }))
        setSkills(categories)
      } else alert(data.message || "Failed to fetch skills")
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  // ✅ Add new category
  const addSkillCategory = () => {
    setSkills([...skills, { category: "New Category", technologies: [{ name: "New Technology", proficiency: 50 }] }])
  }

  // ✅ Update category name
  const updateCategoryName = (index: number, name: string) => {
    const updated = [...skills]
    updated[index].category = name
    setSkills(updated)
  }

  // ✅ Remove category
  const removeCategory = async (index: number) => {
    const category = skills[index]
    if (!confirm(`Delete category "${category.category}" and all its skills?`)) return

    try {
      const token = localStorage.getItem("accessToken")
      for (const tech of category.technologies) {
        if (tech.id) {
          await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/${tech.id}`, {
            method: "DELETE",
            headers: { Authorization: `Bearer ${token}` },
          })
        }
      }
      const updated = skills.filter((_, i) => i !== index)
      setSkills(updated)
    } catch (err) {
      console.error(err)
      alert("Failed to delete category")
    }
  }

  // ✅ Add technology to category
  const addTechnology = (categoryIndex: number) => {
    const updated = [...skills]
    updated[categoryIndex].technologies.push({ name: "New Technology", proficiency: 50 })
    setSkills(updated)
  }

  // ✅ Update technology field
  const updateTechnology = (categoryIndex: number, techIndex: number, field: string, value: string | number) => {
    const updated = [...skills]
    updated[categoryIndex].technologies[techIndex] = {
      ...updated[categoryIndex].technologies[techIndex],
      [field]: value,
    }
    setSkills(updated)
  }

  // ✅ Remove technology
  const removeTechnology = async (categoryIndex: number, techIndex: number) => {
    const tech = skills[categoryIndex].technologies[techIndex]
    if (!confirm(`Delete skill "${tech.name}"?`)) return
    if (tech.id) {
      try {
        const token = localStorage.getItem("accessToken")
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/${tech.id}`, {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        })
      } catch (err) {
        console.error(err)
        alert("Failed to delete skill")
        return
      }
    }
    const updated = [...skills]
    updated[categoryIndex].technologies.splice(techIndex, 1)
    setSkills(updated)
  }

  // ✅ Save all categories and skills (create or update)
  const handleSave = async () => {
    try {
      setSaving(true)
      const token = localStorage.getItem("accessToken")

      for (const category of skills) {
        for (const tech of category.technologies) {
          const payload = { category: category.category, name: tech.name, proficiency: tech.proficiency }
          if (tech.id) {
            // Update
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/${tech.id}`, {
              method: "PUT",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify(payload),
            })
          } else {
            // Create
            await fetch(`${process.env.NEXT_PUBLIC_API_URL}/skills/create`, {
              method: "POST",
              headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
              body: JSON.stringify(payload),
            })
          }
        }
      }

      alert("Skills saved successfully!")
      fetchSkills()
    } catch (err) {
      console.error(err)
      alert("Failed to save skills")
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div
        className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div>
          <h1 className="text-3xl font-bold">Skills Management</h1>
          <p className="text-muted-foreground">Manage your technical skills and proficiency levels</p>
        </div>
        <Button onClick={addSkillCategory} className="group">
          <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          Add Category
        </Button>
      </div>

      {/* Skill Categories */}
      <div className="grid lg:grid-cols-2 gap-6">
        {skills.map((skillCategory, categoryIndex) => (
          <Card
            key={categoryIndex}
            className={`transition-all duration-1000 hover:shadow-lg ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
            style={{ transitionDelay: `${categoryIndex * 200}ms` }}
          >
            <CardHeader className="pb-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 flex-1">
                  <Code className="w-5 h-5 text-primary" />
                  <Input
                    value={skillCategory.category}
                    onChange={(e) => updateCategoryName(categoryIndex, e.target.value)}
                    className="text-lg font-semibold border-none p-0 h-auto bg-transparent"
                  />
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => removeCategory(categoryIndex)}
                  className="text-destructive hover:text-destructive"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
              <CardDescription>
                {skillCategory.technologies.length} technolog
                {skillCategory.technologies.length !== 1 ? "ies" : "y"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              {skillCategory.technologies.map((tech, techIndex) => (
                <div key={techIndex} className="space-y-2 p-3 border rounded-lg">
                  <div className="flex items-center justify-between">
                    <Input
                      value={tech.name}
                      onChange={(e) => updateTechnology(categoryIndex, techIndex, "name", e.target.value)}
                      className="font-medium border-none p-0 h-auto bg-transparent"
                    />
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => removeTechnology(categoryIndex, techIndex)}
                      className="text-destructive hover:text-destructive h-6 w-6"
                    >
                      <Trash2 className="w-3 h-3" />
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-sm">Proficiency Level</Label>
                      <span className="text-sm text-muted-foreground">{tech.proficiency}%</span>
                    </div>
                    <Progress value={tech.proficiency} className="h-2" />
                    <Input
                      type="range"
                      min="0"
                      max="100"
                      value={tech.proficiency}
                      onChange={(e) =>
                        updateTechnology(categoryIndex, techIndex, "proficiency", Number.parseInt(e.target.value))
                      }
                      className="w-full"
                    />
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                onClick={() => addTechnology(categoryIndex)}
                className="w-full group bg-transparent"
              >
                <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Add Technology
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Button size="lg" className="group" onClick={handleSave} disabled={saving}>
          <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
          {saving ? "Saving..." : "Save Changes"}
        </Button>
      </div>
    </div>
  )
}
