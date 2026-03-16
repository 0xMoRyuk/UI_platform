import { Link } from 'react-router-dom'
import shellData from '@/../product/shell/data.json'

interface FooterProps {
  currentLanguage: 'en' | 'fr'
}

export function Footer({ currentLanguage }: FooterProps) {
  const { footer } = shellData
  const t = footer[currentLanguage]

  return (
    <footer className="bg-brand-primary text-brand-primary-foreground">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* EU Attribution - Mandatory */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <span className="text-3xl" role="img" aria-label="European Union flag">🇪🇺</span>
              <span className="text-sm font-medium font-[Barlow]">{t.fundedBy}</span>
            </div>
            <p className="text-sm text-white/70">
              {t.implementedBy}
            </p>
          </div>

          {/* Social & Hashtags */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-brand-accent">
              {footer.followHeading}
            </h3>
            <div className="flex flex-wrap gap-2 text-sm text-white/70">
              {footer.hashtags.map((tag) => (
                <span key={tag}>{tag}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">{t.copyright}</p>
            <div className="flex items-center space-x-6 text-sm text-white/60">
              <Link to="/privacy" className="hover:text-white transition-colors">{t.privacy}</Link>
              <Link to="/legal" className="hover:text-white transition-colors">{t.legal}</Link>
              <Link to="/accessibility" className="hover:text-white transition-colors">{t.accessibility}</Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
