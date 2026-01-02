import { useState, useEffect } from 'react'
import { Wifi, WifiOff, AlertTriangle } from 'lucide-react'

interface NetworkStatusProps {
  showIndicator?: boolean
  showToast?: boolean
  onOnline?: () => void
  onOffline?: () => void
  className?: string
}

export const NetworkStatus = ({
  showIndicator = true,
  showToast = true,
  onOnline,
  onOffline,
  className = ''
}: NetworkStatusProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [showOfflineToast, setShowOfflineToast] = useState(false)
  const [connectionType, setConnectionType] = useState<string>('unknown')

  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true)
      setShowOfflineToast(false)
      onOnline?.()
    }

    const handleOffline = () => {
      setIsOnline(false)
      if (showToast) {
        setShowOfflineToast(true)
      }
      onOffline?.()
    }

    // Get connection information if available
    const updateConnectionInfo = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection
      
      if (connection) {
        setConnectionType(connection.effectiveType || connection.type || 'unknown')
      }
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    // Listen for connection changes
    const connection = (navigator as any).connection
    if (connection) {
      connection.addEventListener('change', updateConnectionInfo)
      updateConnectionInfo()
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      
      if (connection) {
        connection.removeEventListener('change', updateConnectionInfo)
      }
    }
  }, [showToast, onOnline, onOffline])

  // Auto-hide offline toast after 5 seconds
  useEffect(() => {
    if (showOfflineToast) {
      const timer = setTimeout(() => {
        setShowOfflineToast(false)
      }, 5000)
      
      return () => clearTimeout(timer)
    }
  }, [showOfflineToast])

  return (
    <>
      {/* Network Status Indicator */}
      {showIndicator && (
        <div className={`flex items-center space-x-2 ${className}`}>
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-500" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500" />
          )}
          <span className={`text-xs font-medium ${
            isOnline ? 'text-green-600' : 'text-red-600'
          }`}>
            {isOnline ? '已连接' : '离线'}
          </span>
          {isOnline && connectionType !== 'unknown' && (
            <span className="text-xs text-gray-500">
              ({connectionType.toUpperCase()})
            </span>
          )}
        </div>
      )}

      {/* Offline Toast */}
      {showOfflineToast && (
        <div className="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 animate-slide-down">
          <div className="bg-red-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3 max-w-sm">
            <WifiOff className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-sm">网络连接已断开</p>
              <p className="text-xs opacity-90">请检查您的网络设置</p>
            </div>
            <button
              onClick={() => setShowOfflineToast(false)}
              className="text-white/80 hover:text-white transition-colors"
            >
              ✕
            </button>
          </div>
        </div>
      )}

      {/* Connection Quality Warning */}
      {isOnline && connectionType === 'slow-2g' && (
        <div className="fixed bottom-4 left-4 right-4 z-40 animate-slide-up">
          <div className="bg-yellow-500 text-white px-4 py-3 rounded-lg shadow-lg flex items-center space-x-3">
            <AlertTriangle className="w-5 h-5 flex-shrink-0" />
            <div className="flex-1">
              <p className="font-medium text-sm">网络连接较慢</p>
              <p className="text-xs opacity-90">某些功能可能受到影响</p>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

// Hook for network status
export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [connectionType, setConnectionType] = useState<string>('unknown')
  const [isSlowConnection, setIsSlowConnection] = useState(false)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    const updateConnectionInfo = () => {
      const connection = (navigator as any).connection || 
                        (navigator as any).mozConnection || 
                        (navigator as any).webkitConnection
      
      if (connection) {
        const effectiveType = connection.effectiveType || 'unknown'
        setConnectionType(effectiveType)
        setIsSlowConnection(effectiveType === 'slow-2g' || effectiveType === '2g')
      }
    }

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    
    const connection = (navigator as any).connection
    if (connection) {
      connection.addEventListener('change', updateConnectionInfo)
      updateConnectionInfo()
    }

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      
      if (connection) {
        connection.removeEventListener('change', updateConnectionInfo)
      }
    }
  }, [])

  return {
    isOnline,
    connectionType,
    isSlowConnection,
    isGoodConnection: isOnline && !isSlowConnection
  }
}

// Network-aware component wrapper
interface NetworkAwareProps {
  children: React.ReactNode
  fallback?: React.ReactNode
  requireGoodConnection?: boolean
  className?: string
}

export const NetworkAware = ({
  children,
  fallback,
  requireGoodConnection = false,
  className = ''
}: NetworkAwareProps) => {
  const { isOnline, isSlowConnection } = useNetworkStatus()

  const shouldShowFallback = !isOnline || (requireGoodConnection && isSlowConnection)

  if (shouldShowFallback) {
    return (
      <div className={`flex flex-col items-center justify-center p-8 text-center ${className}`}>
        {fallback || (
          <>
            <WifiOff className="w-12 h-12 text-gray-400 mb-4" />
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              {!isOnline ? '网络连接已断开' : '网络连接较慢'}
            </h3>
            <p className="text-gray-500 text-sm">
              {!isOnline 
                ? '请检查您的网络设置后重试' 
                : '当前网络较慢，某些功能可能无法正常使用'
              }
            </p>
          </>
        )}
      </div>
    )
  }

  return <>{children}</>
}

// Retry with network check
interface RetryWithNetworkProps {
  onRetry: () => void
  isLoading?: boolean
  error?: Error | null
  className?: string
}

export const RetryWithNetwork = ({
  onRetry,
  isLoading = false,
  error,
  className = ''
}: RetryWithNetworkProps) => {
  const { isOnline } = useNetworkStatus()

  const handleRetry = () => {
    if (isOnline && !isLoading) {
      onRetry()
    }
  }

  return (
    <div className={`flex flex-col items-center space-y-4 ${className}`}>
      {error && (
        <div className="text-center">
          <AlertTriangle className="w-8 h-8 text-red-500 mx-auto mb-2" />
          <p className="text-sm text-gray-600 mb-4">
            {error.message || '请求失败'}
          </p>
        </div>
      )}
      
      <NetworkStatus showIndicator={true} showToast={false} />
      
      <button
        onClick={handleRetry}
        disabled={!isOnline || isLoading}
        className={`
          px-6 py-3 rounded-xl font-medium transition-all
          min-h-[44px] min-w-[44px]
          ${isOnline && !isLoading
            ? 'bg-[#0071e3] text-white hover:bg-[#0077ED] active:scale-95'
            : 'bg-gray-200 text-gray-400 cursor-not-allowed'
          }
        `}
      >
        {isLoading ? '重试中...' : '重试'}
      </button>
      
      {!isOnline && (
        <p className="text-xs text-gray-500 text-center">
          请先连接网络后再重试
        </p>
      )}
    </div>
  )
}