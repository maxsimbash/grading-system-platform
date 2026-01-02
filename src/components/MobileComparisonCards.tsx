import { useState } from 'react'
import { ChevronDown, ChevronUp, GraduationCap, ChevronRight } from 'lucide-react'
import type { GradingLevel } from '../data/gradingData'

interface MobileComparisonCardsProps {
  levels: GradingLevel[]
  filterCEFR: string
  onFilterChange: (cefr: string) => void
}

interface LevelCardProps {
  level: GradingLevel
  isHighlighted?: boolean
}

export const MobileComparisonCards = ({ 
  levels, 
  filterCEFR, 
  onFilterChange 
}: MobileComparisonCardsProps) => {
  // Filter levels based on CEFR selection
  const filteredLevels = filterCEFR 
    ? levels.filter(level => level.cefr.includes(filterCEFR))
    : levels

  return (
    <section className="max-w-5xl mx-auto px-4">
      <div className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden">
        {/* Header with CEFR Filter */}
        <div className="p-6 border-b border-gray-100 flex flex-col gap-4">
          <div className="flex items-center space-x-3">
            <div className="bg-orange-500 rounded-full p-2">
              <GraduationCap className="w-5 h-5 text-white" />
            </div>
            <h3 className="text-xl font-bold tracking-tight">完整对标表</h3>
          </div>
          
          {/* CEFR Filter Dropdown */}
          <div className="flex items-center space-x-3">
            <label className="text-sm font-medium text-[#86868b]">筛选 CEFR</label>
            <div className="relative">
              <select
                value={filterCEFR}
                onChange={(e) => onFilterChange(e.target.value)}
                className="appearance-none bg-[#f5f5f7] pl-4 pr-10 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30 transition-all"
                role="combobox"
              >
                <option value="">全部显示</option>
                <option value="A1">A1 入门</option>
                <option value="A2">A2 基础</option>
                <option value="B1">B1 进阶</option>
                <option value="B2">B2 高阶</option>
              </select>
              <ChevronRight className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 rotate-90 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* Cards Container */}
        <div className="p-4 space-y-4">
          {filteredLevels.length === 0 ? (
            <div className="text-center py-8 text-[#86868b]">
              <p>没有找到符合条件的级别</p>
            </div>
          ) : (
            filteredLevels.map((level) => (
              <LevelCard 
                key={level.oxfordLevel} 
                level={level}
              />
            ))
          )}
        </div>
      </div>
    </section>
  )
}

export const LevelCard = ({ level, isHighlighted }: LevelCardProps) => {
  const [isExpanded, setIsExpanded] = useState(false)

  return (
    <div 
      className={`
        bg-white rounded-2xl shadow-sm border border-gray-100 
        transition-all duration-300 hover:shadow-md
        ${isHighlighted ? 'ring-2 ring-[#0071e3] shadow-md' : ''}
      `}
      data-testid={`level-card-${level.oxfordLevel.replace(/\s+/g, '-').toLowerCase()}`}
    >
      {/* Main Card Content */}
      <div className="p-4">
        {/* Header Row */}
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center space-x-3">
            <span className="text-lg font-bold text-[#0071e3]">
              {level.oxfordLevel}
            </span>
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
              {level.cefr}
            </span>
          </div>
          
          {/* Expand/Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
            aria-label={isExpanded ? '收起详细信息' : '展开详细信息'}
          >
            {isExpanded ? (
              <ChevronUp className="w-4 h-4 text-gray-600" />
            ) : (
              <ChevronDown className="w-4 h-4 text-gray-600" />
            )}
          </button>
        </div>

        {/* Essential Info Grid - Always Visible */}
        <div className="grid grid-cols-2 gap-3 mb-3">
          <InfoItem label="蓝思值" value={level.lexileRange} />
          <InfoItem label="推荐年级" value={level.recommendedGrade} />
          <InfoItem label="新课标" value={level.chinaStandard} />
          <InfoItem label="RAZ" value={level.raz} />
        </div>

        {/* Expandable Details */}
        <div className={`
          transition-all duration-300 overflow-hidden
          ${isExpanded ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="pt-3 border-t border-gray-100 space-y-3">
            <div className="grid grid-cols-1 gap-3">
              <InfoItem label="剑桥考试" value={level.cambridgeExam} />
              <InfoItem label="海尼曼" value={level.heinemann} />
              <InfoItem label="推荐年龄" value={level.recommendedAge} />
              <InfoItem 
                label="蓝思值范围" 
                value={`${level.lexileMin}L - ${level.lexileMax}L`} 
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper component for displaying information items
const InfoItem = ({ label, value }: { label: string; value: string }) => {
  // Handle empty or dash values
  const displayValue = value === '-' || !value ? '暂无' : value
  const isEmpty = value === '-' || !value

  return (
    <div className="bg-[#f5f5f7] rounded-xl p-3">
      <div className="text-xs font-medium text-[#86868b] mb-1">
        {label}
      </div>
      <div className={`text-sm font-semibold ${
        isEmpty ? 'text-gray-400' : 'text-[#1d1d1f]'
      }`}>
        {displayValue}
      </div>
    </div>
  )
}