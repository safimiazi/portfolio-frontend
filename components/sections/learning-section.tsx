"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Code, Target, ExternalLink, BookOpen, Zap } from "lucide-react"
import { getPortfolioData } from "@/lib/portfolio-data"

export function LearningSection() {
  const data = getPortfolioData()
  const { learning } = data

  // Define the reusable gradient classes
  const primaryGradientText = "bg-gradient-to-r from-primary via-primary to-primary bg-clip-text text-transparent"
  const primaryGradientBorder = "border border-primary/20"
  const primaryGradientBg = "bg-gradient-to-br from-card/80 to-primary/5"

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2 },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-background via-background to-primary/5">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.h2
            variants={itemVariants}
            className={`text-4xl font-bold mb-4 ${primaryGradientText}`}
          >
            Learning & Goals
          </motion.h2>
          <motion.div
            variants={itemVariants}
            className="w-20 h-1 bg-gradient-to-r from-primary via-primary to-primary mx-auto mb-6 rounded-full"
          />
          <motion.p
            variants={itemVariants}
            className="text-lg text-muted-foreground max-w-2xl mx-auto text-balance"
          >
            What I'm currently learning and where I'm headed
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 mb-12">
          {/* Current Learning */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}>
            <Card
              className={`h-full ${primaryGradientBg} backdrop-blur-sm ${primaryGradientBorder} hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10`}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className={`p-3 rounded-xl ${primaryGradientBg} ${primaryGradientBorder}`}>
                    <Code className="h-6 w-6 text-primary" />
                  </div>
                  <span className={primaryGradientText}>Current Learning</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {learning.currentLearning.map((item, index) => (
                  <motion.div
                    key={index}
                    className="space-y-3 p-4 rounded-lg bg-background/50 border border-primary/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-primary" />
                      {item.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-pretty">{item.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {item.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}

                {/* Coding Profiles */}
                <div className="pt-4 border-t border-primary/20">
                  <h4 className="text-md font-semibold mb-4 text-foreground flex items-center gap-2">
                    <Zap className="h-4 w-4 text-primary" />
                    Coding Profiles
                  </h4>
                  <div className="space-y-3">
                    {learning.codingProfiles.map((profile, index) => (
                      <motion.a
                        key={index}
                        href={profile.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-between p-4 rounded-xl ${primaryGradientBg} ${primaryGradientBorder} hover:border-primary/30 transition-all duration-300 group hover:shadow-md`}
                        whileHover={{ scale: 1.02, x: 4 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className={`p-2 rounded-lg ${primaryGradientBg} ${primaryGradientBorder} group-hover:from-primary/30 group-hover:to-primary/20 transition-all`}>
                            <Code className="h-4 w-4 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-foreground group-hover:text-primary transition-colors">
                              {profile.platform}
                            </p>
                            <p className="text-sm text-muted-foreground">{profile.username}</p>
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
                      </motion.a>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Future Goals */}
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants}>
            <Card
              className={`h-full ${primaryGradientBg} backdrop-blur-sm ${primaryGradientBorder} hover:border-primary/40 transition-all duration-500 hover:shadow-lg hover:shadow-primary/10`}
            >
              <CardHeader className="pb-4">
                <CardTitle className="flex items-center gap-3 text-xl">
                  <div className={`p-3 rounded-xl ${primaryGradientBg} ${primaryGradientBorder}`}>
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <span className={primaryGradientText}>Future Goals</span>
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {learning.futureGoals.map((goal, index) => (
                  <motion.div
                    key={index}
                    className="space-y-3 p-4 rounded-lg bg-background/50 border border-primary/10"
                    whileHover={{ scale: 1.02 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                      <Target className="h-4 w-4 text-primary" />
                      {goal.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-pretty">{goal.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {goal.tags.map((tag, tagIndex) => (
                        <Badge
                          key={tagIndex}
                          variant="secondary"
                          className="text-xs bg-primary/10 text-primary border-primary/20 hover:bg-primary/20 transition-colors"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Follow Learning Journey Button */}
        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={itemVariants} className="text-center">
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Button
              size="lg"
              className="bg-gradient-to-r from-primary via-primary to-primary hover:from-primary/90 hover:via-primary/90 hover:to-primary/90 text-primary-foreground px-8 py-3 shadow-lg hover:shadow-xl transition-all duration-300 border border-primary/20"
            >
              <Target className="mr-2 h-5 w-5" />
              Follow My Learning Journey
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
