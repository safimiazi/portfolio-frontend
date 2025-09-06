"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Play, Pause, Maximize2, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Image from "next/image"
import { cn } from "@/lib/utils"

interface EnhancedImageSliderProps {
  images: string[]
  alt: string
  className?: string
  autoPlay?: boolean
  autoPlayInterval?: number
  showThumbnails?: boolean
  showCounter?: boolean
  showFullscreen?: boolean
  aspectRatio?: "video" | "square" | "portrait"
}

export function EnhancedImageSlider({
  images,
  alt,
  className,
  autoPlay = false,
  autoPlayInterval = 5000,
  showThumbnails = true,
  showCounter = true,
  showFullscreen = true,
  aspectRatio = "video",
}: EnhancedImageSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(autoPlay)
  const [isFullscreen, setIsFullscreen] = useState(false)

  useEffect(() => {
    if (!isPlaying || images.length <= 1) return

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length)
    }, autoPlayInterval)

    return () => clearInterval(interval)
  }, [isPlaying, images.length, autoPlayInterval])

  if (!images || images.length === 0) {
    return (
      <div
        className={cn("bg-muted rounded-lg flex items-center justify-center", getAspectClass(aspectRatio), className)}
      >
        <p className="text-muted-foreground">No images available</p>
      </div>
    )
  }

  const nextImage = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentIndex(index)
  }

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying)
  }

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen)
  }

  const SliderContent = () => (
    <div className="space-y-4">
      {/* Main Image */}
      <div className={cn("relative rounded-lg overflow-hidden bg-muted group", getAspectClass(aspectRatio))}>
        <Image
          src={images[currentIndex] || "/placeholder.svg"}
          alt={`${alt} - Image ${currentIndex + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          priority={currentIndex === 0}
        />

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={prevImage}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={nextImage}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <ChevronRight className="w-5 h-5" />
            </Button>
          </>
        )}

        {/* Controls Overlay */}
        <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          {images.length > 1 && (
            <Button
              variant="ghost"
              size="icon"
              onClick={togglePlayPause}
              className="bg-black/50 hover:bg-black/70 text-white h-8 w-8"
            >
              {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
            </Button>
          )}

          {showFullscreen && (
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleFullscreen}
              className="bg-black/50 hover:bg-black/70 text-white h-8 w-8"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
          )}
        </div>

        {/* Image Counter */}
        {showCounter && images.length > 1 && (
          <div className="absolute bottom-4 right-4 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {currentIndex + 1} / {images.length}
          </div>
        )}

        {/* Auto-play Indicator */}
        {isPlaying && images.length > 1 && (
          <div className="absolute bottom-4 left-4">
            <Badge variant="secondary" className="bg-black/50 text-white border-none">
              Auto-playing
            </Badge>
          </div>
        )}
      </div>

      {/* Thumbnail Navigation */}
      {showThumbnails && images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={cn(
                "relative w-16 h-10 rounded-md overflow-hidden flex-shrink-0 border-2 transition-colors",
                index === currentIndex ? "border-primary" : "border-transparent hover:border-primary/50",
              )}
            >
              <Image src={image || "/placeholder.svg"} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
            </button>
          ))}
        </div>
      )}

      {/* Dots Indicator */}
      {!showThumbnails && images.length > 1 && images.length <= 8 && (
        <div className="flex justify-center gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={cn(
                "w-2 h-2 rounded-full transition-colors",
                index === currentIndex ? "bg-primary" : "bg-muted-foreground/30 hover:bg-muted-foreground/50",
              )}
            />
          ))}
        </div>
      )}
    </div>
  )

  if (isFullscreen) {
    return (
      <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4">
        <div className="w-full max-w-6xl">
          <div className="flex justify-end mb-4">
            <Button variant="ghost" size="icon" onClick={toggleFullscreen} className="text-white hover:bg-white/20">
              <X className="w-6 h-6" />
            </Button>
          </div>
          <SliderContent />
        </div>
      </div>
    )
  }

  return (
    <div className={cn("space-y-4", className)}>
      <SliderContent />
    </div>
  )
}

function getAspectClass(aspectRatio: "video" | "square" | "portrait") {
  switch (aspectRatio) {
    case "square":
      return "aspect-square"
    case "portrait":
      return "aspect-[3/4]"
    case "video":
    default:
      return "aspect-video"
  }
}
