"use client"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { LearningSection } from "@/components/sections/learning-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"
import LoadingComponent from "@/components/sections/LoadingComponent"

export default function HomePage() {
  const [profile, setProfile] = useState<any>(null)
  const [projects, setProjects] = useState<any[]>([])
  const [loadingProfile, setLoadingProfile] = useState(true)
  const [loadingProjects, setLoadingProjects] = useState(true)

  useEffect(() => {
    async function fetchProfile() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/profile/get-my-profile/1`
        );
        const data = await res.json();
        setProfile(data.data); // assuming NestJS wraps it inside { data: ... }
      } catch (error) {
        console.error("Failed to fetch profile:", error);
      } finally {
        setLoadingProfile(false);
      }
    }

    fetchProfile();
  }, []);

  // Fetch projects
  useEffect(() => {
    async function fetchProjects() {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/projects/get-all-project-for-showcase?page=1&limit=10&order=desc&featured=true`
        )
        const data = await res.json()
        setProjects(data) // assuming NestJS wraps it in { data: { items, ... } }
      } catch (error) {
        console.error("Failed to fetch projects:", error)
      } finally {
        setLoadingProjects(false)
      }
    }
    fetchProjects()
  }, [])


  if (loadingProfile || loadingProjects) {
    return <LoadingComponent/>
  }


  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-[260px] p-6">
        <div className="w-full max-w-2xl bg-white/80 dark:bg-slate-800/70 backdrop-blur-md rounded-2xl shadow-lg border border-slate-200 dark:border-slate-700 overflow-hidden">
          <div className="flex flex-col md:flex-row items-center gap-6 p-6 md:p-8">
            {/* Illustration */}
            <div className="flex-shrink-0">
              <div className="w-36 h-36 md:w-40 md:h-40 bg-gradient-to-br from-sky-400 to-indigo-600 rounded-xl flex items-center justify-center shadow-inner">
                {/* simple code / profile icon */}
                <svg xmlns="http://www.w3.org/2000/svg" className="w-20 h-20 text-white opacity-95" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path stroke="none" d="M0 0h24v24H0z" />
                  <path d="M12 12a4 4 0 1 0 -4 -4a4 4 0 0 0 4 4z" strokeWidth="1.5" />
                  <path d="M6 20c1.333 -2 3.333 -3 6 -3s4.667 1 6 3" strokeWidth="1.5" />
                </svg>
              </div>
            </div>

            {/* Text */}
            <div className="flex-1 text-center md:text-left">
              <h3 className="text-2xl md:text-3xl font-semibold text-slate-900 dark:text-white">Profile not found</h3>
              <p className="mt-2 text-sm md:text-base text-slate-600 dark:text-slate-300">
                Looks like you haven’t created a profile yet. Once available, this section will display your name, designation, experience,
                and other important details.
              </p>

              <div className="mt-5 flex flex-col sm:flex-row items-center sm:items-stretch gap-3 sm:gap-4 justify-center md:justify-start">
                {/* Add buttons/links if needed */}
              </div>

              <p className="mt-4 text-xs text-slate-400">
                Pro tip: Keeping your profile complete increases your chances with jobs/clients. You can also add your
                <span className="font-medium"> Portfolio</span> and
                <span className="font-medium"> GitHub</span> links.
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection />
        {
          projects && <ProjectsSection projects={projects} />

        }
        <ExperienceSection />
        <LearningSection />
        {/* <TestimonialsSection /> */}
        <ContactSection profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  )
}
