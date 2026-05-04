import { useState, useMemo, useCallback } from 'react';

export interface SearchableLesson {
  id: string;
  title: string;
  description: string;
  content?: {
    explanation?: string;
    terms?: { name: string; meaning: string }[];
    commands?: { description: string; command: string }[];
  };
}

export function useSearch(lessons: SearchableLesson[]) {
  const [searchQuery, setSearchQuery] = useState('');

  const searchResults = useMemo(() => {
    if (!searchQuery.trim()) return [];

    const query = searchQuery.toLowerCase().trim();
    const results: Array<{
      lesson: SearchableLesson;
      matches: Array<{ type: string; text: string }>;
      score: number;
    }> = [];

    lessons.forEach(lesson => {
      const matches: Array<{ type: string; text: string }> = [];
      let score = 0;

      if (lesson.title.toLowerCase().includes(query)) {
        matches.push({ type: 'title', text: lesson.title });
        score += 10;
      }

      if (lesson.description.toLowerCase().includes(query)) {
        matches.push({ type: 'description', text: lesson.description });
        score += 5;
      }

      if (lesson.content?.explanation?.toLowerCase().includes(query)) {
        const excerpt = lesson.content.explanation
          .toLowerCase()
          .indexOf(query);
        const start = Math.max(0, excerpt - 30);
        const end = Math.min(
          lesson.content.explanation.length,
          excerpt + query.length + 30
        );
        matches.push({
          type: 'content',
          text: lesson.content.explanation.substring(start, end) + '...',
        });
        score += 3;
      }

      lesson.content?.terms?.forEach(term => {
        if (term.name.toLowerCase().includes(query)) {
          matches.push({ type: 'term', text: `${term.name}: ${term.meaning}` });
          score += 4;
        }
      });

      lesson.content?.commands?.forEach(cmd => {
        if (
          cmd.description.toLowerCase().includes(query) ||
          cmd.command.toLowerCase().includes(query)
        ) {
          matches.push({ type: 'command', text: `${cmd.command} - ${cmd.description}` });
          score += 2;
        }
      });

      if (score > 0) {
        results.push({ lesson, matches, score });
      }
    });

    return results.sort((a, b) => b.score - a.score);
  }, [lessons, searchQuery]);

  const clearSearch = useCallback(() => {
    setSearchQuery('');
  }, []);

  return {
    searchQuery,
    setSearchQuery,
    searchResults,
    clearSearch,
    hasResults: searchResults.length > 0,
  };
}
