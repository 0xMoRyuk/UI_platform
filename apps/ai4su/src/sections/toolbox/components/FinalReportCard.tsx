import { Download, FileText, BookOpen, Calendar } from 'lucide-react'
import type { FinalReportCardProps } from '@/../product/sections/toolbox/types'

export function FinalReportCard({ report, content, onDownload }: FinalReportCardProps) {
  return (
    <section className="py-12 border-t border-stone-200 dark:border-stone-800">
      <div className="bg-gradient-to-br from-brand-primary to-brand-primary-darker rounded-2xl overflow-hidden">
        <div className="p-8 md:p-12">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            {/* Left: Icon and branding */}
            <div className="shrink-0">
              <div className="w-24 h-24 rounded-2xl bg-white/10 flex items-center justify-center">
                <BookOpen className="w-12 h-12 text-brand-accent" />
              </div>
            </div>

            {/* Middle: Content */}
            <div className="flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-accent rounded-full text-xs font-bold text-brand-accent-foreground mb-4">
                <FileText className="w-3 h-3" />
                <span>{content.badge}</span>
              </div>

              <h2 className="text-2xl md:text-3xl font-bold text-white font-[Barlow] mb-3">
                {report.title}
              </h2>

              <p className="text-white/80 mb-4 max-w-xl">
                {report.description}
              </p>

              <div className="flex flex-wrap items-center gap-4 text-sm text-white/60">
                <div className="flex items-center gap-1.5">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(report.publishedDate).toLocaleDateString('en-US', {
                      month: 'long',
                      year: 'numeric',
                    })}
                  </span>
                </div>
                <div className="flex items-center gap-1.5">
                  <FileText className="w-4 h-4" />
                  <span>{report.pages} {content.pagesLabel}</span>
                </div>
              </div>
            </div>

            {/* Right: Download button */}
            <div className="shrink-0">
              <button
                onClick={() => onDownload(report.pdfUrl)}
                className="group inline-flex items-center gap-3 px-8 py-4 bg-brand-accent text-brand-accent-foreground font-bold rounded-xl
                         hover:bg-white transition-colors shadow-lg shadow-black/20"
              >
                <Download className="w-5 h-5" />
                <span>{content.downloadText}</span>
              </button>
            </div>
          </div>
        </div>

        {/* EU Funding badge */}
        <div className="bg-white/5 border-t border-white/10 px-8 py-4">
          <p className="text-xs text-white/50 text-center">
            {content.fundedByBadge}
          </p>
        </div>
      </div>
    </section>
  )
}
