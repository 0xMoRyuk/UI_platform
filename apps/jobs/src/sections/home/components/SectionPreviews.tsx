import { ArrowRight, Briefcase, Building, Globe } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import type { SectionPreviewsProps } from '@/../product/sections/home/types'

const iconMap: Record<string, React.ElementType> = {
  briefcase: Briefcase,
  building: Building,
  globe: Globe,
}

export function SectionPreviews({ previews, onSectionClick }: SectionPreviewsProps) {
  return (
    <section className="py-16 sm:py-20 bg-muted/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {previews.map((preview) => {
            const Icon = iconMap[preview.icon] || Briefcase

            return (
              <Card
                key={preview.id}
                className="group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
                onClick={() => onSectionClick?.(preview.id, preview.link)}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 rounded-lg bg-stone-100 dark:bg-stone-800 flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-stone-600 dark:text-stone-400" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{preview.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">{preview.description}</p>
                  <div className="flex items-center gap-2 text-sm font-medium group-hover:text-stone-600 transition-colors">
                    <span>{preview.ctaText}</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
