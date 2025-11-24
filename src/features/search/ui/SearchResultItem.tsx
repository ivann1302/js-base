import type { ISearchResult } from '@/features/search/model/types'
import { getResultTypeLabel } from '@/features/search/lib/utils'
import {
  extractMatchFragment,
  highlightMatch,
} from '@/shared/lib/utils/searchUtils'
import styles from './searchInput.module.scss'

interface ISearchResultItemProps {
  result: ISearchResult
  query: string
  isFocused: boolean
  onClick: () => void
  onMouseEnter: () => void
  descriptionFragmentLength?: number
}

export const SearchResultItem = ({
  result,
  query,
  isFocused,
  onClick,
  onMouseEnter,
  descriptionFragmentLength = 80,
}: ISearchResultItemProps) => {
  return (
    <li
      className={`${styles.resultItem} ${isFocused ? styles.focused : ''}`}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
    >
      <div className={styles.resultHeader}>
        <span className={styles.resultType}>
          {getResultTypeLabel(result.type)}
        </span>
        {result.categoryName && (
          <span className={styles.resultCategory}>
            {result.categoryName}
          </span>
        )}
      </div>
      <div
        className={styles.resultTitle}
        dangerouslySetInnerHTML={{
          __html: highlightMatch(result.title, query),
        }}
      />
      {result.description && (
        <div className={styles.resultDescription}>
          {extractMatchFragment(
            result.description,
            query,
            descriptionFragmentLength
          )}
        </div>
      )}
    </li>
  )
}
