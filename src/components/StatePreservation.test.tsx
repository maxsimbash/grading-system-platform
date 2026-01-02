import React from 'react'
import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest'
import { render, screen, fireEvent, cleanup } from '@testing-library/react'
import fc from 'fast-check'
import { UIModeToggle } from './UIModeToggle'
import { useUIMode, type UIMode } from '../hooks/useUIMode'

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

// Test component that uses both UIModeToggle and maintains some state
const TestAppWithState = ({ initialData }: { initialData: string }) => {
  const { currentMode, setMode } = useUIMode()
  const [userInput, setUserInput] = React.useState(initialData)
  const [searchResult, setSearchResult] = React.useState<string | null>(null)

  const handleSearch = () => {
    setSearchResult(`Result for: ${userInput}`)
  }

  return (
    <div>
      <UIModeToggle 
        currentMode={currentMode}
        onModeChange={setMode}
      />
      <input
        data-testid="user-input"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        placeholder="Enter search term"
      />
      <button data-testid="search-button" onClick={handleSearch}>
        Search
      </button>
      {searchResult && (
        <div data-testid="search-result">{searchResult}</div>
      )}
      <div data-testid="current-mode">{currentMode}</div>
    </div>
  )
}

describe('State Preservation During Mode Switch', () => {
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
    cleanup()
    vi.restoreAllMocks()
  })

  describe('Property-Based Tests', () => {
    it('Property 3: State Preservation During Mode Switch - For any user input data (search terms, form values), switching between desktop and mobile modes should preserve all current state', () => {
      // Feature: mobile-ui-enhancement, Property 3: State Preservation During Mode Switch
      // **Validates: Requirements 1.5**
      
      fc.assert(
        fc.property(
          fc.string({ minLength: 1, maxLength: 50 }), // User input data
          fc.constantFrom('desktop' as UIMode, 'mobile' as UIMode), // Initial mode
          fc.integer({ min: 320, max: 2560 }), // Screen width
          (initialInput, initialMode, screenWidth) => {
            // Setup
            mockInnerWidth(screenWidth)
            localStorageMock.getItem.mockReturnValue(initialMode)
            localStorageMock.setItem.mockClear()

            const { unmount } = render(<TestAppWithState initialData={initialInput} />)
            
            // Verify initial state
            const inputElement = screen.getByTestId('user-input') as HTMLInputElement
            const modeDisplay = screen.getByTestId('current-mode')
            
            expect(inputElement.value).toBe(initialInput)
            expect(modeDisplay.textContent).toBe(initialMode)

            // User modifies input
            const modifiedInput = `${initialInput}_modified`
            fireEvent.change(inputElement, { target: { value: modifiedInput } })
            expect(inputElement.value).toBe(modifiedInput)

            // User performs search to create additional state
            fireEvent.click(screen.getByTestId('search-button'))
            const searchResult = screen.getByTestId('search-result')
            expect(searchResult.textContent).toBe(`Result for: ${modifiedInput}`)

            // Test: Switch UI mode
            const toggleButton = screen.getByRole('button', { name: /切换到/ })
            fireEvent.click(toggleButton)

            // Verify: All user state is preserved after mode switch
            const expectedNewMode: UIMode = initialMode === 'desktop' ? 'mobile' : 'desktop'
            expect(screen.getByTestId('current-mode').textContent).toBe(expectedNewMode)
            
            // Critical: User input should be preserved
            expect((screen.getByTestId('user-input') as HTMLInputElement).value).toBe(modifiedInput)
            
            // Critical: Search result should be preserved
            expect(screen.getByTestId('search-result').textContent).toBe(`Result for: ${modifiedInput}`)

            // Test: Switch back to original mode
            fireEvent.click(toggleButton)
            
            // Verify: State is still preserved after switching back
            expect(screen.getByTestId('current-mode').textContent).toBe(initialMode)
            expect((screen.getByTestId('user-input') as HTMLInputElement).value).toBe(modifiedInput)
            expect(screen.getByTestId('search-result').textContent).toBe(`Result for: ${modifiedInput}`)
            
            // Clean up for next iteration
            unmount()
          }
        ),
        { numRuns: 100 }
      )
    })

    it('Property 3 Extended: Complex State Preservation - For any combination of form states, switching modes should preserve all form data', () => {
      // Feature: mobile-ui-enhancement, Property 3: State Preservation During Mode Switch
      // **Validates: Requirements 1.5**
      
      fc.assert(
        fc.property(
          fc.record({
            searchTerm: fc.string({ minLength: 1, maxLength: 30 }),
            hasResult: fc.boolean(),
            mode: fc.constantFrom('desktop' as UIMode, 'mobile' as UIMode)
          }),
          (testData) => {
            // Setup
            localStorageMock.getItem.mockReturnValue(testData.mode)
            localStorageMock.setItem.mockClear()

            const { unmount } = render(<TestAppWithState initialData={testData.searchTerm} />)
            
            const inputElement = screen.getByTestId('user-input') as HTMLInputElement
            
            // Setup complex state
            fireEvent.change(inputElement, { target: { value: testData.searchTerm } })
            
            if (testData.hasResult) {
              fireEvent.click(screen.getByTestId('search-button'))
            }

            // Capture state before mode switch
            const inputValueBefore = inputElement.value
            const hasResultBefore = screen.queryByTestId('search-result') !== null
            const resultTextBefore = hasResultBefore 
              ? screen.getByTestId('search-result').textContent 
              : null

            // Test: Switch mode multiple times
            const toggleButton = screen.getByRole('button', { name: /切换到/ })
            
            // Switch to opposite mode
            fireEvent.click(toggleButton)
            
            // Switch back to original mode
            fireEvent.click(toggleButton)

            // Verify: All state is preserved after multiple switches
            expect((screen.getByTestId('user-input') as HTMLInputElement).value).toBe(inputValueBefore)
            
            const hasResultAfter = screen.queryByTestId('search-result') !== null
            expect(hasResultAfter).toBe(hasResultBefore)
            
            if (hasResultBefore && hasResultAfter) {
              expect(screen.getByTestId('search-result').textContent).toBe(resultTextBefore)
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
    it('should preserve input value when switching from desktop to mobile', () => {
      localStorageMock.getItem.mockReturnValue('desktop')
      
      render(<TestAppWithState initialData="test input" />)
      
      const inputElement = screen.getByTestId('user-input') as HTMLInputElement
      fireEvent.change(inputElement, { target: { value: 'modified input' } })
      
      const toggleButton = screen.getByRole('button', { name: /切换到/ })
      fireEvent.click(toggleButton)
      
      expect(inputElement.value).toBe('modified input')
      expect(screen.getByTestId('current-mode').textContent).toBe('mobile')
    })

    it('should preserve search results when switching modes', () => {
      localStorageMock.getItem.mockReturnValue('mobile')
      
      render(<TestAppWithState initialData="search term" />)
      
      // Perform search
      fireEvent.click(screen.getByTestId('search-button'))
      expect(screen.getByTestId('search-result').textContent).toBe('Result for: search term')
      
      // Switch mode
      const toggleButton = screen.getByRole('button', { name: /切换到/ })
      fireEvent.click(toggleButton)
      
      // Verify result is preserved
      expect(screen.getByTestId('search-result').textContent).toBe('Result for: search term')
      expect(screen.getByTestId('current-mode').textContent).toBe('desktop')
    })
  })
})