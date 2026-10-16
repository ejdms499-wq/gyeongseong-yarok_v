/* 경성야록 상뎜 폰판 — 진렬장 · 서랍 · 십오 년 · 광고만 켜기 · 아래칸 · 분양 · 지워진 광고 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var tone = function (k) { if (W.mb && W.mb.tone) W.mb.tone(k); };
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };
  var nl = function (s) { return esc(s).replace(/\n/g, '<br>'); };
  var S = W.SHOP; if (!S) return;

  /* ═══ 一 진렬장 — 한 장씩 넘겨 보기 ═══ */
  var CATS = ['전부', '약', '화장품', '먹거리', '생활'], cat = '전부', L = S.VT.slice(), cur = 0, ko = false;
  $('#msCats').innerHTML = CATS.map(function (c) { var n = c === '전부' ? S.VT.length : S.VT.filter(function (v) { return v.cat === c; }).length; return '<button type="button" data-c="' + c + '"' + (c === cat ? ' class="on"' : '') + '>' + c + '<sup>' + n + '</sup></button>'; }).join('');
  var track = $('#vwTrack'), strip = $('#vwStrip'), slides = [], thumbs = [];
  function build() {
    L = S.VT.filter(function (v) { return cat === '전부' || v.cat === cat; });
    track.innerHTML = L.map(function (v, i) {
      return '<div class="vw-s" data-i="' + i + '"><button type="button" class="vw-card' + (v.r > 1.6 ? ' wide' : '') + '" data-i="' + i + '"><img src="' + v.src + '" alt="' + esc(v.t) + ' 광고"' + (i > 2 ? ' loading="lazy"' : '') + '><i class="vw-tag">' + esc(v.d.slice(0, 4)) + '</i></button></div>';
    }).join('');
    strip.innerHTML = L.map(function (v, i) { return '<button type="button" data-i="' + i + '"><img src="' + v.src + '" alt="" loading="lazy"></button>'; }).join('');
    slides = $$('.vw-s', track); thumbs = $$('button', strip);
    track.scrollLeft = 0; cur = -1; set(0); fx();
  }
  function set(i) {
    i = Math.max(0, Math.min(L.length - 1, i)); if (i === cur) return; cur = i; var v = L[i];
    $('#vwN').textContent = (i + 1) + ' / ' + L.length;
    var info = $('#vwInfo'); info.classList.remove('in'); void info.offsetWidth; info.classList.add('in');
    $('#vwM').innerHTML = '<b>' + esc(v.cat) + '</b>동아일보 ' + esc(v.d) + (v.p ? ' · ' + esc(v.p) : '') + ' · 실제 광고';
    $('#vwT').textContent = v.t; paintO();
    thumbs.forEach(function (t, k) { t.classList.toggle('on', k === i); });
    var th = thumbs[i]; if (th) strip.scrollTo({ left: th.offsetLeft - strip.clientWidth / 2 + th.offsetWidth / 2, behavior: 'smooth' });
    tone('tick'); buzz(4);
  }
  function paintO() { var v = L[cur]; if (!v) return; var t = ko && v.k ? v.k : v.o; $('#vwO').innerHTML = nl(t); var b = $('#vwKo span'); b.textContent = ko ? '그때 말로' : '오늘 말로'; $('#vwKo').classList.toggle('on', ko); }
  function fx() {   /* 넘길 때 — 가운데 장은 바로 서고, 옆 장은 살짝 눕고 멀어짐 */
    var w = track.clientWidth, x = track.scrollLeft;
    slides.forEach(function (s, i) {
      var d = (i * w - x) / w; if (Math.abs(d) > 1.6) return; var a = Math.min(1, Math.abs(d));
      s.firstChild.style.transform = 'translateX(' + (d * -18).toFixed(1) + '%) scale(' + (1 - a * .14).toFixed(3) + ') rotate(' + (d * 4).toFixed(2) + 'deg)';
      s.firstChild.style.opacity = (1 - a * .55).toFixed(3);
    });
    set(Math.round(x / w));
  }
  var raf = 0; track.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(function () { raf = 0; fx(); }); }, { passive: true });
  W.addEventListener('resize', fx);
  function go(i, smooth) { track.scrollTo({ left: i * track.clientWidth, behavior: smooth === false ? 'auto' : 'smooth' }); }
  strip.addEventListener('click', function (e) { var b = e.target.closest('button[data-i]'); if (b) go(+b.dataset.i); });
  track.addEventListener('click', function (e) { var b = e.target.closest('.vw-card'); if (!b) return; var i = +b.dataset.i; if (i !== cur) { go(i); return; } zoom(); });
  function zoom() { var v = L[cur]; if (v && W.mb.zoom) W.mb.zoom(v.src, v.t + ' · 동아일보 ' + v.d); }
  $('#vwZoom').onclick = zoom;
  $('#vwKo').onclick = function () { ko = !ko; paintO(); tone('tick'); };
  $('#vwCut').onclick = function () { var v = L[cur]; if (v) cutOut(v); };
  $('#msCats').addEventListener('click', function (e) { var b = e.target.closest('button[data-c]'); if (!b) return; cat = b.dataset.c; $$('#msCats button').forEach(function (x) { x.classList.toggle('on', x === b); }); build(); tone('tick'); });
  build();
  W.ykShowAd = function (id) {   /* 다른 쪽에서 광고 하나를 바로 펼칠 때 */
    if (cat !== '전부') { cat = '전부'; $$('#msCats button').forEach(function (x) { x.classList.toggle('on', x.dataset.c === '전부'); }); build(); }
    var i = -1; L.forEach(function (v, k) { if (v.id === id) i = k; }); if (i < 0) return false;
    var sec = $('#vitrine'); W.scrollTo({ top: sec.getBoundingClientRect().top + W.scrollY - 48 });
    setTimeout(function () { go(i, false); fx(); }, 60); return true;
  };
  function openAd(v, kind) {
    $('#adK').textContent = (kind || v.cat || '광고') + ' · ' + v.d + (v.p ? ' · ' + v.p : '');
    $('#adT').textContent = v.t;
    $('#adBd').innerHTML = '<button type="button" class="ad-big" data-zoom="' + v.src + '" data-cap="' + esc(v.t + ' · ' + v.d) + '"><img src="' + v.src + '" alt="' + esc(v.t) + ' 광고"><span>누르면 크게</span></button>' +
      '<p class="ad-k">오늘 말로</p><p class="ad-o">' + nl(v.o) + '</p>' + (v.k && v.k !== v.o ? '<p class="ad-ko">' + nl(v.k) + '</p>' : '') +
      '<button type="button" class="ad-cut" id="adCut">✂ 가위로 오려 엽서로</button><p class="ad-src">동아일보 ' + esc(v.d) + (v.p ? ' · ' + esc(v.p) : '') + ' · 실제 광고</p>';
    $('#adCut').onclick = function () { cutOut(v); };
    W.mb.open('shAd');
  }

  /* ── 엽서 뒷면 — 편지 쓰기 (받는 이 · 편지 · 보내는 이) ── */
  var LW = (function () {
    var bk = $('#cutBk'), bx = bk.getContext('2d'), fm = $('#cutForm'), card = $('#cutCard'), to = $('#lwTo'), msg = $('#lwMsg'), fr = $('#lwFrom'), cv = $('#cutCv'), raf = 0;
    var MON = ['정월', '이월', '삼월', '사월', '오월', '륙월', '칠월', '팔월', '구월', '시월', '십일월', '십이월'];
    function wrap(txt, maxW) { var out = []; String(txt).split('\n').forEach(function (para) { var line = ''; for (var i = 0; i < para.length; i++) { var c = para[i]; if (bx.measureText(line + c).width > maxW && line) { out.push(line); line = c === ' ' ? '' : c; } else line += c; } out.push(line); }); return out; }
    function draw() {
      raf = 0; var W0 = cv.width || 900, H0 = cv.height || 1200; bk.width = W0; bk.height = H0; var pad = 60;
      bx.fillStyle = '#f4f3f0'; bx.fillRect(0, 0, W0, H0);
      bx.strokeStyle = '#0e0e0e'; bx.lineWidth = 2; bx.strokeRect(pad - 20, pad - 20, W0 - (pad - 20) * 2, H0 - (pad - 20) * 2);
      bx.fillStyle = '#0e0e0e'; bx.font = '900 40px "Noto Serif KR", serif'; bx.textAlign = 'left'; bx.fillText('우 편 엽 서', pad, pad + 40);
      bx.fillStyle = '#6b6b68'; bx.font = '400 18px "Noto Sans KR", sans-serif'; bx.fillText('경성야록 상뎜 · 오려 낸 광고 엽서', pad, pad + 74);
      /* 우표 · 소인 */
      var sw = 120, sh = 148, sx = W0 - pad - sw, sy = pad - 6;
      bx.setLineDash([6, 5]); bx.strokeStyle = '#b3261e'; bx.lineWidth = 2; bx.strokeRect(sx, sy, sw, sh); bx.setLineDash([]);
      bx.fillStyle = '#b3261e'; bx.fillRect(sx + 12, sy + 12, sw - 24, sh - 24); bx.fillStyle = '#f4f3f0'; bx.font = '900 54px "Noto Serif KR", serif'; bx.textAlign = 'center'; bx.fillText('야', sx + sw / 2, sy + sh / 2 + 10); bx.font = '500 14px "Noto Sans KR", sans-serif'; bx.fillText('삼 전', sx + sw / 2, sy + sh - 24);
      var d = new Date(), px = sx - 30, py = sy + sh - 10; bx.strokeStyle = 'rgba(14,14,14,.55)'; bx.lineWidth = 3; bx.beginPath(); bx.arc(px, py, 62, 0, Math.PI * 2); bx.stroke(); bx.beginPath(); bx.moveTo(px - 62, py); bx.lineTo(px + 62, py); bx.stroke();
      bx.fillStyle = 'rgba(14,14,14,.6)'; bx.font = '700 18px "Noto Serif KR", serif'; bx.fillText('경성', px, py - 18); bx.font = '600 16px "Noto Sans KR", sans-serif'; bx.fillText(MON[d.getMonth()] + ' ' + d.getDate() + '일', px, py + 30);
      bx.textAlign = 'left';
      /* 칸 나누기 — 왼편 편지 · 오른편 받는 이 */
      var top = pad + 190, bot = H0 - pad - 30, mid = Math.round(W0 * .56);
      bx.strokeStyle = '#0e0e0e'; bx.lineWidth = 1.5; bx.beginPath(); bx.moveTo(mid, top); bx.lineTo(mid, bot); bx.stroke();
      var lh = 52; bx.strokeStyle = '#d6d5d0'; bx.lineWidth = 1;
      for (var y = top + lh; y <= bot; y += lh) { bx.beginPath(); bx.moveTo(pad, y); bx.lineTo(mid - 30, y); bx.stroke(); }
      bx.fillStyle = '#0e0e0e'; bx.font = '400 30px "Noto Serif KR", serif';
      var L = wrap(msg.value || '', mid - 30 - pad - 6), maxL = Math.floor((bot - top) / lh);
      if (!msg.value) { bx.fillStyle = '#b9b8b3'; L = ['(여긔에 편지가 적히오)']; }
      L.slice(0, maxL).forEach(function (s, i) { bx.fillText(s, pad + 4, top + lh * (i + 1) - 12); });
      /* 받는 이 · 보내는 이 */
      var ax = mid + 34, aw = W0 - pad - ax;
      bx.fillStyle = '#6b6b68'; bx.font = '500 18px "Noto Sans KR", sans-serif'; bx.fillText('받는 이', ax, top + 30);
      bx.strokeStyle = '#0e0e0e'; bx.lineWidth = 1.2; [top + 110, top + 180].forEach(function (y) { bx.beginPath(); bx.moveTo(ax, y); bx.lineTo(ax + aw, y); bx.stroke(); });
      bx.fillStyle = '#0e0e0e'; bx.font = '700 34px "Noto Serif KR", serif'; wrap(to.value || '', aw).slice(0, 2).forEach(function (s, i) { bx.fillText(s, ax, top + 100 + i * 70); });
      bx.fillStyle = '#6b6b68'; bx.font = '500 18px "Noto Sans KR", sans-serif'; bx.fillText('보내는 이', ax, bot - 80);
      bx.beginPath(); bx.moveTo(ax, bot - 10); bx.lineTo(ax + aw, bot - 10); bx.stroke();
      bx.fillStyle = '#0e0e0e'; bx.font = '700 30px "Noto Serif KR", serif'; bx.fillText(fr.value || '', ax, bot - 22);
      $('#lwN').textContent = (msg.value || '').length + ' / 160';
    }
    function later() { if (!raf) raf = requestAnimationFrame(draw); }
    [to, msg, fr].forEach(function (i) { i.addEventListener('input', later); });
    function flip(b) { card.classList.toggle('back', b); $('#lwFlip').textContent = b ? '앞면 보기' : '뒷면 보기'; tone('tick'); }
    $('#cutWrite').onclick = function () { fm.hidden = false; this.hidden = true; draw(); flip(true); setTimeout(function () { msg.focus(); }, 450); buzz(8); };
    $('#lwFlip').onclick = function () { flip(!card.classList.contains('back')); };
    $('#lwDone').onclick = function () {
      draw(); if (CUR) { CUR.to = to.value.trim(); CUR.msg = msg.value.trim(); CUR.from = fr.value.trim(); keep(CUR); }
      try { $('#cutSave').href = both().toDataURL('image/png'); } catch (e) {}
      fm.hidden = true; $('#cutWrite').hidden = false; $('#cutWrite').textContent = '✎ 편지 고쳐 쓰기';
      $('#cutKept').textContent = '편지를 봉햇소 — 「보내기」를 누르면 앞 · 뒷면이 함께 가오.'; tone('stamp'); buzz([20, 60, 20]);
    };
    card.addEventListener('click', function () { if (fm.hidden && !has()) return; flip(!card.classList.contains('back')); });
    function has() { return !!(msg.value.trim() || to.value.trim()); }
    function both() { var o = D.createElement('canvas'), g = 30; o.width = cv.width; o.height = cv.height * 2 + g; var c = o.getContext('2d'); c.fillStyle = '#0b0b0b'; c.fillRect(0, 0, o.width, o.height); c.drawImage(cv, 0, 0); c.drawImage(bk, 0, cv.height + g); return o; }
    return {
      reset: function (v) { to.value = v.to || ''; msg.value = v.msg || ''; fr.value = v.from || ''; fm.hidden = true; card.classList.remove('back'); var w = $('#cutWrite'); w.hidden = false; w.classList.remove('on'); w.textContent = v.msg ? '✎ 편지 고쳐 쓰기' : '✎ 뒷면에 편지 쓰기'; },
      ready: function () { draw(); if (has()) { try { $('#cutSave').href = both().toDataURL('image/png'); } catch (e) {} } },
      has: has, both: both
    };
  })();
  /* 가위로 오리기 — 점선을 따라 가위가 돌고, 엽서 한 장이 만들어짐 */
  var CUR = null;
  function cutOut(v) {
    CUR = v; $('#cutKept').textContent = ''; $('#cutShare').classList.remove('on'); LW.reset(v);
    var box = $('#cut'), cv = $('#cutCv'), cx = cv.getContext('2d'), im = new Image(), save = $('#cutSave');
    box.hidden = false; requestAnimationFrame(function () { box.classList.add('on'); }); save.classList.remove('on'); $('#cutSay').textContent = '가위가 지나가오…';
    im.onload = function () {
      var W0 = 900, pad = 70, iw = W0 - pad * 2, ih = Math.min(1100, iw * im.height / im.width), H0 = ih + pad * 2 + 150;
      if (iw * im.height / im.width > 1100) iw = 1100 * im.width / im.height;
      cv.width = W0; cv.height = H0;
      function paper() {
        cx.fillStyle = '#f4f3f0'; cx.fillRect(0, 0, W0, H0);
        cx.filter = 'grayscale(1) contrast(1.08)'; cx.drawImage(im, (W0 - iw) / 2, pad, iw, ih); cx.filter = 'none';
        cx.fillStyle = '#0e0e0e'; cx.font = '700 30px "Noto Serif KR", serif'; cx.fillText(v.t, pad, pad + ih + 60);
        cx.fillStyle = '#6b6b68'; cx.font = '400 20px "Noto Sans KR", sans-serif'; cx.fillText('동아일보 ' + v.d + (v.p ? ' · ' + v.p : '') + ' · 경성야록 상뎜에서 오려 냄', pad, pad + ih + 100);
        cx.fillStyle = '#b3261e'; cx.fillRect(W0 - pad - 46, pad + ih + 38, 46, 46); cx.fillStyle = '#fff'; cx.font = '900 24px "Noto Serif KR", serif'; cx.fillText('야', W0 - pad - 35, pad + ih + 70);
      }
      var per = 2 * (W0 + H0) - 80, t0 = performance.now(), dur = 1500;
      (function f(ts) {
        var p = Math.min(1, (ts - t0) / dur), L = per * p;
        paper();
        cx.setLineDash([12, 9]); cx.lineWidth = 3; cx.strokeStyle = '#999'; cx.strokeRect(20, 20, W0 - 40, H0 - 40);
        cx.setLineDash([]); cx.strokeStyle = '#b3261e'; cx.lineWidth = 4; cx.beginPath();
        var pts = [[20, 20], [W0 - 20, 20], [W0 - 20, H0 - 20], [20, H0 - 20], [20, 20]], left = L, last = pts[0];
        cx.moveTo(20, 20);
        for (var i = 1; i < pts.length && left > 0; i++) { var a = pts[i - 1], b = pts[i], seg = Math.hypot(b[0] - a[0], b[1] - a[1]), k = Math.min(1, left / seg); last = [a[0] + (b[0] - a[0]) * k, a[1] + (b[1] - a[1]) * k]; cx.lineTo(last[0], last[1]); left -= seg; }
        cx.stroke();
        cx.font = '46px sans-serif'; cx.fillStyle = '#0e0e0e'; cx.fillText('✂', last[0] - 22, last[1] + 16);
        if (Math.floor(p * 20) !== Math.floor(((ts - 16 - t0) / dur) * 20)) tone('type');
        if (p < 1) requestAnimationFrame(f);
        else { paper(); try { save.href = cv.toDataURL('image/png'); save.classList.add('on'); } catch (e) {} $('#cutSay').textContent = '오렷소. 뒷면에 몃 자 적어 보내도 되오.'; $('#cutShare').classList.add('on'); $('#cutWrite').classList.add('on'); keep(v); LW.ready(); buzz([10, 30, 10]); }
      })(t0);
    };
    im.src = v.src;
  }
  /* ── 오려 둔 엽서 보관함 (이 폰에만 남음) ── */
  var SKEY = 'yk-shop-scraps';
  function scraps() { try { return JSON.parse(localStorage.getItem(SKEY) || '[]'); } catch (e) { return []; } }
  function keep(v) {
    var L = scraps().filter(function (x) { return x.src !== v.src; });
    L.unshift({ id: v.id || '', src: v.src, t: v.t, d: v.d, p: v.p || '', at: Date.now(), to: v.to || '', msg: v.msg || '', from: v.from || '' });
    try { localStorage.setItem(SKEY, JSON.stringify(L.slice(0, 60))); $('#cutKept').textContent = '보관함에 너엇소 — 「오려 둔 엽서」에서 다시 볼 수 잇소.'; } catch (e) {}
    paintScraps();
  }
  function paintScraps() {
    var L = scraps(), box = $('#sb'); if (!box) return; $('#sbN').textContent = L.length;
    box.innerHTML = L.length ? L.map(function (x, i) { return '<div class="sb-c" data-i="' + i + '"><button type="button" class="sb-o" data-i="' + i + '"><img src="' + x.src + '" alt="' + esc(x.t) + ' 엽서" loading="lazy"><b>' + esc(x.t) + '</b><em>' + esc(x.d) + '</em></button><button type="button" class="sb-x" data-x="' + i + '" aria-label="버리기">×</button></div>'; }).join('')
      : '<p class="sb-0">아즉 오린 엽서가 업소. 우 진렬장에서 「✂ 오려 엽서로」를 누르시압.</p>';
  }
  $('#sb').addEventListener('click', function (e) {
    var x = e.target.closest('[data-x]'); if (x) { var L = scraps(); L.splice(+x.dataset.x, 1); try { localStorage.setItem(SKEY, JSON.stringify(L)); } catch (er) {} paintScraps(); tone('tick'); return; }
    var o = e.target.closest('.sb-o'); if (o) { var v = scraps()[+o.dataset.i]; if (v) cutOut(v); }
  });
  paintScraps();
  /* ── 카톡 · SNS 로 보내기 — 폰의 공유 창을 띄움 (카카오톡 · 인스타그램 · 문자 등) ── */
  function toast(t) { var n = $('#cutKept'); n.textContent = t; }
  $('#cutShare').onclick = function () {
    var v = CUR; if (!v) return; var url = location.origin + location.pathname.replace(/[^\/]*$/, '') + 'm-shop.html' + (v.id ? '#v-' + v.id : '#vitrine');
    if (/^file:/.test(url)) url = 'https://ejdms499-wq.github.io/gyeongseong-yarok_v/m-shop.html' + (v.id ? '#v-' + v.id : '');
    var text = '경성야록 상뎜에서 오린 엽서 — ' + v.t + ' (동아일보 ' + v.d + ')';
    var cv = LW.has() ? LW.both() : $('#cutCv'); if (LW.has()) text = (v.from ? v.from + ' 님이 ' : '') + '경성야록 엽서 뒷면에 편지를 적어 보냇소 — ' + v.t;
    function plain() { if (navigator.share) navigator.share({ title: '경성야록 엽서', text: text, url: url }).catch(function () {}); else copy(); }
    function copy() { try { navigator.clipboard.writeText(text + ' ' + url).then(function () { toast('주소를 복사햇소 — 카톡 대화창에 붓처 너흐시압.'); }, function () { toast(url); }); } catch (e) { toast(url); } }
    if (navigator.share && cv.toBlob) {
      cv.toBlob(function (b) {
        try { var f = new File([b], '경성야록-엽서.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [f] })) { navigator.share({ files: [f], title: '경성야록 엽서', text: text + ' ' + url }).catch(function () {}); return; } } catch (e) {}
        plain();
      }, 'image/png');
    } else plain();
    buzz(10);
  };
  $('#cutX').onclick = function () { var b = $('#cut'); b.classList.remove('on'); setTimeout(function () { b.hidden = true; }, 400); };

  /* ═══ 二 다섯 서랍 ═══ */
  (function () {
    var row = $('#dwRow'), tray = $('#dwTray'), open = null;
    row.innerHTML = S.DR.map(function (d, i) {
      var lock = d.k === 'lock';
      return '<button type="button" class="dw-f' + (lock ? ' lock' : '') + '" data-i="' + i + '"><b>' + (lock ? '잠긴 서랍' : esc(d.lab)) + '</b><small>' + (lock ? '꾹 누르고 기다리시압' : d.items.length + ' 뎜') + '</small><i class="dw-h"></i>' + (lock ? '<i class="dw-ring"></i>' : '') + '</button>';
    }).join('');
    $('#dwSrc').textContent = S.DRSRC;
    function show(i) {
      var d = S.DR[i]; open = i;
      $$('.dw-f', row).forEach(function (b, k) { b.classList.toggle('on', k === i); });
      tray.classList.remove('in'); void tray.offsetWidth;
      var PIC = { 0: 'rise', 1: 'learn', 2: 'health', 3: 'secret', 4: 'nation', lock: 'secret' }[d.k === 'lock' ? 'lock' : i];
      tray.innerHTML = (PIC ? '<figure class="dw-pic"><img src="assets/shop3/m_dw_' + PIC + '.jpg" alt="' + esc(d.lab || '서랍') + ' (재현 그림)"><span class="rt">그림 · 재현</span></figure>' : '') + '<p class="dw-say"><b>' + esc(d.k === 'lock' ? '성 · 잠긴 칸' : d.lab) + '</b>' + esc(d.say) + '</p><div class="dw-items">' + d.items.map(function (it, k) {
        return '<button type="button" class="dw-it" data-k="' + k + '"><img src="' + it.src + '" alt="' + esc(it.t) + ' 광고" loading="lazy"><em>' + esc(it.d) + '</em><b>' + esc(it.t) + '</b></button>';
      }).join('') + '</div>';
      tray.classList.add('in'); tone('stamp'); buzz(15);
      $$('.dw-it', tray).forEach(function (b) { b.onclick = function () { var it = d.items[+b.dataset.k]; openAd({ src: it.src, d: it.d, p: it.p === '지면' ? '' : it.p, t: it.t, o: it.o, k: it.k, cat: d.lab || '서랍' }); }; });
    }
    $$('.dw-f:not(.lock)', row).forEach(function (b) { b.onclick = function () { show(+b.dataset.i); }; });
    var lk = $('.dw-f.lock', row), t = 0, unlocked = false;
    if (lk) {
      var start = function (e) { if (unlocked) { show(+lk.dataset.i); return; } e.preventDefault(); lk.classList.add('wait'); t = setTimeout(function () { unlocked = true; lk.classList.remove('wait'); lk.classList.add('open'); $('small', lk).textContent = '열렷소'; show(+lk.dataset.i); buzz([20, 40, 60]); }, 1600); };
      var stop = function () { clearTimeout(t); lk.classList.remove('wait'); };
      lk.addEventListener('pointerdown', start); lk.addEventListener('pointerup', stop); lk.addEventListener('pointerleave', stop); lk.addEventListener('pointercancel', stop);
      lk.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    }
  })();

  /* ═══ 三 한 상품의 십오 년 — 옆으로 밀어 넘김 ═══ */
  (function () {
    var tr = 'aj', track = $('#yrTrack'), line = $('#yrLine'), sec = $('#years');
    function build() {
      var L = S.YR[tr];
      track.innerHTML = L.map(function (it, k) {
        return '<figure class="yr-c' + (it.src ? '' : ' void') + '" data-k="' + k + '">' +
          (it.src ? '<button type="button" class="yr-pic" data-zoom="' + it.src + '" data-cap="' + esc(it.t + ' · ' + it.d) + '"><img src="' + it.src + '" alt="동아일보 ' + esc(it.d) + ' 광고" loading="lazy"><i class="yr-big">' + esc(it.d.slice(0, 4)) + '</i><i class="yr-nx">' + (k + 1) + ' / ' + L.length + ' · 옆으로 →</i></button>' : '<div class="yr-pic"><p>이 날부터 —<br>실릴 지면이 업소.</p></div>') +
          '<figcaption><em>' + esc(it.d) + (it.p ? ' · ' + esc(it.p) : '') + '</em><b>' + esc(it.t) + '</b><p>' + esc(it.o) + '</p></figcaption></figure>';
      }).join('');
      line.innerHTML = L.map(function (it, k) { var p = it.d.split('.'); return '<li' + (it.src ? '' : ' class="end"') + '><button type="button" data-k="' + k + '"><i></i><span>' + p[0] + (p[1] ? '.' + (+p[1]) : '') + '</span></button></li>'; }).join('');
      track.scrollLeft = 0; mark(0);
    }
    function mark(i) { $$('li', line).forEach(function (li, n) { li.classList.toggle('on', n === i); li.classList.toggle('past', n < i); }); sec.classList.toggle('dusk', !S.YR[tr][i].src); var on = $('li.on', line); if (on) line.scrollTo({ left: on.offsetLeft - line.clientWidth / 2 + on.clientWidth / 2, behavior: 'smooth' }); }
    var cur = 0;
    track.addEventListener('scroll', function () { var k = Math.round(track.scrollLeft / track.clientWidth); if (k !== cur) { cur = k; mark(k); tone('tick'); } }, { passive: true });
    line.addEventListener('click', function (e) { var b = e.target.closest('button[data-k]'); if (b) track.scrollTo({ left: track.clientWidth * +b.dataset.k, behavior: 'smooth' }); });
    $$('#yrTabs button').forEach(function (b) { b.onclick = function () { tr = b.dataset.tr; $$('#yrTabs button').forEach(function (x) { x.classList.toggle('on', x === b); }); cur = 0; build(); }; });
    build();
  })();

  /* ═══ 四 광고만 켜기 ═══ */
  (function () {
    var P = S.OD, i = 0, lit = false, sec = $('#oneday');
    $('#odTabs').innerHTML = P.map(function (p, k) { return '<li><button type="button" data-k="' + k + '"><img alt="" src="assets/ads/d38/' + p.k + '.jpg" loading="lazy"><span>' + esc(p.n.split(' · ')[0]) + '</span>' + (p.r.length ? '' : '<em>광고 업슴</em>') + '</button></li>'; }).join('');
    function draw() {
      var p = P[i];
      $('#odImg').src = 'assets/ads/d38/' + p.k + '.jpg'; $('#odImg').alt = '동아일보 1938년 7월 28일 ' + p.n;
      $('#odPath').setAttribute('d', 'M0 0H100V100H0Z' + p.r.map(function (r) { return 'M' + r[0] + ' ' + r[1] + 'h' + r[2] + 'v' + r[3] + 'h-' + r[2] + 'Z'; }).join(''));
      $('#odBoxes').innerHTML = p.r.map(function (r, k) { return '<i style="left:' + r[0] + '%;top:' + r[1] + '%;width:' + r[2] + '%;height:' + r[3] + '%;--k:' + k + '"></i>'; }).join('');
      $('#odN').innerHTML = '<b>' + esc(p.n) + '</b> · 광고 ' + (p.r.length ? p.r.length + ' 칸' : '업슴');
      $('#odCap').textContent = p.o; $('#odEnd').hidden = i !== P.length - 1;
      $$('#odTabs button').forEach(function (b, k) { b.classList.toggle('on', k === i); });
      var on = $('#odTabs button.on'); if (on) $('#odTabs').scrollTo({ left: on.parentNode.offsetLeft - 20, behavior: 'smooth' });
      $('#odPrev').disabled = i === 0; $('#odNext').disabled = i === P.length - 1;
      sec.classList.remove('turn'); void sec.offsetWidth; sec.classList.add('turn');
    }
    $('#odTabs').addEventListener('click', function (e) { var b = e.target.closest('button[data-k]'); if (b) { i = +b.dataset.k; draw(); } });
    $('#odPrev').onclick = function () { if (i > 0) { i--; draw(); } };
    $('#odNext').onclick = function () { if (i < P.length - 1) { i++; draw(); } };
    $('#odSw').onclick = function () { lit = !lit; sec.classList.toggle('lit', lit); this.setAttribute('aria-pressed', lit); tone(lit ? 'stamp' : 'tick'); };
    /* 지면을 옆으로 밀어도 넘어감 */
    var x0 = null; $('#odPage').addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    $('#odPage').addEventListener('touchend', function (e) { if (x0 == null) return; var dx = e.changedTouches[0].clientX - x0; x0 = null; if (dx < -50 && i < P.length - 1) { i++; draw(); } if (dx > 50 && i > 0) { i--; draw(); } });
    draw();
  })();

  /* ═══ 五 그날의 아래칸 ═══ */
  (function () {
    $('#udRows').innerHTML = S.UD.map(function (r) {
      return '<article class="ud' + (r.revive ? ' revive' : '') + '"><p class="ud-d">' + esc(r.d) + '</p>' +
        '<div class="ud-pg"><button type="button" data-zoom="' + r.page + '" data-cap="' + esc(r.d) + '"><img src="' + r.page + '" alt="' + esc(r.d) + ' 지면" loading="lazy"></button>' + (r.revive ? '<b class="ud-278">278 일 정간 뒤</b>' : '') + '</div>' +
        '<p class="ud-t"><i>우</i><span>' + esc(r.top) + '</span></p>' +
        '<button type="button" class="ud-band" data-zoom="' + r.band + '" data-cap="' + esc(r.d) + ' · 맨 아래칸"><img src="' + r.band + '" alt="그 지면의 맨 아래칸 광고" loading="lazy"></button>' +
        '<p class="ud-t"><i>아래</i><span>' + esc(r.bot) + '</span></p><p class="ud-last">' + esc(r.last) + '</p>' +
        '<a class="ud-go" href="' + r.href.replace('/index.html', '/m.html') + '">' + esc(r.go) + '</a></article>';
    }).join('');
    $('#udAllP').textContent = S.UDALL.replace(/^사건 지면마다 — 아래칸 모음/, '');
    $('#udCases').innerHTML = S.UC.map(function (c) {
      return '<details class="uc"><summary><b>' + esc(c.h.replace(/사건 기록으로 →\s*$/, '')) + '</b><span>' + c.items.length + ' 장</span></summary>' + c.items.map(function (m) {
        return '<div class="um" id="' + m.id + '"><p class="um-d"><b>' + esc(m.md) + '</b><span>' + esc(m.tag) + '</span></p>' +
          '<button type="button" class="um-b" data-zoom="' + m.band + '" data-cap="' + esc(m.md) + ' · 맨 아래칸"><img src="' + m.band + '" alt="' + esc(m.md) + ' 맨 아래칸" loading="lazy"></button>' +
          '<p class="um-c">' + esc(m.mc) + '</p>' + (m.notes.length ? '<ul class="um-n">' + m.notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul><p class="um-s">작은 칸은 글씨가 흐려 다 읽지 못하엿소.</p>' : '') + '</div>';
      }).join('') + '<a class="uc-go" href="' + c.href.replace('/index.html', '/m.html') + '">사건 기록으로 →</a></details>';
    }).join('');
    if ('IntersectionObserver' in W) { var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } }); }, { threshold: .35 }); $$('.ud.revive').forEach(function (r) { io.observe(r); }); }
    /* 다른 쪽에서 #ad-... 로 드러오면 그 칸을 펼침 */
    var h = location.hash.slice(1);
    if (/^ad-/.test(h)) { var t = D.getElementById(h); if (t) { t.closest('details').open = true; t.classList.add('hot'); fromCase(h); } }
    else if (/^v-/.test(h)) { setTimeout(function () { W.ykShowAd(h.slice(2)); }, 300); }
    /* 사건 본편 지면의 「그날의 광고」를 눌러 넘어오면 — 그날 가튼 장 아래칸을 바로 펼침 */
    function fromCase(id) {
      var it = null, cs = null;
      S.UC.forEach(function (c) { c.items.forEach(function (m) { if (m.id === id) { it = m; cs = c; } }); });
      if (!it) return;
      var name = cs.h.replace(/사건 기록으로 →\s*$/, '');
      $('#frK').textContent = name + ' · 사건 본편에서'; $('#frT').textContent = it.md;
      $('#frBd').innerHTML = '<p class="fr-k">그날, 사건이 실린 가튼 장 — 맨 아래칸</p>' +
        '<button type="button" class="fr-band" data-zoom="' + it.band + '" data-cap="' + esc(it.md) + ' · 맨 아래칸"><img src="' + it.band + '" alt="' + esc(it.md) + ' 맨 아래칸 광고"><span>누르면 크게 · 손가락으로 밀어 보시압</span></button>' +
        '<p class="fr-tag"><b>' + esc(it.tag.replace(/^위 · /, '')) + '</b> 우에선 사건, 아래에선 장사.</p>' +
        '<p class="fr-c">' + esc(it.mc) + '</p>' +
        (it.notes.length ? '<ul class="fr-n">' + it.notes.map(function (n) { return '<li>' + esc(n) + '</li>'; }).join('') + '</ul>' : '') +
        '<div class="fr-go"><button type="button" class="mb-btn" id="frBack">사건으로 도라가기</button><button type="button" class="mb-btn ghost" id="frShop">상뎜 구경하기</button></div>';
      $('#frBack').onclick = function () { if (history.length > 2) history.go(-2); else location.href = cs.href.replace('/index.html', '/m.html'); };
      $('#frShop').onclick = function () { W.mb.close('shFrom'); };
      setTimeout(function () { W.mb.open('shFrom'); }, 350);
    }
  })();

  /* ═══ 六 분양 공고 ═══ */
  (function () {
    var box = $('#bnMap'); box.innerHTML = S.BNMAP;
    $('#bnFoot').textContent = S.BNFOOT;
    function pick(k) {
      var d = S.BN[k]; if (!d) return;
      $$('.bn-pin', box).forEach(function (p) { p.classList.toggle('on', p.dataset.k === k); });
      var hl = $('#bnHl'); hl.style.left = d.x + '%'; hl.style.width = d.w + '%'; $('#bunyang').classList.add('picked');
      $('#bnN').textContent = d.nk; $('#bnO').textContent = d.o; tone('tick'); buzz(8);
    }
    $$('.bn-pin', box).forEach(function (p) { p.addEventListener('click', function () { pick(p.dataset.k); }); });
  })();

  /* ═══ 七 물든 광고 · 지워진 광고 ═══ */
  (function () {
    $('#dy').innerHTML = S.DY.map(function (d) {
      var inner = '<span class="dy-p"><img src="' + d.src + '" alt="' + esc(d.d) + ' 광고" loading="lazy"></span><em>' + esc(d.d) + '</em><p>' + esc(d.txt) + '</p>' + (d.go ? '<b>' + esc(d.go) + '</b>' : '');
      return d.href ? '<a class="dy-c" href="' + d.href.replace('/index.html', '/m.html') + '">' + inner + '</a>' : '<div class="dy-c">' + inner + '</div>';
    }).join('');
    $('#kbBody').innerHTML = [0, 1, 2, 3, 4, 5, 6].map(function (i) { return '<p>' + (i % 3 === 1 ? '<s>××××××××××××××</s>' : '<span>' + '▬▬▬ ▬▬ ▬▬▬▬ ▬▬'.slice(0, 10 + (i * 3) % 6) + '</span><s>×××××</s>') + '</p>'; }).join('');
    $('#kbRead').textContent = S.KB.read;
    $('#kbCap').innerHTML = nl(S.KB.cap.replace(/\n?손을 대면, 깎인 자리가 읽히오\.\n?/, '\n'));
    $('#dkEnd').textContent = S.END;
    var kb = $('#kbAd'), t = 0;
    function on(e) { e.preventDefault(); kb.classList.add('read'); buzz(10); }
    function off() { kb.classList.remove('read'); }
    kb.addEventListener('pointerdown', on); kb.addEventListener('pointerup', off); kb.addEventListener('pointerleave', off); kb.addEventListener('pointercancel', off);
    kb.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  })();
})(window, document);
/* 그림이 한 번 못 불려오면 새로 한 번 더 — 그래도 안 되면 깨진 칸을 숨김 */
(function (D) {
  D.addEventListener('error', function (e) {
    var i = e.target; if (!i || i.tagName !== 'IMG') return;
    if (!i.dataset.retry) { i.dataset.retry = '1'; var s = i.getAttribute('src'); i.src = s + (s.indexOf('?') < 0 ? '?' : '&') + 'r=' + Date.now(); return; }
    var f = i.closest('figure'); (f || i).style.display = 'none';
  }, true);
})(document);
