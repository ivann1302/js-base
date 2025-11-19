import styles from './footer.module.scss'
import { icons } from '@/shared/assets/icons'

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
            <img
              src={icons.github}
              alt='GitHub'
              className={styles.icon}
            />
          </a>

          <a
            href={telegramLink}
            target='_blank'
            rel='noopener noreferrer'
            className={styles.link}
            aria-label='Telegram'
          >
            <img
              src={icons.telegram}
              alt='Telegram'
              className={styles.icon}
            />
          </a>
        </div>
      </div>
    </footer>
  )
}
