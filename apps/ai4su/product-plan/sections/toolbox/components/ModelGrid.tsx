import { ModelCard } from './ModelCard'
import type { ModelGridProps } from '../types'

export function ModelGrid({ models, onModelClick }: ModelGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 lg:gap-6">
      {models.map((model) => (
        <ModelCard
          key={model.id}
          model={model}
          onClick={() => onModelClick(model.id)}
        />
      ))}
    </div>
  )
}
