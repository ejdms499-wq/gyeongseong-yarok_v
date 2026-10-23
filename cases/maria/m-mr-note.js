/* 경성야록 · 마리아 폰판 — 《관사 15호, 그날의 긔록》 (1018)
   · 차례에 다섯 막 표시
   · 긔자수첩 — 독자가 들춘 것(방 · 시각 · 진술 · 편지 · 사람 · 짐작 · 공판 · 판결)이 아래 「기자수첩」에 차곡차곡 쌓임 (localStorage)
   · 제2막 — 시계 겻헤 작은 평면도: 그 시각, 그 자리
   · 종막 — 긔자의 마지막 원고: 모은 긔록이 확인된 것 · 엇갈리는 것 · 확인되지 안은 것으로 짜임 (빈 칸은 빈 채로)
   글은 모다 이 지면에 이미 잇는 말에서 가져옴 · 새로 지은 사실 업음 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var tone = function (k) { if (W.mb && W.mb.tone) W.mb.tone(k); };
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var txt = function (el) { return el ? el.textContent.replace(/\s+/g, ' ').trim() : ''; };

  /* ── 차례 — 막 이름 ── */
  var ACT = { c1: ['서막', '편집국에 도착한 전보'], c2: ['제1막', '관사 15호'], c3: ['제2막', '그날의 열두 시간'], c4: ['제3막', '엇갈리는 진술'], draft: ['종막', '긔자의 마지막 원고'], next: ['그 뒤', '부록 · 사료'] };
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
  function watchToc() {
    var toc = $('#mbToc .mb-toc'); if (!toc) return; tocActs();
    if ('MutationObserver' in W) new MutationObserver(function () { if (!painting) tocActs(); }).observe(toc, { childList: true });
  }
  W.addEventListener('mb:open', function (e) { if (e.detail === 'mbToc') setTimeout(tocActs, 0); });

  /* ── 긔자수첩 — 항목 ──
     g: 현장 · 시간 · 긔록   c: fact 확인된 것 · clash 엇갈리는 것 · open 확인되지 안은 것 */
  var N = {};
  function def(id, g, c, k, t, src) { N[id] = { id: id, g: g, c: c, k: k, t: t, src: src }; }
  /* 현장 — 관사의 방 (2화) */
  def('r_study', '현장', 'fact', '응접실', '남편이 떠난 뒤, 아씨는 줄곧 여긔서 잣소.', 'c2');
  def('r_wife', '현장', 'fact', '안방', '밤 아홉 시, 마리아는 이 방 이부자리를 펴고 인사하엿소.', 'c2');
  def('r_hall', '현장', 'fact', '복도', '경찰이 다엇슬 때 아씨는 화장을 하고 외출복 차림으로 복도를 쓸고 잇섯소.', 'c2');
  def('r_door', '현장', 'open', '현관', '밧게서 드나든 사내들 — 로이드 안경의 사내는 과연 누구엿나.', 'c2');
  def('r_found', '현장', 'fact', '하녀 방', '아츰 열 시에야 문이 열렷소. 유일한 물증은 전구의 지문 — 「희미해 감식이 어렵다」.', 'c2');
  def('r_maid', '현장', 'clash', '엽방', '그 밤만 아씨가 잔 방. 벽 한 겹 너머의 비명을 — 듯지 못하엿다 하오.', 'c2');
  def('r_kitchen', '현장', 'open', '부엌', '검사는 범인이 이 부엌문으로 드나들엇다 하엿소 — 증명되지 아넛소.', 'c2');
  def('r_window', '현장', 'open', '유리문 밧', '편지의 사내는 유리문 안을 드려다보앗다 하엿소 — 일홈 업는 이의 말이오.', 'c2');
  def('r_park', '현장', 'fact', '철도병원 압 공원', '편지가 말한 곳에 — 수건과 창살이 정말 잇섯소.', 'c2');
  /* 시간 — 열두 시간 (3화) · 글은 그 줄에서 그대로 가져옴 */
  var TCAT = ['fact', 'open', 'fact', 'open', 'open', 'fact', 'fact', 'open', 'open', 'clash', 'clash', 'open', 'open'];
  def('t_three', '시간', 'clash', '그 밤의 시각은 셋', '열한 시~열두 시(이웃의 귀 · 부검) · 새벽 한 시 반(이노우에의 첫 자백) · 새벽 세 시(일홈 업는 편지). 셋 가운데 둘은 거짓이오.', 'c3');
  /* 긔록 — 사람 · 진술 · 편지 · 짐작 · 정황 · 공판 · 판결 */
  def('paper1', '긔록', 'fact', '첫 보도 · 8.4', '팔월 일일 아츰의 일은 사흘 뒤 활자가 되엇소. 그날부터 삼 년, 동아일보는 눈을 떼지 아넛소.', 'c1');
  def('paper6', '긔록', 'fact', '여섯 날의 지면', '첫 보도부터 투서 공개까지 — 륙 주일 동안 여섯 번 실렷소.', 'c4');
  var PQ = { 0: ['마리아', '그 아이의 비명을 — 벽 한 겹 너머는 어찌 듯지 못하엿는가.'], 1: ['히사코', '벽 한 겹 너머의 비명을, 참으로 듯지 못하엿는가.'], 2: ['마사키', '어찌하야 하필 그 주에 집을 비웠는가.'], 3: ['야마구치', '열흘 만에 목격자가 범인이 되는 편지 — 그 붓은 누구의 손에 잇섯는가.'], 4: ['이노우에', '안경 쓴 그 사내는, 과연 그엿는가.'], 5: ['길의 사내', '야마구치인가, 이노우에인가 — 아니면 셋재 사내인가.'], 6: ['범인', '이 장은 비워 둔다. 채울 이가 나타나거든 — 그때 쓴다.'] };
  Object.keys(PQ).forEach(function (i) { def('p' + i, '긔록', 'open', '인물 · ' + PQ[i][0], PQ[i][1], 'c5'); });
  def('l_hand', '긔록', 'fact', '필적', '두 편지는 가튼 손 — 꺾임 · 삐침 · 먹, 버릇 셋이 가탓소.', 'c6');
  var LC = [['fact', '편지 대 사실 · 一致', '「철도병원 앞 공원 풀밭에 묻었다」 — 수건과 창살이 실제로 나왓소.'], ['fact', '편지 대 사실 · 一致', '신문에 나기도 전인데, 부검에서만 보이던 흔적과 맛앗소.'], ['clash', '편지 대 사실 · 不一致', '「새벽 3시쯤 비명」 — 부검이 본 사망 시각은 밤 11시 ~ 새벽 1시.'], ['clash', '편지 대 사실 · 矛盾', '첫째는 「집안의 서른 살쯤 된 여자」, 둘째는 「내가 했다」 — 한 사람의 두 편지가 다른 범인을 말하오.'], ['open', '편지 대 사실 · 未詳', '「신문에 난 것은 전부 거짓말」 — 무엇이 거짓인지 편지는 말하지 아넛소.']];
  LC.forEach(function (x, i) { def('l_c' + i, '긔록', x[0], x[1], x[2], 'c6'); });
  var AL = ['「삼십일일, 마리아가 빨래를 하엿소.」 — 그날은 비. 법뎡에선 「검사가 오기 전에 걷어치웠소」.', '「두 차례 목욕을 하엿소.」 — 팔월 일일 목욕통에는 물이 한 방울도 업섯소.', '「쓰레기 인부 소리에 잠이 깻소.」 — 그날 초량에는 청소 인부가 나가지 아넛소.', '「마리아 고향 갈 옷을 지으려 양복상을 불럿소.」 — 치수를 잰 것은 아씨 제 옷.', '「그 밤, 아모 소리도 듯지 못하엿소.」 — 한 시와 세 시, 두 번 변소에. 비명은 이웃집까지.'];
  AL.forEach(function (x, i) { def('a' + i, '긔록', 'clash', '아씨의 진술 · ' + (i + 1), x, 'c7'); });
  var SL = ['거절당한 사내', '질투', '감추려 한 비밀'];
  SL.forEach(function (x, i) { def('s' + i, '긔록', 'open', '짐작 · ' + x, '『별건곤』 소화 팔 년 오월호의 짐작 — 동긔로 확뎡되지 아넛소.', 'c8'); });
  var SIX = ['저녁 여덟 시경 관사 압을 서성인 로이드 안경의 사내', '사건 뒤 머리를 류달리 짧게 깍음', '천리교에서 불교로 고처 미듬', '일홈을 슈이치로에서 류우로 — 「사람을 죽일 불길한 일홈」', '드나들든 그 집에 사건 뒤로는 가지 안음', '동경 · 대판 감뎡인의 필적 — 「투서와 일치」'];
  SIX.forEach(function (x, i) { def('x' + i, '긔록', 'open', '정황 · ' + ['一', '二', '三', '四', '五', '六'][i], x + ' — 정황이오, 증거는 아니오.', 'c9'); });
  def('cf0', '긔록', 'clash', '첫 자백 · 제륙회', '「혼자 하엿소.」 새벽 한 시 반, 부엌문으로 — 그러나 그 시각 그는 극장에 잇섯다 하엿고, 비명은 열한 시에 들렷소.', 'c9');
  def('cf1', '긔록', 'clash', '둘재 자백 · 제십일회', '「아씨와 함께 하엿소.」 — 검사국과 예심에서 그는 둘 다 부인하엿소.', 'c9');
  def('court', '긔록', 'fact', '공판 · 문답 일곱', '지문도, 우산도, 편지도 — 피고는 모다 부인하엿소. 증인석의 아씨는 「깁히 잠들엇나 봅니다」.', 'c10');
  def('v0', '긔록', 'open', '수수께끼 一 · 未濟', '그 밤 그 방에서 무슨 일이 잇섯는지, 두 재판 모두 답하지 못하엿소.', 'c11');
  def('v1', '긔록', 'open', '수수께끼 二 · 未詳', '편지의 주인 — 야마구치는 풀려낫고, 목격자라던 이는 열흘 뒤 범인이라 하엿소.', 'c11');
  def('v2', '긔록', 'fact', '수수께끼 三 · 無', '벌 바든 이 — 업소. 주범으로, 종범으로 지목된 두 사람 모두 무죄.', 'c11');

  /* ── 저장 ── */
  var KEY = 'yk-mr-notes', got = {};
  try { got = JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) {}
  function save() { try { localStorage.setItem(KEY, JSON.stringify(got)); } catch (e) {} }
  function count() { return Object.keys(got).filter(function (k) { return N[k]; }).length; }
  var toastT = 0;
  function toast(n) {
    var el = $('#ntToast'); if (!el) { el = D.createElement('div'); el.id = 'ntToast'; el.className = 'nt-toast'; el.setAttribute('data-noko', ''); D.body.appendChild(el); }
    el.innerHTML = '<small>수첩에 적엇소 · ' + n.g + ' · ' + count() + '줄째</small><b>' + n.k + '</b>';
    el.classList.remove('on'); void el.offsetWidth; el.classList.add('on'); clearTimeout(toastT); toastT = setTimeout(function () { el.classList.remove('on'); }, 2000);
    var nb = $('#mceNb'); if (nb) { nb.classList.remove('pop'); void nb.offsetWidth; nb.classList.add('pop'); }
    if (W.__mceDock) W.__mceDock(true, 2200);
  }
  function note(id, quiet) {
    var n = N[id]; if (!n || got[id]) return false; got[id] = 1; save();
    if (!quiet) { toast(n); tone('type'); buzz(6); }
    paintBook(); paintDraft(); paintCnt(); return true;
  }
  function paintCnt() { var e = $('#ntCnt'); if (e) e.textContent = '· 지금까지 ' + count() + '줄'; }
  W.ykNote = note;

  /* ── 수첩 속 「취재 긔록」 — 공용 기자수첩이 열릴 때마다 맨 우에 끼움 ── */
  var CAT = { fact: '확인', clash: '엇갈림', open: '미확인' }, GRP = ['현장', '시간', '긔록'];
  function paintBook() {
    var bd = $('#mceBkBd'); if (!bd) return;
    var old = $('.nt-book', bd); if (old) old.remove();
    var ids = Object.keys(N).filter(function (k) { return got[k]; });
    var h = '<section class="nt-book" data-noko><div class="nt-hd"><b>취재 긔록</b><span>' + ids.length + ' / ' + Object.keys(N).length + '</span></div>';
    if (!ids.length) h += '<p class="nt-empty">아즉 아모것도 적지 아넛소. 방을 드러가고, 진술을 누르고, 편지를 대조하면 — 여긔 쌓이오.</p>';
    else GRP.forEach(function (g) {
      var L = ids.filter(function (k) { return N[k].g === g; }); if (!L.length) return;
      h += '<h5>' + g + ' <em>' + L.length + '</em></h5><ul>' + L.map(function (k) { var n = N[k]; return '<li class="' + n.c + '" data-src="' + n.src + '"><i>' + CAT[n.c] + '</i><b>' + n.k + '</b><span>' + n.t + '</span></li>'; }).join('') + '</ul>';
    });
    h += '<p class="nt-go"><a href="#draft" data-goto="draft">모은 긔록으로 짠 마지막 원고 →</a>' + (ids.length ? '<button type="button" class="nt-clear">수첩 비우기</button>' : '') + '</p></section>';
    bd.insertAdjacentHTML('afterbegin', h);
  }
  D.addEventListener('click', function (e) {
    if (e.target.closest('.nt-clear')) { if (!confirm('모은 긔록을 모다 지우겟소?')) return; got = {}; save(); paintBook(); paintDraft(); return; }
    var li = e.target.closest('.nt-book li[data-src]'); if (li) { var t = D.getElementById(li.dataset.src); var x = $('#mceBook .mce-hg-x'); if (x) x.click(); if (t) setTimeout(function () { W.scrollTo({ top: t.getBoundingClientRect().top + W.scrollY - 50, behavior: 'smooth' }); }, 320); return; }
    var ga = e.target.closest('.nt-go a'); if (ga) { e.preventDefault(); e.stopPropagation(); var x2 = $('#mceBook .mce-hg-x'); if (x2) x2.click(); var d = $('#draft'); if (d) setTimeout(function () { W.scrollTo({ top: d.getBoundingClientRect().top + W.scrollY - 50, behavior: 'smooth' }); }, 320); }
  }, true);
  function watchBook() {
    var bd = $('#mceBkBd'); if (!bd) { setTimeout(watchBook, 300); return; }
    paintBook();
    if ('MutationObserver' in W) new MutationObserver(function (ms) { if (!$('.nt-book', bd)) paintBook(); }).observe(bd, { childList: true });
  }

  /* ── 모으는 자리들 ── */
  function hooks() {
    /* 1화 — 연판을 다 펴면 */
    var pl = $('#mrPlate'); if (pl && 'MutationObserver' in W) new MutationObserver(function () { if (pl.classList.contains('open')) note('paper1'); }).observe(pl, { attributes: true, attributeFilter: ['class'] });
    /* 2화 — 방에 드러가면 (평면도 시트의 방 글이 바뀔 때) */
    var RID = { '응접실': 'r_study', '안방': 'r_wife', '복도': 'r_hall', '현관': 'r_door', '하녀 방': 'r_found', '엽방': 'r_maid', '부엌': 'r_kitchen', '유리문 밧': 'r_window', '철도병원 압 공원': 'r_park' };
    var hs = $('#hs2'); if (hs && 'MutationObserver' in W) new MutationObserver(function () { var h3 = $('#hsRoom h3'); if (!h3) return; var nm = h3.childNodes[0] ? h3.childNodes[0].textContent.trim() : ''; var id = RID[nm]; if (id) setTimeout(function () { note(id); }, 900); }).observe(hs, { childList: true, subtree: true });
    /* 3화 — 시각 줄을 누르면 · 「시각은 셋」이 보이면 */
    $$('#c3 .mr-tl > li').forEach(function (li, i) {
      var id = 't' + i, tm = $('time', li), tag = $('i', li), p = $('p', li);
      def(id, '시간', TCAT[i] || 'open', txt(tm) + ' · ' + txt(tag), txt(p), 'c3');
      var b = D.createElement('button'); b.type = 'button'; b.className = 'nt-add'; b.setAttribute('data-noko', ''); b.setAttribute('aria-label', '수첩에 적기'); b.innerHTML = '<i></i><span>수첩에</span>'; li.appendChild(b);
      if (got[id]) li.classList.add('noted');
      b.addEventListener('click', function (e) { e.stopPropagation(); if (note(id)) li.classList.add('noted'); });
    });
    var three = $('#c3 .mr-three'); if (three && 'IntersectionObserver' in W) { var io3 = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { note('t_three'); io3.disconnect(); } }); }, { threshold: .5 }); io3.observe(three); }
    /* 4화 — 지면 장치를 열면 */
    W.addEventListener('mb:open', function (e) { if (e.detail === 'shPaper') note('paper6', true); });
    /* 5화 — 사람 장을 펴면 */
    D.addEventListener('click', function (e) {
      var c = e.target.closest('#mrCast [data-p], #bkTabs [data-p], #bkBody .bk-go [data-p]'); if (c) { var i = +c.dataset.p; setTimeout(function () { note('p' + i); }, 500); }
    });
    /* 6화 — 필적 셋 · 편지 대 사실 */
    D.addEventListener('click', function (e) { var c = e.target.closest('#ltBody [data-c]'); if (c) setTimeout(function () { note('l_c' + c.dataset.c); }, 200); });
    var lb = $('#ltBody'); if (lb && 'MutationObserver' in W) new MutationObserver(function () { var n = $('#ltN'); if (n && /^3/.test(n.textContent.trim())) note('l_hand'); }).observe(lb, { childList: true, subtree: true, characterData: true });
    /* 7화 — 아씨의 진술 */
    $$('#c7 .al').forEach(function (b, i) { b.addEventListener('click', function () { setTimeout(function () { note('a' + i); }, 300); }); });
    /* 8화 — 봉한 쪽지 */
    $$('#c8 .sl').forEach(function (b, i) { b.addEventListener('click', function () { setTimeout(function () { note('s' + i); }, 400); }); });
    /* 9화 — 여섯 정황 · 두 자백 (누르면) */
    $$('#c9 .mr-six li').forEach(function (li, i) { li.classList.add('nt-tap'); li.addEventListener('click', function () { note('x' + i); li.classList.add('noted'); }); });
    $$('#c9 .mr-conf > div').forEach(function (d, i) { d.classList.add('nt-tap'); d.addEventListener('click', function () { note('cf' + i); d.classList.add('noted'); }); });
    /* 10화 — 공판이 끗나면 */
    var ct = $('#ct2'); if (ct && 'MutationObserver' in W) new MutationObserver(function () { if (ct.classList.contains('end')) note('court'); }).observe(ct, { attributes: true, attributeFilter: ['class'] });
    /* 11화 — 수수께끼의 답이 보이면 */
    $$('#c11 .mr-rid.ans > div').forEach(function (d, i) { if (!('IntersectionObserver' in W)) return; var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { note('v' + i, i > 0); io.disconnect(); } }); }, { threshold: .6 }); io.observe(d); });
  }

  /* ── 제2막 — 시계 겻헤 작은 평면도: 그 시각, 그 자리 ── */
  var ROOMS = [['study', 40, 60, 395, 230, '응접실'], ['wife', 435, 60, 395, 230, '안방'], ['hall', 40, 290, 790, 70, '복도'], ['door', 40, 360, 170, 140, '현관'], ['found', 210, 360, 230, 140, '하녀 방'], ['maid', 440, 360, 230, 140, '엽방'], ['kitchen', 670, 360, 160, 140, '부엌']];
  var AT = [['out', '밧 · 사진관'], ['door', '현관 · 양복집 점원'], ['wife', '안방 · 이부자리'], ['out', '밧 · 궂은비의 공원'], ['maid', '엽방 · 아씨 취침'], ['found', '하녀 방 · 전깃불'], ['found', '하녀 방 · 비명 — 이웃집까지'], ['out', '밧 · 중앙극장'], ['hall', '복도 끗 변소 · 아씨'], ['kitchen', '부엌문 · 자백의 길'], ['hall', '변소 · 그리고 유리창'], ['study', '응접실 · 신문과 운동'], ['found', '하녀 방 · 문이 열림']];
  function miniPlan() {
    var stage = $('#ckStage'), items = $$('#c3 .mr-tl > li'); if (!stage || !items.length) return;
    var w = D.createElement('div'); w.className = 'ck-plan'; w.setAttribute('data-noko', '');
    w.innerHTML = '<small>그 시각, 그 자리</small><svg viewBox="30 50 810 460">' + ROOMS.map(function (r) { return '<g data-id="' + r[0] + '"><rect x="' + r[2] + '" y="' + r[1] + '" width="' + r[4] + '" height="' + r[3] + '"/><text x="' + (r[2] + r[4] / 2) + '" y="' + (r[1] + r[3] / 2 + 14) + '">' + r[5] + '</text></g>'; }).join('') + '<g data-id="out"><rect x="40" y="440" width="790" height="60" class="o"/><text x="435" y="482">밧</text></g></svg><b id="ckPlanT"></b>';
    stage.appendChild(w);
    var cur = -1;
    /* (1019) 방 우에 사람 일홈을 바로 — 그 시각 누가 어대 잇섯다 하엿는가 (진술·긔록 그대로) */
    var WHO = [[['out', '아씨 · 마리아']], [['door', '마리아'], ['study', '아씨']], [['wife', '마리아']], [['out', '아씨'], ['found', '마리아']], [['maid', '아씨'], ['found', '마리아']], [['found', '마리아'], ['maid', '아씨']], [['found', '마리아 · ?'], ['maid', '아씨']], [['out', '이노우에 (극장이라 하엿소)']], [['hall', '아씨']], [['kitchen', '이노우에 (자백)']], [['hall', '아씨']], [['study', '아씨']], [['found', '아씨']]];
    var GEO = {}; ROOMS.forEach(function (r) { GEO[r[0]] = [r[2] + r[4] / 2, r[1] + r[3] / 2 - 12]; }); GEO.out = [435, 462];
    var NS = 'http://www.w3.org/2000/svg', svg = w.querySelector('svg'), whoG = D.createElementNS(NS, 'g'); whoG.setAttribute('class', 'ck-who'); svg.appendChild(whoG);
    function set(i) { if (i === cur || !AT[i]) return; cur = i; $$('g[data-id]', w).forEach(function (g) { g.classList.toggle('on', g.getAttribute('data-id') === AT[i][0] || (WHO[i] || []).some(function (x) { return x[0] === g.getAttribute('data-id'); })); }); $('#ckPlanT').textContent = AT[i][1];
      whoG.innerHTML = (WHO[i] || []).map(function (x) { var g = GEO[x[0]]; if (!g) return ''; return '<text x="' + g[0] + '" y="' + g[1] + '">● ' + x[1] + '</text>'; }).join(''); }
    if ('MutationObserver' in W) new MutationObserver(function () { items.forEach(function (li, k) { if (li.classList.contains('now')) set(k); }); }).observe($('#c3 .mr-tl'), { attributes: true, subtree: true, attributeFilter: ['class'] });
    items.forEach(function (li, k) { if (li.classList.contains('now')) set(k); });
  }

  /* ── 종막 — 긔자의 마지막 원고 ── */
  var SLOTS = {
    fact: [
      { k: '첫 보도', t: '팔월 일일 아츰의 일은 사흘 뒤 활자가 되엇소 — 동아일보 팔월 사일.', ids: ['paper1', 'paper6'], src: 'c1' },
      { k: '부검', t: '사고가 아니오. 죽은 시각은 밤 열한 시에서 열두 시 사이 — 이웃집 하녀가 비명을 드른 때와 맛소.', ids: ['t6', 't_three', 'l_c2'], src: 'c3' },
      { k: '그 밤의 방', t: '남편이 떠난 뒤 줄곧 응접실에서 자든 아씨가, 그 밤만 하녀 방 엽방에서 잣소.', ids: ['r_maid', 't4', 'r_study'], src: 'c2' },
      { k: '하녀 방', t: '아츰 열 시에야 문이 열렷소. 물증은 전구의 지문 하나 — 「희미해 감식이 어렵다」.', ids: ['r_found', 't12'], src: 'c2' },
      { k: '편지가 말한 곳', t: '「철도병원 압 공원 풀밧에 파무덧다」 — 가 보니 수건과 창살이 정말 잇섯소.', ids: ['r_park', 'l_c0'], src: 'c6' },
      { k: '판결', t: '히사코 무죄 · 이노우에 일심 무긔, 이심 무죄. 벌 바든 이는 업소.', ids: ['v2', 'court'], src: 'c11' }
    ],
    clash: [
      { k: '벽 한 겹', t: '「아모 소리도 듯지 못하엿소」 — 그러나 비명은 이웃집까지 들렷고, 아씨는 한 시와 세 시에 깨어 잇섯소.', ids: ['a4', 'r_maid'], src: 'c7' },
      { k: '아씨의 진술', t: '빨래 · 목욕 · 인부 소리 · 양복상 — 다섯 줄 모다 긔록과 맛지 안앗소.', ids: ['a0', 'a1', 'a2', 'a3'], src: 'c7' },
      { k: '시각 셋', t: '열한 시~열두 시(부검) · 새벽 한 시 반(자백) · 새벽 세 시(투서) — 둘은 거짓이오.', ids: ['t_three', 't9', 't10'], src: 'c3' },
      { k: '두 자백', t: '「혼자 하엿소」 그리고 「아씨와 함께」 — 두 번 다 달랏고, 그 시각 그는 극장에 잇섯다 하엿소.', ids: ['cf0', 'cf1', 't7'], src: 'c9' },
      { k: '두 통의 편지', t: '첫째는 목격자, 둘째는 「내가 범인이오」 — 가튼 손이 다른 범인을 말하엿소.', ids: ['l_c3', 'p3', 'l_hand'], src: 'c6' },
      { k: '법뎡', t: '지문 · 한 우산 · 편지 — 피고는 모다 부인하엿고, 증인은 「깁히 잠들엇나 봅니다」.', ids: ['court'], src: 'c10' }
    ],
    open: [
      { k: '범인', t: '그 밤 그 방에 누가 잇섯는지 — 두 재판 모두 답하지 못하엿소.', ids: ['p6', 'v0'], src: 'c11' },
      { k: '편지를 쓴 손', t: '야마구치는 풀려낫고, 감뎡인은 이노우에를 가리켯소. 그가 엇더케 그리 자세히 아랏는지 — 모르오.', ids: ['p3', 'v1', 'l_c4', 'x5'], src: 'c6' },
      { k: '산보의 뜻', t: '밤 아홉 시, 궂은비의 공원으로 — 검사는 「누군가를 다리러 간 길」이라 보앗소. 짐작이오.', ids: ['t3'], src: 'c3' },
      { k: '세 가지 짐작', t: '거절당한 사내 · 질투 · 감추려 한 비밀 — 소화 팔 년의 잡지가 적엇스나, 어느 것도 법뎡에서 증명되지 아넛소.', ids: ['s0', 's1', 's2'], src: 'c8' },
      { k: '안경 쓴 사내', t: '여섯 가지 정황이 그를 가리켯소 — 정황이오, 증거는 아니오.', ids: ['x0', 'x1', 'x2', 'x3', 'x4'], src: 'c9' },
      { k: '길의 사내', t: '마리아와 길에서 말을 나누엇다는 철도원 — 어느 긔록에도 다시 나오지 안소.', ids: ['p5'], src: 'c5' },
      { k: '빈 집', t: '주인은 닐헤 출장 — 그 주에 집이 빈다는 것을, 누가 알앗는가.', ids: ['p2'], src: 'c5' }
    ]
  };
  var CATN = { fact: ['확인된 것', '지면 · 부검 · 판결이 말한 것'], clash: ['엇갈리는 것', '말과 긔록이 맛지 안는 자리'], open: ['끗내 확인되지 안은 것', '짐작 · 주장 · 빈 칸'] };
  function paintDraft() {
    var root = $('#draftBody'); if (!root) return;
    var tot = 0, fill = 0;
    root.innerHTML = ['fact', 'clash', 'open'].map(function (c) {
      return '<section class="dr-col ' + c + '"><h4><b>' + CATN[c][0] + '</b><small>' + CATN[c][1] + '</small></h4>' + SLOTS[c].map(function (s) {
        tot++; var on = s.ids.some(function (id) { return got[id]; }); if (on) fill++;
        return on ? '<div class="dr-it on"><b>' + s.k + '</b><p>' + s.t + '</p></div>' : '<a class="dr-it" href="#' + s.src + '" data-goto="' + s.src + '"><b>' + s.k + '</b><p><i></i><i></i><i class="s"></i><span>아즉 취재하지 안음 · ' + chName(s.src) + ' →</span></p></a>';
      }).join('') + '</section>';
    }).join('');
    var n = $('#draftN'); if (n) n.textContent = fill + ' / ' + tot;
    var st = $('#draftSt'); if (st) st.classList.toggle('on', fill >= tot);
    var dr = $('#draft'); if (dr) dr.classList.toggle('done', fill >= tot);
  }
  function chName(id) { var s = D.getElementById(id); if (!s) return id; var no = s.getAttribute('data-no') || ''; return (/^\d+$/.test(no) ? (+no) + '화' : no); }

  function init() { setTimeout(watchToc, 80); hooks(); miniPlan(); watchBook(); paintDraft();
    paintCnt();
    var btn = $('#ntOpen'); if (btn) btn.addEventListener('click', function () { var nb = $('#mceNb'); if (nb) nb.click(); });
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', function () { setTimeout(init, 60); }); else setTimeout(init, 60);
})(window, document);
