import { Link, useParams } from 'react-router-dom'
import styles from './knowledgeBasePage.module.scss'
import { Aside } from '@/widgets/aside/ui/Aside'
import { Breadcrumbs } from '@/widgets/breadcrumbs'
import { categories } from '@/entities/knowledge/model'

export default function KnowledgeBasePage() {
  const { categoryId, topicId } = useParams()

  const currentCategory = categories.find(
    category => category.id === categoryId
  )

  const currentTopic = categories
    .find(category => category.id === categoryId)
    ?.topics.find(topic => topic.id === topicId)

  const breadcrumbs = []
  if (categoryId || topicId) {
    breadcrumbs.push({
      label: 'База знаний',
      path: '/knowledge-base',
    })

    if (categoryId && currentCategory) {
      breadcrumbs.push({
        label: currentCategory.name,
        path: `/knowledge-base/${categoryId}`,
        isLast: !topicId,
      })
    }

    if (topicId && currentTopic) {
      breadcrumbs.push({
        label: currentTopic.title,
        path: '',
        isLast: true,
      })
    }
  }

  return (
    <div className={styles.container}>
      <Aside />
      <main className={styles.content}>
        {topicId && currentTopic ? (
          <article className={styles.article}>
            {breadcrumbs.length > 0 && (
              <Breadcrumbs items={breadcrumbs} />
            )}
            <h1 className={styles.articleTitle}>
              {currentTopic.title}
            </h1>
            <p className={styles.articleContent}>
              {currentTopic.content}
            </p>
          </article>
        ) : categoryId && currentCategory ? (
          <div className={styles.topicsListContainer}>
            {breadcrumbs.length > 0 && (
              <Breadcrumbs items={breadcrumbs} />
            )}
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
