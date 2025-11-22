import type { IResource } from '@/entities/resourse/model/types'

export const resources: IResource[] = [
  {
    title: 'MDN Web Docs',
    description:
      'Ресурс для разработчиков, предоставляющий документацию по веб-технологиям HTML, CSS и JavaScript',
    link: 'https://developer.mozilla.org/ru/',
    id: '1',
  },
  {
    title: 'Дока',
    description: 'Документация для разработчиков на понятном языке',
    link: 'https://doka.guide/',
    id: '2',
  },
  {
    title: 'Patterns',
    description:
      'Ресурс для разработчиков, предоставляющий шаблоны для проектирования архитектуры приложений',
    link: 'https://www.patterns.dev/',
    id: '3',
  },
  {
    title: 'Лекции по Frontend',
    description:
      'Видеолекции для углубленного изучения Frontend (плейлист на YouTube)',
    link: 'https://www.youtube.com/watch?v=cXSQFFmixwU&list=PLKaafC45L_SQqca7_ClyPWTl-EXnEt0lB',
    id: '4',
  },
  {
    title: 'Вы не знаете JS (серия книг) по JavaScript',
    description:
      'Серия книг, погружение в которую позволит вам окунуться в основные механизмы языка JavaScript',
    id: '5',
  },
]
