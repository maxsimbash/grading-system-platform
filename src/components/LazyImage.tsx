import { useState, useRef, useEffect } from 'react'
import { createLazyImageObserver } from '../utils/mobilePerformance'

interface LazyImageProps {
  src: string
  alt: string
  className?: string
  placeholder?: string
  fallback?: string
  onLoad?: () => void
  onError?: () => void
  quality?: 'low' | 'medium' | 'high'
  sizes?: string
  loading?: 'lazy' | 'eager'
}

export const LazyImage = ({
  src,
  alt,
  className = '',
  placeholder = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjVmNWY3Ii8+PC9zdmc+',
  fallback = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmMGYwIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIE5vdCBGb3VuZDwvdGV4dD48L3N2Zz4=',
  onLoad,
  onError,
  quality = 'medium',
  sizes,
  loading = 'lazy'
}: LazyImageProps) => {
  const [isLoaded, setIsLoaded] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isInView, setIsInView] = useState(loading === 'eager')
  const imgRef = useRef<HTMLImageElement>(null)
  const observerRef = useRef<IntersectionObserver | null>(null)

  // Generate responsive image URLs based on quality
  const getOptimizedSrc = (originalSrc: string, _quality: 'low' | 'medium' | 'high') => {
    // In a real app, this would integrate with an image CDN like Cloudinary or ImageKit
    // For now, we'll just return the original src
    return originalSrc
  }

  const optimizedSrc = getOptimizedSrc(src, quality)

  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true)
      return
    }

    const currentImg = imgRef.current
    if (!currentImg) return

    // Create intersection observer for lazy loading
    observerRef.current = createLazyImageObserver((entry) => {
      if (entry.isIntersecting) {
        setIsInView(true)
        observerRef.current?.unobserve(entry.target)
      }
    }, {
      rootMargin: '50px 0px',
      threshold: 0.01
    }) as IntersectionObserver

    observerRef.current?.observe(currentImg)

    return () => {
      if (observerRef.current && currentImg) {
        observerRef.current.unobserve(currentImg)
      }
    }
  }, [loading])

  const handleLoad = () => {
    setIsLoaded(true)
    onLoad?.()
  }

  const handleError = () => {
    setIsError(true)
    onError?.()
  }

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder/Loading state */}
      {!isLoaded && !isError && (
        <img
          src={placeholder}
          alt=""
          className="absolute inset-0 w-full h-full object-cover animate-pulse"
          aria-hidden="true"
        />
      )}

      {/* Main image */}
      {isInView && (
        <img
          ref={imgRef}
          src={isError ? fallback : optimizedSrc}
          alt={alt}
          className={`
            w-full h-full object-cover transition-opacity duration-300
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
          `}
          onLoad={handleLoad}
          onError={handleError}
          sizes={sizes}
          loading={loading}
          decoding="async"
          data-loaded={isLoaded}
        />
      )}

      {/* Loading indicator */}
      {isInView && !isLoaded && !isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-6 h-6 border-2 border-[#0071e3] border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error state */}
      {isError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          图片加载失败
        </div>
      )}
    </div>
  )
}

// Progressive image component with multiple quality levels
interface ProgressiveImageProps extends LazyImageProps {
  srcSet?: {
    low: string
    medium: string
    high: string
  }
}

export const ProgressiveImage = ({
  srcSet,
  src,
  ...props
}: ProgressiveImageProps) => {
  const [currentQuality, setCurrentQuality] = useState<'low' | 'medium' | 'high'>('low')
  const [_loadedQualities, setLoadedQualities] = useState<Set<string>>(new Set())

  useEffect(() => {
    if (!srcSet) return

    // Load images progressively
    const loadImage = (src: string, quality: 'low' | 'medium' | 'high') => {
      const img = new Image()
      img.onload = () => {
        setLoadedQualities(prev => new Set([...prev, quality]))
        setCurrentQuality(quality)
      }
      img.src = src
    }

    // Load low quality first, then medium, then high
    loadImage(srcSet.low, 'low')
    setTimeout(() => loadImage(srcSet.medium, 'medium'), 100)
    setTimeout(() => loadImage(srcSet.high, 'high'), 500)
  }, [srcSet])

  const currentSrc = srcSet ? srcSet[currentQuality] : src

  return (
    <LazyImage
      {...props}
      src={currentSrc}
      className={`${props.className} ${currentQuality === 'low' ? 'filter blur-sm' : ''}`}
    />
  )
}

// Image gallery component with lazy loading
interface ImageGalleryProps {
  images: Array<{
    src: string
    alt: string
    caption?: string
  }>
  className?: string
  itemClassName?: string
}

export const LazyImageGallery = ({
  images,
  className = '',
  itemClassName = ''
}: ImageGalleryProps) => {
  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 gap-4 ${className}`}>
      {images.map((image, index) => (
        <div key={index} className={`relative ${itemClassName}`}>
          <LazyImage
            src={image.src}
            alt={image.alt}
            className="w-full h-48 rounded-lg"
            quality="medium"
            loading="lazy"
          />
          {image.caption && (
            <p className="mt-2 text-sm text-gray-600 text-center">
              {image.caption}
            </p>
          )}
        </div>
      ))}
    </div>
  )
}