import { BookOpen, ArrowRight } from 'lucide-react'
import type { BookRecommendation } from '../data/bookData'

interface MobileBookCardProps {
  book: BookRecommendation
  onClick: () => void
}

export function MobileBookCard({ book, onClick }: MobileBookCardProps) {
  return (
    <div 
      className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer active:scale-[0.98]"
      onClick={onClick}
    >
      {/* Book Cover */}
      <div className={`w-12 h-16 ${book.coverColor} rounded-lg mb-3 shadow-sm flex items-center justify-center`}>
        <BookOpen className="w-5 h-5 text-white/60" />
      </div>
      
      {/* Book Info */}
      <div className="space-y-2">
        {/* Series and Level */}
        <div className="flex items-center justify-between">
          <span className="text-xs uppercase tracking-wider font-bold text-[#86868b] bg-[#f5f5f7] px-2 py-1 rounded-full">
            {book.series}
          </span>
          <span className="text-xs font-medium text-[#0071e3]">{book.level}</span>
        </div>
        
        {/* Title */}
        <h5 className="font-bold text-base leading-tight text-[#1d1d1f] line-clamp-2">
          {book.title}
        </h5>
        
        {/* Description */}
        <p className="text-xs text-[#86868b] line-clamp-2 leading-relaxed">
          {book.description}
        </p>
        
        {/* View Details */}
        <div className="pt-2 flex items-center text-[#0071e3] text-xs font-medium">
          查看详情 <ArrowRight className="w-3 h-3 ml-1" />
        </div>
      </div>
    </div>
  )
}