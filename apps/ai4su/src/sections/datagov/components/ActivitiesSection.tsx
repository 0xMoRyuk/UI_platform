import { FileText, BarChart3, Landmark } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@ui-platform/ui/components/card'
import type { ActivitiesSectionProps, ActivityItem } from '@/../product/sections/datagov/types'

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  FileText,
  BarChart3,
  Landmark,
}

export function ActivitiesSection({ activities }: ActivitiesSectionProps) {
  return (
    <section className="py-16 bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-4">
            {activities.title}
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            {activities.description}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {activities.items.map((item) => (
            <ActivityCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </section>
  )
}

function ActivityCard({ item }: { item: ActivityItem }) {
  const Icon = iconMap[item.icon] ?? FileText

  return (
    <Card className="bg-white dark:bg-stone-900 border-stone-200 dark:border-stone-800 hover:shadow-lg hover:border-brand-primary transition-all duration-200">
      <CardHeader>
        <div className="w-12 h-12 rounded-lg flex items-center justify-center mb-3 bg-brand-primary/10 dark:bg-brand-primary/20">
          <Icon className="w-6 h-6 text-brand-primary" />
        </div>
        <CardTitle className="text-xl font-bold text-brand-primary dark:text-white font-[Barlow]">
          {item.title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
          {item.description}
        </p>
      </CardContent>
    </Card>
  )
}
