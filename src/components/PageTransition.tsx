import { useState, useEffect, useRef } from 'react'

interface PageTransitionProps {
  children: React.ReactNode
  isVisible: boolean
  direction?: 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'fade' | 'scale'
  duration?: number
  className?: string
  onEnter?: () => void
  onExit?: () => void
  onEntered?: () => void
  onExited?: () => void
}

export const PageTransition = ({
  children,
  isVisible,
  direction = 'slide-left',
  duration = 300,
  className = '',
  onEnter,
  onExit,
  onEntered,
  onExited
}: PageTransitionProps) => {
  const [shouldRender, setShouldRender] = useState(isVisible)
  const [animationState, setAnimationState] = useState<'entering' | 'entered' | 'exiting' | 'exited'>('exited')
  const timeoutRef = useRef<number | null>(null)

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true)
      setAnimationState('entering')
      onEnter?.()
      
      timeoutRef.current = window.setTimeout(() => {
        setAnimationState('entered')
        onEntered?.()
      }, 50) // Small delay to ensure DOM is ready
    } else {
      setAnimationState('exiting')
      onExit?.()
      
      timeoutRef.current = window.setTimeout(() => {
        setAnimationState('exited')
        setShouldRender(false)
        onExited?.()
      }, duration)
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [isVisible, duration, onEnter, onExit, onEntered, onExited])

  if (!shouldRender) return null

  const getTransitionClasses = () => {
    const baseClasses = `transition-all ease-out`
    const durationClass = `duration-${duration}`

    switch (direction) {
      case 'slide-left':
        return {
          entering: `${baseClasses} ${durationClass} transform translate-x-full opacity-0`,
          entered: `${baseClasses} ${durationClass} transform translate-x-0 opacity-100`,
          exiting: `${baseClasses} ${durationClass} transform -translate-x-full opacity-0`
        }
      case 'slide-right':
        return {
          entering: `${baseClasses} ${durationClass} transform -translate-x-full opacity-0`,
          entered: `${baseClasses} ${durationClass} transform translate-x-0 opacity-100`,
          exiting: `${baseClasses} ${durationClass} transform translate-x-full opacity-0`
        }
      case 'slide-up':
        return {
          entering: `${baseClasses} ${durationClass} transform translate-y-full opacity-0`,
          entered: `${baseClasses} ${durationClass} transform translate-y-0 opacity-100`,
          exiting: `${baseClasses} ${durationClass} transform -translate-y-full opacity-0`
        }
      case 'slide-down':
        return {
          entering: `${baseClasses} ${durationClass} transform -translate-y-full opacity-0`,
          entered: `${baseClasses} ${durationClass} transform translate-y-0 opacity-100`,
          exiting: `${baseClasses} ${durationClass} transform translate-y-full opacity-0`
        }
      case 'fade':
        return {
          entering: `${baseClasses} ${durationClass} opacity-0`,
          entered: `${baseClasses} ${durationClass} opacity-100`,
          exiting: `${baseClasses} ${durationClass} opacity-0`
        }
      case 'scale':
        return {
          entering: `${baseClasses} ${durationClass} transform scale-95 opacity-0`,
          entered: `${baseClasses} ${durationClass} transform scale-100 opacity-100`,
          exiting: `${baseClasses} ${durationClass} transform scale-105 opacity-0`
        }
      default:
        return {
          entering: `${baseClasses} ${durationClass} opacity-0`,
          entered: `${baseClasses} ${durationClass} opacity-100`,
          exiting: `${baseClasses} ${durationClass} opacity-0`
        }
    }
  }

  const transitionClasses = getTransitionClasses()
  const currentClass = transitionClasses[animationState as keyof typeof transitionClasses] || transitionClasses.entered

  return (
    <div className={`${currentClass} ${className}`}>
      {children}
    </div>
  )
}

// Page router with transitions
interface TransitionRouterProps {
  currentPage: string
  pages: Record<string, React.ReactNode>
  direction?: 'slide-left' | 'slide-right' | 'slide-up' | 'slide-down' | 'fade' | 'scale'
  duration?: number
  className?: string
}

export const TransitionRouter = ({
  currentPage,
  pages,
  direction = 'slide-left',
  duration = 300,
  className = ''
}: TransitionRouterProps) => {
  const [previousPage, setPreviousPage] = useState(currentPage)
  const [_isTransitioning, setIsTransitioning] = useState(false)

  useEffect(() => {
    if (currentPage !== previousPage) {
      setIsTransitioning(true)
      
      const timeout = window.setTimeout(() => {
        setPreviousPage(currentPage)
        setIsTransitioning(false)
      }, duration / 2)

      return () => clearTimeout(timeout)
    }
  }, [currentPage, previousPage, duration])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {Object.entries(pages).map(([pageKey, pageContent]) => (
        <PageTransition
          key={pageKey}
          isVisible={pageKey === currentPage}
          direction={direction}
          duration={duration}
          className="absolute inset-0"
        >
          {pageContent}
        </PageTransition>
      ))}
    </div>
  )
}

// Mobile-specific page transition hook
export const useMobilePageTransition = (initialPage: string) => {
  const [currentPage, setCurrentPage] = useState(initialPage)
  const [transitionDirection, setTransitionDirection] = useState<'slide-left' | 'slide-right'>('slide-left')
  const pageHistoryRef = useRef<string[]>([initialPage])

  const navigateTo = (page: string, direction?: 'slide-left' | 'slide-right') => {
    if (page === currentPage) return

    // Determine direction based on navigation
    if (direction) {
      setTransitionDirection(direction)
    } else {
      // Auto-determine direction based on page history
      const currentIndex = pageHistoryRef.current.indexOf(currentPage)
      const isGoingBack = pageHistoryRef.current.includes(page) && 
                         pageHistoryRef.current.indexOf(page) < currentIndex
      
      setTransitionDirection(isGoingBack ? 'slide-right' : 'slide-left')
    }

    // Update page history
    if (!pageHistoryRef.current.includes(page)) {
      pageHistoryRef.current.push(page)
    }

    setCurrentPage(page)
  }

  const goBack = () => {
    const currentIndex = pageHistoryRef.current.indexOf(currentPage)
    if (currentIndex > 0) {
      const previousPage = pageHistoryRef.current[currentIndex - 1]
      navigateTo(previousPage, 'slide-right')
    }
  }

  const canGoBack = () => {
    const currentIndex = pageHistoryRef.current.indexOf(currentPage)
    return currentIndex > 0
  }

  return {
    currentPage,
    transitionDirection,
    navigateTo,
    goBack,
    canGoBack
  }
}

// Loading transition component
interface LoadingTransitionProps {
  isLoading: boolean
  children: React.ReactNode
  loadingComponent?: React.ReactNode
  className?: string
}

export const LoadingTransition = ({
  isLoading,
  children,
  loadingComponent,
  className = ''
}: LoadingTransitionProps) => {
  return (
    <div className={`relative ${className}`}>
      <PageTransition
        isVisible={!isLoading}
        direction="fade"
        duration={200}
      >
        {children}
      </PageTransition>
      
      <PageTransition
        isVisible={isLoading}
        direction="fade"
        duration={200}
        className="absolute inset-0 flex items-center justify-center bg-white/90 backdrop-blur-sm"
      >
        {loadingComponent || (
          <div className="flex flex-col items-center space-y-4">
            <div className="w-8 h-8 border-2 border-[#0071e3] border-t-transparent rounded-full animate-spin" />
            <p className="text-sm text-gray-600">加载中...</p>
          </div>
        )}
      </PageTransition>
    </div>
  )
}