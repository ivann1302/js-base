import styles from './resourcesPage.module.scss'
import { Resourse } from '@/entities'
import { resources } from '@/pages/resources-page/model/data'

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
