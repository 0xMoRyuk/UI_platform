import figma from '@figma/code-connect'
import { KPIGrid } from '../../apps/ai4su/src/sections/home/components/KPIGrid'

// Figma: KPIGrid frame (node 1:6) in AI4Startups main capture
figma.connect(KPIGrid, 'https://www.figma.com/design/r3aZ4vNIoyfID7LJWd7WAz/AI4Startups?node-id=1-6', {
  example: () => (
    <KPIGrid
      kpis={[
        { value: '24', label: 'Models' },
        { value: '6', label: 'Sub-categories' },
        { value: '15K+', label: 'GitHub Stars' },
        { value: '50+', label: 'Startups Using' },
      ]}
      title="Program Impact"
      description="Building Africa's AI ecosystem through open-source"
    />
  ),
})
