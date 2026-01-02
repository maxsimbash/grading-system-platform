import { useEffect, useState } from 'react'
import { Loader2, Wifi, WifiOff } from 'lucide-react'

interface MobileLoadingIndicatorProps {
  isLoading?: boolean
  message?: string
  type?: 'spinner' | 'dots' | 'pulse' | 'skeleton'
  size?: 'small' | 'medium' | 'large'
  showNetworkStatus?: boolean
}

export const MobileLoadingIndicator = ({
  isLoading = false,
  message = '加载中...',
  type = 'spinner',
  size = 'medium',
  showNetworkStatus = false
}: MobileLoadingIndicatorProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [dots, setDots] = useState('')

  // Network status monitoring
  useEffect(() => {
    if (!showNetworkStatus) return

    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [showNetworkStatus])

  // Animated dots for loading text
  useEffect(() => {
    if (type !== 'dots') return

    const interval = setInterval(() => {
      setDots(prev => {
        if (prev === '...') return ''
        return prev + '.'
      })
    }, 500)

    return () => clearInterval(interval)
  }, [type])

  if (!isLoading) return null

  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-6 h-6',
    large: 'w-8 h-8'
  }

  const containerSizeClasses = {
    small: 'p-2',
    medium: 'p-4',
    large: 'p-6'
  }

  const textSizeClasses = {
    small: 'text-xs',
    medium: 'text-sm',
    large: 'text-base'
  }

  const renderLoadingAnimation = () => {
    switch (type) {
      case 'spinner':
        return (
          <Loader2 
            className={`${sizeClasses[size]} animate-spin text-[#0071e3]`}
            aria-label="加载中"
          />
        )

      case 'dots':
        return (
          <div className="flex space-x-1">
            {[0, 1, 2].map((i) => (
              <div
                key={i}
                className={`${size === 'small' ? 'w-1 h-1' : size === 'medium' ? 'w-2 h-2' : 'w-3 h-3'} 
                  bg-[#0071e3] rounded-full animate-bounce`}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  animationDuration: '0.6s'
                }}
              />
            ))}
          </div>
        )

      case 'pulse':
        return (
          <div className={`${sizeClasses[size]} bg-[#0071e3] rounded-full animate-pulse`} />
        )

      case 'skeleton':
        return (
          <div className="space-y-2 w-full max-w-xs">
            <div className="h-4 bg-gray-200 rounded animate-pulse" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div 
      className={`
        flex flex-col items-center justify-center 
        ${containerSizeClasses[size]} 
        bg-white/90 backdrop-blur-sm rounded-2xl 
        shadow-lg border border-gray-100
        min-h-[80px] min-w-[120px]
      `}
      role="status"
      aria-live="polite"
    >
      {/* Network Status Indicator */}
      {showNetworkStatus && (
        <div className="flex items-center mb-2">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-500 mr-1" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500 mr-1" />
          )}
          <span className={`${textSizeClasses[size]} ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
            {isOnline ? '已连接' : '网络断开'}
          </span>
        </div>
      )}

      {/* Loading Animation */}
      <div className="mb-2">
        {renderLoadingAnimation()}
      </div>

      {/* Loading Message */}
      {message && type !== 'skeleton' && (
        <p className={`${textSizeClasses[size]} text-[#86868b] text-center font-medium`}>
          {type === 'dots' ? `${message}${dots}` : message}
        </p>
      )}

      {/* Offline Message */}
      {showNetworkStatus && !isOnline && (
        <p className="text-xs text-red-600 text-center mt-1">
          请检查网络连接
        </p>
      )}
    </div>
  )
}

// Full-screen loading overlay for mobile
interface MobileLoadingOverlayProps {
  isVisible: boolean
  message?: string
  onRetry?: () => void
  showRetryButton?: boolean
}

export const MobileLoadingOverlay = ({
  isVisible,
  message = '加载中...',
  onRetry,
  showRetryButton = false
}: MobileLoadingOverlayProps) => {
  if (!isVisible) return null

  return (
    <div 
      className="
        fixed inset-0 z-50 
        bg-black/30 backdrop-blur-sm 
        flex items-center justify-center
        p-6
      "
      role="dialog"
      aria-modal="true"
      aria-label="加载中"
    >
      <div className="
        bg-white rounded-3xl p-8 
        shadow-2xl border border-gray-100
        max-w-sm w-full text-center
        animate-fade-in
      ">
        <MobileLoadingIndicator
          isLoading={true}
          message={message}
          type="spinner"
          size="large"
          showNetworkStatus={true}
        />
        
        {showRetryButton && onRetry && (
          <button
            onClick={onRetry}
            className="
              mt-6 w-full px-6 py-3 
              bg-[#0071e3] text-white rounded-xl 
              hover:bg-[#0077ED] font-medium 
              transition-all active:scale-95
              min-h-[44px]
            "
          >
            重试
          </button>
        )}
      </div>
    </div>
  )
}

// Inline loading state for mobile components
interface MobileInlineLoadingProps {
  isLoading: boolean
  children: React.ReactNode
  loadingComponent?: React.ReactNode
  className?: string
}

export const MobileInlineLoading = ({
  isLoading,
  children,
  loadingComponent,
  className = ''
}: MobileInlineLoadingProps) => {
  if (isLoading) {
    return (
      <div className={`flex items-center justify-center py-8 ${className}`}>
        {loadingComponent || (
          <MobileLoadingIndicator
            isLoading={true}
            message="加载中..."
            type="spinner"
            size="medium"
          />
        )}
      </div>
    )
  }

  return <>{children}</>
}

// Progress indicator for mobile
interface MobileProgressIndicatorProps {
  progress: number // 0-100
  message?: string
  showPercentage?: boolean
}

export const MobileProgressIndicator = ({
  progress,
  message = '处理中...',
  showPercentage = true
}: MobileProgressIndicatorProps) => {
  const clampedProgress = Math.max(0, Math.min(100, progress))

  return (
    <div className="w-full max-w-sm mx-auto p-4">
      {/* Progress Bar */}
      <div className="relative w-full h-2 bg-gray-200 rounded-full overflow-hidden">
        <div
          className="absolute top-0 left-0 h-full bg-[#0071e3] rounded-full transition-all duration-300 ease-out"
          style={{ width: `${clampedProgress}%` }}
        />
      </div>

      {/* Progress Info */}
      <div className="flex items-center justify-between mt-3">
        <span className="text-sm text-[#86868b] font-medium">
          {message}
        </span>
        {showPercentage && (
          <span className="text-sm text-[#0071e3] font-semibold">
            {Math.round(clampedProgress)}%
          </span>
        )}
      </div>
    </div>
  )
}