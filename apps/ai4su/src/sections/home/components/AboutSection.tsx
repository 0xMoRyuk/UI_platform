'use client'

import { Link } from 'react-router-dom'
import { Image as ImageIcon } from 'lucide-react'
import type { HomeAbout } from '@/../product/sections/home/types'

interface AboutSectionProps {
  about: HomeAbout
}

export function AboutSection({ about }: AboutSectionProps) {
  const linkIndex = about.datagovLink.indexOf(about.datagovLinkText)
  const beforeLink = about.datagovLink.slice(0, linkIndex)
  const afterLink = about.datagovLink.slice(linkIndex + about.datagovLinkText.length)

  return (
    <section className="bg-white dark:bg-stone-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex flex-col lg:flex-row items-start gap-12">
          {/* Text content */}
          <div className="flex-1 lg:max-w-[55%]">
            <h2 className="text-4xl sm:text-5xl font-bold text-brand-primary dark:text-white font-[Barlow] mb-8">
              {about.title}
            </h2>

            <div className="space-y-4 text-stone-600 dark:text-stone-400 leading-relaxed">
              {about.paragraphs.map((paragraph, i) => (
                <p key={i}>{paragraph}</p>
              ))}
            </div>

            <p className="mt-6 text-stone-600 dark:text-stone-400 leading-relaxed">
              {beforeLink}
              <Link
                to="/datagov"
                className="font-semibold text-brand-primary dark:text-brand-secondary underline underline-offset-2 hover:text-brand-accent transition-colors"
              >
                {about.datagovLinkText}
              </Link>
              {afterLink}
            </p>

            <p className="mt-4 text-sm text-stone-500 dark:text-stone-500 italic">
              * {about.countriesFootnote}
            </p>
          </div>

          {/* Photo gallery grid */}
          <div className="w-full lg:w-[40%] shrink-0">
            <div className="grid grid-cols-2 gap-3">
              {about.photos.map((photo) => (
                <div
                  key={photo.id}
                  className={`group relative rounded-xl overflow-hidden bg-stone-200 dark:bg-stone-800 aspect-square
                    ${photo.featured ? 'col-span-2 row-span-2' : ''}`}
                >
                  {/* Placeholder gradient */}
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-stone-200 to-stone-300 dark:from-stone-700 dark:to-stone-800">
                    <ImageIcon className="w-8 h-8 text-stone-400 dark:text-stone-500" />
                  </div>

                  {/* Hover overlay with caption */}
                  <div className="absolute inset-0 bg-brand-primary/0 group-hover:bg-brand-primary/60 transition-colors duration-200 flex items-end">
                    <div className="p-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                      <p className="text-white text-sm font-medium">
                        {photo.caption}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
