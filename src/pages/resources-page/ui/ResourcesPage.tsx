import styles from './resourcesPage.module.scss'
import { Resourse } from '@/entities'

const resources = [
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
    description: 'Видеолекции для углубленного изучения Frontend (плейлист на YouTube)',
    link: 'https://www.youtube.com/watch?v=cXSQFFmixwU&list=PLKaafC45L_SQqca7_ClyPWTl-EXnEt0lB',
    id: '4',
  },
]

export default function ResourcesPage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Полезные материалы</h1>
      <ul className={styles.resourcesList}>
        {resources.map(resourse => {
          return (
            <li key={resourse.id}>
              <Resourse resource={resourse} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}
