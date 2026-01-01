import { useState } from 'react';
import { ArrowLeft, BookOpen, ExternalLink, Library, ChevronDown, ChevronUp } from 'lucide-react';

interface ORTPageProps {
  onBack: () => void;
}

// 模拟牛津树核心书目数据
const ortBooks = [
  {
    level: "Level 1",
    color: "bg-pink-100 text-pink-700 border-pink-200",
    description: "无字书/单词书，培养阅读习惯。",
    books: [
      { title: "Kipper's Diary", type: "Biff, Chip and Kipper Stories", url: "https://www.oxfordowl.co.uk/for-home/find-a-book/library-page/?view=image&query=&type=book&age_group=&level=oxford+level+1&level_select=oxford+level+1&book_type=&series=oxford+reading+tree" },
      { title: "Biff's Aeroplane", type: "First Words", url: "https://www.oxfordowl.co.uk/" },
      { title: "Floppy's Bath", type: "First Words", url: "https://www.oxfordowl.co.uk/" },
      { title: "The Library", type: "Decode and Develop", url: "https://www.oxfordowl.co.uk/" },
    ]
  },
  {
    level: "Level 1+",
    color: "bg-pink-200 text-pink-800 border-pink-300",
    description: "简单句，开始自然拼读。",
    books: [
      { title: "The Pancake", type: "Traditional Tales", url: "https://www.oxfordowl.co.uk/" },
      { title: "Look At Me", type: "First Sentences", url: "https://www.oxfordowl.co.uk/" },
      { title: "Go Away, Cat", type: "Decode and Develop", url: "https://www.oxfordowl.co.uk/" },
      { title: "Hide and Seek", type: "First Sentences", url: "https://www.oxfordowl.co.uk/" },
    ]
  },
  {
    level: "Level 2",
    color: "bg-red-100 text-red-700 border-red-200",
    description: "早期阅读，增加词汇量。",
    books: [
      { title: "The Toys' Party", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "New Trainers", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "A New Dog", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "What a Bad Dog!", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
    ]
  },
  {
    level: "Level 3",
    color: "bg-yellow-100 text-yellow-700 border-yellow-200",
    description: "发展阅读技巧，句子变长。",
    books: [
      { title: "The Magic Key", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "Rope Swing", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "By the Stream", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "Kipper the Clown", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
    ]
  },
  {
    level: "Level 4",
    color: "bg-blue-100 text-blue-700 border-blue-200",
    description: "建立自信，开始阅读更长的故事。",
    books: [
      { title: "The Storm", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "House for Sale", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "The Camcorder", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "Nobody Wanted to Play", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
    ]
  },
  {
    level: "Level 5",
    color: "bg-green-100 text-green-700 border-green-200",
    description: "魔法钥匙冒险开始，词汇丰富。",
    books: [
      { title: "The Magic of the Key", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "Underground Adventure", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "Vanishing Cream", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "The Dragon Tree", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
    ]
  },
  {
    level: "Level 6",
    color: "bg-orange-100 text-orange-700 border-orange-200",
    description: "流利阅读，理解复杂情节。",
    books: [
      { title: "In the Garden", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "Kipper and the Giant", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "The Outing", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "Land of the Dinosaurs", type: "Stories", url: "https://www.oxfordowl.co.uk/" },
    ]
  },
  {
    level: "Level 7-9",
    color: "bg-purple-100 text-purple-700 border-purple-200",
    description: "独立阅读，章节书过渡。",
    books: [
      { title: "The Broken Roof", type: "Level 7 Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "The Kidnappers", type: "Level 8 Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "The Quest", type: "Level 9 Stories", url: "https://www.oxfordowl.co.uk/" },
      { title: "Green Island", type: "Level 9 Stories", url: "https://www.oxfordowl.co.uk/" },
    ]
  }
];

export function ORTPage({ onBack }: ORTPageProps) {
  const [expandedLevel, setExpandedLevel] = useState<string | null>("Level 1");

  const toggleLevel = (level: string) => {
    setExpandedLevel(expandedLevel === level ? null : level);
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
            Oxford Reading Tree 核心书目
          </h1>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-4 md:px-6 py-8 md:py-12 safe-area-bottom">
        {/* Intro Card */}
        <section className="bg-white rounded-[24px] md:rounded-3xl p-6 md:p-12 shadow-apple-md border border-gray-100 mb-8 md:mb-12 animate-fade-in">
          <div className="flex flex-col md:flex-row items-center gap-6 md:gap-8">
            <div className="flex-1">
              <span className="inline-block px-3 py-1 bg-blue-50 text-[#0071e3] text-[10px] md:text-xs font-bold rounded-full mb-3 md:mb-4">
                Global Best Seller
              </span>
              <h2 className="text-2xl md:text-4xl font-bold tracking-tight mb-3 md:mb-4 text-[#1d1d1f]">
                Biff, Chip & Kipper Stories
              </h2>
              <p className="text-base md:text-lg text-[#86868b] leading-relaxed">
                牛津阅读树 (ORT) 是英国 80% 小学使用的母语学习教材。
                这套分级读物以 Biff, Chip 和 Kipper 一家人的生活为主线，
                故事幽默风趣，语言循序渐进，是全球最受欢迎的英语启蒙读物之一。
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

        {/* Levels Accordion */}
        <section className="space-y-4 mb-12 md:mb-20">
          <div className="flex items-center space-x-2 mb-4 md:mb-6">
            <Library className="w-5 h-5 md:w-6 md:h-6 text-[#0071e3]" />
            <h3 className="text-xl md:text-2xl font-bold">分级书目一览</h3>
          </div>

          <div className="space-y-3 md:space-y-4">
            {ortBooks.map((group) => (
              <div 
                key={group.level}
                className="bg-white rounded-2xl shadow-apple-sm border border-gray-100 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => toggleLevel(group.level)}
                  className="w-full flex items-center justify-between p-4 md:p-6 hover:bg-gray-50 transition-colors text-left active:bg-gray-100 touch-manipulation"
                >
                  <div className="flex items-center gap-3 md:gap-4 flex-1 min-w-0">
                    <span className={`px-2 py-1 md:px-3 md:py-1 rounded-lg text-xs md:text-sm font-bold flex-shrink-0 ${group.color}`}>
                      {group.level}
                    </span>
                    <span className="text-[#86868b] text-sm md:text-base font-medium truncate">
                      {group.description}
                    </span>
                  </div>
                  {expandedLevel === group.level ? (
                    <ChevronUp className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400 flex-shrink-0 ml-2" />
                  )}
                </button>

                {expandedLevel === group.level && (
                  <div className="px-4 md:px-6 pb-4 md:pb-6 pt-2 animate-slide-down">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:gap-4">
                      {group.books.map((book, idx) => (
                        <a 
                          key={idx}
                          href={book.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-start p-3 md:p-4 rounded-xl border border-gray-100 hover:border-[#0071e3]/30 hover:bg-blue-50/30 transition-all group active:scale-[0.98] touch-manipulation"
                        >
                          <div className="bg-gray-100 rounded-lg w-10 h-14 md:w-12 md:h-16 flex-shrink-0 flex items-center justify-center mr-3 md:mr-4">
                            <BookOpen className="w-5 h-5 md:w-6 md:h-6 text-gray-400" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h5 className="font-bold text-[#1d1d1f] text-sm md:text-base group-hover:text-[#0071e3] transition-colors flex items-center truncate">
                              {book.title}
                              <ExternalLink className="w-3 h-3 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </h5>
                            <p className="text-[10px] md:text-xs text-[#86868b] mt-1 truncate">{book.type}</p>
                          </div>
                        </a>
                      ))}
                    </div>
                    <div className="mt-4 text-center">
                        <a 
                            href="https://www.oxfordowl.co.uk/for-home/find-a-book/library-page/" 
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-xs md:text-sm font-medium text-[#0071e3] hover:underline p-2"
                        >
                            访问 Oxford Owl 官网查看更多 <ExternalLink className="w-3 h-3 ml-1" />
                        </a>
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
