"use client"

import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation } from "swiper/modules"

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import { Button } from "../ui/button"
import { ExternalLink } from "lucide-react"

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
            <div
              key={project.id}
              className="bg-background rounded-lg shadow-lg overflow-hidden"
            >
              
              {/* Swiper for Images */}
              <div className="relative w-full h-64">
                <Swiper
                  modules={[Navigation]}
                  navigation={{
                    prevEl: prevRefs.current[index],
                    nextEl: nextRefs.current[index],
                  }}
                  onBeforeInit={(swiper) => {
                    if (swiper.params.navigation && typeof swiper.params.navigation !== "boolean") {
                      const navigation = swiper.params.navigation as any
                      navigation.prevEl = prevRefs.current[index]
                      navigation.nextEl = nextRefs.current[index]
                    }
                  }}
                  className="w-full h-full"
                >
                  {project.images.map((image: string, i: number) => (
                    <SwiperSlide key={i}>
                      <img
                        src={image || "/placeholder.svg"}
                        alt={`${project.title || "Project"} image ${i + 1}`}
                        className="w-full h-64 object-cover"
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <button
                  ref={(el) => {
                    prevRefs.current[index] = el
                  }} className="absolute top-1/2 left-0 z-10 -translate-y-1/2 bg-black/50 text-white p-3 rounded-r-md hover:bg-black"
                >
                  ◀
                </button>
                <button
                  ref={(el) => {
                    nextRefs.current[index] = el
                  }} className="absolute top-1/2 right-0 z-10 -translate-y-1/2 bg-black/50 text-white p-3 rounded-l-md hover:bg-black"
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
