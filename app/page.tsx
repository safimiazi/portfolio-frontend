"use client"
import { HeroSection } from "@/components/sections/hero-section"
import { AboutSection } from "@/components/sections/about-section"
import { SkillsSection } from "@/components/sections/skills-section"
import { ProjectsSection } from "@/components/sections/projects-section"
import { ExperienceSection } from "@/components/sections/experience-section"
import { LearningSection } from "@/components/sections/learning-section"
import { TestimonialsSection } from "@/components/sections/testimonials-section"
import { ContactSection } from "@/components/sections/contact-section"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useEffect, useState } from "react"

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
          `${process.env.NEXT_PUBLIC_API_URL}/projects/get-all-project-for-showcase?page=1&limit=10&order=desc&featured=false`
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
    return (
      <div className="p-16 flex flex-col items-center justify-center space-y-8">
        {/* Avatar skeleton */}
        <div className="relative w-40 h-40 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]"></div>
        </div>

        {/* Name skeleton */}
        <div className="w-64 h-8 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]"></div>
        </div>

        {/* Designation skeleton */}
        <div className="w-48 h-5 rounded-lg overflow-hidden relative">
          <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]"></div>
        </div>

        {/* Bio skeleton */}
        <div className="space-y-3 w-96">
          <div className="h-4 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]"></div>
          </div>
          <div className="h-4 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]"></div>
          </div>
          <div className="h-4 rounded-lg overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]"></div>
          </div>
        </div>

        {/* Action buttons skeleton */}
        <div className="flex space-x-6 mt-6">
          <div className="w-40 h-10 rounded-full bg-gray-300 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]"></div>
          </div>
          <div className="w-40 h-10 rounded-full bg-gray-300 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300 animate-[shimmer_1.5s_infinite]"></div>
          </div>
        </div>
      </div>
    );
  }


  if (!profile) {
    return <div className="p-10 text-center text-red-500">No profile found.</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <main>
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <SkillsSection />
        <ProjectsSection projects={projects} />
        <ExperienceSection />
        <LearningSection />
        <TestimonialsSection />
        <ContactSection profile={profile} />
      </main>
      <Footer profile={profile} />
    </div>
  )
}
