"use client"

import type React from "react"
import { useState, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Upload, X, Plus, ImageIcon } from "lucide-react"
import { cn } from "@/lib/utils"
import Image from "next/image"

interface ImageUploadProps {
  images: File[]
  onImagesChange: (images: File[]) => void
  maxImages?: number
  className?: string
}

export function ImageUploadWithFile({ images, onImagesChange, maxImages = 10, className }: ImageUploadProps) {
  const [dragActive, setDragActive] = useState(false)

  const handleDrag = useCallback((e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") setDragActive(true)
    if (e.type === "dragleave") setDragActive(false)
  }, [])

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      setDragActive(false)
      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) handleFiles(e.dataTransfer.files)
    },
    [images, maxImages, onImagesChange]
  )

  const handleFiles = (files: FileList) => {
    const fileArray = Array.from(files)
    const remainingSlots = maxImages - images.length
    const filesToAdd = fileArray.slice(0, remainingSlots).filter(file => file.type.startsWith("image/"))
    onImagesChange([...images, ...filesToAdd])
  }

  const removeImage = (index: number) => {
    onImagesChange(images.filter((_, i) => i !== index))
  }

  const reorderImages = (fromIndex: number, toIndex: number) => {
    const newImages = [...images]
    const [moved] = newImages.splice(fromIndex, 1)
    newImages.splice(toIndex, 0, moved)
    onImagesChange(newImages)
  }

  return (
    <div className={cn("space-y-4", className)}>
      {/* Upload Area */}
      <Card
        className={cn(
          "border-2 border-dashed transition-colors",
          dragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25",
          images.length >= maxImages && "opacity-50 pointer-events-none"
        )}
      >
        <CardContent className="p-6">
          <div
            className="text-center space-y-4"
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="mx-auto w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-muted-foreground" />
            </div>

            <p className="text-sm font-medium">
              {images.length >= maxImages
                ? `Maximum ${maxImages} images reached`
                : "Drag and drop images here, or click to select"}
            </p>
            <p className="text-xs text-muted-foreground">
              Supports JPG, PNG, GIF up to 10MB each ({images.length}/{maxImages} images)
            </p>

            {images.length < maxImages && (
              <Button
                type="button"
                variant="outline"
                onClick={() => document.getElementById("file-upload")?.click()}
                className="mt-2 group"
              >
                <ImageIcon className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
                Choose Files
              </Button>
            )}

            <input
              id="file-upload"
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => e.target.files && handleFiles(e.target.files)}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {images.map((file, index) => {
            const src = URL.createObjectURL(file)
            return (
              <Card key={index} className="group relative overflow-hidden">
                <CardContent className="p-2">
                  <div className="relative aspect-square">
                    <Image src={src} alt={`Upload ${index + 1}`} fill className="object-cover rounded-md" />

                    <Button
                      type="button"
                      variant="destructive"
                      size="icon"
                      className="absolute top-1 right-1 h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => removeImage(index)}
                    >
                      <X className="w-3 h-3" />
                    </Button>

                    {index === 0 && (
                      <div className="absolute bottom-1 left-1 bg-primary text-primary-foreground text-xs px-2 py-1 rounded">
                        Primary
                      </div>
                    )}

                    <div className="absolute top-1 left-1 bg-black/50 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center">
                      {index + 1}
                    </div>
                  </div>

                  {/* Reorder Buttons */}
                  <div className="flex gap-1 mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 h-6 text-xs bg-transparent"
                      onClick={() => index > 0 && reorderImages(index, index - 1)}
                      disabled={index === 0}
                    >
                      ←
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="flex-1 h-6 text-xs bg-transparent"
                      onClick={() => index < images.length - 1 && reorderImages(index, index + 1)}
                      disabled={index === images.length - 1}
                    >
                      →
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}

          {/* Add More Button */}
          {images.length < maxImages && (
            <Card className="border-2 border-dashed border-muted-foreground/25 hover:border-primary/50 transition-colors">
              <CardContent className="p-2">
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full h-full aspect-square flex flex-col items-center justify-center gap-2 text-muted-foreground hover:text-primary"
                  onClick={() => document.getElementById("file-upload")?.click()}
                >
                  <Plus className="w-6 h-6" />
                  <span className="text-xs">Add More</span>
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      )}
    </div>
  )
}
