import { describe, it, expect, vi, afterEach } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import fc from 'fast-check'
import { UIModeToggle } from './UIModeToggle'
import type { UIMode } from '../hooks/useUIMode'

describe('UIModeToggle Component', () => {
  afterEach(() => {
    cleanup()
  })

  describe('Property-Based Tests', () => {
    it('Property 1: UI Mode Toggle Functionality - For any initial UI mode state, clicking the toggle button should switch to the opposite mode and update the interface accordingly', () => {
      // Feature: mobile-ui-enhancement, Property 1: UI Mode Toggle Functionality
      // **Validates: Requirements 1.2**
      
      fc.assert(
        fc.property(
          fc.constantFrom('desktop' as UIMode, 'mobile' as UIMode),
          (initialMode) => {
            const mockOnModeChange = vi.fn()
            
            const { unmount } = render(
              <UIModeToggle 
                currentMode={initialMode}
                onModeChange={mockOnModeChange}
              />
            )

            const toggleButton = screen.getByRole('button')
            
            // Verify initial state - correct icon should be visible
            const expectedInitialLabel = `切换到${initialMode === 'desktop' ? '手机' : '桌面'}版`
            expect(toggleButton).toHaveAttribute('aria-label', expectedInitialLabel)
            
            // Test: Click the toggle button
            fireEvent.click(toggleButton)
            
            // Verify: onModeChange was called with opposite mode
            const expectedNewMode: UIMode = initialMode === 'desktop' ? 'mobile' : 'desktop'
            expect(mockOnModeChange).toHaveBeenCalledWith(expectedNewMode)
            expect(mockOnModeChange).toHaveBeenCalledTimes(1)
            
            // Clean up for next iteration
            unmount()
          }
        ),
        { numRuns: 100 }
      )
    })

    it('Property 1 Extended: Keyboard Navigation - For any initial mode, pressing Enter or Space should toggle the mode', () => {
      // Feature: mobile-ui-enhancement, Property 1: UI Mode Toggle Functionality
      // **Validates: Requirements 1.2**
      
      fc.assert(
        fc.property(
          fc.constantFrom('desktop' as UIMode, 'mobile' as UIMode),
          fc.constantFrom('Enter', ' '), // Test both Enter and Space keys
          (initialMode, keyToPress) => {
            const mockOnModeChange = vi.fn()
            
            const { unmount } = render(
              <UIModeToggle 
                currentMode={initialMode}
                onModeChange={mockOnModeChange}
              />
            )

            const toggleButton = screen.getByRole('button')
            
            // Test: Press keyboard key
            fireEvent.keyDown(toggleButton, { key: keyToPress })
            
            // Verify: onModeChange was called with opposite mode
            const expectedNewMode: UIMode = initialMode === 'desktop' ? 'mobile' : 'desktop'
            expect(mockOnModeChange).toHaveBeenCalledWith(expectedNewMode)
            expect(mockOnModeChange).toHaveBeenCalledTimes(1)
            
            // Clean up for next iteration
            unmount()
          }
        ),
        { numRuns: 100 }
      )
    })

    it('Property 1 Accessibility: For any mode, the button should have proper accessibility attributes', () => {
      // Feature: mobile-ui-enhancement, Property 1: UI Mode Toggle Functionality
      // **Validates: Requirements 1.2**
      
      fc.assert(
        fc.property(
          fc.constantFrom('desktop' as UIMode, 'mobile' as UIMode),
          (currentMode) => {
            const mockOnModeChange = vi.fn()
            
            const { unmount } = render(
              <UIModeToggle 
                currentMode={currentMode}
                onModeChange={mockOnModeChange}
              />
            )

            const toggleButton = screen.getByRole('button')
            
            // Verify: Button has proper accessibility attributes
            expect(toggleButton).toHaveAttribute('aria-label')
            expect(toggleButton).toHaveAttribute('title')
            
            // Verify: aria-label describes the action (what will happen on click)
            const ariaLabel = toggleButton.getAttribute('aria-label')
            const expectedAction = currentMode === 'desktop' ? '手机' : '桌面'
            expect(ariaLabel).toContain(expectedAction)
            
            // Verify: title describes current state
            const title = toggleButton.getAttribute('title')
            const expectedCurrentState = currentMode === 'desktop' ? '桌面版' : '手机版'
            expect(title).toContain(expectedCurrentState)
            
            // Clean up for next iteration
            unmount()
          }
        ),
        { numRuns: 100 }
      )
    })

    it('Property 1 Visual State: For any mode, the correct icon should be prominently displayed', () => {
      // Feature: mobile-ui-enhancement, Property 1: UI Mode Toggle Functionality
      // **Validates: Requirements 1.2**
      
      fc.assert(
        fc.property(
          fc.constantFrom('desktop' as UIMode, 'mobile' as UIMode),
          (currentMode) => {
            const mockOnModeChange = vi.fn()
            
            const { container, unmount } = render(
              <UIModeToggle 
                currentMode={currentMode}
                onModeChange={mockOnModeChange}
              />
            )

            // Find the icon elements by their class names instead of data attributes
            const monitorIcon = container.querySelector('.lucide-monitor')
            const smartphoneIcon = container.querySelector('.lucide-smartphone')
            
            // Verify icons exist
            expect(monitorIcon).toBeTruthy()
            expect(smartphoneIcon).toBeTruthy()
            
            if (currentMode === 'desktop') {
              // Desktop mode: Monitor icon should be visible (opacity-100), smartphone hidden (opacity-0)
              expect(monitorIcon).toHaveClass('opacity-100')
              expect(smartphoneIcon).toHaveClass('opacity-0')
            } else {
              // Mobile mode: Smartphone icon should be visible (opacity-100), monitor hidden (opacity-0)
              expect(smartphoneIcon).toHaveClass('opacity-100')
              expect(monitorIcon).toHaveClass('opacity-0')
            }
            
            // Clean up for next iteration
            unmount()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Unit Tests', () => {
    it('should render with desktop mode initially', () => {
      const mockOnModeChange = vi.fn()
      
      render(
        <UIModeToggle 
          currentMode="desktop"
          onModeChange={mockOnModeChange}
        />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', '切换到手机版')
      expect(button).toHaveAttribute('title', '当前: 桌面版')
    })

    it('should render with mobile mode initially', () => {
      const mockOnModeChange = vi.fn()
      
      render(
        <UIModeToggle 
          currentMode="mobile"
          onModeChange={mockOnModeChange}
        />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveAttribute('aria-label', '切换到桌面版')
      expect(button).toHaveAttribute('title', '当前: 手机版')
    })

    it('should ignore other keyboard keys', () => {
      const mockOnModeChange = vi.fn()
      
      render(
        <UIModeToggle 
          currentMode="desktop"
          onModeChange={mockOnModeChange}
        />
      )

      const button = screen.getByRole('button')
      
      // Test keys that should be ignored
      fireEvent.keyDown(button, { key: 'Tab' })
      fireEvent.keyDown(button, { key: 'Escape' })
      fireEvent.keyDown(button, { key: 'a' })
      
      expect(mockOnModeChange).not.toHaveBeenCalled()
    })

    it('should apply custom className', () => {
      const mockOnModeChange = vi.fn()
      const customClass = 'custom-toggle-class'
      
      render(
        <UIModeToggle 
          currentMode="desktop"
          onModeChange={mockOnModeChange}
          className={customClass}
        />
      )

      const button = screen.getByRole('button')
      expect(button).toHaveClass(customClass)
    })
  })
})