'use client'

import { Partners } from './Partners'
import partnersData from '@/../product/sections/partners/data.json'

export function PartnersPreview() {
  const handlePartnerClick = (partnerId: string, websiteUrl: string) => {
    console.log('[Partners] Partner clicked:', partnerId)
    if (websiteUrl) {
      window.open(websiteUrl, '_blank', 'noopener,noreferrer')
    }
  }

  const handleDatagovClick = (url: string) => {
    console.log('[Partners] DataGov CTA clicked')
    window.open(url, '_blank', 'noopener,noreferrer')
  }

  const handleSocialClick = (platform: 'twitter' | 'linkedin') => {
    console.log('[Partners] Social clicked:', platform)
    const urls = {
      twitter: partnersData.socialLinks.twitter,
      linkedin: partnersData.socialLinks.linkedin,
    }
    window.open(urls[platform], '_blank', 'noopener,noreferrer')
  }

  return (
    <Partners
      pageIntro={partnersData.pageIntro}
      funders={partnersData.funders}
      implementingPartners={partnersData.implementingPartners}
      serviceProviders={partnersData.serviceProviders}
      datagovInitiative={partnersData.datagovInitiative}
      socialLinks={partnersData.socialLinks}
      onPartnerClick={handlePartnerClick}
      onDatagovClick={handleDatagovClick}
      onSocialClick={handleSocialClick}
    />
  )
}
