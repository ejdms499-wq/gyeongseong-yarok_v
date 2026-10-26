/* 경성야록 · 죽첨정 폰판 장치 — 일곱 날의 지면 · 스물세 날 · 號外 · 라듸오
   글 데이터(ARTS · WORDS · ST)는 컴퓨터판 jk.js 의 것을 그대로 옮김 */
(function (W, D) {
  'use strict';
  var GAPS = [
    ['1933', '1930s', '그 말은 죽첨정에서 처음 생긴 것이 아니엇소.', '그 말은 죽첨정에서 처음 생긴 것이 아니었다.'],
    ['1930s', '1953', '해방이 와도, 전쟁이 와도 — 그 말은 살아남앗소.', '해방이 와도, 전쟁이 와도 — 그 말은 살아남았다.'],
    ['1953', '1970s', '돌은 한센인에게 날아갓고, 무덤은 더 작아졋소.', '돌은 한센인에게 날아갔고, 무덤은 더 작아졌다.'],
    ['1970s', '2011', '무덤 대신 약장수가, 약장수 대신 국경 너머의 캡슐이.', '무덤 대신 약장수가, 약장수 대신 국경 너머의 캡슐이.'],
    ['2011', '1933', '모양만 바꾼 그 한 마듸를 따라가면 — 다시 소화 팔 년, 죽첨정 쓰레기장.', '모양만 바꾼 그 한마디를 따라가면 — 다시 1933년, 죽첨정 쓰레기장.']
  ];
  var ARTS = [
    { d: ['오월 십칠일', '5월 17일'], tag: ['처음 실림', '첫 보도'], day: ['이튿날', '이튿날'], date: '1933.05.17', img: '19330517.jpg',
      title: '시내 형사 총출동, 팔방 활동도 수포',
      lead: '1933년 5월 17일자 동아일보 2면에 「유아 단두 사건」이 처음 실렸다. 형사 십여 명이 팔방으로 나섰지만 아이의 신원조차 밝혀지지 않았다.',
      body: ['기사는 "남녀를 분간할 수는 없으나 머리를 깎은 것을 보아 사내아이 같다"고 적었다. 경성제대 부검도 같은 판단이었다.',
             '같은 기사에는 범인을 "문둥병 환자의 짓이 아닌가" 짐작하는 대목이 실렸다. 한센병 환자를 향한 편견이 그대로 지면에 올랐다.',
             '서대문경찰서장은 "범행은 금일 새벽, 원한이나 치정관계에서 나온 것이 아닌가"라고 말했다.'],
      sum: ['5월 17일자 2면에 사건이 처음 실렸다.', '부검과 기사는 아이를 사내아이로 봤다.', '범인을 한센병 환자로 짐작하는 편견이 실렸다.', '경찰서장은 원한·치정을 의심했다.'],
      keys: ['첫보도', '신원미상', '편견'],
      w: [0, 1, 2, 3] },
    { d: ['오월 십팔일', '5월 18일'], tag: ['이튿날 실림', '이튿날 보도'], day: ['사흘째', '사흘째'], date: '1933.05.18', img: '19330518.jpg',
      title: '"오리무중이라 꾸짖어도 하는 수 없다"',
      lead: '사건은 다시 사회면에 실렸다. 범인은 아직 잡히지 않았다.',
      body: ['서장은 "사건이 오리무중으로 들어간다고 꾸지람을 해도 하는 수 없습니다. 그러나 과학적 수사방법은 있습니다"라고 말했다.',
             '경찰은 현장을 다시 살피고 감정 결과를 기다렸다. 아이가 누구인지는 여전히 아무도 몰랐다.'],
      sum: ['전날에 이어 사건이 다시 보도됐다.', '서장은 "오리무중"이라는 말을 스스로 꺼냈다.', '아이의 신원은 여전히 미상이었다.'],
      keys: ['오리무중', '서대문서'],
      w: [4] },
    { d: ['오월 십구일', '5월 19일'], tag: ['수사가 막힘', '수사 난항'], day: ['나흘째', '나흘째'], date: '1933.05.19', img: '19330519.jpg',
      title: '비가 내렸다, 흔적이 씻겨 갔다',
      lead: '서대문경찰서는 밤낮없이 수사를 이어 갔지만 뚜렷한 성과는 없었다.',
      body: ['비가 내리면서 현장에 남아 있던 흔적마저 사라질 처지가 됐다.',
             '경찰은 긴장 속에서 수사를 계속하면서도, 수사 내용은 철저히 비밀에 부쳤다.'],
      sum: ['집중 수사가 계속됐다.', '비로 현장 흔적이 사라질 처지가 됐다.', '경찰은 수사 내용을 감췄다.'],
      keys: ['수사난항', '비'],
      none: ['비가 내렷소. 새 말은 업고, 흔적만 씻기어 갓소.', '비가 내렸다. 새 말은 없고, 흔적만 씻겨 갔다.'], w: [] },
    { d: ['오월 이십오일', '5월 25일'], tag: ['방침을 다시 세움', '수사 재정비'], day: ['열흘째', '열흘째'], date: '1933.05.25', img: '19330525.jpg',
      title: '열흘, 경찰은 수사의 방향을 처음부터 다시 그렸다',
      lead: '성과가 나오지 않자 경기도 경찰부는 시내 여러 경찰서를 불러 모았다.',
      body: ['그동안의 조사 내용을 다시 검토하고 방침을 정비해, 각 경찰서가 함께 수사를 잇기로 했다.',
             '범인 대신, 의심받을 사람의 목록이 길어지기 시작했다.'],
      sum: ['수사가 길어지며 방향을 재검토했다.', '여러 경찰서가 대책 회의를 열었다.', '경찰서 간 공조를 강화했다.'],
      keys: ['수사회의', '공조'],
      none: ['새 말은 업섯소. 의심할 사람의 목록만 길어졋소.', '새 말은 없었다. 의심할 사람의 목록만 길어졌다.'], w: [] },
    { d: ['유월 이일', '6월 2일'], tag: ['혐의가 짙어짐', '유력 혐의선'], day: ['열여드레째', '18일째'], date: '1933.06.02', img: '19330602.jpg', mark: '오보',
      title: '수사 18일째, 한 가족이 혐의선에 오르다',
      lead: '죽첨정에 살던 한 가족 다섯이 서대문서에 검거돼 조사를 받았다. 그들은 모두 범행을 부인했다.',
      body: ['지면은 그 집안을 "유력한 혐의자"라 불렀다. 이 단계의 의혹은 아직 확인된 사실이 아니었다.',
             '그러나 무죄의 증거는 처음부터 있었다. 이 집안의 가장은 5월 13일 병원에서 이미 숨졌고, 아이가 숨진 것은 빨라야 15일 밤이었다. 가족은 열흘 만에 풀려났다.'],
      sum: ['한 가족 다섯이 검거돼 조사를 받았다.', '지면은 그들을 "유력한 혐의자"라 불렀다.', '가족은 열흘 만에 풀려났다.'],
      keys: ['혐의선', '오보'],
      w: [5] },
    { d: ['유월 삼일', '6월 3일'], tag: ['수사를 넓힘', '수사 확대'], day: ['열아흐레째', '19일째'], date: '1933.06.03', img: '19330603.jpg',
      title: '백여 명이 붙들렸다 풀려났다',
      lead: '서대문서는 죽첨정·합동·중림동 일대로 수사를 넓혔다.',
      body: ['그 사이 경찰은 걸인과 한센병 환자를 "혐의"로 잡아들였다. 서대문서에서만 붙들었다 풀어 준 사람이 백여 명이었다.',
             '첫날 지면에 실린 짐작 — "문둥병 환자의 짓" — 이 수사의 그물이 되어 있었다.'],
      sum: ['수사가 죽첨정 일대로 넓어졌다.', '걸인과 한센병 환자 백여 명이 붙들렸다 풀려났다.'],
      keys: ['수사확대', '편견'],
      none: ['새 말은 업섯소. 첫날의 말 — 「문둥병 환자의 짓」 — 이 그물이 되어, 백여 명을 붓드럿소.', '새 말은 없었다. 첫날의 말 — 「문둥병 환자의 짓」 — 이 그물이 되어, 백여 명을 붙들었다.'], w: [] },
    { d: ['유월 팔일', '6월 8일'], tag: ['봉함', '봉함'], sealed: 1 }
  ];

  /* 호외에서 지워지는 말 — 틀린 말 / 남은 한 마듸 */
  var WORDS = [
    { w: ['「사내아해 갓다」', '「사내아이 같다」'], d: '5.17', fix: ['한 살 난 계집아해엿소.', '한 살 난 여자아이였다.'] },
    { w: ['「문둥병 환자의 짓」', '「문둥병 환자의 짓」'], d: '5.17 · 6.3', fix: ['편견이엇소. 걸인과 한센인 백여 명이 붓들렷다 풀려낫소.', '편견이었다. 걸인과 한센인 백여 명이 붙들렸다 풀려났다.'] },
    { w: ['「원한이나 치정」', '「원한이나 치정」'], d: '5.17', fix: ['원한도, 치정도 업섯소.', '원한도, 치정도 없었다.'] },
    { w: ['「범행은 금일 새벽」', '「범행은 오늘 새벽」'], d: '5.17', fix: ['죽인 이는 업섯소. 아해는 병으로 죽엇소.', '죽인 사람은 없었다. 아이는 병으로 죽었다.'] },
    { w: ['「오리무중」', '「오리무중」'], d: '5.18', fix: ['답은 이웃의 무덤 속에 잇섯소.', '답은 이웃의 무덤 속에 있었다.'] },
    { w: ['「유력한 혐의자」', '「유력한 혐의자」'], d: '6.2', fix: ['그 집 가장은 아해보다 먼저, 이미 숨진 이엿소.', '그 집 가장은 아이보다 먼저, 이미 숨진 사람이었다.'] }
  ];
  var ST = [
    { y: '1933', ang: 18, no: '제0호', when: '1933년 · 경성 죽첨정', au: null, moon: 70,
      h: '약이 된다는<br><em>말 한마디</em>가',
      t: ['약이 된다는 말 한 마듸', '약이 된다는 말 한마디'],
      b: [['진범은 여섯 살 아해의 병을 고치려 하엿다고 자백하엿소 (동아일보 소화 팔 년 유월 팔일)', '진범은 여섯 살 아이의 병을 고치려 했다고 자백했다 (동아일보 1933.6.8)'], ['그 이십삼 일 동안 지면은 한센병 환자와 한 집안을 차례로 의심하엿소', '그 23일 동안 신문은 한센병 환자와 한 집안을 차례로 의심했다']],
      d: ['이 칸은 녹음이 업소. 소화 팔 년 유월 팔일자 지면이 남긴 말만 화면으로 전하오. 다이알을 돌리면, 그 한 마듸가 지나온 세월이 잡히오.', '이 칸은 녹음이 없습니다. 1933년 6월 8일자 지면이 남긴 말만 화면으로 전합니다. 다이얼을 돌리면, 그 한마디가 지나온 세월이 잡힙니다.'],
      link: ['모든 주파수는 이 한 마듸에서 비롯하오 — 「아해의 골은 약이 된다」.', '모든 주파수는 이 한마디에서 시작된다 — 「아이의 골은 약이 된다」.'] },
    { y: '1930s', ang: 90, no: '제1호', when: '1930년대 ~ 해방 전후', au: 'case01.mp3', card: 'case01.png', moon: 28,
      h: '약이 없던 시절,<br>사람들은 <em>아이의 무덤</em>을 팠다',
      t: ['약이 업든 시절, 사람들은 아해의 무덤을 팟다', '약이 없던 시절, 사람들은 아이의 무덤을 팠다'],
      b: [['소화 십년대 중반 함경 · 평안도, 갓 무든 아해의 무덤을 판 일', '1930년대 중반 함경·평안도, 갓 묻힌 영아 무덤 도굴'], ['해방 뒤, 「아해를 잡아간다」는 소문이 실제 사건으로', '해방 후, "아이를 잡아간다"는 소문이 실제 사건으로']],
      d: ['소화 년간 긔록에서 차진 사건이오. 그때의 긔록을 오늘의 독자가 다시 드를 수 잇도록 라듸오로 꾸며 노앗소.', '1930년대 기록에서 발견한 사건입니다. 당시의 기록을 라디오 형식으로 재구성했습니다.'],
      link: ['죽첨정의 무덤은 처음이 아니엇소. 가튼 말이, 북쪽의 무덤들도 열엇소.', '죽첨정의 무덤은 처음이 아니었다. 같은 말이, 북쪽의 무덤들도 열었다.'] },
    { y: '1953', ang: 162, no: '제2호', when: '1953년 · 전북 남원', au: 'case02.mp3', card: 'case02.png', moon: 22,
      h: '미신이 빼앗은 건<br><em>아이 하나</em>가 아니었다',
      t: ['미신이 빼아슨 것은 아해 하나가 아니엿다', '미신이 빼앗은 건 아이 하나가 아니었다'],
      b: [['「생간을 먹으면 낫는다」는 미듬이 나은 영아 살해 사건', '"생간을 먹으면 낫는다"는 믿음이 낳은 영아 살해 사건'], ['그 뒤 전국의 한센인에게 번진 집단 린치와 혐오', '그 뒤 전국의 한센인에게 번진 집단 린치와 혐오']],
      d: ['전쟁 끗의 어수선하고 불안한 틈에도 비슷한 미듬과 사건이 긔록에 나타낫소. 그때 긔록을 라듸오로 꾸며 노앗소.', '전쟁 직후의 혼란 속에서도 비슷한 믿음과 사건은 기록에 등장했습니다. 당시 기록을 라디오 형식으로 재구성했습니다.'],
      link: ['소화 팔 년 첫 지면의 짐작 — 「문둥병 환자의 짓」. 스무 해 뒤에도, 가튼 혐오가 한센인을 향하엿소.', '1933년 첫 신문의 짐작 — "문둥병 환자의 짓". 스무 해 뒤에도, 같은 혐오가 한센인을 향했다.'] },
    { y: '1970s', ang: 234, no: '제3호', when: '1970년대', au: 'case03.mp3', card: 'case04.png', moon: 76,
      h: '갓난아이 무덤만<br><em>골라 판</em> 사람들',
      t: ['갓난아해 무덤만 골라 판 사람들', '갓난아이 무덤만 골라 판 사람들'],
      b: [['「아해 뼛가루를 먹으면 낫는다」는 무당의 꾐, 동자 무덤을 판 일', '"아이 뼛가루를 먹으면 낫는다"는 무당의 꾐, 동자 무덤 도굴'], ['사산아 · 태반까지 약재로 거래된 음지의 암시장', '사산아·태반까지 약재로 거래된 음지의 암시장']],
      d: ['공장이 늘고 세상이 변하든 때에도 오랜 미듬은 아조 사라지지 아넛소. 그때 긔록을 라듸오로 다시 드러 보시압.', '산업화 시기에도 오래된 믿음은 사라지지 않았습니다. 당시 기록을 라디오 형식으로 다시 살펴봅니다.'],
      link: ['죽첨정처럼, 다시 무덤이엇소. 말은 사람 대신 묘지를 차저갓소.', '죽첨정처럼, 다시 무덤이었다. 말은 사람 대신 묘지를 찾아갔다.'] },
    { y: '2011', ang: 306, no: '제4호', when: '2011~2012년 · 관세청 적발', au: 'case04.mp3', card: 'case03.png', moon: 34,
      h: '죽첨정의 미신은<br><em>캡슐</em>이 되어 돌아왔다',
      t: ['죽첨정의 미신은 다른 모양으로 도라왓다', '죽첨정의 미신은 다른 모습으로 돌아왔다'],
      b: [['이천십일 년 팔월부터 중국발 「인육 캡슐」 밀반입이 잇따라 적발되엇소 (관세청)', '2011년 8월부터 중국발 "인육 캡슐" 밀반입이 잇따라 적발됨 (관세청)'], ['소화 팔 년에서 여든 해 가까이, 미신은 「보약」의 얼골을 하고 잇섯소', '1933년에서 여든 해 가까이, 미신은 "보약"의 얼굴을 하고 있었다']],
      d: ['녯 미듬과 이야기가 오늘에 와서 엇더케 모양을 바꾸는지 긔록으로 살펴보시압.', '과거의 믿음이 현대에 들어 어떤 방식으로 변주되는지 기록을 통해 살펴봅니다.'],
      link: ['여든 해 가까이 지나도, 그 한 마듸는 겁질만 바꾸어 국경을 넘엇소.', '여든 해 가까이 지나도, 그 한마디는 포장만 바꿔 국경을 넘었다.'] }
  ];

  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  function esc(s) { return String(s); }
  var IMG = './image/Jukcheomjeong/';

  /* 第二章 · 일곱 날의 지면 (공통 장치) */
  var ADB = '../assets/gwanggo/day/jk_';
  W.mb.paper({ arts: ARTS, words: WORDS, imgBase: IMG + 'articles-toned/', era: '소화 팔 년', goto: 'ch5', shop: '../shop.html#ad-jk-',
    ads: { '19330517': { top: .665, h: .325, img: ADB + '19330517_band.jpg', cap: '죽첨정 사건이 처음 실린 오월 십칠일 지면, 그 맨 아래칸이오. 카메라 · 필름 광고와 「당선 사례」 광고가 열 칸 넘게 줄지어 잇소.', say: '가튼 장 우에선 범인을 쫓고, 아래에선 당선을 감사햇소.' },
      '19330518': { top: .74, h: .24, img: ADB + '19330518_band.jpg' }, '19330519': { top: .82, h: .16, img: ADB + '19330519_band.jpg' },
      '19330525': { top: .76, h: .22, img: ADB + '19330525_band.jpg' }, '19330602': { top: .78, h: .20, img: ADB + '19330602_band.jpg' },
      '19330603': { top: .78, h: .19, img: ADB + '19330603_band.jpg' } },
    sealHead: '유월 팔일자 지면은,<br>호외에서 뜨드시압.', sealText: '이 날의 말은 모아 둔 말들과 함께 第六章 號外에서 드러나오.', sealBtn: '第六章 號外로 →' });
  /* ════ 第四章 · 스물세 날 ════ */
  var DATES = ['5.16','5.17','5.18','5.19','5.20','5.21','5.22','5.23','5.24','5.25','5.26','5.27','5.28','5.29','5.30','5.31','6.1','6.2','6.3','6.4','6.5','6.6','6.7','6.8'];
  var MARK = { 0: ['發見', '쓰레기장'], 1: ['첫 보도', '「사내아해 갓다」'], 2: ['이튿날', '「오리무중」'], 3: ['비', '흔적이 씻김'], 9: ['회의', '방침을 다시'], 17: ['오보', '「유력한 혐의자」'], 18: ['백여 명', '붓들림'], 23: ['號外', ''] };
  (function cal() {
    var c = $('#jkCal'); if (!c) return;
    c.innerHTML = DATES.map(function (d, i) {
      var m = MARK[i];
      return '<span class="' + (m ? 'mk' : '') + (i === 23 ? ' ex' : '') + '"><small>' + (i ? i + '日' : '發見') + '</small><b>' + d + '</b>' + (m ? '<em>' + m[0] + '</em>' : '<em>—</em>') + '</span>';
    }).join('');
  })();
  var BEATS = [
    { n: '其一', d: '오월 십륙일', p: '오전 일곱 시 반', t: '보자기 하나', day: 0, img: 1, clue: ['경찰견의 자취', '령사관 근처에서 끈김'],
      b: '매립지 우에 보자기 하나가 노혀 잇섯소. 종이와 수건으로 겹겹이 싼 것 — 그 속에서 어린 아해의 머리가 나왓소. 자취는 마포 쪽으로 이어지다 불란서 령사관 근처에서 끈겻소. 경찰견도 거긔서 길을 일엇소.' },
    { n: '其二', d: '오월 십륙일', p: '경성제국대학 의학부', t: '하로 만의 감정', day: 0, img: 2, clue: ['하로 만의 감정', '그 감정은 맛는가?'],
      b: '대학은 하로 만에 감정을 내노앗소 — 한 살 안팎의 사내아해, 일은 발견 열 시간 안에 벌어졋다. 경성은 이것을 살인이라 불럿고, 지면도 이 한 줄을 그대로 미덧소.' },
    { n: '其三', d: '첫 주', p: '마포', t: '쌀 봉지 한 장', day: 1, img: 3, clue: ['쌀 봉지', '어느 집 봉지인지 모름'],
      b: '싼 종이 가운대 하나는 쌀 봉지엿소. 형사들은 그 봉지를 들고 마포의 한 쌀집을 차저가, 단골들을 하나하나 캐물엇소. 그러나 그 근방 쌀집과 과자집은 — 모다 비슷한 봉지를 쓰고 잇섯소.' },
    { n: '其四', d: '오월 이십일', p: '비', t: '비 오는 개천', day: 4, img: 4, clue: ['개천', '아모것도 업슴'],
      b: '철 이른 비가 내렷소. 형사들은 비를 마즈며 개천 바닥까지 뒤젓소. 아모것도 나오지 아넛고, 비는 — 남은 자취마저 씻어 갓소.' },
    { n: '其五', d: '오월 이십이일', p: '서대문경찰서', t: '그물', day: 6, img: 5, clue: ['붓들린 오십여 명', '백여 명이 풀려남'],
      b: '경찰은 그물을 넓게 던젓소. 걸인, 한센병 환자, 집 업는 이들 — 서대문서 한 곳에서만 한 번에 오십여 명이 붓들려 왓소. 첫날 지면에 실린 짐작이, 그대로 그물이 되엇소.' },
    { gap: 1, day: 7, to: 15 },
    { n: '其六', d: '유월 일일', p: '불란서 령사관 쪽 골목', t: '헝겊 한 조각', day: 16, img: 6, clue: ['헝겊 한 조각 · 한 집 다섯', '모다 부인'],
      b: '경찰견이 한 집에 드러가, 헝겊 한 조각을 물고 나왓소. 그 집 식구 다섯과 한 사내가 붓들렷소. 집 안에서는 아해 옷가지와, 무엇의 간인지 모를 것이 든 약탕관이 나왓소. 이튿날 지면은 그들을 「유력한 혐의자」라 불럿소.' },
    { n: '其七', d: '유월 초', p: '금화산', t: '거짓 자백', day: 17, img: 7, clue: ['자백', '금화산 — 아모것도 업슴'],
      b: '붓들린 사내 하나가 — 자기가 하엿다고 자백하고, 주검을 무든 곳까지 대엇소. 형사들은 금화산을 뒤젓소. 아모것도 나오지 아넛소. 뒤에 지면에는, 그 사내의 정신이 온전치 못하다는 말이 실렷소.' },
    { n: '其八', d: '유월 삼일', p: '수사 본부', t: '다른 물음', day: 18, img: 8, clue: ['닷새 안에 죽은 아해의 무덤', ''],
      b: '이날, 수사는 물음을 바꾸엇소. — 그 아해가 살아 잇다가 목숨을 일흔 것이 아니라면? 형사들은 닷새 안에 죽어 무친 아해들의 무덤을, 하나하나 다시 보기로 하엿소.' },
    { n: '其九', d: '유월 오일', p: '염리 공동묘지', t: '작은 무덤', day: 20, img: 9, clue: ['닷새 안에 죽은 아해의 무덤', '염리 공동묘지'],
      b: '염리 공동묘지. 형사들은 한 작은 무덤 앞에 섯소. 삽이 흙을 뜨기 시작하엿소. — 그 아래 무엇이 잇섯는지는, 아즉 지면에 실리지 아넛소.' },
    { n: '其十', d: '유월 륙일', p: '새벽 · 큰비', t: '비 오는 새벽', day: 21, img: 10,
      b: '새벽, 큰비가 쏘다젓소. 형사 이십여 명이 묘지 아래 아현리 언덕의 토막집들을 에워쌋소. 삼십여 명이 비를 마즈며 붓들려 나왓소.' },
    { n: '其十一', d: '유월 칠일', p: '경성제국대학 해부실', t: '세 시간', day: 22, img: 11,
      b: '여느 때라면 금세 끗낫슬 감정이, 이날은 세 시간이 걸렷소. 검사와 서장이 끗까지 자리를 지켯소. 그 세 시간 동안 무엇이 맛추어졋는지는 — 이튿날 지면이 말하오.' },
    { end: 1, day: 23 }
  ];
  var GAP = [['오월 이십삼일', '—'], ['오월 이십사일', '—'], ['오월 이십오일', '경긔도 경찰부, 여러 서를 불러 모음'], ['오월 이십륙일', '—'], ['오월 이십칠일', '—'], ['오월 이십팔일', '—'], ['오월 이십구일', '—'], ['오월 삼십일', '—'], ['오월 삼십일일', '—']];
  /* (1019c) 원래대로 — 영화처럼: 장면이 화면 가운데 오면 밝아지고, 우의 날짜판이 따라 넘어감 */
  (function () {
    var list = $('#stList'); if (!list) return;
    list.innerHTML = BEATS.map(function (b, i) {
      if (b.gap) return '<li class="st-sc gap" data-i="' + i + '"><p class="st-big">그리고 — 아흐레.</p><ul>' + GAP.map(function (g) { return '<li class="' + (g[1] !== '—' ? 'mk' : '') + '"><b>' + g[0] + '</b><span>' + g[1] + '</span></li>'; }).join('') + '</ul><p class="st-end">날이 갓소. 범인의 칸은, 여전히 비어 잇섯소.</p></li>';
      if (b.end) return '<li class="st-sc end" data-i="' + i + '"><p class="st-k">유월 팔일 · 이십삼 일</p><p class="st-big">호외</p><p class="st-p">그 세 시간 동안 무엇이 맛추어졋는지는 — 이튿날 지면이 말하오.</p></li>';
      return '<li class="st-sc" data-i="' + i + '"><figure class="st-fig"><img src="' + IMG + 'mj/jk_st' + b.img + '.jpg" alt="' + b.t + ' (재현 그림)" loading="lazy" decoding="async"><span class="rt">그림 · 재현</span></figure>' +
        '<div class="st-tx"><p class="st-k"><b>' + b.n + '</b>' + b.d + ' · ' + b.p + '</p><h3>' + b.t + '</h3><p class="st-p">' + b.b + '</p>' +
        (b.clue ? '<div class="st-clue"><small>쫏는 단서</small><b>' + b.clue[0] + '</b>' + (b.clue[1] ? '<span>' + b.clue[1] + '</span>' : '') + '</div>' : '') + '</div></li>';
    }).join('');
    var rail = $('#stRail'), sc = $$('.st-sc', list), cur = -1, shown = 0, anim;
    rail.innerHTML = '<div class="st-n"><small>발견 후</small><b id="stN">0</b><small>일</small></div><div class="st-mid"><div class="st-ticks">' + DATES.map(function (d, i) { return '<i data-k="' + i + '"></i>'; }).join('') + '</div><p class="st-date" id="stDate">오월 십륙일 · 범인 미상</p></div>';
    var KD = ['오월 십륙일', '오월 십칠일', '오월 십팔일', '오월 십구일', '오월 이십일', '오월 이십일일', '오월 이십이일', '오월 이십삼일', '오월 이십사일', '오월 이십오일', '오월 이십륙일', '오월 이십칠일', '오월 이십팔일', '오월 이십구일', '오월 삼십일', '오월 삼십일일', '유월 일일', '유월 이일', '유월 삼일', '유월 사일', '유월 오일', '유월 륙일', '유월 칠일', '유월 팔일'];
    var ticks = $$('.st-ticks i', rail), nEl = $('#stN'), dEl = $('#stDate');
    function count(to) {
      cancelAnimationFrame(anim); var from = shown, t0 = performance.now();
      (function f(t) { var k = Math.min(1, (t - t0) / 700); shown = Math.round(from + (to - from) * k); nEl.textContent = shown; if (k < 1) anim = requestAnimationFrame(f); })(t0);
    }
    function set(i) {
      if (i === cur) return; cur = i; var b = BEATS[i], hi = b.to || b.day;
      sc.forEach(function (el, k) { el.classList.toggle('now', k === i); if (k <= i) el.classList.add('seen'); });
      ticks.forEach(function (t, k) { t.classList.toggle('on', k <= hi); t.classList.toggle('now', k >= b.day && k <= hi); });
      count(hi); dEl.textContent = KD[hi] + ' · 범인 ' + (b.end ? '— 호외에서' : '미상');
    }
    var tick = false, inView = false;
    if ('IntersectionObserver' in W) new IntersectionObserver(function (es) { inView = es[0].isIntersecting; if (inView) onScroll(); else { rail.classList.remove('on'); if (W.mb.rain) W.mb.rain(false); list.classList.remove('wet'); } }, { rootMargin: '200px 0px' }).observe(list); else inView = true;
    function onScroll() {
      tick = false; if (!inView) return; var mid = W.innerHeight * .55, best = -1, bd = 1e9;
      var r0 = list.getBoundingClientRect(); rail.classList.toggle('on', r0.top < W.innerHeight * .6 && r0.bottom > 120);
      sc.forEach(function (el, k) { var r = el.getBoundingClientRect(), c = r.top + Math.min(r.height, W.innerHeight) / 2, d = Math.abs(c - mid); if (r.bottom > 0 && r.top < W.innerHeight && d < bd) { bd = d; best = k; } });
      if (best >= 0) set(best);
      var b = BEATS[cur], wet = !!b && (b.t === '비 오는 개천' || b.t === '비 오는 새벽'), vis = r0.top < W.innerHeight * .5 && r0.bottom > W.innerHeight * .4;
      if (W.mb.rain) W.mb.rain(wet && vis); list.classList.toggle('wet', wet && vis);
    }
    W.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
  })();

  /* 第七章 · 라듸오 (공통 장치) */
  W.mb.radio({ cardBase: './image/Jukcheomjeong/case/', linkLabel: '죽첨정과 겹치는 자리', gaps: GAPS, dial: './image/Jukcheomjeong/case/dial.png', st: ST, audioBase: './audio/', staticSrc: './audio/radio-static.mp3', endLine: '여전히, 그 말은 우리 겨테서 소근거리고 잇소.' });

  /* ════ 第五章 · 號外 — 봉을 뜨드면: 제목 한 줄씩 → 지면 → 종소리와 함께 「살인은 — 업섯소.」 → 진상 ════ */
  var exDone = false;
  function openExtra() {
    if (exDone) return; exDone = true;
    if (W.mb.prime) try { W.mb.prime(); } catch (e) {} /* 종을 미리 실어 둠 — 몇 초 뒤에 울려도 폰이 막지 안케 */
    var sec = $('#ch5'), body = $('#exBody'), seal = $('#exOpen');
    sec.classList.add('opened'); body.hidden = false;
    var wall = $('#exWall');
    wall.innerHTML = WORDS.map(function (w) { return '<li><small>' + w.d + '</small><b>' + w.w[0] + '</b><span>' + w.fix[0] + '</span></li>'; }).join('') +
      '<li class="true"><small>채록 第一號</small><b>「아해의 골은, 약이 된다」</b><span>이 말만이, 사람을 움직엿소.</span></li>';
    var T = 400, step = function (fn, ms) { setTimeout(fn, T); T += ms; };
    W.mb.sfx('whoosh', .4);
    $$('.ex-lines li', body).forEach(function (li) { step(function () { li.classList.add('on'); }, 1100); });
    step(function () { sec.classList.add('plate'); }, 1600);
    step(function () { sec.classList.add('twist'); W.mb.sfx('bell', .55); var t = $('#exTwist'); if (t) W.scrollTo({ top: t.getBoundingClientRect().top + W.scrollY - W.innerHeight * .3, behavior: 'smooth' }); }, 2200);
    step(function () { sec.classList.add('truth'); }, 10);
    if ('IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting) return; io.unobserve(e.target);
        if (e.target.id === 'exRumor') setTimeout(function () { e.target.classList.add('on'); }, 500);
        if (e.target.id === 'exWall') $$('li', e.target).forEach(function (li, i) { setTimeout(function () { li.classList.add('x'); }, 400 + i * 620); });
      }); }, { threshold: .35 });
      io.observe($('#exRumor')); io.observe(wall);
    } else { $('#exRumor').classList.add('on'); $$('li', wall).forEach(function (li) { li.classList.add('x'); }); }
    setTimeout(function () { W.scrollTo({ top: seal.getBoundingClientRect().top + W.scrollY - 60, behavior: 'smooth' }); }, 120);
  }
  $('#exOpen').onclick = openExtra;
  D.addEventListener('click', function (e) { if (e.target.closest('[data-open-extra]')) setTimeout(openExtra, 700); });

  /* 사건 요지 · 봉함 먼저 뜻기 */
  $('#briefOpen').onclick = function () { var s = $('#briefSeal'); $('.sealed', s).hidden = true; $('.opened', s).hidden = false; s.classList.add('open'); };

  /* 第六章 · 그때처럼 / 오늘 준칙 */
  $('#misSeg').addEventListener('click', function (e) {
    var b = e.target.closest('button'); if (!b) return;
    $$('#misSeg button').forEach(function (x) { x.classList.toggle('on', x === b); });
    $$('.mis-pane').forEach(function (p) { p.hidden = p.dataset.k !== b.dataset.k; });
  });

})(window, document);
