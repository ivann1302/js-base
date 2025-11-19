export interface ITopic {
  id: string
  title: string
  content: string
}

export interface ICategory {
  id: string
  name: string
  topics: ITopic[]
}
