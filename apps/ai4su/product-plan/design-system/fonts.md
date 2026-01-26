# Typography Configuration

## Google Fonts Import

Add to your HTML `<head>`:

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
```

Or import in CSS:

```css
@import url('https://fonts.googleapis.com/css2?family=Barlow:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
```

## Font Usage

| Purpose | Font | Weight | Usage |
|---------|------|--------|-------|
| **Headings** | Barlow | 700 (Bold) | H1, H2, section titles |
| **Subheadings** | Barlow | 600 (Semibold) | H3, H4, card titles |
| **Body** | Barlow | 400 (Regular) | Paragraphs, descriptions |
| **UI Elements** | Barlow | 500 (Medium) | Buttons, links, labels |
| **Code** | JetBrains Mono | 400 | Code snippets, technical content |

## Tailwind Config

```javascript
module.exports = {
  theme: {
    extend: {
      fontFamily: {
        'heading': ['Barlow', 'Arial', 'sans-serif'],
        'body': ['Barlow', 'Arial', 'sans-serif'],
        'mono': ['JetBrains Mono', 'monospace'],
      },
    },
  },
}
```

## CSS Custom Properties

```css
:root {
  --font-heading: 'Barlow', Arial, sans-serif;
  --font-body: 'Barlow', Arial, sans-serif;
  --font-mono: 'JetBrains Mono', monospace;
}
```

## Usage in Components

The components use `font-[Barlow]` utility class for explicit Barlow usage:

```html
<!-- Heading -->
<h1 class="text-4xl font-bold font-[Barlow]">AI4Startups</h1>

<!-- Button -->
<button class="font-medium font-[Barlow]">Explore Toolbox</button>

<!-- Body text (inherits from parent) -->
<p class="text-base">Description text...</p>
```

## Fallback Strategy

If Google Fonts fails to load, the design falls back to:
- **Primary:** Arial (system font, similar to Barlow)
- **Secondary:** system-ui (native system font)
- **Mono:** monospace (system monospace)

## Performance Tips

1. **Preconnect** to Google Fonts domains for faster loading
2. **Use `display=swap`** to show fallback font while Barlow loads
3. **Subset if needed** for non-Latin characters (French support)
4. **Consider self-hosting** for GDPR compliance and performance
