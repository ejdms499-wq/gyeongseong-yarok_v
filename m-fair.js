/* 경성야록 부록 · 경성사건박람회 — 폰판 (m-fair.html)
   거리(세로로 걷는 회장) · 관 안(문학 · 창가 · 무대) · 안내소 · 수첩
   글과 자료는 컴퓨터판과 같은 window.FAIR (fair-data.js) — 고치면 두 판이 함께 바뀜 */
(function (W, D) {
  'use strict';
  var F = W.FAIR; if (!F) return;
  var C = F.config, AD = C.assetDir;
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  /* 옛말 ↔ 오늘말 — 공통 엔진(yk-mbook.js)의 낱말 눌러 바꾸기 · 「가 오늘말」 단추가 그대로 먹음 */
  function T(o) {
    if (o == null) return '';
    if (typeof o === 'string') return esc(o);
    var a = String(o.old == null ? '' : o.old), b = String(o.now == null ? a : o.now);
    return a === b ? esc(a) : '<y-k class="hj" data-old="' + esc(a) + '" data-ko="' + esc(b) + '">' + esc(a) + '</y-k>';
  }
  var tone = function (k) { if (W.mb && W.mb.tone) W.mb.tone(k); };
  var REDUCED = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 수첩 (컴퓨터판 · 본지 부록 칸과 같은 이름으로 기억) ── */
  var store = { stamps: [], ticket: '', ticketType: '', plays: {} };
  try { var sv = JSON.parse(localStorage.getItem(C.storageKey) || 'null'); if (sv && Array.isArray(sv.stamps)) store = sv; } catch (e) {}
  function save() { try { localStorage.setItem(C.storageKey, JSON.stringify(store)); } catch (e) {} }
  function visited(id) { return store.stamps.indexOf(id) > -1; }
  var PASS = [{ id: 'info', kj: '案內所', name: { old: '안내소', now: '안내소' } }].concat(F.halls.map(function (h) { return { id: h.id, kj: { literature: '文學館', music: '唱歌館', stage: '舞臺館', art: '美術館' }[h.id] || '陳列館', name: h.name }; }));
  function stamp(id) {
    if (!visited(id)) { store.stamps.push(id); save(); tone('stamp'); }
    paintPass();
    markHub(id);
  }
  function paintPass() {
    var n = PASS.filter(function (p) { return visited(p.id); }).length;
    $('#passN').textContent = n;
    var b = $('#psBody'); if (!b) return;
    var all = n === PASS.length;
    b.innerHTML = '<p class="ps-k">관에 들어서면 도장이 찍히오. 네 곳을 다 돌면 — 상뎜 할인권이 나오오.</p>' +
      '<div class="ps-slots">' + PASS.map(function (p) {
        var on = visited(p.id);
        return '<div class="ps-slot' + (on ? ' on' : '') + '"><b>' + p.kj + '</b><span>' + T(p.name) + '</span>' + (on ? '<i>印</i>' : '<em>아즉</em>') + '</div>';
      }).join('') + '</div>' +
      (store.ticket ? '<p class="ps-tk">입장권 개찰 · ' + esc(store.ticket) + '</p>' : '<p class="ps-tk">입장권은 아즉 개찰 전이오.</p>') +
      (all ? '<div class="ps-coupon"><small>割引券 · 경성야록 상뎜</small><b>네 곳을 다 도랏소</b><p>상뎜에서 이 화면을 보여 주시압.</p><a href="shop.html">상뎜으로 →</a></div>' : '') +
      '<button type="button" class="mb-btn ghost ps-reset" id="psReset">수첩 비우기</button>';
    $('#psReset').onclick = function () { store.stamps = []; save(); paintPass(); $$('.fx-stop.been').forEach(function (s) { s.classList.remove('been'); }); };
  }

  /* ════ 넘기는 카드 (커버플로) — 옆으로 밀어 고르고, 가운데 카드를 아래로 끌어 「드러가기」 ════
     el: 담을 곳 · html[]: 카드 속 · o: { onPick(i), onChange(i), start, pull:'아래로 끌어 드러가기' } */
  function Flow(el, html, o) {
    o = o || {};
    el.classList.add('cf');
    el.innerHTML = '<div class="cf-stage">' + html.map(function (h, i) { return '<div class="cf-card" data-i="' + i + '">' + h + '</div>'; }).join('') + '</div>' +
      '<div class="cf-dots">' + html.map(function (_, i) { return '<i data-i="' + i + '"></i>'; }).join('') + '</div>' +
      (o.pull === false ? '' : '<p class="cf-pull"><i></i>' + (o.pull || '가운데 카드를 아래로 끌어 드러가시압') + '</p>');
    var stage = $('.cf-stage', el), cards = $$('.cf-card', el), dots = $$('.cf-dots i', el), N = cards.length;
    var pos = o.start || 0, tgt = pos, drag = null, raf = 0, cur = -1, busy = false;
    function render() {
      cards.forEach(function (c, i) {
        var d = i - pos, ad = Math.abs(d), dy = (drag && drag.axis === 'y' && i === drag.i) ? drag.dy : 0;
        c.style.transform = 'translate(-50%,0) translateX(' + (d * 56).toFixed(2) + '%) translateZ(' + (-Math.min(ad, 4) * 150).toFixed(1) + 'px) rotateY(' + Math.max(-58, Math.min(58, -d * 38)).toFixed(2) + 'deg) translateY(' + dy.toFixed(1) + 'px) rotateX(' + (-dy * .06).toFixed(2) + 'deg)';
        c.style.opacity = ad > 3.2 ? 0 : (1 - Math.max(0, ad - .3) * .2).toFixed(3);
        c.style.zIndex = 100 - Math.round(ad * 10);
        c.style.setProperty('--lit', Math.max(0, 1 - ad).toFixed(3));
      });
      var k = Math.max(0, Math.min(N - 1, Math.round(pos)));
      if (k !== cur) { cur = k; cards.forEach(function (c, i) { c.classList.toggle('cur', i === k); }); dots.forEach(function (d, i) { d.classList.toggle('on', i === k); }); if (o.onChange) o.onChange(k); tone('tick'); }
    }
    function loop() { if (!drag) { pos += (tgt - pos) * .16; if (Math.abs(tgt - pos) < .001) pos = tgt; } render(); raf = (drag || pos !== tgt) ? requestAnimationFrame(loop) : 0; }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }
    function go(i) { tgt = Math.max(0, Math.min(N - 1, i)); kick(); }
    function pick(i) {
      if (busy) return; busy = true; var c = cards[i];
      c.classList.add('drop'); if (navigator.vibrate) try { navigator.vibrate(20); } catch (e) {}
      setTimeout(function () { if (o.onPick) o.onPick(i); }, 380);
      setTimeout(function () { c.classList.remove('drop'); busy = false; render(); }, 1100);
    }
    stage.addEventListener('dragstart', function (e) { e.preventDefault(); });
    stage.addEventListener('pointerdown', function (e) {
      var c = e.target.closest('.cf-card'); if (!c || busy) return;
      if (e.pointerType === 'mouse') e.preventDefault();
      drag = { x: e.clientX, y: e.clientY, p: pos, axis: null, i: +c.dataset.i, dx: 0, dy: 0, t: performance.now(), v: 0, lx: e.clientX };
      stage.setPointerCapture && stage.setPointerCapture(e.pointerId); kick();
    });
    stage.addEventListener('pointermove', function (e) {
      if (!drag) return; var dx = e.clientX - drag.x, dy = e.clientY - drag.y;
      if (!drag.axis && (Math.abs(dx) > 8 || Math.abs(dy) > 8)) drag.axis = (Math.abs(dy) > Math.abs(dx) && dy > 0 && drag.i === cur) ? 'y' : 'x';
      if (drag.axis === 'x') { var w = cards[0].offsetWidth * .56 || 160; pos = Math.max(-.4, Math.min(N - .6, drag.p - dx / w)); var now = performance.now(); drag.v = (e.clientX - drag.lx) / Math.max(1, now - drag.t); drag.t = now; drag.lx = e.clientX; }
      if (drag.axis === 'y') { drag.dy = Math.max(0, dy * .85); el.classList.toggle('arm', drag.dy > 90); }
      if (drag.axis && e.cancelable) e.preventDefault();
    });
    function up() {
      if (!drag) return; var d = drag; drag = null; el.classList.remove('arm');
      if (!d.axis) { if (d.i === cur) pick(d.i); else go(d.i); return; }
      if (d.axis === 'x') { var w = cards[0].offsetWidth * .56 || 160; go(Math.round(pos - Math.max(-1.2, Math.min(1.2, d.v * 120 / w)))); return; }
      if (d.dy > 90) { render(); pick(d.i); } else { kick(); }
    }
    stage.addEventListener('pointerup', up); stage.addEventListener('pointercancel', up);
    $('.cf-dots', el).addEventListener('click', function (e) { var d = e.target.closest('i[data-i]'); if (d) go(+d.dataset.i); });
    render();
    return { go: go, get i() { return cur; }, card: function (i) { return cards[i]; } };
  }

  /* ════ 첫 화면 — 불러오기 → 환영 (넘기는 세 장 · 입장권) → 회장 ════ */
  var HUB = null;
  (function () {
    var ld = $('#ld'), wl = $('#wl'), pages = $('#wlPages'), dots = $$('#wlDots i'), bar = $('#ldBar');
    var fromMain = /[?&]from=main/.test(location.search);
    var imgs = ['mj-gate.jpg', 'ex-ticket-adult.jpg', 'mj-pav-literature.png', 'mj-pav-music.png', 'mj-pav-stage.png'], n = 0, t0 = performance.now();
    function done1() { n++; bar.style.width = (n / imgs.length * 100) + '%'; if (n >= imgs.length) finish(); }
    imgs.forEach(function (s) { var im = new Image(); im.onload = im.onerror = done1; im.src = AD + s; });
    function finish() { var wait = Math.max(0, 1500 - (performance.now() - t0)); setTimeout(function () { ld.classList.add('gone'); setTimeout(function () { ld.remove(); }, 900); if (store.ticket && !fromMain) { /* 이미 입장한 이는 바로 회장 */ } }, wait); }
    setTimeout(finish, 5000);
    pages.addEventListener('scroll', function () { var k = Math.round(pages.scrollLeft / pages.clientWidth); dots.forEach(function (d, i) { d.classList.toggle('on', i === k); }); }, { passive: true });
    $$('[data-wl]').forEach(function (b) { b.addEventListener('click', function () { pages.scrollTo({ left: pages.clientWidth * +b.dataset.wl, behavior: 'smooth' }); }); });
    /* 입장권 */
    var tk = $('#tk'), stub = $('#tkStub'), how = $('#gHow'), d = new Date();
    var KJ = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九'];
    function kn(x) { return x < 10 ? KJ[x] : (x < 20 ? '十' : KJ[Math.floor(x / 10)] + '十') + (x % 10 ? KJ[x % 10] : ''); }
    $('#tkDate').innerHTML = kn(d.getMonth() + 1) + '月<br>' + kn(d.getDate()) + '日';
    function punch(go) {
      if (!tk.classList.contains('torn')) {
        tk.classList.add('torn');
        store.ticket = d.getFullYear() + '-' + String(d.getMonth() + 1).padStart(2, '0') + '-' + String(d.getDate()).padStart(2, '0'); store.ticketType = 'adult'; save(); paintPass();
        tone('stamp'); if (W.mb && W.mb.sfx) W.mb.sfx('whoosh');
        how.textContent = '개찰하엿소. 회장에 불이 드러오오.';
      }
      if (go) setTimeout(enter, 900);
    }
    function enter() {
      var iris = D.createElement('div'); iris.className = 'fx-iris'; D.body.appendChild(iris);
      requestAnimationFrame(function () { iris.classList.add('close'); });
      setTimeout(function () { wl.classList.add('gone'); D.body.classList.add('in'); iris.classList.remove('close'); iris.classList.add('open'); setTimeout(function () { iris.remove(); }, 1300); }, REDUCED ? 0 : 850);
    }
    var x0 = null, dx = 0;
    stub.addEventListener('pointerdown', function (e) { x0 = e.clientX; dx = 0; e.stopPropagation(); stub.setPointerCapture && stub.setPointerCapture(e.pointerId); });
    stub.addEventListener('pointermove', function (e) { if (x0 == null || tk.classList.contains('torn')) return; dx = Math.max(0, e.clientX - x0); stub.style.transform = 'translateX(' + Math.min(80, dx) + 'px) rotate(' + Math.min(10, dx / 8) + 'deg)'; });
    stub.addEventListener('pointerup', function () { if (x0 == null) return; x0 = null; stub.style.transform = ''; if (dx > 40 || dx < 4) punch(true); });
    stub.addEventListener('pointercancel', function () { x0 = null; stub.style.transform = ''; });
    stub.addEventListener('touchmove', function (e) { e.stopPropagation(); }, { passive: true });
    $('#wlSkip').onclick = function () { enter(); };
    $('#wlGo').onclick = function () { punch(true); };
    if (store.ticket) { tk.classList.add('torn'); how.textContent = '이미 개찰한 표요. 「입장」을 누르시압.'; }
    if (fromMain) { try { history.replaceState(null, '', location.pathname); } catch (e) {} setTimeout(function () { pages.scrollTo({ left: pages.clientWidth * 2 }); punch(false); }, 1700); }
  })();

  /* ════ 회장 — 관 카드 ════ */
  function worksIn(id) { return F.works.filter(function (w) { return w.hall === id; }).sort(function (a, b) { return a.year - b.year; }); }
  var NUMW = ['', '한', '두', '세', '네', '다섯', '여섯', '닐곱', '여덟', '아홉', '열', '열한', '열두', '열세', '열네', '열다섯', '열여섯', '열닐곱', '열여덟', '열아홉', '스무'];
  var KJH = { literature: '文學館', music: '唱歌館', stage: '舞臺館', art: '美術館' };
  var STOPS = [{ id: 'info', kj: '案內所', name: { old: '안내소', now: '안내소' }, kind: { old: '소화 사 년 조선박람회', now: '1929년 조선박람회' }, line: { old: '진짜 박람회의 입장권 · 입장료 · 안내문 · 조감도', now: '실제 박람회의 입장권 · 입장료 · 안내문 · 조감도' }, img: 'ex-poster-bw.png', type: 'info' }]
    .concat(F.halls.map(function (h) { var n = worksIn(h.id).length; return { id: h.id, kj: KJH[h.id] || '陳列館', name: h.name, kind: h.kind, line: n ? { old: '진열품 ' + (NUMW[n] || n) + ' 점', now: '작품 ' + n + '점' } : { old: '진열 준비 중', now: '진열 준비 중' }, img: 'mj-pav-' + h.id + '.png', type: 'hall' }; }))
    .concat([
      { id: 'dial', kj: '年表', name: { old: '연표', now: '연표' }, kind: { old: '사건이 거러온 해', now: '사건이 걸어온 해' }, line: { old: '다이알을 돌려 백 년을 건너시오', now: '다이얼을 돌려 백 년을 건너세요' }, type: 'dial' },
      { id: 'tree', kj: '揭示板', name: { old: '사건 족보', now: '사건 족보' }, kind: { old: '사건 → 작품', now: '사건 → 작품' }, line: { old: '사건이 어느 작품으로 니어졋는지', now: '사건이 어떤 작품으로 이어졌는지' }, type: 'link', href: C.treePage },
      { id: 'exit', kj: '出口', name: { old: '출구', now: '출구' }, kind: { old: '첫닭 울기 전에', now: '새벽이 오기 전에' }, line: { old: '본지로 도라가 다른 사건도 보시오', now: '본지로 돌아가 다른 사건도 보세요' }, type: 'link', href: C.mainPage }
    ]);
  function cardHtml(s, i) {
    var vis = s.type === 'hall' ? '<img class="hc-bld" src="' + AD + s.img + '" alt="' + esc(s.name.old) + ' 건물 (재현 그림)">'
      : s.type === 'info' ? '<div class="hc-kiosk"><img src="' + AD + 'ex-poster-bw.png" alt=""><img src="' + AD + 'ex-leaflet-cover.jpg" alt=""><img src="' + AD + 'ex-ticket-adult.jpg" alt=""></div>'
      : s.type === 'dial' ? '<div class="hc-dial"><i></i><b>1880</b><b>1926</b><b>1937</b><b>2026</b></div>'
      : s.id === 'tree' ? '<div class="hc-board">' + ['윤심덕 · 김우진', '마리아 참살', '죽첨정', '손긔정 말소', '백백교'].map(function (t, k) { return '<span style="--r:' + ((k % 2 ? 1 : -1) * (2 + k)) + 'deg">' + t + '</span>'; }).join('') + '</div>'
      : '<div class="hc-arch"><span>出 口</span></div>';
    return '<div class="hc' + (visited(s.id) ? ' been' : '') + '" data-id="' + s.id + '"><p class="hc-no"><span>第 ' + ['一', '二', '三', '四', '五', '六', '七', '八'][i] + '</span><span>' + s.kj + '</span></p>' +
      '<div class="hc-vis">' + vis + '<i class="hc-glow"></i></div>' +
      '<h3>' + T(s.name) + '</h3><p class="hc-k">' + T(s.kind) + '</p><p class="hc-l">' + T(s.line) + '</p><b class="hc-been">印</b></div>';
  }
  HUB = Flow($('#hubFlow'), STOPS.map(cardHtml), {
    pull: '가운데 카드를 아래로 끌어 드러가시압 — 옆으로 밀면 다른 관',
    onChange: function (k) { var s = STOPS[k]; $('#hubSay').innerHTML = '이번은 <b>' + esc(s.name.old) + '</b>이오.' + (STOPS[k + 1] ? ' 다음은 ' + esc(STOPS[k + 1].name.old) + '이오.' : ' 종뎜이오.'); },
    onPick: function (k) { var s = STOPS[k]; if (s.type === 'info') openInfo(); else if (s.type === 'hall') openHall(s.id); else if (s.type === 'dial') openDial(); else location.href = s.href; }
  });
  function markHub(id) { var c = $('#hubFlow .hc[data-id="' + id + '"]'); if (c) c.classList.add('been'); }

  /* ════ 연표 — 다이알을 돌려 백 년을 건넘 ════ */
  var DIAL = null;
  function openDial() {
    if (!DIAL) buildDial();
    W.mb.open('shDial');
  }
  function buildDial() {
    var hallName = {}; F.halls.forEach(function (h) { hallName[h.id] = h.name; });
    var items = F.timeline.map(function (e) { return { y: e.y, ev: 1, title: e.t, kind: { old: '그해의 일', now: '그해의 일' } }; })
      .concat(F.works.filter(function (w) { return hallName[w.hall]; }).map(function (w) { return { y: w.year, w: w, title: w.title, kind: w.genre, hall: w.hall }; }))
      .sort(function (a, b) { return a.y - b.y || (b.ev ? 1 : 0) - (a.ev ? 1 : 0); });
    var N = items.length, STEP = Math.min(14, 300 / Math.max(1, N - 1));
    var body = $('#dlBody');
    body.innerHTML = '<div class="dl-view" id="dlView"></div>' +
      '<div class="dl-wheel" id="dlWheel"><div class="dl-rot" id="dlRot">' + items.map(function (it, i) {
        return '<span class="dl-t' + (it.ev ? ' ev' : '') + '" style="--a:' + (i * STEP).toFixed(2) + 'deg"><i></i><b>' + it.y + '</b></span>';
      }).join('') + '</div><div class="dl-hub"><small>年</small><b id="dlY">—</b><em id="dlN"></em></div><i class="dl-needle"></i></div>' +
      '<p class="dl-hint">' + T({ old: '바퀴를 손가락으로 돌리시압', now: '바퀴를 손가락으로 돌려 보세요' }) + '</p>';
    var rot = $('#dlRot'), wheel = $('#dlWheel'), ang = 0, tgt = 0, cur = -1, drag = null, raf = 0;
    function show(i) {
      var it = items[i]; cur = i;
      $('#dlY').textContent = it.y; $('#dlN').textContent = (i + 1) + ' / ' + N;
      $$('.dl-t', rot).forEach(function (t, k) { t.classList.toggle('on', k === i); });
      var v = $('#dlView'); v.classList.remove('in'); void v.offsetWidth;
      v.innerHTML = it.ev ? '<p class="dv-k">그해 · 지면의 일</p><h3>' + T(it.title) + '</h3><p class="dv-y">' + it.y + '</p>'
        : '<p class="dv-k">' + T(hallName[it.hall]) + ' · ' + T(it.kind) + '</p><h3>' + T(it.title) + '</h3><p class="dv-y">' + it.y + (it.w.maker ? ' · ' + T(it.w.maker) : '') + '</p>' +
          (it.w.case && F.cases[it.w.case] ? '<p class="dv-c">' + T({ old: '사건', now: '사건' }) + ' — ' + T(F.cases[it.w.case]) + '</p>' : '') +
          '<button type="button" class="dv-go" data-hall="' + it.hall + '">' + T({ old: '이 작품이 노힌 관으로', now: '이 작품이 있는 관으로' }) + ' →</button>';
      v.classList.add('in'); tone('tick'); if (navigator.vibrate) try { navigator.vibrate(6); } catch (e) {}
      var g = $('.dv-go', v); if (g) g.onclick = function () { var h = g.dataset.hall; W.mb.close('shDial'); setTimeout(function () { openHall(h); }, 420); };
    }
    function loop() { if (!drag) ang += (tgt - ang) * .14; rot.style.transform = 'rotate(' + (-ang).toFixed(2) + 'deg)'; var k = ((Math.round(ang / STEP) % N) + N) % N; if (k !== cur && Math.round(ang / STEP) >= 0 && Math.round(ang / STEP) < N) show(k); raf = (drag || Math.abs(tgt - ang) > .05) ? requestAnimationFrame(loop) : 0; }
    function kick() { if (!raf) raf = requestAnimationFrame(loop); }
    function angAt(e) { var r = wheel.getBoundingClientRect(); return Math.atan2(e.clientY - (r.top + r.height / 2), e.clientX - (r.left + r.width / 2)) * 180 / Math.PI; }
    wheel.addEventListener('pointerdown', function (e) { drag = { a: angAt(e), g: ang }; wheel.setPointerCapture && wheel.setPointerCapture(e.pointerId); kick(); e.preventDefault(); });
    wheel.addEventListener('pointermove', function (e) { if (!drag) return; var a = angAt(e), d = a - drag.a; if (d > 180) d -= 360; if (d < -180) d += 360; drag.a = a; drag.g -= d; ang = Math.max(0, Math.min((N - 1) * STEP, drag.g)); });
    function up() { if (!drag) return; drag = null; tgt = Math.round(ang / STEP) * STEP; kick(); }
    wheel.addEventListener('pointerup', up); wheel.addEventListener('pointercancel', up);
    rot.addEventListener('click', function (e) { var t = e.target.closest('.dl-t'); if (!t) return; var i = $$('.dl-t', rot).indexOf(t); tgt = i * STEP; kick(); });
    show(0); DIAL = true;
  }

  /* ════ 관 안 ════ */
  function hallOf(id) { return F.halls.filter(function (h) { return h.id === id; })[0]; }
  function head(h, bg) {
    return '<div class="hx-top" style="background-image:url(' + AD + bg + ')"><i></i>' +
      '<p class="hx-kind">' + T(h.kind) + '</p>' +
      '<p class="hx-docent"><b>안내원</b>' + T(h.docent) + '</p>' +
      (h.secret ? '<details class="hx-secret"><summary>' + T({ old: '접힌 쪽지 — 숨은 이약이', now: '접힌 쪽지 — 숨은 이야기' }) + '</summary><p>' + T(h.secret) + '</p></details>' : '') + '</div>';
  }
  function meta(w) { return [w.genre, { old: String(w.year), now: String(w.year) }].concat(w.maker ? [w.maker] : []).map(T).join(' · '); }
  var openId = null;
  function openHall(id) {
    var h = hallOf(id); if (!h) return; openId = id;
    $('#hlName').innerHTML = T(h.name); $('#hlKj').textContent = { literature: '文學館', music: '唱歌館', stage: '舞臺館' }[id] || '陳列館';
    var body = $('#hlBody'); body.scrollTop = 0;
    var list = worksIn(id);
    if (h.room === 'shelf') roomShelf(body, h, list);
    else if (h.room === 'phono') roomPhono(body, h, list);
    else roomMedia(body, h, list);
    W.mb.open('shHall'); stamp(id);
  }
  W.addEventListener('mb:close', function (e) {
    if (e.detail === 'shHall') { stopAll(); openId = null; }
  });
  function stopAll() { if (PH.au) { try { PH.au.pause(); } catch (e) {} } PH.stop && PH.stop(); var v = $('#tvPic'); if (v) v.innerHTML = ''; }

  /* ── 문학관 · 책장 ── */
  var BOOKS = [];
  function roomShelf(body, h, list) {
    BOOKS = list.filter(function (w) { return !w.aside; }).concat(list.filter(function (w) { return w.aside; }));
    body.innerHTML = head(h, 'mj-room-literature.jpg') +
      '<p class="hx-hint">' + T({ old: '옆으로 밀어 책을 고르고 — 누르면 펼처지오', now: '옆으로 밀어 책을 고르고, 누르면 펼쳐집니다' }) + '</p>' +
      '<div class="bk-flow" id="bkFlow"></div><p class="bk-cap" id="bkCap"></p>';
    Flow($('#bkFlow'), BOOKS.map(function (w) {
      return '<div class="bk"><span class="bk-c"><img src="' + AD + w.cover + '.jpg" alt="' + esc(w.title.old) + ' 표지" onerror="this.parentNode.classList.add(\'noimg\');this.remove()"><em>' + esc(w.title.old) + '</em></span>' + (w.aside ? '<i class="bk-tag">사건 겨테 섯던 작가</i>' : '') + '</div>';
    }), { pull: '가운데 책을 아래로 끌어 펼치시압', onPick: function (i) { openBook(i); },
      onChange: function (i) { var w = BOOKS[i]; $('#bkCap').innerHTML = '<b>' + T(w.title) + '</b><small>' + T(w.maker || w.genre) + ' · ' + w.year + '</small>'; } });
  }
  function openBook(i) {
    var w = BOOKS[i]; if (!w) return;
    var cs = w.case && F.cases[w.case];
    $('#bkHead').innerHTML = T(w.title);
    var b = $('#bkBody');
    b.innerHTML = '<div class="rd">' +
      '<figure class="rd-cover"><button type="button" data-zoom="' + AD + w.cover + '.jpg" data-cap="' + esc(w.title.old) + (w.credit ? ' · ' + esc(w.credit) : '') + '"><img src="' + AD + w.cover + '.jpg" alt="' + esc(w.title.old) + ' 표지"></button>' +
        (w.coverNote ? '<figcaption>' + T(w.coverNote) + '</figcaption>' : '') + '</figure>' +
      '<p class="rd-meta">' + meta(w) + (w.verify ? ' <span class="vf">다른 문헌에 의함</span>' : '') + '</p>' +
      '<h3 class="rd-t">' + T(w.title) + '</h3>' +
      (w.quote ? '<blockquote class="rd-q"><p>「' + T(w.quote) + '」</p><cite>— ' + T(w.quote.src) + '</cite></blockquote>' : '') +
      (w.plot ? '<h4>' + (w.brief ? '소개' : '줄거리') + '</h4><p class="rd-p">' + T(w.plot) + '</p>' : '') +
      (w.note ? '<p class="rd-note">' + T(w.note) + '</p>' : '') +
      (cs && cs.story && !w.aside ? '<div class="rd-case"><h4>' + T({ old: '이 작품이 그린 사건', now: '이 작품이 그린 사건' }) + '</h4><b>' + T(cs) + '</b><p>' + T(cs.story) + '</p><a href="' + esc(C.caseLink(w.case)) + '">' + T({ old: '그 사건의 지면으로', now: '그 사건 기사로' }) + ' →</a></div>' : '') +
      (w.lastpage ? '<button type="button" class="mb-btn rd-turn" id="rdTurn">' + T({ old: '마지막 장을 넘기시압', now: '마지막 장 넘기기' }) + '</button>' +
        '<div class="rd-last" id="rdLast"><p class="lk">마지막 장 · 쓴 사람에게 그 뒤 생긴 일</p>' + w.lastpage.lines.map(function (p, k) { return '<p class="ll" style="--d:' + (0.4 + k * 1.3) + 's">' + T(p) + '</p>'; }).join('') + '<p class="ls">' + T(w.lastpage.src) + '</p></div>' : '') +
      '<div class="rd-nav"><button type="button" data-bk="' + ((i - 1 + BOOKS.length) % BOOKS.length) + '">← 앞 책</button><button type="button" data-bk="' + ((i + 1) % BOOKS.length) + '">다음 책 →</button></div>' +
    '</div>';
    b.scrollTop = 0;
    var t = $('#rdTurn'); if (t) t.onclick = function () { $('#rdLast').classList.add('on'); t.hidden = true; if (W.mb.sfx) W.mb.sfx('whoosh'); setTimeout(function () { $('#rdLast').scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 80); };
    $$('[data-bk]', b).forEach(function (x) { x.onclick = function () { openBook(+x.dataset.bk); }; });
    if (!$('#shBook').classList.contains('on')) W.mb.open('shBook');
  }

  /* ── 창가관 · 류성긔 ── */
  var PH = {};
  function spUri(s) { var m = String(s || '').match(/track\/([A-Za-z0-9]+)/); return m ? 'https://open.spotify.com/track/' + m[1] : ''; }
  function roomPhono(body, h, list) {
    var L = list;
    body.innerHTML = head(h, 'mj-room-music.jpg') +
      '<div class="ph">' +
        '<div class="ph-gram"><img src="' + AD + 'mj-gramophone.png" alt="축음기 (재현 그림)"><i class="ph-disc" id="phDisc"><i class="ph-lbl" id="phLbl"></i></i><span class="rt">그림 · 재현</span><p class="ph-lyric" id="phLyric"></p></div>' +
        '<p class="hx-hint">' + T({ old: '판을 골라 누르면 바늘이 나리오', now: '음반을 골라 누르면 재생됩니다' }) + '</p>' +
        '<div class="ph-flow" id="phFlow"></div>' +
        '<div class="ph-time"><i class="ln"></i>' + F.timeline.map(function (t) { return '<span style="left:' + ((t.y - 1924) / 18 * 100) + '%"><b>' + t.y + '</b><small>' + T(t.t) + '</small></span>'; }).join('') + '<em id="phMark"></em></div>' +
        '<div class="ph-panel" id="phPanel"></div>' +
      '</div>';
    var disc = $('#phDisc'), on = false, au = null, lt = 0, li = 0, cur = -1;
    PH.au = null;
    function setPlay(v) {
      on = v; disc.classList.toggle('spin', v); var b = $('#phPlay'); if (b) b.innerHTML = v ? '❚❚ 멈춤' : '▶ 판 걸기';
      $('#phLyric').classList.toggle('on', v);
      clearInterval(lt);
      var w = L[cur];
      if (v && w) {
        if (w.lyrics) { li = 0; showLyric(w); lt = setInterval(function () { li = (li + 1) % w.lyrics.length; showLyric(w); }, 4800); }
        $$('#phPanel .st').forEach(function (p, k) { setTimeout(function () { if (on) p.classList.add('on'); }, 600 + k * 4200); });
      }
    }
    function showLyric(w) { var e = $('#phLyric'); e.classList.remove('in'); void e.offsetWidth; e.innerHTML = T(w.lyrics[li]); e.classList.add('in'); }
    PH.stop = function () { setPlay(false); };
    function srcs(w) { var a = []; if (w.audio) a.push(AD + w.audio + '.mp3'); if (w.preview) a = a.concat(Array.isArray(w.preview) ? w.preview : [w.preview]); return a; }
    function play() {
      var w = L[cur], S = srcs(w), k = 0;
      if (!S.length) { setPlay(false); return; }
      if (au) au.pause();
      au = PH.au = new Audio(); au.preload = 'auto';
      au.onerror = function () { if (k < S.length) { au.src = S[k++]; au.play().catch(function () {}); } else { setPlay(false); $('#phMsg').innerHTML = T({ old: '이 판은 여긔서 소리가 나지 안소 — 아래 단추로 드르시압', now: '여기서는 재생되지 않습니다 — 아래 링크로 들어 보세요' }); } };
      au.onended = function () { setPlay(false); };
      au.src = S[k++]; var p = au.play(); if (p && p.catch) p.catch(function () {});
      try { W.dispatchEvent(new CustomEvent('mb:audio')); } catch (e) {}
      setPlay(true);
    }
    function pick(i) {
      if (cur === i) return; if (au) { au.pause(); } setPlay(false); cur = i; var w = L[i];
      $('#phLbl').innerHTML = '<b>' + esc(w.title.old) + '</b><small>' + w.year + '</small>';
      $('#phMark').style.left = Math.max(0, Math.min(100, (w.year - 1924) / 18 * 100)) + '%'; $('#phMark').textContent = w.year < 1924 ? '◀ ' + w.year : w.year;
      var S = srcs(w), sp = spUri(w.spotify), alb = w.albumNo ? C.spotifyAlbum : '';
      var cs = w.case && F.cases[w.case];
      $('#phPanel').innerHTML =
        '<p class="pp-meta">' + meta(w) + (w.verify ? ' <span class="vf">다른 문헌에 의함</span>' : '') + '</p>' +
        '<h3>' + T(w.title) + '</h3>' +
        (w.lyric && !w.lyrics ? '<p class="pp-lyric">「' + T(w.lyric) + '」</p>' : '') +
        '<div class="pp-act">' + (S.length ? '<button type="button" class="mb-btn" id="phPlay">▶ 판 걸기</button>' : '') +
          (sp ? '<a class="mb-btn ghost" href="' + sp + '" target="_blank" rel="noopener">스포티파이에서 듣기 ↗</a>' : alb ? '<a class="mb-btn ghost" href="' + alb + '" target="_blank" rel="noopener">스포티파이 「유성기로 듣던 가요사」 ' + w.albumNo + '번 곡 ↗</a>' : '') + '</div>' +
        '<p class="pp-msg" id="phMsg">' + (w.source ? T(w.source) : '') + '</p>' +
        (w.plot ? '<p class="pp-plot">' + T(w.plot) + '</p>' : '') +
        (w.story ? '<div class="pp-story"><h4>' + T({ old: '판이 도는 동안', now: '판이 도는 동안' }) + '</h4>' + w.story.map(function (p) { return '<p class="st">' + T(p) + '</p>'; }).join('') + '</div>' : '') +
        (w.notes ? '<dl class="pp-notes">' + w.notes.map(function (n) { return '<div><dt>' + T(n.k) + '</dt><dd>' + T(n.v) + (n.verify ? ' <span class="vf">乙</span>' : '') + '</dd></div>'; }).join('') + '</dl>' : '') +
        (w.perf ? '<p class="pp-perf"><b>' + T(w.perf) + '</b> · ' + T(w.perfSrc) + '</p>' : '') +
        (w.bside ? '<button type="button" class="mb-btn ghost" id="phFlip">' + T({ old: '판을 뒤집으시압 — B면', now: '판 뒤집기 — B면' }) + '</button><div class="pp-b" id="phB"><p class="bk">B면 · 노래 업는 면</p>' + w.bside.lines.map(function (p, k) { return '<p class="bl" style="--d:' + (0.4 + k * 1.3) + 's">' + T(p) + '</p>'; }).join('') + '<p class="bs">' + T(w.bside.src) + '</p></div>' : '') +
        (cs ? '<p class="pp-case"><b>' + T({ old: '사건', now: '사건' }) + '</b> ' + T(cs) + ' · <a href="' + esc(C.caseLink(w.case)) + '">지면으로 →</a></p>' : '');
      $$('#phPanel .st').forEach(function (p) { p.classList.add('wait'); });
      var pb = $('#phPlay'); if (pb) pb.onclick = function () { if (on) { au && au.pause(); setPlay(false); } else play(); };
      var fb = $('#phFlip'); if (fb) fb.onclick = function () { disc.classList.add('flip'); setTimeout(function () { disc.classList.remove('flip'); }, 900); $('#phB').classList.toggle('on'); };
      if (!S.length) $$('#phPanel .st').forEach(function (p) { p.classList.add('on'); });
    }
    var FL = Flow($('#phFlow'), L.map(function (w) { return '<div class="slv' + (w.still ? ' still' : '') + '"><i class="rec"><b>' + esc(w.title.old) + '<small>' + w.year + '</small></b></i><span>' + T(w.title) + '</span></div>'; }),
      { pull: '판을 아래로 끌어 축음긔에 거시압', onChange: function (i) { pick(i); }, onPick: function (i) { pick(i); if ($('#phPlay')) play(); $('.ph-gram', body).scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
    disc.addEventListener('click', function () { if (cur < 0) return; if (on) { au && au.pause(); setPlay(false); } else play(); });
    pick(0);
  }

  /* ── 무대관 · 영사긔 · 조명 · 텔레비 ── */
  function vidOf(t) {
    if (!t) return null;
    var v = String(t.url || t.yt || '').trim(), m; if (!v) return null;
    if (/\.(mp4|webm|m4v)(\?|$)/i.test(v)) return { type: 'file', src: v, watch: v };
    m = v.match(/(?:youtu\.be\/|v=|embed\/|shorts\/)([\w-]{11})/); var id = m ? m[1] : (/^[\w-]{11}$/.test(v) ? v : ''); if (!id) return null;
    var more = (t.list || []).map(function (x) { var mm = String(x).match(/([\w-]{11})$/); return mm ? mm[1] : ''; }).filter(Boolean);
    return { type: 'yt', src: 'https://www.youtube-nocookie.com/embed/' + id + '?autoplay=1&rel=0&playsinline=1&modestbranding=1' + (more.length ? '&playlist=' + more.join(',') : ''), watch: 'https://www.youtube.com/watch?v=' + id };
  }
  var KW = { '예고편': { old: '예고편을 트시오', now: '예고편 보기' }, '장면': { old: '한 장면을 트시오', now: '장면 보기' }, '무대': { old: '무대를 트시오', now: '무대 영상 보기' }, '줄거리': { old: '줄거리 차례로 트시오', now: '줄거리 따라 보기' } };
  function roomMedia(body, h, list) {
    var KINDS = [
      { id: 'film', img: 'mj-projector', name: { old: '활동사진', now: '영화' }, verb: { old: '영사긔', now: '영사기' }, test: function (w) { return /영화/.test(w.genre.now); } },
      { id: 'stage', img: 'mj-spotlight', name: { old: '연극 · 가극', now: '연극 · 뮤지컬' }, verb: { old: '조명', now: '조명' }, test: function (w) { return /뮤지컬|연극|공연/.test(w.genre.now); } },
      { id: 'tv', img: 'mj-tv', name: { old: '방송 · 연속극', now: '방송 · 드라마' }, verb: { old: '텔레비', now: '텔레비전' }, test: function (w) { return /드라마|방송|보도/.test(w.genre.now); } }
    ];
    KINDS.forEach(function (k) { k.list = list.filter(k.test).sort(function (a, b) { return ((b.top ? 1 : 0) - (a.top ? 1 : 0)) || (a.year - b.year); }); });
    body.innerHTML = head(h, 'mj-room-stage.jpg') +
      '<div class="tv" id="tv" data-on="">' +
        '<div class="tv-scr" id="tvScr"><i class="cur l"></i><i class="cur r"></i><div class="tv-pic" id="tvPic"></div><p class="tv-idle">' + T({ old: '아래 긔계 하나를 눌러 불을 켜시오', now: '아래 기계 하나를 눌러 불을 켜세요' }) + '</p><i class="tv-grain"></i></div>' +
        '<div class="tv-devs">' + KINDS.map(function (k, i) {
          return '<button type="button" class="tv-dev" data-k="' + i + '"><span class="im"><img src="' + AD + k.img + '.jpg" alt="' + esc(k.verb.old) + ' (재현 그림)" loading="lazy"></span><b>' + T(k.verb) + '</b><small>' + T(k.name) + ' · ' + k.list.length + '</small></button>';
        }).join('') + '</div>' +
        '<ol class="tv-list" id="tvList"></ol>' +
        '<div class="tv-cap" id="tvCap"></div>' +
        '<div class="tv-osmu" id="tvOsmu"></div>' +
      '</div>';
    var curK = -1;
    function device(i) {
      curK = i; var k = KINDS[i];
      $('#tv').dataset.on = k.id;
      $$('.tv-dev', body).forEach(function (d, j) { d.classList.toggle('on', j === i); });
      $('#tvList').innerHTML = k.list.map(function (w, j) { return '<li><button type="button" data-j="' + j + '"><span class="y">' + w.year + '</span><span class="t">' + T(w.title) + '</span><span class="g">' + T(w.genre) + '</span>' + (vidOf(w.trailer) ? '<i>▶</i>' : '') + '</button></li>'; }).join('');
      tone('tick'); show(0);
    }
    function show(j) {
      var k = KINDS[curK], w = k.list[j]; if (!w) return;
      $$('#tvList button').forEach(function (b, x) { b.classList.toggle('on', x === j); });
      var scr = $('#tvScr'), pic = $('#tvPic'), vid = vidOf(w.trailer);
      scr.classList.remove('lit', 'out', 'playing'); void scr.offsetWidth; scr.classList.add('cut');
      setTimeout(function () {
        scr.classList.remove('cut'); scr.classList.add('lit');
        pic.innerHTML = '<div class="tv-title"><small>' + T(w.genre) + '</small><b>' + T(w.title) + '</b><em>' + w.year + '</em>' +
          (vid ? '<button type="button" class="tv-play" id="tvPlay"><i></i>' + T(KW[w.trailer.kind] || KW['예고편']) + '</button>'
               : (w.link ? '<a class="tv-play find" href="' + esc(w.link) + '" target="_blank" rel="noopener">' + T({ old: '차저보시오 ↗', now: '찾아보기 ↗' }) + '</a>' : '')) + '</div>';
        var pb = $('#tvPlay');
        if (pb) pb.onclick = function () {
          scr.classList.add('playing');
          if (vid.type === 'file') pic.innerHTML = '<video src="' + esc(vid.src) + '" controls autoplay playsinline' + (w.stagefilm ? ' loop' : '') + '></video>';
          else pic.innerHTML = '<iframe src="' + esc(vid.src) + '" title="' + esc(w.title.old) + '" allow="autoplay; encrypted-media; picture-in-picture; fullscreen" allowfullscreen referrerpolicy="strict-origin-when-cross-origin"></iframe>';
          try { W.dispatchEvent(new CustomEvent('mb:audio')); } catch (e) {}
        };
      }, REDUCED ? 0 : 520);
      var af = w.case && F.afterimage ? F.afterimage[w.case] : null;
      $('#tvCap').innerHTML = '<p class="c-meta">' + meta(w) + (w.verify ? ' <span class="vf">다른 문헌에 의함</span>' : '') + '</p><h3>' + T(w.title) + '</h3>' +
        (w.note ? '<p class="c-note">' + T(w.note) + '</p>' : '') + (w.plot && !w.note ? '<p class="c-note">' + T(w.plot) + '</p>' : '') +
        (w.perf ? '<p class="c-perf"><b>' + T(w.perf) + '</b><small>' + T(w.perfSrc) + '</small></p>' : '') +
        (vid ? '<p class="c-by">영상 · ' + T(w.trailer.by) + (vid.type === 'yt' ? ' · <a href="' + esc(vid.watch) + '" target="_blank" rel="noopener">유튜브에서 보기 ↗</a>' : '') + '</p>' : '') +
        (w.link && vid ? '<p class="c-by"><a href="' + esc(w.link) + '" target="_blank" rel="noopener">' + T({ old: '차저보시오 ↗', now: '찾아보기 ↗' }) + '</a></p>' : '') +
        (af ? '<button type="button" class="mb-btn ghost" id="tvOff">' + T({ old: '불을 끄시오', now: '불 끄기' }) + '</button><div class="tv-after" id="tvAfter">' + af.lines.map(function (p, x) { return '<p style="--d:' + (0.6 + x * 1.6) + 's">' + T(p) + '</p>'; }).join('') + '<small>' + T(af.src) + '</small></div>' : '');
      var off = $('#tvOff'); if (off) off.onclick = function () { $('#tvPic').innerHTML = ''; scr.classList.remove('lit', 'playing'); scr.classList.add('out'); $('#tvAfter').classList.add('on'); off.hidden = true; tone('tick'); };
      osmu(w.case);
    }
    function osmu(cid) {
      var o = cid && F.osmu ? F.osmu[cid] : null, el = $('#tvOsmu'); if (!o) { el.innerHTML = ''; return; }
      var ws = F.works.filter(function (w) { return w.case === cid && w.hall !== 'archive' && w.hall !== 'art'; }).sort(function (a, b) { return a.year - b.year; });
      el.innerHTML = '<h4>' + T({ old: '한 사건이 거러온 길', now: '한 사건이 걸어온 길' }) + '</h4>' +
        '<ol class="os-line"><li class="root"><span class="y">' + o.year + '</span><b>' + T(F.cases[cid] || { old: '사건', now: '사건' }) + '</b><small>그날의 지면</small></li>' +
        ws.map(function (w) { return '<li><span class="y">' + w.year + '</span><b>' + T(w.title) + '</b><small>' + T(w.genre) + '</small></li>'; }).join('') +
        '<li class="next"><span class="y">다음</span><b>' + o.next.map(T).join('<br>') + '</b><small>경성야록 기획안 — 실제로 나온 작품이 아니오</small></li></ol>';
    }
    $('.tv-devs', body).addEventListener('click', function (e) { var d = e.target.closest('.tv-dev'); if (d) device(+d.dataset.k); });
    $('#tvList').addEventListener('click', function (e) { var b = e.target.closest('button[data-j]'); if (b) { show(+b.dataset.j); $('#tvScr').scrollIntoView({ behavior: 'smooth', block: 'start' }); } });
  }

  /* ════ 안내소 ════ */
  function openInfo() {
    var I = F.info, tabs = [{ id: 'num', t: '숫자로' }, { id: 'tk', t: '입장권' }, { id: 'nt', t: '안내문' }, { id: 'gl', t: '자료' }];
    $('#ifTabs').innerHTML = tabs.map(function (t, i) { return '<button type="button" data-t="' + t.id + '" class="' + (i ? '' : 'on') + '">' + t.t + '</button>'; }).join('');
    var body = $('#ifBody');
    body.innerHTML =
      '<section class="if-p" data-p="num"><ul class="if-facts">' + I.facts.map(function (f) { return '<li class="mb-rv in"><b>' + f.num + '<small>' + T(f.unit) + '</small></b><span>' + T(f.label) + '</span></li>'; }).join('') + '</ul>' +
        '<div class="if-text">' + I.text.map(function (p) { return '<p>' + T(p) + '</p>'; }).join('') + '</div>' +
        '<button type="button" class="if-pic" data-zoom="' + AD + 'ex-photo-site.jpg" data-cap="회장 실사 전경 · 一九二九"><img src="' + AD + 'ex-photo-site.jpg" alt="1929년 조선박람회 회장 전경 (실물 사진)" loading="lazy"><span>회장 실사 전경 · 一九二九</span></button></section>' +
      '<section class="if-p" data-p="tk" hidden><div class="if-tks">' + I.tickets.map(function (t) {
          return '<button type="button" class="if-tk" data-zoom="' + AD + t.img + '" data-cap="' + esc(t.name.old) + ' · ' + esc(t.price.old) + '"><img src="' + AD + t.img + '" alt="' + esc(t.name.old) + ' (실물)" loading="lazy"><b>' + T(t.name) + '</b><em>' + T(t.price) + '</em><small>' + T(t.note) + '</small></button>';
        }).join('') + '</div>' +
        '<h4>當時 入場料</h4><dl class="if-fee">' + I.fee.map(function (f) { return '<div><dt>' + T(f.who) + '</dt><dd>' + T(f.price) + '</dd></div>'; }).join('') + '</dl></section>' +
      '<section class="if-p" data-p="nt" hidden><p class="if-k">옛 안내문의 동그라미를 누르면 — 그 단락의 오늘말 풀이가 나오오.</p>' +
        '<div class="if-nt"><img src="' + AD + 'ex-notice.png" alt="1929년 조선박람회 안내문 (실물)">' + I.notice.map(function (n, i) { return '<button type="button" class="nt" style="left:' + n.x + '%;top:' + n.y + '%" data-n="' + i + '">' + (i + 1) + '</button>'; }).join('') + '</div>' +
        '<div class="if-ntx" id="ifNtx"><p class="if-k">번호를 누르시압.</p></div></section>' +
      '<section class="if-p" data-p="gl" hidden><div class="if-gl">' + I.gallery.map(function (g) {
          return '<button type="button" data-zoom="' + AD + g.img + '" data-cap="' + esc(g.t.old) + ' — ' + esc(g.c.old) + '"><img src="' + AD + g.img + '" alt="' + esc(g.t.old) + ' (실물)" loading="lazy"><b>' + T(g.t) + '</b><small>' + T(g.c) + '</small></button>';
        }).join('') + '</div><p class="if-src">' + T(I.src) + '</p></section>';
    $('#ifTabs').onclick = function (e) {
      var b = e.target.closest('button[data-t]'); if (!b) return;
      $$('#ifTabs button').forEach(function (x) { x.classList.toggle('on', x === b); });
      $$('.if-p', body).forEach(function (p) { p.hidden = p.dataset.p !== b.dataset.t; }); body.scrollTop = 0;
    };
    $$('.nt', body).forEach(function (b) {
      b.onclick = function () {
        var n = I.notice[+b.dataset.n]; $$('.nt', body).forEach(function (x) { x.classList.toggle('on', x === b); });
        $('#ifNtx').innerHTML = '<p class="nt-t"><b>' + (+b.dataset.n + 1) + '</b>' + esc(n.t) + '</p><p>' + esc(n.b) + '</p>'; tone('tick');
      };
    });
    body.scrollTop = 0; W.mb.open('shInfo'); stamp('info');
  }

  paintPass();
})(window, document);
