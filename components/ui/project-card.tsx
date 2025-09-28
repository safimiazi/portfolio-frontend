"use client"

import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

interface ProjectCardProps {
  project: any
  index: number
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <div className="bg-background rounded-lg shadow-lg overflow-hidden">
      {/* Image Carousel */}
      <div className="relative w-full h-64">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={10}
          slidesPerView={1}
          loop={true}
          autoplay={{ delay: 2500, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          navigation
          className="w-full h-full"
        >
          {project.images?.map((img: string, i: number) => (
            <SwiperSlide key={i}>
              <img
                src={img || "/placeholder.svg"}
                alt={`${project.title} image ${i + 1}`}
                className="w-full h-64 object-cover"
              />
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Project Info */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-2">{project.title || "Untitled Project"}</h3>
        <p className="text-muted-foreground mb-4">{project.shortDesc}</p>
        <div className="flex flex-wrap gap-2 mb-4">
          {project.usedTechnologies?.map((tech: string) => (
            <span key={tech} className="text-xs bg-muted px-2 py-1 rounded">
              {tech}
            </span>
          ))}
        </div>
        <div className="flex gap-4">
          {project.liveLink && (
            <a href={project.liveLink} className="text-primary hover:underline" target="_blank">
              Live Demo
            </a>
          )}
          {project.githubFrontendLink && (
            <a
              href={project.githubFrontendLink}
              className="text-primary hover:underline"
              target="_blank"
            >
              {project.githubBackendLink ? "Frontend Code" : "Code"}
            </a>
          )}
          {project.githubBackendLink && (
            <a
              href={project.githubBackendLink}
              className="text-primary hover:underline"
              target="_blank"
            >
              {project.githubFrontendLink ? "Backend Code" : "Code"}
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProjectCard
