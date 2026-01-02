import { useRef, useCallback, useEffect } from 'react'

export interface TouchGestureConfig {
  onSwipe?: (direction: 'left' | 'right' | 'up' | 'down', distance: number) => void
  onTap?: (x: number, y: number) => void
  onLongPress?: (x: number, y: number) => void
  onPinch?: (scale: number) => void
  swipeThreshold?: number
  longPressDelay?: number
  tapMaxDuration?: number
  preventScroll?: boolean
}

export interface TouchGestureHandlers {
  onTouchStart: (e: React.TouchEvent) => void
  onTouchMove: (e: React.TouchEvent) => void
  onTouchEnd: (e: React.TouchEvent) => void
  onTouchCancel: (e: React.TouchEvent) => void
}

interface TouchState {
  startX: number
  startY: number
  startTime: number
  currentX: number
  currentY: number
  isMoving: boolean
  longPressTimer: number | null
  initialDistance: number
  currentDistance: number
}

export const useTouchGestures = (config: TouchGestureConfig = {}): TouchGestureHandlers => {
  const {
    onSwipe,
    onTap,
    onLongPress,
    onPinch,
    swipeThreshold = 50,
    longPressDelay = 500,
    tapMaxDuration = 300,
    preventScroll = false
  } = config

  const touchState = useRef<TouchState>({
    startX: 0,
    startY: 0,
    startTime: 0,
    currentX: 0,
    currentY: 0,
    isMoving: false,
    longPressTimer: null,
    initialDistance: 0,
    currentDistance: 0
  })

  // Helper function to calculate distance between two touches
  const getDistance = useCallback((touch1: React.Touch, touch2: React.Touch): number => {
    const dx = touch1.clientX - touch2.clientX
    const dy = touch1.clientY - touch2.clientY
    return Math.sqrt(dx * dx + dy * dy)
  }, [])

  // Clear long press timer
  const clearLongPressTimer = useCallback(() => {
    if (touchState.current.longPressTimer) {
      clearTimeout(touchState.current.longPressTimer)
      touchState.current.longPressTimer = null
    }
  }, [])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    const now = Date.now()

    touchState.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      startTime: now,
      currentX: touch.clientX,
      currentY: touch.clientY,
      isMoving: false,
      longPressTimer: null,
      initialDistance: e.touches.length === 2 ? getDistance(e.touches[0], e.touches[1]) : 0,
      currentDistance: 0
    }

    // Start long press timer for single touch
    if (e.touches.length === 1 && onLongPress) {
      touchState.current.longPressTimer = window.setTimeout(() => {
        if (!touchState.current.isMoving) {
          onLongPress(touchState.current.startX, touchState.current.startY)
        }
      }, longPressDelay)
    }

    // Prevent scroll if configured
    if (preventScroll) {
      e.preventDefault()
    }
  }, [onLongPress, longPressDelay, preventScroll, getDistance])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    const touch = e.touches[0]
    
    touchState.current.currentX = touch.clientX
    touchState.current.currentY = touch.clientY
    touchState.current.isMoving = true

    // Clear long press timer when moving
    clearLongPressTimer()

    // Handle pinch gesture for two touches
    if (e.touches.length === 2 && onPinch) {
      touchState.current.currentDistance = getDistance(e.touches[0], e.touches[1])
      if (touchState.current.initialDistance > 0) {
        const scale = touchState.current.currentDistance / touchState.current.initialDistance
        onPinch(scale)
      }
    }

    // Prevent scroll if configured
    if (preventScroll) {
      e.preventDefault()
    }
  }, [onPinch, clearLongPressTimer, preventScroll, getDistance])

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    const endTime = Date.now()
    const duration = endTime - touchState.current.startTime
    const deltaX = touchState.current.currentX - touchState.current.startX
    const deltaY = touchState.current.currentY - touchState.current.startY
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY)

    // Clear long press timer
    clearLongPressTimer()

    // Only process gestures for single touch that just ended
    if (e.changedTouches.length === 1 && e.touches.length === 0) {
      if (distance >= swipeThreshold) {
        // It's a swipe
        if (onSwipe) {
          let direction: 'left' | 'right' | 'up' | 'down'
          if (Math.abs(deltaX) > Math.abs(deltaY)) {
            direction = deltaX > 0 ? 'right' : 'left'
          } else {
            direction = deltaY > 0 ? 'down' : 'up'
          }
          onSwipe(direction, distance)
        }
      } else if (duration < tapMaxDuration && !touchState.current.isMoving) {
        // It's a tap
        if (onTap) {
          onTap(touchState.current.startX, touchState.current.startY)
        }
      }
    }

    // Reset state
    touchState.current.isMoving = false
  }, [onSwipe, onTap, swipeThreshold, tapMaxDuration, clearLongPressTimer])

  const handleTouchCancel = useCallback(() => {
    clearLongPressTimer()
    touchState.current.isMoving = false
  }, [clearLongPressTimer])

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      clearLongPressTimer()
    }
  }, [clearLongPressTimer])

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd,
    onTouchCancel: handleTouchCancel
  }
}

// Enhanced scroll behavior hook for mobile
export const useInertialScroll = (elementRef: React.RefObject<HTMLElement>) => {
  const scrollState = useRef({
    isScrolling: false,
    lastY: 0,
    velocity: 0,
    amplitude: 0,
    target: 0,
    timeConstant: 325, // ms
    animationId: 0
  })

  const track = useCallback(() => {
    const now = Date.now()
    const elapsed = now - scrollState.current.timeConstant
    const delta = scrollState.current.target - scrollState.current.amplitude
    
    if (elementRef.current) {
      elementRef.current.scrollTop = scrollState.current.target - delta * Math.exp(-elapsed / scrollState.current.timeConstant)
    }

    if (elapsed < scrollState.current.timeConstant * 3) {
      scrollState.current.animationId = requestAnimationFrame(track)
    }
  }, [elementRef])

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    scrollState.current.isScrolling = true
    scrollState.current.lastY = e.touches[0].clientY
    scrollState.current.velocity = 0
    
    if (scrollState.current.animationId) {
      cancelAnimationFrame(scrollState.current.animationId)
    }
  }, [])

  const handleTouchMove = useCallback((e: React.TouchEvent) => {
    if (!scrollState.current.isScrolling || !elementRef.current) return

    const y = e.touches[0].clientY
    const delta = scrollState.current.lastY - y
    
    scrollState.current.lastY = y
    scrollState.current.velocity = 0.8 * scrollState.current.velocity + 0.2 * delta

    elementRef.current.scrollTop += delta
    
    // Prevent overscroll
    const maxScroll = elementRef.current.scrollHeight - elementRef.current.clientHeight
    if (elementRef.current.scrollTop < 0) {
      elementRef.current.scrollTop = 0
    } else if (elementRef.current.scrollTop > maxScroll) {
      elementRef.current.scrollTop = maxScroll
    }
  }, [elementRef])

  const handleTouchEnd = useCallback(() => {
    if (!scrollState.current.isScrolling || !elementRef.current) return

    scrollState.current.isScrolling = false
    
    if (Math.abs(scrollState.current.velocity) > 1) {
      scrollState.current.amplitude = 0.8 * scrollState.current.velocity
      scrollState.current.target = Math.round(elementRef.current.scrollTop + scrollState.current.amplitude)
      scrollState.current.timeConstant = Date.now()
      
      // Ensure target is within bounds
      const maxScroll = elementRef.current.scrollHeight - elementRef.current.clientHeight
      scrollState.current.target = Math.max(0, Math.min(scrollState.current.target, maxScroll))
      
      scrollState.current.animationId = requestAnimationFrame(track)
    }
  }, [elementRef, track])

  return {
    onTouchStart: handleTouchStart,
    onTouchMove: handleTouchMove,
    onTouchEnd: handleTouchEnd
  }
}