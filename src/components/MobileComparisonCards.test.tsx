import { render, screen, cleanup } from '@testing-library/react'
import { describe, it, expect, afterEach } from 'vitest'
import fc from 'fast-check'
import { MobileComparisonCards, LevelCard } from './MobileComparisonCards'
import { gradingLevels } from '../data/gradingData'
import type { GradingLevel } from '../data/gradingData'

// Property-based test for mobile card data completeness
describe('MobileComparisonCards - Property-Based Tests', () => {
  // Clean up after each test to prevent DOM accumulation
  afterEach(() => {
    cleanup()
  })

  // Feature: mobile-ui-enhancement, Property 7: Mobile Card Data Completeness
  // **Validates: Requirements 4.2**
  it('Property 7: Mobile Card Data Completeness - For any grading level data, when displayed as mobile cards, all essential information should be visible and complete', () => {
    // Use a single level at a time to avoid DOM conflicts
    const realLevelArb = fc.constantFrom(...gradingLevels)

    fc.assert(
      fc.property(realLevelArb, (level: GradingLevel) => {
        const mockOnFilterChange = () => {}
        
        render(
          <MobileComparisonCards 
            levels={[level]} // Test with single level to avoid conflicts
            filterCEFR=""
            onFilterChange={mockOnFilterChange}
          />
        )

        // Verify all essential information is present for this level
        expect(screen.getByText(level.oxfordLevel)).toBeInTheDocument()
        expect(screen.getByText(level.lexileRange)).toBeInTheDocument()
        expect(screen.getByText(level.cefr)).toBeInTheDocument()
        expect(screen.getByText(level.chinaStandard)).toBeInTheDocument()
        expect(screen.getByText(level.recommendedGrade)).toBeInTheDocument()

        // Check that RAZ is displayed (handle empty values)
        if (level.raz && level.raz !== '-' && level.raz.trim().length > 0) {
          expect(screen.getByText(level.raz)).toBeInTheDocument()
        }

        // Verify that the CEFR filter dropdown is present
        expect(screen.getByRole('combobox')).toBeInTheDocument()

        // Verify that card has proper styling
        const card = screen.getByTestId(`level-card-${level.oxfordLevel.replace(/\s+/g, '-').toLowerCase()}`)
        expect(card).toHaveClass('rounded-2xl') // 16px border radius
        expect(card).toHaveClass('shadow-sm') // shadow effect

        // Clean up for next iteration
        cleanup()
      }),
      { numRuns: 20 } // Reduced runs for stability
    )
  })

  // Additional property test for individual LevelCard component using real data
  it('Property 7a: Individual Level Card Completeness - For any single grading level, the LevelCard component should display all required fields', () => {
    // Use actual grading level data to ensure realistic testing
    const realLevelArb = fc.constantFrom(...gradingLevels)

    fc.assert(
      fc.property(realLevelArb, (level: GradingLevel) => {
        render(
          <LevelCard level={level} />
        )

        // Verify all essential fields are present in the card
        expect(screen.getByText(level.oxfordLevel)).toBeInTheDocument()
        expect(screen.getByText(level.lexileRange)).toBeInTheDocument()
        expect(screen.getByText(level.cefr)).toBeInTheDocument()
        expect(screen.getByText(level.chinaStandard)).toBeInTheDocument()
        expect(screen.getByText(level.recommendedGrade)).toBeInTheDocument()

        // Handle empty values for optional fields
        if (level.raz && level.raz !== '-' && level.raz.trim().length > 0) {
          expect(screen.getByText(level.raz)).toBeInTheDocument()
        }

        // Verify card has proper styling
        const card = screen.getByTestId(`level-card-${level.oxfordLevel.replace(/\s+/g, '-').toLowerCase()}`)
        expect(card).toHaveClass('rounded-2xl') // 16px border radius
        expect(card).toHaveClass('shadow-sm') // shadow effect
        expect(card).toHaveClass('bg-white') // white background

        // Clean up for next iteration
        cleanup()
      }),
      { numRuns: 20 } // Test with real grading levels
    )
  })
})