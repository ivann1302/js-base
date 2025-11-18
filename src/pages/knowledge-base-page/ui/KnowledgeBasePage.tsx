import { Link, useParams } from 'react-router-dom'
import styles from './knowledgeBasePage.module.scss'
import { Aside } from '@/widgets/aside/ui/Aside'
import { categories } from '@/pages/knowledge-base-page/model/data'

export default function KnowledgeBasePage() {
  const { categoryId, topicId } = useParams()

  const currentCategory = categories.find(
    category => category.id === categoryId
  )

  const currentTopic = categories
    .find(category => category.id === categoryId)
    ?.topics.find(topic => topic.id === topicId)

  return (
    <div className={styles.container}>
      <Aside />
      <main className={styles.content}>
        {topicId && currentTopic ? (
          <article className={styles.article}>
            <h1 className={styles.articleTitle}>
              {currentTopic.title}
            </h1>
            <p className={styles.articleContent}>
              {currentTopic.content}
            </p>
          </article>
        ) : categoryId && currentCategory ? (
          <div className={styles.topicsListContainer}>
            <h1 className={styles.categoryTitle}>
              {currentCategory.name}
            </h1>
            <ul className={styles.topicsList}>
              {currentCategory.topics.map(topic => (
                <li key={topic.id} className={styles.topicItem}>
                  <Link
                    to={`/knowledge-base/${categoryId}/${topic.id}`}
                    className={styles.topicLink}
                  >
                    {topic.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ) : (
          <div className={styles.welcome}>
            <h1 className={styles.welcomeTitle}>База знаний</h1>
            <p className={styles.welcomeText}>
              Выберите категорию и тему из меню слева, чтобы начать
              изучение.
            </p>
          </div>
        )}
      </main>
    </div>
  )
}
