import { ArrowRight, Calendar, Globe, Users } from 'lucide-react'
import type { SectionPreviewsProps, SectionPreview } from '@/../product/sections/home/types'

const sectionIcons: Record<string, typeof Calendar> = {
  Hackathons: Calendar,
  Ecosystem: Globe,
  Partners: Users,
}

interface PreviewCardProps {
  preview: SectionPreview
  index: number
  onClick?: () => void
}

function PreviewCard({ preview, index, onClick }: PreviewCardProps) {
  const Icon = sectionIcons[preview.title] || Globe

  // Alternate card styles for visual interest
  const isAlternate = index % 2 === 1

  return (
    <button
      onClick={onClick}
      className={`
        group relative overflow-hidden rounded-2xl text-left
        transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl
        ${isAlternate
          ? 'bg-brand-primary text-brand-primary-foreground'
          : 'bg-white dark:bg-stone-900 text-brand-primary dark:text-white border border-stone-200 dark:border-stone-800'
        }
      `}
    >
      {/* Image placeholder / gradient background */}
      <div className={`
        relative h-48 overflow-hidden
        ${isAlternate
          ? 'bg-gradient-to-br from-brand-primary to-brand-primary-darker'
          : 'bg-gradient-to-br from-stone-100 to-stone-200 dark:from-stone-800 dark:to-stone-900'
        }
      `}>
        {/* Decorative pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-40 h-40 rounded-full bg-current transform translate-x-10 -translate-y-10" />
          <div className="absolute bottom-0 left-0 w-32 h-32 rounded-full bg-current transform -translate-x-8 translate-y-8" />
        </div>

        {/* Icon */}
        <div className={`
          absolute top-6 left-6 w-14 h-14 rounded-xl flex items-center justify-center
          ${isAlternate
            ? 'bg-brand-accent text-brand-accent-foreground'
            : 'bg-brand-primary text-brand-primary-foreground dark:bg-brand-accent dark:text-brand-accent-foreground'
          }
        `}>
          <Icon className="w-7 h-7" />
        </div>

        {/* Stats badge */}
        <div className={`
          absolute bottom-4 right-4 px-3 py-1.5 rounded-full text-xs font-medium
          ${isAlternate
            ? 'bg-white/20 text-white'
            : 'bg-brand-primary/10 text-brand-primary dark:bg-white/10 dark:text-white'
          }
        `}>
          {preview.stats}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className={`
          text-xl font-bold mb-2 font-[Barlow]
          ${isAlternate ? 'text-white' : 'text-brand-primary dark:text-white'}
        `}>
          {preview.title}
        </h3>

        <p className={`
          text-sm mb-4 line-clamp-2
          ${isAlternate ? 'text-white/80' : 'text-stone-600 dark:text-stone-400'}
        `}>
          {preview.description}
        </p>

        <div className={`
          inline-flex items-center gap-2 text-sm font-medium
          ${isAlternate
            ? 'text-brand-accent'
            : 'text-brand-primary dark:text-brand-accent'
          }
        `}>
          <span>Explore</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </div>
      </div>

      {/* Hover overlay */}
      <div className={`
        absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none
        ${isAlternate
          ? 'bg-gradient-to-t from-brand-accent/10 to-transparent'
          : 'bg-gradient-to-t from-brand-primary/5 to-transparent'
        }
      `} />
    </button>
  )
}

export function SectionPreviews({ previews, onSectionClick }: SectionPreviewsProps) {
  return (
    <section className="py-16 sm:py-24 bg-stone-50 dark:bg-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white mb-4 font-[Barlow]">
            Discover More
          </h2>
          <p className="text-lg text-stone-600 dark:text-stone-400 max-w-2xl mx-auto">
            Explore hackathons, ecosystem activities, and the partners making AI4Startups possible.
          </p>
        </div>

        {/* Preview cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {previews.map((preview, index) => (
            <PreviewCard
              key={preview.id}
              preview={preview}
              index={index}
              onClick={() => onSectionClick?.(preview.id, preview.link)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
