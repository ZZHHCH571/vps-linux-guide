import React, { useState, useMemo, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle, XCircle, Award, RotateCcw, Trophy } from 'lucide-react';
import { quizQuestions } from '../data/quiz';
import { useQuizResults } from '../hooks/useQuizResults';

interface QuizProps {
  lessonId: string;
}

export const Quiz: React.FC<QuizProps> = ({ lessonId }) => {
  const questions = quizQuestions[lessonId];
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const { bestScore, saveScore } = useQuizResults(lessonId);

  const score = useMemo(() => {
    if (!questions || !submitted) return null;
    let correct = 0;
    questions.forEach((q, i) => {
      if (answers[i] === q.correctIndex) correct++;
    });
    return { correct, total: questions.length };
  }, [questions, answers, submitted]);

  useEffect(() => {
    if (submitted && score) {
      saveScore(score.correct, score.total);
    }
  }, [submitted, score, saveScore]);

  if (!questions || questions.length === 0) return null;

  const handleSelect = (qIdx: number, oIdx: number) => {
    if (submitted) return;
    setAnswers(prev => ({ ...prev, [qIdx]: oIdx }));
  };

  const handleSubmit = () => {
    if (Object.keys(answers).length < questions.length) return;
    setSubmitted(true);
  };

  const handleReset = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const allAnswered = Object.keys(answers).length === questions.length;

  return (
    <div className="bg-white rounded-2xl border-2 border-purple-100 shadow-[4px_4px_0px_0px_rgba(147,51,234,0.15)] overflow-hidden">
      <div className="bg-gradient-to-r from-purple-50 to-violet-50 px-4 py-3 border-b border-purple-100 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Award className="w-4 h-4 text-purple-600" />
          <h3 className="font-bold text-purple-800 text-sm">课后小测</h3>
          {bestScore && !submitted && (
            <span className="text-xs text-purple-500 bg-purple-100 px-2 py-0.5 rounded-full flex items-center gap-1">
              <Trophy className="w-3 h-3" />
              最佳: {bestScore.score}/{bestScore.total}
            </span>
          )}
        </div>
        {submitted && score && (
          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            score.correct === score.total
              ? 'bg-green-100 text-green-700'
              : score.correct >= score.total / 2
              ? 'bg-yellow-100 text-yellow-700'
              : 'bg-red-100 text-red-700'
          }`}>
            {score.correct} / {score.total} 正确
          </span>
        )}
      </div>

      <div className="p-4 space-y-4">
        {questions.map((q, qIdx) => (
          <div key={qIdx} className="space-y-2">
            <p className="text-sm font-medium text-slate-700">
              {qIdx + 1}. {q.question}
            </p>
            <div className="grid gap-1.5">
              {q.options.map((opt, oIdx) => {
                const isSelected = answers[qIdx] === oIdx;
                const isCorrect = oIdx === q.correctIndex;
                let borderClass = 'border-slate-200 hover:border-purple-300';
                let bgClass = 'bg-white hover:bg-purple-50';
                let textClass = 'text-slate-600';
                let icon = null;

                if (submitted) {
                  if (isCorrect) {
                    borderClass = 'border-green-300';
                    bgClass = 'bg-green-50';
                    textClass = 'text-green-700';
                    icon = <CheckCircle className="w-4 h-4 text-green-500" />;
                  } else if (isSelected && !isCorrect) {
                    borderClass = 'border-red-300';
                    bgClass = 'bg-red-50';
                    textClass = 'text-red-700';
                    icon = <XCircle className="w-4 h-4 text-red-500" />;
                  }
                } else if (isSelected) {
                  borderClass = 'border-purple-400';
                  bgClass = 'bg-purple-50';
                  textClass = 'text-purple-700';
                }

                return (
                  <button
                    key={oIdx}
                    onClick={() => handleSelect(qIdx, oIdx)}
                    disabled={submitted}
                    className={`flex items-center gap-2 p-2.5 rounded-xl border-2 text-sm text-left transition-colors ${borderClass} ${bgClass} ${textClass} ${submitted ? 'cursor-default' : 'cursor-pointer'}`}
                  >
                    <span className={`w-6 h-6 rounded-lg flex items-center justify-center text-xs font-bold flex-shrink-0 ${
                      submitted && isCorrect ? 'bg-green-200 text-green-700' :
                      submitted && isSelected && !isCorrect ? 'bg-red-200 text-red-700' :
                      isSelected ? 'bg-purple-200 text-purple-700' : 'bg-slate-100 text-slate-500'
                    }`}>
                      {String.fromCharCode(65 + oIdx)}
                    </span>
                    <span className="flex-1">{opt}</span>
                    {icon}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div className="px-4 py-3 border-t border-purple-100 bg-purple-50/50 flex justify-between items-center">
        <p className="text-xs text-purple-600">
          {submitted
            ? score && score.correct === score.total
              ? '全部正确，太棒了！'
              : '查看正确答案，再试一次吧'
            : allAnswered
            ? '准备好了就提交吧'
            : `请回答所有题目 (${Object.keys(answers).length}/${questions.length})`}
        </p>
        <div className="flex items-center gap-2">
          {submitted && (
            <button
              onClick={handleReset}
              className="flex items-center gap-1 text-xs px-3 py-1.5 rounded-lg bg-slate-100 text-slate-600 hover:bg-slate-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              重做
            </button>
          )}
          {!submitted && (
            <button
              onClick={handleSubmit}
              disabled={!allAnswered}
              className={`text-xs px-4 py-1.5 rounded-lg font-medium transition-all ${
                allAnswered
                  ? 'bg-purple-500 text-white hover:bg-purple-600'
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'
              }`}
            >
              提交
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
