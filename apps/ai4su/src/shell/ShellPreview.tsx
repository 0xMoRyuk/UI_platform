import { useState } from 'react'
import { AppShell } from './components/AppShell'
import shellData from '@/../product/shell/data.json'
import homeData from '@/../product/sections/home/data.json'

const borderClasses = [
  'border-l-brand-primary',
  'border-l-brand-secondary',
  'border-l-brand-accent',
  'border-l-brand-neutral',
]

export default function ShellPreview() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'fr'>('en')
  const [activeSection, setActiveSection] = useState('/')

  const navigationItems = shellData.navigation.map((item) => ({
    ...item,
    isActive: activeSection === item.href,
  }))

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
        <div className="bg-brand-neutral/20 border-2 border-dashed border-brand-secondary rounded-lg p-12 text-center">
          <h1 className="text-3xl font-bold text-brand-primary mb-4 font-[Barlow]">
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
          {homeData.kpis.map((kpi, index) => (
            <div
              key={kpi.id}
              className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${borderClasses[index % borderClasses.length]}`}
            >
              <p className="text-sm font-medium text-stone-500 font-[Barlow]">{kpi.label}</p>
              <p className="text-3xl font-bold text-brand-primary mt-1">
                {kpi.value}{kpi.suffix}
              </p>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  )
}
