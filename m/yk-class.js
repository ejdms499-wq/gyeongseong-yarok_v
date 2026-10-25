/* ════════════════════════════════════════════════════════════════
   경성야록 · 수업 모드 (yk-class.js)
   - 켜기: 주소 끝에 ?class=1  (class.html 의 「수업 모드로 열기」 단추)  · 끄기: ?class=0 또는 진행표의 「수업 끝내기」
   - 켜지면
       ① 유료 긔록(단신)이 모두 열림 — 결제 창이 뜨지 않음 (yk-paywall.js 가 ykClass.on() 을 봄)
       ② 사건 페이지 오른쪽에 「수업 진행표」 — 45분 흐름, 누르면 그 장면으로 이동
       ③ 다른 페이지엔 작은 「수업 중」 표시
   - 수업안 내용은 아래 YK_CLASS 데이터에만 적음 (class.html 도 이 데이터를 그대로 씀)
   - 교과서 단원 이름은 yk-era.js 의 YK_WORDS 와 같은 것만 씀
   ════════════════════════════════════════════════════════════════ */
(function (W, D) {
  'use strict';
  if (W.ykClass) return;
  var KEY = 'yk-class';
  W.YK_CLASS = {
    jk: {
      title: '죽첨정 골목의 어린 주검', year: 1933, dir: 'case-jukcheomjeong', words: ['press', 'city'],
      goal: '신문이 확인 없이 받아 적은 말을 직접 바로잡고, 「바로잡습니다」 호외를 만들어 오늘의 보도 윤리를 익힌다.',
      steps: [
        { min: 5, part: '도입', name: '무슨 일이었나', sel: '.case-brief', do: '사건 요지 세 줄을 함께 읽습니다.', ask: '1933년 5월, 신문에 처음 실린 것은 무엇이었을까요?' },
        { min: 10, part: '전개 1', name: '원문 지면 읽기', sel: '.report-history', do: '날짜를 넘기며 원문을 보고, 손잡이를 당겨 2026년 기사와 비교합니다. 아래칸 광고(빨간 절취선)도 눌러 봅니다.', ask: '같은 날 신문의 기사와 광고를 함께 보면 무엇이 보이나요?' },
        { min: 12, part: '전개 2', name: '견습 기자 ① 교열 — 빨간 줄', sel: '.ykm-proof', do: '1933년 지면의 말 다섯 줄에 빨간 줄을 긋고 까닭 도장(未確認 · 偏見 · 身上)을 찍은 뒤, 편집국장에게 넘겨 판정을 받습니다. 모둠별로 해도 좋습니다.', ask: '다 지우면 왜 안 될까요? 남겨야 할 말은 무엇인가요?' },
        { min: 10, part: '전개 3', name: '견습 기자 ② 조판 — 내 호외', sel: '.ykm-type', do: '제목 활자를 고르고(선정적인 제목은 반려됩니다), 이름을 적어 「바로잡습니다」 호외를 찍습니다. 인쇄해 칠판에 붙입니다.', ask: '반려된 제목과 실린 제목은 무엇이 달랐나요?' },
        { min: 8, part: '정리', name: '그해의 지면 · 교과서', sel: '.yke', do: '연표 아래 줄(신문의 처지)을 1920 창간부터 1940 폐간까지 끌어 보고, 낱말을 눌러 교과서와 잇습니다.', ask: '신문이 할 수 있던 말은 해마다 어떻게 달라졌나요?' }
      ]
    },
    sk: {
      title: '손기정, 지워진 가슴', year: 1936, dir: 'case-sonkijeong', words: ['press', 'war'],
      goal: '일장기 말소 사건을 통해 일제의 언론 통제(검열 · 정간)가 실제로 어떻게 작동했는지 설명한다.',
      steps: [
        { min: 5, part: '도입', name: '무슨 일이었나', sel: '.case-brief', do: '사건 요지를 함께 읽습니다.', ask: '우승 소식과 정간 사이에는 무슨 일이 있었을까요?' },
        { min: 10, part: '전개 1', name: '원문 지면 읽기', sel: '.report-history', do: '조선일보 호외와 동아일보 지면을 넘기며 읽고, 2026년 기사와 비교합니다.', ask: '「조선의 두 아들」이라는 말은 어떤 마음을 담고 있나요?' },
        { min: 12, part: '전개 2', name: '지운 사진, 멈춘 신문', sel: '#brush', do: '일장기를 지운 사진을 보고, 이어서 정간 장(278일)으로 내려갑니다.', ask: '표지 하나를 지운 대가로 무엇이 멈추었나요?' },
        { min: 8, part: '전개 3', name: '교과서로 읽기', sel: '.yke', do: '1936년 신문을 펴고 「언론 통제와 보도」 낱말을 눌러 봅니다.', ask: '검열 · 삭제 · 압수 · 정간은 각각 무엇인가요?' },
        { min: 10, part: '정리', name: '독자 투고', sel: '.yg-post', do: '물음 하나를 골라 투고하고 발표합니다.', ask: '가슴의 표지와 그가 쓴 서명 — 무엇이 그의 이름일까요?' }
      ]
    },
    maria: {
      title: '부산 마리아 참살사건', year: 1931, dir: 'case-maria', words: ['press', 'city'],
      goal: '증명되지 않은 소문이 피해자를 어떻게 낙인찍는지 살펴보고, 피해자를 존중하는 보도를 생각한다.',
      steps: [
        { min: 5, part: '도입', name: '무슨 일이었나', sel: '.case-brief', do: '사건 요지를 함께 읽습니다. 「마리아」가 본래 이름이 아니었다는 점을 짚습니다.', ask: '왜 그는 자기 이름으로 불리지 못했을까요?' },
        { min: 10, part: '전개 1', name: '원문 지면 읽기', sel: '.report-history', do: '여섯 번 실린 지면을 넘기며 읽고, 2026년 기사와 비교합니다.', ask: '첫 보도에서 신문이 가장 먼저 적은 것은 무엇이었나요?' },
        { min: 12, part: '전개 2', name: '투서와 소문', sel: '.letters', do: '이름 없는 투서 두 통을 보고, 이어서 잡지가 적은 세 가지 짐작을 펼칩니다.', ask: '어느 것도 증명되지 않았는데, 왜 소문이 남았을까요?' },
        { min: 8, part: '전개 3', name: '교과서로 읽기', sel: '.yke', do: '1931년 신문을 펴고 만주사변과 이 사건을 나란히 봅니다.', ask: '일본인 관사의 조선인 하녀 — 식민지 도시의 위와 아래는 어디였나요?' },
        { min: 10, part: '정리', name: '독자 투고', sel: '.yg-post', do: '물음 하나를 골라 투고하고 발표합니다.', ask: '오늘의 피해자 보도는 무엇을 지켜야 할까요?' }
      ]
    },
    bb: {
      title: '백백교 사건', year: 1937, dir: 'case-baekbaekgyo', words: ['press', 'war'],
      goal: '보도 금지와 정간이 한 사건의 기록에 어떤 빈칸을 남겼는지 찾고, 알 권리의 뜻을 생각한다.',
      steps: [
        { min: 5, part: '도입', name: '무슨 일이었나', sel: '.case-brief', do: '이 지면이 쫓는 물음 세 가지를 함께 읽습니다.', ask: '「흰 것으로 천하를 희게」라는 말 아래 무엇이 숨어 있었을까요?' },
        { min: 10, part: '전개 1', name: '장부와 한 집', sel: '#ledger', do: '헌납 장부를 직접 골라 보고, 식구를 흩어 놓은 구조를 봅니다.', ask: '사람들은 왜 재산과 식구를 내놓았을까요?' },
        { min: 12, part: '전개 2', name: '53일의 침묵과 보도', sel: '#mute', do: '보도 금지 53일을 보고, 이어서 반년 동안의 지면(조선일보 호외 · 동아일보 속간)을 넘깁니다.', ask: '보도가 막혀 있던 동안 무슨 일이 있었나요?' },
        { min: 8, part: '전개 3', name: '교과서로 읽기', sel: '.yke', do: '1937년 신문을 펴고 중일전쟁과 이 사건을 나란히 봅니다.', ask: '정간과 전쟁은 이 사건의 보도에 어떤 영향을 주었나요?' },
        { min: 10, part: '정리', name: '독자 투고', sel: '.yg-post', do: '물음 하나를 골라 투고하고 발표합니다.', ask: '알 권리와 수사 — 오늘은 어떻게 균형을 잡을까요?' }
      ]
    }
  };

  var BASE = (function () { try { var c = D.currentScript && D.currentScript.src; return c ? c.replace(/yk-class\.js.*$/, '') : ''; } catch (e) { return ''; } })();
  var CASE = (D.currentScript && D.currentScript.getAttribute('data-case')) || '';
  function get() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function set(v) { try { if (v) localStorage.setItem(KEY, '1'); else localStorage.removeItem(KEY); } catch (e) {} }
  (function fromUrl() {
    var m = /[?&]class=([01])/.exec(location.search); if (!m) return;
    set(m[1] === '1');
  })();
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function css() {
    if (D.getElementById('ykc-css')) return;
    var s = D.createElement('style'); s.id = 'ykc-css';
    s.textContent = [
      '.ykc-tab{all:unset;position:fixed;right:0;top:50%;transform:translateY(-50%);z-index:9000;writing-mode:vertical-rl;padding:14px 8px;background:#efe7d6;color:#1d1813;border:1px solid #1d1813;border-right:0;cursor:pointer;font:800 13px/1 "Nanum Myeongjo","Noto Serif KR",serif;letter-spacing:.3em;box-shadow:-4px 6px 18px rgba(0,0,0,.35)}',
      '.ykc-tab b{display:block;margin-bottom:8px;padding:5px 3px;background:#8a2a21;color:#efe7d6;letter-spacing:.2em}',
      '.ykc-tab:hover,.ykc-tab:focus-visible{background:#e3d8c2}',
      '.ykc{position:fixed;right:0;top:0;bottom:0;z-index:9001;width:min(330px,92vw);background:#efe7d6;color:#1d1813;box-shadow:-20px 0 50px rgba(0,0,0,.45);transform:translateX(102%);transition:transform .35s cubic-bezier(.2,.7,.2,1);display:flex;flex-direction:column;font-family:"Noto Sans KR","Apple SD Gothic Neo",sans-serif}',
      '.ykc.on{transform:none}',
      '.ykc-h{padding:18px 18px 12px;border-bottom:3px double #3a3128}',
      '.ykc-h p.k{font:500 10.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.35em;color:#8a2a21}',
      '.ykc-h h3{margin:8px 0 6px;font:800 17px/1.4 "Nanum Myeongjo","Noto Serif KR",serif}',
      '.ykc-h .g{font-size:12px;line-height:1.65;color:#4a4036;word-break:keep-all}',
      '.ykc-x{all:unset;position:absolute;right:12px;top:10px;font-size:22px;color:#6b6257;cursor:pointer;padding:2px 6px}',
      '.ykc-list ol{list-style:none;margin:0;padding:6px 0;overflow:auto;flex:1}',
      '.ykc-list li{border-bottom:1px solid rgba(58,49,40,.18)}',
      '.ykc-list li button{all:unset;box-sizing:border-box;display:grid;grid-template-columns:44px 1fr;gap:10px;width:100%;padding:12px 18px;cursor:pointer}',
      '.ykc-list li button:hover,.ykc-list li button:focus-visible{background:#e6dcc7}',
      '.ykc-list li.now button{background:#1d1813;color:#efe7d6}',
      '.ykc-list li .m{font:800 15px/1 "Nanum Myeongjo",serif;text-align:center;padding-top:2px}',
      '.ykc-list li .m small{display:block;margin-top:4px;font:500 10px/1 "Noto Sans KR",sans-serif;letter-spacing:.1em;opacity:.7}',
      '.ykc-list li .n{font:700 13.5px/1.4 "Noto Sans KR",sans-serif}',
      '.ykc-list li .d{margin-top:3px;font-size:12px;line-height:1.6;opacity:.85;word-break:keep-all}',
      '.ykc-list li .q{margin-top:6px;padding-left:8px;border-left:2px solid #8a2a21;font-size:12px;line-height:1.6;word-break:keep-all}',
      '.ykc-list li.now .q{border-left-color:#e0a49a}',
      '.ykc-f{display:flex;gap:8px;padding:12px 18px;border-top:1px solid rgba(58,49,40,.3);font-size:12px}',
      '.ykc-f a,.ykc-f button{all:unset;cursor:pointer;padding:7px 10px;border:1px solid #1d1813;text-align:center;flex:1}',
      '.ykc-f a:hover,.ykc-f button:hover{background:#e3d8c2}',
      '.ykc-bar{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:9000;width:min(560px,calc(100vw - 32px));font-family:"Noto Sans KR","Apple SD Gothic Neo",sans-serif;color:#efe6d2}',
      '.ykc-row{display:flex;align-items:stretch;background:#1d1813;border:1px solid rgba(239,230,210,.25);box-shadow:0 10px 26px rgba(0,0,0,.45)}',
      '.ykc-k{display:grid;place-items:center;padding:0 10px;background:#8a2a21;font:800 12px/1 "Nanum Myeongjo",serif;letter-spacing:.2em;writing-mode:vertical-rl}',
      '.ykc-cur{all:unset;flex:1;min-width:0;cursor:pointer;padding:8px 12px;display:grid;grid-template-columns:auto 1fr;column-gap:10px;align-items:baseline}',
      '.ykc-cur:hover,.ykc-cur:focus-visible{background:rgba(239,230,210,.07)}',
      '.ykc-cur .p{font:500 10.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.08em;color:#e0a49a;white-space:nowrap}',
      '.ykc-cur .n{font:800 14px/1.3 "Nanum Myeongjo",serif;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.ykc-cur .q{grid-column:1/3;margin-top:3px;font:400 12px/1.4 "Noto Sans KR",sans-serif;color:rgba(239,230,210,.7);white-space:nowrap;overflow:hidden;text-overflow:ellipsis}',
      '.ykc-cur .q:before{content:"발문 · ";color:#e0a49a}',
      '.ykc-nv{all:unset;cursor:pointer;width:40px;display:grid;place-items:center;font-size:22px;border-left:1px solid rgba(239,230,210,.18)}',
      '.ykc-nv:hover,.ykc-nv:focus-visible{background:rgba(239,230,210,.1)}',
      '.ykc-mini{all:unset;display:none;cursor:pointer;margin:0 auto;padding:7px 12px 7px 8px;background:rgba(29,24,19,.86);color:#efe6d2;border:1px solid rgba(239,230,210,.3);font:500 12px/1 "Noto Sans KR",sans-serif;letter-spacing:.06em;box-shadow:0 6px 16px rgba(0,0,0,.35)}',
      '.ykc-mini b{margin-right:8px;padding:3px 5px;background:#8a2a21;font:800 11px/1 "Nanum Myeongjo",serif;letter-spacing:.12em}',
      '.ykc-mini:hover,.ykc-mini:focus-visible{background:#1d1813}',
      '.ykc-bar.mini{width:auto;display:flex;justify-content:center}.ykc-bar.mini .ykc-row,.ykc-bar.mini .ykc-list{display:none}.ykc-bar.mini .ykc-mini{display:inline-block}',
      '.ykc-fold{width:34px;font-size:18px}',
      '.ykc-list{margin-bottom:8px;max-height:min(62vh,560px);display:flex;flex-direction:column;background:#efe7d6;color:#1d1813;box-shadow:0 18px 40px rgba(0,0,0,.45)}',
      '.ykc-list[hidden]{display:none}',
      '.ykc-lh{padding:14px 16px 10px;border-bottom:3px double #3a3128}.ykc-lh b{font:800 12px/1 "Nanum Myeongjo",serif;letter-spacing:.3em;color:#8a2a21}.ykc-lh span{margin-left:10px;font:800 14px "Nanum Myeongjo",serif}.ykc-lh p{margin-top:6px;font-size:12px;line-height:1.6;color:#4a4036;word-break:keep-all}',
      '.ykc-list .d,.ykc-list .q,.ykc-list .n{display:block}',
      '.ykc-hi{outline:2px dashed #8a2a21!important;outline-offset:-6px!important}',
      '.ykc-pill{position:fixed;left:50%;bottom:14px;transform:translateX(-50%);z-index:9000;display:flex;align-items:center;gap:10px;padding:7px 8px 7px 14px;background:#efe7d6;color:#1d1813;border:1px solid #1d1813;font:500 12px/1 "Noto Sans KR",sans-serif;box-shadow:0 8px 20px rgba(0,0,0,.3)}',
      '.ykc-pill b{color:#8a2a21;letter-spacing:.15em}',
      '.ykc-pill a,.ykc-pill button{all:unset;cursor:pointer;padding:5px 8px;border:1px solid #1d1813}',
      '@media print{.ykc,.ykc-tab,.ykc-pill{display:none!important}}'
    ].join('\n');
    D.head.appendChild(s);
  }
  function off() { set(false); var u = location.href.replace(/([?&])class=1&?/, '$1').replace(/[?&]$/, ''); location.href = u; }
  /* 1014 · 오른편 서랍 → 아래 얇은 「편집국장 수첩」 줄 (화면을 가리지 않게) */
  function panel(c) {
    var data = W.YK_CLASS[c]; if (!data) return;
    css();
    var total = data.steps.reduce(function (a, s) { return a + s.min; }, 0), cur = 0;
    var bar = D.createElement('div'); bar.className = 'ykc-bar'; bar.setAttribute('role', 'region'); bar.setAttribute('aria-label', '수업 진행 — 편집국장 수첩');
    bar.innerHTML = '<div class="ykc-list" hidden><div class="ykc-lh"><b>編輯局長 手帖</b><span>' + esc(data.title) + ' · ' + total + '분</span><p>' + esc(data.goal) + '</p></div><ol>' + data.steps.map(function (s, i) {
        return '<li data-i="' + i + '"><button type="button"><span class="m">' + s.min + '분<small>' + esc(s.part) + '</small></span><span><span class="n">' + esc(s.name) + '</span><span class="d">' + esc(s.do) + '</span><span class="q">발문 · ' + esc(s.ask) + '</span></span></button></li>';
      }).join('') + '</ol><div class="ykc-f"><a href="' + BASE + 'class.html#' + c + '">수업 안내</a><button type="button" class="ykc-end">수업 끝내기</button></div></div>' +
      '<div class="ykc-row"><b class="ykc-k">授業</b><button type="button" class="ykc-cur" aria-label="수업 단계 목록 펼치기"><span class="p"></span><span class="n"></span><span class="q"></span></button>' +
      '<button type="button" class="ykc-nv" data-d="-1" aria-label="앞 단계">‹</button><button type="button" class="ykc-nv" data-d="1" aria-label="다음 단계">›</button><button type="button" class="ykc-nv ykc-fold" aria-label="수업 줄 접기">–</button></div>' +
      '<button type="button" class="ykc-mini" aria-label="수업 줄 펴기"><b>授業</b>수업 줄</button>';
    bar.classList.add('mini');   /* 처음엔 접어 둠 — 이야기를 가리지 않게 */
    D.body.appendChild(bar);
    bar.querySelector('.ykc-mini').onclick = function () { bar.classList.remove('mini'); };
    bar.querySelector('.ykc-fold').onclick = function () { toggle(false); bar.classList.add('mini'); };
    var list = bar.querySelector('.ykc-list'), lis = bar.querySelectorAll('li');
    function mark(i) {
      cur = i; var s = data.steps[i];
      [].forEach.call(lis, function (l, j) { l.classList.toggle('now', j === i); });
      bar.querySelector('.ykc-cur .p').textContent = (i + 1) + '/' + data.steps.length + ' · ' + s.part + ' ' + s.min + '분';
      bar.querySelector('.ykc-cur .n').textContent = s.name;
      bar.querySelector('.ykc-cur .q').textContent = s.ask;
    }
    function go(i) {
      i = Math.max(0, Math.min(data.steps.length - 1, i)); mark(i);
      var el = D.querySelector(data.steps[i].sel);
      if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); el.classList.add('ykc-hi'); setTimeout(function () { el.classList.remove('ykc-hi'); }, 2200); }
    }
    function toggle(v) { list.hidden = v == null ? !list.hidden : !v; bar.classList.toggle('open', !list.hidden); }
    bar.querySelector('.ykc-cur').onclick = function () { toggle(); };
    [].forEach.call(bar.querySelectorAll('.ykc-nv'), function (b) { b.onclick = function () { go(cur + (+b.dataset.d)); }; });
    bar.querySelector('ol').addEventListener('click', function (e) { var li = e.target.closest('li'); if (li) { go(+li.dataset.i); toggle(false); } });
    bar.querySelector('.ykc-end').onclick = off;
    D.addEventListener('keydown', function (e) { if (e.key === 'Escape') toggle(false); });
    D.addEventListener('click', function (e) { if (!list.hidden && !e.target.closest('.ykc-bar')) toggle(false); });
    mark(0);
    if ('IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (en) { if (en.isIntersecting) { var i = +en.target.getAttribute('data-ykc'); if (!isNaN(i)) mark(i); } });
      }, { rootMargin: '-45% 0px -45% 0px' });
      var watch = function () { data.steps.forEach(function (s, i) { var el = D.querySelector(s.sel); if (el && !el.hasAttribute('data-ykc')) { el.setAttribute('data-ykc', i); io.observe(el); } }); };
      watch(); setTimeout(watch, 1500); setTimeout(watch, 4000);
    }
  }
  function pill() {
    css();
    var b = D.createElement('div'); b.className = 'ykc-pill';
    b.innerHTML = '<b>敎室版</b><span>교실판으로 읽는 중 — 유료 기록이 모두 열려 있어요</span><a href="' + BASE + 'class.html">수업 안내</a><button type="button">끄기</button>';
    D.body.appendChild(b); b.querySelector('button').onclick = off;
  }
  W.ykClass = { on: get, set: set, off: off };
  function go() {
    if (!get()) return;
    if (CASE && W.YK_CLASS[CASE]) panel(CASE);
    else if (!/class\.html/.test(location.pathname)) pill();
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', go); else go();
})(window, document);
