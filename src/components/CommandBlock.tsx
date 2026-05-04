import React, { useState, useCallback } from 'react';
import { Terminal, Copy, Check, Info, AlertTriangle, Monitor } from 'lucide-react';
import type { CommandExample } from '../data/types';

interface ExplanationSection {
  icon: string;
  title: string;
  content: string;
  accentColor: string;    // 左侧色标条颜色
  titleColor: string;     // 标题文字颜色
}

function parseExplanation(text: string): ExplanationSection[] | null {
  const rawLines = text.split('\n').map(l => l.trim()).filter(Boolean);
  if (rawLines.length === 0) return null;

  const rules: {
    keywords: RegExp;
    icon: string;
    title: string;
    accentColor: string;
    titleColor: string;
  }[] = [
    {
      keywords: /^(这是什么|什么是)/,
      icon: '🔍',
      title: '这是什么',
      accentColor: 'bg-sky-400',
      titleColor: 'text-sky-600',
    },
    {
      keywords: /^(为什么要用|为什么)/,
      icon: '💡',
      title: '为什么要用',
      accentColor: 'bg-amber-400',
      titleColor: 'text-amber-600',
    },
    {
      keywords: /^(用了会怎么样|执行结果|结果)/,
      icon: '✅',
      title: '用了会怎么样',
      accentColor: 'bg-emerald-400',
      titleColor: 'text-emerald-600',
    },
    {
      keywords: /^(注意|提醒|警告)/,
      icon: '⚠️',
      title: '注意',
      accentColor: 'bg-rose-400',
      titleColor: 'text-rose-600',
    },
  ];

  const sections: ExplanationSection[] = [];

  for (const line of rawLines) {
    let matched = false;
    for (const rule of rules) {
      if (rule.keywords.test(line)) {
        const content = line.replace(rule.keywords, '').replace(/^[：:]\s*/, '').trim();
        sections.push({
          icon: rule.icon,
          title: rule.title,
          content,
          accentColor: rule.accentColor,
          titleColor: rule.titleColor,
        });
        matched = true;
        break;
      }
    }
    // 未匹配到标签的行，追加到上一个 section
    if (!matched && sections.length > 0) {
      sections[sections.length - 1].content += '\n' + line;
    }
  }

  return sections.length > 0 ? sections : null;
}

type FontSize = 'sm' | 'md' | 'lg';

const SIZE_CONFIG: Record<FontSize, { label: string; cmdClass: string; outputClass: string }> = {
  sm: { label: '小', cmdClass: 'text-sm',  outputClass: 'text-xs' },
  md: { label: '中', cmdClass: 'text-base', outputClass: 'text-sm' },
  lg: { label: '大', cmdClass: 'text-lg',  outputClass: 'text-base' },
};

const NEXT_SIZE: Record<FontSize, FontSize> = { sm: 'md', md: 'lg', lg: 'sm' };
const STORAGE_KEY = 'vps_guide_terminal_font_size';

function getSavedSize(): FontSize {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'sm' || saved === 'md' || saved === 'lg') return saved;
  } catch {}
  return 'md';
}

/**
 * 判断 breakdown.symbol 是否为简单的 $ 命令提示符（重复信息，应跳过展示）
 * 只保留有特殊含义的符号说明，如 # = root提示符
 */
function isTrivialPromptSymbol(symbol: string, meaning: string): boolean {
  if (symbol !== '$') return false;
  const trivial = ['命令提示符', '命令提示符，表示等待你输入命令', '命令提示符，表示等待输入', '本地电脑的命令提示符', '服务器上的命令提示符', '系统命令提示符'];
  return trivial.includes(meaning.trim());
}

export const CommandBlock: React.FC<{ example: CommandExample }> = ({ example }) => {
  const [copied, setCopied] = useState(false);
  const [fontSize, setFontSize] = useState<FontSize>(getSavedSize);
  const sizeCfg = SIZE_CONFIG[fontSize];
  const explanationSections = parseExplanation(example.explanation);

  // 判断是否需要展示"符号含义"卡片
  const showSymbolMeaning = example.breakdown && !isTrivialPromptSymbol(example.breakdown.symbol, example.breakdown.meaning);

  const cycleFontSize = useCallback(() => {
    setFontSize(prev => {
      const next = NEXT_SIZE[prev];
      try { localStorage.setItem(STORAGE_KEY, next); } catch {}
      return next;
    });
  }, []);

  const copyCommand = async () => {
    const text = example.command;
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // HTTP 环境下 Clipboard API 不可用，降级到 execCommand
      const ta = document.createElement('textarea');
      ta.value = text;
      ta.style.position = 'fixed';
      ta.style.opacity = '0';
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className={`mb-6 bg-white rounded-2xl shadow-[4px_4px_0px_0px_rgba(79,70,229,0.2)] border-2 overflow-hidden ${example.dangerous ? 'border-red-400 shadow-[4px_4px_0px_0px_rgba(239,68,68,0.3)]' : 'border-indigo-100'}`}>
      {/* 标题栏 */}
      <div className={`px-4 py-3 text-sm font-medium border-b flex items-center gap-2 ${example.dangerous ? 'bg-red-50 text-red-700 border-red-200' : 'bg-indigo-50 text-indigo-700 border-indigo-100'}`}>
        {example.dangerous ? <AlertTriangle className="w-4 h-4" /> : <Terminal className="w-4 h-4" />}
        {example.description}
      </div>

      {/* 危险警告 */}
      {example.dangerous && (
        <div className="bg-red-50 border-b border-red-200 px-4 py-2 flex items-center gap-2 text-sm text-red-700">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span>危险命令 - 请确认理解后果后再执行，建议先在测试环境验证</span>
        </div>
      )}

      <div className="p-5">
        {/* 终端区域 */}
        <div className="rounded-xl overflow-hidden border border-slate-200 shadow-sm">
          {/* 终端标题栏 - 模拟真实终端 */}
          <div className="bg-slate-700 px-4 py-2 flex items-center gap-2">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
              <div className="w-3 h-3 rounded-full bg-green-400"></div>
            </div>
            <span className="text-slate-400 text-xs ml-2 font-mono flex-1">Terminal</span>
            <button
              onClick={cycleFontSize}
              className="flex items-center gap-1 px-2 py-0.5 rounded hover:bg-slate-600 transition-colors text-slate-300 hover:text-white text-xs font-bold"
              title={`字体大小：当前「${sizeCfg.label}」，点击切换`}
            >
              Aa
              <span className="ml-0.5">{sizeCfg.label}</span>
            </button>
          </div>

          {/* 命令输入区 */}
          <div className="bg-slate-900 px-4 py-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 min-w-0 flex-1">
                <span className="text-emerald-400 font-mono flex-shrink-0">$</span>
                <code className={`text-emerald-300 font-mono break-all ${sizeCfg.cmdClass}`}>{example.command}</code>
              </div>
              <button onClick={copyCommand} className="p-1.5 hover:bg-slate-700 rounded-lg transition-colors flex-shrink-0 ml-3" title="复制命令">
                {copied ? <Check className="w-4 h-4 text-green-400" /> : <Copy className="w-4 h-4 text-slate-400" />}
              </button>
            </div>
          </div>

          {/* 输出区 */}
          {example.output && (
            <div className="bg-slate-800 border-t border-slate-600">
              <div className="px-4 py-1.5 bg-slate-700/50 border-b border-slate-600 flex items-center gap-1.5">
                <Monitor className="w-3 h-3 text-slate-400" />
                <span className="text-slate-400 text-xs font-medium">📤 输出结果</span>
                <span className="ml-auto text-slate-500 text-xs">{sizeCfg.label}</span>
              </div>
              <div className="px-4 py-3">
                <pre className={`text-slate-300 font-mono whitespace-pre-wrap leading-relaxed ${sizeCfg.outputClass}`}>{example.output}</pre>
              </div>
            </div>
          )}
        </div>

        {/* 命令详解 - 侧边色标+白底文档风 */}
        <div className="space-y-3 text-sm mt-4">
          <div className="rounded-xl p-4 border border-slate-100 bg-slate-50/50">
            <h4 className="font-bold text-slate-700 mb-3 flex items-center gap-2">
              <Info className="w-4 h-4 text-indigo-500" />
              命令详解
            </h4>
            {explanationSections ? (
              <div className="space-y-2.5">
                {explanationSections.map((section, i) => (
                  <div
                    key={i}
                    className="flex items-start rounded-lg overflow-hidden bg-white border border-slate-100"
                  >
                    {/* 左侧彩色竖条 */}
                    <div className={`w-1 flex-shrink-0 self-stretch ${section.accentColor}`}></div>
                    <div className="flex-1 px-3.5 py-2.5 min-w-0">
                      <div className={`font-bold text-xs mb-0.5 ${section.titleColor}`}>{section.icon} {section.title}</div>
                      <div className="text-slate-600 text-sm leading-relaxed whitespace-pre-line">{section.content}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-slate-600 space-y-2 whitespace-pre-line leading-relaxed">
                {example.explanation}
              </div>
            )}
          </div>

          {/* 符号含义 & 执行结果 - 过滤掉重复的 $ 命令提示符 */}
          {example.breakdown && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {showSymbolMeaning && (
                <div className="bg-slate-50/80 rounded-xl p-3 border border-slate-100">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">符号含义</span>
                  <p className="text-slate-700 mt-1"><strong className="text-indigo-600">{example.breakdown.symbol}</strong> - {example.breakdown.meaning}</p>
                </div>
              )}
              <div className={`${showSymbolMeaning ? '' : 'md:col-span-2'} bg-slate-50/80 rounded-xl p-3 border border-slate-100`}>
                <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">执行结果</span>
                <p className="text-slate-700 mt-1">{example.breakdown.result}</p>
              </div>
              {example.breakdown.outputExplanation && (
                <div className="md:col-span-2 rounded-xl p-3 border border-slate-100 bg-slate-50/80">
                  <span className="text-xs font-bold text-indigo-500 uppercase tracking-wider">输出解读</span>
                  <p className="text-indigo-800 mt-1">{example.breakdown.outputExplanation}</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
