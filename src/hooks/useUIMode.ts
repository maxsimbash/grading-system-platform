import { useState, useEffect, useCallback } from 'react'

export type UIMode = 'desktop' | 'mobile'
export type UserPreference = 'desktop' | 'mobile' | 'auto'
export type DeviceType = 'desktop' | 'tablet' | 'mobile'

interface UIModeState {
  currentMode: UIMode
  userPreference: UserPreference
  deviceType: DeviceType
  screenWidth: number
}

const STORAGE_KEY = 'ui-mode-preference'
const MOBILE_BREAKPOINT = 768
const TABLET_BREAKPOINT = 1024

// 设备检测函数
const detectDeviceType = (width: number): DeviceType => {
  if (width < MOBILE_BREAKPOINT) return 'mobile'
  if (width < TABLET_BREAKPOINT) return 'tablet'
  return 'desktop'
}

// 自动模式选择逻辑
const getAutoMode = (deviceType: DeviceType): UIMode => {
  return deviceType === 'mobile' ? 'mobile' : 'desktop'
}

// localStorage 操作
const savePreference = (preference: UserPreference): void => {
  try {
    localStorage.setItem(STORAGE_KEY, preference)
  } catch (error) {
    console.warn('Failed to save UI mode preference:', error)
  }
}

const loadPreference = (): UserPreference => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved === 'desktop' || saved === 'mobile' || saved === 'auto') {
      return saved
    }
  } catch (error) {
    console.warn('Failed to load UI mode preference:', error)
  }
  return 'auto' // 默认值
}

export const useUIMode = () => {
  const [state, setState] = useState<UIModeState>(() => {
    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1024
    const deviceType = detectDeviceType(screenWidth)
    const userPreference = loadPreference()
    
    const currentMode = userPreference === 'auto' 
      ? getAutoMode(deviceType)
      : userPreference
    
    return {
      currentMode,
      userPreference,
      deviceType,
      screenWidth
    }
  })

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      const newWidth = window.innerWidth
      const newDeviceType = detectDeviceType(newWidth)
      
      setState(prevState => {
        const newCurrentMode = prevState.userPreference === 'auto'
          ? getAutoMode(newDeviceType)
          : prevState.userPreference
        
        return {
          ...prevState,
          screenWidth: newWidth,
          deviceType: newDeviceType,
          currentMode: newCurrentMode
        }
      })
    }

    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // 切换UI模式
  const toggleMode = useCallback(() => {
    setState(prevState => {
      const newMode: UIMode = prevState.currentMode === 'desktop' ? 'mobile' : 'desktop'
      const newPreference: UserPreference = newMode
      
      savePreference(newPreference)
      
      return {
        ...prevState,
        currentMode: newMode,
        userPreference: newPreference
      }
    })
  }, [])

  // 设置特定模式
  const setMode = useCallback((mode: UIMode) => {
    setState(prevState => {
      if (prevState.currentMode === mode) return prevState
      
      savePreference(mode)
      
      return {
        ...prevState,
        currentMode: mode,
        userPreference: mode
      }
    })
  }, [])

  // 设置为自动模式
  const setAutoMode = useCallback(() => {
    setState(prevState => {
      const newMode = getAutoMode(prevState.deviceType)
      savePreference('auto')
      
      return {
        ...prevState,
        currentMode: newMode,
        userPreference: 'auto'
      }
    })
  }, [])

  return {
    currentMode: state.currentMode,
    userPreference: state.userPreference,
    deviceType: state.deviceType,
    screenWidth: state.screenWidth,
    toggleMode,
    setMode,
    setAutoMode,
    isMobile: state.currentMode === 'mobile',
    isDesktop: state.currentMode === 'desktop'
  }
}