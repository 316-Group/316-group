export function getBestContrastTextColor(bgClass: string | null | undefined): string {
  if (!bgClass) return ''

  // 1. Handle arbitrary hex colors (e.g. bg-[#0256FF], bg-[#EFF1F8], #0256FF)
  const hexMatch = bgClass.match(/#([0-9a-fA-F]{3,8})/)
  if (hexMatch) {
    let hex = hexMatch[1]
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((c) => c + c)
        .join('')
    }
    if (hex.length >= 6) {
      const r = parseInt(hex.substring(0, 2), 16)
      const g = parseInt(hex.substring(2, 4), 16)
      const b = parseInt(hex.substring(4, 6), 16)
      if (!isNaN(r) && !isNaN(g) && !isNaN(b)) {
        // ITU-R BT.601 perceived luminance formula
        const luminance = (r * 299 + g * 587 + b * 114) / 1000
        return luminance < 140 ? 'text-white' : 'text-black'
      }
    }
  }

  // 2. Extract suffix after the last "-"
  const bgSuffix = bgClass.split('-').pop()

  switch (bgSuffix) {
    case 'inherit':
    case 'current':
      return 'text-inherit'
    case 'transparent':
      return 'text-black'
    case 'black':
      return 'text-white'
    case 'white':
      return 'text-black'
    default: {
      const numericValue = parseInt(bgSuffix || '', 10)
      if (!isNaN(numericValue)) {
        return numericValue >= 500 ? 'text-white' : 'text-black'
      }
      return 'text-black'
    }
  }
}
