"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Plus, Edit, Trash2, Building, Calendar, Award } from "lucide-react"
import { getPortfolioData } from "@/lib/portfolio-data"

export default function ExperienceAdminPage() {
  const data = getPortfolioData()
  const [experiences, setExperiences] = useState(data.experience)
  const [isEditing, setIsEditing] = useState<number | null>(null)
  const [newExperience, setNewExperience] = useState({
    company: "",
    position: "",
    duration: "",
    description: "",
    achievements: [""],
  })

  const handleAddExperience = () => {
    if (newExperience.company && newExperience.position) {
      setExperiences([...experiences, newExperience])
      setNewExperience({
        company: "",
        position: "",
        duration: "",
        description: "",
        achievements: [""],
      })
    }
  }

  const handleDeleteExperience = (index: number) => {
    setExperiences(experiences.filter((_, i) => i !== index))
  }

  const addAchievement = () => {
    setNewExperience({
      ...newExperience,
      achievements: [...newExperience.achievements, ""],
    })
  }

  const updateAchievement = (index: number, value: string) => {
    const updatedAchievements = [...newExperience.achievements]
    updatedAchievements[index] = value
    setNewExperience({
      ...newExperience,
      achievements: updatedAchievements,
    })
  }

  const removeAchievement = (index: number) => {
    setNewExperience({
      ...newExperience,
      achievements: newExperience.achievements.filter((_, i) => i !== index),
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Experience Management</h1>
          <p className="text-muted-foreground">Manage your work experience and career history</p>
        </div>
      </div>

      {/* Add New Experience */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Plus className="h-5 w-5" />
            Add New Experience
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Company</label>
              <Input
                placeholder="Company name"
                value={newExperience.company}
                onChange={(e) => setNewExperience({ ...newExperience, company: e.target.value })}
                className="bg-background/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Position</label>
              <Input
                placeholder="Job title"
                value={newExperience.position}
                onChange={(e) => setNewExperience({ ...newExperience, position: e.target.value })}
                className="bg-background/50"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Duration</label>
            <Input
              placeholder="e.g., 2022 - Present"
              value={newExperience.duration}
              onChange={(e) => setNewExperience({ ...newExperience, duration: e.target.value })}
              className="bg-background/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
            <Textarea
              placeholder="Brief description of your role and responsibilities"
              value={newExperience.description}
              onChange={(e) => setNewExperience({ ...newExperience, description: e.target.value })}
              className="bg-background/50 min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Achievements</label>
            <div className="space-y-2">
              {newExperience.achievements.map((achievement, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Achievement or accomplishment"
                    value={achievement}
                    onChange={(e) => updateAchievement(index, e.target.value)}
                    className="bg-background/50"
                  />
                  {newExperience.achievements.length > 1 && (
                    <Button variant="outline" size="sm" onClick={() => removeAchievement(index)} className="px-3">
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button variant="outline" size="sm" onClick={addAchievement} className="w-full bg-transparent">
                <Plus className="h-4 w-4 mr-2" />
                Add Achievement
              </Button>
            </div>
          </div>

          <Button onClick={handleAddExperience} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Experience
          </Button>
        </CardContent>
      </Card>

      {/* Experience List */}
      <div className="grid gap-4">
        {experiences.map((experience, index) => (
          <Card
            key={index}
            className="bg-card/50 backdrop-blur-sm border-border/50 hover:border-primary/20 transition-all duration-300"
          >
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="space-y-2">
                  <CardTitle className="flex items-center gap-2 text-xl">
                    <Building className="h-5 w-5 text-primary" />
                    {experience.company}
                  </CardTitle>
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Award className="h-4 w-4" />
                      {experience.position}
                    </span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {experience.duration}
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm" onClick={() => setIsEditing(isEditing === index ? null : index)}>
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleDeleteExperience(index)}
                    className="text-destructive hover:text-destructive"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground mb-4 leading-relaxed">{experience.description}</p>
              <div className="space-y-2">
                <h4 className="font-medium text-foreground">Key Achievements:</h4>
                <ul className="space-y-1">
                  {experience.achievements.map((achievement, achIndex) => (
                    <li key={achIndex} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <span className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      {achievement}
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
