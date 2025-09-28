"use client"

import { useRef } from "react"
import { Swiper, SwiperSlide } from "swiper/react"
import { Navigation, Pagination, Autoplay } from "swiper/modules"
import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"

import { Button } from "../ui/button"
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react"
import ProjectCard from "../ui/project-card"

export function ProjectsSection({ projects }: any) {
  const prevRef = useRef<HTMLButtonElement | null>(null)
  const nextRef = useRef<HTMLButtonElement | null>(null)

  return (
    <section id="projects" className="py-20 bg-muted/30 relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A showcase of my recent work and the technologies I've used to build them
          </p>
        </div>

        <Swiper
          modules={[Navigation,  Autoplay]}
          spaceBetween={24}
          slidesPerView={1}
          loop={true}
          speed={4000} // smooth transition
          autoplay={{ delay: 0, disableOnInteraction: false }}
          pagination={{ clickable: true }}
          onSwiper={(swiper) => {
            // safely attach navigation buttons AFTER swiper is ready
            // @ts-ignore
            swiper.params.navigation.prevEl = prevRef.current
            // @ts-ignore
            swiper.params.navigation.nextEl = nextRef.current
            swiper.navigation.init()
            swiper.navigation.update()
          }}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          className="pb-12"
        >
          {projects?.data?.items?.map((project: any, index: number) => (
            <SwiperSlide key={project.id}>
              <ProjectCard project={project} index={index} />
            </SwiperSlide>
          ))}
        </Swiper>


        {/* Navigation buttons */}
        {/* <div className="flex justify-center gap-6 mt-6">
          <button
            ref={prevRef}
            className="p-3 rounded-full bg-primary text-primary-foreground hover:scale-110 hover:shadow-lg transition-all shadow-md"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            ref={nextRef}
            className="p-3 rounded-full bg-primary text-primary-foreground hover:scale-110 hover:shadow-lg transition-all shadow-md"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div> */}

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
