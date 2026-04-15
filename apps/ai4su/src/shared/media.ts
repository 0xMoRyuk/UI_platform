export function isRenderableImageUrl(url: string | null | undefined): boolean {
  if (!url) return false

  if (url.startsWith('/')) return true
  if (url.startsWith('data:image/')) return true
  if (url.startsWith('blob:')) return true
  if (url.startsWith('file://')) return false

  try {
    const parsed = new URL(url)
    if (!['http:', 'https:'].includes(parsed.protocol)) return false

    const pathname = parsed.pathname.toLowerCase()
    return ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.avif'].some((ext) => pathname.endsWith(ext))
  } catch {
    return false
  }
}

export function isOpenableExternalUrl(url: string | null | undefined): boolean {
  if (!url) return false
  if (url.startsWith('file://')) return false

  try {
    const parsed = new URL(url)
    return ['http:', 'https:'].includes(parsed.protocol)
  } catch {
    return false
  }
}
