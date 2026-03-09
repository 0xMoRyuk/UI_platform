import figma from '@figma/code-connect'
import { Badge } from './badge'

// Default Badge — ModelCard category badge (node 1:50)
figma.connect(Badge, 'https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz/AI4Startups?node-id=1-50', {
  props: {
    children: figma.string('label'),
  },
  example: ({ children }) => <Badge variant="secondary">{children}</Badge>,
})

// Outline Badge — HeroSection EU badge (node 1:233)
figma.connect(Badge, 'https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz/AI4Startups?node-id=1-233', {
  props: {
    children: figma.string('label'),
  },
  example: ({ children }) => <Badge variant="outline">{children}</Badge>,
})
