/* 경성야록 · 마리아 폰판 장치 — 연판 · 평면도 · 시계 · 수첩 · 괴투서 · 진술 · 공판 · 그 자리 · 라듸오
   글 데이터는 컴퓨터판 maria.js 의 것을 그대로 옮김 */
(function (W, D) {
  'use strict';
  var IMG = '../case/image/maria/';
  var PORT = '../assets/portraits/';
  var PLACES = [
    { name: '초량 거리', sub: ['관사가 모인 동네', '철도 관사가 모인 동네'],
      then: IMG + 'place/choryang-1930.jpg', now: IMG + 'place/choryang-2026-02.jpg',
      thenAddr: ['부산부 초량정', '부산부 초량정'], nowAddr: ['부산 동구 초량동', '부산 동구 초량동'],
      text: ['철도국 관사가 모여 잇든 초량정 거리. 마리아가 숨진 집도 이 일대에 잇섯소. 옛 거리의 전차 길은 이제 좁은 골목과 가게로 바뀌엇소.',
             '철도국 관사가 모여 있던 초량동 거리. 마리아가 숨진 집도 이 일대에 있었다. 옛 거리의 전찻길은 이제 좁은 골목과 가게로 바뀌었다.'] },
    { name: '초량 언덕', sub: ['바다와 역 사이', '바다와 역 사이의 비탈'],
      then: IMG + 'place/choryang-view-02.jpg', now: IMG + 'place/choryang-2026-04.jpg',
      thenAddr: ['초량 바닷가 · 낫은 지붕들', '초량 바닷가 · 낮은 지붕들'], nowAddr: ['산비탈까지 들어찬 동네', '산비탈까지 들어찬 동네'],
      text: ['바다와 역 사이에 끼인 초량. 옛 사진의 낫은 지붕들은 이제 산비탈 꼭대기까지 빽빽한 집들로 바뀌엇소.',
             '바다와 역 사이에 끼인 초량. 옛 사진의 낮은 지붕들은 이제 산비탈 꼭대기까지 빽빽한 집들로 바뀌었다.'] },
    { name: '부산역', sub: ['관부연락선이 닷든 문', '관부연락선이 닿던 관문'],
      then: IMG + 'place/busan-station-1930.jpg', now: IMG + 'place/busan-station-2026.jpg',
      thenAddr: ['부산부 대창정 · 옛 부산역', '부산부 대창정 · 옛 부산역'], nowAddr: ['부산 동구 초량동 · 오늘의 부산역', '부산 동구 초량동 · 지금의 부산역'],
      text: ['관부연락선을 타고 건너온 사람과 짐이 경부선으로 갈아타든 문이오. 붉은 벽돌 옛 역사는 1953년 큰불로 사라지고, 역은 1969년 초량으로 옴겨 오늘에 이르럿소.',
             '관부연락선을 타고 건너온 사람과 짐이 경부선으로 갈아타던 관문이다. 붉은 벽돌의 옛 역사는 1953년 큰불로 사라졌고, 역은 1969년 초량으로 옮겨 지금에 이르렀다.'] }
  ];
  var ARTS = [
    { d: ['팔월 사일 · 一', '8월 4일 ①'], tag: ['처음 실림', '처음 실림'], day: ['사흘째', '사흘째'], date: '1931.08.04', img: '19310804_01.png',
      title: '철도 관사의 아침, 스무 살 하녀가 일어나지 않았다',
      lead: '1931년 8월 1일 아침, 부산 초량정 철도국 관사 15호. 조선인 하녀 마리아(본명 변흥례·20)가 숨진 채 발견됐다.',
      body: ['집주인은 출장 중이었다. 집에는 안주인과 그, 둘뿐이었다.', '경찰은 집 안팎을 살피기 시작했다. 사흘 뒤, 이 죽음은 동아일보 지면에 처음 실렸다.'],
      miss: ['그 밤, 그 아이가 마지막으로 본 얼굴.', '그날 밤, 그 아이가 마지막으로 본 얼굴.'],
      sum: ['부산 초량의 한 사택에서 스무 살 여성 마리아가 숨진 채 발견됐다.', '집주인이 출장으로 집을 비운 사이 사건이 발생한 것으로 보도됐다.', '경찰은 현장 조사와 함께 주변 인물들을 대상으로 수사에 착수했다.'],
      keys: ['부산', '초량', '마리아', '첫보도'] },
    { d: ['팔월 사일 · 二', '8월 4일 ②'], tag: ['가튼 날 · 부검', '같은 날 · 부검 결과'], day: ['사흘째', '사흘째'], date: '1931.08.04', img: '19310804_02.png',
      title: '부검이 말했다 — 사고가 아니다',
      lead: '부검 결과, 마리아의 죽음은 사고가 아닌 범죄로 판단됐다.',
      body: ['경찰은 수사의 방향을 \'누가\'로 돌렸다. 단서는 현장과, 그 밤 집 안에 있던 사람들에게 남아 있었다.', '관사 안의 일이 거리로 새어 나가면서, 부산은 이 사건을 숨죽여 지켜보기 시작했다.'],
      miss: ['목을 조른 손의 크기.', '목을 조른 손의 크기.'],
      sum: ['부검을 통해 마리아의 사망 경위에 대한 추가 사실이 확인됐다.', '경찰은 범죄 사건으로 보고 본격적인 수사에 들어갔다.', '현장과 주변 인물을 중심으로 단서를 찾기 위한 조사가 이어졌다.'],
      keys: ['부검', '수사', '부산경찰', '단서'] },
    { d: ['팔월 십삼일', '8월 13일'], tag: ['수사가 막힘', '수사 난항'], day: ['열이틀째', '열이틀째'], date: '1931.08.13', img: '19310813.png',
      title: '들어온 흔적도, 나간 흔적도 없었다',
      lead: '열이틀이 지나도록 경찰은 범인을 특정하지 못했다.',
      body: ['밖에서 침입한 뚜렷한 흔적은 나오지 않았다. 의심은 천천히 문 안쪽으로 돌아섰다.', '여러 사람이 불려 갔고 여러 물건이 검토됐지만, 그 밤을 설명할 결정적인 한 조각은 끝내 나오지 않았다.'],
      miss: ['문 안쪽에서 잠든 척한 사람의 숨소리.', '문 안쪽에서 잠든 척한 사람의 숨소리.'],
      sum: ['경찰의 수사가 계속됐지만 범인을 특정하지 못했다.', '외부 침입 흔적이 뚜렷하지 않아 집 내부와 주변 인물에 수사가 집중됐다.', '여러 단서가 등장했지만 사건을 해결할 결정적 증거는 확보되지 않았다.'],
      keys: ['수사난항', '내부설', '외부설', '미제'] },
    { d: ['구월 이일', '9월 2일'], tag: ['괴투서', '의문의 투서'], day: ['한 달째', '한 달째'], date: '1931.09.02', img: '19310902.png', mark: '투서',
      title: '이름 없는 편지가, 범인만 알 법한 것을 알고 있었다',
      lead: '사건 한 달 뒤, 경찰서에 날아든 익명의 투서가 수사를 다시 움직였다.',
      body: ['편지에는 그 밤의 일이 지나치게 자세히 적혀 있었다. 경찰은 쓴 사람이 무언가를 알고 있다고 보았다.', '필적이 닮았다는 남자가 붙잡혔지만, 혐의는 나오지 않았다. 편지를 쓴 손은 여전히 어둠 속에 있었다.'],
      miss: ['편지를 쓴 손이 떨렸는지, 웃었는지.', '편지를 쓴 손이 떨렸는지, 웃었는지.'],
      sum: ['범행 과정을 구체적으로 적은 익명의 투서가 등장했다.', '경찰은 투서 작성자가 사건의 중요한 정보를 알고 있다고 판단했다.', '용의자를 조사했지만 혐의가 확인되지 않아 투서자 추적이 계속됐다.'],
      keys: ['익명투서', '필적', '재수사', '추적'] },
    { d: ['구월 오일', '9월 5일'], tag: ['수사를 넓힘', '수사 확대'], day: ['한 달 나흘째', '한 달 나흘째'], date: '1931.09.05', img: '19310905.png',
      title: '의심은 벽 하나 너머, 옆방으로 향했다',
      lead: '경찰은 그 밤 바로 옆방에서 잤던 안주인 오하시 히사코를 집중적으로 조사했다.',
      body: ['수사는 그의 주변 관계를 따라 철도와 동래온천 일대로 넓어졌다.', '생전의 마리아와 길에서 여러 번 말을 나눈 철도 직원도 불려 갔다. 그의 이름은 지면에 실리지 않았다.'],
      miss: ['길에서 그 아이와 이야기하던 사내의 이름.', '길에서 그 아이와 이야기하던 남자의 이름.'],
      sum: ['경찰은 오하시의 아내 히사코를 집중 조사했다.', '수사는 주변 관계와 철도·동래온천 일대로 확대됐다.', '마리아와 접촉했던 주변 인물까지 조사했지만 진범은 확정되지 않았다.'],
      keys: ['히사코', '철도', '동래온천', '수사확대'] },
    { d: ['구월 십륙일', '9월 16일'], tag: ['투서 공개', '투서 공개'], day: ['한 달 보름째', '한 달 보름째'], date: '1931.09.16', img: '19310916.png', mark: '주장',
      title: '"창 너머로 다 보았소" — 지면에 실린 목격자의 편지',
      lead: '9월 16일, 동아일보는 수사의 단서로 거론되던 익명 투서의 내용을 지면에 공개했다.',
      body: ['투서자는 그 밤 관사 가까이에 있었고, 집 안의 일을 보았다고 주장했다. 증거물을 둔 곳까지 적혀 있었다.', '그러나 그것은 끝까지 이름 없는 사람의 주장이었다. 그 목격자는 둘째 편지에서, 스스로를 범인이라 불렀다.'],
      miss: ['그리고 — 범인의 이름.', '그리고 — 범인의 이름.'],
      sum: ['동아일보가 사건의 핵심 단서였던 익명의 투서 내용을 공개했다.', '투서자는 현장 상황을 목격했다고 주장하며 구체적인 정보를 제시했다.', '익명 투서의 주장이었던 만큼 실제 사실과 일치하는지 확인이 필요한 기록이었다.'],
      keys: ['투서공개', '목격자', '수사기록', '동아일보'] }
  ];
  var HOOK = [
    ['주인은 집에 업섯소. 그러면 그 밤, 집 안에는 누가 잇섯는가.', '주인은 집에 없었다. 그렇다면 그날 밤, 집 안에는 누가 있었나.'],
    ['부검은 \'사고가 아니다\'라고 말하엿소. 그러면 누가.', '부검은 \'사고가 아니다\'라고 말했다. 그렇다면 누가.'],
    ['밖에서 들어온 흔적이 업소 — 의심은 문 안쪽으로 도라섯소.', '밖에서 들어온 흔적이 없다 — 의심은 문 안쪽으로 돌아섰다.'],
    ['편지는 범인만 알 법한 것을 알고 잇섯소.', '편지는 범인만 알 법한 것을 알고 있었다.'],
    ['철도국 사람이 또 나왓소. 우연이엇는가.', '철도국 사람이 또 나왔다. 우연이었을까.'],
    ['신문은 일홈 업는 이의 \'목격담\'을 그대로 실럿소.', '신문은 이름 없는 사람의 \'목격담\'을 그대로 실었다.']
  ];
  var PEOPLE = [
    { id: 'maria', clip: ['./img/scan/19310804_01.png', '동아일보 팔월 사일 — 첫 보도'], tab: '마리아', name: '마리아', hj: '', mj: './img/p_maria.jpg',
      f: [[['본명', '본명'], ['변흥례. 일인들은 「마리아」라 불럿다.', '변흥례. 일본인들은 「마리아」라 불렀다.']],
          [['나이', '나이'], ['스믈', '스물']],
          [['고향', '고향'], ['충남 텬안군 성환', '충남 천안군 성환']],
          [['처지', '처지'], ['열 살부터 남의 집살이. 월급 십오 원은 한 푼 남김업시 고향에 부첫다.', '열 살부터 남의 집살이. 월급 15원은 한 푼 남김없이 고향에 부쳤다.']],
          [['일홈', '이름'], ['열일곱에 경성 일인 집 하녀로. 주인은 「조선 일홈은 부르기 어렵다」며 마리아라 불럿다.', '열일곱에 서울 일본인 집 가정부로. 주인은 「조선 이름은 부르기 어렵다」며 마리아라 불렀다.']]],
      j: [[['팔월 일일 아츰', '8월 1일 아침'], ['초량뎡 철도관사 십오호. 조선인 하녀 하나가 주검으로 발견되엿다.', '초량정 철도관사 15호. 조선인 하녀 한 명이 시신으로 발견됐다.']],
          [['가튼 날', '같은 날'], ['아츰 열 시에야 문이 열렷다. 목에 감긴 비단 띄. 사고가 아니다.', '아침 10시에야 문이 열렸다. 목에 감긴 비단 띠. 사고가 아니다.']],
          [['탐문', '탐문'], ['일어를 곳잘 하고, 주인 얼골만 보고도 맥주인지 청주인지 아랏다 한다. 장사엿다고도 한다. 사십 킬로 짐을 지고 십 리를 례사로 거럿다고. 그런 아이가 소리 한 번 못 질럿단 말인가.', '일본어를 곧잘 하고, 주인 얼굴만 보고도 맥주인지 청주인지 알았다고 한다. 힘이 장사였다고도 한다. 40킬로 짐을 지고 십 리를 예사로 걸었다고. 그런 아이가 소리 한 번 못 질렀단 말인가.']],
          [['탐문', '탐문'], ['전날 밤 아홉 시, 아씨가 「래일은 늣게 이러나도 조타」 하엿다 한다. 어찌 하필 그 밤에.', '전날 밤 9시, 안주인이 「내일은 늦게 일어나도 좋다」고 했다고 한다. 왜 하필 그날 밤에.']]],
      q: ['그 아이의 비명을 — 벽 한 겹 너머는, 어찌 듯지 못하엿는가.', '그 아이의 비명을 — 벽 한 겹 너머는, 왜 듣지 못했는가.'], stamp: '미제', go: ['hisako', 'masami'] },

    { id: 'hisako', clip: ['./img/scan/19310905.png', '동아일보 구월 오일 — 부인 취조'], tab: '히사코', name: '오하시 히사코', hj: '大橋久子 · 서른여섯', mj: './img/p_hisako.jpg', re: 1,
      f: [[['관계', '관계'], ['관사 주인 오하시의 안해', '관사 주인 오하시의 아내']],
          [['그 밤', '그날 밤'], ['하녀 방 바로 엽방에서 잣다.', '하녀 방 바로 옆방에서 잤다.']],
          [['처분', '처분'], ['팔월 이십구일 검거 → 일심 무죄 · 공소(控訴) 기각', '8월 29일 체포 → 1심 무죄 · 항소 기각']],
          [['그 뒤', '그 뒤'], ['예심은 「주범」이라 하엿스나 — 긔소되지 아넛다.', '예심은 「주범」이라 했지만 — 기소되지 않았다.']]],
      j: [[['팔월 일일', '8월 1일'], ['첫 발견자. 순사가 다엇슬 때 <u>화장을 하고 외출복 차림으로 복도를 쓸고 잇섯다</u> 한다. 「조용히 처리해 달라」 하고, 일본의 로모에게 전보를 첫다.', '첫 발견자. 순경이 도착했을 때 화장을 하고 외출복 차림으로 복도를 쓸고 있었다고 한다. 「조용히 처리해 달라」고 하고, 일본의 노모에게 전보를 쳤다.']],
          [['진술', '진술'], ['「밤새 아모 소리도 듯지 못하엿소.」 — 벽 한 겹 사이다.', '「밤새 아무 소리도 듣지 못했어요.」 — 벽 한 겹 사이다.']],
          [['탐문', '탐문'], ['전날 낫, 하녀와 사진을 박고 옷을 마추어 주엇다 한다. 그날따라 류달리.', '전날 낮, 하녀와 사진을 찍고 옷을 맞춰 주었다고 한다. 그날따라 유난히.']],
          [['물증', '물증'], ['주검의 목에 감긴 비단 띄. 아씨의 것이라 한다.', '시신의 목에 감긴 비단 띠. 안주인의 것이라고 한다.']],
          [['팔월 이십구일', '8월 29일'], ['새벽 한 시, 검사국이 다려갓다. 끗까지 부인.', '새벽 1시, 검사국이 데려갔다. 끝까지 부인.']]],
      q: ['벽 한 겹 너머의 비명을, 참으로 듯지 못하엿는가.', '벽 한 겹 너머의 비명을, 정말 듣지 못했는가.'], stamp: '무죄', go: ['masami', 'inoue', 'maria'] },

    { id: 'masami', clip: ['./img/scan/19310804_02.png', '동아일보 팔월 사일 — 부검'], tab: '마사키', name: '오하시 마사키', hj: '大橋正己', mj: './img/p_masami.jpg', re: 1,
      f: [[['직위', '직위'], ['부산 철도 운수사무소장 · 고등관', '부산 철도 운수사무소장 · 고등관']],
          [['주소', '주소'], ['초량뎡 철도관사 십오호', '초량정 철도관사 15호']],
          [['그 밤', '그날 밤'], ['진주 출장. 닐헤 일뎡.', '진주 출장. 일주일 일정.']]],
      j: [[['팔월 일일', '8월 1일'], ['그 밤 집에 업섯다. 진주 출장, 닐헤 일뎡이엇다 한다.', '그날 밤 집에 없었다. 진주 출장, 일주일 일정이었다고 한다.']],
          [['풍문', '소문'], ['하녀와 갓가웠다는 말이 돈다. <i>확인 못함. 지면에 쓰지 말 것.</i>', '하녀와 가까웠다는 말이 돈다. 확인 못 함. 지면에 쓰지 말 것.']],
          [['긔자 메모', '기자 메모'], ['칠월 이십구일, 닐헤 예뎡으로 떠낫다. 그러면 그 주에 집이 빈다는 것을 누가 알앗는가.', '7월 29일, 일주일 예정으로 떠났다. 그렇다면 그 주에 집이 빈다는 것을 누가 알았는가.']]],
      q: ['어찌하야 하필 그 주에 집을 비웠는가.', '왜 하필 그 주에 집을 비웠는가.'], stamp: '부재', go: ['hisako', 'maria'] },

    { id: 'yama', clip: ['./img/scan/19310902.png', '동아일보 구월 이일 — 투서자 취조'], tab: '야마구치', name: '야마구치 추이치', hj: '', mj: './img/p_yama.jpg',
      f: [[['지목', '지목 이유'], ['괴투서와 필적이 달맛다.', '괴투서와 필적이 닮았다.']],
          [['처분', '처분'], ['구금 후 석방', '구금 후 석방']]],
      j: [[['팔월 삼일', '8월 3일'], ['부산서에 일홈 업는 편지. 「창 너머로 다 보앗소.」', '부산경찰서에 이름 없는 편지. 「창 너머로 다 보았소.」']],
          [['팔월 십삼일', '8월 13일'], ['가튼 손으로 둘재 편지. 이번에는 <u>「내가 범인이오.」</u>', '같은 손으로 두 번째 편지. 이번에는 「내가 범인이오.」']],
          [['구월 이일', '9월 2일'], ['필적이 달맛다는 사내 하나를 잡아드렷다. 관사 근처에 사는, 절도 전과 이 범의 일인이라 한다.', '필적이 닮았다는 남자 하나를 붙잡았다. 관사 근처에 사는, 절도 전과 2범의 일본인이라고 한다.']],
          [['구월', '9월'], ['곳 석방. 글씨가 비슷할 뿐, 그 이상은 나오지 아니하엿다.', '곧 석방. 글씨가 비슷할 뿐, 그 이상은 나오지 않았다.']]],
      q: ['열흘 만에 목격자가 범인이 되는 편지 — 그 붓은 누구의 손에 잇섯는가.', '열흘 만에 목격자가 범인이 되는 편지 — 그 붓은 누구의 손에 있었는가.'], stamp: '방면', go: ['rail', 'inoue'] },

    { id: 'inoue', clip: ['../assets/portraits/maria_19331110.jpg', '동아일보 1933. 11. 10 — 용의자'], tab: '이노우에', name: '이노우에 슈이치로', hj: '井上修一郞 → 隆雄', mj: './img/p_inoue.jpg', fb: PORT + 'maria_portrait.jpg',
      f: [[['직업', '직업'], ['철도국 공제조합 직원', '철도국 공제조합 직원']],
          [['관계', '관계'], ['룡산 시절부터 오하시 부부와 친분', '용산 시절부터 오하시 부부와 친분']],
          [['처분', '처분'], ['1933년 이월 검거 → 일심 무기 → 이심 무죄', '1933년 2월 체포 → 1심 무기징역 → 2심 무죄']]],
      j: [[['풍문', '소문'], ['룡산 때부터 오하시 집과 알든 사내. 아씨와 갓갑다는 말. <i>풍문뿐.</i>', '용산 때부터 오하시 집과 알던 남자. 안주인과 가깝다는 말. 소문뿐.']],
          [['사건 뒤', '사건 뒤'], ['<u>머리를 짧게 깍고 불교로 개종</u>하엿다 한다.', '머리를 짧게 깎고 불교로 개종했다고 한다.']],
          [['1933. 2', '1933년 2월'], ['두 해 만에 검거. 그 밤 관사 근처에 <u>로이드 안경 쓴 서른 살쯤의 사내</u>가 잇섯다는 증언.', '2년 만에 체포. 그날 밤 관사 근처에 로이드 안경을 쓴 서른 살쯤의 남자가 있었다는 증언.']],
          [['극장', '극장'], ['그 밤 열두 시까지 중앙극장에서 「요쓰야 괴담」을 보앗다 한다. 다른 것은 긔억이 업다고.', '그날 밤 12시까지 중앙극장에서 「요쓰야 괴담」을 봤다고 한다. 다른 것은 기억나지 않는다고.']],
          [['1934. 1', '1934년 1월'], ['일심 무기징역. — 그리고 이심, 무죄.', '1심 무기징역. — 그리고 2심, 무죄.']]],
      q: ['안경 쓴 그 사내는, 과연 그엿는가.', '안경을 쓴 그 남자는, 정말 그였는가.'], stamp: '무죄', go: ['hisako', 'yama'] },

    { id: 'rail', clip: ['./img/scan/19310813.png', '동아일보 팔월 십삼일 — 수사 난항'], tab: '길의 사내', name: '일홈 업는 철도원', nameKo: '이름 없는 철도원', hj: '이름 모름', mj: './img/p_rail.jpg', re: 1,
      f: [[['단서', '단서'], ['생전의 마리아와 길에서 여러 번 말을 나누엇다.', '생전의 마리아와 길에서 여러 번 말을 나눴다.']],
          [['출처', '출처'], ['동아일보 구월 오일 — 단 한 줄', '동아일보 9월 5일 — 단 한 줄']]],
      j: [[['구월 오일', '9월 5일'], ['서에서 철도 직원 하나를 불러 조사하엿다는 한 줄. 일홈은 실리지 아니하엿다.', '경찰서에서 철도 직원 하나를 불러 조사했다는 한 줄. 이름은 실리지 않았다.']],
          [['탐문', '탐문'], ['생전의 그 아이와 길에서 몃 번 서서 이약이하든 사내. 서는 누구인지 밝히지 안는다.', '생전의 그 아이와 길에서 몇 번 서서 이야기하던 남자. 경찰서는 누구인지 밝히지 않는다.']],
          [['그 뒤', '그 뒤'], ['<u>어느 긔록에도 다시 나오지 안는다.</u>', '어느 기록에도 다시 나오지 않는다.']]],
      q: ['야마구치인가, 이노우에인가 — 아니면 셋재 사내인가.', '야마구치인가, 이노우에인가 — 아니면 세 번째 남자인가.'], stamp: '불명', go: ['yama', 'inoue', 'maria'] },

    { id: 'last', clip: ['./img/scan/19310916.png', '동아일보 구월 십륙일 — 투서 공개'], tab: '범인', last: 1, name: '', hj: '범 인', mj: './img/p_last.jpg',
      f: [[['일홈', '이름'], ''], [['얼골', '얼굴'], ''], [['처분', '처분'], '']],
      j: [[['1934', '1934년'], ['두 번재 무죄. 검사국은 더 뭇지 안는다. 한 번 무죄가 난 아씨는 다시 법뎡에 세울 수 업다.', '두 번째 무죄. 검사국은 더 묻지 않는다. 한 번 무죄가 난 안주인은 다시 법정에 세울 수 없다.']],
          [['그 뒤', '그 뒤'], ['이 장은 비워 둔다. 채울 이가 나타나거든 — 그때 쓴다.', '이 장은 비워 둔다. 채울 사람이 나타나면 — 그때 쓴다.']]],
      q: null, stamp: '', go: ['maria'] }
  ];
  var SPOTS = [
    { x: 30, y: 22, t: ['꺾임', '꺾임'], d: ['획을 꺾는 자리마다 붓을 한 번 멈추는 버릇', '획을 꺾을 때마다 붓을 한 번 멈추는 버릇'] },
    { x: 66, y: 48, t: ['삐침', '삐침'], d: ['왼편으로 길게 빼어 끗을 가늘게 흘리는 삐침', '왼쪽으로 길게 빼서 끝을 가늘게 흘리는 삐침'] },
    { x: 42, y: 76, t: ['먹', '먹'], d: ['붓을 누르는 힘이 고르지 못해 먹이 번진 자리', '붓을 누르는 힘이 고르지 않아 먹이 번진 자리'] }
  ];
  var STEPS = [
    { b: ['팔월 삼일', '8월 3일'], h: ['첫 괴투서', '첫 괴투서'], s: ['사건 이틀 뒤, 일홈 업는 편지가 부산경찰서에 날아들엇소. "창 너머로 그 밤을 보앗다."', '사건 이틀 뒤, 이름 없는 편지가 부산경찰서에 날아들었다. "창 너머로 그날 밤을 보았다."'] },
    { b: ['열흘쯤 뒤', '열흘쯤 뒤'], h: ['두 번째 괴투서', '두 번째 괴투서'], s: ['가튼 필적으로, 가튼 이약이를 다시 하엿소.', '같은 필적으로, 같은 이야기를 다시 했다.'] },
    { b: ['구월 초', '9월 초'], h: ['필적으로 야마구치를 지목', '필적으로 야마구치를 지목'], s: ['필적이 비슷하다 하야 야마구치 추이치가 붓들렷스나, 필적만으로는 죄를 물을 수 업서 곧 풀려낫소. 그는 관사 근처에 사는 절도 전과자엿소.', '필적이 비슷하다며 야마구치 추이치가 붙잡혔지만, 필적만으로는 죄를 물을 수 없어 곧 풀려났다. 그는 관사 근처에 사는 절도 전과자였다.'] },
    { b: ['구월 십륙일', '9월 16일'], h: ['지면에 실린 편지', '지면에 실린 편지'], s: ['동아일보가 투서의 \'목격담\'을 실럿소 — 어대까지나 주장이엇소.', '동아일보가 투서의 \'목격담\'을 실었다 — 어디까지나 주장이었다.'] },
    { b: ['소화 팔 년', '1933년'], h: ['편지가 다시 도마에', '편지가 다시 도마에'], s: ['이 년 뒤 잡힌 철도 공제조합 직원 이노우에의 재판에서 필적이 다시 다투어졌소. 자료마다 말이 엇갈리오.', '2년 뒤 체포된 철도 공제조합 직원 이노우에의 재판에서 필적이 다시 쟁점이 됐다. 자료마다 말이 엇갈린다.'], key: 1 }
  ];
  var LETTERS = [
    { t: ['첫째 편지', '첫째 편지'], d: '8월 3일', lines: [
      ['나는 절도 전과 이범이오.', '나는 절도 전과 2범이오.'],
      ['그 밤 새벽 세 시, 관사에서 녀자의 비명을 드럿소.', '그날 밤 새벽 3시, 관사에서 여자의 비명을 들었소.'],
      ['창 너머로 — 다 보앗소.', '창 너머로 — 다 보았소.'],
      ['범인은 집안 사람이오. 삼십 세가량 된 녀자요.', '범인은 집안 사람이오. 서른 살쯤 된 여자요.'],
      ['유리창을 깨고 창살 한 개를 뽑아 — 철도병원 압 공원 풀밧 속에 파무덧스니, 차저 보시오.', '유리창을 깨고 창살 한 개를 뽑아 — 철도병원 앞 공원 풀밭에 파묻었으니, 찾아 보시오.'],
      ['— 부산경찰서 서장 친전. 목격자로부터.', '— 부산경찰서 서장 친전. 목격자로부터.'],
      ['신문에 난 것은, 전부 거짓말이오.', '신문에 난 것은 전부 거짓말이다.']
    ] },
    { t: ['둘째 편지', '둘째 편지'], d: '열흘 뒤', lines: [
      ['— 가튼 손, 가튼 먹 —', '— 같은 손, 같은 먹 —'],
      ['그 밤의 일은,', '그날 밤의 일은,'],
      ['내가 한 것이오.', '내가 한 것이오.']
    ] }
  ];
  var CHECK = [
    { c: '"철도병원 앞 공원 풀밭에 묻었다"', f: '수건과 창살 — 실제로 나왔다', st: '一致', k: 'ok' },
    { c: '그 밤의 일을 본 듯한 묘사', f: '신문에 나기도 전인데, 부검에서만 보이던 흔적과 맞았다', st: '一致', k: 'ok' },
    { c: '"새벽 3시쯤 비명을 들었다"', f: '부검이 본 사망 시각은 밤 11시 ~ 새벽 1시', st: '不一致', k: 'no' },
    { c: '첫째: "집안의 서른 살쯤 된 여자" · 둘째: "내가 했다"', f: '한 사람의 두 편지가 서로 다른 범인을 말한다', st: '矛盾', k: 'no' },
    { c: '"신문에 난 것은 전부 거짓말"', f: '무엇이 거짓인지 편지는 말하지 않았다', st: '未詳', k: 'ask' }
  ];
  var ST = [
    { y: '1931', ang: 20, no: '제0호', when: '1931년 8월 · 부산 초량정', au: null, moon: 70,
      h: '주인은 출장 중,<br><em>스무 살 하녀</em>는 남의 방에서',
      t: ['소화 륙 년 — 목소리 대신 남은 것', '1931년 — 목소리 대신 남은 것'],
      b: ['「초량 철도 관사의 괴사」', '「두 번 날아든 괴투서」', '「주인 아씨, 무죄」'],
      d: ['그 밤을 증언할 목소리는 남지 안앗소. 남은 것은 신문 제목뿐 — 그리고 그 제목이 그 녀자에게 붙인 일홈, \'치정\'. 그 일홈이 어대까지 따라오는지, 다이알을 돌려 드러 보시압.', '그날 밤을 증언할 목소리는 남지 않았다. 남은 것은 신문 제목뿐 — 그리고 그 제목이 그녀에게 붙인 이름, \'치정\'. 그 이름이 어디까지 따라오는지, 다이얼을 돌려 들어 보세요.'] },
    { y: '1970', ang: 80, no: '제1호', when: '1970년 3월 · 서울 강변북로', au: 'maria-radiocase01.mp3', card: 'maria-case05.png', moon: 28,
      h: '수첩엔 스물여섯 이름,<br>결론은 <em>단 한 명</em>',
      t: ['수첩엔 스물여섯 일홈, 결론은 단 한 명', '수첩엔 26명의 이름, 결론은 단 한 명'],
      b: ['달리던 승용차 안, 요정 접대부 총격 사망', '권력형 암살 의혹 속에 \'친오빠 단독 범행\'으로 종결'],
      d: ['한 녀자의 죽음 뒤로 정재계 인사들의 일홈이 오르내렷스나, 수사는 가까운 이의 범행으로 매듭지어지고 의혹만 오래 남앗소.', '한 여성의 죽음 뒤로 정재계 인사들의 이름이 오르내렸지만, 수사는 가까운 사람의 범행으로 결론 났고 의혹만 오래 남았다.'],
      link: '수첩 속 권력의 이름은 지워지고, 여자의 \'행실\'만 남았다. — 마리아에게 \'치정\'이 먼저 붙었듯.' },
    { y: '1980s', ang: 140, no: '제2호', when: '1980년대 중반 · 현해탄', au: 'maria-radiocase02.mp3', card: 'maria-case01.png', moon: 22,
      h: '금괴는 바다를 건넜고,<br>그녀는 <em>산에 묻혔다</em>',
      t: ['금괴는 바다를 건넛고, 그 녀자는 산에 무첫다', '금괴는 바다를 건넜고, 그녀는 산에 묻혔다'],
      b: ['홍콩·도쿄·서울·부산을 오간 30대 여성 운반책', '정산 직전 교살, 야산 암매장 — 수사는 \'치정\'으로 흘렀다'],
      d: ['홍콩 · 일본 · 한국을 오가든 밀수 조직에서 운반책으로 쓰인 이들이 조직의 다툼과 범죄에 고스란히 드러낫소.', '홍콩·일본·한국을 오가던 밀수 조직에서 운반책으로 이용된 사람들이 조직 내부의 갈등과 범죄에 그대로 노출됐다.'],
      link: '수사는 또 \'치정\'으로 흘렀다. 국경을 넘나드는 큰 손 대신, 가장 약한 사람이 사라졌다.' },
    { y: '2000s', ang: 200, no: '제3호', when: '2000년대 초중반 · 서울 강남', au: 'maria-radiocase03.mp3', card: 'maria-case04.png', moon: 76,
      h: '수억을 벌던 그녀들은<br>왜 <em>저수지</em>에서',
      t: ['수억을 벌든 그 녀자들은 웨 저수지에서 발견되엇나', '수억을 벌던 그녀들은 왜 저수지에서 발견됐나'],
      b: ['선불금 채무·잠적 뒤 수개월 만에 변사체로 발견', '\'빚투와 일탈\'로 소비된 보도, 그 뒤엔 사채·조폭 연결 의혹'],
      d: ['화려한 거리의 뒤편, 불법 사채와 조직 범죄와 검은돈이 얽힌 자리에서 가장 약한 이들이 먼저 사라젓소.', '화려한 거리의 이면, 불법 사채와 조직범죄, 거액의 자금이 얽힌 곳에서 가장 취약한 사람들이 먼저 사라졌다.'],
      link: '신문은 범인보다 먼저 피해자의 몸가짐을 물었다. 1931년의 지면처럼.' },
    { y: '2023', ang: 260, no: '제4호', when: '2023년 3월 · 서울 강남 역삼동', au: 'maria-radiocase04.mp3', card: 'maria-case03.png', moon: 34,
      h: '금괴는 <em>코인</em>이 되었고,<br>범죄는 그대로였다',
      t: ['금괴는 코인이 되엇고, 범죄는 그대로엿다', '금괴는 코인이 되었고, 범죄는 그대로였다'],
      b: ['3월 29일 밤, 아파트 앞에서 40대 여성 납치·살해', '코인 탈취 노린 강도살인, 1심 주범 2명 무기징역'],
      d: ['거래하는 물건은 바뀌엇스나, 큰 리권과 범죄가 이어지는 꼴은 그대로엿소.', '거래 수단은 달라졌지만, 거대한 이권과 범죄가 연결되는 구조는 그대로였다.'],
      link: '거래하는 물건만 바뀌었다. 힘센 쪽은 남고, 약한 쪽이 지워지는 구조는 그대로.' },
    { y: '2020s', ang: 320, no: '제5호', when: '2020년대 중반 · 동남아 ↔ 서울', au: 'maria-radiocase05.mp3', card: 'maria-case02.png', moon: 62,
      h: '국경은 사라졌고,<br><em>가장 약한 고리</em>만 남았다',
      t: ['국경은 사라젓고, 가장 약한 고리만 남엇다', '국경은 사라졌고, 가장 약한 고리만 남았다'],
      b: ['통장 대여·자금 운반책으로 끌려든 청년 여성들', '조직 이탈·횡령 의혹 끝에 감금·살해된 사건들'],
      d: ['무대는 국경 너머로 넓어젓스나, 조직의 끄트머리에 선 이가 가장 큰 위험을 짊어지는 꼴은 되풀이되오.', '무대는 국경 너머로 넓어졌지만, 조직의 말단에 놓인 사람이 가장 큰 위험을 떠안는 구조는 되풀이된다.'],
      link: '가장 약한 고리 — 1931년 초량정 관사의 스무 살 하녀에서 시작된 이야기.' }
  ];
  var YASA = [
    { q: '왜 하필 그날, 사진을 찍었나', a: '사건 당일 낮, 히사코는 마리아를 데리고 사진관에 가 함께 사진을 찍었다. 저녁엔 양복점을 불러 "마리아가 고향 갈 옷"을 맞춘다고 했지만 — 실제로 지은 것은 자기 옷이었다.', s: '기록' },
    { q: '옆방의 비명', a: '비명은 이웃집까지 들렸고, 그 방엔 몹시 몸부림친 자국이 남아 있었다. 바로 옆방에서 1시와 3시에 두 번 깨어 화장실에 다녀온 히사코는 — 아무 소리도 듣지 못했다고 했다.', s: '기록' },
    { q: '복도를 쓸던 아침', a: '경찰이 도착했을 때 히사코는 화장을 하고 외출복 차림으로 복도를 쓸고 있었다. "조용히 처리해 달라"고 부탁했고, 일본의 일흔 살 노모에게 전보를 쳤다.', s: '기록' },
    { q: '비단 허리띠', a: '마리아의 목에 감겨 있던 띠는 히사코의 것이었다. 경찰은 "그런 것을 현장에 남겨 둘 리 없다"며 크게 보지 않았다.', s: '기록' },
    { q: '목격자는 왜 범인이 되었나', a: '첫 편지는 "유리문 안을 들여다보았다"는 목격담. 열흘 뒤 같은 필적의 둘째 편지는 "내가 범인"이라 했다.', s: '기록' },
    { q: '편지가 가리킨 곳에, 정말 있었다', a: '"철도병원 앞 공원 풀밭에 파묻었다." 경찰이 가 보니 — 수건과 창살이 실제로 나왔다.', s: '기록' },
    { q: '머리를 깎은 사내', a: '사건 날 저녁 8시쯤 관사 앞을 서성인 로이드 안경의 서른 살쯤 된 남자. 2년 뒤 잡힌 이노우에는 사건 뒤 머리를 짧게 깎고, 천리교에서 불교로 개종했다.', s: '기록' },
    { q: '정부(情夫)라는 소문', a: '이노우에는 용산 시절부터 오하시 부부와 알던 사이. 부산에서 히사코와 자주 만나 \'정부\'라는 소문이 돌았다.', s: '소문' },
    { q: '주인과 하녀', a: '집주인과 마리아가 가까웠고, 그래서 아내가 질투했다는 추리도 붙었다. 1933년 잡지 『별건곤』이 적은 세 가지 짐작 가운데 하나다. 뒷받침할 기록은 없다.', s: '소문' },
    { q: '한 번 무죄면, 끝', a: '1933년 11월 예심은 "주범 히사코, 종범 이노우에"라 했다. 그러나 검사는 일사부재리를 들어 히사코를 기소하지 않았다.', s: '기록' },
    { q: '조선인들의 눈', a: '조선인 가정부가 일본인 고등관의 관사에서 숨진 사건. 배석판사 한 명을 빼면 판사·검사·피고·증인이 모두 일본인이었다. 방청석은 새벽부터 찼다.', s: '기록' },
    { q: '무대 위의 이름', a: '2019년 7월 연극 「그때, 변홍례」(극단 하땅세, 연출 윤시중)는 그를 별명이 아닌 이름으로 불렀다. — 현대의 재해석 자료다.', s: '후대' },
    { q: '그 밤만, 옆방', a: '남편이 떠난 뒤 히사코는 줄곧 응접실에서 잤다. 그런데 그날 밤만은 — 마리아의 옆방에서 잤다.', s: '기록' },
    { q: '전구의 지문', a: '유일한 물증은 하녀 방 전구의 지문. 부산엔 감식 장비가 없어 경기도 경찰부로 보냈지만 — "희미해 감식이 어렵다"는 답이 돌아왔다.', s: '기록' },
    { q: '깨진 유리창', a: '2층 유리창이 깨진 것 말고는 집 안이 잘 정돈돼 있었다. 비에 땅이 질었는데도 마당엔 수상한 발자국 하나 없었다. 경찰 안에서 "집 안 사람"이라는 의견이 7대 3으로 많았다.', s: '기록' }
  ];
  var ROOMS = [
      { id: 'study', x: 40, y: 60, w: 395, h: 230, t: '응접실', hj: '應接室', y_: [12], note: ['남편이 떠난 뒤, 아씨는 줄곧 여긔서 잣소.', '남편이 떠난 뒤, 안주인은 줄곧 여기서 잤다.'] },
      { id: 'wife', x: 435, y: 60, w: 395, h: 230, t: '안방', hj: '內房', y_: [0], note: ['밤 아홉 시, 마리아는 이 방 이부자리를 펴고 인사하엿소.', '밤 9시, 마리아는 이 방 이부자리를 펴고 인사했다.'] },
      { id: 'hall', x: 40, y: 290, w: 790, h: 70, t: '복도', hj: '廊下', y_: [2], note: '' },
      { id: 'door', x: 40, y: 360, w: 170, h: 140, t: '현관', hj: '玄關', y_: [6, 7], note: ['밧게서 드나든 사내들.', '밖에서 드나든 남자들.'] },
      { id: 'found', x: 210, y: 360, w: 230, h: 140, t: '하녀 방', hj: '下女房 · 發見', y_: [3, 13], note: ['아츰 열 시, 아씨가 이 문을 열엇소.', '아침 10시, 안주인이 이 문을 열었다.'], hot: 1 },
      { id: 'maid', x: 440, y: 360, w: 230, h: 140, t: '엽방', hj: '그 밤의 방', y_: [1], note: ['그 밤만 — 아씨는 여긔서 잣소. 벽 한 겹 너머가 하녀 방이엇소.', '그날 밤만 — 안주인은 여기서 잤다. 벽 한 겹 너머가 가정부 방이었다.'] },
      { id: 'kitchen', x: 670, y: 360, w: 160, h: 140, t: '부엌', hj: '臺所', y_: [], note: ['검사는 — 범인이 이 부엌문으로 드나들엇다 하엿소.', '검사는 — 범인이 이 부엌문으로 드나들었다고 했다.'] }
    ];
  var EXTRA = [
      { id: 'window', cx: 325, cy: 40, t: '유리문 밧', y_: [4, 14], note: ['편지의 사내는, 유리문 안을 드려다보앗다 하엿소.', '편지의 남자는, 유리문 안을 들여다보았다고 했다.'] },
      { id: 'park', cx: 930, cy: 430, t: '철도병원 압 공원', y_: [5], note: ['편지가 말한 곳에, 정말 잇섯소.', '편지가 말한 곳에, 정말 있었다.'] }
    ];
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var t0 = function (x) { return x == null ? '' : (Array.isArray(x) ? x[0] : x); };
  var NUMS = ['一', '二', '三', '四', '五', '六', '七'];

  /* ════ 第二話 · 관사 평면도 ════ */
  (function () {
    var TG = { '기록': 'rec', '후대': 'later', '소문': 'rumor' };
    var svg = '<svg viewBox="0 0 1000 560" aria-label="관사 15호 평면도 (재현)">' +
      ROOMS.map(function (r) {
        return '<g class="hs-room' + (r.hot ? ' hot' : '') + '" data-id="' + r.id + '"><rect x="' + r.x + '" y="' + r.y + '" width="' + r.w + '" height="' + r.h + '"/>' +
          '<text class="t" x="' + (r.x + r.w / 2) + '" y="' + (r.y + r.h / 2 + 4) + '">' + r.t + '</text>' + (r.h > 100 ? '<text class="h" x="' + (r.x + r.w / 2) + '" y="' + (r.y + r.h / 2 + 40) + '">' + r.hj + '</text>' : '') + '</g>';
      }).join('') +
      '<path class="ink" d="M280 60 h90"/><path class="ink" d="M840 430 h56 m-14 -10 l14 10 l-14 10"/>' +
      EXTRA.map(function (e) { var cy = e.id === 'window' ? 34 : 430, cx = e.id === 'window' ? 325 : 945; return '<g class="hs-ex" data-id="' + e.id + '"><circle cx="' + cx + '" cy="' + cy + '" r="26"/><text x="' + cx + '" y="' + (cy + 9) + '">' + (e.id === 'window' ? '窓' : '園') + '</text></g>'; }).join('') +
      '<text class="cap" x="40" y="548">鐵道官舍 第十五號 · 平面圖 (재현 — 실제 구조는 전하지 않음)</text></svg>';
    var chips = ROOMS.concat(EXTRA).map(function (r) { return '<button data-id="' + r.id + '">' + r.t + '</button>'; }).join('');
    $('#hsPlan').innerHTML = '<div class="hs-svg">' + svg + '</div><div class="hs-chips">' + chips + '</div>';
    function show(id) {
      var r = ROOMS.concat(EXTRA).filter(function (x) { return x.id === id; })[0]; if (!r) return;
      $$('#hsPlan [data-id]').forEach(function (g) { g.classList.toggle('on', g.dataset.id === id); });
      var h = '<figure class="hs-ph"><img alt="' + r.t + ' (재현 그림)" src="./img/room_' + r.id + '.jpg"><span class="rt">그림 · 재현</span></figure><div class="hs-tx"><small>이 방에 남은 이야기</small><h3>' + r.t + (r.hj ? ' <em>' + r.hj + '</em>' : '') + '</h3>' +
        (t0(r.note) ? '<p class="lead">' + t0(r.note) + '</p>' : '') +
        r.y_.map(function (k) { var y = YASA[k]; return '<div class="hs-y"><i class="' + TG[y.s] + '">' + (y.s === '후대' ? '후대 정리' : y.s) + '</i><b>' + y.q + '</b><p>' + y.a + '</p></div>'; }).join('') + '</div>';
      var n = $('#hsNote'); n.innerHTML = h; n.scrollTop = 0;
      var c = $('#hsPlan .hs-chips .on'); if (c && c.scrollIntoView) c.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
    D.addEventListener('click', function (e) { var g = e.target.closest('#hsPlan [data-id]'); if (g) show(g.dataset.id); });
    W.addEventListener('mb:open', function (e) { if (e.detail === 'shHouse' && !$('#hsNote').innerHTML) show('maid'); });
  })();

  /* ════ 第四話 · 여섯 날의 지면 (공통 장치) ════ */
  ARTS.forEach(function (a, i) { a.hook = HOOK[i]; });
  var ADB = '../assets/ads/day/mr_';
  W.mb.paper({ arts: ARTS, imgBase: './img/scan/', era: '소화 륙 년', shop: '../shop.html#underside',
    ads: { '19310813': { top: .79, h: .19, img: ADB + '19310813_band.jpg' },
      '19310902': { top: .795, h: .16, img: ADB + '19310902_band.jpg', cap: '일홈 업는 투서가 수사를 다시 움직엿다는 구월 이일 지면, 그 맨 아래칸이오. 「박사의 약」 · 「후미나인」 같은 약 광고가 줄지어 잇소.', say: '가튼 장 우에선 범인을 다시 쫏고, 아래칸은 약을 팔앗소.' },
      '19310916': { top: .81, h: .17, img: ADB + '19310916_band.jpg' } } });

  var tone = function (k) { if (W.mb.tone) W.mb.tone(k); };
  /* 글자를 한 자씩 (깜빡임 업시) */
  function typeIn(el, text, ms, done) {
    var i = 0; el.textContent = ''; el.classList.add('typing');
    (function f() { el.textContent = text.slice(0, ++i); if (i % 3 === 0) tone('type'); if (i < text.length) setTimeout(f, ms); else { el.classList.remove('typing'); if (done) done(); } })();
  }
  W.mb.typeIn = typeIn;

  /* ════ 第一話 · 연판 — 손가락으로 문지르면 지면이 드러남 ════ */
  (function () {
    var root = $('#mrPlate'); if (!root) return;
    var box = $('.pl-box', root), pts = [], drawn = 0;
    function paint() {
      var m = pts.map(function (p) { return 'radial-gradient(circle 64px at ' + p[0] + 'px ' + p[1] + 'px,#000 55%,transparent 100%)'; }).join(',') || 'radial-gradient(circle 0 at 0 0,#000,transparent)';
      var img = $('.paper', box); img.style.webkitMaskImage = m; img.style.maskImage = m;
    }
    function at(e) {
      var r = box.getBoundingClientRect(), t = e.touches ? e.touches[0] : e;
      pts.push([Math.round(t.clientX - r.left), Math.round(t.clientY - r.top)]); if (pts.length > 60) pts.shift();
      drawn++; paint(); if (drawn === 1) root.classList.add('touched'); if (drawn > 70) all();
    }
    function all() { root.classList.add('open'); var img = $('.paper', box); img.style.webkitMaskImage = 'none'; img.style.maskImage = 'none'; }
    box.addEventListener('touchstart', function (e) { at(e); }, { passive: true });
    box.addEventListener('touchmove', function (e) { at(e); if (!root.classList.contains('open')) e.preventDefault(); }, { passive: false });
    box.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') at(e); });
    $('.pl-all', root).addEventListener('click', all);
    paint();
  })();

  /* ════ 第三話 · 시계 — 내려갈수록 바늘이 돌고, 밤이 깁허짐 ════ */
  (function () {
    var rail = $('#ckRail'), items = $$('#c3 .mr-tl > li'); if (!rail || !items.length) return;
    var H = [12, 18, 21, 21, 22, 23, 23.5, 24, 25, 25.5, 27, 30, 34];
    var LBL = ['낫', '저녁 여섯 시', '밤 아홉 시', '밤 아홉 시', '밤 열 시', '밤 열한 시', '열한 시 ~ 열두 시', '열두 시', '새벽 한 시', '새벽 한 시 반', '새벽 세 시', '아츰 여섯 시', '아츰 열 시'];
    var ticks = ''; for (var k = 0; k < 60; k++) { var a = k * 6 * Math.PI / 180, r1 = k % 5 ? 43 : 39; ticks += '<line x1="' + (50 + Math.sin(a) * r1).toFixed(1) + '" y1="' + (50 - Math.cos(a) * r1).toFixed(1) + '" x2="' + (50 + Math.sin(a) * 46).toFixed(1) + '" y2="' + (50 - Math.cos(a) * 46).toFixed(1) + '"' + (k % 5 ? '' : ' class="h"') + '/>'; }
    var nums = ['XII', 'I', 'II', 'III', 'IIII', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI'].map(function (n, i) { var a = i * 30 * Math.PI / 180; return '<text x="' + (50 + Math.sin(a) * 31).toFixed(1) + '" y="' + (53 - Math.cos(a) * 31).toFixed(1) + '">' + n + '</text>'; }).join('');
    rail.innerHTML = '<svg class="ck-face" viewBox="0 0 100 100"><circle cx="50" cy="50" r="48"/>' + ticks + nums + '<line class="hh" x1="50" y1="50" x2="50" y2="27"/><line class="mm" x1="50" y1="50" x2="50" y2="14"/><circle class="pin" cx="50" cy="50" r="2.4"/></svg>' +
      '<div class="ck-read"><small>소화 륙 년 칠월 삼십일일 ~</small><b id="ckT">낫</b><span id="ckW"></span></div>';
    var cur = -1, hourAngle = 0, minAngle = 0;
    function set(i) {
      if (i === cur) return; var prev = cur; cur = i;
      var h = H[i], ha = h * 30, ma = (h % 1) * 360 + Math.floor(h) * 360; /* 분침은 시간만큼 돌아감 */
      $('.hh', rail).style.transform = 'rotate(' + ha + 'deg)'; $('.mm', rail).style.transform = 'rotate(' + ma + 'deg)';
      $('#ckT').textContent = LBL[i];
      var tag = $('i', items[i]); $('#ckW').innerHTML = tag ? tag.outerHTML : '';
      items.forEach(function (li, k) { li.classList.toggle('now', k === i); if (k <= i) li.classList.add('seen'); });
      var night = Math.min(1, Math.max(0, (h - 17) / 8)) - Math.max(0, (h - 29) / 6);
      $('#c3').style.setProperty('--nt', night.toFixed(2));
      rail.classList.toggle('key', items[i].classList.contains('key'));
      if (prev >= 0) tone('tick');
    }
    var tick = false;
    function onScroll() {
      tick = false; var mid = W.innerHeight * .5, best = -1, bd = 1e9;
      items.forEach(function (li, k) { var r = li.getBoundingClientRect(), d = Math.abs(r.top + Math.min(r.height, 200) / 2 - mid); if (r.bottom > 80 && r.top < W.innerHeight && d < bd) { bd = d; best = k; } });
      if (best >= 0) set(best);
    }
    W.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
  })();

  /* ════ 第五話 · 취재 수첩 — 표지를 열고, 한 장씩 넘김 ════ */
  (function () {
    var I = 0, opened = false;
    $('#mrCast').innerHTML = PEOPLE.map(function (p, i) {
      return '<button type="button" data-p="' + i + '"><span class="ph"><img src="' + p.mj + '" alt="" loading="lazy"></span><b>' + p.tab + '</b>' + (p.stamp ? '<i>' + p.stamp + '</i>' : '<i class="q">?</i>') + '</button>';
    }).join('');
    function tabs() { $('#bkTabs').innerHTML = PEOPLE.map(function (p, i) { return '<button data-p="' + i + '" class="' + (i === I ? 'on' : '') + '">' + p.tab + '</button>'; }).join(''); }
    function page(p) {
      var h = '<article class="bk-pg' + (p.last ? ' last' : '') + '"><div class="bk-top"><figure class="bk-ph"><i class="clip"></i><img src="' + p.mj + '" alt="' + (p.name || '범인') + ' (재현 사진)"><figcaption>사진은 재현 — 얼골은 남기지 아니함</figcaption></figure>' +
        '<div class="bk-id"><small>인물 조사 · 뎨 ' + (I + 1) + ' 호</small><b>' + (p.name || '') + '</b>' + (p.hj ? '<span>' + p.hj + '</span>' : '') + '</div>' + (p.stamp ? '<i class="bk-st">' + p.stamp + '</i>' : '') + '</div>';
      h += '<dl class="bk-f">' + p.f.map(function (f) { return '<div><dt>' + t0(f[0]) + '</dt><dd>' + (t0(f[1]) || '<span class="blank"></span>') + '</dd></div>'; }).join('') + '</dl>';
      h += '<h4>취재 일지</h4><ol class="bk-j">' + p.j.map(function (j) { return '<li><b>' + t0(j[0]) + '</b><p>' + t0(j[1]) + '</p></li>'; }).join('') + '</ol>';
      if (p.q) h += '<div class="bk-q"><small>의문</small>' + t0(p.q) + '</div>';
      h += '<button class="bk-clip" type="button" data-zoom="' + p.clip[0] + '" data-cap="' + p.clip[1] + '"><img src="' + p.clip[0] + '" alt="' + p.clip[1] + '" loading="lazy"><span><b>原文 오려 붓친 것</b>' + p.clip[1] + '</span></button>';
      h += '<div class="bk-go"><small>이어진 사람</small>' + p.go.map(function (id) { var k = 0; PEOPLE.forEach(function (x, i) { if (x.id === id) k = i; }); return '<button data-p="' + k + '">' + PEOPLE[k].tab + ' →</button>'; }).join('') + '</div>';
      h += '<p class="bk-foot">동아일보 사회부 · 부산 출장 취재 수첩 · ' + (I + 1) + ' / ' + PEOPLE.length + '</p></article>';
      return h;
    }
    function render(dir) {
      var bd = $('#bkBody');
      bd.innerHTML = '<div class="bk-leaf ' + (dir > 0 ? 'in-r' : dir < 0 ? 'in-l' : '') + '">' + page(PEOPLE[I]) + '</div>'; bd.scrollTop = 0; tabs();
      var on = $('#bkTabs .on'); if (on && on.scrollIntoView) on.scrollIntoView({ inline: 'center', block: 'nearest' });
      var st = $('.bk-st', bd); if (st) setTimeout(function () { st.classList.add('down'); tone('stamp'); }, 650);
    }
    function go(k) { if (k < 0 || k >= PEOPLE.length || k === I) return; var d = k > I ? 1 : -1; I = k; render(d); W.mb.sfx('whoosh', .25); }
    function open() { opened = true; $('#bkCover').classList.add('gone'); render(0); }
    D.addEventListener('click', function (e) {
      var c = e.target.closest('#mrCast [data-p]'); if (c) { I = +c.dataset.p; W.mb.open('shBook'); return; }
      if (e.target.closest('.bk-open')) { open(); return; }
      var t = e.target.closest('#bkTabs [data-p], #bkBody .bk-go [data-p]'); if (t) go(+t.dataset.p);
    });
    (function () { var el = $('#bkBody'), x0 = null, y0 = 0;
      el.addEventListener('touchstart', function (e) { x0 = e.touches[0].clientX; y0 = e.touches[0].clientY; }, { passive: true });
      el.addEventListener('touchend', function (e) { if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0, dy = e.changedTouches[0].clientY - y0; x0 = null; if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) go(I + (dx < 0 ? 1 : -1)); }, { passive: true });
    })();
    W.addEventListener('mb:open', function (e) { if (e.detail === 'shBook') { if (opened) render(0); else { $('#bkCover').classList.remove('gone'); $('#bkBody').innerHTML = ''; tabs(); } } });
  })();

  /* ════ 第六話 · 괴투서 ════ */
  $('#mrSteps').innerHTML = STEPS.map(function (s) { return '<li class="mb-rv' + (s.key ? ' key' : '') + '"><b>' + t0(s.b) + ' · ' + t0(s.h) + '</b><p>' + t0(s.s) + '</p></li>'; }).join('');
  (function () {
    var found = {}, chk = {}, env = false, built = false;
    function build() {
      built = true;
      var h = '<section class="lt-sec desk"><div class="lt-hd"><b>鑑定書 · 필적 감정</b><span id="ltN">0 / 3</span></div>' +
        '<p class="lt-hint">확대경을 손가락으로 끌어, 편지 우를 천천히 살피시압. 같은 손의 버릇이 세 군데 숨어 잇소.</p>' +
        '<figure class="lt-sheet" id="ltSheet"><img src="./img/letter1.png" alt="붓으로 쓴 괴투서 (재현 그림)" draggable="false">' +
        SPOTS.map(function (s, i) { return '<span class="lt-mark" data-s="' + i + '" style="left:' + s.x + '%;top:' + s.y + '%"><em>' + t0(s.t) + '</em></span>'; }).join('') +
        '<span class="lt-lens" id="ltLens"><i></i></span><span class="lt-match">筆跡<br>一致</span><span class="rt">그림 · 재현</span></figure>' +
        '<ul class="lt-found">' + SPOTS.map(function (s, i) { return '<li data-s="' + i + '"><b>' + t0(s.t) + '</b><span>— 아즉 차지 못함</span></li>'; }).join('') + '</ul></section>';
      h += '<section class="lt-sec"><div class="lt-hd"><b>첫째 편지 · ' + LETTERS[0].d + '</b><span>부산경찰서 서장 친전</span></div><div class="lt-text" id="ltT1"></div></section>';
      h += '<section class="lt-sec"><div class="lt-hd"><b>둘째 편지 · ' + LETTERS[1].d + '</b><span>가튼 손 · 가튼 먹</span></div>' +
        '<button type="button" class="lt-env" id="ltEnv"><img src="./img/envelope.jpg" alt="봉투 (재현 그림)"><span>봉투를 뜻으시압</span></button><div class="lt-text two" id="ltT2" hidden></div></section>';
      h += '<section class="lt-sec"><div class="lt-hd"><b>편지 대 사실</b><span id="ltC">0 / 5</span></div><p class="lt-hint">줄을 눌러 도장을 찍으시압.</p>' +
        CHECK.map(function (c, i) { return '<button class="lt-ck ' + c.k + '" data-c="' + i + '"><q>' + c.c + '</q><span>' + c.f + '</span><i>' + c.st + '</i></button>'; }).join('') +
        '<p class="mb-q lt-end" id="ltEnd" hidden>편지를 쓴 이는 잡혓스나, 죽인 이는 업섯소.</p></section>';
      $('#ltBody').innerHTML = h;
      /* 확대경 */
      var sh = $('#ltSheet'), lens = $('#ltLens'), im = $('img', sh), dwell = {}, lx = 50, ly = 40;
      function place(px, py) {
        var r = sh.getBoundingClientRect(); lx = Math.max(0, Math.min(100, px)); ly = Math.max(0, Math.min(100, py));
        lens.style.left = lx + '%'; lens.style.top = ly + '%';
        var Z = 2.4, w = r.width * Z, hh = r.height * Z;
        lens.firstChild.style.backgroundImage = 'url(' + im.src + ')'; lens.firstChild.style.backgroundSize = w + 'px ' + hh + 'px';
        lens.firstChild.style.backgroundPosition = (-(lx / 100 * w) + 60) + 'px ' + (-(ly / 100 * hh) + 60) + 'px';
        SPOTS.forEach(function (s, i) {
          if (found[i]) return; var near = Math.abs(s.x - lx) < 9 && Math.abs(s.y - ly) < 7;
          if (near) { dwell[i] = dwell[i] || Date.now(); if (Date.now() - dwell[i] > 450) hit(i); } else dwell[i] = 0;
        });
      }
      function hit(i) {
        found[i] = 1; tone('stamp');
        $('.lt-mark[data-s="' + i + '"]', sh).classList.add('on');
        var li = $('.lt-found li[data-s="' + i + '"]'); li.classList.add('on'); $('span', li).textContent = t0(SPOTS[i].d);
        var n = Object.keys(found).length; $('#ltN').textContent = n + ' / 3';
        if (n === 3) setTimeout(function () { sh.classList.add('done'); tone('stamp'); }, 500);
      }
      function mv(e) { var r = sh.getBoundingClientRect(), t = e.touches ? e.touches[0] : e; place((t.clientX - r.left) / r.width * 100, (t.clientY - r.top - 50) / r.height * 100); }
      sh.addEventListener('touchstart', function (e) { sh.classList.add('hold'); mv(e); }, { passive: true });
      sh.addEventListener('touchmove', function (e) { e.preventDefault(); mv(e); }, { passive: false });
      sh.addEventListener('touchend', function () { sh.classList.remove('hold'); });
      sh.addEventListener('pointermove', function (e) { if (e.pointerType === 'mouse') mv(e); });
      sh.addEventListener('click', function (e) { var m = e.target.closest('.lt-mark'); if (m) hit(+m.dataset.s); });
      setTimeout(function () { place(50, 40); }, 60);
      /* 첫째 편지 — 한 줄씩 */
      var t1 = $('#ltT1'), L1 = LETTERS[0].lines;
      var io = new IntersectionObserver(function (es) { if (!es[0].isIntersecting) return; io.disconnect();
        var k = 0; (function nx() { if (k >= L1.length) return; var p = D.createElement('p'); if (k === L1.length - 1) p.className = 'r'; t1.appendChild(p); typeIn(p, t0(L1[k++]), 38, function () { setTimeout(nx, 260); }); })();
      }, { root: $('#ltBody'), threshold: .4 }); io.observe(t1);
    }
    D.addEventListener('click', function (e) {
      if (e.target.closest('#ltEnv')) {
        if (env) return; env = true; var b = $('#ltEnv'); b.classList.add('torn'); W.mb.sfx('whoosh', .4);
        setTimeout(function () { b.hidden = true; var t2 = $('#ltT2'); t2.hidden = false; var L2 = LETTERS[1].lines, k = 0;
          (function nx() { if (k >= L2.length) return; var p = D.createElement('p'); if (k === L2.length - 1) p.className = 'r big'; t2.appendChild(p); typeIn(p, t0(L2[k++]), 70, function () { setTimeout(nx, 500); }); })(); }, 700);
        return;
      }
      var c = e.target.closest('#ltBody [data-c]'); if (c && !c.classList.contains('on')) {
        c.classList.add('on'); chk[c.dataset.c] = 1; tone('stamp'); var n = Object.keys(chk).length; $('#ltC').textContent = n + ' / 5';
        if (n === 5) setTimeout(function () { $('#ltEnd').hidden = false; }, 600);
      }
    });
    W.addEventListener('mb:open', function (e) { if (e.detail === 'shLetter' && !built) build(); });
  })();

  /* ════ 第七話 · 진술 대조 — 도장이 찍히고, 긔록이 타자로 ════ */
  (function () {
    var als = $$('#c7 .al');
    als.forEach(function (b) {
      var sp = $('span', b), full = sp.textContent; sp.textContent = '';
      b.addEventListener('click', function () {
        if (b.classList.contains('on')) return; b.classList.add('on'); tone('stamp');
        typeIn(sp, full, 26);
        var n = $$('#c7 .al.on').length; $('#alN').textContent = n;
        if (n === als.length) setTimeout(function () { $('#c7').classList.add('all'); }, 1600);
      });
    });
  })();
  /* ════ 第八話 · 봉한 쪽지 ════ */
  $$('#c8 .sl').forEach(function (b) { b.addEventListener('click', function () { if (!b.classList.contains('open')) { b.classList.add('open'); W.mb.sfx('whoosh', .3); } }); });

  /* ════ 第十話 · 방청석 — 말이 한 자씩 ════ */
  (function () {
    var qs = $$('#mrCourt .qa'), n = 0, btn = $('#ctNext'), busy = false;
    var texts = qs.map(function (q) { return $$('p', q).map(function (p) { var b = $('b', p), t = p.textContent.replace(b.textContent, ''); return [b.outerHTML, t]; }); });
    qs.forEach(function (q) { q.hidden = true; });
    function say(p, pair, done) { p.innerHTML = pair[0] + '<span class="tx"></span>'; var dots = D.createElement('span'); dots.className = 'dots'; dots.textContent = '…'; p.appendChild(dots);
      setTimeout(function () { dots.remove(); typeIn($('.tx', p), pair[1], 42, done); }, 700); }
    function next() {
      if (busy) return;
      if (n >= qs.length) { var t = $('#c11'); W.scrollTo({ top: t.getBoundingClientRect().top + W.scrollY - 48, behavior: 'smooth' }); return; }
      busy = true; var q = qs[n], ps = $$('p', q), tx = texts[n]; q.hidden = false; q.classList.add('in'); n++;
      if (n === 1) tone('gavel');
      ps[1].style.visibility = 'hidden';
      say(ps[0], tx[0], function () { setTimeout(function () { ps[1].style.visibility = ''; say(ps[1], tx[1], function () {
        busy = false; btn.innerHTML = '다음 문답 ▸ <span id="ctN">' + n + ' / ' + qs.length + '</span>';
        if (n >= qs.length) { btn.innerHTML = '공판 끗 — 第十一話 판결로 ↓'; $('#c10').classList.add('end'); }
      }); }, 500); });
      setTimeout(function () { var r = q.getBoundingClientRect(); if (r.bottom > W.innerHeight - 120) W.scrollBy({ top: r.bottom - W.innerHeight + 200, behavior: 'smooth' }); }, 300);
    }
    btn.innerHTML = '공판을 시작하오 ▸ <span id="ctN">0 / 7</span>';
    btn.addEventListener('click', next);
  })();

  /* ════ 終章 · 그때와 이제 ════ */
  (function () {
    var root = $('#mrPlace'), cur = 0;
    function draw() {
      var p = PLACES[cur];
      root.innerHTML = '<div class="mb-seg three">' + PLACES.map(function (x, i) { return '<button data-i="' + i + '" class="' + (i === cur ? 'on' : '') + '">0' + (i + 1) + ' ' + x.name + '</button>'; }).join('') + '</div>' +
        '<div class="mb-pair"><figure><img src="' + p.then + '" alt="' + p.name + ' 그때 모습" loading="lazy"><figcaption>그때 · 옛 사진</figcaption></figure><figure><img src="' + p.now + '" alt="' + p.name + ' 지금 모습" loading="lazy"><figcaption>이제 · 오늘</figcaption></figure></div>' +
        '<div class="mb-move"><div><small>그때 자리</small><b>' + t0(p.thenAddr) + '</b></div><i>→</i><div><small>이제 자리</small><b>' + t0(p.nowAddr) + '</b></div></div>' +
        '<p class="mb-p" style="margin-top:16px"><b>' + p.name + ' · ' + t0(p.sub) + '</b><br>' + t0(p.text) + '</p>';
    }
    root.addEventListener('click', function (e) { var b = e.target.closest('[data-i]'); if (b) { cur = +b.dataset.i; draw(); } });
    draw();
  })();

  /* ════ 第十二話 · 라듸오 (공통 장치) ════ */
  W.mb.radio({ st: ST, audioBase: '../case/audio/maria/', staticSrc: '../case-jukcheomjeong/audio/radio-static.mp3', endLine: '여전히, 긔록은 우리 겨테서 소근거리고 잇소.' });
})(window, document);
