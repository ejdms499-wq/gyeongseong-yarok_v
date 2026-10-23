/* 심인 광고면 — 「제가 그 사람이오」 · 「여기 잇소」 통지서 → 광고를 내림(發見)
   팀원이 만든 「제작 동료 모집 · 정기 독자 신청」을 옮김. 화면 시연용: 서버로 보내지 않고 이 컴퓨터에만 남김 */
(function () {
  'use strict';
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };

  /* 옛말 ↔ 오늘말 */
  var hover = window.matchMedia && matchMedia('(hover: hover)').matches;
  /* ── 옛말 ↔ 오늘말: shared/yk-ink-engine.js 단일 엔진에서 통합 처리 ── */

  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var KEY = 'yk-seek';
  function load() { try { return JSON.parse(localStorage.getItem(KEY) || '{}'); } catch (e) { return {}; } }
  function save(d) { try { localStorage.setItem(KEY, JSON.stringify(d)); } catch (e) {} }

  var TEXT = {
    crew: { t: '자 수 서', s: '「동료를 차즘」 광고를 보고 통지하오. 그 사람은 — 나요. (도망칠 생각은 업소)', go: '자수하기' },
    reader: { t: '통 지 서', s: '「독자를 차즘」 광고를 보고 통지하오. 그 사람은 — 여기 잇소. 화면을 내리다 말앗슬 뿐이오.', go: '부치기' }
  };
  function hj(o, n) { return '<span class="hj" tabindex="0" data-ko="' + n + '">' + o + '</span>'; }
  /* 판결 — 죄가 만흘수록 형이 무거워짐 (형벌은 모다 야근) */
  var SENT = ['훈방. 단, 차는 본인이 끓일 것', '야근 사흘. 집행유예 업슴', '야근 한 달. 식은 차 무제한 지급', '무기 야근. 가석방은 다음 호 발행 뒤 심사', '종신 편집국 근무. 이불은 지참 허가'];
  function foundLine(k, d) {
    var n = esc(d.name || '아무개');
    if (k === 'crew') {
      var c = (d.crime || []).length, sv = SENT[Math.min(c, SENT.length - 1)];
      var cr = c ? esc(d.crime.join(' · ')) : '죄 업슴 (그것이 가장 수상함)';
      return '<span class="sk-verdict"><b>판　결</b><em>죄목 ' + c + '건 — ' + cr + '</em><strong>' + esc(sv) + '</strong><i>京城野錄 編輯局 審人係</i></span>' +
        hj(n + ' 님, 자수를 접수하엿소. 수색대는 해산하오. 현상금(식은 차 한 잔)은 본인이 마시시오.', n + ' 님, 자수를 접수했습니다. 수색대는 해산합니다. 현상금(식은 차 한 잔)은 본인이 드세요.') + '<small>' + hj('※ 시연 화면이라 실제로 접수되지 안소. 안심하시오.', '※ 시연 화면이라 실제로 접수되지 않습니다. 안심하세요.') + '</small><button type="button" data-undo="crew">광고 다시 걸기 (탈옥)</button>';
    }
    return k === 'crew' ? '' + '<small>' + hj('※ 시연 화면이라 실제로 접수되지 안소. 안심하시오.', '※ 시연 화면이라 실제로 접수되지 않습니다. 안심하세요.') + '</small><button type="button" data-undo="crew">광고 다시 걸기</button>'
      : '<span class="sk-verdict r"><b>發　見</b><em>최종 목격지 — ' + esc(d.where || '본지 삼 면 하단') + '</em><strong>' + (d.where === '지금 이 칸' ? '발견 장소가 너무 갓가워 수색대가 놀랏소' : '수색대 해산 · 광고 내림') + '</strong><i>京城野錄 編輯局 審人係</i></span>' + hj(n + ' 님, 차잣소. 다음 호부터 남보다 먼저 배달하리다. 이제 못 빠져나가오.', n + ' 님, 찾았습니다. 다음 호부터 남보다 먼저 보내 드립니다. 이제 못 빠져나갑니다.') + '<small>' + hj('※ 시연 화면이라 실제로 메일이 가지 안소. 안심하시오.', '※ 시연 화면이라 실제로 메일이 가지 않습니다. 안심하세요.') + '</small><button type="button" data-undo="reader">광고 다시 걸기</button>';
  }
  function paint() {
    var d = load();
    [['crew', '#adCrew'], ['reader', '#adReader']].forEach(function (p) {
      var ad = $(p[1]), v = d[p[0]];
      ad.classList.toggle('found', !!v);
      $('.sk-found', ad).innerHTML = v ? foundLine(p[0], v) : '';
    });
  }
  document.addEventListener('click', function (e) {
    var u = e.target.closest('[data-undo]'); if (!u) return;
    var d = load(); delete d[u.dataset.undo]; save(d); paint();
  });

  /* 통지서 */
  var modal = $('#modal'), form = $('#mForm'), cur = null, tab = 'new', last = null;
  function open(k) {
    cur = k; last = document.activeElement;
    $('#mT').textContent = TEXT[k].t; $('#mS').textContent = TEXT[k].s; $('#mGo').textContent = TEXT[k].go;
    $$('.sk-fields', form).forEach(function (f) { f.classList.toggle('on', f.dataset.for === k); });
    $$('[aria-invalid]', form).forEach(function (x) { x.removeAttribute('aria-invalid'); });
    modal.hidden = false; requestAnimationFrame(function () { modal.classList.add('on'); });
    setTimeout(function () { var f = $('.sk-fields.on input:not([hidden]), .sk-fields.on textarea', form); if (f) f.focus(); }, 60);
  }
  function close() { modal.classList.remove('on'); setTimeout(function () { modal.hidden = true; if (last) last.focus(); }, 280); }
  $$('[data-open]').forEach(function (b) { b.addEventListener('click', function () { open(b.dataset.open); }); });
  $('#mX').addEventListener('click', close);
  modal.addEventListener('click', function (e) { if (e.target === modal) close(); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && !modal.hidden) close(); });
  $$('.sk-tabs button').forEach(function (b) {
    b.addEventListener('click', function () {
      tab = b.dataset.t;
      $$('.sk-tabs button').forEach(function (x) { x.setAttribute('aria-selected', x === b); });
      $$('[data-only]', form).forEach(function (x) { x.hidden = x.dataset.only !== tab; });
    });
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var f = form.elements, bad = null;
    function need(el, ok) { el.setAttribute('aria-invalid', ok ? 'false' : 'true'); if (!ok && !bad) bad = el; }
    var rec;
    if (cur === 'crew') {
      need(f.name, f.name.value.trim()); need(f.reason, f.reason.value.trim());
      rec = { name: f.name.value.trim(), field: f.field.value, reason: f.reason.value.trim(), crime: $$('input[name=crime]:checked', form).map(function (x) { return x.value; }) };
    } else {
      if (tab === 'new') need(f.rname, f.rname.value.trim());
      need(f.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.value.trim()));
      rec = { name: tab === 'new' ? f.rname.value.trim() : f.email.value.trim().split('@')[0], email: f.email.value.trim(), where: f.where.value };
    }
    if (bad) { bad.focus(); return; }
    rec.at = new Date().toISOString();
    var d = load(); d[cur] = rec; save(d);
    close();
    var ad = cur === 'crew' ? $('#adCrew') : $('#adReader');
    setTimeout(function () { ad.scrollIntoView({ behavior: 'smooth', block: 'center' }); paint(); }, 320);
  });

  paint();
})();

/* 尋猫 — 누르면 고양이가 「ㄱ」을 물고 튀어나와 냐옹 (소리 파일 없이 브라우저가 직접 만듦) */
(function () {
  'use strict';
  var ad = document.getElementById('adCat'); if (!ad) return;
  var AC = window.AudioContext || window.webkitAudioContext, ctx = null, t0 = 0;
  function meow() {
    if (!AC) return;
    try {
      ctx = ctx || new AC(); if (ctx.state === 'suspended') ctx.resume();
      var now = ctx.currentTime, dur = .62 + Math.random() * .18, base = 520 + Math.random() * 120;
      var o = ctx.createOscillator(), o2 = ctx.createOscillator(), f = ctx.createBiquadFilter(), f2 = ctx.createBiquadFilter(), g = ctx.createGain(), mix = ctx.createGain();
      o.type = 'sawtooth'; o2.type = 'triangle';
      /* 냐— (올라감) 옹 (내려감) */
      [o, o2].forEach(function (x, k) {
        var m = k ? 2 : 1;
        x.frequency.setValueAtTime(base * .78 * m, now);
        x.frequency.linearRampToValueAtTime(base * 1.32 * m, now + dur * .35);
        x.frequency.linearRampToValueAtTime(base * 1.12 * m, now + dur * .6);
        x.frequency.exponentialRampToValueAtTime(base * .62 * m, now + dur);
      });
      f.type = 'bandpass'; f.Q.value = 6;               /* 입 모양: 이 → 아 → 오 */
      f.frequency.setValueAtTime(1900, now); f.frequency.linearRampToValueAtTime(1300, now + dur * .45); f.frequency.linearRampToValueAtTime(700, now + dur);
      f2.type = 'lowpass'; f2.frequency.value = 3200;
      var vib = ctx.createOscillator(), vg = ctx.createGain(); vib.frequency.value = 7; vg.gain.value = 9; vib.connect(vg); vg.connect(o.frequency); vg.connect(o2.frequency);
      o.connect(mix); o2.connect(mix); mix.gain.value = .5; mix.connect(f); f.connect(f2); f2.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(0, now); g.gain.linearRampToValueAtTime(.28, now + .06); g.gain.setValueAtTime(.26, now + dur * .55); g.gain.exponentialRampToValueAtTime(.001, now + dur);
      [o, o2, vib].forEach(function (x) { x.start(now); x.stop(now + dur + .05); });
    } catch (e) {}
  }
  var hide = null;
  function pop() {
    if (Date.now() - t0 < 500) return; t0 = Date.now();
    ad.classList.remove('mew'); void ad.offsetWidth; ad.classList.add('mew');
    meow();
    clearTimeout(hide); hide = setTimeout(function () { ad.classList.remove('mew'); }, 1800);
  }
  ad.addEventListener('click', function (e) { if (e.target.closest('.hj') && e.detail === 0) return; pop(); });
  ad.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); pop(); } });
})();

/* 광고면 아래칸 — 부고 · 현상 수배 · 사과 · 문 두드림 */
(function () {
  'use strict';
  var $ = function (i) { return document.getElementById(i); };
  var AC = window.AudioContext || window.webkitAudioContext, ctx = null;
  function ac() { if (!AC) return null; ctx = ctx || new AC(); if (ctx.state === 'suspended') ctx.resume(); return ctx; }
  function knock(t0, loud) {   /* 나무문을 주먹으로 */
    var c = ac(); if (!c) return; var t = c.currentTime + t0;
    var o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(180, t); o.frequency.exponentialRampToValueAtTime(70, t + .09);
    g.gain.setValueAtTime(loud, t); g.gain.exponentialRampToValueAtTime(.001, t + .14); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + .16);
    var n = c.createBufferSource(), b = c.createBuffer(1, c.sampleRate * .03, c.sampleRate), d = b.getChannelData(0); for (var i = 0; i < d.length; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / d.length);
    var f = c.createBiquadFilter(); f.type = 'lowpass'; f.frequency.value = 900; var gn = c.createGain(); gn.gain.value = loud * .6; n.buffer = b; n.connect(f); f.connect(gn); gn.connect(c.destination); n.start(t);
  }
  /* 부고 — 분향 */
  var ob = $('obitB'), on = 0, OB = ['', '고인(기계)께서 감사를 표할 수 업소', '세 번째 향 — 야근조가 울컥함', '분향소에서 원두 냄새가 나기 시작함', '고인이 잠시 「삐」 소리를 냇다는 제보가 잇소', '그만 하시오. 고인이 다시 켜질라'];
  if (ob) ob.addEventListener('click', function () { on++; $('obitN').textContent = '· 향 ' + on + ' 대'; var p = ob.parentNode.querySelector('.sk-obit-msg') || ob.parentNode.appendChild(Object.assign(document.createElement('p'), { className: 'sk-obit-msg' })); p.textContent = OB[Math.min(on, OB.length - 1)] || ''; ob.parentNode.classList.add('lit'); });
  /* 현상 수배 — 자정까지 남은 시간 (매일 밤 온다) */
  var dl = $('dl');
  if (dl) (function tick() { var n = new Date(), m = new Date(n); m.setHours(24, 0, 0, 0); var s = Math.floor((m - n) / 1000), h = Math.floor(s / 3600), mm = Math.floor(s % 3600 / 60), ss = s % 60;
    dl.textContent = (h < 10 ? '0' : '') + h + ':' + (mm < 10 ? '0' : '') + mm + ':' + (ss < 10 ? '0' : '') + ss; $('adWanted').classList.toggle('near', s < 3600); setTimeout(tick, 1000); })();
  /* 문 두드림 — 두드리면, 셋째부터는 저쪽에서도 두드림 */
  var kn = $('adKnock'), kc = 0, KN = ['짐작 가는 이는 이 칸을 두드려 보시오.', '…대답이 업소.', '…대답이 업소.', '똑. 똑. 똑. — 이번엔 저쪽에서.', '두드린 이를 차잣소. 당신이엇소.', '그만 두드리시오. 저쪽이 겁을 먹엇소.'];
  function hit() {
    kc++; [0, .22, .44].forEach(function (d) { knock(d, .5); });
    if (kc === 3) { setTimeout(function () { [0, .3, .6].forEach(function (d) { knock(d, .22); }); kn.classList.add('back'); }, 1500); }
    kn.classList.remove('shake'); void kn.offsetWidth; kn.classList.add('shake');
    setTimeout(function () { $('knockN').firstChild.textContent = KN[Math.min(kc, KN.length - 1)]; }, kc === 3 ? 2400 : 700);
  }
  if (kn) { kn.addEventListener('click', hit); kn.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); hit(); } }); }
})();

/* v6 (1012) · 유성기 「심인계 행진곡」 · 실적판 · 추보 · 정정의 정정 · 도망가기 · 부활 */
(function () {
  'use strict';
  var $ = function (i) { return document.getElementById(i); };
  var D = document;
  function hj(o, n) { return '<span class="hj" tabindex="0" data-ko="' + n + '">' + o + '</span>'; }

  /* ── 유성기 : 처음 아무 데나 누르면 저절로 돌기 시작 · 단추로 끄고 켬 ── */
  var snd = $('skSnd'), bgm = $('skBgm'), off = false, started = false;
  function set(on) {
    if (!bgm) return;
    if (on) { bgm.volume = .55; var p = bgm.play(); if (p && p.catch) p.catch(function () {}); }
    else bgm.pause();
    snd.setAttribute('aria-pressed', on ? 'true' : 'false');
    D.body.classList.toggle('sk-play', !!on);
  }
  if (snd && bgm) {
    snd.addEventListener('click', function (e) { e.stopPropagation(); started = true; off = !bgm.paused; set(!off); });
    /* 들어오자마자 틂 (1013) — 막히면 처음 누르거나 · 키를 치거나 · 만지는 순간 */
    function first(e) {
      if (started || off || (e && e.target && e.target.closest && e.target.closest('#skSnd'))) return;
      started = true; set(true); ['pointerdown', 'keydown', 'touchstart', 'click'].forEach(function (t) { D.removeEventListener(t, first, true); });
    }
    ['pointerdown', 'keydown', 'touchstart', 'click'].forEach(function (t) { D.addEventListener(t, first, true); });
    bgm.volume = .55; var p0 = bgm.play(); if (p0 && p0.then) p0.then(function () { started = true; set(true); }, function () {});
  }

  /* ── 실적판 ── */
  var found = 0;
  function gotOne() {
    found++; var f = $('bFound'), l = $('bLost');
    if (f) { f.textContent = found; f.classList.remove('bump'); void f.offsetWidth; f.classList.add('bump'); }
    if (l) l.textContent = Math.max(0, 9 - found);
  }

  /* ── 작은 광고 추보 ── */
  [].forEach.call(D.querySelectorAll('.sk-upb'), function (b) {
    b.addEventListener('click', function () { var ad = b.closest('.sk-ad'); if (ad.classList.contains('upd')) return; ad.classList.add('upd'); gotOne(); });
  });
  /* 통지서로 차즌 것도 실적에 셈 */
  var mf = $('mForm'); if (mf) mf.addEventListener('submit', function () { setTimeout(function () { if (D.querySelector('.sk-ad.big.found')) gotOne(); }, 400); });

  /* ── 사과 : 누를 때마다 정정이 하나씩 ── */
  var FIX = [
    ['정정', '엄지손가락이 아니엇소. 편집장은 그날 장갑을 끼고 잇섯소.', '엄지손가락이 아니었습니다. 편집장은 그날 장갑을 끼고 있었습니다.'],
    ['정정의 정정', '장갑이 아니라 편집장의 귀엿소. 사진 찍을 때 귀를 기우리고 잇섯다 함.', '장갑이 아니라 편집장의 귀였습니다. 사진 찍을 때 귀를 기울이고 있었다고 합니다.'],
    ['정정의 정정의 정정', '편집장이 아니라 사환 김 군이엇소. 김 군은 「나는 그날 쉬엇다」 함.', '편집장이 아니라 사환 김 군이었습니다. 김 군은 "나는 그날 쉬었다"고 합니다.'],
    ['최종 정정', '그날 편집국엔 아모도 업섯소. 귀신께 드린 사과를 취소하오.', '그날 편집국엔 아무도 없었습니다. 귀신께 드린 사과를 취소합니다.'],
    ['사과', '귀신으로부터 항의 편지가 왓소. 다시 깁히 사과드리오. 편지는 젖어 잇섯소.', '귀신에게서 항의 편지가 왔습니다. 다시 깊이 사과드립니다. 편지는 젖어 있었습니다.'],
    ['알림', '이 건에 관한 정정은 이제 밧지 안소. 귀신도 마찬가지요.', '이 건에 대한 정정은 이제 받지 않습니다. 귀신도 마찬가지입니다.']
  ];
  var sorry = $('adSorry'), fx = $('sorryFix'), fi = 0;
  function more() {
    if (!fx || fi >= FIX.length) return;
    var f = FIX[fi++], li = D.createElement('li');
    li.innerHTML = '<b>' + f[0] + '</b>' + hj(f[1], f[2]); fx.appendChild(li);
    var n = $('sorryN'); if (n) n.innerHTML = fi < FIX.length ? hj('한 번 더 누르면 또 정정이 나오.', '한 번 더 누르면 또 정정이 나옵니다.') : hj('정정 접수 마감.', '정정 접수 마감.');
    if (fi === 4) gotOne();
  }
  if (sorry) { sorry.addEventListener('click', function (e) { if (e.target.closest('.hj') && e.detail === 0) return; more(); });
    sorry.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); more(); } }); }

  /* ── 현상 수배 : 도망가면 마감이 더 빨리 옴 (화면에서만) ── */
  var RUN = ['도망쳣소. 마감이 십 분 빨라졋소.', '또 도망쳣소. 마감이 뛰기 시작햇소.', '마감이 택시를 잡앗소.', '마감이 당신 집 주소를 아오.', '마감이 바로 뒤에 잇소. 도라보지 마시오.', '잡혓소. 오늘은 야근이오.'];
  var RUNK = ['도망쳤습니다. 마감이 10분 빨라졌습니다.', '또 도망쳤습니다. 마감이 뛰기 시작했습니다.', '마감이 택시를 잡았습니다.', '마감이 당신 집 주소를 압니다.', '마감이 바로 뒤에 있습니다. 돌아보지 마세요.', '잡혔습니다. 오늘은 야근입니다.'];
  var rb = $('runB'), rn = $('runN'), wa = $('adWanted'), ri = 0, dl = $('dl'), cut = 0;
  if (rb) rb.addEventListener('click', function () {
    var k = Math.min(ri, RUN.length - 1); rn.innerHTML = hj(RUN[k], RUNK[k]); ri++;
    cut += 600 * ri; wa.classList.remove('flee'); void wa.offsetWidth; wa.classList.add('flee');
    if (k === RUN.length - 1) { rb.disabled = true; rb.style.opacity = .4; gotOne(); }
  });
  /* 원래 시계 위에 덮어 씀 — 도망친 만큼 앞당김 */
  if (dl) setInterval(function () {
    if (!cut) return;
    var n = new Date(), m = new Date(n); m.setHours(24, 0, 0, 0);
    var s = Math.max(0, Math.floor((m - n) / 1000) - cut), h = Math.floor(s / 3600), mm = Math.floor(s % 3600 / 60), ss = s % 60;
    dl.textContent = (h < 10 ? '0' : '') + h + ':' + (mm < 10 ? '0' : '') + mm + ':' + (ss < 10 ? '0' : '') + ss;
  }, 250);

  /* ── 부고 : 향을 열 대 피우면 고인(기계)이 다시 켜짐 ── */
  var ob = $('obitB'), oc = 0;
  if (ob) ob.addEventListener('click', function () {
    if (++oc !== 10) return;
    var c = ob.closest('.sk-l'), h = c.querySelector('h3');
    setTimeout(function () {
      h.innerHTML = hj('【정정】 본사 차 끓이는 기계 부활', '[정정] 본사 차 끓이는 기계 부활');
      var p = c.querySelector('.sk-obit-msg'); if (p) p.innerHTML = hj('삐—. 고인께서 다시 물을 끓이기 시작하엿소. 부고를 거두오. 원두는 돌려드리지 안소.', '삐—. 고인께서 다시 물을 끓이기 시작했습니다. 부고를 거둡니다. 원두는 돌려드리지 않습니다.');
      c.classList.add('flee'); gotOne();
    }, 300);
  });
  /* ── 문 두드림 : 다섯 번째에 차잣소 → 실적 ── */
  var kn = $('adKnock'), kc = 0;
  if (kn) kn.addEventListener('click', function () { if (++kc === 4) setTimeout(gotOne, 2400); });
  /* ── 고양이 : 다섯 번 누르면 차즘 ── */
  var cat = $('adCat'), cc = 0;
  if (cat) cat.addEventListener('click', function () { if (++cc === 5) { gotOne(); var last = [].filter.call(D.querySelectorAll('.sk-board em'), function (x) { return /행방불명/.test(x.textContent); })[0]; if (last) last.innerHTML = hj('차즘 (ㄱ은 입에)', '찾음 (ㄱ은 입에)'); if (window.ykCatFound) window.ykCatFound(); } });
})();

/* v7 (1012) · 사진 속 장난 — 이불 속 동료 · 독자가 남긴 단서 넷 */
(function () {
  'use strict';
  var D = document, $ = function (i) { return D.getElementById(i); };
  function hj(o, n) { return '<span class="hj" tabindex="0" data-ko="' + n + '">' + o + '</span>'; }
  var AC = window.AudioContext || window.webkitAudioContext, ctx = null;
  function ac() { if (!AC) return null; ctx = ctx || new AC(); if (ctx.state === 'suspended') ctx.resume(); return ctx; }
  function say(el, who, o, n, ms) {
    el.innerHTML = (who ? '<b>' + who + '</b>' : '') + hj(o, n); el.classList.add('on');
    clearTimeout(el._t); if (ms) el._t = setTimeout(function () { el.classList.remove('on'); }, ms);
  }
  function bump() {   /* 실적판 「차즘」 하나 올림 (앞 스크립트와 같은 자리) */
    var f = $('bFound'), l = $('bLost'); if (!f) return;
    f.textContent = (+f.textContent || 0) + 1; f.classList.remove('bump'); void f.offsetWidth; f.classList.add('bump');
    if (l) l.textContent = Math.max(0, (+l.textContent || 0) - 1);
  }
  /* 코 고는 소리 — 숨 들이쉬고 드르렁 */
  function snore() {
    var c = ac(); if (!c) return; var t = c.currentTime;
    var len = 1.4, b = c.createBuffer(1, c.sampleRate * len, c.sampleRate), d = b.getChannelData(0);
    for (var i = 0; i < d.length; i++) { var x = i / c.sampleRate; d[i] = (Math.random() * 2 - 1) * (x < .9 ? Math.pow(Math.sin(Math.PI * x / .9), 2) * (.55 + .45 * Math.sign(Math.sin(2 * Math.PI * 38 * x))) : 0); }
    var s = c.createBufferSource(), f = c.createBiquadFilter(), g = c.createGain(); f.type = 'lowpass'; f.frequency.value = 520; g.gain.value = .5;
    s.buffer = b; s.connect(f); f.connect(g); g.connect(c.destination); s.start(t);
  }
  function mumble(n) {   /* 이불 속 웅얼거림 */
    var c = ac(); if (!c) return; var t = c.currentTime;
    for (var k = 0; k < n; k++) {
      var o = c.createOscillator(), f = c.createBiquadFilter(), g = c.createGain(), st = t + k * .16;
      o.type = 'sawtooth'; o.frequency.setValueAtTime(140 + Math.random() * 50, st); o.frequency.linearRampToValueAtTime(110, st + .14);
      f.type = 'lowpass'; f.frequency.value = 600; g.gain.setValueAtTime(0, st); g.gain.linearRampToValueAtTime(.12, st + .03); g.gain.linearRampToValueAtTime(0, st + .15);
      o.connect(f); f.connect(g); g.connect(c.destination); o.start(st); o.stop(st + .17);
    }
  }
  function shake(fig) { fig.classList.remove('shake'); void fig.offsetWidth; fig.classList.add('shake'); }

  /* ── 동료 : 이불 ── */
  var cp = $('crewPh'), ch = $('crewHot'), cs = $('crewSay'), ci = 0;
  var CREW = [
    ['', '드르렁…… 드르렁……', '드르렁…… 드르렁……', snore],
    ['이불 속', '음냐… 마감은… 내일이오…', '음… 마감은… 내일이에요…', function () { mumble(5); }],
    ['이불 속', '오 분만……', '5분만……', function () { mumble(3); }],
    ['이불 속', '……십 분만.', '……10분만.', function () { mumble(2); }],
    ['이불 속', '알앗소, 알앗소! 자수하겟소!', '알았어요, 알았어요! 자수할게요!', function () { mumble(7); }]
  ];
  if (ch) ch.addEventListener('click', function () {
    if (ci >= CREW.length) return;
    var s = CREW[ci++]; s[3](); shake(cp);
    if (ci === 4) cp.classList.add('swap');
    say(cs, s[0], s[1], s[2], ci < CREW.length ? 2600 : 0);
    var tip = $('crewTip');
    if (ci === 1 && tip) tip.innerHTML = hj('☞ 더 흔들어 보시오', '☞ 더 흔들어 보세요');
    if (ci === CREW.length) {
      ch.classList.add('seen'); bump();
      if (tip) { tip.innerHTML = hj('차잣소 — 이불 속에 잇섯소. 자수서를 받으시오.', '찾았어요 — 이불 속에 있었어요. 자수서를 받으세요.'); tip.classList.add('done'); }
      setTimeout(function () { var go = D.querySelector('[data-open="crew"]'); if (go) go.click(); }, 1800);
    }
  });

  /* ── 독자 : 단서 넷 ── */
  var rp = $('readPh'), rs = $('readSay'), got = {}, bite = 0;
  if (rp) {
    var sh = D.createElement('span'); sh.className = 'ix-shadow'; sh.setAttribute('aria-hidden', 'true'); rp.appendChild(sh);
  }
  var CLUE = {
    news: function () { return ['신문', '삼 면 하단이 접혀 잇소. 연필로 「이따 마저」라 써 잇소.', '3면 아래쪽이 접혀 있어요. 연필로 "이따 마저"라고 써 있어요.']; },
    cup: function () { return ['찻잔', '아즉 따뜻하오. 멀리 가지 안앗소!', '아직 따뜻해요. 멀리 가지 않았어요!']; },
    tteok: function () {
      bite = Math.min(3, bite + 1); rp.setAttribute('data-bite', bite);
      return bite === 1 ? ['떡', '한 입 먹엇소. …맛잇소.', '한 입 먹었어요. …맛있어요.']
        : bite === 2 ? ['떡', '두 입 먹엇소. 독자에겐 비밀이오.', '두 입 먹었어요. 독자에겐 비밀이에요.']
        : (function () {
            if (!rp.classList.contains('swap')) { rp.classList.add('swap');
              [].forEach.call(rp.querySelectorAll('.ix-hot[data-p2]'), function (h) { h.setAttribute('style', h.dataset.p2); }); }
            return ['떡', '다 먹엇소. 접시엔 부스러기만… 독자가 도라오면 큰일이오.', '다 먹었어요. 접시엔 부스러기만… 독자가 돌아오면 큰일이에요.'];
          })();
    },
    win: function () {
      rp.classList.add('dim'); var s = rp.querySelector('.ix-shadow'); if (s) { s.classList.remove('on'); void s.offsetWidth; s.classList.add('on'); }
      setTimeout(function () { rp.classList.remove('dim'); if (s) s.classList.remove('on'); }, 3200);
      return ['창밧', '방금 누가 창밧을 지나갓소! …화면을 내리는 손놀림이엇소.', '방금 누가 창밖을 지나갔어요! …화면을 내리는 손놀림이었어요.'];
    }
  };
  [].forEach.call(D.querySelectorAll('#readPh .ix-hot'), function (b) {
    b.addEventListener('click', function () {
      var k = b.dataset.c, r = CLUE[k](); say(rs, r[0], r[1], r[2], 3200);
      if (got[k]) return; got[k] = 1;
      var n = Object.keys(got).length, cn = $('clueN'); if (cn) cn.textContent = n;
      if (n === 4) setTimeout(function () {
        say(rs, '추리', '신문 · 찻잔 · 떡 · 창밧… 독자는 지금 이 화면 압헤 잇소. — 바로 당신이오.', '신문 · 찻잔 · 떡 · 창밖… 독자는 지금 이 화면 앞에 있어요. 바로 당신이에요.', 0);
        var tip = $('readTip'); if (tip) tip.classList.add('done'); bump();
      }, 3400);
    });
  });
})();

/* 납량란을 끝까지 닑은 독자 → 심인 급고 (같은 창에서 넘어왓을 때만) */
(function () {
  var box = document.getElementById('skNp'); if (!box) return;
  var d = null; try { d = JSON.parse(sessionStorage.getItem('yk-np-missing') || 'null'); } catch (e) {}
  if (!d) return;
  box.hidden = false;
  document.getElementById('skNpT').innerHTML = '<span class="hj" tabindex="0" data-ko="오늘 밤 ' + d.at + ', 납량란에서 마지막 초를 끈 뒤 소식이 끊겼습니다. 인상 — 촛불을 다 끄는 사람. 마지막으로 본 곳 — 이 화면 앞.">오늘 밤 ' + d.at + ', 납량란에서 마지막 초를 끈 뒤 소식이 끈겻소. 인상 — 촛불을 다 끄는 자. 마지막 목격지 — 이 화면 압.</span>';
  document.getElementById('skNpGo').addEventListener('click', function () {
    document.getElementById('skNpR').textContent = '차잣소. …그런데 납량란에서 도라온 이가 정말 당신 맞소?';
    var f = document.getElementById('bFound'); if (f) { f.textContent = (+f.textContent || 0) + 1; }
    this.disabled = true; this.style.opacity = .4;
  });
})();

/* 1013 · 고양이 출몰 — 광고 칸 가장자리 여기저기서 먹색 고양이가 불쑥 튀어나왓다 숨음.
   · 나온 고양이를 누르면 「냐!」 하고 펄쩍 뛰어 사라지고, 작은 「정정 보도」 쪽지가 남음 (블랙 코미디)
   · 다섯 마리를 잡으면 고양이 떼가 한꺼번에 튀어나옴 · 번쩍임 업슴 · 움직임 줄이기면 저절로 나오지 안음 */
(function () {
  'use strict';
  var D = document, W = window;
  var reduce = W.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  function hj(o, n) { return '<span class="hj" tabindex="0" data-ko="' + n + '">' + o + '</span>'; }
  var SPOTS = '.sk-low .sk-l, .sk-ad, .sk-big, .sk-hero, .sk-board';
  var LINES = [
    ['「고양이 행방불명」은 오보이엿소. 고양이는 처음부터 여기 잇섯소.', '「고양이 행방불명」은 오보였다. 고양이는 처음부터 여기 있었다.'],
    ['고양이 한 마리 목격. 편집국은 이를 「특종」이라 부르기로 하엿소.', '고양이 한 마리 목격. 편집국은 이를 「특종」이라 부르기로 했다.'],
    ['찾는 고양이가 아니오. 이 고양이는 — 사람을 찾는 중이오.', '찾는 고양이가 아니다. 이 고양이는 — 사람을 찾는 중이다.'],
    ['사례금 오십 전은, 이미 고양이가 먹엇소.', '사례금 오십 전은, 이미 고양이가 먹었다.'],
    ['목격자 증언 — 「분명 검엇소. 아마 고양이엿소. 아니면 먹물이엇소.」', '목격자 증언 — 「분명 검었다. 아마 고양이였다. 아니면 먹물이었다.」'],
    ['고양이가 활자 「ㄱ」을 또 물어 갓소. 내일 지면엔 「고양이」 대신 「고양」으로 나가오.', '고양이가 활자 「ㄱ」을 또 물어 갔다. 내일 지면엔 「고양이」 대신 「고양」으로 나간다.'],
    ['편집장 의자 점거 사흘째. 이번엔 편집장이 행방불명이오.', '편집장 의자 점거 사흘째. 이번엔 편집장이 행방불명이다.'],
    ['부고란에 한 줄 비워 두시오. — 쥐 일동', '부고란에 한 줄 비워 두세요. — 쥐 일동'],
    ['「고양이를 찾앗다」는 신고 열세 건. 모다 다른 고양이엿소.', '「고양이를 찾았다」는 신고 열세 건. 모두 다른 고양이였다.'],
    ['이 고양이는 마감을 물고 도망갓소. 독자 여러분의 양해를 구하오.', '이 고양이는 마감을 물고 도망갔다. 독자 여러분의 양해를 구한다.'],
    ['본사는 고양이의 발언에 책임지지 아니하오.', '본사는 고양이의 발언에 책임지지 않는다.'],
    ['쥐를 찻는 광고는 실리지 안소. 고양이가 먼저 차즘으로.', '쥐를 찾는 광고는 싣지 않는다. 고양이가 먼저 찾으므로.']
  ];
  var SAY = ['냐!', '냥?', '먀—', '캭', '…냐', '냐아'];
  var CAT = '<img src="assets/seek/cat_peek.png" alt="" draggable="false">';   /* 활자 상자 광고의 그 고양이와 같은 놈 */
  var css = D.createElement('style');
  css.textContent =
    '.yk-cat{position:absolute;z-index:6;width:calc(100px * var(--s,1));height:calc(57px * var(--s,1));pointer-events:none;overflow:hidden}' +
    '.yk-cat button{position:absolute;left:0;bottom:0;width:100%;height:100%;padding:0;border:0;background:none;cursor:pointer;pointer-events:auto;transform:translateY(105%);transition:transform .42s cubic-bezier(.3,1.6,.5,1)}' +
    '.yk-cat.out button{transform:translateY(6%)}.yk-cat.out img{animation:ykCatTwitch 1.6s ease-in-out .5s infinite}' +
    '@keyframes ykCatTwitch{0%,70%,100%{transform:none}78%{transform:rotate(-4deg) translateY(1px)}86%{transform:rotate(3deg)}}' +
    '.yk-cat.peek button{transform:translateY(46%)}' +
    '.yk-cat img{display:block;width:100%;height:100%;object-fit:contain;object-position:bottom;pointer-events:none;-webkit-user-drag:none}' +
    '.yk-cat .c-head,.yk-cat .c-ear,.yk-cat .c-paw{fill:#1e1913}.yk-cat .c-ear-in{fill:#3a2e24}.yk-cat .c-eye{fill:#e2cf96}.yk-cat .c-nose{fill:#6e4a3a}' +
    '.yk-cat .c-pupil{fill:#1e1913;transform-box:fill-box;transform-origin:center;animation:ykCatLook 2.4s ease-in-out infinite}' +
    '.yk-cat .c-mouth{fill:none;stroke:#8b7c66;stroke-width:1.2}.yk-cat .c-wh{stroke:#8b7c66;stroke-width:1;fill:none}' +
    '.yk-cat .c-eye{transform-box:fill-box;transform-origin:center;animation:ykCatBlink 3.2s steps(1) infinite}' +
    '@keyframes ykCatLook{0%,30%{transform:translateX(0)}40%,65%{transform:translateX(3px)}75%,100%{transform:translateX(-2px)}}' +
    '@keyframes ykCatBlink{0%,92%{transform:scaleY(1)}94%{transform:scaleY(.12)}}' +
    /* 가장자리마다 방향 */
    '.yk-cat.s-top{bottom:100%}.yk-cat.s-bot{top:100%;transform:scaleY(-1)}' +
    '.yk-cat.s-left{right:100%;transform:rotate(-90deg);transform-origin:100% 100%}.yk-cat.s-right{left:100%;transform:rotate(90deg);transform-origin:0 100%}' +
    /* 잡으면 펄쩍 */
    '.yk-cat.caught{overflow:visible}.yk-cat.caught button{animation:ykCatJump .7s cubic-bezier(.3,0,.6,1) forwards}' +
    '@keyframes ykCatJump{0%{transform:translateY(8%)}35%{transform:translateY(-70%) rotate(-14deg)}100%{transform:translateY(160%) rotate(20deg);opacity:0}}' +
    '.yk-cat .say{position:absolute;left:70px;top:-8px;font:900 14px/1 "Noto Serif KR",serif;color:#1e1913;white-space:nowrap;opacity:0;transform:rotate(10deg)}' +
    '.yk-cat.caught .say{opacity:1;transition:opacity .15s}' +
    /* 정정 보도 쪽지 */
    '.yk-catnote{position:absolute;z-index:7;max-width:230px;padding:9px 12px 8px;background:#f1e7d0;border:1px solid #3a3128;box-shadow:3px 4px 0 #1e191322;' +
      'font:500 12.5px/1.6 "Nanum Myeongjo","Noto Serif KR",serif;color:#1e1913;text-align:left;transform:rotate(-1.5deg);opacity:0;transition:opacity .4s ease,transform .4s ease;pointer-events:none}' +
    '.yk-catnote b{display:block;margin-bottom:3px;font:800 10.5px/1 "Noto Serif KR",serif;letter-spacing:.3em;color:#8a2a21}' +
    '.yk-catnote.on{opacity:1;transform:rotate(-1.5deg) translateY(-4px)}' +
    '.cat-found{margin:14px 0 0;max-height:0;overflow:hidden;opacity:0;transition:max-height 1.4s ease,opacity 1s ease .3s}.cat-found.on{max-height:420px;opacity:1}' +
    '.cf-img{position:relative}.cf-img img{display:block;width:100%;filter:sepia(.25) contrast(1.05);box-shadow:0 0 0 1px #3a3128}' +
    '.cf-rp{position:absolute;right:6px;bottom:6px;padding:2px 6px 1px;background:#1e1913cc;color:#efe3c8;font:500 10px/1.4 \"Noto Serif KR\",serif;letter-spacing:.12em}' +
    '.cat-found figcaption{margin-top:8px;font:500 12.5px/1.7 \"Nanum Myeongjo\",\"Noto Serif KR\",serif;color:#3a3128;text-align:left}' +
    '.cat-wanted{position:fixed;right:22px;bottom:22px;z-index:9000;width:230px;padding:14px 14px 12px;background:#efe5cd;border:1px solid #1e1913;box-shadow:0 0 0 5px #efe5cd,0 0 0 6px #1e1913,0 22px 40px -14px #000a;' +
      'transform:translateX(130%) rotate(4deg);transition:transform .9s cubic-bezier(.3,1.3,.5,1);text-align:center;color:#1e1913}' +
    '.cat-wanted.on{transform:translateX(0) rotate(-2deg)}' +
    '.cw-k{margin:0 0 8px;font:900 20px/1 \"Noto Serif KR\",serif;letter-spacing:.3em;padding-left:.3em;color:#8a2a21}' +
    '.cw-img{position:relative}.cw-img img{display:block;width:100%;filter:sepia(.3) contrast(1.05)}' +
    '.cw-t{margin:9px 0 4px;font:800 12.5px/1.55 \"Nanum Myeongjo\",serif}.cw-s{margin:0;font:500 11.5px/1.65 \"Nanum Myeongjo\",serif;color:#4a3d2e}' +
    '.cw-x{position:absolute;right:4px;top:2px;border:0;background:none;font-size:18px;color:#6e6250;cursor:pointer}' +
    '@media (prefers-reduced-motion:reduce){.yk-cat button{transition:none}.yk-cat .c-pupil,.yk-cat .c-eye{animation:none}.yk-cat.caught button{animation:none;opacity:0}}' +
    '@media print{.yk-cat,.yk-catnote{display:none}}';
  D.head.appendChild(css);

  /* 목격 수 */
  var board = D.querySelector('.sk-board'), cnt = null, n = 0, li = 0;
  var MOB = D.body.classList.contains('msk');   /* 폰판은 제 고양이(m-seek.js)를 씀 */
  if (board && !MOB) { var s = D.createElement('span'); s.innerHTML = hj('고양이 목격', '고양이 목격') + ' <em id="bCat">0</em>'; board.appendChild(s); cnt = s.querySelector('em'); }

  function targets() { return [].filter.call(D.querySelectorAll(SPOTS), function (el) { var r = el.getBoundingClientRect(); var cs = getComputedStyle(el); return r.width > 120 && r.bottom > 40 && r.top < innerHeight - 40 && !/hidden|clip/.test(cs.overflow + cs.overflowX + cs.overflowY); }); }
  var live = 0;
  function spawn(force, el, side) {
    if (D.hidden) return;
    if (!el) { var ts = targets(); if (!ts.length) return; el = ts[Math.floor(Math.random() * ts.length)]; }
    if (getComputedStyle(el).position === 'static') el.style.position = 'relative';
    var sides = ['s-top', 's-top', 's-top', 's-left', 's-right', 's-bot'];
    side = side || sides[Math.floor(Math.random() * sides.length)];
    var c = D.createElement('div'); c.className = 'yk-cat ' + side; c.style.setProperty('--s', (force ? .9 : .85) + Math.random() * .55);
    var along = 12 + Math.random() * 70;
    if (side === 's-top' || side === 's-bot') c.style.left = 'calc(' + along + '% - 50px)';
    else c.style.top = 'calc(' + along + '% - 28px)';
    c.innerHTML = '<button type="button" aria-label="고양이 — 누르면 잡소">' + CAT + '</button><span class="say" aria-hidden="true"></span>';
    el.appendChild(c); live++;
    var btn = c.querySelector('button'), gone = false;
    function leave() { if (gone) return; gone = true; c.classList.remove('out', 'peek'); setTimeout(function () { c.remove(); live--; }, 500); }
    requestAnimationFrame(function () { requestAnimationFrame(function () { c.classList.add(Math.random() < .35 && !force ? 'peek' : 'out'); }); });
    var stay = setTimeout(leave, force ? 4200 : 2600 + Math.random() * 1600);
    btn.addEventListener('click', function (e) {
      e.stopPropagation(); if (gone) return; gone = true; clearTimeout(stay);
      c.querySelector('.say').textContent = SAY[Math.floor(Math.random() * SAY.length)];
      c.classList.add('caught'); meow();
      n++; if (cnt) cnt.textContent = n;
      note(el, c);
      setTimeout(function () { c.remove(); live--; }, 800);
      if (n === 5) setTimeout(stampede, 900);
    });
  }
  function note(el, c) {
    var L = LINES[li++ % LINES.length], p = D.createElement('p'); p.className = 'yk-catnote';
    p.innerHTML = '<b>' + hj('정정 보도', '정정 보도') + '</b>' + hj(L[0], L[1]);
    var cs = getComputedStyle(c);
    p.style.left = Math.max(0, Math.min(el.clientWidth - 240, c.offsetLeft)) + 'px';
    if (c.classList.contains('s-bot')) p.style.top = '100%'; else p.style.top = Math.max(-20, c.offsetTop - 10) + 'px';
    el.appendChild(p); requestAnimationFrame(function () { p.classList.add('on'); });
    setTimeout(function () { p.classList.remove('on'); setTimeout(function () { p.remove(); }, 500); }, 4200);
  }
  /* 활자 상자 고양이를 차즈면 — 발견 당시 사진 (재현) */
  W.ykCatFound = function () {
    var ad = D.getElementById('adCat'); if (!ad || ad.querySelector('.cat-found')) return;
    var f = D.createElement('figure'); f.className = 'cat-found';
    f.innerHTML = '<div class="cf-img"><img src="assets/seek/cat_type.jpg" alt="활자 상자 위에서 자는 먹색 고양이 (재현 그림)"><span class="cf-rp">그림 · 재현</span></div>' +
      '<figcaption>' + hj('차잣소 — 활자 상자 우에서, 「ㄱ」을 물고 자고 잇섯소. 깨우지 마시오. 마감은 내일로 미루오.', '찾았다 — 활자 상자 위에서, 「ㄱ」을 물고 자고 있었다. 깨우지 마시오. 마감은 내일로 미룬다.') + '</figcaption>';
    ad.appendChild(f); requestAnimationFrame(function () { requestAnimationFrame(function () { f.classList.add('on'); }); });
  };
  /* 고양이 떼 뒤 — 현상 수배 (재현) */
  function wanted() {
    if (D.querySelector('.cat-wanted')) return;
    var w = D.createElement('aside'); w.className = 'cat-wanted'; w.setAttribute('role', 'status');
    w.innerHTML = '<button type="button" class="cw-x" aria-label="닫기">×</button><p class="cw-k">' + hj('現 狀 手 配', '현상 수배') + '</p>' +
      '<div class="cw-img"><img src="assets/seek/cat_wanted.jpg" alt="번호판을 든 먹색 고양이 (재현 그림)"><span class="cf-rp">그림 · 재현</span></div>' +
      '<p class="cw-t">' + hj('혐의 — 활자 「ㄱ」 절도 · 마감 방해 · 편집장 의자 점거', '혐의 — 활자 「ㄱ」 절도 · 마감 방해 · 편집장 의자 점거') + '</p>' +
      '<p class="cw-s">' + hj('특징: 먹색. 눈은 호박빛. 반성의 빗 업슴.<br>사례: 생선 반 마리 (나머지 반은 이미 업슴)', '특징: 먹색. 눈은 호박빛. 반성의 기색 없음.<br>사례: 생선 반 마리 (나머지 반은 이미 없음)') + '</p>';
    D.body.appendChild(w); requestAnimationFrame(function () { requestAnimationFrame(function () { w.classList.add('on'); }); });
    var close = function () { w.classList.remove('on'); setTimeout(function () { w.remove(); }, 700); };
    w.querySelector('.cw-x').addEventListener('click', close); setTimeout(close, 12000);
  }
  function stampede() {   /* 다섯을 잡으면 — 고양이 떼 */
    setTimeout(wanted, 2200); if (W.ykHerd) W.ykHerd();
    var ts = targets(); ts.slice(0, 9).forEach(function (el, i) { setTimeout(function () { spawn(true, el, i % 3 ? 's-top' : (i % 2 ? 's-left' : 's-right')); }, i * 140); });
    var f = D.querySelector('.sk-board'); if (f) { var b = D.createElement('span'); b.className = 'yk-herd'; b.innerHTML = hj('※ 고양이 떼 출몰 — 본사는 책임지지 아니함', '※ 고양이 떼 출몰 — 본사는 책임지지 않음'); b.style.cssText = 'color:#8a2a21;font-weight:800'; f.appendChild(b); }
  }
  var AC = W.AudioContext || W.webkitAudioContext, ctx = null;
  function meow() {   /* 짧은 「냐!」 */
    if (!AC) return;
    try { ctx = ctx || new AC(); if (ctx.state === 'suspended') ctx.resume();
      var t = ctx.currentTime, d = .22 + Math.random() * .12, b = 700 + Math.random() * 260, o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(b, t); o.frequency.linearRampToValueAtTime(b * 1.35, t + d * .4); o.frequency.exponentialRampToValueAtTime(b * .7, t + d);
      f.type = 'bandpass'; f.Q.value = 5; f.frequency.setValueAtTime(1800, t); f.frequency.linearRampToValueAtTime(900, t + d);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.18, t + .03); g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.connect(f); f.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + d + .05);
    } catch (e) {}
  }
  if (reduce || MOB) return;
  function loop() { if (live < 2) spawn(); setTimeout(loop, 6000 + Math.random() * 6000); }
  setTimeout(loop, 3500);
  W.ykCatSpawn = spawn;   /* 시험용 */
})();
