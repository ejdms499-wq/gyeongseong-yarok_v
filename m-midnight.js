/* 경성야록 폰 본지 — MIDNIGHT EDITION 장치 (1017)
   · 위 띠: 내려 닑을 땐 숨고 올리면 돌아옴
   · 02 마리아: 제목을 봉투 우로 올림
   · 부록: 여섯 서랍 — 누르면 펼쳐지고, 드러가기를 누르면 그 칸으로 (원래 연결은 그대로)
   · 지면 넘김: 검은 줄이 번져 화면을 덮은 뒤 그 사건의 면이 열림 (뒤로 오면 깨끗이 돌아옴) */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var B = D.body, calm = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var tone = function (k) { if (W.mb && W.mb.tone) try { W.mb.tone(k); } catch (e) {} };
  var esc = function (t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  /* ── 02 마리아 — 제목이 먼저, 봉투가 다음 ── */
  (function () {
    var art = $('.mm-c2'); if (!art) return;
    var lead = $('.mm-lead', art), mv = $(':scope > .mv', art); if (!lead || !mv) return;
    var lab = $('.mm-lab', lead), h = $('.mm-h', lead); if (!h) return;
    var a = D.createElement('a'); a.className = 'mm-th mb-rv'; a.href = lead.getAttribute('href');
    if (lab) a.appendChild(lab); a.appendChild(h); art.insertBefore(a, mv);
  })();

  /* ── 첫 화면 「지면을 열다」 ── */
  var op = $('.mm-open');
  if (op) op.addEventListener('click', function (e) { e.preventDefault(); var t = $('#front'); if (!t) return; W.scrollTo({ top: t.getBoundingClientRect().top + W.scrollY - 44, behavior: calm ? 'auto' : 'smooth' }); });

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

  /* ── 부록 — 여섯 서랍 ── */
  (function () {
    var src = $('.mm-annex-src'); if (!src) return;
    var items = $$(':scope > *', src).filter(function (x) { return x.querySelector('.ax-t'); });
    var M = { 'fair.html': 'm-fair.html', 'newsroom.html': 'm-newsroom.html', 'hogoe.html': 'm-hogoe.html', 'shop.html': 'm-shop.html', 'seek.html': 'm-seek.html', 'napryang.html': 'm-napryang.html' };
    function stamps() { var o = {}; try { o = JSON.parse(localStorage.getItem('yk-read') || '{}') || {}; } catch (e) {} var k = ['jk', 'maria', 'sk', 'bb'].filter(function (x) { return o[x]; }).length; return k >= 4 ? '사건 도장 넷 · 기자증이 나왓소' : '사건 도장 ' + k + ' / 4 · 넷이면 기자증이 나오오'; }
    var ol = D.createElement('ol'); ol.className = 'dw';
    ol.innerHTML = items.map(function (el, i) {
      var t = $('.ax-t', el).textContent, s = $('.ax-s', el).textContent;
      var im = $('.mm-ph img, .mm-ad-ph img', el), pic = im ? im.getAttribute('src') : 'assets/noir/street.jpg';
      var d = $('.mm-rd, .mm-ad-d', el), q = $('.mm-ad-q', el);
      var desc = (d ? d.innerHTML.replace(/<br\s*\/?>/g, ' ') : s).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim() + (q ? ' ' + q.textContent.trim() : '');
      var href = el.getAttribute('href') || el.getAttribute('data-href') || '#', m = href.split('/').pop(); if (M[m]) href = M[m];
      var extra = el.id === 'mmDesk' ? '<small>' + stamps() + '</small>' : '';
      return '<li class="dw-i"><button type="button" class="dw-t" aria-expanded="false"><span class="dw-n">0' + (i + 1) + '</span><span class="dw-tt"><b>' + esc(t) + '</b><small>' + esc(s) + '</small></span><i class="dw-p" aria-hidden="true"></i></button>' +
        '<div class="dw-b"><div class="dw-in"><figure><img src="' + esc(pic) + '" alt="" loading="lazy" decoding="async"><figcaption>그림 · 재현</figcaption></figure><p>' + esc(desc) + extra + '</p><a class="dw-go" href="' + esc(href) + '" data-wipe><span>드러가기</span><span>→</span></a></div></div></li>';
    }).join('');
    src.parentNode.insertBefore(ol, src);
    ol.addEventListener('click', function (e) {
      var t = e.target.closest('.dw-t'); if (!t) return;
      var li = t.parentNode, open = !li.classList.contains('open');
      $$('.dw-i.open', ol).forEach(function (x) { x.classList.remove('open'); $('.dw-t', x).setAttribute('aria-expanded', 'false'); });
      if (open) { li.classList.add('open'); t.setAttribute('aria-expanded', 'true'); buzz(8); tone('tick'); setTimeout(function () { var r = li.getBoundingClientRect(); if (r.bottom > innerHeight - 20) W.scrollBy({ top: Math.min(r.bottom - innerHeight + 40, r.top - 120), behavior: calm ? 'auto' : 'smooth' }); }, 460); }
    });
  })();

  /* ── 지면 넘김 ── */
  var wipe = null, leaving = false;
  function goWipe(href, y, art) {
    if (leaving) return; leaving = true;
    if (calm) { location.href = href; return; }
    if (art) art.classList.add('mm-leaving');
    if (!wipe) { wipe = D.createElement('div'); wipe.className = 'mm-wipe'; D.body.appendChild(wipe); }
    wipe.style.setProperty('--y', Math.round(y) + 'px'); wipe.classList.remove('on'); void wipe.offsetWidth;
    requestAnimationFrame(function () { wipe.classList.add('on'); });
    buzz(12); tone('tick');
    setTimeout(function () { location.href = href; }, 480);
    setTimeout(function () { leaving = false; }, 4000);
  }
  D.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button || e.metaKey || e.ctrlKey || e.shiftKey) return;
    var a = e.target.closest('a.mm-lead, a.mm-th, a.dw-go'); if (!a) return;
    var href = a.getAttribute('href'); if (!href || href.charAt(0) === '#') return;
    e.preventDefault();
    var r = (e.target.closest('.mm-go') || a).getBoundingClientRect();
    goWipe(href, r.bottom > innerHeight || r.bottom < 0 ? innerHeight / 2 : r.bottom, a.closest('.mm-case'));
  });
  W.addEventListener('pageshow', function () {
    leaving = false; if (wipe) { wipe.classList.remove('on'); }
    $$('.mm-leaving').forEach(function (x) { x.classList.remove('mm-leaving'); });
  });
  W.addEventListener('pagehide', function () { leaving = false; if (wipe) wipe.classList.remove('on'); });
})(window, document);
