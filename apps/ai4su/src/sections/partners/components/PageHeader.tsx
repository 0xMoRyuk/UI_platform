import { Handshake } from 'lucide-react'
import type { PageHeaderProps } from '@/../product/sections/partners/types'

export function PageHeader({ intro }: PageHeaderProps) {
  return (
    <section className="bg-gradient-to-br from-brand-primary via-brand-primary-dark to-brand-primary-darker text-brand-primary-foreground py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-14 h-14 rounded-xl bg-brand-accent/20 flex items-center justify-center">
            <Handshake className="w-7 h-7 text-brand-accent" />
          </div>
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold font-[Barlow]">
              {intro.title}
            </h1>
          </div>
        </div>

        <p className="text-xl text-brand-accent font-medium mb-4">
          {intro.subtitle}
        </p>

        <p className="text-lg text-white/80 max-w-3xl leading-relaxed">
          {intro.description}
        </p>
      </div>
    </section>
  )
}
