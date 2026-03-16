'use client'

import { Datagov } from '@/sections/datagov/components'
import type { DatagovPageProps } from '@/../product/sections/datagov/types'
import datagovDataRaw from '@/../product/sections/datagov/data.json'

const datagovData = datagovDataRaw as unknown as Omit<DatagovPageProps, 'onPartnerClick'>

export function DatagovPage() {
  const handlePartnerClick = (partnerId: string, websiteUrl: string) => {
    console.log('[Datagov] Partner clicked:', partnerId)
    if (websiteUrl) {
      window.open(websiteUrl, '_blank', 'noopener,noreferrer')
    }
  }

  return (
    <Datagov
      hero={datagovData.hero}
      about={datagovData.about}
      strategy={datagovData.strategy}
      activities={datagovData.activities}
      partners={datagovData.partners}
      onPartnerClick={handlePartnerClick}
    />
  )
}
