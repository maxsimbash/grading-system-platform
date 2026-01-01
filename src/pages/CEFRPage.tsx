import { ArrowLeft, Layers, BarChart, Globe } from 'lucide-react';

interface CEFRPageProps {
  onBack: () => void;
}

export function CEFRPage({ onBack }: CEFRPageProps) {
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
            CEFR 欧洲语言共同参考框架
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 safe-area-bottom">
        {/* Intro Card */}
        <section className="bg-white rounded-[24px] md:rounded-3xl p-6 md:p-12 shadow-apple-md border border-gray-100 mb-8 md:mb-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-purple-50 text-purple-700 text-[10px] md:text-xs font-bold rounded-full mb-3 md:mb-4">
                Global Standard
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4 text-[#1d1d1f]">
                全球语言能力的“黄金标准”
              </h2>
              <p className="text-base md:text-lg text-[#86868b] leading-relaxed">
                CEFR (Common European Framework of Reference for Languages) 是由欧洲委员会制定的语言能力分级标准。
                它不依附于任何特定的教材或考试，而是描述了<span className="text-[#1d1d1f] font-semibold">“语言学习者能做什么”</span> (Can-do statements)。
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
               <div className="relative w-32 h-32 md:w-48 md:h-48">
                 <div className="absolute inset-0 bg-purple-50 rounded-full animate-pulse opacity-50"></div>
                 <div className="absolute inset-3 md:inset-4 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-purple-100">
                    <Globe className="w-12 h-12 md:w-16 md:h-16 text-purple-600" />
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Levels Grid */}
        <section className="space-y-6 md:space-y-8 mb-12 md:mb-20">
          <div className="flex items-center space-x-2 mb-2 md:mb-4">
            <Layers className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            <h3 className="text-xl md:text-2xl font-bold">六大级别详解</h3>
          </div>
          
          <div className="grid md:grid-cols-3 gap-4 md:gap-6">
            {/* A Basic User */}
            <div className="md:col-span-3 bg-gray-50 rounded-2xl p-4 border border-gray-200">
                <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1">A 级 - 基础使用者 (Basic User)</h4>
                <p className="text-xs md:text-sm text-gray-500">生活存活英语，满足基本沟通需求。</p>
            </div>
            
            {/* A1 */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 hover:shadow-apple-md hover:border-purple-200 transition-all active:scale-[0.98] group">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-purple-600">A1</span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-[10px] md:text-xs font-bold rounded">入门级</span>
                </div>
                <h5 className="font-bold text-[#1d1d1f] mb-1 md:mb-2 text-base md:text-lg">Breakthrough</h5>
                <p className="text-xs md:text-sm text-[#86868b] leading-relaxed">
                    能理解并使用日常用语和非常基础的词汇。能进行简单的自我介绍，只要对方语速缓慢，能进行简单交流。
                </p>
            </div>

            {/* A2 */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 hover:shadow-apple-md hover:border-purple-200 transition-all active:scale-[0.98] group">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-purple-600">A2</span>
                    <span className="px-2 py-1 bg-purple-50 text-purple-700 text-[10px] md:text-xs font-bold rounded">基础级</span>
                </div>
                <h5 className="font-bold text-[#1d1d1f] mb-1 md:mb-2 text-base md:text-lg">Waystage</h5>
                <p className="text-xs md:text-sm text-[#86868b] leading-relaxed">
                    能理解最贴近生活的句子（如家庭、购物）。能就熟悉的话题进行简单而直接的信息交换。
                </p>
            </div>

             {/* B Independent User */}
             <div className="md:col-span-3 bg-gray-50 rounded-2xl p-4 border border-gray-200 mt-2 md:mt-4">
                <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1">B 级 - 独立使用者 (Independent User)</h4>
                <p className="text-xs md:text-sm text-gray-500">职场/学术英语，能够独立进行大多数交流。</p>
            </div>

            {/* B1 */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 hover:shadow-apple-md hover:border-blue-200 transition-all active:scale-[0.98] group">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-blue-600">B1</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] md:text-xs font-bold rounded">进阶级</span>
                </div>
                <h5 className="font-bold text-[#1d1d1f] mb-1 md:mb-2 text-base md:text-lg">Threshold</h5>
                <p className="text-xs md:text-sm text-[#86868b] leading-relaxed">
                    在标准语言环境中，能理解工作、学校等场合的要点。能应对旅游中的大多数情况。能简单的创作相关话题的文章。
                </p>
            </div>

            {/* B2 */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 hover:shadow-apple-md hover:border-blue-200 transition-all active:scale-[0.98] group">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-blue-600">B2</span>
                    <span className="px-2 py-1 bg-blue-50 text-blue-700 text-[10px] md:text-xs font-bold rounded">高阶级</span>
                </div>
                <h5 className="font-bold text-[#1d1d1f] mb-1 md:mb-2 text-base md:text-lg">Vantage</h5>
                <p className="text-xs md:text-sm text-[#86868b] leading-relaxed">
                    能理解复杂文章的主旨。能流利、自然地与母语者交流。能针对广泛的主题撰写清晰、详细的文章。
                </p>
            </div>

             {/* C Proficient User */}
             <div className="md:col-span-3 bg-gray-50 rounded-2xl p-4 border border-gray-200 mt-2 md:mt-4">
                <h4 className="text-base md:text-lg font-bold text-gray-900 mb-1">C 级 - 精通使用者 (Proficient User)</h4>
                <p className="text-xs md:text-sm text-gray-500">母语/专家水平，精准表达，毫无障碍。</p>
            </div>

            {/* C1 */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 hover:shadow-apple-md hover:border-green-200 transition-all active:scale-[0.98] group">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-green-600">C1</span>
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] md:text-xs font-bold rounded">流利级</span>
                </div>
                <h5 className="font-bold text-[#1d1d1f] mb-1 md:mb-2 text-base md:text-lg">Advanced</h5>
                <p className="text-xs md:text-sm text-[#86868b] leading-relaxed">
                    能理解长篇、高难度的文本。能流利表达，不费力地寻找词汇。能在社交、学术和专业目的中灵活有效地使用语言。
                </p>
            </div>

            {/* C2 */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 hover:shadow-apple-md hover:border-green-200 transition-all active:scale-[0.98] group">
                <div className="flex justify-between items-start mb-3 md:mb-4">
                    <span className="text-2xl md:text-3xl font-bold text-green-600">C2</span>
                    <span className="px-2 py-1 bg-green-50 text-green-700 text-[10px] md:text-xs font-bold rounded">精通级</span>
                </div>
                <h5 className="font-bold text-[#1d1d1f] mb-1 md:mb-2 text-base md:text-lg">Mastery</h5>
                <p className="text-xs md:text-sm text-[#86868b] leading-relaxed">
                    能毫不费力地理解几乎所有听到或读到的内容。能总结不同来源的信息。能自发地、非常流利和精确地表达自己。
                </p>
            </div>
          </div>
        </section>

        {/* Comparison Table Summary */}
        <section>
          <div className="flex items-center space-x-2 mb-4 md:mb-6">
            <BarChart className="w-5 h-5 md:w-6 md:h-6 text-purple-600" />
            <h3 className="text-xl md:text-2xl font-bold">对标参考</h3>
          </div>
          <div className="bg-white rounded-[24px] md:rounded-3xl overflow-hidden shadow-apple-sm border border-gray-100">
            <div className="overflow-x-auto scrollbar-hide">
              <table className="w-full text-sm text-left">
                <thead className="bg-[#f5f5f7] text-[#86868b]">
                  <tr>
                    <th className="px-4 py-3 md:px-6 md:py-4 font-medium sticky left-0 bg-[#f5f5f7] z-10">CEFR</th>
                    <th className="px-4 py-3 md:px-6 md:py-4 font-medium whitespace-nowrap">新课标</th>
                    <th className="px-4 py-3 md:px-6 md:py-4 font-medium whitespace-nowrap">剑桥考试</th>
                    <th className="px-4 py-3 md:px-6 md:py-4 font-medium whitespace-nowrap">雅思 (IELTS)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-purple-600 sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none z-10">A1</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">一级</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">Movers</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">-</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-purple-600 sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none z-10">A2</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">二级</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">Flyers / KET</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">-</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-blue-600 sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none z-10">B1</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">三级</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">PET</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">4.0 - 5.0</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-blue-600 sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none z-10">B2</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">提高级</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">FCE</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">5.5 - 6.5</td>
                  </tr>
                   <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 md:px-6 md:py-4 font-bold text-green-600 sticky left-0 bg-white shadow-[2px_0_5px_-2px_rgba(0,0,0,0.05)] md:shadow-none z-10">C1</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">-</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">CAE</td>
                    <td className="px-4 py-3 md:px-6 md:py-4">7.0 - 8.0</td>
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
