export type SearchResultType = 'knowledge' | 'task' | 'resource'

export interface ISearchResult {
  id: string
  type: SearchResultType
  title: string
  description?: string
  url: string
  categoryName?: string
}

export interface ISearchResults {
  knowledge: ISearchResult[]
  tasks: ISearchResult[]
  resources: ISearchResult[]
  total: number
}
