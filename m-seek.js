/* 심인 광고면 폰 전용판 덧장치 v3 — 오늘말 · 단서 칸 · 쪽지 넘기기 · 지문 채취 · 가장자리 고양이 · 진동
   광고의 장치(이불·단서·통지서·아래칸)는 컴퓨터판과 같은 seek.js 가 맡음 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
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
      say(CAT[Math.min(caught, CAT.length) - 1]);
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

  /* ── 통지서 열리면 뒤 화면 멈춤 ── */
  var md = $('#modal');
  if (md) new MutationObserver(function () { D.documentElement.classList.toggle('mb-lock', !md.hidden); }).observe(md, { attributes: true, attributeFilter: ['hidden'] });

  /* ── 자리를 비우면 제목이 부름 ── */
  var T0 = D.title, CALL = ['도라오시오 — 심인계', '(1) 차잣소… 아니오', '고양이가 기다리오', '마감이 당신을 차즈오'], ci = 0;
  D.addEventListener('visibilitychange', function () { D.title = D.hidden ? CALL[ci++ % CALL.length] : T0; });
})(window, document);
