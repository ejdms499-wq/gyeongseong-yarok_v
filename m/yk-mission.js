/* ════════════════════════════════════════════════════════════════
   경성야록 · 견습 긔자 (yk-mission.js) — 읽고 난 뒤, 직접 해 보는 두 가지 일
     第一 校閱 : 빨간 연필로 지난 지면의 말에 줄을 긋고, 까닭 도장(未確認 · 偏見 · 身上)을 찍음 → 편집국장 판정
     第二 組版 : 제목 활자를 골라(선정적인 제목은 반려) 「바로잡습니다」 호외 한 장을 찍어 냄 → 인쇄
   - 넣는 자리: 「그해의 지면」(.yke) 안, 연표 신문 바로 아래 · 독자 투고 우
   - 사건 내용은 아래 YK_MISSION 데이터에만 (사건을 더할 때 한 덩어리만 보탬)
   - 지면 인용은 사이트 본문에 이미 실린 원문 인용만 씀 (지어낸 원문 업슴)
   - 그림 자리(업서도 됨): assets/mission/desk.jpg · type.jpg · paper.jpg
   ════════════════════════════════════════════════════════════════ */
(function (W, D) {
  'use strict';
  if (W.ykMission) return;
  var STAMP = {
    '未': { hj: '未確認', t: '확인 안 된 말', d: '짐작 · 의심을 사실처럼 적은 말' },
    '偏': { hj: '偏見', t: '편견', d: '한 무리의 사람을 탓하거나 깎아내리는 말' },
    '身': { hj: '身上', t: '지나친 신상', d: '수사받는 이의 집 · 직업 · 가족을 드러낸 말' }
  };
  W.YK_MISSION = W.YK_MISSION || {};
  W.YK_MISSION.jk = {
    cite: '인용 · 동아일보 1933.5.17 · 5.18 · 6.2 (6.2자는 전봉관 글에서 재인용 · 이름은 가림)',
    lines: [
      { d: '5.17', who: '기사', segs: [
        { t: '"남녀를 분간할 수는 없으나' , keep: '알 수 업다는 것을 알 수 업다고 적은 말 — 정직한 말이오.' },
        { t: '머리를 깎은 것을 보아 사내아이 같다"', bad: ['未'], why: '짐작을 사실처럼 적엇소.', fix: '한 살 난 여자아이였다.' }] },
      { d: '5.17', who: '기사', segs: [
        { t: '"문둥병 환자의 짓이 아닌가"', bad: ['偏'], why: '한 무리의 사람을 범인으로 짐작한 편견이오.', fix: '편견이었다. 걸인과 한센인 백여 명이 붙들렸다 풀려났다.' }] },
      { d: '5.17', who: '서대문서장의 말', segs: [
        { t: '"범행은 금일 새벽,', bad: ['未'], why: '살인이 잇섯는지조차 확인되지 안앗소.', fix: '죽인 사람은 없었다. 아이는 병으로 숨졌다.' },
        { t: '원한이나 치정관계에서 나온 것이 아닌가"', bad: ['未', '偏'], why: '근거 업는 동기 짐작이오.', fix: '원한도, 치정도 없었다.' }] },
      { d: '5.18', who: '서대문서장의 말', segs: [
        { t: '"사건이 오리무중으로 들어간다고 꾸지람을 해도 하는 수 없습니다"', keep: '수사가 막혓다는 서장의 말을 그대로 옮긴 것 — 남겨 두어야 할 사실이오.' }] },
      { d: '6.2', who: '기사', segs: [
        { t: '"유력한 혐의자로', bad: ['未'], why: '수사 단계의 의심을 단정으로 적엇소.', fix: '그 집 가장은 아이보다 먼저, 이미 숨진 사람이었다.' },
        { t: '시내 죽첨정에서 대금업을 하다 죽은 ○○○의 아들과 그의 전 가족 5명은', bad: ['身'], why: '수사받는 이의 동네 · 집안 일 · 가족을 밝혓소. 오늘은 쓰지 안소(무죄 추정).', fix: '가족은 열흘 만에 풀려났다.' },
        { t: '서대문서에 검거되어 엄밀한 취조를 받고 있다 …', keep: '검거와 조사는 그날 실제로 잇섯던 일이오.' },
        { t: '그러나 그들은 범행 일체를 부인하고 있다."', keep: '의심받는 이의 반론 — 꼭 남겨야 할 말이오.' }] }
    ],
    heads: [
      { t: '유력 혐의 일가 다섯, 서대문서에 검거', no: '6월 2일의 오보를 되풀이하오. 신상까지 드러내오.' },
      { t: '문둥병자의 소행인가 — 공포의 죽첨정', no: '편견과 공포를 파는 제목이오. 이 말이 백여 명을 붙들엇소.' },
      { t: '죽첨정 사건, 살인 아닌 「무덤 도굴」로 밝혀져', ok: 1 },
      { t: '혐의 받던 한 가족, 열흘 만에 풀려나 — 가장은 사건 전 이미 숨져', ok: 1 }
    ],
    lede: '1933년 5월, 죽첨정 매립지에서 발견된 어린아이의 머리는 살인의 흔적이 아니었다. 아이는 병으로 숨져 이미 묻혀 있었고, 그 무덤을 판 이들이 있었다. 지면이 23일 동안 받아 적은 말 가운데, 바로잡아야 할 것을 아래에 적는다.',
    orig: '원 보도 · 동아일보 1933.5.17 ~ 6.2',
    band: 'assets/gwanggo/day/jk_19330517_band.jpg', bandCap: '그날(1933.5.17) 지면의 맨 아래칸 — 실제 광고'
  };

  var BASE = (function () { try { var c = D.currentScript && D.currentScript.src; return c ? c.replace(/yk-mission\.js.*$/, '') : ''; } catch (e) { return ''; } })();
  function esc(t) { return String(t == null ? '' : t).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  var PENCIL = "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='26' height='26' viewBox='0 0 26 26'%3E%3Cpath d='M3 23l2-7L19 2l5 5L10 21z' fill='%23b0261b' stroke='%231d1813' stroke-width='1'/%3E%3Cpath d='M3 23l2-7 5 5z' fill='%23e9dcc0' stroke='%231d1813' stroke-width='1'/%3E%3Cpath d='M3 23l1-3 2 2z' fill='%231d1813'/%3E%3C/svg%3E\") 2 24, pointer";
  function css() {
    if (D.getElementById('ykm-css')) return;
    var s = D.createElement('style'); s.id = 'ykm-css';
    s.textContent = [
      '.ykm{position:relative;margin:34px 0 30px;padding:clamp(22px,3.4vw,40px) clamp(14px,3vw,36px) 30px;color:#efe6d2;font-family:"Nanum Myeongjo","Noto Serif KR",serif;',
      '  background:radial-gradient(ellipse 90% 70% at 30% 0%,rgba(255,220,160,.10),transparent 60%),linear-gradient(rgba(26,21,17,.86),rgba(26,21,17,.92)),url(' + BASE + 'assets/mission/desk.jpg) center/cover,#231d18;box-shadow:inset 0 0 0 1px rgba(239,230,210,.08),0 24px 50px rgba(20,14,10,.35)}',
      '.ykm-h{display:flex;flex-wrap:wrap;align-items:flex-end;justify-content:space-between;gap:14px 24px;padding-bottom:18px;border-bottom:1px solid rgba(239,230,210,.18)}',
      '.ykm-h .tg{display:inline-block;font:800 12px/1 "Nanum Myeongjo",serif;letter-spacing:.32em;padding:7px 9px 7px 11px;background:#b0261b;color:#f3ead6}',
      '.ykm-h h3{margin-top:12px;font:800 clamp(21px,2.4vw,28px)/1.4 "Nanum Myeongjo",serif;letter-spacing:.02em;word-break:keep-all}',
      '.ykm-h p{margin-top:6px;font:400 14px/1.8 "Noto Sans KR",sans-serif;color:rgba(239,230,210,.72);word-break:keep-all;max-width:620px}',
      '.ykm-steps{display:flex;gap:8px;list-style:none;margin:0;padding:0}',
      '.ykm-steps li{display:flex;align-items:center;gap:8px;padding:8px 12px;border:1px solid rgba(239,230,210,.25);font:500 12px/1 "Noto Sans KR",sans-serif;color:rgba(239,230,210,.6)}',
      '.ykm-steps li b{font:800 13px/1 "Nanum Myeongjo",serif;letter-spacing:.14em;color:rgba(239,230,210,.75)}',
      '.ykm-steps li.on{border-color:#efe6d2;color:#efe6d2}.ykm-steps li.on b{color:#f3ead6}',
      '.ykm-steps li.done{border-color:#b0261b}.ykm-steps li.done b:after{content:" ✓";color:#e08a7d}',
      /* 第一 校閱 */
      '.ykm-m{margin-top:28px}',
      '.ykm-mh{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin-bottom:14px}',
      '.ykm-mh b{font:900 15px/1 "Noto Serif KR",serif;letter-spacing:.3em;color:#e08a7d}',
      '.ykm-mh span{font:800 19px/1.4 "Nanum Myeongjo",serif}',
      '.ykm-mh em{font:400 13px/1.6 "Noto Sans KR",sans-serif;font-style:normal;color:rgba(239,230,210,.66)}',
      '.ykm-desk{display:grid;grid-template-columns:minmax(0,1fr) 260px;gap:22px;align-items:start}',
      '.ykm-galley{position:relative;background:#f1ead8;color:#1d1813;padding:26px 26px 22px 88px;transform:rotate(-.5deg);box-shadow:0 1px 0 #d8ccb1,0 18px 40px rgba(0,0,0,.45);',
      '  background-image:linear-gradient(90deg,transparent 70px,rgba(176,38,27,.35) 70px,rgba(176,38,27,.35) 71px,transparent 71px),repeating-linear-gradient(0deg,rgba(60,45,30,.035) 0 1px,transparent 1px 3px),linear-gradient(rgba(241,234,216,.72),rgba(241,234,216,.72)),url(' + BASE + 'assets/mission/paper.jpg) center/cover}',
      '.ykm-galley:before{content:"校 正 紙";position:absolute;left:18px;top:24px;writing-mode:vertical-rl;font:800 12px/1 "Nanum Myeongjo",serif;letter-spacing:.5em;color:rgba(176,38,27,.65)}',
      '.ykm-ln{position:relative;padding:12px 0 14px;border-bottom:1px dashed rgba(58,49,40,.28)}',
      '.ykm-ln:last-child{border-bottom:0}',
      '.ykm-ln .dt{position:absolute;left:-74px;top:14px;width:58px;text-align:right;font:700 12px/1.3 "Noto Sans KR",sans-serif;color:#7b7062}',
      '.ykm-ln .dt small{display:block;margin-top:3px;font:400 10px/1.3 "Noto Sans KR",sans-serif;letter-spacing:-.02em}',
      '.ykm-ln p{font:400 18px/2.05 "Nanum Myeongjo","Noto Serif KR",serif;letter-spacing:.01em;word-break:keep-all}',
      '.ykm-seg{all:unset;position:relative;cursor:' + PENCIL + ';border-radius:1px;transition:background .2s;-webkit-box-decoration-break:clone;box-decoration-break:clone}',
      '.ykm-seg:hover,.ykm-seg:focus-visible{background:rgba(176,38,27,.08);box-shadow:0 2px 0 rgba(176,38,27,.35)}',
      '.ykm-seg .st{position:absolute;left:0;top:52%;height:2.5px;width:0;background:#b0261b;border-radius:2px;transform:rotate(-.6deg);transition:width .45s cubic-bezier(.3,.7,.2,1);pointer-events:none}',
      '.ykm-seg.cut{color:rgba(29,24,19,.55)}.ykm-seg.cut .st{width:100%}',
      '.ykm-seg .mk{position:absolute;right:-6px;top:-15px;font:800 11px/1 "Nanum Myeongjo",serif;color:#b0261b;letter-spacing:.06em;transform:rotate(-6deg);white-space:nowrap;pointer-events:none;opacity:0;transition:opacity .3s .25s}',
      '.ykm-seg.cut .mk{opacity:1}',
      '.ykm-seg.ok-hit{background:rgba(66,110,60,.14)}.ykm-seg.miss{box-shadow:0 0 0 2px rgba(176,38,27,.6);background:rgba(176,38,27,.06)}.ykm-seg.wrong{background:rgba(196,140,40,.18)}',
      '.ykm-pop{position:absolute;z-index:20;display:flex;gap:6px;padding:8px;background:#1d1813;box-shadow:0 10px 26px rgba(0,0,0,.45);transform:translate(-50%,-100%) translateY(-10px)}',
      '.ykm-pop:after{content:"";position:absolute;left:50%;bottom:-6px;margin-left:-6px;border:6px solid transparent;border-bottom:0;border-top-color:#1d1813}',
      '.ykm-pop button{all:unset;cursor:pointer;display:flex;flex-direction:column;align-items:center;gap:4px;padding:7px 9px;border:1.5px solid #e08a7d;color:#f3ead6;min-width:54px;transition:background .2s}',
      '.ykm-pop button:hover,.ykm-pop button:focus-visible{background:#b0261b;border-color:#b0261b}',
      '.ykm-pop button b{font:800 13px/1 "Nanum Myeongjo",serif;letter-spacing:.08em}',
      '.ykm-pop button small{font:400 10px/1 "Noto Sans KR",sans-serif;opacity:.8}',
      '.ykm-pop .un{border-color:rgba(239,230,210,.4);justify-content:center}',
      '.ykm-chief{position:relative;background:#efe6d2;color:#1d1813;padding:18px 16px 16px;box-shadow:0 14px 30px rgba(0,0,0,.4);transform:rotate(.6deg)}',
      '.ykm-chief:before{content:"";position:absolute;left:50%;top:-9px;width:60px;height:18px;margin-left:-30px;background:rgba(239,230,210,.55);box-shadow:0 1px 2px rgba(0,0,0,.2);transform:rotate(-3deg)}',
      '.ykm-chief .k{font:500 10.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.32em;color:#8a2a21}',
      '.ykm-chief h4{margin:8px 0 10px;font:800 16px/1.45 "Nanum Myeongjo",serif;word-break:keep-all}',
      '.ykm-chief dl{display:grid;grid-template-columns:auto 1fr;gap:7px 10px;font:400 12px/1.5 "Noto Sans KR",sans-serif;color:#3e352c}',
      '.ykm-chief dt{font:800 12px/1 "Nanum Myeongjo",serif;color:#b0261b;border:1.5px solid #b0261b;padding:4px 5px 3px;align-self:start;transform:rotate(-3deg);white-space:nowrap}',
      '.ykm-chief .tip{margin-top:12px;font:400 12px/1.6 "Noto Sans KR",sans-serif;color:#5a5046;word-break:keep-all}',
      '.ykm-cnt{margin-top:12px;font:500 12.5px/1 "Noto Sans KR",sans-serif;color:#3e352c}.ykm-cnt b{color:#b0261b;font-size:15px}',
      '.ykm-btn{all:unset;box-sizing:border-box;cursor:pointer;display:block;width:100%;margin-top:12px;padding:12px 10px;background:#1d1813;color:#f3ead6;text-align:center;font:700 13.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.06em;transition:background .2s}',
      '.ykm-btn:hover,.ykm-btn:focus-visible{background:#b0261b}.ykm-btn.ghost{background:transparent;color:#1d1813;border:1px solid #1d1813}.ykm-btn.ghost:hover{background:#e3d8c2}',
      '.ykm-btn[disabled]{opacity:.35;cursor:default;pointer-events:none}',
      '.ykm-verdict{margin-top:18px;display:none}.ykm-verdict.on{display:block}',
      '.ykm-grade{position:relative;display:flex;align-items:center;gap:16px;flex-wrap:wrap;padding:16px 18px;background:rgba(239,230,210,.06);border:1px solid rgba(239,230,210,.18)}',
      '.ykm-seal{flex:none;display:grid;place-items:center;width:82px;height:82px;border:3px double #e0584a;border-radius:50%;color:#e0584a;font:900 22px/1 "Noto Serif KR",serif;letter-spacing:.05em;transform:rotate(-12deg);animation:ykmS .5s cubic-bezier(.2,1.4,.4,1) both}',
      '@keyframes ykmS{from{opacity:0;transform:rotate(-12deg) scale(1.5)}to{opacity:1;transform:rotate(-12deg) scale(1)}}',
      '.ykm-grade p{flex:1;min-width:220px;font:400 14px/1.75 "Noto Sans KR",sans-serif;color:rgba(239,230,210,.85);word-break:keep-all}',
      '.ykm-grade p b{display:block;font:800 18px/1.4 "Nanum Myeongjo",serif;color:#f3ead6;margin-bottom:2px}',
      '.ykm-list{list-style:none;margin:12px 0 0;padding:0;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px}',
      '.ykm-list li{padding:12px 14px;background:#efe6d2;color:#1d1813;font:400 13px/1.65 "Noto Sans KR",sans-serif;word-break:keep-all;border-left:4px solid #7b7062}',
      '.ykm-list li.g{border-left-color:#4f7a48}.ykm-list li.b{border-left-color:#b0261b}.ykm-list li.w{border-left-color:#c48c28}',
      '.ykm-list li q{display:block;font:700 14px/1.5 "Nanum Myeongjo",serif;quotes:none;margin-bottom:4px}',
      '.ykm-list li i{font-style:normal;font-weight:700}',
      '.ykm-list li .fx{display:block;margin-top:4px;color:#3e352c}.ykm-list li .fx:before{content:"진상 · ";color:#8a2a21;font-weight:700}',
      /* 第二 組版 */
      '.ykm-type{margin-top:40px;padding-top:28px;border-top:1px solid rgba(239,230,210,.18)}',
      '.ykm-type.lock .ykm-bench{opacity:.4;pointer-events:none}',
      '.ykm-lockn{display:none;margin:-4px 0 12px;font:400 13px/1.6 "Noto Sans KR",sans-serif;color:#e08a7d}.ykm-type.lock .ykm-lockn{display:block}',
      '.ykm-bench{display:grid;grid-template-columns:minmax(0,1fr) 300px;gap:22px;align-items:start}',
      '.ykm-chase{min-height:84px;display:grid;place-items:center;padding:14px 18px;border:6px solid #4a4038;background:#2c2620;box-shadow:inset 0 0 0 1px rgba(0,0,0,.6),inset 0 6px 18px rgba(0,0,0,.6)}',
      '.ykm-chase .em{font:400 13px/1.6 "Noto Sans KR",sans-serif;color:rgba(239,230,210,.45);text-align:center}',
      '.ykm-chase .hd{font:800 clamp(18px,2vw,23px)/1.45 "Nanum Myeongjo",serif;text-align:center;color:#f3ead6;word-break:keep-all;animation:ykmIn .45s ease both}',
      '@keyframes ykmIn{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:none}}',
      '.ykm-cases{margin-top:12px;display:grid;gap:8px}',
      '.ykm-slug{all:unset;box-sizing:border-box;cursor:pointer;display:flex;align-items:center;gap:12px;padding:12px 14px;background:linear-gradient(#5b524a,#3d3530);color:#efe6d2;box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 3px 0 #1a1512,0 6px 12px rgba(0,0,0,.35);font:700 15px/1.45 "Nanum Myeongjo",serif;word-break:keep-all;transition:transform .2s,box-shadow .2s}',
      '.ykm-slug:before{content:"";flex:none;width:6px;align-self:stretch;background:repeating-linear-gradient(#2a241f 0 2px,#6d645b 2px 4px)}',
      '.ykm-slug:hover,.ykm-slug:focus-visible{transform:translateY(-2px);box-shadow:inset 0 1px 0 rgba(255,255,255,.18),0 5px 0 #1a1512,0 10px 16px rgba(0,0,0,.4)}',
      '.ykm-slug.on{outline:2px solid #efe6d2;outline-offset:2px}',
      '.ykm-slug.no{background:linear-gradient(#5a3a34,#3c2622);color:rgba(239,230,210,.6)}',
      '.ykm-ret{display:none;margin-top:10px;padding:10px 12px;border:1.5px solid #e0584a;color:#f3ead6;font:400 13px/1.6 "Noto Sans KR",sans-serif;word-break:keep-all}',
      '.ykm-ret.on{display:block;animation:ykmIn .35s ease both}.ykm-ret b{color:#e0584a;margin-right:6px;font-family:"Noto Serif KR",serif}',
      '.ykm-card{background:#efe6d2;color:#1d1813;padding:16px 16px 14px;box-shadow:0 14px 30px rgba(0,0,0,.4)}',
      '.ykm-card label{display:block;font:500 11px/1 "Noto Sans KR",sans-serif;letter-spacing:.24em;color:#8a2a21;margin:4px 0 7px}',
      '.ykm-card input,.ykm-card textarea{box-sizing:border-box;width:100%;border:0;border-bottom:1.5px solid #1d1813;background:transparent;padding:6px 2px;font:700 17px/1.4 "Nanum Myeongjo",serif;color:#1d1813;outline:0;resize:none}',
      '.ykm-card textarea{font:400 14px/1.7 "Noto Sans KR",sans-serif;border:1px solid rgba(29,24,19,.4);padding:8px;margin-bottom:2px}',
      '.ykm-card input:focus,.ykm-card textarea:focus{border-color:#b0261b}',
      '.ykm-card .nm{display:flex;align-items:center;gap:8px;margin-bottom:14px}.ykm-card .nm span{flex:none;font:800 13px/1 "Nanum Myeongjo",serif;letter-spacing:.1em}',
      /* 호외 한 장 */
      '.ykm-out{display:none;margin-top:26px}.ykm-out.on{display:block}',
      '.ykm-sheet{position:relative;max-width:760px;margin:0 auto;background:#f2ebd9;color:#16110d;padding:22px 28px 18px;box-shadow:0 26px 60px rgba(0,0,0,.55);',
      '  background-image:repeating-linear-gradient(0deg,rgba(60,45,30,.03) 0 1px,transparent 1px 3px),radial-gradient(ellipse at 40% 20%,rgba(246,240,224,.78),rgba(230,220,196,.7)),url(' + BASE + 'assets/mission/paper.jpg) center/cover;animation:ykmP 1.3s cubic-bezier(.3,.7,.2,1) both}',
      '@keyframes ykmP{from{clip-path:inset(0 0 100% 0);filter:blur(1px)}to{clip-path:inset(0 0 0 0);filter:none}}',
      '.ykm .ykm-sheet p,.ykm .ykm-sheet li,.ykm .ykm-sheet li span,.ykm .ykm-sheet h2,.ykm .ykm-sheet .by{color:#16110d}.ykm .ykm-sheet li s,.ykm .ykm-sheet .og,.ykm .ykm-sheet .fn,.ykm .ykm-sheet figcaption{color:#5a5046}',
      '.ykm-sheet .ms{display:grid;grid-template-columns:1fr auto 1fr;align-items:end;gap:10px;border-bottom:4px double #16110d;padding-bottom:8px}',
      '.ykm-sheet .ms small{font:500 10.5px/1.5 "Noto Sans KR",sans-serif;letter-spacing:.1em;color:#4a4036}',
      '.ykm-sheet .ms small:last-child{text-align:right}',
      '.ykm-sheet .ms b{font:900 46px/1 "Noto Serif KR",serif;letter-spacing:.2em;text-align:center}',
      '.ykm-sheet .ms b i{display:block;margin-top:6px;font:800 12px/1 "Nanum Myeongjo",serif;font-style:normal;letter-spacing:.6em}',
      '.ykm-sheet .fixb{display:inline-block;margin:14px 0 6px;padding:5px 9px 4px;background:#16110d;color:#f2ebd9;font:800 13px/1 "Nanum Myeongjo",serif;letter-spacing:.3em}',
      '.ykm-sheet h2{font:900 clamp(24px,3.2vw,34px)/1.35 "Noto Serif KR",serif;letter-spacing:-.01em;word-break:keep-all}',
      '.ykm-sheet .og{margin-top:6px;font:500 11.5px/1 "Noto Sans KR",sans-serif;color:#5a5046;letter-spacing:.06em}',
      '.ykm-sheet .bd{display:grid;grid-template-columns:1.1fr 1fr;gap:18px;margin-top:14px;padding-top:12px;border-top:1px solid #16110d}',
      '.ykm-sheet .ld{font:400 14.5px/1.85 "Nanum Myeongjo",serif;text-align:justify;word-break:keep-all}',
      '.ykm-sheet .ld:first-letter{float:left;font:900 40px/.9 "Noto Serif KR",serif;margin:4px 6px 0 0}',
      '.ykm-sheet .note{margin-top:10px;padding:8px 10px;border:1px solid rgba(22,17,13,.5);font:400 13px/1.7 "Noto Sans KR",sans-serif}',
      '.ykm-sheet .note b{font-family:"Nanum Myeongjo",serif;margin-right:6px}',
      '.ykm-sheet ol{list-style:none;margin:0;padding:0;border-left:1px solid rgba(22,17,13,.4);padding-left:14px}',
      '.ykm-sheet ol li{padding:7px 0;border-bottom:1px dotted rgba(22,17,13,.35);font:400 13px/1.6 "Noto Sans KR",sans-serif;word-break:keep-all}',
      '.ykm-sheet ol li s{display:block;font:700 13.5px/1.5 "Nanum Myeongjo",serif;text-decoration-color:#b0261b;text-decoration-thickness:2px;color:#5a5046}',
      '.ykm-sheet ol li span:before{content:"→ ";color:#b0261b;font-weight:700}',
      '.ykm-sheet .by{display:flex;justify-content:space-between;align-items:flex-end;gap:10px;margin-top:14px;padding-top:8px;border-top:1px solid #16110d;font:400 12px/1.5 "Noto Sans KR",sans-serif}',
      '.ykm-sheet .by b{font:800 15px/1 "Nanum Myeongjo",serif;letter-spacing:.12em}',
      '.ykm-sheet .by .sl{display:grid;place-items:center;width:56px;height:56px;border:2.5px double #b0261b;border-radius:50%;color:#b0261b;font:900 13px/1.1 "Noto Serif KR",serif;text-align:center;transform:rotate(-10deg)}',
      '.ykm-sheet figure{margin:14px 0 0;border-top:3px double #16110d;padding-top:6px}',
      '.ykm-sheet figure img{display:block;width:100%;height:auto;filter:sepia(.2) contrast(1.05)}',
      '.ykm-sheet figure figcaption,.ykm-sheet .fn{margin-top:4px;font:400 10.5px/1.5 "Noto Sans KR",sans-serif;color:#5a5046}',
      '.ykm-acts{display:flex;justify-content:center;gap:10px;margin-top:16px}.ykm-acts .ykm-btn{width:auto;min-width:150px;padding:12px 18px}',
      '.ykm-acts .ykm-btn.ghost{color:#efe6d2;border-color:rgba(239,230,210,.6)}.ykm-acts .ykm-btn.ghost:hover{background:rgba(239,230,210,.1)}',
      '.ykm-src{margin-top:22px;font:400 11.5px/1.6 "Noto Sans KR",sans-serif;color:rgba(239,230,210,.5)}',
      '@media (max-width:860px){.ykm-desk,.ykm-bench{grid-template-columns:1fr}.ykm-galley{padding-left:70px;transform:none}.ykm-ln .dt{left:-62px;width:50px}.ykm-list{grid-template-columns:1fr}.ykm-sheet .bd{grid-template-columns:1fr}.ykm-sheet .ms b{font-size:34px}}',
      '@media print{html.ykm-pr body *{visibility:hidden!important}html.ykm-pr .ykm-sheet,html.ykm-pr .ykm-sheet *{visibility:visible!important}html.ykm-pr .ykm-sheet{position:absolute;left:0;top:0;width:100%;max-width:none;box-shadow:none;animation:none;-webkit-print-color-adjust:exact;print-color-adjust:exact}@page{size:A4;margin:12mm}}'
    ].join('\n');
    D.head.appendChild(s);
  }

  function render(key) {
    var M = W.YK_MISSION[key]; if (!M) return;
    var host = D.querySelector('.yke'); if (!host) return false;
    if (D.querySelector('.ykm')) return true;
    css();
    var cut = {};   /* 'l-s' → 도장 글자 */
    var sec = D.createElement('div'); sec.className = 'ykm'; sec.id = 'ykm';
    var segs = [];
    M.lines.forEach(function (ln, l) { ln.segs.forEach(function (sg, i) { segs.push({ id: l + '-' + i, sg: sg }); }); });
    var badN = segs.filter(function (x) { return x.sg.bad; }).length;
    sec.innerHTML =
      '<div class="ykm-h"><div><span class="tg">見習 記者</span><h3>오늘, 그대는 경성야록 편집국의 견습 긔자요.</h3><p>두 가지 일을 맡기오 — 빨간 연필로 지난 지면의 말을 바로잡고, 바로잡은 것을 호외 한 장으로 찍어 내시압.</p></div>' +
      '<ol class="ykm-steps"><li class="on" data-st="1"><b>第一 校閱</b>빨간 줄</li><li data-st="2"><b>第二 組版</b>호외 찍기</li></ol></div>' +
      /* 第一 校閱 */
      '<div class="ykm-m ykm-proof"><div class="ykm-mh"><b>第一</b><span>校閱 · 빨간 연필을 드시오</span><em>1933년 지면에 실린 말 다섯 줄. 고칠 말을 눌러 줄을 긋고, 까닭 도장을 찍으시압. 그대로 두어야 할 말도 잇소.</em></div>' +
      '<div class="ykm-desk"><div class="ykm-galley" role="group" aria-label="교정지">' + M.lines.map(function (ln, l) {
        return '<div class="ykm-ln"><span class="dt">' + esc(ln.d) + '<small>' + esc(ln.who) + '</small></span><p>' + ln.segs.map(function (sg, i) {
          return '<button type="button" class="ykm-seg" data-id="' + l + '-' + i + '">' + esc(sg.t) + '<i class="st"></i><i class="mk"></i></button>';
        }).join(' ') + '</p></div>';
      }).join('') + '</div>' +
      '<aside class="ykm-chief"><p class="k">編輯局長의 쪽지</p><h4>줄을 그을 때는, 까닭을 함께 찍으시오.</h4><dl>' +
        Object.keys(STAMP).map(function (k) { return '<dt>' + STAMP[k].hj + '</dt><dd>' + STAMP[k].d + '</dd>'; }).join('') + '</dl>' +
        '<p class="tip">반론과 사실은 남겨야 하오. 다 지우는 것도 오보요.</p>' +
        '<p class="ykm-cnt">그은 줄 <b class="n">0</b></p><button type="button" class="ykm-btn" data-act="judge" disabled>편집국장에게 넘기기</button></aside></div>' +
      '<div class="ykm-verdict" aria-live="polite"></div></div>' +
      /* 第二 組版 */
      '<div class="ykm-m ykm-type lock"><div class="ykm-mh"><b>第二</b><span>組版 · 「바로잡습니다」 호외를 짜시압</span><em>제목 활자를 하나 골라 판에 넛고, 긔자 일홈을 적어 윤전긔를 돌리시압.</em></div>' +
      '<p class="ykm-lockn">교열을 편집국장에게 넘기면 조판대가 열리오.</p>' +
      '<div class="ykm-bench"><div><div class="ykm-chase" aria-live="polite"><p class="em">— 제목 활자를 고르면 여긔에 짜여 들어가오 —</p></div>' +
        '<div class="ykm-cases">' + M.heads.map(function (h, i) { return '<button type="button" class="ykm-slug" data-h="' + i + '">' + esc(h.t) + '</button>'; }).join('') + '</div>' +
        '<p class="ykm-ret"></p></div>' +
      '<div class="ykm-card"><div class="nm"><span>見習 記者</span><input type="text" maxlength="8" placeholder="일홈" aria-label="긔자 일홈"></div>' +
        '<label for="ykmNote">긔자 수첩 · 한 줄 덧붙임 (안 써도 되오)</label><textarea id="ykmNote" rows="3" maxlength="90" placeholder="이 지면을 바로잡으며 든 생각"></textarea>' +
        '<button type="button" class="ykm-btn" data-act="press" disabled>윤전긔 돌리기</button></div></div>' +
      '<div class="ykm-out" aria-live="polite"></div></div>' +
      '<p class="ykm-src">' + esc(M.cite) + ' · 교정지와 호외의 꼴은 이 활동을 위해 다시 꾸민 것</p>';
    var post = host.querySelector('.yg-post');
    if (post) host.insertBefore(sec, post); else host.appendChild(sec);

    var gal = sec.querySelector('.ykm-galley'), pop = null, judged = false, head = -1;
    function seg(id) { return segs.filter(function (x) { return x.id === id; })[0].sg; }
    function closePop() { if (pop) { pop.remove(); pop = null; } }
    function paint(btn) {
      var id = btn.dataset.id, k = cut[id];
      btn.classList.toggle('cut', !!k);
      btn.querySelector('.mk').textContent = k ? STAMP[k].hj : '';
      sec.querySelector('.ykm-cnt .n').textContent = Object.keys(cut).length;
      sec.querySelector('[data-act="judge"]').disabled = !Object.keys(cut).length;
    }
    gal.addEventListener('click', function (e) {
      var b = e.target.closest('.ykm-seg'); if (!b) return;
      if (judged) [].forEach.call(gal.querySelectorAll('.ykm-seg'), function (x) { x.classList.remove('ok-hit', 'miss', 'wrong'); });
      closePop();
      var id = b.dataset.id;
      pop = D.createElement('div'); pop.className = 'ykm-pop'; pop.setAttribute('role', 'menu');
      pop.innerHTML = Object.keys(STAMP).map(function (k) { return '<button type="button" data-k="' + k + '"><b>' + STAMP[k].hj + '</b><small>' + STAMP[k].t + '</small></button>'; }).join('') +
        (cut[id] ? '<button type="button" class="un" data-k=""><b>지우개</b><small>줄 거두기</small></button>' : '');
      var r = b.getBoundingClientRect(), g = gal.getBoundingClientRect(), z = parseFloat(getComputedStyle(D.documentElement).zoom) || 1;
      pop.style.left = ((r.left + r.width / 2 - g.left) / z) + 'px'; pop.style.top = ((r.top - g.top) / z) + 'px';
      gal.appendChild(pop);
      pop.querySelector('button').focus();
      pop.addEventListener('click', function (ev) {
        var s = ev.target.closest('button[data-k]'); if (!s) return; ev.stopPropagation();
        if (s.dataset.k) cut[id] = s.dataset.k; else delete cut[id];
        paint(b); closePop();
      });
    });
    D.addEventListener('click', function (e) { if (pop && !e.target.closest('.ykm-pop') && !e.target.closest('.ykm-seg')) closePop(); });
    D.addEventListener('keydown', function (e) { if (e.key === 'Escape') closePop(); });

    function judge() {
      closePop(); judged = true;
      var good = 0, half = 0, items = [];
      segs.forEach(function (x) {
        var b = gal.querySelector('[data-id="' + x.id + '"]'), k = cut[x.id], sg = x.sg;
        if (sg.bad) {
          if (k && sg.bad.indexOf(k) > -1) { good++; b.classList.add('ok-hit'); items.push('<li class="g"><q>' + esc(sg.t) + '</q><i>바로 보앗소 · ' + STAMP[k].hj + '</i> — ' + esc(sg.why) + '<span class="fx">' + esc(sg.fix) + '</span></li>'); }
          else if (k) { half++; b.classList.add('wrong'); items.push('<li class="w"><q>' + esc(sg.t) + '</q><i>줄은 맛고, 까닭이 다르오 · ' + STAMP[sg.bad[0]].hj + '</i> — ' + esc(sg.why) + '<span class="fx">' + esc(sg.fix) + '</span></li>'); }
          else { b.classList.add('miss'); items.push('<li class="b"><q>' + esc(sg.t) + '</q><i>놋친 말 · ' + STAMP[sg.bad[0]].hj + '</i> — ' + esc(sg.why) + '<span class="fx">' + esc(sg.fix) + '</span></li>'); }
        } else if (k) { b.classList.add('wrong'); items.push('<li class="w"><q>' + esc(sg.t) + '</q><i>남겨야 할 말</i> — ' + esc(sg.keep) + '</li>'); }
      });
      var over = segs.filter(function (x) { return !x.sg.bad && cut[x.id]; }).length;
      var all = good === badN && !over;
      var v = sec.querySelector('.ykm-verdict');
      v.innerHTML = '<div class="ykm-grade"><span class="ykm-seal">' + (all ? '校了' : '再校') + '</span><p><b>' + (all ? '교료 — 이대로 찍어도 되겟소.' : '재교 — 한 번 더 보시오.') + '</b>고칠 말 ' + badN + '개 가운데 ' + good + '개를 바로 보앗소' + (half ? ' · 까닭이 다른 것 ' + half + '개' : '') + (over ? ' · 남겨야 할 말을 지운 것 ' + over + '개' : '') + '. 아래를 보고 다시 그어도 되오.</p></div>' +
        '<ul class="ykm-list">' + items.join('') + '</ul>';
      v.classList.add('on');
      var t = sec.querySelector('.ykm-type'); t.classList.remove('lock');
      sec.querySelector('[data-st="1"]').classList.add('done'); sec.querySelector('[data-st="2"]').classList.add('on');
      try { localStorage.setItem('yk-mission-' + key, JSON.stringify({ cut: cut })); } catch (e) {}
    }
    sec.querySelector('[data-act="judge"]').addEventListener('click', judge);

    /* 第二 組版 */
    var nameI = sec.querySelector('.ykm-card input'), pressB = sec.querySelector('[data-act="press"]');
    function canPress() { pressB.disabled = !(head > -1 && M.heads[head].ok); }
    sec.querySelector('.ykm-cases').addEventListener('click', function (e) {
      var b = e.target.closest('.ykm-slug'); if (!b) return;
      var i = +b.dataset.h, h = M.heads[i], ret = sec.querySelector('.ykm-ret');
      [].forEach.call(sec.querySelectorAll('.ykm-slug'), function (x) { x.classList.toggle('on', x === b); });
      if (h.ok) { head = i; ret.classList.remove('on'); sec.querySelector('.ykm-chase').innerHTML = '<p class="hd">' + esc(h.t) + '</p>'; }
      else { head = -1; b.classList.add('no'); ret.innerHTML = '<b>返戾</b>편집국장이 이 활자를 돌려보냇소 — ' + esc(h.no); ret.classList.add('on'); sec.querySelector('.ykm-chase').innerHTML = '<p class="em">— 다른 제목 활자를 고르시압 —</p>'; }
      canPress();
    });
    function today() { var d = new Date(); return d.getFullYear() + '년 ' + (d.getMonth() + 1) + '월 ' + d.getDate() + '일'; }
    pressB.addEventListener('click', function () {
      if (head < 0) return;
      var nm = nameI.value.trim() || '무명', note = sec.querySelector('#ykmNote').value.trim();
      var fixed = segs.filter(function (x) { return x.sg.bad && cut[x.id]; });
      if (!fixed.length) fixed = segs.filter(function (x) { return x.sg.bad; });
      var out = sec.querySelector('.ykm-out');
      out.innerHTML = '<article class="ykm-sheet" aria-label="바로잡습니다 호외"><div class="ms"><small>京城野錄 編輯局<br>' + today() + '</small><b>號外<i>京 城 野 錄</i></b><small>' + esc(M.orig) + '<br>견습 긔자 조판</small></div>' +
        '<span class="fixb">바로잡습니다</span><h2>' + esc(M.heads[head].t) + '</h2><p class="og">' + esc(M.orig) + ' 의 보도를 바로잡음</p>' +
        '<div class="bd"><div><p class="ld">' + esc(M.lede) + '</p>' + (note ? '<p class="note"><b>긔자 수첩</b>' + esc(note) + '</p>' : '') + '</div>' +
        '<ol>' + fixed.map(function (x) { return '<li><s>' + esc(x.sg.t) + '</s><span>' + esc(x.sg.fix) + '</span></li>'; }).join('') + '</ol></div>' +
        '<div class="by"><span>견습 긔자 <b>' + esc(nm) + '</b><br>교열 · 조판 경성야록 편집국</span><span class="sl">校了<br>京城</span></div>' +
        (M.band ? '<figure><img src="' + BASE + M.band + '" alt="1933년 지면 아래칸의 광고"><figcaption>' + esc(M.bandCap) + '</figcaption></figure>' : '') +
        '<p class="fn">※ 경성야록 견습 긔자 활동으로 짠 지면이오. 실제 1933년의 호외가 아니오.</p></article>' +
        '<div class="ykm-acts"><button type="button" class="ykm-btn" data-act="print">인쇄하기</button><button type="button" class="ykm-btn ghost" data-act="again">다시 짜기</button></div>';
      out.classList.add('on');
      sec.querySelector('[data-st="2"]').classList.add('done');
      setTimeout(function () { out.scrollIntoView({ behavior: 'smooth', block: 'start' }); }, 60);
    });
    sec.querySelector('.ykm-out').addEventListener('click', function (e) {
      if (e.target.closest('[data-act="print"]')) { D.documentElement.classList.add('ykm-pr'); W.print(); setTimeout(function () { D.documentElement.classList.remove('ykm-pr'); }, 500); }
      if (e.target.closest('[data-act="again"]')) { var o = sec.querySelector('.ykm-out'); o.classList.remove('on'); o.innerHTML = ''; sec.querySelector('.ykm-type').scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
    W.addEventListener('afterprint', function () { D.documentElement.classList.remove('ykm-pr'); });
    return true;
  }
  W.ykMission = { render: render, STAMP: STAMP };
  var key = (D.currentScript && D.currentScript.getAttribute('data-case')) || '';
  function classOn() { try { return localStorage.getItem('yk-class') === '1'; } catch (e) { return false; } }
  function go() { if (!key || !classOn()) return;   /* 견습 긔자는 교실판에서만 (독자판은 이야기 그대로) */ var n = 0; (function tryIt() { if (render(key) === false && n++ < 30) setTimeout(tryIt, 200); })(); }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', go); else go();
})(window, document);
