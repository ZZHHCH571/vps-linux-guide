import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Edit, Save, Clock } from 'lucide-react';
import { useNotes } from '../hooks/useNotes';

interface NotesPanelProps {
  lessonId: string;
}

export const NotesPanel: React.FC<NotesPanelProps> = ({ lessonId }) => {
  const { notes, setNotes, saving, savedAt, saveNotes } = useNotes(lessonId);
  const [isEditing, setIsEditing] = useState(false);
  const [localNotes, setLocalNotes] = useState(notes);

  const handleEdit = () => {
    setLocalNotes(notes);
    setIsEditing(true);
  };

  const handleSave = () => {
    saveNotes(localNotes);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setLocalNotes(notes);
    setIsEditing(false);
  };

  return (
    <div className="bg-white rounded-2xl border-2 border-yellow-100 shadow-[4px_4px_0px_0px_rgba(251,191,36,0.15)] overflow-hidden">
      <div className="bg-gradient-to-r from-yellow-50 to-amber-50 px-4 py-3 border-b border-yellow-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Edit className="w-4 h-4 text-yellow-600" />
          <h3 className="font-bold text-yellow-800 text-sm">我的笔记</h3>
        </div>
        <div className="flex items-center gap-2">
          {savedAt && !isEditing && (
            <span className="text-xs text-yellow-600 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              {new Date(savedAt).toLocaleString('zh-CN', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </span>
          )}
          {!isEditing ? (
            <button
              onClick={handleEdit}
              className="text-xs px-2 py-1 rounded-lg bg-yellow-100 text-yellow-700 hover:bg-yellow-200 transition-colors"
            >
              编辑
            </button>
          ) : (
            <div className="flex items-center gap-1">
              <button
                onClick={handleCancel}
                className="text-xs px-2 py-1 rounded-lg bg-slate-100 text-slate-500 hover:bg-slate-200 transition-colors"
              >
                取消
              </button>
              <button
                onClick={handleSave}
                disabled={saving}
                className="text-xs px-2 py-1 rounded-lg bg-yellow-500 text-white hover:bg-yellow-600 transition-colors flex items-center gap-1"
              >
                <Save className="w-3 h-3" />
                {saving ? '保存中...' : '保存'}
              </button>
            </div>
          )}
        </div>
      </div>

      <AnimatePresence mode="wait">
        {isEditing ? (
          <motion.div
            key="editing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4"
          >
            <textarea
              value={localNotes}
              onChange={e => setLocalNotes(e.target.value)}
              placeholder="在这里记录你的学习笔记..."
              className="w-full min-h-[120px] p-3 rounded-xl border border-yellow-200 focus:border-yellow-400 focus:ring-2 focus:ring-yellow-100 outline-none resize-y text-sm text-slate-700 placeholder:text-slate-400"
              autoFocus
            />
          </motion.div>
        ) : (
          <motion.div
            key="viewing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="p-4"
          >
            {notes ? (
              <p className="text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">{notes}</p>
            ) : (
              <p className="text-sm text-slate-400 italic">暂无笔记，点击"编辑"开始记录</p>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
