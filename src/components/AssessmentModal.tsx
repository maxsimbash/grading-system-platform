import { useState } from 'react';
import { X, CheckCircle, ArrowRight, BookOpen } from 'lucide-react';
import { findLevelByLexile } from '../data/gradingData';

interface Question {
  id: number;
  text: string;
  options: { text: string; score: number }[];
}

// 简易的 Placement Test 题库
// 题目设计涵盖：基础词汇 -> 简单句 -> 复杂句 -> 短文理解
const questions: Question[] = [
  {
    id: 1,
    text: "Select the word for the picture: 🍎",
    options: [
      { text: "Banana", score: 0 },
      { text: "Apple", score: 50 }, // 基础词汇
      { text: "Orange", score: 0 },
      { text: "Grape", score: 0 },
    ],
  },
  {
    id: 2,
    text: "Fill in the blank: 'The cat is _____ the table.' (猫在桌子下面)",
    options: [
      { text: "in", score: 0 },
      { text: "on", score: 0 },
      { text: "under", score: 100 }, // 基础介词
      { text: "at", score: 0 },
    ],
  },
  {
    id: 3,
    text: "Choose the correct sentence:",
    options: [
      { text: "She go to school yesterday.", score: 0 },
      { text: "She went to school yesterday.", score: 200 }, // 过去式语法
      { text: "She going to school yesterday.", score: 0 },
      { text: "She goes to school yesterday.", score: 0 },
    ],
  },
  {
    id: 4,
    text: "Read and answer: 'Tom likes to play football. He plays every Saturday with his friends.' When does Tom play football?",
    options: [
      { text: "Every Sunday", score: 0 },
      { text: "Every day", score: 0 },
      { text: "Every Saturday", score: 300 }, // 短文理解
      { text: "With his friends", score: 0 }, // 干扰项
    ],
  },
  {
    id: 5,
    text: "Select the best word to complete the sentence: 'The scientist made a _____ discovery that changed the world.'",
    options: [
      { text: "boring", score: 0 },
      { text: "significant", score: 400 }, // 高级词汇
      { text: "delicious", score: 0 },
      { text: "purple", score: 0 },
    ],
  },
];

interface AssessmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (lexileResult: number) => void;
}

export function AssessmentModal({ isOpen, onClose, onComplete }: AssessmentModalProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [totalScore, setTotalScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  if (!isOpen) return null;

  const currentQuestion = questions[currentStep];
  const isLastQuestion = currentStep === questions.length - 1;

  const handleOptionClick = (score: number) => {
    // 立即更新分数并跳转下一题
    const newScore = totalScore + score;
    
    if (isLastQuestion) {
      const estimatedLexile = Math.min(Math.max(newScore, 0), 1300);
      onComplete(estimatedLexile);
      // 重置状态
      setTimeout(() => {
        setCurrentStep(0);
        setTotalScore(0);
      }, 300);
    } else {
      setTotalScore(newScore);
      setCurrentStep(currentStep + 1);
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/40 backdrop-blur-sm animate-fade-in">
      <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl overflow-hidden animate-scale-up">
        {/* Header */}
        <div className="bg-[#f5f5f7] px-8 py-6 flex items-center justify-between border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="bg-[#0071e3] p-2 rounded-full">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#1d1d1f]">英语水平自测</h3>
              <p className="text-xs text-[#86868b]">第 {currentStep + 1} / {questions.length} 题</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-gray-200 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-[#86868b]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-8">
          <h4 className="text-xl font-bold text-[#1d1d1f] mb-6 leading-tight">
            {currentQuestion.text}
          </h4>

          <div className="space-y-3">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleOptionClick(option.score)}
                className="w-full text-left p-4 rounded-xl border-2 border-gray-100 hover:border-[#0071e3]/30 hover:bg-[#f5f5f7] transition-all duration-200 flex items-center justify-between group active:scale-[0.99]"
              >
                <span className="font-medium text-[#1d1d1f]">
                  {option.text}
                </span>
                <ArrowRight className="w-4 h-4 text-[#86868b] opacity-0 group-hover:opacity-100 transition-opacity transform translate-x-[-10px] group-hover:translate-x-0" />
              </button>
            ))}
          </div>
        </div>

        {/* Footer removed since we auto-advance */}
        <div className="h-2 bg-gray-100">
            <div 
                className="h-full bg-[#0071e3] transition-all duration-300 ease-out"
                style={{ width: `${((currentStep) / questions.length) * 100}%` }}
            />
        </div>
      </div>
    </div>
  );
}
