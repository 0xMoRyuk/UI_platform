import { Globe, ArrowRight, CheckCircle } from 'lucide-react'
import type { DatagovCalloutProps } from '../types'

export function DatagovCallout({ datagov, onCtaClick }: DatagovCalloutProps) {
  return (
    <section className="py-16 bg-gradient-to-br from-[#003399] to-[#001133]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-10">
          {/* Content */}
          <div className="flex-1 text-center lg:text-left">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 rounded-full text-sm font-medium text-[#F5CE2A] mb-4">
              <Globe className="w-4 h-4" />
              <span>Broader Initiative</span>
            </div>

            <h2 className="text-3xl sm:text-4xl font-bold text-white font-[Barlow] mb-4">
              {datagov.title}
            </h2>

            <p className="text-lg text-white/80 mb-6 max-w-xl">
              {datagov.description}
            </p>

            {/* Highlights */}
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
              {datagov.highlights.map((highlight, index) => (
                <li key={index} className="flex items-center gap-2 text-white/90">
                  <CheckCircle className="w-4 h-4 text-[#F5CE2A] shrink-0" />
                  <span className="text-sm">{highlight}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              onClick={() => onCtaClick?.(datagov.websiteUrl)}
              className="inline-flex items-center gap-2 px-6 py-3 bg-[#F5CE2A] text-[#003399] font-bold rounded-lg
                       hover:bg-[#F5CE2A]/90 transition-colors"
            >
              {datagov.ctaText}
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Visual element */}
          <div className="shrink-0">
            <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-[#9BB1DC]/20 flex items-center justify-center">
              <div className="w-36 h-36 lg:w-48 lg:h-48 rounded-full bg-[#9BB1DC]/30 flex items-center justify-center">
                <Globe className="w-20 h-20 lg:w-28 lg:h-28 text-[#F5CE2A]" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
