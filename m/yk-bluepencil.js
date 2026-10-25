/* 경성야록 · 읽는 순서 표시 (1013 · 2판)
   「뭐가 많아서 뭘 봐야 할지 모르겟다」 → 메인에서 꼭 볼 세 칸에만 작은 순서 표를 붙임.
   1판(연필 꺾쇠 · 떠 잇는 쪽지)은 지면 미감을 해쳐서 뺌 (_backup/bluepencil_1013/yk-bluepencil_v1.js).
   이번엔 지면의 제목 띠 안에 인쇄 글씨로만 조용히.
   ① 사건 하나(죽첨정 머릿기사) → ② 납량 괴담(광고칸 「오늘밤」) → ③ 독자 호외
   색은 편집자의 파란 연필에서 따온 먹빛 파랑 한 가지. 선 · 동그라미 · 움직임 없음. */
(function () {
  'use strict';
  var D = document, W = window;
  if (W.__ykBP) return; W.__ykBP = true;
  var BLUE = '#2b4f78';
  var MARKS = [
    { sel: 'article.case.c1', at: 'header.label > i', n: '①', t: '먼저 읽기', go: '사건 하나' },
    { sel: 'a.ad2.film', at: null, n: '②', t: '그다음', go: '납량 괴담' },
    { sel: '#hogoe', at: 'header.rhg-hd > span', n: '③', t: '마지막', go: '당신의 호외' }
  ];

  var css = D.createElement('style');
  css.textContent =
    '.bp-q{display:inline-flex;align-items:center;gap:5px;align-self:center;margin-left:14px;white-space:nowrap;' +
      'font-family:"Nanum Myeongjo","Noto Serif KR",serif;font-weight:800;font-size:12.5px;letter-spacing:.14em;color:' + BLUE + ';line-height:1}' +
    '.bp-q .bp-n{all:unset;font-family:"Noto Serif KR",serif;font-weight:500;font-size:15px;letter-spacing:0;color:inherit}' +
    '.bp-q.abs{position:absolute;left:12px;top:10px;margin:0;z-index:3}' +
    '.bp-host{position:relative}' +
    '.bp-legend{margin:12px 0 0;text-align:center;font-family:"Nanum Myeongjo","Noto Serif KR",serif;font-size:13px;letter-spacing:.08em;color:#6e6352}' +
    '.bp-legend button{font:inherit;background:none;border:0;padding:0 2px;cursor:pointer;color:' + BLUE + ';font-weight:800;letter-spacing:.1em}' +
    '.bp-legend button:hover{text-decoration:underline;text-underline-offset:4px;text-decoration-thickness:1px}' +
    '.bp-legend .ar{color:#a59a86;margin:0 6px}' +
    '@media print{.bp-q,.bp-legend{display:none}}';
  D.head.appendChild(css);

  function badges() {
    MARKS.forEach(function (m) {
      var el = D.querySelector(m.sel); if (!el || el.querySelector('.bp-q')) return;
      var q = D.createElement('span'); q.className = 'bp-q'; q.innerHTML = '<span class="bp-n">' + m.n + '</span>' + m.t;
      var at = m.at && el.querySelector(m.at);
      if (at) at.insertAdjacentElement('afterend', q);
      else { q.classList.add('abs'); if (getComputedStyle(el).position === 'static') el.classList.add('bp-host'); el.appendChild(q); }
    });
  }
  function legend() {
    var nav = D.querySelector('nav.sections'); if (!nav || D.querySelector('.bp-legend')) return;
    var p = D.createElement('p'); p.className = 'bp-legend';
    p.innerHTML = '처음이시면 이 순서로 — ' + MARKS.map(function (m, i) { return '<button type="button" data-i="' + i + '">' + m.n + ' ' + m.go + '</button>'; }).join('<span class="ar">·</span>');
    nav.parentNode.insertBefore(p, nav.nextSibling);
    [].forEach.call(p.querySelectorAll('button'), function (b) {
      b.addEventListener('click', function () {
        var el = D.querySelector(MARKS[+b.dataset.i].sel); if (!el) return;
        var all = D.querySelector('nav.sections button[data-f="all"]'); if (el.offsetParent === null && all) all.click();
        setTimeout(function () { el.scrollIntoView({ behavior: 'smooth', block: 'center' }); }, 60);
      });
    });
  }
  function go() { legend(); badges(); }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', go); else go();
})();
