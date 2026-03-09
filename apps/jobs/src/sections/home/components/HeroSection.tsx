import { ArrowRight, Briefcase } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { HeroSectionProps } from '@/../product/sections/home/types'

export function HeroSection({ hero, onCtaClick }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-stone-900 via-stone-800 to-stone-700 text-white">
      {/* Background pattern */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-stone-600/20 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-stone-500/10 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          <Badge className="gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm text-sm font-medium mb-8 border border-white/20 text-white">
            <Briefcase className="w-4 h-4" />
            <span>{hero.badge}</span>
          </Badge>

          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            <span className="block">{hero.title}</span>
            <span className="block mt-2 text-stone-300">
              {hero.heading}
            </span>
          </h1>

          <p className="text-xl sm:text-2xl text-white/70 leading-relaxed mb-10 max-w-2xl font-light">
            {hero.subtitle}
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              onClick={() => onCtaClick?.(hero.ctaLink)}
              className="group gap-2 px-8 py-4 h-auto bg-white text-stone-900 font-semibold rounded-lg
                       hover:bg-stone-100 shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all"
            >
              {hero.ctaText}
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </Button>

            {hero.secondaryCtaText && (
              <Button
                variant="outline"
                onClick={() => onCtaClick?.(hero.secondaryCtaLink || '')}
                className="gap-2 px-8 py-4 h-auto bg-white/10 backdrop-blur-sm text-white font-semibold rounded-lg
                         border-white/20 hover:bg-white/20 hover:border-white/30 hover:text-white"
              >
                {hero.secondaryCtaText}
              </Button>
            )}
          </div>
        </div>

        {/* Stats preview */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-4 text-right">
            {hero.stats.map((stat) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3"
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
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
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}
