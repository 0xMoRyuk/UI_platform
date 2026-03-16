import type { AboutSectionProps } from '@/../product/sections/datagov/types'

export function AboutSection({ about }: AboutSectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-4">
            {about.title}
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 leading-relaxed">
            {about.description}
          </p>
        </div>
      </div>
    </section>
  )
}
