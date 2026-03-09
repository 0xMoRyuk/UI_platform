import figma from '@figma/code-connect'
import { HeroSection } from '../../apps/ai4su/src/sections/home/components/HeroSection'

// Figma: HeroSection frame (node 1:223) in AI4Startups main capture
figma.connect(HeroSection, 'https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz/AI4Startups?node-id=1-223', {
  example: () => (
    <HeroSection
      hero={{
        badge: 'Funded by the European Union',
        title: { line1: 'AI4Startups', line2: "Africa's AI Future" },
        description: 'Enabling African startups to innovate with trusted data and AI.',
        ctas: [
          { label: 'View our Hackathons', href: '/hackathons', variant: 'primary' },
          { label: 'Explore our Resources Hub', href: '/resources', variant: 'outline' },
        ],
        stats: [
          { value: '24', label: 'AI Models' },
          { value: '8', label: 'Countries' },
          { value: '700+', label: 'Participants' },
        ],
      }}
    />
  ),
})
