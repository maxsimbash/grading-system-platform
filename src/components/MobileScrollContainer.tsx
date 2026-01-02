import { useRef, useEffect, useState, useCallback } from 'react'
import { useInertialScroll } from '../hooks/useTouchGestures'

interface MobileScrollContainerProps {
  children: React.ReactNode
  className?: string
  enableInertialScroll?: boolean
  enableBounce?: boolean
  bounceHeight?: number
  onScrollStart?: () => void
  onScrollEnd?: () => void
  onPullToRefresh?: () => void
  enablePullToRefresh?: boolean
  refreshThreshold?: number
  showScrollIndicator?: boolean
}

export const MobileScrollContainer = ({
  children,
  className = '',
  enableInertialScroll = true,
  enableBounce = true,
  bounceHeight = 50,
  onScrollStart,
  onScrollEnd,
  onPullToRefresh,
  enablePullToRefresh = false,
  refreshThreshold = 80,
  showScrollIndicator = true
}: MobileScrollContainerProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const [isScrolling, setIsScrolling] = useState(false)
  const [scrollTop, setScrollTop] = useState(0)
  const [isPulling, setIsPulling] = useState(false)
  const [pullDistance, setPullDistance] = useState(0)
  const [isRefreshing, setIsRefreshing] = useState(false)
  
  const scrollTimeoutRef = useRef<number | null>(null)
  const lastScrollTop = useRef(0)
  const startY = useRef(0)
  const currentY = useRef(0)

  // Use inertial scroll hook if enabled
  const inertialScrollHandlers = useInertialScroll(containerRef as React.RefObject<HTMLElement>)

  // Handle scroll events
  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    const newScrollTop = containerRef.current.scrollTop
    setScrollTop(newScrollTop)

    if (!isScrolling) {
      setIsScrolling(true)
      onScrollStart?.()
    }

    // Clear existing timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    // Set new timeout for scroll end
    scrollTimeoutRef.current = window.setTimeout(() => {
      setIsScrolling(false)
      onScrollEnd?.()
    }, 150)

    lastScrollTop.current = newScrollTop
  }, [isScrolling, onScrollStart, onScrollEnd])

  // Handle touch events for pull-to-refresh
  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    if (!enablePullToRefresh || !containerRef.current) return

    startY.current = e.touches[0].clientY
    currentY.current = startY.current

    // Only enable pull-to-refresh when at the top
    if (containerRef.current.scrollTop === 0) {
      setIsPulling(true)
    }

    // Call inertial scroll handler if enabled
    if (enableInertialScroll) {
      inertialScrollHandlers.onTouchStart(e)
    }
  }, [enablePullToRefresh, enableInertialScroll, inertialScrollHandlers])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!enablePullToRefresh || !containerRef.current || !isPulling) {
      // Call inertial scroll handler if enabled
      if (enableInertialScroll) {
        inertialScrollHandlers.onTouchMove(e)
      }
      return
    }

    currentY.current = e.touches[0].clientY
    const deltaY = currentY.current - startY.current

    // Only allow pulling down when at the top
    if (deltaY > 0 && containerRef.current.scrollTop === 0) {
      e.preventDefault()
      
      // Apply resistance to pull distance
      const resistance = 0.5
      const distance = Math.min(deltaY * resistance, refreshThreshold * 1.5)
      setPullDistance(distance)

      // Add visual feedback
      if (contentRef.current) {
        contentRef.current.style.transform = `translateY(${distance}px)`
        contentRef.current.style.transition = 'none'
      }
    } else {
      setIsPulling(false)
      setPullDistance(0)
    }
  }, [enablePullToRefresh, isPulling, refreshThreshold, enableInertialScroll, inertialScrollHandlers])

  const handleTouchEnd = useCallback(() => {
    if (enablePullToRefresh && isPulling) {
      setIsPulling(false)

      if (pullDistance >= refreshThreshold && onPullToRefresh && !isRefreshing) {
        setIsRefreshing(true)
        onPullToRefresh()
        
        // Reset after refresh (should be controlled by parent)
        setTimeout(() => {
          setIsRefreshing(false)
        }, 2000)
      }

      // Reset content position
      if (contentRef.current) {
        contentRef.current.style.transform = 'translateY(0)'
        contentRef.current.style.transition = 'transform 0.3s ease-out'
      }

      setPullDistance(0)
    }

    // Call inertial scroll handler if enabled
    if (enableInertialScroll) {
      inertialScrollHandlers.onTouchEnd()
    }
  }, [enablePullToRefresh, isPulling, pullDistance, refreshThreshold, onPullToRefresh, isRefreshing, enableInertialScroll, inertialScrollHandlers])

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  // Calculate scroll indicator position
  const scrollIndicatorHeight = containerRef.current 
    ? (containerRef.current.clientHeight / containerRef.current.scrollHeight) * 100
    : 0
  
  const scrollIndicatorTop = containerRef.current
    ? (scrollTop / (containerRef.current.scrollHeight - containerRef.current.clientHeight)) * (100 - scrollIndicatorHeight)
    : 0

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Pull-to-refresh indicator */}
      {enablePullToRefresh && (isPulling || isRefreshing) && (
        <div 
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-center py-4 bg-white/90 backdrop-blur-sm"
          style={{
            transform: `translateY(${Math.max(0, pullDistance - 60)}px)`,
            transition: isPulling ? 'none' : 'transform 0.3s ease-out'
          }}
        >
          <div className="flex items-center space-x-2">
            {isRefreshing ? (
              <>
                <div className="w-5 h-5 border-2 border-[#0071e3] border-t-transparent rounded-full animate-spin" />
                <span className="text-sm text-[#0071e3] font-medium">刷新中...</span>
              </>
            ) : pullDistance >= refreshThreshold ? (
              <>
                <div className="w-5 h-5 text-[#0071e3]">↓</div>
                <span className="text-sm text-[#0071e3] font-medium">释放刷新</span>
              </>
            ) : (
              <>
                <div className="w-5 h-5 text-gray-400">↓</div>
                <span className="text-sm text-gray-400 font-medium">下拉刷新</span>
              </>
            )}
          </div>
        </div>
      )}

      {/* Scroll container */}
      <div
        ref={containerRef}
        className={`
          overflow-y-auto overflow-x-hidden h-full
          ${enableBounce ? 'overscroll-y-bounce' : 'overscroll-y-contain'}
          scrollbar-hide
        `}
        onScroll={handleScroll}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        {/* Content wrapper */}
        <div ref={contentRef} className="min-h-full">
          {children}
        </div>

        {/* Bottom bounce padding */}
        {enableBounce && (
          <div style={{ height: bounceHeight }} className="flex-shrink-0" />
        )}
      </div>

      {/* Custom scroll indicator */}
      {showScrollIndicator && scrollIndicatorHeight < 100 && (
        <div className="absolute right-1 top-2 bottom-2 w-1 bg-gray-200/50 rounded-full">
          <div
            className="w-full bg-[#0071e3]/60 rounded-full transition-all duration-150"
            style={{
              height: `${Math.max(scrollIndicatorHeight, 10)}%`,
              transform: `translateY(${scrollIndicatorTop}%)`
            }}
          />
        </div>
      )}

      {/* Scroll state indicator */}
      {isScrolling && (
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2 z-20">
          <div className="bg-black/70 text-white px-3 py-1 rounded-full text-xs font-medium">
            滚动中
          </div>
        </div>
      )}
    </div>
  )
}

// Horizontal scroll container for mobile
interface MobileHorizontalScrollProps {
  children: React.ReactNode
  className?: string
  showScrollIndicator?: boolean
  snapToItems?: boolean
  itemWidth?: number
}

export const MobileHorizontalScroll = ({
  children,
  className = '',
  showScrollIndicator = true,
  snapToItems = false,
  itemWidth = 200
}: MobileHorizontalScrollProps) => {
  const containerRef = useRef<HTMLDivElement>(null)
  const [scrollLeft, setScrollLeft] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<number | null>(null)

  const handleScroll = useCallback(() => {
    if (!containerRef.current) return

    setScrollLeft(containerRef.current.scrollLeft)

    if (!isScrolling) {
      setIsScrolling(true)
    }

    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current)
    }

    scrollTimeoutRef.current = window.setTimeout(() => {
      setIsScrolling(false)
      
      // Snap to nearest item if enabled
      if (snapToItems && containerRef.current) {
        const nearestItem = Math.round(containerRef.current.scrollLeft / itemWidth)
        containerRef.current.scrollTo({
          left: nearestItem * itemWidth,
          behavior: 'smooth'
        })
      }
    }, 150)
  }, [isScrolling, snapToItems, itemWidth])

  useEffect(() => {
    return () => {
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  const scrollIndicatorWidth = containerRef.current
    ? (containerRef.current.clientWidth / containerRef.current.scrollWidth) * 100
    : 0

  const scrollIndicatorLeft = containerRef.current
    ? (scrollLeft / (containerRef.current.scrollWidth - containerRef.current.clientWidth)) * (100 - scrollIndicatorWidth)
    : 0

  return (
    <div className={`relative ${className}`}>
      <div
        ref={containerRef}
        className={`
          overflow-x-auto overflow-y-hidden
          ${snapToItems ? 'snap-x snap-mandatory' : ''}
          scrollbar-hide
        `}
        onScroll={handleScroll}
        style={{
          WebkitOverflowScrolling: 'touch',
          scrollbarWidth: 'none',
          msOverflowStyle: 'none'
        }}
      >
        <div className={`flex ${snapToItems ? 'snap-start' : ''}`}>
          {children}
        </div>
      </div>

      {/* Horizontal scroll indicator */}
      {showScrollIndicator && scrollIndicatorWidth < 100 && (
        <div className="absolute bottom-1 left-2 right-2 h-1 bg-gray-200/50 rounded-full">
          <div
            className="h-full bg-[#0071e3]/60 rounded-full transition-all duration-150"
            style={{
              width: `${Math.max(scrollIndicatorWidth, 10)}%`,
              transform: `translateX(${scrollIndicatorLeft}%)`
            }}
          />
        </div>
      )}
    </div>
  )
}