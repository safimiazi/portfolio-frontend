"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ArrowLeft, ExternalLink, Github, ChevronLeft, ChevronRight } from "lucide-react"
import { getProjectById, getPortfolioData } from "@/lib/portfolio-data"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import Image from "next/image"
import Link from "next/link"
import { notFound } from "next/navigation"

interface ProjectDetailPageProps {
  params: {
    id: string
  }
}

export default function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [isVisible, setIsVisible] = useState(false)

  const project = getProjectById(params.id)

  if (!project) {
    notFound()
  }

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % project.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + project.images.length) % project.images.length)
  }

  const portfolioData = getPortfolioData()
  const relatedProjects = portfolioData.projects
    .filter((p) => p.id !== project.id && p.technologies.some((tech) => project.technologies.includes(tech)))
    .slice(0, 3)

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <main className="pt-20">
        {/* Back Button */}
        <section className="py-6 border-b">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Link href="/projects">
              <Button variant="ghost" className="group">
                <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
                Back to Projects
              </Button>
            </Link>
          </div>
        </section>

        {/* Project Header */}
        <section className="py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div
              className={`transition-all duration-1000 ${
                isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
            >
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Project Images Slider */}
                <div className="space-y-4">
                  <div className="relative aspect-video rounded-lg overflow-hidden bg-muted">
                    <Image
                      src={project.images[currentImageIndex] || "/placeholder.svg"}
                      alt={`${project.title} - Screenshot ${currentImageIndex + 1}`}
                      fill
                      className="object-cover"
                    />

                    {/* Navigation Arrows */}
                    {project.images.length > 1 && (
                      <>
                        <button
                          onClick={prevImage}
                          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                          onClick={nextImage}
                          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                        >
                          <ChevronRight className="w-5 h-5" />
                        </button>
                      </>
                    )}

                    {/* Image Counter */}
                    {project.images.length > 1 && (
                      <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
                        {currentImageIndex + 1} / {project.images.length}
                      </div>
                    )}
                  </div>

                  {/* Thumbnail Navigation */}
                  {project.images.length > 1 && (
                    <div className="flex gap-2 overflow-x-auto pb-2">
                      {project.images.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative w-20 h-12 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors ${
                            index === currentImageIndex ? "border-primary" : "border-transparent"
                          }`}
                        >
                          <Image
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                          />
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Project Info */}
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center gap-3 mb-4">
                      <h1 className="text-3xl sm:text-4xl font-bold text-balance">{project.title}</h1>
                      <Badge
                        variant={
                          project.status === "completed"
                            ? "default"
                            : project.status === "in-progress"
                              ? "secondary"
                              : "outline"
                        }
                        className="capitalize"
                      >
                        {project.status.replace("-", " ")}
                      </Badge>
                      {project.featured && <Badge variant="destructive">Featured</Badge>}
                    </div>
                    <p className="text-lg text-muted-foreground text-pretty">{project.description}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">About This Project</h3>
                    <p className="text-muted-foreground text-pretty">{project.longDescription}</p>
                  </div>

                  <div>
                    <h3 className="text-xl font-semibold mb-3">Technologies Used</h3>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="flex gap-4 pt-4">
                    <Button size="lg" className="group">
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <ExternalLink className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        View Live Project
                      </a>
                    </Button>
                    <Button size="lg" variant="outline" className="group bg-transparent">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
                        View Source Code
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="py-16 bg-muted/30">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div
                className={`transition-all duration-1000 delay-500 ${
                  isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
                }`}
              >
                <h2 className="text-2xl font-bold mb-8 text-center">Related Projects</h2>
                <div className="grid md:grid-cols-3 gap-6">
                  {relatedProjects.map((relatedProject) => (
                    <Card key={relatedProject.id} className="group overflow-hidden hover:shadow-lg transition-shadow">
                      <Link href={`/projects/${relatedProject.id}`}>
                        <div className="relative h-32 overflow-hidden">
                          <Image
                            src={relatedProject.images[0] || "/placeholder.svg"}
                            alt={relatedProject.title}
                            fill
                            className="object-cover group-hover:scale-110 transition-transform duration-300"
                          />
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg group-hover:text-primary transition-colors">
                            {relatedProject.title}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-sm text-muted-foreground text-pretty line-clamp-2">
                            {relatedProject.description}
                          </p>
                        </CardContent>
                      </Link>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
