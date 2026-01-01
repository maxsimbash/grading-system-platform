import { useState } from 'react';
import { ArrowLeft, BookOpen, Layers, Microscope, ChevronDown, ChevronUp, Star } from 'lucide-react';

interface RAZPageProps {
  onBack: () => void;
}

// 模拟 RAZ 核心数据
const razLevels = [
  {
    group: "aa - C",
    title: "GK 启蒙阶段",
    color: "bg-green-100 text-green-700 border-green-200",
    grade: "学前 - 一年级",
    description: "单词、短语、简单句。重点建立音素意识，培养阅读兴趣。",
    books: [
      { title: "Summer Picnic", level: "aa", type: "Non-fiction", theme: "Life" },
      { title: "Big", level: "aa", type: "Concept", theme: "Math" },
      { title: "Animals in the Zoo", level: "A", type: "Non-fiction", theme: "Animals" },
      { title: "The Garden", level: "A", type: "Fiction", theme: "Nature" },
      { title: "How Plants Grow", level: "C", type: "Science", theme: "Plants" },
    ]
  },
  {
    group: "D - J",
    title: "G1 小学低年级",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    grade: "一年级 - 三年级",
    description: "句子变长，句型多样化。开始涉及科普知识，词汇量稳步增长。",
    books: [
      { title: "All About Spiders", level: "G", type: "Science", theme: "Insects" },
      { title: "The Solar System", level: "E", type: "Science", theme: "Space" },
      { title: "Jobs People Do", level: "F", type: "Social Studies", theme: "Community" },
      { title: "Animal Eyes", level: "H", type: "Science", theme: "Animals" },
      { title: "Volcanoes", level: "K", type: "Science", theme: "Earth" }, // K is borderline but often grouped here for simplicity or next group
    ]
  },
  {
    group: "K - P",
    title: "G2 小学中年级",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    grade: "三年级 - 五年级",
    description: "段落阅读，非虚构比例增加。深入探索科学、历史、地理等学科知识。",
    books: [
      { title: "The Life Cycle of a Frog", level: "K", type: "Science", theme: "Biology" },
      { title: "Ancient Egypt", level: "M", type: "History", theme: "Civilization" },
      { title: "Ocean Animals", level: "L", type: "Science", theme: "Marine Life" },
      { title: "Inventors", level: "N", type: "Biography", theme: "History" },
      { title: "The Moon", level: "O", type: "Science", theme: "Space" },
    ]
  },
  {
    group: "Q - Z2",
    title: "G3-G5 小学高年级+",
    color: "bg-orange-100 text-orange-700 border-orange-200",
    grade: "六年级及以上",
    description: "长篇阅读，批判性思维。内容接近原版新闻、学术文章，词汇专业。",
    books: [
      { title: "World War II", level: "S", type: "History", theme: "War" },
      { title: "The Human Body", level: "T", type: "Science", theme: "Health" },
      { title: "Climate Change", level: "W", type: "Science", theme: "Environment" },
      { title: "Great Expectations", level: "Z", type: "Classic", theme: "Literature" },
    ]
  }
];

export function RAZPage({ onBack }: RAZPageProps) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>("aa - C");

  const toggleGroup = (group: string) => {
    setExpandedGroup(expandedGroup === group ? null : group);
  };

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
            Reading A-Z (RAZ) 分级体系
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 safe-area-bottom">
        {/* Intro Card */}
        <section className="bg-white rounded-[24px] md:rounded-3xl p-6 md:p-12 shadow-apple-md border border-gray-100 mb-8 md:mb-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-green-50 text-green-700 text-[10px] md:text-xs font-bold rounded-full mb-3 md:mb-4">
                Non-fiction King
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4 text-[#1d1d1f]">
                百科全书式的分级阅读
              </h2>
              <p className="text-base md:text-lg text-[#86868b] leading-relaxed">
                RAZ (Reading A-Z) 是全球知名的在线分级阅读平台。
                它的最大特点是<span className="text-[#1d1d1f] font-semibold">非虚构类 (Non-fiction) 内容占比极高</span>，
                涵盖科学、历史、地理、人物传记等丰富主题，被誉为“英语学习界的百科全书”。
                级别从 aa 到 Z2，呈螺旋式上升。
              </p>
            </div>
            <div className="w-full md:w-1/3 flex justify-center">
               <div className="relative w-32 h-32 md:w-48 md:h-48">
                 <div className="absolute inset-0 bg-green-50 rounded-full animate-pulse opacity-50"></div>
                 <div className="absolute inset-3 md:inset-4 bg-white rounded-full shadow-lg flex items-center justify-center border-4 border-green-100">
                    <Microscope className="w-12 h-12 md:w-16 md:h-16 text-green-600" />
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Levels Accordion */}
        <section className="space-y-4 mb-12 md:mb-20">
          <div className="flex items-center space-x-2 mb-4 md:mb-6">
            <Layers className="w-5 h-5 md:w-6 md:h-6 text-green-600" />
            <h3 className="text-xl md:text-2xl font-bold">分级阶段详解</h3>
          </div>

          <div className="space-y-3 md:space-y-4">
            {razLevels.map((group) => (
              <div 
                key={group.group}
                className="bg-white rounded-2xl shadow-apple-sm border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleGroup(group.group)}
                  className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-gray-50 transition-colors text-left active:bg-gray-100 touch-manipulation"
                >
                  <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                    <div className={`w-12 h-12 md:w-16 md:h-16 rounded-xl flex items-center justify-center text-sm md:text-lg font-bold flex-shrink-0 ${group.color}`}>
                      {group.group}
                    </div>
                    <div className="min-w-0 flex-1">
                        <h4 className="text-base md:text-lg font-bold text-[#1d1d1f]">{group.title}</h4>
                        <p className="text-[10px] md:text-sm text-[#86868b] mt-0.5 md:mt-1 truncate">{group.description}</p>
                    </div>
                  </div>
                  {expandedGroup === group.group ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  )}
                </button>

                {expandedGroup === group.group && (
                  <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 animate-slide-down border-t border-gray-50">
                    <div className="flex items-center text-xs md:text-sm font-medium text-green-600 mb-3 md:mb-4">
                        <Star className="w-3.5 h-3.5 md:w-4 md:h-4 mr-1" /> 推荐年级：{group.grade}
                    </div>
                    
                    <h5 className="text-[10px] md:text-sm font-bold text-[#86868b] uppercase tracking-wider mb-2 md:mb-3">代表书目</h5>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {group.books.map((book, idx) => (
                        <div 
                          key={idx}
                          className="flex items-center p-3 rounded-xl bg-gray-50 border border-gray-100 touch-manipulation"
                        >
                          <div className="bg-white rounded-lg p-1.5 md:p-2 mr-2 md:mr-3 shadow-sm flex-shrink-0">
                             <BookOpen className="w-4 h-4 md:w-5 md:h-5 text-green-500" />
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center space-x-2">
                                <span className="font-bold text-[#1d1d1f] text-sm md:text-base truncate">{book.title}</span>
                                <span className="text-[10px] px-1.5 py-0.5 bg-gray-200 rounded text-gray-600 font-medium flex-shrink-0">Level {book.level}</span>
                            </div>
                            <div className="text-[10px] md:text-xs text-[#86868b] mt-0.5 flex items-center space-x-2">
                                <span className="truncate">{book.type}</span>
                                <span className="w-1 h-1 bg-gray-300 rounded-full flex-shrink-0"></span>
                                <span className="truncate">{book.theme}</span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
