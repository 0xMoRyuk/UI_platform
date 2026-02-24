import { useEffect, useRef, useState } from 'react'
import { Brain, Trophy, Globe, Users, BookOpen, Calendar } from 'lucide-react'
import type { KPIGridProps, KPI } from '@/../product/sections/home/types'

const iconMap = {
  brain: Brain,
  trophy: Trophy,
  globe: Globe,
  users: Users,
  book: BookOpen,
  calendar: Calendar,
}

interface AnimatedCounterProps {
  value: number
  suffix: string
  duration?: number
  isVisible: boolean
}

function AnimatedCounter({ value, suffix, duration = 2000, isVisible }: AnimatedCounterProps) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!isVisible) return

    let startTime: number
    let animationFrame: number

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)

      // Easing function for smooth animation
      const easeOutQuart = 1 - Math.pow(1 - progress, 4)
      setCount(Math.floor(easeOutQuart * value))

      if (progress < 1) {
        animationFrame = requestAnimationFrame(animate)
      }
    }

    animationFrame = requestAnimationFrame(animate)

    return () => cancelAnimationFrame(animationFrame)
  }, [value, duration, isVisible])

  return (
    <span>
      {count.toLocaleString()}{suffix}
    </span>
  )
}

interface KPICardProps {
  kpi: KPI
  index: number
  isVisible: boolean
  onClick?: () => void
}

function KPICard({ kpi, index, isVisible, onClick }: KPICardProps) {
  const Icon = iconMap[kpi.icon]

  const colorVariants = [
    { bg: 'bg-brand-primary', text: 'text-brand-primary-foreground', accent: 'text-brand-accent', border: 'border-brand-primary' },
    { bg: 'bg-brand-secondary', text: 'text-brand-secondary-foreground', accent: 'text-brand-secondary-foreground', border: 'border-brand-secondary' },
    { bg: 'bg-brand-accent', text: 'text-brand-accent-foreground', accent: 'text-brand-accent-foreground', border: 'border-brand-accent' },
    { bg: 'bg-brand-neutral', text: 'text-brand-neutral-foreground', accent: 'text-brand-neutral-foreground', border: 'border-brand-neutral' },
  ]

  const colors = colorVariants[index % colorVariants.length]

  return (
    <button
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-2xl p-6 sm:p-8 text-left
        transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
        ${colors.bg} ${colors.text}
        border-2 ${colors.border}
      `}
      style={{
        animationDelay: `${index * 100}ms`,
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0)' : 'translateY(20px)',
        transition: `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`,
      }}
    >
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-32 h-32 rounded-full bg-white/10 transform translate-x-16 -translate-y-16 group-hover:scale-150 transition-transform duration-500" />

      <div className="relative">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-white/20 mb-4 ${colors.accent}`}>
          <Icon className="w-6 h-6" />
        </div>

        {/* Value */}
        <div className="text-4xl sm:text-5xl font-bold mb-2 font-[Barlow]">
          <AnimatedCounter value={kpi.value} suffix={kpi.suffix} isVisible={isVisible} />
        </div>

        {/* Label */}
        <div className={`text-lg font-semibold mb-1 ${colors.accent}`}>
          {kpi.label}
        </div>

        {/* Description */}
        <div className={`text-sm opacity-80`}>
          {kpi.description}
        </div>

        {/* Hover indicator */}
        <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </div>
      </div>
    </button>
  )
}

export function KPIGrid({ kpis, kpiSection, onKpiClick }: KPIGridProps) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} className="py-16 sm:py-24 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white mb-4 font-[Barlow]">
            {kpiSection.title}
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            {kpiSection.description}
          </p>
        </div>

        {/* KPI Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {kpis.map((kpi, index) => (
            <KPICard
              key={kpi.id}
              kpi={kpi}
              index={index}
              isVisible={isVisible}
              onClick={() => onKpiClick?.(kpi.id, kpi.link)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
