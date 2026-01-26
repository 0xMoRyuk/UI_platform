import { ArrowRight, Sparkles } from 'lucide-react'
import type { HeroSectionProps } from '@/../product/sections/home/types'

export function HeroSection({ hero, onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#003399] via-[#002266] to-[#001133] text-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Geometric patterns */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#F5CE2A]/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#9BB1DC]/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px'
          }}
        />

        {/* Floating accent shapes */}
        <div className="absolute top-20 left-[15%] w-3 h-3 bg-[#F5CE2A] rounded-full animate-pulse" />
        <div className="absolute top-40 right-[20%] w-2 h-2 bg-[#9BB1DC] rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-32 left-[25%] w-2 h-2 bg-[#F5CE2A]/60 rounded-full animate-pulse delay-700" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-sm font-medium mb-8 border border-white/20">
            <Sparkles className="w-4 h-4 text-[#F5CE2A]" />
            <span>Funded by the European Union</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-[Barlow]">
            <span className="block">{hero.title}</span>
            <span className="block mt-2 bg-gradient-to-r from-[#F5CE2A] to-[#FFE066] bg-clip-text text-transparent">
              Africa's AI Future
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/80 leading-relaxed mb-10 max-w-2xl font-[Barlow] font-light">
            {hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={() => onCtaClick?.(hero.ctaLink)}
              className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-[#F5CE2A] text-[#003399] font-semibold rounded-lg
                       hover:bg-[#FFE066] transition-all duration-300 shadow-lg shadow-[#F5CE2A]/25
                       hover:shadow-xl hover:shadow-[#F5CE2A]/30 hover:-translate-y-0.5"
            >
              {hero.ctaText}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>

            {hero.secondaryCtaText && (
              <button
                onClick={() => onCtaClick?.(hero.secondaryCtaLink || '')}
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg
                         border border-white/20 hover:bg-white/20 hover:border-white/30 transition-all duration-300"
              >
                {hero.secondaryCtaText}
              </button>
            )}
          </div>
        </div>

        {/* Stats preview - floating on right side for large screens */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-4 text-right">
            {[
              { value: '24', label: 'AI Models' },
              { value: '8', label: 'Countries' },
              { value: '500+', label: 'Participants' },
            ].map((stat, i) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-2xl font-bold text-[#F5CE2A]">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom wave */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" className="w-full h-auto">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            fill="white"
            className="dark:fill-stone-950"
          />
        </svg>
      </div>
    </section>
  )
}
