import { MapPin, Clock, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import type { JobCardProps } from '@/../product/sections/jobs/types'

export function JobCard({ job, onClick }: JobCardProps) {
  const formatSalary = (min: number, max: number, currency: string) => {
    const fmt = (n: number) => `${currency === 'USD' ? '$' : currency}${(n / 1000).toFixed(0)}k`
    return `${fmt(min)} - ${fmt(max)}`
  }

  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1 border-border"
      onClick={onClick}
    >
      <CardContent className="p-5">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1 min-w-0">
            <h3 className="text-lg font-semibold truncate group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
              {job.title}
            </h3>
            <p className="text-sm text-muted-foreground">{job.company.name}</p>
          </div>
          {job.featured && (
            <Badge variant="secondary" className="ml-2 shrink-0">Featured</Badge>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span>{job.type}</span>
          </div>
        </div>

        {/* Salary */}
        <p className="text-sm font-medium mb-3">
          {formatSalary(job.salary.min, job.salary.max, job.salary.currency)}
          <span className="text-muted-foreground font-normal"> / {job.salary.period}</span>
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {job.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
          {job.tags.length > 3 && (
            <Badge variant="outline" className="text-xs text-muted-foreground">
              +{job.tags.length - 3}
            </Badge>
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center gap-2 text-sm font-medium group-hover:text-stone-600 dark:group-hover:text-stone-300 transition-colors">
          <span>View Details</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </CardContent>
    </Card>
  )
}
