"use client"

import { useState, useEffect, useRef } from "react"
import "swiper/css"
import "swiper/css/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from "@/components/ui/select"
import ProjectCard from "@/components/ui/project-card"

interface Project {
  id: string
  title: string
  shortDesc: string
  images: string[]
  usedTechnologies: string[]
  liveLink: string
  githubFrontendLink?: string
  githubBackendLink?: string
  createdAt: string
}

export function ProjectsSection() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(10)
  const [totalPages, setTotalPages] = useState(1)
  const [order, setOrder] = useState<"desc" | "asc">("desc") // desc = newest first

  // Swiper refs
  const prevRefs = useRef<any[]>([])
  const nextRefs = useRef<any[]>([])

  // Fetch projects whenever page or order changes
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/get-all-project-for-showcase?page=${page}&limit=${limit}&order=${order}&featured=false`
        )
        const data = await res.json()
        setProjects(data.data.items)
        setTotalPages(data.data.totalPages || 1)
      } catch (err) {
        console.error("Failed to fetch projects:", err)
      } finally {
        setLoading(false)
      }
    }
    fetchProjects()
  }, [page, limit, order])

  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1))
  const handleNextPage = () => setPage((p) => Math.min(p + 1, totalPages))

  if (loading) return <p className="text-center py-20">Loading projects...</p>

  return (
    <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8 gap-4">
          <h2 className="text-3xl sm:text-4xl font-bold text-balance">Featured Projects</h2>

          <div className="flex gap-4">
            <Select value={order} onValueChange={(val) => setOrder(val as "desc" | "asc")}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="desc">Newest First</SelectItem>
                <SelectItem value="asc">Oldest First</SelectItem>
              </SelectContent>
            </Select>

            <Select value={limit.toString()} onValueChange={(val) => { setLimit(Number(val)); setPage(1) }}>
              <SelectTrigger className="w-[150px]">
                <SelectValue placeholder="Projects per page" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="3">3 per page</SelectItem>
                <SelectItem value="6">6 per page</SelectItem>
                <SelectItem value="10">10 per page</SelectItem>
                <SelectItem value="12">12 per page</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />

          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center gap-4 mt-12">
          <Button onClick={handlePrevPage} disabled={page === 1}>
            Previous
          </Button>
          <span>
            Page {page} of {totalPages}
          </span>
          <Button onClick={handleNextPage} disabled={page === totalPages}>
            Next
          </Button>
        </div>
      </div>
    </section>
  )
}

export default ProjectsSection
