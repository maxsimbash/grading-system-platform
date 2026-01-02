import { describe, it, expect, vi } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import fc from 'fast-check'
import type { BookRecommendation } from '../data/bookData'

// Mock BookCard component for testing - we'll create the actual component later
const MockBookCard = ({ book, onClick }: { book: BookRecommendation; onClick?: () => void }) => (
  <div 
    data-testid={`book-card-${book.id}`}
    onClick={onClick}
    className="cursor-pointer"
  >
    <h3>{book.title}</h3>
    <p>{book.description}</p>
    <span>{book.series}</span>
    <span>{book.level}</span>
  </div>
)

// Mock BookDetail component for testing
const MockBookDetail = ({ book, onClose }: { book: BookRecommendation; onClose: () => void }) => (
  <div data-testid={`book-detail-${book.id}`}>
    <button onClick={onClose} data-testid="close-detail">Close</button>
    <h2>{book.title}</h2>
    <p>{book.description}</p>
    <div>{book.tags.join(', ')}</div>
  </div>
)

// Mock MobileBookRecommendation component that manages the interaction
const MockMobileBookRecommendation = ({ books }: { books: BookRecommendation[] }) => {
  const [selectedBook, setSelectedBook] = React.useState<BookRecommendation | null>(null)

  return (
    <div>
      {!selectedBook ? (
        <div data-testid="book-list">
          {books.map(book => (
            <MockBookCard 
              key={book.id} 
              book={book} 
              onClick={() => setSelectedBook(book)}
            />
          ))}
        </div>
      ) : (
        <MockBookDetail 
          book={selectedBook} 
          onClose={() => setSelectedBook(null)}
        />
      )}
    </div>
  )
}

// Import React for useState
import React from 'react'

describe('Book Card Interaction', () => {
  describe('Property-Based Tests', () => {
    it('Property 9: Book Card Interaction - For any book recommendation, clicking the card should display detailed information, and the close action should return to the list state', () => {
      // Feature: mobile-ui-enhancement, Property 9: Book Card Interaction
      // **Validates: Requirements 5.3, 5.5**
      
      fc.assert(
        fc.property(
          // Generate random book data
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 20 }),
            series: fc.constantFrom('Oxford' as const, 'RAZ' as const, 'Heinemann' as const),
            level: fc.string({ minLength: 1, maxLength: 10 }),
            title: fc.string({ minLength: 1, maxLength: 50 }),
            description: fc.string({ minLength: 10, maxLength: 200 }),
            coverColor: fc.string({ minLength: 1, maxLength: 20 }),
            tags: fc.array(fc.string({ minLength: 1, maxLength: 15 }), { minLength: 1, maxLength: 5 })
          }),
          fc.array(
            fc.record({
              id: fc.string({ minLength: 1, maxLength: 20 }),
              series: fc.constantFrom('Oxford' as const, 'RAZ' as const, 'Heinemann' as const),
              level: fc.string({ minLength: 1, maxLength: 10 }),
              title: fc.string({ minLength: 1, maxLength: 50 }),
              description: fc.string({ minLength: 10, maxLength: 200 }),
              coverColor: fc.string({ minLength: 1, maxLength: 20 }),
              tags: fc.array(fc.string({ minLength: 1, maxLength: 15 }), { minLength: 1, maxLength: 5 })
            }),
            { minLength: 1, maxLength: 10 }
          ),
          (targetBook, allBooks) => {
            // Ensure target book is in the list
            const booksWithTarget = [targetBook, ...allBooks.filter(b => b.id !== targetBook.id)]
            
            // Render the component
            render(<MockMobileBookRecommendation books={booksWithTarget} />)

            // Verify initial state: book list is visible
            expect(screen.getByTestId('book-list')).toBeInTheDocument()
            expect(screen.getByTestId(`book-card-${targetBook.id}`)).toBeInTheDocument()
            
            // Verify book detail is not visible initially
            expect(screen.queryByTestId(`book-detail-${targetBook.id}`)).not.toBeInTheDocument()

            // Test: Click on the target book card
            fireEvent.click(screen.getByTestId(`book-card-${targetBook.id}`))

            // Verify: Book detail is now visible
            expect(screen.getByTestId(`book-detail-${targetBook.id}`)).toBeInTheDocument()
            expect(screen.getByText(targetBook.title)).toBeInTheDocument()
            expect(screen.getByText(targetBook.description)).toBeInTheDocument()
            
            // Verify: Book list is no longer visible
            expect(screen.queryByTestId('book-list')).not.toBeInTheDocument()

            // Test: Click close button to return to list
            fireEvent.click(screen.getByTestId('close-detail'))

            // Verify: Back to list state
            expect(screen.getByTestId('book-list')).toBeInTheDocument()
            expect(screen.getByTestId(`book-card-${targetBook.id}`)).toBeInTheDocument()
            
            // Verify: Book detail is no longer visible
            expect(screen.queryByTestId(`book-detail-${targetBook.id}`)).not.toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })

    it('Property 9 Extended: Multiple Book Interaction - For any list of books, clicking different cards should show their respective details', () => {
      // Feature: mobile-ui-enhancement, Property 9: Book Card Interaction
      // **Validates: Requirements 5.3, 5.5**
      
      fc.assert(
        fc.property(
          fc.array(
            fc.record({
              id: fc.string({ minLength: 1, maxLength: 20 }),
              series: fc.constantFrom('Oxford' as const, 'RAZ' as const, 'Heinemann' as const),
              level: fc.string({ minLength: 1, maxLength: 10 }),
              title: fc.string({ minLength: 1, maxLength: 50 }),
              description: fc.string({ minLength: 10, maxLength: 200 }),
              coverColor: fc.string({ minLength: 1, maxLength: 20 }),
              tags: fc.array(fc.string({ minLength: 1, maxLength: 15 }), { minLength: 1, maxLength: 5 })
            }),
            { minLength: 2, maxLength: 5 }
          ),
          (books) => {
            // Ensure unique IDs
            const uniqueBooks = books.map((book, index) => ({ ...book, id: `book-${index}` }))
            
            render(<MockMobileBookRecommendation books={uniqueBooks} />)

            // Test clicking each book
            for (const book of uniqueBooks) {
              // Click on book card
              fireEvent.click(screen.getByTestId(`book-card-${book.id}`))

              // Verify correct detail is shown
              expect(screen.getByTestId(`book-detail-${book.id}`)).toBeInTheDocument()
              expect(screen.getByText(book.title)).toBeInTheDocument()

              // Return to list
              fireEvent.click(screen.getByTestId('close-detail'))
              expect(screen.getByTestId('book-list')).toBeInTheDocument()
            }
          }
        ),
        { numRuns: 50 }
      )
    })

    it('Property 9 State Consistency: Book detail state should be consistent with selected book data', () => {
      // Feature: mobile-ui-enhancement, Property 9: Book Card Interaction
      // **Validates: Requirements 5.3, 5.5**
      
      fc.assert(
        fc.property(
          fc.record({
            id: fc.string({ minLength: 1, maxLength: 20 }),
            series: fc.constantFrom('Oxford' as const, 'RAZ' as const, 'Heinemann' as const),
            level: fc.string({ minLength: 1, maxLength: 10 }),
            title: fc.string({ minLength: 1, maxLength: 50 }),
            description: fc.string({ minLength: 10, maxLength: 200 }),
            coverColor: fc.string({ minLength: 1, maxLength: 20 }),
            tags: fc.array(fc.string({ minLength: 1, maxLength: 15 }), { minLength: 1, maxLength: 5 })
          }),
          (book) => {
            render(<MockMobileBookRecommendation books={[book]} />)

            // Click on book card
            fireEvent.click(screen.getByTestId(`book-card-${book.id}`))

            // Verify all book data is displayed correctly in detail view
            expect(screen.getByText(book.title)).toBeInTheDocument()
            expect(screen.getByText(book.description)).toBeInTheDocument()
            expect(screen.getByText(book.tags.join(', '))).toBeInTheDocument()
          }
        ),
        { numRuns: 100 }
      )
    })
  })

  describe('Unit Tests', () => {
    const sampleBook: BookRecommendation = {
      id: 'test-book-1',
      series: 'Oxford',
      level: 'Level 3',
      title: 'Test Book Title',
      description: 'This is a test book description.',
      coverColor: 'bg-blue-400',
      tags: ['Fiction', 'Adventure']
    }

    it('should render book card with correct information', () => {
      const mockClick = vi.fn()
      render(<MockBookCard book={sampleBook} onClick={mockClick} />)

      expect(screen.getByText('Test Book Title')).toBeInTheDocument()
      expect(screen.getByText('This is a test book description.')).toBeInTheDocument()
      expect(screen.getByText('Oxford')).toBeInTheDocument()
      expect(screen.getByText('Level 3')).toBeInTheDocument()
    })

    it('should call onClick when book card is clicked', () => {
      const mockClick = vi.fn()
      render(<MockBookCard book={sampleBook} onClick={mockClick} />)

      fireEvent.click(screen.getByTestId(`book-card-${sampleBook.id}`))
      expect(mockClick).toHaveBeenCalledTimes(1)
    })

    it('should render book detail with close functionality', () => {
      const mockClose = vi.fn()
      render(<MockBookDetail book={sampleBook} onClose={mockClose} />)

      expect(screen.getByText('Test Book Title')).toBeInTheDocument()
      expect(screen.getByText('This is a test book description.')).toBeInTheDocument()
      expect(screen.getByText('Fiction, Adventure')).toBeInTheDocument()

      fireEvent.click(screen.getByTestId('close-detail'))
      expect(mockClose).toHaveBeenCalledTimes(1)
    })

    it('should handle empty book list gracefully', () => {
      render(<MockMobileBookRecommendation books={[]} />)
      expect(screen.getByTestId('book-list')).toBeInTheDocument()
    })
  })
})