/* 경성야록 · 백백교 컴퓨터판 — 신도들의 주문을 소리로 (음성 · 재현)
   서장 「신도들이 외든 주문」 아래에 단추 하나를 더함 · 기존 코드는 건드리지 않음 */
(function (W, D) {
  'use strict';
  var box = D.querySelector('.wh-chant'), t = box && box.querySelector('.wc-t'); if (!t) return;
  var WORDS = t.textContent.trim().split(/\s+/);
  t.innerHTML = WORDS.map(function (w) { return '<span class="bc-w">' + w + '</span>'; }).join(' ');
  var st = D.createElement('style');
  st.textContent = '.wh-chant{position:relative}.bc-btn{display:inline-flex;align-items:center;gap:10px;margin-top:14px;padding:10px 16px;border:1px solid currentColor;background:none;color:inherit;font:700 13px/1 "Noto Sans KR",sans-serif;letter-spacing:.08em;cursor:pointer}' +
    '.bc-btn i{width:0;height:0;border-left:10px solid #b3261e;border-top:6px solid transparent;border-bottom:6px solid transparent}.bc-btn small{font-weight:400;opacity:.6;letter-spacing:0}' +
    '.bc-cap{margin-top:8px;font:400 11px/1.5 "Noto Sans KR",sans-serif;opacity:.55}' +
    '.wh-chant.bc-on .wc-t .bc-w{transition:color .2s,opacity .2s;opacity:.25}.wh-chant.bc-on .wc-t .bc-w.on{opacity:1;color:#b3261e}' +
    '.wh-chant.bc-r3 .wc-t{animation:bcShake .1s steps(2) infinite}@keyframes bcShake{50%{transform:translate(1.5px,-1px)}}' +
    '.wh-chant.bc-on{z-index:9991}.bc-veil{position:fixed;inset:0;z-index:9990;pointer-events:none;background:#000;opacity:0;transition:opacity 1.2s ease}.bc-veil.on{opacity:.55}.bc-veil.r4{opacity:.8}';
  D.head.appendChild(st);
  var b = D.createElement('button'); b.type = 'button'; b.className = 'bc-btn'; b.innerHTML = '<i></i><b>주문 듯기</b><small>소리가 나오오</small>';
  var cap = D.createElement('p'); cap.className = 'bc-cap'; cap.textContent = '음성 · 재현 — 실제 신도의 목소리가 아니오.';
  box.appendChild(b); box.appendChild(cap);
  var veil = D.createElement('i'); veil.className = 'bc-veil'; D.body.appendChild(veil);
  var RD = [[0, 9.4], [8.6, 7.2], [15.2, 5.6], [20.2, 4.8]], au = null, raf = 0, bgWas = false;
  var sp = Array.prototype.slice.call(t.querySelectorAll('.bc-w'));
  function stop() {
    cancelAnimationFrame(raf); box.classList.remove('bc-on', 'bc-r3'); veil.classList.remove('on', 'r4'); sp.forEach(function (s) { s.classList.remove('on'); });
    b.querySelector('b').textContent = '주문 듯기';
    var bg = D.getElementById('bgm'); if (bgWas && bg) bg.play().catch(function () {}); bgWas = false;
  }
  function tick() {
    if (!au || au.paused) return;
    var c = au.currentTime, r = -1; RD.forEach(function (x, i) { if (c >= x[0]) r = i; });
    if (r >= 0) { var k = Math.floor((c - RD[r][0]) / RD[r][1] * WORDS.length); sp.forEach(function (s, i) { s.classList.toggle('on', i === k); }); }
    box.classList.toggle('bc-r3', r >= 2 && c < 25); veil.classList.toggle('r4', r >= 3);
    raf = requestAnimationFrame(tick);
  }
  b.addEventListener('click', function (e) {
    e.stopPropagation();
    if (!au) { au = new Audio('../case/audio/baekbaekgyo/bb_chant.mp3'); au.addEventListener('ended', stop); }
    if (!au.paused) { au.pause(); stop(); return; }
    var bg = D.getElementById('bgm'); if (bg && !bg.paused) { bgWas = true; bg.pause(); }
    au.currentTime = 0; var p = au.play(); if (p && p.catch) p.catch(function () {});
    box.classList.add('bc-on'); veil.classList.add('on'); b.querySelector('b').textContent = '멈추기'; raf = requestAnimationFrame(tick);
  });
})(window, document);
