'use client'

import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight, Quote, User } from 'lucide-react'
import type { TestimonialCarouselProps } from '@/../product/sections/ecosystem/types'

const countryFlags: Record<string, string> = {
  KE: '🇰🇪',
  NG: '🇳🇬',
  GH: '🇬🇭',
  SN: '🇸🇳',
  RW: '🇷🇼',
  ZA: '🇿🇦',
  EG: '🇪🇬',
  MA: '🇲🇦',
}

export function TestimonialCarousel({
  testimonials,
  autoPlay = true,
  interval = 5000,
}: TestimonialCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  useEffect(() => {
    if (!autoPlay || isPaused || testimonials.length <= 1) return

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length)
    }, interval)

    return () => clearInterval(timer)
  }, [autoPlay, isPaused, interval, testimonials.length])

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length)
  }

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  const currentTestimonial = testimonials[currentIndex]

  return (
    <div
      className="relative max-w-3xl mx-auto"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Testimonial card */}
      <div className="bg-white dark:bg-stone-900 rounded-2xl p-8 shadow-lg">
        {/* Quote icon */}
        <div className="w-12 h-12 rounded-full bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-6 mx-auto">
          <Quote className="w-6 h-6 text-pink-500" />
        </div>

        {/* Quote */}
        <blockquote className="text-lg sm:text-xl text-stone-700 dark:text-stone-300 text-center leading-relaxed mb-8">
          "{currentTestimonial.quote}"
        </blockquote>

        {/* Author */}
        <div className="flex items-center justify-center gap-4">
          {/* Photo placeholder */}
          <div className="w-14 h-14 rounded-full bg-stone-200 dark:bg-stone-800 flex items-center justify-center">
            <User className="w-6 h-6 text-stone-400" />
          </div>

          <div className="text-left">
            <p className="font-bold text-[#003399] dark:text-white font-[Barlow]">
              {currentTestimonial.name}
            </p>
            <p className="text-sm text-stone-600 dark:text-stone-400">
              {currentTestimonial.role}
            </p>
            <p className="text-sm text-stone-500 dark:text-stone-500 flex items-center gap-1">
              <span>{countryFlags[currentTestimonial.countryCode]}</span>
              <span>{currentTestimonial.country}</span>
            </p>
          </div>
        </div>
      </div>

      {/* Navigation arrows */}
      {testimonials.length > 1 && (
        <>
          <button
            onClick={goToPrevious}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12
                     w-10 h-10 rounded-full bg-white dark:bg-stone-800 shadow-lg
                     flex items-center justify-center hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
          >
            <ChevronLeft className="w-5 h-5 text-stone-600 dark:text-stone-300" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12
                     w-10 h-10 rounded-full bg-white dark:bg-stone-800 shadow-lg
                     flex items-center justify-center hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors"
          >
            <ChevronRight className="w-5 h-5 text-stone-600 dark:text-stone-300" />
          </button>
        </>
      )}

      {/* Dots indicator */}
      {testimonials.length > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-2 h-2 rounded-full transition-all duration-200
                ${index === currentIndex
                  ? 'w-6 bg-pink-500'
                  : 'bg-stone-300 dark:bg-stone-600 hover:bg-stone-400 dark:hover:bg-stone-500'
                }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}
