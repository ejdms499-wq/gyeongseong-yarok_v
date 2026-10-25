/* 경성야록 폰 본지 — THE HAUNTED NEWSPAPER 장치 (1018)
   · 위 띠: 내려 닑을 땐 숨고 올리면 돌아옴
   · 장면마다: 세로 면 표시(사회면 · 소화 팔 년 · 경성) · 둥근 화살표 · 몃 번째 장인지
   · 부록: 작은 신문 색인 여섯 줄 — 누르면 그 칸으로 (원래 연결 그대로)
   · 지면 넘김: 흰 종이(사건) 또는 검은 지면(부록)이 번져 화면을 덮은 뒤 열림. 뒤로 오면 깨끗이 돌아옴 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var B = D.body, calm = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var tone = function (k) { if (W.mb && W.mb.tone) try { W.mb.tone(k); } catch (e) {} };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ── 장면 꾸미기 — 세로 면 표시 · 화살표 · 몃 번째 ── */
  var cases = $$('#front .mm-case');
  cases.forEach(function (art, i) {
    var mv = $(':scope > .mv', art), lab = $('.mm-lab', art), lt = $('.mm-lt', art);
    if (mv && lab && !$('.mm-vl', mv)) { var vl = D.createElement('span'); vl.className = 'mm-vl'; vl.setAttribute('aria-hidden', 'true'); vl.setAttribute('data-noko', ''); vl.textContent = lab.textContent.trim(); mv.appendChild(vl); }
    if (lt && !$('.mm-arrow', lt)) {
      var ar = D.createElement('i'); ar.className = 'mm-arrow'; ar.setAttribute('aria-hidden', 'true'); ar.textContent = '→'; lt.appendChild(ar);
      var pg = D.createElement('span'); pg.className = 'mm-pg'; pg.innerHTML = '<i style="--p:' + ((i + 1) / cases.length * 100) + '%"></i><b>' + (i + 1) + ' / ' + cases.length + '</b>'; lt.appendChild(pg);
    }
  });

  /* ── 띠의 「가」(옛말 · 오늘 말)는 차례 덧창 맨 우로 — 띠는 제호와 ☰만 ── */
  function moveKo() {
    var ko = $('.mb-bar .mb-ko'), bd = $('#mbToc .mb-sh-bd'); if (!ko || !bd || $('.ko-row', bd)) return;
    var row = D.createElement('div'); row.className = 'ko-row'; row.setAttribute('data-noko', '');
    row.innerHTML = '<span><b>옛말 · 오늘 말</b><small>온 지면의 말을 한꺼번에 바꾸오. 글을 손가락으로 대면 그 단락만 바뀌오.</small></span>';
    row.appendChild(ko); bd.insertBefore(row, bd.firstChild);
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', moveKo); else moveKo();
  setTimeout(moveKo, 400);

  /* ── 첫 화면 「지면을 열다」 ── */
  var op = $('.mm-open');
  if (op) op.addEventListener('click', function (e) { e.preventDefault(); var t = $('#front .mm-case'); if (!t) return; W.scrollTo({ top: t.getBoundingClientRect().top + W.scrollY, behavior: calm ? 'auto' : 'smooth' }); });

  /* ── 위 띠 — 내려가면 숨고 올라오면 나옴 ── */
  (function () {
    var last = W.scrollY, acc = 0;
    W.addEventListener('scroll', function () {
      var y = W.scrollY, d = y - last; last = y;
      if (y < 90) { B.classList.remove('mm-hidebar'); acc = 0; return; }
      if ((d > 0 && acc < 0) || (d < 0 && acc > 0)) acc = 0;
      acc += d;
      if (acc > 28) B.classList.add('mm-hidebar'); else if (acc < -14) B.classList.remove('mm-hidebar');
    }, { passive: true });
  })();

  /* ── 부록 — 작은 신문 색인 ── */
  (function () {
    var src = $('.mm-annex-src'); if (!src) return;
    var items = $$(':scope > *', src).filter(function (x) { return x.querySelector('.ax-t'); });
    var M = { 'fair.html': 'm-fair.html', 'newsroom.html': 'm-newsroom.html', 'hogoe.html': 'm-hogoe.html', 'shop.html': 'm-shop.html', 'seek.html': 'm-seek.html', 'napryang.html': 'm-napryang.html' };
    function stamps() { var o = {}; try { o = JSON.parse(localStorage.getItem('yk-read') || '{}') || {}; } catch (e) {} var k = ['jk', 'maria', 'sk', 'bb'].filter(function (x) { return o[x]; }).length; return k >= 4 ? '사건 도장 넷 · 기자증이 나왓소' : '사건 도장 ' + k + ' / 4'; }
    var ol = D.createElement('ol'); ol.className = 'nx';
    ol.innerHTML = items.map(function (el, i) {
      var t = $('.ax-t', el).textContent.trim(), s = $('.ax-s', el).textContent.trim();
      var im = $('.mm-ph img, .mm-ad-ph img', el), pic = im ? im.getAttribute('src') : 'assets/noir/papers.jpg';
      var href = el.getAttribute('href') || el.getAttribute('data-href') || '#', m = href.split('/').pop(); if (M[m]) href = M[m];
      if (el.id === 'mmDesk') s += ' · ' + stamps();
      return '<li><a class="nx-i" href="' + esc(href) + '"><span class="nx-n">0' + (i + 1) + '</span><span class="nx-im"><img src="' + esc(pic) + '" alt="" loading="lazy" decoding="async"></span><span class="nx-t"><b>' + esc(t) + '</b><small>' + esc(s) + '</small></span><span class="nx-a" aria-hidden="true">→</span></a></li>';
    }).join('');
    src.parentNode.insertBefore(ol, src);
  })();

  /* ── 지면 넘김 ── */
  var wipe = null, leaving = false;
  function goWipe(href, y, art, dark) {
    if (leaving) return; leaving = true;
    if (calm) { location.href = href; return; }
    if (art) art.classList.add('mm-leaving');
    if (!wipe) { wipe = D.createElement('div'); wipe.className = 'mm-wipe'; D.body.appendChild(wipe); }
    wipe.classList.toggle('dk', !!dark);
    wipe.style.setProperty('--y', Math.round(y) + 'px'); wipe.classList.remove('on'); void wipe.offsetWidth;
    requestAnimationFrame(function () { wipe.classList.add('on'); });
    buzz(12); tone('tick');
    setTimeout(function () { location.href = href; }, 470);
    setTimeout(function () { leaving = false; }, 4000);
  }
  D.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var a = e.target.closest('a.mm-lead, a.nx-i'); if (!a) return;
    var href = a.getAttribute('href'); if (!href || href.charAt(0) === '#') return;
    e.preventDefault();
    var r = a.getBoundingClientRect(), y = Math.max(0, Math.min(innerHeight, r.top + (a.classList.contains('nx-i') ? r.height / 2 : 0)));
    goWipe(href, y, a.closest('.mm-case'), a.classList.contains('nx-i'));
  });
  W.addEventListener('pageshow', function () {
    leaving = false; if (wipe) { wipe.classList.remove('on'); }
    $$('.mm-leaving').forEach(function (x) { x.classList.remove('mm-leaving'); });
  });
  W.addEventListener('pagehide', function () { leaving = false; if (wipe) wipe.classList.remove('on'); });
})(window, document);
