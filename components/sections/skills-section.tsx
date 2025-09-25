"use client"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"

type Skill = {
  id: number
  userId: number
  category: string
  name: string
  proficiency: number
  createdAt: string
  updatedAt: string
}

export function SkillsSection() {
  const [skills, setSkills] = useState<Record<string, Skill[]>>({})
  const [loadingSkills, setLoadingSkills] = useState(true)

  // Fetch skills
  useEffect(() => {
    async function fetchSkills() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/skills/get-all-for-showcase?page=1&limit=10&order=desc`
        )
        const data = await res.json()

        // ✅ Group skills by category
        const grouped = data?.data?.items?.reduce(
          (acc: Record<string, Skill[]>, skill: Skill) => {
            if (!acc[skill.category]) {
              acc[skill.category] = []
            }
            acc[skill.category].push(skill)
            return acc
          },
          {}
        )

        setSkills(grouped || {})
      } catch (error) {
        console.error("Failed to fetch skills:", error)
      } finally {
        setLoadingSkills(false)
      }
    }
    fetchSkills()
  }, [])

  if (loadingSkills) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Loading skills...</p>
      </div>
    )
  }

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Object.entries(skills).map(([category, techs], index) => (
            <Card
              key={category}
              className="transition-all duration-1000 hover:shadow-lg hover:scale-105"
              style={{ transitionDelay: `${index * 200}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-xl text-center">{category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {techs.map((tech) => (
                  <div key={tech.id} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{tech.name}</span>
                      <span className="text-sm text-muted-foreground">
                        {tech.proficiency}%
                      </span>
                    </div>
                    <Progress value={tech.proficiency} className="h-2" />
                  </div>
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
