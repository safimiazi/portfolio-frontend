"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Building, Calendar, Award, Save } from "lucide-react"

interface WorkExperience {
  id: number
  role: string
  company: string
  startDate: string
  endDate?: string | null
  isCurrent: boolean
  responsibilities: string
  achievements: string[]
}

export default function ExperienceAdminPage() {
  const [experiences, setExperiences] = useState<WorkExperience[]>([])
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [formExperience, setFormExperience] = useState<Partial<WorkExperience>>({})
  const [isSaving, setIsSaving] = useState(false)

  console.log(formExperience)
  const token = localStorage.getItem("accessToken")

  useEffect(() => {
    fetchExperiences()
  }, [])

  const fetchExperiences = async () => {
    setLoading(true)
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/work-experiences/get-all`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      const data = await res.json()
      setExperiences(data.data.items)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: keyof WorkExperience, value: any) => {
    setFormExperience(prev => ({ ...prev, [field]: value }))
  }

  // New experience, user selects isCurrent
  const handleAddNew = () => {
    setIsEditing(-1)
    setFormExperience({
      company: "",
      role: "",
      startDate: "",
      endDate: "",
      isCurrent: formExperience.isCurrent || false, // initially unchecked, user selects
      responsibilities: "",
      achievements: [""],
    })
  }

  const handleEdit = (experience: WorkExperience) => {
    setIsEditing(experience.id)
    setFormExperience({ ...experience })
  }

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this experience?")) return
    try {
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/work-experiences/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      })
      setExperiences(experiences.filter(exp => exp.id !== id))
    } catch (err) {
      console.error(err)
      alert("Failed to delete experience")
    }
  }

  const handleSave = async () => {
    setIsSaving(true)
    try {
      let res
      if (isEditing === -1) {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/work-experiences/create`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formExperience),
        })
      } else {
        res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/work-experiences/${isEditing}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(formExperience),
        })
      }
      const data = await res.json()
      if (res.ok) {
        alert(isEditing === -1 ? "Experience added!" : "Experience updated!")
        setIsEditing(null)
        fetchExperiences()
      } else {
        alert(data.message || "Something went wrong")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    } finally {
      setIsSaving(false)
    }
  }

  const addAchievement = () => {
    setFormExperience(prev => ({
      ...prev,
      achievements: [...(prev.achievements || []), ""],
    }))
  }

  const updateAchievement = (index: number, value: string) => {
    const updated = [...(formExperience.achievements || [])]
    updated[index] = value
    setFormExperience(prev => ({ ...prev, achievements: updated }))
  }

  const removeAchievement = (index: number) => {
    const updated = [...(formExperience.achievements || [])].filter((_, i) => i !== index)
    setFormExperience(prev => ({ ...prev, achievements: updated }))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Experience Management</h1>
          <p className="text-muted-foreground">Manage your work experience and career history</p>
        </div>
        <Button onClick={handleAddNew}>
          <Plus className="h-4 w-4 mr-2" /> Add New Experience
        </Button>
      </div>

      {/* Add/Edit Form */}
      {isEditing !== null && (
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-5 w-5" />
              {isEditing === -1 ? "Add New Experience" : "Edit Experience"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Company</label>
                <Input
                  placeholder="Company name"
                  value={formExperience.company || ""}
                  onChange={(e) => handleInputChange("company", e.target.value)}
                  className="bg-background/50"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Position</label>
                <Input
                  placeholder="Job title"
                  value={formExperience.role || ""}
                  onChange={(e) => handleInputChange("role", e.target.value)}
                  className="bg-background/50"
                />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Start Date</label>
              <Input
                type="date"
                value={formExperience.startDate?.split("T")[0] || ""}
                onChange={(e) => handleInputChange("startDate", e.target.value)}
                className="bg-background/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">End Date</label>
              <Input
                type="date"
                value={formExperience.endDate?.split("T")[0] || ""}
                onChange={(e) => handleInputChange("endDate", e.target.value)}
                className="bg-background/50"
                disabled={formExperience.isCurrent}
              />
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="checkbox"
                checked={formExperience.isCurrent || false}
                onChange={(e) => {
                  const checked = e.target.checked
                  setFormExperience(prev => ({
                    ...prev,
                    isCurrent: checked,
                    endDate: checked ? null : prev.endDate, // clear endDate if current
                  }))
                }}
              />
              <label className="text-sm font-medium text-foreground">Current Role</label>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Responsibilities</label>
              <Textarea
                placeholder="Responsibilities"
                value={formExperience.responsibilities || ""}
                onChange={(e) => handleInputChange("responsibilities", e.target.value)}
                className="bg-background/50 min-h-[100px]"
              />
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Achievements</label>
              <div className="space-y-2">
                {(formExperience.achievements || []).map((ach, i) => (
                  <div key={i} className="flex gap-2">
                    <Input
                      placeholder="Achievement"
                      value={ach}
                      onChange={(e) => updateAchievement(i, e.target.value)}
                      className="bg-background/50"
                    />
                    {formExperience.achievements!.length > 1 && (
                      <Button variant="outline" size="sm" onClick={() => removeAchievement(i)} className="px-3">
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                ))}
                <Button variant="outline" size="sm" onClick={addAchievement} className="w-full bg-transparent">
                  <Plus className="h-4 w-4 mr-2" /> Add Achievement
                </Button>
              </div>
            </div>

            <Button onClick={handleSave} className="w-full mt-2">
              <Save className="h-4 w-4 mr-2" /> Save
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Experience List */}
      <div className="grid gap-4">
        {experiences.map((exp, index) => (
          <Card
            key={index}
            className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Building className="h-5 w-5 text-primary" />
                    {exp.company}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      {exp.role}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {new Date(exp.startDate).toLocaleDateString()} - {exp.isCurrent ? "Present" : exp.endDate ? new Date(exp.endDate).toLocaleDateString() : ""}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => handleEdit(exp)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDelete(exp.id)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 leading-relaxed">{exp.responsibilities}</p>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Key Achievements:</h4>
                <ul className="space-y-1">
                  {exp.achievements.map((ach, achIndex) => (
                    <li key={achIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {ach}
                    </li>
                  ))}
                </ul>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
