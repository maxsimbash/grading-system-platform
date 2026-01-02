import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import fc from 'fast-check'
import { MobileNavMenu } from './MobileNavMenu'

describe('MobileNavMenu', () => {
  const defaultProps = {
    isOpen: true,
    currentPage: 'home',
    onClose: vi.fn(),
    onNavigate: vi.fn()
  }

  beforeEach(() => {
    vi.clearAllMocks()
  })

  afterEach(() => {
    // 清理 body overflow 样式
    document.body.style.overflow = ''
  })

  describe('Basic functionality', () => {
    it('renders when isOpen is true', () => {
      render(<MobileNavMenu {...defaultProps} />)
      
      expect(screen.getByRole('dialog')).toBeInTheDocument()
      expect(screen.getByLabelText('导航菜单')).toBeInTheDocument()
    })

    it('does not render when isOpen is false', () => {
      render(<MobileNavMenu {...defaultProps} isOpen={false} />)
      
      expect(screen.queryByRole('dialog')).not.toBeInTheDocument()
    })

    it('calls onClose when close button is clicked', () => {
      const onClose = vi.fn()
      render(<MobileNavMenu {...defaultProps} onClose={onClose} />)
      
      const closeButton = screen.getByLabelText('关闭导航菜单')
      fireEvent.click(closeButton)
      
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('calls onClose when overlay is clicked', () => {
      const onClose = vi.fn()
      render(<MobileNavMenu {...defaultProps} onClose={onClose} />)
      
      const overlay = screen.getByRole('dialog')
      fireEvent.click(overlay)
      
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('does not call onClose when menu content is clicked', () => {
      const onClose = vi.fn()
      render(<MobileNavMenu {...defaultProps} onClose={onClose} />)
      
      const menuContent = screen.getByRole('navigation')
      fireEvent.click(menuContent)
      
      expect(onClose).not.toHaveBeenCalled()
    })

    it('calls onClose when Escape key is pressed', () => {
      const onClose = vi.fn()
      render(<MobileNavMenu {...defaultProps} onClose={onClose} />)
      
      fireEvent.keyDown(document, { key: 'Escape' })
      
      expect(onClose).toHaveBeenCalledTimes(1)
    })

    it('prevents body scroll when open', () => {
      render(<MobileNavMenu {...defaultProps} isOpen={true} />)
      
      expect(document.body.style.overflow).toBe('hidden')
    })

    it('restores body scroll when closed', () => {
      const { rerender } = render(<MobileNavMenu {...defaultProps} isOpen={true} />)
      expect(document.body.style.overflow).toBe('hidden')
      
      rerender(<MobileNavMenu {...defaultProps} isOpen={false} />)
      expect(document.body.style.overflow).toBe('')
    })
  })

  describe('Navigation functionality', () => {
    const pageLabels = ['首页', '新课标', 'CEFR', 'Lexile', 'ORT', 'RAZ']

    it('renders all navigation menu items', () => {
      render(<MobileNavMenu {...defaultProps} />)
      
      pageLabels.forEach(label => {
        expect(screen.getByText(label)).toBeInTheDocument()
      })
    })

    it('highlights current page', () => {
      render(<MobileNavMenu {...defaultProps} currentPage="cefr" />)
      
      const cefrButton = screen.getByText('CEFR')
      expect(cefrButton).toHaveClass('bg-blue-50', 'text-blue-600', 'font-semibold')
    })

    it('calls onNavigate and onClose when menu item is clicked', () => {
      const onNavigate = vi.fn()
      const onClose = vi.fn()
      render(<MobileNavMenu {...defaultProps} onNavigate={onNavigate} onClose={onClose} />)
      
      const cefrButton = screen.getByText('CEFR')
      fireEvent.click(cefrButton)
      
      expect(onNavigate).toHaveBeenCalledWith('cefr')
      expect(onClose).toHaveBeenCalledTimes(1)
    })
  })

  describe('Touch target accessibility', () => {
    it('ensures all interactive elements meet minimum touch target size', () => {
      render(<MobileNavMenu {...defaultProps} />)
      
      // 关闭按钮应该有最小触摸目标
      const closeButton = screen.getByLabelText('关闭导航菜单')
      expect(closeButton).toHaveClass('min-h-[44px]', 'min-w-[44px]')
      
      // 菜单项应该有最小高度
      const menuItems = screen.getAllByRole('button').filter(button => 
        button !== closeButton
      )
      menuItems.forEach(item => {
        expect(item).toHaveClass('min-h-[44px]')
      })
    })
  })

  describe('Property-based tests', () => {
    // Feature: mobile-ui-enhancement, Property 4: Mobile Navigation Menu Behavior
    // **Validates: Requirements 2.3, 2.5**
    it('Property 4: Mobile Navigation Menu Behavior - for any mobile navigation interaction, clicking the hamburger menu should open the full-screen menu, and selecting any menu item should close the menu and navigate correctly', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...['home', 'china-standard', 'cefr', 'lexile', 'ort', 'raz']),
          fc.constantFrom(...['home', 'china-standard', 'cefr', 'lexile', 'ort', 'raz']),
          (currentPage, targetPage) => {
            const onNavigate = vi.fn()
            const onClose = vi.fn()
            
            // 渲染菜单
            const { unmount } = render(
              <MobileNavMenu 
                isOpen={true}
                currentPage={currentPage}
                onNavigate={onNavigate}
                onClose={onClose}
              />
            )
            
            // 验证菜单已打开（全屏覆盖层存在）
            const overlay = screen.getByRole('dialog')
            expect(overlay).toBeInTheDocument()
            expect(overlay).toHaveClass('fixed', 'inset-0', 'z-[100]')
            
            // 获取目标页面的按钮文本
            const pageLabels: Record<string, string> = {
              'home': '首页',
              'china-standard': '新课标', 
              'cefr': 'CEFR',
              'lexile': 'Lexile',
              'ort': 'ORT',
              'raz': 'RAZ'
            }
            
            // 点击目标页面的菜单项
            const targetButton = screen.getByText(pageLabels[targetPage])
            fireEvent.click(targetButton)
            
            // 验证导航函数被正确调用
            expect(onNavigate).toHaveBeenCalledWith(targetPage)
            
            // 验证菜单关闭函数被调用
            expect(onClose).toHaveBeenCalledTimes(1)
            
            unmount()
            vi.clearAllMocks()
          }
        ),
        { numRuns: 100 }
      )
    })

    it('Property: Menu overlay behavior - for any menu state, clicking overlay should close menu', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...['home', 'china-standard', 'cefr', 'lexile', 'ort', 'raz']),
          (currentPage) => {
            const onClose = vi.fn()
            
            const { unmount } = render(
              <MobileNavMenu 
                isOpen={true}
                currentPage={currentPage}
                onNavigate={vi.fn()}
                onClose={onClose}
              />
            )
            
            // 点击覆盖层
            const overlay = screen.getByRole('dialog')
            fireEvent.click(overlay)
            
            // 验证关闭函数被调用
            expect(onClose).toHaveBeenCalledTimes(1)
            
            unmount()
            vi.clearAllMocks()
          }
        ),
        { numRuns: 100 }
      )
    })

    it('Property: Keyboard navigation - for any menu state, pressing Escape should close menu', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...['home', 'china-standard', 'cefr', 'lexile', 'ort', 'raz']),
          (currentPage) => {
            const onClose = vi.fn()
            
            const { unmount } = render(
              <MobileNavMenu 
                isOpen={true}
                currentPage={currentPage}
                onNavigate={vi.fn()}
                onClose={onClose}
              />
            )
            
            // 按下 Escape 键
            fireEvent.keyDown(document, { key: 'Escape' })
            
            // 验证关闭函数被调用
            expect(onClose).toHaveBeenCalledTimes(1)
            
            unmount()
            vi.clearAllMocks()
          }
        ),
        { numRuns: 100 }
      )
    })

    it('Property: Body scroll prevention - for any open menu state, body overflow should be hidden', () => {
      fc.assert(
        fc.property(
          fc.constantFrom(...['home', 'china-standard', 'cefr', 'lexile', 'ort', 'raz']),
          fc.boolean(),
          (currentPage, isOpen) => {
            const { unmount } = render(
              <MobileNavMenu 
                isOpen={isOpen}
                currentPage={currentPage}
                onNavigate={vi.fn()}
                onClose={vi.fn()}
              />
            )
            
            if (isOpen) {
              expect(document.body.style.overflow).toBe('hidden')
            } else {
              expect(document.body.style.overflow).toBe('')
            }
            
            unmount()
            // 清理样式
            document.body.style.overflow = ''
          }
        ),
        { numRuns: 100 }
      )
    })
  })
})