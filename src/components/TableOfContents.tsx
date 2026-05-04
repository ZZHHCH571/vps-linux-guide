import React, { useEffect, useState } from 'react';
import { Lesson } from '../data/types';

interface TableOfContentsProps {
  lesson: Lesson;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({ lesson }) => {
  const [activeId, setActiveId] = useState('');
  const sections = buildSections(lesson);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      { rootMargin: '-80px 0px -70% 0px' }
    );

    sections.forEach((section) => {
      const el = document.getElementById(section.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [sections]);

  if (sections.length < 3) return null;

  return (
    <nav className="sticky top-24 bg-white rounded-2xl p-4 border-2 border-slate-100 shadow-sm">
      <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">本节目录</h3>
      <ul className="space-y-1">
        {sections.map((section) => (
          <li key={section.id}>
            <a
              href={`#${section.id}`}
              className={`block text-sm py-1.5 px-2 rounded-lg transition-colors ${
                activeId === section.id
                  ? 'bg-indigo-50 text-indigo-600 font-medium'
                  : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
              }`}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export interface TocSection {
  id: string;
  label: string;
}

export function buildSections(lesson: Lesson): TocSection[] {
  const sections: TocSection[] = [];

  sections.push({ id: 'section-analogy', label: '生活化类比' });
  sections.push({ id: 'section-explanation', label: '概念详解' });

  if (lesson.content.terms.length > 0) {
    sections.push({ id: 'section-terms', label: '关键术语' });
  }
  if (lesson.content.tools && lesson.content.tools.length > 0) {
    sections.push({ id: 'section-tools', label: '实用工具' });
  }
  if (lesson.content.recommendations && lesson.content.recommendations.length > 0) {
    sections.push({ id: 'section-recommendations', label: '购买推荐' });
  }
  if (lesson.content.commands.length > 0) {
    sections.push({ id: 'section-commands', label: '命令演示' });
  }
  sections.push({ id: 'section-mistakes', label: '常见错误' });
  sections.push({ id: 'section-best-practices', label: '最佳实践' });

  return sections;
}
