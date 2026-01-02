import { useState, useEffect } from 'react'
import { Search, BookOpen, Sparkles, AlertCircle, CheckCircle } from 'lucide-react'
import type { GradingLevel } from '../data/gradingData'
import { useTouchGestures } from '../hooks/useTouchGestures'

interface MobileSearchInterfaceProps {
  lexileInput: string
  gradeInput: string
  onLexileInputChange: (value: string) => void
  onGradeInputChange: (value: string) => void
  onLexileSearch: () => void
  onGradeSearch: () => void
  onAssessmentOpen: () => void
  searchResult: GradingLevel | null
}

interface ValidationState {
  lexile: {
    isValid: boolean
    message: string
  }
  grade: {
    isValid: boolean
    message: string
  }
}

export const MobileSearchInterface = ({
  lexileInput,
  gradeInput,
  onLexileInputChange,
  onGradeInputChange,
  onLexileSearch,
  onGradeSearch,
  onAssessmentOpen,
  searchResult
}: MobileSearchInterfaceProps) => {
  const [validation, setValidation] = useState<ValidationState>({
    lexile: { isValid: true, message: '' },
    grade: { isValid: true, message: '' }
  })
  const [isSearching, setIsSearching] = useState(false)

  // Enhanced touch feedback for buttons
  const searchButtonGestures = useTouchGestures({
    onTap: () => {
      // Provide haptic feedback if available
      if ('vibrate' in navigator) {
        navigator.vibrate(50)
      }
    }
  })

  // Handle search with loading state and response time optimization
  const handleLexileSearchWithFeedback = async () => {
    if (!validation.lexile.isValid || !lexileInput.trim()) return
    
    setIsSearching(true)
    
    // Simulate quick response time (< 100ms as per requirements)
    const startTime = Date.now()
    
    try {
      await new Promise(resolve => setTimeout(resolve, 50)) // Simulate processing
      onLexileSearch()
      
      // Ensure minimum response time for user feedback
      const elapsed = Date.now() - startTime
      if (elapsed < 100) {
        await new Promise(resolve => setTimeout(resolve, 100 - elapsed))
      }
    } finally {
      setIsSearching(false)
    }
  }

  const handleGradeSearchWithFeedback = async () => {
    if (!validation.grade.isValid || !gradeInput.trim()) return
    
    setIsSearching(true)
    
    const startTime = Date.now()
    
    try {
      await new Promise(resolve => setTimeout(resolve, 50))
      onGradeSearch()
      
      const elapsed = Date.now() - startTime
      if (elapsed < 100) {
        await new Promise(resolve => setTimeout(resolve, 100 - elapsed))
      }
    } finally {
      setIsSearching(false)
    }
  }

  // Real-time input validation
  useEffect(() => {
    const newValidation: ValidationState = {
      lexile: { isValid: true, message: '' },
      grade: { isValid: true, message: '' }
    }

    // Lexile validation
    if (lexileInput.trim()) {
      const lexileValue = parseInt(lexileInput.trim())
      if (isNaN(lexileValue)) {
        newValidation.lexile = {
          isValid: false,
          message: '请输入有效的数字'
        }
      } else if (lexileValue < 0) {
        newValidation.lexile = {
          isValid: false,
          message: '蓝思值不能为负数'
        }
      } else if (lexileValue > 2000) {
        newValidation.lexile = {
          isValid: false,
          message: '蓝思值通常不超过2000L'
        }
      } else {
        newValidation.lexile = {
          isValid: true,
          message: '输入有效'
        }
      }
    }

    // Grade validation
    if (gradeInput.trim()) {
      const trimmedGrade = gradeInput.trim()
      const validGrades = ['学前', '一年级', '二年级', '三年级', '四年级', '五年级', '六年级', '初一', '初二', '初三']
      const isValidGrade = validGrades.some(grade => 
        trimmedGrade.includes(grade) || grade.includes(trimmedGrade)
      )
      
      if (isValidGrade) {
        newValidation.grade = {
          isValid: true,
          message: '年级识别成功'
        }
      } else {
        newValidation.grade = {
          isValid: false,
          message: '请输入有效的年级（如：三年级）'
        }
      }
    }

    setValidation(newValidation)
  }, [lexileInput, gradeInput])

  return (
    <section className="max-w-5xl mx-auto px-4 mb-8">
      <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-100">
        {/* Header */}
        <div className="flex items-center space-x-3 mb-6">
          <div className="bg-[#0071e3] rounded-full p-2">
            <Search className="w-5 h-5 text-white" />
          </div>
          <h3 className="text-xl font-bold tracking-tight">智能查询</h3>
        </div>

        {/* Vertical Stack Layout for Mobile */}
        <div className="space-y-6">
          {/* Lexile Search */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#86868b]">
              按蓝思值 (Lexile)
            </label>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="number"
                  placeholder="例如: 300"
                  value={lexileInput}
                  onChange={(e) => onLexileInputChange(e.target.value)}
                  className={`
                    w-full px-4 py-4 bg-[#f5f5f7] border-none rounded-xl 
                    text-lg focus:ring-2 focus:ring-[#0071e3]/30 
                    transition-all outline-none
                    min-h-[48px]
                    ${!validation.lexile.isValid ? 'ring-2 ring-red-300' : ''}
                  `}
                  style={{ 
                    minHeight: '48px',
                    touchAction: 'manipulation',
                    fontSize: '16px' // Prevent zoom on iOS
                  }}
                  inputMode="numeric"
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                />
                {/* Validation Icon */}
                {lexileInput.trim() && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {validation.lexile.isValid ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              
              {/* Validation Message */}
              {lexileInput.trim() && validation.lexile.message && (
                <p className={`text-xs px-1 ${
                  validation.lexile.isValid ? 'text-green-600' : 'text-red-600'
                }`}>
                  {validation.lexile.message}
                </p>
              )}
              
              <button
                onClick={handleLexileSearchWithFeedback}
                disabled={!validation.lexile.isValid || !lexileInput.trim() || isSearching}
                className={`
                  w-full px-6 py-4 rounded-xl font-medium 
                  transition-all text-base
                  min-h-[44px] min-w-[44px]
                  active:scale-95 active:bg-[#005bb5]
                  ${validation.lexile.isValid && lexileInput.trim() && !isSearching
                    ? 'bg-[#0071e3] text-white hover:bg-[#0077ED] shadow-sm'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
                style={{ 
                  minHeight: '44px', 
                  minWidth: '44px',
                  touchAction: 'manipulation' // Optimize for touch
                }}
                {...searchButtonGestures}
              >
                {isSearching ? '搜索中...' : '查询'}
              </button>
            </div>
            <p className="text-xs text-[#86868b] px-1">
              输入孩子的蓝思测试值，获取对应读物推荐。
            </p>
          </div>

          {/* Grade Search */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#86868b]">
              按年级
            </label>
            <div className="space-y-3">
              <div className="relative">
                <input
                  type="text"
                  placeholder="例如: 三年级"
                  value={gradeInput}
                  onChange={(e) => onGradeInputChange(e.target.value)}
                  className={`
                    w-full px-4 py-4 bg-[#f5f5f7] border-none rounded-xl 
                    text-lg focus:ring-2 focus:ring-[#0071e3]/30 
                    transition-all outline-none
                    min-h-[48px]
                    ${!validation.grade.isValid ? 'ring-2 ring-red-300' : ''}
                  `}
                  style={{ 
                    minHeight: '48px',
                    touchAction: 'manipulation',
                    fontSize: '16px' // Prevent zoom on iOS
                  }}
                  autoComplete="off"
                  autoCapitalize="off"
                  autoCorrect="off"
                />
                {/* Validation Icon */}
                {gradeInput.trim() && (
                  <div className="absolute right-3 top-1/2 -translate-y-1/2">
                    {validation.grade.isValid ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              
              {/* Validation Message */}
              {gradeInput.trim() && validation.grade.message && (
                <p className={`text-xs px-1 ${
                  validation.grade.isValid ? 'text-green-600' : 'text-red-600'
                }`}>
                  {validation.grade.message}
                </p>
              )}
              
              <button
                onClick={handleGradeSearchWithFeedback}
                disabled={!validation.grade.isValid || !gradeInput.trim() || isSearching}
                className={`
                  w-full px-6 py-4 rounded-xl font-medium 
                  transition-all text-base
                  min-h-[44px] min-w-[44px]
                  active:scale-95 active:bg-[#005bb5]
                  ${validation.grade.isValid && gradeInput.trim() && !isSearching
                    ? 'bg-[#0071e3] text-white hover:bg-[#0077ED] shadow-sm'
                    : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }
                `}
                style={{ 
                  minHeight: '44px', 
                  minWidth: '44px',
                  touchAction: 'manipulation'
                }}
                {...searchButtonGestures}
              >
                {isSearching ? '搜索中...' : '查询'}
              </button>
            </div>
            <p className="text-xs text-[#86868b] px-1">
              输入孩子当前就读年级，查看平均阅读水平。
            </p>
          </div>

          {/* Assessment Entry */}
          <div className="space-y-4">
            <label className="block text-sm font-medium text-[#86868b]">
              不知道级别？
            </label>
            <div className="space-y-3">
              <div className="w-full px-4 py-4 bg-[#f5f5f7] rounded-xl flex items-center text-[#1d1d1f] select-none text-lg min-h-[48px]">
                <Sparkles className="w-6 h-6 text-[#0071e3] mr-2 flex-shrink-0" />
                <span className="font-medium">英语水平自测</span>
              </div>
              <button 
                onClick={onAssessmentOpen}
                className="
                  w-full px-6 py-4 bg-[#0071e3] text-white rounded-xl 
                  hover:bg-[#0077ED] font-medium transition-all 
                  active:scale-95 active:bg-[#005bb5] text-base shadow-sm
                  min-h-[44px] min-w-[44px]
                "
                style={{ 
                  minHeight: '44px', 
                  minWidth: '44px',
                  touchAction: 'manipulation'
                }}
                {...searchButtonGestures}
              >
                测试
              </button>
            </div>
            <p className="text-xs text-[#86868b] px-1">
              回答3个问题，快速估算蓝思值。
            </p>
          </div>
        </div>

        {/* Search Result - 2 Column Grid for Mobile */}
        {searchResult && (
          <div className="mt-8 pt-6 border-t border-gray-100 animate-fade-in">
            <div className="flex items-center space-x-2 mb-4">
              <BookOpen className="w-5 h-5 text-[#0071e3]" />
              <h4 className="text-lg font-bold">推荐结果</h4>
            </div>
            
            {/* 2-column grid for mobile */}
            <div className="grid grid-cols-2 gap-3">
              <ResultCard title="牛津树" value={searchResult.oxfordLevel} color="bg-blue-50 text-blue-700" />
              <ResultCard title="蓝思值" value={searchResult.lexileRange} color="bg-gray-50 text-gray-900" />
              <ResultCard title="CEFR" value={searchResult.cefr} color="bg-purple-50 text-purple-700" />
              <ResultCard title="新课标" value={searchResult.chinaStandard} color="bg-green-50 text-green-700" />
              <ResultCard title="RAZ" value={searchResult.raz} />
              <ResultCard title="海尼曼" value={searchResult.heinemann} />
              <ResultCard title="剑桥考试" value={searchResult.cambridgeExam} />
              <ResultCard title="推荐年级" value={searchResult.recommendedGrade} highlight />
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

// Result Card Component optimized for mobile 2-column layout
function ResultCard({ 
  title, 
  value, 
  color, 
  highlight 
}: { 
  title: string
  value: string
  color?: string
  highlight?: boolean 
}) {
  return (
    <div className={`
      p-3 rounded-2xl flex flex-col justify-between h-20 
      transition-all hover:scale-[1.02] 
      ${color || 'bg-[#f5f5f7] text-[#1d1d1f]'} 
      ${highlight ? 'ring-2 ring-[#0071e3] bg-white' : ''}
    `}>
      <span className="text-xs font-medium opacity-70 leading-tight">{title}</span>
      <span className={`font-bold tracking-tight leading-tight ${
        value.length > 8 ? 'text-xs' : 'text-sm'
      }`}>
        {value}
      </span>
    </div>
  )
}