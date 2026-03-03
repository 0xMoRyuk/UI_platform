export interface Language {
  code: string
  label: string
}

export interface HeaderContent {
  logoText: string
  search: Record<string, string>
  languages: Language[]
}

export interface NavigationItem {
  label: string
  href: string
}

export interface FooterI18n {
  fundedBy: string
  implementedBy: string
  privacy: string
  legal: string
  accessibility: string
  copyright: string
}

export interface FooterContent {
  en: FooterI18n
  fr: FooterI18n
  partnersHeading: string
  partners: string[]
  followHeading: string
  hashtags: string[]
}

export interface ShellData {
  header: HeaderContent
  navigation: NavigationItem[]
  footer: FooterContent
}
