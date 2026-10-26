/* =========================================================
 * solver.js —— 24 点求解器 + 玩家表达式校验
 * =========================================================
 * 思路：递归地从一组数里挑两个，用 + − × ÷ 合并，
 * 剩下的继续合并，直到只剩一个数。每次合并的顺序
 * 自动覆盖所有括号结构。使用分数精确计算，避免浮点误差。
 * ========================================================= */

(function (global) {
  'use strict';

  /* ---------- 分数（有理数），保证计算精确 ---------- */
  function gcd(a, b) { a = Math.abs(a); b = Math.abs(b); while (b) { [a, b] = [b, a % b]; } return a; }
  function F(num, den) {
    den = den === undefined ? 1 : den;
    if (den === 0) return null;
    if (den < 0) { num = -num; den = -den; }
    const g = gcd(num, den) || 1;
    return { n: num / g, d: den / g };
  }
  function Fadd(a, b) { return F(a.n * b.d + b.n * a.d, a.d * b.d); }
  function Fsub(a, b) { return F(a.n * b.d - b.n * a.d, a.d * b.d); }
  function Fmul(a, b) { return F(a.n * b.n, a.d * b.d); }
  function Fdiv(a, b) { if (b.n === 0) return null; return F(a.n * b.d, a.d * b.n); }
  function Feq24(f) { return f && f.n === 24 * f.d; }
  function FtoFloat(f) { return f.n / f.d; }

  /* ---------- 格式化分数 ---------- */
  function fmtF(f) {
    if (!f) return '';
    if (f.d === 1) return String(f.n);
    return f.n + '/' + f.d;
  }

  /* ---------- 求解 ----------
   * cards: [{ value, label, suit }, ...] 长度 4
   * options.target 默认 24
   * 返回：[{ expr: '...', tokens: [...] }]  所有不同的解（最多返回前 N 个）
   */
  function solve24(cards, options) {
    options = options || {};
    const target = options.target !== undefined ? options.target : 24;
    const MAX_ANSWERS = options.maxAnswers || 20;
    const results = [];
    const seen = new Set(); // 去重

    // 初始状态：每张牌的数值 + 原标签（用于生成人类可读的表达式）
    const init = cards.map(c => ({
      f: F(c.value, 1),
      expr: c.label,            // 例如 'A' / '10' / 'K'
      token: c.label,
      val: c.value,
    }));

    const PRIO = { '+': 1, '-': 1, '*': 2, '/': 2 };

    // 判断某个子表达式（prio=子算子）作为父 op 的左/右操作数时是否需要括号
    function needParen(parentOp, childPrio, isRight) {
      if (childPrio === undefined) return false;     // 叶子节点，没有括号
      const pp = PRIO[parentOp], cp = PRIO[childPrio];
      if (cp < pp) return true;                      // 子优先级更低，一定加
      if (cp === pp) {
        // 同级左结合，右操作数若为同级则改变了结合性
        if (parentOp === '-') return true;           // a - (b +- c)
        if (parentOp === '/') return true;           // a / (b */ c) 全部同级都要
      }
      return false;
    }

    function combineTwo(a, b, op) {
      let f;
      switch (op) {
        case '+': f = Fadd(a.f, b.f); break;
        case '-': f = Fsub(a.f, b.f); break;
        case '*': f = Fmul(a.f, b.f); break;
        case '/': f = Fdiv(a.f, b.f); break;
      }
      if (!f) return null;

      let ea = a.expr, eb = b.expr;
      if (needParen(op, a.prio, false)) ea = '(' + ea + ')';
      if (needParen(op, b.prio, true))  eb = '(' + eb + ')';

      return { f, expr: ea + ' ' + op + ' ' + eb, prio: op, token: null, val: null };
    }

    function rec(list) {
      if (results.length >= MAX_ANSWERS) return;
      if (list.length === 1) {
        if (Feq24(list[0].f)) {
          const key = list[0].expr.replace(/\s+/g, '');
          if (!seen.has(key)) { seen.add(key); results.push({ expr: list[0].expr }); }
        }
        return;
      }
      // 挑两个不同下标
      for (let i = 0; i < list.length; i++) {
        for (let j = 0; j < list.length; j++) {
          if (i === j) continue;
          const rest = [];
          for (let k = 0; k < list.length; k++) if (k !== i && k !== j) rest.push(list[k]);
          const a = list[i], b = list[j];
          const ops = ['+', '-', '*', '/'];
          for (const op of ops) {
            // 对称操作去重：a+b 和 b+a 是同一个
            if ((op === '+' || op === '*') && i > j) continue;
            const combo = combineTwo(a, b, op);
            if (!combo) continue;
            rec([...rest, combo]);
            if (results.length >= MAX_ANSWERS) return;
          }
        }
      }
    }

    rec(init);
    return results;
  }

  /* =========================================================
   * 玩家表达式解析 + 校验（不用 eval）
   * - 将玩家输入中的字母 A/J/Q/K 当作牌面值来匹配手牌（A=1, J=Q=K=10）
   * - 用 shunting-yard 转 RPN 后求值
   * - 验证：
   *   1) 表达式合法且结果 == 24（容差）
   *   2) 数字 token 恰好覆盖四张手牌
   * ========================================================= */
  const CARD_ALIAS = {
    'A': 1, 'a': 1,
    'J': 10, 'j': 10,
    'Q': 10, 'q': 10,
    'K': 10, 'k': 10,
  };

  function normalizeExpr(input) {
    // 全角 / 中文符号归一化
    return String(input || '')
      .replace(/×/g, '*').replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/（/g, '(').replace(/）/g, ')')
      .replace(/＋/g, '+').replace(/－/g, '-').replace(/−/g, '-')
      .replace(/\s+/g, '');
  }

  /* tokenize —— 返回 [{type:'num'|'op'|'lparen'|'rparen', value}] */
  function tokenize(expr) {
    const tokens = [];
    let i = 0;
    while (i < expr.length) {
      const c = expr[i];
      if ((c >= '0' && c <= '9') || c === '.') {
        let j = i;
        while (j < expr.length && ((expr[j] >= '0' && expr[j] <= '9') || expr[j] === '.')) j++;
        const numStr = expr.slice(i, j);
        const v = parseFloat(numStr);
        if (isNaN(v)) throw new Error('数字无效：' + numStr);
        tokens.push({ type: 'num', value: v, raw: numStr });
        i = j;
      } else if (CARD_ALIAS[c] !== undefined) {
        tokens.push({ type: 'num', value: CARD_ALIAS[c], raw: c.toUpperCase() });
        i++;
      } else if ('+-*/'.includes(c)) {
        tokens.push({ type: 'op', value: c });
        i++;
      } else if (c === '(') { tokens.push({ type: 'lparen' }); i++; }
      else if (c === ')') { tokens.push({ type: 'rparen' }); i++; }
      else { throw new Error('无法识别的字符：' + c); }
    }
    return tokens;
  }

  function shuntingYard(tokens) {
    const prec = { '+': 1, '-': 1, '*': 2, '/': 2 };
    const out = [];
    const ops = [];
    for (const t of tokens) {
      if (t.type === 'num') out.push(t);
      else if (t.type === 'op') {
        while (ops.length) {
          const top = ops[ops.length - 1];
          if (top.type === 'op' && prec[top.value] >= prec[t.value]) out.push(ops.pop());
          else break;
        }
        ops.push(t);
      } else if (t.type === 'lparen') ops.push(t);
      else if (t.type === 'rparen') {
        while (ops.length && ops[ops.length - 1].type !== 'lparen') out.push(ops.pop());
        if (!ops.length) throw new Error('括号不匹配');
        ops.pop(); // 弹出左括号
      }
    }
    while (ops.length) {
      const top = ops.pop();
      if (top.type !== 'op') throw new Error('括号不匹配');
      out.push(top);
    }
    return out;
  }

  function evalRPN(rpn) {
    const stack = [];
    for (const t of rpn) {
      if (t.type === 'num') stack.push(t.value);
      else {
        if (stack.length < 2) throw new Error('表达式不完整');
        const b = stack.pop(), a = stack.pop();
        let v;
        switch (t.value) {
          case '+': v = a + b; break;
          case '-': v = a - b; break;
          case '*': v = a * b; break;
          case '/':
            if (b === 0) throw new Error('除数不能为 0');
            v = a / b; break;
        }
        stack.push(v);
      }
    }
    if (stack.length !== 1) throw new Error('表达式不完整');
    return stack[0];
  }

  /* 返回 null 表示通过；否则返回提示字符串 */
  function checkCards(tokens, cards) {
    const usedVals = tokens.filter(t => t.type === 'num').map(t => t.value);
    const handVals = cards.map(c => c.value);
    const handDesc = cards.map(c => c.label + c.suit).join(' ');

    if (usedVals.length !== cards.length) {
      return `需要用到恰好 <b>${cards.length}</b> 张手牌，但你的算式里出现了 <b>${usedVals.length}</b> 个数字。发下的是：${handDesc}。`;
    }
    const handSorted = handVals.slice().sort((a, b) => a - b);
    const usedSorted = usedVals.slice().sort((a, b) => a - b);
    for (let i = 0; i < handSorted.length; i++) {
      if (handSorted[i] !== usedSorted[i]) {
        return `算式里的数字和发下的牌对不上。发下的是：${handDesc}。`;
      }
    }
    return null;
  }

  /* 主入口 */
  function validatePlayerExpr(rawInput, cards, target) {
    target = target || 24;
    const out = { ok: false, value: null, reason: '' };
    try {
      const expr = normalizeExpr(rawInput);
      if (!expr) { out.reason = '请输入算式'; return out; }
      const tokens = tokenize(expr);
      if (!tokens.some(t => t.type === 'op')) { out.reason = '请至少使用一个运算符'; return out; }
      const rpn = shuntingYard(tokens);
      const val = evalRPN(rpn);

      const cardErr = checkCards(tokens, cards);
      if (cardErr) { out.reason = cardErr; return out; }

      out.value = val;
      if (Math.abs(val - target) < 1e-6) {
        out.ok = true;
        out.reason = '完美！';
      } else {
        out.reason = '结果是 ' + (Math.round(val * 1e6) / 1e6) + '，不是 ' + target + '。';
      }
    } catch (e) {
      out.reason = e.message || '表达式无法解析';
    }
    return out;
  }

  global.Solver24 = {
    solve: solve24,
    validate: validatePlayerExpr,
    normalizeExpr: normalizeExpr,
    tokenize: tokenize,
  };

})(window);
