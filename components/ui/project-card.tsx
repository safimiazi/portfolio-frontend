"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import { useRef } from "react"

interface ProjectCardProps {
  project: any
  index: number
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const prevRefs = useRef<any[]>([])
  const nextRefs = useRef<any[]>([])

  return (
    <div className="bg-background rounded-lg shadow-lg overflow-hidden">
      {/* Swiper */}
      <div className="relative w-full h-64">
        <Swiper
          modules={[Navigation]}
          navigation={{
            prevEl: prevRefs.current[index],
            nextEl: nextRefs.current[index],
          }}
          onBeforeInit={(swiper) => {
            if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
              const nav = swiper.params.navigation as any
              nav.prevEl = prevRefs.current[index]
              nav.nextEl = nextRefs.current[index]
            }
          }}
          className="w-full h-full"
        >
          {project.images.map((img: string, i: number) => (
            <SwiperSlide key={i}>
              <img
                src={img || "/placeholder.svg"}
                alt={`${project.title} image ${i + 1}`}
                className="w-full h-64 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Swiper Buttons */}
        <button
          ref={(el) => { (prevRefs.current[index] = el) }}
          className="absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-black/50 text-white p-3 rounded-r-md hover:bg-black"
        >
          ◀
        </button>
        <button
          ref={(el) => { (nextRefs.current[index] = el) }}
          className="absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-black/50 text-white p-3 rounded-l-md hover:bg-black"
        >
          ▶
        </button>
      </div>

   {/* Project Info */}
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title || "Untitled Project"}</h3>
                <p className="text-muted-foreground mb-4">{project.shortDesc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.usedTechnologies.map((tech: string) => (
                    <span key={tech} className="text-xs bg-muted px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.liveLink} className="text-primary hover:underline">
                    Live Demo
                  </a>
                  {
                    project.githubFrontendLink != null && <a href={project.githubFrontendLink} className="text-primary hover:underline">
                      {project.githubBackendLink === null ? "Code" : "Frontend Code"}
                    </a>
                  }
                  {
                    project.githubBackendLink != null && <a href={project.githubBackendLink} className="text-primary hover:underline">
                      {project.githubFrontendLink === null ? "Code" : "Backend Code"}
                    </a>
                  }

                </div>
              </div>
    </div>
  )
}

export default ProjectCard
