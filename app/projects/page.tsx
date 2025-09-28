"use client"

import { useState, useEffect } from "react"
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

  // For dynamic loading messages
  const messages = [
    'Loading Projects...',
    'Fetching Repositories...',
    'Scanning Codebase...',
    'Rendering Project Previews...',
    'Syncing Git Commits...',
    'Preparing Showcase...',
  ];
  const [currentMessage, setCurrentMessage] = useState(messages[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        const currentIndex = messages.indexOf(prev);
        const nextIndex = (currentIndex + 1) % messages.length;
        return messages[nextIndex];
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [messages]);

  // Fetch projects whenever page, limit, or order changes
  useEffect(() => {
    async function fetchProjects() {
      try {
        setLoading(true)
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/get-all-project-for-showcase?page=${page}&limit=${limit}&order=${order}`
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

  // Render loading screen
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-primary py-20">
        <div className="relative w-24 h-24 mb-6">
          <div className="absolute inset-0 border-4 border-t-transparent border-primary rounded-full animate-[spin_2s_linear_infinite]"></div>
          <div className="absolute inset-3 border-4 border-t-transparent border-primary/70 rounded-full animate-[spin_1.5s_linear_infinite_reverse]"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <svg
              className="w-10 h-10 text-primary animate-pulse"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 10l7-7m0 0l7 7m-7-7v18"
              />
            </svg>
          </div>
        </div>
        <div className="text-xl font-mono text-primary animate-[fadeIn_1s_ease-in-out]">
          {currentMessage}
        </div>
      </div>
    );
  }

  // Render projects once loaded
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={project.id} project={project} index={index} />
          ))}
        </div>

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
