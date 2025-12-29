# 全球英语分级体系查询平台

一个基于《义务教育英语课程标准（2022年版2025年修订）》的交互式英语分级体系对标查询工具，帮助家长和教育工作者快速找到适合孩子的阅读材料。

## 功能特性

### 智能查询工具
- **按蓝思值查询**：输入孩子的蓝思值（如 300L），立即获得推荐级别和对应的各体系读物
- **按年级查询**：输入年级（如"三年级"），查看适合该年级的分级读物推荐

### 完整对标表
- 展示奇奇学 L1-L12 所有级别的完整对标信息
- 包含9个维度：
  - 奇奇学级别
  - 中国新课标
  - 剑桥英语考试
  - CEFR（欧洲语言共同参考框架）
  - 蓝思值范围
  - 牛津阅读树级别
  - RAZ（Reading A-Z）级别
  - 海尼曼分级
  - 推荐年级
- 支持按 CEFR 级别筛选（A1/A2/B1/B2）

### 数据来源
基于奇奇学分级阅读研究团队整理的《全球英语分级体系深度对标报告》，整合了：
- 中国新课标（2022年版2025年修订）
- CEFR 欧洲语言共同参考框架
- 蓝思分级体系（Lexile）
- 牛津阅读树（Oxford Reading Tree）
- RAZ（Reading A-Z）
- 海尼曼分级读物（Heinemann）

## 技术栈

- **前端框架**: React 19 + TypeScript
- **构建工具**: Vite 7
- **样式方案**: Tailwind CSS 4
- **图标库**: Lucide React
- **开发语言**: TypeScript

## 本地开发

### 安装依赖
```bash
pnpm install
```

### 启动开发服务器
```bash
pnpm dev
```

访问 http://localhost:3001 查看网站

### 构建生产版本
```bash
pnpm build
```

## 项目结构

```
grading-system-platform/
├── src/
│   ├── data/
│   │   └── gradingData.ts      # 分级体系数据模型和查询函数
│   ├── App.tsx                  # 主应用组件
│   ├── main.tsx                 # 应用入口
│   └── index.css                # 全局样式
├── public/                      # 静态资源
├── vite.config.ts               # Vite 配置
├── tsconfig.json                # TypeScript 配置
└── package.json                 # 项目依赖
```

## 核心数据结构

### GradingLevel 接口
```typescript
interface GradingLevel {
  qiqixueLevel: string;      // 奇奇学级别
  chinaStandard: string;     // 中国新课标
  cambridgeExam: string;     // 剑桥英语
  cefr: string;              // CEFR
  lexileRange: string;       // 蓝思值范围
  oxfordTree: string;        // 牛津阅读树
  raz: string;               // RAZ
  heinemann: string;         // 海尼曼
  recommendedGrade: string;  // 对应中国年级
  lexileMin: number;         // 蓝思值最小值
  lexileMax: number;         // 蓝思值最大值
}
```

## 查询函数

- `findLevelByLexile(lexileValue: number)` - 根据蓝思值查询推荐级别
- `findLevelsByGrade(grade: string)` - 根据年级查询推荐级别
- `findLevelsByCEFR(cefr: string)` - 根据 CEFR 级别查询
- `findLevelsByCambridge(exam: string)` - 根据剑桥考试查询

## 使用场景

### 家长
- 孩子参加了蓝思测试，想知道应该读什么级别的书
- 孩子在读牛津树 Level 5，想知道对应的 RAZ 级别
- 想了解孩子当前年级应该达到什么水平

### 教育工作者
- 为学生选择合适难度的阅读材料
- 了解不同分级体系之间的对应关系
- 制定分级阅读教学计划

### 教育机构
- 为课程体系设计提供参考
- 帮助家长理解不同分级标准
- 提供专业的阅读规划建议

## 许可证

本项目数据来源于奇奇学分级阅读研究团队，仅供学习和参考使用。

## 联系方式

如有问题或建议，欢迎通过以下方式联系：
- 数据来源：奇奇学分级阅读研究团队
- 技术支持：Manus AI
