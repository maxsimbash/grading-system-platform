import { useEffect, useRef } from 'react'
import { X } from 'lucide-react'
import { useTouchGestures } from '../hooks/useTouchGestures'

interface MobileNavMenuProps {
  isOpen: boolean
  currentPage: string
  onClose: () => void
  onNavigate: (page: 'home' | 'china-standard' | 'cefr' | 'lexile' | 'ort' | 'raz') => void
}

interface MenuItemProps {
  onClick: () => void
  children: React.ReactNode
  isActive?: boolean
}

const MenuItem = ({ onClick, children, isActive = false }: MenuItemProps) => {
  return (
    <button 
      onClick={onClick} 
      className={`
        text-left px-4 py-3 rounded-xl transition-all text-lg font-medium
        active:scale-[0.98] min-h-[44px] w-full
        ${isActive 
          ? 'bg-blue-50 text-blue-600 font-semibold' 
          : 'text-[#1d1d1f] hover:bg-white'
        }
      `}
    >
      {children}
    </button>
  )
}

export const MobileNavMenu = ({ 
  isOpen, 
  currentPage, 
  onClose, 
  onNavigate 
}: MobileNavMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null)
  const overlayRef = useRef<HTMLDivElement>(null)

  // Enhanced touch gesture support
  const touchGestureHandlers = useTouchGestures({
    onSwipe: (direction, distance) => {
      // Close menu on right swipe (swipe away)
      if (direction === 'right' && distance > 100) {
        onClose()
      }
    },
    onTap: (x) => {
      // Close menu if tapping on overlay (outside menu)
      if (overlayRef.current && menuRef.current) {
        const menuRect = menuRef.current.getBoundingClientRect()
        if (x < menuRect.left) {
          onClose()
        }
      }
    },
    swipeThreshold: 50,
    preventScroll: true
  })

  // 处理页面导航
  const handleNavigate = (page: 'home' | 'china-standard' | 'cefr' | 'lexile' | 'ort' | 'raz') => {
    onNavigate(page)
    onClose()
  }

  // 处理滑动手势关闭 - Legacy support (keeping for backward compatibility)
  useEffect(() => {
    if (!isOpen) return

    let startX = 0
    let currentX = 0
    let isDragging = false

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      isDragging = true
    }

    const handleTouchMove = (e: TouchEvent) => {
      if (!isDragging) return
      currentX = e.touches[0].clientX
      const deltaX = currentX - startX

      // 只允许向右滑动关闭
      if (deltaX > 0 && menuRef.current) {
        const progress = Math.min(deltaX / 200, 1)
        menuRef.current.style.transform = `translateX(${deltaX}px)`
        menuRef.current.style.opacity = `${1 - progress * 0.5}`
      }
    }

    const handleTouchEnd = () => {
      if (!isDragging) return
      isDragging = false

      const deltaX = currentX - startX
      
      if (menuRef.current) {
        if (deltaX > 100) {
          // 滑动距离足够，关闭菜单
          onClose()
        } else {
          // 滑动距离不够，恢复原位
          menuRef.current.style.transform = 'translateX(0)'
          menuRef.current.style.opacity = '1'
        }
      }
    }

    const menuElement = menuRef.current
    if (menuElement) {
      menuElement.addEventListener('touchstart', handleTouchStart, { passive: true })
      menuElement.addEventListener('touchmove', handleTouchMove, { passive: true })
      menuElement.addEventListener('touchend', handleTouchEnd, { passive: true })
    }

    return () => {
      if (menuElement) {
        menuElement.removeEventListener('touchstart', handleTouchStart)
        menuElement.removeEventListener('touchmove', handleTouchMove)
        menuElement.removeEventListener('touchend', handleTouchEnd)
      }
    }
  }, [isOpen, onClose])

  // 处理键盘导航
  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  // 阻止背景滚动
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  if (!isOpen) return null

  return (
    <div 
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm animate-fade-in"
      role="dialog"
      aria-modal="true"
      aria-label="导航菜单"
      {...touchGestureHandlers}
    >
      <div 
        ref={menuRef}
        className="absolute right-0 top-0 bottom-0 w-[280px] bg-[#f5f5f7] shadow-2xl p-6 animate-slide-left flex flex-col"
        onClick={e => e.stopPropagation()}
        style={{ touchAction: 'pan-y' }} // Allow vertical scrolling within menu
      >
        {/* 关闭按钮 */}
        <div className="flex justify-end mb-8">
          <button 
            onClick={onClose} 
            className="
              p-2 -mr-2 text-gray-500 hover:text-gray-700 
              active:opacity-50 transition-all rounded-lg
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
              min-h-[44px] min-w-[44px] flex items-center justify-center
            "
            aria-label="关闭导航菜单"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* 导航菜单项 */}
        <nav className="flex flex-col space-y-2" role="navigation">
          <MenuItem 
            onClick={() => handleNavigate('home')}
            isActive={currentPage === 'home'}
          >
            首页
          </MenuItem>
          <MenuItem 
            onClick={() => handleNavigate('china-standard')}
            isActive={currentPage === 'china-standard'}
          >
            新课标
          </MenuItem>
          <MenuItem 
            onClick={() => handleNavigate('cefr')}
            isActive={currentPage === 'cefr'}
          >
            CEFR
          </MenuItem>
          <MenuItem 
            onClick={() => handleNavigate('lexile')}
            isActive={currentPage === 'lexile'}
          >
            Lexile
          </MenuItem>
          <MenuItem 
            onClick={() => handleNavigate('ort')}
            isActive={currentPage === 'ort'}
          >
            ORT
          </MenuItem>
          <MenuItem 
            onClick={() => handleNavigate('raz')}
            isActive={currentPage === 'raz'}
          >
            RAZ
          </MenuItem>
        </nav>
      </div>
    </div>
  )
}