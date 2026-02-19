import { Twitter, Linkedin, Share2 } from 'lucide-react'
import type { ShareButtonsProps } from '../types'

export function ShareButtons({ onShare }: ShareButtonsProps) {
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
        <Share2 className="w-4 h-4" />
        Share
      </span>
      <button
        onClick={() => onShare('twitter')}
        className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center
                 hover:bg-[#1DA1F2] hover:text-white transition-colors"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </button>
      <button
        onClick={() => onShare('linkedin')}
        className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 flex items-center justify-center
                 hover:bg-[#0A66C2] hover:text-white transition-colors"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </button>
    </div>
  )
}
