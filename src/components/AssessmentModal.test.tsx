import { render, screen, fireEvent } from '@testing-library/react'
import { describe, it, expect, vi } from 'vitest'
import fc from 'fast-check'
import { AssessmentModal } from './AssessmentModal'

describe('AssessmentModal', () => {
  // Feature: mobile-ui-enhancement, Property 10: Assessment Flow Completion
  // **Validates: Requirements 6.5**
  describe('Property 10: Assessment Flow Completion', () => {
    it('should complete assessment flow and auto-populate search form with calculated lexile value', () => {
      fc.assert(
        fc.property(
          // Generate random answer patterns (array of option indices 0-3 for 5 questions)
          fc.array(fc.integer({ min: 0, max: 3 }), { minLength: 5, maxLength: 5 }),
          (answerPattern) => {
            const mockOnComplete = vi.fn()
            const mockOnClose = vi.fn()

            render(
              <AssessmentModal
                isOpen={true}
                onClose={mockOnClose}
                onComplete={mockOnComplete}
              />
            )

            // Simulate answering all questions with the generated pattern
            answerPattern.forEach((optionIndex) => {
              // Find all option buttons for current question
              const optionButtons = screen.getAllByRole('button').filter(button => 
                button.textContent && !button.textContent.includes('×')
              )
              
              // Click the option at the generated index
              if (optionButtons[optionIndex]) {
                fireEvent.click(optionButtons[optionIndex])
              }
            })

            // Verify that onComplete was called with a valid lexile value
            expect(mockOnComplete).toHaveBeenCalledTimes(1)
            const [lexileValue] = mockOnComplete.mock.calls[0]
            
            // Property: For any completed assessment, the system should provide a valid lexile value (0-1300)
            expect(typeof lexileValue).toBe('number')
            expect(lexileValue).toBeGreaterThanOrEqual(0)
            expect(lexileValue).toBeLessThanOrEqual(1300)
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  // Additional unit tests for specific behaviors
  describe('Unit Tests', () => {
    it('should display progress correctly', () => {
      const mockOnComplete = vi.fn()
      const mockOnClose = vi.fn()

      render(
        <AssessmentModal
          isOpen={true}
          onClose={mockOnClose}
          onComplete={mockOnComplete}
        />
      )

      // Check initial progress display
      expect(screen.getByText('第 1 / 5 题')).toBeInTheDocument()
    })

    it('should close when close button is clicked', () => {
      const mockOnComplete = vi.fn()
      const mockOnClose = vi.fn()

      render(
        <AssessmentModal
          isOpen={true}
          onClose={mockOnClose}
          onComplete={mockOnComplete}
        />
      )

      const closeButton = screen.getByRole('button', { name: '关闭' })
      fireEvent.click(closeButton)

      expect(mockOnClose).toHaveBeenCalledTimes(1)
    })

    it('should not render when isOpen is false', () => {
      const mockOnComplete = vi.fn()
      const mockOnClose = vi.fn()

      const { container } = render(
        <AssessmentModal
          isOpen={false}
          onClose={mockOnClose}
          onComplete={mockOnComplete}
        />
      )

      expect(container.firstChild).toBeNull()
    })
  })
})