/* 경성야록 · 사건 본편 「놓치기 쉬운 디테일에 불빛」 (1013)
   글로 알려 주는 대신, 아직 안 만져 본 장치에 등잔불 같은 은은한 빛이 머묾 → 만져 보면 빛이 꺼짐.
   · 동아일보가 쫓아간 기록 : 아직 안 본 날자 · 「2026년 뉴스」 · 원문 가운데 손잡이(밀면 바뀜) · 「간추려 읽기」 · 양옆 화살표
   · 그 밧게 : 사건 요지 봉함 · 기자 수첩 칸 · 라디오
   · 지면이 처음 화면에 들어올 때 등잔 빛이 한 번 쓸고 지나감
   · 번쩍임 없음 — 천천히 숨 쉬듯 밝아졌다 흐려짐 · 움직임 줄이기면 빛만 고정 */
(function () {
  'use strict';
  var D = document, W = window;
  if (W.__ykGlint) return; W.__ykGlint = true;
  var css = D.createElement('style');
  css.textContent =
    '.ykgl{position:relative;box-shadow:0 0 0 1px rgba(214,150,70,.55),0 0 16px 2px rgba(255,186,96,.38)!important;animation:ykglB 3.2s ease-in-out infinite;transition:box-shadow .5s}' +
    '.ykgl:hover{box-shadow:0 0 0 1px rgba(232,170,80,.85),0 0 24px 5px rgba(255,190,100,.6)!important;animation:none}' +
    '@keyframes ykglB{0%,100%{box-shadow:0 0 0 1px rgba(214,150,70,.35),0 0 8px 1px rgba(255,186,96,.18)}50%{box-shadow:0 0 0 1.5px rgba(232,170,80,.95),0 0 24px 6px rgba(255,190,100,.62)}}' +
    /* 날자 줄 : 아직 안 본 날 위에 작은 등불 */
    '.report-timeline .ykgl-dot{position:absolute;left:50%;top:-10px;width:9px;height:9px;margin-left:-4.5px;border-radius:50%;pointer-events:none;background:#ffd79a;box-shadow:0 0 14px 6px rgba(255,186,96,.65);animation:ykglD 2.8s ease-in-out infinite}' +
    '@keyframes ykglD{0%,100%{opacity:.35;transform:scale(.8)}50%{opacity:1;transform:scale(1.1)}}' +
    '.report-timeline button.ykgl{box-shadow:none!important;animation:none}' +
    /* 손잡이 : 빛 + 살짝 밀어 보이는 몸짓 */
    '.plate-line.ykgl{box-shadow:none!important;animation:none}' +
    '.plate-line.ykgl:before{content:"";position:absolute;left:50%;top:50%;width:120px;height:120px;margin:-60px 0 0 -60px;border-radius:50%;pointer-events:none;' +
      'background:radial-gradient(circle,rgba(255,214,150,.85),rgba(255,186,96,.35) 40%,transparent 70%);mix-blend-mode:screen;animation:ykglD 2.8s ease-in-out infinite}' +
    '.plate-line.ykgl{animation:ykglNudge 3.6s ease-in-out infinite}' +
    '@keyframes ykglNudge{0%,70%,100%{margin-left:0}80%{margin-left:-14px}88%{margin-left:-4px}}' +
    /* 지면에 처음 들어올 때 등잔 빛이 한 번 쓸고 지나감 */
    '.ykgl-sweep{position:absolute;inset:0;z-index:30;pointer-events:none;overflow:hidden}' +
    '.ykgl-sweep:after{content:"";position:absolute;top:-10%;bottom:-10%;left:-40%;width:35%;transform:skewX(-14deg);' +
      'background:linear-gradient(90deg,transparent,rgba(255,214,150,.22),rgba(255,230,180,.32),rgba(255,214,150,.22),transparent);mix-blend-mode:soft-light;animation:ykglS 2.2s cubic-bezier(.45,0,.3,1) forwards}' +
    '@keyframes ykglS{to{left:110%}}' +
    '#places .pr-chart.ykgl{cursor:zoom-in}' +
    '@media (prefers-reduced-motion:reduce){.ykgl,.ykgl:before,.ykgl-dot,.plate-line.ykgl{animation:none!important}.ykgl-sweep{display:none}}' +
    '@media print{.ykgl{box-shadow:none!important}.ykgl-dot,.ykgl-sweep{display:none}}';
  D.head.appendChild(css);

  var used = {};
  function key(el, k) { return k + '|' + (el.textContent || '').replace(/\s+/g, '').slice(0, 18); }
  /* 장치 목록 : [찾을 것, 이름표, 「만졋다」로 칠 사건] */
  var LIST = [
    ['.report-timeline li button:not(.active)', 'tl', 'click', 'dot'],
    ['.report-history .plate-switch button:not(.active)', 'sw', 'click'],
    ['.report-history .report-tabs button:not(.active)', 'tab', 'click'],
    ['.report-history .book-arrow', 'arw', 'click'],
    ['.report-history .plate-line', 'hdl', 'drag'],
    ['.case-brief .cb-seal', 'seal', 'click'],
    ['.jn-tab:not(.on)', 'jn', 'click'],
    ['.archive-radio .rx-radio', 'rx', 'click'],
    ['#places .pr-chart', 'map', 'click']           /* 1014 · 아현동 지도 — 누르면 크게 */
  ];
  function apply() {
    LIST.forEach(function (L) {
      Array.prototype.forEach.call(D.querySelectorAll(L[0]), function (el) {
        var k = key(el, L[1]);
        if (used[k] || used[L[1] + '*']) { off(el); return; }
        if (!el.classList.contains('ykgl')) {
          el.classList.add('ykgl');
          if (L[3] === 'dot' && !el.querySelector('.ykgl-dot')) { var d = D.createElement('i'); d.className = 'ykgl-dot'; d.setAttribute('aria-hidden', 'true'); if (getComputedStyle(el).position === 'static') el.style.position = 'relative'; el.appendChild(d); }
        }
        if (!el.__ykgl) {
          el.__ykgl = 1;
          var done = function () { used[/^(hdl|arw|rx|seal|map|adh)$/.test(L[1]) ? L[1] + '*' : k] = 1; off(el); if (/^(hdl|arw|rx|seal|map|adh)$/.test(L[1])) apply(); };
          el.addEventListener('click', done);
          if (L[2] === 'drag') { el.addEventListener('pointerdown', done); var r = el.parentElement && el.parentElement.querySelector('.plate-range'); if (r) r.addEventListener('input', done); }
        }
      });
    });
    /* 지금 보고 잇는 날은 본 것으로 */
    Array.prototype.forEach.call(D.querySelectorAll('.report-timeline li button.active'), function (b) { used[key(b, 'tl')] = 1; off(b); });
  }
  function off(el) { el.classList.remove('ykgl'); var d = el.querySelector('.ykgl-dot'); if (d) d.remove(); }

  /* 장면이 바뀌면(날자를 넘기면 지면이 새로 그려짐) 다시 붙임 */
  var mt = 0;
  var mo = new MutationObserver(function () { clearTimeout(mt); mt = setTimeout(apply, 120); });
  function start() {
    apply();
    var rh = D.querySelector('.report-history'); if (rh) mo.observe(rh, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] });
    var cb = D.querySelector('.case-brief'); if (cb) mo.observe(cb, { childList: true, subtree: true });
    /* 처음 들어올 때 한 번 빛이 쓸고 지나감 */
    if ('IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) {
        if (!e.isIntersecting) return; io.unobserve(e.target);
        var s = D.createElement('div'); s.className = 'ykgl-sweep'; s.setAttribute('aria-hidden', 'true');
        if (getComputedStyle(e.target).position === 'static') e.target.style.position = 'relative';
        e.target.appendChild(s); setTimeout(function () { s.remove(); }, 2600);
      }); }, { threshold: .35 });
      Array.prototype.forEach.call(D.querySelectorAll('.report-history .book, .case-brief .cb-steps, .archive-radio .rx'), function (b) { io.observe(b); });
    }
  }
  if (D.readyState === 'complete') setTimeout(start, 800); else W.addEventListener('load', function () { setTimeout(start, 800); });
  setInterval(apply, 4000);
})();
