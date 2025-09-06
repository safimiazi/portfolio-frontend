"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Plus, Trash2, Code, Target, ExternalLink } from "lucide-react"
import { getPortfolioData } from "@/lib/portfolio-data"

export default function LearningAdminPage() {
  const data = getPortfolioData()
  const [learning, setLearning] = useState(data.learning)
  const [newCurrentLearning, setNewCurrentLearning] = useState({
    title: "",
    description: "",
    tags: [""],
  })
  const [newFutureGoal, setNewFutureGoal] = useState({
    title: "",
    description: "",
    tags: [""],
  })
  const [newCodingProfile, setNewCodingProfile] = useState({
    platform: "",
    username: "",
    url: "",
    icon: "code",
  })

  const addTag = (type: "current" | "future", setter: any, current: any) => {
    setter({
      ...current,
      tags: [...current.tags, ""],
    })
  }

  const updateTag = (type: "current" | "future", index: number, value: string, setter: any, current: any) => {
    const updatedTags = [...current.tags]
    updatedTags[index] = value
    setter({
      ...current,
      tags: updatedTags,
    })
  }

  const removeTag = (type: "current" | "future", index: number, setter: any, current: any) => {
    setter({
      ...current,
      tags: current.tags.filter((_: any, i: number) => i !== index),
    })
  }

  const handleAddCurrentLearning = () => {
    if (newCurrentLearning.title && newCurrentLearning.description) {
      setLearning({
        ...learning,
        currentLearning: [
          ...learning.currentLearning,
          {
            ...newCurrentLearning,
            tags: newCurrentLearning.tags.filter((tag) => tag.trim() !== ""),
          },
        ],
      })
      setNewCurrentLearning({ title: "", description: "", tags: [""] })
    }
  }

  const handleAddFutureGoal = () => {
    if (newFutureGoal.title && newFutureGoal.description) {
      setLearning({
        ...learning,
        futureGoals: [
          ...learning.futureGoals,
          {
            ...newFutureGoal,
            tags: newFutureGoal.tags.filter((tag) => tag.trim() !== ""),
          },
        ],
      })
      setNewFutureGoal({ title: "", description: "", tags: [""] })
    }
  }

  const handleAddCodingProfile = () => {
    if (newCodingProfile.platform && newCodingProfile.username && newCodingProfile.url) {
      setLearning({
        ...learning,
        codingProfiles: [...learning.codingProfiles, newCodingProfile],
      })
      setNewCodingProfile({ platform: "", username: "", url: "", icon: "code" })
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Learning & Goals Management</h1>
          <p className="text-muted-foreground">Manage your learning journey and future goals</p>
        </div>
      </div>

      {/* Current Learning */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Code className="h-5 w-5" />
            Add Current Learning
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
            <Input
              placeholder="What are you currently learning?"
              value={newCurrentLearning.title}
              onChange={(e) => setNewCurrentLearning({ ...newCurrentLearning, title: e.target.value })}
              className="bg-background/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
            <Textarea
              placeholder="Describe your current learning focus"
              value={newCurrentLearning.description}
              onChange={(e) => setNewCurrentLearning({ ...newCurrentLearning, description: e.target.value })}
              className="bg-background/50 min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Tags</label>
            <div className="space-y-2">
              {newCurrentLearning.tags.map((tag, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Technology or skill"
                    value={tag}
                    onChange={(e) =>
                      updateTag("current", index, e.target.value, setNewCurrentLearning, newCurrentLearning)
                    }
                    className="bg-background/50"
                  />
                  {newCurrentLearning.tags.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeTag("current", index, setNewCurrentLearning, newCurrentLearning)}
                      className="px-3"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addTag("current", setNewCurrentLearning, newCurrentLearning)}
                className="w-full bg-transparent"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Tag
              </Button>
            </div>
          </div>

          <Button onClick={handleAddCurrentLearning} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Current Learning
          </Button>
        </CardContent>
      </Card>

      {/* Future Goals */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Add Future Goal
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Title</label>
            <Input
              placeholder="What's your future goal?"
              value={newFutureGoal.title}
              onChange={(e) => setNewFutureGoal({ ...newFutureGoal, title: e.target.value })}
              className="bg-background/50"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Description</label>
            <Textarea
              placeholder="Describe your future learning goals"
              value={newFutureGoal.description}
              onChange={(e) => setNewFutureGoal({ ...newFutureGoal, description: e.target.value })}
              className="bg-background/50 min-h-[100px]"
            />
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Tags</label>
            <div className="space-y-2">
              {newFutureGoal.tags.map((tag, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Technology or skill"
                    value={tag}
                    onChange={(e) => updateTag("future", index, e.target.value, setNewFutureGoal, newFutureGoal)}
                    className="bg-background/50"
                  />
                  {newFutureGoal.tags.length > 1 && (
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => removeTag("future", index, setNewFutureGoal, newFutureGoal)}
                      className="px-3"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
              <Button
                variant="outline"
                size="sm"
                onClick={() => addTag("future", setNewFutureGoal, newFutureGoal)}
                className="w-full bg-transparent"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Tag
              </Button>
            </div>
          </div>

          <Button onClick={handleAddFutureGoal} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Future Goal
          </Button>
        </CardContent>
      </Card>

      {/* Coding Profiles */}
      <Card className="bg-card/50 backdrop-blur-sm border-border/50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ExternalLink className="h-5 w-5" />
            Add Coding Profile
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Platform</label>
              <Input
                placeholder="e.g., LeetCode, HackerRank"
                value={newCodingProfile.platform}
                onChange={(e) => setNewCodingProfile({ ...newCodingProfile, platform: e.target.value })}
                className="bg-background/50"
              />
            </div>
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">Username</label>
              <Input
                placeholder="@username"
                value={newCodingProfile.username}
                onChange={(e) => setNewCodingProfile({ ...newCodingProfile, username: e.target.value })}
                className="bg-background/50"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-foreground mb-2 block">Profile URL</label>
            <Input
              placeholder="https://platform.com/profile"
              value={newCodingProfile.url}
              onChange={(e) => setNewCodingProfile({ ...newCodingProfile, url: e.target.value })}
              className="bg-background/50"
            />
          </div>

          <Button onClick={handleAddCodingProfile} className="w-full">
            <Plus className="h-4 w-4 mr-2" />
            Add Coding Profile
          </Button>
        </CardContent>
      </Card>

      {/* Display Current Data */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Current Learning Display */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Current Learning Items</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {learning.currentLearning.map((item, index) => (
              <div key={index} className="p-4 border border-border/50 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">{item.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{item.description}</p>
                <div className="flex flex-wrap gap-1">
                  {item.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="secondary" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Future Goals Display */}
        <Card className="bg-card/50 backdrop-blur-sm border-border/50">
          <CardHeader>
            <CardTitle>Future Goals</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {learning.futureGoals.map((goal, index) => (
              <div key={index} className="p-4 border border-border/50 rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">{goal.title}</h3>
                <p className="text-sm text-muted-foreground mb-3">{goal.description}</p>
                <div className="flex flex-wrap gap-1">
                  {goal.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
