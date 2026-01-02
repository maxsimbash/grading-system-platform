import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import { MobileHeader } from './MobileHeader'

describe('MobileHeader', () => {
  const defaultProps = {
    currentPage: 'home',
    onPageChange: vi.fn(),
    onModeToggle: vi.fn(),
    currentMode: 'mobile' as const,
    onMenuOpen: vi.fn()
  }

  it('renders with correct title for home page', () => {
    render(<MobileHeader {...defaultProps} />)
    
    expect(screen.getByText('英语能力和阅读标准查询')).toBeInTheDocument()
    expect(screen.getByLabelText('打开导航菜单')).toBeInTheDocument()
  })

  it('renders with correct title for different pages', () => {
    render(<MobileHeader {...defaultProps} currentPage="cefr" />)
    
    expect(screen.getByText('CEFR对标')).toBeInTheDocument()
  })

  it('calls onMenuOpen when hamburger menu is clicked', () => {
    const onMenuOpen = vi.fn()
    render(<MobileHeader {...defaultProps} onMenuOpen={onMenuOpen} />)
    
    const menuButton = screen.getByLabelText('打开导航菜单')
    fireEvent.click(menuButton)
    
    expect(onMenuOpen).toHaveBeenCalledTimes(1)
  })

  it('includes UI mode toggle component', () => {
    render(<MobileHeader {...defaultProps} />)
    
    // The UIModeToggle component should be present
    const toggleButton = screen.getByRole('button', { name: /切换到桌面版/ })
    expect(toggleButton).toBeInTheDocument()
  })

  it('has proper mobile header styling', () => {
    render(<MobileHeader {...defaultProps} />)
    
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('fixed', 'top-0', 'left-0', 'right-0', 'z-50')
    expect(header).toHaveClass('h-12')
  })
})