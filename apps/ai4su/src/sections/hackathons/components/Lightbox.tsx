'use client'

import { useEffect, useCallback } from 'react'
import { X, ChevronLeft, ChevronRight, Image as ImageIcon } from 'lucide-react'
import { Dialog, DialogContent, DialogTitle } from '@ui-platform/ui/components/dialog'
import { Button } from '@ui-platform/ui/components/button'
import type { LightboxProps } from '@/../product/sections/hackathons/types'

export function Lightbox({
  photos,
  currentPhotoId,
  isOpen,
  onClose,
  onNext,
  onPrevious,
}: LightboxProps) {
  const currentPhoto = photos.find((p) => p.id === currentPhotoId)
  const currentIndex = photos.findIndex((p) => p.id === currentPhotoId)

  // Custom arrow key handler — Dialog handles Escape, we handle arrows
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!isOpen) return
      if (e.key === 'ArrowLeft') onPrevious()
      if (e.key === 'ArrowRight') onNext()
    },
    [isOpen, onNext, onPrevious]
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  if (!currentPhoto) return null

  return (
    <Dialog open={isOpen} onOpenChange={(open) => { if (!open) onClose() }}>
      <DialogContent
        className="bg-black/95 border-0 max-w-[100vw] w-screen h-screen max-h-screen p-0 rounded-none gap-0"
        showCloseButton={false}
      >
        <DialogTitle className="sr-only">
          Photo: {currentPhoto.caption}
        </DialogTitle>

        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white z-10"
        >
          <X className="w-6 h-6" />
        </Button>

        {/* Navigation buttons */}
        {currentIndex > 0 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white z-10"
          >
            <ChevronLeft className="w-6 h-6" />
          </Button>
        )}

        {currentIndex < photos.length - 1 && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 text-white z-10"
          >
            <ChevronRight className="w-6 h-6" />
          </Button>
        )}

        {/* Image container */}
        <div className="flex items-center justify-center h-full">
          <div className="max-w-5xl max-h-[80vh] mx-4">
            {/* Placeholder for image */}
            <div className="w-full aspect-video bg-stone-800 rounded-lg flex items-center justify-center min-w-[300px] min-h-[200px]">
              <ImageIcon className="w-16 h-16 text-stone-600" />
            </div>
          </div>
        </div>

        {/* Caption and counter */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <p className="text-white font-medium mb-2">{currentPhoto.caption}</p>
          <p className="text-white/60 text-sm">
            {currentIndex + 1} of {photos.length}
          </p>
        </div>

        {/* Thumbnail strip */}
        <div className="absolute bottom-20 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-full px-4">
          {photos.map((photo, index) => (
            <button
              key={photo.id}
              onClick={() => {
                // Find direction and navigate
                if (index > currentIndex) {
                  for (let i = currentIndex; i < index; i++) onNext()
                } else if (index < currentIndex) {
                  for (let i = currentIndex; i > index; i--) onPrevious()
                }
              }}
              className={`w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-stone-700 flex items-center justify-center
                         ${photo.id === currentPhotoId ? 'ring-2 ring-brand-accent' : 'opacity-50 hover:opacity-100'} transition-opacity`}
            >
              <ImageIcon className="w-4 h-4 text-stone-500" />
            </button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  )
}
