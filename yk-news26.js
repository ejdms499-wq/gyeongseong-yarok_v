/* ════════════════════════════════════════════════════════════════
   경성야록 · 「2026년 뉴스」 한 장 (yk-news26.js) — 네 사건이 함께 씀
   - 원문 지면 손잡이를 왼편으로 당기면 나오는 「오늘의 기사 화면」
   - 오늘의 신문 누리집 기사 꼴(메뉴줄 · 경로 · 제목 · 요약 · 기자 · 사진 · 본문 · 태그 · 관련 기사)
   - 이름은 「경성야록 뉴스」 (실제 매체의 이름 · 로고를 흉내 내지 않음)
   - 쓰는 법: ykNews26({ a: 그날 기사, arts: 기사 목록, cur: 지금 번호, img: 원문 그림 주소, paper: '동아일보', sec: '사회', sub: '사건·사고' })
     관련 기사 링크는 <a data-i="번호"> — 각 사건 스크립트의 클릭 처리에서 그 날로 넘김
   ════════════════════════════════════════════════════════════════ */
(function (W, D) {
  'use strict';
  if (W.ykNews26) return;
  function css() {
    if (D.getElementById('n26-css')) return;
    var s = D.createElement('style'); s.id = 'n26-css';
    s.textContent = [
      '.news26{background:#fff!important;color:#111;font-family:"Noto Sans KR",system-ui,sans-serif;-webkit-font-smoothing:antialiased}',
      '.news26 .n26-gnb{position:sticky;top:0;z-index:2;display:flex;align-items:center;gap:14px;padding:0 14px;height:44px;background:#fff;border-bottom:2px solid #111}',
      '.news26 .n26-logo{font:900 17px/1 "Noto Serif KR",serif;letter-spacing:-.02em;color:#111;white-space:nowrap}',
      '.news26 .n26-logo small{font:700 10px/1 "Noto Sans KR",sans-serif;color:#c8102e;margin-left:3px;letter-spacing:0}',
      '.news26 .n26-gnb nav{display:flex;gap:11px;font-size:12px;color:#555;overflow:hidden;white-space:nowrap}',
      '.news26 .n26-gnb nav .on{color:#111;font-weight:700;box-shadow:inset 0 -2px 0 #c8102e;padding-bottom:3px}',
      '.news26 .n26-ico{margin-left:auto;font-style:normal;font-size:16px;color:#333}',
      '.news26 .n26-body{padding:16px 18px 22px!important}',
      '.news26 .n26-crumb{margin:0!important;font-size:11.5px!important;color:#777!important;line-height:1.4!important}',
      '.news26 .n26-crumb i{font-style:normal;margin:0 4px;color:#bbb}',
      '.news26 .n26-crumb em{font-style:normal;color:#c8102e;font-weight:700}',
      '.news26 h4{margin-top:8px!important;font:700 21px/1.42 "Noto Sans KR",sans-serif!important;letter-spacing:-.03em!important;color:#111!important;word-break:keep-all}',
      '.news26 .n26-deck{list-style:none;margin:12px 0 0;padding:0 0 0 10px;border-left:3px solid #ddd}',
      '.news26 .n26-deck li{font-size:13px;line-height:1.6;color:#444;font-weight:500;word-break:keep-all}',
      '.news26 .n26-deck li:before{content:"─ ";color:#aaa}',
      '.news26 .n26-by{display:flex;align-items:center;gap:9px;margin-top:14px;padding:10px 0;border-top:1px solid #eee;border-bottom:1px solid #eee}',
      '.news26 .n26-av{display:grid;place-items:center;width:30px;height:30px;border-radius:50%;background:#111;color:#fff;font:700 13px/1 "Noto Serif KR",serif;flex:none}',
      '.news26 .n26-by b{display:block;font-size:12px;color:#222}',
      '.news26 .n26-by small{display:block;margin-top:2px;font-size:10.5px;color:#999;letter-spacing:-.01em}',
      '.news26 .n26-tools{margin-left:auto;display:flex;gap:6px}',
      '.news26 .n26-tools i{display:grid;place-items:center;width:24px;height:24px;border:1px solid #ddd;border-radius:50%;font-style:normal;font-size:11px;color:#555}',
      '.news26 .n26-alert{margin-top:12px!important;padding:9px 11px;border:1px solid #f0c9cf;border-left:3px solid #c8102e;background:#fdf5f6;font-size:12.5px!important;line-height:1.6!important;color:#7a1020!important}',
      '.news26 .n26-alert b{margin-right:6px;color:#c8102e}',
      '.news26 .n26-fig{margin:14px 0 0}',
      '.news26 .n26-fig img{display:block;width:100%;max-height:220px;object-fit:cover;object-position:center 35%;border:0;filter:none}',
      '.news26 .n26-fig figcaption{margin-top:6px;font-size:11px;color:#888;line-height:1.5}',
      '.news26 p{font-size:14px!important;line-height:1.85!important;color:#222!important;letter-spacing:-.01em;word-break:keep-all}',
      '.news26 .n26-lead{margin-top:14px!important;font-weight:400!important;color:#222!important}',
      '.news26 .n26-sign{margin-top:14px!important;font-size:12.5px!important;color:#555!important}',
      '.news26 .n26-keys{display:flex;flex-wrap:wrap;gap:6px;margin-top:12px}',
      '.news26 .n26-keys span{padding:4px 9px;border-radius:3px!important;background:#f3f3f3!important;color:#333!important;font-size:11.5px!important}',
      '.news26 .n26-rel{margin-top:18px;border-top:2px solid #111}',
      '.news26 .n26-rel b{display:block;padding:10px 0 4px;font-size:13px;color:#111}',
      '.news26 .n26-rel a{display:flex;justify-content:space-between;gap:10px;padding:8px 0;border-bottom:1px solid #eee;text-decoration:none;color:#222;font-size:12.5px;line-height:1.5;pointer-events:auto}',
      '.news26 .n26-rel a:hover span{text-decoration:underline}',
      '.news26 .n26-rel small{flex:none;color:#999;font-size:11px}',
      '.news26 .n26-note{margin-top:14px!important;padding-top:10px;border-top:1px dashed #ddd;font-size:11px!important;color:#999!important}'
    ].join('\n');
    D.head.appendChild(s);
  }
  function kdate(d) { var m = /^(\d+)\.0?(\d+)\.0?(\d+)$/.exec(d || ''); return m ? m[1] + '년 ' + m[2] + '월 ' + m[3] + '일' : d; }
  W.ykNews26 = function (o) {
    css();
    var a = o.a, paper = o.paper || a.paper || '동아일보', sec = o.sec || '사회', sub = o.sub || '사건·사고';
    var dd = String(a.date || '').split('.'), y26 = '2026.' + (dd[1] || '') + '.' + (dd[2] || '');
    var nav = ['정치', '경제', '사회', '국제', '문화', '스포츠'];
    var rel = (o.arts || []).map(function (x, i) { return { x: x, i: i }; }).filter(function (r) { return !r.x.sealed && r.x.title && r.i !== o.cur; }).slice(0, 3);
    var sum = (a.sum || []).slice(0, 2);
    return '<div class="news26" aria-label="2026년 뉴스로 다시 쓴 기사">' +
      '<div class="n26-gnb"><b class="n26-logo">경성야록<small>뉴스</small></b><nav>' + nav.map(function (n) { return '<span' + (n === sec ? ' class="on"' : '') + '>' + n + '</span>'; }).join('') + '</nav><i class="n26-ico" aria-hidden="true">⌕</i></div>' +
      '<div class="n26-body"><p class="n26-crumb">' + sec + ' <i>›</i> ' + sub + ' <i>›</i> <em>아카이브</em></p>' +
      '<h4>' + a.title + '</h4>' +
      (sum.length ? '<ul class="n26-deck">' + sum.map(function (t) { return '<li>' + t + '</li>'; }).join('') + '</ul>' : '') +
      '<div class="n26-by"><span class="n26-av" aria-hidden="true">京</span><div><b>경성야록 아카이브팀 기자</b><small>입력 ' + y26 + ' 06:00 · 원 보도 ' + paper + ' ' + a.date + '</small></div>' +
      '<span class="n26-tools" aria-hidden="true"><i>가</i><i>⤴</i><i>⎙</i></span></div>' +
      (a.mark === '오보' ? '<p class="n26-alert"><b>바로잡습니다</b>' + (o.fix || '이 보도의 내용은 이후 사실과 다른 것으로 밝혀졌습니다.') + '</p>' : '') +
      (o.img ? '<figure class="n26-fig"><img src="' + o.img + '" alt=""><figcaption>' + kdate(a.date) + '자 ' + paper + ' 지면.</figcaption></figure>' : '') +
      '<p class="n26-lead">' + a.lead + '</p>' + (a.body || []).map(function (p) { return '<p>' + p + '</p>'; }).join('') +
      '<p class="n26-sign">경성야록 아카이브팀</p>' +
      '<div class="n26-keys">' + (a.keys || []).map(function (k) { return '<span>#' + k + '</span>'; }).join('') + '</div>' +
      (rel.length ? '<div class="n26-rel"><b>이 사건 관련 기사</b>' + rel.map(function (r) { return '<a href="#" data-i="' + r.i + '"><span>' + r.x.title + '</span><small>' + (r.x.date || '') + '</small></a>'; }).join('') + '</div>' : '') +
      '<p class="n26-note">※ ' + (dd[0] || '') + '년 ' + paper + ' 원문을 바탕으로, 오늘의 기사 형식으로 다시 쓴 것입니다. 실제 2026년 보도가 아닙니다.</p></div></div>';
  };
})(window, document);
