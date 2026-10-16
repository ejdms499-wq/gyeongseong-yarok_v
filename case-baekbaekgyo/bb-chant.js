/* 경성야록 · 백백교 — 「주문」 (컴퓨터판 · 폰판 함께 씀)
   누르고 잇는 동안 주문이 지면을 먹어 들어감:
   · 둘레의 글자가 한 자씩 주문 소리로 바뀜 (백 · 의 · 적 · 감 · 응 · 하 · 시 · 옵 · 숭 · 성)
   · 화면 우로 주문 글자가 흘러내리며 번짐 · 오래 누르면 화면이 하얗게 덮힘
   · 손을 떼면 천천히 제 글자로 도라옴 · 번쩍임 업슴 (모든 변화는 천천히)
   폰판: #bbChant (단추 #chantBtn) · 컴퓨터판: .wh-chant 아래에 단추를 더함 */
(function (W, D) {
  'use strict';
  var box = D.getElementById('bbChant'), pc = false, btn, scope;
  if (box) { btn = D.getElementById('chantBtn'); scope = D.getElementById('c0'); }
  else {
    box = D.querySelector('.wh-chant'); if (!box) return; pc = true; scope = box.closest('section') || D.body;
    var wt = box.querySelector('.wc-t'); if (wt) wt.innerHTML = wt.textContent.trim().split(/\s+/).map(function (w) { return '<span class="bc-w">' + w + '</span>'; }).join(' ');
    btn = D.createElement('button'); btn.type = 'button'; btn.className = 'ch-hold';
    btn.innerHTML = '<b>눌러서 외시압</b><small>손을 떼면 멈추오</small><i class="ch-n"></i>'; box.appendChild(btn);
  }
  var nEl = btn.querySelector('.ch-n');
  var CH = '백백백의의의적적적감응감감응하시옵숭성', LINE = '백백백 의의의 적적적 감응감감응 하시옵숭성';
  var css = D.createElement('style');
  css.textContent =
    '.ch-hold{position:relative;z-index:2;display:inline-flex;flex-direction:column;align-items:center;gap:6px;margin-top:6px;padding:14px 22px 12px;border:1.5px solid currentColor;background:none;color:inherit;font:700 14px/1 "Noto Sans KR",sans-serif;letter-spacing:.1em;cursor:pointer;touch-action:none;user-select:none;-webkit-user-select:none;-webkit-touch-callout:none;-webkit-tap-highlight-color:transparent}' +
    '.ch-hold small{font-weight:400;font-size:11px;letter-spacing:.04em;opacity:.6}' +
    '.ch-hold .ch-n{font:900 13px/1 "Noto Serif KR",serif;font-style:normal;color:#b3261e;min-height:13px;letter-spacing:.06em}' +
    '.ch-hold.on{background:#0e0e0e;color:#fff;border-color:#0e0e0e}' +
    '.ch-fx{position:fixed;inset:0;z-index:9000;pointer-events:none;overflow:hidden;opacity:0}' +
    '.ch-fx span{position:absolute;white-space:nowrap;font-family:"Noto Serif KR",serif;font-weight:900;color:#111;will-change:transform,opacity}' +
    '.ch-wh{position:fixed;inset:0;z-index:9001;pointer-events:none;background:#fbfbf9;opacity:0}' +
    '.ch-last{position:fixed;left:0;right:0;top:46%;z-index:9002;pointer-events:none;text-align:center;font:500 13px/1 "Noto Sans KR",sans-serif;letter-spacing:.4em;color:#9a9994;opacity:0;transition:opacity 1.6s ease}' +
    '.ch-last.on{opacity:1}' +
    '.ch-eat{transition:none}' +
    (pc ? '.wh-chant{z-index:9003}' : '#bbChant{z-index:9003}');
  D.head.appendChild(css);
  var fx = D.createElement('div'); fx.className = 'ch-fx'; fx.setAttribute('aria-hidden', 'true');
  var wh = D.createElement('i'); wh.className = 'ch-wh';
  var last = D.createElement('p'); last.className = 'ch-last'; last.textContent = '흰 것만 남앗소';
  D.body.appendChild(fx); D.body.appendChild(wh); D.body.appendChild(last);
  /* 흘러내리는 주문 — 크기 · 늘어짐 · 번짐이 제각각 */
  var SP = [];
  for (var i = 0; i < 70; i++) {
    var s = D.createElement('span'), z = Math.random();
    s.textContent = LINE.slice(Math.floor(Math.random() * 10)) + ' ' + LINE;
    s.style.left = (Math.random() * 120 - 30) + '%'; s.style.top = (Math.random() * 110 - 10) + '%';
    s.style.fontSize = (11 + z * z * 70) + 'px';
    fx.appendChild(s);
    SP.push({ el: s, th: Math.random(), y: 0, v: .15 + Math.random() * .9, st: 1 + Math.random() * (z > .7 ? 4 : 1.2), b: z > .6 ? 0 : Math.random() * 2.5, r: (Math.random() - .5) * 8 });
  }
  /* 둘레 글자 — 원래 글을 기억해 두고, k 만큼 주문으로 바꿈 */
  var NODES = [];
  function collect() {
    if (NODES.length) return;
    var tw = D.createTreeWalker(scope, NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
      if (!n.nodeValue || !/[가-힣]/.test(n.nodeValue)) return 2;
      if (box.contains(n)) return 2;
      var p = n.parentNode; if (!p || /SCRIPT|STYLE/.test(p.nodeName)) return 2;
      var r = p.getBoundingClientRect(); if (r.bottom < -200 || r.top > W.innerHeight + 200) return 2;
      return 1; } });
    while (tw.nextNode()) { var t = tw.currentNode; NODES.push({ n: t, o: t.nodeValue, r: Array.prototype.map.call(t.nodeValue, function () { return Math.random(); }) }); }
  }
  var k = 0, hold = false, raf = 0, t0 = 0, cnt = 0, lastVib = 0, lastCnt = 0, words = box.querySelectorAll('.ch-t span, .wc-t .bc-w');
  function eat() {
    var q = Math.pow(k, 1.25), j = 0;
    NODES.forEach(function (o) {
      var out = '';
      for (var i = 0; i < o.o.length; i++) {
        var c = o.o[i];
        if (/[가-힣]/.test(c) && o.r[i] < q) { out += CH[(i + j) % CH.length]; } else out += c;
      }
      j += 3; if (o.n.nodeValue !== out) o.n.nodeValue = out;
    });
  }
  function frame(ts) {
    var dt = Math.min(50, ts - (t0 || ts)); t0 = ts;
    k = hold ? Math.min(1, k + dt / 7000) : Math.max(0, k - dt / 2600);
    eat();
    fx.style.opacity = Math.min(1, k * 1.6).toFixed(3);
    SP.forEach(function (s) {
      var on = k > s.th * .9; s.y += on ? s.v * (.4 + k * 2.2) * dt / 16 : 0;
      if (s.y > 160) s.y = -20;
      s.el.style.opacity = on ? Math.min(.85, (k - s.th * .9) * 3) * (.35 + s.th * .5) : 0;
      s.el.style.transform = 'translateY(' + s.y.toFixed(1) + 'px) rotate(' + s.r + 'deg) scaleY(' + (1 + (s.st - 1) * k).toFixed(2) + ')';
      s.el.style.filter = s.b ? 'blur(' + (s.b * k).toFixed(2) + 'px)' : '';
    });
    wh.style.opacity = Math.max(0, (k - .72) / .28 * .94).toFixed(3);
    last.classList.toggle('on', k > .97);
    box.style.transform = k > .25 ? 'translate(' + ((Math.random() - .5) * k * 3).toFixed(1) + 'px,' + ((Math.random() - .5) * k * 2).toFixed(1) + 'px)' : '';
    if (hold) {
      cnt += dt / 1000 * (2 + k * 26); var c = Math.floor(cnt);
      if (c !== lastCnt) { lastCnt = c; nEl.textContent = c + ' 번 외엇소'; words.forEach(function (w, i) { w.style.color = i === c % words.length ? '#b3261e' : ''; }); }
      if (navigator.vibrate && ts - lastVib > 900 - k * 760) { lastVib = ts; try { navigator.vibrate(18 + Math.round(k * 30)); } catch (e) {} }
    }
    if (hold || k > 0) raf = requestAnimationFrame(frame);
    else { raf = 0; t0 = 0; box.style.transform = ''; NODES.forEach(function (o) { o.n.nodeValue = o.o; }); NODES = []; words.forEach(function (w) { w.style.color = ''; }); nEl.textContent = cnt ? Math.floor(cnt) + ' 번 외엇소' : ''; }
  }
  function down(e) { if (e.cancelable) e.preventDefault(); collect(); hold = true; btn.classList.add('on'); btn.querySelector('b').textContent = '외는 중 —'; if (!raf) raf = requestAnimationFrame(frame); }
  function up() { if (!hold) return; hold = false; btn.classList.remove('on'); btn.querySelector('b').textContent = '눌러서 외시압'; }
  btn.addEventListener('pointerdown', down);
  ['pointerup', 'pointercancel', 'pointerleave'].forEach(function (t) { btn.addEventListener(t, up); });
  btn.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  btn.addEventListener('click', function (e) { e.stopPropagation(); });
  W.addEventListener('blur', up);
})(window, document);
