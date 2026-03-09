import figma from '@figma/code-connect'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from './card'

// ModelCard container — PreviewCard frame (node 1:142)
figma.connect(Card, 'https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz/AI4Startups?node-id=1-142', {
  props: {
    title: figma.string('title'),
    description: figma.string('description'),
  },
  example: ({ title, description }) => (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{/* content */}</CardContent>
    </Card>
  ),
})
