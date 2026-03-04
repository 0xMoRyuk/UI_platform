/** Shared HTML layout and utilities for server-rendered SEO pages. */

import siteConfig from '../../product/site.json'
import countriesData from '../../product/shared/countries.json'
import sectorsData from '../../product/shared/sectors.json'

export interface SEOPageOptions {
  title: string
  description: string
  canonicalPath: string
  ogType?: string
  jsonLd?: object | object[]
  body: string
  baseUrl: string
}

const INLINE_CSS = `body{font-family:system-ui,-apple-system,sans-serif;line-height:1.6;max-width:960px;margin:0 auto;padding:1rem;color:#1a1a1a}h1{font-size:1.75rem;margin-bottom:.25rem}h2{font-size:1.25rem;margin-top:2rem;border-bottom:1px solid #e5e5e5;padding-bottom:.25rem}table{border-collapse:collapse;width:100%;margin:1rem 0}th,td{text-align:left;padding:.5rem .75rem;border-bottom:1px solid #e5e5e5}th{font-weight:600;background:#f9f9f9}a{color:#003366}a:hover{text-decoration:underline}.model-card,.hackathon-card{margin-bottom:1.5rem}.stat{display:inline-block;margin-right:1.5rem;margin-bottom:.5rem}.stat strong{font-size:1.25rem}footer{margin-top:3rem;padding-top:1rem;border-top:1px solid #e5e5e5;font-size:.85rem;color:#666}footer a{margin-right:1rem}`

export function seoPage(opts: SEOPageOptions): string {
  const {
    title,
    description,
    canonicalPath,
    ogType = 'website',
    jsonLd,
    body,
    baseUrl,
  } = opts

  const canonicalUrl = `${baseUrl}${canonicalPath}`
  const agentManifestUrl = `${baseUrl}/.well-known/agent-capabilities.json`

  const jsonLdBlocks = jsonLd
    ? (Array.isArray(jsonLd) ? jsonLd : [jsonLd])
        .map((ld) => `<script type="application/ld+json">${JSON.stringify(ld)}</script>`)
        .join('\n')
    : ''

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${escapeHtml(title)}</title>
<meta name="description" content="${escapeAttr(description)}">
<meta name="robots" content="index, follow">
<link rel="canonical" href="${escapeAttr(canonicalUrl)}">
<meta property="og:title" content="${escapeAttr(title)}">
<meta property="og:description" content="${escapeAttr(description)}">
<meta property="og:type" content="${escapeAttr(ogType)}">
<meta property="og:url" content="${escapeAttr(canonicalUrl)}">
<meta property="og:site_name" content="${escapeAttr(siteConfig.name)}">
<meta name="theme-color" content="${escapeAttr(siteConfig.themeColor)}">
<link rel="alternate" type="application/json" href="${escapeAttr(agentManifestUrl)}" title="Agent Capabilities">
${jsonLdBlocks}
<style>${INLINE_CSS}</style>
</head>
<body>
${body}
<footer>
<a href="${escapeAttr(baseUrl)}/">Interactive version</a>
<a href="${escapeAttr(baseUrl)}/api/models">API</a>
<a href="${escapeAttr(agentManifestUrl)}">Agent capabilities</a>
<a href="${escapeAttr(baseUrl)}/sitemap.xml">Sitemap</a>
</footer>
</body>
</html>`
}

export function escapeHtml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}

function escapeAttr(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/"/g, '&quot;')
}

/** Map country codes to display names (derived from shared JSON). */
export const COUNTRY_NAMES: Record<string, string> = Object.fromEntries(
  (countriesData as Array<{ code: string; name: string }>).map((c) => [c.code, c.name])
)

/** Map sector slugs to display labels (derived from shared JSON). */
export const SECTOR_LABELS: Record<string, string> = Object.fromEntries(
  (sectorsData as Array<{ id: string; label: string }>).map((s) => [s.id, s.label])
)
