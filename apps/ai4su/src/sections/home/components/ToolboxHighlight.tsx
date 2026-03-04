import { ArrowRight, Github, Boxes } from 'lucide-react'
import { Separator } from '@ui-platform/ui/components/separator'
import { Button } from '@ui-platform/ui/components/button'
import { Badge } from '@ui-platform/ui/components/badge'
import type { ToolboxHighlightProps, FeaturedModel } from '@/../product/sections/home/types'
import { sectorColorsByLabel } from '../../../shared/lookups'

interface ModelCardProps {
  model: FeaturedModel
  githubLabel: string
  onClick?: () => void
}

function ModelCard({ model, githubLabel, onClick }: ModelCardProps) {
  const colors = sectorColorsByLabel[model.sector] || sectorColorsByLabel['Crop Science']

  return (
    <button
      onClick={onClick}
      className="group relative bg-white dark:bg-stone-900 rounded-2xl p-6 text-left
                 border border-stone-200 dark:border-stone-800
                 hover:border-brand-primary dark:hover:border-brand-secondary
                 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Sector badge */}
      <Badge className="mb-4 border" style={{ backgroundColor: colors.bg, color: colors.text, borderColor: colors.border }}>
        {model.sector}
      </Badge>

      {/* Model name */}
      <h3 className="text-lg font-bold text-brand-primary dark:text-white mb-2 font-[Barlow] group-hover:text-brand-accent transition-colors">
        {model.name}
      </h3>

      {/* Description */}
      <p className="text-sm text-stone-600 dark:text-stone-400 mb-4 line-clamp-2">
        {model.description}
      </p>

      {/* GitHub link indicator */}
      <div className="flex items-center gap-2 text-sm text-stone-500 dark:text-stone-500 group-hover:text-brand-primary dark:group-hover:text-brand-secondary transition-colors">
        <Github className="w-4 h-4" />
        <span>{githubLabel}</span>
        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
    </button>
  )
}

export function ToolboxHighlight({ featuredModels, toolboxHighlight, onModelClick, onViewAllClick }: ToolboxHighlightProps) {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-stone-50 dark:from-stone-950 dark:to-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full text-sm font-medium text-brand-primary dark:text-brand-secondary mb-4">
              <Boxes className="w-4 h-4" />
              <span>{toolboxHighlight.badge}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white font-[Barlow]">
              {toolboxHighlight.title}
            </h2>
            <p className="mt-4 text-lg text-stone-600 dark:text-stone-400 max-w-2xl">
              {toolboxHighlight.description}
            </p>
          </div>

          <Button
            onClick={onViewAllClick}
            className="group gap-2 px-6 py-3 h-auto bg-brand-primary text-brand-primary-foreground font-semibold rounded-lg
                     hover:bg-brand-primary-dark shrink-0"
          >
            {toolboxHighlight.ctaText}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Model cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              githubLabel={toolboxHighlight.githubLabel}
              onClick={() => onModelClick?.(model.id)}
            />
          ))}
        </div>

        {/* Bottom stats bar */}
        <Separator className="mt-12" />
        <div className="flex flex-wrap items-center justify-center gap-8 sm:gap-16 py-8">
          {toolboxHighlight.stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-brand-primary dark:text-brand-accent font-[Barlow]">
                {stat.value}
              </div>
              <div className="text-sm text-stone-500 dark:text-stone-400">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
