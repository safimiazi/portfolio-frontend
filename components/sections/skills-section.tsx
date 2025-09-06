"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { getPortfolioData } from "@/lib/portfolio-data"

export function SkillsSection() {
  const [isVisible, setIsVisible] = useState(false)
  const [animatedValues, setAnimatedValues] = useState<{ [key: string]: number }>({})
  const sectionRef = useRef<HTMLElement>(null)
  const portfolioData = getPortfolioData()
  const { skills } = portfolioData

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          // Animate progress bars
          skills.forEach((skillCategory) => {
            skillCategory.technologies.forEach((tech) => {
              setTimeout(() => {
                setAnimatedValues((prev) => ({
                  ...prev,
                  [tech.name]: tech.level,
                }))
              }, Math.random() * 1000)
            })
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [skills])

  return (
    <section id="skills" ref={sectionRef} className="py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Skills & Technologies</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Here are the technologies and tools I work with to bring ideas to life
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((skillCategory, categoryIndex) => (
            <Card
              key={skillCategory.category}
              className={`transition-all duration-1000 hover:shadow-lg hover:scale-105 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ transitionDelay: `${categoryIndex * 200}ms` }}
            >
              <CardHeader>
                <CardTitle className="text-xl text-center">{skillCategory.category}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {skillCategory.technologies.map((tech) => (
                  <div key={tech.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium">{tech.name}</span>
                      <span className="text-sm text-muted-foreground">{animatedValues[tech.name] || 0}%</span>
                    </div>
                    <Progress value={animatedValues[tech.name] || 0} className="h-2" />
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
