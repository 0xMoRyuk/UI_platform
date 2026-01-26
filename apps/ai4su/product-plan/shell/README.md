# Application Shell

## Overview

AI4Startups uses a top navigation layout optimized for a public showcase website. The shell includes a header with navigation, search, and language switcher, plus an EU-compliant footer with mandatory attribution and partner logos.

## Components Provided

| Component | Description |
|-----------|-------------|
| `AppShell` | Main layout wrapper combining Header, content area, and Footer |
| `Header` | Sticky top navigation with logo, nav links, search, language switcher |
| `Footer` | EU-compliant footer with attribution, partner logos, legal links |
| `MobileNav` | Slide-out drawer for mobile navigation |

## Navigation Structure

| Label | Route | Description |
|-------|-------|-------------|
| Home | `/` | Landing page with hero and KPIs |
| Toolbox | `/toolbox` | AI models, studies, and resources |
| Hackathons | `/hackathons` | Hackathon documentation |
| Ecosystem | `/ecosystem` | Activities and events map |
| Partners | `/partners` | Partner showcase |

## Props

### AppShellProps

```typescript
interface AppShellProps {
  children: React.ReactNode
  navigationItems: NavigationItem[]
  currentLanguage?: 'en' | 'fr'
  onNavigate?: (href: string) => void
  onLanguageChange?: (lang: 'en' | 'fr') => void
  onSearch?: (query: string) => void
}

interface NavigationItem {
  label: string
  href: string
  isActive?: boolean
}
```

## Callback Props

| Callback | Description |
|----------|-------------|
| `onNavigate` | Called when user clicks a navigation link |
| `onLanguageChange` | Called when user toggles EN/FR |
| `onSearch` | Called when user submits search query |

## Design Tokens Applied

- **Primary** (`#003399`): Header/footer background, logo
- **Accent** (`#F5CE2A`): Active nav indicator, hover states
- **Secondary** (`#9BB1DC`): Footer secondary elements
- **Typography**: Barlow font family

## EU Compliance (Footer)

The footer includes mandatory EU visibility elements:
- EU flag placeholder
- "Funded by the European Union" text
- Partner logos (Digital Africa, Expertise France, GIZ)
- Social hashtags (#D4DataGOV, #TeamEurope, etc.)

## Responsive Behavior

- **Desktop (1024px+)**: Full horizontal navigation, search input visible
- **Tablet (768-1023px)**: Condensed navigation, search icon only
- **Mobile (<768px)**: Hamburger menu, slide-out navigation drawer

## Usage Example

```tsx
import { AppShell } from './components'

const navigationItems = [
  { label: 'Home', href: '/', isActive: true },
  { label: 'Toolbox', href: '/toolbox' },
  { label: 'Hackathons', href: '/hackathons' },
  { label: 'Ecosystem', href: '/ecosystem' },
  { label: 'Partners', href: '/partners' },
]

function App() {
  const handleNavigate = (href: string) => {
    // Use your router to navigate
    router.push(href)
  }

  return (
    <AppShell
      navigationItems={navigationItems}
      currentLanguage="en"
      onNavigate={handleNavigate}
      onLanguageChange={(lang) => setLanguage(lang)}
      onSearch={(query) => router.push(`/toolbox?q=${query}`)}
    >
      {/* Page content */}
    </AppShell>
  )
}
```
