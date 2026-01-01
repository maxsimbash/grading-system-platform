import { ArrowLeft, BookOpen, BarChart, Ruler, GraduationCap } from 'lucide-react';

interface LexilePageProps {
  onBack: () => void;
}

export function LexilePage({ onBack }: LexilePageProps) {
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
            Lexile 蓝思分级体系详解
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 safe-area-bottom">
        {/* Intro Card */}
        <section className="bg-white rounded-[24px] md:rounded-3xl p-6 md:p-12 shadow-apple-md border border-gray-100 mb-8 md:mb-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-blue-50 text-[#0071e3] text-[10px] md:text-xs font-bold rounded-full mb-3 md:mb-4">
                The Lexile Framework for Reading
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4 text-[#1d1d1f]">
                最科学的阅读能力标尺
              </h2>
              <p className="text-base md:text-lg text-[#86868b] leading-relaxed">
                蓝思 (Lexile) 是目前全球应用最广泛的英语阅读分级体系。
                它不仅评估<span className="text-[#1d1d1f] font-semibold">读者的阅读能力</span>，同时也评估<span className="text-[#1d1d1f] font-semibold">文本的难易程度</span>。
                当两者的蓝思值匹配时（例如 500L 的读者阅读 500L 的书），阅读效果最佳。
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
               <div className="relative w-32 h-32 md:w-48 md:h-48">
                 <div className="absolute inset-0 bg-blue-50 rounded-full animate-pulse opacity-50"></div>
                 <div className="absolute inset-3 md:inset-4 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-blue-100">
                    <Ruler className="w-12 h-12 md:w-16 md:h-16 text-[#0071e3]" />
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Levels Grid */}
        <section className="space-y-6 md:space-y-8 mb-12 md:mb-20">
          <div className="flex items-center space-x-2 mb-2 md:mb-4">
            <BarChart className="w-5 h-5 md:w-6 md:h-6 text-[#0071e3]" />
            <h3 className="text-xl md:text-2xl font-bold">难度等级划分</h3>
          </div>
          
          <div className="space-y-4 md:space-y-6">
            {/* BR */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 flex flex-col md:flex-row gap-4 md:gap-6 hover:shadow-apple-md transition-all active:scale-[0.98]">
                <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-green-50 rounded-xl flex flex-col items-center justify-center text-green-600">
                    <span className="text-xl md:text-2xl font-bold">BR</span>
                    <span className="text-[10px] md:text-xs font-medium uppercase">Beginning</span>
                </div>
                <div className="flex-1">
                    <h4 className="text-lg md:text-xl font-bold text-[#1d1d1f] mb-1 md:mb-2">零基础 / 启蒙阶段</h4>
                    <p className="text-xs md:text-base text-[#86868b] mb-2">Lexile 值小于 0L。通常为图画书，文字极少，依赖图片辅助理解。</p>
                    <div className="flex items-center text-xs md:text-sm font-medium text-green-600">
                        <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" /> 对应年级：学前 - 一年级
                    </div>
                </div>
            </div>

            {/* 200L - 500L */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 flex flex-col md:flex-row gap-4 md:gap-6 hover:shadow-apple-md transition-all active:scale-[0.98]">
                <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-blue-50 rounded-xl flex flex-col items-center justify-center text-blue-600">
                    <span className="text-xl md:text-2xl font-bold">200-500L</span>
                    <span className="text-[10px] md:text-xs font-medium uppercase">Elementary</span>
                </div>
                <div className="flex-1">
                    <h4 className="text-lg md:text-xl font-bold text-[#1d1d1f] mb-1 md:mb-2">小学中低年级</h4>
                    <p className="text-xs md:text-base text-[#86868b] mb-2">句子较短，常用词汇复现率高。开始从绘本过渡到简单的章节书（Chapter Books）。</p>
                    <div className="flex items-center text-xs md:text-sm font-medium text-blue-600">
                        <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" /> 对应年级：1-3 年级
                    </div>
                </div>
            </div>

            {/* 500L - 800L */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 flex flex-col md:flex-row gap-4 md:gap-6 hover:shadow-apple-md transition-all active:scale-[0.98]">
                <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-purple-50 rounded-xl flex flex-col items-center justify-center text-purple-600">
                    <span className="text-xl md:text-2xl font-bold">500-800L</span>
                    <span className="text-[10px] md:text-xs font-medium uppercase">Intermediate</span>
                </div>
                <div className="flex-1">
                    <h4 className="text-lg md:text-xl font-bold text-[#1d1d1f] mb-1 md:mb-2">小学高年级 - 初中</h4>
                    <p className="text-xs md:text-base text-[#86868b] mb-2">句式开始变复杂，出现从句。词汇量显著增加，能够阅读情节更丰富的小说和非虚构类文章。</p>
                    <div className="flex items-center text-xs md:text-sm font-medium text-purple-600">
                        <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" /> 对应年级：4-6 年级
                    </div>
                </div>
            </div>

            {/* 800L - 1200L */}
            <div className="bg-white rounded-2xl p-5 md:p-6 shadow-apple-sm border border-gray-100 flex flex-col md:flex-row gap-4 md:gap-6 hover:shadow-apple-md transition-all active:scale-[0.98]">
                <div className="flex-shrink-0 w-20 h-20 md:w-24 md:h-24 bg-orange-50 rounded-xl flex flex-col items-center justify-center text-orange-600">
                    <span className="text-xl md:text-2xl font-bold">800L+</span>
                    <span className="text-[10px] md:text-xs font-medium uppercase">Advanced</span>
                </div>
                <div className="flex-1">
                    <h4 className="text-lg md:text-xl font-bold text-[#1d1d1f] mb-1 md:mb-2">初中及以上</h4>
                    <p className="text-xs md:text-base text-[#86868b] mb-2">文本结构复杂，包含大量抽象词汇和长难句。能够阅读原版青少年文学、新闻报道和学术文章。</p>
                    <div className="flex items-center text-xs md:text-sm font-medium text-orange-600">
                        <GraduationCap className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" /> 对应年级：初中 - 高中
                    </div>
                </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section>
          <div className="flex items-center space-x-2 mb-4 md:mb-6">
            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-[#0071e3]" />
            <h3 className="text-xl md:text-2xl font-bold">常见问题</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-4 md:gap-6">
             <div className="bg-gray-50 rounded-2xl p-5 md:p-6">
                <h5 className="font-bold text-[#1d1d1f] mb-2 text-sm md:text-base">蓝思值越高越好吗？</h5>
                <p className="text-xs md:text-sm text-[#86868b] leading-relaxed">
                    不一定。给孩子选书时，建议选择范围在“Lexile值 -100L 到 +50L”之间的书籍。这个范围被称为“舒适阅读区”，既不会太难打击自信，又有一定的挑战性促进进步。
                </p>
             </div>
             <div className="bg-gray-50 rounded-2xl p-5 md:p-6">
                <h5 className="font-bold text-[#1d1d1f] mb-2 text-sm md:text-base">蓝思代码是什么意思？</h5>
                <p className="text-xs md:text-sm text-[#86868b] leading-relaxed">
                    有时候蓝思值前面会有字母代码，例如 <strong>AD</strong> (Adult Directed, 需家长指导)、<strong>GN</strong> (Graphic Novel, 漫画小说)、<strong>HL</strong> (High-Low, 趣味性高但难度低)。这些代码提供了关于书籍类型的额外信息。
                </p>
             </div>
          </div>
        </section>
      </main>
    </div>
  );
}
