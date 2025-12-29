import { useState } from 'react'
import { Search, BookOpen, GraduationCap, Globe } from 'lucide-react'
import { gradingLevels, findLevelByLexile, findLevelsByGrade } from './data/gradingData'

function App() {
  const [lexileInput, setLexileInput] = useState('')
  const [gradeInput, setGradeInput] = useState('')
  const [searchResult, setSearchResult] = useState<any>(null)
  const [filterCEFR, setFilterCEFR] = useState('')

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

  const filteredLevels = filterCEFR
    ? gradingLevels.filter(level => level.cefr.includes(filterCEFR))
    : gradingLevels

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <Globe className="w-10 h-10 text-blue-600" />
              <div>
                <h1 className="text-3xl font-bold text-gray-900">
                  全球英语分级体系查询平台
                </h1>
                <p className="text-sm text-gray-600 mt-1">
                  一站式对标查询 · 新课标 · CEFR · 蓝思 · 牛津树 · RAZ · 海尼曼
                </p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            找到最适合孩子的英语分级读物
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            基于《义务教育英语课程标准（2022年版2025年修订）》，整合全球主流分级体系，
            帮助家长和教育工作者快速找到适合孩子的阅读材料
          </p>
        </div>

        {/* Quick Search */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <div className="flex items-center space-x-2 mb-6">
            <Search className="w-6 h-6 text-blue-600" />
            <h3 className="text-2xl font-bold text-gray-900">智能查询工具</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Lexile Search */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                按蓝思值查询
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  placeholder="例如: 300"
                  value={lexileInput}
                  onChange={(e) => setLexileInput(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleLexileSearch}
                  className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium transition-colors"
                >
                  查询
                </button>
              </div>
              <p className="text-xs text-gray-500">
                我家孩子蓝思值 300L，适合读什么？
              </p>
            </div>

            {/* Grade Search */}
            <div className="space-y-3">
              <label className="block text-sm font-medium text-gray-700">
                按年级查询
              </label>
              <div className="flex space-x-2">
                <input
                  type="text"
                  placeholder="例如: 三年级"
                  value={gradeInput}
                  onChange={(e) => setGradeInput(e.target.value)}
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <button
                  onClick={handleGradeSearch}
                  className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 font-medium transition-colors"
                >
                  查询
                </button>
              </div>
              <p className="text-xs text-gray-500">
                我家孩子三年级，推荐什么级别？
              </p>
            </div>
          </div>

          {/* Search Result */}
          {searchResult && (
            <div className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border-2 border-blue-200">
              <h4 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <BookOpen className="w-5 h-5 mr-2 text-blue-600" />
                推荐结果
              </h4>
              <div className="grid md:grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="font-semibold text-gray-700">奇奇学级别：</span>
                  <span className="ml-2 text-blue-600 font-bold">{searchResult.qiqixueLevel}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">中国新课标：</span>
                  <span className="ml-2">{searchResult.chinaStandard}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">蓝思值：</span>
                  <span className="ml-2">{searchResult.lexileRange}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">CEFR：</span>
                  <span className="ml-2">{searchResult.cefr}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">牛津树：</span>
                  <span className="ml-2">{searchResult.oxfordTree}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">RAZ：</span>
                  <span className="ml-2">{searchResult.raz}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">剑桥考试：</span>
                  <span className="ml-2">{searchResult.cambridgeExam}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">推荐年级：</span>
                  <span className="ml-2">{searchResult.recommendedGrade}</span>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <GraduationCap className="w-6 h-6 text-purple-600" />
              <h3 className="text-2xl font-bold text-gray-900">完整对标表</h3>
            </div>
            <div className="flex items-center space-x-2">
              <label className="text-sm font-medium text-gray-700">筛选 CEFR：</label>
              <select
                value={filterCEFR}
                onChange={(e) => setFilterCEFR(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent text-sm"
              >
                <option value="">全部</option>
                <option value="A1">A1</option>
                <option value="A2">A2</option>
                <option value="B1">B1</option>
                <option value="B2">B2</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-gradient-to-r from-blue-50 to-purple-50 border-b-2 border-gray-200">
                  <th className="px-4 py-3 text-left font-bold text-gray-900">奇奇学</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">新课标</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">剑桥考试</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">CEFR</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">蓝思值</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">牛津树</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">RAZ</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">海尼曼</th>
                  <th className="px-4 py-3 text-left font-bold text-gray-900">推荐年级</th>
                </tr>
              </thead>
              <tbody>
                {filteredLevels.map((level, index) => (
                  <tr
                    key={level.qiqixueLevel}
                    className={`border-b hover:bg-blue-50 transition-colors ${
                      index % 2 === 0 ? 'bg-white' : 'bg-gray-50'
                    }`}
                  >
                    <td className="px-4 py-3 font-bold text-blue-600">{level.qiqixueLevel}</td>
                    <td className="px-4 py-3 text-gray-700">{level.chinaStandard}</td>
                    <td className="px-4 py-3 text-gray-700">{level.cambridgeExam}</td>
                    <td className="px-4 py-3 font-semibold text-purple-600">{level.cefr}</td>
                    <td className="px-4 py-3 text-gray-700">{level.lexileRange}</td>
                    <td className="px-4 py-3 text-gray-700">{level.oxfordTree}</td>
                    <td className="px-4 py-3 text-gray-700">{level.raz}</td>
                    <td className="px-4 py-3 text-gray-700">{level.heinemann}</td>
                    <td className="px-4 py-3 text-gray-700">{level.recommendedGrade}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-4">关于本平台</h3>
            <p className="text-gray-400 max-w-2xl mx-auto mb-6">
              本平台基于《义务教育英语课程标准（2022年版2025年修订）》、CEFR、蓝思分级体系以及主流分级阅读产品（牛津树、RAZ、海尼曼）的数据，
              为中国家长和教育工作者提供权威的分级阅读对标查询服务。
            </p>
            <p className="text-sm text-gray-500">
              © 2025 全球英语分级体系查询平台 · 数据来源：奇奇学分级阅读研究团队
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
