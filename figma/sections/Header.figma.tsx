import figma from '@figma/code-connect'
import { Header } from '../../apps/ai4su/src/shell/components/Header'

// Figma: Header frame (node 1:347) in AI4Startups main capture
// https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz
figma.connect(Header, 'https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz/AI4Startups?node-id=1-347', {
  example: () => (
    <Header
      navigationItems={[
        { label: 'Home', href: '/', isActive: true },
        { label: 'Our hackathons', href: '/hackathons' },
        { label: 'AI Models', href: '/toolbox' },
        { label: 'All Activities', href: '/activities' },
        { label: 'European Initiative', href: '/initiative' },
        { label: 'Partners', href: '/partners' },
      ]}
      currentLanguage="en"
    />
  ),
})
