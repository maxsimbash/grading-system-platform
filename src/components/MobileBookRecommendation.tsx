import { useState } from 'react'
import { Library } from 'lucide-react'
import type { BookRecommendation } from '../data/bookData'
import { MobileBookCard } from './MobileBookCard'
import { MobileBookDetail } from './MobileBookDetail'

interface MobileBookRecommendationProps {
  books: BookRecommendation[]
}

export function MobileBookRecommendation({ books }: MobileBookRecommendationProps) {
  const [selectedBook, setSelectedBook] = useState<BookRecommendation | null>(null)

  const handleBookClick = (book: BookRecommendation) => {
    setSelectedBook(book)
  }

  const handleCloseDetail = () => {
    setSelectedBook(null)
  }

  if (books.length === 0) {
    return null
  }

  return (
    <section className="px-4 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-gray-100">
        {/* Header */}
        <div className="flex items-center space-x-2 mb-6">
          <Library className="w-5 h-5 text-[#0071e3]" />
          <h4 className="text-xl font-bold">精选书单推荐</h4>
        </div>
        
        {/* Book Grid - Single Column for Mobile */}
        <div className="space-y-4">
          {books.map((book) => (
            <MobileBookCard
              key={book.id}
              book={book}
              onClick={() => handleBookClick(book)}
            />
          ))}
        </div>
      </div>
      
      {/* Book Detail Modal */}
      <MobileBookDetail
        book={selectedBook!}
        isOpen={!!selectedBook}
        onClose={handleCloseDetail}
      />
    </section>
  )
}