'use client'

import { Calendar, MapPin, Users, ChevronDown, Download, ExternalLink, FileText, Video, Link as LinkIcon, Image as ImageIcon } from 'lucide-react'
import type { ActivityCardProps } from '../types'

const countryFlags: Record<string, string> = {
  KE: '🇰🇪',
  NG: '🇳🇬',
  GH: '🇬🇭',
  SN: '🇸🇳',
  RW: '🇷🇼',
  ZA: '🇿🇦',
  EG: '🇪🇬',
  MA: '🇲🇦',
  ET: '🇪🇹',
}

const resourceIcons = {
  pdf: FileText,
  video: Video,
  link: LinkIcon,
}

export function ActivityCard({
  activity,
  activityType,
  isHighlighted,
  isExpanded,
  onClick,
  onResourceDownload,
}: ActivityCardProps) {
  const formatDateRange = (start: string, end: string) => {
    const startDate = new Date(start)
    const endDate = new Date(end)

    if (start === end) {
      return startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    }

    const startStr = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
    const endStr = endDate.toLocaleDateString('en-US', { day: 'numeric', year: 'numeric' })
    return `${startStr}-${endStr}`
  }

  return (
    <div
      id={`activity-${activity.id}`}
      className={`bg-white dark:bg-stone-900 rounded-xl border-2 transition-all duration-300
        ${isHighlighted
          ? 'border-[#003399] shadow-lg ring-2 ring-[#003399]/20'
          : 'border-stone-200 dark:border-stone-800 hover:border-[#003399]/50'
        }`}
    >
      {/* Card header - always visible */}
      <button
        onClick={onClick}
        className="w-full p-5 text-left"
      >
        <div className="flex items-start gap-4">
          {/* Type indicator */}
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
            style={{ backgroundColor: `${activityType.color}20` }}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: activityType.color }}
            />
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            {/* Type badge */}
            <span
              className="inline-block px-2 py-0.5 rounded text-xs font-medium text-white mb-2"
              style={{ backgroundColor: activityType.color }}
            >
              {activityType.label}
            </span>

            {/* Title */}
            <h3 className="text-lg font-bold text-[#003399] dark:text-white font-[Barlow] mb-2">
              {activity.title}
            </h3>

            {/* Meta info */}
            <div className="flex flex-wrap items-center gap-3 text-sm text-stone-500 dark:text-stone-400 mb-2">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                <span>{formatDateRange(activity.startDate, activity.endDate)}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span>{countryFlags[activity.location.countryCode]}</span>
                <span>{activity.location.city}</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Users className="w-4 h-4" />
                <span>{activity.participantCount}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-sm text-stone-600 dark:text-stone-400 line-clamp-2">
              {activity.description}
            </p>
          </div>

          {/* Expand indicator */}
          <ChevronDown
            className={`w-5 h-5 text-stone-400 shrink-0 transition-transform duration-200
              ${isExpanded ? 'rotate-180' : ''}`}
          />
        </div>
      </button>

      {/* Expanded content */}
      {isExpanded && (
        <div className="px-5 pb-5 border-t border-stone-100 dark:border-stone-800 pt-4">
          {/* Full description */}
          <p className="text-stone-600 dark:text-stone-400 mb-4 leading-relaxed">
            {activity.fullDescription}
          </p>

          {/* Highlights */}
          {activity.highlights.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-[#003399] dark:text-[#9BB1DC] mb-2">
                Highlights
              </p>
              <div className="flex flex-wrap gap-2">
                {activity.highlights.map((highlight, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-stone-100 dark:bg-stone-800 rounded-full text-xs text-stone-700 dark:text-stone-300"
                  >
                    {highlight}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Venue */}
          <div className="flex items-start gap-2 mb-4 text-sm text-stone-600 dark:text-stone-400">
            <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
            <span>{activity.location.venue}, {activity.location.city}, {activity.location.country}</span>
          </div>

          {/* Photos */}
          {activity.photos.length > 0 && (
            <div className="mb-4">
              <p className="text-sm font-semibold text-[#003399] dark:text-[#9BB1DC] mb-2">
                Photos
              </p>
              <div className="flex gap-2 overflow-x-auto">
                {activity.photos.map((photo) => (
                  <div
                    key={photo.id}
                    className="w-24 h-24 rounded-lg bg-stone-200 dark:bg-stone-800 flex items-center justify-center shrink-0"
                  >
                    <ImageIcon className="w-6 h-6 text-stone-400" />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Resources */}
          {activity.resources.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-[#003399] dark:text-[#9BB1DC] mb-2">
                Resources
              </p>
              <div className="flex flex-wrap gap-2">
                {activity.resources.map((resource, index) => {
                  const Icon = resourceIcons[resource.type]
                  return (
                    <button
                      key={index}
                      onClick={() => onResourceDownload?.(resource.url)}
                      className="inline-flex items-center gap-2 px-3 py-2 bg-[#003399]/10 dark:bg-[#003399]/20
                               text-[#003399] dark:text-[#9BB1DC] rounded-lg text-sm font-medium
                               hover:bg-[#003399] hover:text-white transition-colors"
                    >
                      <Icon className="w-4 h-4" />
                      <span>{resource.title}</span>
                      {resource.type === 'pdf' && <Download className="w-3 h-3" />}
                      {resource.type === 'link' && <ExternalLink className="w-3 h-3" />}
                    </button>
                  )
                })}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
