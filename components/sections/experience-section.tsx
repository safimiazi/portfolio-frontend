"use client"

import { useEffect, useState, useRef } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, MapPin } from "lucide-react"

type Experience = {
  id: number
  userId: number
  role: string
  company: string
  startDate: string
  endDate: string | null
  isCurrent: boolean
  responsibilities: string
  technologies: string[]
  createdAt: string
  updatedAt: string
}

export function ExperienceSection() {
  const sectionRef = useRef<HTMLElement | null>(null)
  const [experience, setExperience] = useState<Experience[]>([])
  const [loadingExperience, setLoadingExperience] = useState(true)

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
    <section
      id="experience"
      ref={sectionRef}
      className="py-20 relative bg-background text-foreground"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4">Work Experience</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            My professional journey and the impact I've made at each organization
          </p>
        </motion.div>

        <div className="relative max-w-4xl mx-auto">
          {/* Timeline vertical line */}
          <div className="absolute left-1/2 top-0 bottom-0 w-px bg-border transform -translate-x-1/2" />

          <div className="space-y-12">
            {experience.map((exp, index) => (
              <motion.div
                key={exp.id}
                initial={{ opacity: 0, x: index % 2 === 0 ? -80 : 80 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`relative flex ${
                  index % 2 === 0 ? "justify-start" : "justify-end"
                }`}
              >
                {/* Timeline dot */}
                <span className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-primary ring-4 ring-background" />

                <Card className="w-full sm:w-[calc(50%-2rem)] bg-card border border-border shadow-xl rounded-xl overflow-hidden">
                  <CardHeader>
                    <CardTitle className="text-xl">{exp.role}</CardTitle>
                    <p className="text-primary font-medium">{exp.company}</p>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(exp.startDate).toLocaleString("default", {
                            month: "short",
                            year: "numeric",
                          })}{" "}
                          –{" "}
                          {exp.isCurrent
                            ? "Present"
                            : new Date(exp.endDate!).toLocaleString("default", {
                                month: "short",
                                year: "numeric",
                              })}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        <span>Dhaka, Bangladesh</span>
                      </div>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {exp.responsibilities}
                    </p>

                    <div className="flex flex-wrap gap-2">
                      {exp.technologies?.map((tech, i) => (
                        <span
                          key={i}
                          className="px-3 py-1 text-xs font-medium rounded-lg bg-primary/10 text-primary border border-primary/20"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
