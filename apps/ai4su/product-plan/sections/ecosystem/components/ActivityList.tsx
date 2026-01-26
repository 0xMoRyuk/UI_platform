'use client'

import { useState } from 'react'
import { ActivityCard } from './ActivityCard'
import type { ActivityListProps } from '../types'

export function ActivityList({
  activities,
  activityTypes,
  highlightedActivityId,
  onActivityClick,
}: ActivityListProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null)

  const handleClick = (activityId: string) => {
    setExpandedId(expandedId === activityId ? null : activityId)
    onActivityClick(activityId)
  }

  const getActivityType = (typeId: string) => {
    return activityTypes.find((t) => t.id === typeId) || activityTypes[0]
  }

  if (activities.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-stone-500 dark:text-stone-400">
          No activities match the selected filters.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {activities.map((activity) => (
        <ActivityCard
          key={activity.id}
          activity={activity}
          activityType={getActivityType(activity.type)}
          isHighlighted={activity.id === highlightedActivityId}
          isExpanded={activity.id === expandedId}
          onClick={() => handleClick(activity.id)}
        />
      ))}
    </div>
  )
}
