/* 경성야록 · 「268호의 경성 산책」 폰판 — 수배지에서 달아난 고양이를 경성의 문화 명소 여덟 곳에서 찻기
   그림 속 어딘가에 숨은 고양이를 누르면 발바닥 도장이 찍히고, 그곳의 실제 이약이(연도 · 출처)가 열림
   고양이 목격담은 지어낸 이약이 · 장소와 연도와 출처는 사실 · 진행은 localStorage 'yk-walk' */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var tone = function (k) { if (W.mb && W.mb.tone) try { W.mb.tone(k); } catch (e) {} };
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var KEY = 'yk-walk';
  function got() { try { return JSON.parse(localStorage.getItem(KEY) || '{}') || {}; } catch (e) { return {}; } }
  function put(o) { try { localStorage.setItem(KEY, JSON.stringify(o)); } catch (e) {} }

  /* 그림 · 고양이 자리(x, y = 그림 안 백분율 · s = 그림 너비 대비 크기) · mj:true 면 그림 속에 고양이가 그려져 잇으니 덧그림을 안 씌움 */
  var M = function (n, l) { return l.split('').map(function (c) { return 'assets/walk/walk_' + n + c + '.jpg'; }); };
  var A = function (f, cap, src) { return { img: 'assets/walk/' + f, cap: cap, src: src }; };
  var S = [
    { id: 'dansung', place: '단성사', where: '종로 삼정목', yr: '1907 ~',
      img: 'assets/walk/walk_01.jpg', x: 80, y: 41, s: 10,
      seen: '「아리랑」 개봉날 — 종로 YMCA 앞까지 늘어선 줄 틈에, 표도 업는 검은 놈 하나가 끼어 잇섯다 하오.',
      f: ['광무 십일 년(1907) 유월, 종로에 문을 연 「연예단성사」요. 처음엔 창과 무용을 올리는 극장이엇고, 1918년 박승필이 맛하 상설 활동사진관이 되엇소.', '1919년 10월 27일, 조선 사람이 조선 돈으로 만든 첫 영화 「의리적 구토」가 이곳에서 상영되엇소. 그날이 지금의 「영화의 날」이오.', '1926년 10월 1일 나운규의 「아리랑」이 개봉하자, 줄이 종로 YMCA 앞까지 섯다 하오.'],
      src: '국가기록원 「단성사」', more: [],
      arc: [A('arc_01a.jpg', '단성사 (1937)', '『대경성도시대관』(1937) · 서울역사박물관 근현대서울사진'), A('arc_01b.jpg', '「신영화 — 아리랑 단성사에 상영」', '『매일신보』 1926년 10월 1일')],
      go: ['napryang.html', '납량칸 · 자정의 백물어로'] },
    { id: 'jodk', place: '경성방송국', where: '정동', yr: '1927 ~',
      img: 'assets/walk/walk_02.jpg', mj: 1, x: 14, y: 82, s: 24,
      seen: '아나운서가 숨을 고르는 사이 — 마이크 발치에서 「야옹」 한 마디가 전파를 탓다는 제보가 드러왓소. 방송국은 부인하엿소.',
      f: ['소화 이 년(1927) 이월 십륙일, 정동에서 첫 전파를 보냇소. 호출부호 JODK, 출력 일 킬로와트, 주파수 육백구십 킬로.', '처음엔 우리말과 일본말을 한 채널에 섞어 일 대 삼으로 내보냇고, 1932년부터 우리말 방송을 따로 갈라 내보냇소.', '그때 쓰든 탄소 마이크에는 「KEIJO RADIO CO. SEOUL」이 새겨져 잇소. 지금 서울역사박물관에 잇소.'],
      src: '한국민족문화대백과사전 「경성방송국」 · 서울역사박물관 전시물 348', more: M('02', 'b'),
      arc: [A('arc_02a.jpg', '경성방송국 탄소 마이크 (실물)', '서울역사박물관')],
      go: ['case-jukcheomjeong/m.html#ch7', '죽첨정 · 긔록 수신긔로'] },
    { id: 'stadium', place: '경성운동장', where: '동대문 겻', yr: '1925 ~',
      img: 'assets/walk/walk_03.jpg', mj: 1, x: 35, y: 75, s: 44,
      seen: '경기 날 트랙 우에서 — 선수들보다 한 발 압서 달린 것이 잇섯다 하오. 발이 넷이엇다 하오.',
      f: ['1925년에 지어진 큰 운동장이오. 1926년 삼월에 문을 열엇다는 긔록도 잇소.', '해방 전까지는 경성운동장, 뒤에는 동대문운동장이라 불렷소.', '2007년 마지막 경기 뒤 헐렷고, 그 자리에 지금의 동대문디자인플라자가 서 잇소.'],
      src: '국가기록원 「동대문운동장」', more: M('03', 'bc'),
      arc: [A('arc_03a.jpg', '경성운동장 사진엽서', '서울역사박물관')],
      go: ['case-sonkijeong/m.html', '손긔졍 · 붓을 든 손, 지워진 가슴으로'] },
    { id: 'nakrang', place: '낙랑파라', where: '소공동', yr: '1930년대 초',
      img: 'assets/walk/walk_04.jpg', mj: 1, x: 65, y: 77, s: 44,
      seen: '창가 자리에서 소설가 하나가 원고를 쓰는 동안 — 겻헤 등의자 하나를 검은 놈이 차지하고 잣소. 찻값은 내지 아넛다 하오.',
      f: ['경성부청 건너편 장곡천정(지금의 소공동)에 문을 연 다방이오. 동경에서 도안을 공부한 화가 이순석이 차렷고, 아래층은 찻집 · 우층은 아틀리에엿소.', '이상 · 박태원 · 구본웅 같은 이들이 날마다 모엿소. 이상은 제 찻값 십 전만 테이블에 놋고 니러낫다 하오.', '금요일마다 빅타 레코드 신곡을 틀엇소. 뒤에 배우 김연실이 맛하 일홈을 「낙랑」으로 바꾸엇소.'],
      src: '『삼천리』 1933년 10월호 · 조선일보 「모던 경성」(2022.11.12) · 연 해는 자료마다 1931 · 1932로 다름', more: [],
      arc: [A('arc_04a.jpg', '낙랑파라 · 모나리자 다방 자리와 당시 거리', '서울역사편찬원 『일제강점기 경성부민의 여가생활』'), A('arc_04b.jpg', '낙랑파라에 모인 단골들', '당시 사진')],
      go: null },
    { id: 'mitsukoshi', place: '미쓰코시 옥상', where: '진고개 어구', yr: '1930 ~',
      img: 'assets/walk/walk_05.jpg', mj: 1, x: 79, y: 81, s: 14,
      seen: '백화점 옥상 난간 끗에서 — 소다 마시는 아가씨들 겻헤 안저 경성 지붕들을 내려다보고 잇섯다 하오.',
      f: ['1930년 10월 24일, 진고개 어구에 새 건물을 열엇소. 지금의 신세계백화점 본점이오.', '5층 옥상에는 정원 · 온실 · 사진관, 그리고 커피와 소다를 파는 매뎜이 잇섯소.', '이상의 소설 「날개」(1936)에서 주인공은 이 옥상에 올라 「날자, 날자, 한 번만 더 날아 보자꾸나」 하오.'],
      src: '『매일신보』 1930년 10월 24일 광고 · 이길훈 「미츠코시백화점의 설립과 경성 진출」(2016)', more: M('05', 'b'),
      arc: [A('arc_05a.jpg', '「경성 미쓰코시 신관 낙성 — 내일 아침 아홉 시 개점」', '『매일신보』 1930년 10월 24일'), A('arc_05b.jpg', '경성 미쓰코시 백화점 층별 안내도', '당시 안내도'), A('arc_05c.jpg', '미쓰코시 경성점', '당시 사진엽서')],
      go: ['m-shop.html', '광고 상점 · 그날의 아래칸으로'] },
    { id: 'hwasin', place: '화신백화점', where: '종로 네거리', yr: '1937',
      img: 'assets/walk/walk_06.jpg', mj: 1, x: 39, y: 90, s: 22,
      seen: '승강기 걸이 「올라갑니다」 하는 사이 — 발치 구석에 검은 손님 하나가 표도 업시 타고 잇섯다 하오.',
      f: ['종로 네거리, 조선 사람 박흥식이 세운 백화점이오.', '1935년 1월 27일 큰불로 나무 건물이 다 타고, 1937년 11월 지하 1층 · 지상 6층의 새 건물로 다시 섯소.', '승강기가 손님을 층층이 날랏고, 옥상엔 온실과 갤러리가 잇섯소. 그 자리에 지금 종로타워가 서 잇소.'],
      src: '『매일신보』 1937년 11월 11일 광고(서울신문 「근대광고 엿보기」) · 서울역사박물관 『화신백화점 — 사라진 종로의 랜드마크』', more: M('06', 'bcd'),
      arc: [A('arc_06a.jpg', '「축 화신 전관 완성」 광고', '『매일신보』 1937년 11월 11일'), A('arc_06b.jpg', '새 화신백화점', '당시 사진엽서')],
      go: null },
    { id: 'record', place: '유성기 음반', where: '종로 음반가게', yr: '1935',
      img: 'assets/walk/walk_07.jpg', mj: 1, x: 50, y: 53, s: 28,
      seen: '음반가게 유성기 나팔 속에 — 노래가 끗날 때까지 드러안저 꼼짝도 안 햇다 하오.',
      f: ['「목포의 눈물」은 소화 십 년(1935)에 나온 노래요. 조선일보 향토 노래 모집에 뽑힌 문일석의 가사에, 손목인이 곡을 붓쳣소.', '이난영이 불러 그해 구월 새 음반으로 나왓소.', '이절 가사가 문제가 되어, 가사지를 찍을 때는 고친 가사를 실엇소.'],
      src: '한국민족문화대백과사전 「목포의 눈물」 · 국민일보(2018.5.23)', more: M('07', 'bcd'),
      arc: [A('arc_07a.jpg', '오케 레코드 「목포의 눈물」 음반', '국민일보(2018.5.23) 수록')],
      go: null },
    { id: 'tram', place: '전차', where: '서대문 ~ 청량리', yr: '1899 ~',
      img: 'assets/walk/walk_08.jpg', mj: 1, x: 76, y: 11, s: 16,
      seen: '첫 시운전 날, 구경꾼을 막느라 순검들이 진땀을 빼는 사이 — 전차 지붕 우에 검은 것 하나가 먼저 올라타 잇섯다 하오. 차표는 끈치 아넛소.',
      f: ['광무 삼 년(1899) 오월 사일 오후 세 시, 전차가 처음 시운전을 햇소. 온 성안 사람들이 구경을 나와 순검들이 겨우 막앗소.', '오월 십칠일, 서대문에서 청량리까지 정식으로 달리기 시작햇소.', '단체 구경용 특별전차도 잇섯소. 한 대에 스무 명까지 십이 원이엇소.'],
      src: '『황성신문』 1899년 5월 5일 「전차시행」 · 9월 11일 「특별전차 정가표」 광고 · 국가기록원', more: M('08', 'bc'),
      arc: [A('arc_08a.jpg', '「전차시행」', '『황성신문』 1899년 5월 5일'), A('arc_08b.jpg', '「특별전차 정가표」 광고', '『황성신문』 1899년 9월 11일'), A('arc_08c.jpg', '종로를 달리는 전차', '당시 사진엽서')],
      go: ['case-jukcheomjeong/m.html', '죽첨정 · 골목의 어린 주검으로'] }
  ];

  var CAT = '<svg viewBox="0 0 60 70" aria-hidden="true"><path d="M14 66c-3 0-5-2-4-5 2-9 4-18 3-27-1-6-4-10-3-16 1-5 3-9 4-13l5 8c3-1 7-1 10 0l5-8c1 4 3 8 4 13 1 6-2 10-3 16-1 9 1 18 3 27 1 3-1 5-4 5z" class="b"/><path d="M42 60c6 0 12-3 13-9 1-4-1-8-4-9" class="t"/><circle cx="21" cy="25" r="1.9" class="e"/><circle cx="31" cy="25" r="1.9" class="e"/></svg>';
  var PAW = '<svg viewBox="0 0 100 100" aria-hidden="true"><g fill="currentColor"><path d="M50 50c-14 0-26 13-27 25-1 9 6 14 14 13 5-1 8-4 13-4s8 3 13 4c8 1 15-4 14-13-1-12-13-25-27-25z"/><ellipse cx="20" cy="44" rx="9" ry="12" transform="rotate(-24 20 44)"/><ellipse cx="37" cy="24" rx="9" ry="12.5" transform="rotate(-8 37 24)"/><ellipse cx="63" cy="24" rx="9" ry="12.5" transform="rotate(8 63 24)"/><ellipse cx="80" cy="44" rx="9" ry="12" transform="rotate(24 80 44)"/></g></svg>';

  var list = $('#wkList'), G = got();
  list.innerHTML = S.map(function (s, i) {
    return '<section class="wk-st" id="wk-' + s.id + '" data-i="' + i + '" data-ch="' + s.place + '" data-no="' + (i + 1) + '" data-kj="제보 ' + (i + 1) + '" data-sub="' + s.where + ' · ' + s.yr + '">' +
      '<p class="wk-k"><b>목격 제보 제' + (i + 1) + '호</b><span>' + s.where + ' · ' + s.yr + '</span></p>' +
      '<h2 class="wk-h">' + s.place + '</h2>' +
      '<figure class="wk-ph" data-i="' + i + '"><img src="' + s.img + '" alt="' + s.place + ' (재현 그림)" loading="lazy" decoding="async" draggable="false">' +
      (s.mj ? '' : '<span class="wk-cat" style="left:' + s.x + '%;top:' + s.y + '%;width:' + s.s + '%">' + CAT + '</span>') +
      '<i class="wk-hit" style="left:' + s.x + '%;top:' + s.y + '%;width:' + (s.mj ? Math.max(s.s * 1.3, 22) : s.s * 2.4) + '%"></i>' +
      '<span class="wk-paw" style="left:' + s.x + '%;top:' + s.y + '%">' + PAW + '</span>' +
      '<span class="rt">그림 · 재현</span><span class="wk-miss" aria-live="polite"></span></figure>' +
      '<p class="wk-tip">그림 속 어딘가에 — 그 놈이 잇소. 눌러 보시오.</p>' +
      '<div class="wk-open"><p class="wk-seen"><small>목격담 · 지어낸 이약이</small>' + s.seen + '</p>' +
      '<ol class="wk-f">' + s.f.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ol>' +
      (s.more.length ? '<p class="wk-gk">다른 목격 그림 · 옆으로 넘기시오</p><div class="wk-more">' + s.more.map(function (m) { return '<figure><img src="' + m + '" alt="' + s.place + ' — 또 다른 목격 (재현 그림)" loading="lazy" decoding="async"><span class="rt">그림 · 재현</span></figure>'; }).join('') + '</div>' : '') +
      '<p class="wk-src">출처 · ' + s.src + '</p>' +
      (s.arc.length ? '<p class="wk-gk">당시 지면 · 실제 자료</p><div class="wk-arc">' + s.arc.map(function (a) { return '<figure><img src="' + a.img + '" alt="' + a.cap + '" loading="lazy" decoding="async"><figcaption><b>' + a.cap + '</b>' + a.src + '</figcaption></figure>'; }).join('') + '</div>' : '') +
      (s.go ? '<a class="wk-go" href="' + s.go[0] + '">' + s.go[1] + ' →</a>' : '') + '</div></section>';
  }).join('');

  var bar = $('#wkBar');
  bar.innerHTML = S.map(function (s, i) { return '<a href="#wk-' + s.id + '" data-i="' + i + '" aria-label="' + s.place + '"><i>' + PAW + '</i><span class="wk-bn">' + s.place + '</span></a>'; }).join('');
  function paint() {
    var n = 0; S.forEach(function (s, i) { var on = !!G[s.id]; if (on) n++; var st = $('#wk-' + s.id); st.classList.toggle('found', on); $$('a', bar)[i].classList.toggle('on', on); });
    $('#wkN').textContent = n; $('#wkLeft').textContent = 8 - n;
    var done = n >= S.length; D.body.classList.toggle('wk-done', done);
    var p = $('#wkPoster'); if (p) p.classList.toggle('closed', done);
    try { W.dispatchEvent(new CustomEvent('yk:walk', { detail: n })); } catch (e) {}
  }
  paint();

  function find(i) {
    var s = S[i]; if (G[s.id]) return;
    G[s.id] = 1; put(G);
    var st = $('#wk-' + s.id); st.classList.add('hit'); tone('stamp'); buzz([18, 40, 18]);
    if (W.mb && W.mb.sfx) try { W.mb.sfx('bell', .25); } catch (e) {}
    setTimeout(function () { paint(); var o = $('.wk-open', st); if (o && o.getBoundingClientRect().top > innerHeight * .8) W.scrollBy({ top: Math.min(260, o.getBoundingClientRect().top - innerHeight * .45), behavior: 'smooth' }); }, 380);
    if (Object.keys(G).length >= S.length) setTimeout(function () { var p = $('#wkEnd'); if (p) W.scrollTo({ top: p.getBoundingClientRect().top + W.scrollY - 70, behavior: 'smooth' }); }, 2200);
  }
  var MISS = ['쥐구멍이오.', '그림자요.', '아니오 — 거긴 빈 자리요.', '고양이는 거긔 업소.', '조금 더 어두운 데를 보시오.'];
  list.addEventListener('click', function (e) {
    var f = e.target.closest('.wk-ph'); if (!f) return;
    var i = +f.dataset.i, s = S[i]; if (G[s.id]) return;
    if (e.target.closest('.wk-hit, .wk-cat')) { find(i); return; }
    /* 빗나가면 — 한마듸, 세 번 빗나가면 고양이 자리가 살짝 숨을 쉼 */
    f._m = (f._m || 0) + 1; var m = $('.wk-miss', f), r = f.getBoundingClientRect();
    m.textContent = MISS[(f._m - 1) % MISS.length]; m.style.left = ((e.clientX - r.left) / r.width * 100) + '%'; m.style.top = ((e.clientY - r.top) / r.height * 100) + '%';
    m.classList.remove('on'); void m.offsetWidth; m.classList.add('on'); tone('tick');
    if (f._m >= 3) f.classList.add('hint');
  });
  /* 다른 목격 그림 · 당시 지면 — 누르면 크게 */
  list.addEventListener('click', function (e) {
    var f = e.target.closest('.wk-more figure, .wk-arc figure'); if (!f) return;
    var im = $('img', f), cap = $('figcaption', f);
    var lb = D.createElement('div'); lb.className = 'wkp-lb'; lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-label', '크게 보기');
    lb.innerHTML = '<figure><img src="' + im.getAttribute('src') + '" alt="' + (im.alt || '') + '">' + (cap ? '<figcaption>' + cap.innerHTML + '</figcaption>' : '<figcaption>그림 · 재현</figcaption>') + '</figure>';
    var close = function () { lb.remove(); D.removeEventListener('keydown', esc); };
    var esc = function (k) { if (k.key === 'Escape') close(); };
    lb.onclick = close; D.addEventListener('keydown', esc); D.body.appendChild(lb); tone('tick');
  });
  $('#wkReset') && ($('#wkReset').onclick = function () { G = {}; put(G); $$('.wk-st').forEach(function (s) { s.classList.remove('hit'); }); $$('.wk-ph').forEach(function (f) { f._m = 0; f.classList.remove('hint'); }); paint(); W.scrollTo({ top: 0, behavior: 'smooth' }); });
})(window, document);
