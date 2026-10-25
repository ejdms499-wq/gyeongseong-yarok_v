/* 경성야록 폰 본지 — 사회 · 경제 · 문화예술면의 「다른 긔사」 장치 (1018)
   컴퓨터판(index.html)의 여덟 장치를 폰에 맞게 옮김. 컴퓨터판은 마우스를 올리면, 폰은 누르면.
   · door   황금정 독갑이 집 — 대문을 누르면 세 번 울리고(쿵), 날이 저물고, 문틈에 빛이 서고, 쪽지 「독갑이 짓？」
   · watch  윤심덕 · 김우진 — 금시계는 지금 시각으로 감. 누르면 초침 한 번에 한 글자씩 「유서 업슴 · 목격자 업슴」
   · straps 조선은행 평양지점 — 빈 띠지. 누르면 묶여 잇든 돈다발이 잠깐 비쳣다 사라짐
   · hyun   현진건 — 누르면 「운수 좋은 날」 끝 문장이 옆에 적히고, 사진 설명이 바뀜
   · kim    김정필 — 타원 사진을 가린 신문 제목 띠. 누르면 띠가 내려가 얼골이 보임
   · abacus 반복창 — 누르면 알이 저 혼자 하나씩 오르고 한꺼번에 떨어짐. 일 년에 사십만 원 → 미두왕 → 조선호텔 혼례 → 사긔 피착 → 반신불수
   · jang   장진홍 — 1927 지면 ↔ 해금 뒤 판결 기사. 손잡이를 밀어 비교
   · belt   금관총 — 누르면 요대가 사라지고, 미궁, 반 년 뒤 희미하게 돌아오고, 범인 미상 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var calm = W.matchMedia && W.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var tone = function (k) { if (W.mb && W.mb.tone) try { W.mb.tone(k); } catch (e) {} };
  var vt = function (t) { return t.split('').map(function (c) { return c === ' ' ? '<i class="sp"></i>' : '<b>' + c + '</b>'; }).join(''); };

  var CAP = { door: '움직이는 그림 · 대문 (재현) · 누르시오', watch: '움직이는 그림 · 유류품 금시계 (재현) · 누르시오', straps: '움직이는 그림 · 빈 띠지 (재현) · 누르시오', hyun: '움직이는 사진 · 현진건 (당시 사진) · 누르시오', kim: '당시 지면 사진 · 본보 대정 십사 년 시월 이십삼일 · 누르시오', abacus: '움직이는 그림 · 주판 (재현) · 누르시오', jang: '당시 지면 · 1927 지면과 해금 뒤 판결 기사 · 밀어 보시오', belt: '움직이는 사진 · 금관총 금제 요대 (국립중앙박물관) · 누르시오' };
  var HINT = { door: '문을 눌러 보시오', watch: '시계를 눌러 보시오', straps: '띠지를 눌러 보시오', hyun: '사진을 눌러 보시오', kim: '띠를 눌러 내려 보시오', abacus: '주판을 눌러 보시오', jang: '손잡이를 밀어 보시오', belt: '요대를 눌러 보시오' };
  var BEADS = ['4.649%|5.073%', '12.808%|13.975%', '21.063%|22.982%', '29.317%|31.988%', '37.571%|40.994%', '45.825%|49.999%', '54.175%|59.110%', '62.334%|68.012%', '70.588%|77.018%', '78.748%|85.922%', '87.002%|94.927%'];

  var TPL = {
    door: '<div class="v kv" role="button" tabindex="0" aria-label="대문 (재현). 누르면 두드리는 소리가 나고 문이 세 번 울리오"><div class="gate"><img src="assets/f-door.png" alt="" draggable="false"><span class="crack" aria-hidden="true"></span></div>' +
      '<span class="kk" aria-hidden="true" style="--x:6%;--y:30%;--d:.3s">쿵</span><span class="kk" aria-hidden="true" style="--x:94%;--y:42%;--d:.9s">쿵</span><span class="kk" aria-hidden="true" style="--x:6%;--y:56%;--d:1.5s">쿵</span>' +
      '<p class="slip" aria-hidden="true" data-noko>독갑이 짓？</p></div>',
    watch: '<div class="v wv" role="button" tabindex="0" aria-label="유류품 금시계 (재현). 지금 시각으로 가오. 누르면 초침 한 번에 한 글자씩 적히오"><p class="hl" aria-hidden="true" data-noko>유류품</p>' +
      '<div class="w"><img src="assets/c-watch.png" alt="" draggable="false"><span class="hands" aria-hidden="true"><i class="h"></i><i class="m"></i><i class="s"></i><b class="pin"></b></span></div>' +
      '<div class="wl" aria-hidden="true" data-noko><p>' + vt('유서 업슴') + '</p><p>' + vt('목격자 업슴') + '</p></div></div>',
    straps: '<div class="v sv" role="button" tabindex="0" aria-label="빈 띠지 (재현). 누르면 묶여 잇든 돈다발이 잠깐 비치오"><div class="ph"><img class="now" src="assets/f-straps-empty.png" alt="" draggable="false"><img class="was" src="assets/f-straps-full.png" alt="" draggable="false"></div>' +
      '<p class="sub" aria-hidden="true" data-noko><span class="a">띠지만 남엇다</span><span class="b">칠십팔만 원</span><span class="c">행방 불명</span></p></div>',
    hyun: '<div class="v pv" role="button" tabindex="0" aria-label="현진건 (당시 사진). 누르면 소설의 끝 문장이 옆에 적히오"><div class="pr"><span class="ph"></span></div>' +
      '<p class="q" aria-hidden="true" data-noko>설렁탕을 사다 놓았는데<br>왜 먹지를 못하니</p><p class="pc" aria-hidden="true" data-noko><span class="a">사회부장 현진건</span><span class="b">1936 · 일장기 사건으로 피검</span></p></div>',
    kim: '<div class="v kmv" role="button" tabindex="0" aria-label="김정필 (당시 지면 사진). 누르면 얼골을 가린 신문 띠가 내려가오"><div class="print"><div class="ph"></div>' +
      '<svg class="oframe" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true"><ellipse cx="50" cy="50" rx="48.6" ry="48.9" fill="none" stroke="#dcdbd6" stroke-width=".5"/><ellipse cx="50" cy="50" rx="46.4" ry="47.1" fill="none" stroke="#dcdbd6" stroke-width="1.3"/></svg></div>' +
      '<div class="band" aria-hidden="true" data-noko><b>本夫毒殺 美人,</b><b class="s">死刑 不服</b><small>동아일보 · 대정 십삼 년 칠월 십칠일</small></div></div>',
    abacus: '<div class="v av" role="button" tabindex="0" aria-label="주판 (재현). 누르면 알이 저 혼자 오르고 한꺼번에 떨어지오"><div class="ph"><img src="assets/f-abacus-empty.png" alt="" draggable="false">' +
      BEADS.map(function (b) { var p = b.split('|'); return '<i style="--l:' + p[0] + ';--bx:' + p[1] + '"></i>'; }).join('') + '</div><p class="sub" aria-hidden="true" data-noko><span>　</span></p></div>',
    jang: '<div class="v jv" style="--x:78%" aria-label="1927년 지면과 해금 뒤 판결 기사 비교. 손잡이를 좌우로 미시오"><div class="pg after"><div class="img"></div><em data-noko>해금 후 · 본보 판결 보도</em></div>' +
      '<div class="pg before"><div class="img"></div><p class="note" data-noko>「大邱 某事件 突發」<small>사건의 일홈조차 쓰지 못하얏더라</small></p><em data-noko>소화 이 년 시월 · 본보</em></div>' +
      '<div class="handle" role="slider" aria-valuemin="0" aria-valuemax="100" aria-valuenow="78" tabindex="0"><i></i><b data-noko>2년 2개월</b></div></div>',
    belt: '<div class="v bv" role="button" tabindex="0" aria-label="금관총 금제 요대 (국립중앙박물관). 누르면 요대가 사라졋다 희미하게 돌아오오"><div class="obj"><img src="assets/c-belt-obj.png" alt="" draggable="false"></div>' +
      '<p class="sub" aria-hidden="true" data-noko><span>순금 요대</span></p></div>'
  };

  /* 짧은 소리 — 대문 두드림 · 문고리 */
  var ctx = null;
  function ac() { if (!ctx) { var AC = W.AudioContext || W.webkitAudioContext; if (!AC) return null; try { ctx = new AC(); } catch (e) { return null; } } if (ctx.state === 'suspended') try { ctx.resume(); } catch (e) {} return ctx; }
  function knock() {
    var c = ac(); if (!c) return; var t = c.currentTime, o = c.createOscillator(), g = c.createGain(); o.type = 'sine';
    o.frequency.setValueAtTime(150, t); o.frequency.exponentialRampToValueAtTime(55, t + .18);
    g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.7, t + .004); g.gain.exponentialRampToValueAtTime(.0001, t + .26);
    o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + .3);
    var len = Math.floor(c.sampleRate * .06), buf = c.createBuffer(1, len, c.sampleRate), d = buf.getChannelData(0);
    for (var i = 0; i < len; i++) d[i] = (Math.random() * 2 - 1) * Math.pow(1 - i / len, 3);
    var n = c.createBufferSource(), f = c.createBiquadFilter(), ng = c.createGain(); n.buffer = buf; f.type = 'lowpass'; f.frequency.value = 900; ng.gain.value = .4;
    n.connect(f); f.connect(ng); ng.connect(c.destination); n.start(t);
  }
  function clink() {
    var c = ac(); if (!c) return; var t0 = c.currentTime;
    [0, .11, .19, .34].forEach(function (dt, k) { var t = t0 + dt; [1870, 2930, 4410].forEach(function (fq) { var o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.value = fq * (1 + k * .01);
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.08, t + .003); g.gain.exponentialRampToValueAtTime(.0001, t + .22); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + .25); }); });
  }
  var muted = function () { return !!(W.mb && W.mb.muted && W.mb.muted()); };

  function stageOf(v) { return v.closest('.mm-stg'); }
  function touched(v) { var st = stageOf(v); if (st) st.classList.add('tap'); }
  function timers() { var T = []; return { add: function (fn, ms) { T.push(setTimeout(fn, ms)); }, clear: function () { T.forEach(clearTimeout); T = []; } }; }

  var INIT = {
    door: function (v) {
      var T = timers();
      v.addEventListener('click', function () {
        touched(v); T.clear(); v.classList.remove('run'); void v.offsetWidth; buzz([14, 50, 14]);
        T.add(function () { v.classList.add('run'); if (!muted() && !calm) { [300, 900, 1500].forEach(function (ms) { T.add(knock, ms); }); T.add(clink, 2300); } }, 60);
      });
    },
    watch: function (v) {
      var H = $('.h', v), M = $('.m', v), S = $('.s', v), chars = $$('.wl b', v), k = -1;
      function tick() { var d = new Date(), s = d.getSeconds(), m = d.getMinutes() + s / 60, h = (d.getHours() % 12) + m / 60;
        S.style.setProperty('--a', s * 6 + 'deg'); M.style.setProperty('--a', m * 6 + 'deg'); H.style.setProperty('--a', h * 30 + 'deg');
        if (k >= 0 && k < chars.length) { chars[k].classList.add('on'); k++; } }
      tick(); setTimeout(function () { tick(); setInterval(tick, 1000); }, 1000 - new Date().getMilliseconds());
      v.addEventListener('click', function () {
        touched(v); buzz(10); tone('tick');
        if (v.classList.contains('run')) { v.classList.remove('run'); k = -1; chars.forEach(function (c) { c.classList.remove('on'); }); return; }
        v.classList.add('run'); k = 0; if (calm) chars.forEach(function (c) { c.classList.add('on'); });
      });
    },
    straps: function (v) {
      v.addEventListener('click', function () { touched(v); buzz(10); v.classList.remove('run'); void v.offsetWidth; v.classList.add('run'); tone('tick'); });
    },
    hyun: function (v) {
      v.addEventListener('click', function () { touched(v); buzz(10); tone('tick'); if (v.classList.contains('run')) { v.classList.remove('run'); return; } v.classList.add('run'); });
    },
    kim: function (v) {
      v.addEventListener('click', function () { touched(v); buzz([10, 40, 10]); tone('stamp'); v.classList.toggle('run'); });
    },
    abacus: function (v) {
      var beads = $$('.ph i', v).reverse(), sub = $('.sub span', v), T = timers();
      function say(t) { sub.style.opacity = 0; T.add(function () { sub.textContent = t; sub.style.opacity = 1; }, 250); }
      function run() {
        T.clear(); v.classList.remove('dim'); beads.forEach(function (b) { b.classList.remove('up', 'fall'); });
        if (calm) { sub.textContent = '반신불수'; v.classList.add('dim'); return; }
        say('일 년에 사십만 원');
        beads.forEach(function (b, k) { T.add(function () { b.classList.add('up'); if (!muted()) tone('type'); }, 400 + k * 190); });
        var top = 400 + beads.length * 190;
        T.add(function () { say('미두왕'); }, top + 200);
        T.add(function () { say('조선호텔 혼례'); }, top + 1400);
        T.add(function () { beads.forEach(function (b) { b.classList.add('fall'); b.classList.remove('up'); }); say('사긔 피착'); buzz([20, 30, 20]); }, top + 2700);
        T.add(function () { v.classList.add('dim'); say('반신불수'); }, top + 4200);
      }
      v.addEventListener('click', function () { touched(v); buzz(10); run(); });
    },
    jang: function (v) {
      var h = $('.handle', v), drag = false, moved = false, sx = 0, T = timers(), anim = 0;
      function set(x) { x = Math.max(4, Math.min(96, x)); v.style.setProperty('--x', x + '%'); h.setAttribute('aria-valuenow', Math.round(x)); }
      function at(e) { var r = v.getBoundingClientRect(); set((e.clientX - r.left) / r.width * 100); }
      function sweep() { cancelAnimationFrame(anim); var t0 = performance.now(), from = parseFloat(getComputedStyle(v).getPropertyValue('--x')) || 78;
        (function f(t) { var k = Math.min(1, (t - t0) / 2600), e = .5 - .5 * Math.cos(k * Math.PI * 2); set(from + (8 - from) * e); if (k < 1) anim = requestAnimationFrame(f); })(t0); }
      v.addEventListener('pointerdown', function (e) { drag = true; moved = false; sx = e.clientX; cancelAnimationFrame(anim); try { v.setPointerCapture(e.pointerId); } catch (x) {} touched(v); });
      v.addEventListener('pointermove', function (e) { if (!drag) return; if (Math.abs(e.clientX - sx) > 4) moved = true; if (moved) { at(e); if (e.cancelable) e.preventDefault(); } });
      function up() { if (!drag) return; drag = false; if (!moved) { buzz(10); sweep(); } }
      v.addEventListener('pointerup', up); v.addEventListener('pointercancel', up);
      h.addEventListener('keydown', function (e) { var c = parseFloat(getComputedStyle(v).getPropertyValue('--x')) || 78; if (e.key === 'ArrowLeft') set(c - 5); if (e.key === 'ArrowRight') set(c + 5); });
    },
    belt: function (v) {
      var sub = $('.sub span', v), T = timers();
      function say(t) { sub.style.opacity = 0; T.add(function () { sub.textContent = t; sub.style.opacity = 1; }, 300); }
      v.addEventListener('click', function () {
        touched(v); buzz(10); T.clear(); v.classList.remove('gone', 'back'); sub.style.opacity = 1; sub.textContent = '순금 요대';
        if (calm) { v.classList.add('back'); sub.textContent = '범인 미상'; return; }
        T.add(function () { v.classList.add('gone'); say('감쪽가치 업서젓다'); tone('tick'); }, 300);
        T.add(function () { say('미궁'); }, 2600);
        T.add(function () { v.classList.remove('gone'); v.classList.add('back'); say('반 년 뒤 서장집 문전'); }, 4200);
        T.add(function () { say('범인 미상'); }, 6800);
      });
    }
  };

  function build(el) {
    if (el._b) return; el._b = 1; var k = el.dataset.k; if (!TPL[k]) return;
    el.innerHTML = TPL[k]; var v = el.firstElementChild;
    if (INIT[k]) INIT[k](v, el);
    v.addEventListener('keydown', function (e) { if ((e.key === 'Enter' || e.key === ' ') && e.target === v) { e.preventDefault(); v.click(); } });
  }
  W.mmAlts = function (root) { $$('.mav[data-k]', root || D).forEach(build); };
  W.mmAltCap = function (k) { return CAP[k] || ''; };
  W.mmAltHint = function (k) { return HINT[k] || '눌러 보시오'; };
  W.mmAlts();
})(window, document);
