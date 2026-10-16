/* 심인 광고면 폰판 덧장치 — 수색률 · 늘 붙어 다니는 수배 고양이 · 지문 채취 · 진동 · 자리 비우면 제목이 부름 */
(function (W, D) {
  'use strict';
  var $ = function (s) { return D.querySelector(s); };
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var bar = $('.mb-bar'); if (bar) bar.classList.add('on');
  /* 수색률 = 읽은 만큼 */
  var pct = $('#mskPct'), pn = $('#mskPctN'), prog = $('.mb-prog'), cat = $('#mskCat'), mug = $('#skMug');
  function onScroll() {
    var h = D.documentElement.scrollHeight - W.innerHeight, p = h > 0 ? Math.min(1, W.scrollY / h) : 0;
    if (pct) pct.style.transform = 'scaleX(' + p.toFixed(3) + ')';
    if (pn) pn.textContent = p > .985 ? '수색 완료 — 아모도 업소' : Math.round(p * 100) + '%';
    if (prog) prog.style.width = (p * 100) + '%';
    if (cat && mug) cat.classList.toggle('on', mug.getBoundingClientRect().bottom < 60);
  }
  W.addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* 냐옹 */
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
  /* 수배 고양이 — 따라다니며 진술함 */
  var LINES = ['변호사를 불러 주시오. 냐.', '「ㄱ」은 이미 삼켯소. 증거 업슴.', '나는 사진발이 안 받는 편이오.', '이 화면 내리는 손, 수상하오.', '268번은 내 생일이 아니오. 몸무게도 아니오.', '편집장 의자는 원래 내 것이엇소.', '츄르… 아니, 멸치 업스면 진술 거부.', '당신도 마감 피해 도망 중이오?', '나를 차즌 게 아니오. 내가 당신을 차즌 거요.', '다음 호 일면은 내 얼굴이오. 예약햇소.', '쉿. 저 아래 문 두드리는 거, 나 아니오.', '자백하리다. …다음 호에.'];
  var bub = $('#mskBub'), li = -1, ht = 0, taps = 0;
  if (cat) cat.addEventListener('click', function () {
    taps++; li = (li + 1 + Math.floor(Math.random() * 3)) % LINES.length;
    bub.textContent = taps === 7 ? '일곱 번째요. 괴롭힘으로 신고하겟소.' : LINES[li];
    cat.classList.remove('hop'); void cat.offsetWidth; cat.classList.add('hop', 'talk');
    meow(taps === 7 ? .7 : 1); buzz(15);
    clearTimeout(ht); ht = setTimeout(function () { cat.classList.remove('talk'); }, 2600);
  });
  /* 지문 채취 — 수배 사진을 꾹 누르면 */
  if (mug) {
    var lt = 0, paw = mug.querySelector('.sk-paw');
    var hold = function (e) { e.preventDefault(); mug.classList.add('press'); lt = setTimeout(function () { mug.classList.add('inked'); buzz([20, 40, 20]); meow(1.2); var c = mug.querySelector('figcaption em'); if (c) c.textContent = '지문 대조 결과 — 발바닥. 용의자 특정 실패.'; }, 900); };
    var up = function () { clearTimeout(lt); mug.classList.remove('press'); };
    mug.addEventListener('pointerdown', hold); mug.addEventListener('pointerup', up); mug.addEventListener('pointerleave', up); mug.addEventListener('pointercancel', up);
    mug.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  }
  /* 문 두드림 · 도망 · 분향 — 폰이 울림 */
  var kn = $('#adKnock'); if (kn) kn.addEventListener('click', function () { buzz([30, 120, 30, 120, 30]); });
  var rb = $('#runB'); if (rb) rb.addEventListener('click', function () { buzz([10, 30, 10, 30, 10, 30, 60]); });
  var ob = $('#obitB'); if (ob) ob.addEventListener('click', function () { buzz(8); });
  /* 자리를 비우면 제목이 부름 */
  var T0 = D.title, CALL = ['도라오시오 — 심인계', '(1) 차잣소… 아니오', '고양이가 기다리오', '마감이 당신을 차즈오'], ci = 0;
  D.addEventListener('visibilitychange', function () { if (D.hidden) { D.title = CALL[ci++ % CALL.length]; } else D.title = T0; });
})(window, document);
