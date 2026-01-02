import { useState, useEffect } from 'react'
import { Globe, Menu } from 'lucide-react'
import { UIModeToggle } from './UIModeToggle'
import type { UIMode } from '../hooks/useUIMode'

interface MobileHeaderProps {
  currentPage: string
  onPageChange: (page: 'home' | 'china-standard' | 'cefr' | 'lexile' | 'ort' | 'raz') => void
  onModeToggle: (mode: UIMode) => void
  currentMode: UIMode
  onMenuOpen: () => void
}

export const MobileHeader = ({ 
  currentPage, 
  onModeToggle, 
  currentMode,
  onMenuOpen 
}: MobileHeaderProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  // 监听滚动事件，添加阴影效果
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 0)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // 获取页面标题
  const getPageTitle = (page: string): string => {
    const titles: Record<string, string> = {
      'home': '英语能力和阅读标准查询',
      'china-standard': '新课标对标',
      'cefr': 'CEFR对标',
      'lexile': 'Lexile对标',
      'ort': 'ORT对标',
      'raz': 'RAZ对标'
    }
    return titles[page] || '英语能力和阅读标准查询'
  }

  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50
        h-12 bg-white/80 backdrop-blur-xl
        border-b border-gray-200/50
        transition-all duration-300
        ${isScrolled ? 'shadow-sm' : ''}
      `}
    >
      <div className="h-full px-4 flex items-center justify-between">
        {/* 左侧：应用图标 + 标题 */}
        <div className="flex items-center space-x-2 flex-1 min-w-0">
          <Globe className="w-4 h-4 text-gray-900 flex-shrink-0" />
          <h1 className="text-base font-semibold tracking-tight text-gray-900 truncate">
            {getPageTitle(currentPage)}
          </h1>
        </div>
        
        {/* 右侧：版本切换按钮 + 汉堡菜单 */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          {/* UI模式切换按钮 */}
          <UIModeToggle 
            currentMode={currentMode}
            onModeChange={onModeToggle}
            className="w-8 h-8"
          />
          
          {/* 汉堡菜单按钮 */}
          <button 
            className="
              w-8 h-8 rounded-lg
              flex items-center justify-center
              text-gray-900 hover:bg-gray-100
              active:opacity-50 transition-all
              focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
            "
            onClick={onMenuOpen}
            aria-label="打开导航菜单"
          >
            <Menu className="w-5 h-5" />
          </button>
        </div>
      </div>
    </header>
  )
}