"use client"

import { useEffect, useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle } from "lucide-react"

type Experience = {
  id: number
  userId: number
  role: string
  company: string
  startDate: string
  endDate: string | null
  isCurrent: boolean
  responsibilities: string
  achievements: string[]
  createdAt: string
  updatedAt: string
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [experience, setExperience] = useState<Experience[]>([])
  const [loadingExperience, setLoadingExperience] = useState(true)
  const [isVisible, setIsVisible] = useState(true)

  // Fetch work experience
  useEffect(() => {
    async function fetchExperience() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/work-experiences/get-all-showcase?page=1&limit=10&order=desc`
        )
        const data = await res.json()
        setExperience(data?.data?.items || [])
      } catch (error) {
        console.error("Failed to fetch experience:", error)
      } finally {
        setLoadingExperience(false)
      }
    }
    fetchExperience()
  }, [])



  if (loadingExperience) {
    return (
      <div className="py-20 text-center">
        <p className="text-muted-foreground">Loading work experience...</p>
      </div>
    )
  }

  return (
    <section id="experience" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Work Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            My professional journey and the impact I've made at each organization
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          {experience.map((exp, index) => (
            <Card
              key={exp.id}
              className={`transition-all duration-1000 hover:shadow-lg ${
                isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
              }`}
              style={{ transitionDelay: `${index * 300}ms` }}
            >
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <div>
                    <CardTitle className="text-xl">{exp.role}</CardTitle>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {exp.isCurrent
                      ? `${new Date(exp.startDate).getFullYear()} - Present`
                      : `${new Date(exp.startDate).getFullYear()} - ${new Date(exp.endDate!).getFullYear()}`}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <p className="text-muted-foreground text-pretty">{exp.responsibilities}</p>
                <div className="space-y-2">
                  <h4 className="font-medium">Key Achievements:</h4>
                  <ul className="space-y-2">
                    {exp.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="flex items-start gap-2">
                        <CheckCircle className="w-4 h-4 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground text-pretty">{achievement}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
