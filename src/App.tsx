import { useState, useMemo } from 'react'
import { Search, BookOpen, GraduationCap, Globe, ChevronRight, Library, ArrowRight, Sparkles, Menu, X } from 'lucide-react'
import { gradingLevels, findLevelByLexile, findLevelsByGrade } from './data/gradingData'
import { getRecommendedBooks, type BookRecommendation } from './data/bookData'
import { AssessmentModal } from './components/AssessmentModal'
import { ChinaStandardPage } from './pages/ChinaStandardPage'
import { CEFRPage } from './pages/CEFRPage'
import { LexilePage } from './pages/LexilePage'
import { ORTPage } from './pages/ORTPage'
import { RAZPage } from './pages/RAZPage'

function App() {
  const [currentPage, setCurrentPage] = useState<'home' | 'china-standard' | 'cefr' | 'lexile' | 'ort' | 'raz'>('home')
  const [lexileInput, setLexileInput] = useState('')
  const [gradeInput, setGradeInput] = useState('')
  const [searchResult, setSearchResult] = useState<any>(null)
  const [filterCEFR, setFilterCEFR] = useState('')
  const [isAssessmentOpen, setIsAssessmentOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLexileSearch = () => {
    const value = parseInt(lexileInput)
    if (!isNaN(value)) {
      const result = findLevelByLexile(value)
      setSearchResult(result)
    }
  }

  const handleGradeSearch = () => {
    if (gradeInput) {
      const results = findLevelsByGrade(gradeInput)
      setSearchResult(results.length > 0 ? results[0] : null)
    }
  }

  const handleAssessmentComplete = (estimatedLexile: number) => {
    setIsAssessmentOpen(false)
    setLexileInput(estimatedLexile.toString())
    // 自动触发查询
    const result = findLevelByLexile(estimatedLexile)
    setSearchResult(result)
    // 滚动到查询结果
    const searchSection = document.getElementById('search-section')
    if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const filteredLevels = filterCEFR
    ? gradingLevels.filter(level => level.cefr.includes(filterCEFR))
    : gradingLevels

  const recommendedBooks = useMemo(() => {
    if (!searchResult) return [];
    return getRecommendedBooks(
      searchResult.oxfordLevel,
      searchResult.raz,
      searchResult.heinemann
    );
  }, [searchResult]);


  const PageContent = () => {
    if (currentPage === 'china-standard') return <ChinaStandardPage onBack={() => setCurrentPage('home')} />
    if (currentPage === 'cefr') return <CEFRPage onBack={() => setCurrentPage('home')} />
    if (currentPage === 'lexile') return <LexilePage onBack={() => setCurrentPage('home')} />
    if (currentPage === 'ort') return <ORTPage onBack={() => setCurrentPage('home')} />
    if (currentPage === 'raz') return <RAZPage onBack={() => setCurrentPage('home')} />

    return (
      <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans">
        <AssessmentModal 
          isOpen={isAssessmentOpen} 
          onClose={() => setIsAssessmentOpen(false)}
          onComplete={handleAssessmentComplete}
        />

        {/* Header */}
        <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 transition-all duration-300">
          <div className="max-w-5xl mx-auto px-4 md:px-6 py-2.5 md:py-4">
            <div className="flex items-center justify-between h-8 md:h-auto">
              <div className="flex items-center space-x-2">
                <Globe className="w-4 h-4 md:w-5 md:h-5 text-gray-900" />
                <h1 className="text-base md:text-lg font-semibold tracking-tight text-gray-900 truncate max-w-[200px] md:max-w-none">
                  英语能力和阅读标准查询
                </h1>
              </div>
              
              {/* Desktop Nav */}
              <nav className="hidden md:flex space-x-6 text-xs font-medium text-gray-500">
                <button onClick={() => setCurrentPage('china-standard')} className="hover:text-[#0071e3] transition-colors">新课标</button>
                <button onClick={() => setCurrentPage('cefr')} className="hover:text-[#0071e3] transition-colors">CEFR</button>
                <button onClick={() => setCurrentPage('lexile')} className="hover:text-[#0071e3] transition-colors">Lexile</button>
                <button onClick={() => setCurrentPage('ort')} className="hover:text-[#0071e3] transition-colors">ORT</button>
                <button onClick={() => setCurrentPage('raz')} className="hover:text-[#0071e3] transition-colors">RAZ</button>
              </nav>

              {/* Mobile Menu Button */}
              <button 
                className="md:hidden p-1 -mr-1 text-gray-900 active:opacity-50 transition-opacity"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </button>
            </div>
          </div>
        </header>

        {/* Mobile Menu Overlay */}
        {isMobileMenuOpen && (
          <div className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm md:hidden animate-fade-in" onClick={() => setIsMobileMenuOpen(false)}>
             <div 
                className="absolute right-0 top-0 bottom-0 w-[280px] bg-[#f5f5f7] shadow-2xl p-6 animate-slide-left flex flex-col"
                onClick={e => e.stopPropagation()}
             >
                <div className="flex justify-end mb-8">
                  <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 -mr-2 text-gray-500 active:opacity-50">
                    <X className="w-6 h-6" />
                  </button>
                </div>
                <nav className="flex flex-col space-y-2">
                  <MenuButton onClick={() => { setCurrentPage('china-standard'); setIsMobileMenuOpen(false); }}>新课标</MenuButton>
                  <MenuButton onClick={() => { setCurrentPage('cefr'); setIsMobileMenuOpen(false); }}>CEFR</MenuButton>
                  <MenuButton onClick={() => { setCurrentPage('lexile'); setIsMobileMenuOpen(false); }}>Lexile</MenuButton>
                  <MenuButton onClick={() => { setCurrentPage('ort'); setIsMobileMenuOpen(false); }}>ORT</MenuButton>
                  <MenuButton onClick={() => { setCurrentPage('raz'); setIsMobileMenuOpen(false); }}>RAZ</MenuButton>
                </nav>
             </div>
          </div>
        )}

        <main className="pb-20 safe-area-bottom">
          {/* Hero Section */}
          <section className="pt-16 pb-12 md:pt-24 md:pb-16 text-center px-6">
            <h2 className="text-3xl md:text-6xl font-bold tracking-tight mb-4 md:mb-6 text-[#1d1d1f] leading-tight">
              找到最适合孩子的<br />英语分级读物
            </h2>
            <p className="text-base md:text-2xl text-[#86868b] max-w-2xl mx-auto leading-relaxed font-light mb-8 md:mb-10 tracking-wide">
              基于《义务教育英语课程标准》，整合全球主流分级体系，
              为您提供权威的对标查询服务。
            </p>
          </section>

          {/* Quick Search */}
          <section id="search-section" className="max-w-5xl mx-auto px-4 md:px-6 mb-16 md:mb-20">
            <div className="bg-white rounded-[24px] md:rounded-3xl p-6 md:p-12 shadow-apple-md border border-gray-100">
              <div className="flex items-center space-x-3 mb-6 md:mb-8">
                <div className="bg-[#0071e3] rounded-full p-2">
                  <Search className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
                <h3 className="text-xl md:text-2xl font-bold tracking-tight">智能查询</h3>
              </div>

              <div className="grid md:grid-cols-3 gap-6 md:gap-8">
                {/* Lexile Search */}
                <div className="space-y-3 md:space-y-4">
                  <label className="block text-sm font-medium text-[#86868b]">
                    按蓝思值 (Lexile)
                  </label>
                  <div className="flex flex-col space-y-3">
                    <input
                      type="number"
                      placeholder="例如: 300"
                      value={lexileInput}
                      onChange={(e) => setLexileInput(e.target.value)}
                      className="w-full px-4 py-3 bg-[#f5f5f7] border-none rounded-xl text-base md:text-lg focus:ring-2 focus:ring-[#0071e3]/30 transition-all outline-none"
                    />
                    <button
                      onClick={handleLexileSearch}
                      className="w-full px-6 py-3 bg-[#0071e3] text-white rounded-xl hover:bg-[#0077ED] font-medium transition-transform active:scale-95 text-base"
                    >
                      查询
                    </button>
                  </div>
                  <p className="text-[10px] md:text-xs text-[#86868b] pl-1">
                    输入孩子的蓝思测试值，获取对应读物推荐。
                  </p>
                </div>

                {/* Grade Search */}
                <div className="space-y-3 md:space-y-4">
                  <label className="block text-sm font-medium text-[#86868b]">
                    按年级
                  </label>
                  <div className="flex flex-col space-y-3">
                    <input
                      type="text"
                      placeholder="例如: 三年级"
                      value={gradeInput}
                      onChange={(e) => setGradeInput(e.target.value)}
                      className="w-full px-4 py-3 bg-[#f5f5f7] border-none rounded-xl text-base md:text-lg focus:ring-2 focus:ring-[#0071e3]/30 transition-all outline-none"
                    />
                    <button
                      onClick={handleGradeSearch}
                      className="w-full px-6 py-3 bg-[#0071e3] text-white rounded-xl hover:bg-[#0077ED] font-medium transition-transform active:scale-95 text-base"
                    >
                      查询
                    </button>
                  </div>
                  <p className="text-[10px] md:text-xs text-[#86868b] pl-1">
                    输入孩子当前就读年级，查看平均阅读水平。
                  </p>
                </div>

                {/* Assessment Entry */}
                <div className="space-y-3 md:space-y-4">
                  <label className="block text-sm font-medium text-[#86868b]">
                    不知道级别？
                  </label>
                  <div className="flex flex-col space-y-3">
                    <div className="w-full px-4 py-3 bg-[#f5f5f7] rounded-xl flex items-center text-[#1d1d1f] select-none text-base md:text-lg">
                      <Sparkles className="w-5 h-5 md:w-6 md:h-6 text-[#0071e3] mr-2" />
                      <span className="font-medium">英语水平自测</span>
                    </div>
                    <button 
                      onClick={() => setIsAssessmentOpen(true)}
                      className="w-full px-6 py-3 bg-[#0071e3] text-white rounded-xl hover:bg-[#0077ED] font-medium transition-transform active:scale-95 text-base shadow-sm"
                    >
                      测试
                    </button>
                  </div>
                  <p className="text-[10px] md:text-xs text-[#86868b] pl-1">
                    回答3个问题，快速估算蓝思值。
                  </p>
                </div>
              </div>

              {/* Search Result - Bento Grid Style */}
              {searchResult && (
                <div className="mt-10 pt-8 md:mt-12 md:pt-10 border-t border-gray-100 animate-fade-in">
                  <div className="flex items-center space-x-2 mb-6">
                    <BookOpen className="w-5 h-5 text-[#0071e3]" />
                    <h4 className="text-xl font-bold">推荐结果</h4>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-10">
                    <ResultCard title="牛津树" value={searchResult.oxfordLevel} color="bg-blue-50 text-blue-700" />
                    <ResultCard title="蓝思值" value={searchResult.lexileRange} color="bg-gray-50 text-gray-900" />
                    <ResultCard title="CEFR" value={searchResult.cefr} color="bg-purple-50 text-purple-700" />
                    <ResultCard title="新课标" value={searchResult.chinaStandard} color="bg-green-50 text-green-700" />
                    <ResultCard title="RAZ" value={searchResult.raz} />
                    <ResultCard title="海尼曼" value={searchResult.heinemann} />
                    <ResultCard title="剑桥考试" value={searchResult.cambridgeExam} />
                    <ResultCard title="推荐年级" value={searchResult.recommendedGrade} highlight />
                  </div>

                  {/* Recommended Books Section */}
                  {recommendedBooks.length > 0 && (
                    <div className="animate-slide-up">
                      <div className="flex items-center space-x-2 mb-6 mt-10 border-t border-gray-100 pt-8">
                        <Library className="w-5 h-5 text-[#0071e3]" />
                        <h4 className="text-xl font-bold">精选书单推荐</h4>
                      </div>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
                        {recommendedBooks.map((book) => (
                          <BookCard key={book.id} book={book} />
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </section>

          {/* Comparison Table */}
          <section className="max-w-5xl mx-auto px-4 md:px-6">
            <div className="bg-white rounded-[24px] md:rounded-3xl shadow-apple-sm border border-gray-100 overflow-hidden">
              <div className="p-6 md:p-8 border-b border-gray-100 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div className="flex items-center space-x-3">
                  <div className="bg-orange-500 rounded-full p-2">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold tracking-tight">完整对标表</h3>
                </div>
                <div className="flex items-center space-x-3">
                  <label className="text-sm font-medium text-[#86868b]">筛选 CEFR</label>
                  <div className="relative">
                    <select
                      value={filterCEFR}
                      onChange={(e) => setFilterCEFR(e.target.value)}
                      className="appearance-none bg-[#f5f5f7] pl-4 pr-10 py-2 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-[#0071e3]/30"
                    >
                      <option value="">全部显示</option>
                      <option value="A1">A1 入门</option>
                      <option value="A2">A2 基础</option>
                      <option value="B1">B1 进阶</option>
                      <option value="B2">B2 高阶</option>
                    </select>
                    <ChevronRight className="w-4 h-4 text-gray-400 absolute right-3 top-1/2 -translate-y-1/2 rotate-90" />
                  </div>
                </div>
              </div>

              <div className="overflow-x-auto scrollbar-hide">
                <table className="w-full text-sm text-left">
                  <thead>
                    <tr className="bg-[#f5f5f7]/50 text-[#86868b]">
                      <th className="px-6 py-4 font-medium whitespace-nowrap sticky left-0 bg-[#fbfbfd] md:static">牛津树</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">蓝思值</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">CEFR</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">新课标</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">RAZ</th>
                      <th className="px-6 py-4 font-medium whitespace-nowrap">推荐年级</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100">
                    {filteredLevels.map((level) => (
                      <tr
                        key={level.oxfordLevel}
                        className="hover:bg-[#f5f5f7]/50 transition-colors group"
                      >
                        <td className="px-6 py-4 font-semibold text-[#0071e3] whitespace-nowrap sticky left-0 bg-white md:group-hover:bg-[#f5f5f7]/50 md:static shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none">{level.oxfordLevel}</td>
                        <td className="px-6 py-4 text-[#1d1d1f] whitespace-nowrap">{level.lexileRange}</td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                            {level.cefr}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-[#86868b] whitespace-nowrap">{level.chinaStandard}</td>
                        <td className="px-6 py-4 text-[#86868b] whitespace-nowrap">{level.raz}</td>
                        <td className="px-6 py-4 text-[#1d1d1f] font-medium whitespace-nowrap">{level.recommendedGrade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="bg-[#f5f5f7] border-t border-gray-200 py-8 md:py-12 safe-area-bottom">
          <div className="max-w-5xl mx-auto px-6 text-center">
            <p className="text-[10px] md:text-xs text-[#86868b] mb-4">
              数据来源：奇奇学分级阅读研究团队 · 基于《义务教育英语课程标准（2022年版2025年修订）》
            </p>
            <div className="flex justify-center space-x-6 text-[10px] md:text-xs text-[#86868b]">
              <a href="#" className="hover:text-[#1d1d1f] hover:underline">关于我们</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#1d1d1f] hover:underline">使用条款</a>
              <span className="text-gray-300">|</span>
              <a href="#" className="hover:text-[#1d1d1f] hover:underline">隐私政策</a>
            </div>
            <p className="text-[10px] text-[#86868b] mt-6 md:mt-8">
              Copyright © 2025 全球英语分级体系查询平台. All rights reserved.
            </p>
          </div>
        </footer>
      </div>
    )
  }

  // ... (rest of the file remains same)
  return (
    <PageContent />
  )
}

function MenuButton({ onClick, children }: { onClick: () => void, children: React.ReactNode }) {
  return (
    <button 
      onClick={onClick} 
      className="text-left px-4 py-3 rounded-xl hover:bg-white transition-colors text-lg font-medium text-[#1d1d1f] active:scale-[0.98]"
    >
      {children}
    </button>
  )
}

function ResultCard({ title, value, color, highlight }: { title: string, value: string, color?: string, highlight?: boolean }) {
  return (
    <div className={`p-4 rounded-2xl flex flex-col justify-between h-20 md:h-28 transition-all hover:scale-[1.02] ${color || 'bg-[#f5f5f7] text-[#1d1d1f]'} ${highlight ? 'ring-2 ring-[#0071e3] bg-white' : ''}`}>
      <span className="text-[10px] md:text-xs font-medium opacity-70">{title}</span>
      <span className={`font-bold tracking-tight ${value.length > 10 ? 'text-xs md:text-sm' : 'text-base md:text-xl'}`}>
        {value}
      </span>
    </div>
  )
}

function BookCard({ book }: { book: BookRecommendation }) {
  return (
    <div className="bg-[#f5f5f7] rounded-2xl p-5 md:p-6 hover:bg-white hover:shadow-apple-md transition-all duration-300 group cursor-pointer border border-transparent hover:border-gray-100 active:scale-[0.98]">
      <div className={`w-10 h-14 md:w-12 md:h-16 ${book.coverColor} rounded-lg mb-4 shadow-sm group-hover:scale-105 transition-transform flex items-center justify-center`}>
         <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-white/50" />
      </div>
      
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <span className="text-[10px] uppercase tracking-wider font-bold text-[#86868b] bg-white px-2 py-1 rounded-full border border-gray-100">
            {book.series}
          </span>
          <span className="text-xs font-medium text-[#0071e3]">{book.level}</span>
        </div>
        
        <h5 className="font-bold text-base md:text-lg leading-tight text-[#1d1d1f] group-hover:text-[#0071e3] transition-colors">
          {book.title}
        </h5>
        
        <p className="text-[10px] md:text-xs text-[#86868b] line-clamp-2 leading-relaxed">
          {book.description}
        </p>
        
        <div className="pt-2 md:pt-3 flex items-center text-[#0071e3] text-xs font-medium opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity transform translate-y-0 md:translate-y-2 group-hover:translate-y-0">
          查看详情 <ArrowRight className="w-3 h-3 ml-1" />
        </div>
      </div>
    </div>
  )
}

export default App
