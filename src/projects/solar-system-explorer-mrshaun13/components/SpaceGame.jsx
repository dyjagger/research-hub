import React, { useState, useEffect, useCallback, useMemo } from 'react';
import InsightCallout from './InsightCallout';

const GAME_CLUES = [
  { clue: 'I am the closest planet to the Sun and I have no moons!', answer: 'Mercury', emoji: '☿️', hint: 'I am also the smallest planet.' },
  { clue: 'I am the hottest planet even though I am not closest to the Sun!', answer: 'Venus', emoji: '♀️', hint: 'My thick atmosphere traps heat like a blanket.' },
  { clue: 'I am the only planet known to have life!', answer: 'Earth', emoji: '🌍', hint: 'I have one moon and lots of water.' },
  { clue: 'I am called the Red Planet and I have the tallest volcano in the solar system!', answer: 'Mars', emoji: '♂️', hint: 'My volcano Olympus Mons is 3 times taller than Mount Everest!' },
  { clue: 'I am the biggest planet and I have a giant storm called the Great Red Spot!', answer: 'Jupiter', emoji: '♃', hint: 'More than 1,300 Earths could fit inside me!' },
  { clue: 'I have beautiful rings made of ice and rock!', answer: 'Saturn', emoji: '♄', hint: 'I could float in a giant bathtub because I am less dense than water!' },
  { clue: 'I spin on my side like a rolling ball!', answer: 'Uranus', emoji: '⛢', hint: 'I am an ice giant with a blue-green color.' },
  { clue: 'I have the strongest winds in the solar system — over 1,200 mph!', answer: 'Neptune', emoji: '♆', hint: 'I am the farthest planet from the Sun.' },
  { clue: 'I used to be called a planet but now I am a "dwarf planet"!', answer: 'Pluto', emoji: '♇', hint: 'I am smaller than Earth\'s Moon!' },
  { clue: 'I am a star, not a planet, and I contain 99.86% of the solar system\'s mass!', answer: 'The Sun', emoji: '☀️', hint: 'About 1.3 million Earths could fit inside me!' },
  { clue: 'I have 95 known moons — more than any other planet!', answer: 'Saturn', emoji: '♄', hint: 'I am famous for my rings.' },
  { clue: 'I have a day that lasts only about 10 hours — the shortest in the solar system!', answer: 'Jupiter', emoji: '♃', hint: 'I am the largest planet.' },
  { clue: 'One year on me takes 165 Earth years!', answer: 'Neptune', emoji: '♆', hint: 'I am very far from the Sun so my orbit is very long.' },
  { clue: 'I have a heart-shaped glacier on my surface!', answer: 'Pluto', emoji: '♇', hint: 'The New Horizons spacecraft took my photo in 2015.' },
  { clue: 'I rotate backwards compared to most other planets!', answer: 'Venus', emoji: '♀️', hint: 'On me, the Sun rises in the west and sets in the east!' },
  { clue: 'I am known for my Great Dark Spot, a giant storm!', answer: 'Neptune', emoji: '♆', hint: 'I am the windiest planet.' },
  { clue: 'I have the biggest canyon in the solar system — Valles Marineris!', answer: 'Mars', emoji: '♂️', hint: 'This canyon is 10 times longer than the Grand Canyon!' },
  { clue: 'My surface temperature can swing from -280°F at night to 800°F during the day!', answer: 'Mercury', emoji: '☿️', hint: 'I have almost no atmosphere to hold in heat.' },
];

const ALL_ANSWERS = ['Mercury', 'Venus', 'Earth', 'Mars', 'Jupiter', 'Saturn', 'Uranus', 'Neptune', 'Pluto', 'The Sun'];

function shuffleArray(arr) {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

export default function SpaceGame() {
  const [gameState, setGameState] = useState('menu'); // menu, playing, results
  const [questions, setQuestions] = useState([]);
  const [currentQ, setCurrentQ] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [showHint, setShowHint] = useState(false);
  const [selected, setSelected] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [options, setOptions] = useState([]);
  const [totalPlayed, setTotalPlayed] = useState(0);

  const ROUND_SIZE = 8;

  const startGame = useCallback(() => {
    const shuffled = shuffleArray(GAME_CLUES).slice(0, ROUND_SIZE);
    setQuestions(shuffled);
    setCurrentQ(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setShowHint(false);
    setSelected(null);
    setIsCorrect(null);
    setGameState('playing');
  }, []);

  useEffect(() => {
    if (gameState === 'playing' && questions[currentQ]) {
      const correct = questions[currentQ].answer;
      const wrong = shuffleArray(ALL_ANSWERS.filter(a => a !== correct)).slice(0, 3);
      setOptions(shuffleArray([correct, ...wrong]));
      setShowHint(false);
      setSelected(null);
      setIsCorrect(null);
    }
  }, [currentQ, gameState, questions]);

  const handleAnswer = (ans) => {
    if (selected !== null) return;
    setSelected(ans);
    const correct = ans === questions[currentQ].answer;
    setIsCorrect(correct);
    if (correct) {
      const newStreak = streak + 1;
      setScore(s => s + (showHint ? 1 : 2));
      setStreak(newStreak);
      if (newStreak > bestStreak) setBestStreak(newStreak);
    } else {
      setStreak(0);
    }
  };

  const nextQuestion = () => {
    if (currentQ + 1 >= questions.length) {
      setTotalPlayed(t => t + 1);
      setGameState('results');
    } else {
      setCurrentQ(c => c + 1);
    }
  };

  const q = questions[currentQ];
  const maxScore = ROUND_SIZE * 2;

  if (gameState === 'menu') {
    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">🎮 Space Trivia Challenge!</h2>
          <p className="text-gray-400 text-sm mt-1">Test your space knowledge with this fun guessing game!</p>
        </div>

        <div className="text-center py-10 bg-gray-900/50 border border-gray-800/50 rounded-2xl space-y-4">
          <div className="text-6xl animate-bounce">🚀</div>
          <h3 className="text-xl font-black text-white">Ready for Launch?</h3>
          <p className="text-sm text-gray-400 max-w-md mx-auto">
            You will get {ROUND_SIZE} clues about planets and space objects. Read each clue and guess which planet it is describing! Use hints if you get stuck (but you will earn fewer points).
          </p>
          <div className="flex items-center justify-center gap-4 text-xs text-gray-500">
            <span>🎯 No hint = 2 pts</span>
            <span>💡 With hint = 1 pt</span>
            <span>🏆 Max = {maxScore} pts</span>
          </div>
          <button
            onClick={startGame}
            className="mt-4 px-8 py-3 rounded-xl bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-400 transition-all hover:scale-105 shadow-lg shadow-indigo-500/20"
          >
            🚀 Launch Game!
          </button>
          {totalPlayed > 0 && (
            <p className="text-[10px] text-gray-600">Games played: {totalPlayed}</p>
          )}
        </div>

        <InsightCallout variant="info">
          <p className="font-bold">How It Works</p>
          <p>Each round has {ROUND_SIZE} questions pulled randomly from a pool of {GAME_CLUES.length} clues, so every game is different! See if you can beat your high score!</p>
        </InsightCallout>
      </div>
    );
  }

  if (gameState === 'results') {
    const pct = Math.round((score / maxScore) * 100);
    let rank, rankEmoji;
    if (pct >= 90) { rank = 'Space Commander'; rankEmoji = '🌟'; }
    else if (pct >= 70) { rank = 'Astronaut'; rankEmoji = '🚀'; }
    else if (pct >= 50) { rank = 'Space Cadet'; rankEmoji = '👨‍🚀'; }
    else if (pct >= 30) { rank = 'Stargazer'; rankEmoji = '🔭'; }
    else { rank = 'Space Rookie'; rankEmoji = '🌱'; }

    return (
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-black text-white flex items-center gap-2">🎮 Space Trivia Challenge!</h2>
        </div>

        <div className="text-center py-10 bg-gray-900/50 border border-gray-800/50 rounded-2xl space-y-4">
          <div className="text-6xl">{rankEmoji}</div>
          <h3 className="text-xl font-black text-white">Mission Complete!</h3>
          <p className="text-3xl font-black text-indigo-400">{score}/{maxScore} points</p>
          <p className="text-sm text-gray-400">Rank: <span className="text-white font-bold">{rank}</span></p>

          <div className="flex items-center justify-center gap-6 text-xs">
            <div className="text-center">
              <p className="text-lg font-bold text-white">{bestStreak}</p>
              <p className="text-gray-500">Best Streak</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold text-white">{pct}%</p>
              <p className="text-gray-500">Accuracy</p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-3 pt-4">
            <button
              onClick={startGame}
              className="px-6 py-2.5 rounded-xl bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-400 transition-all"
            >
              🔄 Play Again
            </button>
            <button
              onClick={() => setGameState('menu')}
              className="px-6 py-2.5 rounded-xl bg-gray-800 text-gray-300 font-bold text-sm hover:bg-gray-700 transition-all"
            >
              🏠 Menu
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Playing state
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">🎮 Space Trivia Challenge!</h2>
      </div>

      {/* Progress bar */}
      <div className="flex items-center gap-3">
        <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 transition-all duration-500"
            style={{ width: `${((currentQ) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-xs text-gray-500 font-medium tabular-nums">{currentQ + 1}/{questions.length}</span>
        <span className="text-xs text-indigo-400 font-bold tabular-nums">{score} pts</span>
        {streak >= 2 && (
          <span className="text-xs text-amber-400 font-bold animate-pulse">🔥 {streak} streak!</span>
        )}
      </div>

      {/* Question card */}
      <div className="bg-gray-900/50 border border-gray-800/50 rounded-2xl p-6 space-y-5">
        <div className="text-center space-y-3">
          <span className="text-4xl block">{q.emoji}</span>
          <p className="text-lg font-bold text-white leading-relaxed max-w-lg mx-auto">"{q.clue}"</p>
        </div>

        {/* Options */}
        <div className="grid grid-cols-2 gap-2.5 max-w-md mx-auto">
          {options.map((opt) => {
            let cls = 'border-gray-800/50 bg-gray-800/20 hover:bg-gray-800/40 text-gray-300 cursor-pointer hover:scale-[1.02]';
            if (selected !== null) {
              if (opt === q.answer) {
                cls = 'border-emerald-500/40 bg-emerald-500/10 text-emerald-300 scale-[1.02]';
              } else if (opt === selected && !isCorrect) {
                cls = 'border-red-500/40 bg-red-500/10 text-red-300';
              } else {
                cls = 'border-gray-800/30 bg-gray-800/5 text-gray-600';
              }
            }
            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={selected !== null}
                className={`px-4 py-3 rounded-xl border text-sm font-bold transition-all duration-200 ${cls}`}
              >
                {opt}
              </button>
            );
          })}
        </div>

        {/* Hint button */}
        {selected === null && !showHint && (
          <div className="text-center">
            <button
              onClick={() => setShowHint(true)}
              className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
            >
              💡 Need a hint? (−1 point)
            </button>
          </div>
        )}

        {showHint && selected === null && (
          <div className="text-center">
            <p className="text-xs text-amber-400 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2 inline-block">
              💡 Hint: {q.hint}
            </p>
          </div>
        )}

        {/* Feedback */}
        {selected !== null && (
          <div className={`text-center rounded-xl px-4 py-3 text-sm ${
            isCorrect
              ? 'bg-emerald-500/10 text-emerald-300 border border-emerald-500/20'
              : 'bg-amber-500/10 text-amber-300 border border-amber-500/20'
          }`}>
            {isCorrect ? (
              <span>🎉 <strong>Correct!</strong> {showHint ? '+1 point' : '+2 points!'} {streak >= 2 ? `🔥 ${streak} in a row!` : ''}</span>
            ) : (
              <span>💡 The answer is <strong>{q.answer}</strong>! {q.hint}</span>
            )}
          </div>
        )}

        {selected !== null && (
          <div className="text-center">
            <button
              onClick={nextQuestion}
              className="px-6 py-2 rounded-xl bg-indigo-500 text-white font-bold text-sm hover:bg-indigo-400 transition-all"
            >
              {currentQ + 1 >= questions.length ? '🏁 See Results' : '➡️ Next Clue'}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
