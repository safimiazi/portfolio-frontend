import portfolioData from "@/data/portfolio.json"

export interface Technology {
  name: string
  level: number
}

export interface Skill {
  category: string
  technologies: Technology[]
}

export interface Project {
  id: string
  title: string
  description: string
  longDescription: string
  technologies: string[]
  images: string[]
  liveUrl: string
  githubUrl: string
  featured: boolean
  status: "completed" | "in-progress" | "planned"
  createdAt: string
}

export interface Experience {
  company: string
  position: string
  duration: string
  description: string
  achievements: string[]
}

export interface Education {
  institution: string
  degree: string
  duration: string
  gpa?: string
}

export interface Testimonial {
  name: string
  position: string
  content: string
  avatar: string
}

export interface Personal {
  name: string
  title: string
  bio: string
  email: string
  phone: string
  location: string
  avatar: string
  resume: string
  social: {
    github: string
    linkedin: string
    twitter: string
    website: string
  }
}

export interface PortfolioData {
  personal: Personal
  skills: Skill[]
  projects: Project[]
  experience: Experience[]
  education: Education[]
  testimonials: Testimonial[]
}

export const getPortfolioData = (): PortfolioData => {
  return portfolioData as PortfolioData
}

export const getFeaturedProjects = (): Project[] => {
  return portfolioData.projects.filter((project) => project.featured)
}

export const getProjectById = (id: string): Project | undefined => {
  return portfolioData.projects.find((project) => project.id === id)
}
