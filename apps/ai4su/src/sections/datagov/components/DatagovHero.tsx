import type { DatagovHeroProps } from '@/../product/sections/datagov/types'

export function DatagovHero({ hero }: DatagovHeroProps) {
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker text-white">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-brand-accent/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-brand-secondary/20 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2" />

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
        <div className="absolute top-20 left-[15%] w-3 h-3 bg-brand-accent rounded-full animate-pulse" />
        <div className="absolute top-40 right-[20%] w-2 h-2 bg-brand-secondary rounded-full animate-pulse delay-300" />
        <div className="absolute bottom-32 left-[25%] w-2 h-2 bg-brand-accent/60 rounded-full animate-pulse delay-700" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 lg:py-40">
        <div className="max-w-3xl">
          {/* Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold tracking-tight mb-6 font-[Barlow]">
            <span className="block">{hero.title}</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl text-white/80 leading-relaxed mb-10 max-w-2xl font-[Barlow] font-light">
            {hero.subtitle}
          </p>
        </div>

        {/* Stats - floating on right side for large screens */}
        <div className="hidden lg:block absolute right-8 top-1/2 -translate-y-1/2">
          <div className="flex flex-col gap-4 text-right">
            {hero.stats.map((stat, i) => (
              <div
                key={stat.label}
                className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-6 py-3"
                style={{ animationDelay: `${i * 100}ms` }}
              >
                <div className="text-2xl font-bold text-brand-accent">{stat.value}</div>
                <div className="text-sm text-white/60">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats - mobile (below title) */}
        <div className="lg:hidden grid grid-cols-2 gap-3 mt-8">
          {hero.stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 text-center"
            >
              <div className="text-xl font-bold text-brand-accent">{stat.value}</div>
              <div className="text-xs text-white/60">{stat.label}</div>
            </div>
          ))}
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
