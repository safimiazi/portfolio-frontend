"use client"

import { useEffect, useRef, useState } from "react"

export function ProjectsSection({projects}: any) {
 const slideshowRefs = useRef([]);

  useEffect(() => {
    projects.forEach((project, index) => {
      const imgs = slideshowRefs.current[index].children;
      let i = 0;
      imgs[i].style.opacity = 1;
      const interval = setInterval(() => {
        imgs[i].style.opacity = 0;
        i = (i + 1) % imgs.length;
        imgs[i].style.opacity = 1;
      }, 3000);
      return () => clearInterval(interval);
    });
  }, [projects]);

  return (
   <section id="projects" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-balance">Featured Projects</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
            A showcase of my recent work and the technologies I've used to build them
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects?.map((project) => (
            <div key={project.id} className="bg-background rounded-lg shadow-lg overflow-hidden">
              <div className="relative w-full h-64">
                <div className="w-full h-full overflow-hidden" ref={(el) => (slideshowRefs.current[project.id] = el)}>
                  {project.images.map((image, index) => (
                    <img
                      key={index}
                      src={image}
                      alt={`${project.title || "Project"} image ${index + 1}`}
                      className="absolute top-0 left-0 w-full h-full object-cover transition-opacity duration-1000"
                      style={{ opacity: 0, zIndex: 0 }}
                    />
                  ))}
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{project.title || "Untitled Project"}</h3>
                <p className="text-muted-foreground mb-4">{project.shortDesc}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.usedTechnologies.map((tech) => (
                    <span key={tech} className="text-xs bg-muted px-2 py-1 rounded">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex gap-4">
                  <a href={project.liveLink} className="text-primary hover:underline">Live Demo</a>
                  <a href={project.githubFrontendLink} className="text-primary hover:underline">Code</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center mt-8">
          <a href="#" className="text-primary hover:underline">View All Projects</a>
        </div>
      </div>
    </section>
  )
}
