import { useState, useEffect } from 'react'

type DeviceType = 'mobile' | 'desktop'

const MOBILE_BREAKPOINT = 768

export const useDeviceType = (): DeviceType => {
  const [deviceType, setDeviceType] = useState<DeviceType>(() => {
    if (typeof window === 'undefined') return 'desktop'
    return window.innerWidth < MOBILE_BREAKPOINT
      ? 'mobile'
      : 'desktop'
  })

  useEffect(() => {
    const handleResize = () => {
      setDeviceType(
        window.innerWidth < MOBILE_BREAKPOINT ? 'mobile' : 'desktop'
      )
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  return deviceType
}

export const useIsMobile = (): boolean => {
  return useDeviceType() === 'mobile'
}
