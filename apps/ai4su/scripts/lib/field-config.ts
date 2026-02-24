/**
 * Field classification for the content guide generator.
 * Determines which fields are editable, structural, or assets.
 */

/** Fields excluded from content tables (structural/technical) */
const EXCLUDED_FIELDS = new Set([
  'id',
  'slug',
  'coordinates',
  'icon',
  '_meta',
  'color',
  'isPrimary',
  'isLead',
  'featured',
  'studyId',
  'bestPracticesId',
  'hackathonId',
  'modelIds',
  'modelId',
  'countryCode',
  'code',
  'type',
  'rank',
])

/** Field name suffixes that indicate structural links (excluded) */
const EXCLUDED_SUFFIXES = ['Id', 'Ids']

/** Field name patterns that indicate asset references */
const ASSET_PATTERNS = [
  'imageUrl',
  'logoUrl',
  'pdfUrl',
  'heroImage',
  'photoUrl',
  'flagUrl',
  'globalGatewayLogo',
  'url', // when parent is photos/resources
  'websiteUrl',
  'githubUrl',
]

/** Fields that are bilingual (have en/fr variants) */
const BILINGUAL_FIELDS = new Set([
  'search',
  'footer',
])

export function isExcluded(fieldName: string): boolean {
  if (EXCLUDED_FIELDS.has(fieldName)) return true
  if (fieldName.startsWith('_')) return true
  return EXCLUDED_SUFFIXES.some((suffix) => fieldName.endsWith(suffix))
}

export function isAsset(fieldName: string): boolean {
  return ASSET_PATTERNS.includes(fieldName)
}

export function isBilingual(fieldName: string): boolean {
  return BILINGUAL_FIELDS.has(fieldName)
}

/** Get character limit hint for specific field types */
export function charLimitHint(fieldName: string): string {
  if (fieldName === 'title' || fieldName === 'name' || fieldName === 'label') return 'Max ~60 chars'
  if (fieldName === 'subtitle' || fieldName === 'tagline') return 'Max ~100 chars'
  if (fieldName === 'shortDescription') return 'Max ~120 chars'
  if (fieldName === 'description' || fieldName === 'fullDescription') return 'Can be longer'
  if (fieldName === 'badge') return 'Max ~30 chars'
  if (fieldName === 'ctaText' || fieldName === 'downloadText') return 'Max ~25 chars'
  return ''
}

/** Get note annotation for a field */
export function fieldNote(fieldName: string, value: unknown): string {
  const limit = charLimitHint(fieldName)
  const notes: string[] = []
  if (limit) notes.push(limit)
  if (isAsset(fieldName)) notes.push('Asset path')
  if (typeof value === 'string' && value.includes('{')) notes.push('Template — keep {placeholders}')
  return notes.join('. ')
}
