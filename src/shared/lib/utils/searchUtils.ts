export const normalizeSearchQuery = (query: string): string => {
  return query.trim().toLowerCase()
}

export const matchesSearch = (
  text: string,
  query: string
): boolean => {
  const normalizedText = normalizeSearchQuery(text)
  const normalizedQuery = normalizeSearchQuery(query)
  return normalizedText.includes(normalizedQuery)
}

export const highlightMatch = (
  text: string,
  query: string
): string => {
  const normalizedQuery = normalizeSearchQuery(query)
  const regex = new RegExp(`(${normalizedQuery})`, 'gi')
  return text.replace(regex, '<mark>$1</mark>')
}

export const extractMatchFragment = (
  text: string,
  query: string,
  fragmentLength: number = 100
): string => {
  const normalizedText = text.toLowerCase()
  const normalizedQuery = normalizeSearchQuery(query)
  const index = normalizedText.indexOf(normalizedQuery)

  if (index === -1) {
    return (
      text.slice(0, fragmentLength) +
      (text.length > fragmentLength ? '...' : '')
    )
  }

  const start = Math.max(0, index - fragmentLength / 2)
  const end = Math.min(
    text.length,
    index + normalizedQuery.length + fragmentLength / 2
  )

  let fragment = text.slice(start, end)
  if (start > 0) fragment = '...' + fragment
  if (end < text.length) fragment = fragment + '...'

  return fragment
}
