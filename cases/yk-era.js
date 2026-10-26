/* ════════════════════════════════════════════════════════════════
   경성야록 · 사건 끝의 두 칸 (yk-era.js)
     ① 이 사건의 시대  — 그해 앞뒤의 역사 몃 줄 + 교과서 낱말 + 수업 물음
     ② 그날 지면의 광고 — 사건이 처음 실린 그날, 가튼 장 아래칸의 진짜 광고 → 상뎜으로
   - 내용은 아래 YK_ERA 데이터에만 적음 (사건을 더할 때 한 덩어리만 보탬)
   - 역사 설명은 고등학교 한국사 교과서 · 국사편찬위원회 「우리역사넷」에서 확인되는 것만
   - 넣는 자리: 「다른 사건」(#next-cases) 바로 우
   ════════════════════════════════════════════════════════════════ */
(function (W, D) {
  'use strict';
  W.YK_ERA = W.YK_ERA || {};
  W.YK_ERA.jk = {
    year: 1933,
    lead: '근대의 불빛과 미신이 한 골목에 잇든 해',
    /* 연표: lane 'case' = 경성야록 사건 · 'era' = 그 시대 큰일 · t = 1926년 1월부터 몇 달째 (자리 잡기용) */
    ev: [
      { id: 'birth', lane: 'era', y: '1920.4', m: -69, t: '조선일보 · 동아일보 창간', d: '1920년, 3·1 운동 뒤 일제가 「문화 통치」를 내걸면서 조선일보(3월)와 동아일보(4월)가 창간되엇소. 그러나 신문은 처음부터 총독부의 검열 아래 잇섯소.', rel: '경성야록이 펴는 지면은 모두 이 뒤의 지면이오.', src: '우리역사넷 · 교과서', k: ['press'] },
      { id: 'close', lane: 'era', y: '1940.8', m: 175, t: '동아일보 · 조선일보 강제 폐간', d: '1940년 8월, 일제는 전시 체제를 핑계로 동아일보와 조선일보의 문을 닫게 햇소. 조선말 민간 신문의 지면이 사라졋소.', rel: '이 사건을 실은 신문도, 이날 문을 닫앗소.', src: '우리역사넷 · 교과서', k: ['press', 'war'] },
      { id: 'radio', lane: 'era', y: '1927.2', m: 13, t: '경성방송국 개국', d: '1927년 2월, 경성방송국이 라듸오 방송을 시작햇소. 신문에 이어 전파가 소식을 실어 나르기 시작한 때요.', rel: '이 장 7장의 라듸오는 바로 이 시절의 물건이오.', src: '우리역사넷 · 교과서', k: ['city'] },
      { id: 'manchu', lane: 'era', y: '1931.9', m: 68, t: '만주사변', d: '1931년 9월, 일본 관동군이 만주를 침략햇소. 이 뒤로 일제는 조선을 대륙 침략의 발판(병참 기지)으로 삼기 시작하오.', rel: '죽첨정 사건 두 해 전 — 경성은 전쟁의 뒤쪽 마당이 되어 가고 잇섯소.', src: '우리역사넷 · 교과서', k: ['war'] },
      { id: 'mkuk', lane: 'era', alt: 1, y: '1932.3', m: 74, t: '만주국 수립', d: '1932년 3월, 일제가 만주에 꼭두각시 나라 「만주국」을 세웟소.', rel: '대륙 침략이 굳어지던 해, 경성의 골목엔 여전히 미신과 가난이 함께 잇섯소.', src: '우리역사넷 · 교과서', k: ['war'] },
      { id: 'hangul', lane: 'era', y: '1933.10', m: 93, t: '한글 맞춤법 통일안 발표', d: '1933년 10월, 조선어학회가 「한글 맞춤법 통일안」을 발표햇소. 제각각이던 우리말 표기를 하나로 정리하려 한 일이오.', rel: '이 사이트의 옛 글자(잇소 · 업소)는 그 무렵 지면의 표기를 살린 것이오.', src: '우리역사넷 · 교과서', k: ['culture'] },
      { id: 'jeong', lane: 'era', y: '1936.8', m: 127, t: '동아일보 무기 정간', d: '1936년 8월, 손긔졍 선수 사진에서 가슴의 일장긔를 지운 일로 동아일보가 무기 정간되엇소.', rel: '신문이 「말할 수 업는 것」이 늘어가던 시대 — 죽첨정 때 신문이 쉽게 받아 적은 말과 견주어 보시압.', src: '동아일보 · 교과서', k: ['press'], go: 'sonkijeong/index.html' },
      { id: 'sino', lane: 'era', y: '1937.7', m: 138, t: '중일전쟁', d: '1937년 7월, 일제가 중국을 전면 침략햇소. 조선은 전시 체제로 묶이고, 이듬해 국가총동원법이 시행되오.', rel: '「경성의 밤」은 이 뒤로 더 길어지오.', src: '우리역사넷 · 교과서', k: ['war'] },
      { id: 'maria', lane: 'case', y: '1931.8', m: 67, t: '부산 마리아 참살사건', d: '부산 초량 철도국 관사에서 스무 살 조선인 가정부가 숨진 채 발견되엇소.', rel: '같은 시대, 신문이 「피해자」를 어떠케 불럿는지 함께 보시압.', src: '동아일보 1931', k: ['press'], go: 'maria/index.html' },
      { id: 'jk', lane: 'case', go: 'jukcheomjeong/index.html', y: '1933.5', m: 88, t: '죽첨정 사건', d: '죽첨정 삼정목 매립지에서 어린 아해의 머리가 발견되엇소. 이십삼 일 동안 신문은 엉뚱한 말들을 받아 적엇고, 진상은 미신이엇소.', rel: '지금 읽은 이 사건이오.', src: '동아일보 1933.5.17 ~ 6.8', k: ['city', 'press'], me: 1 },
      { id: 'sk', lane: 'case', y: '1936.8', m: 127, t: '손긔졍, 지워진 가슴', d: '베를린 마라톤 우승 사진에서 일장긔가 지워졋소. 그 대가로 신문이 멈추엇소.', rel: '받아 적던 신문이, 지우는 신문이 된 날이오.', src: '동아일보 1936.8.25', k: ['press'], go: 'sonkijeong/index.html' },
      { id: 'bb', lane: 'case', alt: 1, y: '1937.2', m: 133, t: '백백교 사건', d: '정간에서 도라온 신문이 쫏기 시작한 사교(邪敎) 사건이오.', rel: '미신과 불안이 사람을 어대까지 끌고 가는지 — 죽첨정과 나란히 읽어 보시압.', src: '동아일보 1937', k: ['city'], go: 'baekbaekgyo/index.html' }
    ],
    words: [
      { k: 'city', t: '일제 강점기 도시의 변화' },
      { k: 'war', t: '일제의 대륙 침략과 전시 체제' },
      { k: 'culture', t: '민족 문화 수호 운동' },
      { k: 'press', t: '언론 통제와 보도' }
    ],
    asks: [
      { q: '신문은 왜 확인도 안 된 「한 가족」을 범인처럼 썻을까?', h: ['경찰의 짐작을 그대로 받아 적은 것은 아닐까?', '독자의 눈길을 끄는 말이 먼저엿던 것은 아닐까?', '오늘의 「피의자 신상」 보도와 견주어 보시압.'] },
      { q: '첫 보도의 「문둥병 환자의 짓」이라는 짐작은, 누구에게 무슨 일을 만들엇을까?', h: ['걸인과 한센인 백여 명이 붓들렷다 풀려낫소 (6장 · 2장).', '편견이 담긴 말 한 마듸가 수사의 그물이 되엇소.'] },
      { q: '가튼 장 우의 사건 기사와 아래칸 광고를 함께 보면, 무엇이 보일까?', h: ['신문은 뉴스와 광고가 한 장에 실리는 매체요.', '그날 사람들은 무엇을 사고, 무엇을 두려워햇을까? (2장 오월 십칠일 지면 아래칸)'] }
    ],
    src: '고등학교 한국사 교과서 · 국사편찬위원회 「우리역사넷」에서 확인되는 내용만 적엇소.',
    ad: {
      img: 'assets/gwanggo/day/jk_19330517_band.jpg',
      date: '1933년 5월 17일 · 동아일보',
      cap: '죽첨정 사건이 처음 실린 오월 십칠일 지면, 그 맨 아래칸이오. 카메라 · 필름 광고와 「당선 사례」 광고가 열 칸 넘게 줄지어 잇소.',
      say: '가튼 장 우에선 범인을 쫓고, 아래에선 당선을 감사햇소.',
      go: 'shop.html#ad-jk-19330517',
      hot: { book: '#rBook', img: '19330517', top: .665, left: .015, w: .97, h: .325 }
    }
  };
  W.YK_ERA.jk.pre = 'jk'; W.YK_ERA.jk.ads = [['19330518', .74, .24], ['19330519', .82, .16], ['19330525', .76, .22], ['19330602', .78, .20], ['19330603', .78, .19]];

  /* 그해 신문이 할 수 잇던 말 — 연표 아래 줄 (교과서 · 우리역사넷에서 확인되는 줄기만) */
  W.YK_PRESS = {
    birth: { k: 'b', hj: '創刊', t: '신문이 생김', d: '조선말 민간 신문이 처음 나온 때요. 그러나 첫날부터 총독부의 검열을 받앗소.' },
    cen: { k: 'c', hj: '檢閱', t: '검열 아래', d: '기사는 인쇄 전에 검열을 받앗고, 걸리면 지워지거나(삭제) 신문이 거두어졋소(압수). 지면에 하얀 빈칸이 남기도 햇소.' },
    stop: { k: 's', hj: '停刊', t: '동아일보 정간', d: '1936년 8월, 일장긔 말소로 동아일보가 무기 정간되엇소. 이해 가을부터 동아일보 지면은 업소.' },
    back: { k: 'r', hj: '續刊', t: '속간 · 전시 체제', d: '1937년 6월 3일 동아일보가 다시 나왓소. 한 달 남짓 뒤 중일전쟁 — 지면은 전쟁을 실어야 햇소.' },
    end: { k: 'e', hj: '廢刊', t: '폐간', d: '1940년 8월, 동아일보 · 조선일보가 문을 닫앗소. 해방까지 조선말 민간 신문은 업섯소.' }
  };
  function pressOf(y) { y = +y; return y < 1921 ? 'birth' : y === 1936 ? 'stop' : y === 1937 ? 'back' : y >= 1940 ? 'end' : (y > 1937 ? 'back' : 'cen'); }

  /* 교과서 낱말 풀이 (고등학교 한국사 교과서 · 우리역사넷에서 확인되는 줄기만) */
  W.YK_WORDS = {
    city: { t: '일제 강점기 도시의 변화', d: '1920~30년대 경성에는 전차 · 백화점 · 라듸오 같은 근대 문물이 드러왓소. 그러나 그 혜택은 일본인이 많이 사는 남촌과 일부 계층에 몰렷고, 성 밧게는 움막에 사는 도시 빈민(토막민)이 늘엇소.', unit: '일제 강점기 사회 · 문화의 변화 — 근대 문물의 수용과 도시의 변화', tags: ['근대 문물', '남촌과 북촌', '토막민', '위생과 의료'] },
    war: { t: '일제의 대륙 침략과 전시 체제', d: '1931년 만주사변, 1937년 중일전쟁으로 일제는 대륙 침략을 넓혓소. 1938년 국가총동원법 뒤로 조선은 병참 기지가 되어, 사람과 물자가 전쟁에 동원되엇소.', unit: '일제의 침략 전쟁과 전시 동원 체제 — 민족 말살 통치', tags: ['만주사변', '중일전쟁', '국가총동원법', '병참 기지화'] },
    culture: { t: '민족 문화 수호 운동', d: '조선어학회는 1933년 「한글 맞춤법 통일안」을 발표하고, 표준어를 정하고, 우리말 사전을 만들려 햇소. 말과 글을 지키는 일이 곳 민족을 지키는 일이엇소.', unit: '민족 문화 수호 운동 — 조선어학회와 국학 운동', tags: ['조선어학회', '한글 맞춤법 통일안', '조선어학회 사건(1942)'] },
    press: { t: '언론 통제와 보도', d: '총독부는 신문을 미리 검열하고, 기사를 지우거나(삭제) 신문을 거두고(압수) 아예 멈추게(정간) 햇소. 1936년 일장긔 말소 사건으로 동아일보는 무기 정간되엇고, 1940년에는 동아일보 · 조선일보가 폐간되엇소.', unit: '민족 언론의 활동과 일제의 언론 통제', tags: ['검열', '삭제 · 압수 · 정간', '일장기 말소 사건', '1940년 폐간'] }
  };
  W.YK_ERA.jk.how = {
    city: '전차가 다니는 근대 도시 한복판에서, 아해의 병을 미신으로 고치려 한 일이 벌어졋소. 근대 의료는 가까이 잇섯지만 가난한 이들에겐 멀엇소.',
    war: '사건 두 해 전 만주사변 — 전쟁의 그림자가 깔리기 시작한 경성이오.',
    culture: '같은 해 가을 맞춤법 통일안이 나왓소. 이 지면의 옛 표기는 그 무렵 신문의 글자요.',
    press: '신문은 경찰의 짐작(「문둥병 환자의 짓」)과 한 가족의 혐의를 확인 업시 실엇소 — 통제 아래에서도 신문 스스로 퍼뜨린 말이 잇섯소.'
  };

  /* 다른 사건은 죽첨정의 연표(가튼 큰일 · 가튼 사건들)를 빌려 쓰되, 「이 사건과」 줄과 「지금 읽은 사건」만 바꿈 */
  function evFor(me, rel) {
    return W.YK_ERA.jk.ev.map(function (v) {
      var o = {}; for (var k in v) o[k] = v[k];
      o.me = v.id === me ? 1 : 0;
      if (o.me) o.rel = '지금 읽은 이 사건이오.';
      else if (rel[v.id]) o.rel = rel[v.id];
      return o;
    });
  }
  W.YK_ERA.sk = {
    year: 1936,
    lead: '우승의 기쁨이 지면을 덮고 — 곧 지면이 멈춘 해',
    ev: evFor('sk', {
      radio: '백림 마라손 중계는 신문사 스피커를 타고 세종로에 울렷소 (서장).',
      manchu: '침략 전쟁의 시대 — 조선 청년은 일장긔를 달고 뛰어야 햇소.',
      mkuk: '만주국이 선 지 네 해, 제국의 깃발은 경기장에도 걸렷소.',
      hangul: '「조선의 두 아들」을 우리말로 노래한 지면 — 우리말 신문이 아직 살아 잇든 때요.',
      jeong: '바로 이 사건의 대가요. 이백칠십팔 일 동안 지면이 멈추엇소 (5장).',
      sino: '정간이 풀린 지 한 달 남짓 — 전쟁이 시작되엇소.',
      maria: '다섯 해 전 — 신문이 한 녀자의 일홈을 어떠케 불럿는지 견주어 보시압.',
      jk: '세 해 전 — 신문이 경찰의 짐작을 그대로 받아 적든 사건이오.',
      bb: '신문이 도라온 해, 지면이 쫏은 사교 사건이오.'
    }),
    words: W.YK_ERA.jk.words,
    how: {
      city: '라듸오 중계가 세종로 신문사 스피커로 울렷소 — 근대 매체가 모은 군중이오.',
      war: '침략 전쟁의 시대, 조선 청년은 일장긔를 달고 뛰어야 햇소.',
      culture: '「조선의 두 아들」을 우리말 신문이 노래한 해 — 우리말 지면이 살아 잇든 때요.',
      press: '사진 한 장의 표지를 지운 대가로 신문이 이백칠십팔 일 멈추엇소 — 언론 통제가 가장 또렷이 보이는 사건이오.'
    },
    asks: [
      { q: '신문은 웨 사진에서 일장긔를 지웟을까? 그 대가는 무엇이엇나?', h: ['편집국 명부 — 끌려간 여덟, 물러난 셋 (4장).', '이백칠십팔 일의 정간 (5장).', '지운 것은 표지 하나엿지만, 멈춘 것은 신문 전체엿소.'] },
      { q: '「조선의 두 아들」이라 쓴 지면과, 그가 적은 서명 — 둘은 무엇을 말하려 햇을까?', h: ['6장 「일홈 · 그가 쓴 소속」을 다시 보시압.', '가슴의 표지는 남이 정햇고, 일홈은 그가 적엇소.'] },
      { q: '같은 장 우에선 조선의 아들을 노래하고, 아래칸은 일본말 광고가 채웟소. 함께 보면 무엇이 보일까?', h: ['1장 팔월 십이일 지면 맨 아래칸을 보시압.', '말과 글로 보는 식민지의 하로하로.'] }
    ],
    src: W.YK_ERA.jk.src,
    ad: {
      img: 'assets/gwanggo/day/sk_19360812_band.jpg',
      date: '1936년 8월 12일 · 동아일보',
      cap: '「조선의 두 아들」을 노래한 팔월 십이일 지면, 그 맨 아래칸이오. 일본말로 쓴 화장품 광고(「ユキワリソ」 · 「お顔ふき容器 進呈」)가 칸을 채웟소.',
      say: '가튼 장 우에선 조선의 아들을 노래하고, 아래칸은 일본말이 채웟소.',
      go: 'shop.html#ad-sk-19360812',
      hot: { book: '#rBook', img: '19360812p', top: .75, left: .01, w: .98, h: .245 }
    }
  };
  W.YK_ERA.sk.pre = 'sk'; W.YK_ERA.sk.ads = [['19360811', .76, .23], ['19360813', .82, .16]];
  W.YK_ERA.maria = {
    year: 1931,
    lead: '대륙 침략이 시작된 해 — 부산의 관사에서 한 조선인 녀자가 숨졋소',
    ev: evFor('maria', {
      radio: '신문과 라듸오 — 소식을 실어 나르는 매체가 늘던 시대요. 그 매체들이 숨진 녀자를 어떠케 불럿는지 보시압 (사회면 10).',
      manchu: '마리아가 숨진 지 한 달 반, 일홈 업는 투서가 경찰서에 날아들던 바로 그 구월이오.',
      mkuk: '해가 바뀌어도 범인은 업섯소. 그해 마지막 신문은 「삼 년째 미해결」이라 적엇소 (사회면 07).',
      hangul: '같은 해 가을 — 이노우에의 예심이 끗나던 무렵이오. 일홈이 어렵다 하야 「마리아」로 불린 그 녀자를 생각해 보시압.',
      jeong: '사건 다섯 해 뒤 — 신문이 말할 수 업는 것이 늘어 가던 때요.',
      sino: '전쟁이 커질수록, 지면에서 한 사람의 억울함은 더 작아졋소.',
      jk: '두 해 뒤 경성 — 신문이 또 한 번, 확인 업는 짐작을 받아 적엇소.',
      sk: '다섯 해 뒤 — 받아 적던 신문이 지우는 신문이 된 날이오.',
      bb: '여섯 해 뒤 — 정간에서 도라온 신문이 쫏은 사교 사건이오.'
    }),
    words: W.YK_ERA.jk.words,
    how: {
      city: '부산 초량의 철도국 관사 — 일본인 관리가 살고, 조선인 하녀가 그 집 일을 햇소. 식민지 도시의 위와 아래가 한 집 안에 잇섯소.',
      war: '사건 한 달 반 뒤 만주사변이 일어낫소. 해가 바뀐 1932년 마지막 신문에서, 이 사건은 「중요 사건」들 사이 작은 제목 하나로 남앗소.',
      culture: '일본인 주인들은 그 녀자의 일홈이 어렵다 하야 「마리아」라 불럿소. 제 일홈으로 불리지 못한 사람 — 말과 일홈을 지키려 한 운동과 견주어 보시압.',
      press: '범인은 찾지 못햇는데, 신문과 잡지는 숨진 녀자에게 「치정」이라는 말을 붙엿소. 법정의 판사 · 검사 · 피고 · 증인은 배석판사 한 명을 빼면 모두 일본인이엇소.'
    },
    asks: [
      { q: '범인은 끝내 업섯는데, 웨 숨진 녀자에게 「치정」이라는 말이 붙엇을까?', h: ['사회면 06 — 잡지가 적은 세 가지 짐작은 어느 것도 증명되지 안앗소.', '사회면 10 — 약한 사람이 사라지면, 세상은 범인보다 먼저 그 행실을 뭇소.', '오늘의 피해자 보도와 견주어 보시압.'] },
      { q: '일홈 업는 투서 두 통은 수사를 움직엿소. 신문은 그 투서를 어떠케 다루어야 햇을까?', h: ['사회면 04 — 목격담이엇는가, 꾸민 이약이엇는가.', '구월 십륙일 지면은 투서의 말을 실엇소 — 그러나 「주장」이엇소.', '확인되지 안은 말을 실을 때, 오늘의 신문은 무엇을 적는가?'] },
      { q: '판사 · 검사 · 피고 · 증인이 거의 모두 일본인이엇던 법정 — 조선인 하녀의 죽음은 공정하게 다루어졋을까?', h: ['사회면 08 방청석 · 사회면 09 판결을 다시 보시압.', '두 번의 재판, 두 번의 무죄 — 처벌바든 사람은 업섯소.'] }
    ],
    src: W.YK_ERA.jk.src,
    ad: {
      img: 'assets/gwanggo/day/mr_19310902_band.jpg',
      date: '1931년 9월 2일 · 동아일보',
      cap: '일홈 업는 투서가 수사를 다시 움직엿다는 구월 이일 지면, 그 맨 아래칸이오. 「박사의 약」 · 「후미나인」 같은 약 광고가 줄지어 잇소.',
      say: '가튼 장 우에선 범인을 다시 쫏고, 아래칸은 약을 팔앗소.',
      go: 'shop.html#ad-mr-19310902',
      hot: { book: '#rBook', img: '19310902', top: .795, left: .01, w: .98, h: .16 }
    }
  };
  W.YK_ERA.maria.ev.forEach(function (v) { if (v.id === 'maria') v.k = ['city', 'press', 'culture']; });
  W.YK_ERA.maria.pre = 'mr'; W.YK_ERA.maria.ads = [['19310813', .79, .19], ['19310916', .81, .17]];
  W.YK_ERA.bb = {
    year: 1937,
    lead: '전쟁이 시작된 해 — 멈추엇다 도라온 신문이 땅 속의 일을 쫏앗소',
    ev: evFor('bb', {
      radio: '소식을 실어 나르는 매체가 늘던 시대 — 그러나 닫힌 무리 안의 말은 바깥에 들리지 아넛소 (덧붙임 라듸오).',
      manchu: '전쟁의 시대가 열리던 무렵이오. 백백교는 신도들에게 「독립이 되는 날」의 벼슬을 약속하엿소 (제이장).',
      mkuk: '대륙 침략이 굳어지던 해요. 이 사건이 세상에 알려지기까지는 아즉 다섯 해가 남앗소.',
      hangul: '말과 글을 지키려 한 이들이 잇던 해 — 가튼 시절, 닫힌 무리 안의 일은 아모도 적지 못햇소.',
      jeong: '바로 이 정간 때문에, 동아일보는 백백교의 첫 소식을 싣지 못햇소. 첫 보도는 조선일보 호외엿소.',
      sino: '동아일보가 속간한 지 한 달 남짓 — 전쟁이 시작되엇소. 백백교 수사는 그 뒤로도 이어져, 삼백일 일 만에 송국되엇소.',
      maria: '여섯 해 전 부산 — 범인을 끗내 찾지 못한 사건이오.',
      jk: '네 해 전 경성 — 미신이 한 아해의 목숨을 앗아 간 사건이오.',
      sk: '바로 전 해 — 이 사건 때문에 동아일보가 멈추어, 백백교의 첫 소식을 실을 수 업섯소.'
    }),
    words: W.YK_ERA.jk.words,
    how: {
      city: '근대 도시 경성 바로 곁 왕십리에서 벌어진 일이오. 바친 만큼 「독립이 되는 날」의 벼슬을 약속하며 재산과 식구를 내노케 햇소.',
      war: '동아일보가 속간한 지 한 달 남짓 중일전쟁이 일어낫소. 십이월 십일일 지면 아래칸엔 총 멘 병사를 그린 광고가 실렷소 (보도 장).',
      press: '이월 십구일부터 사월 십이일까지 쉰세 날, 이 일은 어느 신문에도 실릴 수 업섯소. 동아일보는 정간 중이라 첫 소식을 놋쳣고, 류월 삼일 속간한 뒤에야 따라갓소.'
    },
    asks: [
      { q: '신도들은 웨 재산도, 식구도 내노앗을까?', h: ['제이장 장부 — 바친 만큼 「독립이 되는 날」의 벼슬을 약속하엿소.', '제삼장 한 집 — 식구를 흐터 살게 해, 떠날 수 업게 하엿소.', '오늘의 닫힌 무리와 견주어 보시압 (덧붙임 라듸오).'] },
      { q: '쉰세 날 동안 어느 신문도 이 일을 실을 수 업섯소. 보도가 막히면 무엇이 달라질까?', h: ['제오장 — 이월 십구일부터 사월 십이일까지의 침묵.', '그 사이 교주는 이미 산에 누워 잇섯소.', '알 권리와 수사 — 오늘은 어떠케 하는가?'] },
      { q: '가튼 장 우에선 사교의 죄상을, 아래칸에선 전쟁과 돈벌이를 팔앗소. 함께 보면 무엇이 보일까?', h: ['보도 장 십이월 십일일 지면 맨 아래칸을 보시압.', '「利殖の道(돈 불리는 길)」 광고와, 재산을 바치게 한 장부를 견주어 보시압.'] }
    ],
    src: W.YK_ERA.jk.src,
    ad: {
      img: 'assets/gwanggo/day/bb_19371211_band.jpg',
      date: '1937년 12월 11일 · 동아일보',
      cap: '「살인교서 수 완성」 — 백백교 수사가 송치에 이른 십이월 십일일 지면, 그 맨 아래칸이오. 총 멘 병사를 그린 광고와 「利殖の道(돈 불리는 길)」 · 약 · 시계 광고가 빽빽하오.',
      say: '가튼 장 우에선 사교의 죄상을, 아래칸에선 전쟁과 돈벌이를 팔앗소.',
      go: 'shop.html#ad-bb-19371211',
      hot: { book: '#rBook', img: '19371211', top: .675, left: .01, w: .98, h: .28 }
    }

  };
  W.YK_ERA.bb.ev.forEach(function (v) { if (v.id === 'bb') v.k = ['city', 'press', 'war']; });
  W.YK_ERA.bb.pre = 'bb'; W.YK_ERA.bb.ads = [['19370609', .77, .21], ['19370923', .665, .31], ['19371017', .74, .23], ['19371117', .73, .25]];

  var BASE = (function () { try { var c = D.currentScript && D.currentScript.src; return c ? c.replace(/yk-era\.js.*$/, '') : ''; } catch (e) { return ''; } })();
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  /* 1016 · 마우스를 올리면 오늘 말로 — 새로 쓴 해설 글도 지면의 다른 글처럼 (각 사건 스크립트의 .hj[data-ko] 처리를 그대로 씀) */
  /* 옛 표기 → 오늘 표기 (경성야록이 새로 쓴 해설 글에만 씀) */
  function ykKo(s) {
    if (!s) return s;
    if (ykKo.fix && ykKo.fix[s]) return ykKo.fix[s];
    var R = [
      // 낱말
      [/일홈/g,'이름'],[/아해/g,'아이'],[/녀자/g,'여자'],[/이약이/g,'이야기'],[/가튼/g,'같은'],[/가티/g,'같이'],[/(?<!노)우에/g,'위에'],[/우의/g,'위의'],
      [/밧게/g,'밖에'],[/밧긔/g,'밖의'],[/긔록/g,'기록'],[/긔자/g,'기자'],[/긔사/g,'기사'],[/일장긔/g,'일장기'],[/손긔졍/g,'손기정'],[/손긔정/g,'손기정'],[/윤전긔/g,'윤전기'],[/긔/g,'기'],
      [/라듸오/g,'라디오'],[/다이알/g,'다이얼'],[/백림/g,'베를린'],[/마라손/g,'마라톤'],[/어대/g,'어디'],[/차저/g,'찾아'],[/차즈/g,'찾으'],[/도라/g,'돌아'],[/붓들/g,'붙들'],[/붓잡/g,'붙잡'],
      [/아즉/g,'아직'],[/하야/g,'하여'],[/적든/g,'적던'],[/내노케/g,'내놓게'],[/내노앗/g,'내놓았'],[/흐터/g,'흩어'],[/업게/g,'없게'],[/아모/g,'아무'],[/곳 /g,'곧 '],[/바든/g,'받은'],[/할 수 잇던/g,'할 수 있던'],[/끗/g,'끝'],[/마듸/g,'마디'],[/하로/g,'하루'],[/놋친/g,'놓친'],[/놋쳣/g,'놓쳤'],[/넛고/g,'넣고'],[/너헛/g,'넣었'],[/맛고/g,'맞고'],[/맛나/g,'만나'],[/쫏/g,'쫓'],[/쪼차/g,'쫓아'],
      [/싯지/g,'싣지'],[/(?<!대)륙/g,'육'],[/류월/g,'유월'],[/리유/g,'이유'],[/드러(?=[왓와가갈])/g,'들어'],[/쳣/g,'쳤'],[/내주오/g,'내줘요'],[/뜨더/g,'뜯어'],[/깨여/g,'깨어'],[/알앗/g,'알았'],[/몰랏/g,'몰랐'],[/돌려보냇/g,'돌려보냈'],
      [/불럿/g,'불렀'],[/뭇소/g,'묻소'],[/붙엿/g,'붙였'],[/엿소/g,'였소'],[/잇섯/g,'있었'],[/업섯/g,'없었'],[/업시/g,'없이'],[/업는/g,'없는'],[/업소/g,'없소'],[/업다/g,'없다'],[/업고/g,'없고'],
      [/잇(?=[소는던든다고으을지어기])/g,'있'],[/안앗/g,'않았'],[/아넛/g,'않았'],[/안은/g,'않은'],[/안소/g,'않소'],[/안슴/g,'않습'],[/안코/g,'않고'],
      // ㅅ받침 과거형 → ㅆ
      [/햇(?!살|빛)/g,'했'],[/(?<!무)엇(?!갈)/g,'었'],[/엿(?!장)/g,'였'],[/(?<!빼)앗(?!아 )/g,'았'],[/셧/g,'셨'],[/(?<![다여])섯/g,'섰'],[/(?<!또)렷/g,'렸'],[/웟/g,'웠'],[/혓/g,'혔'],[/졋/g,'졌'],[/켯/g,'켰'],[/냇/g,'냈'],[/왓/g,'왔'],[/갓소/g,'갔소'],[/봣/g,'봤'],[/텃/g,'텼'],[/겟/g,'겠'],[/찻/g,'찼'],[/낫(?=소|다|고)/g,'났'],[/맛(?=소|다)/g,'맞'],
      // 하오체 → 해요체
      [/하시압/g,'하세요'],[/보시압/g,'보세요'],[/시압/g,'세요'],[/드시오/g,'드세요'],[/으시오/g,'으세요'],[/하시오/g,'하세요'],[/보시오/g,'보세요'],[/주시오/g,'주세요'],[/시오(?=[.\s」]|$)/g,'세요'],
      [/있소/g,'있어요'],[/없소/g,'없어요'],[/했소/g,'했어요'],[/었소/g,'었어요'],[/였소/g,'였어요'],[/았소/g,'았어요'],[/겠소/g,'겠어요'],[/셨소/g,'셨어요'],[/섰소/g,'섰어요'],[/렸소/g,'렸어요'],[/졌소/g,'졌어요'],[/냈소/g,'냈어요'],[/왔소/g,'왔어요'],[/갔소/g,'갔어요'],[/봤소/g,'봤어요'],[/찼소/g,'찼어요'],[/났소/g,'났어요'],[/켰소/g,'켰어요'],[/맞소/g,'맞아요'],[/묻소/g,'물어요'],[/않소/g,'않아요'],
      [/읽소/g,'읽어요'],[/같소/g,'같아요'],[/찍소/g,'찍어요'],[/남소/g,'남아요'],[/받소/g,'받아요'],[/잡히오/g,'잡혀요'],[/되오/g,'돼요'],[/하오/g,'해요'],[/보이오/g,'보여요'],[/나오(?=[.\s,」]|$)/g,'나와요'],[/다르오/g,'달라요'],[/내오(?=[.\s]|$)/g,'내요'],[/가오/g,'가요'],[/보오/g,'봐요'],[/펴오/g,'펴요'],[/두오/g,'둬요'],[/맡기오/g,'맡겨요'],[/열리오/g,'열려요'],[/붙소/g,'붙어요'],
      [/([가-힣])이오(?=[.?,\s」—)]|$)/g, function (m, c) { return c + ((c.charCodeAt(0) - 0xAC00) % 28 ? '이에요' : '예요'); }],
      [/([가-힣])소(?=[.\s,」)—(]|$)/g, function (m, c) { return ((c.charCodeAt(0) - 0xAC00) % 28 === 20) ? c + '어요' : m; }],[/기었는가/g,'기였는가'],
      [/(있|었|였|했|하)든(?=[ ,])/g,'$1던'],[/이엇는가/g,'이었는가'],[/어떠케/g,'어떻게'],[/그러케/g,'그렇게'],[/이러케/g,'이렇게'],[/웨 /g,'왜 ']
    ];
    R.forEach(function (r) { s = s.replace(r[0], r[1]); });
    return s;
  }
  ykKo.fix = { '이 사이트의 옛 글자(잇소 · 업소)는 그 무렵 지면의 표기를 살린 것이오.': '이 사이트의 옛 글자(잇소 · 업소)는 그 무렵 지면의 표기를 살린 거예요.' };
  W.ykKo = ykKo;
  function T(t, inBtn) { t = String(t == null ? '' : t); var m = ykKo(t); return m === t ? esc(t) : '<span class="hj"' + (inBtn ? '' : ' tabindex="0"') + ' data-ko="' + esc(m) + '">' + esc(t) + '</span>'; }
  function css() {
    if (D.getElementById('yke-css')) return;
    var s = D.createElement('style'); s.id = 'yke-css';
    s.textContent = [
      '.yke{max-width:1180px;margin:70px auto 10px;padding:0 clamp(16px,4vw,40px);color:#1d1813;font-family:"Nanum Myeongjo","Noto Serif KR",serif}',
      '.yke-h{display:flex;align-items:center;gap:12px;border-bottom:1px solid #3a3128;padding-bottom:10px;margin-bottom:18px}',
      '.yke-h b{font:800 12px/1 "Nanum Myeongjo",serif;letter-spacing:.3em;color:#efe6d2;background:#1d1813;padding:7px 9px 7px 11px}',
      '.yke-h span{font:800 17px/1.3 "Nanum Myeongjo",serif;letter-spacing:.12em}',
      '.yke-g{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.15fr);gap:24px;align-items:start}',
      '.yke-c{position:relative;background:#f3ecdc;padding:22px 22px 18px;box-shadow:0 2px 0 rgba(58,49,40,.2),0 14px 30px rgba(40,30,20,.16)}',
      '.yke-c:after{content:"";position:absolute;inset:7px;border:1px solid rgba(58,49,40,.22);pointer-events:none}',
      '.yke-k{display:flex;flex-wrap:wrap;justify-content:space-between;gap:6px 10px;align-items:baseline;font:500 11px/1 "Noto Sans KR",sans-serif;letter-spacing:.32em;color:#8a2a21}',
      '.yke-k i{font-style:normal;letter-spacing:.1em;color:#7b7062}',
      '.yke-c h3{margin:10px 0 14px;font:800 20px/1.45 "Nanum Myeongjo",serif;word-break:keep-all}',
      '.yke-line{list-style:none;position:relative;margin:0 0 16px;padding-left:18px}',
      '.yke-line:before{content:"";position:absolute;left:5px;top:6px;bottom:6px;width:1px;background:rgba(58,49,40,.45)}',
      '.yke-line li{position:relative;display:grid;grid-template-columns:62px 1fr;gap:10px;padding:6px 0;font:400 14px/1.6 "Nanum Myeongjo",serif;color:#3e352c;word-break:keep-all}',
      '.yke-line li:before{content:"";position:absolute;left:-17px;top:12px;width:9px;height:9px;border-radius:50%;background:#efe6d2;border:1px solid #3a3128}',
      '.yke-line li b{font:700 12.5px/1.8 "Noto Sans KR",sans-serif;letter-spacing:.04em;color:#7b7062}',
      '.yke-line li.me{color:#1d1813;font-weight:800}',
      '.yke-line li.me:before{background:#8a2a21;border-color:#8a2a21}',
      '.yke-line li.me b{color:#8a2a21}',
      '.yke-w{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:14px}',
      '.yke-w em{font:500 12px/1 "Noto Sans KR",sans-serif;font-style:normal;padding:6px 9px;border:1px solid rgba(58,49,40,.5);color:#3e352c}',
      '.yke-w small{width:100%;font:500 10.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.3em;color:#7b7062;margin-bottom:2px}',
      '.yke-q{padding:12px 14px;border-left:3px solid #8a2a21;background:rgba(138,42,33,.06);font:700 14.5px/1.7 "Nanum Myeongjo",serif;word-break:keep-all}',
      '.yke-q small{display:block;font:500 10.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.3em;color:#8a2a21;margin-bottom:7px}',
      '.yke-s{margin-top:12px;font:400 11.5px/1.6 "Noto Sans KR",sans-serif;color:#7b7062}',
      '.yke-ad figure{margin:0}',
      '.yke-ad .im{display:block;border:1px solid #3a3128;background:#e9dfc9;overflow:hidden}',
      '.yke-ad img{display:block;width:100%;height:auto;filter:sepia(.18) contrast(1.04);transition:transform .8s cubic-bezier(.2,.7,.2,1)}',
      '.yke-ad .im:hover img{transform:scale(1.03)}',
      '.yke-ad figcaption{margin-top:12px;font:400 14px/1.8 "Nanum Myeongjo",serif;color:#3e352c;word-break:keep-all}',
      '.yke-ad figcaption b{display:block;font:700 15.5px/1.6 "Nanum Myeongjo",serif;color:#1d1813;margin-top:4px}',
      '.yke-go{display:inline-flex;margin-top:14px;padding:10px 16px;background:#1d1813;color:#efe6d2;text-decoration:none;font:700 14px/1 "Nanum Myeongjo",serif;letter-spacing:.08em}',
      '.yke-go:hover{background:#3a3027}',
      '.yke{margin:30px auto 60px}',
      '.yke-era{display:grid;grid-template-columns:minmax(0,1.1fr) minmax(0,1fr);gap:34px;padding:6px 0 4px}',
      '.yke-era h3{margin:8px 0 14px;font:800 19px/1.45 "Nanum Myeongjo",serif;word-break:keep-all}',
      '.yke-adwrap{max-width:820px;margin:34px auto 6px}',
      '.yke-adwrap .yke-k i{display:none}',
      '.yke-hot{position:absolute;z-index:8;pointer-events:none;border:1.5px dashed #8a2a21;transition:background .3s}',
      '.yke-hot.hv{background:rgba(138,42,33,.06)}',
      '.yke-hot:before{content:"\\2702";position:absolute;right:14px;top:-12px;padding:0 3px;background:#efe6d2;font:400 19px/1 serif;color:#8a2a21;transform:scaleX(-1);transition:transform .45s cubic-bezier(.3,1.4,.5,1)}',
      '.yke-hot button{all:unset;pointer-events:auto;position:absolute;left:0;top:-1px;transform:translateY(-100%);padding:4px 9px 3px;background:#8a2a21;color:#f3ecdc;font:500 10.5px/1.25 "Noto Sans KR",sans-serif;letter-spacing:.12em;white-space:nowrap;cursor:pointer;opacity:.92;transition:opacity .3s}',
      '.yke-hot.hv:before{transform:scaleX(-1) translateX(-10px) rotate(-8deg)}',
      '.yke-hot button:hover,.yke-hot button:focus-visible{opacity:1}',
      '#ykeAd{position:fixed;inset:0;z-index:300;background:rgba(12,9,6,.82);display:flex;align-items:center;justify-content:center;padding:4vh 16px;opacity:0;pointer-events:none;transition:opacity .35s}',
      '#ykeAd.on{opacity:1;pointer-events:auto}',
      '#ykeAd .ya-box{position:relative;width:min(1100px,100%);max-height:92vh;overflow:auto;background:#ece2cb;padding:22px 24px 20px;box-shadow:0 30px 80px #000}',
      '#ykeAd .ya-box:after{content:"";position:absolute;inset:7px;border:1px solid rgba(58,49,40,.3);pointer-events:none}',
      '#ykeAd .ya-x{position:absolute;right:16px;top:14px;z-index:1;border:0;background:none;font:500 12.5px "Noto Sans KR",sans-serif;letter-spacing:.1em;color:#5a5046;cursor:pointer}',
      '#ykeAd .ya-k{font:500 11.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.3em;color:#8a2a21;margin-bottom:12px}',
      '#ykeAd .ya-im{border:1px solid #3a3128}#ykeAd .ya-im img{display:block;width:100%;height:auto;filter:sepia(.15)}',
      '#ykeAd .ya-cap{margin-top:12px;font:400 14.5px/1.8 "Nanum Myeongjo",serif;color:#3e352c;word-break:keep-all}',
      '#ykeAd .ya-say{margin-top:2px;font:800 16px/1.6 "Nanum Myeongjo",serif;color:#1d1813}',
      '.yt-lead{margin:4px 0 22px;font:800 19px/1.5 "Nanum Myeongjo",serif;word-break:keep-all}',
      '.yt-lead b{color:#8a2a21;margin-right:6px}.yt-lead small{font:400 12px "Noto Sans KR",sans-serif;color:#7b7062;margin-left:4px}',
      '.yt{position:relative;padding:4px 0 2px 150px;user-select:none}',
      '.yt-lane{position:relative;height:58px}',
      '.yt-lane em{position:absolute;left:-150px;top:50%;transform:translateY(-50%);width:136px;font:500 11.5px/1.3 "Noto Sans KR",sans-serif;font-style:normal;letter-spacing:.12em;color:#7b7062}',
      '.yt-lane.case em{color:#8a2a21}',
      '.yt-ruler{position:relative;height:26px;border-top:1px solid #3a3128;border-bottom:1px solid rgba(58,49,40,.35)}',
      '.yt-ruler i{position:absolute;top:0;height:100%;border-left:1px solid rgba(58,49,40,.3)}',
      '.yt-ruler i b{position:absolute;left:5px;top:6px;font:500 11px/1 "Noto Sans KR",sans-serif;color:#5a5046;letter-spacing:.04em}',
      '.yt-dot{position:absolute;top:50%;width:16px;height:16px;margin:-8px 0 0 -8px;padding:0;border-radius:50%;border:1.5px solid #3a3128;background:#efe6d2;cursor:pointer;transition:transform .25s,background .25s,box-shadow .25s,opacity .3s}',
      '.yt-dot.case{border-color:#8a2a21}',
      '.yt-dot span{position:absolute;left:50%;transform:translateX(-50%);white-space:nowrap;font:600 11.5px/1.2 "Noto Sans KR",sans-serif;color:#3e352c;pointer-events:none;letter-spacing:.02em}',
      '.yt-lane.case .yt-dot span{bottom:calc(100% + 6px)}.yt-lane.era .yt-dot span{top:calc(100% + 6px)}',
      '.yt-lane.case .yt-dot.alt span{bottom:auto;top:calc(100% + 5px)}.yt-lane.era .yt-dot.alt span{top:auto;bottom:calc(100% + 5px)}',
      '.yt-dot:hover,.yt-dot:focus-visible{transform:scale(1.25);outline:none;box-shadow:0 0 0 4px rgba(138,42,33,.15)}',
      '.yt-dot.me{background:#8a2a21}.yt-dot.me span{color:#8a2a21;font-weight:800}',
      '.yt-dot.on{background:#1d1813;border-color:#1d1813;box-shadow:0 0 0 5px rgba(29,24,19,.15)}.yt-dot.on span{color:#1d1813;font-weight:800}',
      '.yke.filter .yt-dot:not(.lit){opacity:.25}.yke.filter .yt-dot.lit{box-shadow:0 0 0 5px rgba(138,42,33,.22)}',
      '.yt-body{display:grid;grid-template-columns:minmax(0,1.15fr) minmax(0,1fr);gap:30px;margin-top:26px}',
      '.yt-card{border-top:2px solid #1d1813;padding:14px 2px 0}',
      '.yt-card.in{animation:ytIn .45s ease}@keyframes ytIn{from{opacity:.25;transform:translateY(4px)}to{opacity:1;transform:none}}',
      '.yt-k{display:flex;justify-content:space-between;font:500 11px/1 "Noto Sans KR",sans-serif;letter-spacing:.3em;color:#8a2a21}.yt-k i{font-style:normal;letter-spacing:.06em;color:#5a5046}',
      '.yt-card h4{margin:10px 0 8px;font:800 21px/1.4 "Nanum Myeongjo",serif}',
      '.yt-d{font:400 15px/1.9 "Nanum Myeongjo",serif;color:#2b2219;word-break:keep-all}',
      '.yt-rel{margin-top:12px;padding:10px 12px;background:rgba(29,24,19,.05);font:700 14px/1.75 "Nanum Myeongjo",serif;word-break:keep-all}',
      '.yt-rel small{display:block;font:500 10.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.3em;color:#7b7062;margin-bottom:6px}',
      '.yt-f{display:flex;justify-content:space-between;gap:10px;flex-wrap:wrap;margin-top:10px;font:400 11.5px/1.6 "Noto Sans KR",sans-serif;color:#7b7062}',
      '.yt-f a{color:#8a2a21;text-decoration:none;border-bottom:1px solid rgba(138,42,33,.4);font-weight:500}',
      '.yt-word{font:500 12px/1 "Noto Sans KR",sans-serif;padding:7px 10px;border:1px solid rgba(58,49,40,.5);background:none;color:#3e352c;cursor:pointer;transition:background .2s,color .2s}',
      '.yt-word:hover{background:rgba(29,24,19,.06)}.yt-word.on{background:#1d1813;color:#efe6d2;border-color:#1d1813}',
      '.yt-asks{margin-top:4px}.yt-asks>small{display:block;font:500 10.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.3em;color:#8a2a21;margin-bottom:8px}',
      '.yt-asks details{border-top:1px solid rgba(58,49,40,.3)}.yt-asks details:last-child{border-bottom:1px solid rgba(58,49,40,.3)}',
      '.yt-asks summary{list-style:none;cursor:pointer;padding:11px 26px 11px 2px;position:relative;font:700 14.5px/1.65 "Nanum Myeongjo",serif;word-break:keep-all}',
      '.yt-asks summary::-webkit-details-marker{display:none}',
      '.yt-asks summary:after{content:"＋";position:absolute;right:4px;top:11px;font:400 14px "Noto Sans KR",sans-serif;color:#8a2a21}',
      '.yt-asks details[open] summary:after{content:"－"}',
      '.yt-asks ul{list-style:none;margin:0 0 12px;padding:0 0 0 14px;border-left:2px solid #8a2a21}',
      '.yt-asks li{font:400 13.5px/1.8 "Nanum Myeongjo",serif;color:#4a4036;word-break:keep-all}',
      '.yg-lead{margin:2px 0 18px;font:400 15.5px/1.85 "Nanum Myeongjo",serif;color:#3e352c;word-break:keep-all}.yg-lead b{color:#8a2a21}.yg-lead small{display:block;font:500 11.5px "Noto Sans KR",sans-serif;color:#7b7062;margin-top:2px;letter-spacing:.06em}',
      '.yg-ruler{position:relative;margin:0 0 20px;height:78px}',
      '.yg-ruler:before{content:"";position:absolute;left:15px;right:15px;top:24px;height:2px;background:#3a3128}',
      '.yg-ruler input{position:absolute;left:0;right:0;top:6px;width:100%;margin:0;z-index:3;-webkit-appearance:none;appearance:none;background:transparent;height:36px;cursor:grab}',
      '.yg-ruler input::-webkit-slider-runnable-track{height:36px;background:transparent}',
      '.yg-ruler input::-webkit-slider-thumb{-webkit-appearance:none;width:30px;height:30px;margin-top:3px;border-radius:2px;background:#1d1813;box-shadow:0 0 0 3px #efe6d2,0 0 0 4px #1d1813,0 4px 10px rgba(0,0,0,.3);cursor:grab}',
      '.yg-ruler input::-moz-range-track{height:36px;background:transparent}.yg-ruler input::-moz-range-thumb{width:26px;height:26px;border-radius:2px;background:#1d1813;border:3px solid #efe6d2}',
      '.yg-ruler input:active{cursor:grabbing}',
      '.yg-ticks{position:absolute;left:0;right:0;top:0;height:100%}',
      '.yg-ticks button{all:unset;position:absolute;top:18px;transform:translateX(-50%);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;z-index:4;font:600 13px/1 "Noto Sans KR",sans-serif;color:#7b7062;letter-spacing:.04em;transition:color .2s}',
      '.yg-ticks button i{display:block;width:12px;height:12px;border-radius:50%;background:#efe6d2;border:1.5px solid #3a3128;margin-bottom:12px}',
      '.yg-ticks button.me i{background:#8a2a21;border-color:#8a2a21}',
      '.yg-ticks button:hover{color:#1d1813}.yg-ticks button.on{color:#1d1813}.yg-ticks button.on b{box-shadow:inset 0 -2px 0 #8a2a21;padding-bottom:3px}',
      '.yg-ticks button.on i{visibility:hidden}',
      '.yg-ticks button small{font:500 10px/1 "Noto Sans KR",sans-serif;color:#8a2a21;letter-spacing:.1em}',
      '.yg-paper{position:relative;background:#f4ecda;padding:18px 22px 22px;box-shadow:0 2px 0 rgba(58,49,40,.25),0 18px 40px rgba(40,30,20,.18);background-image:repeating-linear-gradient(0deg,rgba(60,45,30,.035) 0 1px,transparent 1px 3px)}',
      '.yg-paper:after{content:"";position:absolute;inset:8px;border:1px solid rgba(58,49,40,.28);pointer-events:none}',
      '.yg-press{position:relative;height:84px;margin:4px 0 24px;padding-top:4px;border-top:1px dashed rgba(58,49,40,.3)}',
      '.yg-press:before{content:"";position:absolute;left:15px;right:15px;top:42px;height:7px;background:linear-gradient(90deg,#3a3128,#3a3128 30%,rgba(58,49,40,.55) 62%,rgba(58,49,40,.15) 92%,transparent);clip-path:polygon(0 0,100% 40%,100% 60%,0 100%)}',
      '.yg-press .pl{position:absolute;left:0;top:8px;font:500 10px/1 "Noto Sans KR",sans-serif;letter-spacing:.3em;color:#7b7062}',
      '.yg-press button{all:unset;position:absolute;top:28px;transform:translateX(-50%);cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:5px;z-index:2}',
      '.yg-press button b{display:block;padding:7px 9px 6px;font:800 14px/1 "Nanum Myeongjo",serif;letter-spacing:.12em;background:#efe6d2;color:#1d1813;border:1px solid #3a3128;transition:transform .25s}',
      '.yg-press button small{font:500 11px/1 "Noto Sans KR",sans-serif;color:#7b7062;white-space:nowrap;letter-spacing:.02em}',
      '.yg-press button:hover b,.yg-press button.on b{transform:translateY(-2px)}',
      '.yg-press button.on small{color:#1d1813;font-weight:700}',
      '.yg-press .p-c b{position:relative;color:rgba(29,24,19,.55)}.yg-press .p-c b:after{content:"";position:absolute;left:52%;right:5px;top:30%;height:45%;background:#1d1813}',
      '.yg-press .p-s b{background:transparent;color:#8a2a21;border:1.5px solid #8a2a21;transform:rotate(-4deg)}.yg-press .p-s:hover b,.yg-press .p-s.on b{transform:rotate(-4deg) translateY(-2px)}',
      '.yg-press .p-e b{background:#1d1813;color:#efe6d2;clip-path:polygon(0 0,100% 0,96% 30%,100% 55%,94% 80%,100% 100%,0 100%)}',
      '.yg-pn{display:flex;gap:10px;align-items:baseline;margin:-6px 0 16px;padding:8px 10px;background:rgba(58,49,40,.06);font:400 13px/1.7 "Noto Sans KR",sans-serif;color:#3e352c;word-break:keep-all}',
      '.yg-pn b{flex:none;font:800 11.5px/1 "Nanum Myeongjo",serif;letter-spacing:.14em;padding:5px 6px 4px;border:1px solid #3a3128}',
      '.yg-pn.p-s b{color:#8a2a21;border-color:#8a2a21}.yg-pn.p-e b{background:#1d1813;color:#efe6d2}@media (max-width:600px){.yg-press{height:auto;display:flex;flex-wrap:wrap;gap:8px 6px;padding:26px 0 4px}.yg-press:before{display:none}.yg-press .pl{top:6px}.yg-press button{position:static;transform:none!important;left:auto!important}.yg-press button small{display:none}.yg-press button b{padding:6px 8px 5px;font-size:13px}}',
      '.yg-end{margin-top:14px;padding:16px 4px 4px;border-top:3px double #3a3128;font:800 17px/1.7 "Nanum Myeongjo",serif;word-break:keep-all}',
      '.yg-end small{display:block;margin-top:6px;font:400 13px/1.7 "Noto Sans KR",sans-serif;color:#7b7062}',
      '.yg-mast{display:flex;align-items:baseline;justify-content:space-between;gap:12px;border-bottom:3px double #3a3128;padding-bottom:8px;margin-bottom:16px;flex-wrap:wrap}',
      '.yg-ed{font:500 11px/1 "Noto Sans KR",sans-serif;letter-spacing:.36em;color:#7b7062}',
      '.yg-year{font:900 34px/1 "Noto Serif KR",serif;letter-spacing:.18em;color:#1d1813}',
      '.yg-date{font:500 11.5px/1 "Noto Sans KR",sans-serif;color:#5a5046;letter-spacing:.06em}',
      '.yg-page{display:grid;grid-template-columns:minmax(0,1.5fr) minmax(0,1fr);gap:0}',
      '.yg-page.turn{animation:ygT .55s cubic-bezier(.3,.7,.2,1)}@keyframes ygT{from{opacity:0;transform:translateX(14px)}to{opacity:1;transform:none}}',
      '.yg-main{padding-right:20px;border-right:1px solid rgba(58,49,40,.4)}.yg-side{padding-left:20px}',
      '.yg-art{padding:0 0 14px;margin-bottom:14px;border-bottom:1px solid rgba(58,49,40,.25)}.yg-art:last-child{border-bottom:0;margin-bottom:0}',
      '.yg-k{font:500 10.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.24em;color:#8a2a21}',
      '.yg-art h4{margin:8px 0 8px;font:900 20px/1.35 "Noto Serif KR",serif;letter-spacing:.01em;color:#1d1813;word-break:keep-all}',
      '.yg-art.big h4{font-size:30px;line-height:1.25}',
      '.yg-art.me h4{color:#8a2a21}',
      '.yg-d{font:400 14.5px/1.85 "Nanum Myeongjo",serif;color:#2b2219;word-break:keep-all}',
      '.yg-art.big .yg-d{font-size:15.5px}',
      '.yg-rel{margin-top:10px;padding:9px 12px;border-left:3px solid #8a2a21;background:rgba(138,42,33,.06);font:700 13.5px/1.7 "Nanum Myeongjo",serif;word-break:keep-all}',
      '.yg-f{display:flex;justify-content:space-between;gap:8px;flex-wrap:wrap;margin-top:8px;font:400 11px/1.6 "Noto Sans KR",sans-serif;color:#7b7062}',
      '.yg-f a{color:#8a2a21;text-decoration:none;border-bottom:1px solid rgba(138,42,33,.4);font-weight:500}.yg-f em{font-style:normal;color:#8a2a21}',
      '.yg-none{font:400 13.5px/1.8 "Nanum Myeongjo",serif;color:#7b7062;padding:6px 0 14px}',
      '.yg-stamp{margin-top:6px;display:flex;flex-wrap:wrap;gap:6px}.yg-stamp small{width:100%;font:500 10.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.24em;color:#7b7062;margin-bottom:2px}',
      '.yg-stamp span{font:600 12px/1 "Noto Sans KR",sans-serif;padding:6px 9px;border:1.5px solid #8a2a21;color:#8a2a21;transform:rotate(-1.5deg)}',
      '.yg-text{grid-column:1/-1;margin-top:18px;padding-top:14px;border-top:3px double #3a3128}',
      '.yg-th{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:10px}.yg-th b{font:800 11.5px/1 "Nanum Myeongjo",serif;letter-spacing:.3em;color:#f3ecdc;background:#8a2a21;padding:6px 8px 6px 10px}.yg-th span{font:500 12px "Noto Sans KR",sans-serif;color:#5a5046;letter-spacing:.04em}',
      '.yg-tabs{display:flex;flex-wrap:wrap;gap:6px;margin-bottom:12px}',
      '.yg-tabs button{all:unset;cursor:pointer;font:600 12.5px/1 "Noto Sans KR",sans-serif;padding:8px 11px;border:1.5px solid #8a2a21;color:#8a2a21;transform:rotate(-1deg);transition:background .2s,color .2s}',
      '.yg-tabs button:hover{background:rgba(138,42,33,.08)}.yg-tabs button.on{background:#8a2a21;color:#f3ecdc;transform:none}',
      '.yg-tx dl{display:grid;grid-template-columns:110px 1fr;gap:9px 16px;margin:0}',
      '.yg-tx.in{animation:ygT .45s ease}',
      '.yg-tx dt{font:500 10.5px/1.9 "Noto Sans KR",sans-serif;letter-spacing:.2em;color:#7b7062;padding-top:2px}',
      '.yg-tx dd{margin:0;font:400 14.5px/1.85 "Nanum Myeongjo",serif;color:#2b2219;word-break:keep-all}',
      '.yg-tx dd.hw{font-weight:700;padding:6px 10px;border-left:3px solid #8a2a21;background:rgba(138,42,33,.06)}',
      '.yg-tx dd.tg{display:flex;flex-wrap:wrap;gap:6px}.yg-tx dd.tg span{font:500 12px/1 "Noto Sans KR",sans-serif;padding:6px 9px;background:rgba(29,24,19,.07);color:#3e352c}',
      '@media (max-width:860px){.yg-tx dl{grid-template-columns:1fr;gap:2px}.yg-tx dt{margin-top:8px}}',
      '.yg-post{margin-top:30px;border-top:2px solid #1d1813;padding-top:14px}',
      '.yg-ph{display:flex;align-items:center;gap:12px;flex-wrap:wrap;margin-bottom:12px}.yg-ph b{font:800 12px/1 "Nanum Myeongjo",serif;letter-spacing:.3em;color:#efe6d2;background:#8a2a21;padding:7px 9px 7px 11px}.yg-ph span{font:700 15px/1.4 "Nanum Myeongjo",serif}',
      '.yg-qs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px;margin-bottom:14px}',
      '.yg-qs button{all:unset;cursor:pointer;padding:11px 12px;border:1px solid rgba(58,49,40,.45);font:700 13.5px/1.6 "Nanum Myeongjo",serif;color:#3e352c;word-break:keep-all;transition:background .2s,color .2s}',
      '.yg-qs button i{display:block;font:500 10.5px/1 "Noto Sans KR",sans-serif;font-style:normal;letter-spacing:.24em;color:#8a2a21;margin-bottom:5px}',
      '.yg-qs button:hover{background:rgba(29,24,19,.05)}.yg-qs button.on{background:#1d1813;color:#efe6d2;border-color:#1d1813}.yg-qs button.on i{color:#e4c48a}',
      '.yg-desk{display:grid;grid-template-columns:minmax(0,1.3fr) minmax(0,1fr);gap:18px;align-items:start}',
      '.yg-write{display:block;grid-column:1/-1}.yg-write span{display:block;font:700 15px/1.6 "Nanum Myeongjo",serif;margin-bottom:8px}',
      '.yg-write textarea{width:100%;box-sizing:border-box;padding:12px 14px;border:1px solid #3a3128;background:#fbf6ea;font:400 15px/1.8 "Nanum Myeongjo",serif;color:#1d1813;resize:vertical;background-image:repeating-linear-gradient(transparent 0 26px,rgba(58,49,40,.15) 26px 27px)}',
      '.yg-act{display:flex;gap:10px;grid-column:1/-1}.yg-act button,.yg-desk .yg-re{all:unset;cursor:pointer;padding:10px 16px;font:700 13.5px/1 "Nanum Myeongjo",serif;letter-spacing:.08em}',
      '.yg-act .yg-send{background:#1d1813;color:#efe6d2}.yg-act .yg-send:hover{background:#3a3027}.yg-act .yg-peek,.yg-desk .yg-re{border:1px solid #3a3128;color:#3e352c}',
      '.yg-clip{position:relative;background:#f7f0de;padding:16px 18px 14px;border:1px solid rgba(58,49,40,.35);box-shadow:0 10px 24px rgba(40,30,20,.18);transform:rotate(-.6deg)}',
      '.yg-clip.pr{animation:ygP .7s cubic-bezier(.2,.8,.2,1)}@keyframes ygP{from{opacity:0;transform:translateY(-10px) rotate(-2deg)}to{opacity:1;transform:rotate(-.6deg)}}',
      '.yg-ck{font:500 10.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.3em;color:#8a2a21}.yg-cq{margin:8px 0;font:700 13.5px/1.6 "Nanum Myeongjo",serif;color:#5a5046}',
      '.yg-ca{font:400 16px/1.9 "Nanum Myeongjo",serif;color:#1d1813;word-break:keep-all}',
      '.yg-cs{display:flex;align-items:center;gap:10px;margin-top:10px;font:400 11.5px "Noto Sans KR",sans-serif;color:#7b7062}',
      '.yg-seal{display:inline-grid;place-items:center;width:40px;height:40px;border:2px solid #8a2a21;border-radius:50%;color:#8a2a21;font:800 12px/1 "Noto Serif KR",serif;transform:rotate(-12deg)}',
      '.yg-hint{padding:4px 0 0}.yg-hint b{display:block;font:500 10.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.24em;color:#8a2a21;margin-bottom:8px}',
      '.yg-hint ul{list-style:none;margin:0 0 12px;padding:0 0 0 14px;border-left:2px solid #8a2a21}.yg-hint li{font:400 14px/1.85 "Nanum Myeongjo",serif;color:#3e352c;word-break:keep-all}',
      '@media (max-width:860px){.yg-page,.yg-desk,.yg-qs{grid-template-columns:1fr}.yg-main{padding-right:0;border-right:0;border-bottom:1px solid rgba(58,49,40,.4);padding-bottom:12px;margin-bottom:12px}.yg-side{padding-left:0}.yg-art.big h4{font-size:24px}.yg-year{font-size:26px}.yg-ticks button{font-size:11px}}',
      '@media (max-width:860px){.yke-g,.yke-era,.yt-body{grid-template-columns:1fr;gap:18px}.yt{padding-left:0;overflow-x:auto;overflow-y:hidden}.yt-lane em{position:static;display:block;transform:none;width:auto;margin-bottom:4px}.yt-lane,.yt-ruler{min-width:720px}.yt-lane{height:70px}}'
    ].join('\n');
    D.head.appendChild(s);
  }
  /* 지면마다 맨 아래칸 광고에 빨간 절취선 — list: [{img, date, cap, say, go, hot:{img 열쇠, top, left, w, h}}] */
  function adHot(list) {
    var book = D.querySelector(list[0].hot.book || '#rBook'); if (!book) return;
    function place() {
      var img = book.querySelector('img.plate-scan'), old = book.querySelector('.yke-hot');
      var src = img ? img.getAttribute('src') : '', ad = null;
      list.forEach(function (x) { if (!ad && src.indexOf(x.hot.img) > -1) ad = x; });
      var on = ad && !/inset\([^)]*100%/.test(img.style.clipPath || '');
      if (!on) { if (old) old.remove(); return; }
      var H = ad.hot, fig = img.parentElement, b = old;
      if (!b) {
        b = D.createElement('div'); b.className = 'yke-hot';
        b.innerHTML = '<button type="button" aria-label="이 지면 맨 아래칸 광고 오려 보기">아래칸 · 그날의 광고 ▸</button>';
        var bt = b.querySelector('button');
        bt.addEventListener('click', function (ev) { ev.preventDefault(); ev.stopPropagation(); openAd(b._ad); });
        ['pointerdown', 'mousedown', 'touchstart'].forEach(function (t) { bt.addEventListener(t, function (ev) { ev.stopPropagation(); }, { passive: true }); });
        bt.addEventListener('mouseenter', function () { b.classList.add('hv'); }); bt.addEventListener('mouseleave', function () { b.classList.remove('hv'); });
        if (getComputedStyle(fig).position === 'static') fig.style.position = 'relative';
        fig.appendChild(b);
      }
      b._ad = ad;
      b.style.left = (img.offsetLeft + img.offsetWidth * (H.left == null ? .01 : H.left)) + 'px';
      b.style.top = (img.offsetTop + img.offsetHeight * H.top) + 'px';
      b.style.width = (img.offsetWidth * (H.w || .98)) + 'px';
      b.style.height = (img.offsetHeight * H.h) + 'px';
    }
    var t; function soon() { clearTimeout(t); t = setTimeout(place, 60); }
    new MutationObserver(soon).observe(book, { childList: true, subtree: true, attributes: true, attributeFilter: ['src', 'style'] });
    W.addEventListener('resize', soon); W.addEventListener('load', soon);
    book.addEventListener('load', soon, true);
    place();
  }
  /* 지면 열쇠(19330518)로 광고 한 칸을 만듦 — 설명은 따로 적지 안으면 기본 말 */
  function mkAds(pre, rows) {
    return rows.map(function (r) {
      var k = r[0], y = k.slice(0, 4), m = +k.slice(4, 6), d = +k.slice(6, 8);
      return { img: 'assets/gwanggo/day/' + pre + '_' + k + '_band.jpg', date: y + '년 ' + m + '월 ' + d + '일 · ' + (r[3] || '동아일보'),
        cap: r[4] || (y + '년 ' + m + '월 ' + d + '일 지면, 그 맨 아래칸이오. 가튼 날 가튼 장에 실린 진짜 광고들이오.'),
        say: r[5] || '가튼 장 우에선 사건을 쫏고, 아래칸에선 물건을 팔앗소.', go: 'shop.html#ad-' + pre + '-' + k,
        hot: { book: '#rBook', img: k, top: r[1], h: r[2] } };
    });
  }
  function openAd(ad) {
    var v = D.getElementById('ykeAd');
    if (!v) {
      v = D.createElement('div'); v.id = 'ykeAd'; v.setAttribute('role', 'dialog'); v.setAttribute('aria-modal', 'true');
      v.innerHTML = '<div class="ya-box"><button type="button" class="ya-x" aria-label="닫기">닫기 ✕</button><p class="ya-k"></p><div class="ya-im"><img alt=""></div><p class="ya-cap"></p><p class="ya-say"></p><a class="yke-go"></a></div>';
      D.body.appendChild(v);
      v.addEventListener('click', function (e) { if (e.target === v || e.target.closest('.ya-x')) v.classList.remove('on'); });
      D.addEventListener('keydown', function (e) { if (e.key === 'Escape') v.classList.remove('on'); });
    }
    v.querySelector('.ya-k').innerHTML = T('그날, 가튼 장 아래칸') + ' · ' + esc(ad.date);
    v.querySelector('img').src = BASE + ad.img; v.querySelector('img').alt = ad.date + ' 아래칸 광고';
    v.querySelector('.ya-cap').innerHTML = T(ad.cap); v.querySelector('.ya-say').innerHTML = T(ad.say);
    var go = v.querySelector('.yke-go'); go.href = BASE + ad.go; go.innerHTML = T('그 시절 광고 상뎜으로', 1) + ' →';
    requestAnimationFrame(function () { v.classList.add('on'); });
  }
  function render(key) {
    var e = W.YK_ERA[key]; if (!e) return;
    css();
    /* ① 그날 지면의 광고 → 「보도」 장의 원문 지면 우에 직접 (그 지면 맨 아래칸을 누르면 펼쳐짐) */
    var ads = (e.ad ? [e.ad] : []).concat(e.ads ? mkAds(e.pre || key, e.ads) : []); if (ads.length) adHot(ads);
    /* ② 이 사건의 시대 → 맨 끗 「사료」 뒤 부록 — 「그해의 지면」: 손잡이를 끌면 해마다 신문 한 장이 넘어감 + 독자 투고란 */
    var col = D.querySelector(e.eraAfter || '.colophon');
    if (col && e.ev && !D.querySelector('.yke')) {
      var sec = D.createElement('section'); sec.className = 'yke'; sec.setAttribute('aria-label', '부록 · 그해의 지면');
      var YRS = []; e.ev.forEach(function (v) { var y = v.y.slice(0, 4); if (YRS.indexOf(y) < 0) YRS.push(y); }); YRS.sort();
      var meY = (e.ev.filter(function (v) { return v.me; })[0] || e.ev[0]).y.slice(0, 4);
      var WD = {}; e.words.forEach(function (w) { WD[w.k] = w.t; });
      var NUM = '〇一二三四五六七八九';
      var hj = function (y) { return y.split('').map(function (c) { return NUM[+c]; }).join(''); };
      sec.innerHTML = '<div class="yke-h"><b>附錄</b><span>읽고 난 뒤 · 그해의 지면</span></div>' +
        '<p class="yg-lead">' + T('이 사건 하나만 보면 한 장의 일이오.') + ' ' + T('그러나 그해의 신문을 펴 보면 — 그 밧게선 무슨 일이 잇섯는지 보이오.') + ' <small>' + T('손잡이를 끌거나 해를 누르시압.') + '</small></p>' +
        '<div class="yg-ruler"><input type="range" min="0" max="' + (YRS.length - 1) + '" step="1" value="' + YRS.indexOf(meY) + '" aria-label="해 고르기">' +
        '<div class="yg-ticks">' + YRS.map(function (y, i) { return '<button type="button" data-i="' + i + '" class="' + (y === meY ? 'me' : '') + '" style="left:calc(15px + (100% - 30px) * ' + (i / (YRS.length - 1)).toFixed(4) + ')"><i></i><b>' + y + '</b>' + (y === meY ? '<small>이 사건</small>' : '') + '</button>'; }).join('') + '</div></div>' +
        '<div class="yg-press" aria-label="그해 신문의 처지"><span class="pl">아래 줄 · 그해 신문이 할 수 잇던 말</span>' + YRS.map(function (y, i) { var P = W.YK_PRESS[pressOf(y)]; return '<button type="button" data-i="' + i + '" class="p-' + P.k + '" style="left:calc(15px + (100% - 30px) * ' + (i / (YRS.length - 1)).toFixed(4) + ')" title="' + P.t + '"><b>' + P.hj + '</b><small>' + P.t + '</small></button>'; }).join('') + '</div>' +
        '<div class="yg-paper"><div class="yg-mast"><span class="yg-ed">京城野錄 · 年表版</span><b class="yg-year"></b><span class="yg-date"></span></div><p class="yg-pn"></p><div class="yg-page"></div></div>' +
        '<div class="yg-post"><div class="yg-ph"><b>讀者 投稿</b><span>' + T('함께 생각해 볼 물음 — 당신의 생각을 적어 투고하시압') + '</span></div>' +
        '<div class="yg-qs">' + e.asks.map(function (q, i) { return '<button type="button" data-q="' + i + '"' + (i === 0 ? ' class="on"' : '') + '><i>問 ' + (i + 1) + '</i>' + T(q.q, 1) + '</button>'; }).join('') + '</div>' +
        '<div class="yg-desk"></div></div>' +
        '<p class="yke-s">' + T(e.src) + '</p>';
      col.parentNode.insertBefore(sec, col.nextSibling);
      var page = sec.querySelector('.yg-page'), rng = sec.querySelector('.yg-ruler input');
      function show(i, anim) {
        var y = YRS[i], ev = e.ev.filter(function (v) { return v.y.slice(0, 4) === y; });
        var era = ev.filter(function (v) { return v.lane === 'era'; }), cs = ev.filter(function (v) { return v.lane === 'case'; });
        var ks = []; ev.forEach(function (v) { v.k.forEach(function (k) { if (ks.indexOf(k) < 0) ks.push(k); }); });
        sec.querySelector('.yg-year').textContent = hj(y) + '年';
        sec.querySelector('.yg-date').textContent = y + '년의 경성 · 그 시대의 큰일과 경성야록 사건';
        [].forEach.call(sec.querySelectorAll('.yg-ticks button'), function (b, j) { b.classList.toggle('on', j === i); });
        [].forEach.call(sec.querySelectorAll('.yg-press button'), function (b, j) { b.classList.toggle('on', j === i); });
        var PS = W.YK_PRESS[pressOf(y)], pn = sec.querySelector('.yg-pn'); pn.className = 'yg-pn p-' + PS.k; pn.innerHTML = '<b>' + PS.hj + '</b><span>' + T('그해의 신문 — ' + PS.d) + '</span>';
        rng.value = i;
        var art = function (v, big) {
          return '<article class="yg-art' + (big ? ' big' : '') + (v.me ? ' me' : '') + '"><p class="yg-k">' + (v.lane === 'case' ? '경성야록 사건' : '그 시대의 큰일') + ' · ' + esc(v.y) + '</p>' +
            '<h4>' + T(v.t) + '</h4><p class="yg-d">' + T(v.d) + '</p><p class="yg-rel">' + T(v.rel) + '</p>' +
            '<p class="yg-f"><span>출처 · ' + esc(v.src) + '</span>' + (v.go && !v.me && location.pathname.indexOf(v.go.split('/')[0]) < 0 ? '<a href="' + BASE + v.go + '">이 사건 읽으러 →</a>' : (v.me ? '<em>지금 읽은 사건</em>' : '')) + '</p></article>';
        };
        page.innerHTML = '<div class="yg-main">' + (era.length ? era.map(function (v, j) { return art(v, j === 0); }).join('') : '<p class="yg-none">' + T('이해의 큰일은 이 연표에 적지 아넛소.') + '</p>') + (+y >= 1940 ? '<p class="yg-end">' + T('이날 뒤로, 해방까지 — 조선말 민간 신문은 업섯소.') + '<br>' + T('그래서 경성야록이, 이 지면들을 다시 펴오.') + '<small>' + T('멈춘 지면 우에 남은 사건들을, 오늘의 독자가 다시 읽소.') + '</small></p>' : '') + '</div>' +
          '<aside class="yg-side">' + (cs.length ? cs.map(function (v) { return art(v, false); }).join('') : '<p class="yg-none">' + T('이해엔 경성야록이 다룬 사건이 업소.') + '</p>') +
          '</aside>' +
          '<div class="yg-text"><div class="yg-th"><b>敎科書로 읽기</b><span>' + T('이해의 일은 교과서 어대에 나오나 — 낱말을 누르시압') + '</span></div>' +
          '<div class="yg-tabs">' + ks.map(function (k, j) { return '<button type="button" data-k="' + k + '"' + (j === 0 ? ' class="on"' : '') + '>' + esc((W.YK_WORDS[k] || {}).t || WD[k] || k) + '</button>'; }).join('') + '</div>' +
          '<div class="yg-tx"></div></div>';
        if (anim) { page.classList.remove('turn'); void page.offsetWidth; page.classList.add('turn'); }
        word(ks[0]);
      }
      function word(k) {
        var w = W.YK_WORDS[k], box = page.querySelector('.yg-tx'); if (!w || !box) return;
        [].forEach.call(page.querySelectorAll('.yg-tabs button'), function (b) { b.classList.toggle('on', b.dataset.k === k); });
        var how = (e.how || {})[k];
        box.innerHTML = '<dl><dt>무엇인가</dt><dd>' + T(w.d) + '</dd><dt>' + T('교과서 어대에') + '</dt><dd>고등학교 한국사 · ' + esc(w.unit) + '</dd>' +
          (how ? '<dt>이 사건에서는</dt><dd class="hw">' + T(how) + '</dd>' : '') +
          '<dt>' + T('더 차저볼 말') + '</dt><dd class="tg">' + w.tags.map(function (t) { return '<span>' + esc(t) + '</span>'; }).join('') + '</dd></dl>';
        box.classList.remove('in'); void box.offsetWidth; box.classList.add('in');
      }
      page.addEventListener('click', function (ev) { var b = ev.target.closest('.yg-tabs button'); if (b) word(b.dataset.k); });
      rng.addEventListener('input', function () { show(+rng.value, true); });
      sec.querySelector('.yg-ticks').addEventListener('click', function (ev) { var b = ev.target.closest('button[data-i]'); if (b) show(+b.dataset.i, true); });
      sec.querySelector('.yg-press').addEventListener('click', function (ev) { var b = ev.target.closest('button[data-i]'); if (b) show(+b.dataset.i, true); });
      show(YRS.indexOf(meY), false);
      /* 독자 투고란 — 적은 글은 이 브라우저에만 남음 */
      var desk = sec.querySelector('.yg-desk'), qi = 0;
      var KEY = function (i) { return 'yk-tougo-' + key + '-' + i; };
      var get = function (i) { try { return localStorage.getItem(KEY(i)) || ''; } catch (x) { return ''; } };
      var put = function (i, t) { try { if (t) localStorage.setItem(KEY(i), t); else localStorage.removeItem(KEY(i)); } catch (x) {} };
      function today() { var d = new Date(); return d.getFullYear() + '. ' + (d.getMonth() + 1) + '. ' + d.getDate(); }
      function drawQ() {
        var q = e.asks[qi], saved = get(qi);
        [].forEach.call(sec.querySelectorAll('.yg-qs button'), function (b) { b.classList.toggle('on', +b.dataset.q === qi); });
        if (saved) {
          desk.innerHTML = '<div class="yg-clip"><p class="yg-ck">讀者 投稿 · 問 ' + (qi + 1) + '</p><p class="yg-cq">' + T(q.q) + '</p><p class="yg-ca">' + esc(saved).replace(/\n/g, '<br>') + '</p>' +
            '<p class="yg-cs"><span class="yg-seal">揭載</span>' + today() + ' · 한 독자</p></div>' +
            '<div class="yg-hint"><b>' + T('이런 생각도 잇소') + '</b><ul>' + q.h.map(function (h) { return '<li>' + T(h) + '</li>'; }).join('') + '</ul><button type="button" class="yg-re">다시 쓰기</button></div>';
        } else {
          desk.innerHTML = '<label class="yg-write"><span>' + T(q.q) + '</span><textarea rows="4" maxlength="400" placeholder="한두 줄이면 충분하오. 정답은 업소."></textarea></label>' +
            '<div class="yg-act"><button type="button" class="yg-send">투고하기</button><button type="button" class="yg-peek">생각 거리 먼저 보기</button></div><div class="yg-hint" hidden><b>' + T('이런 생각도 잇소') + '</b><ul>' + q.h.map(function (h) { return '<li>' + T(h) + '</li>'; }).join('') + '</ul></div>';
        }
      }
      sec.querySelector('.yg-qs').addEventListener('click', function (ev) { var b = ev.target.closest('button[data-q]'); if (b) { qi = +b.dataset.q; drawQ(); } });
      desk.addEventListener('click', function (ev) {
        if (ev.target.closest('.yg-send')) { var t = desk.querySelector('textarea').value.trim(); if (!t) { desk.querySelector('textarea').focus(); return; } put(qi, t); drawQ(); var c = desk.querySelector('.yg-clip'); if (c) c.classList.add('pr'); }
        else if (ev.target.closest('.yg-peek')) { var h = desk.querySelector('.yg-hint'); h.hidden = !h.hidden; }
        else if (ev.target.closest('.yg-re')) { var old = get(qi); put(qi, ''); drawQ(); desk.querySelector('textarea').value = old; }
      });
      drawQ();
    }
    /* 1016 · 연표로 가는 길 — 이야기는 그대로, 독자가 어차피 지나는 「다른 사건」 칸에 표지판만 담
       ① 다른 사건 칸 우에 1920 ~ 1940 연표 줄 (네 사건이 그 우에 놓임 · 카드는 해 순서로)
       ② 이야기가 끝나는 자리에 「附錄」 종이쪽 한 장 */
    try { route(key, e); } catch (x) {}
    if (W.ykSources && W.YK_SRC[key]) {   /* 出處 도장도 함께 */
      W.YK_SRC[key].scenes.push({ sel: '.yke', at: '.yke-h', kind: 'note', src: '고등학교 한국사 교과서 · 우리역사넷' });
      W.ykSources.render(key);
    }
  }
  var CASES = [
    { k: 'maria', y: 1931.6, ys: '1931', n: '마리아', dir: 'maria' },
    { k: 'jk', y: 1933.4, ys: '1933', n: '죽첨정', dir: 'jukcheomjeong' },
    { k: 'sk', y: 1936.6, ys: '1936', n: '손기정', dir: 'sonkijeong' },
    { k: 'bb', y: 1937.1, ys: '1937', n: '백백교', dir: 'baekbaekgyo' }
  ];
  function routeCss() {
    if (D.getElementById('ykr-css')) return;
    var st = D.createElement('style'); st.id = 'ykr-css';
    st.textContent = [
      '.ykr{position:relative;margin:6px 0 22px;padding:30px 0 6px;font-family:"Noto Sans KR",sans-serif}',
      '.ykr-line{position:relative;height:2px;margin:0 18px;background:linear-gradient(90deg,currentColor,currentColor 70%,rgba(128,118,104,.35) 96%)}',
      '.ykr-end{position:absolute;top:50%;transform:translate(-50%,-50%);font:800 11px/1 "Nanum Myeongjo",serif;letter-spacing:.1em;padding:5px 6px 4px;border:1px solid currentColor;white-space:nowrap}',
      '.ykr-end small{display:block;margin-top:3px;font:500 9.5px/1 "Noto Sans KR",sans-serif;letter-spacing:0;opacity:.7;text-align:center}',
      '.ykr-end.l{left:0}.ykr-end.r{left:100%}',
      '.ykr-pt{all:unset;position:absolute;top:50%;transform:translate(-50%,-50%);cursor:pointer;display:block;width:12px;height:12px;border-radius:50%;border:1.5px solid currentColor;background:currentColor;transition:transform .25s}',
      '.ykr-pt b{position:absolute;left:50%;bottom:16px;transform:translateX(-50%);font:700 12.5px/1 "Nanum Myeongjo",serif;white-space:nowrap}',
      '.ykr-pt i{position:absolute;left:50%;top:17px;transform:translateX(-50%);font:500 10.5px/1 "Noto Sans KR",sans-serif;font-style:normal;opacity:.7;white-space:nowrap}',
      '.ykr-pt.rt b,.ykr-pt.rt i{left:-1px;transform:none}.ykr-pt.lt b,.ykr-pt.lt i{left:auto;right:-1px;transform:none}',
      '.ykr-pt.me{background:transparent;border:2px solid #b0261b;width:14px;height:14px}.ykr-pt.me b{color:#b0261b}',
      '.ykr-pt:hover,.ykr-pt:focus-visible,.ykr-pt.hi{transform:translate(-50%,-50%) scale(1.35)}',
      '.ykr-go{all:unset;cursor:pointer;display:flex;justify-content:flex-end;align-items:center;gap:8px;margin:30px 0 0 auto;width:max-content;max-width:100%;font:700 13px/1.4 "Nanum Myeongjo",serif;letter-spacing:.04em;border-bottom:1px solid currentColor;padding-bottom:3px;opacity:.85}',
      '.ykr-go:hover,.ykr-go:focus-visible{opacity:1}.ykr-go em{font-style:normal;color:#b0261b}',
      '.nc-card.ykr-hi{outline:1.5px solid currentColor;outline-offset:4px}',
      '.ykr-slip{position:relative;z-index:2;display:block;width:min(560px,calc(100% - 32px));margin:44px auto 34px;padding:16px 22px 15px 70px;background:#efe6d2;color:#1d1813;text-decoration:none;transform:rotate(-.8deg);box-shadow:0 1px 0 #d8ccb1,0 14px 30px rgba(0,0,0,.28);',
      '  clip-path:polygon(0 3%,4% 0,9% 2%,15% 0,22% 3%,30% 0,38% 2%,47% 0,55% 3%,63% 0,72% 2%,80% 0,88% 3%,95% 0,100% 2%,100% 100%,0 100%);transition:transform .35s cubic-bezier(.2,.7,.2,1)}',
      '.ykr-slip:hover,.ykr-slip:focus-visible{transform:rotate(0) translateY(-3px)}',
      '.ykr-slip .sl{position:absolute;left:16px;top:50%;transform:translateY(-50%) rotate(-8deg);display:grid;place-items:center;width:42px;height:42px;border:2px solid #b0261b;color:#b0261b;font:900 13px/1.05 "Noto Serif KR",serif;text-align:center}',
      '.ykr-slip p{font:800 15.5px/1.6 "Nanum Myeongjo",serif;word-break:keep-all}',
      '.ykr-slip small{display:block;margin-top:4px;font:400 12px/1.5 "Noto Sans KR",sans-serif;color:#5a5046}',
      '.ykr-slip small:after{content:" ↓";color:#b0261b;font-weight:700}',
      '@media (max-width:700px){.ykr-pt i{display:none}.ykr-pt b{font-size:11px}.ykr-end small{display:none}.ykr{padding-bottom:30px}.ykr-pt:nth-of-type(2n) b{bottom:auto;top:16px}}'
    ].join('\n');
    D.head.appendChild(st);
  }
  function toEra() { var t = D.querySelector('.yke'); if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  function route(key, e) {
    var nc = D.getElementById('next-cases'), grid = nc && nc.querySelector('.nc-grid'), yke = D.querySelector('.yke');
    if (!grid || nc.querySelector('.ykr')) return;
    routeCss();
    var me = CASES.filter(function (c) { return c.k === key; })[0];
    var pos = function (y) { return ((y - 1920) / 20 * 100).toFixed(2) + '%'; };
    /* 카드를 해 순서로 (카드 자체는 그대로) */
    var cards = [].slice.call(grid.querySelectorAll('.nc-card'));
    var yOf = function (a) { var h = a.getAttribute('href') || '', c = CASES.filter(function (x) { return h.indexOf(x.dir) > -1; })[0]; return c ? c.y : 9999; };
    cards.sort(function (a, b) { return yOf(a) - yOf(b); }).forEach(function (a) { grid.appendChild(a); });
    var r = D.createElement('div'); r.className = 'ykr'; r.setAttribute('aria-label', '1920 ~ 1940 · 네 사건이 실린 해');
    r.innerHTML = '<div class="ykr-line"><span class="ykr-end l">創刊<small>1920</small></span>' +
      CASES.map(function (c) {
        return '<button type="button" class="ykr-pt' + (c.k === key ? ' me' : '') + (c.k === 'bb' ? ' rt' : c.k === 'sk' ? ' lt' : '') + '" data-dir="' + c.dir + '" style="left:' + pos(c.y) + '" aria-label="' + c.ys + ' ' + c.n + '"><b>' + c.n + '</b><i>' + (c.k === key ? c.ys + ' · 이 사건' : c.ys) + '</i></button>';
      }).join('') + '<span class="ykr-end r">廢刊<small>1940</small></span></div>' +
      (yke ? '<button type="button" class="ykr-go">' + T('네 사건은 모두 한 시대의 지면이오', 1) + ' — <em>그해의 신문 펴 보기 ↓</em></button>' : '');
    grid.parentNode.insertBefore(r, grid);
    (function () { var el = r, bg = 'transparent'; while (el && el !== D.documentElement) { bg = getComputedStyle(el).backgroundColor; if (bg && bg !== 'transparent' && !/rgba\(.*,\s*0\)$/.test(bg)) break; el = el.parentElement; }
      if (!el || el === D.documentElement) bg = getComputedStyle(D.body).backgroundColor;
      [].forEach.call(r.querySelectorAll('.ykr-end,.ykr-pt.me'), function (x) { x.style.backgroundColor = bg; }); })();
    var pts = r.querySelectorAll('.ykr-pt');
    function hi(dir, on) {
      [].forEach.call(pts, function (p) { p.classList.toggle('hi', on && p.dataset.dir === dir); });
      cards.forEach(function (a) { a.classList.toggle('ykr-hi', on && (a.getAttribute('href') || '').indexOf(dir) > -1); });
    }
    cards.forEach(function (a) {
      var c = CASES.filter(function (x) { return (a.getAttribute('href') || '').indexOf(x.dir) > -1; })[0]; if (!c) return;
      a.addEventListener('mouseenter', function () { hi(c.dir, true); }); a.addEventListener('mouseleave', function () { hi(c.dir, false); });
    });
    [].forEach.call(pts, function (p) {
      p.addEventListener('mouseenter', function () { hi(p.dataset.dir, true); }); p.addEventListener('mouseleave', function () { hi(p.dataset.dir, false); });
      p.addEventListener('click', function () { if (p.classList.contains('me')) { toEra(); return; } var a = cards.filter(function (x) { return (x.getAttribute('href') || '').indexOf(p.dataset.dir) > -1; })[0]; if (a) location.href = a.href; });
    });
    var go = r.querySelector('.ykr-go'); if (go) go.addEventListener('click', toEra);
    /* ② 이야기 끝 · 附錄 종이쪽 */
    if (yke && me) {
      var sl = D.createElement('a'); sl.className = 'ykr-slip'; sl.href = '#'; sl.setAttribute('aria-label', '부록 · 그해의 지면으로');
      sl.innerHTML = '<span class="sl" aria-hidden="true">附<br>錄</span><p>' + T('이 사건이 실린 ' + me.ys + '년 — 신문은 무엇을 말할 수 업섯나.', 1) + '</p><small>' + T('그해의 지면 · 맨 뒤 부록에 끼워 두엇소', 1) + '</small>';
      sl.addEventListener('click', function (ev) { ev.preventDefault(); toEra(); });
      nc.parentNode.insertBefore(sl, nc);
    }
  }
  W.ykEra = { render: render };
  var key = (D.currentScript && D.currentScript.getAttribute('data-case')) || '';
  function go() { if (key) render(key); }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', go); else go();
})(window, document);
