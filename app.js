/* =========================================================================
   Lingora — app.js
   State, routing, mock data, and interactive learning modules.
   ========================================================================= */
"use strict";

/* -------------------------------------------------------------------------
   1. Data: languages, courses, lessons, exercises
   ------------------------------------------------------------------------- */
const LANGS = {
  en: { name: "英语", enName: "English", glyph: "En", romanLabel: "音标", bcp47: "en-US", cls: "lang-en" },
  ja: { name: "日语", enName: "Japanese", glyph: "あ", romanLabel: "罗马音", bcp47: "ja-JP", cls: "lang-ja" },
  ko: { name: "韩语", enName: "Korean", glyph: "한", romanLabel: "罗马音", bcp47: "ko-KR", cls: "lang-ko" },
  fr: { name: "法语", enName: "French", glyph: "Fr", romanLabel: "音标", bcp47: "fr-FR", cls: "lang-fr" },
  es: { name: "西班牙语", enName: "Spanish", glyph: "Es", romanLabel: "音标", bcp47: "es-ES", cls: "lang-es" },
};

const LEVELS = [
  { code: "A1", name: "入门", desc: "零基础起步" },
  { code: "A2", name: "初阶", desc: "日常简单表达" },
  { code: "B1", name: "进阶", desc: "流畅日常交流" },
  { code: "B2", name: "中高", desc: "复杂话题表达" },
  { code: "C1", name: "高阶", desc: "近母语流利" },
  { code: "C2", name: "精通", desc: "学术与专业级" },
];

// Lesson templates per language. Each lesson = { id, title, type, items }
// type: vocab | grammar | listen | speak
function buildCourses() {
  const data = { en: [], ja: [], ko: [], fr: [], es: [] };

  // ---- English ----
  data.en = [
    { code: "A1", title: "生活第一课", desc: "问候、数字与自我介绍", lessons: [
      { id: "en-a1-1", title: "基础问候", type: "vocab", items: vocabEN("greetings") },
      { id: "en-a1-2", title: "Be 动词与代词", type: "grammar", items: gramEN("be") },
      { id: "en-a1-3", title: "听懂自我介绍", type: "listen", items: listenEN("intro") },
      { id: "en-a1-4", title: "开口说：你好吗", type: "speak", items: speakEN("greet") },
    ]},
    { code: "A2", title: "日常对话", desc: "购物、点餐与问路", lessons: [
      { id: "en-a2-1", title: "餐厅点餐", type: "vocab", items: vocabEN("food") },
      { id: "en-a2-2", title: "一般现在时", type: "grammar", items: gramEN("present") },
      { id: "en-a2-3", title: "听懂问路对话", type: "listen", items: listenEN("directions") },
      { id: "en-a2-4", title: "开口说：点一杯咖啡", type: "speak", items: speakEN("order") },
    ]},
    { code: "B1", title: "职场沟通", desc: "邮件、会议与电话", lessons: [
      { id: "en-b1-1", title: "商务词汇", type: "vocab", items: vocabEN("business") },
      { id: "en-b1-2", title: "现在完成时", type: "grammar", items: gramEN("perfect") },
      { id: "en-b1-3", title: "听懂会议片段", type: "listen", items: listenEN("meeting") },
      { id: "en-b1-4", title: "开口说：电话预约", type: "speak", items: speakEN("call") },
    ]},
    { code: "B2", title: "观点表达", desc: "论证与辩论", lessons: [
      { id: "en-b2-1", title: "学术词汇", type: "vocab", items: vocabEN("academic") },
      { id: "en-b2-2", title: "虚拟语气", type: "grammar", items: gramEN("subjunctive") },
      { id: "en-b2-3", title: "听懂新闻评论", type: "listen", items: listenEN("news") },
      { id: "en-b2-4", title: "开口说：表达观点", type: "speak", items: speakEN("opinion") },
    ]},
    { code: "C1", title: "近母语流利", desc: "语用与文化", lessons: [
      { id: "en-c1-1", title: "高级习语", type: "vocab", items: vocabEN("idioms") },
      { id: "en-c1-2", title: "倒装与省略", type: "grammar", items: gramEN("inversion") },
    ]},
    { code: "C2", title: "精通表达", desc: "修辞与文学", lessons: [
      { id: "en-c2-1", title: "文学词汇", type: "vocab", items: vocabEN("literary") },
    ]},
  ];

  // ---- Japanese ----
  data.ja = [
    { code: "A1", title: "五十音起步", desc: "平假名与基础问候", lessons: [
      { id: "ja-a1-1", title: "日常挨拶", type: "vocab", items: vocabJA("greetings") },
      { id: "ja-a1-2", title: "です／ます 形", type: "grammar", items: gramJA("desu") },
      { id: "ja-a1-3", title: "听懂自我介绍", type: "listen", items: listenJA("intro") },
      { id: "ja-a1-4", title: "开口说：はじめまして", type: "speak", items: speakJA("greet") },
    ]},
    { code: "A2", title: "生活日语", desc: "购物与交通", lessons: [
      { id: "ja-a2-1", title: "商店用语", type: "vocab", items: vocabJA("shopping") },
      { id: "ja-a2-2", title: "て形变化", type: "grammar", items: gramJA("te") },
      { id: "ja-a2-3", title: "听懂车站广播", type: "listen", items: listenJA("station") },
      { id: "ja-a2-4", title: "开口说：问路", type: "speak", items: speakJA("ask") },
    ]},
    { code: "B1", title: "职场敬语", desc: "商务与敬语体系", lessons: [
      { id: "ja-b1-1", title: "商务词汇", type: "vocab", items: vocabJA("business") },
      { id: "ja-b1-2", title: "尊敬与谦让", type: "grammar", items: gramJA("keigo") },
      { id: "ja-b1-3", title: "听懂商务会议", type: "listen", items: listenJA("meeting") },
      { id: "ja-b1-4", title: "开口说：电话对应", type: "speak", items: speakJA("call") },
    ]},
    { code: "B2", title: "议论日语", desc: "新闻与论文", lessons: [
      { id: "ja-b2-1", title: "学术汉语", type: "vocab", items: vocabJA("academic") },
      { id: "ja-b2-2", title: "受身与使役", type: "grammar", items: gramJA("passive") },
    ]},
    { code: "C1", title: "高级表现", desc: "语感与文化", lessons: [
      { id: "ja-c1-1", title: "惯用句", type: "vocab", items: vocabJA("idioms") },
    ]},
    { code: "C2", title: "文学日语", desc: "古典与修辞", lessons: [
      { id: "ja-c2-1", title: "古典词汇", type: "vocab", items: vocabJA("classical") },
    ]},
  ];

  // ---- Korean ----
  data.ko = [
    { code: "A1", title: "韩文字母", desc: "한글与基础问候", lessons: [
      { id: "ko-a1-1", title: "기본 인사", type: "vocab", items: vocabKO("greetings") },
      { id: "ko-a1-2", title: "입니다/습니다", type: "grammar", items: gramKO("imnida") },
      { id: "ko-a1-3", title: "听懂自我介绍", type: "listen", items: listenKO("intro") },
      { id: "ko-a1-4", title: "开口说：안녕하세요", type: "speak", items: speakKO("greet") },
    ]},
    { code: "A2", title: "生活韩语", desc: "购物与点餐", lessons: [
      { id: "ko-a2-1", title: "음식 단어", type: "vocab", items: vocabKO("food") },
      { id: "ko-a2-2", title: "아요/어요", type: "grammar", items: gramKO("ayo") },
      { id: "ko-a2-3", title: "听懂点餐对话", type: "listen", items: listenKO("order") },
      { id: "ko-a2-4", title: "开口说：주문하기", type: "speak", items: speakKO("order") },
    ]},
    { code: "B1", title: "职场韩语", desc: "商务与敬语", lessons: [
      { id: "ko-b1-1", title: "비즈니스 어휘", type: "vocab", items: vocabKO("business") },
      { id: "ko-b1-2", title: "시제 표현", type: "grammar", items: gramKO("tense") },
      { id: "ko-b1-3", title: "听懂会议片段", type: "listen", items: listenKO("meeting") },
      { id: "ko-b1-4", title: "开口说：预约", type: "speak", items: speakKO("call") },
    ]},
    { code: "B2", title: "议论韩语", desc: "新闻与论证", lessons: [
      { id: "ko-b2-1", title: "학술 어휘", type: "vocab", items: vocabKO("academic") },
      { id: "ko-b2-2", title: "간접 화법", type: "grammar", items: gramKO("indirect") },
    ]},
    { code: "C1", title: "高级表现", desc: "语感与文化", lessons: [
      { id: "ko-c1-1", title: "관용 표현", type: "vocab", items: vocabKO("idioms") },
    ]},
    { code: "C2", title: "文学韩语", desc: "古典与修辞", lessons: [
      { id: "ko-c2-1", title: "문학 어휘", type: "vocab", items: vocabKO("literary") },
    ]},
  ];

  // ---- French & Spanish (lighter) ----
  data.fr = [
    { code: "A1", title: "Premiers pas", desc: "问候与自我介绍", lessons: [
      { id: "fr-a1-1", title: "Salutations", type: "vocab", items: vocabFR("greetings") },
      { id: "fr-a1-2", title: "Être / Avoir", type: "grammar", items: gramFR("etre") },
      { id: "fr-a1-3", title: "Se présenter", type: "listen", items: listenFR("intro") },
      { id: "fr-a1-4", title: "开口说：Bonjour", type: "speak", items: speakFR("greet") },
    ]},
    { code: "A2", title: "Au quotidien", desc: "购物与点餐", lessons: [
      { id: "fr-a2-1", title: "Nourriture", type: "vocab", items: vocabFR("food") },
      { id: "fr-a2-2", title: "Présent", type: "grammar", items: gramFR("present") },
    ]},
    { code: "B1", title: "Au travail", desc: "职场沟通", lessons: [
      { id: "fr-b1-1", title: "Business", type: "vocab", items: vocabFR("business") },
      { id: "fr-b1-2", title: "Passé composé", type: "grammar", items: gramFR("passe") },
    ]},
  ];
  data.es = [
    { code: "A1", title: "Primeros pasos", desc: "问候与自我介绍", lessons: [
      { id: "es-a1-1", title: "Saludos", type: "vocab", items: vocabES("greetings") },
      { id: "es-a1-2", title: "Ser / Estar", type: "grammar", items: gramES("ser") },
      { id: "es-a1-3", title: "Presentarse", type: "listen", items: listenES("intro") },
      { id: "es-a1-4", title: "开口说：Hola", type: "speak", items: speakES("greet") },
    ]},
    { code: "A2", title: "Lo cotidiano", desc: "购物与点餐", lessons: [
      { id: "es-a2-1", title: "Comida", type: "vocab", items: vocabES("food") },
      { id: "es-a2-2", title: "Presente", type: "grammar", items: gramES("present") },
    ]},
  ];

  return data;
}

/* ----- exercise banks (compact, reusable helpers) ----- */
// vocab item: { word, roman, meaning, example, exampleTr }
function vocabEN(set) {
  const map = {
    greetings: [
      { word: "Hello", roman: "/həˈloʊ/", meaning: "你好", example: "Hello, nice to meet you.", exampleTr: "你好，很高兴认识你。" },
      { word: "Goodbye", roman: "/ˌɡʊdˈbaɪ/", meaning: "再见", example: "Goodbye, see you tomorrow.", exampleTr: "再见，明天见。" },
      { word: "Thank you", roman: "/ˈθæŋk juː/", meaning: "谢谢", example: "Thank you for your help.", exampleTr: "谢谢你的帮助。" },
      { word: "Sorry", roman: "/ˈsɒri/", meaning: "抱歉", example: "Sorry, I'm late.", exampleTr: "抱歉我迟到了。" },
      { word: "Please", roman: "/pliːz/", meaning: "请", example: "Please sit down.", exampleTr: "请坐。" },
    ],
    food: [
      { word: "Menu", roman: "/ˈmenjuː/", meaning: "菜单", example: "Can I see the menu?", exampleTr: "我可以看下菜单吗？" },
      { word: "Bill", roman: "/bɪl/", meaning: "账单", example: "Could I have the bill?", exampleTr: "可以结账吗？" },
      { word: "Delicious", roman: "/dɪˈlɪʃəs/", meaning: "美味的", example: "This soup is delicious.", exampleTr: "这汤很美味。" },
      { word: "Spicy", roman: "/ˈspaɪsi/", meaning: "辣的", example: "I love spicy food.", exampleTr: "我喜欢吃辣。" },
      { word: "Vegetarian", roman: "/ˌvedʒəˈteəriən/", meaning: "素食的", example: "Do you have vegetarian options?", exampleTr: "有素食选择吗？" },
    ],
    business: [
      { word: "Deadline", roman: "/ˈdedlaɪn/", meaning: "截止日期", example: "The deadline is Friday.", exampleTr: "截止日期是周五。" },
      { word: "Schedule", roman: "/ˈʃedjuːl/", meaning: "日程", example: "Let's check the schedule.", exampleTr: "我们看下日程。" },
      { word: "Colleague", roman: "/ˈkɒliːɡ/", meaning: "同事", example: "My colleague will join us.", exampleTr: "我的同事会加入。" },
      { word: "Agenda", roman: "/əˈdʒendə/", meaning: "议程", example: "What's on the agenda?", exampleTr: "议程是什么？" },
      { word: "Negotiate", roman: "/nɪˈɡəʊʃieɪt/", meaning: "谈判", example: "We need to negotiate the price.", exampleTr: "我们需要谈价格。" },
    ],
    academic: [
      { word: "Hypothesis", roman: "/haɪˈpɒθəsɪs/", meaning: "假设", example: "Our hypothesis was confirmed.", exampleTr: "我们的假设被证实了。" },
      { word: "Analysis", roman: "/əˈnæləsɪs/", meaning: "分析", example: "The data analysis is complete.", exampleTr: "数据分析已完成。" },
      { word: "Significant", roman: "/sɪɡˈnɪfɪkənt/", meaning: "显著的", example: "The results are significant.", exampleTr: "结果是显著的。" },
      { word: "Perspective", roman: "/pəˈspektɪv/", meaning: "视角", example: "From a global perspective...", exampleTr: "从全球视角看……" },
      { word: "Synthesize", roman: "/ˈsɪnθəsaɪz/", meaning: "综合", example: "We synthesize the findings.", exampleTr: "我们综合了发现。" },
    ],
    idioms: [
      { word: "Break the ice", roman: "/breɪk ðə aɪs/", meaning: "打破僵局", example: "A joke can break the ice.", exampleTr: "一个笑话能打破僵局。" },
      { word: "Piece of cake", roman: "/piːs əv keɪk/", meaning: "小菜一碟", example: "The test was a piece of cake.", exampleTr: "考试很简单。" },
      { word: "Hit the books", roman: "/hɪt ðə bʊks/", meaning: "用功读书", example: "I need to hit the books tonight.", exampleTr: "我今晚得用功了。" },
      { word: "Cost an arm and a leg", roman: "/kɒst ən ɑːm ənd ə leɡ/", meaning: "代价昂贵", example: "That car cost an arm and a leg.", exampleTr: "那车贵得要命。" },
    ],
    literary: [
      { word: "Melancholy", roman: "/ˈmelənkəli/", meaning: "忧郁", example: "A deep melancholy filled him.", exampleTr: "深深的忧郁笼罩着他。" },
      { word: "Ephemeral", roman: "/ɪˈfemərəl/", meaning: "短暂的", example: "Beauty is ephemeral.", exampleTr: "美是短暂的。" },
      { word: "Solitude", roman: "/ˈsɒlɪtjuːd/", meaning: "孤独", example: "He sought solitude in the hills.", exampleTr: "他在山间寻觅孤独。" },
    ],
  };
  return map[set] || map.greetings;
}
function vocabJA(set) {
  const map = {
    greetings: [
      { word: "こんにちは", roman: "konnichiwa", meaning: "你好", example: "こんにちは、初めまして。", exampleTr: "你好，初次见面。" },
      { word: "ありがとう", roman: "arigatou", meaning: "谢谢", example: "本当にありがとう。", exampleTr: "真的非常感谢。" },
      { word: "すみません", roman: "sumimasen", meaning: "抱歉/劳驾", example: "すみません、駅はどこですか。", exampleTr: "请问，车站在哪？" },
      { word: "おはよう", roman: "ohayou", meaning: "早上好", example: "おはようございます。", exampleTr: "早上好。" },
      { word: "さようなら", roman: "sayounara", meaning: "再见", example: "では、さようなら。", exampleTr: "那么，再见。" },
    ],
    shopping: [
      { word: "これ", roman: "kore", meaning: "这个", example: "これをください。", exampleTr: "请给我这个。" },
      { word: "いくら", roman: "ikura", meaning: "多少钱", example: "これはいくらですか。", exampleTr: "这个多少钱？" },
      { word: "高い", roman: "takai", meaning: "贵的", example: "ちょっと高いですね。", exampleTr: "有点贵呢。" },
      { word: "安い", roman: "yasui", meaning: "便宜的", example: "これは安いです。", exampleTr: "这个很便宜。" },
      { word: "袋", roman: "fukuro", meaning: "袋子", example: "袋をください。", exampleTr: "请给我袋子。" },
    ],
    business: [
      { word: "会議", roman: "kaigi", meaning: "会议", example: "会議は三時からです。", exampleTr: "会议从三点开始。" },
      { word: "資料", roman: "shiryou", meaning: "资料", example: "資料を送ります。", exampleTr: "我会发送资料。" },
      { word: "担当者", roman: "tantousha", meaning: "负责人", example: "担当者は誰ですか。", exampleTr: "负责人是谁？" },
      { word: "確認", roman: "kakunin", meaning: "确认", example: "確認をお願いします。", exampleTr: "请确认。" },
      { word: "提出", roman: "teishutsu", meaning: "提交", example: "明日までに提出してください。", exampleTr: "请在明天前提交。" },
    ],
    academic: [
      { word: "研究", roman: "kenkyuu", meaning: "研究", example: "研究を続けています。", exampleTr: "我一直在做研究。" },
      { word: "結果", roman: "kekka", meaning: "结果", example: "結果を分析する。", exampleTr: "分析结果。" },
      { word: "影響", roman: "eikyou", meaning: "影响", example: "大きな影響がある。", exampleTr: "有很大影响。" },
      { word: "比較", roman: "hikaku", meaning: "比较", example: "二つを比較する。", exampleTr: "比较两者。" },
    ],
    idioms: [
      { word: "猫の手も借りたい", roman: "neko no te mo karitai", meaning: "忙得不可开交", example: "猫の手も借りたいほど忙しい。", exampleTr: "忙得想借猫的手。" },
      { word: "石の上にも三年", roman: "ishi no ue ni mo sannen", meaning: "功到自然成", example: "石の上にも三年だ。", exampleTr: "坚持三年自然成。" },
    ],
    classical: [
      { word: "あはれ", roman: "aware", meaning: "哀愁/情趣", example: "もののあはれを知る。", exampleTr: "懂得物哀之美。" },
      { word: "をかし", roman: "okashi", meaning: "风趣/有趣", example: "いとをかし。", exampleTr: "非常有趣。" },
    ],
  };
  return map[set] || map.greetings;
}
function vocabKO(set) {
  const map = {
    greetings: [
      { word: "안녕하세요", roman: "annyeonghaseyo", meaning: "你好", example: "안녕하세요, 만나서 반갑습니다.", exampleTr: "你好，很高兴见面。" },
      { word: "감사합니다", roman: "gamsahamnida", meaning: "谢谢", example: "도와주셔서 감사합니다.", exampleTr: "感谢你的帮助。" },
      { word: "죄송합니다", roman: "joesonghamnida", meaning: "抱歉", example: "늦어서 죄송합니다.", exampleTr: "抱歉迟到了。" },
      { word: "안녕히 가세요", roman: "annyeonghi gaseyo", meaning: "再见（送客）", example: "안녕히 가세요.", exampleTr: "再见，慢走。" },
      { word: "환영합니다", roman: "hwanyeonghamnida", meaning: "欢迎", example: "환영합니다!", exampleTr: "欢迎！" },
    ],
    food: [
      { word: "메뉴", roman: "menyu", meaning: "菜单", example: "메뉴를 주문하고 싶어요.", exampleTr: "我想看菜单。" },
      { word: "맵다", roman: "maepta", meaning: "辣的", example: "이 음식이 매워요.", exampleTr: "这食物很辣。" },
      { word: "맛있다", roman: "masitta", meaning: "好吃的", example: "정말 맛있어요.", exampleTr: "真的很好吃。" },
      { word: "계산", roman: "gyesan", meaning: "结账", example: "계산해 주세요.", exampleTr: "请结账。" },
    ],
    business: [
      { word: "회의", roman: "hoeui", meaning: "会议", example: "회의는 세 시에 시작해요.", exampleTr: "会议三点开始。" },
      { word: "자료", roman: "jaryo", meaning: "资料", example: "자료를 보내드릴게요.", exampleTr: "我会发资料给你。" },
      { word: "담당자", roman: "damdangja", meaning: "负责人", example: "담당자가 누구예요?", exampleTr: "负责人是谁？" },
      { word: "확인", roman: "hwagin", meaning: "确认", example: "확인해 주세요.", exampleTr: "请确认。" },
    ],
    academic: [
      { word: "연구", roman: "yeongu", meaning: "研究", example: "연구를 계속하고 있어요.", exampleTr: "我一直在研究。" },
      { word: "결과", roman: "gyeolgwa", meaning: "结果", example: "결과를 분석해요.", exampleTr: "分析结果。" },
      { word: "영향", roman: "yeonghyang", meaning: "影响", example: "큰 영향이 있어요.", exampleTr: "影响很大。" },
    ],
    idioms: [
      { word: "발이 넓다", roman: "bari neolda", meaning: "交际广", example: "그는 발이 넓어요.", exampleTr: "他人脉广。" },
      { word: "눈이 높다", roman: "nuni nolta", meaning: "眼光高", example: "눈이 높아서 안 만나요.", exampleTr: "眼光高所以不交往。" },
    ],
    literary: [
      { word: "향수", roman: "hyangsu", meaning: "乡愁", example: "고향의 향수.", exampleTr: "对故乡的乡愁。" },
      { word: "정조", roman: "jeongjo", meaning: "情操/情致", example: "고결한 정조.", exampleTr: "高洁的情操。" },
    ],
  };
  return map[set] || map.greetings;
}
function vocabFR(set) {
  const map = {
    greetings: [
      { word: "Bonjour", roman: "/bɔ̃.ʒuʁ/", meaning: "你好", example: "Bonjour, comment allez-vous ?", exampleTr: "你好，你怎么样？" },
      { word: "Merci", roman: "/mɛʁ.si/", meaning: "谢谢", example: "Merci beaucoup.", exampleTr: "非常感谢。" },
      { word: "Au revoir", roman: "/o.ʁə.vwaʁ/", meaning: "再见", example: "Au revoir et à demain.", exampleTr: "再见，明天见。" },
      { word: "S'il vous plaît", roman: "/sil.vu.plɛ/", meaning: "请", example: "Un café, s'il vous plaît.", exampleTr: "请来一杯咖啡。" },
    ],
    food: [
      { word: "Le menu", roman: "/lə.mə.ny/", meaning: "菜单", example: "Le menu, s'il vous plaît.", exampleTr: "请给我菜单。" },
      { word: "L'addition", roman: "/la.di.sjɔ̃/", meaning: "账单", example: "L'addition, s'il vous plaît.", exampleTr: "请结账。" },
      { word: "Délicieux", roman: "/de.li.sjø/", meaning: "美味的", example: "C'est délicieux !", exampleTr: "太好吃了！" },
    ],
    business: [
      { word: "La réunion", roman: "/la.ʁe.y.njɔ̃/", meaning: "会议", example: "La réunion est à trois heures.", exampleTr: "会议三点开始。" },
      { word: "Le collègue", roman: "/lə.kɔ.lɛɡ/", meaning: "同事", example: "Mon collègue arrive.", exampleTr: "我的同事来了。" },
    ],
  };
  return map[set] || map.greetings;
}
function vocabES(set) {
  const map = {
    greetings: [
      { word: "Hola", roman: "/ˈo.la/", meaning: "你好", example: "Hola, ¿cómo estás?", exampleTr: "你好，你怎么样？" },
      { word: "Gracias", roman: "/ˈɡɾa.sjas/", meaning: "谢谢", example: "Muchas gracias.", exampleTr: "非常感谢。" },
      { word: "Adiós", roman: "/aˈðjos/", meaning: "再见", example: "Adiós, hasta mañana.", exampleTr: "再见，明天见。" },
      { word: "Por favor", roman: "/poɾ.faˈβoɾ/", meaning: "请", example: "Un café, por favor.", exampleTr: "请来一杯咖啡。" },
    ],
    food: [
      { word: "El menú", roman: "/el.meˈnu/", meaning: "菜单", example: "El menú, por favor.", exampleTr: "请给我菜单。" },
      { word: "La cuenta", roman: "/laˈkwen.ta/", meaning: "账单", example: "La cuenta, por favor.", exampleTr: "请结账。" },
      { word: "Delicioso", roman: "/de.liˈsjoso/", meaning: "美味的", example: "Está delicioso.", exampleTr: "很美味。" },
    ],
  };
  return map[set] || map.greetings;
}

// grammar item: { q (with ____), opts, answer (index), explain }
function gramEN(set) {
  const map = {
    be: [
      { q: "I ____ a student.", opts: ["am", "is", "are", "be"], answer: 0, explain: "主语 I 固定搭配 am。" },
      { q: "She ____ my sister.", opts: ["am", "is", "are", "be"], answer: 1, explain: "第三人称单数用 is。" },
      { q: "They ____ from Japan.", opts: ["am", "is", "are", "be"], answer: 2, explain: "复数主语用 are。" },
      { q: "____ you ready?", opts: ["Am", "Is", "Are", "Be"], answer: 2, explain: "疑问句 you 用 are。" },
    ],
    present: [
      { q: "He ____ coffee every morning.", opts: ["drink", "drinks", "drinking", "drank"], answer: 1, explain: "三单现在时动词加 s。" },
      { q: "We ____ in Shanghai.", opts: ["lives", "living", "live", "lived"], answer: 2, explain: "复数主语用动词原形。" },
      { q: "She ____ not like tea.", opts: ["do", "does", "is", "has"], answer: 1, explain: "三单否定用 does not。" },
    ],
    perfect: [
      { q: "I ____ already finished my homework.", opts: ["have", "has", "had", "having"], answer: 0, explain: "I 用 have + 过去分词。" },
      { q: "She ____ been to Paris twice.", opts: ["have", "has", "is", "was"], answer: 1, explain: "三单用 has。" },
      { q: "____ you ever eaten sushi?", opts: ["Did", "Have", "Are", "Were"], answer: 1, explain: "经验提问用 Have。" },
    ],
    subjunctive: [
      { q: "If I ____ rich, I would travel the world.", opts: ["am", "was", "were", "be"], answer: 2, explain: "虚拟语气与现在事实相反，用 were。" },
      { q: "I wish I ____ more time.", opts: ["have", "had", "having", "has"], answer: 1, explain: "wish 后接过去式表虚拟。" },
    ],
    inversion: [
      { q: "Never ____ such a beautiful sunset.", opts: ["I saw", "have I seen", "I have seen", "did I saw"], answer: 1, explain: "否定副词前置引发部分倒装。" },
    ],
  };
  return map[set] || map.be;
}
function gramJA(set) {
  const map = {
    desu: [
      { q: "私は学生____。", opts: ["です", "ます", "だ", "の"], answer: 0, explain: "礼貌体用 です。" },
      { q: "これは本____。", opts: ["です", "ます", "だ", "の"], answer: 0, explain: "名词谓语礼貌体 です。" },
      { q: "私は毎日コーヒーを飲み____。", opts: ["です", "ます", "だ", "の"], answer: 1, explain: "动词礼貌体用 ます。" },
    ],
    te: [
      { q: "食べて____。", opts: ["ください", "ます", "です", "だ"], answer: 0, explain: "て形+ください 表请求。" },
      { q: "飲んで____。", opts: ["ます", "ください", "です", "だ"], answer: 1, explain: "て形+ください。" },
    ],
    keigo: [
      { q: "先生はいらっしゃ____。", opts: ["います", "る", "た", "ない"], answer: 0, explain: "尊敬语：いらっしゃいます。" },
      { q: "私が申し____。", opts: ["ます", "あげます", "ください", "だ"], answer: 0, explain: "谦让语：申します。" },
    ],
    passive: [
      { q: "私は先生____褒められた。", opts: ["に", "を", "が", "で"], answer: 0, explain: "被动句动作主用 に。" },
    ],
  };
  return map[set] || map.desu;
}
function gramKO(set) {
  const map = {
    imnida: [
      { q: "저는 학생____.", opts: ["입니다", "습니다", "해요", "이다"], answer: 0, explain: "名词谓语格式 ㅂ니다。" },
      { q: "공부합____.", opts: ["니다", "이다", "해요", "아요"], answer: 0, explain: "动词格式体终结 ㅂ니다。" },
    ],
    ayo: [
      { q: "커피를 마____.", opts: ["세요", "서요", "아요", "습니다"], answer: 2, explain: "非格式体 해요体。" },
      { q: "책을 읽____.", opts: ["어요", "아요", "습니다", "입니다"], answer: 0, explain: "读 읽다 → 읽어요。" },
    ],
    tense: [
      { q: "어제 영화를 보____.", opts: ["았어요", "어요", "겠어요", "ㅂ니다"], answer: 0, explain: "过去时 았/었 + 어요。" },
    ],
    indirect: [
      { q: "그는 온다고 했____.", opts: ["어요", "다", "는", "았다"], answer: 0, explain: "间接引语 +고 했어요。" },
    ],
  };
  return map[set] || map.imnida;
}
function gramFR(set) {
  const map = {
    etre: [
      { q: "Je ____ étudiant.", opts: ["suis", "es", "est", "être"], answer: 0, explain: "je + suis。" },
      { q: "Elle ____ française.", opts: ["suis", "es", "est", "êtes"], answer: 2, explain: "elle + est。" },
    ],
    present: [
      { q: "Nous ____ à Paris.", opts: ["habite", "habitons", "habitez", "habites"], answer: 1, explain: "nous 词尾 -ons。" },
    ],
    passe: [
      { q: "J'____ mangé une pizza.", opts: ["ai", "as", "a", "ont"], answer: 0, explain: "je + ai + 过去分词。" },
    ],
  };
  return map[set] || map.etre;
}
function gramES(set) {
  const map = {
    ser: [
      { q: "Yo ____ estudiante.", opts: ["soy", "eres", "es", "ser"], answer: 0, explain: "yo + soy。" },
      { q: "Ella ____ de Madrid.", opts: ["soy", "eres", "es", "son"], answer: 2, explain: "ella + es。" },
    ],
    present: [
      { q: "Nosotros ____ en Madrid.", opts: ["vive", "vivimos", "viven", "vives"], answer: 1, explain: "nosotros 词尾 -imos。" },
    ],
  };
  return map[set] || map.ser;
}

// listen item: { text (spoken), transcript, q, opts, answer }
function listenEN(set) {
  const map = {
    intro: [
      { text: "Hi, my name is Alex. I'm from Canada and I work as a designer.", transcript: "你好，我叫 Alex。我来自加拿大，是一名设计师。", q: "Where is Alex from?", opts: ["Japan", "Canada", "China", "Korea"], answer: 1 },
      { text: "I have two sisters and one brother. We live together in Shanghai.", transcript: "我有两个姐妹和一个兄弟。我们住在上海。", q: "How many siblings does the speaker have?", opts: ["One", "Two", "Three", "Four"], answer: 2 },
    ],
    directions: [
      { text: "Go straight and turn left at the second traffic light. The station is on your right.", transcript: "直走，在第二个红绿灯左转。车站在你右手边。", q: "Where is the station?", opts: ["On the left", "On the right", "Straight ahead", "Behind you"], answer: 1 },
    ],
    meeting: [
      { text: "Let's circle back to this issue after we review the quarterly report.", transcript: "我们在回顾季度报告后再回到这个问题。", q: "What will they do first?", opts: ["End the meeting", "Review the report", "Make a decision", "Take a break"], answer: 1 },
    ],
    news: [
      { text: "The new policy aims to reduce carbon emissions by forty percent within five years.", transcript: "新政策旨在五年内减少百分之四十的碳排放。", q: "What is the goal of the policy?", opts: ["Increase emissions", "Reduce emissions by 40%", "Build more factories", "Cut jobs"], answer: 1 },
    ],
  };
  return map[set] || map.intro;
}
function listenJA(set) {
  const map = {
    intro: [
      { text: "こんにちは、私は田中です。東京から来ました。会社員です。", transcript: "你好，我是田中。来自东京。是公司职员。", q: "田中さんはどこから来ましたか？", opts: ["大阪", "東京", "韓国", "京都"], answer: 1 },
    ],
    station: [
      { text: "まもなく電車が参ります。黄色い線の後ろにお下がりください。", transcript: "电车即将进站。请退到黄线之后。", q: "乘客应该怎么做？", opts: ["往前走", "退到黄线后", "上车", "按按钮"], answer: 1 },
    ],
    meeting: [
      { text: "それでは、議題に移りましょう。まず資料を確認してください。", transcript: "那么，进入议程。请先确认资料。", q: "首先做什么？", opts: ["结束会议", "确认资料", "做决定", "休息"], answer: 1 },
    ],
  };
  return map[set] || map.intro;
}
function listenKO(set) {
  const map = {
    intro: [
      { text: "안녕하세요, 저는 김민준입니다. 서울에서 왔어요. 학생이에요.", transcript: "你好，我是金敏俊。来自首尔。是学生。", q: "화자는 어디에서 왔어요?", opts: ["부산", "서울", "도쿄", "베이징"], answer: 1 },
    ],
    order: [
      { text: "김치찌개 하나하고 밥 두 개 주세요.", transcript: "请给我一个泡菜汤和两份饭。", q: "화자는 무엇을 시켰어요?", opts: ["된장찌개와 밥", "김치찌개와 밥 2개", "비빔밥", "냉면"], answer: 1 },
    ],
    meeting: [
      { text: "그럼, 의제로 넘어가겠습니다. 먼저 자료를 확인해 주세요.", transcript: "那么，进入议程。请先确认资料。", q: "먼저 무엇을 해요?", opts: ["회의 끝내기", "자료 확인", "결정하기", "쉬기"], answer: 1 },
    ],
  };
  return map[set] || map.intro;
}
function listenFR(set) {
  const map = {
    intro: [
      { text: "Bonjour, je m'appelle Marie. Je viens de Lyon et je suis professeure.", transcript: "你好，我叫 Marie。我来自里昂，是一名老师。", q: "D'où vient Marie ?", opts: ["Paris", "Lyon", "Londres", "Tokyo"], answer: 1 },
    ],
  };
  return map[set] || map.intro;
}
function listenES(set) {
  const map = {
    intro: [
      { text: "Hola, me llamo Carlos. Vengo de Madrid y soy profesor.", transcript: "你好，我叫 Carlos。我来自马德里，是一名老师。", q: "¿De dónde viene Carlos?", opts: ["Madrid", "Lima", "Tokio", "París"], answer: 0 },
    ],
  };
  return map[set] || map.intro;
}

// speak item: { phrase, roman, meaning, hint }
function speakEN(set) {
  const map = {
    greet: [
      { phrase: "Hello, how are you?", roman: "/həˈloʊ haʊ ɑːr juː/", meaning: "你好，你好吗？", hint: "注意 how 的发音，嘴唇收圆。" },
      { phrase: "Nice to meet you.", roman: "/naɪs tuː miːt juː/", meaning: "很高兴认识你。", hint: "meet 的长元音要拉长。" },
    ],
    order: [
      { phrase: "Can I have a coffee, please?", roman: "/kæn aɪ hæv ə ˈkɒfi pliːz/", meaning: "请给我一杯咖啡。", hint: "重音在 CAF-fee。" },
    ],
    call: [
      { phrase: "Could we schedule a meeting for tomorrow?", roman: "", meaning: "我们可以约个明天的会议吗？", hint: "语调在句末上升表示礼貌。" },
    ],
    opinion: [
      { phrase: "In my opinion, we should focus on quality.", roman: "", meaning: "在我看来，我们应该注重质量。", hint: "In my opinion 连读。" },
    ],
  };
  return map[set] || map.greet;
}
function speakJA(set) {
  const map = {
    greet: [
      { phrase: "はじめまして、よろしくお願いします。", roman: "hajimemashite, yoroshiku onegaishimasu", meaning: "初次见面，请多关照。", hint: "よろしく 的节奏要平稳。" },
      { phrase: "こんにちは。", roman: "konnichiwa", meaning: "你好。", hint: "wa 的口型要圆。" },
    ],
    ask: [
      { phrase: "すみません、駅はどこですか。", roman: "sumimasen, eki wa doko desu ka", meaning: "请问，车站在哪里？", hint: "语调在句末轻微上扬。" },
    ],
    call: [
      { phrase: "お世話になっております。", roman: "osewa ni natte orimasu", meaning: "承蒙关照。", hint: "商务电话开场白。" },
    ],
  };
  return map[set] || map.greet;
}
function speakKO(set) {
  const map = {
    greet: [
      { phrase: "안녕하세요, 만나서 반갑습니다.", roman: "annyeonghaseyo, mannaseo bangapseumnida", meaning: "你好，很高兴见面。", hint: "반갑 重音。" },
      { phrase: "감사합니다.", roman: "gamsahamnida", meaning: "谢谢。", hint: "三音节平稳。" },
    ],
    order: [
      { phrase: "김치찌개 하나 주세요.", roman: "gimchijjigae hana juseyo", meaning: "请给我一个泡菜汤。", hint: "주세요 表请求。" },
    ],
    call: [
      { phrase: "예약하고 싶은데요.", roman: "yeyakhago sipeundeyo", meaning: "我想预约。", hint: "-ㄴ데요 表委婉语气。" },
    ],
  };
  return map[set] || map.greet;
}
function speakFR(set) {
  const map = {
    greet: [
      { phrase: "Bonjour, comment allez-vous ?", roman: "/bɔ̃.ʒuʁ kɔ.mɑ̃ ta.le.vu/", meaning: "你好，您好吗？", hint: "鼻化音 bon。" },
    ],
  };
  return map[set] || map.greet;
}
function speakES(set) {
  const map = {
    greet: [
      { phrase: "Hola, ¿cómo estás?", roman: "/ˈo.la ˈko.mo esˈtas/", meaning: "你好，你怎么样？", hint: "h 不发音。" },
    ],
  };
  return map[set] || map.greet;
}

const COURSES = buildCourses();

// helper: find a lesson by id
function findLesson(id) {
  for (const lang of Object.keys(COURSES)) {
    for (const course of COURSES[lang]) {
      const l = course.lessons.find(x => x.id === id);
      if (l) return { lang, course, lesson: l };
    }
  }
  return null;
}

/* -------------------------------------------------------------------------
   2. State management (localStorage)
   ------------------------------------------------------------------------- */
const STORE_KEY = "lingora.state.v1";
function defaultState() {
  return {
    user: null,            // { name, email, langs: [..], joinedAt }
    users: [],             // registered accounts [{name,email,pass}]
    progress: {},          // lessonId -> { done, xp, best, skillScores }
    lessonSeq: {},         // lessonId -> index reached in current run
    streak: { count: 0, last: null },
    xp: 0,
    community: seedPosts(),
    likes: {},             // postId -> liked bool
    achievements: {},
    history: [],            // [{date}]
  };
}
function seedPosts() {
  return [
    { id: "p1", author: "林晚晴", avatar: "林", avColor: "#D9613F", lang: "ja", time: "2小时前", body: "今天终于把日语て形背下来了！「食べて、飲んで、遊んで」节奏感好强，越读越上头 ✨", likes: 24, replies: 3 },
    { id: "p2", author: "Daniel K.", avatar: "D", avColor: "#134E48", lang: "en", time: "5小时前", body: "Question for everyone: how do you keep motivated during the B2 plateau? It feels like I'm not improving anymore.", likes: 41, replies: 8 },
    { id: "p3", author: "최수민", avatar: "최", avColor: "#C9962E", lang: "ko", time: "昨天", body: "韩语해요体真的太实用了，今天在便利店全程用上了！店员还夸我发音标准 ㅎㅎ", likes: 33, replies: 5 },
    { id: "p4", author: "Marie L.", avatar: "M", avColor: "#5B2A4E", lang: "fr", time: "2天前", body: "Le subjonctif français me rend fou 😅 但 Lingora 的语法拆解真的很清楚，终于懂了。", likes: 18, replies: 2 },
  ];
}
let state = loadState();
function loadState() {
  try {
    const raw = localStorage.getItem(STORE_KEY);
    if (raw) return Object.assign(defaultState(), JSON.parse(raw));
  } catch (e) {}
  return defaultState();
}
function saveState() {
  try { localStorage.setItem(STORE_KEY, JSON.stringify(state)); } catch (e) {}
}

/* -------------------------------------------------------------------------
   3. Utilities
   ------------------------------------------------------------------------- */
const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => Array.from(root.querySelectorAll(sel));
const el = (tag, attrs = {}, html = "") => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k === "html") e.innerHTML = v;
    else if (k.startsWith("on") && typeof v === "function") e.addEventListener(k.slice(2), v);
    else if (v !== null && v !== undefined) e.setAttribute(k, v);
  }
  if (html) e.innerHTML = html;
  return e;
};
function toast(msg, type = "") {
  const stack = $("#toastStack");
  const t = el("div", { class: "toast " + type });
  const icon = type === "ok" ? "✓" : type === "warn" ? "!" : "◆";
  t.innerHTML = `<span class="ic">${icon}</span><span>${msg}</span>`;
  stack.appendChild(t);
  setTimeout(() => { t.style.opacity = "0"; t.style.transform = "translateY(10px)"; }, 2600);
  setTimeout(() => t.remove(), 3100);
}
function todayStr() { return new Date().toISOString().slice(0, 10); }
function initials(name) { return (name || "?").trim().charAt(0).toUpperCase(); }

/* achievements definitions */
const ACHIEVEMENTS = [
  { id: "first_lesson", name: "迈出第一步", desc: "完成第一节课", icon: "🌱", check: s => Object.keys(s.progress).filter(id => s.progress[id]?.done).length >= 1 },
  { id: "polyglot", name: "多语种探索者", desc: "学习 3 种语言", icon: "🌍", check: s => uniqueLangsLearned(s) >= 3 },
  { id: "streak3", name: "连续三天", desc: "保持 3 天连续学习", icon: "🔥", check: s => s.streak.count >= 3 },
  { id: "streak7", name: "一周不辍", desc: "连续 7 天学习", icon: "⚡", check: s => s.streak.count >= 7 },
  { id: "words50", name: "词汇收集家", desc: "学完 50 个单词", icon: "📚", check: s => wordsLearned(s) >= 50 },
  { id: "speak10", name: "敢开口", desc: "完成 10 次口语练习", icon: "🎤", check: s => speakCount(s) >= 10 },
  { id: "level_a2", name: "初阶达成", desc: "通过任一语言 A2", icon: "🏅", check: s => levelPassed(s, "A2") },
  { id: "level_b1", name: "进阶达成", desc: "通过任一语言 B1", icon: "🥈", check: s => levelPassed(s, "B1") },
  { id: "xp500", name: "勤奋学者", desc: "累计 500 XP", icon: "💎", check: s => s.xp >= 500 },
  { id: "xp2000", name: "语言大师", desc: "累计 2000 XP", icon: "👑", check: s => s.xp >= 2000 },
  { id: "social", name: "社区之声", desc: "在社区发布第一条动态", icon: "💬", check: s => s.community.some(p => p.author === s.user?.name) },
  { id: "all_skills", name: "全能型选手", desc: "四项技能各练一次", icon: "🎯", check: s => allSkillsTouched(s) },
];
function uniqueLangsLearned(s) {
  const set = new Set();
  for (const id of Object.keys(s.progress)) {
    if (s.progress[id]?.done) { const f = findLesson(id); if (f) set.add(f.lang); }
  }
  return set.size;
}
function wordsLearned(s) {
  let n = 0;
  for (const id of Object.keys(s.progress)) {
    if (s.progress[id]?.done) { const f = findLesson(id); if (f && f.lesson.type === "vocab") n += f.lesson.items.length; }
  }
  return n;
}
function speakCount(s) {
  let n = 0;
  for (const id of Object.keys(s.progress)) {
    if (s.progress[id]?.done) { const f = findLesson(id); if (f && f.lesson.type === "speak") n += f.lesson.items.length; }
  }
  return n;
}
function levelPassed(s, code) {
  for (const lang of Object.keys(COURSES)) {
    const course = COURSES[lang].find(c => c.code === code);
    if (!course) continue;
    if (course.lessons.every(l => s.progress[l.id]?.done)) return true;
  }
  return false;
}
function allSkillsTouched(s) {
  const types = new Set();
  for (const id of Object.keys(s.progress)) { if (s.progress[id]?.done) { const f = findLesson(id); if (f) types.add(f.lesson.type); } }
  return ["vocab","grammar","listen","speak"].every(t => types.has(t));
}
function recomputeAchievements() {
  for (const a of ACHIEVEMENTS) {
    const was = !!state.achievements[a.id];
    const now = a.check(state);
    state.achievements[a.id] = now;
    if (now && !was) {
      toast(`成就解锁：${a.icon} ${a.name}`, "ok");
      state.xp += 60;
    }
  }
}

/* skill aggregation per language */
function langSkillScores(lang) {
  // returns { vocab, grammar, listen, speak, overall } 0-100
  const totals = { vocab: 0, grammar: 0, listen: 0, speak: 0 };
  const counts = { vocab: 0, grammar: 0, listen: 0, speak: 0 };
  for (const course of COURSES[lang]) {
    for (const l of course.lessons) {
      counts[l.type] = (counts[l.type] || 0) + 1;
      const p = state.progress[l.id];
      if (p?.done) totals[l.type] += 1;
    }
  }
  const out = {};
  let sum = 0, n = 0;
  for (const t of ["vocab","grammar","listen","speak"]) {
    out[t] = counts[t] ? Math.round((totals[t] / counts[t]) * 100) : 0;
    sum += out[t]; n++;
  }
  out.overall = Math.round(sum / n);
  return out;
}
function lessonsDoneInCourse(course) {
  return course.lessons.filter(l => state.progress[l.id]?.done).length;
}
function courseProgress(course) {
  return Math.round((lessonsDoneInCourse(course) / course.lessons.length) * 100);
}

/* -------------------------------------------------------------------------
   4. Speech (TTS + recognition)
   ------------------------------------------------------------------------- */
const synth = window.speechSynthesis;
function speak(text, lang) {
  if (!synth) return;
  try { synth.cancel(); } catch(e){}
  const u = new SpeechSynthesisUtterance(text);
  u.lang = LANGS[lang]?.bcp47 || "en-US";
  u.rate = 0.92; u.pitch = 1;
  synth.speak(u);
}
let recog = null;
function getRecognition(lang) {
  const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
  if (!SR) return null;
  const r = new SR();
  r.lang = LANGS[lang]?.bcp47 || "en-US";
  r.interimResults = false;
  r.maxAlternatives = 1;
  return r;
}
// simple similarity scoring (Levenshtein-based, normalized)
function similarity(a, b) {
  a = (a || "").toLowerCase().replace(/[.,!?。、，！？\s]/g, "");
  b = (b || "").toLowerCase().replace(/[.,!?。、，！？\s]/g, "");
  if (!a || !b) return 0;
  const m = a.length, n = b.length;
  const dp = Array.from({ length: m + 1 }, () => new Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++) {
    for (let j = 1; j <= n; j++) {
      const cost = a[i-1] === b[j-1] ? 0 : 1;
      dp[i][j] = Math.min(dp[i-1][j] + 1, dp[i][j-1] + 1, dp[i-1][j-1] + cost);
    }
  }
  const dist = dp[m][n];
  return Math.max(0, Math.round((1 - dist / Math.max(m, n)) * 100));
}

/* -------------------------------------------------------------------------
   5. Router & topbar
   ------------------------------------------------------------------------- */
const routes = {
  "": renderAuth,
  "#/auth": renderAuth,
  "#/dashboard": renderDashboard,
  "#/courses": renderCourses,
  "#/course": renderCourseDetail,
  "#/lesson": renderLesson,
  "#/progress": renderProgress,
  "#/community": renderCommunity,
  "#/achievements": renderAchievements,
};
function route() {
  const hash = location.hash || (state.user ? "#/dashboard" : "#/auth");
  // auth gate
  if (!state.user && hash !== "#/auth" && hash !== "") {
    location.hash = "#/auth";
    return;
  }
  const [path, query] = hash.split("?");
  const fn = routes[path] || renderDashboard;
  document.body.classList.remove("view-pg");
  void document.body.offsetWidth;
  document.body.classList.add("view-pg");
  fn(query || "");
  syncTopbar(path);
  window.scrollTo({ top: 0, behavior: "instant" in window ? "instant" : "auto" });
}
function syncTopbar(path) {
  const authed = !!state.user;
  $("#topbar").hidden = !authed;
  $("#foot").hidden = !authed;
  if (authed) {
    $$("#mainNav a").forEach(a => a.classList.toggle("active", a.getAttribute("data-nav") === path.replace("#/","")));
    const sc = $("#streakChip"), xc = $("#xpChip"), av = $("#avatarBtn");
    sc.hidden = false; xc.hidden = false; av.hidden = false;
    $("#streakCount").textContent = state.streak.count;
    $("#xpCount").textContent = state.xp;
    av.textContent = initials(state.user.name);
  }
}
window.addEventListener("hashchange", route);

/* -------------------------------------------------------------------------
   6. Views
   ------------------------------------------------------------------------- */
const view = () => $("#view");

/* ----- Auth ----- */
function renderAuth() {
  $("#topbar").hidden = true; $("#foot").hidden = true;
  const langs = Object.entries(LANGS).map(([k,v]) => `<label><input type="checkbox" value="${k}" name="lang" ${state.user?.langs?.includes(k) ? "checked" : ""}><span>${v.glyph}</span>${v.name}</label>`).join("");
  view().innerHTML = `
    <div class="auth-wrap">
      <aside class="auth-art">
        <div class="brand"><span class="brand-mark" style="background:rgba(255,255,255,.15);color:var(--gold-2)">L</span><span class="brand-name" style="color:var(--paper-2)">Lingora</span></div>
        <div class="word-cloud" style="font-size:26px;flex:1;display:flex;align-items:center;">
          <span>Hello</span><span>こんにちは</span><span>안녕</span><span>Bonjour</span><span>Hola</span><span>你好</span><span>Grazie</span><span>ありがとう</span>
        </div>
        <p class="quote">One language sets the stage for a lifetime. <em>Many languages</em> set you free.</p>
        <p class="muted" style="color:rgba(244,238,226,.6);font-size:13px;">沉浸式多语种学习 · 分级课程 · 互动训练 · 社区成长</p>
      </aside>
      <section class="auth-panel">
        <div class="auth-card">
          <div class="brand"><span class="brand-mark">L</span><span class="brand-name">Lingora</span></div>
          <div class="auth-tabs" id="authTabs">
            <button data-tab="login" class="active">登录</button>
            <button data-tab="register">注册</button>
          </div>
          <form id="authForm" autocomplete="off">
            <div id="nameField" class="field" hidden>
              <label>昵称</label>
              <input type="text" name="name" placeholder="给自己起个昵称" />
              <div class="field-error" data-for="name"></div>
            </div>
            <div class="field">
              <label>邮箱</label>
              <input type="email" name="email" placeholder="you@example.com" />
              <div class="field-error" data-for="email"></div>
            </div>
            <div class="field">
              <label>密码</label>
              <input type="password" name="password" placeholder="至少 4 位" />
              <div class="field-error" data-for="password"></div>
            </div>
            <div id="langField" class="field" hidden>
              <label>想学哪些语言？（可多选）</label>
              <div class="lang-pick">${langs}</div>
            </div>
            <button type="submit" class="btn btn-primary btn-block btn-lg" style="margin-top:8px">继续</button>
          </form>
          <p class="auth-hint" id="authHint">已有账号？点击右上角「登录」</p>
          <p class="auth-hint muted">演示数据保存在本地浏览器，无需真实邮箱。</p>
        </div>
      </section>
    </div>
  `;
  let mode = "login";
  $$("#authTabs button").forEach(b => b.addEventListener("click", () => {
    mode = b.dataset.tab;
    $$("#authTabs button").forEach(x => x.classList.toggle("active", x === b));
    $("#nameField").hidden = mode !== "register";
    $("#langField").hidden = mode !== "register";
    $("#authHint").textContent = mode === "register" ? "已有账号？切换到「登录」" : "新用户？切换到「注册」";
  }));
  $("#authForm").addEventListener("submit", e => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const data = Object.fromEntries(fd.entries());
    const langs = fd.getAll("lang");
    // clear errors
    $$(".field-error").forEach(e => e.textContent = "");
    let ok = true;
    if (!/^\S+@\S+\.\S+$/.test(data.email || "")) { $('[data-for="email"]').textContent = "请输入有效邮箱"; ok = false; }
    if ((data.password || "").length < 4) { $('[data-for="password"]').textContent = "密码至少 4 位"; ok = false; }
    if (mode === "register") {
      if (!data.name) { $('[data-for="name"]').textContent = "请填写昵称"; ok = false; }
      if (state.users.some(u => u.email === data.email)) { $('[data-for="email"]').textContent = "该邮箱已注册"; ok = false; }
    } else {
      const u = state.users.find(u => u.email === data.email && u.pass === data.password);
      if (!u) { $('[data-for="email"]').textContent = "邮箱或密码不正确"; ok = false; }
      else if (ok) {
        state.user = { name: u.name, email: u.email, langs: u.langs, joinedAt: u.joinedAt };
        saveState(); afterLogin();
        return;
      }
    }
    if (!ok) return;
    // register
    const userObj = { name: data.name, email: data.email, pass: data.password, langs: langs.length ? langs : ["en"], joinedAt: Date.now() };
    state.users.push(userObj);
    state.user = { name: userObj.name, email: userObj.email, langs: userObj.langs, joinedAt: userObj.joinedAt };
    saveState(); afterLogin();
  });
}
function afterLogin() {
  // seed a bit of history/streak for demo feel on first login
  if (state.history.length === 0) {
    const d = new Date(); d.setDate(d.getDate() - 1);
    state.history.push({ date: todayStr() });
    state.streak = { count: 1, last: todayStr() };
  }
  toast(`欢迎回来，${state.user.name}！`, "ok");
  location.hash = "#/dashboard";
}

/* ----- Dashboard ----- */
function renderDashboard() {
  const userLangs = state.user.langs.length ? state.user.langs : ["en"];
  const primary = userLangs[0];
  const langInfo = LANGS[primary];
  // overall progress for primary language
  const allLessons = COURSES[primary].flatMap(c => c.lessons);
  const done = allLessons.filter(l => state.progress[l.id]?.done).length;
  const overall = allLessons.length ? Math.round(done / allLessons.length * 100) : 0;
  // continue learning: first not-done lesson across chosen langs
  let cont = null;
  for (const lg of userLangs) {
    for (const course of COURSES[lg]) {
      const next = course.lessons.find(l => !state.progress[l.id]?.done);
      if (next) { cont = { lang: lg, course, lesson: next }; break; }
    }
    if (cont) break;
  }
  const ringC = 2 * Math.PI * 54;
  const ringOffset = ringC * (1 - overall / 100);

  // recommended path (next 5 lessons in primary lang)
  const recPath = [];
  for (const course of COURSES[primary]) {
    for (const l of course.lessons) {
      if (!state.progress[l.id]?.done) { recPath.push({ lang: primary, course, lesson: l }); if (recPath.length >= 5) break; }
    }
    if (recPath.length >= 5) break;
  }

  view().innerHTML = `
    <div class="view-inner">
      <section class="hero">
        <div class="hero-top">
          <div class="hero-greet">
            <span class="eyebrow">${langInfo.name} 学习之旅</span>
            <h1>你好，${escapeHtml(state.user.name)}<br/>今天继续<em style="color:var(--gold-2);font-style:italic">沉浸式</em>学习</h1>
            <p>已坚持 <b style="color:var(--gold-2)">${state.streak.count}</b> 天 · 累计 <b style="color:var(--gold-2)">${state.xp}</b> XP · 适合你当前阶段的内容已就绪。</p>
          </div>
          <div class="hero-ring">
            <svg class="ring-svg" width="132" height="132" viewBox="0 0 120 120">
              <circle class="ring-track" cx="60" cy="60" r="54" fill="none" stroke-width="10"/>
              <circle class="ring-fill" cx="60" cy="60" r="54" fill="none" stroke-width="10" stroke-linecap="round"
                stroke-dasharray="${ringC}" stroke-dashoffset="${ringOffset}"/>
              <text class="ring-label" x="60" y="56" text-anchor="middle" fill="#F4EEE2" font-size="30" font-weight="700">${overall}%</text>
              <text x="60" y="78" text-anchor="middle" fill="rgba(244,238,226,.7)" font-size="12">${langInfo.name}总进度</text>
            </svg>
          </div>
        </div>
        ${cont ? `
        <div class="hero-continue">
          <div class="lang-tag ${langInfo.cls}" style="background:rgba(255,255,255,.18)">${langInfo.glyph}</div>
          <div class="continue-meta">
            <div class="c-sub">${LANGS[cont.lang].name} · ${cont.course.code} ${cont.course.title}</div>
            <div class="c-title">${cont.lesson.title}</div>
            <div class="mini-bar"><i style="width:${lessonProg(cont.lesson.id)}%"></i></div>
          </div>
          <a class="btn btn-gold" href="#/lesson?id=${cont.lesson.id}" data-link>继续学习 →</a>
        </div>` : `<div class="hero-continue"><div class="continue-meta"><div class="c-title">太棒了！所选语言课程已全部完成 🎉</div><div class="c-sub">去课程页探索更多语言</div></div><a class="btn btn-gold" href="#/courses" data-link>浏览课程</a></div>`}
      </section>

      <div class="section-head">
        <div>
          <span class="eyebrow">个性化推荐</span>
          <h2 class="h2" style="margin-top:6px">为你定制的学习路径</h2>
        </div>
        <a class="btn btn-ghost btn-sm" href="#/courses" data-link>全部课程</a>
      </div>
      <div style="margin-bottom:32px">
        ${recPath.map((r, i) => pathRowHTML(r, i, recPath)).join("")}
      </div>

      <div class="section-head">
        <div><span class="eyebrow">快捷训练</span><h2 class="h2" style="margin-top:6px">互动学习模块</h2></div>
      </div>
      <div class="grid grid-4">
        ${moduleCard("单词记忆", "翻卡 + 发音 + 间隔复习", "📚", "lang-en", "vocab")}
        ${moduleCard("语法练习", "情景题即时反馈", "✍️", "lang-ja", "grammar")}
        ${moduleCard("口语跟读", "AI 发音评分", "🎤", "lang-ko", "speak")}
        ${moduleCard("听力训练", "原声 + 理解测验", "🎧", "lang-fr", "listen")}
      </div>
    </div>
  `;
  bindLinks();
}
function pathRowHTML(r, i, arr) {
  const done = state.progress[r.lesson.id]?.done;
  const cls = done ? "done" : (i === 0 ? "now" : "");
  const tag = `${LANGS[r.lang].glyph} ${r.course.code}`;
  return `
    <div class="path-card ${cls}">
      <div class="path-num">${done ? "✓" : i + 1}</div>
      <div>
        <div class="path-name"><b>${r.lesson.title}</b> <span class="pill">${typeLabel(r.lesson.type)}</span></div>
        <div class="path-meta">${LANGS[r.lang].name} · ${r.course.title} · ${r.course.desc}</div>
      </div>
      <a class="btn ${done ? "btn-light" : "btn-primary"} btn-sm" href="#/lesson?id=${r.lesson.id}" data-link>${done ? "复习" : "开始"} →</a>
    </div>`;
}
function moduleCard(title, sub, icon, cls, type) {
  // find first lesson of this type in any chosen lang
  const userLangs = state.user.langs.length ? state.user.langs : ["en"];
  let target = null;
  outer: for (const lg of userLangs) {
    for (const course of COURSES[lg]) {
      const l = course.lessons.find(x => x.type === type);
      if (l) { target = { lang: lg, lesson: l }; break outer; }
    }
  }
  const href = target ? `#/lesson?id=${target.lesson.id}` : "#/courses";
  return `
    <a class="card card-clickable card-pad center" href="${href}" data-link style="display:block">
      <div class="lang-tag ${cls}" style="width:56px;height:56px;border-radius:14px;display:grid;place-items:center;font-size:26px;margin:0 auto 14px">${icon}</div>
      <div class="h3" style="font-size:18px">${title}</div>
      <div class="muted" style="font-size:13.5px;margin-top:4px">${sub}</div>
    </a>`;
}
function typeLabel(t) {
  return { vocab: "单词", grammar: "语法", listen: "听力", speak: "口语" }[t] || t;
}
function lessonProg(id) {
  const p = state.progress[id];
  return p?.done ? 100 : (p?.best ? Math.min(80, p.best) : 0);
}

/* ----- Courses catalog ----- */
function renderCourses() {
  view().innerHTML = `
    <div class="view-inner">
      <div class="section-head">
        <div><span class="eyebrow">分级课程体系</span><h1 class="h1" style="margin-top:8px">选择你的语言</h1></div>
      </div>
      <p class="lead" style="margin-bottom:28px">从 A1 入门到 C2 精通，每个级别都包含单词、语法、听力、口语四类互动课程，循序渐进掌握一门新语言。</p>
      <div class="grid grid-3" style="margin-bottom:40px">
        ${Object.entries(LANGS).map(([k,v]) => langCardHTML(k, v)).join("")}
      </div>
      <div class="section-head"><div><span class="eyebrow">我的语言</span><h2 class="h2" style="margin-top:6px">继续学习</h2></div></div>
      <div class="grid grid-2">
        ${(state.user.langs.length ? state.user.langs : ["en"]).map(lg => myLangCardHTML(lg)).join("")}
      </div>
    </div>
  `;
  bindLinks();
}
function langCardHTML(k, v) {
  const levels = COURSES[k];
  const done = levels.reduce((a, c) => a + lessonsDoneInCourse(c), 0);
  const total = levels.reduce((a, c) => a + c.lessons.length, 0);
  return `
    <div class="lang-card ${v.cls}" data-lang="${k}" role="button" tabindex="0">
      <div><div class="gl">${v.glyph}</div><div class="gn">${v.name}</div><div class="gs">${v.enName}</div></div>
      <div><span class="gpill">${done}/${total} 节 · ${LEVELS.length} 个级别</span></div>
    </div>`;
}
function myLangCardHTML(lg) {
  const v = LANGS[lg];
  const courses = COURSES[lg];
  const levelsHTML = courses.map(c => {
    const prog = courseProgress(c);
    const locked = false; // open all for demo
    return `<a class="level-row ${prog === 100 ? "done" : ""} ${locked ? "locked" : ""}" href="#/course?lang=${lg}&code=${c.code}" data-link>
      <span class="level-tag">${c.code}</span>
      <span class="level-name">${c.title}</span>
      <span class="level-prog">${prog}%</span>
    </a>`;
  }).join("");
  return `
    <div class="card course-card">
      <div class="cc-head">
        <div class="cc-icon ${v.cls}">${v.glyph}</div>
        <div><div class="cc-title">${v.name}课程</div><div class="cc-sub">${v.enName} · 共 ${courses.length} 个级别</div></div>
      </div>
      <div class="cc-levels">${levelsHTML}</div>
    </div>`;
}

/* ----- Course detail ----- */
function renderCourseDetail(qs) {
  const p = new URLSearchParams(qs);
  const lang = p.get("lang") || "en";
  const code = p.get("code") || "A1";
  const course = COURSES[lang]?.find(c => c.code === code);
  if (!course) { view().innerHTML = `<div class="view-inner empty"><div class="ei">🗂️</div><p>课程不存在</p><a class="btn btn-ghost" href="#/courses" data-link>返回课程</a></div>`; bindLinks(); return; }
  const v = LANGS[lang];
  view().innerHTML = `
    <div class="view-inner">
      <a class="btn btn-ghost btn-sm" href="#/courses" data-link style="margin-bottom:18px">← 全部课程</a>
      <div class="card card-pad" style="background:linear-gradient(135deg,${v.cls.includes("forest")?"#134E48":"#134E48"},#0E3D38);color:var(--paper-2);margin-bottom:24px">
        <div style="display:flex;align-items:center;gap:16px;flex-wrap:wrap">
          <div class="cc-icon" style="background:rgba(255,255,255,.18);width:60px;height:60px;font-size:26px">${v.glyph}</div>
          <div style="flex:1;min-width:200px">
            <span class="pill" style="background:rgba(255,255,255,.2);color:var(--paper-2)">${v.name} · ${course.code} ${LEVELS.find(l=>l.code===code)?.name}</span>
            <h1 class="h2" style="color:var(--paper-2);margin-top:8px">${course.title}</h1>
            <p style="color:rgba(244,238,226,.78);margin-top:4px">${course.desc}</p>
          </div>
          <div style="text-align:right"><div class="ring-label" style="font-size:36px;font-weight:800;color:var(--gold-2)">${courseProgress(course)}%</div><div style="font-size:13px;color:rgba(244,238,226,.7)">课程进度</div></div>
        </div>
      </div>
      <div class="section-head"><div><span class="eyebrow">互动课时</span><h2 class="h2" style="margin-top:6px">课程内容</h2></div></div>
      <div class="grid grid-2">
        ${course.lessons.map(l => {
          const prog = lessonProg(l.id);
          const done = state.progress[l.id]?.done;
          return `
          <a class="card card-clickable card-pad" href="#/lesson?id=${l.id}" data-link>
            <div class="flex-between" style="margin-bottom:8px">
              <span class="pill">${typeLabel(l.type)}</span>
              ${done ? '<span class="pill" style="background:var(--ok-soft);color:var(--ok)">✓ 已完成</span>' : `<span class="pill">${prog}%</span>`}
            </div>
            <div class="h3">${l.title}</div>
            <div class="muted" style="font-size:13.5px;margin-top:6px">${l.items.length} 个训练项 · ${typeDesc(l.type)}</div>
          </a>`;
        }).join("")}
      </div>
    </div>
  `;
  bindLinks();
}
function typeDesc(t) {
  return { vocab: "翻卡记忆+发音", grammar: "选择填空+解析", listen: "原声听力+理解题", speak: "跟读+AI评分" }[t] || "";
}

/* -------------------------------------------------------------------------
   7. Lesson interactive engine
   ------------------------------------------------------------------------- */
function renderLesson(qs) {
  const p = new URLSearchParams(qs);
  const id = p.get("id");
  const found = findLesson(id);
  if (!found) { view().innerHTML = `<div class="view-inner empty"><div class="ei">📭</div><p>找不到这节课</p><a class="btn btn-ghost" href="#/courses" data-link>返回课程</a></div>`; bindLinks(); return; }
  const { lang, course, lesson } = found;
  LessonState.reset(lang, lesson);
  view().innerHTML = `
    <div class="view-inner">
      <a class="btn btn-ghost btn-sm" href="#/course?lang=${lang}&code=${course.code}" data-link style="margin-bottom:18px">← ${LANGS[lang].name} · ${course.title}</a>
      <div class="lesson-shell">
        <div class="lesson-main">
          <div class="lesson-stage" id="lessonStage"></div>
        </div>
        <aside class="lesson-aside">
          <div class="aside-panel">
            <h4>🎯 本节技能</h4>
            <ul class="skill-list">
              <li><span class="sk-icon ${skillIconClass(lesson.type)}">${skillIcon(lesson.type)}</span><span class="sk-name">${typeLabel(lesson.type)}</span><span class="sk-prog">${typeDesc(lesson.type)}</span></li>
            </ul>
          </div>
          <div class="aside-panel">
            <h4>💡 学习贴士</h4>
            <ul class="tips-list">
              ${tipsFor(lesson.type, lang)}
            </ul>
          </div>
          <div class="aside-panel">
            <h4>📈 你的数据</h4>
            <div style="font-size:13px;color:var(--muted);line-height:1.8">
              连续学习：<b style="color:var(--forest)">${state.streak.count} 天</b><br>
              累计 XP：<b style="color:var(--gold)">${state.xp}</b><br>
              已解锁成就：<b style="color:var(--ink)">${Object.values(state.achievements).filter(Boolean).length}/${ACHIEVEMENTS.length}</b>
            </div>
          </div>
        </aside>
      </div>
    </div>
  `;
  bindLinks();
  LessonState.renderCurrent();
}
function skillIcon(t) { return { vocab: "📚", grammar: "✍️", listen: "🎧", speak: "🎤" }[t]; }
function skillIconClass(t) { return { vocab: "sk-vocab", grammar: "sk-grammar", listen: "sk-listen", speak: "sk-speak" }[t]; }
function tipsFor(type, lang) {
  const v = LANGS[lang];
  const tips = {
    vocab: [`翻动卡片查看释义，先猜再翻效果更好`, `点 🔊 听 ${v.name} 原声发音并跟读`, `答错的词会再次出现，强化记忆`],
    grammar: [`注意题干的关键词，如时态标志`, `答对答错都有解析，重在理解`, `把例句读出声，语感自然形成`],
    listen: [`先完整听一遍，再做理解题`, `听不清时可点重播，但别看文本`, `抓住关键名词和数字`],
    speak: [`先听原声示范，再跟读`, `语速放慢，发音清晰比快更重要`, `得分仅作参考，敢开口就是进步`],
  };
  return tips[type].map(t => `<li>${t}</li>`).join("");
}

/* lesson runtime state */
const LessonState = {
  lang: null, lesson: null, idx: 0, correct: 0, total: 0, xpEarned: 0,
  reset(lang, lesson) { this.lang = lang; this.lesson = lesson; this.idx = 0; this.correct = 0; this.total = lesson.items.length; this.xpEarned = 0; },
  renderCurrent() {
    const stage = $("#lessonStage"); if (!stage) return;
    const item = this.lesson.items[this.idx];
    const progress = Math.round((this.idx / this.total) * 100);
    const topbar = `
      <div class="lesson-topbar">
        <a class="lpb-back" href="#/course?lang=${this.lang}&code=${findCourseCode(this.lang, this.lesson.id)}" data-link title="退出">✕</a>
        <div class="lpb-bar"><i style="width:${progress}%"></i></div>
        <span class="lpb-xp">◆ ${this.xpEarned}</span>
      </div>`;
    let body = "";
    if (this.lesson.type === "vocab") body = vocabCard(item, this.lang);
    else if (this.lesson.type === "grammar") body = grammarCard(item, this.lang);
    else if (this.lesson.type === "listen") body = listenCard(item, this.lang);
    else if (this.lesson.type === "speak") body = speakCard(item, this.lang);
    stage.innerHTML = topbar + `<div class="lesson-body">${body}</div>`;
    this.bindItem(item);
    bindLinks();
  },
  bindItem(item) {
    const type = this.lesson.type;
    if (type === "vocab") bindVocab(item, this.lang);
    else if (type === "grammar") bindGrammar(item, this.lang);
    else if (type === "listen") bindListen(item, this.lang);
    else if (type === "speak") bindSpeak(item, this.lang);
  },
  advance(correct) {
    if (correct) { this.correct++; this.xpEarned += 10; }
    this.idx++;
    if (this.idx >= this.total) { this.complete(); return; }
    setTimeout(() => this.renderCurrent(), correct ? 500 : 850);
  },
  complete() {
    const acc = Math.round((this.correct / this.total) * 100);
    const bonus = acc >= 80 ? 30 : (acc >= 50 ? 15 : 0);
    this.xpEarned += bonus;
    // save progress
    const prev = state.progress[this.lesson.id] || {};
    const done = acc >= 50;
    state.progress[this.lesson.id] = { done, xp: (prev.xp || 0) + this.xpEarned, best: Math.max(prev.best || 0, acc) };
    state.xp += this.xpEarned;
    // streak / history
    const today = todayStr();
    if (state.streak.last !== today) {
      const y = new Date(); y.setDate(y.getDate() - 1);
      const ys = y.toISOString().slice(0, 10);
      state.streak.count = state.streak.last === ys ? state.streak.count + 1 : 1;
      state.streak.last = today;
      state.history.push({ date: today });
    }
    saveState();
    recomputeAchievements();
    saveState();
    syncTopbar("#/lesson");
    const stage = $("#lessonStage");
    stage.innerHTML = doneStageHTML(acc, this.xpEarned, this.correct, this.total);
    bindDoneStage(this.lang, this.lesson, done);
  }
};
function findCourseCode(lang, lessonId) {
  for (const c of COURSES[lang]) if (c.lessons.some(l => l.id === lessonId)) return c.code;
  return "A1";
}

/* ---- Vocab flashcard ---- */
function vocabCard(item, lang) {
  return `
    <div class="fc-area">
      <div class="muted center" style="font-size:13px">第 ${LessonState.idx + 1}/${LessonState.total} 张 · 点击卡片翻面</div>
      <div class="flashcard" id="flashcard">
        <div class="fc-inner">
          <div class="fc-face fc-front">
            <div class="fc-word">${item.word}</div>
            <div class="fc-roman">${item.roman || ""}</div>
          </div>
          <div class="fc-face fc-back">
            <div class="fc-meaning">${item.meaning}</div>
            <div class="fc-example">"${item.example}"<br/><span class="muted" style="font-size:13px">${item.exampleTr}</span></div>
          </div>
        </div>
      </div>
      <button class="speak-btn" id="speakBtn"><span class="ic">🔊</span> 听发音</button>
      <div class="fc-rate">
        <button class="btn btn-ghost btn-sm" id="rateHard">还没记住</button>
        <button class="btn btn-primary btn-sm" id="rateGood">记住了 ✓</button>
      </div>
    </div>`;
}
function bindVocab(item, lang) {
  const fc = $("#flashcard");
  fc.addEventListener("click", () => fc.classList.toggle("flipped"));
  $("#speakBtn").addEventListener("click", e => { e.stopPropagation(); speak(item.word, lang); });
  $("#rateGood").addEventListener("click", () => LessonState.advance(true));
  $("#rateHard").addEventListener("click", () => LessonState.advance(false));
}

/* ---- Grammar quiz ---- */
function grammarCard(item) {
  const q = item.q.replace("____", '<span class="blank">____</span>');
  return `
    <div>
      <div class="muted" style="font-size:13px;margin-bottom:10px">第 ${LessonState.idx + 1}/${LessonState.total} 题 · 选择正确答案</div>
      <div class="quiz-q">${q}</div>
      <div class="quiz-opts" id="quizOpts">
        ${item.opts.map((o, i) => `<button class="quiz-opt" data-i="${i}"><span class="key">${String.fromCharCode(65 + i)}</span><span>${o}</span></button>`).join("")}
      </div>
      <div class="fc-hint" id="quizExplain" style="min-height:24px;margin-top:14px"></div>
    </div>`;
}
function bindGrammar(item) {
  const opts = $$("#quizOpts .quiz-opt");
  let answered = false;
  opts.forEach(b => b.addEventListener("click", () => {
    if (answered) return;
    answered = true;
    const i = +b.dataset.i;
    const correct = i === item.answer;
    opts.forEach(o => {
      o.classList.add("disabled");
      const oi = +o.dataset.i;
      if (oi === item.answer) o.classList.add("correct");
      else if (oi === i) o.classList.add("wrong");
    });
    $("#quizExplain").innerHTML = `<span class="${correct ? "" : "muted"}">${correct ? "✓ 答对了！" : "✗ 正确答案：" + item.opts[item.answer]}</span> <span class="muted">— ${item.explain}</span>`;
    LessonState.advance(correct);
  }));
}

/* ---- Listening ---- */
function listenCard(item, lang) {
  return `
    <div>
      <div class="muted" style="font-size:13px;margin-bottom:14px">第 ${LessonState.idx + 1}/${LessonState.total} 段 · 先听再做题</div>
      <div class="listen-box">
        <div class="listen-audio">
          <div class="listen-eq" id="listenEq"><span></span><span></span><span></span><span></span><span></span></div>
          <button class="speak-btn" id="playBtn"><span class="ic">▶</span> 播放</button>
          <button class="btn btn-ghost btn-sm" id="slowBtn">0.7×</button>
        </div>
        <div class="listen-transcript" id="listenTranscript">点击播放收听 ${LANGS[lang].name} 原声</div>
      </div>
      <div class="quiz-q" style="margin-top:20px;font-size:20px">${item.q}</div>
      <div class="quiz-opts" id="quizOpts">
        ${item.opts.map((o, i) => `<button class="quiz-opt" data-i="${i}"><span class="key">${String.fromCharCode(65 + i)}</span><span>${o}</span></button>`).join("")}
      </div>
      <div class="fc-hint" id="quizExplain" style="min-height:24px;margin-top:14px"></div>
    </div>`;
}
function bindListen(item, lang) {
  let rate = 0.92, answered = false;
  function play() {
    const eq = $("#listenEq");
    eq.classList.add("playing");
    if (!synth) { $("#listenTranscript").textContent = item.transcript; }
    try { synth.cancel(); } catch(e){}
    const u = new SpeechSynthesisUtterance(item.text);
    u.lang = LANGS[lang].bcp47; u.rate = rate; u.pitch = 1;
    u.onend = () => eq.classList.remove("playing");
    u.onerror = () => eq.classList.remove("playing");
    synth.speak(u);
  }
  $("#playBtn").addEventListener("click", play);
  $("#slowBtn").addEventListener("click", () => { rate = rate === 0.92 ? 0.7 : 0.92; $("#slowBtn").textContent = rate === 0.7 ? "1.0×" : "0.7×"; });
  $("#quizOpts .quiz-opt").forEach(b => b.addEventListener("click", () => {
    if (answered) return;
    answered = true;
    const i = +b.dataset.i;
    const correct = i === item.answer;
    $$("#quizOpts .quiz-opt").forEach(o => {
      o.classList.add("disabled");
      const oi = +o.dataset.i;
      if (oi === item.answer) o.classList.add("correct");
      else if (oi === i) o.classList.add("wrong");
    });
    $("#listenTranscript").innerHTML = `<b>原文：</b>${item.transcript}`;
    $("#quizExplain").innerHTML = correct ? `✓ 听懂了！` : `✗ 正确答案：${item.opts[item.answer]}`;
    LessonState.advance(correct);
  }));
}

/* ---- Speak practice ---- */
function speakCard(item, lang) {
  return `
    <div>
      <div class="muted" style="font-size:13px;margin-bottom:14px">第 ${LessonState.idx + 1}/${LessonState.total} 句 · 跟读并获取发音评分</div>
      <div class="spk-target">
        <div class="spk-phrase">${item.phrase}</div>
        ${item.roman ? `<div class="spk-roman">${item.roman}</div>` : ""}
        <div class="muted" style="margin-top:4px">${item.meaning}</div>
      </div>
      <div class="center" style="margin:18px 0">
        <button class="speak-btn" id="demoBtn"><span class="ic">🔊</span> 听示范</button>
        <button class="speak-btn recording" id="recBtn" style="margin-left:8px"><span class="ic">🎤</span> <span id="recLabel">开始录音</span></button>
      </div>
      <div class="fc-hint center">${item.hint ? "💡 " + item.hint : ""}</div>
      <div class="spk-result" id="spkResult"></div>
      <div class="center" style="margin-top:10px">
        <button class="btn btn-primary btn-sm" id="nextBtn" disabled>下一题 →</button>
      </div>
    </div>`;
}
function bindSpeak(item, lang) {
  $("#demoBtn").addEventListener("click", () => speak(item.phrase, lang));
  const recBtn = $("#recBtn");
  const result = $("#spkResult");
  const nextBtn = $("#nextBtn");
  let activeRecog = null;
  recBtn.addEventListener("click", () => {
    if (activeRecog) { try { activeRecog.stop(); } catch(e){} return; }
    const r = getRecognition(lang);
    if (!r) {
      // fallback: simulate a recognition score
      recBtn.classList.add("recording"); $("#recLabel").textContent = "录音中…";
      setTimeout(() => {
        recBtn.classList.remove("recording"); $("#recLabel").textContent = "开始录音";
        const score = Math.floor(60 + Math.random() * 35);
        renderSpeakResult(score, item.phrase, true);
        nextBtn.disabled = false;
      }, 1400);
      return;
    }
    r.onstart = () => { recBtn.classList.add("recording"); $("#recLabel").textContent = "录音中… 说吧！"; };
    r.onerror = (e) => {
      recBtn.classList.remove("recording"); $("#recLabel").textContent = "开始录音";
      // fallback simulate
      const score = Math.floor(55 + Math.random() * 30);
      renderSpeakResult(score, item.phrase, true);
      nextBtn.disabled = false;
    };
    r.onend = () => { recBtn.classList.remove("recording"); $("#recLabel").textContent = "开始录音"; };
    r.onresult = (ev) => {
      const heard = ev.results[0][0].transcript;
      const score = similarity(heard, item.phrase);
      renderSpeakResult(score, heard, false);
      nextBtn.disabled = false;
    };
    try { r.start(); activeRecog = r; } catch(e) { activeRecog = null; }
  });
  function renderSpeakResult(score, heard, simulated) {
    const color = score >= 80 ? "var(--ok)" : score >= 60 ? "var(--gold)" : "var(--terra)";
    const label = score >= 80 ? "很棒！" : score >= 60 ? "不错，继续" : "再多练几次";
    const circ = 2 * Math.PI * 40;
    const off = circ * (1 - score / 100);
    result.innerHTML = `
      <div class="spk-score-ring">
        <svg width="90" height="90" viewBox="0 0 90 90" style="transform:rotate(-90deg)">
          <circle cx="45" cy="45" r="40" fill="none" stroke="var(--paper-3)" stroke-width="8"/>
          <circle cx="45" cy="45" r="40" fill="none" stroke="${color}" stroke-width="8" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${off}" style="transition:stroke-dashoffset 1s var(--ease-out)"/>
        </svg>
        <div class="spk-score-num">${score}</div>
      </div>
      <div style="font-weight:700;color:${color}">${label}</div>
      <div class="spk-heard">${simulated ? '<span class="muted">（浏览器不支持语音识别，模拟评分）</span>' : `你说了：<b>${escapeHtml(heard)}</b>`}</div>`;
  }
  nextBtn.addEventListener("click", () => LessonState.advance(true));
}

/* ---- Done stage ---- */
function doneStageHTML(acc, xp, correct, total) {
  const emoji = acc >= 80 ? "🎉" : acc >= 50 ? "👍" : "💪";
  const msg = acc >= 80 ? "出色完成！" : acc >= 50 ? "不错，继续保持！" : "再练一次会更好";
  return `
    <div class="done-stage">
      <div class="done-burst">${emoji}</div>
      <h2 class="h2">${msg}</h2>
      <p class="muted">正确率 ${acc}% · ${correct}/${total}</p>
      <div class="done-xp">◆ +${xp} XP</div>
      <div class="done-stats">
        <div class="done-stat"><div class="n">${acc}%</div><div class="l">正确率</div></div>
        <div class="done-stat"><div class="n">${correct}/${total}</div><div class="l">完成题数</div></div>
        <div class="done-stat"><div class="n">${state.streak.count}</div><div class="l">连续天数</div></div>
      </div>
      <div class="row-gap" style="justify-content:center">
        <button class="btn btn-ghost" id="retryBtn">再来一次</button>
        <a class="btn btn-primary" id="nextLessonBtn" href="#/dashboard" data-link>完成 →</a>
      </div>
    </div>`;
}
function bindDoneStage(lang, lesson, done) {
  $("#retryBtn").addEventListener("click", () => { LessonState.reset(lang, lesson); LessonState.renderCurrent(); });
}

/* -------------------------------------------------------------------------
   8. Progress view
   ------------------------------------------------------------------------- */
function renderProgress() {
  const userLangs = state.user.langs.length ? state.user.langs : ["en"];
  const totalDone = Object.keys(state.progress).filter(id => state.progress[id]?.done).length;
  const words = wordsLearned(state);
  const speaks = speakCount(state);
  const listenLessons = Object.keys(state.progress).filter(id => state.progress[id]?.done && findLesson(id)?.lesson.type === "listen").length;
  const grammarLessons = Object.keys(state.progress).filter(id => state.progress[id]?.done && findLesson(id)?.lesson.type === "grammar").length;

  // build a 35-day heatmap
  const days = [];
  const today = new Date();
  for (let i = 34; i >= 0; i--) {
    const d = new Date(today); d.setDate(today.getDate() - i);
    const ds = d.toISOString().slice(0, 10);
    const active = state.history.some(h => h.date === ds) || (i === 0 && state.streak.last === ds);
    const lvl = active ? (Math.random() > .5 ? 3 : 2) : 0;
    days.push({ ds, d, lvl: active ? lvl : 0 });
  }

  view().innerHTML = `
    <div class="view-inner">
      <div class="section-head"><div><span class="eyebrow">学习进度追踪</span><h1 class="h1" style="margin-top:8px">你的成长轨迹</h1></div></div>
      <div class="stat-row">
        ${statCard("🔥", "var(--terra-soft)", state.streak.count, "天", "连续学习")}
        ${statCard("💎", "var(--gold-soft)", state.xp, "", "累计经验值")}
        ${statCard("📚", "var(--mint)", words, "", "已学单词")}
        ${statCard("✅", "var(--mint-2)", totalDone, "", "完成课时")}
      </div>

      <div class="grid grid-2">
        <div class="progress-block">
          <h3 class="h3">技能掌握度</h3>
          <p class="pb-sub">综合各语言四项核心技能</p>
          <div class="skill-bars">${skillBarHTML(userLangs)}</div>
        </div>
        <div class="progress-block">
          <h3 class="h3">学习日历</h3>
          <p class="pb-sub">最近 5 周活跃情况</p>
          <div class="calendar-heat">
            ${days.map(d => `<div class="heat-cell heat-${d.lvl}" title="${d.ds}">${d.d.getDate()}</div>`).join("")}
          </div>
          <div class="row-gap" style="margin-top:14px;font-size:12px;color:var(--muted)">
            <span>少</span>
            <span class="heat-cell heat-0" style="width:14px;height:14px"></span>
            <span class="heat-cell heat-1" style="width:14px;height:14px"></span>
            <span class="heat-cell heat-2" style="width:14px;height:14px"></span>
            <span class="heat-cell heat-3" style="width:14px;height:14px"></span>
            <span>多</span>
          </div>
        </div>
      </div>

      <div class="section-head" style="margin-top:34px"><div><span class="eyebrow">逐语言进度</span><h2 class="h2" style="margin-top:6px">每种语言的学习情况</h2></div></div>
      <div class="grid grid-2">
        ${userLangs.map(lg => langProgressCard(lg)).join("")}
      </div>
    </div>
  `;
  // animate skill bars
  setTimeout(() => $$(".sb-fill").forEach(f => f.style.width = f.dataset.w + "%"), 80);
}
function statCard(icon, bg, val, unit, label) {
  return `<div class="stat-card"><div class="si" style="background:${bg}">${icon}</div><div class="sv">${val}${unit ? `<small> ${unit}</small>` : ""}</div><div class="sl">${label}</div></div>`;
}
function skillBarHTML(userLangs) {
  // aggregate across langs
  const agg = { vocab: 0, grammar: 0, listen: 0, speak: 0 };
  userLangs.forEach(lg => { const s = langSkillScores(lg); for (const k of Object.keys(agg)) agg[k] += s[k]; });
  for (const k of Object.keys(agg)) agg[k] = Math.round(agg[k] / userLangs.length);
  const colors = { vocab: "var(--gold)", grammar: "#8A6414", listen: "var(--forest-3)", speak: "var(--terra)" };
  const names = { vocab: "单词记忆", grammar: "语法练习", listen: "听力训练", speak: "口语跟读" };
  return Object.keys(agg).map(k => `
    <div class="skill-bar">
      <div class="sb-name">${names[k]}</div>
      <div class="sb-track"><div class="sb-fill" data-w="${agg[k]}" style="width:0;background:${colors[k]}"></div></div>
      <div class="sb-val">${agg[k]}%</div>
    </div>`).join("");
}
function langProgressCard(lg) {
  const v = LANGS[lg];
  const courses = COURSES[lg];
  const totalLessons = courses.reduce((a, c) => a + c.lessons.length, 0);
  const doneLessons = courses.reduce((a, c) => a + lessonsDoneInCourse(c), 0);
  const pct = totalLessons ? Math.round(doneLessons / totalLessons * 100) : 0;
  const pills = courses.map(c => {
    const cp = courseProgress(c);
    const done = cp === 100;
    const cls = done ? 'pill' : 'pill';
    const style = done ? ' style="background:var(--ok-soft);color:var(--ok)"' : '';
    return '<span class="' + cls + '"' + style + '>' + c.code + ' ' + cp + '%</span>';
  }).join("");
  return `
    <div class="progress-block">
      <div class="flex-between" style="margin-bottom:14px">
        <div class="flex-between" style="gap:12px">
          <div class="cc-icon ${v.cls}" style="width:42px;height:42px;font-size:18px">${v.glyph}</div>
          <div><div class="h3" style="font-size:18px">${v.name}</div><div class="muted" style="font-size:13px">${v.enName}</div></div>
        </div>
        <div style="text-align:right"><div class="ring-label" style="font-family:var(--serif);font-weight:800;font-size:24px;color:var(--forest)">${pct}%</div></div>
      </div>
      <div class="mini-bar" style="height:8px;background:var(--paper-3)"><i style="width:${pct}%;background:var(--forest)"></i></div>
      <div class="row-gap" style="margin-top:14px">
        ${pills}
      </div>
    </div>`;
}

/* -------------------------------------------------------------------------
   9. Community view
   ------------------------------------------------------------------------- */
function renderCommunity() {
  view().innerHTML = `
    <div class="view-inner">
      <div class="section-head"><div><span class="eyebrow">社区交流</span><h1 class="h1" style="margin-top:8px">学友圈</h1></div></div>
      <p class="lead" style="margin-bottom:26px">用你正在学的语言分享心得、提问互助。在这里，学习不再是独自前行。</p>
      <div class="community-grid">
        <div>
          <div class="card compose-card">
            <div class="compose-top">
              <div class="avatar-sm">${initials(state.user.name)}</div>
              <select id="composeLang" class="compose-lang" style="padding:8px 12px;border-radius:8px;border:1.5px solid var(--line);background:#fff;font-weight:600;font-size:13px">
                ${Object.entries(LANGS).map(([k,v]) => `<option value="${k}">${v.name}</option>`).join("")}
              </select>
            </div>
            <textarea id="composeText" placeholder="用你正在学的语言说点什么吧…"></textarea>
            <div class="compose-actions">
              <span class="muted" style="font-size:13px">支持多语种 · 发布得 20 XP</span>
              <button class="btn btn-terra btn-sm" id="postBtn">发布动态</button>
            </div>
          </div>
          <div id="postList">${state.community.map(p => postHTML(p)).join("")}</div>
        </div>
        <aside>
          <div class="card side-card">
            <h3 class="h3" style="margin-bottom:14px">🏆 本周榜单</h3>
            ${leaderboardHTML()}
          </div>
          <div class="card side-card">
            <h3 class="h3" style="margin-bottom:14px">💬 社区公约</h3>
            <ul class="tips-list">
              <li>鼓励用目标语言发帖，错了也没关系</li>
              <li>友善互助，禁止广告与不文明言论</li>
              <li>分享学习资源请标注来源</li>
              <li>积极点赞，让学友感受到支持</li>
            </ul>
          </div>
        </aside>
      </div>
    </div>
  `;
  bindCommunity();
}
function postHTML(p) {
  const liked = state.likes[p.id];
  return `
    <article class="card post" data-id="${p.id}">
      <div class="post-head">
        <div class="avatar-sm" style="background:${p.avColor}">${p.avatar}</div>
        <div><div class="post-author">${escapeHtml(p.author)}</div><div class="post-time">${p.time}</div></div>
        <span class="post-lang-tag">${LANGS[p.lang]?.name || p.lang}</span>
      </div>
      <div class="post-body">${escapeHtml(p.body)}</div>
      <div class="post-foot">
        <button class="post-act ${liked ? "liked" : ""}" data-act="like"><span class="heart">${liked ? "❤️" : "🤍"}</span> <span>${p.likes + (liked ? 1 : 0)}</span></button>
        <button class="post-act" data-act="reply"><span>💬</span> <span>${p.replies}</span></button>
        <button class="post-act" data-act="share"><span>↗</span> 分享</button>
      </div>
    </article>`;
}
function leaderboardHTML() {
  // build from community + current user, sort by a pseudo xp
  const me = { name: state.user.name, avatar: initials(state.user.name), avColor: "#D9613F", xp: state.xp };
  const others = [
    { name: "林晚晴", avatar: "林", avColor: "#D9613F", xp: 1820 },
    { name: "Daniel K.", avatar: "D", avColor: "#134E48", xp: 1540 },
    { name: "최수민", avatar: "최", avColor: "#C9962E", xp: 1320 },
    { name: "Marie L.", avatar: "M", avColor: "#5B2A4E", xp: 980 },
    { name: "王启明", avatar: "王", avColor: "#4C7A8C", xp: 760 },
  ];
  const all = [...others, me].sort((a, b) => b.xp - a.xp).slice(0, 5);
  return all.map((u, i) => `
    <div class="leader-row">
      <span class="leader-rank">${i + 1}</span>
      <span class="leader-av" style="background:${u.avColor}">${u.avatar}</span>
      <span class="leader-name">${escapeHtml(u.name)}${u.name === state.user.name ? ' <span class="pill" style="font-size:10px">你</span>' : ""}</span>
      <span class="leader-xp">${u.xp} XP</span>
    </div>`).join("");
}
function bindCommunity() {
  $("#postBtn").addEventListener("click", () => {
    const text = $("#composeText").value.trim();
    if (!text) { toast("写点什么再发布吧", "warn"); return; }
    const lang = $("#composeLang").value;
    const post = {
      id: "p" + Date.now(), author: state.user.name, avatar: initials(state.user.name),
      avColor: "#D9613F", lang, time: "刚刚", body: text, likes: 0, replies: 0,
    };
    state.community.unshift(post);
    state.xp += 20;
    recomputeAchievements(); saveState();
    $("#postList").innerHTML = state.community.map(p => postHTML(p)).join("");
    $("#composeText").value = "";
    bindPostActs();
    toast("发布成功，+20 XP", "ok");
    syncTopbar("#/community");
  });
  bindPostActs();
}
function bindPostActs() {
  $$(".post").forEach(art => {
    art.querySelectorAll(".post-act").forEach(btn => {
      btn.onclick = () => {
        const id = art.dataset.id, act = btn.dataset.act;
        if (act === "like") {
          const now = !state.likes[id]; state.likes[id] = now;
          $("#postList").innerHTML = state.community.map(p => postHTML(p)).join("");
          bindPostActs();
        } else if (act === "reply") {
          toast("回复功能演示版敬请期待 💬", "warn");
        } else if (act === "share") {
          toast("已复制链接（演示）", "ok");
        }
      };
    });
  });
}

/* -------------------------------------------------------------------------
   10. Achievements view
   ------------------------------------------------------------------------- */
function renderAchievements() {
  const unlocked = Object.values(state.achievements).filter(Boolean).length;
  const level = Math.floor(state.xp / 500) + 1;
  const levelProg = (state.xp % 500) / 500 * 100;
  const circ = 2 * Math.PI * 50;
  const off = circ * (1 - levelProg / 100);
  view().innerHTML = `
    <div class="view-inner">
      <div class="section-head"><div><span class="eyebrow">成就激励系统</span><h1 class="h1" style="margin-top:8px">勋章墙</h1></div></div>
      <div class="ach-summary">
        <div class="ach-level-ring">
          <svg width="120" height="120" viewBox="0 0 120 120" style="transform:rotate(-90deg)">
            <circle cx="60" cy="60" r="50" fill="none" stroke="rgba(244,238,226,.2)" stroke-width="10"/>
            <circle cx="60" cy="60" r="50" fill="none" stroke="var(--gold-2)" stroke-width="10" stroke-linecap="round" stroke-dasharray="${circ}" stroke-dashoffset="${off}"/>
          </svg>
          <div style="position:relative;margin-top:-86px;height:0;text-align:center">
            <div style="font-family:var(--serif);font-weight:900;font-size:30px;color:var(--gold-2)">Lv.${level}</div>
            <div style="font-size:12px;color:rgba(244,238,226,.7)">${500 - (state.xp % 500)} XP 升级</div>
          </div>
        </div>
        <div>
          <span class="eyebrow" style="color:var(--gold-2)"><span style="background:var(--gold-2)"></span>已解锁 ${unlocked}/${ACHIEVEMENTS.length}</span>
          <h2 class="h2" style="color:var(--paper-2);margin-top:8px">坚持的每一步，都值得被纪念</h2>
          <p style="color:rgba(244,238,226,.78);margin-top:6px">完成学习目标、保持连续打卡、探索新语言…… 收集全部勋章，成为真正的语言大师。</p>
        </div>
      </div>
      <div class="ach-grid">
        ${ACHIEVEMENTS.map(a => badgeHTML(a)).join("")}
      </div>
    </div>
  `;
}
function badgeHTML(a) {
  const unlocked = !!state.achievements[a.id];
  const colors = ["var(--gold)","var(--terra)","var(--forest-3)","var(--plum)","var(--sky)"];
  const bg = colors[(a.id.length) % colors.length];
  return `
    <div class="badge ${unlocked ? "" : "locked"}">
      ${unlocked ? '<span class="b-tag">已获得</span>' : ""}
      <div class="medal" style="background:radial-gradient(circle at 35% 30%, #fff5, transparent 50%), ${bg};color:#fff">${a.icon}</div>
      <div class="b-name">${a.name}</div>
      <div class="b-desc">${a.desc}</div>
    </div>`;
}

/* -------------------------------------------------------------------------
   11. Helpers: links + escape
   ------------------------------------------------------------------------- */
function bindLinks() {
  $$("a[data-link]").forEach(a => a.addEventListener("click", e => {
    // let hashchange handle it; just ensure no full reload
  }));
}
function escapeHtml(s) {
  return String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
}

/* -------------------------------------------------------------------------
   12. Boot
   ------------------------------------------------------------------------- */
function boot() {
  // remove boot screen if present (none here, but safe)
  route();
}
document.addEventListener("DOMContentLoaded", boot);
// also run immediately if DOM already parsed
if (document.readyState !== "loading") boot();
