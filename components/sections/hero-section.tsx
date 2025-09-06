"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Linkedin, Mail, ExternalLink } from "lucide-react"
import { getPortfolioData } from "@/lib/portfolio-data"
import Image from "next/image"

export function HeroSection() {
  const [isVisible, setIsVisible] = useState(false)
  const portfolioData = getPortfolioData()
  const { personal } = portfolioData

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section id="home" className="min-h-screen flex items-center justify-center relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center">
          {/* Profile Image */}
          <div
            className={`mb-8 transition-all duration-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <div className="relative w-32 h-32 mx-auto mb-6">
              <Image
                src={personal.avatar || "/placeholder.svg"}
                alt={personal.name}
                fill
                className="rounded-full object-cover border-4 border-primary/20"
              />
              <div className="absolute inset-0 rounded-full bg-gradient-to-tr from-primary/20 to-accent/20 animate-pulse" />
            </div>
          </div>

          {/* Main Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-bold mb-6 text-balance">
              <span className="text-foreground">Hi, I'm </span>
              <span className="text-primary">{personal.name}</span>
            </h1>

            <h2 className="text-xl sm:text-2xl lg:text-3xl text-muted-foreground mb-8 text-balance">
              {personal.title}
            </h2>

            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-12 text-pretty">
              {personal.bio}
            </p>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <Button size="lg" className="group">
              <a href="#projects" className="flex items-center gap-2">
                View My Work
                <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>
            </Button>

            <Button variant="outline" size="lg" className="group bg-transparent">
              <a href="#contact" className="flex items-center gap-2">
                Get In Touch
                <Mail className="w-4 h-4 group-hover:scale-110 transition-transform" />
              </a>
            </Button>
          </div>

          {/* Social Links */}
          <div
            className={`flex justify-center space-x-6 mb-12 transition-all duration-1000 delay-700 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <a
              href={personal.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
            >
              <Github className="w-6 h-6" />
            </a>
            <a
              href={personal.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
            >
              <Linkedin className="w-6 h-6" />
            </a>
            <a
              href={`mailto:${personal.email}`}
              className="text-muted-foreground hover:text-primary transition-colors duration-200 hover:scale-110 transform"
            >
              <Mail className="w-6 h-6" />
            </a>
          </div>

          {/* Scroll Indicator */}
          <div
            className={`transition-all duration-1000 delay-1000 ${
              isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
            }`}
          >
            <a href="#about" className="inline-block animate-bounce">
              <ArrowDown className="w-6 h-6 text-muted-foreground hover:text-primary transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}
