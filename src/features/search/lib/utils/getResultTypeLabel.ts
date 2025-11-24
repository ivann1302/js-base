import type { ISearchResult } from '@/features/search/model/types'

export const getResultTypeLabel = (
  type: ISearchResult['type'],
  plural: boolean = false
): string => {
  switch (type) {
    case 'knowledge':
      return plural ? 'База знаний' : 'База знаний'
    case 'task':
      return plural ? 'Задачи' : 'Задача'
    case 'resource':
      return plural ? 'Ресурсы' : 'Ресурс'
    default:
      return ''
  }
}
