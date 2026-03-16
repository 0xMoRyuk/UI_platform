'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { Button } from '@ui-platform/ui/components/button'
import { ActivityCard } from './ActivityCard'
import type { ActivityListProps } from '@/../product/sections/ecosystem/types'
import ecosystemDataRaw from '../../../../product/sections/ecosystem/data.json'

const ui = (ecosystemDataRaw as Record<string, unknown>).ui as Record<string, string>

const PAGE_SIZE = 8

export function ActivityList({
  activities,
  activityTypes,
  highlightedActivityId,
  onActivityClick,
}: ActivityListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE)

  const handleClick = (activityId: string) => {
    setExpandedId(expandedId === activityId ? null : activityId)
    onActivityClick(activityId)
  }

  const getActivityType = (typeId: string) => {
    return activityTypes.find((t) => t.id === typeId) || activityTypes[0]
  }

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + PAGE_SIZE)
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-stone-500 dark:text-stone-400">
          {ui.noActivities}
        </p>
      </div>
    )
  }

  const visibleActivities = activities.slice(0, visibleCount)
  const hasMore = visibleCount < activities.length

  return (
    <div className="space-y-4">
      {visibleActivities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          activityType={getActivityType(activity.type)}
          isHighlighted={activity.id === highlightedActivityId}
          isExpanded={activity.id === expandedId}
          onClick={() => handleClick(activity.id)}
        />
      ))}

      {hasMore && (
        <div className="text-center pt-4">
          <Button
            variant="outline"
            onClick={handleLoadMore}
            className="gap-2 px-6 py-3 h-auto font-semibold"
          >
            Show more ({activities.length - visibleCount} remaining)
            <ChevronDown className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  )
}
