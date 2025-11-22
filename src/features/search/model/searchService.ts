import { categories } from '@/pages/knowledge-base-page/model/data'
import { tasks } from '@/pages/tasks-page/model/data'
import { resources } from '@/pages/resources-page/model/data'
import { matchesSearch } from '@/shared/lib/utils/searchUtils'
import type { ISearchResult, ISearchResults } from './types'

/**
 * Поиск по базе знаний (категории и темы)
 */
const searchKnowledge = (query: string): ISearchResult[] => {
  const results: ISearchResult[] = []

  categories.forEach(category => {
    // Поиск по названию категории
    if (matchesSearch(category.name, query)) {
      results.push({
        id: `category-${category.id}`,
        type: 'knowledge',
        title: category.name,
        description: `Категория: ${category.name}`,
        url: `/knowledge-base/${category.id}`,
        categoryName: category.name,
      })
    }

    // Поиск по темам
    category.topics.forEach(topic => {
      if (
        matchesSearch(topic.title, query) ||
        matchesSearch(topic.content, query)
      ) {
        results.push({
          id: `topic-${category.id}-${topic.id}`,
          type: 'knowledge',
          title: topic.title,
          description: topic.content.slice(0, 150) + '...',
          url: `/knowledge-base/${category.id}/${topic.id}`,
          categoryName: category.name,
        })
      }
    })
  })

  return results
}

/**
 * Поиск по задачам
 */
const searchTasks = (query: string): ISearchResult[] => {
  return tasks
    .filter(task => matchesSearch(task.text, query))
    .map(task => ({
      id: `task-${task.id}`,
      type: 'task',
      title: task.text,
      description: `Задача #${task.number} (${task.difficulty})`,
      url: `/tasks?task=${task.id}`,
    }))
}

/**
 * Поиск по ресурсам
 */
const searchResources = (query: string): ISearchResult[] => {
  return resources
    .filter(
      resource =>
        matchesSearch(resource.title, query) ||
        (resource.description &&
          matchesSearch(resource.description, query))
    )
    .map(resource => ({
      id: `resource-${resource.id}`,
      type: 'resource',
      title: resource.title,
      description: resource.description,
      url: resource.link || `/resources#${resource.id}`,
    }))
}

/**
 * Основная функция поиска
 */
export const search = (query: string): ISearchResults => {
  if (!query.trim()) {
    return {
      knowledge: [],
      tasks: [],
      resources: [],
      total: 0,
    }
  }

  const knowledgeResults = searchKnowledge(query)
  const taskResults = searchTasks(query)
  const resourceResults = searchResources(query)

  return {
    knowledge: knowledgeResults,
    tasks: taskResults,
    resources: resourceResults,
    total:
      knowledgeResults.length +
      taskResults.length +
      resourceResults.length,
  }
}

/**
 * Получить ограниченное количество результатов для выпадающего списка
 */
export const searchLimited = (
  query: string,
  limit: number = 5
): ISearchResult[] => {
  const results = search(query)
  const allResults: ISearchResult[] = [
    ...results.knowledge,
    ...results.tasks,
    ...results.resources,
  ]

  return allResults.slice(0, limit)
}
