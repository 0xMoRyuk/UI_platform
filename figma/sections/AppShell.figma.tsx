import figma from '@figma/code-connect'
import { AppShell } from '../../apps/ai4su/src/shell/components/AppShell'

// Figma: Full AppShell frame (node 1:4) in AI4Startups main capture
figma.connect(AppShell, 'https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz/AI4Startups?node-id=1-4', {
  example: () => (
    <AppShell
      navigationItems={[
        { label: 'Home', href: '/', isActive: true },
        { label: 'Our hackathons', href: '/hackathons' },
        { label: 'AI Models', href: '/toolbox' },
        { label: 'All Activities', href: '/activities' },
        { label: 'European Initiative', href: '/initiative' },
        { label: 'Partners', href: '/partners' },
      ]}
      currentLanguage="en"
    >
      {/* Page content goes here */}
    </AppShell>
  ),
})
