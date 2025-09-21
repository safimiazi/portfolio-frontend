"use client"

import { useRef } from "react"


import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Button } from "../ui/button"
import { ExternalLink } from "lucide-react"
import ProjectCard from "../ui/project-card"

export function ProjectsSection({ projects }: any) {
  // Array of refs for multiple sliders
  const prevRefs = useRef<any[]>([])
  const nextRefs = useRef<any[]>([])

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A showcase of my recent work and the technologies I've used to build them
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects?.data?.items?.map((project: any, index: number) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>
      </div>

      <div className="text-center mt-12">
        <Button variant="outline" size="lg">
          <a href="/projects" className="flex items-center gap-2">
            View All Projects
            <ExternalLink className="w-4 h-4" />
          </a>
        </Button>
      </div>
    </section>
  )
}
