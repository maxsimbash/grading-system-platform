import { useEffect } from 'react'
import { X, BookOpen, Tag, Star } from 'lucide-react'
import type { BookRecommendation } from '../data/bookData'

interface MobileBookDetailProps {
  book: BookRecommendation
  isOpen: boolean
  onClose: () => void
}

export function MobileBookDetail({ book, isOpen, onClose }: MobileBookDetailProps) {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  if (!isOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300"
        onClick={onClose}
      />
      
      {/* Bottom Sheet */}
      <div className="fixed inset-x-0 bottom-0 z-50 bg-white rounded-t-3xl shadow-2xl transform transition-transform duration-300 ease-out max-h-[85vh] overflow-hidden">
        {/* Handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-gray-300 rounded-full" />
        </div>
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
          <h2 className="text-xl font-bold text-[#1d1d1f]">书籍详情</h2>
          <button
            onClick={onClose}
            className="p-2 -mr-2 text-gray-500 hover:text-gray-700 active:opacity-50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        {/* Content */}
        <div className="px-6 py-6 overflow-y-auto max-h-[calc(85vh-120px)]">
          {/* Book Cover and Basic Info */}
          <div className="flex items-start space-x-4 mb-6">
            <div className={`w-16 h-20 ${book.coverColor} rounded-xl shadow-md flex items-center justify-center flex-shrink-0`}>
              <BookOpen className="w-6 h-6 text-white/60" />
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center space-x-2 mb-2">
                <span className="text-xs uppercase tracking-wider font-bold text-[#86868b] bg-[#f5f5f7] px-2 py-1 rounded-full">
                  {book.series}
                </span>
                <span className="text-sm font-medium text-[#0071e3] bg-blue-50 px-2 py-1 rounded-full">
                  {book.level}
                </span>
              </div>
              
              <h3 className="text-lg font-bold text-[#1d1d1f] mb-2 leading-tight">
                {book.title}
              </h3>
              
              <div className="flex items-center text-xs text-[#86868b]">
                <Star className="w-3 h-3 mr-1" />
                <span>推荐读物</span>
              </div>
            </div>
          </div>
          
          {/* Description */}
          <div className="mb-6">
            <h4 className="text-sm font-semibold text-[#1d1d1f] mb-3 flex items-center">
              <BookOpen className="w-4 h-4 mr-2 text-[#0071e3]" />
              内容简介
            </h4>
            <p className="text-sm text-[#86868b] leading-relaxed">
              {book.description}
            </p>
          </div>
          
          {/* Tags */}
          {book.tags.length > 0 && (
            <div className="mb-6">
              <h4 className="text-sm font-semibold text-[#1d1d1f] mb-3 flex items-center">
                <Tag className="w-4 h-4 mr-2 text-[#0071e3]" />
                标签分类
              </h4>
              <div className="flex flex-wrap gap-2">
                {book.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="text-xs bg-gray-100 text-gray-700 px-3 py-1 rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          {/* Reading Level Info */}
          <div className="bg-[#f5f5f7] rounded-2xl p-4">
            <h4 className="text-sm font-semibold text-[#1d1d1f] mb-3">阅读级别信息</h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-[#86868b]">系列：</span>
                <span className="font-medium text-[#1d1d1f]">{book.series}</span>
              </div>
              <div>
                <span className="text-[#86868b]">级别：</span>
                <span className="font-medium text-[#1d1d1f]">{book.level}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Bottom Action */}
        <div className="px-6 py-4 border-t border-gray-100 bg-white">
          <button
            onClick={onClose}
            className="w-full bg-[#0071e3] text-white py-3 rounded-xl font-medium hover:bg-[#0077ED] active:scale-[0.98] transition-all"
          >
            返回书单
          </button>
        </div>
      </div>
    </>
  )
}