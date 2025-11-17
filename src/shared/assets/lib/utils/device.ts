export const isMobile = () => {
  if (typeof window === 'undefined') return false

  // Проверка по User agent
  const userAgent = navigator.userAgent || navigator.vendor
  const mobileRegex =
    /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i
  const isMobileUserAgent = mobileRegex.test(userAgent.toLowerCase())

  // Проверка по ширине экрана
  const isMobileViewPort = window.innerWidth < 768

  // Проверка по touch-событиям
  const isTouchDevice =
    'ontouchstart' in window || navigator.maxTouchPoints > 0

  // Если это явно десктоп
  const isDesktopUserAgent =
    /windows|macintosh|linux/i.test(userAgent) &&
    !/android|iphone|ipad|ipod/i.test(userAgent)

  // Приоритет: если явно десктопный агент и широкий экран
  if (isDesktopUserAgent && window.innerWidth >= 1024) {
    return false
  }

  // В остальных случаях - мобильное устройство
  return isMobileUserAgent || isMobileViewPort || isTouchDevice
}

export const getDeviceType = () => {
  return isMobile() ? 'mobile' : 'desktop'
}
