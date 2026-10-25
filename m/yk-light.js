/* 경성야록 · 본지(메인) 사건 칸에 「빛이 드는」 연출 (1013 · 2판)
   메인에서만 작동 — 사건 면(서브)에는 아무것도 하지 않음.
   · 사건 칸(죽첨정 · 마리아 · 손기정 · 백백교)에 마우스를 올리면 : 칸 위에서 등불 빛이 은은하게 내려와 그 칸이 밝아지고, 다른 칸은 조금 어두워짐
   · 사건을 누르면 : 그 칸에 빛이 가득 차오르고(약 0.9초) 다른 칸은 어둠에 잠긴 뒤 사건 면으로 넘어감
   · 번쩍임 없음 — 호박빛이 천천히 차오름 · 움직임 줄이기 설정이면 바로 넘어감 */
(function () {
  'use strict';
  var W = window, D = document;
  if (W.__ykLight) return; W.__ykLight = true;
  var reduce = W.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var CASE = /case-(jukcheomjeong|maria|sonkijeong|baekbaekgyo)\/(index\.html)?(#.*)?$/;

  var css = D.createElement('style');
  css.textContent =
    '#cases .case{transition:filter .7s ease,opacity .4s}' +
    /* 어둠 : 화면 전체에 깔리되, 빛 드는 칸 자리만 둥글게 비어 잇음 */
    '.yk-dark{position:fixed;inset:0;z-index:60;pointer-events:none;opacity:0;transition:opacity .8s ease;' +
      'background:radial-gradient(ellipse var(--rw,300px) var(--rh,300px) at var(--cx,50%) var(--cy,50%),rgba(14,8,4,0) 0%,rgba(14,8,4,0) 62%,rgba(14,8,4,.62) 100%)}' +
    '.yk-dark.on{opacity:.45}.yk-dark.go{opacity:1;transition-duration:.9s}' +
    /* 빛 : 칸 위쪽에서 내려오는 등불 + 칸 전체에 도는 온기 */
    '.yk-beam{position:absolute;inset:-14px -10px -10px;z-index:4;pointer-events:none;opacity:0;transition:opacity .8s ease;mix-blend-mode:multiply}' +
    '.yk-beam:before{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 70% 55% at 50% -6%,rgba(255,196,120,.55),rgba(240,160,90,.28) 45%,rgba(200,120,70,0) 78%)}' +
    '.yk-beam:after{content:"";position:absolute;inset:0;background:radial-gradient(ellipse 90% 80% at 50% 30%,rgba(255,226,170,0),rgba(120,60,30,.12) 70%,rgba(70,30,15,.22) 100%)}' +
    '.yk-glow{position:absolute;inset:-14px -10px -10px;z-index:4;pointer-events:none;opacity:0;transition:opacity .8s ease;mix-blend-mode:screen;' +
      'background:radial-gradient(ellipse 60% 45% at 50% 0%,rgba(255,206,140,.32),rgba(255,170,90,.12) 50%,rgba(255,170,90,0) 80%)}' +
    '.yk-lamp .yk-beam,.yk-lamp .yk-glow{opacity:.75}' +
    '#cases.yk-go .yk-lamp .yk-beam{opacity:1;transition-duration:.9s}' +
    '#cases.yk-go .yk-lamp .yk-glow{opacity:1;transition-duration:.9s;background:radial-gradient(ellipse 85% 75% at 50% 10%,rgba(255,206,140,.55),rgba(255,160,80,.28) 55%,rgba(255,160,80,.06) 100%)}' +
    '@media (hover:none){.yk-lamp .yk-beam,.yk-lamp .yk-glow{opacity:0}.yk-dark.on{opacity:0}}';
  D.head.appendChild(css);

  var box = null, cells = [];
  function setup() {
    box = D.getElementById('cases'); if (!box) return;
    cells = Array.prototype.slice.call(box.querySelectorAll('.case'));
    cells.forEach(function (c) {
      if (c.querySelector(':scope > .yk-beam')) return;
      var b = D.createElement('span'); b.className = 'yk-beam'; b.setAttribute('aria-hidden', 'true');
      var g = D.createElement('span'); g.className = 'yk-glow'; g.setAttribute('aria-hidden', 'true');
      c.appendChild(b); c.appendChild(g);
      c.addEventListener('pointerenter', function (e) { if (e.pointerType === 'touch' || busy) return; light(c); });
      c.addEventListener('pointerleave', function () { if (busy) return; light(null); });
    });
  }
  var dark = null, cur = null, raf = 0;
  function aim() {
    if (!cur || !dark) return;
    var r = cur.getBoundingClientRect(), z = ratio();
    dark.style.setProperty('--cx', ((r.left + r.width / 2) / z) + 'px'); dark.style.setProperty('--cy', ((r.top + r.height / 2) / z) + 'px');
    dark.style.setProperty('--rw', (r.width / z * .78) + 'px'); dark.style.setProperty('--rh', (r.height / z * .78) + 'px');
  }
  function ratio() { var p = D.createElement('div'); p.style.cssText = 'position:fixed;left:100px;top:0;width:1px;height:1px;visibility:hidden'; D.body.appendChild(p); var v = p.getBoundingClientRect().left / 100; p.remove(); return v || 1; }
  function light(c) {
    cells.forEach(function (x) { x.classList.toggle('yk-lamp', x === c); });
    if (box) box.classList.toggle('yk-focus', !!c);
    if (!dark) { dark = D.createElement('div'); dark.className = 'yk-dark'; dark.setAttribute('aria-hidden', 'true'); D.body.appendChild(dark); }
    cur = c; if (c) aim();
    dark.classList.toggle('on', !!c);
  }
  W.addEventListener('scroll', function () { if (!cur) return; cancelAnimationFrame(raf); raf = requestAnimationFrame(aim); }, { passive: true });
  W.addEventListener('resize', function () { if (cur) aim(); });
  var lastCell = null;
  D.addEventListener('pointerdown', function (e) { lastCell = e.target.closest ? e.target.closest('#cases .case') : null; }, true);

  var busy = false;
  function go(url) {
    var c = lastCell;
    if (!c || reduce || !box) { location.href = url; return; }
    if (busy) return; busy = true;
    light(c); box.classList.add('yk-go'); dark.classList.add('go');
    setTimeout(function () { location.href = url; }, 900);
    setTimeout(function () { busy = false; box.classList.remove('yk-go'); if (dark) dark.classList.remove('go'); light(null); }, 4000);
  }
  W.ykLightGo = go;
  D.addEventListener('click', function (e) {
    if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
    var a = e.target.closest && e.target.closest('a[href]'); if (!a || a.target === '_blank') return;
    if (!CASE.test(a.getAttribute('href') || '')) return;
    if (!a.closest('#cases')) return;   // 사건 칸 안의 링크만
    e.preventDefault(); go(a.href);
  });
  /* 뒤로 가기로 돌아오면 빛을 치움 */
  W.addEventListener('pageshow', function (e) { if (e.persisted && box) { busy = false; box.classList.remove('yk-go'); if (dark) dark.classList.remove('go'); light(null); } });
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', setup); else setup();
})();
