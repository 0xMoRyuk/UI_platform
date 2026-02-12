import { Camera, Image as ImageIcon } from 'lucide-react'
import type { PhotoGalleryProps } from '@/../product/sections/hackathons/types'

export function PhotoGallery({ photos, onPhotoClick }: PhotoGalleryProps) {
  return (
    <section className="py-12 border-t border-stone-200 dark:border-stone-800">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 rounded-lg bg-brand-primary/10 dark:bg-brand-primary/20 flex items-center justify-center">
          <Camera className="w-5 h-5 text-brand-primary dark:text-brand-secondary" />
        </div>
        <h2 className="text-2xl font-bold text-brand-primary dark:text-white font-[Barlow]">
          Photo Gallery
        </h2>
        <span className="text-sm text-stone-500 dark:text-stone-400">
          {photos.length} photos
        </span>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
        {photos.map((photo) => (
          <button
            key={photo.id}
            onClick={() => onPhotoClick(photo.id)}
            className={`group relative rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-800 aspect-square
                       hover:ring-2 hover:ring-brand-primary hover:ring-offset-2 dark:hover:ring-offset-stone-950
                       transition-all duration-200 ${photo.featured ? 'md:col-span-2 md:row-span-2' : ''}`}
          >
            {/* Placeholder for image */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800">
              <ImageIcon className="w-8 h-8 text-stone-400 dark:text-stone-500" />
            </div>

            {/* Hover overlay */}
            <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/60 transition-colors duration-200 flex items-end">
              <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <p className="text-white text-sm font-medium line-clamp-2">
                  {photo.caption}
                </p>
              </div>
            </div>

            {/* Featured badge */}
            {photo.featured && (
              <div className="absolute top-2 left-2 px-2 py-1 bg-brand-accent rounded text-xs font-bold text-brand-accent-foreground">
                Featured
              </div>
            )}
          </button>
        ))}
      </div>
    </section>
  )
}
