import React, { useState } from 'react';
import InsightCallout from './InsightCallout';
import QuizSection from './QuizSection';

const timelineEvents = [
  { year: 1543, title: 'Sun is the Center!', description: 'Nicolaus Copernicus published his idea that Earth and the other planets orbit the Sun — not the other way around! Most people thought Earth was the center of everything.', emoji: '☀️', category: 'Discovery' },
  { year: 1610, title: 'Galileo\'s Telescope', description: 'Galileo Galilei used a telescope to see Jupiter\'s moons, Saturn\'s rings, and craters on our Moon for the first time! This changed everything we knew about space.', emoji: '🔭', category: 'Discovery' },
  { year: 1687, title: 'Gravity Explained!', description: 'Isaac Newton figured out the law of gravity — the force that keeps planets orbiting the Sun and keeps us on the ground. Legend says an apple falling on his head gave him the idea!', emoji: '🍎', category: 'Science' },
  { year: 1781, title: 'Uranus Found!', description: 'William Herschel discovered Uranus — the first planet found using a telescope! Before this, people only knew about the planets you can see with your eyes.', emoji: '⛢', category: 'Discovery' },
  { year: 1846, title: 'Neptune Discovered', description: 'Scientists predicted Neptune existed using math before anyone even saw it! They noticed Uranus was wobbling and figured out another planet\'s gravity was pulling on it.', emoji: '♆', category: 'Discovery' },
  { year: 1930, title: 'Pluto Found!', description: 'Clyde Tombaugh discovered Pluto! It was called the 9th planet for 76 years until scientists decided it was a "dwarf planet" in 2006.', emoji: '♇', category: 'Discovery' },
  { year: 1957, title: 'First Satellite in Space!', description: 'The Soviet Union launched Sputnik — the first human-made object to orbit Earth! It was only the size of a beach ball and beeped as it flew overhead.', emoji: '📡', category: 'Space Race' },
  { year: 1961, title: 'First Human in Space!', description: 'Yuri Gagarin from Russia became the first person ever to go to space! His flight lasted only 108 minutes, but it changed history forever.', emoji: '👨‍🚀', category: 'Space Race' },
  { year: 1969, title: 'Moon Landing!', description: 'Neil Armstrong and Buzz Aldrin became the first humans to walk on the Moon! Armstrong said: "That\'s one small step for man, one giant leap for mankind." About 600 million people watched on TV!', emoji: '🌙', category: 'Space Race' },
  { year: 1971, title: 'First Space Station', description: 'The Soviet Union launched Salyut 1, the first space station! Astronauts could now live and work in space for weeks at a time.', emoji: '🏠', category: 'Space Race' },
  { year: 1977, title: 'Voyager Launches!', description: 'NASA launched Voyager 1 and Voyager 2. They visited Jupiter, Saturn, Uranus, and Neptune, sending back amazing photos. Voyager 1 is now the farthest human-made object from Earth — over 15 billion miles away and still going!', emoji: '🛸', category: 'Exploration' },
  { year: 1990, title: 'Hubble Space Telescope', description: 'NASA launched the Hubble Space Telescope into orbit! It has taken some of the most beautiful and important photos of space ever, helping us see galaxies billions of light-years away.', emoji: '🔭', category: 'Science' },
  { year: 1997, title: 'First Mars Rover!', description: 'NASA\'s Sojourner rover landed on Mars — the first robot to drive around on another planet! It was only the size of a microwave oven.', emoji: '🤖', category: 'Exploration' },
  { year: 1998, title: 'International Space Station', description: 'Construction began on the ISS — a giant space station built by 15 countries working together! Astronauts have lived there continuously since November 2000.', emoji: '🛰️', category: 'Space Race' },
  { year: 2006, title: 'Pluto Reclassified', description: 'Scientists voted to change Pluto from a "planet" to a "dwarf planet." Many people were sad, but Pluto is still awesome! The same year, NASA launched New Horizons to visit Pluto.', emoji: '💔', category: 'Science' },
  { year: 2012, title: 'Curiosity Lands on Mars', description: 'NASA\'s Curiosity rover landed on Mars! It is the size of a car and has been exploring Mars ever since, taking selfies and studying rocks.', emoji: '🚗', category: 'Exploration' },
  { year: 2015, title: 'Pluto Close-Up!', description: 'NASA\'s New Horizons spacecraft flew past Pluto and took the first close-up photos! We discovered Pluto has a heart-shaped glacier and blue skies.', emoji: '💜', category: 'Exploration' },
  { year: 2021, title: 'James Webb Telescope', description: 'NASA launched the James Webb Space Telescope — the most powerful space telescope ever! It can see the first galaxies that formed after the Big Bang, over 13 billion years ago.', emoji: '✨', category: 'Science' },
  { year: 2021, title: 'Ingenuity Flies on Mars!', description: 'NASA\'s Ingenuity helicopter became the first aircraft to fly on another planet! It made its first flight on Mars on April 19, 2021.', emoji: '🚁', category: 'Exploration' },
  { year: 2024, title: 'Artemis Program', description: 'NASA\'s Artemis program is working to send humans back to the Moon — including the first woman and first person of color to walk on the Moon! The goal is to build a permanent Moon base.', emoji: '🚀', category: 'Future' },
];

const CATEGORY_COLORS = {
  Discovery: { bg: 'bg-amber-500/10', text: 'text-amber-400', border: 'border-amber-500/20' },
  Science: { bg: 'bg-blue-500/10', text: 'text-blue-400', border: 'border-blue-500/20' },
  'Space Race': { bg: 'bg-red-500/10', text: 'text-red-400', border: 'border-red-500/20' },
  Exploration: { bg: 'bg-emerald-500/10', text: 'text-emerald-400', border: 'border-emerald-500/20' },
  Future: { bg: 'bg-purple-500/10', text: 'text-purple-400', border: 'border-purple-500/20' },
};

const timelineQuiz = [
  {
    question: 'Who was the first person to walk on the Moon?',
    options: ['Yuri Gagarin', 'Buzz Aldrin', 'Neil Armstrong', 'John Glenn'],
    correct: 2,
    explanation: 'Neil Armstrong was the first person to walk on the Moon on July 20, 1969!',
    coaching: 'Neil Armstrong was the commander of Apollo 11. He stepped onto the Moon first and said his famous words. Buzz Aldrin walked on the Moon too, but Armstrong was first!',
  },
  {
    question: 'What was the first human-made object sent into space?',
    options: ['Hubble Telescope', 'Voyager 1', 'Sputnik', 'Apollo 11'],
    correct: 2,
    explanation: 'Sputnik was launched by the Soviet Union in 1957 — it was the first satellite to orbit Earth!',
    coaching: 'Sputnik was launched on October 4, 1957. It was a small metal sphere about the size of a beach ball that beeped as it orbited Earth. This started the "Space Race" between the US and Soviet Union!',
  },
  {
    question: 'Which spacecraft is the farthest human-made object from Earth?',
    options: ['Hubble Telescope', 'James Webb Telescope', 'Voyager 1', 'New Horizons'],
    correct: 2,
    explanation: 'Voyager 1, launched in 1977, is now over 15 billion miles from Earth and still sending data!',
    coaching: 'Voyager 1 was launched in 1977 and has been traveling through space for almost 50 years! It is now in interstellar space — the space between stars — over 15 billion miles away.',
  },
];

export default function SpaceTimeline() {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(null);

  const categories = ['all', ...Object.keys(CATEGORY_COLORS)];
  const filtered = filter === 'all' ? timelineEvents : timelineEvents.filter(e => e.category === filter);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          🕰️ Space Exploration Timeline
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          From ancient discoveries to modern space missions — see how humans have explored the cosmos!
        </p>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {categories.map(c => {
          const cat = CATEGORY_COLORS[c];
          return (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={`px-2.5 py-1.5 rounded-lg text-[11px] font-bold transition-all capitalize ${
                filter === c
                  ? 'bg-indigo-500 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              {c === 'all' ? '🌌 All' : c}
            </button>
          );
        })}
      </div>

      <div className="relative">
        {/* Timeline line */}
        <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-gradient-to-b from-indigo-500/50 via-purple-500/30 to-gray-800/20" />

        <div className="space-y-3">
          {filtered.map((e, i) => {
            const cat = CATEGORY_COLORS[e.category] || CATEGORY_COLORS.Discovery;
            const isExpanded = expanded === i;
            return (
              <button
                key={`${e.year}-${e.title}`}
                onClick={() => setExpanded(isExpanded ? null : i)}
                className={`w-full text-left relative pl-12 pr-4 py-3 rounded-xl border transition-all duration-200 ${
                  isExpanded
                    ? 'border-indigo-500/30 bg-indigo-500/5'
                    : 'border-gray-800/30 bg-gray-800/10 hover:bg-gray-800/20'
                }`}
              >
                {/* Timeline dot */}
                <div className={`absolute left-3 top-4 w-5 h-5 rounded-full flex items-center justify-center text-xs border-2 ${
                  isExpanded ? 'border-indigo-400 bg-indigo-500/20' : 'border-gray-700 bg-gray-800'
                }`}>
                  <span className="text-[10px]">{e.emoji}</span>
                </div>

                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-black text-indigo-400 tabular-nums">{e.year}</span>
                      <span className={`text-[8px] px-1.5 py-0.5 rounded-full font-medium border ${cat.bg} ${cat.text} ${cat.border}`}>
                        {e.category}
                      </span>
                    </div>
                    <p className="text-sm font-bold text-white mt-0.5">{e.title}</p>
                  </div>
                  <span className="text-gray-600 text-xs flex-shrink-0 mt-1">{isExpanded ? '▼' : '▶'}</span>
                </div>

                {isExpanded && (
                  <p className="text-xs text-gray-400 mt-2 leading-relaxed animate-in fade-in duration-200">
                    {e.description}
                  </p>
                )}
              </button>
            );
          })}
        </div>
      </div>

      <InsightCallout variant="wow">
        <p className="font-bold">Think About This!</p>
        <p>Humans went from first discovering that Earth orbits the Sun (1543) to actually walking on the Moon (1969) in just 426 years. And from the first satellite (1957) to landing on the Moon was only <strong>12 years</strong>! What do you think we will discover in the next 12 years?</p>
      </InsightCallout>

      <QuizSection questions={timelineQuiz} />
    </div>
  );
}
