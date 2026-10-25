/* 백백교 폰판 — 활동사진(그 밤 · 병) · 수배지(한 화폭 캔버스) · 끗(시간으로 흐르는 눈)
   스크롤에 매달지 안코 스스로 흐름 → 끈김 업슴. 그림은 모다 재현(미드저니) · 흑백 사본 img/mj/g/ */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var mb = function () { return W.mb || {}; };
  var tone = function (k) { if (mb().tone) mb().tone(k); };
  var A = function () { return mb().audio || { drone: function () {}, heart: function () {} }; };
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var calm = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var G = './img/mj/g/';
  var AR = { bb_night_house: 1.784, bb_door2: 1.784, bb_door: .753, bb_door3: 1.784, bb_flee: 1.784, bb_door4: 1.784, bb_raid: 1.784, bb_ban: 1.784, bb_jar3: 1.328, bb_jar_macro: 1.328, bb_jar: 1.328 };
  function once(el, fn, th) {
    if (!el) return;
    if (!('IntersectionObserver' in W)) { fn(); return; }
    var o = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { o.disconnect(); fn(); } }); }, { threshold: th || .4 });
    o.observe(el);
  }

  /* ════════ 활동사진 상영 장치 ════════
     장면마다 그림이 천천히 흐르고(켄 번스), 자막이 차례로 떠오름. 우: 다음 · 좌: 앞 · 꾹: 멈춤 */
  function Film(o) {
    var S = o.scenes, N = S.length;
    var el = D.createElement('div'); el.className = 'fl ' + (o.cls || ''); el.id = o.id; el.setAttribute('role', 'dialog'); el.setAttribute('aria-label', o.title); el.hidden = true;
    el.innerHTML = '<div class="fl-sc">' + S.map(function (s, i) { return '<figure class="fl-f" data-i="' + i + '"><img src="' + G + s.img + '.jpg" alt="' + s.alt + ' (재현 그림)" decoding="async"></figure>'; }).join('') + '</div>' +
      (o.extra || '') + '<i class="fl-vig" aria-hidden="true"></i><i class="fl-grain" aria-hidden="true"></i>' +
      '<div class="fl-top"><div class="fl-seg">' + S.map(function () { return '<i><b></b></i>'; }).join('') + '</div>' +
      '<div class="fl-hd"><span>' + o.title + '</span><span class="fl-no" id="' + o.id + 'No"></span><button type="button" class="fl-x" aria-label="상영 그치기">×</button></div></div>' +
      '<div class="fl-sub" aria-live="polite"><p class="k"></p><h3></h3><p class="b"></p></div>' +
      '<b class="fl-stamp" aria-hidden="true">' + (o.stamp || '') + '</b>' +
      '<p class="fl-pause" aria-hidden="true">멈춤 — 손을 떼면 이어지오</p>' +
      '<div class="fl-end"><p class="k">' + (o.end.k || '') + '</p><h3>' + o.end.h + '</h3><p class="b">' + (o.end.b || '') + '</p><div class="fl-btns"><button type="button" class="fl-re">처음부터 다시</button><button type="button" class="fl-out">닫고 이어 읽기</button></div></div>' +
      '<p class="fl-tip">오른쪽을 누르면 다음 장면 · 왼쪽은 앞 장면 · 꾹 누르고 잇스면 멈춤</p><span class="fl-rt">그림 · 재현</span>';
    D.body.appendChild(el);
    var figs = $$('.fl-f', el), imgs = figs.map(function (f) { return $('img', f); }), segs = $$('.fl-seg b', el), sub = $('.fl-sub', el), subK = $('.k', sub), subH = $('h3', sub), subB = $('.b', sub), stamp = $('.fl-stamp', el), endC = $('.fl-end', el), noEl = $('#' + o.id + 'No');
    var KJ = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十'];
    var cur = -1, anims = [], seg = null, held = false, paused = false, isOpen = false, raf = 0, cues = {}, ended = false;
    function dur(s) { return calm ? 6500 : (s.d || Math.min(13000, 6200 + (s.b || '').length * 55)); }
    function kb(s, im) {
      var vw = el.clientWidth, vh = el.clientHeight, ar = AR[s.img] || 1.6;
      var iw = Math.max(vw, vh * ar), ih = iw / ar; if (ih < vh) { ih = vh; iw = ih * ar; }
      im.style.width = iw + 'px'; im.style.height = ih + 'px';
      var over = iw - vw, fx = s.fx || 'pan', d = s.dir == null ? 1 : s.dir, f = s.focus == null ? .5 : s.focus;
      var cx = Math.max(-over, Math.min(0, vw / 2 - iw * f)), oy = -(ih - vh) / 2, a, b;
      if (fx === 'pan') { var x0 = d > 0 ? 0 : -over, x1 = d > 0 ? -over : 0; if (s.span) { var mid = cx, half = over * s.span / 2; x0 = Math.max(-over, Math.min(0, mid + half * d)); x1 = Math.max(-over, Math.min(0, mid - half * d)); } a = [x0, oy, 1.06]; b = [x1, oy, 1.0]; }
      else if (fx === 'in') { a = [cx, oy, 1.0]; b = [cx, oy, s.to || 1.22]; }
      else if (fx === 'out') { a = [cx, oy, s.from || 1.25]; b = [cx, oy, 1.0]; }
      else { a = [cx, oy, 1.04]; b = [cx + (s.dx || 0) * vw, oy + (s.dy || 0) * vh, s.to || 1.14]; }
      im.style.transformOrigin = (f * 100) + '% 50%';
      var T = function (v) { return 'translate3d(' + v[0].toFixed(1) + 'px,' + v[1].toFixed(1) + 'px,0) scale(' + v[2] + ')' + (s.rot ? ' rotate(' + s.rot + 'deg)' : ''); };
      if (calm) { im.style.transform = T(b); return null; }
      return im.animate([{ transform: T(a) }, { transform: T(b) }], { duration: dur(s) + 1400, easing: 'cubic-bezier(.33,0,.4,1)', fill: 'forwards' });
    }
    function txt(s, D0) {
      subK.textContent = s.k || ''; subH.innerHTML = s.h || ''; subB.innerHTML = s.b || '';
      var out = [];
      [[subK, 250], [subH, 650], [subB, 1500]].forEach(function (q) {
        q[0].style.opacity = 0;
        if (calm) { q[0].style.opacity = 1; return; }
        out.push(q[0].animate([{ opacity: 0, transform: 'translateY(10px)', filter: 'blur(4px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: 1100, delay: q[1], easing: 'ease-out', fill: 'forwards' }));
      });
      out.push(sub.animate([{ opacity: 1 }, { opacity: 1, offset: .9 }, { opacity: 0 }], { duration: D0, fill: 'forwards' }));
      return out;
    }
    function go(i) {
      if (i < 0) i = 0;
      if (i >= N) { finish(); return; }
      ended = false; el.classList.remove('ended'); sub.style.visibility = '';
      anims.forEach(function (a) { try { a.cancel(); } catch (e) {} }); anims = [];
      var s = S[i], D0 = dur(s), prev = cur; cur = i; cues = {};
      noEl.textContent = '場面 ' + KJ[i] + ' / ' + KJ[N - 1];
      segs.forEach(function (b, k) { b.getAnimations && b.getAnimations().forEach(function (a) { a.cancel(); }); b.style.transform = 'scaleX(' + (k < i ? 1 : 0) + ')'; });
      figs.forEach(function (f, k) {
        if (k === i) { f.style.zIndex = 2; f.classList.add('on'); }
        else if (k === prev) { f.style.zIndex = 1; }
        else { f.style.zIndex = 0; f.classList.remove('on'); f.style.opacity = 0; }
      });
      var fi = figs[i]; fi.style.clipPath = '';
      var fade = fi.animate([{ opacity: prev < 0 ? 0 : 0 }, { opacity: 1 }], { duration: calm ? 10 : (s.cut ? 220 : 1300), easing: 'ease-in-out', fill: 'forwards' });
      fade.onfinish = function () { figs.forEach(function (f, k) { if (k !== cur) { f.style.opacity = 0; f.classList.remove('on'); } }); };
      anims.push(fade);
      var k1 = kb(s, imgs[i]); if (k1) anims.push(k1);
      if (s.slit && !calm) anims.push(fi.animate([{ clipPath: 'inset(0 47% 0 47%)' }, { clipPath: 'inset(0 47% 0 47%)', offset: .25 }, { clipPath: 'inset(0 24% 0 24%)' }], { duration: D0, easing: 'ease-in-out', fill: 'forwards' }));
      anims = anims.concat(txt(s, D0));
      seg = segs[i].animate([{ transform: 'scaleX(0)' }, { transform: 'scaleX(1)' }], { duration: D0, fill: 'forwards' });
      seg.onfinish = function () { if (seg && cur === i && isOpen) go(i + 1); };
      anims.push(seg);
      el.classList.toggle('stamped', false); stamp.style.opacity = '';
      A().heart(!!s.heart);
      if (o.onScene) o.onScene(i, s);
      if (paused) anims.forEach(function (a) { a.pause(); });
      if (!raf) raf = requestAnimationFrame(tick);
    }
    function tick() {
      raf = 0; if (!isOpen) return;
      if (seg && cur >= 0) {
        var s = S[cur], t = Math.min(1, (seg.currentTime || 0) / dur(s));
        (s.cue || []).forEach(function (c, k) { if (t >= c.at && !cues[k]) { cues[k] = 1; c.fn(el, s); } });
        if (o.onTime) o.onTime(cur, t);
      }
      raf = requestAnimationFrame(tick);
    }
    function finish() {
      ended = true; seg = null; el.classList.add('ended'); sub.style.visibility = 'hidden'; A().heart(false);
      segs.forEach(function (b) { b.style.transform = 'scaleX(1)'; });
      endC.animate([{ opacity: 0 }, { opacity: 1 }], { duration: calm ? 10 : 1600, fill: 'forwards' });
      if (o.onEnd) o.onEnd(el);
    }
    function pause(on) { paused = on; el.classList.toggle('held', on); anims.forEach(function (a) { try { on ? a.pause() : a.play(); } catch (e) {} }); if (o.onPause) o.onPause(on); }
    /* 손 — 좌우 누름 · 꾹 */
    var pd = null, holdT = 0;
    el.addEventListener('pointerdown', function (e) {
      if (e.target.closest('button') || ended) return;
      pd = { x: e.clientX, y: e.clientY, t: Date.now() };
      holdT = setTimeout(function () { if (pd) { pd.hold = 1; pause(true); buzz(8); } }, 260);
    });
    function up(e) {
      clearTimeout(holdT); if (!pd) return; var p = pd; pd = null;
      if (p.hold) { pause(false); return; }
      if (e.type === 'pointercancel') return;
      if (Math.abs(e.clientY - p.y) > 60) return;
      var dx = e.clientX - p.x;
      if (Math.abs(dx) > 50) { go(cur + (dx < 0 ? 1 : -1)); return; }
      el.classList.add('tipped');
      go(cur + (e.clientX < el.clientWidth * .3 ? -1 : 1)); tone('tick');
    }
    el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    el.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    $('.fl-x', el).onclick = function () { close(); };
    $('.fl-out', el).onclick = function () { close(); };
    $('.fl-re', el).onclick = function () { endC.getAnimations && endC.getAnimations().forEach(function (a) { a.cancel(); }); go(0); };
    W.addEventListener('keydown', function (e) { if (!isOpen) return; if (e.key === 'Escape') close(); if (e.key === 'ArrowRight') go(cur + 1); if (e.key === 'ArrowLeft') go(cur - 1); });
    W.addEventListener('popstate', function () { if (isOpen) shut(); });
    function open(i) {
      if (isOpen) return; isOpen = true; el.hidden = false; paused = false;
      D.documentElement.classList.add('fl-lock');
      try { history.pushState({ fl: o.id }, ''); } catch (e) {}
      requestAnimationFrame(function () { el.classList.add('open'); cur = -1; go(i || 0); });
      A().drone(true); if (mb().sfx) mb().sfx('whoosh');
      if (o.onOpen) o.onOpen(el);
    }
    function shut() {
      if (!isOpen) return; isOpen = false; seg = null;
      anims.forEach(function (a) { try { a.cancel(); } catch (e) {} }); anims = [];
      A().heart(false); A().drone(false);
      el.classList.remove('open', 'ended', 'held', 'stamped');
      D.documentElement.classList.remove('fl-lock');
      setTimeout(function () { if (!isOpen) el.hidden = true; }, 500);
      if (o.onClose) o.onClose(el);
    }
    function close() { if (!isOpen) return; try { if (history.state && history.state.fl === o.id) { history.back(); return; } } catch (e) {} shut(); }
    return { open: open, close: close, el: el };
  }

  /* 극장 앞 — 표지 한 장 + 장면 띄 */
  function lobby(root, o, film) {
    root.innerHTML = '<button type="button" class="flp" aria-label="' + o.title + ' 상영하기">' +
      '<span class="flp-pic"><img src="' + G + o.cover + '.jpg" alt="" style="object-position:' + (o.coverPos || '50% 50%') + '"></span>' +
      '<span class="flp-k">' + o.k + '</span><b class="flp-h">' + o.title + '</b><em class="flp-s">' + o.sub + '</em>' +
      '<span class="flp-play"><i></i>상영</span><span class="flp-t">' + o.time + '</span><span class="flp-rt">그림 · 재현</span></button>' +
      '<ol class="flp-strip" aria-label="장면">' + o.scenes.map(function (s, i) { return '<li><button type="button" data-i="' + i + '"><img src="' + G + s.img + '.jpg" alt="" loading="lazy" style="object-position:' + ((s.focus == null ? .5 : s.focus) * 100) + '% 50%"><span>' + (s.short || s.h) + '</span></button></li>'; }).join('') + '</ol>' +
      '<p class="flp-how">누르면 화면 가득 상영되오 — 그림이 스스로 흐르니 가만히 보시압. 오른쪽을 누르면 다음 장면, 꾹 누르면 멈춤.</p>';
    $('.flp', root).onclick = function () { film.open(0); };
    $$('.flp-strip button', root).forEach(function (b) { b.onclick = function () { film.open(+b.dataset.i); }; });
  }

  /* ════════ 第五章 · 그 밤 ════════ */
  (function () {
    var root = $('#ngDoor'); if (!root) return;
    root.removeAttribute('style');
    var SC = [
      { img: 'bb_night_house', alt: '눈 덮인 밤 골목, 불 켜진 한 집', short: '왕십리', k: '이월 십륙일 밤 · 왕십리', h: '불이 아즉 켜져 잇섯소', b: '왕십리의 한 집에, 불이 아즉 켜져 잇섯소.', fx: 'in', focus: .5, to: 1.3, d: 7600 },
      { img: 'bb_door2', alt: '창호 앞에서 마주 선 두 그림자', short: '만남', k: '밤 · 만남', h: '따지러 온 사내', b: '유곤용의 조부와 부친은 재산을 모다 바첫고, 누이동생은 교주에게 바쳐졋소. 뒤늦게 이를 안 그는 삼만 원을 바치겟다 하고 인삼과 록용을 보내어 — 이 밤, 하왕십리 부친의 집에서 교주를 맛낫소.', fx: 'pan', dir: 1, d: 13500 },
      { img: 'bb_door', alt: '창호에 댄 손 그림자', short: '틈', k: '그 순간', h: '틈', b: '그는 틈을 엿보앗소.', fx: 'in', focus: .5, to: 1.18, slit: 1, heart: 1, d: 8200 },
      { img: 'bb_door3', alt: '창호 너머로 엉킨 그림자들', short: '막힌 복수', k: '그 순간', h: '막힌 복수', b: '복수하려 하엿소. 그러나 수행원들에게 막혓고 — 교주는 그 길로 달아낫소.', fx: 'pan', dir: -1, heart: 1, cut: 1, d: 9800,
        cue: [{ at: .42, fn: function (el) { tone('gavel'); buzz([40, 60, 90]); el.classList.remove('hit'); void el.offsetWidth; el.classList.add('hit'); } }] },
      { img: 'bb_flee', alt: '어두운 골목으로 멀어지는 흰 옷의 뒷모습', short: '도주', k: '그 길로', h: '사라진 교주', b: '그날 밤, 교주는 사라졋소. 경찰이 그를 쫏앗소.', fx: 'drift', focus: .62, dx: -.05, to: 1.32, heart: 1, d: 9000 },
      { img: 'bb_door4', alt: '찢긴 창호 너머 새벽의 빈 방', short: '새벽', k: '새벽', h: '그 밤이 지나고', b: '', fx: 'out', focus: .5, from: 1.3, d: 6400 },
      { img: 'bb_raid', alt: '등불 아래 문 앞에 선 경찰들', short: '인현동', k: '새벽 · 인현동', h: '인현동', b: '경찰이 인현동의 집을 덥쳣소. 이경득과 이순분이 붓잡혓소. 장부 속의 일이, 그제야 열리기 시작하엿소.', fx: 'pan', dir: 1, d: 11000 },
      { img: 'bb_ban', alt: '등불 아래 펼쳐진 신문 원고', short: '보도 금지', k: '사흘 뒤 · 이월 십구일', h: '보도 금지', b: '이 일을 신문에 싯는 것이 금지되엇소.', fx: 'in', focus: .5, to: 1.2, d: 9000,
        cue: [{ at: .5, fn: function (el) { el.classList.add('stamped'); tone('stamp'); buzz(60); } }] }
    ];
    var film = Film({ id: 'ngFilm', cls: 'night', title: '第五章 · 그 밤', stamp: '報道禁止', scenes: SC,
      end: { k: '그 뒤', h: '쉰세 날 동안,<br>신문은 침묵하엿소.', b: '왕십리의 방 · 재현 그림 — 장면의 순서와 연출은 재구성' } });
    lobby(root, { title: '그 밤', k: '第五章 · 活動寫眞', sub: '이월 십륙일 밤 · 왕십리 — 여덟 장면', time: '약 일 분 이십 초', cover: 'bb_door', coverPos: '50% 40%', scenes: SC }, film);
  })();

  /* ════════ 第十二章 · 선반 우의 병 — 내리는 만큼 장면이 서서히 번져 바뀜 (입자 · 눈 업슴) ════════ */
  (function () {
    var root = $('#jarStage'); if (!root) return;
    var SC = [
      { img: 'bb_jar3', alt: '선반 위의 표본 병 (속은 알아볼 수 없게 그림)', k: '1937 · 소화 십이 년', b: '일본 경찰은 그의 머리를 잘라 포르말린 병에 너헛소.', y: 1937, s0: 1.0, s1: 1.18, fx: .5 },
      { img: 'bb_jar3', alt: '어둠 속 선반의 병들', k: '1945 · 해방', b: '나라가 바뀌엇소. 병은 그대로 남앗소.', y: 1945, s0: 1.25, s1: 1.1, fx: .3 },
      { img: 'bb_jar_macro', alt: '병 속을 떠도는 가는 실오리 (재현)', k: '1950 · 전쟁', b: '전쟁이 지나갓소. 병은 그대로 남앗소.', y: 1950, s0: 1.05, s1: 1.25, fx: .45 },
      { img: 'bb_jar3', alt: '연구원 선반 위의 병', k: '그 뒤 · 국과수', b: '병은 국립과학수사연구원의 선반 우에 노혀 잇섯소.', y: 0, s0: 1.4, s1: 1.15, fx: .5 },
      { img: 'bb_jar_macro', alt: '병 속의 가는 실오리 (재현)', k: '훗날 · 진정', b: '「사람의 몸을 표본으로 두는 것은 비인도적」이라는 진정을 행정안전부가 바다들엿소.', y: 0, s0: 1.15, s1: 1.4, fx: .6 },
      { img: 'bb_jar', alt: '창가 선반 위의 비워진 병', k: '2011 · 시월 이십오일', b: '불교단체가 병을 넘겨바다, 서울시립승화원에서 화장하엿소. 이틀 뒤 남양주 봉선사에서 위령제가 열렷소.', y: 2011, s0: 1.12, s1: 1.0, fx: .68 }
    ];
    var N = SC.length;
    root.removeAttribute('style'); root.className = 'jx'; root.style.height = (N * 110 + 60) + 'svh';
    root.innerHTML = '<div class="jx-st">' + SC.map(function (x, i) { return '<div class="jx-l" style="--fx:' + (x.fx * 100) + '%"><img src="' + G + 'jx_' + x.img + '.jpg" alt="' + x.alt + ' (재현 그림)" decoding="async"></div>'; }).join('') +
      '<i class="jx-vig" aria-hidden="true"></i>' +
      '<div class="jx-yr"><b id="jxY">1937</b><small id="jxA">병 속에서 — 0 년</small></div>' +
      SC.map(function (x, i) { return '<div class="jx-cap"><p class="k">' + x.k + '</p><p class="b">' + x.b + '</p></div>'; }).join('') +
      '<i class="jx-veil" aria-hidden="true"></i><div class="jx-rule"><i id="jxBar"></i></div><span class="jx-rt">그림 · 재현</span><p class="jx-hint" id="jxHint">천천히 내리시압 — 칠십사 년이 번져 가오</p></div>';
    var ls = $$('.jx-l', root), im = ls.map(function (l) { return $('img', l); }), caps = $$('.jx-cap', root), yb = $('#jxY'), ya = $('#jxA'), bar = $('#jxBar'), hint = $('#jxHint'), veil = $('.jx-veil', root), jst = $('.jx-st', root);
    var tp = 0, p = 0, raf = 0, on = false;
    function sm(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }
    function target() { if (!on) return; var r = root.getBoundingClientRect(), span = r.height - W.innerHeight; tp = Math.max(0, Math.min(1, -r.top / Math.max(1, span))); if (!raf) raf = requestAnimationFrame(draw); }
    var YK = [1937, 1945, 1950, 0, 0, 2011];
    function draw() {
      raf = 0; p += (tp - p) * .12; if (Math.abs(tp - p) < .0004) p = tp;
      var f = p * (N - 1);
      ls.forEach(function (l, k) {   /* 보이는 두 장만 그림 — 나머지는 쉬게 함 (끈김 업게) */
        var o = k === 0 ? 1 : sm(f - k + 1), live = k >= Math.floor(f) - 1 && k <= Math.floor(f) + 1, os = o.toFixed(2);
        if (l._v !== live) { l._v = live; l.style.visibility = live ? 'visible' : 'hidden'; }
        if (!live) return;
        if (l._o !== os) { l._o = os; l.style.opacity = os; }
        var t = Math.max(0, Math.min(1, (f - k + 1) / 2)), x = SC[k], sc = (x.s0 + (x.s1 - x.s0) * t).toFixed(3);
        if (im[k]._s !== sc) { im[k]._s = sc; im[k].style.transform = 'translate3d(0,0,0) scale(' + sc + ')'; }
      });
      caps.forEach(function (c, k) { var d = Math.abs(f - k), o = 1 - sm((d - .18) / .3); c.style.opacity = o.toFixed(3); c.style.transform = 'translateY(' + ((f - k) * -26).toFixed(1) + 'px)'; });
      var i0 = Math.floor(f), t0 = f - i0, y;
      if (f >= N - 1.05) y = 2011;
      else if (i0 < 2) y = Math.round(YK[i0] + (YK[i0 + 1] - YK[i0]) * sm(t0));
      else if (i0 === 2 && t0 < .5) y = 1950;
      else y = null;
      if (y) { yb.textContent = y; yb.classList.remove('roll'); ya.textContent = y >= 2011 ? '칠십사 년 — 병이 비워짐' : '병 속에서 — ' + (y - 1937) + ' 년'; }
      else { yb.textContent = '19··'; yb.classList.add('roll'); ya.textContent = '해가 가도 — 병은 그대로'; }
      bar.style.transform = 'scaleX(' + p.toFixed(4) + ')';
      hint.style.opacity = p < .03 ? 1 : 0;
      var v = sm((p - .48) / .5) * .94; veil.style.opacity = v.toFixed(3); jst.classList.toggle('wht', v > .5);   /* 흰빛이 번져 사진을 삼킴 */
      if (on && p !== tp) raf = requestAnimationFrame(draw);
    }
    var tq = 0; W.addEventListener('scroll', function () { if (!tq) tq = requestAnimationFrame(function () { tq = 0; target(); }); }, { passive: true }); W.addEventListener('resize', target);
    if ('IntersectionObserver' in W) new IntersectionObserver(function (es) { es.forEach(function (e) { on = e.isIntersecting; if (on) { target(); A().drone(true); } else A().drone(false); }); }).observe(root);
    target(); p = tp; draw();
  })();

  /* ════════ 第七章 · 얼굴 업는 수배 — 그림과 손자국이 한 화폭(캔버스)에 그려져 어긋날 일이 업슴 ════════
     얼굴을 문지르면 사진의 약이 끌려 흐르고, 바늘 긁힌 자국이 쌓이며, 그가 써 온 일홈이 하나씩 얼굴 우에 새겨짐.
     아는 일홈은 「김두선」 하나 — 나머지 열다섯은 알아볼 수 업게 긁혀 잇음. 열여섯이 다 차면 身元不明. */
  (function () {
    var wp = $('#wp'); if (!wp) return;
    var IW = 828, IH = 1100, FX = 395, FY = 500, RX = 130, RY = 170;
    wp.className = 'wq'; wp.innerHTML = '<canvas class="wq-cv" id="wqCv" role="img" aria-label="얼굴 자리가 뭉개진 수배지 (재현 그림)"></canvas>' +
      '<i class="wq-ring" id="wqRing" aria-hidden="true"></i><span class="rt">그림 · 재현</span>';
    var meter = $('.wp-meter'), cap = $('#mtCap'), bar = $('#wpBar'), nEl = $('#wpN');
    var list = D.createElement('ol'); list.className = 'wq-names'; list.setAttribute('aria-label', '그가 써 온 일홈 열여섯');
    var NM = ['김두선']; for (var q = 0; q < 15; q++) NM.push('');
    list.innerHTML = NM.map(function (n, i) { return '<li' + (n ? ' class="k"' : '') + '><s>' + (i + 1) + '</s><b>' + (n || '판독 불가') + '</b></li>'; }).join('');
    cap.parentNode.insertBefore(list, cap.nextSibling);
    var after = D.createElement('div'); after.className = 'wq-after'; after.hidden = true;
    after.innerHTML = '<figure><img src="' + G + 'bb_watch.jpg" alt="엘진 금시계와 지폐 (재현 그림)"><span class="rt">그림 · 재현</span></figure>' +
      '<p class="k">주머니에 남은 것</p><p class="h">엘진 금시계 하나와 팔십 원.</p><p class="b">얼굴로는 알아볼 수 업섯소. 그를 알아본 것은 — <em>그의 아들</em>이엇소.</p>' +
      '<button type="button" class="wq-again">수배지를 새로 붓치기</button>';
    list.parentNode.insertBefore(after, list.nextSibling);
    var cv = $('#wqCv'), cx = cv.getContext('2d'), ring = $('#wqRing'), img = new Image(), ready = false, done = false;
    var s = 1, dpr = Math.min(2, W.devicePixelRatio || 1), last = null, acc = 0, n = 0, STEP = 420, rnd = Math.random;
    ring.style.left = (FX / IW * 100) + '%'; ring.style.top = (FY / IH * 100) + '%';
    img.src = G + 'bb_wanted2.jpg'; try { D.fonts && D.fonts.load('700 40px "Noto Serif KR"', '김두선신원불명'); } catch (e) {}
    /* (1019) 수배지를 더 기괴하게 — 먹빛 한 가지로(갈색 업시) · 얼굴 자리에 겹쳐 보이는 두 번째 얼굴 · 얼굴에서 흘러내린 먹물 · 가장자리는 어둠 */
    function mono() {
      try {
        var d = cx.getImageData(0, 0, cv.width, cv.height), a = d.data;
        for (var i = 0; i < a.length; i += 4) { var y = (a[i] * 299 + a[i + 1] * 587 + a[i + 2] * 114) / 1000; y = (y - 128) * 1.12 + 118; a[i] = a[i + 1] = a[i + 2] = y < 0 ? 0 : y > 255 ? 255 : y; }
        cx.putImageData(d, 0, 0);
      } catch (e) {}
    }
    function eerie() {
      var W_ = cv.width, H_ = cv.height;
      /* (1019) 새 수배지 그림에 이미 흘러내린 먹물과 꺼진 눈이 잇으므로 — 여긔선 가장자리 어둠과 종이결만 */
      /* 가장자리의 어둠 */
      cx.save(); var vg = cx.createRadialGradient(W_ * .5, H_ * .42, W_ * .25, W_ * .5, H_ * .5, W_ * .85); vg.addColorStop(0, 'rgba(0,0,0,0)'); vg.addColorStop(1, 'rgba(0,0,0,.62)'); cx.fillStyle = vg; cx.fillRect(0, 0, W_, H_); cx.restore();
      /* 종이결 — 가는 가로줄 */
      cx.save(); cx.globalAlpha = .07; cx.fillStyle = '#fff'; for (var yy2 = 0; yy2 < H_; yy2 += 3 * s) cx.fillRect(0, yy2, W_, 1); cx.restore();
    }
    function base() {
      var w = cv.clientWidth; if (!w) return;
      cv.width = Math.round(w * dpr); cv.height = Math.round(w * IH / IW * dpr); s = cv.width / IW;
      cx.setTransform(1, 0, 0, 1, 0, 0); cx.globalAlpha = 1; cx.globalCompositeOperation = 'source-over';
      cx.drawImage(img, 0, 0, cv.width, cv.height);
      mono(); eerie();
      cx.globalAlpha = 1; cx.globalCompositeOperation = 'source-over';
      ready = true;
    }
    function reset() { done = false; acc = 0; n = 0; base(); paintMeter(); wp.classList.remove('done', 'rub'); after.hidden = true; after.classList.remove('in'); $$('li', list).forEach(function (li) { li.classList.remove('on'); }); cap.textContent = '얼굴을 손가락으로 문질러 보시압 — 알아보려 할스록, 그 얼굴은 더 뭉개지오.'; ring.classList.remove('gone'); }
    img.onload = function () { reset(); };
    W.addEventListener('resize', function () { if (!ready) { if (img.complete && cv.clientWidth) reset(); return; } var w = Math.round(cv.clientWidth * dpr); if (w && Math.abs(w - cv.width) > 4) reset(); });
    function inFace(x, y) { var a = (x - FX) / RX, b = (y - FY) / RY; return a * a + b * b < 1.25; }
    function smear(x0, y0, x1, y1) {
      var R = 38 * s, X0 = x0 * s, Y0 = y0 * s, X1 = x1 * s, Y1 = y1 * s;
      cx.save(); cx.beginPath(); cx.arc(X1, Y1, R, 0, 6.3); cx.clip();
      cx.globalAlpha = .62; cx.drawImage(cv, X0 - R, Y0 - R, R * 2, R * 2, X1 - R, Y1 - R * .9, R * 2, R * 2.25);
      cx.restore();
    }
    function scratch(x, y, ang) {
      var k = 2 + (rnd() * 3 | 0);
      for (var i = 0; i < k; i++) {
        var a = ang + (rnd() - .5) * 1.4 + (rnd() < .3 ? Math.PI / 2 : 0), L = (18 + rnd() * 70) * s, ox = (rnd() - .5) * 40 * s, oy = (rnd() - .5) * 40 * s;
        var X = x * s + ox, Y = y * s + oy;
        cx.strokeStyle = rnd() < .82 ? 'rgba(238,237,232,' + (.35 + rnd() * .55).toFixed(2) + ')' : 'rgba(10,10,10,.6)';
        cx.lineWidth = (.5 + rnd() * 1.2) * s * 1.4; cx.lineCap = 'round';
        cx.beginPath(); cx.moveTo(X, Y); cx.quadraticCurveTo(X + Math.cos(a) * L * .5 + (rnd() - .5) * 8 * s, Y + Math.sin(a) * L * .5 + (rnd() - .5) * 8 * s, X + Math.cos(a) * L, Y + Math.sin(a) * L); cx.stroke();
      }
    }
    /* 일홈 새기기 — 첫째는 김두선, 나머지는 알아볼 수 업게 긁힌 자리 */
    function carve(i) {
      var a = (rnd() - .5) * .9, px = FX + (rnd() - .5) * RX * 1.1, py = FY + (rnd() - .5) * RY * 1.2;
      if (i === 0) { px = FX; py = FY - 10; a = -.12; }
      cx.save(); cx.translate(px * s, py * s); cx.rotate(a);
      if (i === 0) {
        cx.font = '700 ' + (70 * s) + 'px "Noto Serif KR", serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle';
        for (var j = 0; j < 4; j++) { cx.lineWidth = (.6 + rnd() * .8) * s * 1.6; cx.strokeStyle = 'rgba(240,239,234,' + (.5 + rnd() * .4).toFixed(2) + ')'; cx.strokeText('김두선', (rnd() - .5) * 3 * s, (rnd() - .5) * 3 * s); }
      } else {
        var w = (90 + rnd() * 110) * s, h = (26 + rnd() * 16) * s;
        cx.globalAlpha = .9;
        for (var m = 0; m < 3 + (rnd() * 3 | 0); m++) { cx.fillStyle = 'rgba(236,235,230,' + (.25 + rnd() * .35).toFixed(2) + ')'; cx.fillRect(-w / 2 + (m * w / 4) + (rnd() - .5) * 6 * s, -h / 2, w / 5, h); }
        cx.lineWidth = .9 * s * 1.6;
        for (var z = 0; z < 16; z++) { cx.strokeStyle = z % 3 ? 'rgba(240,239,234,.7)' : 'rgba(12,12,12,.75)'; var u = -w / 2 + rnd() * w; cx.beginPath(); cx.moveTo(u, -h / 2 - 6 * s); cx.lineTo(u + (rnd() - .5) * h * 2, h / 2 + 6 * s); cx.stroke(); }
        cx.beginPath(); cx.moveTo(-w / 2 - 8 * s, 0); cx.lineTo(w / 2 + 8 * s, (rnd() - .5) * 8 * s); cx.lineWidth = 2.2 * s; cx.strokeStyle = 'rgba(240,239,234,.85)'; cx.stroke();
      }
      cx.restore();
    }
    function paintMeter() {
      var f = Math.min(1, (n + Math.min(1, acc / STEP)) / 16);
      bar.style.width = (f * 100).toFixed(1) + '%'; nEl.textContent = '일홈 ' + n + ' / 16';
    }
    function rub(x, y) {
      if (!last) { last = [x, y]; return; }
      var dx = x - last[0], dy = y - last[1], L = Math.hypot(dx, dy); if (L < 2) return;
      var steps = Math.max(1, Math.round(L / 10));
      for (var i = 1; i <= steps; i++) { var px = last[0] + dx * i / steps, py = last[1] + dy * i / steps, qx = last[0] + dx * (i - 1) / steps, qy = last[1] + dy * (i - 1) / steps; smear(qx, qy, px, py); }
      scratch(x, y, Math.atan2(dy, dx));
      if (inFace(x, y)) {
        acc += L;
        while (acc >= STEP && n < 16) { acc -= STEP; carve(n); $$('li', list)[n].classList.add('on'); n++; tone('type'); buzz(n === 1 ? 30 : 12); if (n === 1) cap.innerHTML = '<b>김두선</b> — 알려진 일홈은 이것 하나. 계속 문지르시압.'; if (n === 8) cap.textContent = '일홈이 늘어날스록, 얼굴은 사라지오.'; }
        paintMeter();
        if (n >= 16 && !done) finish();
      }
      last = [x, y];
    }
    function pos(e) { var r = cv.getBoundingClientRect(); return [(e.clientX - r.left) / r.width * IW, (e.clientY - r.top) / r.height * IH]; }
    cv.addEventListener('pointerdown', function (e) { if (!ready || done) return; e.preventDefault(); cv.setPointerCapture && cv.setPointerCapture(e.pointerId); last = null; rub.apply(null, pos(e)); wp.classList.add('rub'); ring.classList.add('gone'); A().heart(true); });
    cv.addEventListener('pointermove', function (e) { if (!last || done) return; rub.apply(null, pos(e)); });
    function up() { last = null; wp.classList.remove('rub'); A().heart(false); }
    cv.addEventListener('pointerup', up); cv.addEventListener('pointercancel', up);
    cv.style.touchAction = 'none';
    function finish() {
      done = true; up(); A().heart(false);
      /* 얼굴 자리 — 어둠이 번지고 먹빛 도장 */
      var snap = D.createElement('canvas'); snap.width = cv.width; snap.height = cv.height; snap.getContext('2d').drawImage(cv, 0, 0);
      var t0 = performance.now();
      (function f(ts) {
        var t = Math.min(1, (ts - t0) / 1600), e = 1 - Math.pow(1 - t, 3);
        cx.setTransform(1, 0, 0, 1, 0, 0); cx.globalAlpha = 1; cx.drawImage(snap, 0, 0);
        var g = cx.createRadialGradient(FX * s, FY * s, 0, FX * s, FY * s, RY * 1.4 * s); g.addColorStop(0, 'rgba(0,0,0,' + (.45 * e) + ')'); g.addColorStop(1, 'rgba(0,0,0,0)'); cx.fillStyle = g; cx.fillRect(0, 0, cv.width, cv.height);
        if (t > .2) { cx.save(); cx.translate(FX * s, (FY - 120) * s); cx.rotate(-.05); cx.globalAlpha = Math.min(1, (t - .2) / .3); cx.font = '700 ' + (46 * s) + 'px "Noto Serif KR", serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.lineWidth = 1.6 * s; cx.strokeStyle = 'rgba(240,239,234,.95)'; cx.strokeText('김두선', 0, 0); cx.strokeText('김두선', 1.2 * s, .8 * s); cx.restore(); }
        if (t > .35) {
          var u = Math.min(1, (t - .35) / .3), sc = 1.8 - .8 * (1 - Math.pow(1 - u, 3));
          cx.save(); cx.translate(FX * s, (FY + 60) * s); cx.rotate(-.16); cx.scale(sc, sc); cx.globalAlpha = .92 * u;
          /* 먹빛 도장 — 이 사건엔 붉은 것이 업소 */
          cx.strokeStyle = 'rgba(236,235,230,.92)'; cx.lineWidth = 7 * s; cx.strokeRect(-170 * s, -52 * s, 340 * s, 104 * s);
          cx.fillStyle = 'rgba(0,0,0,.35)'; cx.fillRect(-170 * s, -52 * s, 340 * s, 104 * s);
          cx.fillStyle = 'rgba(236,235,230,.95)'; cx.font = '700 ' + (70 * s) + 'px "Noto Serif KR", serif'; cx.textAlign = 'center'; cx.textBaseline = 'middle'; cx.fillText('신원 불명', 0, 4 * s);
          cx.restore();
          if (!f.st) { f.st = 1; tone('stamp'); buzz([20, 40, 80]); }
        }
        if (t < 1) requestAnimationFrame(f);
      })(t0);
      wp.classList.add('done');
      cap.innerHTML = '열여섯 개의 일홈 — 얼굴은 알아볼 수 업슬 만큼 상해 잇섯소.';
      setTimeout(function () { after.hidden = false; requestAnimationFrame(function () { after.classList.add('in'); }); }, 1700);
    }
    $('.wq-again', after).onclick = function () { reset(); wp.scrollIntoView({ behavior: 'smooth', block: 'center' }); };
    once(wp, function () { ring.classList.add('go'); }, .5);
  })();

  /* ════════ 끗 · 흰 것 — 내리는 만큼, 흰 천이 우에서부터 모든 것을 덥허 내려옴 (시간 아닌 손가락으로 · 끈김 업게) ════════ */
  (function () {
    var root = $('#fnRoot'); if (!root) return;
    root.removeAttribute('style'); root.className = 'fw';
    var L = ['그들은 흰 것을 미덧소.', '한 사람의 흰 것으로,<br>천하를 희게 하자 하엿소.', '흰 옷 아래에는 장부가 잇섯고,<br>임명장이 잇섯고 —', '이십여 곳의 산이 잇섯소.'];
    root.innerHTML = '<div class="fw-st"><img class="fw-bg" src="' + G + 'fz_snow.jpg" alt="눈 덮인 산자락 (재현 그림)" decoding="async"><span class="fw-rt">그림 · 재현</span>' +
      '<div class="fw-tx"><p class="fw-k">소화 십이 년 · 왕십리에서 용문산까지</p>' + L.map(function (t) { return '<p class="fw-l">' + t + '</p>'; }).join('') + '</div>' +
      '<p class="fw-big">가장 흰 것이,<br>가장 만히 덥고 잇섯소.</p>' +
      '<div class="fw-sheet" aria-hidden="true"><i></i></div>' +
      '<div class="fw-out"><p class="fw-one">모든 것이 희어졋스나 —<br>그 안에서 사라진 사람들의 긔록은 남앗소.</p><small class="fw-note" data-noko>연출 문장 · 역사 인용이 아니오</small>' +
      '<a class="fw-rec" href="#colophon" data-goto="colophon"><span>긔록 열람</span><i></i></a></div>' +
      '<p class="fw-hint">천천히 내리시압</p></div>';
    var st = $('.fw-st', root), bg = $('.fw-bg', root), k = $('.fw-k', root), ls = $$('.fw-l', root), sh = $('.fw-sheet', root), big = $('.fw-big', root), one = $('.fw-one', root), note = $('.fw-note', root), rec = $('.fw-rec', root), hint = $('.fw-hint', root);
    var tp = 0, p = 0, raf = 0, on = false, cache = {}, sec = root.closest ? root.closest('section') : root.parentElement;
    function sm(t) { t = Math.max(0, Math.min(1, t)); return t * t * (3 - 2 * t); }
    function set(el, key, prop, v) { var id = key + prop; if (cache[id] === v) return; cache[id] = v; el.style[prop] = v; }
    function target() { if (!on) return; var r = root.getBoundingClientRect(), span = r.height - W.innerHeight; tp = Math.max(0, Math.min(1, -r.top / Math.max(1, span))); if (!raf) raf = requestAnimationFrame(draw); }
    function draw() {
      raf = 0; p += (tp - p) * .12; if (Math.abs(tp - p) < .0005) p = tp;
      set(bg, 'bg', 'transform', 'translate3d(0,0,0) scale(' + (1.12 - p * .12).toFixed(3) + ')');
      var gone = 1 - sm((p - .32) / .05);   /* 네 줄은 큰 말이 나오기 전에 걷힘 */
      set(k, 'k', 'opacity', (sm(p / .05) * gone).toFixed(2));
      ls.forEach(function (l, i) { var a = .04 + i * .07; set(l, 'l' + i, 'opacity', (sm((p - a) / .06) * gone).toFixed(2)); set(l, 'lt' + i, 'transform', 'translate3d(0,' + ((1 - sm((p - a) / .06)) * 14).toFixed(1) + 'px,0)'); });
      set(big, 'b', 'opacity', (sm((p - .36) / .06) * (1 - sm((p - .50) / .08))).toFixed(2));   /* 검은 밤의 마지막 말 — 천이 내려오며 묻힘 */
      var c = sm((p - .46) / .32);   /* 흰 천이 내려옴 — 사진도 글도 다 덥힘 */
      set(sh, 's', 'transform', 'translate3d(0,' + (-100 + c * 100).toFixed(2) + '%,0)');
      set(one, 'o', 'opacity', sm((p - .84) / .07).toFixed(2));   /* 한 문장만 남음 */
      set(note, 'n', 'opacity', (sm((p - .9) / .05) * .9).toFixed(2));
      set(rec, 'rc', 'opacity', sm((p - .95) / .04).toFixed(2));
      st.classList.toggle('w', c > .98);
      if (sec) sec.classList.toggle('w', c > .5);   /* 장 바탕도 따라 희어짐 — 천 아래로 검은 띠가 남지 안케 */
      W.__bbWhite = c;
      set(hint, 'h', 'opacity', p < .02 ? '1' : '0');
      if (on && p !== tp) raf = requestAnimationFrame(draw);
    }
    var tq = 0; W.addEventListener('scroll', function () { if (!tq) tq = requestAnimationFrame(function () { tq = 0; target(); }); }, { passive: true }); W.addEventListener('resize', target);
    if ('IntersectionObserver' in W) new IntersectionObserver(function (es) { es.forEach(function (e) { on = e.isIntersecting; if (on) target(); }); }).observe(root);
    target(); p = tp; draw();
  })();
})(window, document);
