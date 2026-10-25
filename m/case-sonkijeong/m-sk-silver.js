/* 경성야록 · 손긔졍 폰판 — 《지워진 표식》 장치 (1018)
   · 차례에 여섯 막 표시
   · 서막 — 기록 영상을 필름 째로
   · 제1막 — 편집대의 사진에 타자 꼬리표
   · 제4막 — 윤전긔: 돌다가, 정간의 날에 멈춤 (소리도 멎음 · 곡조는 낮아짐) · 속간에서 다시 돎 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var RM = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 차례 — 막 이름을 끼움 (차례는 열 때마다 엔진이 새로 그리므로 그린 뒤에 끼우고, 바뀌면 다시) ── */
  var ACT = { c0: ['서막', '결승선'], c1: ['제1막', '사진이 도착하엿소'], c13: ['제2막', '두 장의 사진'], c4: ['제3막', '편집국의 밤'], c5: ['제4막', '멈춘 인쇄긔'], c6: ['종막', '끝내 지워지지 안은 것'], next: ['그 뒤', '부록 · 사료'] };
  var painting = false;
  function tocActs() {
    var toc = $('#mbToc .mb-toc'); if (!toc || toc.querySelector('.toc-act')) return;
    painting = true;
    $$('a[data-goto]', toc).forEach(function (a) {
      var act = ACT[a.getAttribute('data-goto')]; if (!act) return;
      var h = D.createElement('div'); h.className = 'toc-act'; h.setAttribute('data-noko', ''); h.innerHTML = '<small>' + act[0] + '</small><b>' + act[1] + '</b>'; toc.insertBefore(h, a);
    });
    painting = false;
  }
  function watch() {
    var toc = $('#mbToc .mb-toc'); if (!toc) return; tocActs();
    if ('MutationObserver' in W) new MutationObserver(function () { if (!painting) tocActs(); }).observe(toc, { childList: true });
  }
  W.addEventListener('mb:open', function (e) { if (e.detail === 'mbToc') setTimeout(tocActs, 0); });

  /* ── 서막 — 기록 영상 둘레에 필름 구멍 ── */
  function film() {
    $$('.sk-film').forEach(function (f) {
      if ($('.sf-fr', f)) return; var v = $('video', f), b = $('.sf-play', f); if (!v) return;
      var fr = D.createElement('div'); fr.className = 'sf-fr'; f.insertBefore(fr, v); fr.appendChild(v); if (b) fr.appendChild(b);
    });
  }

  /* ── 제1막 — 편집대 사진의 타자 꼬리표 ── */
  function desk() {
    var ph = $('#pd2 .pd2-ph'); if (ph && !$('#pd2 .pd2-tag')) { var t = D.createElement('span'); t.className = 'pd2-tag'; t.setAttribute('data-noko', ''); t.innerHTML = '<b>사진 1</b>시상대 · 1936 · 8 · 9 · 백림 · 실제 기록 사진'; ph.parentNode.insertBefore(t, ph.nextSibling); }
  }

  /* ── 제4막 — 윤전긔 ── */
  function clack(c, v, deep) {
    try {
      var t = c.currentTime;
      var len = .05, buf = c.createBuffer(1, Math.floor(c.sampleRate * len), c.sampleRate), d = buf.getChannelData(0);
      for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / d.length, 2);
      var s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain();
      f.type = 'lowpass'; f.frequency.value = deep ? 420 : 900; g.gain.value = .5 * v;
      s.buffer = buf; s.connect(f); f.connect(g); g.connect(c.destination); s.start(t);
      var o = c.createOscillator(), og = c.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(deep ? 70 : 95, t); o.frequency.exponentialRampToValueAtTime(38, t + .14);
      og.gain.setValueAtTime(.35 * v, t); og.gain.exponentialRampToValueAtTime(.0001, t + (deep ? .3 : .16)); o.connect(og); og.connect(c.destination); o.start(t); o.stop(t + .32);
    } catch (e) {}
  }
  function press(root, o) {
    if (!root) return null;
    var strip = $('.pr-strip', root), st = $('.pr-hd b', root), cap = $('.pr-cap', root);
    var speed = 0, target = 0, x = 0, raf = 0, last = 0, lastClack = 0, inView = false, stopped = false, stopT = 0, ranMs = 0, pend = 0, autoT = 0;
    if (o.img) strip.style.backgroundImage = 'url(' + o.img + ')';
    function ctx() { return W.mb && W.mb.ctx ? W.mb.ctx() : null; }
    function muted() { return W.mb && W.mb.muted && W.mb.muted(); }
    function finish(silent) {
      if (stopT) return; stopT = 1; root.classList.add('stop');
      if (st) st.textContent = o.stopLabel || '멈춤'; if (cap && o.stopCap) cap.innerHTML = o.stopCap;
      if (!silent) { var c = ctx(); if (c && !muted()) { clack(c, .9, true); setTimeout(function () { if (W.mb.tone) W.mb.tone('gavel'); }, 240); } if (navigator.vibrate) try { navigator.vibrate([30, 60, 60]); } catch (e) {} }
      if (o.onStop) o.onStop();
    }
    function frame(now) {
      raf = 0; var dt = Math.min(.05, (now - (last || now)) / 1000); last = now;
      if (inView && speed > .5) ranMs += dt * 1000;
      /* 속도 — 켜질 땐 빠르게, 멈출 땐 2.6초쯤 천천히 */
      if (target > speed) speed = Math.min(target, speed + dt * 1.6); else if (target < speed) speed = Math.max(target, speed - dt * (stopped ? .38 : 1.2));
      if (speed > 0) {
        if (!RM) { x -= speed * dt * 140; strip.style.backgroundPosition = x.toFixed(1) + 'px 50%'; }
        var gap = 400 / Math.max(.12, speed);
        if (inView && now - lastClack > gap) { lastClack = now; var c = ctx(); if (c && !muted()) clack(c, .35 + speed * .5, speed < .35); }
      } else if (stopped) finish(!visible());
      if (speed > 0 || target > 0) raf = requestAnimationFrame(frame); else last = 0;
    }
    function run() { if (stopped) return; target = 1; if (!raf) raf = requestAnimationFrame(frame); if (o.autoStop && !autoT) autoT = setTimeout(function () { stop(); }, o.autoStop); }
    function idle() { target = 0; if (!raf) raf = requestAnimationFrame(frame); }
    /* 멈춤 — 눈에 보이는 채로 적어도 2.8초는 돌고 난 뒤에 (보이지 안으면 소리 업시 그냥 멈춤) */
    function visible() { var r = root.getBoundingClientRect(), h = W.innerHeight; return Math.min(r.bottom, h) - Math.max(r.top, 0) > r.height * .25; }
    function stop() {
      if (stopped || pend) return;
      if (!visible()) { stopped = true; target = 0; finish(true); if (!raf) raf = requestAnimationFrame(frame); return; }
      var wait = Math.max(0, 2800 - ranMs);
      pend = setTimeout(function () { pend = 0; stopped = true; target = 0; if (st) st.textContent = '멈추는 중'; if (!raf) raf = requestAnimationFrame(frame); }, wait);
    }
    if ('IntersectionObserver' in W) new IntersectionObserver(function (es) { es.forEach(function (e) { inView = e.isIntersecting; if (inView) { if (!stopped) run(); } else if (!stopped) idle(); else target = 0; }); }, { threshold: .25 }).observe(root);
    return { stop: stop, run: run, stopped: function () { return stopped || !!pend; }, el: root };
  }

  function init() {
    setTimeout(watch, 80); film(); desk();
    /* 큰 윤전긔 — 달력(빈 날)이 눈에 들어오면 멈춤 · 한 번 멈추면 다시 돌지 안음 */
    var P1 = press($('#skPress'), { img: './img/scan/19360825.jpg', autoStop: 5200, stopLabel: '멈춤 · 팔월 이십구일', stopCap: '<b>팔월 이십구일 — 무긔정간.</b> 윤전긔가 멈추엇소. 그날부터 이백칠십팔 일, 지면은 나오지 아니하엿소.' });
    var cal = $('#cal2');
    if (P1 && cal && 'IntersectionObserver' in W) new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting && e.boundingClientRect.top < W.innerHeight * .9) { P1.stop(); } }); }, { threshold: .35 }).observe(cal);
    /* 작은 윤전긔 — 속간의 아츰, 다시 돎 */
    var P2 = press($('#skPress2'), { img: './img/scan/19370603p.jpg' });
    /* 곡조 — 멈춘 뒤부터 속간까지는 낮게 */
    (function () {
      var a = P1 && P1.el, b = P2 && P2.el; if (!a || !b) return; var raf = 0, v = .3, mT = 0, ya = 0, yb = 0;
      function calc() {
        raf = 0; var bgm = W.mb && W.mb.bgm; if (!bgm || bgm.paused) return;
        var t = performance.now(); if (t - mT > 1000) { mT = t; ya = a.getBoundingClientRect().bottom + W.scrollY; yb = b.getBoundingClientRect().top + W.scrollY; }
        var y = W.scrollY + W.innerHeight * .5;
        var want = (P1.stopped() && y > ya && y < yb) ? .11 : .3;
        v += (want - v) * .18; if (Math.abs(bgm.volume - v) > .004) bgm.volume = Math.max(0, Math.min(1, v));
        if (Math.abs(want - v) > .005) raf = requestAnimationFrame(calc);
      }
      W.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(calc); }, { passive: true });
    })();
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init();
})(window, document);
