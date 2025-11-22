import { useSearchParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { search } from '@/features/search/model'
import {
  highlightMatch,
  extractMatchFragment,
} from '@/shared/lib/utils/searchUtils'
import type { ISearchResults } from '@/features/search/model/types'
import styles from './searchResultsPage.module.scss'

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

  const getResultTypeLabel = (
    type: 'knowledge' | 'task' | 'resource'
  ): string => {
    switch (type) {
      case 'knowledge':
        return 'База знаний'
      case 'task':
        return 'Задачи'
      case 'resource':
        return 'Ресурсы'
    }
  }

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
            {getResultTypeLabel('knowledge')} (
            {results.knowledge.length})
          </h2>
          <ul className={styles.resultsList}>
            {results.knowledge.map(result => (
              <li key={result.id} className={styles.resultItem}>
                <Link to={result.url} className={styles.resultLink}>
                  <div className={styles.resultHeader}>
                    {result.categoryName && (
                      <span className={styles.resultCategory}>
                        {result.categoryName}
                      </span>
                    )}
                  </div>
                  <h3
                    className={styles.resultTitle}
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(result.title, query),
                    }}
                  />
                  {result.description && (
                    <p className={styles.resultDescription}>
                      {extractMatchFragment(
                        result.description,
                        query,
                        200
                      )}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {results.tasks.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {getResultTypeLabel('task')} ({results.tasks.length})
          </h2>
          <ul className={styles.resultsList}>
            {results.tasks.map(result => (
              <li key={result.id} className={styles.resultItem}>
                <Link to={result.url} className={styles.resultLink}>
                  <h3
                    className={styles.resultTitle}
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(result.title, query),
                    }}
                  />
                  {result.description && (
                    <p className={styles.resultDescription}>
                      {result.description}
                    </p>
                  )}
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      {results.resources.length > 0 && (
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>
            {getResultTypeLabel('resource')} (
            {results.resources.length})
          </h2>
          <ul className={styles.resultsList}>
            {results.resources.map(result => (
              <li key={result.id} className={styles.resultItem}>
                <a
                  href={result.url}
                  target='_blank'
                  rel='noopener noreferrer'
                  className={styles.resultLink}
                >
                  <h3
                    className={styles.resultTitle}
                    dangerouslySetInnerHTML={{
                      __html: highlightMatch(result.title, query),
                    }}
                  />
                  {result.description && (
                    <p className={styles.resultDescription}>
                      {extractMatchFragment(
                        result.description,
                        query,
                        200
                      )}
                    </p>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  )
}
