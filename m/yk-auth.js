/* ════════════════════════════════════════════════════════════════
   경성야록 · 독자 등록 / 입장 (yk-auth.js)
   - yk-config.js 에 Supabase 주소·열쇠가 있으면 진짜 가입(이메일 · 카카오 · 네이버)
   - 비어 있으면 시연 모드 (이 컴퓨터의 브라우저에만 저장)
   - window.ykAuth 로 독자의 방(reader-room.html)이 씀
   - 사건 지면을 끝까지 읽으면(yk-reward.js 의 yk:read) 50錢 + 그 사건 스크랩
   ════════════════════════════════════════════════════════════════ */
(function (W, D) {
  'use strict';
  if (W.ykAuth) return;
  var BASE = (function () { try { var c = D.currentScript && D.currentScript.src; return c ? c.replace(/yk-auth\.js.*$/, '') : ''; } catch (e) { return ''; } })();
  var CFG = W.YK_CONFIG || {};
  var LIVE = !!(CFG.SUPABASE_URL && CFG.SUPABASE_ANON_KEY);
  var SB_CDN = 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';
  var DEMO_KEY = 'ykroom_demo';
  var START_COINS = 300, READ_COINS = 50;
  var PACKS = { p100: 100, p500: 550, p1200: 1400 };

  /* 진열품 (값은 Supabase shop_items 가 기준 · 시연 모드는 이 값) */
  var ITEMS = [
    { id: 'lamp_amber', name: '호롱불', price: 0, kind: 'lamp', note: '기본 불빛' },
    { id: 'lamp_moon', name: '달빛 창', price: 120, kind: 'lamp', note: '푸르고 찬 밤' },
    { id: 'lamp_red', name: '붉은 등피', price: 180, kind: 'lamp', note: '자정 넘어 켜는 불' },
    { id: 'ad_ajino', name: '아지노모도', price: 30, kind: 'wall', img: 'assets/gwanggo/ajino1.jpg', note: '광고 엽서' },
    { id: 'ad_calpis', name: '칼피스', price: 30, kind: 'wall', img: 'assets/gwanggo/calpis.jpg', note: '광고 엽서' },
    { id: 'ad_club', name: '구라부 백분', price: 30, kind: 'wall', img: 'assets/gwanggo/club1.jpg', note: '광고 엽서' },
    { id: 'ad_lion', name: '라이온 치약', price: 30, kind: 'wall', img: 'assets/gwanggo/lion1.jpg', note: '광고 엽서' },
    { id: 'ad_morinaga', name: '모리나가', price: 30, kind: 'wall', img: 'assets/gwanggo/morinaga.jpg', note: '광고 엽서' },
    { id: 'ad_pilot', name: '파일롯 만년필', price: 30, kind: 'wall', img: 'assets/gwanggo/pilot.jpg', note: '광고 엽서' },
    { id: 'ad_radio', name: '라디오', price: 30, kind: 'wall', img: 'assets/gwanggo/radio.jpg', note: '광고 엽서' },
    { id: 'ad_utena', name: '우테나', price: 30, kind: 'wall', img: 'assets/gwanggo/utena1.jpg', note: '광고 엽서' },
    { id: 'o_match', name: '성냥갑', price: 40, kind: 'desk', img: 'assets/egg/relic-match.webp', w: 13 },
    { id: 'o_pen', name: '만년필', price: 60, kind: 'desk', img: 'assets/egg/relic-pen.webp', w: 16 },
    { id: 'o_box', name: '낡은 나무 상자', price: 70, kind: 'desk', img: 'assets/egg/relic-cube.webp', w: 12 },
    { id: 'o_mirror', name: '깨진 손거울', price: 90, kind: 'desk', img: 'assets/egg/relic-mirror.webp', w: 13 },
    { id: 'o_watch', name: '회중시계', price: 120, kind: 'desk', img: 'assets/egg/relic-watch.webp', w: 12 },
    { id: 'o_clock', name: '괘종시계', price: 200, kind: 'desk', img: 'case-maria/img/mr_clock_face.png', w: 15, rare: 1 },
    { id: 'o_doll', name: '인형 머리', price: 250, kind: 'desk', img: 'assets/egg/relic-doll.webp', w: 12, rare: 1 },
    { id: 'o_cat', name: '활자 고양이', price: 300, kind: 'desk', img: 'assets/seek/cat_peek.png', w: 16, rare: 1 },
    { id: 'scrap_jk', name: '죽첨정 스크랩', price: 0, kind: 'scrap', img: 'assets/op-wall/s_jk.jpg', note: '1933 · 05 · 17' },
    { id: 'scrap_maria', name: '마리아 스크랩', price: 0, kind: 'scrap', img: 'assets/op-wall/s_mr.jpg', note: '1931 · 08 · 04' },
    { id: 'scrap_sk', name: '손기정 스크랩', price: 0, kind: 'scrap', img: 'assets/op-wall/s_sk.jpg', note: '1936 · 08 · 25' },
    { id: 'scrap_bb', name: '백백교 스크랩', price: 0, kind: 'scrap', img: 'assets/op-wall/s_bb.jpg', note: '1937 · 09 · 23' },
    { id: 'sub_all', name: '월정 구독', price: 100, kind: 'sub' },
    { id: 'dan_kim-jeongpil', name: '단신 한 장', price: 5, kind: 'sub' },
    { id: 'dan_jangjinhong', name: '단신 한 장', price: 5, kind: 'sub' },
    { id: 'dan_jungang-boyuk', name: '단신 한 장', price: 5, kind: 'sub' },
    { id: 'dan_bankbokchang', name: '단신 한 장', price: 5, kind: 'sub' },
    { id: 'dan_hyeonhaetan', name: '단신 한 장', price: 5, kind: 'sub' },
    { id: 'dan_hyeonjingeon', name: '단신 한 장', price: 5, kind: 'sub' },
    { id: 'dan_geumgwanchong', name: '단신 한 장', price: 5, kind: 'sub' }
  ];
  var CASE_NAME = { jk: '죽첨정', maria: '마리아', sk: '손기정', bb: '백백교' };

  var sb = null, me = null, subs = [];
  var synced = false;
  function emit() { subs.forEach(function (f) { try { f(me); } catch (e) {} }); paintChip(); if (me && !synced) { synced = true; setTimeout(syncRead, 50); } if (!me) synced = false; }
  /* 입장 전에 읽어 둔 사건(yk-read)도 입장하면 받음 */
  function syncRead() { var o = {}; try { o = JSON.parse(localStorage.getItem('yk-read') || '{}') || {}; } catch (e) {} Object.keys(o).forEach(function (c) { if (CASE_NAME[c] && W.ykAuth) W.ykAuth.claimRead(c).catch(function () {}); }); }
  function err(m) { var e = new Error(m); e.yk = 1; return e; }
  function msgOf(e) { var m = (e && (e.message || e.error_description || e.msg)) || String(e); return m; }

  /* ── 시연 모드 저장소 ── */
  function dget() { try { return JSON.parse(localStorage.getItem(DEMO_KEY) || 'null') || {}; } catch (e) { return {}; } }
  function dput(o) { try { localStorage.setItem(DEMO_KEY, JSON.stringify(o)); } catch (e) {} }
  function demoLogin(nick, how) {
    var o = dget();
    if (!o.user) { o.user = { id: 'demo', nickname: nick || '무명 독자', coins: START_COINS, how: how || 'email' }; o.owned = []; o.layout = {}; o.read = []; o.ledger = [{ d: START_COINS, r: '입장 축하' }]; }
    else if (nick) o.user.nickname = nick;
    o.on = 1; dput(o); me = { id: o.user.id, nickname: o.user.nickname, coins: o.user.coins, how: o.user.how, demo: true }; emit(); return Promise.resolve(me);
  }

  /* ── 진짜 모드 ── */
  function loadSB() {
    return new Promise(function (res, rej) {
      if (W.supabase && W.supabase.createClient) return res();
      var s = D.createElement('script'); s.src = SB_CDN; s.onload = function () { res(); }; s.onerror = function () { rej(err('Supabase 를 불러오지 못했소 (인터넷 연결 확인)')); };
      D.head.appendChild(s);
    });
  }
  function refreshProfile() {
    return sb.auth.getUser().then(function (r) {
      var u = r.data && r.data.user; if (!u) { me = null; emit(); return null; }
      return sb.from('profiles').select('nickname,coins').eq('id', u.id).maybeSingle().then(function (p) {
        var how = (u.app_metadata && u.app_metadata.provider) || 'email';
        me = { id: u.id, email: u.email, nickname: (p.data && p.data.nickname) || '무명 독자', coins: (p.data && p.data.coins) || 0, how: how, demo: false };
        emit(); return me;
      });
    });
  }

  var ready = (LIVE ? loadSB().then(function () {
    sb = W.supabase.createClient(CFG.SUPABASE_URL, CFG.SUPABASE_ANON_KEY, { auth: { flowType: 'pkce', persistSession: true, detectSessionInUrl: true, storageKey: 'ykroom-auth' } });
    sb.auth.onAuthStateChange(function (ev) { if (ev === 'SIGNED_IN' || ev === 'SIGNED_OUT' || ev === 'USER_UPDATED') refreshProfile(); });
    return sb.auth.getSession().then(function () {
      try { if (/[?&]code=/.test(location.search)) history.replaceState(null, '', location.pathname + location.hash); } catch (e) {}
      return refreshProfile();
    });
  }) : Promise.resolve().then(function () {
    var o = dget(); if (o.on && o.user) me = { id: o.user.id, nickname: o.user.nickname, coins: o.user.coins, how: o.user.how, demo: true };
    emit(); return me;
  })).catch(function (e) { console.warn('[경성야록 독자]', e); emit(); return null; });

  function needMe() { if (!me) throw err('먼저 입장하시오'); }

  var API = {
    live: LIVE, items: ITEMS, packs: PACKS, base: BASE,
    ready: ready,
    user: function () { return me; },
    on: function (f) { subs.push(f); if (me !== undefined) try { f(me); } catch (e) {} return function () { subs = subs.filter(function (g) { return g !== f; }); }; },
    item: function (id) { for (var i = 0; i < ITEMS.length; i++) if (ITEMS[i].id === id) return ITEMS[i]; return null; },

    signUp: function (email, pw, nick) {
      if (!LIVE) return demoLogin(nick || (email || '').split('@')[0], 'email');
      return sb.auth.signUp({ email: email, password: pw, options: { data: { nickname: nick || '' }, emailRedirectTo: location.origin + location.pathname } }).then(function (r) {
        if (r.error) throw r.error;
        if (!r.data.session) return { confirm: true };   // 메일 확인이 켜져 있으면
        return refreshProfile();
      });
    },
    signIn: function (email, pw) {
      if (!LIVE) return demoLogin((email || '').split('@')[0] || '무명 독자', 'email');
      return sb.auth.signInWithPassword({ email: email, password: pw }).then(function (r) { if (r.error) throw r.error; return refreshProfile(); });
    },
    social: function (which) {   // 'kakao' | 'naver'
      if (!LIVE) return demoLogin(which === 'kakao' ? '카카오 독자' : '네이버 독자', which);
      var provider = which === 'naver' ? 'custom:naver' : 'kakao';
      return sb.auth.signInWithOAuth({ provider: provider, options: { redirectTo: location.origin + location.pathname } }).then(function (r) { if (r.error) throw r.error; return r; });
    },
    signOut: function () {
      if (!LIVE) { var o = dget(); o.on = 0; dput(o); me = null; emit(); return Promise.resolve(); }
      return sb.auth.signOut().then(function () { me = null; emit(); });
    },
    setNickname: function (n) {
      needMe(); n = String(n || '').trim().slice(0, 20); if (!n) return Promise.reject(err('필명을 적으시오'));
      if (!LIVE) { var o = dget(); o.user.nickname = n; dput(o); me.nickname = n; emit(); return Promise.resolve(me); }
      return sb.from('profiles').update({ nickname: n }).eq('id', me.id).then(function (r) { if (r.error) throw r.error; me.nickname = n; emit(); return me; });
    },
    prices: function () {   // id → 값
      var m = {}; ITEMS.forEach(function (i) { m[i.id] = i.price; });
      if (!LIVE) return Promise.resolve(m);
      return sb.from('shop_items').select('id,price').then(function (r) { (r.data || []).forEach(function (x) { m[x.id] = x.price; }); return m; });
    },
    owned: function () {
      needMe();
      if (!LIVE) return Promise.resolve((dget().owned || []).concat(['lamp_amber']));
      return sb.from('owned_items').select('item_id').eq('user_id', me.id).then(function (r) { if (r.error) throw r.error; return (r.data || []).map(function (x) { return x.item_id; }).concat(['lamp_amber']); });
    },
    buy: function (id) {
      needMe();
      if (!LIVE) {
        var o = dget(), it = API.item(id); if (!it || it.kind === 'scrap') return Promise.reject(err('그런 물건은 업소'));
        if ((o.owned || []).indexOf(id) > -1) return Promise.reject(err('이미 가진 물건이오'));
        if (o.user.coins < it.price) return Promise.reject(err('錢이 모자라오'));
        o.user.coins -= it.price; o.owned.push(id); o.ledger.push({ d: -it.price, r: '구입 · ' + it.name }); dput(o); me.coins = o.user.coins; emit(); return Promise.resolve(me.coins);
      }
      return sb.rpc('buy_item', { p_item: id }).then(function (r) { if (r.error) throw err(r.error.message); me.coins = r.data; emit(); return r.data; });
    },
    charge: function (pack) {
      needMe();
      if (!LIVE) { var o = dget(), a = PACKS[pack]; if (!a) return Promise.reject(err('그런 꾸러미는 업소')); o.user.coins += a; o.ledger.push({ d: a, r: '시험 충전' }); dput(o); me.coins = o.user.coins; emit(); return Promise.resolve(me.coins); }
      return sb.rpc('demo_charge', { p_pack: pack }).then(function (r) { if (r.error) throw err(r.error.message); me.coins = r.data; emit(); return r.data; });
    },
    claimRead: function (c) {
      if (!me) return Promise.resolve(null);
      if (!LIVE) {
        var o = dget(); o.read = o.read || []; if (o.read.indexOf(c) > -1) return Promise.resolve(null);
        o.read.push(c); o.user.coins += READ_COINS; if (o.owned.indexOf('scrap_' + c) < 0) o.owned.push('scrap_' + c); o.ledger.push({ d: READ_COINS, r: '완독 · ' + c }); dput(o); me.coins = o.user.coins; emit(); return Promise.resolve(me.coins);
      }
      var before = me.coins;
      return sb.rpc('claim_read', { p_case: c }).then(function (r) { if (r.error) throw err(r.error.message); me.coins = r.data; emit(); return r.data > before ? r.data : null; });
    },
    loadLayout: function () {
      needMe();
      if (!LIVE) return Promise.resolve(dget().layout || {});
      return sb.from('room_layout').select('layout').eq('user_id', me.id).maybeSingle().then(function (r) { if (r.error) throw r.error; return (r.data && r.data.layout) || {}; });
    },
    saveLayout: function (lay) {
      needMe();
      if (!LIVE) { var o = dget(); o.layout = lay; dput(o); return Promise.resolve(true); }
      return sb.from('room_layout').upsert({ user_id: me.id, layout: lay, updated_at: new Date().toISOString() }).then(function (r) { if (r.error) throw r.error; return true; });
    },
    msg: msgOf,
    open: function (tab) { openModal(tab); }
  };
  W.ykAuth = API;

  /* ════════ 화면: 입장 창 ════════ */
  function css() {
    if (D.getElementById('yka-css')) return;
    var s = D.createElement('style'); s.id = 'yka-css';
    s.textContent = [
      '.yka-veil{position:fixed;inset:0;z-index:100000;background:rgba(10,8,7,.62);display:grid;place-items:center;opacity:0;transition:opacity .35s ease}',
      '.yka-veil.on{opacity:1}',
      '.yka{position:relative;width:min(420px,92vw);max-height:92vh;overflow:auto;background:#efe7d6;color:#1d1813;box-shadow:0 30px 80px rgba(0,0,0,.5);padding:34px 34px 26px;font-family:"Nanum Myeongjo","Noto Serif KR",serif;transform:translateY(10px);transition:transform .45s cubic-bezier(.2,.7,.2,1)}',
      '.yka-veil.on .yka{transform:none}',
      '.yka:before{content:"";position:absolute;inset:8px;border:1px solid rgba(29,24,19,.35);pointer-events:none}',
      '.yka .k{font:500 11px/1 "Noto Sans KR",sans-serif;letter-spacing:.5em;color:#8a2a21;text-align:center}',
      '.yka h3{margin:14px 0 4px;text-align:center;font-weight:800;font-size:26px;letter-spacing:.12em}',
      '.yka .s{text-align:center;font-size:13px;color:#6b6257;margin:0 0 20px;line-height:1.6}',
      '.yka .tabs{display:flex;border-bottom:1px solid #1d1813;margin-bottom:16px}',
      '.yka .tabs button{flex:1;background:none;border:0;padding:10px 0;font:700 14px "Nanum Myeongjo",serif;letter-spacing:.2em;color:#8c8273;cursor:pointer}',
      '.yka .tabs button.on{color:#1d1813;box-shadow:inset 0 -3px 0 #1d1813}',
      '.yka label{display:block;font:500 11px "Noto Sans KR",sans-serif;letter-spacing:.2em;color:#6b6257;margin:12px 0 5px}',
      '.yka input{width:100%;box-sizing:border-box;border:0;border-bottom:1px solid #8c8273;background:transparent;padding:8px 2px;font:16px "Nanum Myeongjo",serif;color:#1d1813;outline:none}',
      '.yka input:focus{border-bottom-color:#1d1813}',
      '.yka .go{width:100%;margin-top:20px;background:#1d1813;color:#efe7d6;border:0;padding:13px;font:700 15px "Nanum Myeongjo",serif;letter-spacing:.3em;cursor:pointer}',
      '.yka .or{display:flex;align-items:center;gap:10px;margin:18px 0 12px;font:400 11px "Noto Sans KR",sans-serif;color:#8c8273;letter-spacing:.2em}',
      '.yka .or:before,.yka .or:after{content:"";flex:1;height:1px;background:#c9bfae}',
      '.yka .soc{display:flex;align-items:center;justify-content:center;gap:9px;width:100%;margin-top:8px;border:0;border-radius:6px;padding:12px;font:600 14px "Noto Sans KR",sans-serif;cursor:pointer}',
      '.yka .soc.kakao{background:#FEE500;color:rgba(0,0,0,.85)}',
      '.yka .soc.naver{background:#03C75A;color:#fff}',
      '.yka .soc i{font-style:normal;font-weight:900}',
      '.yka .x{position:absolute;right:16px;top:12px;background:none;border:0;font-size:22px;color:#6b6257;cursor:pointer;z-index:1}',
      '.yka .note{margin-top:14px;font:400 11.5px/1.6 "Noto Sans KR",sans-serif;color:#8a2a21;text-align:center;min-height:1em}',
      '.yka .demo{margin-top:10px;font:400 11px/1.5 "Noto Sans KR",sans-serif;color:#8c8273;text-align:center}',
      '.yk-who{white-space:nowrap}',
      '.yk-who b{font-weight:700}',
      '.ykr-toast2{position:fixed;left:50%;bottom:28px;z-index:99990;transform:translate(-50%,20px);opacity:0;background:#1d1813;color:#efe7d6;padding:14px 20px;font:14px/1.6 "Nanum Myeongjo",serif;letter-spacing:.04em;box-shadow:0 14px 40px rgba(0,0,0,.35);transition:opacity .5s,transform .5s;display:flex;gap:16px;align-items:center;width:max-content;max-width:92vw}',
      '.ykr-toast2.on{opacity:1;transform:translate(-50%,0)}',
      '.ykr-toast2 a,.ykr-toast2 button{color:#e4c48a;background:none;border:0;font:inherit;cursor:pointer;text-decoration:underline;white-space:nowrap}'
    ].join('\n');
    D.head.appendChild(s);
  }
  function esc(t) { return String(t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function openModal(tab) {
    css(); closeModal();
    var v = D.createElement('div'); v.className = 'yka-veil'; v.id = 'yka';
    v.innerHTML = '<div class="yka" role="dialog" aria-modal="true" aria-label="독자 등록">' +
      '<button class="x" aria-label="닫기">×</button>' +
      '<p class="k">京 城 野 錄 · 讀 者</p><h3>독자 입장</h3>' +
      '<p class="s">입장하면 읽은 사건이 스크랩으로 남고,<br>나만의 「독자의 방」을 꾸밀 수 있소.</p>' +
      '<div class="tabs"><button data-t="in">입장</button><button data-t="up">처음 오셧소</button></div>' +
      '<form class="f" autocomplete="on">' +
      '<div class="nick"><label>필명</label><input name="nick" maxlength="20" placeholder="방 문패에 적힐 이름"></div>' +
      '<label>전자우편</label><input name="email" type="email" required autocomplete="email" placeholder="reader@example.com">' +
      '<label>암호</label><input name="pw" type="password" required minlength="6" autocomplete="current-password" placeholder="여섯 자 이상">' +
      '<button class="go" type="submit">입장</button></form>' +
      '<div class="or">또는</div>' +
      (CFG.KAKAO !== false ? '<button class="soc kakao" data-s="kakao"><i>●</i> 카카오로 입장</button>' : '') +
      (CFG.NAVER !== false ? '<button class="soc naver" data-s="naver"><i>N</i> 네이버로 입장</button>' : '') +
      '<p class="note" aria-live="polite"></p>' +
      (LIVE ? '' : '<p class="demo">지금은 시연 모드요 · 이 컴퓨터에만 저장되오</p>') +
      '</div>';
    D.body.appendChild(v);
    var box = v.querySelector('.yka'), f = v.querySelector('form'), note = v.querySelector('.note'), mode = tab === 'up' ? 'up' : 'in';
    function setTab(t) { mode = t; [].forEach.call(v.querySelectorAll('.tabs button'), function (b) { b.classList.toggle('on', b.dataset.t === t); }); v.querySelector('.nick').style.display = t === 'up' ? '' : 'none'; f.querySelector('.go').textContent = t === 'up' ? '독자 등록' : '입장'; f.pw.setAttribute('autocomplete', t === 'up' ? 'new-password' : 'current-password'); note.textContent = ''; }
    setTab(mode);
    [].forEach.call(v.querySelectorAll('.tabs button'), function (b) { b.onclick = function () { setTab(b.dataset.t); }; });
    v.querySelector('.x').onclick = closeModal;
    v.addEventListener('click', function (e) { if (e.target === v) closeModal(); });
    D.addEventListener('keydown', escK);
    f.onsubmit = function (e) {
      e.preventDefault(); note.textContent = '…';
      var p = mode === 'up' ? API.signUp(f.email.value.trim(), f.pw.value, f.nick.value.trim()) : API.signIn(f.email.value.trim(), f.pw.value);
      p.then(function (r) {
        if (r && r.confirm) { note.textContent = '확인 편지를 보냇소. 전자우편의 링크를 누른 뒤 입장하시오.'; return; }
        note.textContent = ''; closeModal(); hello();
      }).catch(function (e2) { note.textContent = koErr(msgOf(e2)); });
    };
    [].forEach.call(v.querySelectorAll('.soc'), function (b) {
      b.onclick = function () { note.textContent = '…'; API.social(b.dataset.s).then(function () { if (!LIVE) { closeModal(); hello(); } }).catch(function (e2) { note.textContent = koErr(msgOf(e2)); }); };
    });
    requestAnimationFrame(function () { requestAnimationFrame(function () { v.classList.add('on'); (mode === 'up' ? f.nick : f.email).focus({ preventScroll: true }); }); });
  }
  function escK(e) { if (e.key === 'Escape') closeModal(); }
  function closeModal() { var v = D.getElementById('yka'); D.removeEventListener('keydown', escK); if (v) { v.classList.remove('on'); setTimeout(function () { v.remove(); }, 300); } }
  function koErr(m) {
    if (/Invalid login credentials/i.test(m)) return '전자우편이나 암호가 맞지 안소.';
    if (/already registered|already been registered/i.test(m)) return '이미 등록된 전자우편이오. 「입장」으로 드러오시오.';
    if (/Password should be at least/i.test(m)) return '암호는 여섯 자 이상이어야 하오.';
    if (/Email not confirmed/i.test(m)) return '전자우편 확인을 아직 안 하셧소.';
    if (/provider is not enabled|Unsupported provider/i.test(m)) return '이 입장 방법은 아직 열리지 안앗소 (Supabase 설정 확인).';
    if (/rate limit/i.test(m)) return '잠시 뒤에 다시 하시오.';
    return m;
  }
  function hello() { if (me) toast('「' + esc(me.nickname) + '」 님, 입장하셧소. 錢 ' + me.coins, '<a href="' + BASE + 'reader-room.html">독자의 방 →</a>', 5000); }

  var tT = null;
  function toast(html, act, ms) {
    css(); var t = D.querySelector('.ykr-toast2'); if (t) t.remove();
    t = D.createElement('div'); t.className = 'ykr-toast2'; t.setAttribute('role', 'status'); t.innerHTML = '<span>' + html + '</span>' + (act || '');
    D.body.appendChild(t); requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add('on'); }); });
    clearTimeout(tT); tT = setTimeout(function () { t.classList.remove('on'); setTimeout(function () { t.remove(); }, 600); }, ms || 6000);
    var b = t.querySelector('[data-open]'); if (b) b.onclick = function () { openModal(b.getAttribute('data-open')); };
  }
  API.toast = toast;

  /* ── 본지 윗줄: 「독자 입장」 / 「○○ · 錢」 ── */
  function paintChip() {
    var a = D.querySelector('.yk-who'); if (!a) return;
    if (me) { a.innerHTML = '<span class="hj l">' + esc(me.nickname) + '</span> · <b>錢 ' + me.coins + '</b>'; a.href = BASE + 'reader-room.html'; a.title = '독자의 방'; }
    else { a.innerHTML = '<span class="hj l" data-ko="로그인">독자 입장</span>'; a.href = '#'; a.title = '독자 등록 · 입장'; }
  }
  function mountChip() {
    var nav = D.querySelector('.topbar nav'); if (!nav || D.querySelector('.yk-who')) return;
    var a = D.createElement('a'); a.className = 'yk-who'; a.href = '#';
    var room = D.createElement('a'); room.href = BASE + 'reader-room.html'; room.innerHTML = '<span class="hj l" data-ko="독자의 방">독자의 방</span>';
    var s = nav.querySelector('.search'); nav.insertBefore(room, s || null); nav.insertBefore(a, s || null);
    a.addEventListener('click', function (e) { if (!me) { e.preventDefault(); openModal('in'); } });
    paintChip();
  }

  /* ── 사건 완독 → 적립 ── */
  /* 1014 · 적립 알림은 엔딩의 여운을 깨지 안케 — 「다른 사건」 칸이 보일 때 뜸 */
  function afterEnding(cb) {
    var t = D.getElementById('next-cases') || D.querySelector('.colophon');
    if (!t || !('IntersectionObserver' in W)) { setTimeout(cb, 9500); return; }
    var io = new IntersectionObserver(function (es) { if (es.some(function (x) { return x.isIntersecting; })) { io.disconnect(); setTimeout(cb, 1200); } }, { threshold: 0.25 });
    io.observe(t);
  }
  W.addEventListener('yk:read', function (e) {
    var c = e.detail; if (!CASE_NAME[c]) return;
    ready.then(function () {
      if (!me) { afterEnding(function () { toast('입장하면 「' + CASE_NAME[c] + '」 스크랩과 50錢을 받소.', '<button data-open="up">독자 등록</button>', 9000); }); return; }
      API.claimRead(c).then(function (got) { if (got !== null) afterEnding(function () { toast('「' + CASE_NAME[c] + '」 스크랩 한 장과 50錢이 독자의 방에 드러갓소.', '<a href="' + BASE + 'reader-room.html">방으로 →</a>', 8000); }); }).catch(function () {});
    });
  });

  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', mountChip); else mountChip();
})(window, document);
