/* ════════════════════════════════════════════════════════════════
   경성야록 · 장면별 출처 표시 (yk-sources.js)
   - 장(章)마다 이 장면이 무엇에 기대고 잇는지 작은 도장으로 밝힘
       原文  : 동아일보 지면에 실린 그대로 (날짜 · 면)
       再構成 : 기록을 바탕으로 경성야록이 다시 꾸민 장면 (무엇을 바탕으로 햇는지)
       解說  : 경성야록이 덧붙인 풀이 · 오늘의 자료
   - 사건 내용은 코드가 아니라 아래 데이터(YK_SRC)에만 적음 → 사건을 더할 때 한 덩어리만 보태면 됨
   - 도장을 누르면 「야록 소개 · 윤리 원칙」으로 감
   - ※ 면(面) 번호는 지면에서 확인된 것만 적음
   ════════════════════════════════════════════════════════════════ */
(function (W, D) {
  'use strict';
  var KIND = {
    orig: { hj: '原文', ko: '원문', note: '동아일보 지면에 실린 그대로' },
    re:   { hj: '再構成', ko: '재구성', note: '기록을 바탕으로 다시 꾸민 장면' },
    note: { hj: '解說', ko: '해설', note: '경성야록이 덧붙인 풀이' }
  };
  /* sel: 그 장(章) · at: 도장을 붙일 자리(그 장 안에서) */
  W.YK_SRC = W.YK_SRC || {};
  W.YK_SRC.jk = {
    title: '죽첨정 골목의 어린 주검',
    year: 1933,
    scenes: [
      { sel: '.case-brief', at: '.label', kind: 'orig', src: '동아일보 1933.5.17(2면) · 6.2 · 6.8' },
      { sel: '.jk-scene', at: '.label', kind: 'orig', src: '동아일보 1933.5.17 · 2면', plus: '그림은 재현' },
      { sel: '.report-history', at: '.label', kind: 'orig', src: '동아일보 1933.5.17 ~ 6.8 지면' },
      { sel: '.ledger', at: '.label', kind: 'orig', src: '동아일보 1933.5.17 ~ 6.3 지면에 실린 혐의자만' },
      { sel: '.jk-story', at: '.label', kind: 're', src: '신동아 1933년 7월호 · 전봉관 연재 바탕' },
      { sel: '#extra', at: '.ex-chap', kind: 'orig', src: '동아일보 1933.6.8', plus: '호외 꼴은 재구성' },
      { sel: '.misreport', at: '.label', kind: 'orig', src: '동아일보 1933.6.2', plus: '2004년 사례는 오늘의 보도' },
      { sel: '.archive-radio', at: '.label', kind: 'note', src: '진상 이후의 자료 · 그림은 재현' }
    ]
  };

  W.YK_SRC.sk = {
    title: '손긔졍, 지워진 가슴',
    year: 1936,
    scenes: [
      { sel: '.case-brief', at: '.label', kind: 'orig', src: '동아일보 1936.8.11 · 8.13 · 8.25', plus: '조선일보 8.10 호외' },
      { sel: '#night', at: '.nt-in', kind: 're', src: '그 밤의 세종로를 다시 꾸밈', plus: '그림은 재현' },
      { sel: '.report-history', at: '.label', kind: 'orig', src: '조선일보 1936.8.10 호외 · 동아일보 8.11 ~ 8.13' },
      { sel: '.sk-podium', at: '.label', kind: 'note', src: '시상대의 묘목 — 교육과 문화 · 서울시 미디어허브' },
      { sel: '#brush', at: '.label', kind: 'orig', src: '동아일보 1936.8.25 · 일장긔를 지운 사진' },
      { sel: '.sk-roster', at: '.label', kind: 'note', src: '구속 · 서약 — 한국민족문화대백과사전 · 경인일보' },
      { sel: '#blank', at: '.label', kind: 'note', src: '정간 1936.8.29 ~ 1937.6.2 — 한국민족문화대백과사전' },
      { sel: '.sk-name', at: '.label', kind: 'note', src: '엽서의 한글 서명 — 헤럴드경제(2025.7.24)' },
      { sel: '.archive-radio', at: '.label', kind: 'note', src: '라듸오 원고 1968 · 1974 · 1980 · 1986' },
      { sel: '#marks', at: '.mk-in', kind: 'note', src: '그 뒤의 기록 — 뉴시스(2021.7.14) · 다음뉴스(2025.8.14)' }
    ]
  };

  W.YK_SRC.maria = {
    title: '부산 마리아 참살사건',
    year: 1931,
    scenes: [
      { sel: '.case-brief', at: '.label', kind: 'orig', src: '동아일보 1931.8.4 ~ 9.16 · 1933.11.10', plus: '판결은 『중앙』 1934.3 공판기' },
      { sel: '#riddles', at: '.label', kind: 'note', src: '동아일보 1931 지면 · 공판 기록에서 뽑은 물음' },
      { sel: '.first-report', at: '.fr-text', kind: 'orig', src: '동아일보 1931.8.4 · 처음 실린 지면' },
      { sel: '.yasa', at: '.label', kind: 're', src: '공판기(『중앙』 1934.3) · 동아일보 공판 기사 바탕', plus: '그림은 재현' },
      { sel: '#clock', at: '.label', kind: 're', src: '『중앙』 1934.3 공판기 · 동아일보 1933.12.15 ~ 17 바탕', plus: '그림은 재현' },
      { sel: '.report-history', at: '.label', kind: 'orig', src: '동아일보 1931.8.4 ~ 9.16 지면' },
      { sel: '.letters', at: '.label', kind: 'orig', src: '동아일보 1931.9.2 · 9.16', plus: '편지 그림은 재현' },
      { sel: '#alibi', at: '.label', kind: 're', src: '『중앙』 1934.3 공판기 바탕', plus: '조서 모양은 재구성' },
      { sel: '#rumors', at: '.label', kind: 'note', src: '『별건곤』 제63호(1933.5.1)의 세 짐작', plus: '동아일보 기사 아님' },
      { sel: '#third', at: '.label', kind: 'orig', src: '동아일보 1932.12.31 · 1933.11.10' },
      { sel: '#court', at: '.label', kind: 're', src: '동아일보 1933.12.15 ~ 17 공판 기사 바탕', plus: '문답은 재구성' },
      { sel: '.verdict', at: '.label', kind: 'orig', src: '동아일보 1934.1.20 · 1.28', plus: '『중앙』 1934.3' },
      { sel: '.mr-radio', at: '.label', kind: 'note', src: '그 뒤 시대의 사건 — 닮은 꼴은 해석' },
      { sel: '.then-now', at: '.label', kind: 'note', src: '초량 일대의 옛 사진 · 오늘 사진' }
    ]
  };

  W.YK_SRC.bb = {
    title: '백백교 사건',
    year: 1937,
    scenes: [
      { sel: '.case-brief', at: '.label', kind: 'orig', src: '조선일보 1937.4.13 호외 · 동아일보 1937.6.3 ~ 12.11' },
      { sel: '#white', at: '.wh-tag', kind: 'note', src: '백백교가 내건 말 — 한국민족문화대백과사전', plus: '그림은 재현' },
      { sel: '#who', at: '.label', kind: 'note', src: '한국민족문화대백과사전 · 동아일보 1940.3' },
      { sel: '#obit', at: '.label', kind: 're', src: '한국민족문화대백과사전 바탕', plus: '부고 문안은 재구성' },
      { sel: '#ledger', at: '.label', kind: 're', src: '한국민족문화대백과사전 바탕', plus: '장부 · 임명장 모양은 재구성' },
      { sel: '#house', at: '.label', kind: 're', src: '한국민족문화대백과사전 바탕', plus: '식구와 지부의 짝은 재구성' },
      { sel: '#night', at: '.ng-src', kind: 're', src: '후대 회고 기사 바탕', plus: '그림은 재현' },
      { sel: '#mute', at: '.mu-tag', kind: 'note', src: '보도 금지 1937.2.19 ~ 4.12' },
      { sel: '#mountain', at: '.mt-tag', kind: 're', src: '수배지 모양은 재구성', plus: '그림은 재현' },
      { sel: '#land', at: '.label', kind: 'orig', src: '조선일보 1937.4.13 호외 · 동아일보 1937.6.9 · 11.17', plus: '표지 장치는 재구성' },
      { sel: '.report-history', at: '.label', kind: 'orig', src: '조선일보 1937.4.13 호외 · 동아일보 1937.6.3 ~ 12.11 지면' },
      { sel: '#dossier', at: '.label', kind: 'note', src: '한국민족문화대백과사전 · 동아일보 1937 재판 기사', plus: '딸의 그림자는 재구성' },
      { sel: '.bb-verdict', at: '.label', kind: 'orig', src: '동아일보 1937.12.11 · 1940.3', plus: '빈 법정은 재현 그림' },
      { sel: '#jar', at: '.label', kind: 'note', src: '해방 뒤 ~ 2011년 화장까지의 기록', plus: '병은 재현 그림' },
      { sel: '.bb-after', at: '.label', kind: 'note', src: '그 뒤 시대의 닫힌 무리 — 닮은 꼴은 해석' }
    ]
  };

  var BASE = (function () { try { var c = D.currentScript && D.currentScript.src; return c ? c.replace(/yk-sources\.js.*$/, '') : ''; } catch (e) { return ''; } })();
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function css() {
    if (D.getElementById('yks-css')) return;
    var s = D.createElement('style'); s.id = 'yks-css';
    s.textContent = [
      'a.yks{all:unset;box-sizing:border-box;display:inline-flex;align-items:center;gap:7px;margin-left:auto;padding:4px 9px 4px 4px;border:1px solid currentColor;border-radius:2px;cursor:pointer;',
      '  font:500 11px/1.2 "Noto Sans KR","Apple SD Gothic Neo",sans-serif;letter-spacing:.04em;opacity:.85;white-space:nowrap;max-width:100%;transition:opacity .2s}',
      'a.yks:hover,a.yks:focus-visible{opacity:1}',
      'a.yks .yks-k{all:unset;display:inline-block;padding:3px 6px 2px;font:800 11px/1 "Nanum Myeongjo","Noto Serif KR",serif;letter-spacing:.14em;border:1px solid currentColor}',
      'a.yks.k-re,a.yks.k-re .yks-k{border-style:dashed}',
      'a.yks.k-note,a.yks.k-note .yks-k{border-style:dotted}',
      'a.yks .yks-t{all:unset;overflow:hidden;text-overflow:ellipsis}',
      'a.yks .yks-p{all:unset;font-size:10.5px;opacity:.75}',
      '.yks-wrap{display:flex;justify-content:flex-end;margin:0 0 10px}',
      '@media (max-width:640px){a.yks{white-space:normal;margin-left:0;margin-top:6px}.label a.yks{flex-basis:100%}}'
    ].join('\n');
    D.head.appendChild(s);
  }
  function inkOn(el) {
    /* 原文 도장 속 글자는 바탕색으로 (밝은 지면이면 종이색, 어두운 면이면 먹색) */
    var c = getComputedStyle(el).color.match(/\d+/g) || [0, 0, 0];
    var light = (+c[0] * 299 + +c[1] * 587 + +c[2] * 114) / 1000 > 140;
    return light ? '#1d1813' : '#efe6d2';
  }
  function render(key) {
    var data = W.YK_SRC[key]; if (!data) return;
    css();
    data.scenes.forEach(function (sc) {
      var sec = D.querySelector(sc.sel); if (!sec || sec.querySelector('.yks')) return;
      var host = sc.at ? sec.querySelector(sc.at) : null;
      var k = KIND[sc.kind] || KIND.note;
      var a = D.createElement('a');
      a.className = 'yks k-' + sc.kind;
      a.href = BASE + 'about.html#marks';
      a.title = k.ko + ' — ' + k.note + ' · 누르면 「표시 읽는 법」';
      a.innerHTML = '<span class="yks-k">' + k.hj + '</span><span class="yks-t">' + esc(sc.src) + (sc.plus ? ' <span class="yks-p">· ' + esc(sc.plus) + '</span>' : '') + '</span>';
      if (host) host.appendChild(a);
      else { var w = D.createElement('div'); w.className = 'yks-wrap'; w.appendChild(a); sec.insertBefore(w, sec.firstChild); }
      var col = getComputedStyle(host || sec).color; a.style.color = col;
      if (sc.kind === 'orig') { var kk = a.querySelector('.yks-k'); kk.style.background = col; kk.style.color = inkOn(a); }
    });
  }
  W.ykSources = { render: render, KIND: KIND };
  var key = (D.currentScript && D.currentScript.getAttribute('data-case')) || '';
  function go() { if (key) render(key); }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', go); else go();
})(window, document);
