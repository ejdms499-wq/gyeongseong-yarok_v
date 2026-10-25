/* ════════════════════════════════════════════════════════════════
   경성야록 · 구독 안내 (yk-paywall.js)
   - 본편 네 사건 밖의 긔록(단신)은 錢으로 열람: 한 장 五錢(5錢) · 월정 구독 一圓(100錢, 전부)
   - yk-auth.js 의 입장 · 錢 · 물건(owned)을 그대로 씀 (sub_all / dan_사건)
   - window.ykPay.gate(id, 제목, 열렸을 때 할 일)
   ※ 지금은 화면에서만 잠금 · 진짜로 막으려면 단신 본문을 Supabase 에 두고 구독자만 읽게 해야 하오
   ════════════════════════════════════════════════════════════════ */
(function (W, D) {
  'use strict';
  if (W.ykPay) return;
  var BASE = (function () { try { var c = D.currentScript && D.currentScript.src; return c ? c.replace(/yk-paywall\.js.*$/, '') : ''; } catch (e) { return ''; } })();
  var PRICE_ONE = 5, PRICE_ALL = 100;
  function A() { return W.ykAuth; }
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function has(id) {
    if (W.ykClass && W.ykClass.on()) return Promise.resolve(true);
    var a = A(); if (!a || !a.user()) return Promise.resolve(false);
    return a.owned().then(function (o) { return o.indexOf('sub_all') > -1 || o.indexOf('dan_' + id) > -1; }).catch(function () { return false; });
  }
  function css() {
    if (D.getElementById('ykp-css')) return;
    var s = D.createElement('style'); s.id = 'ykp-css';
    s.textContent = [
      '.ykp-veil{position:fixed;inset:0;z-index:100001;background:rgba(10,8,7,.62);display:grid;place-items:center;opacity:0;transition:opacity .3s}',
      '.ykp-veil.on{opacity:1}',
      '.ykp{position:relative;width:min(440px,92vw);background:#efe7d6;color:#1d1813;padding:30px 30px 24px;font-family:"Nanum Myeongjo","Noto Serif KR",serif;box-shadow:0 30px 80px rgba(0,0,0,.5);transform:translateY(8px);transition:transform .4s cubic-bezier(.2,.7,.2,1)}',
      '.ykp-veil.on .ykp{transform:none}',
      '.ykp:before{content:"";position:absolute;inset:8px;border:1px solid rgba(29,24,19,.35);pointer-events:none}',
      '.ykp .k{display:flex;justify-content:space-between;font:500 11px/1 "Noto Sans KR",sans-serif;letter-spacing:.4em;color:#8a2a21}',
      '.ykp .k b{letter-spacing:.2em;color:#1d1813;font-weight:700}',
      '.ykp h3{margin:14px 0 6px;font-weight:800;font-size:21px;line-height:1.45;letter-spacing:.02em;word-break:keep-all}',
      '.ykp .s{font-size:13px;line-height:1.7;color:#5a5046;margin-bottom:16px}',
      '.ykp .opt{display:flex;align-items:center;justify-content:space-between;gap:12px;width:100%;margin-top:10px;border:1px solid #1d1813;background:transparent;padding:13px 16px;cursor:pointer;text-align:left;font:inherit;color:inherit;transition:background .2s}',
      '.ykp .opt:hover{background:#e3d8c2}',
      '.ykp .opt.best{background:#1d1813;color:#efe7d6}',
      '.ykp .opt.best:hover{background:#2c241c}',
      '.ykp .opt b{font-size:15.5px;font-weight:800;letter-spacing:.06em}',
      '.ykp .opt small{display:block;margin-top:3px;font:400 11.5px "Noto Sans KR",sans-serif;opacity:.75}',
      '.ykp .opt i{font-style:normal;font-weight:800;font-size:17px;white-space:nowrap}',
      '.ykp .bal{margin-top:14px;font:400 12px "Noto Sans KR",sans-serif;color:#6b6257;display:flex;justify-content:space-between;gap:10px}',
      '.ykp .bal a{color:#8a2a21}',
      '.ykp .note{margin-top:10px;min-height:1em;font:400 12px/1.6 "Noto Sans KR",sans-serif;color:#8a2a21}',
      '.ykp .x{position:absolute;right:14px;top:10px;background:none;border:0;font-size:22px;color:#6b6257;cursor:pointer;z-index:1}'
    ].join('\n');
    D.head.appendChild(s);
  }
  function close() { var v = D.getElementById('ykp'); if (v) { v.classList.remove('on'); setTimeout(function () { v.remove(); }, 300); } D.removeEventListener('keydown', escK); }
  function escK(e) { if (e.key === 'Escape') close(); }
  function open(id, title, onOk) {
    css(); close();
    var a = A(), me = a && a.user();
    var v = D.createElement('div'); v.className = 'ykp-veil'; v.id = 'ykp';
    v.innerHTML = '<div class="ykp" role="dialog" aria-modal="true" aria-label="구독 안내"><button class="x" aria-label="닫기">×</button>' +
      '<p class="k"><b>購讀 案內</b><span>정긔 독자 전용</span></p>' +
      '<h3>' + esc(title || '이 긔록') + '</h3>' +
      '<p class="s">이 긔록은 「정긔 독자」께만 배달하오.<br>한 장만 사 보거나, 한 달 치를 구독하시오.</p>' +
      '<button class="opt" data-k="one"><span><b>이 긔록 한 장</b><small>호외 한 장 값</small></span><i>' + PRICE_ONE + ' 錢</i></button>' +
      '<button class="opt best" data-k="all"><span><b>월정 구독</b><small>지면에서 밀려난 긔록 전부 · 새 긔록도</small></span><i>' + PRICE_ALL + ' 錢</i></button>' +
      '<p class="bal"><span>' + (me ? '가진 錢 <b>' + me.coins + '</b>' : '먼저 독자 입장이 필요하오') + '</span><a href="' + BASE + 'reader-room.html#charge">錢 충전 →</a></p>' +
      '<p class="note" aria-live="polite"></p></div>';
    D.body.appendChild(v);
    var note = v.querySelector('.note');
    v.querySelector('.x').onclick = close;
    v.addEventListener('click', function (e) { if (e.target === v) close(); });
    D.addEventListener('keydown', escK);
    [].forEach.call(v.querySelectorAll('.opt'), function (b) {
      b.onclick = function () {
        var a2 = A(); if (!a2) { note.textContent = '입장 장치를 불러오지 못햇소.'; return; }
        if (!a2.user()) { close(); a2.open('up'); return; }
        var item = b.dataset.k === 'all' ? 'sub_all' : 'dan_' + id;
        note.textContent = '…';
        a2.buy(item).then(function () { close(); if (onOk) onOk(); })
          .catch(function (err) {
            var m = a2.msg(err);
            if (/모자라/.test(m)) note.innerHTML = '錢이 모자라오. <a href="' + BASE + 'reader-room.html#charge" style="color:#8a2a21">충전하러 가기 →</a>';
            else if (/이미 가진/.test(m)) { close(); if (onOk) onOk(); }
            else note.textContent = m;
          });
      };
    });
    requestAnimationFrame(function () { requestAnimationFrame(function () { v.classList.add('on'); }); });
  }
  /* 열려 잇스면 바로, 아니면 구독 안내 */
  function gate(id, title, onOk) {
    if (W.ykClass && W.ykClass.on()) { onOk(); return; }   /* 수업 모드: 모두 열림 */
    var a = A();
    var go = function () { has(id).then(function (ok) { if (ok) onOk(); else open(id, title, onOk); }); };
    if (a && a.ready) a.ready.then(go); else go();
  }
  W.ykPay = { has: has, open: open, gate: gate, ONE: PRICE_ONE, ALL: PRICE_ALL };
})(window, document);
