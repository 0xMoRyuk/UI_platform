import { Widget } from '@typeform/embed-react'

const CANONICAL_FORM_ID = 'nCZzuxiM'

export function ApplyPage() {
  // Canonical Bee Network application form (Typeform nCZzuxiM, live since 2026-09-28).
  // VITE_BEE_FORM_ID overrides it at build time if the canon ever moves.
  const formId = (import.meta.env.VITE_BEE_FORM_ID as string | undefined) || CANONICAL_FORM_ID

  return (
    <Widget
      id={formId}
      style={{ width: '100%', height: '100vh', border: 0 }}
      opacity={100}
      inlineOnMobile
    />
  )
}
