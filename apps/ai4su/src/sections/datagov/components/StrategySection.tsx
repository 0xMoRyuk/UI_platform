import { Globe, Building2, Users } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@ui-platform/ui/components/card'
import type { StrategySectionProps, StrategyLevel } from '@/../product/sections/datagov/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Globe,
  Building2,
  Users,
}

const colorMap: Record<string, string> = {
  'brand-primary': 'border-t-brand-primary bg-brand-primary/5',
  'brand-secondary': 'border-t-brand-secondary bg-brand-secondary/5',
  'brand-accent': 'border-t-brand-accent bg-brand-accent/5',
}

const iconColorMap: Record<string, string> = {
  'brand-primary': 'text-brand-primary',
  'brand-secondary': 'text-brand-secondary',
  'brand-accent': 'text-brand-accent',
}

export function StrategySection({ strategy }: StrategySectionProps) {
  return (
    <section className="py-16 bg-stone-50 dark:bg-stone-900/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-4">
            {strategy.title}
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            {strategy.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {strategy.levels.map((level) => (
            <StrategyCard key={level.id} level={level} />
          ))}
        </div>
      </div>
    </section>
  )
}

function StrategyCard({ level }: { level: StrategyLevel }) {
  const Icon = iconMap[level.icon] ?? Globe
  const cardColor = colorMap[level.color] ?? ''
  const iconColor = iconColorMap[level.color] ?? 'text-brand-primary'

  return (
    <Card className={`border-t-4 ${cardColor} dark:bg-stone-900 dark:border-stone-800`}>
      <CardHeader>
        <div className={`w-12 h-12 rounded-lg flex items-center justify-center mb-3 bg-white dark:bg-stone-800 shadow-sm`}>
          <Icon className={`w-6 h-6 ${iconColor}`} />
        </div>
        <CardTitle className="text-xl font-bold text-brand-primary dark:text-white font-[Barlow]">
          {level.name}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
          {level.description}
        </p>
      </CardContent>
    </Card>
  )
}
