import { useSearchParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { search } from '@/features/search/model'
import { getResultTypeLabel } from '@/features/search/lib/utils'
import { SearchResultLink } from '@/features/search/ui/SearchResultLink'
import type { ISearchResults } from '@/features/search/model/types'
import styles from './searchResultsPage.module.scss'

type SearchResultLinkStyles = {
  resultLink: string
  resultHeader: string
  resultCategory: string
  resultTitle: string
  resultDescription: string
}

export default function SearchResultsPage() {
  const [searchParams] = useSearchParams()
  const query = searchParams.get('q') || ''
  const [results, setResults] = useState<ISearchResults>({
    knowledge: [],
    tasks: [],
    resources: [],
    total: 0,
  })

  useEffect(() => {
    if (query.trim()) {
      const searchResults = search(query)
      setResults(searchResults)
    } else {
      setResults({
        knowledge: [],
        tasks: [],
        resources: [],
        total: 0,
      })
    }
  }, [query])

  if (!query.trim()) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Поиск</h1>
        <p className={styles.emptyMessage}>
          Введите запрос для поиска
        </p>
      </div>
    )
  }

  if (results.total === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Результаты поиска</h1>
        <p className={styles.query}>
          По запросу: &quot;{query}&quot;
        </p>
        <p className={styles.emptyMessage}>
          Ничего не найдено. Попробуйте изменить запрос.
        </p>
      </div>
    )
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Результаты поиска</h1>
      <p className={styles.query}>По запросу: &quot;{query}&quot;</p>
      <p className={styles.total}>Найдено: {results.total}</p>

      {results.knowledge.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {getResultTypeLabel('knowledge', true)} (
            {results.knowledge.length})
          </h2>
          <ul className={styles.resultsList}>
            {results.knowledge.map(result => (
              <li key={result.id} className={styles.resultItem}>
                <SearchResultLink
                  result={result}
                  query={query}
                  styles={styles as SearchResultLinkStyles}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {results.tasks.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {getResultTypeLabel('task', true)} ({results.tasks.length}
            )
          </h2>
          <ul className={styles.resultsList}>
            {results.tasks.map(result => (
              <li key={result.id} className={styles.resultItem}>
                <SearchResultLink
                  result={result}
                  query={query}
                  styles={styles as SearchResultLinkStyles}
                />
              </li>
            ))}
          </ul>
        </section>
      )}

      {results.resources.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {getResultTypeLabel('resource', true)} (
            {results.resources.length})
          </h2>
          <ul className={styles.resultsList}>
            {results.resources.map(result => (
              <li key={result.id} className={styles.resultItem}>
                <SearchResultLink
                  result={result}
                  query={query}
                  styles={styles as SearchResultLinkStyles}
                  isExternal={true}
                />
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
