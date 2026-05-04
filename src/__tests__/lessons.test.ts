import { describe, it, expect } from 'vitest';
import { lessons } from '../data/lessons';
import { stages } from '../data/stages';
import { quizQuestions } from '../data/quiz';

describe('Lesson data integrity', () => {
  it('has exactly 26 lessons', () => {
    expect(lessons).toHaveLength(26);
  });

  it('all lessons have required fields', () => {
    lessons.forEach(lesson => {
      expect(lesson.id).toBeTruthy();
      expect(lesson.title).toBeTruthy();
      expect(lesson.icon).toBeTruthy();
      expect(lesson.description).toBeTruthy();
      expect(lesson.content).toBeDefined();
      expect(lesson.content.analogy).toBeTruthy();
      expect(lesson.content.explanation).toBeTruthy();
      expect(Array.isArray(lesson.content.terms)).toBe(true);
      expect(Array.isArray(lesson.content.commonMistakes)).toBe(true);
      expect(Array.isArray(lesson.content.bestPractices)).toBe(true);
      expect(Array.isArray(lesson.content.commands)).toBe(true);
    });
  });

  it('all lesson IDs are unique', () => {
    const ids = lessons.map(l => l.id);
    const uniqueIds = new Set(ids);
    expect(uniqueIds.size).toBe(ids.length);
  });

  it('all stage lesson references point to existing lessons', () => {
    const lessonIds = new Set(lessons.map(l => l.id));
    stages.forEach(stage => {
      stage.lessons.forEach(lessonId => {
        expect(lessonIds.has(lessonId)).toBe(true);
      });
    });
  });

  it('all lessons referenced in stages appear exactly once', () => {
    const referencedIds = stages.flatMap(s => s.lessons);
    const idSet = new Set(referencedIds);
    expect(idSet.size).toBe(referencedIds.length);
    expect(idSet.size).toBe(26);
  });

  it('quiz questions reference valid lesson IDs', () => {
    const lessonIds = new Set(lessons.map(l => l.id));
    Object.keys(quizQuestions).forEach(id => {
      expect(lessonIds.has(id)).toBe(true);
    });
  });

  it('quiz questions have non-empty options and valid correctIndex', () => {
    Object.values(quizQuestions).forEach(questions => {
      questions.forEach(q => {
        expect(q.question).toBeTruthy();
        expect(q.options.length).toBeGreaterThanOrEqual(2);
        expect(q.correctIndex).toBeGreaterThanOrEqual(0);
        expect(q.correctIndex).toBeLessThan(q.options.length);
      });
    });
  });
});
