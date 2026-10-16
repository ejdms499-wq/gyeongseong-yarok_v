/* 경성야록 · 폰판(mbook) 공통 동작
   - 위 띠(표지 지나면 나타남) · 읽은 만큼 붉은 줄 · 지금 장 이름
   - 목차 시트 · 장치 시트 열고 닫기(폰 「뒤로」 버튼으로도 닫힘)
   - 원문 그림 크게 보기 · 천천히 나타나기(한 번만) */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  W.mb = W.mb || {};

  /* ── 시트 ── */
  var stack = [];
  function lock() { D.documentElement.classList.toggle('mb-lock', stack.length > 0); }
  function open(id, push) {
    var s = D.getElementById(id); if (!s || s.classList.contains('on')) return;
    s.classList.add('on'); stack.push(id); lock();
    if (push !== false) { try { history.pushState({ mb: id }, ''); } catch (e) {} }
    var bd = $('.mb-sh-bd', s); if (bd && !s.dataset.keep) bd.scrollTop = 0;
    try { W.dispatchEvent(new CustomEvent('mb:open', { detail: id })); } catch (e) {}
  }
  function close(id, fromPop) {
    id = id || stack[stack.length - 1]; if (!id) return;
    var s = D.getElementById(id); if (s) s.classList.remove('on');
    stack = stack.filter(function (x) { return x !== id; }); lock();
    try { W.dispatchEvent(new CustomEvent('mb:close', { detail: id })); } catch (e) {}
    if (!fromPop) { try { if (history.state && history.state.mb === id) history.back(); } catch (e) {} }
  }
  W.addEventListener('popstate', function () {
    if (zoomOn) { hideZoom(true); return; }
    if (stack.length) close(stack[stack.length - 1], true);
  });
  W.mb.open = open; W.mb.close = close;

  D.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]'); if (o) { e.preventDefault(); open(o.getAttribute('data-open')); return; }
    var c = e.target.closest('[data-close]'); if (c) { e.preventDefault(); close(c.closest('.mb-sheet') && c.closest('.mb-sheet').id); return; }
    var z = e.target.closest('[data-zoom]'); if (z) { e.preventDefault(); showZoom(z.getAttribute('data-zoom'), z.getAttribute('data-cap') || ''); return; }
    var g = e.target.closest('[data-goto]'); if (g) {
      e.preventDefault(); var t = D.getElementById(g.getAttribute('data-goto'));
      var sh = g.closest('.mb-sheet'); if (sh) close(sh.id);
      if (t) setTimeout(function () { W.scrollTo({ top: t.getBoundingClientRect().top + W.scrollY - 48, behavior: 'smooth' }); }, sh ? 380 : 0);
    }
  });

  /* ── 그림 크게 보기 ── */
  var zoomOn = false, zm;
  function showZoom(src, cap) {
    if (!zm) {
      zm = D.createElement('div'); zm.className = 'mb-zoom';
      zm.innerHTML = '<div class="zh"><span>원문 지면 · 손가락으로 밀어 보시압</span><button class="mb-sh-x" aria-label="닫기" style="color:#fff">×</button></div><div class="zb"><img alt=""></div><div class="zf"><span class="zc"></span><button class="zbig">크게</button></div>';
      D.body.appendChild(zm);
      $('.mb-sh-x', zm).onclick = function () { hideZoom(); };
      $('.zbig', zm).onclick = function () { zm.classList.toggle('big'); this.textContent = zm.classList.contains('big') ? '화면에 맞춤' : '크게'; };
    }
    $('img', zm).src = src; $('.zc', zm).textContent = cap; zm.classList.remove('big'); $('.zbig', zm).textContent = '크게';
    zm.classList.add('on'); zoomOn = true; D.documentElement.classList.add('mb-lock');
    try { history.pushState({ mbz: 1 }, ''); } catch (e) {}
  }
  function hideZoom(fromPop) {
    if (!zm) return; zm.classList.remove('on'); zoomOn = false; lock();
    if (!fromPop) { try { if (history.state && history.state.mbz) history.back(); } catch (e) {} }
  }
  W.mb.zoom = showZoom;

  /* ── 위 띠 · 목차 ── */
  function init() {
    var bar = $('.mb-bar'), prog = $('.mb-prog'), now = $('.mb-now'), cover = $('.mb-cover');
    var chs = $$('[data-ch]');
    var toc = $('#mbToc .mb-toc');
    if (toc) toc.innerHTML = chs.map(function (s, i) {
      return '<a href="#' + s.id + '" data-goto="' + s.id + '" data-i="' + i + '"><b>' + (s.getAttribute('data-no') || '') + '</b><span>' + s.getAttribute('data-ch') + '<small>' + (s.getAttribute('data-sub') || '') + '</small></span></a>';
    }).join('');
    var cur = -1, tick = false;
    function onScroll() {
      tick = false;
      var y = W.scrollY, h = D.documentElement.scrollHeight - W.innerHeight;
      if (bar) bar.classList.toggle('on', !cover || y > cover.offsetHeight - 60);
      if (prog) prog.style.width = (h > 0 ? Math.min(100, y / h * 100) : 0) + '%';
      var k = -1; chs.forEach(function (s, i) { if (s.getBoundingClientRect().top < 120) k = i; });
      if (k !== cur) {
        cur = k;
        if (now) now.innerHTML = k < 0 ? (now.getAttribute('data-def') || '') : '<b>' + (chs[k].getAttribute('data-kj') || '') + '</b>' + chs[k].getAttribute('data-ch');
        if (toc) $$('a', toc).forEach(function (a, i) { a.classList.toggle('on', i === k); });
      }
    }
    W.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();

    /* 나타나기 — 화면에 조금이라도 들어오면 (긴 칸도 막히지 않게) */
    var rv = $$('.mb-rv');
    if ('IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
      rv.forEach(function (el) { io.observe(el); });
    } else rv.forEach(function (el) { el.classList.add('in'); });
    setTimeout(function () { rv.forEach(function (el) { if (el.getBoundingClientRect().top < W.innerHeight) el.classList.add('in'); }); }, 1200);
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init();
})(window, document);
