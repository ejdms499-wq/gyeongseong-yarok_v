/* 본지 폰판 — 식자실(1934 경성 활판 인쇄소) 게임 잇기
   지면 곳곳에 식자실에서 흘러나온 물건 열하나 → 아무거나 넷을 주우면 식자실 문이 열림
   맨 아래 판권 줄의 거꾸로 박힌 「판」 자, 또는 「자정에 문을 여는 곳」의 식자실 칸으로 드러감
   결과: 호외를 찍어 내면 활자가 바로 서고 「교정 끝」 · 시간이 다 되면 「식자공 한 명, 아직 돌아오지 않음」 (localStorage yk-sikjasil) */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var tone = function (k) { if (W.mb && W.mb.tone) try { W.mb.tone(k); } catch (e) {} };
  var GAME = 'sikjasil/index.html', KEY = 'yk-sikjasil', NEED = 4;
  function st() { try { return localStorage.getItem(KEY) || ''; } catch (e) { return ''; } }
  function setSt(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }
  var CAPS = {"watch": {"old": "열한 시 오십팔 분. 이름표에 적힌 일홈은… {name}이오.", "now": "11시 58분. 이름표에 적힌 이름은… {name_now}이다."}, "scissors": {"old": "날에 감긴 머리카락이 아즉 자라고 잇소.", "now": "날에 감긴 머리카락이 아직도 자라고 있다."}, "pen": {"old": "부러지기 전 마지막 글자는 「살려」엿소. 그 뒤는 당신이 쓰게 되오.", "now": "부러지기 전 마지막 글자는 '살려'였다. 그 뒤는 당신이 쓰게 된다."}, "door": {"old": "문 안쪽 손톱자국이 하나 늘엇소. 방금.", "now": "문 안쪽 손톱자국이 하나 늘었다. 방금."}, "key": {"old": "붉은 실을 풀지 마시오. 실 끝은 당신 손목에 묶여 잇소.", "now": "붉은 실을 풀지 마라. 실 끝은 당신 손목에 묶여 있다."}, "mirror": {"old": "거울 속 당신은 아즉 뒤를 도라보지 안앗소. 당신은 방금 도라봣는대.", "now": "거울 속 당신은 아직 뒤를 돌아보지 않았다. 당신은 방금 돌아봤는데."}, "doll": {"old": "눈을 감겨 주어도 다시 뜨오. 매일 밤, 당신 쪽으로 고개가 조금씩 도라가오.", "now": "눈을 감겨 줘도 다시 뜬다. 매일 밤, 당신 쪽으로 고개가 조금씩 돌아간다."}, "match": {"old": "식자공 다섯이 사라진 밤, 성냥도 다섯 개비가 탓소. 여섯째 자리가 비어 잇소.", "now": "식자공 다섯이 사라진 밤, 성냥도 다섯 개비가 탔다. 여섯째 자리가 비어 있다."}, "flesh": {"old": "만지면 아즉 따뜻하오. 그리고… 맥이 뛰오.", "now": "만지면 아직 따뜻하다. 그리고… 맥이 뛴다."}, "bottle": {"old": "병 바닥에 가라안즌 것은 약이 아니오. 손톱이오.", "now": "병 바닥에 가라앉은 것은 약이 아니다. 손톱이다."}, "cube": {"old": "누가 손톱으로 날을 세엇소. 마지막 금은 오늘 날자요.", "now": "누군가 손톱으로 날짜를 셌다. 마지막 금은 오늘 날짜다."}};
  var R = [
    { id: 'watch', host: '#front .mm-case:nth-of-type(1) > .mv', ko: '이름표 달린 회중시계', pos: 'left:10px;bottom:38px;width:54px;transform:rotate(-8deg)' },
    { id: 'scissors', host: '#front .mm-case:nth-of-type(2) > .mv', ko: '녹슨 가위', pos: 'left:10px;bottom:40px;width:60px;transform:rotate(18deg)' },
    { id: 'pen', host: '#front .mm-case:nth-of-type(3) > .mv', ko: '펜촉 부러진 만년필', pos: 'left:6px;bottom:38px;width:66px;transform:rotate(-12deg)' },
    { id: 'door', host: '#front .mm-case:nth-of-type(4) > .mv', ko: '긁힌 문 사진', pos: 'left:12px;bottom:40px;width:50px;transform:rotate(-5deg)' },
    { id: 'key', host: '#mmExpo', ko: '붉은 실 감긴 열쇠', pos: 'right:10px;top:12px;width:54px;transform:rotate(-14deg)' },
    { id: 'mirror', host: '#mmDesk', ko: '깨진 손거울', pos: 'right:12px;top:14px;width:48px;transform:rotate(8deg)' },
    { id: 'doll', host: '#mmPress', ko: '인형 머리', pos: 'right:12px;top:14px;width:46px;transform:rotate(-6deg)' },
    { id: 'match', host: '.mm-ad-shop', ko: '타 버린 성냥갑', pos: 'right:14px;top:16px;width:50px;transform:rotate(-10deg)' },
    { id: 'flesh', host: '.mm-ad-seek', ko: '살덩이 같은 덩어리', pos: 'right:8px;bottom:44px;width:40px;transform:rotate(6deg)' },
    { id: 'bottle', host: '.mm-ad-film', ko: '검붉은 약병', pos: 'right:10px;top:12px;width:26px;transform:rotate(-4deg)' },
    { id: 'cube', host: '.mm-foot', ko: '긁힌 활자 덩어리', pos: 'right:18px;bottom:20px;width:40px;transform:rotate(4deg)' }
  ];
  var bag = [];

  function start() {
    /* ── 소지품 쪽지 ── */
    var tray = D.createElement('button'); tray.type = 'button'; tray.className = 'egg-tray'; tray.hidden = true;
    D.body.appendChild(tray);
    function paintTray(flash) {
      tray.hidden = !bag.length;
      tray.innerHTML = bag.length >= NEED
        ? '<b>식자실 문이 열렷소</b><span>드러가기 →</span>'
        : '<span class="egg-th">' + bag.map(function (id) { return '<img src="assets/egg/relic-' + id + '.webp" alt="">'; }).join('') + '</span><b>식자공의 소지품 ' + bag.length + ' / ' + NEED + '</b>';
      tray.classList.toggle('open', bag.length >= NEED);
      if (flash) { tray.classList.remove('pop'); void tray.offsetWidth; tray.classList.add('pop'); }
      var c = $('#eggRoomN'); if (c) c.textContent = Math.min(bag.length, NEED) + ' / ' + NEED;
    }
    tray.addEventListener('click', function () { if (bag.length >= NEED) gate(); else say('물건 넷을 모으면 식자실 문이 열리오. 지면 구석구석을 살펴보시압.'); });

    /* ── 물건 ── */
    R.forEach(function (r) {
      var h = $(r.host); if (!h) return;
      if (getComputedStyle(h).position === 'static') h.style.position = 'relative';
      var b = D.createElement('span'); b.className = 'egg-relic'; b.setAttribute('role', 'button'); b.setAttribute('aria-label', r.ko); b.style.cssText = r.pos;
      b.innerHTML = '<img src="assets/egg/relic-' + r.id + '.webp" alt="">';
      b.addEventListener('click', function (e) {
        e.preventDefault(); e.stopPropagation();
        if (bag.indexOf(r.id) > -1) return;
        bag.push(r.id); buzz([12, 40, 12]); tone('tick');
        var rc = b.getBoundingClientRect(), f = D.createElement('div'); f.className = 'egg-fly'; f.innerHTML = b.innerHTML;
        f.style.cssText = 'left:' + rc.left + 'px;top:' + rc.top + 'px;width:' + rc.width + 'px';
        D.body.appendChild(f); b.remove();
        requestAnimationFrame(function () { requestAnimationFrame(function () { f.style.left = '18px'; f.style.top = (innerHeight - 70) + 'px'; f.style.width = '26px'; f.style.opacity = '.2'; }); });
        setTimeout(function () { f.remove(); paintTray(true); }, 900);
        var cp = CAPS[r.id]; say('<b>' + r.ko + '</b>' + (cp ? cp.old.replace('{name}', '당신') : ''));
        if (bag.length === NEED) setTimeout(function () { say('<b>넷을 모앗소.</b>식자실 문이 열렷소. 왼쪽 아래 쪽지나 맨 아래 거꾸로 박힌 활자를 누르시압.'); buzz([40, 80, 40]); tone('stamp'); }, 2600);
      }, true);
      h.appendChild(b);
    });

    /* ── 판권 한 줄 · 거꾸로 박힌 「판」 ── */
    var foot = $('.mm-foot'), colo = D.createElement('p'); colo.className = 'egg-colo';
    colo.innerHTML = '펴낸 곳 겸 인쇄소 · 경성야록사 활<button type="button" class="egg-type" aria-label="거꾸로 박힌 활자">판</button>부 · 매일 밤 자정 전 조판<span class="egg-miss" hidden>식자공 한 명, 아직 돌아오지 안앗소</span>';
    if (foot) foot.appendChild(colo);
    var typ = $('.egg-type', colo), miss = $('.egg-miss', colo);
    function paintState() {
      var s = st(); typ.classList.toggle('right', s === 'printed'); miss.hidden = s !== 'lost';
      if (s === 'printed' && !$('.egg-seal', colo)) colo.insertAdjacentHTML('beforeend', '<span class="egg-seal">교정 끝</span>');
    }
    paintState();
    typ.addEventListener('click', function () { if (bag.length >= NEED) gate(); else { typ.classList.remove('shake'); void typ.offsetWidth; typ.classList.add('shake'); buzz(20); say('이 활자는 거꾸로 꼬첫소. 식자실 물건 넷을 모으면 바로잡으러 나려갈 수 잇소.'); } });

    /* ── 「자정에 문을 여는 곳」에 식자실 칸 ── */
    var row = $('.mm-rrow');
    if (row) {
      row.insertAdjacentHTML('beforeend', '<a class="mm-room mm-sik" href="#" id="mmSik"><span class="mm-ph"><img alt="식자실 활자장 (재현 그림)" loading="lazy" src="assets/noir/type.jpg"></span><span class="mm-rt">그림 · 재현</span>' +
        '<span class="mm-rk">식자실 · 소화 구 년 · 십 분짜리 놀이</span><b class="mm-rh">거꾸로 박힌 활자</b><span class="mm-rd">지면 곳곳에 식자실 물건이 흘러나왓소. 넷을 주으면 자정 전의 식자실로 나려가오.</span>' +
        '<span class="mm-act">물건 <b id="eggRoomN">0 / 4</b> · 누르면 드러가오 →</span></a>');
      $('#mmSik').addEventListener('click', function (e) { e.preventDefault(); if (bag.length >= NEED) gate(); else { say('아즉 문이 잠겻소. 사진 · 광고 · 부록 칸 구석에 흘러나온 물건을 넷만 주으시압. (' + bag.length + ' / 4)'); buzz(20); } });
    }

    /* ── 알림 한 줄 ── */
    var tip = D.createElement('div'); tip.className = 'egg-say'; D.body.appendChild(tip); var tt;
    function say(h) { tip.innerHTML = h; tip.classList.add('on'); clearTimeout(tt); tt = setTimeout(function () { tip.classList.remove('on'); }, 4200); }

    /* ── 입구 ── */
    function gate() {
      var printed = st() === 'printed', g = D.createElement('div'); g.className = 'egg-gate';
      g.innerHTML = '<div class="egg-gbox"><div class="egg-slug">판</div><p class="egg-g1">' + (printed ? '바로잡힌 활자이오.<br>그래도 식자실 불은 아즉 켜져 잇소.' : '지면 우에 흘러나온 물건이 넷.<br>모다 식자실 것이오. 돌려주러 나려가 보시겟소?') + '</p>' +
        '<p class="egg-g2">소화 구 년 시월 이십사일 밤, 열한 시 오십팔 분.<br>머무를 수 잇는 시간은 십 분.</p>' +
        '<button type="button" class="egg-go">나려간다</button><button type="button" class="egg-no">그만둔다</button>' +
        '<p class="egg-note">소리가 남 · 왼쪽 패드로 걷고 화면을 밀어 둘러보오 · 폰을 가로로 눕히면 더 잘 보이오</p></div>';
      D.body.appendChild(g); requestAnimationFrame(function () { g.classList.add('on'); }); D.documentElement.classList.add('mb-lock'); buzz([30, 90, 30]);
      function close() { g.classList.remove('on'); D.documentElement.classList.remove('mb-lock'); setTimeout(function () { g.remove(); }, 500); }
      $('.egg-no', g).onclick = close;
      $('.egg-go', g).onclick = function () { room(); setTimeout(function () { g.remove(); }, 900); };
    }
    function room() {
      D.documentElement.classList.add('mb-lock');
      var r = D.createElement('div'); r.className = 'egg-room';
      r.innerHTML = '<iframe title="1934 경성 활판 인쇄소 식자실" allow="fullscreen; autoplay"></iframe><button type="button" class="egg-up">지면으로 올라가기</button>';
      var fr = $('iframe', r); fr.src = GAME; D.body.appendChild(r); requestAnimationFrame(function () { r.classList.add('on'); });
      var ended = false, poll = setInterval(function () {
        var d; try { d = fr.contentDocument; } catch (e) { return; } if (!d || ended) return;
        var card = d.getElementById('card-display'), modal = d.getElementById('reward-card-modal');
        if (modal && modal.classList.contains('active') && card && !card.classList.contains('hidden')) setSt('printed');
        var over = d.getElementById('timeout-overlay');
        if (over && !over.hidden && !over.classList.contains('flashing')) { ended = true; if (st() !== 'printed') setSt('lost'); setTimeout(leave, 2600); }
      }, 400);
      function onMsg(ev) { if (ev.source !== fr.contentWindow || !ev.data || ended) return; var x = ev.data.ykSikjasil; if (x === 'printed') setSt('printed'); if (x === 'lost') { ended = true; if (st() !== 'printed') setSt('lost'); setTimeout(leave, 2600); } }
      W.addEventListener('message', onMsg);
      function leave() {
        clearInterval(poll); W.removeEventListener('message', onMsg); r.classList.remove('on');
        setTimeout(function () { try { fr.src = 'about:blank'; } catch (e) {} r.remove(); D.documentElement.classList.remove('mb-lock'); paintState(); colo.scrollIntoView({ block: 'center' }); if (st() === 'printed') { buzz([40, 60, 40]); tone('stamp'); } }, 900);
      }
      $('.egg-up', r).onclick = leave;
    }
    paintTray(false);
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', function () { setTimeout(start, 50); }); else setTimeout(start, 50);
})(window, document);
