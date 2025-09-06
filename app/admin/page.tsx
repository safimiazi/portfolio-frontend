"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { AdminLayout } from "@/components/admin/admin-layout"
import { getPortfolioData } from "@/lib/portfolio-data"
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts"
import { Projector as Projects, Users, Code, Award } from "lucide-react"

export default function AdminDashboard() {
  const [isVisible, setIsVisible] = useState(false)
  const portfolioData = getPortfolioData()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Mock analytics data
  const projectStats = [
    { name: "Completed", value: portfolioData.projects.filter((p) => p.status === "completed").length },
    { name: "In Progress", value: portfolioData.projects.filter((p) => p.status === "in-progress").length },
    { name: "Planned", value: portfolioData.projects.filter((p) => p.status === "planned").length },
  ]

  const skillsData = portfolioData.skills.map((skill) => ({
    name: skill.category,
    count: skill.technologies.length,
    avgLevel: Math.round(skill.technologies.reduce((acc, tech) => acc + tech.level, 0) / skill.technologies.length),
  }))

  const COLORS = ["#0891b2", "#ec4899", "#f59e0b", "#10b981"]

  const stats = [
    {
      title: "Total Projects",
      value: portfolioData.projects.length,
      icon: Projects,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
    },
    {
      title: "Skills Categories",
      value: portfolioData.skills.length,
      icon: Code,
      color: "text-green-600",
      bgColor: "bg-green-100",
    },
    {
      title: "Work Experience",
      value: portfolioData.experience.length,
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100",
    },
    {
      title: "Testimonials",
      value: portfolioData.testimonials.length,
      icon: Users,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
    },
  ]

  return (

      <div className="space-y-8">
        {/* Header */}
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h1 className="text-3xl font-bold">Dashboard Overview</h1>
          <p className="text-muted-foreground">Welcome back! Here's what's happening with your portfolio.</p>
        </div>

        {/* Stats Cards */}
        <div
          className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-all duration-1000 delay-200 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {stats.map((stat, index) => (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-muted-foreground">{stat.title}</p>
                    <p className="text-3xl font-bold">{stat.value}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <stat.icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Charts */}
        <div
          className={`grid lg:grid-cols-2 gap-6 transition-all duration-1000 delay-400 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          {/* Project Status Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Project Status Distribution</CardTitle>
              <CardDescription>Overview of your project completion status</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={projectStats}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={({ name, value }) => `${name}: ${value}`}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {projectStats.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Skills Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Skills by Category</CardTitle>
              <CardDescription>Number of technologies per skill category</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={skillsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#0891b2" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <div
          className={`transition-all duration-1000 delay-600 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Card>
            <CardHeader>
              <CardTitle>Recent Projects</CardTitle>
              <CardDescription>Your latest portfolio projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {portfolioData.projects.slice(0, 5).map((project) => (
                  <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                        <Projects className="w-6 h-6 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium">{project.title}</p>
                        <p className="text-sm text-muted-foreground">{project.description}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium capitalize">{project.status.replace("-", " ")}</p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(project.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
  )
}
