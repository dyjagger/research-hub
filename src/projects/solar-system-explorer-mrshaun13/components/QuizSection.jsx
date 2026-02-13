import React, { useState } from 'react';

export default function QuizSection({ questions = [] }) {
  const [answers, setAnswers] = useState({});
  const [revealed, setRevealed] = useState({});

  if (!questions.length) return null;

  const handleSelect = (qIdx, optIdx) => {
    if (revealed[qIdx]) return;
    setAnswers(prev => ({ ...prev, [qIdx]: optIdx }));
  };

  const handleCheck = (qIdx) => {
    setRevealed(prev => ({ ...prev, [qIdx]: true }));
  };

  const totalAnswered = Object.keys(revealed).length;
  const totalCorrect = Object.entries(revealed).filter(
    ([qIdx]) => answers[qIdx] === questions[qIdx].correct
  ).length;

  return (
    <div className="mt-8 pt-6 border-t border-gray-800/50">
      <div className="flex items-center gap-2.5 mb-4">
        <span className="text-2xl">🧠</span>
        <div>
          <h3 className="text-sm font-black text-white">Check Your Knowledge!</h3>
          <p className="text-[10px] text-gray-500">See if you remember what you learned on this page.</p>
        </div>
        {totalAnswered > 0 && (
          <span className="ml-auto text-xs font-bold px-2.5 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {totalCorrect}/{totalAnswered} correct
          </span>
        )}
      </div>

      <div className="space-y-4">
        {questions.map((q, qIdx) => {
          const userAnswer = answers[qIdx];
          const isRevealed = revealed[qIdx];
          const isCorrect = userAnswer === q.correct;

          return (
            <div
              key={qIdx}
              className={`rounded-xl border p-4 transition-all duration-300 ${
                isRevealed
                  ? isCorrect
                    ? 'border-emerald-500/30 bg-emerald-500/5'
                    : 'border-amber-500/30 bg-amber-500/5'
                  : 'border-gray-800/50 bg-gray-800/20'
              }`}
            >
              <p className="text-sm font-bold text-white mb-3 flex items-start gap-2">
                <span className="text-indigo-400 flex-shrink-0">Q{qIdx + 1}.</span>
                {q.question}
              </p>

              <div className="space-y-1.5">
                {q.options.map((opt, optIdx) => {
                  const isSelected = userAnswer === optIdx;
                  const isCorrectOption = optIdx === q.correct;
                  let optClass = 'border-gray-800/50 bg-gray-800/10 hover:bg-gray-800/30 text-gray-300 cursor-pointer';

                  if (isRevealed) {
                    if (isCorrectOption) {
                      optClass = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300';
                    } else if (isSelected && !isCorrectOption) {
                      optClass = 'border-red-500/40 bg-red-500/10 text-red-300 line-through';
                    } else {
                      optClass = 'border-gray-800/30 bg-gray-800/5 text-gray-600';
                    }
                  } else if (isSelected) {
                    optClass = 'border-indigo-500/40 bg-indigo-500/10 text-indigo-300 cursor-pointer';
                  }

                  return (
                    <button
                      key={optIdx}
                      onClick={() => handleSelect(qIdx, optIdx)}
                      disabled={isRevealed}
                      className={`w-full text-left flex items-center gap-2.5 px-3 py-2 rounded-lg border text-xs transition-all ${optClass}`}
                    >
                      <span className={`w-5 h-5 rounded-full border flex items-center justify-center text-[10px] font-bold flex-shrink-0 ${
                        isRevealed && isCorrectOption
                          ? 'border-emerald-400 bg-emerald-500/20 text-emerald-300'
                          : isSelected
                            ? 'border-indigo-400 bg-indigo-500/20 text-indigo-300'
                            : 'border-gray-700 text-gray-600'
                      }`}>
                        {isRevealed && isCorrectOption ? '✓' : String.fromCharCode(65 + optIdx)}
                      </span>
                      {opt}
                    </button>
                  );
                })}
              </div>

              {!isRevealed && userAnswer !== undefined && (
                <button
                  onClick={() => handleCheck(qIdx)}
                  className="mt-3 px-4 py-1.5 rounded-lg bg-indigo-500 text-white text-xs font-bold hover:bg-indigo-400 transition-colors"
                >
                  Check Answer
                </button>
              )}

              {isRevealed && (
                <div className={`mt-3 rounded-lg px-3 py-2.5 text-xs leading-relaxed ${
                  isCorrect
                    ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
                    : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
                }`}>
                  {isCorrect ? (
                    <span className="flex items-start gap-2">
                      <span className="text-base">🎉</span>
                      <span><strong>Awesome!</strong> {q.explanation}</span>
                    </span>
                  ) : (
                    <span className="flex items-start gap-2">
                      <span className="text-base">💡</span>
                      <span><strong>Not quite!</strong> {q.coaching}</span>
                    </span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
