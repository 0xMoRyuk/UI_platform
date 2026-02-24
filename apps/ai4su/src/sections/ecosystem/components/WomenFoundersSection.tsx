'use client'

import { useState } from 'react'
import { Heart, ArrowRight, ChevronDown, Sparkles, Users, DollarSign, MessageCircle } from 'lucide-react'
import { TestimonialCarousel } from './TestimonialCarousel'
import type { WomenFoundersSectionProps } from '@/../product/sections/ecosystem/types'

const programIcons = {
  Bootcamps: Sparkles,
  Mentorship: Users,
  'Funding Access': DollarSign,
  Community: MessageCircle,
}

export function WomenFoundersSection({ program, onCtaClick }: WomenFoundersSectionProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <section className="py-16 bg-gradient-to-br from-pink-50 to-purple-50 dark:from-pink-950/20 dark:to-purple-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-100 dark:bg-pink-900/30 rounded-full text-sm font-medium text-pink-700 dark:text-pink-300 mb-4">
            <Heart className="w-4 h-4" />
            <span>{program.badge}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-4">
            {program.title}
          </h2>

          <p className="text-xl text-pink-600 dark:text-pink-300 font-medium mb-4">
            {program.tagline}
          </p>

          <p className="text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            {program.description}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {program.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white dark:bg-stone-900 rounded-xl p-6 text-center shadow-sm"
            >
              <div className="text-3xl sm:text-4xl font-bold text-pink-500 font-[Barlow]">
                {stat.value}{stat.suffix}
              </div>
              <div className="text-sm text-stone-600 dark:text-stone-400 mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Program Elements */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {program.programElements.map((element) => {
            const Icon = programIcons[element.title as keyof typeof programIcons] || Sparkles
            return (
              <div
                key={element.title}
                className="bg-white dark:bg-stone-900 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="w-10 h-10 rounded-lg bg-pink-100 dark:bg-pink-900/30 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-pink-500" />
                </div>
                <h3 className="text-lg font-bold text-brand-primary dark:text-white font-[Barlow] mb-2">
                  {element.title}
                </h3>
                <p className="text-sm text-stone-600 dark:text-stone-400">
                  {element.description}
                </p>
              </div>
            )
          })}
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <h3 className="text-xl font-bold text-brand-primary dark:text-white font-[Barlow] text-center mb-8">
            {program.testimonialHeading}
          </h3>
          <TestimonialCarousel testimonials={program.testimonials} />
        </div>

        {/* CTA */}
        <div className="text-center">
          <button
            onClick={onCtaClick}
            className="inline-flex items-center gap-2 px-8 py-4 bg-pink-500 text-white font-bold rounded-xl
                     hover:bg-pink-600 transition-colors shadow-lg shadow-pink-500/25"
          >
            {program.ctaText}
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* Learn more expandable */}
        <div className="mt-8">
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 mx-auto text-sm text-stone-500 dark:text-stone-400 hover:text-brand-primary dark:hover:text-white transition-colors"
          >
            <span>{program.expandLabel}</span>
            <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
          </button>

          {isExpanded && (
            <div className="mt-6 bg-white dark:bg-stone-900 rounded-xl p-6 max-w-2xl mx-auto shadow-sm">
              <h4 className="font-bold text-brand-primary dark:text-white mb-3">
                {program.expandHeading}
              </h4>
              <div className="prose prose-sm dark:prose-invert text-stone-600 dark:text-stone-400">
                {program.programDescription.map((paragraph, index) => (
                  <p key={index} className={index > 0 ? 'mt-3' : undefined}>
                    {paragraph}
                  </p>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
