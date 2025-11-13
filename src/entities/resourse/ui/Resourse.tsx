import type { IResourceCardProps } from '@/entities/resourse/model/types'
import styles from './resourse.module.scss'

export default function Resourse({ resource }: IResourceCardProps) {
  return (
    <li className={styles.resourse}>
      <a
        href={resource.link}
        target='_blank'
        rel='noopener noreferrer'
        className={styles.resourseTitle}
      >
        {resource.title}
      </a>
      <p className={styles.resourseDescription}>{resource.description}</p>
    </li>
  )
}
