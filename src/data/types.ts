export interface Term {
  name: string;
  fullName: string;
  meaning: string;
}

export interface Tool {
  name: string;
  description: string;
  usage: string;
}

export interface CommandBreakdown {
  symbol: string;
  meaning: string;
  result: string;
  outputExplanation?: string;
}

export interface CommandExample {
  description: string;
  command: string;
  output?: string;
  explanation: string;
  breakdown?: CommandBreakdown;
  /** 标记为危险命令，显示红色警告 */
  dangerous?: boolean;
}

export interface Mistake {
  error: string;
  cause: string;
  /** 预期出现的错误现象（可选） */
  expectedResult?: string;
  /** 详细的恢复步骤（可选） */
  recoveryMethod?: string;
  solution: string;
}

export interface Recommendation {
  scenario: string;
  provider: string;
  config: string;
  reason: string;
  price?: string;
}

export interface LessonContent {
  analogy: string;
  explanation: string;
  terms: Term[];
  tools?: Tool[];
  commands: CommandExample[];
  commonMistakes: Mistake[];
  bestPractices: string[];
  recommendations?: Recommendation[];
}

export interface Lesson {
  id: string;
  title: string;
  icon: string;
  description: string;
  content: LessonContent;
}

export interface Stage {
  id: string;
  title: string;
  icon: string;
  description: string;
  lessons: string[];
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}
