import styles from './footer.module.scss'
import githubIconUrl from '@/shared/assets/icons/github.svg?url'
import telegramIconUrl from '@/shared/assets/icons/telegram.svg?url'

export const Footer = () => {
  const currentYear = new Date().getFullYear()
  const githubLink = 'https://github.com/ivann1302/js-base'
  const telegramLink = 'https://t.me/ivann97n'

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.copyright}>
          <p>© {currentYear} JS Base</p>
        </div>
        <div className={styles.links}>
          <a
            href={githubLink}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.link}
            aria-label='GitHub'
          >
            <img src={githubIconUrl} alt='GitHub' className={styles.icon} />
          </a>

          <a
            href={telegramLink}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.link}
            aria-label='Telegram'
          >
            <img src={telegramIconUrl} alt='Telegram' className={styles.icon} />
          </a>
        </div>
      </div>
    </footer>
  )
}
