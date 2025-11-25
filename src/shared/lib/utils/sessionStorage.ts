const EXPANDED_CATEGORIES_KEY = 'js-base-expanded-categories'

export const getExpandedCategoriesFromStorage = (): Set<string> => {
  if (typeof window === 'undefined') return new Set()

  try {
    const stored = sessionStorage.getItem(EXPANDED_CATEGORIES_KEY)
    return stored ? new Set(JSON.parse(stored)) : new Set()
  } catch (error) {
    console.error('Ошибка при чтении из sessionStorage:', error)
    return new Set()
  }
}

export const saveExpandedCategoriesToStorage = (
  categories: Set<string>
): void => {
  if (typeof window === 'undefined') return

  try {
    sessionStorage.setItem(
      EXPANDED_CATEGORIES_KEY,
      JSON.stringify(Array.from(categories))
    )
  } catch (error) {
    console.error('Ошибка при сохранении в sessionStorage:', error)
  }
}
