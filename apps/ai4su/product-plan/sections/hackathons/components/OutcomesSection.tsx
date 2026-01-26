import { CheckCircle, TrendingUp } from 'lucide-react'
import type { OutcomesSectionProps } from '../types'

export function OutcomesSection({ outcomes }: OutcomesSectionProps) {
  return (
    <section className="py-12 border-t border-stone-200 dark:border-stone-800">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
          <TrendingUp className="w-5 h-5 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-2xl font-bold text-[#003399] dark:text-white font-[Barlow]">
          Key Outcomes
        </h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {outcomes.map((outcome, index) => (
          <div
            key={index}
            className="flex items-start gap-3 bg-green-50 dark:bg-green-900/20 rounded-xl p-4"
          >
            <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400 shrink-0 mt-0.5" />
            <span className="text-stone-700 dark:text-stone-300">{outcome}</span>
          </div>
        ))}
      </div>
    </section>
  )
}
