import { Twitter, Linkedin, Hash } from 'lucide-react'
import type { SocialLinksProps } from '../types'

export function SocialLinksBar({ links, onSocialClick }: SocialLinksProps) {
  return (
    <section className="py-12 bg-white dark:bg-stone-950 border-t border-stone-200 dark:border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Hashtags */}
          <div className="flex flex-wrap items-center justify-center gap-2">
            {links.hashtags.map((tag) => (
              <span
                key={tag}
                className="inline-flex items-center gap-1 px-3 py-1.5 bg-[#003399]/10 dark:bg-[#003399]/20 rounded-full text-sm font-medium text-[#003399] dark:text-[#9BB1DC]"
              >
                <Hash className="w-3 h-3" />
                {tag.replace('#', '')}
              </span>
            ))}
          </div>

          {/* Social buttons */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-stone-500 dark:text-stone-400">Follow us:</span>
            <button
              onClick={() => onSocialClick?.('twitter')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#1DA1F2] text-white font-medium rounded-lg
                       hover:bg-[#1DA1F2]/90 transition-colors"
            >
              <Twitter className="w-4 h-4" />
              <span className="hidden sm:inline">Twitter</span>
            </button>
            <button
              onClick={() => onSocialClick?.('linkedin')}
              className="inline-flex items-center gap-2 px-4 py-2 bg-[#0A66C2] text-white font-medium rounded-lg
                       hover:bg-[#0A66C2]/90 transition-colors"
            >
              <Linkedin className="w-4 h-4" />
              <span className="hidden sm:inline">LinkedIn</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
