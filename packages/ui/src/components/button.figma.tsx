import figma from '@figma/code-connect'
import { Button } from './button'

// Primary Button — hero section CTA (node 1:253)
figma.connect(Button, 'https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz/AI4Startups?node-id=1-253', {
  props: {
    children: figma.string('label'),
  },
  example: ({ children }) => <Button variant="default">{children}</Button>,
})

// Outline Button — hero section secondary CTA (node 1:259)
figma.connect(Button, 'https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz/AI4Startups?node-id=1-259', {
  props: {
    children: figma.string('label'),
  },
  example: ({ children }) => <Button variant="outline">{children}</Button>,
})

// Ghost/Nav Button — header nav item (node 1:353)
figma.connect(Button, 'https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz/AI4Startups?node-id=1-353', {
  props: {
    children: figma.string('label'),
  },
  example: ({ children }) => <Button variant="ghost">{children}</Button>,
})
