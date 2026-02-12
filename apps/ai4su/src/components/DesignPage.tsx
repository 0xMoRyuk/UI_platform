import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@ui-platform/ui/components/card'
import { AppLayout } from '@/components/AppLayout'
import { EmptyState } from '@/components/EmptyState'
import { StepIndicator, type StepStatus } from '@/components/StepIndicator'
import { NextPhaseButton } from '@/components/NextPhaseButton'
import { loadProductData } from '@/lib/product-loader'
import { ChevronRight, Layout } from 'lucide-react'

/**
 * Determine the status of each step on the Design page
 * Steps: 1. Design Tokens, 2. Shell Design
 */
function getDesignPageStepStatuses(
  hasDesignSystem: boolean,
  hasShell: boolean
): StepStatus[] {
  const statuses: StepStatus[] = []

  // Step 1: Design Tokens
  if (hasDesignSystem) {
    statuses.push('completed')
  } else {
    statuses.push('current')
  }

  // Step 2: Shell
  if (hasShell) {
    statuses.push('completed')
  } else if (hasDesignSystem) {
    statuses.push('current')
  } else {
    statuses.push('upcoming')
  }

  return statuses
}

export function DesignPage() {
  const productData = useMemo(() => loadProductData(), [])
  const designSystem = productData.designSystem
  const shell = productData.shell

  const hasDesignSystem = !!(designSystem?.colors || designSystem?.typography)
  const hasShell = !!shell?.spec
  const allStepsComplete = hasDesignSystem && hasShell

  const stepStatuses = getDesignPageStepStatuses(hasDesignSystem, hasShell)

  return (
    <AppLayout>
      <div className="space-y-6">
        {/* Page intro */}
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-100 mb-2">
            Design System
          </h1>
          <p className="text-stone-600 dark:text-stone-400">
            Define the visual foundation and application shell for your product.
          </p>
        </div>

        {/* Step 1: Design Tokens */}
        <StepIndicator step={1} status={stepStatuses[0]}>
          {!designSystem?.colors && !designSystem?.typography ? (
            <EmptyState type="design-system" />
          ) : (
            <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Design Tokens
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Colors */}
                {designSystem?.colors && (
                  <div>
                    <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-4">
                      Colors
                    </h4>
                    <div className="grid grid-cols-5 gap-4">
                      <ColorSwatch
                        label="Primary"
                        hex={designSystem.colors.primary.hex}
                      />
                      <ColorSwatch
                        label="Secondary"
                        hex={designSystem.colors.secondary.hex}
                      />
                      <ColorSwatch
                        label="Accent"
                        hex={designSystem.colors.accent.hex}
                      />
                      <ColorSwatch
                        label="Neutral"
                        hex={designSystem.colors.neutral.hex}
                      />
                      <ColorSwatch
                        label="Highlight"
                        hex={designSystem.colors.highlight.hex}
                      />
                    </div>
                  </div>
                )}

                {/* Typography */}
                {designSystem?.typography && (
                  <div>
                    <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-4">
                      Typography
                    </h4>
                    <div className="grid grid-cols-3 gap-6">
                      <div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Heading</p>
                        <p className="font-semibold text-stone-900 dark:text-stone-100">
                          {designSystem.typography.heading}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Body</p>
                        <p className="text-stone-900 dark:text-stone-100">
                          {designSystem.typography.body}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-stone-500 dark:text-stone-400 mb-1">Mono</p>
                        <p className="font-mono text-stone-900 dark:text-stone-100">
                          {designSystem.typography.mono}
                        </p>
                      </div>
                    </div>
                    <div className="mt-4 flex gap-6">
                      {Object.entries(designSystem.typography.weights).map(([name, weight]) => (
                        <div key={name}>
                          <p className="text-xs text-stone-500 dark:text-stone-400 mb-1 capitalize">{name}</p>
                          <p className="text-stone-900 dark:text-stone-100" style={{ fontWeight: weight }}>
                            {weight}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Edit hint */}
                <div className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Run <code className="font-mono text-stone-700 dark:text-stone-300">/figma-sync-tokens</code> to sync from Figma
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </StepIndicator>

        {/* Step 2: Application Shell */}
        <StepIndicator step={2} status={stepStatuses[1]} isLast={!allStepsComplete}>
          {!shell?.spec ? (
            <EmptyState type="shell" />
          ) : (
            <Card className="border-stone-200 dark:border-stone-700 shadow-sm">
              <CardHeader className="pb-4">
                <CardTitle className="text-lg font-semibold text-stone-900 dark:text-stone-100">
                  Application Shell
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* Overview */}
                {shell.spec.overview && (
                  <p className="text-stone-600 dark:text-stone-400 leading-relaxed">
                    {shell.spec.overview}
                  </p>
                )}

                {/* Navigation items */}
                {shell.spec.navigationItems.length > 0 && (
                  <div>
                    <h4 className="text-sm font-medium text-stone-500 dark:text-stone-400 uppercase tracking-wide mb-2">
                      Navigation
                    </h4>
                    <ul className="space-y-1">
                      {shell.spec.navigationItems.map((item, index) => {
                        // Parse markdown-style bold: **text** → <strong>text</strong>
                        const parts = item.split(/\*\*([^*]+)\*\*/)
                        return (
                          <li key={index} className="flex items-center gap-2 text-stone-700 dark:text-stone-300">
                            <span className="w-1 h-1 rounded-full bg-stone-400 dark:bg-stone-500" />
                            {parts.map((part, i) =>
                              i % 2 === 1 ? (
                                <strong key={i} className="font-semibold">{part}</strong>
                              ) : (
                                <span key={i}>{part}</span>
                              )
                            )}
                          </li>
                        )
                      })}
                    </ul>
                  </div>
                )}

                {/* View Shell Design Link */}
                {shell.hasComponents && (
                  <div className="pt-2 border-t border-stone-100 dark:border-stone-800">
                    <Link
                      to="/shell/design"
                      className="flex items-center justify-between gap-4 py-2 hover:text-stone-900 dark:hover:text-stone-100 transition-colors group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-md bg-stone-200 dark:bg-stone-700 flex items-center justify-center">
                          <Layout className="w-4 h-4 text-stone-600 dark:text-stone-300" strokeWidth={1.5} />
                        </div>
                        <span className="font-medium text-stone-700 dark:text-stone-300 group-hover:text-stone-900 dark:group-hover:text-stone-100">
                          View Shell Design
                        </span>
                      </div>
                      <ChevronRight className="w-4 h-4 text-stone-400 dark:text-stone-500" strokeWidth={1.5} />
                    </Link>
                  </div>
                )}

                {/* Edit hint */}
                <div className="bg-stone-100 dark:bg-stone-800 rounded-md px-4 py-2.5">
                  <p className="text-xs text-stone-500 dark:text-stone-400">
                    Run <code className="font-mono text-stone-700 dark:text-stone-300">/design-shell</code> to update
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </StepIndicator>

        {/* Next Phase Button - shown when all steps complete */}
        {allStepsComplete && (
          <StepIndicator step={3} status="current" isLast>
            <NextPhaseButton nextPhase="sections" />
          </StepIndicator>
        )}
      </div>
    </AppLayout>
  )
}

interface ColorSwatchProps {
  label: string
  hex: string
}

function ColorSwatch({ label, hex }: ColorSwatchProps) {
  return (
    <div>
      <div
        className="h-14 rounded-md mb-2"
        style={{ backgroundColor: hex }}
        title={hex}
      />
      <p className="text-sm font-medium text-stone-900 dark:text-stone-100">{label}</p>
      <p className="text-xs text-stone-500 dark:text-stone-400 font-mono">{hex}</p>
    </div>
  )
}
