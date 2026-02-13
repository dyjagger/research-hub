import React, { useState } from 'react';
import InsightCallout from './InsightCallout';

const experiments = [
  {
    id: 'craters',
    title: 'Make Moon Craters!',
    emoji: '🌕',
    time: '30-45 min',
    difficulty: 'Easy',
    scienceTopic: 'How craters form on the Moon and other planets',
    materials: ['Flour (about 3 cups)', 'Cocoa powder or cinnamon (2 tablespoons)', 'A baking pan or shallow box', 'Small rocks, marbles, or bouncy balls (different sizes)', 'A ruler or measuring tape', 'Optional: a phone camera to take photos'],
    instructions: [
      'Fill the baking pan with about 2 inches of flour. Smooth the top flat with a ruler.',
      'Sprinkle a thin layer of cocoa powder or cinnamon on top. This is your "Moon surface"!',
      'Stand above the pan and drop a marble from about 1 foot high. Look at the crater it makes!',
      'Carefully remove the marble. See how the lighter flour splashed out from under the dark layer? That is called "ejecta" — the same thing happens on the real Moon!',
      'Now try dropping objects from different heights (1 foot, 2 feet, 3 feet). How does the crater change?',
      'Try different sized objects. Do bigger rocks make bigger craters?',
      'Measure your craters with the ruler. Which drop made the biggest crater? The deepest?',
      'Take photos of your best craters and compare them to real Moon crater photos online!',
    ],
    whatYouLearn: 'When meteoroids hit the Moon, they create craters just like your marbles did! Bigger objects and faster speeds make bigger craters. The Moon has no atmosphere or weather, so craters from billions of years ago are still there today. Earth has craters too, but wind and rain slowly erase them.',
    funFact: 'The biggest crater on the Moon is the South Pole-Aitken basin — it is 1,550 miles across! That is almost as wide as the entire United States!',
    dadJoke: "Why did the meteorite go to the party? To make an impact!",
    bonusChallenge: 'Try dropping a marble at an angle instead of straight down. Does the crater look different? On the Moon, most craters are round even when the meteoroid comes in at an angle — can you figure out why?',
  },
  {
    id: 'solar-system-scale',
    title: 'Build a Scale Solar System!',
    emoji: '🪐',
    time: '45-60 min',
    difficulty: 'Easy',
    scienceTopic: 'How far apart the planets really are',
    materials: ['A long hallway, sidewalk, or yard (at least 50 feet)', 'Chalk (for sidewalk) or sticky notes (for indoors)', 'A tape measure or yardstick', 'A pencil and paper', 'Small round objects to represent planets (peppercorn, pea, marble, orange, etc.)'],
    instructions: [
      'We will use a scale where the Sun is a basketball (about 9 inches). If you do not have one, just draw a circle that size!',
      'Place your "Sun" at one end of your space.',
      'Mercury: Walk 10 steps from the Sun. Place a tiny pinhead or grain of sand. Mercury is TINY!',
      'Venus: Walk 9 more steps (19 total from Sun). Place a peppercorn.',
      'Earth: Walk 7 more steps (26 total). Place another peppercorn. This is home!',
      'Mars: Walk 14 more steps (40 total). Place a slightly smaller peppercorn.',
      'Jupiter: Walk 55 more steps (95 total). Place a walnut or large marble. Notice the HUGE gap!',
      'Saturn: Walk 67 more steps (162 total). Place a slightly smaller marble or acorn.',
      'Uranus: Walk 143 more steps (305 total). Place a pea.',
      'Neptune: Walk 118 more steps (423 total). Place another pea.',
      'Look back at the Sun from Neptune. It is SO far away! In real life, light takes over 4 hours to travel from the Sun to Neptune!',
    ],
    whatYouLearn: 'Most pictures of the solar system show the planets close together, but in reality, there is a HUGE amount of empty space between them! The inner rocky planets are bunched close to the Sun, but the outer gas giants are incredibly far apart. Space is mostly... space!',
    funFact: 'If the Sun were the size of a basketball, Earth would be a peppercorn 26 yards away, and the nearest star (Proxima Centauri) would be another basketball about 4,300 MILES away!',
    dadJoke: "Why is the solar system so spread out? Because the planets needed their space!",
    bonusChallenge: 'Add Pluto! It would be about 95 more steps past Neptune (518 total). Can you even see the Sun from there?',
  },
  {
    id: 'constellation-viewer',
    title: 'Build a Constellation Viewer!',
    emoji: '⭐',
    time: '30-45 min',
    difficulty: 'Easy',
    scienceTopic: 'Learning to recognize constellation patterns',
    materials: ['Empty toilet paper or paper towel tubes (one per constellation)', 'Aluminum foil', 'A rubber band or tape', 'A pushpin, thumbtack, or sharp pencil', 'A flashlight or phone light', 'Dark room'],
    instructions: [
      'Cut a square of aluminum foil big enough to cover one end of the tube.',
      'Place the foil over one end and secure it with a rubber band or tape.',
      'Using the pushpin, carefully poke holes in the foil in the pattern of a constellation. Start with the Big Dipper — 4 holes for the cup, 3 for the handle!',
      'Go into a dark room. Hold the tube up to a light source (flashlight or lamp) with the foil end facing the light.',
      'Look through the open end of the tube. You should see your constellation glowing!',
      'Make more tubes for different constellations: Orion (7 holes), Cassiopeia (5 holes in a W), the Little Dipper (7 holes).',
      'Challenge: Can you identify which constellation is which without looking at the foil end?',
    ],
    whatYouLearn: 'Constellations are patterns of stars that ancient people connected like dot-to-dot pictures. Different cultures saw different pictures in the same stars! Learning to recognize these patterns helps you navigate the real night sky.',
    funFact: 'Ancient sailors used constellations to navigate the oceans! The North Star (Polaris) in the Little Dipper always points north, so sailors could always find their direction.',
    dadJoke: "What is a constellation's favorite game? Connect the dots!",
    bonusChallenge: 'Take your constellation viewers outside on a clear night. Can you match your tube patterns to the real stars in the sky?',
  },
  {
    id: 'day-night',
    title: 'Day & Night Spinner!',
    emoji: '🌍',
    time: '20-30 min',
    difficulty: 'Very Easy',
    scienceTopic: 'Why we have day and night (Earth\'s rotation)',
    materials: ['A ball (any kind — tennis ball, basketball, orange, or even a balloon)', 'A flashlight or desk lamp', 'A small sticker or piece of tape (to mark "your city")', 'A dark room', 'Optional: a marker to draw continents on the ball'],
    instructions: [
      'Put a small sticker on the ball. This sticker is "your city" on Earth!',
      'Set up the flashlight on a table pointing sideways. This is the Sun!',
      'Hold the ball about 2 feet from the flashlight. Notice how one side is lit up (daytime) and the other side is dark (nighttime).',
      'Find your sticker. Is it on the light side or the dark side? Is it daytime or nighttime in "your city"?',
      'Now slowly spin the ball counterclockwise (to the left when looking from the top). Watch your sticker move from light to dark and back!',
      'One full spin = one full day (24 hours). When your sticker faces the light, it is daytime. When it faces away, it is nighttime!',
      'Try spinning at different speeds. Does the Sun move? Nope! Only Earth spins — the Sun just LOOKS like it moves across our sky!',
      'Now tilt the ball slightly (about 23 degrees). This is how Earth really sits! Notice how the top and bottom get different amounts of light — that is what causes seasons!',
    ],
    whatYouLearn: 'Earth spins on its axis once every 24 hours. The side facing the Sun has daytime, and the side facing away has nighttime. The Sun does not actually move across the sky — it only looks that way because WE are spinning! Earth is also tilted, which is why we have seasons.',
    funFact: 'Earth spins at about 1,000 miles per hour at the equator! You are on a spinning spaceship right now and you cannot even feel it!',
    dadJoke: "Why does the Earth never get dizzy? Because it has been spinning for 4.5 billion years — it is used to it!",
    bonusChallenge: 'Add a second smaller ball on a stick orbiting around the first ball. That is the Moon! Can you make it so the Moon blocks the flashlight light from hitting Earth? Congratulations — you just made a solar eclipse!',
  },
  {
    id: 'comet',
    title: 'Make a Comet in Your Kitchen!',
    emoji: '☄️',
    time: '30-45 min',
    difficulty: 'Easy',
    scienceTopic: 'What comets are made of and how they behave',
    materials: ['Dry ice (a small piece — ask a grown-up! Available at grocery stores) OR regular ice cubes', 'Dirt or sand (about 1 cup)', 'A few drops of soda or carbonated water', 'A splash of soy sauce or dark food coloring', 'A large mixing bowl', 'A spoon', 'Plastic bags and gloves (for dry ice — NEVER touch with bare hands!)', 'A hair dryer (to simulate solar wind)'],
    instructions: [
      '⚠️ IMPORTANT: If using dry ice, a grown-up MUST handle it! Wear gloves! Never touch dry ice with bare hands!',
      'In the bowl, mix together the dirt, a splash of soy sauce (for dark color), and a few drops of soda.',
      'If using dry ice: Have a grown-up add small pieces of dry ice to the mixture. Mix it together quickly with a spoon. The mixture will start to freeze and steam — just like a real comet!',
      'If using regular ice: Crush ice cubes and mix them into the dirt mixture. Pack it into a ball shape and put it in the freezer for 2 hours.',
      'Shape the mixture into a ball. This is your comet nucleus (the solid center)!',
      'Take your comet outside or over a sink. Notice the "steam" coming off it (if using dry ice)? That is like the coma — the cloud of gas around a real comet!',
      'Use the hair dryer to blow air at your comet from one direction. See how the steam/particles blow away from the dryer? That is how the solar wind creates a comet\'s tail! The tail always points AWAY from the Sun!',
      'Watch your comet slowly "melt" and break apart. Real comets do this too — every time they pass close to the Sun, they lose a little bit of material!',
    ],
    whatYouLearn: 'Comets are made of ice, dust, and rock — scientists call them "dirty snowballs"! When a comet gets close to the Sun, the ice starts to melt and creates a glowing cloud (coma) and a long tail. The solar wind pushes the tail so it always points away from the Sun, no matter which direction the comet is moving!',
    funFact: 'Comet tails can be over 100 million miles long — that is longer than the distance from Earth to the Sun!',
    dadJoke: "What did the comet say to Earth? Nothing — it just passed gas!",
    bonusChallenge: 'Observe how your comet gets smaller over time as it melts. Real comets do the same thing! Some comets have broken apart completely after too many trips around the Sun. The dust they leave behind is what causes meteor showers!',
  },
];

function ExperimentCard({ exp, isSelected, onSelect }) {
  return (
    <button
      onClick={onSelect}
      className={`text-left p-4 rounded-xl border transition-all duration-200 ${
        isSelected
          ? 'border-indigo-500/40 bg-indigo-500/10 scale-[1.02] shadow-lg'
          : 'border-gray-800/50 bg-gray-800/20 hover:bg-gray-800/40 hover:scale-[1.01]'
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-3xl">{exp.emoji}</span>
        <div className="min-w-0">
          <p className={`text-sm font-bold ${isSelected ? 'text-white' : 'text-gray-300'}`}>{exp.title}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
              ⏱ {exp.time}
            </span>
            <span className={`text-[9px] px-1.5 py-0.5 rounded-full font-medium border ${
              exp.difficulty === 'Very Easy'
                ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                : 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
            }`}>
              {exp.difficulty}
            </span>
          </div>
          <p className="text-[10px] text-gray-500 mt-1">{exp.scienceTopic}</p>
        </div>
      </div>
    </button>
  );
}

function ExperimentDetail({ exp }) {
  const [step, setStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState({});

  const toggleStep = (idx) => {
    setCompletedSteps(prev => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-300">
      <div className="flex items-center gap-3">
        <div className="w-16 h-16 rounded-full bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-4xl">
          {exp.emoji}
        </div>
        <div>
          <h3 className="text-lg font-bold text-white">{exp.title}</h3>
          <p className="text-xs text-gray-400">{exp.scienceTopic}</p>
          <div className="flex items-center gap-2 mt-1">
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 font-medium">
              ⏱ {exp.time}
            </span>
            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-medium">
              {exp.difficulty}
            </span>
          </div>
        </div>
      </div>

      {/* Materials checklist */}
      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
        <h4 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">📦 What You Need</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
          {exp.materials.map((m, i) => (
            <div key={i} className="flex items-start gap-2 text-sm text-gray-300">
              <span className="text-xs flex-shrink-0 mt-0.5">•</span>
              <span>{m}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Step-by-step instructions */}
      <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4">
        <h4 className="text-xs font-bold text-emerald-400 uppercase tracking-wider mb-3 flex items-center gap-1.5">📋 Instructions</h4>
        <div className="space-y-2">
          {exp.instructions.map((inst, i) => (
            <button
              key={i}
              onClick={() => toggleStep(i)}
              className={`w-full text-left flex items-start gap-3 p-2.5 rounded-lg border transition-all ${
                completedSteps[i]
                  ? 'border-emerald-500/20 bg-emerald-500/5'
                  : 'border-gray-800/30 bg-gray-800/10 hover:bg-gray-800/20'
              }`}
            >
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0 mt-0.5 border transition-all ${
                completedSteps[i]
                  ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                  : 'bg-gray-800 border-gray-700 text-gray-500'
              }`}>
                {completedSteps[i] ? '✓' : i + 1}
              </span>
              <span className={`text-sm leading-relaxed ${completedSteps[i] ? 'text-gray-500 line-through' : 'text-gray-300'}`}>
                {inst}
              </span>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-gray-600 mt-2 text-center">Tap each step when you complete it!</p>
      </div>

      {/* What you learn */}
      <InsightCallout variant="info">
        <p className="font-bold">What You Learn!</p>
        <p>{exp.whatYouLearn}</p>
      </InsightCallout>

      <InsightCallout variant="wow">
        <p className="font-bold">Fun Fact!</p>
        <p>{exp.funFact}</p>
      </InsightCallout>

      {/* Bonus challenge */}
      <div className="bg-purple-500/5 border border-purple-500/20 rounded-xl p-4">
        <div className="flex items-start gap-2.5 text-sm text-purple-300 leading-relaxed">
          <span className="text-lg flex-shrink-0 mt-0.5">🏆</span>
          <div>
            <p className="font-bold">Bonus Challenge!</p>
            <p>{exp.bonusChallenge}</p>
          </div>
        </div>
      </div>

      <InsightCallout variant="joke">
        <p className="font-bold">Dad Joke!</p>
        <p>{exp.dadJoke}</p>
      </InsightCallout>
    </div>
  );
}

export default function SpaceExperiments() {
  const [selected, setSelected] = useState(null);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-black text-white flex items-center gap-2">
          🔬 Space Lab — At-Home Experiments!
        </h2>
        <p className="text-gray-400 text-sm mt-1">
          Become a real space scientist! Pick an experiment below and try it at home. Each one teaches you something amazing about space!
        </p>
      </div>

      <InsightCallout variant="info">
        <p className="font-bold">For Grown-Ups!</p>
        <p>These experiments use common household items and are designed for kids with adult supervision. Each takes 20-60 minutes. Pick whichever one you have the materials for!</p>
      </InsightCallout>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {experiments.map((exp, i) => (
          <ExperimentCard
            key={exp.id}
            exp={exp}
            isSelected={selected === i}
            onSelect={() => setSelected(selected === i ? null : i)}
          />
        ))}
      </div>

      {selected !== null ? (
        <ExperimentDetail exp={experiments[selected]} />
      ) : (
        <div className="text-center py-10 border border-dashed border-gray-800 rounded-xl">
          <span className="text-5xl block mb-3">🧪</span>
          <p className="text-gray-400 text-sm font-medium">Pick an experiment above to get started!</p>
          <p className="text-gray-600 text-xs mt-1">Each one uses things you probably already have at home.</p>
        </div>
      )}
    </div>
  );
}
