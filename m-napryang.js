/* 경성야록 납량란 폰판 — 촛불 여섯 · 봉투 여섯 · 일곱째 초 · 호외 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var tone = function (k) { if (W.mb && W.mb.tone) W.mb.tone(k); };
  var sfx = function (k) { if (W.mb && W.mb.sfx) W.mb.sfx(k); };
  var A = function () { return (W.mb && W.mb.audio) || { drone: function () {}, heart: function () {} }; };
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var calm = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var esc = function (s) { return String(s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var NUM = ['', '일', '이', '삼', '사', '오', '륙', '칠', '팔', '구'];
  function kn(n) { if (!n) return '영'; var s = ''; if (n >= 100) { s += (n >= 200 ? NUM[Math.floor(n / 100)] : '') + '백'; n %= 100; } if (n >= 10) { var t = Math.floor(n / 10); s += (t > 1 ? NUM[t] : '') + '십'; n %= 10; } return s + (n ? NUM[n] : ''); }
  var HAN = ['', '일', '이', '삼', '사', '오', '륙'];
  var T_IN = Date.now(), ORDER = [];

  /* ── 남은 초 ── */
  var row = $('#cbRow');
  row.innerHTML = [1, 2, 3, 4, 5, 6].map(function (n) { return '<a href="#ep' + n + '" data-n="' + n + '" aria-label="제' + n + '화"><i></i></a>'; }).join('') + '<a class="seven" data-n="7" aria-hidden="true"><i></i></a>';
  var out = {};
  function paintBar() { var n = 6 - Object.keys(out).filter(function (k) { return k < 7; }).length; $('#cbN').textContent = n; $$('a', row).forEach(function (a) { a.classList.toggle('out', !!out[a.dataset.n]); }); }
  row.addEventListener('click', function (e) { var a = e.target.closest('a[href]'); if (!a) return; e.preventDefault(); var t = $(a.getAttribute('href')); if (t) W.scrollTo({ top: t.getBoundingClientRect().top + W.scrollY - 92, behavior: 'smooth' }); });

  /* ── 대문 — 촛불 여섯을 하나씩 켬 ── */
  var FL = [[20.35, 30, 3.3, 15], [30.85, 30, 3.3, 15], [38.85, 30, 3.3, 15], [47.35, 30, 3.3, 15], [56.35, 30, 3.3, 15], [66.85, 30, 3.3, 15]];
  $('#gtFl').innerHTML = FL.map(function (f, i) { return '<i style="left:' + (f[0] + f[2] / 2) + '%;top:' + f[1] + '%;height:' + f[3] + '%;animation-delay:' + (-i * .37) + 's"></i>'; }).join('');
  var lit = false;
  function lightUp(go) {
    if (lit) { if (go) goPro(); return; } lit = true;
    $$('#gtFl i').forEach(function (f, i) { setTimeout(function () { f.classList.add('on'); tone('tick'); }, calm ? 0 : 280 + i * 260); });
    setTimeout(function () { D.body.classList.add('lit'); A().drone(true); if (go) goPro(); }, calm ? 0 : 2100);
  }
  function goPro() { var p = $('#pro'); W.scrollTo({ top: p.getBoundingClientRect().top + W.scrollY - 92, behavior: 'smooth' }); }
  $('#gtGo').onclick = function () { lightUp(true); };
  W.addEventListener('scroll', function () { if (!lit && W.scrollY > W.innerHeight * .5) lightUp(false); }, { passive: true });

  /* ── 차례로 나타나기 ── */
  if ('IntersectionObserver' in W) {
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { rootMargin: '0px 0px -12% 0px' });
    $$('.rv').forEach(function (el, i) { el.style.transitionDelay = ((i % 3) * .25) + 's'; io.observe(el); });
  } else $$('.rv').forEach(function (el) { el.classList.add('in'); });

  /* ── 초 끄기 — 꾹 눌러 후 ── */
  function ready(n) { var b = $('#ep' + n + ' .blow'); if (b && !b.classList.contains('done')) { b.disabled = false; b.classList.add('ready'); } }
  $$('.blow').forEach(function (b) {
    var ep = b.closest('.ep'), n = +ep.dataset.n, t0 = 0, raf = 0;
    function prog() { var p = Math.min(1, (performance.now() - t0) / 900); b.style.setProperty('--p', p.toFixed(3)); if (p >= 1) { snuff(); return; } raf = requestAnimationFrame(prog); }
    function down(e) { if (b.disabled || b.classList.contains('done')) return; e.preventDefault(); t0 = performance.now(); b.classList.add('hold'); raf = requestAnimationFrame(prog); buzz(8); }
    function up() { cancelAnimationFrame(raf); b.classList.remove('hold'); if (!b.classList.contains('done')) b.style.setProperty('--p', 0); }
    b.addEventListener('pointerdown', down); b.addEventListener('pointerup', up); b.addEventListener('pointerleave', up); b.addEventListener('pointercancel', up);
    b.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    function snuff() {
      cancelAnimationFrame(raf); b.classList.remove('hold'); b.classList.add('done'); b.disabled = true;
      out[n] = 1; ORDER.push(n); paintBar(); ep.classList.add('out'); sfx('whoosh'); buzz(30);
      var a = $('#cbRow a[data-n="' + n + '"]'); if (a) { a.classList.add('puff'); setTimeout(function () { a.classList.remove('puff'); }, 1600); }
      if (ep.classList.contains('quiet')) { var m = $('#mute'); m.classList.add('on'); A().drone(false); setTimeout(function () { m.classList.remove('on'); if (D.body.classList.contains('lit')) A().drone(true); after(); }, calm ? 800 : 5200); }
      else after();
      function after() {
        if (Object.keys(out).length >= 6) { setTimeout(showEnd, 900); return; }
        var nx = [1, 2, 3, 4, 5, 6].filter(function (k) { return !out[k]; })[0], t = $('#ep' + nx);
        if (t && nx > n) setTimeout(function () { W.scrollTo({ top: t.getBoundingClientRect().top + W.scrollY - 92, behavior: 'smooth' }); }, 900);
      }
    }
  });

  /* ── 원문 서랍 ── */
  var SRC = {
    1: { date: '동아일보 1926년 8월 13일 · 5면', ot: '참살된 소녀의 무덤에 두 청년의 유령', vs: '제목 · 부제 · 첫머리 한 줄 · 사진 확인', mt: '살해된 소녀의 무덤에 나타난 두 청년의 유령', re: '사진 옆 글 가운데 「그 무덤 우에 서 잇는 것은 누구인가」는 편집국이 쓴 문장이오. 현상실 그림은 재현이오.' },
    2: { date: '동아일보 1932년 11월 6일 · 7면 5단', url: 'https://db.history.go.kr/id/npda_1932_11_06_v0007_1220', ot: '鬼神 파는 挾雜輩들 四名一團遂就縛', os: '현금 一천여 원을 협잡한 자 東大門署員에게', mt: '귀신 파는 사기꾼들 — 네 명 한 패, 마침내 붙잡히다', ms: '현금 천여 원을 가로챈 이들, 동대문서 경찰에게', pg: { src: 'assets/np/p1932.jpg', box: 'left:14.35%;top:32.64%;width:14.35%;height:20.73%' }, re: '「귀신 파오」 벽보는 지어낸 것이오. 네 그림자는 재현 그림이오. 무엇을 귀신이라 하야 팔앗는지는 본문을 닑어야 알 수 잇소.' },
    3: { date: '동아일보 1927년 12월 23일 · 3면 5단', url: 'https://db.history.go.kr/id/npda_1927_12_23_v0003_0520', ot: '傳說의 朝鮮(六六) 怪異한 甑峰山', mt: '전설의 조선 (66) — 괴이한 증봉산', re: '사건 보도가 아니라 연재 전설이오. 산에 얽힌 이약이의 내용은 한 줄도 쓰지 안앗소. 사당의 불은 연출이오.' },
    4: { date: '동아일보 1924년 11월 18일 · 2면 5단', url: 'https://db.history.go.kr/id/npda_1924_11_18_v0002_0370', ot: '疑雲重疊의 怪事件, 怪夫婦一訪後主婦 卒倒', os: '현금과 뎌금 통장도 간곳업고 뎐화통 잡은채 죽은듯 말업서, 道立師範校長 佐佐氏 邸의 幻劇', mt: '의혹이 겹겹이 쌓인 괴사건 — 수상한 부부가 한 번 다녀간 뒤 주부가 쓰러지다', ms: '현금과 저금 통장도 간 곳 없고, 전화기를 쥔 채 죽은 듯 말이 없어 — 도립사범학교 교장 사사 씨 집의 환극(幻劇)', pg: { src: 'assets/np/p1924.jpg', box: 'left:55.04%;top:34.51%;width:16.86%;height:18.01%' }, pgc: '이날 2면에는 1909년 대한민보 지면을 제호째 다시 실은 자료가 함께 잇소.', re: '방 안의 글은 모다 제목·부제를 나눈 것이오. 신발·방·전화 그림과 전화벨은 편집국의 연출이오. 「누구에게 뎐화를 걸녀 하엿나」는 질문일 뿐 사실이 아니오.' },
    5: { date: '동아일보 1932년 11월 11일 · 2면 5단', url: 'https://db.history.go.kr/id/npda_1932_11_11_v0002_0200', ot: '奇怪! 殺人强盜嫌疑者 取調進行中 啞者로 突變', mt: '기괴! 살인강도 혐의자, 조사 도중 말을 못 하게 되다', re: '취조 긔록의 문답은 무르면 「……」만 돌아오도록 편집국이 꾸민 장면이오. 실제 조사 내용이 아니오.' },
    6: { date: '동아일보 1938년 12월 11일 · 4면 9단', url: 'https://db.history.go.kr/id/npda_1938_12_11_w0004_0540', ot: '平原線鐵路 우에 怪屍體橫在', mt: '평원선 철길 위에 수상한 시신이 놓여 있다', re: '철길 그림에는 사람을 그리지 안앗소. 신원·경위는 제목에 업서 쓰지 안앗소.' }
  };
  $$('.src-b').forEach(function (b) {
    b.onclick = function () {
      var s = SRC[b.dataset.src];
      $('#srcHd').textContent = '봉투 제' + HAN[b.dataset.src] + '호 · ' + s.date;
      $('#srcBd').innerHTML = '<div class="rec"><p class="rl"><b>현대어 풀이</b><span>제목' + (s.os ? ' · 부제' : '') + '만 옮김</span></p><p class="mt">' + esc(s.mt) + (s.ms ? '<small>' + esc(s.ms) + '</small>' : '') + '</p>' +
        '<p class="rl"><b>원문 기록</b><span>' + esc(s.vs || ('제목 · ' + (s.os ? '부제 · ' : '') + '날짜 · 지면 확인')) + '</span></p><p class="ot">' + esc(s.ot) + '</p>' + (s.os ? '<p class="os">' + esc(s.os) + '</p>' : '') +
        (s.pg ? '<button type="button" class="pg" data-zoom="' + s.pg.src + '" data-cap="' + esc(s.date) + ' 지면 전체"><img src="' + s.pg.src + '" alt="' + esc(s.date) + ' 지면 전체"><i style="' + s.pg.box + '"></i></button><p class="pgc">붉은 테두리 — 이 긔사 자리' + (s.pgc ? ' · ' + esc(s.pgc) : '') + ' · 누르면 크게</p>' : '') +
        (s.url ? '<a class="lk" href="' + s.url + '" target="_blank" rel="noopener">한국사데이터베이스에서 원문 보기 ↗</a>' : '') +
        '<p class="rl"><b>편집국 재구성</b><span>원문 아님</span></p><p class="re">' + esc(s.re) + '</p></div>';
      W.mb.open('shSrc');
    };
  });

  /* ── 제1화 · 현상 ── */
  (function () {
    var dv = $('#dv'), ran = false;
    new IntersectionObserver(function (es, ob) { es.forEach(function (e) {
      if (!e.isIntersecting || ran) return; ran = true; ob.disconnect();
      setTimeout(function () { dv.classList.add('on'); A().heart(true); }, calm ? 0 : 400);
      setTimeout(function () { dv.classList.add('done'); A().heart(false); $('#dvH').textContent = '사진이 떠올랏소.'; tone('stamp'); }, calm ? 0 : 7800);
    }); }, { threshold: .5 }).observe(dv);
    $$('#vt .vt-o button').forEach(function (b) {
      b.onclick = function () {
        var box = $('#vt'); if (box.classList.contains('picked')) return;
        b.classList.add('chosen'); box.classList.add('picked'); tone('stamp'); buzz(40);
        $('#vtR').innerHTML = '<p class="t">본보 판정 — 보류</p><p>본보는 이것을 「진긔한 사실」이라 하야 실엇다.<br>그러나 그 연재의 나머지를, 본 야록은 아즉 다 닑지 못하얏다.</p><p class="me">당신의 도장 — ' + esc(b.dataset.o) + '</p>';
        setTimeout(function () { ready(1); }, 1200);
      };
    });
  })();

  /* ── 제2화 · 벽보 뜯기 — 귀퉁이를 끌어 ── */
  (function () {
    var bl = $('#bl'), f = $('.bl-f', bl), sx = 0, sy = 0, d = null, done = false;
    function peel(p) { f.style.setProperty('--pl', p.toFixed(3)); }
    function finish() { if (done) return; done = true; bl.classList.add('flip'); f.style.removeProperty('--pl'); tone('type'); buzz([10, 20, 40]); $('#blHow').textContent = '벽보 뒤에 — 진짜 지면이 붓허 잇섯소.'; setTimeout(function () { ready(2); }, 1500); }
    f.addEventListener('pointerdown', function (e) { if (done) return; d = { x: e.clientX, y: e.clientY }; f.setPointerCapture && f.setPointerCapture(e.pointerId); });
    f.addEventListener('pointermove', function (e) { if (!d) return; var dist = Math.hypot(e.clientX - d.x, e.clientY - d.y); peel(Math.min(1, dist / 180)); if (dist > 150) { d = null; finish(); } });
    function up() { if (!d) return; d = null; peel(0); }
    f.addEventListener('pointerup', function (e) { if (d && Math.hypot(e.clientX - d.x, e.clientY - d.y) < 8) { d = null; finish(); return; } up(); });
    f.addEventListener('pointercancel', up);
  })();

  /* ── 제3화 · 안개 걷기 ── */
  (function () {
    var fg = $('#fg'), cv = $('#fgCv'), cx = cv.getContext('2d'), mist = new Image(), w = 0, h = 0, cleared = 0, done = false, last = null, GX = 14, GY = 18, grid = [];
    mist.src = 'assets/np/g/v2_mist1.jpg';
    function paint() {
      var r = fg.getBoundingClientRect(); if (!r.width) return; var dp = Math.min(2, W.devicePixelRatio || 1);
      w = r.width; h = r.height; cv.width = w * dp; cv.height = h * dp; cx.setTransform(dp, 0, 0, dp, 0, 0);
      cx.globalCompositeOperation = 'source-over'; cx.fillStyle = 'rgba(205,205,200,.92)'; cx.fillRect(0, 0, w, h);
      if (mist.complete && mist.naturalWidth) { cx.globalAlpha = .85; var ir = mist.width / mist.height, sw = h * ir; cx.drawImage(mist, (w - sw) / 2, 0, sw, h); cx.globalAlpha = 1; }
      grid = []; cleared = 0;
    }
    mist.onload = paint; W.addEventListener('resize', function () { if (!done) paint(); }); setTimeout(paint, 200);
    function wipe(x, y) {
      cx.globalCompositeOperation = 'destination-out';
      var g = cx.createRadialGradient(x, y, 0, x, y, 46); g.addColorStop(0, 'rgba(0,0,0,.9)'); g.addColorStop(1, 'rgba(0,0,0,0)'); cx.fillStyle = g;
      var pts = last ? Math.max(1, Math.round(Math.hypot(x - last[0], y - last[1]) / 10)) : 1;
      for (var i = 1; i <= pts; i++) { var px = last ? last[0] + (x - last[0]) * i / pts : x, py = last ? last[1] + (y - last[1]) * i / pts : y; cx.beginPath(); cx.arc(px, py, 46, 0, 6.3); cx.fill(); var gx = Math.floor(px / w * GX), gy = Math.floor(py / h * GY); for (var a = -1; a <= 1; a++) for (var b2 = -1; b2 <= 1; b2++) { var k = (gy + a) * GX + gx + b2; if (gx + b2 >= 0 && gx + b2 < GX && gy + a >= 0 && gy + a < GY && !grid[k]) { grid[k] = 1; cleared++; } } }
      last = [x, y];
      if (cleared / (GX * GY) > .5 && !done) { done = true; fg.classList.add('clear'); cv.style.transition = 'opacity 2.4s ease'; cv.style.opacity = 0; tone('stamp'); $('#fgH').textContent = '산 우에 불이 하나.'; $$('#ep3 .after').forEach(function (p) { p.classList.add('in'); }); setTimeout(function () { ready(3); }, 1600); }
    }
    function pos(e) { var r = cv.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    cv.style.touchAction = 'none';
    cv.addEventListener('pointerdown', function (e) { if (done) return; e.preventDefault(); last = null; cv.setPointerCapture && cv.setPointerCapture(e.pointerId); wipe.apply(null, pos(e)); $('#fgH').classList.add('gone'); });
    cv.addEventListener('pointermove', function (e) { if (!last || done) return; wipe.apply(null, pos(e)); });
    cv.addEventListener('pointerup', function () { last = null; }); cv.addEventListener('pointercancel', function () { last = null; });
  })();

  /* ── 제4화 · 불 꺼진 방 — 손가락이 촛불, 방을 비추면 둘러봄 ── */
  (function () {
    var rm = $('#rm'), bg = $('#rmBg'), dark = $('#rmDark'), hs = $('#rmHs'), AR = 1384 / 791, found = {}, n = 0;
    var HS = [[24, 72, 1], [29.5, 24, 2], [74.5, 90, 3], [77, 22, 4]];
    hs.innerHTML = HS.map(function (p) { return '<i data-c="' + p[2] + '"></i>'; }).join('');
    var iw = 0, ih = 0, vw = 0, vh = 0, pan = 0;
    function lay() { vw = rm.clientWidth; vh = rm.clientHeight; ih = vh; iw = ih * AR; bg.style.width = iw + 'px'; bg.style.height = ih + 'px'; hs.style.width = iw + 'px'; hs.style.height = ih + 'px'; setPan(pan); }
    function setPan(p) { pan = Math.max(0, Math.min(1, p)); var x = -(iw - vw) * pan; bg.style.transform = hs.style.transform = 'translate3d(' + x.toFixed(1) + 'px,0,0)'; return x; }
    W.addEventListener('resize', lay); bg.onload = lay; setTimeout(lay, 100);
    function light(cx, cy) {
      var x = setPan(cx / vw); dark.style.setProperty('--x', cx + 'px'); dark.style.setProperty('--y', cy + 'px'); rm.classList.add('lit');
      var ixp = (cx - x) / iw * 100, iyp = cy / ih * 100;
      HS.forEach(function (p) {
        if (found[p[2]]) return; var dx = (ixp - p[0]) * iw / 100, dy = (iyp - p[1]) * ih / 100;
        if (Math.hypot(dx, dy) < 70) {
          found[p[2]] = 1; n++; $('#rmN').textContent = n + ' / 4'; tone('stamp'); buzz(25);
          $('#rmCl li[data-c="' + p[2] + '"]').classList.add('on'); $('#rmHs i[data-c="' + p[2] + '"]').classList.add('on');
          if (p[2] === 2) { buzz([200, 100, 200, 100, 200]); rm.classList.add('ring'); setTimeout(function () { rm.classList.remove('ring'); }, 2200); }
          if (n >= 4) { rm.classList.add('done'); $('#rmH').textContent = '방 안을 다 비추엇소.'; $('#done4').classList.add('in'); A().heart(false); setTimeout(function () { ready(4); }, 1400); }
        }
      });
    }
    function pos(e) { var r = rm.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; }
    var on = false;
    rm.style.touchAction = 'none';
    rm.addEventListener('pointerdown', function (e) { on = true; rm.setPointerCapture && rm.setPointerCapture(e.pointerId); light.apply(null, pos(e)); $('#rmH').classList.add('gone'); A().heart(true); });
    rm.addEventListener('pointermove', function (e) { if (on) light.apply(null, pos(e)); });
    function up() { on = false; rm.classList.remove('lit'); if (n < 4) A().heart(false); }
    rm.addEventListener('pointerup', up); rm.addEventListener('pointercancel', up);
  })();

  /* ── 제5화 · 취조 ── */
  (function () {
    var L = $('#iqL'), asked = 0, busy = false;
    function ask(q) {
      q = (q || '').trim(); if (!q || busy || asked >= 3) return; busy = true;
      var p = D.createElement('p'); p.className = 'me'; p.textContent = q; L.appendChild(p); tone('type');
      var a = D.createElement('p'); a.className = 'him'; L.appendChild(a); L.scrollTop = L.scrollHeight;
      var dots = 0, t = setInterval(function () { a.textContent = '·'.repeat(++dots % 4); }, 380);
      setTimeout(function () { clearInterval(t); a.textContent = '……'; asked++; busy = false; L.scrollTop = L.scrollHeight; A().heart(asked >= 2);
        if (asked >= 3) { setTimeout(function () { var s = D.createElement('p'); s.className = 'sys'; s.textContent = '혐의자는 — 끗내 한 마듸도 하지 안앗소.'; L.appendChild(s); L.scrollTop = L.scrollHeight; $('#done5').classList.add('in'); tone('gavel'); buzz([30, 50, 120]); A().heart(false); $('#iqF').hidden = true; $('#iqC').hidden = true; setTimeout(function () { ready(5); }, 1600); }, 900); }
      }, calm ? 200 : 2300);
    }
    $$('#iqC button').forEach(function (b) { b.onclick = function () { ask(b.textContent); b.disabled = true; }; });
    $('#iqF').addEventListener('submit', function (e) { e.preventDefault(); var i = $('#iqQ'); ask(i.value); i.value = ''; i.blur(); });
  })();

  /* ── 끗 · 일곱째 초 ── */
  var STORY = '', finaled = false;
  function showEnd() {
    var end = $('#end'); end.hidden = false; A().drone(false);
    setTimeout(function () { end.classList.add('on'); W.scrollTo({ top: end.getBoundingClientRect().top + W.scrollY - 92, behavior: 'smooth' }); }, 60);
    setTimeout(function () { $('#cbRow a.seven').classList.add('on'); sfx('bell'); buzz(60); end.classList.add('seven'); }, calm ? 0 : 4200);
  }
  $('#wgT').addEventListener('input', function () { $('#wgN').textContent = this.value.length; });
  $('#wgB').onclick = function () { STORY = $('#wgT').value.trim().slice(0, 40); if (!STORY) { $('#wgT').focus(); return; } finale(); };
  $('#wgSkip').onclick = function () { STORY = ''; finale(); };
  function finale() {
    if (finaled) return; finaled = true;
    var sv = $('#cbRow a.seven'); sv.classList.remove('on'); sv.classList.add('out', 'puff'); sfx('whoosh');
    D.body.classList.add('blackout');
    setTimeout(hxShow, calm ? 0 : 2000);
  }
  function report() {
    var now = new Date(), h = now.getHours(), m = now.getMinutes(), mins = Math.max(1, Math.round((Date.now() - T_IN) / 60000));
    var when = (h < 12 ? '오전 ' : '오후 ') + kn(h % 12 || 12) + ' 시 ' + (m ? kn(m) + ' 분' : '정각');
    var night = h >= 18 || h < 5, snd = !(W.mb && W.mb.muted && W.mb.muted());
    return {
      date: '소화 ' + kn(now.getFullYear() - 1925) + ' 년 ' + kn(now.getMonth() + 1) + ' 월 ' + kn(now.getDate()) + ' 일 · ' + when + ' 발행',
      h: '납량란 독자 한 명 행방불명',
      sub: '아모도 켜지 안은 일곱째 초가 꺼진 직후 — 마지막 목격지는 「이 화면 압」',
      tx: [
        '오늘 밤 ' + when + ', 경성야록 납량란을 닑던 독자 한 사람의 소식이 끈겻다.',
        '독자는 이 면에 약 ' + kn(mins) + ' 분 동안 머물럿다. 봉투는 ' + ORDER.map(function (n) { return '제' + HAN[n] + '호'; }).join(' → ') + ' 의 차례로 열엇고, 그때마다 초를 하나씩 껏다.',
        snd ? '소리를 켜 둔 채엿다. 마지막 초가 꺼질 때, 소리도 함께 끈겻다.' : '소리는 끄고 잇섯다. 그래서 — 등 뒤의 소리를 듯지 못하엿을 것이다.',
        '독자는 손바닥만 한 전화기를 들고 잇섯다' + (night ? '. 방 안은 어두웟다고 한다.' : '. 해가 아즉 지지 안앗는데도, 방 안은 어두웟다고 한다.'),
        STORY ? '독자가 마지막으로 투고함에 너은 원고는 이러케 시작한다 — 「' + STORY + '」' : '독자는 일곱째 원고지를 비워 둔 채, 일곱째 초를 껏다.',
        '독자를 마지막으로 본 사람은 — 이 기사를 닑고 잇는 이다.',
        '본보는 이 사람을 보신 이의 제보를 기다린다. 본보 심인계로.'
      ],
      cap: '독자의 마지막 모습 — 사진은 남지 안앗고, 화면에 비친 얼굴만 남앗다.'
    };
  }
  function type(el, text, speed, done) { var i = 0; el.textContent = ''; (function step() { if (i >= text.length) { if (done) done(); return; } el.textContent += text.charAt(i++); if (i % 3 === 0) tone('type'); setTimeout(step, calm ? 0 : speed + (text.charAt(i - 1) === '.' ? speed * 6 : 0)); })(); }
  function hxShow() {
    var hx = $('#hx'), r = report(); hx.hidden = false; D.documentElement.classList.add('mb-lock');
    requestAnimationFrame(function () { hx.classList.add('on'); });
    setTimeout(function () { buzz([400, 200, 400, 200, 400]); }, calm ? 0 : 1200);
    setTimeout(function () { type($('#hxCall'), '편집국에 전화가 왓소. 수화기 저편에서는 — 활자 박는 소리만 들리오.', 55); }, calm ? 0 : 1800);
    setTimeout(function () {
      $('#hxCall').classList.add('faded'); tone('stamp'); $('#hxDate').textContent = r.date; $('#hxSh').classList.add('on');
      setTimeout(function () { type($('#hxH'), r.h, 90, function () { type($('#hxSub'), r.sub, 35, function () {
        var tx = $('#hxTx'), k = 0;
        (function next() {
          if (k >= r.tx.length) { $('#hxCap').textContent = r.cap; $('#hxSh').classList.add('done'); return; }
          var line = r.tx[k++], p = D.createElement('p'); if (line.indexOf('마지막으로 본 사람은') > -1) p.className = 'you'; tx.appendChild(p);
          type(p, line, 28, function () { setTimeout(next, p.className ? 1400 : 350); });
        })();
      }); }); }, 700);
    }, calm ? 0 : 6400);
  }
  $('#hxRe').onclick = function () { try { sessionStorage.removeItem('yk-np'); } catch (e) {} location.href = location.pathname; };
})(window, document);
