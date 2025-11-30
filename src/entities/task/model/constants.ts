import { type TTaskDifficulty } from './types'

export const DIFFICULTY_LABELS: Record<TTaskDifficulty, string> = {
  easy: 'легкая',
  medium: 'средняя',
  hard: 'тяжелая',
}

export const DIFFICULTY_ORDER: Record<TTaskDifficulty, number> = {
  easy: 1,
  medium: 2,
  hard: 3,
}
