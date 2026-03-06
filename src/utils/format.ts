export function formatDateTime(value?: string | null) {
  if (!value) {
    return 'Not available'
  }

  return new Intl.DateTimeFormat('ja-JP', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(value))
}

export function formatBytes(value?: number | null) {
  if (!value) {
    return '0 B'
  }

  const units = ['B', 'KB', 'MB', 'GB']
  let next = value
  let unitIndex = 0

  while (next >= 1024 && unitIndex < units.length - 1) {
    next /= 1024
    unitIndex += 1
  }

  return `${next.toFixed(next >= 10 || unitIndex === 0 ? 0 : 1)} ${units[unitIndex]}`
}

export function toSlug(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

export function titleFromFields(fields: Record<string, unknown>, fallback: string) {
  const firstString = Object.values(fields).find(value => typeof value === 'string' && value.length > 0)
  return typeof firstString === 'string' ? firstString : fallback
}
