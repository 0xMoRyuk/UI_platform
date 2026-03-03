import { Twitter, Linkedin, Share2 } from 'lucide-react'
import { Button } from '@ui-platform/ui/components/button'
import type { ShareButtonsProps } from '@/../product/sections/hackathons/types'

export function ShareButtons({ hackathon: _hackathon, onShare }: ShareButtonsProps) {
  // Note: hackathon is available for future use via _hackathon (e.g., for dynamic share text)
  void _hackathon
  return (
    <div className="flex items-center gap-3">
      <span className="text-sm text-stone-500 dark:text-stone-400 flex items-center gap-1.5">
        <Share2 className="w-4 h-4" />
        Share
      </span>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onShare('twitter')}
        className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-[#1DA1F2] hover:text-white"
        aria-label="Share on Twitter"
      >
        <Twitter className="w-4 h-4" />
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onShare('linkedin')}
        className="w-9 h-9 rounded-full bg-stone-100 dark:bg-stone-800 hover:bg-[#0A66C2] hover:text-white"
        aria-label="Share on LinkedIn"
      >
        <Linkedin className="w-4 h-4" />
      </Button>
    </div>
  )
}
