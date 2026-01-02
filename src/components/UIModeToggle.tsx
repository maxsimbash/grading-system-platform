import { Monitor, Smartphone } from 'lucide-react'
import type { UIMode } from '../hooks/useUIMode'

interface UIModeToggleProps {
  currentMode: UIMode
  onModeChange: (mode: UIMode) => void
  className?: string
}

export const UIModeToggle = ({ currentMode, onModeChange, className = '' }: UIModeToggleProps) => {
  const handleToggle = () => {
    const newMode: UIMode = currentMode === 'desktop' ? 'mobile' : 'desktop'
    onModeChange(newMode)
  }

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault()
      handleToggle()
    }
  }

  return (
    <button
      onClick={handleToggle}
      onKeyDown={handleKeyDown}
      className={`
        inline-flex items-center justify-center
        w-10 h-10 rounded-xl
        bg-gray-100 hover:bg-gray-200
        text-gray-600 hover:text-gray-900
        transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        active:scale-95
        ${className}
      `}
      aria-label={`切换到${currentMode === 'desktop' ? '手机' : '桌面'}版`}
      title={`当前: ${currentMode === 'desktop' ? '桌面版' : '手机版'}`}
    >
      <div className="relative w-5 h-5">
        <Smartphone 
          className={`
            absolute inset-0 w-5 h-5 transition-all duration-300
            ${currentMode === 'desktop' 
              ? 'opacity-100 scale-100 rotate-0' 
              : 'opacity-0 scale-75 rotate-180'
            }
          `}
        />
        <Monitor 
          className={`
            absolute inset-0 w-5 h-5 transition-all duration-300
            ${currentMode === 'mobile' 
              ? 'opacity-100 scale-100 rotate-0' 
              : 'opacity-0 scale-75 rotate-180'
            }
          `}
        />
      </div>
    </button>
  )
}