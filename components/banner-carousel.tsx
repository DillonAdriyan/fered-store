"use client"

import { useState, useEffect, useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Banner {
  id: number
  image: string
  title: string
  description: string
}

interface BannerCarouselProps {
  banners: Banner[]
}

export default function BannerCarousel({ banners }: BannerCarouselProps) {
  const [currentSlide, setCurrentSlide] = useState(0)
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }

  useEffect(() => {
    resetTimeout()
    timeoutRef.current = setTimeout(
      () => setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length),
      5000, // Change slide every 5 seconds
    )

    return () => {
      resetTimeout()
    }
  }, [currentSlide, banners.length])

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  const goToPrevSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide - 1 + banners.length) % banners.length)
  }

  const goToNextSlide = () => {
    setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length)
  }

  return (
    <div className="relative">
      <div className="relative aspect-[21/9] overflow-hidden">
        {banners.map((banner, index) => (
          <div
            key={banner.id}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000",
              currentSlide === index ? "opacity-100" : "opacity-0 pointer-events-none",
            )}
          >
            <Image
              src={banner.image || "/placeholder.svg"}
              alt={banner.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            <div className="hidden hover:absolute inset-0 bg-gradient-to-r from-black/60 to-transparent p-6 flex flex-col justify-end">
              <h2 className="text-xl md:text-3xl font-bold text-white mb-2">{banner.title}</h2>
              <p className="text-sm md:text-base text-white/80 max-w-md">{banner.description}</p>
              <Button className="mt-4 w-fit">Top Up Now</Button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <Button
        variant="outline"
        size="icon"
        className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
        onClick={goToPrevSlide}
      >
        <ChevronLeft className="h-5 w-5" />
        <span className="sr-only">Previous slide</span>
      </Button>

      <Button
        variant="outline"
        size="icon"
        className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-background/80 hover:bg-background"
        onClick={goToNextSlide}
      >
        <ChevronRight className="h-5 w-5" />
        <span className="sr-only">Next slide</span>
      </Button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
        {banners.map((_, index) => (
          <button
            key={index}
            className={cn(
              "w-2 h-2 rounded-full transition-all",
              currentSlide === index ? "bg-white w-4" : "bg-white/50",
            )}
            onClick={() => goToSlide(index)}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}

