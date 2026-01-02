// Mobile performance optimization utilities

// Debounce function for touch events
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number,
  immediate = false
): ((...args: Parameters<T>) => void) => {
  let timeout: number | null = null

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      timeout = null
      if (!immediate) func(...args)
    }

    const callNow = immediate && !timeout

    if (timeout) clearTimeout(timeout)
    timeout = window.setTimeout(later, wait)

    if (callNow) func(...args)
  }
}

// Throttle function for scroll events
export const throttle = <T extends (...args: any[]) => any>(
  func: T,
  limit: number
): ((...args: Parameters<T>) => void) => {
  let inThrottle: boolean
  
  return function executedFunction(this: any, ...args: Parameters<T>) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

// Lazy loading utility for images
export const createLazyImageObserver = (
  callback: (entry: IntersectionObserverEntry) => void,
  options?: IntersectionObserverInit
) => {
  if (!('IntersectionObserver' in window)) {
    // Fallback for older browsers
    return {
      observe: (element: Element) => callback({ target: element } as IntersectionObserverEntry),
      unobserve: () => {},
      disconnect: () => {}
    }
  }

  return new IntersectionObserver((entries) => {
    entries.forEach(callback)
  }, {
    rootMargin: '50px 0px',
    threshold: 0.01,
    ...options
  })
}

// Performance monitoring
export class MobilePerformanceMonitor {
  private static instance: MobilePerformanceMonitor
  private metrics: Map<string, number[]> = new Map()
  private observers: PerformanceObserver[] = []

  static getInstance(): MobilePerformanceMonitor {
    if (!MobilePerformanceMonitor.instance) {
      MobilePerformanceMonitor.instance = new MobilePerformanceMonitor()
    }
    return MobilePerformanceMonitor.instance
  }

  // Measure response time for touch events
  measureTouchResponse(eventName: string, startTime: number): void {
    const endTime = performance.now()
    const responseTime = endTime - startTime

    if (!this.metrics.has(eventName)) {
      this.metrics.set(eventName, [])
    }

    const times = this.metrics.get(eventName)!
    times.push(responseTime)

    // Keep only last 100 measurements
    if (times.length > 100) {
      times.shift()
    }

    // Log warning if response time exceeds 100ms (requirement 8.3)
    if (responseTime > 100) {
      console.warn(`Touch response time exceeded 100ms: ${eventName} took ${responseTime.toFixed(2)}ms`)
    }
  }

  // Get average response time for an event
  getAverageResponseTime(eventName: string): number {
    const times = this.metrics.get(eventName)
    if (!times || times.length === 0) return 0

    const sum = times.reduce((acc, time) => acc + time, 0)
    return sum / times.length
  }

  // Monitor page load performance
  monitorPageLoad(): Promise<void> {
    return new Promise((resolve) => {
      if (document.readyState === 'complete') {
        this.recordPageLoadMetrics()
        resolve()
      } else {
        window.addEventListener('load', () => {
          this.recordPageLoadMetrics()
          resolve()
        })
      }
    })
  }

  private recordPageLoadMetrics(): void {
    const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
    
    if (navigation) {
      const firstContentfulPaint = performance.getEntriesByName('first-contentful-paint')[0]
      const firstScreenRender = navigation.loadEventEnd - navigation.fetchStart

      console.log('Mobile Performance Metrics:', {
        firstScreenRender: `${firstScreenRender.toFixed(2)}ms`,
        firstContentfulPaint: firstContentfulPaint ? `${firstContentfulPaint.startTime.toFixed(2)}ms` : 'N/A',
        domContentLoaded: `${(navigation.domContentLoadedEventEnd - navigation.fetchStart).toFixed(2)}ms`,
        loadComplete: `${(navigation.loadEventEnd - navigation.fetchStart).toFixed(2)}ms`
      })

      // Check if first screen render meets 3-second requirement
      if (firstScreenRender > 3000) {
        console.warn(`Page load time exceeded 3 seconds: ${firstScreenRender.toFixed(2)}ms`)
      }
    }
  }

  // Start monitoring performance
  startMonitoring(): void {
    // Monitor Long Tasks
    if ('PerformanceObserver' in window) {
      try {
        const longTaskObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry) => {
            console.warn(`Long task detected: ${entry.duration.toFixed(2)}ms`)
          })
        })
        longTaskObserver.observe({ entryTypes: ['longtask'] })
        this.observers.push(longTaskObserver)
      } catch (e) {
        // Long task API not supported
      }

      // Monitor Layout Shifts
      try {
        const clsObserver = new PerformanceObserver((list) => {
          list.getEntries().forEach((entry: any) => {
            if (entry.value > 0.1) {
              console.warn(`Layout shift detected: ${entry.value}`)
            }
          })
        })
        clsObserver.observe({ entryTypes: ['layout-shift'] })
        this.observers.push(clsObserver)
      } catch (e) {
        // Layout shift API not supported
      }
    }
  }

  // Stop monitoring
  stopMonitoring(): void {
    this.observers.forEach(observer => observer.disconnect())
    this.observers = []
  }

  // Get performance report
  getPerformanceReport(): Record<string, any> {
    const report: Record<string, any> = {}

    this.metrics.forEach((times, eventName) => {
      report[eventName] = {
        average: this.getAverageResponseTime(eventName),
        min: Math.min(...times),
        max: Math.max(...times),
        count: times.length
      }
    })

    return report
  }
}

// Touch event optimization
export const optimizeTouchEvent = (element: HTMLElement): void => {
  // Add touch-action CSS property for better performance
  element.style.touchAction = 'manipulation'
  
  // Add will-change for elements that will be animated
  if (element.classList.contains('animate-') || element.style.transform) {
    element.style.willChange = 'transform'
  }
}

// Viewport utilities
export const getViewportInfo = () => {
  return {
    width: window.innerWidth,
    height: window.innerHeight,
    devicePixelRatio: window.devicePixelRatio || 1,
    orientation: window.screen?.orientation?.type || 'unknown',
    isLandscape: window.innerWidth > window.innerHeight,
    isPortrait: window.innerHeight > window.innerWidth
  }
}

// Memory management for mobile
export const cleanupUnusedElements = (): void => {
  // Remove unused images from DOM
  const images = document.querySelectorAll('img[data-loaded="false"]')
  images.forEach(img => {
    if (!img.getBoundingClientRect().width) {
      img.remove()
    }
  })

  // Clear unused event listeners (this would need to be implemented per component)
  // Force garbage collection if available (development only)
  if (import.meta.env?.DEV && 'gc' in window) {
    (window as any).gc()
  }
}

// Network status monitoring
export const createNetworkMonitor = (
  onOnline: () => void,
  onOffline: () => void
) => {
  const handleOnline = () => {
    console.log('Network: Online')
    onOnline()
  }

  const handleOffline = () => {
    console.log('Network: Offline')
    onOffline()
  }

  window.addEventListener('online', handleOnline)
  window.addEventListener('offline', handleOffline)

  // Return cleanup function
  return () => {
    window.removeEventListener('online', handleOnline)
    window.removeEventListener('offline', handleOffline)
  }
}

// Image compression utility
export const compressImage = (
  file: File,
  maxWidth: number = 800,
  maxHeight: number = 600,
  quality: number = 0.8
): Promise<Blob> => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    const img = new Image()

    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img
      
      if (width > height) {
        if (width > maxWidth) {
          height = (height * maxWidth) / width
          width = maxWidth
        }
      } else {
        if (height > maxHeight) {
          width = (width * maxHeight) / height
          height = maxHeight
        }
      }

      canvas.width = width
      canvas.height = height

      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height)
      canvas.toBlob((blob) => {
        if (blob) {
          resolve(blob)
        } else {
          resolve(new Blob())
        }
      }, 'image/jpeg', quality)
    }

    img.src = URL.createObjectURL(file)
  })
}

// Initialize mobile performance monitoring
export const initMobilePerformance = (): MobilePerformanceMonitor => {
  const monitor = MobilePerformanceMonitor.getInstance()
  monitor.startMonitoring()
  monitor.monitorPageLoad()
  
  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    monitor.stopMonitoring()
  })

  return monitor
}