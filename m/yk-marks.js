/* 경성야록 · 사건 면 「▸ 해 보시압」 표 — 잘 보이게 · 안 겹치게 · 사건마다 어울리게 (1013)
   · 각 사건 면의 *-tut.js 가 만든 .bt-mark 를 받아서:
     1) 글씨를 키우고 바탕을 또렷하게 (숨쉬기는 아주 약하게)
     2) 놓일 자리를 고름 — 장치 바로 위 왼쪽 → 위 오른쪽 → 안쪽 왼쪽 위 → 안쪽 오른쪽 위 → 안쪽 왼쪽 아래 순으로 재 보고,
        다른 글자 · 그림과 겹치지 안는 첫 자리에 놓음 (화면에 들어올 때 · 창 크기가 바뀔 때 다시 잼)
     3) 사건마다 테두리 결만 다르게 : 죽첨정 약병 갈색 · 마리아 붉은 도장 · 손기정 먹 붓 획 · 백백교 흰 꼬리표 */
(function () {
  'use strict';
  var D = document, W = window;
  if (W.__ykMarks) return; W.__ykMarks = true;
  var P = location.pathname;
  var CASE = /jukcheom/.test(P) ? 'jk' : /maria/.test(P) ? 'mr' : /sonki/.test(P) ? 'sk' : /baekbaek/.test(P) ? 'bb' : '';
  if (!CASE) return;
  D.documentElement.classList.add('ykm-' + CASE);

  var css = D.createElement('style');
  css.textContent =
    '.bt-mark{font-size:13.5px!important;letter-spacing:.1em!important;padding:7px 13px 6px 9px!important;background:#f6efdf!important;color:#1a140e!important;' +
      'box-shadow:0 0 0 1px #3a3128,0 8px 18px -10px rgba(0,0,0,.7)!important;animation:ykmBreath 4.2s ease-in-out infinite!important;white-space:nowrap;z-index:9!important}' +
    '@keyframes ykmBreath{0%,100%{opacity:.9}50%{opacity:1}}' +
    '.bt-mark.did{animation:none!important;background:#1e1913!important;color:#efe3c8!important}' +
    '.bt-mark.gone{opacity:0!important}' +
    '.bt-mark.ykm-wait{visibility:hidden}' +
    '.bt-ic.eye:before{content:"◎";position:absolute;left:2px;top:-2px;font-style:normal;font-size:12.5px;color:#8a2a21}' +
    /* 죽첨정 : 약병 라벨 갈색 */
    '.ykm-jk .bt-mark{box-shadow:0 0 0 1px #5a3d22,inset 3px 0 0 #6b4a2b,0 8px 18px -10px rgba(0,0,0,.7)!important;padding-left:12px!important}.ykm-jk .bt-ic:before{color:#6b4a2b!important}' +
    /* 마리아 : 붉은 도장 */
    '.ykm-mr .bt-mark{box-shadow:0 0 0 1px #3a3128,inset 3px 0 0 #8a2a21,0 8px 18px -10px rgba(0,0,0,.7)!important;padding-left:12px!important}' +
    /* 손기정 : 먹 붓 획 */
    '.ykm-sk .bt-mark{box-shadow:0 0 0 1px #2a2420,0 8px 18px -10px rgba(0,0,0,.7)!important;padding-bottom:9px!important}' +
    '.ykm-sk .bt-mark:after{content:"";position:absolute;left:9px;right:14px;bottom:3px;height:3px;background:linear-gradient(90deg,#1a1612,#1a1612bb 70%,transparent);border-radius:2px;transform:skewX(-24deg);opacity:.75}' +
    '.ykm-sk .bt-mark.did:after{background:linear-gradient(90deg,#efe3c8,transparent)}.ykm-sk .bt-ic:before{color:#1a1612!important}' +
    /* 백백교 : 흰 꼬리표 */
    '.ykm-bb .bt-mark{background:#fbf8f1!important;box-shadow:0 0 0 1px #a99f8c,0 8px 18px -10px rgba(0,0,0,.6)!important;padding-left:20px!important}' +
    '.ykm-bb .bt-mark:before{content:"";position:absolute;left:8px;top:50%;width:6px;height:6px;margin-top:-3px;border-radius:50%;box-shadow:inset 0 0 0 1.2px #7d7464}' +
    '.ykm-bb .bt-mark.did:before{box-shadow:inset 0 0 0 1.2px #efe3c8}.ykm-bb .bt-ic:before{color:#6d655a!important}' +
    '@media (prefers-reduced-motion:reduce){.bt-mark{animation:none!important}}';
  D.head.appendChild(css);

  function ratio() { var p = D.createElement('div'); p.style.cssText = 'position:fixed;left:100px;top:0;width:1px;height:1px;visibility:hidden'; D.body.appendChild(p); var v = p.getBoundingClientRect().left / 100; p.remove(); return v || 1; }
  /* 그 자리에 다른 글자 · 그림이 잇나 */
  function busyAt(x, y, m, host) {
    var list = D.elementsFromPoint ? D.elementsFromPoint(x, y) : [];
    for (var i = 0; i < list.length; i++) {
      var e = list[i];
      if (e === m || m.contains(e)) continue;
      if (e === D.documentElement || e === D.body) break;
      if (e.matches && e.matches('.bt-q,.bt-q *,.ykg-q')) return true;
      if (/^(IMG|CANVAS|VIDEO|SVG|svg|BUTTON|INPUT)$/.test(e.tagName)) return true;
      var own = ''; for (var c = e.firstChild; c; c = c.nextSibling) if (c.nodeType === 3) own += c.textContent;
      if (own.trim().length) return true;
      if (e === host) continue;
    }
    return false;
  }
  function free(m, host) {
    var r = m.getBoundingClientRect(); if (!r.width) return false;
    var pts = [[r.left + 4, r.top + 4], [r.right - 4, r.top + 4], [r.left + 4, r.bottom - 4], [r.right - 4, r.bottom - 4], [(r.left + r.right) / 2, (r.top + r.bottom) / 2], [r.left + r.width * .25, r.top + r.height / 2], [r.left + r.width * .75, r.top + r.height / 2]];
    for (var i = 0; i < pts.length; i++) {
      var x = pts[i][0], y = pts[i][1];
      if (x < 0 || y < 0 || x > innerWidth * ratio() || y > innerHeight * ratio()) return false;
      if (busyAt(x, y, m, host)) return false;
    }
    return true;
  }
  var SPOTS = [
    { top: '-40px', left: '0', right: 'auto', bottom: 'auto' },
    { top: '-40px', left: 'auto', right: '0', bottom: 'auto' },
    { top: 'auto', left: '0', right: 'auto', bottom: '-40px' },
    { top: 'auto', left: 'auto', right: '0', bottom: '-40px' },
    { top: '-40px', left: '50%', right: 'auto', bottom: 'auto' },
    { top: '10px', left: '10px', right: 'auto', bottom: 'auto' },
    { top: '10px', left: 'auto', right: '10px', bottom: 'auto' },
    { top: 'auto', left: '10px', right: 'auto', bottom: '10px' },
    { top: 'auto', left: 'auto', right: '10px', bottom: '10px' }
  ];
  function setSpot(m, s) { m.style.setProperty('top', s.top, 'important'); m.style.setProperty('left', s.left, 'important'); m.style.setProperty('right', s.right, 'important'); m.style.setProperty('bottom', s.bottom, 'important'); }
  function place(m) {
    if (m.classList.contains('gone') || m.__ykmDone) return;
    if (m.hasAttribute('data-ykm-fixed')) { m.classList.remove('ykm-wait'); m.__ykmDone = true; return; }   /* 사건 면이 자리를 정해 둔 표 */
    var host = m.parentElement; if (!host) return;
    var hr = host.getBoundingClientRect(); if (!hr.width || hr.bottom < 0 || hr.top > innerHeight * ratio()) return;   // 화면에 들어왓을 때만 잼
    var cs = getComputedStyle(host), clip = /hidden|clip/.test(cs.overflow + cs.overflowX + cs.overflowY);
    if (clip) {   /* 잘리는 칸이면 한두 겹 바깥 칸으로 옮겨서 위 · 아래 자리를 씀 */
      var a = host.parentElement, k = 0;
      while (a && a !== D.body && k < 4) { var ac = getComputedStyle(a); if (!/hidden|clip/.test(ac.overflow + ac.overflowX + ac.overflowY)) break; a = a.parentElement; k++; }
      var ar = a && a.getBoundingClientRect(), hr2 = host.getBoundingClientRect();
      if (a && a !== D.body && k < 4 && Math.abs(ar.top - hr2.top) < 80 && ar.height < hr2.height + 200) { if (getComputedStyle(a).position === 'static') a.style.position = 'relative'; a.appendChild(m); host = a; clip = false; }
    }
    for (var i = clip ? 5 : 0; i < SPOTS.length; i++) {
      setSpot(m, SPOTS[i]);
      if (free(m, host)) { m.classList.remove('ykm-wait'); m.__ykmDone = true; return; }
    }
    setSpot(m, SPOTS[5]); m.classList.remove('ykm-wait'); m.__ykmDone = true;   // 마땅한 자리가 업스면 장치 안쪽 왼쪽 위 (바탕이 진해서 읽힘)
  }
  function all() { Array.prototype.forEach.call(D.querySelectorAll('.bt-mark'), place); }
  function setup() {
    Array.prototype.forEach.call(D.querySelectorAll('.bt-mark'), function (m) { if (!m.__ykmDone && !m.hasAttribute('data-ykm-fixed')) m.classList.add('ykm-wait'); });
    if ('IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { var m = e.target.querySelector(':scope > .bt-mark'); if (m) setTimeout(function () { place(m); }, 1300); } }); }, { threshold: .25 });
      Array.prototype.forEach.call(D.querySelectorAll('.bt-mark'), function (m) { if (m.parentElement) io.observe(m.parentElement); });
    }
    setTimeout(all, 1500);
  }
  var rt; W.addEventListener('resize', function () { clearTimeout(rt); rt = setTimeout(function () { Array.prototype.forEach.call(D.querySelectorAll('.bt-mark'), function (m) { m.__ykmDone = false; }); all(); }, 300); });
  if (D.readyState === 'complete') setTimeout(setup, 300); else W.addEventListener('load', function () { setTimeout(setup, 300); });
})();
