
export interface BookRecommendation {
  id: string;
  series: 'Oxford' | 'RAZ' | 'Heinemann';
  level: string; // 对应 gradingLevels 中的级别标识 (oxfordLevel, raz, heinemann)
  title: string;
  description: string;
  coverColor: string; // 用于占位图背景色
  tags: string[];
}

// 模拟图书数据
export const bookRecommendations: BookRecommendation[] = [
  // Oxford Reading Tree (牛津树)
  {
    id: 'ox-l1-1',
    series: 'Oxford',
    level: 'Level 1',
    title: 'Kipper\'s Diary',
    description: 'Biff, Chip 和 Kipper 的日常生活故事，适合零基础启蒙。',
    coverColor: 'bg-blue-200',
    tags: ['Fiction', 'Family', 'Humor']
  },
  {
    id: 'ox-l1p-1',
    series: 'Oxford',
    level: 'Level 1+',
    title: 'The Pancake',
    description: '经典的煎饼逃跑故事，词汇简单重复，朗朗上口。',
    coverColor: 'bg-blue-300',
    tags: ['Fiction', 'Classic', 'Food']
  },
  {
    id: 'ox-l2-1',
    series: 'Oxford',
    level: 'Level 2',
    title: 'The Toys\' Party',
    description: 'Kipper 的玩具们开派对啦！充满想象力的故事。',
    coverColor: 'bg-blue-400',
    tags: ['Fiction', 'Toys', 'Imagination']
  },
  {
    id: 'ox-l3-1',
    series: 'Oxford',
    level: 'Level 3',
    title: 'The Magic Key',
    description: '魔法钥匙第一次发光，带孩子们进入神奇的冒险世界。',
    coverColor: 'bg-indigo-300',
    tags: ['Fantasy', 'Adventure', 'Magic']
  },
  {
    id: 'ox-l4-1',
    series: 'Oxford',
    level: 'Level 4',
    title: 'The Storm',
    description: '一场暴风雨来了，看看孩子们是如何应对的。',
    coverColor: 'bg-indigo-400',
    tags: ['Fiction', 'Weather', 'Family']
  },
  {
    id: 'ox-l5-1',
    series: 'Oxford',
    level: 'Level 5',
    title: 'The Magic of the Key',
    description: '魔法钥匙带孩子们回到了过去，探索历史的奥秘。',
    coverColor: 'bg-indigo-500',
    tags: ['Fantasy', 'History', 'Time Travel']
  },
  {
    id: 'ox-l6-1',
    series: 'Oxford',
    level: 'Level 6',
    title: 'In the Garden',
    description: '花园里的秘密冒险，发现大自然的奇妙。',
    coverColor: 'bg-blue-600',
    tags: ['Nature', 'Adventure']
  },
    {
    id: 'ox-l9-1',
    series: 'Oxford',
    level: 'Level 9',
    title: 'The Quest',
    description: '更复杂的冒险故事，文字量增加，情节更加曲折。',
    coverColor: 'bg-purple-500',
    tags: ['Fantasy', 'Quest', 'Chapter Book']
  },

  // RAZ (Reading A-Z)
  {
    id: 'raz-aa-1',
    series: 'RAZ',
    level: 'aa',
    title: 'Summer Picnic',
    description: '夏季野餐的乐趣，学习基础名词和简单句型。',
    coverColor: 'bg-green-200',
    tags: ['Non-fiction', 'Summer', 'Food']
  },
  {
    id: 'raz-a-1',
    series: 'RAZ',
    level: 'A-B',
    title: 'Animals in the Zoo',
    description: '认识动物园里的各种动物，扩展基础词汇。',
    coverColor: 'bg-green-300',
    tags: ['Non-fiction', 'Animals', 'Nature']
  },
  {
    id: 'raz-c-1',
    series: 'RAZ',
    level: 'C-D',
    title: 'How Plants Grow',
    description: '了解植物生长的过程，科普入门。',
    coverColor: 'bg-green-400',
    tags: ['Science', 'Plants', 'Nature']
  },
  {
    id: 'raz-e-1',
    series: 'RAZ',
    level: 'E-F',
    title: 'The Solar System',
    description: '探索太阳系的奥秘，认识行星。',
    coverColor: 'bg-green-500',
    tags: ['Science', 'Space', 'Astronomy']
  },
  {
    id: 'raz-g-1',
    series: 'RAZ',
    level: 'G',
    title: 'All About Spiders',
    description: '关于蜘蛛的一切，适合对生物感兴趣的孩子。',
    coverColor: 'bg-teal-400',
    tags: ['Science', 'Insects', 'Biology']
  },
   {
    id: 'raz-k-1',
    series: 'RAZ',
    level: 'K',
    title: 'Volcanoes',
    description: '深入了解火山的成因和危害，地理科普。',
    coverColor: 'bg-teal-600',
    tags: ['Geography', 'Earth Science']
  },

  // Heinemann (海尼曼)
  {
    id: 'hei-gk-1',
    series: 'Heinemann',
    level: 'GK (Level A)',
    title: 'At the Market',
    description: '在市场买东西，重复句型 "I see..."。',
    coverColor: 'bg-orange-200',
    tags: ['Life', 'Shopping', 'Vocabulary']
  },
  {
    id: 'hei-gk-2',
    series: 'Heinemann',
    level: 'GK (Level B-C)',
    title: 'Rex',
    description: '关于一只叫 Rex 的恐龙的有趣小故事。',
    coverColor: 'bg-orange-300',
    tags: ['Fiction', 'Dinosaurs', 'Humor']
  },
  {
    id: 'hei-g1-1',
    series: 'Heinemann',
    level: 'G1 (Level B-D)',
    title: 'The Little Red Hen',
    description: '经典童话故事改编，适合初级阅读者。',
    coverColor: 'bg-orange-400',
    tags: ['Folktale', 'Moral', 'Classic']
  },
  {
    id: 'hei-g2-1',
    series: 'Heinemann',
    level: 'G2 (Level C-D)',
    title: 'Mice Squeak, We Speak',
    description: '比较动物和人类的声音，富有韵律感。',
    coverColor: 'bg-orange-500',
    tags: ['Poetry', 'Animals', 'Sounds']
  }
];

// 获取特定级别的推荐图书
export function getRecommendedBooks(
  oxfordLevel: string,
  razLevel: string,
  heinemannLevel: string
): BookRecommendation[] {
  return bookRecommendations.filter(book => {
    if (book.series === 'Oxford' && book.level === oxfordLevel) return true;
    
    // RAZ 匹配逻辑 (简化版：包含匹配)
    if (book.series === 'RAZ') {
       // 如果数据里的 level 是 "A-B"，而传入的 razLevel 是 "A-B" 或 "A" 或 "B"，则匹配
       // 这里简单处理：直接全等，或者包含关系
       return book.level === razLevel || razLevel.includes(book.level) || book.level.includes(razLevel);
    }

    // 海尼曼匹配逻辑
    if (book.series === 'Heinemann') {
        return book.level === heinemannLevel;
    }

    return false;
  });
}
