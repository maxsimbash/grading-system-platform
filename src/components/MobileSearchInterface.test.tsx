import { render, screen } from '@testing-library/react'
import { describe, it, expect } from 'vitest'
import fc from 'fast-check'
import { MobileSearchInterface } from './MobileSearchInterface'

describe('MobileSearchInterface Property Tests', () => {
  // Feature: mobile-ui-enhancement, Property 5: Touch Target Accessibility
  // **Validates: Requirements 7.1**
  it('should ensure all interactive elements meet minimum touch target size of 44x44px', () => {
    fc.assert(
      fc.property(
        fc.record({
          lexileInput: fc.string({ minLength: 0, maxLength: 10 }),
          gradeInput: fc.string({ minLength: 0, maxLength: 20 }),
          searchResult: fc.constantFrom(null, {
            oxfordLevel: 'Level 5',
            lexileRange: '350L-430L',
            lexileMin: 350,
            lexileMax: 430,
            cefr: 'A1+',
            chinaStandard: '一级+ (强化)',
            cambridgeExam: 'Movers',
            raz: 'H',
            heinemann: 'G1 (Level E-F)',
            recommendedAge: '5.5-6岁',
            recommendedGrade: '二年级/三年级'
          })
        }),
        (props) => {
          const mockProps = {
            lexileInput: props.lexileInput,
            gradeInput: props.gradeInput,
            onLexileInputChange: () => {},
            onGradeInputChange: () => {},
            onLexileSearch: () => {},
            onGradeSearch: () => {},
            onAssessmentOpen: () => {},
            searchResult: props.searchResult
          }

          const { container } = render(<MobileSearchInterface {...mockProps} />)
          
          // Find all interactive elements (buttons, inputs)
          const buttons = container.querySelectorAll('button')
          const inputs = container.querySelectorAll('input')
          
          // Check buttons have proper CSS classes and style attributes for touch targets
          buttons.forEach((button) => {
            // Check for min-height and min-width style attributes
            const style = button.getAttribute('style') || ''
            const hasMinHeight = style.includes('min-height: 44px') || button.classList.contains('min-h-[44px]')
            const hasMinWidth = style.includes('min-width: 44px') || button.classList.contains('min-w-[44px]')
            
            expect(hasMinHeight).toBe(true)
            expect(hasMinWidth).toBe(true)
          })
          
          // Check inputs have proper CSS classes and style attributes for touch targets
          inputs.forEach((input) => {
            // Check for min-height style attribute or CSS class
            const style = input.getAttribute('style') || ''
            const hasMinHeight = style.includes('min-height: 48px') || input.classList.contains('min-h-[48px]')
            
            expect(hasMinHeight).toBe(true)
          })
        }
      ),
      { numRuns: 100 }
    )
  })

  // Feature: mobile-ui-enhancement, Property 6: Mobile Input Validation
  // **Validates: Requirements 3.3**
  it('should provide real-time input validation and appropriate feedback for all user inputs', () => {
    fc.assert(
      fc.property(
        fc.record({
          lexileInput: fc.oneof(
            fc.string({ minLength: 0, maxLength: 0 }), // empty
            fc.string({ minLength: 1, maxLength: 5 }).filter(s => !/^\d+$/.test(s)), // non-numeric
            fc.integer({ min: -1000, max: 2000 }).map(String), // numeric (including negative)
          ),
          gradeInput: fc.oneof(
            fc.string({ minLength: 0, maxLength: 0 }), // empty
            fc.constantFrom('一年级', '二年级', '三年级', '四年级', '五年级', '六年级'), // valid grades
            fc.string({ minLength: 1, maxLength: 20 }), // various text inputs
          )
        }),
        (inputs) => {
          const mockProps = {
            lexileInput: inputs.lexileInput,
            gradeInput: inputs.gradeInput,
            onLexileInputChange: () => {},
            onGradeInputChange: () => {},
            onLexileSearch: () => {},
            onGradeSearch: () => {},
            onAssessmentOpen: () => {},
            searchResult: null
          }

          const { container } = render(<MobileSearchInterface {...mockProps} />)
          
          // Check for validation feedback elements using more specific selectors
          const lexileInputs = screen.getAllByPlaceholderText(/例如.*300/i)
          const gradeInputs = screen.getAllByPlaceholderText(/例如.*三年级/i)
          
          // There should be at least one of each input type
          expect(lexileInputs.length).toBeGreaterThan(0)
          expect(gradeInputs.length).toBeGreaterThan(0)
          
          // Check that inputs exist and have proper attributes
          const lexileInput = lexileInputs[0]
          const gradeInput = gradeInputs[0]
          
          expect(lexileInput).toHaveAttribute('placeholder')
          expect(gradeInput).toHaveAttribute('placeholder')
          expect(lexileInput).toHaveAttribute('type', 'number')
          expect(gradeInput).toHaveAttribute('type', 'text')
          
          // Check that the component has validation logic in place
          // Look for validation-related CSS classes or elements
          const hasValidationClasses = container.querySelector('[class*="ring-red"], [class*="text-red"], [class*="text-green"]')
          const hasValidationIcons = container.querySelector('svg[class*="lucide-circle-alert"], svg[class*="lucide-check-circle"]')
          const hasValidationMessages = container.querySelector('p[class*="text-red"], p[class*="text-green"]')
          
          // The component should have validation UI elements when there's input to validate
          // For empty inputs, validation elements may not be present (which is correct)
          if (inputs.lexileInput.trim() || inputs.gradeInput.trim()) {
            const hasValidationFeatures = hasValidationClasses || hasValidationIcons || hasValidationMessages
            expect(hasValidationFeatures).toBeTruthy()
          } else {
            // For empty inputs, just verify the component renders properly
            expect(container).toBeInTheDocument()
          }
          
          // Verify that the component renders without crashing for any input
          expect(container).toBeInTheDocument()
        }
      ),
      { numRuns: 100 }
    )
  })
})