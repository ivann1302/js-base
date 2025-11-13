export interface IResource {
  id: string
  title: string
  description: string
  link?: string
}

export interface IResourceCardProps {
  resource: IResource
}
