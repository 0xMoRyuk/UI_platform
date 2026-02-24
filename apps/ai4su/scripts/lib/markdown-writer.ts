/**
 * Markdown table formatting utilities for the content guide generator.
 */

/** Escape pipe characters in table cell values */
export function escapeCell(value: string): string {
  return value.replace(/\|/g, '\\|').replace(/\n/g, ' ')
}

/** Truncate long values with ellipsis */
export function truncate(value: string, maxLen = 120): string {
  if (value.length <= maxLen) return value
  return value.slice(0, maxLen - 3) + '...'
}

/** Render a markdown table from headers and rows */
export function table(headers: string[], rows: string[][]): string {
  const headerRow = `| ${headers.map(escapeCell).join(' | ')} |`
  const separator = `| ${headers.map(() => '---').join(' | ')} |`
  const bodyRows = rows.map(
    (row) => `| ${row.map((cell) => escapeCell(cell)).join(' | ')} |`
  )
  return [headerRow, separator, ...bodyRows].join('\n')
}

/** Render YAML frontmatter block */
export function frontmatter(fields: Record<string, string>): string {
  const lines = Object.entries(fields).map(([k, v]) => `${k}: "${v}"`)
  return ['---', ...lines, '---'].join('\n')
}

/** Render a heading at the given level */
export function heading(level: number, text: string): string {
  return `${'#'.repeat(level)} ${text}`
}

/** Join string arrays with semicolons for compact table display */
export function joinArray(arr: string[]): string {
  return arr.join('; ')
}

/** Format a value for display: handles strings, numbers, booleans, arrays */
export function formatValue(value: unknown): string {
  if (value === null || value === undefined) return ''
  if (typeof value === 'string') return value
  if (typeof value === 'number' || typeof value === 'boolean') return String(value)
  if (Array.isArray(value)) {
    if (value.every((v) => typeof v === 'string')) return joinArray(value)
    return `[${value.length} items]`
  }
  if (typeof value === 'object') return '[object]'
  return String(value)
}
