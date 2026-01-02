import React, { useState, useEffect } from 'react'
import { AlertTriangle, RefreshCw, Wifi, WifiOff, Home, ArrowLeft } from 'lucide-react'

interface MobileErrorHandlerProps {
  error?: Error | null
  onRetry?: () => void
  onGoHome?: () => void
  onGoBack?: () => void
  showRetryButton?: boolean
  showHomeButton?: boolean
  showBackButton?: boolean
  customMessage?: string
  type?: 'network' | 'generic' | 'notFound' | 'timeout' | 'serverError'
}

export const MobileErrorHandler = ({
  error,
  onRetry,
  onGoHome,
  onGoBack,
  showRetryButton = true,
  showHomeButton = false,
  showBackButton = false,
  customMessage,
  type = 'generic'
}: MobileErrorHandlerProps) => {
  const [isOnline, setIsOnline] = useState(navigator.onLine)
  const [retryCount, setRetryCount] = useState(0)

  useEffect(() => {
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)

    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
    }
  }, [])

  const handleRetry = () => {
    setRetryCount(prev => prev + 1)
    onRetry?.()
  }

  const getErrorContent = () => {
    if (customMessage) {
      return {
        icon: <AlertTriangle className="w-12 h-12 text-orange-500" />,
        title: '出现问题',
        message: customMessage
      }
    }

    switch (type) {
      case 'network':
        return {
          icon: isOnline ? (
            <Wifi className="w-12 h-12 text-red-500" />
          ) : (
            <WifiOff className="w-12 h-12 text-red-500" />
          ),
          title: isOnline ? '网络请求失败' : '网络连接断开',
          message: isOnline 
            ? '无法连接到服务器，请检查网络设置或稍后重试。'
            : '请检查您的网络连接，然后重试。'
        }

      case 'notFound':
        return {
          icon: <AlertTriangle className="w-12 h-12 text-gray-500" />,
          title: '页面未找到',
          message: '抱歉，您访问的页面不存在或已被移除。'
        }

      case 'timeout':
        return {
          icon: <AlertTriangle className="w-12 h-12 text-yellow-500" />,
          title: '请求超时',
          message: '服务器响应时间过长，请检查网络连接或稍后重试。'
        }

      case 'serverError':
        return {
          icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
          title: '服务器错误',
          message: '服务器暂时无法处理您的请求，请稍后重试。'
        }

      default:
        return {
          icon: <AlertTriangle className="w-12 h-12 text-red-500" />,
          title: '出现错误',
          message: error?.message || '发生了未知错误，请重试或联系技术支持。'
        }
    }
  }

  const { icon, title, message } = getErrorContent()

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-6 text-center">
      {/* Error Icon */}
      <div className="mb-6 animate-bounce">
        {icon}
      </div>

      {/* Error Title */}
      <h2 className="text-xl font-bold text-[#1d1d1f] mb-3">
        {title}
      </h2>

      {/* Error Message */}
      <p className="text-[#86868b] text-base leading-relaxed mb-6 max-w-sm">
        {message}
      </p>

      {/* Network Status */}
      {type === 'network' && (
        <div className="flex items-center mb-6 px-4 py-2 bg-gray-50 rounded-full">
          {isOnline ? (
            <Wifi className="w-4 h-4 text-green-500 mr-2" />
          ) : (
            <WifiOff className="w-4 h-4 text-red-500 mr-2" />
          )}
          <span className={`text-sm font-medium ${isOnline ? 'text-green-600' : 'text-red-600'}`}>
            {isOnline ? '网络已连接' : '网络未连接'}
          </span>
        </div>
      )}

      {/* Retry Count */}
      {retryCount > 0 && (
        <p className="text-xs text-[#86868b] mb-4">
          已重试 {retryCount} 次
        </p>
      )}

      {/* Action Buttons */}
      <div className="flex flex-col space-y-3 w-full max-w-xs">
        {showRetryButton && onRetry && (
          <button
            onClick={handleRetry}
            disabled={!isOnline && type === 'network'}
            className={`
              flex items-center justify-center px-6 py-3 rounded-xl font-medium 
              transition-all active:scale-95 min-h-[44px]
              ${!isOnline && type === 'network'
                ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                : 'bg-[#0071e3] text-white hover:bg-[#0077ED]'
              }
            `}
          >
            <RefreshCw className="w-5 h-5 mr-2" />
            重试
          </button>
        )}

        {showBackButton && onGoBack && (
          <button
            onClick={onGoBack}
            className="
              flex items-center justify-center px-6 py-3 
              bg-gray-100 text-[#1d1d1f] rounded-xl font-medium 
              hover:bg-gray-200 transition-all active:scale-95
              min-h-[44px]
            "
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            返回
          </button>
        )}

        {showHomeButton && onGoHome && (
          <button
            onClick={onGoHome}
            className="
              flex items-center justify-center px-6 py-3 
              bg-gray-100 text-[#1d1d1f] rounded-xl font-medium 
              hover:bg-gray-200 transition-all active:scale-95
              min-h-[44px]
            "
          >
            <Home className="w-5 h-5 mr-2" />
            回到首页
          </button>
        )}
      </div>

      {/* Additional Help Text */}
      <p className="text-xs text-[#86868b] mt-6 max-w-sm">
        如果问题持续存在，请联系技术支持或稍后再试。
      </p>
    </div>
  )
}

// Error boundary component for mobile
interface MobileErrorBoundaryState {
  hasError: boolean
  error?: Error
}

interface MobileErrorBoundaryProps {
  children: React.ReactNode
  fallback?: React.ComponentType<{ error?: Error; onRetry: () => void }>
  onError?: (error: Error, errorInfo: any) => void
}

export class MobileErrorBoundary extends React.Component<
  MobileErrorBoundaryProps,
  MobileErrorBoundaryState
> {
  constructor(props: MobileErrorBoundaryProps) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError(error: Error): MobileErrorBoundaryState {
    return { hasError: true, error }
  }

  componentDidCatch(error: Error, errorInfo: any) {
    this.props.onError?.(error, errorInfo)
    
    // Log error to console in development
    if (import.meta.env?.DEV) {
      console.error('MobileErrorBoundary caught an error:', error, errorInfo)
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined })
  }

  render() {
    if (this.state.hasError) {
      const FallbackComponent = this.props.fallback

      if (FallbackComponent) {
        return <FallbackComponent error={this.state.error} onRetry={this.handleRetry} />
      }

      return (
        <MobileErrorHandler
          error={this.state.error}
          onRetry={this.handleRetry}
          showRetryButton={true}
          type="generic"
        />
      )
    }

    return this.props.children
  }
}

// Hook for handling async errors in mobile components
export const useMobileErrorHandler = () => {
  const [error, setError] = useState<Error | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [retryCount, setRetryCount] = useState(0)

  const handleAsyncOperation = async <T,>(
    operation: () => Promise<T>,
    options?: {
      maxRetries?: number
      retryDelay?: number
      onSuccess?: (result: T) => void
      onError?: (error: Error) => void
    }
  ): Promise<T | null> => {
    const { maxRetries = 3, retryDelay = 1000, onSuccess, onError } = options || {}

    setIsLoading(true)
    setError(null)

    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        const result = await operation()
        setIsLoading(false)
        setRetryCount(0)
        onSuccess?.(result)
        return result
      } catch (err) {
        const error = err instanceof Error ? err : new Error('Unknown error')
        
        if (attempt === maxRetries) {
          setError(error)
          setIsLoading(false)
          setRetryCount(attempt + 1)
          onError?.(error)
          return null
        }

        // Wait before retrying
        if (retryDelay > 0) {
          await new Promise(resolve => setTimeout(resolve, retryDelay))
        }
      }
    }

    return null
  }

  const retry = () => {
    setError(null)
    setRetryCount(0)
  }

  const reset = () => {
    setError(null)
    setIsLoading(false)
    setRetryCount(0)
  }

  return {
    error,
    isLoading,
    retryCount,
    handleAsyncOperation,
    retry,
    reset
  }
}