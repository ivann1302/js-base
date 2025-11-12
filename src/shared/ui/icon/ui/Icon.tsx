import styles from './icon.module.scss'

export interface IIconProps {
  width: number
  height: number
  path: string
  className?: string
  alt?: string
}

export default function Icon({ width, height, path, className, alt }: IIconProps) {
  return (
    <picture className={`${styles.icon} ${className || ''}`}>
      <source srcSet={path} media='(max-width: 800px)' />
      <img src={path} width={width} height={height} alt={alt} className={styles.image} />
    </picture>
  )
}
