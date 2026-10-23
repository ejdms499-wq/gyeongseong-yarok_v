/* ─────────────────────────────────────────────────────────────
   경성야록 · 이스터에그 「거꾸로 꽂힌 활자」 → 식자실(1934 경성 활판 인쇄소)

   · 기존 index.html / app.js / styles.css 의 코드는 하나도 고치지 않습니다.
     이 파일 하나가 화면이 다 그려진 뒤 맨 아래(하단 칸)에 판권(版權) 한 줄을 덧붙일 뿐입니다.
   · 판권 줄의 '版' 한 자가 거꾸로 박혀 있습니다(오식 誤植). 눈치챈 사람만 누릅니다.
   · 누르면 식자실 입구 → 10분짜리 게임(sikjasil/index.html)이 지면 위에 열림.
   · 호외를 찍어 내면: 활자가 바로 서고 '校正畢' 도장이 찍힘.
     시간이 다 되면: 활자는 그대로 거꾸로, 판권 줄에 '植字工 一名 未歸'가 남음.
   · 진행 기록은 이 브라우저에만 남음 (localStorage: yk-sikjasil)

   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   ■ 소지품(이스터 에그) 출현 조건 요약 표
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   번호 | 소지품 명칭 (id) | 위치 (host) | 출현 판정 조건 및 기준
   ---- | ----------------- | ----------- | ---------------------------------------------
   c1   | 회중시계 (watch)  | .case.c1    | 약병(.bottle) 라벨 회전 transition 완료 (1.3초)
   c2   | 가위 (scissors)   | .case.c2    | 괴투서(.k5) 편지/인장 대조 연출 완료 (1.6초)
   c3   | 펜촉 부러진 만년필 (pen)      | .case.c3    | 손기정(.desk) 일장기 붓질 말소 완료 (1.8초)
   c4   | 긁힌 문 사진 (door)    | .case.c4    | 백백교 돋보기(.lens) 사진 면적 60% 이상 탐색
   목차 | 붉은 실 감긴 열쇠 (key)        | .spread>.index | 기사 여백 위에서 1초 정지 (마우스 이동 30px 이내)
   부록 | 깨진 손거울 (mirror)   | .rd-appx    | 기사 여백 위에서 1초 정지 (마우스 이동 30px 이내)
   응접 | 인형 머리 (doll)     | .rd-parlor  | 기사 여백 위에서 1초 정지 (마우스 이동 30px 이내)
   광고 | 타 버린 성냥갑 (match)    | .ads .shop1 | 광고 칸 위에서 1초 정지 (마우스 이동 30px 이내)
   광고 | 살덩이 같은 덩어리 (flesh)      | .ads .seek2 | 광고 칸 위에서 1초 정지 (마우스 이동 30px 이내)
   광고 | 검붉은 약병 (bottle)   | .ads .film  | 광고 칸 위에서 1초 정지 (마우스 이동 30px 이내)
   하단 | 긁힌 활자 덩어리 (cube)     | .spread>.foot | 판권 칸 위에서 1초 정지 (마우스 이동 30px 이내)
   ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
   * 체험 도중 마우스가 장치 밖으로 나가면 진행 상태가 리셋되어 처음부터 다시 수행해야 합니다.
   * 한번 완료되어 출현한 소지품은 마우스가 칸을 벗어나도 주울 때까지 제자리에 남아 있습니다.
   * 소지품 이미지는 장치 위에 겹쳐도 pointer-events가 이미지에만 제한되어 체험 조작을 방해하지 않습니다.
   ───────────────────────────────────────────────────────────── */
(function () {
  'use strict';
  if (window.__ykSikjasil) return; window.__ykSikjasil = true;

  var GAME_URL = 'sikjasil/index.html';
  var KEY = 'yk-sikjasil';
  function getState() { try { return localStorage.getItem(KEY) || ''; } catch (e) { return ''; } }
  function setState(v) { try { localStorage.setItem(KEY, v); } catch (e) {} }

  /* ── 모양 (이 파일 안에서만 씀 · 모든 이름은 ykq- 로 시작) ── */
  var css = '' +
  '.ykq-colo{flex:1 1 100%;width:100%;margin:6px 0 0;padding-top:10px;border-top:1px solid rgba(58,49,40,.28);' +
    'font-family:var(--myeongjo,"Nanum Myeongjo",serif);font-size:11.5px;letter-spacing:.22em;color:var(--fade,#6e6250);' +
    'display:flex;flex-wrap:wrap;gap:4px 22px;align-items:baseline;line-height:1.9}' +
  '.ykq-colo .ykq-l{cursor:default}' +
  '.ykq-colo .ykq-l.gloss{letter-spacing:.06em;color:#3d3328}' +
  '.ykq-colo .ykq-miss{color:#4a3f33}' +
  /* 거꾸로 박힌 활자 — 표시 없이, 마우스를 대면 헐거운 활자처럼 살짝 흔들릴 뿐 */
  '.ykq-type{display:inline-block;transform:rotate(180deg);cursor:pointer;padding:0 .04em;transition:transform .25s ease;' +
    'background:none;border:0;font:inherit;color:inherit;letter-spacing:0;line-height:inherit}' +
  '.ykq-type:hover,.ykq-type:focus-visible{animation:ykq-loose .9s ease-in-out infinite;outline:none;color:var(--ink,#1e1913)}' +
  '@keyframes ykq-loose{0%,100%{transform:rotate(180deg)}30%{transform:rotate(174deg) translateY(-.5px)}60%{transform:rotate(185deg)}}' +
  '.ykq-type.ykq-right{transform:rotate(0deg);animation:none;cursor:pointer}' +
  '.ykq-type.ykq-righting{animation:ykq-set 1.4s cubic-bezier(.5,0,.2,1) forwards}' +
  '@keyframes ykq-set{0%{transform:rotate(180deg)}55%{transform:rotate(-12deg)}75%{transform:rotate(4deg)}100%{transform:rotate(0deg)}}' +
  '.ykq-seal{display:inline-block;margin-left:10px;padding:1px 5px 0;border:1.5px solid var(--seal,#8a2a21);color:var(--seal,#8a2a21);' +
    'font-family:var(--serif,"Noto Serif KR",serif);font-weight:900;font-size:11px;letter-spacing:.12em;transform:rotate(-6deg);opacity:.82;' +
    'writing-mode:horizontal-tb}' +
  '.ykq-seal.ykq-stamp{animation:ykq-stamp .5s cubic-bezier(.3,1.6,.5,1) both}' +
  '@keyframes ykq-stamp{0%{transform:rotate(-6deg) scale(1.9);opacity:0}100%{transform:rotate(-6deg) scale(1);opacity:.82}}' +

  /* 입구: 지면이 납빛으로 식고, 그 활자 한 개가 가운데에 */
  '.ykq-gate{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;' +
    'background:rgba(14,13,12,0);transition:background .9s ease;font-family:var(--myeongjo,"Nanum Myeongjo",serif)}' +
  '.ykq-gate.on{background:rgba(14,13,12,.94)}' +
  '.ykq-gbox{text-align:center;color:#cfc4ad;max-width:420px;padding:0 24px;opacity:0;transform:translateY(6px);transition:opacity .8s .5s,transform .8s .5s}' +
  '.ykq-gate.on .ykq-gbox{opacity:1;transform:none}' +
  /* 납 활자 한 개: 몸통(네모) 위 글자는 거울상 — 실제 활자는 뒤집혀 새겨지니까 */
  '.ykq-slug{width:96px;height:96px;margin:0 auto 30px;display:flex;align-items:center;justify-content:center;' +
    'background:linear-gradient(145deg,#6b6862,#3c3a36 55%,#2a2926);box-shadow:inset 0 0 0 1px rgba(255,255,255,.08),0 10px 30px rgba(0,0,0,.6);' +
    'font-family:var(--serif,"Noto Serif KR",serif);font-weight:900;font-size:62px;color:#1a1917;text-shadow:0 1px 0 rgba(255,255,255,.12);' +
    'transform:rotate(180deg) scaleX(-1)}' +
  '.ykq-g1{font-size:16px;letter-spacing:.14em;line-height:2;margin:0 0 10px;cursor:default;min-height:4em}' +
  '.ykq-g1.gloss{letter-spacing:.06em;color:#e7dbc2}' +
  '.ykq-g2{font-size:12.5px;letter-spacing:.06em;line-height:1.9;color:#8e846f;margin:0 0 26px}' +
  '.ykq-btns{display:flex;gap:26px;justify-content:center}' +
  '.ykq-btns button{background:none;border:0;border-bottom:1px solid transparent;color:#d8ccb3;font:inherit;font-size:14px;letter-spacing:.2em;cursor:pointer;padding:2px 0}' +
  '.ykq-btns button:hover,.ykq-btns button:focus-visible{border-bottom-color:#d8ccb3;outline:none}' +
  '.ykq-btns .ykq-no{color:#7d7462}' +
  '.ykq-note{margin-top:22px;font-size:11px;letter-spacing:.08em;color:#6c6453}' +

  /* 식자실(게임) 틀 */
  '.ykq-room{position:fixed;inset:0;z-index:2147483001;background:#050606;opacity:0;transition:opacity 1s ease}' +
  '@media(pointer:coarse){.ykq-type:hover,.ykq-type:focus-visible{animation:none}}' +
  '.ykq-room.on{opacity:1}' +
  '.ykq-touch-room .ykq-up{top:max(8px,env(safe-area-inset-top));bottom:auto;right:max(8px,env(safe-area-inset-right));min-height:44px}' +
  '.ykq-room iframe{position:absolute;inset:0;width:100%;height:100%;border:0;display:block;background:#050606}' +
  '.ykq-up{position:absolute;right:18px;bottom:72px;z-index:2;background:rgba(10,10,9,.55);border:1px solid rgba(207,196,173,.25);' +
    'color:#a59a83;font-family:var(--myeongjo,"Nanum Myeongjo",serif);font-size:12px;letter-spacing:.16em;padding:7px 12px;cursor:pointer}' +
  '.ykq-up:hover{color:#e7dbc2;border-color:rgba(231,219,194,.6)}' +
  'html.ykq-lock,html.ykq-lock body{overflow:hidden!important}';

  var style = document.createElement('style');
  style.id = 'ykq-style'; style.textContent = css;
  document.head.appendChild(style);

  /* ── 판권 한 줄 ── */
  var OLD = { a: '發行兼印刷所　京城野錄社 活', b: '部', c: '每夜 子正 前 組版' };
  var KO  = { a: '펴낸 곳 겸 인쇄소　경성야록사 활', b: '부', c: '매일 밤 자정 전 조판' };
  var MISS_OLD = '植字工 一名 未歸', MISS_KO = '식자공 한 명, 아직 돌아오지 않음';

  var foot = document.querySelector('.spread > .foot') || document.querySelector('footer.foot') || document.querySelector('footer');
  if (!foot) return;

  var colo = document.createElement('p');
  colo.className = 'ykq-colo';
  colo.innerHTML =
    '<span class="ykq-l"><span class="ykq-a"></span><button type="button" class="ykq-type" aria-label="활판부의 판 자">版</button><span class="ykq-b"></span></span>' +
    '<span class="ykq-l ykq-c-wrap"><span class="ykq-c"></span></span>' +
    '<span class="ykq-l ykq-miss" hidden></span>';
  foot.appendChild(colo);

  var typeEl = colo.querySelector('.ykq-type');
  var aEl = colo.querySelector('.ykq-a'), bEl = colo.querySelector('.ykq-b'), cEl = colo.querySelector('.ykq-c');
  var missEl = colo.querySelector('.ykq-miss');

  function paint(modern) {
    var t = modern ? KO : OLD;
    aEl.textContent = t.a; bEl.textContent = t.b; cEl.textContent = t.c;
    missEl.textContent = modern ? MISS_KO : MISS_OLD;
    colo.classList.toggle('gloss', !!modern);
  }
  paint(false);

  function applyState(animate) {
    var s = getState();
    if (s === 'printed') {
      if (animate) {
        typeEl.classList.add('ykq-righting');
        setTimeout(function () {
          typeEl.classList.remove('ykq-righting');
          typeEl.classList.add('ykq-right');
          stampSeal();
        }, 1400);
      } else {
        typeEl.classList.add('ykq-right');
        stampSeal();
      }
    } else {
      typeEl.classList.remove('ykq-right', 'ykq-righting');
      var old = colo.querySelector('.ykq-seal'); if (old) old.remove();
    }
    missEl.hidden = s !== 'lost';
  }

  function stampSeal() {
    if (colo.querySelector('.ykq-seal')) return;
    var seal = document.createElement('span');
    seal.className = 'ykq-seal ykq-stamp'; seal.textContent = '校正畢';
    colo.querySelector('.ykq-c-wrap').appendChild(seal);
  }
  applyState(false);

  function openGate(fromClick) {
    if (document.querySelector('.ykq-gate')) return;
    var st = getState();
    if (st === 'printed' && fromClick) {
      if (!confirm('이미 호외를 인쇄해 활자가 바로 섰습니다.\n식자실로 다시 들어가시겠습니까?')) return;
    }
    var gate = document.createElement('div');
    gate.className = 'ykq-gate';
    gate.innerHTML =
      '<div class="ykq-gbox">' +
        '<div class="ykq-slug" aria-hidden="true">版</div>' +
        '<p class="ykq-g1"><span class="hj l" data-ko="이 판은 거꾸로 꽂힌 채 아직 굳지 않았다.">此 版 倒 植 猶 未 凝</span></p>' +
        '<p class="ykq-g2">1934년 경성 활판 인쇄소 · 식자실<br>10분 안에 활자를 찾아 호외를 찍어 내시오.</p>' +
        '<div class="ykq-btns">' +
          '<button type="button" class="ykq-yes">문 열기</button>' +
          '<button type="button" class="ykq-no">지면으로</button>' +
        '</div>' +
        '<p class="ykq-note">소리가 납니다 · 화면을 벗어나면 지면으로 돌아옵니다</p>' +
      '</div>';
    document.body.appendChild(gate);
    document.documentElement.classList.add('ykq-lock');
    requestAnimationFrame(function () { gate.classList.add('on'); });

    function closeGate() {
      gate.classList.remove('on');
      setTimeout(function () { gate.remove(); document.documentElement.classList.remove('ykq-lock'); }, 900);
    }
    gate.querySelector('.ykq-no').addEventListener('click', closeGate);
    gate.addEventListener('click', function (e) { if (e.target === gate) closeGate(); });
    gate.querySelector('.ykq-yes').addEventListener('click', function () {
      gate.remove(); enterRoom();
    });
  }

  function enterRoom() {
    if (document.querySelector('.ykq-room')) return;
    var room = document.createElement('div');
    room.className = 'ykq-room';
    var isTouch = window.matchMedia && matchMedia('(pointer:coarse)').matches;
    if (isTouch) room.classList.add('ykq-touch-room');
    room.innerHTML =
      '<iframe src="' + GAME_URL + '" allow="autoplay" title="식자실 3D"></iframe>' +
      '<button type="button" class="ykq-up" aria-label="지면으로 올라가기">지면으로 ↑</button>';
    document.body.appendChild(room);
    document.documentElement.classList.add('ykq-lock');
    requestAnimationFrame(function () { room.classList.add('on'); });

    var frame = room.querySelector('iframe'), poll = null, ended = false;
    poll = setInterval(function () {
      var d; try { d = frame.contentDocument; } catch (e) { return; }
      if (!d || ended) return;
      var card = d.getElementById('card-display'), modal = d.getElementById('reward-card-modal');
      if (modal && modal.classList.contains('active') && card && !card.classList.contains('hidden')) {
        if (getState() !== 'printed') setState('printed');
        room.dataset.result = 'printed';
      }
      var over = d.getElementById('timeout-overlay');
      if (over && !over.hidden && !over.classList.contains('flashing')) {
        ended = true;
        if (getState() !== 'printed') setState('lost');
        setTimeout(leave, 2600);
      }
    }, 400);

    function onMsg(ev) {
      if (ev.source !== frame.contentWindow || !ev.data || ended) return;
      var r = ev.data.ykSikjasil;
      if (r === 'exit') { leave(); return; }
      if (r === 'printed') { if (getState() !== 'printed') setState('printed'); room.dataset.result = 'printed'; }
      if (r === 'lost') { ended = true; if (getState() !== 'printed') setState('lost'); setTimeout(leave, 2600); }
    }
    window.addEventListener('message', onMsg);

    function leave() {
      clearInterval(poll); window.removeEventListener('message', onMsg);
      room.classList.remove('on');
      setTimeout(function () {
        try { frame.src = 'about:blank'; } catch (e) {}
        room.remove();
        document.documentElement.classList.remove('ykq-lock');
        missEl.hidden = getState() !== 'lost';
        applyState(getState() === 'printed' && !typeEl.classList.contains('ykq-right'));
        colo.scrollIntoView({ block: 'center' });
      }, 1000);
    }
    room.querySelector('.ykq-up').addEventListener('click', leave);
  }

  typeEl.addEventListener('click', function (e) {
    e.preventDefault(); e.stopPropagation();
    if (relicsDone()) openGate(true); else nudgeTray();
  });

  /* ─────────────────────────────────────────────────────────────
     ■ 흩어진 식자실 물건 (소지품 이스터 에그)
     체험 장치가 있는 4개 칸은 '체험 완료 신호'가 있을 때만 출현
     체험 장치가 없는 7개 칸은 '1초 정지 체류' 시 출현
     ───────────────────────────────────────────────────────────── */
  var CONSTANTS = {
    STILLNESS_RADIUS: 30,          // 일반 칸: 정지 판정 반경 (px)
    STILLNESS_DELAY: 1000,         // 일반 칸: 정지 체류 시간 (ms)
    BOTTLE_TRANSITION_MS: 1300,    // c1 약병: 라벨 회전 전환 시간 (ms)
    LETTER_TRANSITION_MS: 1600,    // c2 괴투서: 편지 인출 전환 시간 (ms)
    ERASE_TRANSITION_MS: 1800,     // c3 손기정: 붓질 말소 전환 시간 (ms)
    LENS_COVERAGE_THRESHOLD: 0.60  // c4 돋보기: 사진 면적 탐색 충족 비율 (60%)
  };

  var RKEY = 'yk-relics', NEED = 4;

  /* 원본 커밋("정리 전 원본" 49d1433) 위치·크기·호스트 100% 원복 */
  var RELICS = [
    { id: 'watch',    host: '.case.c1',          ko: '이름표 달린 회중시계',  pos: 'left:40%;top:69%;width:92px;transform:rotate(-8deg)' },
    { id: 'scissors', host: '.case.c2',          ko: '녹슨 가위',            pos: 'right:4%;top:28%;width:104px;transform:rotate(18deg)' },
    { id: 'pen',      host: '.case.c3',          ko: '펜촉 부러진 만년필',    pos: 'left:46%;top:52%;width:108px;transform:rotate(-12deg)' },
    { id: 'door',     host: '.case.c4',          ko: '긁힌 문 사진',          pos: 'left:4%;top:50%;width:94px;transform:rotate(-5deg)' },
    { id: 'key',      host: '.spread > .index',  ko: '붉은 실 감긴 열쇠',     pos: 'right:3%;bottom:6%;width:96px;transform:rotate(-14deg)' },
    { id: 'mirror',   host: '.rd-appx',          ko: '깨진 손거울',          pos: 'left:4%;top:26%;width:80px;transform:rotate(8deg)' },
    { id: 'doll',     host: '.rd-parlor',        ko: '인형 머리',            pos: 'right:14px;top:120px;width:70px;transform:rotate(-6deg)' },
    { id: 'match',    host: '.ads .ad2.shop1',   ko: '타 버린 성냥갑',       pos: 'right:4%;bottom:6%;width:78px;transform:rotate(-10deg)' },
    { id: 'flesh',    host: '.ads .ad2.seek2',   ko: '살덩이 같은 덩어리',     pos: 'right:4%;bottom:6%;width:66px;transform:rotate(6deg)' },
    { id: 'bottle',   host: '.ads .ad2.film',    ko: '검붉은 약병',          pos: 'right:5%;bottom:6%;width:40px;transform:rotate(-4deg)' },
    { id: 'cube',     host: '.spread > .foot',   ko: '긁힌 활자 덩어리',       pos: 'right:3%;bottom:0;width:54px;transform:rotate(4deg)' }
  ];

  var CAPS = {
    "watch": {"old": "열한 시 오십팔 분. 이름표에 적힌 일홈은… {name}이오.", "now": "11시 58분. 이름표에 적힌 이름은… {name_now}이다."},
    "scissors": {"old": "날에 감긴 머리카락이 아즉 자라고 잇소.", "now": "날에 감긴 머리카락이 아직도 자라고 있다."},
    "pen": {"old": "부러지기 전 마지막 글자는 「살려」엿소. 그 뒤는 당신이 쓰게 되오.", "now": "부러지기 전 마지막 글자는 '살려'였다. 그 뒤는 당신이 쓰게 된다."},
    "door": {"old": "문 안쪽 손톱자국이 하나 늘엇소. 방금.", "now": "문 안쪽 손톱자국이 하나 늘었다. 방금."},
    "key": {"old": "붉은 실을 풀지 마시오. 실 끝은 당신 손목에 묶여 잇소.", "now": "붉은 실을 풀지 마라. 실 끝은 당신 손목에 묶여 있다."},
    "mirror": {"old": "거울 속 당신은 아즉 뒤를 도라보지 안앗소. 당신은 방금 도라봣는대.", "now": "거울 속 당신은 아직 뒤를 돌아보지 않았다. 당신은 방금 돌아봤는데."},
    "doll": {"old": "눈을 감겨 주어도 다시 뜨오. 매일 밤, 당신 쪽으로 고개가 조금씩 도라가오.", "now": "눈을 감겨 줘도 다시 뜬다. 매일 밤, 당신 쪽으로 고개가 조금씩 돌아간다."},
    "match": {"old": "식자공 다섯이 사라진 밤, 성냥도 다섯 개비가 탓소. 여섯째 자리가 비어 잇소.", "now": "식자공 다섯이 사라진 밤, 성냥도 다섯 개비가 탔다. 여섯째 자리가 비어 있다."},
    "flesh": {"old": "만지면 아즉 따뜻하오. 그리고… 맥이 뛰오.", "now": "만지면 아직 따뜻하다. 그리고… 맥이 뛴다."},
    "bottle": {"old": "병 바닥에 가라안즌 것은 약이 아니오. 손톱이오.", "now": "병 바닥에 가라앉은 것은 약이 아니다. 손톱이다."},
    "cube": {"old": "누가 손톱으로 날을 세엇소. 마지막 금은 오늘 날자요.", "now": "누군가 손톱으로 날짜를 셌다. 마지막 금은 오늘 날짜다."}
  };

  RELICS.forEach(function (r) { r.img = 'assets/egg/relic-' + r.id + '.webp'; r.cap = CAPS[r.id]; });

  function visitor() {
    try { var c = JSON.parse(localStorage.getItem('gsyr-parlor-card-v1') || '{}'); if (c.ho) return { old: c.ho + '생', now: c.ho + '생' }; } catch (e) {}
    return { old: '당신', now: '당신' };
  }
  function capOf(r) {
    var v = visitor(), f = function (t) { return t.replace('{name}', v.old).replace('{name_now}', v.now); };
    return { old: f(r.cap.old), now: f(r.cap.now) };
  }

  try { localStorage.removeItem(RKEY); } catch (e) {}
  var bag = [];
  function got() { return bag.slice(); }
  function save(a) { bag = a.slice(); }
  function relicsDone() { return got().length >= NEED; }

  /* 출현 상태(영구 잔존) 관리 셋 */
  var revealedRelics = new Set();

  var rcss = '' +
  '.ykq-host{position:relative}' +
  /* 래퍼는 pointer-events:none 으로 장치 조작을 방해하지 않고, img 만 클릭 가능하게 설정 */
  '.ykq-relic{position:absolute;z-index:6;padding:0;border:0;background:none;opacity:0;pointer-events:none;transition:opacity .9s ease .25s,filter .3s}' +
  '.ykq-relic img{display:block;width:100%;height:auto;cursor:pointer;pointer-events:auto;filter:grayscale(.8) sepia(.55) contrast(1.12) brightness(.95) drop-shadow(0 6px 6px rgba(20,12,4,.45))}' +
  '.ykq-host.ykq-live .ykq-relic,.ykq-relic.ykq-revealed,.ykq-relic:focus-visible{opacity:.85;pointer-events:none}' +
  '.ykq-host.ykq-live .ykq-relic img,.ykq-relic.ykq-revealed img{pointer-events:auto}' +
  '@media(pointer:coarse){.ykq-host .ykq-relic{opacity:.85}.ykq-relic::after{opacity:.85}}' +
  '.ykq-relic:hover{opacity:1!important}' +
  '.ykq-relic:hover img{filter:grayscale(.6) sepia(.5) contrast(1.15) drop-shadow(0 0 7px rgba(138,42,33,.55))}' +
  '.ykq-relic::after{content:"";position:absolute;right:-6px;top:-6px;width:9px;height:9px;border-radius:50%;background:#8a2a21;opacity:0;animation:ykq-ping 1.8s ease-out infinite;pointer-events:none}' +
  '.ykq-host.ykq-live .ykq-relic::after,.ykq-relic.ykq-revealed::after{opacity:.85}' +
  '@keyframes ykq-ping{0%{box-shadow:0 0 0 0 rgba(138,42,33,.5)}80%,100%{box-shadow:0 0 0 12px rgba(138,42,33,0)}}' +
  '.ykq-fly{position:fixed;z-index:2147483000;pointer-events:none;transition:all .9s cubic-bezier(.5,0,.2,1)}' +
  '.ykq-fly img{width:100%;filter:grayscale(.8) sepia(.55) contrast(1.12)}' +
  '.ykq-tray{position:fixed;left:16px;bottom:16px;z-index:2147482990;display:flex;align-items:center;gap:10px;padding:8px 12px 8px 10px;' +
    'background:rgba(231,219,194,.96);border:1px solid #3a3128;box-shadow:0 8px 22px -10px rgba(0,0,0,.6);' +
    'font-family:var(--myeongjo,"Nanum Myeongjo",serif);color:#1e1913;opacity:0;transform:translateY(12px);transition:opacity .5s,transform .5s}' +
  '.ykq-tray{pointer-events:none}' +
  '.ykq-tray.on{pointer-events:auto;cursor:pointer}' +
  '.ykq-x{flex:none;width:24px;height:24px;margin-left:2px;padding:0;border:1px solid rgba(58,49,40,.5);background:none;color:#3a3128;font:700 14px/1 serif;cursor:pointer;display:grid;place-items:center}' +
  '.ykq-tray.mini{gap:7px;padding:5px 6px 5px 9px}' +
  '.ykq-tray.mini .ykq-tt span,.ykq-tray.mini .ykq-more,.ykq-tray.mini .ykq-open{display:none}' +
  '.ykq-tray.mini .ykq-tt b{font-size:11.5px}' +
  '.ykq-tray.mini .ykq-slots{gap:3px}' +
  '.ykq-tray.mini .ykq-slot{width:20px;height:20px}' +
  '.ykq-tray.mini .ykq-slot img{max-width:18px;max-height:17px}' +
  '.ykq-tray.mini .ykq-x{width:20px;height:20px;font-size:12px}' +
  '.ykq-tray.mini.ready .ykq-tt b:after{content:" · 문 열림";color:#8a2a21}' +
  '.ykq-tray.on{opacity:1;transform:none}' +
  '.ykq-tray.on .ykq-open{pointer-events:auto}' +
  '.ykq-tray .ykq-tt{font-size:11.5px;letter-spacing:.1em;line-height:1.5;max-width:13em}' +
  '.ykq-tray .ykq-tt b{display:block;font-family:var(--serif,"Noto Serif KR",serif);font-weight:900;font-size:13px;letter-spacing:.06em}' +
  '.ykq-slots{display:flex;gap:6px}' +
  '.ykq-slot{width:40px;height:40px;border:1px dashed rgba(58,49,40,.55);display:grid;place-items:center;background:rgba(255,250,240,.4)}' +
  '.ykq-slot img{max-width:36px;max-height:34px;filter:grayscale(.8) sepia(.55) contrast(1.12)}' +
  '.ykq-slot.got{border-style:solid;border-color:#3a3128}' +
  '.ykq-more{font-family:var(--serif,"Noto Serif KR",serif);font-weight:700;font-size:12px;color:#6e6250}' +
  '.ykq-open{margin-left:4px;padding:6px 10px;border:1px solid #8a2a21;background:#1e1913;color:#e7dbc2;cursor:pointer;font-family:inherit;font-weight:800;font-size:12px;letter-spacing:.18em}' +
  '@keyframes ykq-glow{50%{box-shadow:0 0 0 4px rgba(138,42,33,.25)}}' +
  '.ykq-tray.nudge{animation:ykq-nudge .5s}' +
  '@keyframes ykq-nudge{25%{transform:translateX(-5px)}75%{transform:translateX(5px)}}' +
  '.ykq-rv{position:fixed;inset:0;z-index:2147483002;cursor:pointer;background:radial-gradient(ellipse at 50% 40%,rgba(28,6,3,.9),rgba(0,0,0,.985) 68%);opacity:0;transition:opacity .25s}' +
  '.ykq-rv.on{opacity:1}' +
  '.ykq-rv.out{opacity:0;transition:opacity .55s ease .25s}' +
  '.ykq-rv::before{content:"";position:absolute;inset:0;background:#8a1a12;mix-blend-mode:screen;opacity:0;animation:ykq-flash .9s ease-out .05s both}' +
  '@keyframes ykq-flash{0%{opacity:.35}100%{opacity:0}}' +
  '.ykq-rv::after{content:"";position:absolute;inset:0;pointer-events:none;opacity:.35;mix-blend-mode:overlay;' +
    'background:repeating-linear-gradient(0deg,rgba(255,255,255,.05) 0 1px,transparent 1px 3px);animation:ykq-scan .18s steps(3) infinite}' +
  '@keyframes ykq-scan{50%{transform:translateY(2px)}}' +
  '.ykq-big{position:fixed;z-index:2147483003;pointer-events:none;transform-origin:50% 50%;' +
    'transition:left .5s cubic-bezier(.2,1.4,.3,1),top .5s cubic-bezier(.2,1.4,.3,1),width .5s cubic-bezier(.2,1.4,.3,1),opacity .4s}' +
  '.ykq-big img{display:block;width:100%;height:auto;filter:grayscale(.55) sepia(.45) contrast(1.35) brightness(.9) drop-shadow(0 30px 40px rgba(0,0,0,.8))}' +
  '.ykq-big.shake img{animation:none}' +
  '.ykq-big.go{transition:left .7s cubic-bezier(.6,0,.3,1),top .7s cubic-bezier(.6,0,.3,1),width .7s cubic-bezier(.6,0,.3,1),opacity .7s}' +
  '.ykq-cap{position:fixed;left:50%;top:calc(76vh / var(--ykz, 1));z-index:2147483004;transform:translateX(-50%);width:min(680px,calc(88vw / var(--ykz, 1)));text-align:center;pointer-events:none;' +
    'font-family:var(--myeongjo,"Nanum Myeongjo",serif);color:#e7dbc2;opacity:0;transition:opacity .6s ease .55s}' +
  '.ykq-rv.on .ykq-cap{opacity:1}' +
  '.ykq-cap b{display:block;font-family:var(--serif,"Noto Serif KR",serif);font-weight:900;font-size:clamp(20px,calc(2.4vw / var(--ykz, 1)),30px);letter-spacing:.3em;color:#f1e6cf;text-shadow:0 0 18px rgba(138,26,18,.7)}' +
  '.ykq-cap span{display:block;margin-top:12px;font-size:clamp(14px,calc(1.25vw / var(--ykz, 1)),17px);letter-spacing:.12em;line-height:1.8}' +
  '.ykq-cap small{display:block;margin-top:6px;font-size:12px;letter-spacing:.08em;color:rgba(231,219,194,.55)}' +
  '.ykq-cap i{display:block;margin-top:18px;font-style:normal;font-size:11px;letter-spacing:.3em;color:rgba(231,219,194,.4)}' +
  '@media (prefers-reduced-motion:reduce){.ykq-relic::after,.ykq-open{animation:none}.ykq-fly{transition:none}' +
    '.ykq-rv::before,.ykq-rv::after,.ykq-big.shake img{animation:none}.ykq-big,.ykq-big.go{transition:opacity .3s}}';
  style.textContent += rcss;

  var NUM = ['영', '하나', '둘', '셋', '넷', '다섯', '여섯', '일곱', '여덟', '아홉', '열', '열하나'];
  var tray = document.createElement('div');
  tray.className = 'ykq-tray'; tray.setAttribute('aria-live', 'polite');
  tray.innerHTML = '<div class="ykq-tt"><b>식자공의 소지품</b><span class="ykq-cnt"></span></div><div class="ykq-slots"></div><span class="ykq-more"></span><button type="button" class="ykq-x" aria-label="소지품 상자 접기">−</button>';
  document.body.appendChild(tray);
  var smallScr = window.matchMedia && matchMedia('(max-width:600px)').matches, miniT = null;
  function setMini(on) { clearTimeout(miniT); tray.classList.toggle('mini', on); var x = tray.querySelector('.ykq-x'); x.textContent = on ? '+' : '−'; x.setAttribute('aria-label', on ? '소지품 상자 펼치기' : '소지품 상자 접기'); try { sessionStorage.setItem('yk-tray-mini', on ? '1' : '0'); } catch (e) {} }
  try { var sm = sessionStorage.getItem('yk-tray-mini'); setMini(sm ? sm === '1' : smallScr); } catch (e) { setMini(smallScr); }
  tray.addEventListener('click', function (e) {
    if (e.target.closest('.ykq-open')) return;
    if (e.target.closest('.ykq-x')) { e.stopPropagation(); setMini(!tray.classList.contains('mini')); return; }
    if (tray.classList.contains('mini')) { setMini(false); if (smallScr) miniT = setTimeout(function () { setMini(true); }, 6000); }
  });
  function byId(id) { for (var i = 0; i < RELICS.length; i++) if (RELICS[i].id === id) return RELICS[i]; }
  function drawTray() {
    var a = got().filter(byId), n = a.length;
    tray.classList.toggle('on', n > 0); tray.classList.toggle('ready', n >= NEED);
    tray.querySelector('.ykq-cnt').textContent =
      n >= RELICS.length ? '열한 가지 유물을 모두 찾았소' :
      n >= NEED ? NUM[n] + '개 수습 완료 · 식자실 문이 열렸소' :
      '유물 4개를 모아 3D 식자실의 문을 여시오 (' + NUM[n] + ' / 4)';
    var slots = tray.querySelector('.ykq-slots'), html = '';
    for (var i = 0; i < NEED; i++) {
      var r = a[i] && byId(a[i]);
      html += '<span class="ykq-slot' + (r ? ' got' : '') + '" title="' + (r ? r.ko : '?') + '">' + (r ? '<img src="' + r.img + '" alt="' + r.ko + '">' : '') + '</span>';
    }
    slots.innerHTML = html;
    tray.querySelector('.ykq-more').textContent = n > NEED ? '+' + (n - NEED) : '';
    var ob = tray.querySelector('.ykq-open');
    if (n >= NEED && !ob) {
      ob = document.createElement('button'); ob.type = 'button'; ob.className = 'ykq-open'; ob.textContent = '식자실 문을 연다';
      ob.addEventListener('click', function () { openGate(true); });
      tray.insertBefore(ob, tray.querySelector('.ykq-x'));
    }
  }
  function nudgeTray() {
    tray.classList.add('on'); var wasMini = tray.classList.contains('mini'); setMini(false); if (wasMini || smallScr) { clearTimeout(miniT); miniT = setTimeout(function () { setMini(true); }, 5000); } tray.classList.remove('nudge'); void tray.offsetWidth; tray.classList.add('nudge');
    tray.querySelector('.ykq-cnt').textContent = '유물 4개를 모아 3D 식자실의 문을 여시오 (' + NUM[got().length] + ' / 4)';
  }

  /* 소지품 출현 트리거 함수 (한번 출현하면 주울 때까지 잔존) */
  function revealRelic(id) {
    if (got().indexOf(id) > -1) return;
    revealedRelics.add(id);
    var el = document.querySelector('.ykq-relic[data-id="' + id + '"]');
    if (el) {
      el.classList.add('ykq-revealed');
    }
  }

  function place() {
    var a = got();
    RELICS.forEach(function (r) {
      var host = document.querySelector(r.host);
      if (!host && r.id === 'doll') host = document.querySelector('.rd-parlor') || document.querySelector('.rd-desk');
      if (!host && r.id === 'key') host = document.querySelector('.spread > .index') || document.querySelector('.index');
      if (r.id === 'key' && host && host.hasAttribute('hidden')) host.removeAttribute('hidden');
      if (!host) return;
      host.classList.add('ykq-host');
      var el = host.querySelector('.ykq-relic[data-id="' + r.id + '"]');
      if (a.indexOf(r.id) > -1) { if (el) el.remove(); return; }
      if (el) {
        if (revealedRelics.has(r.id)) el.classList.add('ykq-revealed');
        return;
      }
      el = document.createElement('span'); el.className = 'ykq-relic'; el.dataset.id = r.id;
      if (revealedRelics.has(r.id)) el.classList.add('ykq-revealed');
      el.setAttribute('role', 'button'); el.tabIndex = 0;
      el.setAttribute('aria-label', '지면 우에 놓인 물건: ' + r.ko); el.setAttribute('style', r.pos);
      el.innerHTML = '<img src="' + r.img + '" alt="">';
      var go = function (e) { e.preventDefault(); e.stopPropagation(); take(r, el); };
      el.addEventListener('click', go, true);
      el.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') go(e); });
      host.appendChild(el);
    });
  }

  var actx = null;
  function thud() {
    try {
      actx = actx || new (window.AudioContext || window.webkitAudioContext)();
      var t = actx.currentTime, o = actx.createOscillator(), g = actx.createGain();
      o.type = 'sine'; o.frequency.setValueAtTime(70, t); o.frequency.exponentialRampToValueAtTime(32, t + .7);
      g.gain.setValueAtTime(.0001, t); g.gain.exponentialRampToValueAtTime(.55, t + .03); g.gain.exponentialRampToValueAtTime(.0001, t + 1.1);
      o.connect(g).connect(actx.destination); o.start(t); o.stop(t + 1.2);
      var n = actx.createBufferSource(), buf = actx.createBuffer(1, actx.sampleRate * 1.4, actx.sampleRate), d = buf.getChannelData(0);
      for (var k = 0; k < d.length; k++) d[k] = (Math.random() * 2 - 1) * Math.pow(1 - k / d.length, 2);
      var f = actx.createBiquadFilter(); f.type = 'bandpass'; f.frequency.value = 900; f.Q.value = .7;
      var g2 = actx.createGain(); g2.gain.value = .12;
      n.buffer = buf; n.connect(f).connect(g2).connect(actx.destination); n.start(t + .05);
    } catch (e) {}
  }
  var revealing = false;
  function take(r, el) {
    var a = got(); if (a.indexOf(r.id) > -1 || revealing) return;
    revealing = true;
    a.push(r.id); save(a);
    revealedRelics.delete(r.id);
    var from = el.getBoundingClientRect(), elImg = el.querySelector('img'); el.remove();
    thud();
    var rv = document.createElement('div'); rv.className = 'ykq-rv'; rv.setAttribute('role', 'dialog'); rv.setAttribute('aria-label', r.ko);
    rv.innerHTML = '<div class="ykq-cap"><b>' + r.ko + '</b><span>' + capOf(r).old + '</span><small>' + capOf(r).now + '</small>' +
      '<i>' + (a.length >= NEED ? '넷이 모엿소 · 식자실 문이 열리오' : '넷 중 ' + NUM[Math.min(a.length, NEED)] + ' · 누르면 넘어가오') + '</i></div>';
    var big = document.createElement('div'); big.className = 'ykq-big';
    big.style.cssText = 'left:' + from.left + 'px;top:' + from.top + 'px;width:' + from.width + 'px';
    big.innerHTML = '<img src="' + r.img + '" alt="">';
    document.body.appendChild(rv); document.body.appendChild(big);
    document.documentElement.classList.add('ykq-lock');
    var im0 = elImg;
    var ratio = (im0 && im0.naturalWidth) ? im0.naturalHeight / im0.naturalWidth : .62;
    var boxH = innerHeight * .62, W = Math.min(innerWidth * .7, boxH / ratio, 820), Hh = W * ratio;
    var top = Math.max(16, innerHeight * .05 + (boxH - Hh) / 2);

    requestAnimationFrame(function () {
      rv.classList.add('on');
      big.style.left = ((innerWidth - W) / 2) + 'px';
      big.style.top = top + 'px';
      big.style.width = W + 'px';
    });

    var dismissed = false;
    function dismiss() {
      if (dismissed) return; dismissed = true;
      rv.removeEventListener('click', dismiss);
      drawTray();
      var targetSlot = tray.querySelectorAll('.ykq-slot')[Math.min(a.length - 1, NEED - 1)];
      var dest = (targetSlot || tray).getBoundingClientRect();
      big.classList.add('go');
      big.style.left = (dest.left + (dest.width - 36) / 2) + 'px';
      big.style.top = (dest.top + (dest.height - 34) / 2) + 'px';
      big.style.width = '36px';
      big.style.opacity = '0';
      rv.classList.add('out');
      setTimeout(function () {
        big.remove(); rv.remove();
        document.documentElement.classList.remove('ykq-lock');
        revealing = false;
      }, 750);
    }
    setTimeout(function () { rv.addEventListener('click', dismiss); }, 400);
    setTimeout(dismiss, 4200);
  }

  /* ─────────────────────────────────────────────────────────────
     체험 장치 4종 완료 이벤트 감지 바인딩 (c1, c2, c3, c4)
     ───────────────────────────────────────────────────────────── */
  function bindInteractiveExperiences() {
    // 1) c1 약병: 라벨 완전 회전 (.bottle:hover 시 .lab 의 transform transition 끝)
    var bottle = document.querySelector('.case.c1 .visual.bottle') || document.querySelector('.visual.bottle');
    if (bottle) {
      var lab = bottle.querySelector('.lab');
      var bottleTimer = null;
      bottle.addEventListener('mouseenter', function () {
        clearTimeout(bottleTimer);
        // transition 시간(1.3초) 동안 마우스가 머물렀을 때 완료 판정
        bottleTimer = setTimeout(function () {
          revealRelic('watch');
        }, CONSTANTS.BOTTLE_TRANSITION_MS);
      });
      bottle.addEventListener('mouseleave', function () {
        clearTimeout(bottleTimer);
      });
      if (lab) {
        lab.addEventListener('transitionend', function (e) {
          if (e.propertyName === 'transform' && bottle.matches(':hover')) {
            revealRelic('watch');
          }
        });
      }
    }

    // 2) c2 괴투서: 편지 인출 및 필적 대조 연출 완료 (.k5:hover 시 .sheet transition 끝)
    var k5 = document.querySelector('.case.c2 .visual.k5') || document.querySelector('.visual.k5');
    if (k5) {
      var sheet = k5.querySelector('.sheet');
      var k5Timer = null;
      k5.addEventListener('mouseenter', function () {
        clearTimeout(k5Timer);
        // 편지 인출 및 인장 대조 연출 완료(1.6초) 동안 머물렀을 때 완료 판정
        k5Timer = setTimeout(function () {
          revealRelic('scissors');
        }, CONSTANTS.LETTER_TRANSITION_MS);
      });
      k5.addEventListener('mouseleave', function () {
        clearTimeout(k5Timer);
      });
      if (sheet) {
        sheet.addEventListener('transitionend', function (e) {
          if (e.propertyName === 'transform' && k5.matches(':hover')) {
            revealRelic('scissors');
          }
        });
      }
    }

    // 3) c3 손기정: 붓으로 일장기 끝까지 지운 뒤 (.desk:hover 시 .erase2 .scrib transition 끝)
    var desk = document.querySelector('.case.c3 .visual.desk') || document.querySelector('.visual.desk');
    if (desk) {
      var scrib = desk.querySelector('.erase2 .scrib');
      var deskTimer = null;
      desk.addEventListener('mouseenter', function () {
        clearTimeout(deskTimer);
        // 붓질 stroke-dashoffset 전환 시간(1.8초) 동안 머물렀을 때 완료 판정
        deskTimer = setTimeout(function () {
          revealRelic('pen');
        }, CONSTANTS.ERASE_TRANSITION_MS);
      });
      desk.addEventListener('mouseleave', function () {
        clearTimeout(deskTimer);
      });
      if (scrib) {
        scrib.addEventListener('transitionend', function (e) {
          if (e.propertyName === 'stroke-dashoffset' && desk.matches(':hover')) {
            revealRelic('pen');
          }
        });
      }
    }

    // 4) c4 백백교 돋보기: 사진 위 면적 60% 이상 훑었거나 1.5초 이상 관찰했을 때
    var lens = document.querySelector('.case.c4 .visual.lens') || document.querySelector('.visual.lens');
    if (lens && !lens._boundEgg) {
      lens._boundEgg = true;
      var shot = lens.querySelector('.shot') || lens;
      var visitedGrid = new Set();
      var GRID_COLS = 4, GRID_ROWS = 4, TOTAL_CELLS = GRID_COLS * GRID_ROWS;
      var lensTimer = null;

      function checkLensComplete(e) {
        if (revealedRelics.has('door') || got().indexOf('door') > -1) return;
        var r = shot.getBoundingClientRect();
        if (r.width > 0 && r.height > 0) {
          var px = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width));
          var py = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
          var col = Math.min(GRID_COLS - 1, Math.floor(px * GRID_COLS));
          var row = Math.min(GRID_ROWS - 1, Math.floor(py * GRID_ROWS));
          visitedGrid.add(row * GRID_COLS + col);

          var coverage = visitedGrid.size / TOTAL_CELLS;
          if (coverage >= CONSTANTS.LENS_COVERAGE_THRESHOLD) {
            revealRelic('door');
          }
        }
      }

      lens.addEventListener('mouseenter', function () {
        clearTimeout(lensTimer);
        lensTimer = setTimeout(function () {
          revealRelic('door');
        }, 1500);
      });
      lens.addEventListener('mouseleave', function () {
        clearTimeout(lensTimer);
      });
      lens.addEventListener('mousemove', checkLensComplete);
      if (shot && shot !== lens) {
        shot.addEventListener('mousemove', checkLensComplete);
      }
    }
  }

  /* ─────────────────────────────────────────────────────────────
     체험 장치가 없는 일반 칸 7종: 기사 글/여백 위에서 1초 정지 시 출현
     ───────────────────────────────────────────────────────────── */
  var armed = false, liveT = null, currentHost = null;
  var startX = 0, startY = 0;
  setTimeout(function () { armed = true; }, 1200);

  // 체험 장치가 있는 4개 칸의 ID 목록
  var INTERACTIVE_RELIC_IDS = new Set(['watch', 'scissors', 'pen', 'door']);
  var INTERACTIVE_SELECTOR = '.lens, .loupe, .desk, .erase, .erase2, .bottle, .k5, [data-zoom], canvas, button';

  function isInteractiveElement(el) {
    if (!el || !el.closest) return false;
    return !!el.closest(INTERACTIVE_SELECTOR);
  }

  function clearRelicHover() {
    if (liveT) { clearTimeout(liveT); liveT = null; }
    if (currentHost) { currentHost.classList.remove('ykq-live'); currentHost = null; }
  }

  function restartTimer(h, relicId, x, y) {
    if (liveT) { clearTimeout(liveT); liveT = null; }
    startX = x;
    startY = y;
    liveT = setTimeout(function () {
      if (currentHost === h) {
        h.classList.add('ykq-live');
        revealRelic(relicId);
      }
    }, CONSTANTS.STILLNESS_DELAY);
  }

  document.addEventListener('mouseover', function (e) {
    if (!armed) return;
    if (isInteractiveElement(e.target)) {
      clearRelicHover();
      return;
    }
    var h = e.target.closest && e.target.closest('.ykq-host');
    if (!h) {
      clearRelicHover();
      return;
    }

    var relicEl = h.querySelector('.ykq-relic');
    var relicId = relicEl ? relicEl.dataset.id : null;
    // 체험 장치가 있는 칸(watch, scissors, pen, door)은 일반 호버 타이머로 출현하지 않음
    if (!relicId || INTERACTIVE_RELIC_IDS.has(relicId)) {
      clearRelicHover();
      return;
    }

    if (h === currentHost) return;
    if (currentHost) currentHost.classList.remove('ykq-live');
    currentHost = h;
    restartTimer(h, relicId, e.clientX, e.clientY);
  }, true);

  document.addEventListener('mousemove', function (e) {
    if (!armed || !currentHost) return;
    if (isInteractiveElement(e.target)) {
      clearRelicHover();
      return;
    }
    var h = e.target.closest && e.target.closest('.ykq-host');
    if (h !== currentHost) {
      clearRelicHover();
      return;
    }

    var relicEl = h.querySelector('.ykq-relic');
    var relicId = relicEl ? relicEl.dataset.id : null;
    if (!relicId || INTERACTIVE_RELIC_IDS.has(relicId)) {
      clearRelicHover();
      return;
    }

    // 마우스가 30px 이상 크게 움직이면 타이머 리셋
    var dist = Math.hypot(e.clientX - startX, e.clientY - startY);
    if (dist > CONSTANTS.STILLNESS_RADIUS) {
      if (!revealedRelics.has(relicId) && !currentHost.classList.contains('ykq-live')) {
        restartTimer(currentHost, relicId, e.clientX, e.clientY);
      }
    }
  }, true);

  document.addEventListener('mouseout', function (e) {
    var h = e.target.closest && e.target.closest('.ykq-host');
    if (h && !h.contains(e.relatedTarget)) {
      if (currentHost === h) {
        clearRelicHover();
      }
    }
  }, true);

  drawTray(); place();
  bindInteractiveExperiences();

  /* 면을 넘기거나 지면이 다시 그려져도 물건이 제자리에 */
  if ('MutationObserver' in window) {
    var tmr = null, spread = document.querySelector('.spread') || document.body;
    new MutationObserver(function () {
      clearTimeout(tmr);
      tmr = setTimeout(function () {
        place();
        bindInteractiveExperiences();
      }, 250);
    }).observe(spread, { childList: true, subtree: true });
  }
  setTimeout(function () { place(); bindInteractiveExperiences(); }, 1500);
  setTimeout(function () { place(); bindInteractiveExperiences(); }, 4000);
})();
