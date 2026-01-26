import { Brain, Trophy, Globe, BookOpen } from 'lucide-react'
import type { KPISummaryBarProps } from '../types'

const iconMap = {
  brain: Brain,
  trophy: Trophy,
  globe: Globe,
  book: BookOpen,
}

export function KPISummaryBar({ items }: KPISummaryBarProps) {
  return (
    <div className="bg-[#003399] text-white py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-12">
          {items.map((item) => {
            const Icon = iconMap[item.icon]
            return (
              <div key={item.label} className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-white/10 flex items-center justify-center">
                  <Icon className="w-5 h-5 text-[#F5CE2A]" />
                </div>
                <div>
                  <div className="text-2xl font-bold font-[Barlow]">{item.value}</div>
                  <div className="text-xs text-white/70 uppercase tracking-wide">{item.label}</div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
