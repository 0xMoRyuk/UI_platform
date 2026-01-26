import { useState } from 'react'
import { AppShell } from './components/AppShell'

export default function ShellPreview() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr'>('en')
  const [activeSection, setActiveSection] = useState('/')

  const navigationItems = [
    { label: 'Home', href: '/', isActive: activeSection === '/' },
    { label: 'Toolbox', href: '/toolbox', isActive: activeSection === '/toolbox' },
    { label: 'Hackathons', href: '/hackathons', isActive: activeSection === '/hackathons' },
    { label: 'Ecosystem', href: '/ecosystem', isActive: activeSection === '/ecosystem' },
    { label: 'Partners', href: '/partners', isActive: activeSection === '/partners' },
  ]

  const handleNavigate = (href: string) => {
    setActiveSection(href)
    console.log('Navigate to:', href)
  }

  const handleSearch = (query: string) => {
    console.log('Search:', query)
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      currentLanguage={currentLanguage}
      onNavigate={handleNavigate}
      onLanguageChange={setCurrentLanguage}
      onSearch={handleSearch}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-[#DBD2CC]/20 border-2 border-dashed border-[#9BB1DC] rounded-lg p-12 text-center">
          <h1 className="text-3xl font-bold text-[#003399] mb-4 font-[Barlow]">
            Content Area
          </h1>
          <p className="text-stone-600 dark:text-stone-400 mb-6">
            Section content will render here. Currently viewing: <strong>{activeSection}</strong>
          </p>
          <p className="text-sm text-stone-500">
            Language: <strong>{currentLanguage.toUpperCase()}</strong>
          </p>
        </div>

        {/* Sample KPI Cards Preview */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { label: 'AI Models', value: '24', color: '#003399' },
            { label: 'Hackathons', value: '6', color: '#9BB1DC' },
            { label: 'Countries', value: '8', color: '#F5CE2A' },
            { label: 'Participants', value: '500+', color: '#DBD2CC' },
          ].map((kpi) => (
            <div
              key={kpi.label}
              className="bg-white rounded-lg shadow-md p-6 border-l-4"
              style={{ borderLeftColor: kpi.color }}
            >
              <p className="text-sm font-medium text-stone-500 font-[Barlow]">{kpi.label}</p>
              <p className="text-3xl font-bold text-[#003399] mt-1">{kpi.value}</p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
