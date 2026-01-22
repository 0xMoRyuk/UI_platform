/**
 * Brand Attribution Component
 * Displays funding/partner attribution based on active brand
 *
 * @example
 * // Uses active brand from NEXT_PUBLIC_BRAND_ID
 * <BrandAttribution variant="short" />
 *
 * // Or pass specific brand
 * import { euD4DBrand } from "@ui-platform/ui/tokens";
 * <BrandAttribution brand={euD4DBrand} variant="full" showLogos />
 */

import type { BrandConfig } from "../tokens/types";
import { activeBrand } from "../tokens/theme";
import { cn } from "../lib/utils";

export interface BrandAttributionProps {
  /** Brand config to use (defaults to activeBrand) */
  brand?: BrandConfig;
  /** Attribution text variant */
  variant?: "short" | "full";
  /** Show logo placeholders */
  showLogos?: boolean;
  /** Show project badge */
  showBadge?: boolean;
  /** Additional CSS classes */
  className?: string;
}

export function BrandAttribution({
  brand = activeBrand,
  variant = "short",
  showLogos = false,
  showBadge = true,
  className,
}: BrandAttributionProps) {
  // Skip rendering if brand has no attribution
  if (!brand.attribution) {
    return null;
  }

  const attribution =
    variant === "full" ? brand.attribution.full : brand.attribution.short;

  return (
    <footer
      className={cn(
        "bg-brand-primary text-brand-primary-foreground py-6 px-4",
        className
      )}
    >
      {showLogos && brand.logos?.primary && (
        <div className="flex flex-wrap items-center gap-4 mb-4">
          {brand.logos.primary.map((logo) => (
            <div
              key={logo.id}
              className="h-10 px-3 bg-white/10 rounded flex items-center justify-center text-xs"
              title={logo.alt}
            >
              {/* Replace with actual logo images */}
              {logo.src ? (
                <img src={logo.src} alt={logo.alt} className="h-6" />
              ) : (
                <span>{logo.name}</span>
              )}
            </div>
          ))}
        </div>
      )}

      {showBadge && brand.badge && (
        <div className="flex items-center gap-3 mb-4">
          <div
            className="px-3 py-2 text-sm font-semibold leading-tight whitespace-pre-line"
            style={{
              backgroundColor: brand.badge.background,
              color: brand.badge.foreground,
              minWidth: "100px",
            }}
          >
            {brand.badge.label}
          </div>
        </div>
      )}

      <p className="text-sm opacity-90 max-w-3xl">{attribution}</p>

      {brand.projectUrl && (
        <a
          href={brand.projectUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-brand-neutral hover:text-brand-primary-foreground underline mt-2 inline-block"
        >
          Learn more
        </a>
      )}
    </footer>
  );
}

/**
 * Brand Logo Bar Component
 * Displays logo row for brand compliance
 */
export interface BrandLogoBarProps {
  brand?: BrandConfig;
  /** Which logo set to display */
  logos?: "primary" | "secondary" | "partners" | "all";
  className?: string;
}

export function BrandLogoBar({
  brand = activeBrand,
  logos = "primary",
  className,
}: BrandLogoBarProps) {
  if (!brand.logos) {
    return null;
  }

  const logoSets =
    logos === "all"
      ? [
          ...(brand.logos.primary || []),
          ...(brand.logos.secondary || []),
          ...(brand.logos.partners || []),
        ]
      : brand.logos[logos] || [];

  if (logoSets.length === 0) {
    return null;
  }

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-6 py-4",
        className
      )}
    >
      {logoSets.map((logo) => (
        <div
          key={logo.id}
          className="flex items-center justify-center"
          title={logo.alt}
        >
          {logo.src ? (
            <img src={logo.src} alt={logo.alt} className="h-8 max-w-[120px]" />
          ) : (
            <span className="text-sm text-muted-foreground px-3 py-1 border rounded">
              {logo.name}
            </span>
          )}
        </div>
      ))}
    </div>
  );
}

/**
 * Brand Social Links Component
 * Displays hashtags for social sharing
 */
export interface BrandSocialProps {
  brand?: BrandConfig;
  className?: string;
}

export function BrandSocialHashtags({
  brand = activeBrand,
  className,
}: BrandSocialProps) {
  if (!brand.social?.hashtags?.length) {
    return null;
  }

  return (
    <div className={cn("flex flex-wrap gap-2", className)}>
      {brand.social.hashtags.map((tag) => (
        <span
          key={tag}
          className="text-sm bg-brand-neutral text-brand-neutral-foreground px-2 py-1 rounded"
        >
          {tag}
        </span>
      ))}
    </div>
  );
}
