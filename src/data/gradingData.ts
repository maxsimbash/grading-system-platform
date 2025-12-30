// 全球英语分级体系数据模型 - 以牛津树为主体，通过蓝思值和CEFR进行体系间映射

export interface GradingLevel {
  oxfordLevel: string; // 牛津阅读树级别（主键）
  lexileRange: string; // 蓝思值范围（基于牛津官方数据）
  lexileMin: number; // 蓝思值最小值（用于查询）
  lexileMax: number; // 蓝思值最大值（用于查询）
  cefr: string; // CEFR（根据蓝思值映射）
  chinaStandard: string; // 中国新课标（根据CEFR映射）
  cambridgeExam: string; // 剑桥英语（根据CEFR映射）
  raz: string; // RAZ（根据蓝思值映射）
  heinemann: string; // 海尼曼（根据蓝思值映射）
  recommendedAge: string; // 推荐年龄（基于牛津官方数据）
  recommendedGrade: string; // 对应中国年级（根据CEFR和年龄综合判断）
}

// 数据基于牛津官方对照表，共 20 个级别
// 其他体系通过蓝思值和CEFR进行间接映射对齐
export const gradingLevels: GradingLevel[] = [
  {
    oxfordLevel: "Level 1",
    lexileRange: "BR",
    lexileMin: 0,
    lexileMax: 0,
    cefr: "< A1",
    chinaStandard: "预备级 (感知)",
    cambridgeExam: "Pre-Starters",
    raz: "aa",
    heinemann: "GK (Level A)",
    recommendedAge: "3-4岁",
    recommendedGrade: "学前小班/中班",
  },
  {
    oxfordLevel: "Level 1+",
    lexileRange: "50L-170L",
    lexileMin: 50,
    lexileMax: 170,
    cefr: "< A1",
    chinaStandard: "预备级 (积累)",
    cambridgeExam: "Starters",
    raz: "A-B",
    heinemann: "GK (Level B-C)",
    recommendedAge: "3.5-5岁",
    recommendedGrade: "学前大班",
  },
  {
    oxfordLevel: "Level 2",
    lexileRange: "150L-270L",
    lexileMin: 150,
    lexileMax: 270,
    cefr: "A1",
    chinaStandard: "一级 (起步)",
    cambridgeExam: "Starters",
    raz: "C-D",
    heinemann: "GK (Level C) / G1 (Level A)",
    recommendedAge: "3.5-5岁",
    recommendedGrade: "一年级",
  },
  {
    oxfordLevel: "Level 3",
    lexileRange: "240L-350L",
    lexileMin: 240,
    lexileMax: 350,
    cefr: "A1",
    chinaStandard: "一级 (起步/进阶)",
    cambridgeExam: "Starters / Movers",
    raz: "E-F",
    heinemann: "G1 (Level B-D)",
    recommendedAge: "5-5.5岁",
    recommendedGrade: "一年级/二年级",
  },
  {
    oxfordLevel: "Level 4",
    lexileRange: "300L-380L",
    lexileMin: 300,
    lexileMax: 380,
    cefr: "A1",
    chinaStandard: "一级 (进阶)",
    cambridgeExam: "Movers",
    raz: "G",
    heinemann: "G1 (Level D-E)",
    recommendedAge: "5-5.5岁",
    recommendedGrade: "二年级",
  },
  {
    oxfordLevel: "Level 5",
    lexileRange: "350L-430L",
    lexileMin: 350,
    lexileMax: 430,
    cefr: "A1+",
    chinaStandard: "一级+ (强化)",
    cambridgeExam: "Movers",
    raz: "H",
    heinemann: "G1 (Level E-F)",
    recommendedAge: "5.5-6岁",
    recommendedGrade: "二年级/三年级",
  },
  {
    oxfordLevel: "Level 6",
    lexileRange: "400L-510L",
    lexileMin: 400,
    lexileMax: 510,
    cefr: "A2",
    chinaStandard: "二级 (起步)",
    cambridgeExam: "Flyers",
    raz: "I-J",
    heinemann: "G1 (Level G-H) / G2 (Level B)",
    recommendedAge: "6-6.5岁",
    recommendedGrade: "三年级",
  },
  {
    oxfordLevel: "Level 7",
    lexileRange: "510L-550L",
    lexileMin: 510,
    lexileMax: 550,
    cefr: "A2",
    chinaStandard: "二级 (进阶)",
    cambridgeExam: "Flyers",
    raz: "K",
    heinemann: "G2 (Level C-D)",
    recommendedAge: "6.5-7岁",
    recommendedGrade: "三年级/四年级",
  },
  {
    oxfordLevel: "Level 8",
    lexileRange: "530L-570L",
    lexileMin: 530,
    lexileMax: 570,
    cefr: "A2+",
    chinaStandard: "二级+ (强化)",
    cambridgeExam: "KET (A2 Key)",
    raz: "L",
    heinemann: "G2 (Level E-F)",
    recommendedAge: "7-7.5岁",
    recommendedGrade: "四年级",
  },
  {
    oxfordLevel: "Level 9",
    lexileRange: "550L-600L",
    lexileMin: 550,
    lexileMax: 600,
    cefr: "A2+ / B1",
    chinaStandard: "二级+ (强化) / 三级 (起步)",
    cambridgeExam: "KET (A2 Key)",
    raz: "M",
    heinemann: "G2 (Level G-H)",
    recommendedAge: "7.5-8.5岁",
    recommendedGrade: "四年级/五年级",
  },
  {
    oxfordLevel: "Level 10",
    lexileRange: "590L-650L",
    lexileMin: 590,
    lexileMax: 650,
    cefr: "B1",
    chinaStandard: "三级 (起步)",
    cambridgeExam: "KET / PET",
    raz: "N",
    heinemann: "G2 (Level I-J)",
    recommendedAge: "8-8.5岁",
    recommendedGrade: "五年级",
  },
  {
    oxfordLevel: "Level 11",
    lexileRange: "600L-670L",
    lexileMin: 600,
    lexileMax: 670,
    cefr: "B1",
    chinaStandard: "三级 (起步/进阶)",
    cambridgeExam: "PET (B1 Preliminary)",
    raz: "O",
    heinemann: "G2 (Level K-L)",
    recommendedAge: "8.5-9岁",
    recommendedGrade: "五年级/六年级",
  },
  {
    oxfordLevel: "Level 12",
    lexileRange: "610L-690L",
    lexileMin: 610,
    lexileMax: 690,
    cefr: "B1",
    chinaStandard: "三级 (进阶)",
    cambridgeExam: "PET (B1 Preliminary)",
    raz: "P",
    heinemann: "G2 (Level M-N)",
    recommendedAge: "9-9.5岁",
    recommendedGrade: "六年级",
  },
  {
    oxfordLevel: "Level 13",
    lexileRange: "670L-730L",
    lexileMin: 670,
    lexileMax: 730,
    cefr: "B1+",
    chinaStandard: "三级+ (强化)",
    cambridgeExam: "PET (B1 Preliminary)",
    raz: "Q",
    heinemann: "-",
    recommendedAge: "9.5-10岁",
    recommendedGrade: "六年级/初一",
  },
  {
    oxfordLevel: "Level 14",
    lexileRange: "700L-740L",
    lexileMin: 700,
    lexileMax: 740,
    cefr: "B1+ / B2",
    chinaStandard: "三级+ (强化) / 提高级",
    cambridgeExam: "PET / FCE",
    raz: "R",
    heinemann: "-",
    recommendedAge: "10-10.5岁",
    recommendedGrade: "初一",
  },
  {
    oxfordLevel: "Level 15",
    lexileRange: "710L-750L",
    lexileMin: 710,
    lexileMax: 750,
    cefr: "B2",
    chinaStandard: "提高级",
    cambridgeExam: "FCE (B2 First)",
    raz: "S",
    heinemann: "-",
    recommendedAge: "10.5-11岁",
    recommendedGrade: "初一/初二",
  },
  {
    oxfordLevel: "Level 16",
    lexileRange: "720L-760L",
    lexileMin: 720,
    lexileMax: 760,
    cefr: "B2",
    chinaStandard: "提高级",
    cambridgeExam: "FCE (B2 First)",
    raz: "T",
    heinemann: "-",
    recommendedAge: "10.5-11岁",
    recommendedGrade: "初一/初二",
  },
  {
    oxfordLevel: "Level 17",
    lexileRange: "730L-790L",
    lexileMin: 730,
    lexileMax: 790,
    cefr: "B2",
    chinaStandard: "提高级",
    cambridgeExam: "FCE (B2 First)",
    raz: "U",
    heinemann: "-",
    recommendedAge: "11-12岁",
    recommendedGrade: "初二",
  },
  {
    oxfordLevel: "Level 18",
    lexileRange: "790L-870L",
    lexileMin: 790,
    lexileMax: 870,
    cefr: "B2+",
    chinaStandard: "提高级",
    cambridgeExam: "FCE (B2 First)",
    raz: "V",
    heinemann: "-",
    recommendedAge: "11-12岁",
    recommendedGrade: "初二/初三",
  },
  {
    oxfordLevel: "Level 19",
    lexileRange: "800L-840L",
    lexileMin: 800,
    lexileMax: 840,
    cefr: "B2+",
    chinaStandard: "提高级",
    cambridgeExam: "FCE / CAE",
    raz: "W-X",
    heinemann: "-",
    recommendedAge: "11-12岁",
    recommendedGrade: "初三",
  },
  {
    oxfordLevel: "Level 20",
    lexileRange: "820L-850L",
    lexileMin: 820,
    lexileMax: 850,
    cefr: "B2+",
    chinaStandard: "提高级",
    cambridgeExam: "FCE / CAE",
    raz: "Y-Z",
    heinemann: "-",
    recommendedAge: "11-12岁",
    recommendedGrade: "初三+",
  },
];

// 查询工具函数

/**
 * 根据蓝思值查询推荐级别
 */
export function findLevelByLexile(lexileValue: number): GradingLevel | null {
  // 查找蓝思值范围包含输入值的级别
  const matches = gradingLevels.filter(
    (level) => lexileValue >= level.lexileMin && lexileValue <= level.lexileMax
  );
  // 如果有多个匹配，返回最接近的（中间值最接近的）
  if (matches.length > 0) {
    return matches.reduce((prev, curr) => {
      const prevMid = (prev.lexileMin + prev.lexileMax) / 2;
      const currMid = (curr.lexileMin + curr.lexileMax) / 2;
      return Math.abs(lexileValue - currMid) < Math.abs(lexileValue - prevMid) ? curr : prev;
    });
  }
  return null;
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

/**
 * 根据牛津树级别查询
 */
export function findLevelByOxford(oxfordLevel: string): GradingLevel | null {
  return gradingLevels.find((level) => level.oxfordLevel === oxfordLevel) || null;
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
    id: "oxford-tree",
    name: "牛津阅读树 (Oxford Reading Tree)",
    description:
      "故事性强，人物性格鲜明（Biff, Chip, Kipper），完整的 Level 1-20 体系。蓝思值范围从 BR 到 850L，适合从启蒙到初中阶段的英语学习者。",
    features: [
      "连续剧式人物设定",
      "幽默感强",
      "适合培养阅读兴趣",
      "Fiction 为主",
      "Level 1-20 完整体系",
      "蓝思值范围：BR-850L",
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
