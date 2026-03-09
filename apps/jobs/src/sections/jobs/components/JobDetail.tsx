import { ArrowLeft, MapPin, Clock, DollarSign, Calendar } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { JobCard } from './JobCard'
import type { JobDetailProps } from '@/../product/sections/jobs/types'

export function JobDetail({ job, relatedJobs, onBackClick, onJobClick }: JobDetailProps) {
  const formatSalary = (min: number, max: number, currency: string) => {
    const fmt = (n: number) => `${currency === 'USD' ? '$' : currency}${(n / 1000).toFixed(0)}k`
    return `${fmt(min)} - ${fmt(max)}`
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    })
  }

  return (
    <section className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <button
          onClick={onBackClick}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Jobs</span>
        </button>

        {/* Job header */}
        <div className="mb-8">
          <div className="flex items-start gap-4 mb-4">
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              <p className="text-lg text-muted-foreground">{job.company.name}</p>
            </div>
            {job.featured && <Badge>Featured</Badge>}
          </div>

          {/* Meta info */}
          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Clock className="w-4 h-4" />
              <span>{job.type}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <DollarSign className="w-4 h-4" />
              <span>{formatSalary(job.salary.min, job.salary.max, job.salary.currency)} / {job.salary.period}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4" />
              <span>Posted {formatDate(job.postedAt)}</span>
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {job.tags.map((tag) => (
            <Badge key={tag} variant="outline">{tag}</Badge>
          ))}
          <Badge variant="secondary">{job.sector}</Badge>
        </div>

        <Separator className="mb-8" />

        {/* Description */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">About the Role</h2>
          <p className="text-muted-foreground leading-relaxed">{job.description}</p>
        </div>

        {/* Requirements */}
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-4">Requirements</h2>
          <ul className="space-y-2">
            {job.requirements.map((req, i) => (
              <li key={i} className="flex items-start gap-3 text-muted-foreground">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 mt-2 shrink-0" />
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Apply CTA */}
        <Card className="mb-12">
          <CardContent className="p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div>
              <h3 className="font-semibold">Interested in this role?</h3>
              <p className="text-sm text-muted-foreground">Apply directly on {job.company.name}'s website</p>
            </div>
            <Button className="px-8">Apply Now</Button>
          </CardContent>
        </Card>

        {/* Related jobs */}
        {relatedJobs.length > 0 && (
          <div>
            <h2 className="text-xl font-semibold mb-6">Related Jobs</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedJobs.slice(0, 4).map((rj) => (
                <JobCard key={rj.id} job={rj} onClick={() => onJobClick?.(rj.slug)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
