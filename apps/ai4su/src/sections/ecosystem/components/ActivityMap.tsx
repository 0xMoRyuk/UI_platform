'use client'

import { useEffect, useMemo } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import type { ActivityMapProps } from '@/../product/sections/ecosystem/types'

// Import Leaflet CSS
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon in Vite/webpack builds
delete (L.Icon.Default.prototype as unknown as { _getIconUrl?: unknown })._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

// Create custom colored marker icons
function createColoredIcon(color: string, isSelected: boolean = false): L.DivIcon {
  const size = isSelected ? 36 : 28
  return L.divIcon({
    className: 'custom-marker',
    html: `
      <div style="
        width: ${size}px;
        height: ${size}px;
        background-color: ${color};
        border-radius: 50%;
        border: 3px solid white;
        box-shadow: 0 2px 8px rgba(0,0,0,0.3);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: transform 0.2s;
        ${isSelected ? 'transform: scale(1.2);' : ''}
      ">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
          <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/>
          <circle cx="12" cy="10" r="3"/>
        </svg>
      </div>
    `,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  })
}

// Component to handle map view changes when selection changes
function MapUpdater({ selectedActivityId, activities }: { selectedActivityId: string | null; activities: ActivityMapProps['activities'] }) {
  const map = useMap()

  useEffect(() => {
    if (selectedActivityId) {
      const activity = activities.find(a => a.id === selectedActivityId)
      if (activity) {
        map.flyTo(
          [activity.location.coordinates[0], activity.location.coordinates[1]],
          8,
          { duration: 0.5 }
        )
      }
    }
  }, [selectedActivityId, activities, map])

  return null
}

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
  const locations = useMemo(() => {
    return activities.reduce((acc, activity) => {
      const key = `${activity.location.coordinates[0]},${activity.location.coordinates[1]}`
      if (!acc[key]) {
        acc[key] = {
          coordinates: activity.location.coordinates as [number, number],
          city: activity.location.city,
          country: activity.location.country,
          activities: [],
        }
      }
      acc[key].activities.push(activity)
      return acc
    }, {} as Record<string, { coordinates: [number, number]; city: string; country: string; activities: typeof activities }>)
  }, [activities])

  // Africa center coordinates
  const africaCenter: [number, number] = [5, 20]
  const defaultZoom = 3

  return (
    <div className="relative h-full min-h-[400px] rounded-xl overflow-hidden">
      <MapContainer
        center={africaCenter}
        zoom={defaultZoom}
        scrollWheelZoom={true}
        className="h-full w-full"
        style={{ minHeight: '400px' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater selectedActivityId={selectedActivityId} activities={activities} />

        {Object.values(locations).map((location, index) => {
          const hasSelectedActivity = location.activities.some((a) => a.id === selectedActivityId)
          const primaryType = getActivityType(location.activities[0].type)

          return (
            <Marker
              key={index}
              position={location.coordinates}
              icon={createColoredIcon(primaryType.color, hasSelectedActivity)}
              eventHandlers={{
                click: () => onMarkerClick(location.activities[0].id),
                mouseover: () => onMarkerHover?.(location.activities[0].id),
                mouseout: () => onMarkerHover?.(null),
              }}
            >
              <Popup>
                <div className="min-w-[200px]">
                  <h3 className="font-bold text-[#003399] text-base mb-1">
                    {location.city}, {location.country}
                  </h3>
                  <p className="text-sm text-stone-600 mb-2">
                    {location.activities.length} activit{location.activities.length !== 1 ? 'ies' : 'y'}
                  </p>
                  <div className="space-y-2">
                    {location.activities.slice(0, 3).map((activity) => {
                      const actType = getActivityType(activity.type)
                      return (
                        <button
                          key={activity.id}
                          onClick={() => onMarkerClick(activity.id)}
                          className="w-full text-left p-2 rounded-lg bg-stone-50 hover:bg-stone-100 transition-colors"
                        >
                          <div className="flex items-center gap-2">
                            <div
                              className="w-2 h-2 rounded-full shrink-0"
                              style={{ backgroundColor: actType.color }}
                            />
                            <span className="text-sm font-medium text-stone-700 line-clamp-1">
                              {activity.title}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                    {location.activities.length > 3 && (
                      <p className="text-xs text-stone-500 text-center">
                        +{location.activities.length - 3} more
                      </p>
                    )}
                  </div>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>

      {/* Legend overlay */}
      <div className="absolute bottom-4 left-4 bg-white dark:bg-stone-800 rounded-lg shadow-lg p-3 z-[1000]">
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
    </div>
  )
}
