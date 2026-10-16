/* 심인 광고면 폰 전용판 덧장치 v3 — 오늘말 · 단서 칸 · 쪽지 넘기기 · 지문 채취 · 가장자리 고양이 · 진동
   광고의 장치(이불·단서·통지서·아래칸)는 컴퓨터판과 같은 seek.js 가 맡음 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var tone = function (k) { if (W.mb && W.mb.tone) W.mb.tone(k); };
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };

  /* ── 옛말 ↔ 오늘말 : 낱말을 누르면 하나, 위 「가」는 전부 ── */
  var all = false;
  function flip(sp, on) {
    if (!sp.dataset.ko) return;
    if (sp.dataset.old == null) sp.dataset.old = sp.innerHTML;
    sp.innerHTML = on ? sp.dataset.ko : sp.dataset.old; sp.classList.toggle('ko', on);
  }
  D.addEventListener('click', function (e) {
    var sp = e.target.closest && e.target.closest('.hj[data-ko]');
    if (!sp || e.target.closest('button, a, label, .ix-hot, .msk-low.sk-sorry, .msk-low.sk-knock, #adCat')) return;
    flip(sp, !sp.classList.contains('ko'));
  });
  var ko = $('#mskKo');
  if (ko) ko.addEventListener('click', function () { all = !all; ko.classList.toggle('on', all); ko.innerHTML = all ? '<b>가</b>옛말' : '<b>가</b>오늘말'; $$('.hj[data-ko]').forEach(function (sp) { flip(sp, all); }); });
  /* 새로 생기는 글(판결 · 정정 등)도 오늘말 상태를 따르고, 한자는 한글로 */
  var HAN = [[/京城野錄 編輯局 審人係/g, '경성야록 편집국 심인계'], [/發　見/g, '발　견'], [/追報/g, '추보']];
  var mo = new MutationObserver(function (ms) {
    ms.forEach(function (m) {
      [].forEach.call(m.addedNodes, function (n) {
        if (n.nodeType !== 1) return;
        $$('i, b, span', n).concat([n]).forEach(function (x) { if (x.childNodes.length === 1 && x.firstChild.nodeType === 3) { var t = x.textContent; HAN.forEach(function (h) { t = t.replace(h[0], h[1]); }); if (t !== x.textContent) x.textContent = t; } });
        if (all) { if (n.matches && n.matches('.hj[data-ko]')) flip(n, true); $$('.hj[data-ko]', n).forEach(function (sp) { flip(sp, true); }); }
      });
    });
  });
  $$('.sk-found, .sk-fix, #readSay, #crewSay, #runN, #knockN, #sorryN, #adObit, #skNp').forEach(function (el) { mo.observe(el, { childList: true, subtree: true }); });

  /* ── 수색률 = 읽은 만큼 ── */
  var pct = $('#mskPct'), prog = $('.mb-prog');
  function onScroll() {
    var h = D.documentElement.scrollHeight - W.innerHeight, p = h > 0 ? Math.min(1, W.scrollY / h) : 0;
    if (pct) pct.style.transform = 'scaleX(' + p.toFixed(3) + ')';
    if (prog) prog.style.width = (p * 100) + '%';
  }
  W.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ── 독자 — 단서 칸 넷 ── */
  $$('#readPh .ix-hot').forEach(function (b) {
    b.addEventListener('click', function () {
      b.classList.add('got'); var li = $('#mskClues li[data-c="' + b.dataset.c + '"]');
      if (li && !li.classList.contains('on')) { li.classList.add('on'); buzz(12); }
    });
  });
  var ch = $('#crewHot'); if (ch) ch.addEventListener('click', function () { buzz([18, 40, 18]); });

  /* ── 작은 광고 — 쪽지 넘기기 ── */
  var deck = $('#mskDeck'), dots = $('#mskDots');
  if (deck && dots) {
    var cards = $$('.msk-card', deck);
    dots.innerHTML = cards.map(function () { return '<i></i>'; }).join('');
    var ds = $$('i', dots);
    var paint = function () { var w = cards[0].offsetWidth + 12, k = Math.round(deck.scrollLeft / w); ds.forEach(function (d, i) { d.classList.toggle('on', i === k); }); };
    deck.addEventListener('scroll', paint, { passive: true }); paint();
    $$('.sk-upb', deck).forEach(function (b) { b.addEventListener('click', function () { buzz(10); }); });
  }

  /* ── 냐옹 ── */
  var AC = W.AudioContext || W.webkitAudioContext, ctx = null;
  function meow(pitch) {
    if (!AC) return;
    try {
      ctx = ctx || new AC(); if (ctx.state === 'suspended') ctx.resume();
      var t = ctx.currentTime, d = .5 + Math.random() * .2, b = (pitch || 1) * (520 + Math.random() * 120), o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(b * .8, t); o.frequency.linearRampToValueAtTime(b * 1.3, t + d * .35); o.frequency.exponentialRampToValueAtTime(b * .6, t + d);
      f.type = 'bandpass'; f.Q.value = 6; f.frequency.setValueAtTime(1900, t); f.frequency.linearRampToValueAtTime(700, t + d);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.25, t + .05); g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.connect(f); f.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + d + .05);
    } catch (e) {}
  }

  /* ── 수배 사진 — 꾹 누르면 지문(발바닥)을 뜸 ── */
  var mug = $('#skMug');
  if (mug) {
    var lt = 0;
    var hold = function (e) { e.preventDefault(); mug.classList.add('press'); lt = setTimeout(function () { mug.classList.add('inked'); buzz([20, 40, 20]); meow(1.2); var c = $('#mugEm'); if (c) c.textContent = '지문 대조 결과 — 발바닥. 용의자 특정 실패.'; }, 800); };
    var up = function () { clearTimeout(lt); mug.classList.remove('press'); };
    mug.addEventListener('pointerdown', hold); mug.addEventListener('pointerup', up); mug.addEventListener('pointerleave', up); mug.addEventListener('pointercancel', up);
    mug.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  }

  /* ── 토스트 ── */
  var toast = $('#mskToast'), tt = 0;
  function say(t, ms) { if (!toast) return; toast.textContent = t; toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(function () { toast.classList.remove('on'); }, ms || 2400); }

  /* ── 「고양이 떼 출몰 주의」 — 화면 가장자리에 고양이가 나오거든 누르시오 ── */
  var pk = $('#mskPeek'), seen = 0, caught = 0, ptm = 0, htm = 0, over = false;
  var CAT = ['한 마리 차잣소.', '두 마리. 아까 그 놈 아니오?', '세 마리. 편집장 의자가 모자라오.', '네 마리. 활자 상자가 비어 가오.', '다섯 마리 — 넘엇소. 이제부터는 책임지지 안소.', '…아직도 나오오.', '편집국이 고양이 차지가 되엇소.', '고양이들이 당신을 차즈러 갓소.'];
  function schedule() { clearTimeout(ptm); ptm = setTimeout(show, (over ? 5000 : 11000) + Math.random() * 9000); }
  function show() {
    if (!pk || D.hidden || W.scrollY < W.innerHeight * .8 || $('.sk-modal.on')) { schedule(); return; }
    pk.classList.toggle('l', Math.random() < .5); pk.style.bottom = (14 + Math.random() * 46).toFixed(1) + '%';
    pk.classList.remove('got'); requestAnimationFrame(function () { pk.classList.add('on'); }); seen++;
    clearTimeout(htm); htm = setTimeout(function () { pk.classList.remove('on'); schedule(); }, 2300);
  }
  if (pk) {
    pk.addEventListener('click', function () {
      if (!pk.classList.contains('on')) return;
      clearTimeout(htm); caught++; pk.classList.add('got'); meow(1 + Math.random() * .3); buzz(15);
      say(CAT[Math.min(caught, CAT.length) - 1]); if (W.mskHerd) W.mskHerd(caught);
      if (caught === 5) { over = true; var f = $('#bFound'), l = $('#bLost'); if (f) { f.textContent = (+f.textContent || 0) + 1; f.classList.remove('bump'); void f.offsetWidth; f.classList.add('bump'); } if (l) l.textContent = Math.max(0, (+l.textContent || 0) - 1); }
      setTimeout(function () { pk.classList.remove('on'); schedule(); }, 520);
    });
    schedule();
  }

  /* ── 아래칸 — 폰이 울림 ── */
  var kn = $('#adKnock'), kc = 0;
  if (kn) kn.addEventListener('click', function () { kc++; buzz([30, 190, 30, 190, 30]); if (kc === 3) setTimeout(function () { buzz([60, 260, 60, 260, 60]); }, 1500); });
  var rb = $('#runB'); if (rb) rb.addEventListener('click', function () { buzz([10, 30, 10, 30, 10, 30, 60]); });
  var ob = $('#obitB'); if (ob) ob.addEventListener('click', function () { buzz(8); });
  var so = $('#adSorry'); if (so) so.addEventListener('click', function () { buzz(6); });

  /* ══ 쪽지 광고 · 아래칸 — 그림마다 손을 대면 움직임 ══
     새 그림(assets/seek3/…)이 잇으면 바꿔 끼우고, 업스면 지금 그림으로 움직임만 보여 줌 */
  function swap(img, src, cb) {   /* 같은 그림의 다음 장면이 겹쳐 서서히 떠오름 (크로스페이드) */
    if (!img) return; var im = new Image();
    im.onload = function () {
      var o = img.cloneNode(); o.removeAttribute('loading'); o.src = src; o.className = (img.className || '') + ' xf'; o.style.transform = 'none';
      img.parentNode.insertBefore(o, img.nextSibling);
      requestAnimationFrame(function () { requestAnimationFrame(function () { o.classList.add('on'); }); });
      setTimeout(function () { img.src = src; img.style.transform = ''; o.remove(); if (cb) cb(true); }, 1500);
    };
    im.onerror = function () { if (cb) cb(false); }; im.src = src;
  }
  function card(k) { return $('.msk-card[data-k="' + k + '"]'); }
  function hint(c, t) { var h = $('.cd-hint', c); if (h) { h.textContent = t; h.classList.remove('pop'); void h.offsetWidth; h.classList.add('pop'); } }
  function upd(c) { var b = $('.sk-upb', c); if (b && !c.classList.contains('upd')) b.click(); }
  function shake(el) { el.classList.remove('jolt'); void el.offsetWidth; el.classList.add('jolt'); }

  /* 원고 한 장 — 새를 세 번 쫓으면 원고를 떨어뜨림 */
  (function () {
    var c = card('page'); if (!c) return; var fig = $('.cd-im', c), img = $('img', fig), n = 0;
    hint(c, '☞ 그림 속 새를 쫓으시오 (세 번)');
    fig.addEventListener('click', function () {
      if (n >= 3) return; n++; shake(fig); buzz(12); tone && tone('tick');
      fig.style.setProperty('--fly', n); 
      if (n < 3) hint(c, ['퍼덕! 원고를 놓지 안소.', '퍼덕퍼덕! 조곰만 더.'][n - 1]);
      else { hint(c, '툭 — 떨어뜨렷소! …그런데 어대로?'); swap(img, 'assets/seek3/page2.jpg'); setTimeout(function () { upd(c); }, 900); }
    });
  })();
  /* 어제의 나 — 등불로 비추어 차즈시오 */
  (function () {
    var c = card('me'); if (!c) return; var fig = $('.cd-im', c), fx = $('.cd-fx', fig), found = false, hold = 0;
    fig.classList.add('lamp'); hint(c, '☞ 손가락으로 어둠을 비추어 「어제의 나」를 차즈시오');
    function at(e) { var r = fig.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height; fig.style.setProperty('--lx', (x * 100).toFixed(1) + '%'); fig.style.setProperty('--ly', (y * 100).toFixed(1) + '%'); return [x, y]; }
    function mv(e) { if (found) return; var p = at(e); fig.classList.add('lit');
      if (p[0] < .33 && p[1] > .45) { if (!hold) hold = setTimeout(function () { found = true; fig.classList.add('found'); hint(c, '차잣소 — 이불 속에서 자고 잇섯소.'); buzz([20, 40, 20]); upd(c); }, 700); }
      else { clearTimeout(hold); hold = 0; } }
    fig.addEventListener('pointerdown', function (e) { fig.setPointerCapture && fig.setPointerCapture(e.pointerId); mv(e); });
    fig.addEventListener('pointermove', mv);
    fig.addEventListener('pointerup', function () { clearTimeout(hold); hold = 0; fig.classList.remove('lit'); });
  })();
  /* 활자 상자 고양이 — 다섯 번 눌러야 잡힘 */
  (function () {
    var c = card('cattype'); if (!c) return; var fig = $('.cd-im', c), n = 0;
    hint(c, '☞ 고양이를 누르시오 · 0/5');
    c.addEventListener('click', function (e) { if (e.target.closest('.hj')) return; n++; fig.classList.remove('dash'); void fig.offsetWidth; fig.classList.add('dash');
      hint(c, n < 5 ? '냐! 또 달아낫소 · ' + n + '/5' : '잡앗소 — 「ㄱ」은 입에 물고 잇소.'); });
  })();
  /* 우산 — 책상 밑을 들여다보시오 (그림을 아래로 끌기) */
  (function () {
    var c = card('umbrella'); if (!c) return; var fig = $('.cd-im', c), img = $('img', fig), y0 = null, k = 0, done = false;
    fig.classList.add('pull'); hint(c, '☞ 그림을 아래로 끌어 책상 밑을 들여다보시오');
    fig.addEventListener('pointerdown', function (e) { if (done) return; y0 = e.clientY; fig.setPointerCapture && fig.setPointerCapture(e.pointerId); });
    fig.addEventListener('pointermove', function (e) { if (y0 == null || done) return; k = Math.max(0, Math.min(1, (e.clientY - y0) / 110)); img.style.transform = 'scale(' + (1 + k * 1.6).toFixed(3) + ')'; img.style.transformOrigin = '56% 88%';
      if (k >= 1) { done = true; y0 = null; hint(c, '셋 다 책상 밑에 잇섯소!'); buzz([10, 30, 10]); swap(img, 'assets/seek3/umbrella2.jpg', function (ok) { if (ok) img.style.transform = ''; }); setTimeout(function () { upd(c); }, 700); } });
    function up() { if (done || y0 == null) return; y0 = null; img.style.transition = 'transform .4s ease'; img.style.transform = ''; setTimeout(function () { img.style.transition = ''; }, 420); }
    fig.addEventListener('pointerup', up); fig.addEventListener('pointercancel', up);
  })();
  /* 편집장 의자 — 멸치로 협상 */
  (function () {
    var c = card('chair'); if (!c) return; var fig = $('.cd-im', c), img = $('img', fig), n = 0;
    var b = D.createElement('button'); b.type = 'button'; b.className = 'cd-act'; b.innerHTML = '멸치 한 줌 건네기 <i>0</i>'; fig.after(b);
    var L = ['고양이가 멸치를 먹엇소. 의자는 그대로요.', '두 줌째. 고양이가 하품을 하오. 의자는 그대로요.', '세 줌째 — 고양이가 「두 줌만 더」라 하오. 협상 결렬.'];
    hint(c, '☞ 멸치를 건네 의자를 되차즈시오');
    b.addEventListener('click', function () { if (n >= 3) return; hint(c, L[n]); n++; $('i', b).textContent = n; shake(fig); buzz(10);
      if (n === 3) { b.disabled = true; swap(img, 'assets/seek3/chair2.jpg'); upd(c); } });
  })();
  /* 고양이 떼 — 가장자리 고양이를 다섯 넘게 잡으면 */
  W.mskHerd = function (n) { var c = card('herd'); if (!c) return; hint(c, '잡은 고양이 · ' + n + ' 마리' + (n >= 5 ? ' — 넘엇소!' : ''));
    if (n === 5) { var fig = $('.cd-im', c); shake(fig); swap($('img', fig), 'assets/seek3/herd2.jpg'); } };
  (function () { var c = card('herd'); if (c) hint(c, '☞ 화면 가장자리에 고양이가 나오거든 누르시오 · 0 마리'); })();

  /* 아래칸 — 부고 : 향이 피어오르고, 열 대째엔 고인이 다시 켜짐 */
  (function () {
    var a = $('#adObit'); if (!a) return; var fig = $('.sk-l-img', a), img = $('img', fig), n = 0;
    fig.insertAdjacentHTML('beforeend', '<i class="lw-smoke"></i>');
    $('#obitB').addEventListener('click', function () { n++; fig.style.setProperty('--sm', Math.min(1, n / 6)); fig.classList.remove('puff'); void fig.offsetWidth; fig.classList.add('puff');
      if (n === 10) setTimeout(function () { fig.classList.add('alive'); swap(img, 'assets/seek3/obit2.jpg'); buzz([30, 60, 30, 60, 120]); }, 300); });
  })();
  /* 마감 — 도망갈수록 시계가 닥아옴 */
  (function () {
    var a = $('#adWanted'); if (!a) return; var img = $('.sk-l-img img', a), n = 0;
    $('#runB').addEventListener('click', function () { n++; img.style.transform = 'scale(' + (1 + Math.min(6, n) * .16).toFixed(2) + ')'; img.style.transformOrigin = '50% 40%'; });
  })();
  /* 사과 — 정정할 때마다 흰 그림자에 동그라미 */
  (function () {
    var a = $('#adSorry'); if (!a) return; var fig = $('.sk-l-img', a), img = $('img', fig), n = 0;
    var T = ['엄지?', '장갑?', '귀?', '김 군?', '…아모도 업섯소', '항의 편지'];
    fig.insertAdjacentHTML('beforeend', '<i class="lw-ring"><b></b></i>');
    a.addEventListener('click', function () { if (n >= T.length) return; var r = $('.lw-ring', fig); r.classList.remove('on'); void r.offsetWidth; r.classList.add('on'); $('b', r).textContent = T[n]; n++;
      if (n === 5) { fig.classList.add('gone'); swap(img, 'assets/seek3/ghost2.jpg'); } });
  })();
  /* 문 두드림 — 두드리면 문이 흔들리고, 셋째엔 저쪽에서 */
  (function () {
    var a = $('#adKnock'); if (!a) return; var fig = $('.sk-l-img', a), img = $('img', fig), n = 0;
    a.addEventListener('click', function () { n++; shake(fig);
      if (n === 3) setTimeout(function () { fig.classList.add('back'); shake(fig); }, 1500);
      if (n === 4) swap(img, 'assets/seek3/knock2.jpg'); });
  })();

  /* ── 통지서 열리면 뒤 화면 멈춤 ── */
  var md = $('#modal');
  if (md) new MutationObserver(function () { D.documentElement.classList.toggle('mb-lock', !md.hidden); }).observe(md, { attributes: true, attributeFilter: ['hidden'] });

  /* ── 자리를 비우면 제목이 부름 ── */
  var T0 = D.title, CALL = ['도라오시오 — 심인계', '(1) 차잣소… 아니오', '고양이가 기다리오', '마감이 당신을 차즈오'], ci = 0;
  D.addEventListener('visibilitychange', function () { D.title = D.hidden ? CALL[ci++ % CALL.length] : T0; });
})(window, document);
