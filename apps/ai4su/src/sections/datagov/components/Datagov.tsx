import { DatagovHero } from './DatagovHero'
import { AboutSection } from './AboutSection'
import { StrategySection } from './StrategySection'
import { ActivitiesSection } from './ActivitiesSection'
import { PartnersStrip } from './PartnersStrip'
import type { DatagovPageProps } from '@/../product/sections/datagov/types'

export function Datagov({
  hero,
  about,
  strategy,
  activities,
  partners,
  onPartnerClick,
}: DatagovPageProps) {
  return (
    <div className="min-h-screen bg-white dark:bg-stone-950">
      <DatagovHero hero={hero} />
      <AboutSection about={about} />
      <StrategySection strategy={strategy} />
      <ActivitiesSection activities={activities} />
      <PartnersStrip
        partners={partners}
        onPartnerClick={onPartnerClick}
      />
    </div>
  )
}
