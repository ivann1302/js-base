export type TTaskDifficulty = 'easy' | 'medium' | 'hard'

export interface ITask {
  id: string
  text: string
  completed: boolean
  difficulty: TTaskDifficulty
}

export interface ITaskCardProps {
  task: ITask
  onToggle?: (id: string) => void
  className?: string
}
