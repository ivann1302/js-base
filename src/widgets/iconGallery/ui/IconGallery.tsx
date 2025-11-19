import styles from './iconGallery.module.scss'
import Icon from '@/shared/ui/icon/ui/Icon'
import { icons } from '@/shared/assets/icons'

export const IconGallery = ({
  className,
}: {
  className?: string
}) => {
  return (
    <div className={`${styles.iconGallery} ${className}`}>
      <Icon width={64} height={64} path={icons.html} alt='HTML' />
      <Icon width={64} height={64} path={icons.css} alt='CSS' />
      <Icon
        width={64}
        height={64}
        path={icons.javascript}
        alt='JavaScript'
      />
      <Icon
        width={64}
        height={64}
        path={icons.typescript}
        alt='TypeScript'
      />
      <Icon width={64} height={64} path={icons.react} alt='React' />
      <Icon
        width={64}
        height={64}
        path={icons.network}
        alt='Network'
      />
      <Icon width={64} height={64} path={icons.redux} alt='Redux' />
      <Icon width={64} height={64} path={icons.next} alt='Next' />
    </div>
  )
}
