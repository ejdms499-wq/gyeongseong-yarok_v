/* 경성야록 · 첫 화면 단순화 (1016 · 멘토 피드백 반영)
   원칙: 처음 들어온 사람에게는 「네 사건 가운데 하나를 고른다」 하나만 보인다.
   - 본지: 상단 메뉴 · 지면 목차 · 부록/호외/광고 칸 · 떠 있는 장치(보는법 · 소지품 · 쪽지)를 접어 둠
           → 사건 하나를 끝까지 읽고 오면 「더 읽을거리」로 열림
   - 사건 면: 떠 있는 것은 취재 수첩(과 소리 · 호외 카드) 만. 「보는 법」 책갈피 · 소지품 상자는 숨김
   - 아무것도 지우지 않음. 화면에서 접어 둘 뿐 (컴퓨터 · 폰 모두) */
(function () {
  'use strict';
  var W = window, D = document, H = D.documentElement;
  if (W.__ykSimple) return; W.__ykSimple = true;
  var me = D.currentScript || [].slice.call(D.scripts).filter(function (s) { return /yk-simple\.js/.test(s.src); })[0];
  var BASE = me ? me.src.replace(/yk-simple\.js.*$/, '') : '';
  var isCase = /\/case-[a-z]+\//.test(location.pathname);
  var KEY = 'yk-read-any';
  function read() { try { return sessionStorage.getItem(KEY) || localStorage.getItem(KEY); } catch (e) { return null; } }
  function setRead(k) { try { sessionStorage.setItem(KEY, k); localStorage.setItem(KEY, k); } catch (e) {} }
  try { localStorage.setItem('yk-intro1', '1'); } catch (e) {}   /* 첫 방문 안내 투어(덮는 창)는 띄우지 않음 — 대신 한 줄 안내 */
  H.classList.add('yk-simple');

  var css = D.createElement('style'); css.id = 'yk-simple-css';
  css.textContent = [
    /* 공통: 떠다니는 보조 장치 숨김 */
    /* (1020) 식자실 소지품(ykq-relic)과 소지품 상자(ykq-tray)는 숨기지 안음 — 모아야 게임에 드러감 */
    'html.yk-simple .ykg-tab,html.yk-simple .ykg-toast,html.yk-simple .yk-find,html.yk-simple .yk-sndnote{display:none!important}',
    'html.yk-simple .m-dock.has-tab{grid-template-columns:repeat(6,1fr)!important}',
    /* 본지 · 컴퓨터 */
    'html.yk-simple.ys-lock .spread>section.reads,html.yk-simple.ys-lock .spread>section.rhg,html.yk-simple.ys-lock .spread>section.ads,html.yk-simple.ys-lock .spread>.iris-out{display:none!important}',
    '.ys-pick{grid-column:1/-1;display:flex;align-items:baseline;justify-content:space-between;gap:16px;flex-wrap:wrap;margin:6px 0 14px;padding:12px 0;border-top:3px double currentColor;border-bottom:1px solid currentColor}',
    '.ys-pick b{font:900 clamp(18px,2vw,24px)/1.35 "Noto Serif KR",serif;letter-spacing:-.01em}',
    '.ys-pick span{font:400 13px/1.6 "Noto Sans KR",sans-serif;letter-spacing:.04em;opacity:.75}',
    '.ys-more{margin:26px 0 8px;padding:18px 0 4px;border-top:3px double currentColor}',
    '.ys-more h3{margin:0 0 4px;font:900 20px/1.3 "Noto Serif KR",serif}',
    '.ys-more p{margin:0 0 12px;font:400 13.5px/1.7 "Noto Sans KR",sans-serif;opacity:.75}',
    '.ys-more ul{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fill,minmax(200px,1fr));gap:0 24px}',
    '.ys-more li{border-top:1px solid currentColor}',
    '.ys-more a,.ys-more .ys-off{display:flex;justify-content:space-between;align-items:baseline;gap:10px;padding:12px 0;color:inherit;text-decoration:none;font:700 15px/1.4 "Noto Serif KR",serif}',
    '.ys-more small{font:400 11.5px/1.4 "Noto Sans KR",sans-serif;opacity:.7}',
    '.ys-more .ys-off{opacity:.38;cursor:default}',
    '.ys-more .ys-lockmsg{display:inline-block;margin-top:6px;font:500 12px/1.5 "Noto Sans KR",sans-serif;letter-spacing:.06em;color:#b3261e}',
    'html.yk-simple:not(.ys-lock) .ys-lockmsg{display:none}',
    /* 본지 · 폰 (m-index 면 넘김) — 잠긴 동안 五 · 六 면은 접음 */
    '@media (max-width:600px){html.yk-simple.ys-lock .m-deck .m-pg5,html.yk-simple.ys-lock .m-deck .m-pg6,html.yk-simple.ys-lock .m-dock button:nth-child(5),html.yk-simple.ys-lock .m-dock button:nth-child(6){display:none!important}' +
      'html.yk-simple.ys-lock .m-dock{grid-template-columns:repeat(4,1fr)!important}html.yk-simple .m-hint{display:none!important}' +
      '.ys-pick{display:block;margin:20px 0 0;padding:10px 0}.ys-pick b{display:block;font-size:17px}.ys-pick span{display:block;margin-top:4px;font-size:12.5px}' +
      '.ys-more ul{grid-template-columns:1fr}}'
  ].join('\n');
  (D.head || H).appendChild(css);

  var MORE = [
    ['shop.html', '광고 상뎜', '그 시절 신문 아래 칸의 광고'],
    ['hogoe.html', '독자 호외', '내 손으로 찍는 괴담 호외'],
    ['napryang.html', '납량란', '자정의 백물어'],
    ['appendix.html', '부록 · 자료실', '사건 뒤의 지면 · 연표'],
    ['expo.html', '경성사건박람회', '자정에 열리는 회장'],
    ['newsroom.html', '편집국', '기자증이 있어야 들어가오'],
    ['about.html', '야록 소개', '이 신문은 어떻게 만들었나']
  ];

  function main() {
    var sp = D.querySelector('main.spread') || D.querySelector('.spread');
    if (!sp && !D.querySelector('.m-deck')) return;
    var unlocked = true;   /* 1016 · 부록은 처음부터 모두 그대로 (잠그지 않음) */
    /* 한 줄 안내 — 사건 칸 바로 위 (폰은 첫 면 목차 위) */
    var cases = D.getElementById('cases');
    if (cases && !D.querySelector('.ys-pick')) {
      var pk = D.createElement('div'); pk.className = 'ys-pick';
      pk.innerHTML = '<b>네 사건 가운데 하나를 골라 읽으시압</b><span>기사의 「자세히 보시압」을 누르면 그 사건의 본편이 열리오</span>';
      cases.parentNode.insertBefore(pk, cases);
    }
    var fr = D.querySelector('.yn-front .yf-idx');
    if (fr && !D.querySelector('.yn-front .ys-pick')) {
      var pk2 = D.createElement('div'); pk2.className = 'ys-pick';
      pk2.innerHTML = '<b>네 사건 가운데 하나를 골라 읽으시압</b><span>제목을 누르면 그 사건의 본편이 열리오</span>';
      fr.parentNode.insertBefore(pk2, fr);
    }
    /* 더 읽을거리 — 본지 맨 끝 (폰은 첫 면 끝) */
    var host = D.querySelector('.yn-front') || (sp && sp.querySelector('footer.foot')) || sp;
    if (false && host && !D.querySelector('.ys-more')) {
      var box = D.createElement('section'); box.className = 'ys-more';
      box.innerHTML = '<h3>더 읽을거리</h3><p>사건 하나를 끝까지 읽고 오면 부록이 열리오.</p><span class="ys-lockmsg">● 아즉 닫혀 잇소 — 위의 사건부터 읽으시압</span><ul>' +
        MORE.map(function (m) { return '<li>' + (unlocked ? '<a href="' + BASE + m[0] + '">' + m[1] + '<small>' + m[2] + '</small></a>' : '<span class="ys-off">' + m[1] + '<small>' + m[2] + '</small></span>') + '</li>'; }).join('') + '</ul>';
      if (host.classList && host.classList.contains('yn-front')) host.appendChild(box);
      else if (host.tagName === 'FOOTER') host.parentNode.insertBefore(box, host);
      else host.appendChild(box);
    }
  }

  function casePage() {
    /* 끝까지(85%) 읽으면 본지 부록이 열림 */
    var k = location.pathname.split('/').slice(-2, -1)[0];
    function chk() { var end = D.querySelector('#next-cases, .next-cases, .colophon, .page-foot'); if (end && end.getBoundingClientRect().top < innerHeight * 1.2) { setRead(k); removeEventListener('scroll', chk); } }
    addEventListener('scroll', chk, { passive: true });
  }

  function go() { if (isCase) casePage(); else main(); }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', go); else go();
  setTimeout(go, 1600); setTimeout(go, 4000);
})();
