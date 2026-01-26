'use client'

import { MapPin, ZoomIn, ZoomOut } from 'lucide-react'
import type { ActivityMapProps } from '../types'

// This is a placeholder component for the map
// In production, this would use Leaflet with actual map tiles
export function ActivityMap({
  activities,
  activityTypes,
  selectedActivityId,
  onMarkerClick,
  onMarkerHover,
}: ActivityMapProps) {
  const getActivityType = (typeId: string) => {
    return activityTypes.find((t) => t.id === typeId) || activityTypes[0]
  }

  // Group activities by location for marker display
  const locations = activities.reduce((acc, activity) => {
    const key = `${activity.location.coordinates[0]},${activity.location.coordinates[1]}`
    if (!acc[key]) {
      acc[key] = {
        coordinates: activity.location.coordinates,
        city: activity.location.city,
        country: activity.location.country,
        activities: [],
      }
    }
    acc[key].activities.push(activity)
    return acc
  }, {} as Record<string, { coordinates: [number, number]; city: string; country: string; activities: typeof activities }>)

  return (
    <div className="relative h-full min-h-[400px] bg-gradient-to-br from-[#9BB1DC]/20 to-[#003399]/10 dark:from-stone-800 dark:to-stone-900 rounded-xl overflow-hidden">
      {/* Map placeholder background */}
      <div className="absolute inset-0 opacity-30">
        <svg viewBox="0 0 800 500" className="w-full h-full">
          {/* Simplified Africa outline */}
          <path
            d="M350,50 L450,60 L500,100 L520,180 L510,250 L480,300 L450,350 L400,400 L350,420 L300,400 L280,350 L270,280 L280,200 L300,130 L350,50 Z"
            fill="currentColor"
            className="text-[#003399]/20 dark:text-white/10"
          />
        </svg>
      </div>

      {/* Markers */}
      <div className="absolute inset-0 p-4">
        {Object.values(locations).map((location, index) => {
          // Simple positioning based on coordinates (simplified for placeholder)
          const x = ((location.coordinates[1] + 20) / 60) * 100
          const y = ((40 - location.coordinates[0]) / 80) * 100

          const hasSelectedActivity = location.activities.some((a) => a.id === selectedActivityId)
          const primaryType = getActivityType(location.activities[0].type)

          return (
            <button
              key={index}
              onClick={() => onMarkerClick(location.activities[0].id)}
              onMouseEnter={() => onMarkerHover?.(location.activities[0].id)}
              onMouseLeave={() => onMarkerHover?.(null)}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 group
                ${hasSelectedActivity ? 'z-20' : 'z-10'}`}
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              {/* Marker */}
              <div
                className={`relative w-8 h-8 rounded-full flex items-center justify-center shadow-lg transition-transform
                  ${hasSelectedActivity ? 'scale-125' : 'hover:scale-110'}`}
                style={{ backgroundColor: primaryType.color }}
              >
                <MapPin className="w-4 h-4 text-white" />

                {/* Activity count badge */}
                {location.activities.length > 1 && (
                  <span className="absolute -top-1 -right-1 w-4 h-4 bg-[#F5CE2A] rounded-full text-[10px] font-bold text-[#003399] flex items-center justify-center">
                    {location.activities.length}
                  </span>
                )}
              </div>

              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                <div className="bg-white dark:bg-stone-800 rounded-lg shadow-xl px-3 py-2 whitespace-nowrap">
                  <p className="text-sm font-medium text-[#003399] dark:text-white">
                    {location.city}
                  </p>
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    {location.activities.length} activit{location.activities.length !== 1 ? 'ies' : 'y'}
                  </p>
                </div>
              </div>
            </button>
          )
        })}
      </div>

      {/* Map controls placeholder */}
      <div className="absolute bottom-4 right-4 flex flex-col gap-2">
        <button className="w-10 h-10 bg-white dark:bg-stone-800 rounded-lg shadow-lg flex items-center justify-center hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors">
          <ZoomIn className="w-5 h-5 text-stone-600 dark:text-stone-300" />
        </button>
        <button className="w-10 h-10 bg-white dark:bg-stone-800 rounded-lg shadow-lg flex items-center justify-center hover:bg-stone-50 dark:hover:bg-stone-700 transition-colors">
          <ZoomOut className="w-5 h-5 text-stone-600 dark:text-stone-300" />
        </button>
      </div>

      {/* Legend */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-stone-800 rounded-lg shadow-lg p-3">
        <p className="text-xs font-semibold text-stone-500 dark:text-stone-400 mb-2 uppercase tracking-wide">
          Activity Types
        </p>
        <div className="space-y-1">
          {activityTypes.map((type) => (
            <div key={type.id} className="flex items-center gap-2">
              <div
                className="w-3 h-3 rounded-full"
                style={{ backgroundColor: type.color }}
              />
              <span className="text-xs text-stone-600 dark:text-stone-300">
                {type.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Map attribution */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs text-stone-400 dark:text-stone-500">
        Interactive map placeholder • Uses Leaflet in production
      </div>
    </div>
  )
}
