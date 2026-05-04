import { useState, useCallback } from 'react';

const NOTES_KEY_PREFIX = 'vps_guide_notes_';

interface NoteData {
  content: string;
  updatedAt: string;
}

function loadNote(lessonId: string): NoteData | null {
  try {
    const raw = localStorage.getItem(NOTES_KEY_PREFIX + lessonId);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function saveNote(lessonId: string, content: string, updatedAt: string): void {
  localStorage.setItem(
    NOTES_KEY_PREFIX + lessonId,
    JSON.stringify({ content, updatedAt })
  );
}

export function useNotes(lessonId: string) {
  const [noteData] = useState<NoteData | null>(() => loadNote(lessonId));
  const [notes, setNotes] = useState<string>(noteData?.content || '');
  const [saving, setSaving] = useState(false);
  const [savedAt, setSavedAt] = useState<string | null>(noteData?.updatedAt || null);

  const save = useCallback((content: string) => {
    setSaving(true);
    const now = new Date().toISOString();
    saveNote(lessonId, content, now);
    setNotes(content);
    setSavedAt(now);
    setSaving(false);
  }, [lessonId]);

  return { notes, error: null, setNotes, saving, savedAt, saveNotes: save, loading: false };
}
