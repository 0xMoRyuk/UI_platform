import { MapPin, Users, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import type { CompanyCardProps } from '@/../product/sections/companies/types'

export function CompanyCard({ company, onClick }: CompanyCardProps) {
  const initials = company.name
    .split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()

  return (
    <Card
      className="group cursor-pointer hover:shadow-lg transition-all hover:-translate-y-1"
      onClick={onClick}
    >
      <CardContent className="p-5">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="w-12 h-12">
            <AvatarFallback className="bg-stone-100 text-stone-600 dark:bg-stone-800 dark:text-stone-300 text-sm font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold truncate">{company.name}</h3>
            <p className="text-sm text-muted-foreground truncate">{company.tagline}</p>
          </div>
          <Badge variant="outline" className="shrink-0">{company.sector}</Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{company.description}</p>

        <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5" />
            <span>{company.location}</span>
          </div>
          <div className="flex items-center gap-1">
            <Users className="w-3.5 h-3.5" />
            <span>{company.size}</span>
          </div>
          <div className="flex items-center gap-1">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>{company.openPositions} open positions</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
