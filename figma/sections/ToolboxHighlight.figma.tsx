import figma from '@figma/code-connect'
import { ToolboxHighlight } from '../../apps/ai4su/src/sections/home/components/ToolboxHighlight'

// Figma: ToolboxHighlight frame (node 1:15) in AI4Startups main capture
figma.connect(ToolboxHighlight, 'https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz/AI4Startups?node-id=1-15', {
  example: () => (
    <ToolboxHighlight
      badge="Open Source"
      title="AI Model Toolbox"
      description="Explore 24 open-source AI models built for African agricultural and economic contexts."
      ctaLabel="Explore Toolbox"
      ctaHref="/toolbox"
      stats={[
        { value: '24', label: 'Models' },
        { value: '6', label: 'Sub-categories' },
        { value: '15K+', label: 'GitHub Stars' },
        { value: '50+', label: 'Startups Using' },
      ]}
    />
  ),
})
