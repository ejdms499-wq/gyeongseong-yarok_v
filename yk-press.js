/* ════════════════════════════════════════════════════════════════
   경성야록 · 記者證 (yk-press.js) — 취재 도장을 다 모으면 받는 기자증
   - 사건 페이지의 「취재 도장」(.notebook)이 다 차면(.done) → 수첩에 「取材 完了」 도장 + 기자증 한 장
   - 기자증은 네 칸(죽첨정 · 마리아 · 손기정 · 백백교) — 채운 칸 수에 따라 견습 긔자 → 긔자 → 특파원
   - 네 칸을 다 채우면 「편집국 출입 허가」 (newsroom.html 의 입구에서 기자증을 내보이면 들어감)
   - 기자증은 그림(canvas)으로 그려서 그대로 「간직하기」(PNG 저장)
   - 기록은 localStorage 'yk-press' (경성야록의 다른 기록처럼 창을 새로 열면 처음부터)
   - 그림 자리(업서도 됨): assets/press/photo.jpg (사진 칸) · assets/press/card.jpg (종이 결 · 업스면 assets/mission/paper.jpg)
   ════════════════════════════════════════════════════════════════ */
(function (W, D) {
  'use strict';
  if (W.ykPress) return;
  var KEY = 'yk-press', NAMEK = 'yk-press-name';
  var CASES = [
    { k: 'jk', n: '죽첨정', hj: '竹添町', y: 1933 },
    { k: 'maria', n: '마리아', hj: '釜山', y: 1931 },
    { k: 'sk', n: '손기정', hj: '孫基禎', y: 1936 },
    { k: 'bb', n: '백백교', hj: '白白敎', y: 1937 }
  ];
  var RANK = ['', '見習 記者', '記者', '記者', '特派員'], RANKKO = ['', '견습 긔자', '긔자', '긔자', '특파원'];
  var BASE = (function () { try { var c = D.currentScript && D.currentScript.src; return c ? c.replace(/yk-press\.js.*$/, '') : ''; } catch (e) { return ''; } })();
  var CASE = (D.currentScript && D.currentScript.getAttribute('data-case')) || '';
  function get() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } }
  function put(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }
  function count() { var o = get(); return CASES.filter(function (c) { return o[c.k]; }).length; }
  function name() {
    try { var n = localStorage.getItem(NAMEK); if (n) return n; } catch (e) {}
    try { var u = W.ykAuth && W.ykAuth.user && W.ykAuth.user(); if (u && u.nickname) return u.nickname; } catch (e) {}
    return '';
  }
  function setName(n) { try { if (n) localStorage.setItem(NAMEK, n); else localStorage.removeItem(NAMEK); } catch (e) {} }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function T(t) { t = String(t); var m = W.ykKo ? W.ykKo(t) : t; return m === t ? esc(t) : '<span class="hj" tabindex="0" data-ko="' + esc(m) + '">' + esc(t) + '</span>'; }
  function img(src) { return new Promise(function (ok) { var i = new Image(); i.onload = function () { ok(i); }; i.onerror = function () { ok(null); }; i.src = src; }); }
  /* 사진 칸 — 고를 수 잇는 사진들 (그림 재현) + 그림자 + 「내 사진」(이 기기 안에서만 옛 사진처럼 바꿈) */
  var PICS = [['photo.jpg', '중절모'], ['photo2.jpg', '외투'], ['photo3.jpg', '골목'], ['photo4.jpg', '뒷모습'], ['photo5.jpg', '모던걸'], ['photo6.jpg', '사진기'], ['photo7.jpg', '빗속'], ['photo8.jpg', '취재 수첩'], ['cat.jpg', '수배 고양이']];
  var PICK = 'yk-press-pic', MINE = 'yk-press-mine';
  var IMGS = {}, PHOTO = null, PKIND = 'ai', CARD = null, LOGO = null, loaded = null;
  function pickGet() { try { return localStorage.getItem(PICK) || 'photo.jpg'; } catch (e) { return 'photo.jpg'; } }
  function pickSet(v) { try { localStorage.setItem(PICK, v); } catch (e) {} }
  function usePick() {
    var k = pickGet();
    if (k === 'none') { PHOTO = null; PKIND = 'none'; return; }
    if (k === 'mine') { PHOTO = IMGS.mine || null; PKIND = PHOTO ? 'mine' : 'none'; if (PHOTO) return; k = 'photo.jpg'; }
    PHOTO = IMGS[k] || IMGS['photo.jpg'] || null; PKIND = PHOTO ? 'ai' : 'none';
  }
  /* 그림은 yk-press-img.js 의 data URL 로 불러옴 — 파일을 바로 연 경우(file://)에도 저장 · 공유가 막히지 않게 */
  var dataReady = null;
  function loadData() {
    if (!dataReady) dataReady = new Promise(function (ok) {
      if (W.YK_PRESS_IMG) return ok();
      var s = D.createElement('script'); s.src = BASE + 'yk-press-img.js?v=1'; s.onload = function () { ok(); }; s.onerror = function () { ok(); }; D.head.appendChild(s);
    });
    return dataReady;
  }
  function src(name, path) { var d = W.YK_PRESS_IMG && W.YK_PRESS_IMG[name]; return d || (/^https?:/.test(location.protocol) ? BASE + path : null); }
  function imgOr(name, path) { var u = src(name, path); return u ? img(u) : Promise.resolve(null); }
  function load() {
    if (!loaded) {
      var mine = null; try { mine = localStorage.getItem(MINE); } catch (e) {}
      loaded = loadData().then(function () { return Promise.all(PICS.map(function (p) { return imgOr(p[0], 'assets/press/' + p[0]).then(function (i) { if (i) IMGS[p[0]] = i; }); }).concat([
        mine ? img(mine).then(function (i) { if (i) IMGS.mine = i; }) : null,
        imgOr('paper', 'assets/mission/paper.jpg').then(function (i) { CARD = i; }),
        imgOr('logo_white.png', 'assets/press/logo_white.png').then(function (i) { LOGO = i; }),
        D.fonts && D.fonts.ready ? D.fonts.ready.catch(function () {}) : null])); }).then(usePick);
    }
    return loaded;
  }
  /* 내 사진 → 1930년대 사진처럼 (흑백 · 세피아 · 거친 입자 · 가장자리 어둡게) */
  function oldPhoto(file) {
    return new Promise(function (ok, no) {
      var rd = new FileReader(); rd.onerror = no;
      rd.onload = function () { img(rd.result).then(function (src) {
        if (!src) return no();
        var w = 480, h = 600, c = D.createElement('canvas'); c.width = w; c.height = h; var x = c.getContext('2d');
        var r = Math.max(w / src.width, h / src.height), iw = src.width * r, ih = src.height * r;
        x.filter = 'grayscale(1) contrast(1.18) brightness(1.02)'; x.drawImage(src, (w - iw) / 2, (h - ih) / 2, iw, ih); x.filter = 'none';
        var d = x.getImageData(0, 0, w, h), a = d.data, sd = 3; var rnd = function () { sd = (sd * 16807) % 2147483647; return sd / 2147483647; };
        for (var i = 0; i < a.length; i += 4) { var v = a[i] + (rnd() - .5) * 26; a[i] = Math.min(255, v * 1.07 + 10); a[i + 1] = Math.min(255, v * .93 + 4); a[i + 2] = Math.min(255, v * .74); }
        x.putImageData(d, 0, 0);
        var g = x.createRadialGradient(w / 2, h / 2, h * .25, w / 2, h / 2, h * .75); g.addColorStop(0, 'rgba(0,0,0,0)'); g.addColorStop(1, 'rgba(30,18,8,.55)'); x.fillStyle = g; x.fillRect(0, 0, w, h);
        x.strokeStyle = 'rgba(255,240,215,.08)'; for (var k = 0; k < 14; k++) { x.beginPath(); var sx = rnd() * w; x.moveTo(sx, 0); x.lineTo(sx + (rnd() - .5) * 30, h); x.stroke(); }
        ok(c.toDataURL('image/jpeg', .86));
      }); };
      rd.readAsDataURL(file);
    });
  }

  function css() {
    if (D.getElementById('ykp-css')) return;
    var s = D.createElement('style'); s.id = 'ykp-css';
    s.textContent = [
      '.ykp-seal{position:absolute;left:-58px;top:50%;z-index:5;display:grid;place-items:center;width:96px;height:96px;margin:-48px 0 0 -48px;border:3px double #b0261b;border-radius:50%;color:#b0261b;background:rgba(239,230,210,.92);font:900 17px/1.15 "Noto Serif KR",serif;text-align:center;letter-spacing:.06em;transform:rotate(-14deg);pointer-events:none;animation:ykpS .55s cubic-bezier(.2,1.5,.4,1) both}',
      '@keyframes ykpS{from{opacity:0;transform:rotate(-14deg) scale(1.8)}to{opacity:1;transform:rotate(-14deg) scale(1)}}',
      '.ykp-open{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;justify-content:center;gap:8px;width:100%;padding:8px 10px;background:#1e1913;color:#efe6d2;font:700 12.5px/1 "Nanum Myeongjo","Noto Serif KR",serif;letter-spacing:.2em}',
      '.ykp-open i{font-style:normal;padding:2px 4px;border:1px solid #c9493a;color:#e6a093;font-size:10.5px;letter-spacing:.1em}',
      '.ykp-open:hover,.ykp-open:focus-visible{background:#8a2a21}',
      '.ykp-veil{position:fixed;inset:0;z-index:100002;display:grid;place-items:center;padding:16px;background:rgba(12,9,7,.78);opacity:0;transition:opacity .35s}',
      '.ykp-veil.on{opacity:1}',
      '.ykp-box{position:relative;width:min(760px,100%);max-height:calc(100vh / var(--ykz, 1) - 32px);overflow:auto;padding:22px 22px 18px;background:#1a1410;color:#efe6d2;box-shadow:0 30px 80px rgba(0,0,0,.6);font-family:"Noto Sans KR",sans-serif;transform:translateY(10px);transition:transform .45s cubic-bezier(.2,.7,.2,1)}',
      '.ykp-veil.on .ykp-box{transform:none}',
      '.ykp-k{padding-right:34px;display:flex;justify-content:space-between;gap:10px;align-items:baseline;font:500 11px/1 "Noto Sans KR",sans-serif;letter-spacing:.4em;color:#e6a093}',
      '.ykp-box h3{margin:10px 0 4px;font:800 20px/1.45 "Nanum Myeongjo","Noto Serif KR",serif;word-break:keep-all}',
      '.ykp-box .s{font-size:13px;line-height:1.7;color:rgba(239,230,210,.7);word-break:keep-all}',
      '.ykp-cv{display:block;width:100%;height:auto;margin-top:14px;filter:drop-shadow(0 18px 30px rgba(0,0,0,.6));transform:rotate(-.6deg)}',
      '.ykp-row{display:flex;flex-wrap:wrap;align-items:center;gap:10px;margin-top:16px}',
      '.ykp-row label{display:flex;align-items:center;gap:8px;flex:1;min-width:220px;font:700 12.5px/1 "Nanum Myeongjo",serif;letter-spacing:.14em;color:#e6a093}',
      '.ykp-row input{flex:1;min-width:0;padding:8px 6px;background:transparent;border:0;border-bottom:1.5px solid #efe6d2;color:#efe6d2;font:700 16px/1.3 "Nanum Myeongjo",serif;outline:0}',
      '.ykp-row input:focus{border-color:#e6a093}',
      '.ykp-b{all:unset;cursor:pointer;padding:10px 16px;border:1px solid rgba(239,230,210,.55);font:700 13px/1 "Noto Sans KR",sans-serif;letter-spacing:.04em;text-align:center}',
      '.ykp-b:hover,.ykp-b:focus-visible{background:rgba(239,230,210,.1)}',
      '.ykp-b.main{background:#b0261b;border-color:#b0261b;color:#fff}.ykp-b.main:hover{background:#8a2a21}',
      '.ykp-x{all:unset;position:absolute;right:14px;top:10px;cursor:pointer;font-size:24px;color:rgba(239,230,210,.6)}',
      '.ykp-steps{display:grid;gap:14px;margin-top:18px}',
      '.ykp-st{display:grid;grid-template-columns:110px 1fr;gap:6px 14px;align-items:center}',
      '.ykp-st>b{font:800 13px/1.3 "Nanum Myeongjo","Noto Serif KR",serif;letter-spacing:.12em;color:#e6a093}',
      '.ykp-st>small{grid-column:2;font:400 11.5px/1.5 "Noto Sans KR",sans-serif;color:rgba(239,230,210,.55)}',
      '.ykp-name{width:100%;box-sizing:border-box;padding:10px 12px;background:#efe6d2;border:0;border-bottom:3px solid #b0261b;color:#15110d;font:800 20px/1.2 "Nanum Myeongjo","Noto Serif KR",serif;outline:0}',
      '.ykp-name:focus{box-shadow:0 0 0 2px #e6a093}',
      '.ykp-pics{display:flex;flex-wrap:wrap;gap:8px}.ykp-pic[hidden]{display:none!important}',
      '.ykp-pic{all:unset;box-sizing:border-box;cursor:pointer;position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;width:64px}',
      '.ykp-pic img,.ykp-pic i{display:grid;place-items:center;width:64px;height:80px;object-fit:cover;border:2px solid rgba(201,164,92,.35);background:#2b231b;color:#c9a45c;font-style:normal;font-size:24px;filter:sepia(.4);transition:border-color .2s,transform .2s}',
      '.ykp-pic.none i{background:radial-gradient(circle at 50% 38%,#4a3d30 0 14px,transparent 15px),radial-gradient(ellipse 26px 30px at 50% 100%,#4a3d30 98%,transparent),#2b231b}',
      '.ykp-pic span{font:500 10.5px/1 "Noto Sans KR",sans-serif;color:rgba(239,230,210,.7);white-space:nowrap}',
      '.ykp-pic:hover img,.ykp-pic:hover i,.ykp-pic:focus-visible img{transform:translateY(-2px);border-color:#c9a45c}',
      '.ykp-pic.on img,.ykp-pic.on i{border-color:#e6a093;box-shadow:0 0 0 2px #b0261b}',
      '.ykp-pic.on span{color:#e6a093;font-weight:700}',
      '.ykp-pic.up input{position:absolute;width:1px;height:1px;opacity:0}',
      '.ykp-pic.up i{border-style:dashed}',
      '.ykp-pic.up:focus-within i{border-color:#e6a093}',
      '.ykp-sh{display:flex;flex-wrap:wrap;gap:8px}',
      '.ykp-s{all:unset;box-sizing:border-box;cursor:pointer;display:inline-flex;align-items:center;gap:7px;padding:9px 13px;border:1px solid rgba(239,230,210,.4);font:700 12.5px/1 "Noto Sans KR",sans-serif;color:#efe6d2;transition:background .2s,border-color .2s}',
      '.ykp-s i{font-style:normal;display:grid;place-items:center;width:20px;height:20px;border-radius:50%;background:rgba(239,230,210,.12);font-size:11px;font-weight:800}',
      '.ykp-s:hover,.ykp-s:focus-visible{background:rgba(239,230,210,.1);border-color:#efe6d2}',
      '.ykp-s.main{background:#b0261b;border-color:#b0261b}.ykp-s.main:hover{background:#8a2a21}',
      '.ykp-s[data-a="kakao"] i{background:#fee500;color:#3a1d1d}',
      '.ykp-msg{min-height:1.4em;margin-top:10px;font:500 13px/1.6 "Noto Sans KR",sans-serif;color:#e6a093;opacity:0;transition:opacity .3s}.ykp-msg.on{opacity:1}',
      '@media (max-width:600px){.ykp-st{grid-template-columns:1fr}.ykp-st>small{grid-column:1}}',
      '.ykp-gate{margin-top:14px;padding:12px 14px;border:1.5px solid #e6a093;font:400 13.5px/1.7 "Noto Sans KR",sans-serif;word-break:keep-all}',
      '.ykp-gate b{color:#e6a093;font-family:"Noto Serif KR",serif;margin-right:6px}',
      '.ykp-gate a{color:#efe6d2;margin-left:6px}'
    ].join('\n');
    D.head.appendChild(s);
  }

  /* ── 기자증 그리기 (860 × 540) ── */
  function today() { var d = new Date(); return d.getFullYear() + '년 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일'; }
  function serial(n) { var h = 0; String(n || '무명').split('').forEach(function (c) { h = (h * 31 + c.charCodeAt(0)) % 9000; }); return 1000 + h; }
  function draw(cv, nm) {
    var o = get(), n = count(), x = cv.getContext('2d'), Wd = 860, Ht = 540, s = 2;
    cv.width = Wd * s; cv.height = Ht * s; x.setTransform(s, 0, 0, s, 0, 0);
    var INK = '#15110d', GOLD = '#c9a45c', GOLD2 = '#8f7238', RED = '#a8291d', PAPER = '#ece2cb';
    var MY = '"Nanum Myeongjo","Noto Serif KR",serif', SE = '"Noto Serif KR","Nanum Myeongjo",serif', SA = '"Noto Sans KR",sans-serif';
    function rr(X, Y, w, h, r) { x.beginPath(); x.moveTo(X + r, Y); x.arcTo(X + w, Y, X + w, Y + h, r); x.arcTo(X + w, Y + h, X, Y + h, r); x.arcTo(X, Y + h, X, Y, r); x.arcTo(X, Y, X + w, Y, r); x.closePath(); }
    function spaced(t, X, Y, sp) { var w = 0, i; for (i = 0; i < t.length; i++) w += x.measureText(t[i]).width + (i < t.length - 1 ? sp : 0); var a = x.textAlign, sx = a === 'center' ? X - w / 2 : a === 'right' ? X - w : X; x.textAlign = 'left'; for (i = 0; i < t.length; i++) { x.fillText(t[i], sx, Y); sx += x.measureText(t[i]).width + sp; } x.textAlign = a; }
    function arcText(t, cx, cy, r, start, sp) { x.save(); x.translate(cx, cy); var ang = start; for (var i = 0; i < t.length; i++) { x.save(); x.rotate(ang); x.fillText(t[i], 0, -r); x.restore(); ang += sp; } x.restore(); }
    /* 카드 몸통 — 먹색 가죽 */
    x.clearRect(0, 0, Wd, Ht); rr(4, 4, Wd - 8, Ht - 8, 22); x.save(); x.clip();
    var bg = x.createLinearGradient(0, 0, Wd, Ht); bg.addColorStop(0, '#231b14'); bg.addColorStop(1, '#0e0b08'); x.fillStyle = bg; x.fillRect(0, 0, Wd, Ht);
    var sd = 7; var rnd = function () { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }; for (var k = 0; k < 2600; k++) { x.fillStyle = 'rgba(255,240,210,' + (rnd() * .035) + ')'; x.fillRect(rnd() * Wd, rnd() * Ht, 1, 1); }
    /* 오른쪽 종이 */
    var PX = 292, PY = 26, PW = Wd - PX - 26, PH = Ht - 52;
    x.fillStyle = PAPER; x.fillRect(PX, PY, PW, PH);
    if (CARD) { x.globalAlpha = .6; x.drawImage(CARD, PX, PY, PW, PH); x.globalAlpha = 1; }
    var pg = x.createRadialGradient(PX + PW / 2, PY + PH / 2, 60, PX + PW / 2, PY + PH / 2, 420); pg.addColorStop(0, 'rgba(255,250,236,.2)'); pg.addColorStop(1, 'rgba(110,80,40,.22)'); x.fillStyle = pg; x.fillRect(PX, PY, PW, PH);
    x.strokeStyle = INK; x.lineWidth = 2; x.strokeRect(PX + 10, PY + 10, PW - 20, PH - 20); x.lineWidth = .8; x.strokeRect(PX + 15, PY + 15, PW - 30, PH - 30);
    /* 목걸이 구멍 */
    rr(Wd / 2 - 40, 11, 80, 10, 5); x.fillStyle = '#050403'; x.fill(); x.strokeStyle = 'rgba(201,164,92,.5)'; x.lineWidth = 1; x.stroke();
    /* 왼쪽 — 금박 */
    x.textBaseline = 'alphabetic'; x.fillStyle = GOLD; x.font = '700 13px ' + MY; x.textAlign = 'center'; spaced('경성야록사', 158, 58, 7);
    x.strokeStyle = GOLD2; x.lineWidth = 1; x.beginPath(); x.moveTo(58, 70); x.lineTo(258, 70); x.stroke();
    var phx = 58, phy = 88, phw = 200, phh = 252;
    x.strokeStyle = GOLD; x.lineWidth = 1.5; x.strokeRect(phx - 7, phy - 7, phw + 14, phh + 14); x.lineWidth = .7; x.strokeRect(phx - 3, phy - 3, phw + 6, phh + 6);
    x.fillStyle = '#2b231b'; x.fillRect(phx, phy, phw, phh);
    if (PHOTO) { var r = Math.max(phw / PHOTO.width, phh / PHOTO.height), iw = PHOTO.width * r, ih = PHOTO.height * r; x.save(); x.beginPath(); x.rect(phx, phy, phw, phh); x.clip(); x.filter = PKIND === 'mine' ? 'none' : 'sepia(.45) contrast(1.08) brightness(.95)'; x.drawImage(PHOTO, phx + (phw - iw) / 2, phy + (phh - ih) / 2 + 6, iw, ih); x.restore(); x.filter = 'none'; }
    else { x.fillStyle = '#4a3d30'; x.beginPath(); x.arc(phx + phw / 2, phy + 100, 42, 0, Math.PI * 2); x.fill(); x.beginPath(); x.ellipse(phx + phw / 2, phy + phh + 12, 86, 100, 0, Math.PI, 0); x.fill(); }
    x.fillStyle = 'rgba(201,164,92,.7)'; x.font = '400 10.5px ' + SA; x.textAlign = 'center'; x.fillText(PKIND === 'mine' ? '사진 · 본인' : pickGet() === 'cat.jpg' ? '사진 · 경성야록 마스코트' : PKIND === 'ai' ? '사진 · 그림 재현' : '사진', 158, phy + phh + 26);
    x.fillStyle = GOLD; x.font = '700 12px ' + MY; spaced('제 ' + serial(nm) + ' 호', 158, 476, 3);
    x.strokeStyle = GOLD2; x.beginPath(); x.moveTo(58, 456); x.lineTo(258, 456); x.stroke();
    /* 오른쪽 — 제목 */
    var tx = PX + 44;
    x.fillStyle = INK; x.textAlign = 'left'; x.font = '800 50px ' + MY; spaced('기자증', tx, 108, 22);
    x.fillStyle = RED; x.font = '700 12.5px ' + SA; spaced('편집국 출입 · 취재 허가', tx + 2, 132, 4);
    x.strokeStyle = INK; x.lineWidth = 2.5; x.beginPath(); x.moveTo(tx, 148); x.lineTo(PX + PW - 44, 148); x.stroke(); x.lineWidth = .8; x.beginPath(); x.moveTo(tx, 153); x.lineTo(PX + PW - 44, 153); x.stroke();
    /* 칸 */
    var rank = ['', '견습 기자', '기자', '기자', '특파원'][n] || '견습 기자';
    var rows = [['성 명', nm || ''], ['소 속', '편집국 사회부'], ['직 급', rank], ['발 행', today()]];
    rows.forEach(function (rw, i) {
      var yy = 192 + i * 44;
      x.fillStyle = '#6b5a43'; x.font = '700 12.5px ' + SA; x.fillText(rw[0], tx, yy);
      if (i === 2) { x.font = '800 17px ' + MY; var w = x.measureText(rw[1]).width; x.fillStyle = n >= 4 ? RED : INK; rr(tx + 70, yy - 19, w + 22, 27, 3); x.fill(); x.fillStyle = PAPER; x.fillText(rw[1], tx + 81, yy + 1); }
      else { x.fillStyle = INK; x.font = (i === 0 ? '800 27px ' : '700 18px ') + MY; x.fillText(rw[1] || (i === 0 ? '' : ''), tx + 70, yy + (i === 0 ? 4 : 1)); }
      x.strokeStyle = 'rgba(21,17,13,.3)'; x.lineWidth = 1; x.beginPath(); x.moveTo(tx + 66, yy + 12); x.lineTo(PX + PW - 44, yy + 12); x.stroke();
    });
    /* 취재 기록 — 네 도장 */
    x.fillStyle = INK; x.font = '700 12px ' + SA; spaced('취재 기록', tx, 392, 3);
    CASES.forEach(function (c, i) {
      var cx = tx + 34 + i * 82, cy = 438, on = !!o[c.k];
      x.save(); x.translate(cx, cy); if (on) x.rotate(-0.16 + i * 0.1);
      if (on) { x.strokeStyle = RED; x.lineWidth = 2.6; x.beginPath(); x.arc(0, 0, 31, 0, Math.PI * 2); x.stroke(); x.lineWidth = .9; x.beginPath(); x.arc(0, 0, 26, 0, Math.PI * 2); x.stroke(); x.fillStyle = RED; }
      else { x.strokeStyle = 'rgba(21,17,13,.3)'; x.setLineDash([3, 4]); x.lineWidth = 1.2; x.beginPath(); x.arc(0, 0, 31, 0, Math.PI * 2); x.stroke(); x.setLineDash([]); x.fillStyle = 'rgba(21,17,13,.35)'; }
      x.textAlign = 'center'; x.font = '800 13.5px ' + MY; x.fillText(c.n, 0, 2); x.font = '600 9.5px ' + SA; x.fillText(on ? '취재 완료' : String(c.y), 0, 16);
      x.restore();
    });
    /* 둥근 사인 — 글자가 둘레를 도는 도장 */
    x.save(); x.translate(PX + PW - 96, 396); x.rotate(-0.22); x.strokeStyle = RED; x.fillStyle = RED;
    x.lineWidth = 3; x.beginPath(); x.arc(0, 0, 48, 0, Math.PI * 2); x.stroke(); x.lineWidth = 1; x.beginPath(); x.arc(0, 0, 31, 0, Math.PI * 2); x.stroke();
    var ring = '경성야록사 · 편집국장 · '; x.font = '700 10.5px ' + SA; x.textAlign = 'center'; arcText(ring, 0, 0, 36, 0, Math.PI * 2 / ring.length);
    x.font = '900 20px ' + MY; x.fillText('인', 0, 7); x.restore();
    /* 맨 아래 보안 줄 */
    x.fillStyle = 'rgba(21,17,13,.35)'; x.font = '500 7.5px ' + SA; x.textAlign = 'left'; x.save(); x.beginPath(); x.rect(PX + 18, PY + PH - 34, PW - 36, 12); x.clip();
    var line = ''; for (var j = 0; j < 14; j++) line += '경성야록사 기자증 · '; x.fillText(line, PX + 20, PY + PH - 25); x.restore();
    x.fillStyle = '#6b5a43'; x.font = '400 9.5px ' + SA; x.textAlign = 'right'; x.fillText('경성야록 체험용 · 실제 신분증이 아님', PX + PW - 24, PY + PH - 40);
    /* 특파원 띠 */
    if (n >= 4) { x.save(); x.translate(Wd - 70, 70); x.rotate(Math.PI / 4); x.fillStyle = RED; x.fillRect(-120, -18, 240, 36); x.fillStyle = '#f3e7d0'; x.font = '800 16px ' + MY; x.textAlign = 'center'; spaced('특파원', 0, 6, 12); x.restore(); }
    x.restore();
    /* 둘레 금선 */
    rr(4, 4, Wd - 8, Ht - 8, 22); x.strokeStyle = 'rgba(201,164,92,.55)'; x.lineWidth = 1.5; x.stroke();
  }
  /* ── 나누기 ── */
  var PUBLIC = 'https://ejdms499-wq.github.io/gyeongseong-yarok_v/opening.html';
  function siteUrl() { return /^https?:/.test(location.protocol) ? new URL(BASE + 'opening.html', location.href).href : PUBLIC; }
  function rankOf(n) { return ['', '견습 기자', '기자', '기자', '특파원'][n] || '견습 기자'; }
  function shareText(nm) { return '경성야록 ' + rankOf(count()) + ' 기자증을 받았소' + (nm ? ' — ' + nm : '') + '. 밤이 깁허지면 니저진 사건이 깨여나나니라.'; }
  function toBlob(cv) { return new Promise(function (ok) { try { cv.toBlob(function (b) { ok(b); }, 'image/png'); } catch (e) { ok(null); } }); }
  function download(cv, fn) { try { var a = D.createElement('a'); a.href = cv.toDataURL('image/png'); a.download = fn; D.body.appendChild(a); a.click(); a.remove(); } catch (e) {} }
  function nativeShare(blob, fn, nm) {
    try {
      var f = new File([blob], fn, { type: 'image/png' });
      if (navigator.canShare && navigator.canShare({ files: [f] })) return navigator.share({ files: [f], title: '경성야록 기자증', text: shareText(nm) + ' ' + siteUrl() }).then(function () { return true; }, function (e) { return e && e.name === 'AbortError' ? true : false; });
    } catch (e) {}
    return Promise.resolve(false);
  }
  function copyImg(blob) { try { if (navigator.clipboard && W.ClipboardItem) return navigator.clipboard.write([new ClipboardItem({ 'image/png': blob })]).then(function () { return true; }, function () { return false; }); } catch (e) {} return Promise.resolve(false); }
  function copyText(t) { try { if (navigator.clipboard) return navigator.clipboard.writeText(t).then(function () { return true; }, function () { return false; }); } catch (e) {} return Promise.resolve(false); }
  function kakaoKey() { return W.YK_KAKAO_KEY || ''; }
  function loadKakao() {
    return new Promise(function (ok) {
      if (!kakaoKey() || !/^https?:/.test(location.protocol)) return ok(null);
      if (W.Kakao) return ok(W.Kakao);
      var s = D.createElement('script'); s.src = 'https://t1.kakaocdn.net/kakao_js_sdk/2.7.2/kakao.min.js'; s.onload = function () { ok(W.Kakao || null); }; s.onerror = function () { ok(null); }; D.head.appendChild(s);
    });
  }
  (function () { if (W.YK_KAKAO_KEY === undefined) { var s = D.createElement('script'); s.src = BASE + 'yk-kakao.js'; D.head.appendChild(s); } })();
  /* 인스타 스토리용 세로 그림 (1080 × 1920) */
  /* 폰판(W.YKP_MONO) — 기자증을 흑백으로 · 붉은 도장만 남김 */
  function mono(cv) {
    try {
      var x = cv.getContext('2d'), d = x.getImageData(0, 0, cv.width, cv.height), a = d.data;
      for (var i = 0; i < a.length; i += 4) {
        var r = a[i], g = a[i + 1], b = a[i + 2], l = .299 * r + .587 * g + .114 * b;
        if (r > 90 && g < r * .55 && b < r * .6) { var k = Math.min(1, .45 + l / 160); a[i] = 179 * k; a[i + 1] = 38 * k; a[i + 2] = 30 * k; }
        else { var v = Math.max(0, Math.min(255, (l - 18) * 1.12)); a[i] = a[i + 1] = a[i + 2] = v; }
      }
      x.putImageData(d, 0, 0);
    } catch (e) {}
  }
  var draw0 = draw; draw = function (cv, nm) { draw0(cv, nm); if (W.YKP_MONO) mono(cv); };
  function story(card, nm) {
    var c = D.createElement('canvas'), x = c.getContext('2d'); c.width = 1080; c.height = 1920;
    var g = x.createLinearGradient(0, 0, 0, 1920); g.addColorStop(0, '#231b14'); g.addColorStop(1, '#0c0907'); x.fillStyle = g; x.fillRect(0, 0, 1080, 1920);
    var sd = 11, rnd = function () { sd = (sd * 16807) % 2147483647; return sd / 2147483647; }; for (var k = 0; k < 9000; k++) { x.fillStyle = 'rgba(255,240,210,' + (rnd() * .04) + ')'; x.fillRect(rnd() * 1080, rnd() * 1920, 1.5, 1.5); }
    if (LOGO) { var lw = 620, lh = LOGO.height * lw / LOGO.width; x.drawImage(LOGO, (1080 - lw) / 2, 230, lw, lh); }
    x.fillStyle = '#c9a45c'; x.textAlign = 'center'; x.font = '700 30px "Noto Sans KR",sans-serif'; x.fillText('경 성 야 록 사   기 자 증', 540, 470);
    x.save(); x.translate(540, 960); x.rotate(-0.045); x.shadowColor = 'rgba(0,0,0,.6)'; x.shadowBlur = 50; x.shadowOffsetY = 24; var cw = 980, ch = card.height * cw / card.width; x.drawImage(card, -cw / 2, -ch / 2, cw, ch); x.restore();
    x.fillStyle = '#efe6d2'; x.font = '800 52px "Nanum Myeongjo","Noto Serif KR",serif'; x.fillText((nm || '무명') + ' · ' + rankOf(count()), 540, 1420);
    x.fillStyle = 'rgba(239,230,210,.75)'; x.font = '400 32px "Nanum Myeongjo","Noto Serif KR",serif'; x.fillText('밤이 깁허지면 니저진 사건이 깨여나나니라', 540, 1500);
    x.fillStyle = '#b0261b'; x.fillRect(340, 1580, 400, 70); x.fillStyle = '#fff'; x.font = '700 30px "Noto Sans KR",sans-serif'; x.fillText('경성야록 펼쳐 보기', 540, 1626);
    x.fillStyle = 'rgba(239,230,210,.55)'; x.font = '400 24px "Noto Sans KR",sans-serif'; x.fillText(siteUrl().replace(/^https?:\/\//, ''), 540, 1720);
    return c;
  }

  function close() { var v = D.getElementById('ykpV'); if (v) { v.classList.remove('on'); setTimeout(function () { v.remove(); }, 350); } }
  function show(just) {
    css(); close();
    var n = count(), all = n >= CASES.length, c = CASES.filter(function (x) { return x.k === just; })[0];
    var v = D.createElement('div'); v.className = 'ykp-veil'; v.id = 'ykpV';
    var thumbs = PICS.map(function (p) { return '<button type="button" class="ykp-pic" data-pic="' + p[0] + '" hidden title="' + p[1] + '"><img alt="' + p[1] + '"><span>' + p[1] + '</span></button>'; }).join('') +
      '<button type="button" class="ykp-pic none" data-pic="none" title="그림자"><i></i><span>그림자</span></button>' +
      '<label class="ykp-pic up" title="내 사진 올리기"><input type="file" accept="image/*"><i>＋</i><span>내 사진</span></label>' +
      '<button type="button" class="ykp-pic" data-pic="mine" hidden title="내 사진"><img alt="내 사진"><span>내 사진</span></button>';
    var SH = [['save', '그림 저장', '⤓'], ['kakao', '카카오톡', '톡'], ['insta', '인스타그램', '◎'], ['mail', '이메일', '✉'], ['x', 'X', '𝕏'], ['fb', '페이스북', 'f'], ['link', '링크 복사', '⧉']];
    v.innerHTML = '<div class="ykp-box" role="dialog" aria-modal="true" aria-label="기자증"><button type="button" class="ykp-x" aria-label="닫기">×</button>' +
      '<p class="ykp-k"><span>기자증 · 경성야록사</span><span>' + n + ' / 4</span></p>' +
      '<h3>' + T(c ? '「' + c.n + '」 취재를 마쳣소. 편집국이 기자증을 내주오.' : '그대의 기자증이오.') + '</h3>' +
      '<p class="s">' + T(all ? '네 사건을 모두 취재한 특파원이오.' : '네 사건의 취재 도장을 다 모으면 특파원이 되고, 편집국 문이 열리오. 남은 사건 ' + (4 - n) + '.') + '</p>' +
      '<canvas class="ykp-cv" width="1720" height="1080" aria-label="경성야록 기자증 그림"></canvas>' +
      '<div class="ykp-steps">' +
        '<div class="ykp-st"><b>하나 · 이름</b><input class="ykp-name" type="text" maxlength="8" placeholder="여기에 이름을 쓰시압" value="' + esc(name()) + '" aria-label="기자증에 찍을 이름"></div>' +
        '<div class="ykp-st"><b>둘 · 사진</b><div class="ykp-pics">' + thumbs + '</div><small>' + T('내 사진은 이 기기 안에서만 옛 사진처럼 바뀌고, 어디로도 보내지지 안소.') + '</small></div>' +
        '<div class="ykp-st"><b>셋 · 보내기</b><div class="ykp-sh">' + SH.map(function (b) { return '<button type="button" class="ykp-s' + (b[0] === 'save' ? ' main' : '') + '" data-a="' + b[0] + '"><i aria-hidden="true">' + b[2] + '</i>' + b[1] + '</button>'; }).join('') + '</div></div>' +
      '</div><p class="ykp-msg" aria-live="polite"></p>' +
      (all ? '<p class="ykp-gate"><b>출입 허가</b>' + T('기자증을 내보이면 편집국에 드러갈 수 잇소.') + '<a href="' + BASE + 'newsroom.html">편집국으로 →</a></p>' : '') +
      '</div>';
    D.body.appendChild(v);
    var cv = v.querySelector('canvas'), inp = v.querySelector('.ykp-name'), msg = v.querySelector('.ykp-msg'), mt = null;
    function say(t) { msg.textContent = t; msg.classList.add('on'); clearTimeout(mt); mt = setTimeout(function () { msg.classList.remove('on'); }, 5200); }
    function redraw() { draw(cv, inp.value.trim()); }
    function paintPics() {
      var cur = pickGet();
      [].forEach.call(v.querySelectorAll('.ykp-pic[data-pic]'), function (b) {
        var k = b.dataset.pic, im = b.querySelector('img');
        if (k === 'mine') { b.hidden = !IMGS.mine; if (IMGS.mine && im) im.src = IMGS.mine.src; }
        else if (k !== 'none') { b.hidden = !IMGS[k]; if (IMGS[k] && im && !im.src) im.src = IMGS[k].src; }
        b.classList.toggle('on', k === cur || (cur === 'mine' && k === 'mine'));
      });
    }
    load().then(function () { paintPics(); redraw(); }); redraw();
    inp.addEventListener('input', function () { setName(inp.value.trim()); redraw(); });
    /* 기자증의 성명 칸을 누르면 이름 쓰는 칸으로 */
    cv.addEventListener('click', function (e) { var r = cv.getBoundingClientRect(), px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height; if (px > .33 && py > .28 && py < .42) inp.focus(); });
    v.querySelector('.ykp-pics').addEventListener('click', function (e) { var b = e.target.closest('.ykp-pic[data-pic]'); if (!b) return; pickSet(b.dataset.pic); usePick(); paintPics(); redraw(); });
    v.querySelector('.ykp-pic.up input').addEventListener('change', function () {
      var f = this.files && this.files[0]; if (!f) return; say('옛 사진으로 현상하는 중이오…');
      oldPhoto(f).then(function (url) {
        try { localStorage.setItem(MINE, url); } catch (e) {}
        return img(url).then(function (i) { IMGS.mine = i; pickSet('mine'); usePick(); paintPics(); redraw(); say('현상을 마쳣소. 1930년대 사진관에서 박은 듯하오.'); });
      }).catch(function () { say('그 사진은 열 수 업소. 다른 사진을 골라 주시압.'); });
      this.value = '';
    });
    v.querySelector('.ykp-x').onclick = close;
    var FN = 'gyeongseong-yarok-press-card.png';
    v.addEventListener('click', function (e) {
      if (e.target === v) { close(); return; }
      var b = e.target.closest('[data-a]'); if (!b) return; redraw();
      var nm = inp.value.trim(), url = siteUrl(), txt = shareText(nm), a = b.dataset.a;
      if (a === 'save') { download(cv, FN); say('기자증 그림을 저장햇소.'); }
      else if (a === 'kakao') {
        loadKakao().then(function (K) {
          if (K) {
            try { if (!K.isInitialized()) K.init(kakaoKey()); } catch (x) {}
            return toBlob(cv).then(function (bl) { return K.Share.uploadImage({ file: [new File([bl], FN, { type: 'image/png' })] }); }).then(function (r) {
              K.Share.sendDefault({ objectType: 'feed', content: { title: '경성야록 기자증 · ' + rankOf(count()), description: txt, imageUrl: r.infos.original.url, link: { webUrl: url, mobileWebUrl: url } }, buttons: [{ title: '경성야록 펼쳐 보기', link: { webUrl: url, mobileWebUrl: url } }] });
            }).catch(function () { say('카카오톡 연결이 되지 안앗소. 그림을 저장해 보내 주시압.'); });
          }
          return toBlob(cv).then(function (bl) { return nativeShare(bl, FN, nm).then(function (okd) {
            if (okd) return; return copyImg(bl).then(function (c2) { say(c2 ? '기자증 그림을 복사햇소 — 카카오톡 대화창에 붙여 넣으시압(Ctrl + V).' : '이 브라우저에선 바로 보낼 수 업소. 「그림 저장」 뒤 카카오톡에 올려 주시압.'); });
          }); });
        });
      }
      else if (a === 'insta') {
        var st = story(cv, nm);
        toBlob(st).then(function (bl) { return nativeShare(bl, 'gyeongseong-yarok-story.png', nm).then(function (okd) {
          if (!okd) { download(st, 'gyeongseong-yarok-story.png'); say('인스타 스토리용 세로 그림을 저장햇소. 휴대폰 인스타그램 스토리에 올려 주시압.'); }
        }); });
      }
      else if (a === 'mail') { location.href = 'mailto:?subject=' + encodeURIComponent('경성야록 기자증 — ' + rankOf(count())) + '&body=' + encodeURIComponent(txt + '\n\n' + url + '\n\n(기자증 그림은 「그림 저장」으로 받아 첨부해 주시압)'); }
      else if (a === 'x') { W.open('https://twitter.com/intent/tweet?text=' + encodeURIComponent(txt) + '&url=' + encodeURIComponent(url), '_blank', 'noopener'); }
      else if (a === 'fb') { W.open('https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(url), '_blank', 'noopener'); }
      else if (a === 'link') { copyText(txt + ' ' + url).then(function (ok) { say(ok ? '주소를 복사햇소. 어대든 붙여 넣으시압.' : url); }); }
    });
    D.addEventListener('keydown', function k(e) { if (e.key === 'Escape') { close(); D.removeEventListener('keydown', k); } });
    requestAnimationFrame(function () { requestAnimationFrame(function () { v.classList.add('on'); }); });
  }

  function award(k, nb) {
    var o = get(), first = !o[k]; o[k] = 1; put(o);
    css();
    if (nb && first) {
      var sl = D.createElement('span'); sl.className = 'ykp-seal'; sl.setAttribute('aria-hidden', 'true'); sl.innerHTML = '취재<br>완료';
      if (getComputedStyle(nb).position === 'static') nb.style.position = 'relative';
      nb.appendChild(sl); setTimeout(function () { sl.style.transition = 'opacity .6s'; sl.style.opacity = '0'; setTimeout(function () { sl.remove(); }, 700); }, 2600);
    }
    if (nb && !nb.querySelector('.ykp-open')) {
      var b = D.createElement('button'); b.type = 'button'; b.className = 'ykp-open'; b.innerHTML = '기자증 <i>보기</i>';
      b.addEventListener('click', function (e) { e.stopPropagation(); show(''); });
      nb.appendChild(b);
    }
    if (first) setTimeout(function () { show(k); }, 1300);
  }
  function watch() {
    if (!CASE) return;
    var nb = D.querySelector('.notebook'); if (!nb) return;
    if (nb.classList.contains('done')) { award(CASE, nb); return; }
    new MutationObserver(function () { if (nb.classList.contains('done')) award(CASE, nb); }).observe(nb, { attributes: true, attributeFilter: ['class'] });
    if (get()[CASE]) award(CASE, nb);
  }
  W.ykPress = { get: get, count: count, show: show, all: function () { return count() >= CASES.length; }, cases: CASES };
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', watch); else watch();
})(window, document);
