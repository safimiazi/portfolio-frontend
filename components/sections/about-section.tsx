"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import Image from "next/image"

export function AboutSection({ profile }: any) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Build education array dynamically
  const education = [
    {
      degree: profile.education,
      institution: profile.university,
      duration: `${profile.universityStart} - ${profile.universityEnd}`,
      gpa: profile.gpa,
    },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center mb-16 transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">About Me</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            Get to know more about my background, skills, and passion for development
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* About Content */}
          <div
            className={`transition-all duration-1000 delay-300 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-10"
            }`}
          >
    

            <h3 className="text-2xl font-semibold mb-6">My Journey</h3>
            <div className="space-y-4 text-muted-foreground">
              <p className="text-pretty">{profile.bio}</p>
              <p className="text-pretty">
                I believe in writing clean, maintainable code and creating user experiences that make a difference. My
                approach combines technical expertise with creative problem-solving to deliver solutions that exceed
                expectations.
              </p>
              <p className="text-pretty">
                When I'm not coding, you can find me exploring new technologies, contributing to open-source projects,
                or sharing knowledge with the developer community.
              </p>
            </div>

            <div className="mt-8 grid grid-cols-2 gap-4">
              <div className="text-center p-4 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-primary">{profile?.projectCompleted || "20+"}</div>
                <div className="text-sm text-muted-foreground">Projects Completed</div>
              </div>
              <div className="text-center p-4 bg-card rounded-lg border">
                <div className="text-2xl font-bold text-primary">{profile.experience || "2+"}</div>
                <div className="text-sm text-muted-foreground">Years Experience</div>
              </div>
            </div>
          </div>

          {/* Education & Quick Facts */}
          <div
            className={`transition-all duration-1000 delay-500 ${
              isVisible ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"
            }`}
          >
            <Card className="mb-6">
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-4">Education</h4>
                {education.map((edu, index) => (
                  <div key={index} className="mb-4 last:mb-0">
                    <h5 className="font-medium">{edu.degree}</h5>
                    <p className="text-sm text-muted-foreground">{edu.institution}</p>
                    <p className="text-sm text-muted-foreground">{edu.duration}</p>
                    {edu.gpa && <p className="text-sm text-primary">GPA: {edu.gpa}</p>}
                  </div>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <h4 className="text-xl font-semibold mb-4">Quick Facts</h4>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Location</span>
                    <span>{profile.location}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Email</span>
                    <span className="text-primary">{profile.email}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Phone</span>
                    <span>{profile.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Experience</span>
                    <span>{profile.experience}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Resume</span>
                    <a
                      href={profile.resumeLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      View Resume
                    </a>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  )
}
