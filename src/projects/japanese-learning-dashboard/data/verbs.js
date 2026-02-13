export const verbGroups = [
  {
    group: 'Group 1 (う-verbs / Godan)',
    description: 'Verbs ending in う-sound consonants. The most common group with complex conjugation.',
    color: 'cyan',
    verbs: [
      { dictionary: 'いく', romaji: 'iku', english: 'to go', masu: 'いきます', te: 'いって', nai: 'いかない', ta: 'いった', note: 'Irregular て-form (いって not いいて)' },
      { dictionary: 'かえる', romaji: 'kaeru', english: 'to return', masu: 'かえります', te: 'かえって', nai: 'かえらない', ta: 'かえった', note: 'Not to be confused with かえる (frog)' },
      { dictionary: 'かく', romaji: 'kaku', english: 'to write', masu: 'かきます', te: 'かいて', nai: 'かかない', ta: 'かいた', note: '' },
      { dictionary: 'はなす', romaji: 'hanasu', english: 'to speak', masu: 'はなします', te: 'はなして', nai: 'はなさない', ta: 'はなした', note: '' },
      { dictionary: 'まつ', romaji: 'matsu', english: 'to wait', masu: 'まちます', te: 'まって', nai: 'またない', ta: 'まった', note: '' },
      { dictionary: 'よむ', romaji: 'yomu', english: 'to read', masu: 'よみます', te: 'よんで', nai: 'よまない', ta: 'よんだ', note: '' },
      { dictionary: 'のむ', romaji: 'nomu', english: 'to drink', masu: 'のみます', te: 'のんで', nai: 'のまない', ta: 'のんだ', note: '' },
      { dictionary: 'かう', romaji: 'kau', english: 'to buy', masu: 'かいます', te: 'かって', nai: 'かわない', ta: 'かった', note: '' },
      { dictionary: 'きく', romaji: 'kiku', english: 'to listen / ask', masu: 'ききます', te: 'きいて', nai: 'きかない', ta: 'きいた', note: 'Context determines meaning' },
      { dictionary: 'あそぶ', romaji: 'asobu', english: 'to play / hang out', masu: 'あそびます', te: 'あそんで', nai: 'あそばない', ta: 'あそんだ', note: '' },
      { dictionary: 'しぬ', romaji: 'shinu', english: 'to die', masu: 'しにます', te: 'しんで', nai: 'しなない', ta: 'しんだ', note: 'Only ぬ-ending verb' },
      { dictionary: 'つくる', romaji: 'tsukuru', english: 'to make', masu: 'つくります', te: 'つくって', nai: 'つくらない', ta: 'つくった', note: '' },
      { dictionary: 'わかる', romaji: 'wakaru', english: 'to understand', masu: 'わかります', te: 'わかって', nai: 'わからない', ta: 'わかった', note: 'Uses が not を' },
      { dictionary: 'おくる', romaji: 'okuru', english: 'to send', masu: 'おくります', te: 'おくって', nai: 'おくらない', ta: 'おくった', note: '' },
      { dictionary: 'はたらく', romaji: 'hataraku', english: 'to work', masu: 'はたらきます', te: 'はたらいて', nai: 'はたらかない', ta: 'はたらいた', note: '' },
    ],
  },
  {
    group: 'Group 2 (る-verbs / Ichidan)',
    description: 'Verbs ending in -iru or -eru. Simpler conjugation — just drop る and add endings.',
    color: 'emerald',
    verbs: [
      { dictionary: 'たべる', romaji: 'taberu', english: 'to eat', masu: 'たべます', te: 'たべて', nai: 'たべない', ta: 'たべた', note: '' },
      { dictionary: 'みる', romaji: 'miru', english: 'to see / watch', masu: 'みます', te: 'みて', nai: 'みない', ta: 'みた', note: '' },
      { dictionary: 'ねる', romaji: 'neru', english: 'to sleep', masu: 'ねます', te: 'ねて', nai: 'ねない', ta: 'ねた', note: '' },
      { dictionary: 'おきる', romaji: 'okiru', english: 'to wake up', masu: 'おきます', te: 'おきて', nai: 'おきない', ta: 'おきた', note: '' },
      { dictionary: 'でる', romaji: 'deru', english: 'to go out / leave', masu: 'でます', te: 'でて', nai: 'でない', ta: 'でた', note: '' },
      { dictionary: 'いれる', romaji: 'ireru', english: 'to put in / insert', masu: 'いれます', te: 'いれて', nai: 'いれない', ta: 'いれた', note: '' },
      { dictionary: 'おしえる', romaji: 'oshieru', english: 'to teach / tell', masu: 'おしえます', te: 'おしえて', nai: 'おしえない', ta: 'おしえた', note: '' },
      { dictionary: 'あげる', romaji: 'ageru', english: 'to give / raise', masu: 'あげます', te: 'あげて', nai: 'あげない', ta: 'あげた', note: '' },
      { dictionary: 'つける', romaji: 'tsukeru', english: 'to turn on / attach', masu: 'つけます', te: 'つけて', nai: 'つけない', ta: 'つけた', note: '' },
      { dictionary: 'きめる', romaji: 'kimeru', english: 'to decide', masu: 'きめます', te: 'きめて', nai: 'きめない', ta: 'きめた', note: '' },
      { dictionary: 'かんがえる', romaji: 'kangaeru', english: 'to think / consider', masu: 'かんがえます', te: 'かんがえて', nai: 'かんがえない', ta: 'かんがえた', note: '' },
      { dictionary: 'おぼえる', romaji: 'oboeru', english: 'to remember / memorize', masu: 'おぼえます', te: 'おぼえて', nai: 'おぼえない', ta: 'おぼえた', note: '' },
    ],
  },
  {
    group: 'Group 3 (Irregular)',
    description: 'Only two irregular verbs — but they are the most commonly used verbs in Japanese.',
    color: 'rose',
    verbs: [
      { dictionary: 'する', romaji: 'suru', english: 'to do', masu: 'します', te: 'して', nai: 'しない', ta: 'した', note: 'Most versatile verb. Noun+する = verb (べんきょうする = to study)' },
      { dictionary: 'くる', romaji: 'kuru', english: 'to come', masu: 'きます', te: 'きて', nai: 'こない', ta: 'きた', note: 'Stem changes: く→き (masu), く→こ (nai)' },
    ],
  },
];

export const teFormRules = [
  { ending: 'う / つ / る', teForm: '→ って', example: 'かう → かって, まつ → まって, かえる → かえって', group: 'Group 1' },
  { ending: 'む / ぶ / ぬ', teForm: '→ んで', example: 'よむ → よんで, あそぶ → あそんで, しぬ → しんで', group: 'Group 1' },
  { ending: 'く', teForm: '→ いて', example: 'かく → かいて, きく → きいて', group: 'Group 1' },
  { ending: 'ぐ', teForm: '→ いで', example: 'およぐ → およいで, ぬぐ → ぬいで', group: 'Group 1' },
  { ending: 'す', teForm: '→ して', example: 'はなす → はなして, けす → けして', group: 'Group 1' },
  { ending: 'る (drop)', teForm: '→ て', example: 'たべる → たべて, みる → みて', group: 'Group 2' },
  { ending: 'する', teForm: '→ して', example: 'する → して, べんきょうする → べんきょうして', group: 'Group 3' },
  { ending: 'くる', teForm: '→ きて', example: 'くる → きて', group: 'Group 3' },
  { ending: 'いく (exception)', teForm: '→ いって', example: 'いく → いって (not いいて)', group: 'Exception' },
];

export const conjugationTable = {
  forms: ['Dictionary', 'ます (Polite)', 'ない (Negative)', 'て (Te-form)', 'た (Past)', 'Potential', 'Passive', 'Causative', 'Volitional', 'Imperative'],
  examples: [
    {
      verb: 'たべる (to eat)',
      group: 'Group 2',
      conjugations: ['たべる', 'たべます', 'たべない', 'たべて', 'たべた', 'たべられる', 'たべられる', 'たべさせる', 'たべよう', 'たべろ'],
    },
    {
      verb: 'かく (to write)',
      group: 'Group 1',
      conjugations: ['かく', 'かきます', 'かかない', 'かいて', 'かいた', 'かける', 'かかれる', 'かかせる', 'かこう', 'かけ'],
    },
    {
      verb: 'する (to do)',
      group: 'Group 3',
      conjugations: ['する', 'します', 'しない', 'して', 'した', 'できる', 'される', 'させる', 'しよう', 'しろ'],
    },
    {
      verb: 'くる (to come)',
      group: 'Group 3',
      conjugations: ['くる', 'きます', 'こない', 'きて', 'きた', 'こられる', 'こられる', 'こさせる', 'こよう', 'こい'],
    },
    {
      verb: 'のむ (to drink)',
      group: 'Group 1',
      conjugations: ['のむ', 'のみます', 'のまない', 'のんで', 'のんだ', 'のめる', 'のまれる', 'のませる', 'のもう', 'のめ'],
    },
    {
      verb: 'はなす (to speak)',
      group: 'Group 1',
      conjugations: ['はなす', 'はなします', 'はなさない', 'はなして', 'はなした', 'はなせる', 'はなされる', 'はなさせる', 'はなそう', 'はなせ'],
    },
  ],
};
