import styles from './mainPage.module.scss'
import { useIsMobile } from '@/shared/lib/hooks/useDeviceType'
import { Button } from '@/shared/ui/button'
import { IconGallery } from '@/widgets/iconGallery'

export const MainPage = () => {
  const isMobile = useIsMobile()

  return (
    <div
      className={`${styles.container} ${isMobile ? styles.mobile : styles.desktop}`}
    >
      <h1 className={styles.title}>
        JS Base - база знаний для Frontend разработчика
      </h1>
      <Button variant='primary' size='lg'>
        Старт
      </Button>
      <IconGallery className={styles.iconGallery} />
    </div>
  )
}
