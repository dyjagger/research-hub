// Space Records & Extremes — data for varied chart visualizations

export const planetRadarData = [
  { stat: 'Size', Mercury: 4, Venus: 87, Earth: 92, Mars: 49, Jupiter: 1029, Saturn: 838, Uranus: 365, Neptune: 354 },
  { stat: 'Gravity', Mercury: 38, Venus: 90, Earth: 100, Mars: 38, Jupiter: 253, Saturn: 107, Uranus: 89, Neptune: 114 },
  { stat: 'Moons', Mercury: 0, Venus: 0, Earth: 4, Mars: 8, Jupiter: 95, Saturn: 100, Uranus: 45, Neptune: 28 },
  { stat: 'Day Length', Mercury: 100, Venus: 100, Earth: 4, Mars: 4, Jupiter: 2, Saturn: 2, Uranus: 3, Neptune: 3 },
  { stat: 'Distance', Mercury: 4, Venus: 7, Earth: 10, Mars: 15, Jupiter: 52, Saturn: 95, Uranus: 192, Neptune: 300 },
];

export const moonCountData = [
  { name: 'Saturn', moons: 146, emoji: '🪐', color: '#F59E0B' },
  { name: 'Jupiter', moons: 95, emoji: '♃', color: '#EF4444' },
  { name: 'Uranus', moons: 28, emoji: '⛢', color: '#06B6D4' },
  { name: 'Neptune', moons: 16, emoji: '♆', color: '#3B82F6' },
  { name: 'Mars', moons: 2, emoji: '♂️', color: '#F97316' },
  { name: 'Earth', moons: 1, emoji: '🌍', color: '#10B981' },
  { name: 'Pluto', moons: 5, emoji: '♇', color: '#8B5CF6' },
  { name: 'Venus', moons: 0, emoji: '♀️', color: '#EC4899' },
  { name: 'Mercury', moons: 0, emoji: '☿️', color: '#6B7280' },
];

export const dayLengthData = [
  { name: 'Jupiter', hours: 9.93, label: '~10 hours', color: '#EF4444' },
  { name: 'Saturn', hours: 10.7, label: '~10.7 hours', color: '#F59E0B' },
  { name: 'Neptune', hours: 16.1, label: '~16 hours', color: '#3B82F6' },
  { name: 'Uranus', hours: 17.2, label: '~17 hours', color: '#06B6D4' },
  { name: 'Earth', hours: 24, label: '24 hours', color: '#10B981' },
  { name: 'Mars', hours: 24.6, label: '~24.6 hours', color: '#F97316' },
  { name: 'Pluto', hours: 153.3, label: '~6.4 days', color: '#8B5CF6' },
  { name: 'Mercury', hours: 1407.6, label: '~58.6 days', color: '#6B7280' },
  { name: 'Venus', hours: 5832, label: '~243 days', color: '#EC4899' },
];

export const yearLengthData = [
  { name: 'Mercury', days: 88, years: 0.24 },
  { name: 'Venus', days: 225, years: 0.62 },
  { name: 'Earth', days: 365, years: 1 },
  { name: 'Mars', days: 687, years: 1.88 },
  { name: 'Jupiter', days: 4333, years: 11.86 },
  { name: 'Saturn', days: 10759, years: 29.46 },
  { name: 'Uranus', days: 30687, years: 84.01 },
  { name: 'Neptune', days: 60190, years: 164.8 },
  { name: 'Pluto', days: 90560, years: 248.0 },
];

export const atmosphereData = [
  { name: 'Mercury', type: 'None', description: 'Almost no atmosphere at all!', color: '#6B7280', thickness: 0 },
  { name: 'Venus', type: 'Super Thick', description: '96.5% carbon dioxide — crushingly heavy!', color: '#EC4899', thickness: 100 },
  { name: 'Earth', type: 'Just Right', description: '78% nitrogen, 21% oxygen — perfect for us!', color: '#10B981', thickness: 40 },
  { name: 'Mars', type: 'Very Thin', description: '95% carbon dioxide — way too thin to breathe', color: '#F97316', thickness: 5 },
  { name: 'Jupiter', type: 'Massive Gas', description: 'Hydrogen and helium — no solid surface!', color: '#EF4444', thickness: 95 },
  { name: 'Saturn', type: 'Massive Gas', description: 'Hydrogen and helium — also no solid surface!', color: '#F59E0B', thickness: 90 },
  { name: 'Uranus', type: 'Ice Giant', description: 'Hydrogen, helium, and methane (makes it blue!)', color: '#06B6D4', thickness: 85 },
  { name: 'Neptune', type: 'Ice Giant', description: 'Hydrogen, helium, and methane (also blue!)', color: '#3B82F6', thickness: 85 },
];

export const windSpeedData = [
  { name: 'Neptune', speed: 1200, label: '1,200 mph', emoji: '🌪️', vehicle: '🏎️ Porsche 911 Turbo S', vehicleShort: '🏎️', quarterMile: 10.1 },
  { name: 'Saturn', speed: 1100, label: '1,100 mph', emoji: '💨', vehicle: '💪 Dodge Challenger Hellcat', vehicleShort: '💪', quarterMile: 11.0 },
  { name: 'Uranus', speed: 560, label: '560 mph', emoji: '💨', vehicle: '🐴 Quarter Horse at Full Gallop', vehicleShort: '🐴', quarterMile: 21.6 },
  { name: 'Jupiter', speed: 384, label: '384 mph', emoji: '🌀', vehicle: '🏍️ Sport Motorcycle', vehicleShort: '🏍️', quarterMile: 31.5 },
  { name: 'Earth', speed: 253, label: '253 mph (record)', emoji: '🌍', vehicle: '🏁 Kid in a Go-Kart (~19 mph)', vehicleShort: '🏁', quarterMile: 47.8 },
  { name: 'Venus', speed: 224, label: '224 mph', emoji: '🌫️', vehicle: '🚲 Kid on a Bicycle (~17 mph)', vehicleShort: '🚲', quarterMile: 54.0 },
  { name: 'Mars', speed: 60, label: '60 mph', emoji: '🏜️', vehicle: '🏃 Person Jogging Slowly', vehicleShort: '🏃', quarterMile: 202 },
];

export const yearRatioExamples = [
  { earthTime: '1 school day (7 hrs)', mercury: '~1.9 days', venus: '~11.3 hours', mars: '~13.2 hours', jupiter: '~2.9 days', saturn: '~8.6 days', neptune: '~48 days', pluto: '~72 days' },
  { earthTime: '20 min of video games', mercury: '~55 min', venus: '~32 min', mars: '~38 min', jupiter: '~4 hours', saturn: '~10 hours', neptune: '~2.3 days', pluto: '~3.4 days' },
  { earthTime: 'Summer break (10 weeks)', mercury: '~42 weeks', venus: '~16 weeks', mars: '~19 weeks', jupiter: '~2.3 years', saturn: '~5.7 years', neptune: '~32 years', pluto: '~48 years' },
  { earthTime: 'Your whole life so far (10 yrs)', mercury: '~42 years', venus: '~16 years', mars: '~19 years', jupiter: '~119 years', saturn: '~295 years', neptune: '~1,648 years', pluto: '~2,480 years' },
];

export const spaceRecords = [
  {
    record: 'Hottest Planet', winner: 'Venus', value: '867°F (464°C)', emoji: '🔥', color: '#EC4899',
    runnerUp: 'Mercury at 800°F daytime',
    comparison: 'Venus is hot enough to melt lead! Your oven at home only goes to about 500°F. Venus is almost TWICE that hot.',
    whyItMatters: 'Venus is hotter than Mercury even though Mercury is closer to the Sun. Why? Venus has a super thick atmosphere made of carbon dioxide that traps heat like a giant blanket. This is called the greenhouse effect — the same thing that is slowly warming Earth!',
    funScale: 'Pizza oven: 500°F → Venus: 867°F → Sun surface: 9,932°F',
  },
  {
    record: 'Coldest Planet', winner: 'Uranus', value: '-371°F (-224°C)', emoji: '🥶', color: '#06B6D4',
    runnerUp: 'Neptune at -328°F',
    comparison: 'The coldest temperature ever recorded on Earth was -128.6°F in Antarctica. Uranus is almost THREE times colder than that!',
    whyItMatters: 'Uranus is colder than Neptune even though Neptune is farther from the Sun! Scientists think Uranus may have been hit by something huge long ago that knocked out a lot of its internal heat. Neptune still has heat coming from its core, but Uranus barely does.',
    funScale: 'Freezer: 0°F → Antarctica: -129°F → Uranus: -371°F',
  },
  {
    record: 'Biggest Planet', winner: 'Jupiter', value: '86,881 mi diameter', emoji: '🏆', color: '#EF4444',
    runnerUp: 'Saturn at 74,898 mi',
    comparison: 'Jupiter is so big that 1,321 Earths could fit inside it! If Jupiter were a basketball, Earth would be the size of a small marble.',
    whyItMatters: 'Jupiter is so massive that its gravity acts like a cosmic shield, pulling in asteroids and comets that might otherwise hit Earth. Some scientists call Jupiter our "guardian planet" because it protects us!',
    funScale: 'Earth: 7,918 mi → Saturn: 74,898 mi → Jupiter: 86,881 mi',
  },
  {
    record: 'Smallest Planet', winner: 'Mercury', value: '3,032 mi diameter', emoji: '🔬', color: '#6B7280',
    runnerUp: 'Mars at 4,212 mi',
    comparison: 'Mercury is only slightly bigger than Earth\'s Moon (2,159 mi)! You could drive across Mercury in about 2 days if there were roads.',
    whyItMatters: 'Mercury is so small and close to the Sun that it barely has any atmosphere. Without an atmosphere, there is nothing to trap heat at night or block the Sun during the day, which is why its temperature swings are the most extreme in the solar system.',
    funScale: 'Moon: 2,159 mi → Mercury: 3,032 mi → Mars: 4,212 mi → Earth: 7,918 mi',
  },
  {
    record: 'Most Moons', winner: 'Saturn', value: '146 moons', emoji: '🌙', color: '#F59E0B',
    runnerUp: 'Jupiter with 95 moons',
    comparison: 'Saturn has 146 known moons — that is like having a different moon for almost every day of a school semester! Earth only has 1.',
    whyItMatters: 'Scientists keep discovering new moons around Saturn and Jupiter. Many of these moons are tiny (less than 1 mile across), but some are huge. Saturn\'s moon Titan is bigger than Mercury and has its own thick atmosphere!',
    funScale: 'Earth: 1 → Mars: 2 → Neptune: 16 → Jupiter: 95 → Saturn: 146',
  },
  {
    record: 'Fastest Orbit', winner: 'Mercury', value: '88 Earth days', emoji: '⚡', color: '#6B7280',
    runnerUp: 'Venus at 225 days',
    comparison: 'Mercury completes a full year in just 88 days! If you lived on Mercury, you would have about 4 birthdays every Earth year.',
    whyItMatters: 'Mercury orbits so fast because it is closest to the Sun. The Sun\'s gravity pulls harder on closer objects, making them orbit faster. This is the same reason the International Space Station orbits Earth every 90 minutes — it is close!',
    funScale: 'Mercury year: 88 days → Earth year: 365 days → Neptune year: 60,190 days',
  },
  {
    record: 'Slowest Orbit', winner: 'Neptune', value: '165 Earth years', emoji: '🐢', color: '#3B82F6',
    runnerUp: 'Uranus at 84 years',
    comparison: 'Neptune was discovered in 1846 and has only completed ONE full orbit since then! It will not finish its second orbit until the year 2011... wait, it already did in 2011!',
    whyItMatters: 'Neptune is so far from the Sun (2.8 billion miles) that sunlight takes over 4 hours to reach it. At that distance, the Sun\'s gravity is much weaker, so Neptune moves very slowly through space.',
    funScale: 'Mercury year: 88 days → Earth year: 1 year → Neptune year: 165 years → Pluto year: 248 years',
  },
  {
    record: 'Longest Day', winner: 'Venus', value: '243 Earth days', emoji: '⏰', color: '#EC4899',
    runnerUp: 'Mercury at 58.6 Earth days',
    comparison: 'A single day on Venus (one full spin) takes 243 Earth days. But a year on Venus is only 225 days. So a day on Venus is LONGER than its year! Mind = blown.',
    whyItMatters: 'Venus spins incredibly slowly AND backwards (called retrograde rotation). Scientists think a massive collision billions of years ago may have flipped Venus upside down or slowed its spin dramatically.',
    funScale: 'Jupiter day: 10 hrs → Earth day: 24 hrs → Mercury day: 1,408 hrs → Venus day: 5,832 hrs',
  },
  {
    record: 'Shortest Day', winner: 'Jupiter', value: '~9 hrs 55 min', emoji: '💫', color: '#EF4444',
    runnerUp: 'Saturn at ~10 hrs 39 min',
    comparison: 'Jupiter spins so fast that its day is less than 10 hours! You would have breakfast, lunch, dinner, AND sleep all in less time than a school day.',
    whyItMatters: 'Jupiter spins so fast that it actually bulges at its equator — it is 7% wider at the middle than at the poles! This rapid spinning also creates incredibly powerful jet streams and storms, including the famous Great Red Spot.',
    funScale: 'Jupiter day: 10 hrs → Earth day: 24 hrs → Mars day: 24.6 hrs → Venus day: 5,832 hrs',
  },
  {
    record: 'Tallest Mountain', winner: 'Mars', value: 'Olympus Mons — 72,000 ft', emoji: '⛰️', color: '#F97316',
    runnerUp: 'Earth\'s Mauna Kea at 33,500 ft (from ocean floor)',
    comparison: 'Olympus Mons is nearly 3 times taller than Mount Everest (29,032 ft)! Its base is so wide it would cover most of France. If you stood at the top, you could not see the bottom — it would be beyond the horizon.',
    whyItMatters: 'Olympus Mons is a shield volcano (like Hawaii\'s volcanoes but MUCH bigger). It got so tall because Mars has no tectonic plates — the volcano just kept building up in the same spot for billions of years instead of the ground moving underneath it.',
    funScale: 'Everest: 29,032 ft → Mauna Kea: 33,500 ft → Olympus Mons: 72,000 ft',
  },
  {
    record: 'Deepest Canyon', winner: 'Mars', value: 'Valles Marineris — 23,000 ft deep', emoji: '🏜️', color: '#F97316',
    runnerUp: 'Earth\'s Grand Canyon at 6,093 ft',
    comparison: 'Valles Marineris is 2,500 miles long (about the width of the United States!), up to 120 miles wide, and 23,000 feet deep. The Grand Canyon is only 277 miles long and 6,093 feet deep.',
    whyItMatters: 'Scientists think Valles Marineris formed when Mars\'s crust was pulled apart by volcanic activity billions of years ago. Water may have once flowed through parts of it, carving it even deeper.',
    funScale: 'Grand Canyon: 277 mi long → Valles Marineris: 2,500 mi long (10x longer!)',
  },
  {
    record: 'Strongest Winds', winner: 'Neptune', value: '1,200+ mph', emoji: '🌪️', color: '#3B82F6',
    runnerUp: 'Saturn at 1,100 mph',
    comparison: 'Neptune\'s winds are faster than the speed of sound (767 mph)! The strongest tornado ever recorded on Earth had winds of about 302 mph — Neptune\'s winds are 4 times faster.',
    whyItMatters: 'Scientists are puzzled by Neptune\'s extreme winds because Neptune is so far from the Sun and receives very little solar energy. The winds must be powered by Neptune\'s internal heat — it radiates 2.6 times more energy than it receives from the Sun!',
    funScale: 'Earth tornado: 302 mph → Sound: 767 mph → Neptune: 1,200 mph',
  },
  {
    record: 'Biggest Ring System', winner: 'Saturn', value: '175,000 mi wide', emoji: '💍', color: '#F59E0B',
    runnerUp: 'Jupiter, Uranus, and Neptune all have faint rings too!',
    comparison: 'Saturn\'s rings stretch 175,000 miles from edge to edge — that is about 3/4 of the distance from Earth to the Moon! But they are incredibly thin — only about 30 feet thick in most places.',
    whyItMatters: 'Saturn\'s rings are made of billions of chunks of ice and rock, ranging from tiny grains to pieces as big as houses. The rings may have formed when a moon got too close to Saturn and was torn apart by its gravity!',
    funScale: 'Ring width: 175,000 mi → Ring thickness: ~30 ft (like a DVD compared to a football field)',
  },
  {
    record: 'Lightest Planet', winner: 'Saturn', value: 'Density: 0.69 g/cm³', emoji: '🛁', color: '#F59E0B',
    runnerUp: 'Jupiter at 1.33 g/cm³',
    comparison: 'Water has a density of 1.0 g/cm³. Saturn\'s density is only 0.69 — meaning if you could find a bathtub big enough, Saturn would literally float! It is the only planet less dense than water.',
    whyItMatters: 'Saturn is mostly made of hydrogen and helium gas, which are very light. Even though Saturn is the second-largest planet (764 Earths could fit inside), it only weighs 95 times as much as Earth because it is so fluffy!',
    funScale: 'Saturn: 0.69 → Water: 1.0 → Earth: 5.51 → Mercury: 5.43',
  },
];

export const spaceRecordQuiz = [
  {
    question: 'Which planet holds the record for the most moons?',
    options: ['Jupiter', 'Saturn', 'Uranus', 'Neptune'],
    correct: 1,
    explanation: 'Saturn has 146 known moons — the most of any planet!',
    coaching: 'Saturn has 146 known moons, beating Jupiter\'s 95. Scientists keep discovering new ones!',
  },
  {
    question: 'Which planet has the longest day?',
    options: ['Mercury', 'Venus', 'Jupiter', 'Pluto'],
    correct: 1,
    explanation: 'A day on Venus lasts 243 Earth days — longer than its year (225 days)!',
    coaching: 'Venus rotates very slowly and backwards! One Venus day is 243 Earth days, which is actually longer than one Venus year (225 Earth days).',
  },
  {
    question: 'Where is the tallest mountain in the solar system?',
    options: ['Earth', 'Venus', 'Mars', 'Jupiter'],
    correct: 2,
    explanation: 'Olympus Mons on Mars is about 72,000 feet tall — nearly 3 times taller than Mount Everest!',
    coaching: 'Mars has Olympus Mons, the tallest mountain in the entire solar system at about 72,000 feet. Mount Everest is only about 29,000 feet!',
  },
];
