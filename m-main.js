/* 경성야록 본지 폰판 — 제호의 날 · 면 고르기 · 색인 · 부록 칸 · 광고 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var tone = function (k) { if (W.mb && W.mb.tone) W.mb.tone(k); };
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var calm = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ── 제호의 날 — 구십 년 전 오늘 ── */
  var NUM = ['', '일', '이', '삼', '사', '오', '륙', '칠', '팔', '구'];
  function kn(n) { if (n === 0) return '영'; var s = ''; if (n >= 10) { var t = Math.floor(n / 10); s += (t > 1 ? NUM[t] : '') + '십'; n %= 10; } return s + (n ? NUM[n] : ''); }
  var MON = ['정월', '이월', '삼월', '사월', '오월', '륙월', '칠월', '팔월', '구월', '시월', '십일월', '십이월'];
  var DAY = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
  var HR = ['열두', '한', '두', '세', '네', '다섯', '여섯', '일곱', '여덟', '아홉', '열', '열한'];
  function paintDate() {
    var d = new Date(), y = d.getFullYear() - 90, old = new Date(y, d.getMonth(), d.getDate());
    $('#mmDate').textContent = '소화 ' + kn(y - 1925) + ' 년 ' + MON[d.getMonth()] + ' ' + kn(d.getDate()) + '일 ' + DAY[old.getDay()];
    $('#mmAgo').textContent = y + ' · 구십 년 전 오늘날';
    var h = d.getHours(), m = d.getMinutes();
    $('#mmNow').textContent = '지금은 ' + (h < 12 ? '오전 ' : '오후 ') + HR[h % 12] + ' 시 ' + (m ? kn(m) + ' 분' : '정각');
    /* 정간 — 소화 십일 년 팔월 이십구일부터 이듬해 륙월 이일까지 */
    var stop = old >= new Date(1936, 7, 29) && old <= new Date(1937, 5, 2);
    $('.mm-stop').hidden = !stop;
  }
  paintDate(); setInterval(paintDate, 30000);

  /* ── 면 고르기 — 고른 면의 긔사만 한데 모아 보여 줌 ── */
  (function () {
    var nav = $('#mmSecs'), out = $('#mmFiltered'), front = $('#mmFront');
    function ixOf(f) { var o = $('ol.mm-ix[data-ix="' + f + '"]'); if (!o) return ''; var k = o.cloneNode(true); k.hidden = false; return '<div class="mm-fix"><p class="mm-fix-h">' + f + '면 긔록 목록</p>' + k.outerHTML + '<p class="mm-ixkey">' + ($('.mm-ixkey') || { innerHTML: '' }).innerHTML + '</p></div>'; }
    nav.addEventListener('click', function (e) {
      var b = e.target.closest('button[data-f]'); if (!b) return;
      $$('button', nav).forEach(function (x) { x.classList.toggle('on', x === b); });
      var f = b.dataset.f;
      if (f === 'all') { out.hidden = true; out.innerHTML = ''; front.hidden = false; }
      else {
        var leads = $$('.mm-case', front).filter(function (c) { return c.dataset.tag === f; }).map(function (c) { var k = c.cloneNode(true), al = $('.mm-alts', k); if (al) al.remove(); return k.outerHTML; });
        var alts = $$('.mm-alt', front).filter(function (a) { return a.dataset.tag === f; }).map(function (a) { return a.outerHTML; });
        out.innerHTML = '<div class="mm-hd"><small>' + f + '면</small><h2>' + f + '면의 긔사 ' + kn(leads.length + alts.length) + ' 건</h2></div>' +
          leads.join('') + '<div class="mm-alts solo">' + alts.join('') + '</div>' + ixOf(f) +
          '<button type="button" class="mm-back">온 지면으로 도라가기</button>';
        $$('.mb-rv', out).forEach(function (el) { el.classList.add('in'); });
        $('.mm-back', out).onclick = function () { $('button[data-f="all"]', nav).click(); };
        out.hidden = false; front.hidden = true; if (W.mmMv) W.mmMv(out);
      }
      tone('tick');
      var top = nav.getBoundingClientRect().top + W.scrollY - 48;
      if (W.scrollY > top) W.scrollTo({ top: top, behavior: 'smooth' });
    });
  })();

  /* ── 색인 탭 ── */
  $$('.mm-ixtabs button').forEach(function (b) {
    b.onclick = function () {
      $$('.mm-ixtabs button').forEach(function (x) { x.classList.toggle('on', x === b); });
      $$('ol.mm-ix').forEach(function (o) { o.hidden = o.dataset.ix !== b.dataset.ix; });
      tone('tick');
    };
  });

  /* ── 부록 칸 — 누르면 손짓이 일어난 뒤 드러감 ── */
  function act(el, cls, ms, sound) {
    el.addEventListener('click', function (e) {
      if (el.classList.contains(cls)) return; e.preventDefault();
      el.classList.add(cls); if (sound) tone(sound); buzz(20);
      setTimeout(function () { location.href = el.getAttribute('href') || el.dataset.href; }, calm ? 0 : ms);
    });
  }
  act($('#mmExpo'), 'torn', 1300, 'stamp');
  act($('#mmDesk'), 'pulled', 900, 'tick');

  /* ── 광고 ── */
  var shop = $('.mm-ad-shop'), seek = $('.mm-ad-seek'), film = $('.mm-ad-film'), black = $('#mmBlack');
  function go(el, ms) { setTimeout(function () { location.href = el.dataset.href; }, calm ? 0 : ms); }
  shop.addEventListener('click', function () {
    if (shop.classList.contains('cut')) return;
    shop.classList.add('cut'); buzz([10, 30, 10, 30, 10]);
    var n = 0, t = setInterval(function () { tone('type'); if (++n > 9) clearInterval(t); }, 120);
    go(shop, 1700);
  });
  seek.addEventListener('click', function () {
    if (seek.classList.contains('found')) return;
    seek.classList.add('found'); setTimeout(function () { tone('stamp'); buzz(60); }, 500);
    go(seek, 1800);
  });
  film.addEventListener('click', function () {
    black.classList.add('on'); tone('tick'); go(film, 1500);
  });
  /* 뒤로 도라오면 처음 모양으로 */
  W.addEventListener('pageshow', function () {
    shop.classList.remove('cut'); seek.classList.remove('found'); black.classList.remove('on');
    ['#mmExpo', '#mmDesk'].forEach(function (s) { $(s).classList.remove('torn', 'pulled'); });
  });

  /* ══ 일면 — 움직이는 사진 ══ */
  (function () {
    var io = 'IntersectionObserver' in W ? new IntersectionObserver(function (es) { es.forEach(function (e) { e.target.classList.toggle('on', e.isIntersecting); if (e.isIntersecting) first(e.target); }); }, { threshold: .25 }) : null;
    function first(el) {
      if (el.dataset.seen) return; el.dataset.seen = 1;
      var b = $('.mv-count b', el); if (b) { var to = +b.dataset.to, t0 = performance.now(); (function f(t) { var p = Math.min(1, (t - t0) / 2400); b.textContent = Math.round(to * (1 - Math.pow(1 - p, 3))); if (p < 1) requestAnimationFrame(f); })(t0); }
    }
    function tap(el) {
      el.classList.remove('tap'); void el.offsetWidth; el.classList.add('tap'); clearTimeout(el._t); el._t = setTimeout(function () { el.classList.remove('tap'); }, 1600);
      var k = el.dataset.mv; buzz(k === 'door' ? [25, 90, 25, 90, 25] : k === 'letter' || k === 'sohn' ? [10, 40, 30] : 12); tone(k === 'letter' ? 'stamp' : 'tick');
    }
    function scan(root) {
      $$('.mv', root || D).forEach(function (el) {
        if (el._mv) return; el._mv = 1; if (io) io.observe(el); else el.classList.add('on');
        if (el.dataset.mv !== 'loupe') el.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); tap(el); });
        if (el.dataset.mv === 'loupe') loupe(el);
      });
    }
    /* 금시계 — 지금 시각 */
    function clock() { var d = new Date(), s = d.getSeconds(), m = d.getMinutes() + s / 60, h = (d.getHours() % 12) + m / 60;
      $$('.mv-watch .hands').forEach(function (hd) { hd.children[0].style.transform = 'rotate(' + h * 30 + 'deg)'; hd.children[1].style.transform = 'rotate(' + m * 6 + 'deg)'; hd.children[2].style.transform = 'rotate(' + s * 6 + 'deg)'; }); }
    clock(); setInterval(clock, 1000);
    /* 확대경 — 혼자 더듬다가, 손가락을 대면 따라옴 */
    function loupe(el) {
      var lp = $('.mv-lp', el), inn = $('.mv-lp>div', el), Z = 2.4, R = 60, man = null, t0 = performance.now(), x = 0, y = 0;
      var bg = $('.mv-bg', el);
      function place(px, py) { var bx = bg.offsetLeft, by = bg.offsetTop, w = bg.offsetWidth, h = bg.offsetHeight; x = Math.max(bx + R, Math.min(bx + w - R, px)); y = Math.max(by + R * .6, Math.min(by + h - R * .6, py));
        lp.style.transform = 'translate(' + x + 'px,' + y + 'px)'; inn.style.backgroundSize = (w * Z) + 'px ' + (h * Z) + 'px'; inn.style.backgroundPosition = (-((x - bx) * Z - R)) + 'px ' + (-((y - by) * Z - R)) + 'px'; }
      (function f(t) { if (el.isConnected) requestAnimationFrame(f); if (!el.classList.contains('on') || man) return;
        var k = (t - t0) / 1000, w = bg.offsetWidth, h = bg.offsetHeight; place(bg.offsetLeft + w * (.5 + .36 * Math.sin(k * .37)), bg.offsetTop + h * (.55 + .25 * Math.sin(k * .53 + 1.3))); })(t0);
      function pos(e) { var r = el.getBoundingClientRect(); place(e.clientX - r.left, e.clientY - r.top); }
      lp.addEventListener('pointerdown', function (e) { man = 1; lp.setPointerCapture && lp.setPointerCapture(e.pointerId); pos(e); buzz(8); e.preventDefault(); });
      lp.addEventListener('pointermove', function (e) { if (man) { pos(e); e.preventDefault(); } });
      function up() { if (!man) return; man = null; t0 = performance.now() - 1000 * Math.asin(Math.max(-1, Math.min(1, ((x - bg.offsetLeft) / bg.offsetWidth - .5) / .36))) / .37; }
      lp.addEventListener('pointerup', up); lp.addEventListener('pointercancel', up);
      el.addEventListener('click', function (e) { if (e.target.closest('.mv-lp')) return; man = 1; var r = el.getBoundingClientRect(); place(e.clientX - r.left, e.clientY - r.top); buzz(8); setTimeout(function () { man = null; }, 2500); });
    }
    W.mmMv = scan; scan();
  })();
})(window, document);
