import { describe, it, expect } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { useSearch, type SearchableLesson } from '../hooks/useSearch';

const mockLessons: SearchableLesson[] = [
  {
    id: 'what-is-vps',
    title: '什么是VPS',
    description: '零基础入门',
    content: {
      explanation: 'VPS是虚拟专用服务器',
      terms: [{ name: 'VPS', meaning: '虚拟专用服务器' }],
      commands: [{ description: '列出文件', command: 'ls' }],
    },
  },
  {
    id: 'nginx',
    title: 'Nginx部署',
    description: 'Web服务器配置',
    content: {
      explanation: 'Nginx是高性能Web服务器',
      terms: [{ name: '反向代理', meaning: '代理服务器接收请求后转发' }],
    },
  },
];

describe('useSearch', () => {
  it('returns empty results for empty query', () => {
    const { result } = renderHook(() => useSearch(mockLessons));
    expect(result.current.searchResults).toEqual([]);
  });

  it('finds lessons by title match', () => {
    const { result } = renderHook(() => useSearch(mockLessons));
    act(() => result.current.setSearchQuery('VPS'));
    expect(result.current.searchResults).toHaveLength(1);
    expect(result.current.searchResults[0].lesson.id).toBe('what-is-vps');
  });

  it('finds lessons by description match', () => {
    const { result } = renderHook(() => useSearch(mockLessons));
    act(() => result.current.setSearchQuery('入门'));
    expect(result.current.searchResults).toHaveLength(1);
  });

  it('finds lessons by term match', () => {
    const { result } = renderHook(() => useSearch(mockLessons));
    act(() => result.current.setSearchQuery('反向代理'));
    expect(result.current.searchResults).toHaveLength(1);
    expect(result.current.searchResults[0].lesson.id).toBe('nginx');
  });

  it('finds lessons by command match', () => {
    const { result } = renderHook(() => useSearch(mockLessons));
    act(() => result.current.setSearchQuery('ls'));
    expect(result.current.searchResults).toHaveLength(1);
  });

  it('scores title matches higher than description matches', () => {
    const { result } = renderHook(() => useSearch(mockLessons));
    act(() => result.current.setSearchQuery('nginx'));
    expect(result.current.searchResults[0].score).toBeGreaterThanOrEqual(10);
  });

  it('returns empty results for no match', () => {
    const { result } = renderHook(() => useSearch(mockLessons));
    act(() => result.current.setSearchQuery('zzznotfound'));
    expect(result.current.searchResults).toHaveLength(0);
  });

  it('clearSearch resets query', () => {
    const { result } = renderHook(() => useSearch(mockLessons));
    act(() => result.current.setSearchQuery('VPS'));
    act(() => result.current.clearSearch());
    expect(result.current.searchQuery).toBe('');
  });
});
