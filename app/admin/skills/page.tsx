"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Progress } from "@/components/ui/progress"
import { AdminLayout } from "@/components/admin/admin-layout"
import { getPortfolioData } from "@/lib/portfolio-data"
import { Plus, Trash2, Save, Code } from "lucide-react"

export default function AdminSkillsPage() {
  const [isVisible, setIsVisible] = useState(false)
  const portfolioData = getPortfolioData()
  const [skills, setSkills] = useState(portfolioData.skills)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const addSkillCategory = () => {
    const newCategory = {
      category: "New Category",
      technologies: [{ name: "New Technology", level: 50 }],
    }
    setSkills([...skills, newCategory])
  }

  const updateCategoryName = (index: number, name: string) => {
    const updatedSkills = [...skills]
    updatedSkills[index].category = name
    setSkills(updatedSkills)
  }

  const addTechnology = (categoryIndex: number) => {
    const updatedSkills = [...skills]
    updatedSkills[categoryIndex].technologies.push({ name: "New Technology", level: 50 })
    setSkills(updatedSkills)
  }

  const updateTechnology = (categoryIndex: number, techIndex: number, field: string, value: string | number) => {
    const updatedSkills = [...skills]
    updatedSkills[categoryIndex].technologies[techIndex] = {
      ...updatedSkills[categoryIndex].technologies[techIndex],
      [field]: value,
    }
    setSkills(updatedSkills)
  }

  const removeTechnology = (categoryIndex: number, techIndex: number) => {
    const updatedSkills = [...skills]
    updatedSkills[categoryIndex].technologies.splice(techIndex, 1)
    setSkills(updatedSkills)
  }

  const removeCategory = (categoryIndex: number) => {
    const updatedSkills = skills.filter((_, index) => index !== categoryIndex)
    setSkills(updatedSkills)
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

        {/* Skills Categories */}
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
                  {skillCategory.technologies.length} technolog{skillCategory.technologies.length !== 1 ? "ies" : "y"}
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
                        <span className="text-sm text-muted-foreground">{tech.level}%</span>
                      </div>
                      <Progress value={tech.level} className="h-2" />
                      <Input
                        type="range"
                        min="0"
                        max="100"
                        value={tech.level}
                        onChange={(e) =>
                          updateTechnology(categoryIndex, techIndex, "level", Number.parseInt(e.target.value))
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

        {skills.length === 0 && (
          <div className="text-center py-16">
            <p className="text-lg text-muted-foreground mb-4">No skill categories yet.</p>
            <Button onClick={addSkillCategory}>
              <Plus className="w-4 h-4 mr-2" />
              Add Your First Category
            </Button>
          </div>
        )}

        {/* Save Button */}
        <div className="flex justify-end">
          <Button size="lg" className="group">
            <Save className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Save Changes
          </Button>
        </div>
      </div>
  
  )
}
