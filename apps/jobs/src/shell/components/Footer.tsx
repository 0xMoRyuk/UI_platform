import shellData from '@/../product/shell/data.json'

interface FooterProps {
  onNavigate: (href: string) => void
}

export function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="bg-stone-900 text-stone-400 border-t border-stone-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Tagline */}
          <div>
            <h3 className="text-stone-50 font-semibold text-lg mb-2">
              {shellData.footer.copyright}
            </h3>
            <p className="text-sm">{shellData.footer.tagline}</p>
          </div>

          {/* Link columns */}
          {shellData.footer.columns.map((column) => (
            <div key={column.title}>
              <h4 className="text-stone-200 font-medium text-sm mb-3">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link) => (
                  <li key={link.href}>
                    <button
                      onClick={() => onNavigate(link.href)}
                      className="text-sm hover:text-stone-200 transition-colors"
                    >
                      {link.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Copyright */}
        <div className="mt-8 pt-8 border-t border-stone-800 text-xs text-stone-500">
          &copy; {new Date().getFullYear()} {shellData.footer.copyright}. All rights reserved.
        </div>
      </div>
    </footer>
  )
}
