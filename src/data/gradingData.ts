// 全球英语分级体系数据模型

export interface GradingLevel {
  qiqixueLevel: string; // 奇奇学级别
  chinaStandard: string; // 中国新课标
  cambridgeExam: string; // 剑桥英语
  cefr: string; // CEFR
  lexileRange: string; // 蓝思值范围
  oxfordTree: string; // 牛津阅读树
  raz: string; // RAZ
  heinemann: string; // 海尼曼
  recommendedGrade: string; // 对应中国年级
  lexileMin: number; // 蓝思值最小值（用于查询）
  lexileMax: number; // 蓝思值最大值（用于查询）
}

export const gradingLevels: GradingLevel[] = [
  {
    qiqixueLevel: "L1",
    chinaStandard: "预备级 (感知)",
    cambridgeExam: "Pre-Starters",
    cefr: "< A1",
    lexileRange: "BR-50L",
    oxfordTree: "Level 1",
    raz: "aa-A",
    heinemann: "GK (Level A)",
    recommendedGrade: "学前小班/中班",
    lexileMin: 0,
    lexileMax: 50,
  },
  {
    qiqixueLevel: "L2",
    chinaStandard: "预备级 (积累)",
    cambridgeExam: "Starters",
    cefr: "< A1",
    lexileRange: "50L-100L",
    oxfordTree: "Level 1+ / 2",
    raz: "B-C",
    heinemann: "GK (Level B-C)",
    recommendedGrade: "学前大班/一年级",
    lexileMin: 50,
    lexileMax: 100,
  },
  {
    qiqixueLevel: "L3",
    chinaStandard: "一级 (起步)",
    cambridgeExam: "Starters",
    cefr: "A1",
    lexileRange: "100L-200L",
    oxfordTree: "Level 3",
    raz: "D-E",
    heinemann: "G1 (Level A-C)",
    recommendedGrade: "二年级",
    lexileMin: 100,
    lexileMax: 200,
  },
  {
    qiqixueLevel: "L4",
    chinaStandard: "一级 (进阶)",
    cambridgeExam: "Movers",
    cefr: "A1",
    lexileRange: "200L-300L",
    oxfordTree: "Level 4",
    raz: "F-G",
    heinemann: "G1 (Level D-F)",
    recommendedGrade: "二年级/三年级",
    lexileMin: 200,
    lexileMax: 300,
  },
  {
    qiqixueLevel: "L5",
    chinaStandard: "一级+ (强化)",
    cambridgeExam: "Movers",
    cefr: "A1+",
    lexileRange: "300L-400L",
    oxfordTree: "Level 5",
    raz: "H-I",
    heinemann: "G1 (Level G-J)",
    recommendedGrade: "三年级",
    lexileMin: 300,
    lexileMax: 400,
  },
  {
    qiqixueLevel: "L6",
    chinaStandard: "二级 (起步)",
    cambridgeExam: "Flyers",
    cefr: "A2",
    lexileRange: "400L-500L",
    oxfordTree: "Level 6",
    raz: "J-K",
    heinemann: "G2 (Level B-E)",
    recommendedGrade: "三年级/四年级",
    lexileMin: 400,
    lexileMax: 500,
  },
  {
    qiqixueLevel: "L7",
    chinaStandard: "二级 (进阶)",
    cambridgeExam: "Flyers",
    cefr: "A2",
    lexileRange: "500L-600L",
    oxfordTree: "Level 7",
    raz: "L-M",
    heinemann: "G2 (Level F-J)",
    recommendedGrade: "四年级",
    lexileMin: 500,
    lexileMax: 600,
  },
  {
    qiqixueLevel: "L8",
    chinaStandard: "二级+ (强化)",
    cambridgeExam: "KET (A2 Key)",
    cefr: "A2+",
    lexileRange: "600L-700L",
    oxfordTree: "Level 8",
    raz: "N-O",
    heinemann: "G2 (Level K-N)",
    recommendedGrade: "五年级",
    lexileMin: 600,
    lexileMax: 700,
  },
  {
    qiqixueLevel: "L9",
    chinaStandard: "三级 (起步)",
    cambridgeExam: "KET (A2 Key)",
    cefr: "B1",
    lexileRange: "700L-800L",
    oxfordTree: "Level 9",
    raz: "P-Q",
    heinemann: "-",
    recommendedGrade: "五年级/六年级",
    lexileMin: 700,
    lexileMax: 800,
  },
  {
    qiqixueLevel: "L10",
    chinaStandard: "三级 (进阶)",
    cambridgeExam: "PET (B1 Preliminary)",
    cefr: "B1",
    lexileRange: "800L-900L",
    oxfordTree: "Level 10+",
    raz: "R-S",
    heinemann: "-",
    recommendedGrade: "六年级",
    lexileMin: 800,
    lexileMax: 900,
  },
  {
    qiqixueLevel: "L11",
    chinaStandard: "三级+ (强化)",
    cambridgeExam: "PET (B1 Preliminary)",
    cefr: "B1+",
    lexileRange: "900L-1000L",
    oxfordTree: "Level 11+",
    raz: "T-U",
    heinemann: "-",
    recommendedGrade: "初一",
    lexileMin: 900,
    lexileMax: 1000,
  },
  {
    qiqixueLevel: "L12",
    chinaStandard: "提高级",
    cambridgeExam: "FCE (B2 First)",
    cefr: "B2",
    lexileRange: "1000L+",
    oxfordTree: "Level 12+",
    raz: "V-Z",
    heinemann: "-",
    recommendedGrade: "初二+",
    lexileMin: 1000,
    lexileMax: 1500,
  },
];

// 查询工具函数

/**
 * 根据蓝思值查询推荐级别
 */
export function findLevelByLexile(lexileValue: number): GradingLevel | null {
  return (
    gradingLevels.find(
      (level) => lexileValue >= level.lexileMin && lexileValue <= level.lexileMax
    ) || null
  );
}

/**
 * 根据年级查询推荐级别
 */
export function findLevelsByGrade(grade: string): GradingLevel[] {
  return gradingLevels.filter((level) =>
    level.recommendedGrade.includes(grade)
  );
}

/**
 * 根据 CEFR 级别查询
 */
export function findLevelsByCEFR(cefr: string): GradingLevel[] {
  return gradingLevels.filter((level) => level.cefr.includes(cefr));
}

/**
 * 根据剑桥考试查询
 */
export function findLevelsByCambridge(exam: string): GradingLevel[] {
  return gradingLevels.filter((level) =>
    level.cambridgeExam.toLowerCase().includes(exam.toLowerCase())
  );
}

// 体系详情数据

export interface SystemInfo {
  id: string;
  name: string;
  description: string;
  features: string[];
  website?: string;
}

export const systemsInfo: SystemInfo[] = [
  {
    id: "china-standard",
    name: "中国新课标 (2022年版2025年修订)",
    description:
      "新课标将义务教育阶段的英语课程目标分为三级，并提出了'预备级'以适应学前及低年级需求。",
    features: [
      "预备级：感知语音，积累基础词汇，培养阅读兴趣",
      "一级：识别拼读规则，理解简单句，约500词",
      "二级：理解段落大意，借助图片推断，约800-1000词",
      "三级：分析语篇结构，评价观点，约1600-2000词",
    ],
  },
  {
    id: "lexile",
    name: "蓝思分级体系 (Lexile)",
    description:
      "蓝思值是全球通用的文本难度衡量标准，主要基于词汇频率和句法复杂度。",
    features: [
      "BR (Beginning Reader)：零基础",
      "200L-500L：小学中低年级，句式简单",
      "500L-800L：小学高年级至初中，开始出现从句",
      "800L+：初中及以上，文本结构复杂",
    ],
    website: "https://lexile.com/",
  },
  {
    id: "oxford-tree",
    name: "牛津阅读树 (Oxford Reading Tree)",
    description:
      "故事性强，人物性格鲜明（Biff, Chip, Kipper），难度曲线L1-L3坡度极缓，L4-L6难度适中，L7-L9难度跃升明显。",
    features: [
      "连续剧式人物设定",
      "幽默感强",
      "适合培养阅读兴趣",
      "Fiction 为主",
    ],
  },
  {
    id: "raz",
    name: "RAZ (Reading A-Z)",
    description:
      "体系严密，Non-fiction占比高，百科知识丰富，aa-Z呈线性均匀递增，螺旋式上升。",
    features: [
      "科学的知识点铺陈",
      "词汇复现机制",
      "Non-fiction 占比高",
      "适合扩展知识面",
    ],
  },
  {
    id: "heinemann",
    name: "海尼曼 (Heinemann)",
    description: "低级别句型重复度高，适合'开口'练习，帮助孩子建立语感。",
    features: [
      "句型操练模式",
      "高重复性",
      "强图片辅助",
      "适合启蒙阶段",
    ],
  },
];
