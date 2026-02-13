export const grammarLevels = [
  {
    level: 'N5 — Beginner',
    color: 'emerald',
    description: 'Foundation grammar for basic communication. Start here.',
    topics: [
      {
        id: 'particles-basic',
        title: 'Basic Particles',
        summary: 'The building blocks of Japanese sentences',
        points: [
          { particle: 'は (wa)', role: 'Topic marker', example: 'わたし は がくせい です。', romaji: 'Watashi wa gakusei desu.', english: 'I am a student.', note: 'Written は but pronounced "wa" when used as a particle.' },
          { particle: 'が (ga)', role: 'Subject marker', example: 'ねこ が いる。', romaji: 'Neko ga iru.', english: 'There is a cat.', note: 'Marks the grammatical subject, often for new information.' },
          { particle: 'を (wo/o)', role: 'Object marker', example: 'パン を たべる。', romaji: 'Pan wo taberu.', english: 'I eat bread.', note: 'Marks the direct object of an action verb.' },
          { particle: 'に (ni)', role: 'Direction / Time / Location', example: 'がっこう に いく。', romaji: 'Gakkou ni iku.', english: 'I go to school.', note: 'Indicates destination, time point, or location of existence.' },
          { particle: 'で (de)', role: 'Location of action / Means', example: 'こうえん で あそぶ。', romaji: 'Kouen de asobu.', english: 'I play at the park.', note: 'Where an action takes place, or the means/tool used.' },
          { particle: 'の (no)', role: 'Possessive / Connector', example: 'わたし の ほん。', romaji: 'Watashi no hon.', english: 'My book.', note: 'Connects nouns, similar to English "of" or possessive \'s.' },
          { particle: 'と (to)', role: 'And / With', example: 'いぬ と ねこ。', romaji: 'Inu to neko.', english: 'Dog and cat.', note: 'Exhaustive listing (all items) or "together with".' },
          { particle: 'も (mo)', role: 'Also / Too', example: 'わたし も がくせい です。', romaji: 'Watashi mo gakusei desu.', english: 'I am also a student.', note: 'Replaces は/が/を to mean "also".' },
          { particle: 'から (kara)', role: 'From / Because', example: 'ここ から えき まで。', romaji: 'Koko kara eki made.', english: 'From here to the station.', note: 'Starting point in space/time, or reason.' },
          { particle: 'まで (made)', role: 'Until / Up to', example: 'ごじ まで はたらく。', romaji: 'Goji made hataraku.', english: 'I work until 5 o\'clock.', note: 'Ending point in space or time.' },
        ],
      },
      {
        id: 'desu-masu',
        title: 'です / ます (Polite Form)',
        summary: 'The polite sentence endings used in everyday conversation',
        points: [
          { particle: 'です (desu)', role: 'Copula (is/am/are)', example: 'これ は ほん です。', romaji: 'Kore wa hon desu.', english: 'This is a book.', note: 'Polite copula. Negative: じゃないです (ja nai desu).' },
          { particle: 'ます (masu)', role: 'Polite verb ending', example: 'たべます。', romaji: 'Tabemasu.', english: 'I eat. / I will eat.', note: 'Polite present/future. Negative: たべません (tabemasen).' },
          { particle: 'ました (mashita)', role: 'Polite past', example: 'たべました。', romaji: 'Tabemashita.', english: 'I ate.', note: 'Polite past tense. Negative: たべませんでした (tabemasen deshita).' },
          { particle: 'でした (deshita)', role: 'Past copula', example: 'がくせい でした。', romaji: 'Gakusei deshita.', english: 'I was a student.', note: 'Past tense of です. Negative: じゃなかったです.' },
        ],
      },
      {
        id: 'question-words',
        title: 'Question Words',
        summary: 'Essential interrogatives for asking questions',
        points: [
          { particle: 'なに / なん (nani/nan)', role: 'What', example: 'これ は なん です か。', romaji: 'Kore wa nan desu ka.', english: 'What is this?', note: 'なん before です/で/の; なに elsewhere.' },
          { particle: 'だれ (dare)', role: 'Who', example: 'だれ が きましたか。', romaji: 'Dare ga kimashita ka.', english: 'Who came?', note: 'だれの (dareno) = whose.' },
          { particle: 'どこ (doko)', role: 'Where', example: 'トイレ は どこ ですか。', romaji: 'Toire wa doko desu ka.', english: 'Where is the toilet?', note: 'One of the most useful travel phrases.' },
          { particle: 'いつ (itsu)', role: 'When', example: 'いつ いきますか。', romaji: 'Itsu ikimasu ka.', english: 'When will you go?', note: 'Does not need a particle after it.' },
          { particle: 'どう (dou)', role: 'How', example: 'にほんご は どう ですか。', romaji: 'Nihongo wa dou desu ka.', english: 'How is Japanese?', note: 'Asks about manner or impression.' },
          { particle: 'なぜ / どうして (naze/doushite)', role: 'Why', example: 'どうして おそい ですか。', romaji: 'Doushite osoi desu ka.', english: 'Why are you late?', note: 'なぜ is more formal; どうして is conversational.' },
          { particle: 'いくら (ikura)', role: 'How much (price)', example: 'これ は いくら ですか。', romaji: 'Kore wa ikura desu ka.', english: 'How much is this?', note: 'Essential for shopping.' },
          { particle: 'いくつ (ikutsu)', role: 'How many / How old', example: 'りんご は いくつ ですか。', romaji: 'Ringo wa ikutsu desu ka.', english: 'How many apples?', note: 'Also used to ask age politely.' },
        ],
      },
      {
        id: 'adjectives-basic',
        title: 'Adjective Types (い & な)',
        summary: 'Two adjective systems with different conjugation rules',
        points: [
          { particle: 'い-adjective', role: 'Native Japanese adjectives', example: 'たかい (takai) = expensive/tall', romaji: 'Kono hon wa takai desu.', english: 'This book is expensive.', note: 'Conjugate by dropping い: たかくない (not expensive), たかかった (was expensive).' },
          { particle: 'な-adjective', role: 'Adjectival nouns', example: 'しずか (shizuka) = quiet', romaji: 'Kono まち wa shizuka desu.', english: 'This town is quiet.', note: 'Add な before nouns: しずかな まち. Negative: しずかじゃない.' },
        ],
      },
      {
        id: 'sentence-structure',
        title: 'Basic Sentence Structure (SOV)',
        summary: 'Japanese uses Subject-Object-Verb order',
        points: [
          { particle: 'SOV Order', role: 'Core pattern', example: 'わたし は りんご を たべます。', romaji: 'Watashi wa ringo wo tabemasu.', english: 'I eat an apple.', note: 'The verb ALWAYS comes at the end. This is the #1 rule.' },
          { particle: 'Topic-Comment', role: 'Information structure', example: 'きょう は てんき が いい です。', romaji: 'Kyou wa tenki ga ii desu.', english: 'Today, the weather is good.', note: 'Topic (は) sets the scene; comment provides info about it.' },
          { particle: 'Omission', role: 'Dropping the subject', example: 'りんご を たべます。', romaji: 'Ringo wo tabemasu.', english: '(I) eat an apple.', note: 'Subject is often omitted when obvious from context.' },
        ],
      },
    ],
  },
  {
    level: 'N4 — Elementary',
    color: 'cyan',
    description: 'Expanding grammar for daily life conversations and simple narratives.',
    topics: [
      {
        id: 'te-form',
        title: 'て-form (Te-form)',
        summary: 'The most versatile verb form — connects actions, makes requests, and more',
        points: [
          { particle: '～ている (te iru)', role: 'Ongoing action / State', example: 'たべて いる。', romaji: 'Tabete iru.', english: 'I am eating.', note: 'Present progressive. Also describes states: しっている (I know).' },
          { particle: '～てください (te kudasai)', role: 'Please do ~', example: 'まって ください。', romaji: 'Matte kudasai.', english: 'Please wait.', note: 'Polite request form.' },
          { particle: '～てもいい (te mo ii)', role: 'May I / It\'s okay to', example: 'ここ に すわっても いい ですか。', romaji: 'Koko ni suwatte mo ii desu ka.', english: 'May I sit here?', note: 'Asking for permission.' },
          { particle: '～てはいけない (te wa ikenai)', role: 'Must not', example: 'ここ で たばこ を すっては いけない。', romaji: 'Koko de tabako wo sutte wa ikenai.', english: 'You must not smoke here.', note: 'Prohibition.' },
          { particle: '～てから (te kara)', role: 'After doing ~', example: 'ごはん を たべてから、べんきょう する。', romaji: 'Gohan wo tabete kara, benkyou suru.', english: 'After eating, I study.', note: 'Sequential actions.' },
        ],
      },
      {
        id: 'tai-form',
        title: '～たい (Tai-form) — Want to',
        summary: 'Expressing desires and wants',
        points: [
          { particle: '～たい (tai)', role: 'I want to ~', example: 'にほん に いきたい。', romaji: 'Nihon ni ikitai.', english: 'I want to go to Japan.', note: 'Verb stem + たい. Conjugates like い-adjective.' },
          { particle: '～たくない (takunai)', role: 'I don\'t want to ~', example: 'べんきょう したくない。', romaji: 'Benkyou shitakunai.', english: 'I don\'t want to study.', note: 'Negative of たい.' },
          { particle: '～たがっている (tagatteiru)', role: 'He/she wants to ~', example: 'かれ は いきたがっている。', romaji: 'Kare wa ikitagatteiru.', english: 'He wants to go.', note: 'Use for third person wants (not たい).' },
        ],
      },
      {
        id: 'potential-form',
        title: 'Potential Form — Can / Able to',
        summary: 'Expressing ability',
        points: [
          { particle: 'る-verb potential', role: 'Can do (Group 2)', example: 'たべられる。', romaji: 'Taberareru.', english: 'I can eat.', note: 'Drop る, add られる. Colloquially: たべれる (ra-nuki).' },
          { particle: 'う-verb potential', role: 'Can do (Group 1)', example: 'はなせる。', romaji: 'Hanaseru.', english: 'I can speak.', note: 'Change last う-sound to え-sound + る.' },
          { particle: 'できる (dekiru)', role: 'Can do / Possible', example: 'にほんご が できる。', romaji: 'Nihongo ga dekiru.', english: 'I can (do) Japanese.', note: 'General ability. する → できる.' },
        ],
      },
      {
        id: 'conditionals',
        title: 'Conditional Forms',
        summary: 'If/when patterns — Japanese has four!',
        points: [
          { particle: '～たら (tara)', role: 'If / When (most common)', example: 'あめ が ふったら、いかない。', romaji: 'Ame ga futtara, ikanai.', english: 'If it rains, I won\'t go.', note: 'Past tense + ら. Most versatile conditional.' },
          { particle: '～ば (ba)', role: 'If (hypothetical)', example: 'やすければ、かう。', romaji: 'Yasukereba, kau.', english: 'If it\'s cheap, I\'ll buy it.', note: 'More hypothetical. い→ければ, う→えば.' },
          { particle: '～と (to)', role: 'When / Whenever (automatic)', example: 'はる に なると、さくら が さく。', romaji: 'Haru ni naru to, sakura ga saku.', english: 'When spring comes, cherry blossoms bloom.', note: 'Natural/automatic consequences.' },
          { particle: '～なら (nara)', role: 'If (topic-based)', example: 'にほん なら、きょうと が いい。', romaji: 'Nihon nara, Kyouto ga ii.', english: 'If (we\'re talking about) Japan, Kyoto is good.', note: 'Conditional based on a topic/assumption.' },
        ],
      },
      {
        id: 'giving-receiving',
        title: 'Giving & Receiving (あげる・もらう・くれる)',
        summary: 'Three verbs that encode social relationships',
        points: [
          { particle: 'あげる (ageru)', role: 'I give (to someone)', example: 'ともだち に プレゼント を あげる。', romaji: 'Tomodachi ni purezento wo ageru.', english: 'I give a present to my friend.', note: 'Giver\'s perspective, outward direction.' },
          { particle: 'もらう (morau)', role: 'I receive (from someone)', example: 'ともだち に ほん を もらった。', romaji: 'Tomodachi ni hon wo moratta.', english: 'I received a book from my friend.', note: 'Receiver\'s perspective.' },
          { particle: 'くれる (kureru)', role: 'Someone gives (to me)', example: 'はは が ケーキ を くれた。', romaji: 'Haha ga keeki wo kureta.', english: 'My mother gave me cake.', note: 'Inward direction — someone gives to me/my group.' },
        ],
      },
    ],
  },
  {
    level: 'N3 — Intermediate',
    color: 'amber',
    description: 'Complex grammar for nuanced expression and natural conversation.',
    topics: [
      {
        id: 'passive-form',
        title: 'Passive Form (受身 ukemi)',
        summary: 'Being acted upon — also used for indirect/adversative passive',
        points: [
          { particle: '～られる (rareru)', role: 'Passive (Group 2)', example: 'ケーキ が たべられた。', romaji: 'Keeki ga taberareta.', english: 'The cake was eaten.', note: 'Same form as potential for る-verbs (context distinguishes).' },
          { particle: '～れる (reru)', role: 'Passive (Group 1)', example: 'せんせい に ほめられた。', romaji: 'Sensei ni homerareta.', english: 'I was praised by the teacher.', note: 'Change う→あれる.' },
          { particle: 'Adversative passive', role: 'Suffering passive', example: 'あめ に ふられた。', romaji: 'Ame ni furareta.', english: 'I got rained on (and it was bad).', note: 'Unique to Japanese — expresses inconvenience.' },
        ],
      },
      {
        id: 'causative-form',
        title: 'Causative Form (使役 shieki)',
        summary: 'Making/letting someone do something',
        points: [
          { particle: '～させる (saseru)', role: 'Make/let do (Group 2)', example: 'こども に やさい を たべさせる。', romaji: 'Kodomo ni yasai wo tabesaseru.', english: 'I make the child eat vegetables.', note: 'る-verb: drop る, add させる.' },
          { particle: '～せる (seru)', role: 'Make/let do (Group 1)', example: 'がくせい を はしらせる。', romaji: 'Gakusei wo hashiraseru.', english: 'I make the students run.', note: 'う-verb: change う→あせる.' },
          { particle: '～させてください', role: 'Please let me ~', example: 'わたし に やらせて ください。', romaji: 'Watashi ni yarasete kudasai.', english: 'Please let me do it.', note: 'Polite request for permission to act.' },
        ],
      },
      {
        id: 'compound-particles',
        title: 'Compound Particles & Expressions',
        summary: 'Multi-particle combinations for precise meaning',
        points: [
          { particle: '～について (ni tsuite)', role: 'About / Regarding', example: 'にほん について はなす。', romaji: 'Nihon ni tsuite hanasu.', english: 'I talk about Japan.', note: 'Very common in formal speech and writing.' },
          { particle: '～によって (ni yotte)', role: 'Depending on / By means of', example: 'ひと に よって ちがう。', romaji: 'Hito ni yotte chigau.', english: 'It differs depending on the person.', note: 'Also used for passive agent in formal writing.' },
          { particle: '～として (to shite)', role: 'As / In the role of', example: 'せんせい として はたらく。', romaji: 'Sensei to shite hataraku.', english: 'I work as a teacher.', note: 'Defines a role or capacity.' },
          { particle: '～ようにする (you ni suru)', role: 'Try to / Make sure to', example: 'まいにち うんどう する ように する。', romaji: 'Mainichi undou suru you ni suru.', english: 'I try to exercise every day.', note: 'Habitual effort toward a goal.' },
          { particle: '～ことにする (koto ni suru)', role: 'Decide to', example: 'にほん に いく こと に した。', romaji: 'Nihon ni iku koto ni shita.', english: 'I decided to go to Japan.', note: 'Active decision by the speaker.' },
          { particle: '～ことになる (koto ni naru)', role: 'It has been decided that', example: 'らいねん にほん に いく こと に なった。', romaji: 'Rainen Nihon ni iku koto ni natta.', english: 'It\'s been decided I\'ll go to Japan next year.', note: 'Decision made by external circumstances.' },
        ],
      },
    ],
  },
  {
    level: 'N2 — Upper Intermediate',
    color: 'violet',
    description: 'Formal grammar, nuanced expressions, and written Japanese patterns.',
    topics: [
      {
        id: 'formal-expressions',
        title: 'Formal & Written Expressions',
        summary: 'Grammar patterns common in news, business, and academic Japanese',
        points: [
          { particle: '～において (ni oite)', role: 'In / At (formal)', example: 'かいぎ に おいて はっぴょう する。', romaji: 'Kaigi ni oite happyou suru.', english: 'I will present at the meeting.', note: 'Formal version of で. Common in writing.' },
          { particle: '～に対して (ni taishite)', role: 'Toward / Against / In contrast', example: 'この もんだい に たいして いけん が ある。', romaji: 'Kono mondai ni taishite iken ga aru.', english: 'I have an opinion regarding this problem.', note: 'Direction of attitude or contrast.' },
          { particle: '～わけではない (wake dewa nai)', role: 'It doesn\'t mean that', example: 'きらい な わけ では ない。', romaji: 'Kirai na wake dewa nai.', english: 'It\'s not that I dislike it.', note: 'Partial denial — nuanced disagreement.' },
          { particle: '～ざるを得ない (zaru wo enai)', role: 'Cannot help but / Have no choice', example: 'みとめざるを えない。', romaji: 'Mitomezaru wo enai.', english: 'I have no choice but to admit it.', note: 'Very formal. ない→ざる + をえない.' },
          { particle: '～に伴い (ni tomonai)', role: 'Along with / As ~ happens', example: 'じんこう の ぞうか に ともない。', romaji: 'Jinkou no zouka ni tomonai.', english: 'Along with population increase...', note: 'Formal cause-and-effect.' },
        ],
      },
      {
        id: 'conjunctions-advanced',
        title: 'Advanced Conjunctions',
        summary: 'Connecting ideas with precision',
        points: [
          { particle: '～一方で (ippou de)', role: 'On the other hand / While', example: 'べんり な いっぽうで、きけん も ある。', romaji: 'Benri na ippou de, kiken mo aru.', english: 'While convenient, there are also dangers.', note: 'Contrasting two simultaneous truths.' },
          { particle: '～にもかかわらず (nimo kakawarazu)', role: 'Despite / In spite of', example: 'あめ にも かかわらず、でかけた。', romaji: 'Ame nimo kakawarazu, dekaketa.', english: 'Despite the rain, I went out.', note: 'Formal concessive.' },
          { particle: '～どころか (dokoro ka)', role: 'Far from / Let alone', example: 'かんたん どころか、むずかしい。', romaji: 'Kantan dokoro ka, muzukashii.', english: 'Far from easy, it\'s difficult.', note: 'Emphatic contrast.' },
          { particle: '～からこそ (kara koso)', role: 'Precisely because', example: 'すき だからこそ、きびしく する。', romaji: 'Suki dakara koso, kibishiku suru.', english: 'Precisely because I like you, I\'m strict.', note: 'Emphasizes the reason.' },
        ],
      },
    ],
  },
  {
    level: 'N1 — Advanced',
    color: 'rose',
    description: 'Literary, archaic, and highly nuanced patterns for near-native fluency.',
    topics: [
      {
        id: 'literary-patterns',
        title: 'Literary & Formal Patterns',
        summary: 'Patterns found in literature, formal speeches, and academic writing',
        points: [
          { particle: '～んばかりに (n bakari ni)', role: 'As if about to', example: 'なき ださん ばかり の かお。', romaji: 'Naki dasan bakari no kao.', english: 'A face as if about to cry.', note: 'Literary/dramatic expression.' },
          { particle: '～をもって (wo motte)', role: 'With / By means of (formal)', example: 'ほんじつ を もって へいてん します。', romaji: 'Honjitsu wo motte heiten shimasu.', english: 'We close (the store) as of today.', note: 'Very formal announcements.' },
          { particle: '～ともなると (to mo naru to)', role: 'When it comes to (high level)', example: 'しゃちょう ともなると、いそがしい。', romaji: 'Shachou to mo naru to, isogashii.', english: 'When you\'re a company president, you\'re busy.', note: 'Implies reaching a significant level.' },
          { particle: '～たりとも～ない (tari tomo ~ nai)', role: 'Not even one', example: 'いっぷん たりとも むだ に できない。', romaji: 'Ippun tari tomo muda ni dekinai.', english: 'I can\'t waste even one minute.', note: 'Strong emphatic negation.' },
          { particle: '～べからず (bekarazu)', role: 'Must not (archaic)', example: 'はいる べからず。', romaji: 'Hairu bekarazu.', english: 'Do not enter.', note: 'Found on signs and in classical writing.' },
        ],
      },
      {
        id: 'keigo-advanced',
        title: 'Advanced Keigo (Honorific System)',
        summary: 'Mastering the three levels of politeness',
        points: [
          { particle: 'そんけいご (Sonkeigo)', role: 'Respectful language', example: 'せんせい が おっしゃった。', romaji: 'Sensei ga osshatta.', english: 'The teacher said (respectful).', note: 'Elevates the other person. いう→おっしゃる, いく→いらっしゃる.' },
          { particle: 'けんじょうご (Kenjougo)', role: 'Humble language', example: 'わたし が もうしました。', romaji: 'Watashi ga moushimashita.', english: 'I said (humble).', note: 'Lowers yourself. いう→もうす, いく→まいる.' },
          { particle: 'ていねいご (Teineigo)', role: 'Polite language', example: 'ございます。', romaji: 'Gozaimasu.', english: '(It) exists (very polite).', note: 'General politeness. です/ます forms. ある→ございます.' },
        ],
      },
    ],
  },
];

export const sentenceStructureGuide = [
  { pattern: 'Topic は Comment', example: 'わたし は がくせい です。', romaji: 'Watashi wa gakusei desu.', english: 'I am a student.', level: 'N5' },
  { pattern: 'Subject が Verb', example: 'あめ が ふる。', romaji: 'Ame ga furu.', english: 'Rain falls.', level: 'N5' },
  { pattern: 'Subject は Object を Verb', example: 'わたし は ほん を よむ。', romaji: 'Watashi wa hon wo yomu.', english: 'I read a book.', level: 'N5' },
  { pattern: 'Place で Action Verb', example: 'としょかん で べんきょう する。', romaji: 'Toshokan de benkyou suru.', english: 'I study at the library.', level: 'N5' },
  { pattern: 'Time に Action', example: 'しちじ に おきる。', romaji: 'Shichiji ni okiru.', english: 'I wake up at 7.', level: 'N5' },
  { pattern: 'Noun1 の Noun2', example: 'にほん の たべもの。', romaji: 'Nihon no tabemono.', english: 'Japanese food.', level: 'N5' },
  { pattern: 'Verb て-form + Verb', example: 'おきて、はみがき を する。', romaji: 'Okite, hamigaki wo suru.', english: 'I wake up and brush my teeth.', level: 'N4' },
  { pattern: 'Clause から、Clause', example: 'あつい から、まど を あける。', romaji: 'Atsui kara, mado wo akeru.', english: 'Because it\'s hot, I open the window.', level: 'N4' },
  { pattern: 'Verb dictionary form + ことができる', example: 'にほんご を はなす こと が できる。', romaji: 'Nihongo wo hanasu koto ga dekiru.', english: 'I can speak Japanese.', level: 'N4' },
  { pattern: 'Relative clause + Noun', example: 'きのう かった ほん。', romaji: 'Kinou katta hon.', english: 'The book I bought yesterday.', level: 'N4' },
  { pattern: 'Verb ながら Verb', example: 'おんがく を ききながら べんきょう する。', romaji: 'Ongaku wo kikinagara benkyou suru.', english: 'I study while listening to music.', level: 'N3' },
  { pattern: 'Noun に よると、Clause', example: 'ニュース に よると、あした あめ だ。', romaji: 'Nyuusu ni yoru to, ashita ame da.', english: 'According to the news, it\'ll rain tomorrow.', level: 'N3' },
];
