"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"

export default function AdminPersonalPage() {
  const [formData, setFormData] = useState<any>(null)
  const [avatarFile, setAvatarFile] = useState<File | null>(null)
  const [isSaving, setIsSaving] = useState(false)
  const userId = 1 // TODO: JWT থেকে নেবেন
      const token = localStorage.getItem("accessToken")

  // ✅ Profile data fetch
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/get-my-profile/${userId}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : {},
        })

        if (!res.ok) throw new Error("Failed to fetch")

        const data = await res.json()
        setFormData(data.data) // backend থেকে আসল profile data
      } catch (err) {
        console.error("Profile fetch error:", err)
      }
    }

    fetchProfile()
  }, [userId, token])

  // ✅ Input change
  const handleInputChange = (field: string, value: string) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }))
  }

  // ✅ File change
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setAvatarFile(e.target.files[0])
    }
  }

  // ✅ Save profile
  const handleSave = async () => {
    if (!formData) return
    setIsSaving(true)

    try {
      const form = new FormData()

      // সব string ফিল্ড append করা
      Object.keys(formData).forEach((key) => {
        if (typeof formData[key] === "string") {
          form.append(key, formData[key])
        }
      })

      // Avatar থাকলে যোগ করা
      if (avatarFile) {
        form.append("avatar", avatarFile)
      }

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile/update`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: form,
      })

      if (!res.ok) throw new Error("Failed to update")

      const data = await res.json()

      setFormData(data.data) // updated profile বসানো
      alert("Profile updated successfully!")
    } catch (err) {
      console.error("Update error:", err)
      alert("Failed to update profile")
    } finally {
      setIsSaving(false)
    }
  }

  if (!formData) return <p>Loading...</p>

  return (
    <div className="space-y-6 max-w-4xl">
      <h1 className="text-3xl font-bold">Personal Information</h1>

      {/* Avatar Upload */}
      <div className="flex gap-4 items-center">
        <Image
          src={formData.photo || "/placeholder.svg"}
          alt="Profile"
          width={100}
          height={100}
          className="rounded-full border"
        />
        <div>
          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </div>
      </div>

      {/* Name */}
      <div>
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          value={formData.name || ""}
          onChange={(e) => handleInputChange("name", e.target.value)}
        />
      </div>

      {/* Designation */}
      <div>
        <Label htmlFor="designation">Designation</Label>
        <Input
          id="designation"
          value={formData.designation || ""}
          onChange={(e) => handleInputChange("designation", e.target.value)}
        />
      </div>

      {/* Education */}
      <div>
        <Label htmlFor="education">Education</Label>
        <Input
          id="education"
          value={formData.education || ""}
          onChange={(e) => handleInputChange("education", e.target.value)}
        />
      </div>

      {/* University */}
      <div>
        <Label htmlFor="university">University</Label>
        <Input
          id="university"
          value={formData.university || ""}
          onChange={(e) => handleInputChange("university", e.target.value)}
        />
      </div>

      {/* University Start & End */}
      <div className="flex gap-4">
        <div className="flex-1">
          <Label htmlFor="universityStart">University Start</Label>
          <Input
            id="universityStart"
            value={formData.universityStart || ""}
            onChange={(e) => handleInputChange("universityStart", e.target.value)}
          />
        </div>
        <div className="flex-1">
          <Label htmlFor="universityEnd">University End</Label>
          <Input
            id="universityEnd"
            value={formData.universityEnd || ""}
            onChange={(e) => handleInputChange("universityEnd", e.target.value)}
          />
        </div>
      </div>

      {/* GPA */}
      <div>
        <Label htmlFor="gpa">GPA</Label>
        <Input
          id="gpa"
          value={formData.gpa || ""}
          onChange={(e) => handleInputChange("gpa", e.target.value)}
        />
      </div>

      {/* Location */}
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          value={formData.location || ""}
          onChange={(e) => handleInputChange("location", e.target.value)}
        />
      </div>

      {/* Phone */}
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input
          id="phone"
          value={formData.phone || ""}
          onChange={(e) => handleInputChange("phone", e.target.value)}
        />
      </div>

      {/* Experience */}
      <div>
        <Label htmlFor="experience">Experience</Label>
        <Textarea
          id="experience"
          value={formData.experience || ""}
          onChange={(e) => handleInputChange("experience", e.target.value)}
        />
      </div>

      {/* Bio */}
      <div>
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={formData.bio || ""}
          onChange={(e) => handleInputChange("bio", e.target.value)}
        />
      </div>

      {/* Social Links */}
      <div>
        <Label htmlFor="githubLink">GitHub</Label>
        <Input
          id="githubLink"
          value={formData.githubLink || ""}
          onChange={(e) => handleInputChange("githubLink", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="linkedinLink">LinkedIn</Label>
        <Input
          id="linkedinLink"
          value={formData.linkedinLink || ""}
          onChange={(e) => handleInputChange("linkedinLink", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="twitterLink">Twitter</Label>
        <Input
          id="twitterLink"
          value={formData.twitterLink || ""}
          onChange={(e) => handleInputChange("twitterLink", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="websiteLink">Website</Label>
        <Input
          id="websiteLink"
          value={formData.websiteLink || ""}
          onChange={(e) => handleInputChange("websiteLink", e.target.value)}
        />
      </div>

      <div>
        <Label htmlFor="resumeLink">Resume Link</Label>
        <Input
          id="resumeLink"
          value={formData.resumeLink || ""}
          onChange={(e) => handleInputChange("resumeLink", e.target.value)}
        />
      </div>

      <Button onClick={handleSave} disabled={isSaving}>
        {isSaving ? "Saving..." : "Save Changes"}
      </Button>
    </div>
  )
}
