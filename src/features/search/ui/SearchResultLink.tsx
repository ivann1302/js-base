import { Link } from 'react-router-dom'
import type { ISearchResult } from '@/features/search/model/types'
import {
  highlightMatch,
  extractMatchFragment,
} from '@/shared/lib/utils/searchUtils'

interface ISearchResultLinkStyles {
  resultLink: string
  resultHeader: string
  resultCategory: string
  resultTitle: string
  resultDescription: string
}

interface ISearchResultLinkProps {
  result: ISearchResult
  query: string
  styles: ISearchResultLinkStyles
  descriptionFragmentLength?: number
  isExternal?: boolean
}

export const SearchResultLink = ({
  result,
  query,
  styles: css,
  descriptionFragmentLength = 200,
  isExternal = false,
}: ISearchResultLinkProps) => {
  const content = (
    <>
      <div className={css.resultHeader}>
        {result.categoryName && (
          <span className={css.resultCategory}>
            {result.categoryName}
          </span>
        )}
      </div>
      <h3
        className={css.resultTitle}
        dangerouslySetInnerHTML={{
          __html: highlightMatch(result.title, query),
        }}
      />
      {result.description && (
        <p className={css.resultDescription}>
          {isExternal
            ? extractMatchFragment(
                result.description,
                query,
                descriptionFragmentLength
              )
            : result.description}
        </p>
      )}
    </>
  )

  if (isExternal) {
    return (
      <a
        href={result.url}
        target='_blank'
        rel='noopener noreferrer'
        className={css.resultLink}
      >
        {content}
      </a>
    )
  }

  return (
    <Link to={result.url} className={css.resultLink}>
      {content}
    </Link>
  )
}
