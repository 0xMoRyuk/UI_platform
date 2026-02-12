import { ArrowRight, Github, Boxes } from 'lucide-react'
import type { ToolboxHighlightProps, FeaturedModel } from '@/../product/sections/home/types'

const sectorColors: Record<string, { bg: string; text: string; border: string }> = {
  Agriculture: { bg: 'bg-green-100 dark:bg-green-900/30', text: 'text-green-700 dark:text-green-300', border: 'border-green-200 dark:border-green-800' },
  Healthcare: { bg: 'bg-red-100 dark:bg-red-900/30', text: 'text-red-700 dark:text-red-300', border: 'border-red-200 dark:border-red-800' },
  FinTech: { bg: 'bg-blue-100 dark:bg-blue-900/30', text: 'text-blue-700 dark:text-blue-300', border: 'border-blue-200 dark:border-blue-800' },
  Education: { bg: 'bg-purple-100 dark:bg-purple-900/30', text: 'text-purple-700 dark:text-purple-300', border: 'border-purple-200 dark:border-purple-800' },
  Environment: { bg: 'bg-teal-100 dark:bg-teal-900/30', text: 'text-teal-700 dark:text-teal-300', border: 'border-teal-200 dark:border-teal-800' },
  Logistics: { bg: 'bg-orange-100 dark:bg-orange-900/30', text: 'text-orange-700 dark:text-orange-300', border: 'border-orange-200 dark:border-orange-800' },
}

interface ModelCardProps {
  model: FeaturedModel
  onClick?: () => void
}

function ModelCard({ model, onClick }: ModelCardProps) {
  const colors = sectorColors[model.sector] || sectorColors.Agriculture

  return (
    <button
      onClick={onClick}
      className="group relative bg-white dark:bg-stone-900 rounded-2xl p-6 text-left
                 border border-stone-200 dark:border-stone-800
                 hover:border-brand-primary dark:hover:border-brand-secondary
                 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
    >
      {/* Sector badge */}
      <div className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium mb-4 ${colors.bg} ${colors.text} border ${colors.border}`}>
        {model.sector}
      </div>

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
        <span>View on GitHub</span>
        <ArrowRight className="w-3 h-3 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
      </div>

      {/* Hover gradient overlay */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-brand-primary/0 to-brand-primary/0 group-hover:from-brand-primary/5 group-hover:to-transparent transition-all duration-300 pointer-events-none" />
    </button>
  )
}

export function ToolboxHighlight({ featuredModels, onModelClick, onViewAllClick }: ToolboxHighlightProps) {
  return (
    <section className="py-16 sm:py-24 bg-gradient-to-b from-white to-stone-50 dark:from-stone-950 dark:to-stone-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-brand-primary/10 dark:bg-brand-primary/20 rounded-full text-sm font-medium text-brand-primary dark:text-brand-secondary mb-4">
              <Boxes className="w-4 h-4" />
              <span>Open Source</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold text-brand-primary dark:text-white font-[Barlow]">
              AI Model Toolbox
            </h2>
            <p className="mt-4 text-lg text-stone-600 dark:text-stone-400 max-w-2xl">
              Explore 24 open-source AI models built for African contexts — from agriculture to healthcare, all freely available on GitHub.
            </p>
          </div>

          <button
            onClick={onViewAllClick}
            className="group inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-brand-primary-foreground font-semibold rounded-lg
                     hover:bg-brand-primary-dark transition-colors shrink-0"
          >
            Explore Toolbox
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        {/* Model cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredModels.map((model) => (
            <ModelCard
              key={model.id}
              model={model}
              onClick={() => onModelClick?.(model.id)}
            />
          ))}
        </div>

        {/* Bottom stats bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 sm:gap-16 py-8 border-t border-stone-200 dark:border-stone-800">
          {[
            { value: '24', label: 'Models' },
            { value: '6', label: 'Sectors' },
            { value: '15K+', label: 'GitHub Stars' },
            { value: '50+', label: 'Startups Using' },
          ].map((stat) => (
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
