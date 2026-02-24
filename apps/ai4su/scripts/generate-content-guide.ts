#!/usr/bin/env bun
/**
 * Content Guide Generator for AI4SU Website
 *
 * Reads all data.json files from product/ and generates a comprehensive
 * content guide markdown file for non-technical content editors.
 *
 * Usage: bun scripts/generate-content-guide.ts
 * Output: $HOME/creative_home/notebook/documents/hot_topics/ai4su/content/website-content.md
 */

import { resolve, dirname } from 'path'
import { mkdirSync, writeFileSync } from 'fs'
import { frontmatter, heading } from './lib/markdown-writer'
import { introSection, tocSection, workflowSection, bilingualSection } from './lib/template-sections'
import { collectAssets, renderAssetInventory } from './lib/asset-collector'
import { renderGlobal } from './lib/section-renderers/global'
import { renderHome } from './lib/section-renderers/home'
import { renderToolbox } from './lib/section-renderers/toolbox'
import { renderHackathons } from './lib/section-renderers/hackathons'
import { renderEcosystem } from './lib/section-renderers/ecosystem'
import { renderPartners } from './lib/section-renderers/partners'

// Resolve paths relative to the ai4su app root
const appRoot = resolve(import.meta.dir, '..')
const productDir = resolve(appRoot, 'product')

// Load all data.json files
const shellData = await Bun.file(resolve(productDir, 'shell/data.json')).json()
const homeData = await Bun.file(resolve(productDir, 'sections/home/data.json')).json()
const toolboxData = await Bun.file(resolve(productDir, 'sections/toolbox/data.json')).json()
const hackathonsData = await Bun.file(resolve(productDir, 'sections/hackathons/data.json')).json()
const ecosystemData = await Bun.file(resolve(productDir, 'sections/ecosystem/data.json')).json()
const partnersData = await Bun.file(resolve(productDir, 'sections/partners/data.json')).json()

// Generate content sections
const sections: string[] = []

// Frontmatter
sections.push(
  frontmatter({
    date: new Date().toISOString().split('T')[0],
    title: 'AI4Startups Website — Content Manager Guide',
    tags: '[content-guide, ai4su, domain/ui_platform]',
    generated: 'true',
  })
)

// Title
sections.push('')
sections.push(heading(1, 'AI4Startups Website — Content Manager Guide'))
sections.push('')
sections.push(introSection())
sections.push(tocSection())

// Part 1: Editable Content
sections.push(heading(2, 'Part 1: Editable Content'))
sections.push('')

// Global (shell)
sections.push(renderGlobal(shellData))
sections.push('')

// Home
sections.push(renderHome(homeData))
sections.push('')

// Toolbox
sections.push(renderToolbox(toolboxData))
sections.push('')

// Hackathons
sections.push(renderHackathons(hackathonsData))
sections.push('')

// Ecosystem
sections.push(renderEcosystem(ecosystemData))
sections.push('')

// Partners
sections.push(renderPartners(partnersData))
sections.push('')

// Part 2: Asset Inventory
const allAssets = collectAssets({
  'Home': homeData,
  'Toolbox': toolboxData,
  'Hackathons': hackathonsData,
  'Ecosystem': ecosystemData,
  'Partners': partnersData,
  'Shell': shellData,
})
sections.push(renderAssetInventory(allAssets))
sections.push('')

// Part 3: Workflow
sections.push(workflowSection())
sections.push('')

// Part 4: Bilingual Content
sections.push(bilingualSection())

// Assemble final output
const output = sections.join('\n')

// Write output
const homeDir = process.env.HOME || '/Users/mo'
const outputPath = resolve(homeDir, 'creative_home/notebook/documents/hot_topics/ai4su/content/website-content.md')

// Ensure output directory exists
mkdirSync(dirname(outputPath), { recursive: true })
writeFileSync(outputPath, output, 'utf-8')

console.log(`Content guide generated: ${outputPath}`)
console.log(`Total size: ${(output.length / 1024).toFixed(1)}KB`)
console.log(`Lines: ${output.split('\n').length}`)
