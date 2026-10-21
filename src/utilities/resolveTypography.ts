import { cn } from './cn'

/**
 * Resolves combined responsive Tailwind typography classes for font size and font weight.
 *
 * If a custom mobileSize is specified, it applies at mobile viewports (< 768px) and
 * prefixes the desktop size with `md:` so desktop styling takes over at tablets and larger.
 * If mobileSize is omitted, it falls back cleanly to desktopSize.
 */
export const resolveTypography = (
  desktopSize?: string | null,
  mobileSize?: string | null,
  desktopWeight?: string | null,
  mobileWeight?: string | null,
  fallbackDesktopSize = 'text-base',
  fallbackWeight = 'font-normal',
): { sizeClass: string; weightClass: string; combined: string } => {
  const dSize = desktopSize || fallbackDesktopSize
  const dWeight = desktopWeight || fallbackWeight

  let sizeClass = dSize
  if (mobileSize && mobileSize.trim()) {
    // If desktop size already has responsive prefixes like "text-4xl md:text-5xl lg:text-6xl",
    // replace any base non-prefixed class with mobileSize and keep the md:/lg: overrides,
    // or add md: prefix to single classes like "text-3xl".
    const tokens = dSize.split(' ').filter(Boolean)
    const responsiveTokens = tokens.filter((t) => t.includes(':'))

    if (responsiveTokens.length > 0) {
      // Keep any md:, lg:, xl: overrides but replace the base mobile token
      sizeClass = cn(mobileSize, ...responsiveTokens)
    } else {
      sizeClass = `${mobileSize} md:${dSize}`
    }
  }

  let weightClass = dWeight
  if (mobileWeight && mobileWeight.trim()) {
    const dWeightTokens = dWeight.split(' ').filter(Boolean)
    const responsiveWeightTokens = dWeightTokens.filter((t) => t.includes(':'))

    if (responsiveWeightTokens.length > 0) {
      weightClass = cn(mobileWeight, ...responsiveWeightTokens)
    } else {
      weightClass = `${mobileWeight} md:${dWeight}`
    }
  }

  return {
    sizeClass,
    weightClass,
    combined: cn(sizeClass, weightClass),
  }
}
