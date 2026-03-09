import figma from '@figma/code-connect'
import { SectionPreviews } from '../../apps/ai4su/src/sections/home/components/SectionPreviews'

// Figma: SectionPreviews frame (node 1:133) in AI4Startups main capture
figma.connect(SectionPreviews, 'https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz/AI4Startups?node-id=1-133', {
  example: () => (
    <SectionPreviews
      title="Discover More"
      description="Explore hackathons, ecosystem activities, and the initiative behind AI4Startups."
      previews={[
        {
          title: 'Data Governance in Africa Initiative',
          description: 'AI4Startups is implemented under the Data Governance in Africa Initiative.',
          href: '/initiative',
          badge: '€60M initiative, 6 implementing partners',
        },
        {
          title: 'From Data to Deployment',
          description: 'Discover how AI4SU turns real datasets into deployable models.',
          href: '/data',
          badge: '8 data sharing agreements, 8 countries scope',
        },
        {
          title: 'Partners & Data Collaborations',
          description: 'Meet the stakeholders, public institutions, startups and data partners.',
          href: '/partners',
          badge: 'Public & private data partnerships',
        },
      ]}
    />
  ),
})
