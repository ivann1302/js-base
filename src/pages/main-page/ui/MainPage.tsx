import styles from './MainPage.module.scss'
import { getDeviceType } from '@/shared/assets/lib/utils/device'
import { Button } from '@/shared/ui/button'
import { IconGallery } from '@/widgets/iconGallery'

export const MainPage = () => {
  const deviceType = getDeviceType()
  const isMobile = deviceType === 'mobile'

  return (
    <div className={`${styles.container} ${isMobile ? styles.mobile : styles.desktop}`}>
      <h1 className={styles.title}>JS Base - база знаний для Frontend разработчика</h1>
      <Button variant='primary' size='md'>
        Старт
      </Button>
      <IconGallery className={styles.iconGallery} />
    </div>
  )
}
