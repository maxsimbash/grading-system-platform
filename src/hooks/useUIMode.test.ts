import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { renderHook, act } from '@testing-library/react'
import fc from 'fast-check'
import { useUIMode, type UIMode } from './useUIMode'

// Mock localStorage
const localStorageMock = {
  getItem: vi.fn(),
  setItem: vi.fn(),
  removeItem: vi.fn(),
  clear: vi.fn(),
}

// Mock window.innerWidth
const mockInnerWidth = (width: number) => {
  Object.defineProperty(window, 'innerWidth', {
    writable: true,
    configurable: true,
    value: width,
  })
}

describe('useUIMode Hook', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    Object.defineProperty(window, 'localStorage', {
      value: localStorageMock,
      writable: true,
    })
    
    // Default to desktop width
    mockInnerWidth(1024)
    
    // Mock addEventListener and removeEventListener
    vi.spyOn(window, 'addEventListener')
    vi.spyOn(window, 'removeEventListener')
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('Property-Based Tests', () => {
    it('Property 2: UI Mode Persistence - For any UI mode selection (desktop/mobile), the system should save the choice to localStorage and restore it on page refresh', () => {
      // Feature: mobile-ui-enhancement, Property 2: UI Mode Persistence
      // **Validates: Requirements 1.3, 1.4**
      
      fc.assert(
        fc.property(
          fc.constantFrom('desktop' as UIMode, 'mobile' as UIMode),
          fc.integer({ min: 320, max: 2560 }), // Screen width range
          (selectedMode, screenWidth) => {
            // Setup: Mock screen width and clear localStorage
            mockInnerWidth(screenWidth)
            localStorageMock.getItem.mockReturnValue(null)
            localStorageMock.setItem.mockClear()

            // Test: Render hook and set mode
            const { result } = renderHook(() => useUIMode())
            
            act(() => {
              result.current.setMode(selectedMode)
            })

            // Verify: Mode is set correctly
            expect(result.current.currentMode).toBe(selectedMode)
            expect(result.current.userPreference).toBe(selectedMode)

            // Verify: localStorage.setItem was called with correct values
            expect(localStorageMock.setItem).toHaveBeenCalledWith('ui-mode-preference', selectedMode)

            // Test persistence: Simulate page refresh by creating new hook instance
            // Mock localStorage to return the saved mode
            localStorageMock.getItem.mockReturnValue(selectedMode)
            const { result: newResult } = renderHook(() => useUIMode())

            // Verify: Mode is restored from localStorage
            expect(newResult.current.currentMode).toBe(selectedMode)
            expect(newResult.current.userPreference).toBe(selectedMode)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('Property 2 Extended: UI Mode Toggle Persistence - For any initial mode, toggling should persist the new mode', () => {
      // Feature: mobile-ui-enhancement, Property 2: UI Mode Persistence
      // **Validates: Requirements 1.3, 1.4**
      
      fc.assert(
        fc.property(
          fc.constantFrom('desktop' as UIMode, 'mobile' as UIMode),
          fc.integer({ min: 320, max: 2560 }),
          (initialMode, screenWidth) => {
            // Setup
            mockInnerWidth(screenWidth)
            localStorageMock.getItem.mockReturnValue(initialMode)
            localStorageMock.setItem.mockClear()

            const { result } = renderHook(() => useUIMode())
            
            // Verify initial state
            expect(result.current.currentMode).toBe(initialMode)

            // Test: Toggle mode
            act(() => {
              result.current.toggleMode()
            })

            const expectedNewMode: UIMode = initialMode === 'desktop' ? 'mobile' : 'desktop'
            
            // Verify: Mode is toggled correctly
            expect(result.current.currentMode).toBe(expectedNewMode)
            expect(result.current.userPreference).toBe(expectedNewMode)

            // Verify: New mode is saved to localStorage
            expect(localStorageMock.setItem).toHaveBeenCalledWith('ui-mode-preference', expectedNewMode)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('Property 2 Auto Mode: Auto mode should respond to device type changes and persist auto preference', () => {
      // Feature: mobile-ui-enhancement, Property 2: UI Mode Persistence
      // **Validates: Requirements 1.3, 1.4**
      
      fc.assert(
        fc.property(
          fc.integer({ min: 320, max: 2560 }),
          (screenWidth) => {
            // Setup
            mockInnerWidth(screenWidth)
            localStorageMock.getItem.mockReturnValue('auto')
            localStorageMock.setItem.mockClear()

            const { result } = renderHook(() => useUIMode())
            
            // Verify: Auto mode selects correct UI mode based on screen width
            const expectedMode: UIMode = screenWidth < 768 ? 'mobile' : 'desktop'
            expect(result.current.currentMode).toBe(expectedMode)
            expect(result.current.userPreference).toBe('auto')

            // Test: Set auto mode explicitly
            act(() => {
              result.current.setAutoMode()
            })

            // Verify: Auto preference is saved
            expect(localStorageMock.setItem).toHaveBeenCalledWith('ui-mode-preference', 'auto')
            expect(result.current.userPreference).toBe('auto')
            expect(result.current.currentMode).toBe(expectedMode)
          }
        ),
        { numRuns: 100 }
      )
    })

    it('Property 2 Error Handling: localStorage failures should not break the hook', () => {
      // Feature: mobile-ui-enhancement, Property 2: UI Mode Persistence
      // **Validates: Requirements 1.3, 1.4**
      
      fc.assert(
        fc.property(
          fc.constantFrom('desktop' as UIMode, 'mobile' as UIMode),
          fc.integer({ min: 320, max: 2560 }),
          (selectedMode, screenWidth) => {
            // Setup: Mock localStorage to throw errors
            mockInnerWidth(screenWidth)
            localStorageMock.getItem.mockImplementation(() => {
              throw new Error('localStorage not available')
            })
            localStorageMock.setItem.mockImplementation(() => {
              throw new Error('localStorage not available')
            })

            // Test: Hook should still work despite localStorage errors
            const { result } = renderHook(() => useUIMode())
            
            // Verify: Hook initializes with default values
            expect(result.current.userPreference).toBe('auto')
            
            // Test: Mode changes should still work in memory
            act(() => {
              result.current.setMode(selectedMode)
            })

            // Verify: Mode is set correctly in memory even if persistence fails
            expect(result.current.currentMode).toBe(selectedMode)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Unit Tests', () => {
    it('should initialize with auto mode and correct device detection', () => {
      mockInnerWidth(320) // Mobile width
      localStorageMock.getItem.mockReturnValue(null)

      const { result } = renderHook(() => useUIMode())

      expect(result.current.currentMode).toBe('mobile')
      expect(result.current.deviceType).toBe('mobile')
      expect(result.current.userPreference).toBe('auto')
      expect(result.current.screenWidth).toBe(320)
    })

    it('should handle window resize events', () => {
      mockInnerWidth(1024)
      localStorageMock.getItem.mockReturnValue('auto')

      const { result } = renderHook(() => useUIMode())
      
      expect(result.current.deviceType).toBe('desktop')
      expect(result.current.currentMode).toBe('desktop')

      // Simulate window resize to mobile
      act(() => {
        mockInnerWidth(320)
        window.dispatchEvent(new Event('resize'))
      })

      expect(result.current.deviceType).toBe('mobile')
      expect(result.current.currentMode).toBe('mobile')
    })

    it('should provide correct boolean helpers', () => {
      localStorageMock.getItem.mockReturnValue('desktop')
      
      const { result } = renderHook(() => useUIMode())

      expect(result.current.isDesktop).toBe(true)
      expect(result.current.isMobile).toBe(false)

      act(() => {
        result.current.setMode('mobile')
      })

      expect(result.current.isDesktop).toBe(false)
      expect(result.current.isMobile).toBe(true)
    })
  })
})