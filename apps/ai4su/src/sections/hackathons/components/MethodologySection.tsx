import { Lightbulb, Users, Code, Presentation } from 'lucide-react'
import type { MethodologySectionProps } from '@/../product/sections/hackathons/types'

const iconMap = {
  lightbulb: Lightbulb,
  users: Users,
  code: Code,
  presentation: Presentation,
}

export function MethodologySection({ steps }: MethodologySectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-[#003399] dark:text-white font-[Barlow] mb-4">
            Our Hackathon Methodology
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            A proven approach to building AI solutions that address real African challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => {
            const Icon = iconMap[step.icon]
            return (
              <div
                key={step.id}
                className="relative bg-stone-50 dark:bg-stone-800 rounded-xl p-6 hover:shadow-lg transition-shadow"
              >
                {/* Step number */}
                <div className="absolute -top-3 -left-3 w-8 h-8 rounded-full bg-[#003399] text-white flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="w-14 h-14 rounded-xl bg-[#003399]/10 dark:bg-[#003399]/20 flex items-center justify-center mb-4">
                  <Icon className="w-7 h-7 text-[#003399] dark:text-[#9BB1DC]" />
                </div>

                {/* Title */}
                <h3 className="text-lg font-bold text-[#003399] dark:text-white font-[Barlow] mb-2">
                  {step.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-stone-600 dark:text-stone-400 leading-relaxed">
                  {step.description}
                </p>

                {/* Connector line (except last) */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-[#003399]/20" />
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
