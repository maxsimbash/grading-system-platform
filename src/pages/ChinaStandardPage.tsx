import { ArrowLeft, BookOpen, TrendingUp, Target, Award, Star } from 'lucide-react';

interface ChinaStandardPageProps {
  onBack: () => void;
}

export function ChinaStandardPage({ onBack }: ChinaStandardPageProps) {
  return (
    <div className="min-h-screen bg-[#f5f5f7] text-[#1d1d1f] font-sans">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-200/50 transition-all duration-300">
        <div className="max-w-5xl mx-auto px-4 md:px-6 py-2.5 md:py-4 flex items-center h-12 md:h-auto">
          <button 
            onClick={onBack}
            className="p-1 -ml-1 hover:bg-gray-100 rounded-full transition-colors group active:scale-90 flex-shrink-0"
          >
            <ArrowLeft className="w-5 h-5 text-[#86868b] group-hover:text-[#1d1d1f]" />
          </button>
          <h1 className="ml-2 text-base md:text-lg font-semibold tracking-tight text-gray-900 truncate flex-1 text-center md:text-left pr-6 md:pr-0">
            中国英语义务教育课程标准
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 safe-area-bottom">
        {/* Intro Card */}
        <section className="bg-white rounded-[24px] md:rounded-3xl p-6 md:p-12 shadow-apple-md border border-gray-100 mb-8 md:mb-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-blue-50 text-[#0071e3] text-[10px] md:text-xs font-bold rounded-full mb-3 md:mb-4">
                2022年版 · 2025年修订
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4 text-[#1d1d1f]">
                新课标的核心变化
              </h2>
              <p className="text-base md:text-lg text-[#86868b] leading-relaxed">
                新课标将义务教育阶段的英语课程目标进行了体系化分级，最显著的特点是
                <span className="text-[#1d1d1f] font-semibold">正式提出了“预备级”</span>，
                从而形成了从学前启蒙到初中毕业的完整进阶体系。
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
               <div className="relative w-32 h-32 md:w-48 md:h-48">
                 <div className="absolute inset-0 bg-blue-50 rounded-full animate-pulse opacity-50"></div>
                 <div className="absolute inset-3 md:inset-4 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-blue-100">
                    <BookOpen className="w-12 h-12 md:w-16 md:h-16 text-[#0071e3]" />
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Levels Timeline */}
        <section className="space-y-6 md:space-y-8 mb-12 md:mb-20">
          <div className="flex items-center space-x-2 mb-2 md:mb-4">
            <TrendingUp className="w-5 h-5 md:w-6 md:h-6 text-[#0071e3]" />
            <h3 className="text-xl md:text-2xl font-bold">能力进阶图解</h3>
          </div>
          
          <div className="relative border-l-2 border-gray-200 ml-3 md:ml-6 space-y-8 md:space-y-12 pb-4">
            {/* Level 0 */}
            <div className="relative pl-6 md:pl-12 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-green-500 border-4 border-white shadow-sm group-hover:scale-125 transition-transform"></div>
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 hover:shadow-apple-md transition-all active:scale-[0.98]">
                <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="px-2 py-0.5 md:px-3 md:py-1 bg-green-50 text-green-700 text-xs md:text-sm font-bold rounded-lg">预备级</span>
                    <h4 className="text-lg md:text-xl font-bold">感知与积累</h4>
                  </div>
                  <span className="text-xs md:text-sm text-[#86868b] mt-1 md:mt-0">适用阶段：学前 / 低年级</span>
                </div>
                <ul className="space-y-2 text-[#86868b] text-sm md:text-base">
                  <li className="flex items-start">
                    <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>感知语音：</strong>建立声音与图像的联系，进行简单的听读模仿。</span>
                  </li>
                  <li className="flex items-start">
                    <Star className="w-3.5 h-3.5 md:w-4 md:h-4 text-green-500 mr-2 mt-1 flex-shrink-0" />
                    <span><strong>兴趣培养：</strong>习惯看图听故事，喜欢简单的英文儿歌。</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Level 1 */}
            <div className="relative pl-6 md:pl-12 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-blue-500 border-4 border-white shadow-sm group-hover:scale-125 transition-transform"></div>
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 hover:shadow-apple-md transition-all active:scale-[0.98]">
                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="px-2 py-0.5 md:px-3 md:py-1 bg-blue-50 text-blue-700 text-xs md:text-sm font-bold rounded-lg">一级</span>
                    <h4 className="text-lg md:text-xl font-bold">基础构建</h4>
                  </div>
                  <span className="text-xs md:text-sm text-[#86868b] mt-1 md:mt-0">适用阶段：1-3 年级</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2 text-[#86868b] text-sm md:text-base">
                        <div className="flex items-center text-[#1d1d1f] font-medium mb-1 md:mb-2">
                            <Target className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" /> 核心目标
                        </div>
                        <p>识别拼读规则，理解简单句。</p>
                        <p>能进行简单的日常交流，读懂简单的配图故事。</p>
                    </div>
                    <div className="bg-blue-50/50 rounded-xl p-3 md:p-4 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-blue-600 mb-1">~500</div>
                        <div className="text-[10px] md:text-xs text-blue-800/60 font-medium uppercase tracking-wider">目标词汇量</div>
                    </div>
                </div>
              </div>
            </div>

            {/* Level 2 */}
            <div className="relative pl-6 md:pl-12 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-purple-500 border-4 border-white shadow-sm group-hover:scale-125 transition-transform"></div>
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 hover:shadow-apple-md transition-all active:scale-[0.98]">
                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="px-2 py-0.5 md:px-3 md:py-1 bg-purple-50 text-purple-700 text-xs md:text-sm font-bold rounded-lg">二级</span>
                    <h4 className="text-lg md:text-xl font-bold">理解与推断</h4>
                  </div>
                  <span className="text-xs md:text-sm text-[#86868b] mt-1 md:mt-0">适用阶段：3-5 年级</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2 text-[#86868b] text-sm md:text-base">
                        <div className="flex items-center text-[#1d1d1f] font-medium mb-1 md:mb-2">
                            <Target className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" /> 核心目标
                        </div>
                        <p>理解段落大意，借助图片推断意义。</p>
                        <p>能描述熟悉的人或物，理解简短的叙述性语篇。</p>
                    </div>
                    <div className="bg-purple-50/50 rounded-xl p-3 md:p-4 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-purple-600 mb-1">800-1000</div>
                        <div className="text-[10px] md:text-xs text-purple-800/60 font-medium uppercase tracking-wider">目标词汇量</div>
                    </div>
                </div>
              </div>
            </div>

            {/* Level 3 */}
            <div className="relative pl-6 md:pl-12 group">
              <div className="absolute -left-[9px] top-0 w-4 h-4 rounded-full bg-orange-500 border-4 border-white shadow-sm group-hover:scale-125 transition-transform"></div>
              <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 hover:shadow-apple-md transition-all active:scale-[0.98]">
                 <div className="flex flex-col md:flex-row md:items-center justify-between mb-3 md:mb-4">
                  <div className="flex items-center gap-2 md:gap-3">
                    <span className="px-2 py-0.5 md:px-3 md:py-1 bg-orange-50 text-orange-700 text-xs md:text-sm font-bold rounded-lg">三级</span>
                    <h4 className="text-lg md:text-xl font-bold">分析与评价</h4>
                  </div>
                  <span className="text-xs md:text-sm text-[#86868b] mt-1 md:mt-0">适用阶段：5-9 年级</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 md:gap-6">
                    <div className="space-y-2 text-[#86868b] text-sm md:text-base">
                        <div className="flex items-center text-[#1d1d1f] font-medium mb-1 md:mb-2">
                            <Target className="w-3.5 h-3.5 md:w-4 md:h-4 mr-2" /> 核心目标
                        </div>
                        <p>分析语篇结构，评价观点。</p>
                        <p>能就熟悉话题进行交流，表达个人观点。</p>
                    </div>
                    <div className="bg-orange-50/50 rounded-xl p-3 md:p-4 text-center">
                        <div className="text-2xl md:text-3xl font-bold text-orange-600 mb-1">1600-2000</div>
                        <div className="text-[10px] md:text-xs text-orange-800/60 font-medium uppercase tracking-wider">目标词汇量</div>
                    </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comparison Table Summary */}
        <section>
          <div className="flex items-center space-x-2 mb-4 md:mb-6">
            <Award className="w-5 h-5 md:w-6 md:h-6 text-[#0071e3]" />
            <h3 className="text-xl md:text-2xl font-bold">国际标准对标速查</h3>
          </div>
          <div className="bg-white rounded-[24px] md:rounded-3xl overflow-hidden shadow-apple-sm border border-gray-100">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#f5f5f7] text-[#86868b]">
                  <tr>
                    <th className="px-4 py-3 md:px-6 md:py-4 font-medium sticky left-0 bg-[#f5f5f7] z-10">新课标级别</th>
                    <th className="px-4 py-3 md:px-6 md:py-4 font-medium whitespace-nowrap">CEFR</th>
                    <th className="px-4 py-3 md:px-6 md:py-4 font-medium whitespace-nowrap">蓝思值 (Lexile)</th>
                    <th className="px-4 py-3 md:px-6 md:py-4 font-medium whitespace-nowrap">能力关键词</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-green-600 sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none z-10">预备级</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">&lt; A1</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">BR - 170L</td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-[#86868b] whitespace-nowrap">磨耳朵、语感</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-blue-600 sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none z-10">一级</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">A1 / A1+</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">150L - 430L</td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-[#86868b] whitespace-nowrap">拼读、简单句</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-purple-600 sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none z-10">二级</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">A2 / A2+</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">400L - 600L</td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-[#86868b] whitespace-nowrap">段落理解、独立阅读</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-orange-600 sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none z-10">三级</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">B1 / B1+</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">550L - 730L</td>
                    <td className="px-4 py-3 md:px-6 md:py-4 text-[#86868b] whitespace-nowrap">语篇分析、观点表达</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
