"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Plus, Search, Edit, Trash2, ExternalLink, Eye } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"

// Project type matching your API
interface Project {
  id: number
  title: string | null
  shortDesc: string
  detailsDesc: string
  status: string
  isFeatured: boolean
  images: string[]
  usedTechnologies: string[]
  liveLink: string
  githubFrontendLink?: string | null
  githubBackendLink?: string | null
  createdAt: string
}

export default function AdminProjectsPage() {
  const router = useRouter()
  const [projects, setProjects] = useState<Project[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(true)
  const [isVisible, setIsVisible] = useState(false)

  // Pagination state
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(6)
  const [totalPages, setTotalPages] = useState(1)

  const fetchProjects = async () => {
    try {
      setLoading(true)
      const token = localStorage.getItem("accessToken")
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/projects/get-all-project?page=${page}&limit=${limit}&order=desc&featured=false`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
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

  useEffect(() => {
    setIsVisible(true)
    fetchProjects()
  }, [page, limit])

  const filteredProjects = projects.filter((project) =>
    (project.title || "").toLowerCase().includes(searchTerm.toLowerCase())
  )

  const handlePrevPage = () => setPage((p) => Math.max(p - 1, 1))
  const handleNextPage = () => setPage((p) => Math.min(p + 1, totalPages))

  // ✅ Delete project
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this project?")) return
    try {
      const token = localStorage.getItem("accessToken")
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/projects/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      if (res.ok) {
        alert("Project deleted successfully!")
        setProjects((prev) => prev.filter((p) => p.id !== id)) // remove from UI
      } else {
        const data = await res.json()
        alert(data.message || "Failed to delete project")
      }
    } catch (err) {
      console.error(err)
      alert("Something went wrong")
    }
  }

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading projects...</div>
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className={`flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div>
          <h1 className="text-3xl font-bold">Projects Management</h1>
          <p className="text-muted-foreground">Manage your portfolio projects</p>
        </div>
        <Link href="/admin/projects/new">
          <Button className="group">
            <Plus className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Add New Project
          </Button>
        </Link>
      </div>

      {/* Search & Limit */}
      <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-1000 delay-200 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
          <Input placeholder="Search projects..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="pl-10" />
        </div>
        <div className="text-sm text-muted-foreground flex items-center gap-4">
          <span>{filteredProjects.length} project{filteredProjects.length !== 1 ? "s" : ""} found</span>
          <select className="border rounded px-2 py-1 text-sm" value={limit} onChange={(e) => { setLimit(Number(e.target.value)); setPage(1) }}>
            <option value={3}>3 per page</option>
            <option value={6}>6 per page</option>
            <option value={10}>10 per page</option>
          </select>
        </div>
      </div>

      {/* Projects Grid */}
      <div className={`grid md:grid-cols-2 lg:grid-cols-3 gap-6 transition-all duration-1000 delay-400 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
        {filteredProjects.map((project, index) => (
          <Card key={project.id} className="group overflow-hidden hover:shadow-lg transition-all duration-300" style={{ transitionDelay: `${index * 100}ms` }}>
            <div className="relative h-48 overflow-hidden">
              <Image src={project.images[0] || "/placeholder.svg"} alt={project.title || "Untitled Project"} fill className="object-cover transition-transform duration-300 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              {/* Status Badge */}
              <div className="absolute top-3 right-3">
                <Badge variant={project.status === "completed" ? "default" : project.status === "in-progress" ? "secondary" : "outline"} className="capitalize">
                  {project.status}
                </Badge>
              </div>

              {/* Featured Badge */}
              {project.isFeatured && (
                <div className="absolute top-3 left-3">
                  <Badge variant="destructive">Featured</Badge>
                </div>
              )}

              {/* Action Buttons */}
              <div className="absolute bottom-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                {/* <Link href={`/projects/${project.id}`} target="_blank">
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Eye className="w-4 h-4" />
                  </Button>
                </Link> */}
                <Link href={`/admin/projects/${project.id}`}>
                  <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                    <Edit className="w-4 h-4" />
                  </Button>
                </Link>
                <Button size="sm" variant="destructive" className="h-8 w-8 p-0" onClick={() => handleDelete(project.id)}>
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            <CardHeader className="pb-3">
              <CardTitle className="text-lg line-clamp-1">{project.title || "Untitled Project"}</CardTitle>
              <CardDescription className="line-clamp-2">{project.shortDesc}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-1">
                {project.usedTechnologies.slice(0, 3).map((tech) => (
                  <Badge key={tech} variant="secondary" className="text-xs">{tech}</Badge>
                ))}
                {project.usedTechnologies.length > 3 && (
                  <Badge variant="outline" className="text-xs">+{project.usedTechnologies.length - 3}</Badge>
                )}
              </div>
              <div className="flex gap-2">
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
              <div className="text-xs text-muted-foreground">Created: {new Date(project.createdAt).toLocaleDateString()}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center items-center gap-4 mt-6">
        <Button onClick={handlePrevPage} disabled={page === 1}>Previous</Button>
        <span>Page {page} of {totalPages}</span>
        <Button onClick={handleNextPage} disabled={page === totalPages}>Next</Button>
      </div>

      {filteredProjects.length === 0 && (
        <div className="text-center py-16">
          <p className="text-lg text-muted-foreground">No projects found matching your search.</p>
          <Button variant="outline" onClick={() => setSearchTerm("")} className="mt-4">Clear Search</Button>
        </div>
      )}
    </div>
  )
}
