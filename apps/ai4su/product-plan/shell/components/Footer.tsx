interface FooterProps {
  currentLanguage: 'en' | 'fr'
}

const content = {
  en: {
    fundedBy: 'Funded by the European Union',
    implementedBy: 'Implemented by',
    privacy: 'Privacy Policy',
    legal: 'Legal Notice',
    accessibility: 'Accessibility',
    copyright: '© 2026 DataGov Initiative. All rights reserved.',
  },
  fr: {
    fundedBy: 'Financé par l\'Union européenne',
    implementedBy: 'Mis en œuvre par',
    privacy: 'Politique de confidentialité',
    legal: 'Mentions légales',
    accessibility: 'Accessibilité',
    copyright: '© 2026 Initiative DataGov. Tous droits réservés.',
  },
}

export function Footer({ currentLanguage }: FooterProps) {
  const t = content[currentLanguage]

  return (
    <footer className="bg-[#003399] text-white">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* EU Attribution - Mandatory */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              {/* EU Flag placeholder */}
              <div className="w-12 h-8 bg-[#9BB1DC] rounded flex items-center justify-center text-xs font-bold">
                EU
              </div>
              <span className="text-sm font-medium font-[Barlow]">{t.fundedBy}</span>
            </div>
            <p className="text-sm text-white/70">
              {t.implementedBy}
            </p>
          </div>

          {/* Partner Logos */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F5CE2A]">
              Partners
            </h3>
            <div className="flex flex-wrap gap-4">
              {/* Partner logo placeholders */}
              {['Digital Africa', 'Expertise France', 'GIZ'].map((partner) => (
                <div
                  key={partner}
                  className="px-3 py-2 bg-white/10 rounded text-xs font-medium"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>

          {/* Social & Hashtags */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold uppercase tracking-wider text-[#F5CE2A]">
              Follow
            </h3>
            <div className="flex flex-wrap gap-2 text-sm text-white/70">
              <span>#D4DataGOV</span>
              <span>#DataGovernanceAfrica</span>
              <span>#TeamEurope</span>
              <span>#GlobalGateway</span>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-white/60">{t.copyright}</p>
            <div className="flex items-center space-x-6 text-sm">
              <a href="/privacy" className="text-white/60 hover:text-white transition-colors">
                {t.privacy}
              </a>
              <a href="/legal" className="text-white/60 hover:text-white transition-colors">
                {t.legal}
              </a>
              <a href="/accessibility" className="text-white/60 hover:text-white transition-colors">
                {t.accessibility}
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
