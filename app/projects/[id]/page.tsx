"use client"

import { useEffect, useState } from "react"
import { useParams } from "next/navigation"
import { motion } from "framer-motion" // Optional: Add for animations (install with `npm install framer-motion`)

const ProjectDetails = () => {
  const { id } = useParams() // project id
  const [project, setProject] = useState<any>(null)

  // Loading message state and cycling logic
  const messages = [
    'Fetching Projects...',
    'Building Experience Showcase...',
    'Crafting Skills Display...',
    'Preparing Contact Info...',
    'Polishing UI...',
  ]
  const [currentMessage, setCurrentMessage] = useState(messages[0])

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => {
        const currentIndex = messages.indexOf(prev)
        const nextIndex = (currentIndex + 1) % messages.length
        return messages[nextIndex]
      })
    }, 2500)

    return () => clearInterval(interval)
  }, [messages])

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/project/${id}`
        )
        const result = await res.json()

        // Set only the project data
        setProject(result.data)
      } catch (error) {
        console.error(error)
      }
    }

    fetchProject()
  }, [id])

  // Render loading state or project details
  if (!project) {
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
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-white dark:from-gray-900 dark:via-gray-800 dark:to-black text-gray-900 dark:text-gray-100 py-12 px-4 sm:px-6 lg:px-8">
      {/* Decorative Background Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>


      <motion.div
        className="max-w-5xl mx-auto bg-white/90 dark:bg-gray-800/90 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-gray-200 dark:border-gray-700"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Project Title */}
        <motion.h1
          className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-primary to-blue-500 dark:from-primary dark:to-blue-700 bg-clip-text text-transparent"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          {project.title}
        </motion.h1>

        {/* Description */}
        <motion.p
          className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {project.detailsDesc}
        </motion.p>

        {/* Images Gallery */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
        >
          {project.images?.map((img: string, i: number) => (
            <motion.img
              key={i}
              src={img}
              alt={`${project.title} image ${i + 1}`}
              className="rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 object-cover w-full h-48 border border-gray-200 dark:border-gray-700"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            />
          ))}
        </motion.div>

        {/* Technologies */}
        <motion.div
          className="mb-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          <h3 className="text-xl font-semibold text-primary mb-4">Technologies Used</h3>
          <div className="flex flex-wrap gap-2">
            {project.usedTechnologies?.map((tech: string) => (
              <span
                key={tech}
                className="bg-primary/20 text-primary dark:bg-primary/30 dark:text-primary-foreground text-sm px-3 py-1 rounded-full hover:bg-primary/30 dark:hover:bg-primary/40 transition-colors duration-200 cursor-default"
              >
                {tech}
              </span>
            ))}
          </div>
        </motion.div>

        {/* Links */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          {project.liveLink && (
            <a
              href={project.liveLink}
              className="text-primary hover:text-primary-dark font-medium underline underline-offset-4 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Live Demo
            </a>
          )}
          {project.githubFrontendLink && (
            <a
              href={project.githubFrontendLink}
              className="text-primary hover:text-primary-dark font-medium underline underline-offset-4 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Frontend Code
            </a>
          )}
          {project.githubBackendLink && (
            <a
              href={project.githubBackendLink}
              className="text-primary hover:text-primary-dark font-medium underline underline-offset-4 transition-colors duration-200"
              target="_blank"
              rel="noopener noreferrer"
            >
              Backend Code
            </a>
          )}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default ProjectDetails