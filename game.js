/* =========================================================
 * game.js —— 发牌、渲染、交互、计分
 * ========================================================= */
(function () {
  'use strict';

  const SUITS = [
    { code: '♠', name: 'spades',   color: 'black' },
    { code: '♥', name: 'hearts',   color: 'red'   },
    { code: '♦', name: 'diamonds', color: 'red'   },
    { code: '♣', name: 'clubs',    color: 'black' },
  ];

  // 构造整副 52 张
  function buildDeck() {
    const deck = [];
    const ranks = [
      { label: 'A', value: 1 },
      { label: '2', value: 2 },
      { label: '3', value: 3 },
      { label: '4', value: 4 },
      { label: '5', value: 5 },
      { label: '6', value: 6 },
      { label: '7', value: 7 },
      { label: '8', value: 8 },
      { label: '9', value: 9 },
      { label: '10', value: 10 },
      { label: 'J', value: 10 },
      { label: 'Q', value: 10 },
      { label: 'K', value: 10 },
    ];
    for (const s of SUITS) {
      for (const r of ranks) {
        deck.push({
          label: r.label,
          value: r.value,
          suit: s.code,
          suitName: s.name,
          color: s.color,
        });
      }
    }
    return deck;
  }

  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  /* ============ DOM ============ */
  const $cards    = document.getElementById('cards');
  const $expr     = document.getElementById('expr');
  const $msg      = document.getElementById('msg');
  const $streak   = document.getElementById('streak');
  const $wins     = document.getElementById('wins');
  const $losses   = document.getElementById('losses');
  const $hints    = document.getElementById('hints');
  const $modal    = document.getElementById('modal');
  const $mTitle   = document.getElementById('modal-title');
  const $mBody    = document.getElementById('modal-body');

  /* ============ 渲染扑克 ============ */
  function renderCard(card, idx) {
    const div = document.createElement('div');
    div.className = 'card' + (card.color === 'red' ? ' red' : '');
    div.style.animationDelay = (idx * 0.08) + 's';
    const isFace = ['J', 'Q', 'K'].includes(card.label);

    let jqkLabel = '';
    if (isFace) jqkLabel = card.label;

    div.innerHTML = `
      <div class="corner tl">
        <span class="rank">${card.label}</span>
        <span class="suit">${card.suit}</span>
      </div>
      <div class="pip ${isFace ? 'jqk' : ''}" ${isFace ? `data-label="${jqkLabel}"` : ''}>
        ${isFace ? '' : card.suit.repeat(card.label === '10' ? 2 : 1)}
      </div>
      <div class="corner br">
        <span class="rank">${card.label}</span>
        <span class="suit">${card.suit}</span>
      </div>
    `;
    return div;
  }

  function renderBack() {
    const div = document.createElement('div');
    div.className = 'card back';
    return div;
  }

  /* ============ 状态 ============ */
  const SAVE_KEY = 'game24.stats.v1';
  let stats = loadStats();
  let currentCards = [];
  let currentSolutions = [];
  let lastAnswerUsed = false;
  let hintUsedThisRound = false;
  let answeredThisRound = false;

  function loadStats() {
    try {
      const raw = localStorage.getItem(SAVE_KEY);
      if (raw) return JSON.parse(raw);
    } catch (e) {}
    return { wins: 0, losses: 0, streak: 0, hints: 0 };
  }
  function saveStats() {
    try { localStorage.setItem(SAVE_KEY, JSON.stringify(stats)); } catch (e) {}
  }
  function renderStats() {
    $streak.textContent = stats.streak || 0;
    $wins.textContent   = stats.wins   || 0;
    $losses.textContent = stats.losses || 0;
    $hints.textContent  = stats.hints  || 0;
  }

  /* ============ 发牌 ============ */
  function deal() {
    currentCards = [];
    currentSolutions = [];
    answeredThisRound = false;
    hintUsedThisRound = false;
    lastAnswerUsed = false;
    setMsg('', '');
    $expr.value = '';
    $expr.classList.remove('error');

    // 先铺四张背面朝上，给个"洗牌节奏"
    $cards.innerHTML = '';
    for (let i = 0; i < 4; i++) $cards.appendChild(renderBack());

    // 抽牌，优先抽"有解"的一手（至少尝试若干次）
    setTimeout(() => {
      const deck = shuffle(buildDeck());
      let picks, sols;
      const MAX_TRIES = 200;
      let tries = 0;
      do {
        picks = deck.slice(0, 4);
        sols = window.Solver24.solve(picks, { maxAnswers: 50 });
        tries++;
      } while (sols.length === 0 && tries < MAX_TRIES);
      // 允许偶尔出无解的牌（让玩家体验"无解"的情况）
      currentCards = picks;
      currentSolutions = sols;

      // 重新渲染正面
      $cards.innerHTML = '';
      currentCards.forEach((c, i) => $cards.appendChild(renderCard(c, i)));

      if (currentSolutions.length === 0) {
        setMsg('⚠️ 这一手牌经计算 <b>无解</b>，建议点「换一手」。', 'info');
      } else {
        setMsg(`手牌已发出，共找到 ${currentSolutions.length} 种解法，试试看！`, 'info');
      }
    }, 350);
  }

  /* ============ 提交校验 ============ */
  function onCheck() {
    if (!currentCards.length) { setMsg('还没发牌呢～', 'err'); return; }
    const input = $expr.value.trim();
    const res = window.Solver24.validate(input, currentCards, 24);
    $expr.classList.toggle('error', !res.ok);
    if (res.ok) {
      setMsg('✅ ' + input + ' = 24', 'ok');
      stats.wins++;
      stats.streak++;
      // 如果没看答案也没要提示，连胜有效，并且额外加分的感觉就保留在 streak
      renderStats();
      saveStats();
      showModal({
        title: '🎉 太棒了！',
        body: `算式 <code>${input}</code> = 24 完全正确！` +
              `连胜 <b>${stats.streak}</b>。再来一手？`,
      });
      answeredThisRound = true;
    } else {
      setMsg('❌ ' + res.reason, 'err');
    }
  }

  /* ============ 提示 ============ */
  function onHint() {
    if (!currentCards.length) { setMsg('还没发牌呢～', 'err'); return; }
    if (currentSolutions.length === 0) {
      setMsg('这手牌真的无解，没法给提示 😅', 'info');
      return;
    }
    const ans = currentSolutions[0].expr;
    // 轻量提示：前两步合并的目标
    // 先给一个数字开头（不透露完整解法）
    const hint = makeHint(currentCards, currentSolutions);
    hintUsedThisRound = true;
    stats.hints = (stats.hints || 0) + 1;
    renderStats();
    saveStats();
    setMsg('💡 ' + hint, 'info');
  }

  function makeHint(cards, sols) {
    // 从解里抽取一个提示：先告诉你能先把哪两张合起来
    const expr = sols[0].expr;
    return `试试凑出接近中间值的数（例如先看相邻两张能否得到 8、3、6 之类的关键因子）。答案之一：<code>${expr.split(' ')[0]} ...</code>（点击「看答案」查看完整解法）`;
  }

  /* ============ 看答案 ============ */
  function onAnswer() {
    if (!currentCards.length) { setMsg('还没发牌呢～', 'err'); return; }
    lastAnswerUsed = true;
    if (currentSolutions.length === 0) {
      setMsg('😔 这手牌 <b>无解</b>（暴力枚举所有可能都算不出 24）。', 'info');
      return;
    }
    const top3 = currentSolutions.slice(0, 3).map(s => '<li><code>' + s.expr + '</code></li>').join('');
    setMsg(`🧠 找到 ${currentSolutions.length} 种解法，列举 3 个：<ul style="margin:6px 0 0 16px;color:#fff;"><code>${top3}</code></ul>`, 'info');
    showModal({
      title: '答案',
      body: `这手牌一共有 <b>${currentSolutions.length}</b> 种解法，随便挑一个：<br><code>${currentSolutions[0].expr}</code>`,
    });
  }

  /* ============ 重置 ============ */
  function onReset() {
    if (!confirm('确定要清零战绩吗？')) return;
    stats = { wins: 0, losses: 0, streak: 0, hints: 0 };
    saveStats();
    renderStats();
    setMsg('战绩已清零。', 'info');
  }

  /* ============ 提示条 ============ */
  function setMsg(text, cls) {
    $msg.className = 'msg' + (cls ? ' ' + cls : '');
    $msg.innerHTML = text;
  }

  function showModal({ title, body }) {
    $mTitle.textContent = title;
    $mBody.innerHTML = body;
    $modal.classList.remove('hidden');
  }
  function hideModal() { $modal.classList.add('hidden'); }

  /* ============ 虚拟键盘 ============ */
  function wireKeyboard() {
    document.querySelectorAll('.kbd').forEach(btn => {
      btn.addEventListener('click', () => {
        const v = btn.dataset.val;
        if (v === 'back') {
          $expr.value = $expr.value.slice(0, -1);
        } else {
          $expr.value += v;
        }
        $expr.focus();
      });
    });
  }

  /* ============ 事件绑定 ============ */
  function bind() {
    document.getElementById('btn-deal').addEventListener('click', deal);
    document.getElementById('btn-check').addEventListener('click', onCheck);
    document.getElementById('btn-hint').addEventListener('click', onHint);
    document.getElementById('btn-answer').addEventListener('click', onAnswer);
    document.getElementById('btn-reset').addEventListener('click', onReset);
    document.getElementById('modal-next').addEventListener('click', () => { hideModal(); deal(); });
    document.getElementById('modal-close').addEventListener('click', hideModal);
    $modal.addEventListener('click', (e) => { if (e.target === $modal) hideModal(); });

    $expr.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') onCheck();
    });
    wireKeyboard();
  }

  /* ============ 启动 ============ */
  function init() {
    renderStats();
    bind();
    deal();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
