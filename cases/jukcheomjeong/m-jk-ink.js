/* 경성야록 · 죽첨정 폰판 — 《긔록의 이면》 장치 (1018)
   · 차례에 다섯 막 표시
   · 제1막 — 첫 번째 문장: 밑줄 친 말을 누르면 그때의 말 · 지면이 쓴 법 · 빠진 것
   · 제2막 — 맛지 안는 시간: 긔록 두 장을 겹쳐 봄(이중 노출 — 꾹 누르면 뒤의 긔록이 비침) · 엇갈린 자리에서 멈춤 표시
   글은 모다 이 지면에 이미 잇는 말(동아일보 1933.5.17 ~ 6.8 · 전봉관 연재)에서 가져옴 · 경성야록의 읽기는 「읽기」라 표시 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var tone = function (k) { if (W.mb && W.mb.tone) W.mb.tone(k); };
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };

  /* ── 차례 — 막 이름 (차례는 열 때마다 엔진이 새로 그리므로 그린 뒤에 끼우고, 바뀌면 다시) ── */
  var ACT = { ch1: ['서막', '하나의 사건, 여러 개의 긔록'], ch2: ['제1막', '첫 번째 문장'], time: ['제2막', '맛지 안는 시간'], ch3: ['제3막', '의심을 만드는 사람들'], ch7: ['종막', '지면 밧긔 사람들'], next: ['그 뒤', '부록 · 사료'] };
  var painting = false;
  function tocActs() {
    var toc = $('#mbToc .mb-toc'); if (!toc || toc.querySelector('.toc-act')) return;
    painting = true;
    $$('a[data-goto]', toc).forEach(function (a) {
      var act = ACT[a.getAttribute('data-goto')]; if (!act) return;
      var h = D.createElement('div'); h.className = 'toc-act'; h.setAttribute('data-noko', ''); h.innerHTML = '<small>' + act[0] + '</small><b>' + act[1] + '</b>'; toc.insertBefore(h, a);
    });
    painting = false;
  }
  function watch() {
    var toc = $('#mbToc .mb-toc'); if (!toc) return; tocActs();
    if ('MutationObserver' in W) new MutationObserver(function () { if (!painting) tocActs(); }).observe(toc, { childList: true });
  }
  W.addEventListener('mb:open', function (e) { if (e.detail === 'mbToc') setTimeout(tocActs, 0); });

  /* ── 제1막 — 첫 번째 문장의 말들 ── */
  var NOTE = {
    supo: { w: '「수포」', say: '물거품. 첫날 제목부터 「수포」엿소 — 형사 십여 명이 팔방으로 나섯으나 아모것도 잡지 못햇다는 말.', how: '사건보다 경찰의 헛걸음이 먼저 제목에 올랏소.', gap: '아해가 누구인지 — 「피해자 신원도 불판명」.', src: '동아일보 1933.5.17 · 2면 제목', read: 1 },
    dandu: { w: '「단두」', say: '머리를 베엇다는 말. 지면은 이 일에 「유아 단두 사건」이라는 일홈을 붙엿소.', how: '일홈이 곳 판단이엇소 — 누군가 베엇다, 그러니 죽인 이가 잇다.', gap: '유월 팔일에 드러난 것은 — 병으로 죽은 아해의 무덤을 판 일이엇소. 「단두」는 맛앗고, 「살인」은 틀렷소.', src: '동아일보 1933.5.17 · 6.8 호외' },
    boy: { w: '「사내아이 같다」', say: '「같다」 — 짐작이엇소. 머리를 깎은 것으로 미루엇고, 경성제대 감정도 가튼 판단이엇소.', how: '짐작은 곳 「사내아해」가 되어 이십삼 일 동안 지면을 돌앗소.', gap: '한 살 난 계집아해엿소.', src: '동아일보 1933.5.17 · 6.8 호외' },
    lep: { w: '「문둥병 환자의 짓」', say: '그때 지면은 한센병을 「문둥병」이라 불럿소 — 병을 앓는 사람을 낮추어 부르는 말이오.', how: '누가 그러케 짐작햇는지도 업시, 「~이 아닌가」 한 줄로 실렷소.', gap: '근거. 그리고 그 뒤 — 걸인과 한센병 환자 백여 명이 「혐의」로 붓들렷다 풀려낫소. 첫날의 짐작이 그물이 되엇소.', src: '동아일보 1933.5.17 · 6.3' },
    crime: { w: '「범행은 금일 새벽」', say: '「범행」 — 죄를 저질럿다는 말. 서장의 입에서 나온 이 한 마듸가, 그 뒤 이십삼 일의 물음을 정햇소: 누가 죽엿나.', how: '「죽엇나」는 묻지 아넛소. 수사가 그 물음을 바꾼 것은 유월 삼일이엇소.', gap: '새벽에 벌어진 것은 살인이 아니라 — 무덤을 판 일이엇소 (오월 십오일 밤).', src: '동아일보 1933.5.17 · 6.8 호외 · 전봉관 연재', read: 1 },
    wonhan: { w: '「원한이나 치정」', say: '서장의 짐작이오.', how: '누구를 조사햇는지는 지면에 업소 — 장부의 「미상」 칸이오.', gap: '원한도, 치정도 업섯소.', src: '동아일보 1933.5.17 · 6.8 호외' }
  };
  function firstSentence() {
    var fs = $('#fs'); if (!fs) return;
    var note = $('#fsNote'), ws = $$('.fs-w', fs), seen = {}, cur = null, bar = $('#fsBar');
    function open(w) {
      var k = w.dataset.k, n = NOTE[k]; if (!n) return;
      if (cur === w) { w.classList.remove('on'); note.hidden = true; cur = null; return; }
      ws.forEach(function (x) { x.classList.toggle('on', x === w); }); cur = w; w.classList.add('seen'); seen[k] = 1;
      note.innerHTML = '<small>그때의 말</small><b>' + n.w + '</b><p>' + n.say + '</p><p><em>지면이 쓴 법</em>' + n.how + '</p><p><em>빠진 것</em>' + n.gap + '</p><span class="fs-src">근거 · ' + n.src + (n.read ? '<i>· 「쓴 법」은 경성야록의 읽기</i>' : '') + '</span>';
      note.hidden = false; var par = w.parentNode; par.parentNode.insertBefore(note, par.nextSibling);
      var n0 = Object.keys(seen).length; if (bar) { bar.style.width = (n0 / ws.length * 100) + '%'; var t = $('#fsN'); if (t) t.textContent = n0; }
      tone('type'); buzz(6);
    }
    ws.forEach(function (w) { w.addEventListener('click', function () { open(w); }); });
  }

  /* ── 제2막 — 두 긔록을 겹침 ── */
  var CARDS = [
    { k: '아해', tag: '엇갈림',
      a: [['감정 5.16', '한 살 안팎의 <span class="pf-s">사내아해</span>'], ['지면 5.17', '「머리를 깎은 것을 보아 <span class="pf-s">사내아이 같다</span>」']],
      b: [['호외 6.8', '한 살 난 계집아해']],
      br: '「같다」가 「이다」가 되어 이십삼 일을 돌앗소.' },
    { k: '때', tag: '반은 맛고, 반은 틀림',
      a: [['감정 5.16', '일은 발견 <span class="pf-c">열 시간 안</span>에 벌어졋다'], ['서장 5.17', '「<span class="pf-s">범행</span>은 금일 새벽」']],
      b: [['호외 6.8', '발견 닷새 전, 병으로 숨짐'], ['호외 6.8', '무덤을 판 것은 — 오월 십오일 밤']],
      br: '시간은 맛앗소 — 십오일 밤은 열 시간 안이오. 틀린 것은 말이엇소. 그 밤에 벌어진 일은 죽음이 아니라, 무덤을 판 일이엇소. <i>(경성야록의 읽기)</i>' },
    { k: '일', tag: '엇갈림',
      a: [['지면 5.17', '「<span class="pf-s">유아 단두 사건</span>」'], ['경성 · 지면', '<span class="pf-s">살인</span>']],
      b: [['호외 6.8', '분묘 발굴 · 사체 훼손'], ['판결', '징역 사 년 · 삼 년']],
      br: '죽인 이는 업섯소. 판 이와 부탁한 이가 잇섯소.' },
    { k: '사람', tag: '엇갈림',
      a: [['지면 6.2', '「<span class="pf-s">유력한 혐의자</span>」 — 죽첨정의 한 집 다섯'], ['6.2 · 연재', '그 집 가장은 오월 십삼일, 병원에서 이미 숨진 이']],
      b: [['호외 6.8', '무덤을 판 이 — 그 아해네와 한 집에 살든 석탄 가게 일꾼'], ['호외 6.8', '부탁한 이 — 그의 친구 엿장수']],
      br: '가족은 열흘 만에 풀려낫소. 지면은 「유력한」이라 썻고, 수사 단계의 사람이엇소.' },
    { k: '자리', tag: '덧붙음', add: 1,
      a: [['지면 5.17', '죽첨정 삼정목 · 식산은행 쓰레기 매립지']],
      b: [['호외 6.8', '염리 공동묘지 — 아해가 누어 잇든 자리']],
      br: '발견된 자리와, 누어 잇든 자리. 지면이 이십삼 일 동안 뒤진 것은 앞의 자리뿐이엇소.' }
  ];
  function time() {
    var root = $('#tm'); if (!root) return;
    root.innerHTML = CARDS.map(function (c, i) {
      return '<div class="tm-card' + (c.add ? ' add' : ' mis') + '" data-i="' + i + '">' +
        '<div class="tm-k"><b>' + c.k + '</b><span class="tm-tag' + (c.add ? ' add' : '') + '">' + c.tag + '</span></div>' +
        '<div class="tm-ly"><div class="tm-a">' + c.a.map(function (r) { return '<p><small>' + r[0] + '</small>' + r[1] + '</p>'; }).join('') + '</div>' +
        '<div class="tm-b" aria-hidden="true">' + c.b.map(function (r) { return '<p><small>' + r[0] + '</small>' + r[1] + '</p>'; }).join('') + '</div></div>' +
        '<div class="tm-br"><b>겹쳐 보니</b>' + c.br + '</div>' +
        '<p class="tm-hint" data-noko>꾹 누르고 잇으면 — 유월 팔일의 긔록이 비치오</p></div>';
    }).join('');
    var A = function () { return W.mb && W.mb.audio; };
    $$('.tm-card', root).forEach(function (card) {
      var t = 0, held = false;
      function expose(on) { card.classList.toggle('ex', on); var h = $('.tm-hint', card); if (h) h.textContent = on ? '겹쳐 본 긔록 — 톡 치면 다시 가리오' : '꾹 누르고 잇으면 — 유월 팔일의 긔록이 비치오'; }
      card.addEventListener('pointerdown', function (e) {
        if (e.button) return; held = false; clearTimeout(t);
        t = setTimeout(function () { held = true; card.classList.add('hold'); tone('type'); buzz(8); if (A()) { A().noiseOn(); A().noiseLevel(.05); } }, 160);
      });
      function up(e) {
        clearTimeout(t); if (A()) A().noiseLevel(0);
        if (held) { card.classList.remove('hold'); expose(true); }
        else if (e && e.type === 'pointerup') expose(!card.classList.contains('ex'));
        held = false;
      }
      card.addEventListener('pointerup', up); card.addEventListener('pointercancel', function () { clearTimeout(t); card.classList.remove('hold'); held = false; if (A()) A().noiseLevel(0); });
      card.addEventListener('pointerleave', function () { if (held) up(); else clearTimeout(t); });
      card.addEventListener('contextmenu', function (e) { e.preventDefault(); });
    });
    /* 엇갈린 자리 — 가운대에 오면 멈춤 표시 (한 번만 소리) */
    if ('IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { var c = e.target, on = e.isIntersecting && e.intersectionRatio >= .6; c.classList.toggle('lock', on); if (on && !c.classList.contains('seen')) { c.classList.add('seen'); if (c.classList.contains('mis')) { tone('stamp'); buzz(14); } } }); }, { threshold: [.6], rootMargin: '-18% 0px -18% 0px' });
      $$('.tm-card', root).forEach(function (c) { io.observe(c); });
    }
  }

  function init() { setTimeout(watch, 80); firstSentence(); time(); }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init();
})(window, document);
