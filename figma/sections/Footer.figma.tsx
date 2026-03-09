import figma from '@figma/code-connect'
import { Footer } from '../../apps/ai4su/src/shell/components/Footer'

// Figma: Footer frame (node 1:287) in AI4Startups main capture
figma.connect(Footer, 'https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz/AI4Startups?node-id=1-287', {
  example: () => <Footer currentLanguage="en" />,
})
