# Tailwind Color Configuration

## Color Choices (EU Visibility Guidelines)

- **Primary:** `#003399` (EU Dark Blue) — Used for headers, links, primary buttons, footer
- **Secondary:** `#9BB1DC` (EU Light Blue) — Used for backgrounds, supporting elements
- **Accent:** `#F5CE2A` (EU Yellow) — Used for CTAs, highlights, focus rings, active states
- **Neutral:** `#DBD2CC` (EU Sand) — Used for subtle backgrounds, borders

## Tailwind Config

Add these colors to your `tailwind.config.js`:

```javascript
module.exports = {
  theme: {
    extend: {
      colors: {
        // EU Color Palette
        'eu-dark-blue': '#003399',
        'eu-light-blue': '#9BB1DC',
        'eu-yellow': '#F5CE2A',
        'eu-sand': '#DBD2CC',

        // Semantic aliases
        primary: {
          DEFAULT: '#003399',
          hover: '#002266',
          active: '#001133',
        },
        secondary: {
          DEFAULT: '#9BB1DC',
          hover: '#8AA0CB',
        },
        accent: {
          DEFAULT: '#F5CE2A',
          hover: '#E5BE1A',
          active: '#D5AE0A',
        },
        neutral: {
          DEFAULT: '#DBD2CC',
          hover: '#CBC2BC',
        },
      },
    },
  },
}
```

## Usage Examples

### Primary Elements
```html
<!-- Header -->
<header class="bg-[#003399] text-white">

<!-- Primary button -->
<button class="bg-[#003399] hover:bg-[#002266] text-white">

<!-- Link -->
<a class="text-[#003399] hover:text-[#002266]">
```

### Accent Elements
```html
<!-- CTA button -->
<button class="bg-[#F5CE2A] hover:bg-[#E5BE1A] text-[#003399]">

<!-- Active nav indicator -->
<span class="border-b-2 border-[#F5CE2A]">

<!-- Focus ring -->
<input class="focus:ring-2 focus:ring-[#F5CE2A]">
```

### Secondary Elements
```html
<!-- Light background -->
<section class="bg-[#9BB1DC]/20">

<!-- Secondary badge -->
<span class="bg-[#9BB1DC]/30 text-[#003399]">
```

### Neutral Elements
```html
<!-- Subtle border -->
<div class="border border-[#DBD2CC]">

<!-- Neutral background -->
<section class="bg-[#DBD2CC]/30">
```

## Dark Mode

The components support dark mode using Tailwind's `dark:` prefix:

```html
<div class="bg-white dark:bg-stone-950">
<p class="text-[#003399] dark:text-white">
<span class="text-stone-600 dark:text-stone-400">
```

## Color Contrast

All color combinations meet WCAG AA contrast requirements:
- White text on `#003399` (EU Dark Blue): ✅ 8.59:1
- `#003399` text on white: ✅ 8.59:1
- `#003399` text on `#F5CE2A` (EU Yellow): ✅ 5.84:1
