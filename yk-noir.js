/* 경성야록 · 폰 전용 「흑백 활판 + 음화」 톤 (1016)
   폰(600px 이하)에서만. 컴퓨터 화면은 그대로.
   - 누런 종이색 · 갈색 글씨 · 갈색 줄을 같은 밝기의 흰 종이 · 먹색으로 바꿈 (붉은 인주색은 그대로)
   - 사진 · 그림은 모두 흑백
   - 사건 표지 · 본지 머리는 검은 음화(새 미드저니 그림 · 그림은 재현)
   내용 · 장치 · 순서는 하나도 바꾸지 않음 — 색과 표지 그림만 */
(function () {
  'use strict';
  var W = window, D = document;
  if (!(W.matchMedia && matchMedia('(max-width:600px)').matches)) return;
  var me = D.currentScript || [].slice.call(D.scripts).filter(function (s) { return /yk-noir\.js/.test(s.src); })[0];
  var BASE = me ? me.src.replace(/yk-noir\.js.*$/, '') : '';
  var H = D.documentElement; H.classList.add('yk-noir');
  var path = location.pathname;

  /* ── 모양 ── */
  var css = D.createElement('style'); css.id = 'yk-noir-css';
  css.textContent = [
    'html.yk-noir{--yn-paper:#f3f2ef;--yn-ink:#0e0e0e;--yn-red:#b3261e;background:#f3f2ef}',
    'html.yk-noir body{background-color:#f3f2ef}',
    'html.yk-noir:not(#yn) body img:not(.yn-keep):not(.yn-lamp),html.yk-noir:not(#yn) body video,html.yk-noir:not(#yn) body picture,html.yk-noir:not(#yn) body canvas,html.yk-noir:not(#yn) body iframe{filter:grayscale(1) contrast(1.08)!important}',
    'html.yk-noir:not(#yn) body img.yn-lamp{filter:grayscale(1) contrast(1.08)!important}',
    /* 장 넘김 종이 · 봉함 · 종이 띠 — 누런색 금지 */
    'html.yk-noir:not(#yn) body .m-leaf i{background:#f3f2ef!important;box-shadow:inset -30px 0 40px rgba(0,0,0,.12)!important}',
    'html.yk-noir:not(#yn) body .m-leaf i:before{display:none!important}',
    'html.yk-noir:not(#yn) body .m-leaf b,html.yk-noir:not(#yn) body .m-leaf em{color:#0e0e0e!important;border-color:#0e0e0e!important}',
    'html.yk-noir:not(#yn) body .cb-seal{background:rgba(243,242,239,.94)!important;border:1px solid #b3261e!important}',
    /* 라디오 · 축음기 같은 장치의 주황 불빛도 흑백으로 */
    'html.yk-noir:not(#yn) body .archive-radio .rx-radio,html.yk-noir:not(#yn) body .archive-radio .rx-stage,html.yk-noir:not(#yn) body .yk-gramo,html.yk-noir:not(#yn) body [class*="radio"] [class*="glow"]{filter:grayscale(1)!important}',
    'html.yk-noir:not(#yn) body .cb-seal span{color:#333!important}',
    'html.yk-noir:not(#yn) body *{scrollbar-color:#555 transparent}',
    'html.yk-noir *::before,html.yk-noir *::after{filter:grayscale(1)}',
    'html.yk-noir ::selection{background:#0e0e0e;color:#f3f2ef}',
    'html.yk-noir .ykg-toast{display:none!important}',
    /* 본지(메인) 첫 면 머리 — 검은 음화 */
    'html.yk-noir .m-pg1 .yn-neg{position:relative;margin:-14px -16px 14px;padding:18px 18px 22px;background:#0b0b0b url(' + BASE + 'assets/noir/street.jpg) center 30%/cover;color:#efece6!important;overflow:hidden}',
    'html.yk-noir .m-pg1 .yn-neg:before{content:"";position:absolute;inset:0;background:linear-gradient(rgba(11,11,11,.35),rgba(11,11,11,.82) 70%,#0b0b0b);filter:none}',
    'html.yk-noir .m-pg1 .yn-neg>*{position:relative}',
    'html.yk-noir .m-pg1 .yn-neg *{color:#efece6!important;border-color:rgba(239,236,230,.35)!important;background-color:transparent!important}',
    'html.yk-noir .m-pg1 .yn-neg .topbar{border-bottom-color:rgba(239,236,230,.35)!important}',
    'html.yk-noir .m-pg1 .yn-neg header.masthead{border-bottom:0!important;padding:46px 0 10px!important}',
    'html.yk-noir .m-pg1 .yn-neg .title h1{font-size:64px!important;font-weight:900!important;letter-spacing:-.05em!important;line-height:.95!important}',
    'html.yk-noir .m-pg1 .yn-neg .title .mark{color:#efece6!important}',
    'html.yk-noir .m-pg1 .yn-neg .title .hanja{letter-spacing:.9em!important;opacity:.7}',
    'html.yk-noir .m-pg1 .yn-neg .tagline{border-bottom:0!important;padding-top:24px!important}',
    'html.yk-noir .m-pg1 .yn-neg .tagline>span{opacity:.6}',
    'html.yk-noir .m-pg1 .yn-neg .yn-cap{display:block;margin-top:14px;text-align:right;font:500 9.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.2em;opacity:.55}',
    /* 아래 면 고르개 · 사건 머리 띠 — 먹색 */
    'html.yk-noir .m-dock{background:#0b0b0b!important}',
    'html.yk-noir .m-dock button{border-color:#333!important;color:#bdb9b0!important}',
    'html.yk-noir .m-dock button.on{background:#efece6!important;color:#0b0b0b!important;border-color:#efece6!important}',
    'html.yk-noir .m-deck{background:#0b0b0b!important}',
    'html.yk-noir .m-in{background-color:#f3f2ef!important}',
    'html.yk-noir .m-hd{background:#f3f2ef!important}',
    'html.yk-noir .m-hd .m-prog{background:#b3261e!important}',
    /* 사건 표지 — 음화 */
    'html.yk-noir .yn-cov{background:#0b0b0b!important}',
    'html.yk-noir .yn-cov img.hero-slide{object-fit:cover!important}',
    'html.yk-noir .yn-cov img.hero-slide:not(.yn-first){display:none!important}',
    'html.yk-noir .yn-cov img.hero-slide.yn-first{opacity:1!important;visibility:visible!important;transform:none!important}',
    'html.yk-noir .yn-tag{position:absolute;right:12px;bottom:10px;z-index:5;font:500 9.5px/1 "Noto Sans KR",sans-serif;letter-spacing:.2em;color:rgba(239,236,230,.6);pointer-events:none}'
  ].join('\n');
  (D.head || H).appendChild(css);


  /* ── 오프닝(폰): 검은 음화 첫 화면 · 흰 종이 시간축 · 붉은 인주 ── */
  if (/opening\.html$/.test(path)) {
    var oc = D.createElement('style'); oc.id = 'yk-noir-op';
    oc.textContent = [
      'html.yk-noir{--cream:#f3f2ef;--ink:#0e0e0e;--red:#b3261e}',
      'html.yk-noir #gate{background:#0b0b0b!important;align-items:flex-end!important;justify-content:flex-end!important;text-align:right!important;padding:0 26px 120px!important;overflow:hidden}',
      'html.yk-noir #gate .yn-gt{position:absolute;left:-6px;top:54px;writing-mode:vertical-rl;font:900 150px/.86 "Noto Serif KR","Nanum Myeongjo",serif;letter-spacing:-.06em;color:#efece6;pointer-events:none}',
      'html.yk-noir #gate .yn-gt b{color:#b3261e;font-weight:900}',
      'html.yk-noir #gate .yn-gk{position:absolute;right:24px;top:26px;font:500 10px/1 "Noto Sans KR",sans-serif;letter-spacing:.3em;color:#77736c}',
      'html.yk-noir #gate>*:not(.yn-gt):not(.yn-gk){position:relative;z-index:2}',
      'html.yk-noir #gate .k{display:none!important}',
      'html.yk-noir #gate .l{background:#efece6!important;margin:18px 0 18px auto!important}',
      'html.yk-noir #gate .t{color:#efece6!important;letter-spacing:.1em!important}',
      'html.yk-noir #gate .s{color:#8d8a84!important}',
      'html.yk-noir #gate .q{color:#8d8a84!important;border-bottom-color:#8d8a8466!important}',
      'html.yk-noir .skip{color:#0e0e0e}'
    ].join('\n');
    (D.head || H).appendChild(oc);
    var gateT = function () {
      var g = D.getElementById('gate'); if (!g || g.querySelector('.yn-gt')) return;
      var t = D.createElement('div'); t.className = 'yn-gt'; t.setAttribute('aria-hidden', 'true'); t.innerHTML = '경성<b>야</b>록';
      var k = D.createElement('div'); k.className = 'yn-gk'; k.textContent = '京城野錄 · 1920 — 1940';
      g.insertBefore(t, g.firstChild); g.appendChild(k);
    };
    if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', gateT); else gateT();
  }


  /* ── 백백교(폰): 「흰색이 지운다」 — 읽을수록 하얗게 바래고, 금지가 풀린 장(제칠장)에서 처음 검게 뒤집힘 ── */
  if (path.indexOf('/case-baekbaekgyo/') > -1) {
    H.classList.add('yn-bb');
    var bc = D.createElement('style'); bc.id = 'yk-noir-bb';
    bc.textContent = [
      /* 표지: 하얗게 날아간 사진 · 둘째 줄은 이미 바램 */
      'html.yn-bb:not(#yn) body .hero-slider{background:#fbfbf9!important}',
      'html.yn-bb:not(#yn) body .hero-slider img.hero-slide{filter:grayscale(1) brightness(1.6) contrast(.55)!important}',
      'html.yn-bb:not(#yn) body .hero-overlay,html.yn-bb:not(#yn) body .hero-dark{background:linear-gradient(rgba(251,251,249,0) 35%,rgba(251,251,249,.75) 68%,#fbfbf9 94%)!important;opacity:1!important}',
      'html.yn-bb:not(#yn) body .hero-content,html.yn-bb:not(#yn) body .hero-content *{color:#0e0e0e!important;text-shadow:none!important}',
      'html.yn-bb:not(#yn) body .hero-content h1{font-weight:900!important;letter-spacing:-.06em!important;font-size:60px!important;line-height:1!important}',
      'html.yn-bb:not(#yn) body .hero-content h1 .yn-fade{color:#c9c9c4!important}',
      'html.yn-bb:not(#yn) body .hero-content .hero-meta,html.yn-bb:not(#yn) body .hero-content .hero-meta *{color:#777!important}',
      'html.yn-bb:not(#yn) body .yk-credit.hero{color:#999!important}',
      /* 봉함: 흰 천을 덮은 탁자 */
      'html.yn-bb:not(#yn) body .cb-steps li.sealed .cb-seal{background:#eee url(' + BASE + 'assets/noir/cloth.jpg) center 60%/cover!important;background-blend-mode:normal!important;border:0!important;min-height:120px;justify-content:flex-end!important;padding-bottom:12px!important}',
      'html.yn-bb:not(#yn) body .cb-steps li.sealed .cb-seal b{background:#fbfbf9!important;color:#b3261e!important;border-color:#b3261e!important}',
      'html.yn-bb:not(#yn) body .cb-steps li.sealed .cb-seal span{background:rgba(11,11,11,.78)!important;color:#efece6!important;padding:4px 8px!important}',
      /* 바래 가는 구간: 흰 바탕 · 사진과 글이 장마다 조금씩 더 옅어짐 (붉은색은 그대로) */
      'html.yn-bb:not(#yn) body .bb-dusk{background:#fbfbf9!important}',
      'html.yn-bb:not(#yn) body [data-ynw] img{filter:grayscale(1) brightness(calc(1 + var(--w) * .9)) contrast(calc(1 - var(--w) * .55))!important}',
      'html.yn-bb:not(#yn) body [data-ynw] p,html.yn-bb:not(#yn) body [data-ynw] li,html.yn-bb:not(#yn) body [data-ynw] dd,html.yn-bb:not(#yn) body [data-ynw] dt,html.yn-bb:not(#yn) body [data-ynw] h3,html.yn-bb:not(#yn) body [data-ynw] h2{opacity:calc(1 - var(--w) * .45)}',
      /* 반전 띠: 금지가 풀린 날 */
      'html.yn-bb:not(#yn) body .yn-flip{position:relative;background:#080808;color:#efece6;padding:70px 22px 54px;overflow:hidden}',
      'html.yn-bb:not(#yn) body .yn-flip:before{content:"";position:absolute;left:0;right:0;top:0;height:10px;background:#fff}',
      'html.yn-bb:not(#yn) body .yn-flip small{display:block;font:500 10px/1 "Noto Sans KR",sans-serif;letter-spacing:.3em;color:#b3261e}',
      'html.yn-bb:not(#yn) body .yn-flip b{display:block;margin-top:14px;font:900 34px/1.15 "Noto Serif KR",serif;letter-spacing:-.05em}',
      'html.yn-bb:not(#yn) body .yn-flip span{display:block;margin-top:14px;font:300 14.5px/1.85 "Noto Serif KR",serif;color:#bdb9b0}'
    ].join('\n');
    (D.head || H).appendChild(bc);
    var bbInit = function () {
      var h1 = D.querySelector('.hero-content h1 .hj') || D.querySelector('.hero-content h1');
      if (h1 && !h1.querySelector('.yn-fade') && /더 희게/.test(h1.innerHTML)) h1.innerHTML = h1.innerHTML.replace(/더 희게/, '<i class="yn-fade" style="font-style:normal">더 희게</i>');
      var ws = ['.bb-white', '.bb-who', '.bb-obit', '.bb-ledger', '.bb-house'];
      ws.forEach(function (sel, i) { var e = D.querySelector(sel); if (e) { e.setAttribute('data-ynw', ''); e.style.setProperty('--w', (i / (ws.length - 1) * .75).toFixed(2)); } });
      var land = D.getElementById('land');
      if (land && !D.querySelector('.yn-flip')) {
        var f = D.createElement('div'); f.className = 'yn-flip';
        f.innerHTML = '<small>소화 십이 년 사월 십삼일 · 조선일보 호외</small><b>금지가 풀린 날,<br>처음 세상에 나온 지면</b><span>쉰세 날 동안 어느 신문에도 실릴 수 업섯든 일이, 이날 활자로 드러낫소.</span>';
        land.parentNode.insertBefore(f, land);
      }
    };
    if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', bbInit); else bbInit();
    setTimeout(bbInit, 1500);
  }


  /* ── 사건별 폰 연출 (1016c) ── */
  function addCss(id, rules) { var st = D.createElement('style'); st.id = id; st.textContent = rules.join('\n'); (D.head || H).appendChild(st); }
  function onReady(f) { if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', f); else f(); setTimeout(f, 1500); setTimeout(f, 4000); }
  function lum(el) { for (var e = el; e && e !== D.documentElement; e = e.parentElement) { var o = parse(getComputedStyle(e).backgroundColor); if (o && o.a > .5) return .299 * o.r + .587 * o.g + .114 * o.b; } return 255; }


  /* ── 폰 최적화 (1016d): 컴퓨터에서 「양옆으로 나란히」 보던 칸이 폰에서 좁은 기둥으로 찌그러지면 → 위아래 한 줄로 ── */
  addCss('yk-noir-lin', [
    'html.yk-noir .yn-stack{display:block!important;grid-template-columns:none!important;columns:auto!important;column-count:auto!important}',
    'html.yk-noir .yn-stack>*{width:auto!important;max-width:100%!important;min-width:0!important;margin-left:0!important;margin-right:0!important;float:none!important;flex:none!important}',
    'html.yk-noir .yn-stack>*+*{margin-top:16px!important}',
    'html.yk-noir .yn-wrap{max-width:100%!important;width:auto!important;white-space:normal!important;overflow-wrap:anywhere;word-break:keep-all}',
    'html.yk-noir .yn-hd{letter-spacing:.04em!important}',
    'html.yk-noir .yn-vert{writing-mode:horizontal-tb!important;text-orientation:mixed!important;height:auto!important}'
  ]);
  var SKIPLIN = '.jn-desk,.m-hd,.m-dock,.m-deck>.m-pg,.notebook,.ykg-book,.ykp-veil,.yke .yg-press,.ykr,.report-timeline,.m-in>.m-mh,nav,button,.cb-steps,.yn-flip,.ck-face-wrap,.ykq-tray,[class*="track"],[class*="slider"],[class*="tabs"],[class*="chips"],[class*="dots"],[class*="strip"]';
  function textLen(e) { return (e.textContent || '').replace(/\s+/g, '').length; }
  function linearize() {
    var vw = innerWidth;
    var all = (D.querySelector('main, .detail-content, .m-deck') || D.body).querySelectorAll('*');
    for (var i = 0; i < all.length; i++) {
      var e = all[i]; if (e.__ynlin) continue;
      if (e.closest(SKIPLIN)) { e.__ynlin = 1; continue; }
      var cs = getComputedStyle(e), d = cs.display;
      /* 1) 나란히 놓인 칸: 글이 든 칸이 컨테이너 절반보다 좁으면 위아래로 */
      if ((d === 'grid' || (d === 'flex' && cs.flexDirection.indexOf('row') === 0) || (cs.columnCount && cs.columnCount !== 'auto')) && e.children.length >= 2) {
        var r = e.getBoundingClientRect(); if (r.width < 200) continue;
        var kids = [].filter.call(e.children, function (k) { var kc = getComputedStyle(k); return kc.display !== 'none' && kc.position !== 'absolute' && kc.position !== 'fixed'; });
        var narrow = kids.filter(function (k) { var kr = k.getBoundingClientRect(); return kr.width > 0 && kr.width < r.width * .58 && kr.width < 230 && textLen(k) > 30; });
        if (narrow.length) { e.classList.add('yn-stack'); e.__ynlin = 1; continue; }
      }
      /* 2) 세로쓰기 긴 글 → 가로 */
      if (cs.writingMode.indexOf('vertical') === 0 && textLen(e) > 14) { e.classList.add('yn-vert'); }
      /* 3) 화면 밖으로 삐져나간 글 */
      var b = e.getBoundingClientRect();
      if (b.width > 0 && b.right > vw + 2 && textLen(e) > 10 && e.children.length < 6) {
        var scroller = false; for (var a = e.parentElement; a && a !== D.body; a = a.parentElement) { var ac = getComputedStyle(a); if (/auto|scroll/.test(ac.overflowX)) { scroller = true; break; } }
        if (!scroller) e.classList.add('yn-wrap');
      }
      /* 4) 자간이 너무 벌어진 긴 제목 · 글 */
      var fs = parseFloat(cs.fontSize) || 16, ls = parseFloat(cs.letterSpacing) || 0;
      if (ls > fs * .16 && textLen(e) > 8 && e.children.length < 4) e.classList.add('yn-hd');
    }
  }
  onReady(linearize);
  var lq = null; addEventListener('scroll', function () { clearTimeout(lq); lq = setTimeout(linearize, 350); }, { passive: true });


  /* ── 폰: 내려가며 나타나는 글이 끝내 안 나타나 빈 검은 화면이 되던 것 → 화면에 들어오고 잠시 뒤에도 투명하면 천천히 드러냄 ── */
  (function () {
    if (!('IntersectionObserver' in W)) return;
    var REV = 'p,h1,h2,h3,h4,li,ol,ul,dl,figure,blockquote,.ex-echo,[class*="-time"],[class*="-tag"],[class*="-s"]';
    var seen = new WeakSet(), io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return; var el = e.target; io.unobserve(el);
        setTimeout(function () {
          var cs = getComputedStyle(el);
          if (parseFloat(cs.opacity) < .05 && !el.closest('[hidden],.sealed,.cb-seal,.ykp-veil,.m-hd,.yn-erase')) {
            el.style.transition = 'opacity .9s ease, transform .9s ease'; el.style.opacity = '1'; el.style.transform = 'none'; el.style.filter = 'none';
          }
        }, 1400);
      });
    }, { rootMargin: '-20% 0px -20% 0px' });
    function scan() {
      var root = D.querySelector('.detail-content, main') || D.body;
      [].forEach.call(root.querySelectorAll(REV), function (el) { if (seen.has(el)) return; seen.add(el); if (parseFloat(getComputedStyle(el).opacity) < .05 && (el.textContent || '').trim().length > 1) io.observe(el); });
    }
    onReady(scan);
  })();


  /* ── 폰 가독성 (1016e): 글자 크기 · 글꼴 · 대비 · 줄 간격을 한 규칙으로 ──
     · 본문(긴 글) 15.5px · 줄 간격 1.8 · 자간 0 · 가는 나눔명조 → 또렷한 Noto Serif
     · 설명 · 출처 같은 작은 글 최소 12.5px
     · 바탕과 글자색 대비가 4.5:1 보다 낮으면 (검은 바탕에 어두운 회색 등) 글자색을 밝게 / 어둡게 */
  function L(c) { var o = parse(c); if (!o) return null; var f = function (v) { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return { l: .2126 * f(o.r) + .7152 * f(o.g) + .0722 * f(o.b), a: o.a }; }
  function bgL(e) { for (var a = e; a; a = a.parentElement) { if (a === D.documentElement) break; var x = L(getComputedStyle(a).backgroundColor); if (x && x.a > .6) return x.l; } return L(getComputedStyle(D.body).backgroundColor).l; }
  function ratio(a, b) { return (Math.max(a, b) + .05) / (Math.min(a, b) + .05); }
  function readable(near) {
    var w = D.createTreeWalker(D.body, NodeFilter.SHOW_TEXT), n, done = new Set();
    while ((n = w.nextNode())) {
      var e = n.parentElement; if (!e || done.has(e)) continue; done.add(e);
      if (near) { var rr = e.getBoundingClientRect(); if (rr.bottom < -innerHeight || rr.top > innerHeight * 2) continue; }
      var t = (n.textContent || '').trim(); if (t.length < 4) continue;
      if (e.closest('.m-hd,.m-dock,.yn-erase,svg,[hidden],.ykp-veil,#ykn,.opening,#gate')) continue;
      var cs = getComputedStyle(e); if (cs.display === 'none' || cs.visibility === 'hidden') continue;
      var fs = parseFloat(cs.fontSize) || 16, blk = e.closest('p,li,dd,blockquote,figcaption,small,td') || e, len = (blk.textContent || '').replace(/\s+/g, '').length;
      var isHead = !!e.closest('h1,h2,h3,h4,.label,[class*="title"],[class*="head"] b');
      /* 크기 · 글꼴 · 줄 간격 */
      if (!isHead && len > 40 && fs < 15.5) { e.style.setProperty('font-size', '15.5px', 'important'); fs = 15.5; }
      else if (!isHead && len > 12 && fs < 13.5) { e.style.setProperty('font-size', '13.5px', 'important'); fs = 13.5; }
      if (!isHead && len > 20) {
        if (/Nanum Myeongjo|Song Myung/.test(cs.fontFamily.split(',')[0])) e.style.setProperty('font-family', '"Noto Serif KR","Nanum Myeongjo",serif', 'important');
        if (parseFloat(cs.fontWeight) < 400) e.style.setProperty('font-weight', '400', 'important');
        var lh = parseFloat(cs.lineHeight); if (!lh || lh / fs < 1.7) e.style.setProperty('line-height', '1.8', 'important');
        if ((parseFloat(cs.letterSpacing) || 0) > fs * .04) e.style.setProperty('letter-spacing', '.01em', 'important');
      }
      /* 대비 */
      var fg = L(cs.color); if (!fg) continue;
      var bl = bgL(e), op = parseFloat(cs.opacity) || 1;
      if (ratio(fg.l, bl) < (fs >= 18 ? 3.2 : 4.5) || fg.a < .7) {
        var col = bl < .2 ? (len > 60 ? '#e6e3dc' : '#bdb9b0') : (len > 60 ? '#1a1a1a' : '#555');
        e.style.setProperty('color', col, 'important');
      }
    }
  }
  var rq = null;
  function readSoon() { clearTimeout(rq); rq = setTimeout(function () { readable(true); }, 300); }
  onReady(function () { readable(false); });
  addEventListener('scroll', readSoon, { passive: true });

  /* 마리아 · 한 방에 불 하나 — 어두운 장의 그림은 등불 하나만큼만 보이고, 손가락을 따라 불빛이 움직임 */
  if (path.indexOf('/case-maria/') > -1) {
    H.classList.add('yn-mr');
    addCss('yk-noir-mr', [
      'html.yn-mr:not(#yn) body .hero-slider:after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:radial-gradient(circle 170px at 50% 30%,rgba(0,0,0,0),rgba(0,0,0,.55) 55%,rgba(5,5,5,.95) 100%)}',
      'html.yn-mr:not(#yn) body .hero-content{z-index:2}',
      'html.yn-mr:not(#yn) body img.yn-lamp{-webkit-mask-image:radial-gradient(circle var(--lr,150px) at var(--lx,50%) var(--ly,42%),#000 35%,rgba(0,0,0,.14) 100%);mask-image:radial-gradient(circle var(--lr,150px) at var(--lx,50%) var(--ly,42%),#000 35%,rgba(0,0,0,.14) 100%)}',
      'html.yn-mr:not(#yn) body .yn-lamp-hint{display:block;margin:8px 0 0;font:500 10px/1.5 "Noto Sans KR",sans-serif;letter-spacing:.2em;color:#8d8a84;text-align:center}',
      'html.yn-mr:not(#yn) body .verdict{position:relative}',
      'html.yn-mr:not(#yn) body .yn-mujoe{position:absolute;right:18px;top:16px;z-index:3;border:2px solid #b3261e;color:#b3261e;font:900 20px/1 "Noto Serif KR",serif;letter-spacing:.1em;padding:7px 9px;transform:rotate(-8deg);pointer-events:none;background:transparent}'
    ]);
    var lampDone = false;
    onReady(function () {
      [].forEach.call(D.querySelectorAll('.detail-content img'), function (im) {
        if (im.__ynl || im.closest('.jn-desk,.m-hd,.notebook,.ck-face-wrap,.yke,.ykr,.scan,[class*="scan"],[class*="paper"],[class*="news"]')) return;
        var r = im.getBoundingClientRect(); if (r.width < 220 || r.height < 140) return;
        if (/scan|articles|19\d\d|letter|da_|bgg_/.test(im.getAttribute('src') || '')) return;   /* 원문 지면 · 편지는 다 보이게 */
        if (lum(im.parentElement) > 70) return;
        im.__ynl = 1; im.classList.add('yn-lamp');
        var mv = function (x, y) { var b = im.getBoundingClientRect(); im.style.setProperty('--lx', ((x - b.left) / b.width * 100).toFixed(1) + '%'); im.style.setProperty('--ly', ((y - b.top) / b.height * 100).toFixed(1) + '%'); };
        im.addEventListener('touchmove', function (e) { var t = e.touches[0]; if (t) mv(t.clientX, t.clientY); }, { passive: true });
        im.addEventListener('touchstart', function (e) { var t = e.touches[0]; if (t) mv(t.clientX, t.clientY); }, { passive: true });
        im.addEventListener('pointermove', function (e) { mv(e.clientX, e.clientY); });
        if (!lampDone) { lampDone = true; var h = D.createElement('span'); h.className = 'yn-lamp-hint'; h.textContent = '그림을 손가락으로 끌면 등불이 따라가오'; im.insertAdjacentElement('afterend', h); }
      });
      var v = D.querySelector('.verdict');
      if (v && !v.querySelector('.yn-mujoe')) { var st = D.createElement('span'); st.className = 'yn-mujoe'; st.setAttribute('aria-hidden', 'true'); st.textContent = '無罪 · 二'; v.appendChild(st); }
    });
  }

  /* 죽첨정 · 안개 속 소문 — 표지는 안개 · 지면에 오른 말들은 흐리게 떠 있다가 짚으면(또는 화면 한가운데 오면) 또렷 */
  if (path.indexOf('/case-jukcheomjeong/') > -1) {
    H.classList.add('yn-jk');
    addCss('yk-noir-jk', [
      'html.yn-jk:not(#yn) body .hero-slider img.hero-slide{filter:grayscale(1) brightness(1.12) contrast(.85)!important}',
      'html.yn-jk:not(#yn) body .hero-slider:after{content:"";position:absolute;inset:0;z-index:1;pointer-events:none;background:linear-gradient(rgba(214,214,211,.15) 10%,rgba(214,214,211,.55) 55%,rgba(214,214,211,.2) 100%)}',
      'html.yn-jk:not(#yn) body .hero-content{z-index:2}',
      'html.yn-jk:not(#yn) body .ww-list>li,html.yn-jk:not(#yn) body .jk-word{transition:filter .7s ease,opacity .7s ease}',
      'html.yn-jk:not(#yn) body .ww-list>li:not(.yn-clear),html.yn-jk:not(#yn) body .jk-word:not(.yn-clear){filter:blur(2.5px);opacity:.55}',
      'html.yn-jk:not(#yn) body .yn-fog-hint{display:block;margin:6px 0 12px;font:500 10px/1.5 "Noto Sans KR",sans-serif;letter-spacing:.2em;color:#8d8a84}'
    ]);
    var io = null;
    onReady(function () {
      var items = D.querySelectorAll('.ww-list>li,.jk-word');
      if (!items.length) return;
      if (!io && 'IntersectionObserver' in W) io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) e.target.classList.add('yn-clear'); }); }, { rootMargin: '-38% 0px -38% 0px' });
      [].forEach.call(items, function (li) {
        if (li.__ynf) return; li.__ynf = 1;
        if (io) io.observe(li);
        li.addEventListener('pointerdown', function () { li.classList.add('yn-clear'); });
      });
      var wl = D.querySelector('.ex-wall-h');
      if (wl && !D.querySelector('.yn-fog-hint')) { var h = D.createElement('span'); h.className = 'yn-fog-hint'; h.textContent = '흐린 말은 짚거나 화면 가운데로 오면 또렷해지오'; wl.insertAdjacentElement('afterend', h); }
    });
  }

  /* 손기정 · 지운 자리 — 표지 사진 한가운데가 하얗게 지워져 있고, 문지르면 걷힘 */
  if (path.indexOf('/case-sonkijeong/') > -1) {
    H.classList.add('yn-sk');
    addCss('yk-noir-sk', [
      'html.yn-sk:not(#yn) body .hero-slider .yn-erase{position:absolute;left:50%;top:34%;z-index:1;width:190px;height:110px;margin:-55px 0 0 -95px;background:#f3f2ef;border-radius:40% 55% 45% 60%/60% 40% 55% 45%;transform:rotate(-6deg);box-shadow:0 0 22px 10px #f3f2ef;opacity:var(--eo,1);transition:opacity .4s;pointer-events:auto;touch-action:pan-y}',
      'html.yn-sk:not(#yn) body .hero-slider .yn-erase i{position:absolute;left:0;right:0;top:50%;margin-top:-6px;text-align:center;font:500 9.5px/1.2 "Noto Sans KR",sans-serif;font-style:normal;letter-spacing:.2em;color:#777}',
      'html.yn-sk:not(#yn) body .hero-content{z-index:2}'
    ]);
    onReady(function () {
      var hs = D.querySelector('.hero-slider'); if (!hs || hs.querySelector('.yn-erase')) return;
      var e = D.createElement('div'); e.className = 'yn-erase'; e.innerHTML = '<i>문질러 보시압</i>'; hs.appendChild(e);
      var o = 1, rub = function () { o = Math.max(0, o - .06); e.style.setProperty('--eo', o.toFixed(2)); if (o <= 0) e.style.pointerEvents = 'none'; };
      e.addEventListener('touchmove', rub, { passive: true }); e.addEventListener('pointermove', function (ev) { if (ev.buttons || ev.pointerType !== 'mouse') rub(); });
    });
  }

  /* ── 색 바꾸기: 누런색 · 갈색 → 같은 밝기의 무채색 ── */
  function parse(c) { var m = /rgba?\(([^)]+)\)/.exec(c); if (!m) return null; var p = m[1].split(/[ ,\/]+/).filter(Boolean).map(parseFloat); return { r: p[0], g: p[1], b: p[2], a: p.length > 3 ? p[3] : 1 }; }
  function warm(o) {
    var r = o.r / 255, g = o.g / 255, b = o.b / 255, mx = Math.max(r, g, b), mn = Math.min(r, g, b), l = (mx + mn) / 2, d = mx - mn;
    if (d < .025) return false;
    var s = d / (1 - Math.abs(2 * l - 1) || 1), h;
    if (mx === r) h = 60 * (((g - b) / d) % 6); else if (mx === g) h = 60 * ((b - r) / d + 2); else h = 60 * ((r - g) / d + 4);
    if (h < 0) h += 360;
    if (h >= 18 && h <= 70) return true;          /* 누런 · 갈색 · 황토 */
    if ((h < 18 || h > 340) && s < .35) return true; /* 바랜 적갈색(종이 얼룩) */
    return false;                                   /* 진한 붉은 인주색 · 그 밖 색은 그대로 */
  }
  function gray(o) {
    var v = .299 * o.r + .587 * o.g + .114 * o.b;
    if (v > 175) v = Math.min(244, 175 + (v - 175) * 1.6);   /* 누런 종이 → 맑은 흰 종이 */
    else if (v < 60) v = v * .8;                              /* 어두운 갈색 → 먹 */
    v = Math.round(v);
    return 'rgba(' + v + ',' + v + ',' + Math.max(0, v - 3) + ',' + o.a + ')';
  }
  function fix(c) { var o = parse(c); return o && o.a > 0 && warm(o) ? gray(o) : null; }
  function fixStr(s) { return s.replace(/rgba?\([^)]+\)/g, function (m) { return fix(m) || m; }); }
  var PROPS = [['color', 'color'], ['backgroundColor', 'background-color'], ['borderTopColor', 'border-top-color'], ['borderRightColor', 'border-right-color'], ['borderBottomColor', 'border-bottom-color'], ['borderLeftColor', 'border-left-color'], ['outlineColor', 'outline-color'], ['fill', 'fill'], ['stroke', 'stroke']];
  function one(e) {
    if (e.__yn || e.nodeType !== 1) return; e.__yn = 1;
    if (/^(IMG|VIDEO|CANVAS|SCRIPT|STYLE|IFRAME|SOURCE|PICTURE)$/.test(e.tagName)) return;
    if (e.closest && e.closest('.yn-neg,#ykn,.ykp-veil,.m-dock,.yn-flip')) return;
    var cs = getComputedStyle(e);
    for (var i = 0; i < PROPS.length; i++) { var v = cs[PROPS[i][0]]; if (v && v.indexOf('rgb') === 0) { var f = fix(v); if (f) e.style.setProperty(PROPS[i][1], f, 'important'); } }
    var bi = cs.backgroundImage;
    if (bi && bi !== 'none') {
      if (/gradient/.test(bi)) { var nb = fixStr(bi); if (nb !== bi) e.style.setProperty('background-image', nb, 'important'); }
      if (PAPER.test(bi)) { e.style.setProperty('background-image', 'none', 'important'); bi = 'none'; }
      if (/url\(/.test(bi)) { e.style.setProperty('background-blend-mode', 'luminosity', 'important'); var bc = parse(cs.backgroundColor); if (!bc || bc.a === 0) e.style.setProperty('background-color', 'rgb(128,128,128)', 'important'); }
    }
    var sh = cs.textShadow; if (sh && sh !== 'none' && /rgb/.test(sh)) { var ns = fixStr(sh); if (ns !== sh) e.style.setProperty('text-shadow', ns, 'important'); }
    var bs = cs.boxShadow; if (bs && bs !== 'none' && /rgb/.test(bs)) { var nbs = fixStr(bs); if (nbs !== bs) e.style.setProperty('box-shadow', nbs, 'important'); }
  }
  function sweep(root) { root = root || D.body; if (!root) return; one(root); var all = root.getElementsByTagName('*'); for (var i = 0; i < all.length; i++) one(all[i]); }


  /* ── 종이 질감(누런 종이 사진 · 얼룩 · 잡티)을 걷어 내고 맑은 흰 종이로 ── */
  var PAPER = /url\([^)]*(paper|sheet\.|guide_|grain|noise|texture|parch|fiber|stain|v2_bill|feTurbulence|fractalNoise)/i;
  var extra = D.createElement('style'); extra.id = 'yk-noir-strip';
  function stripSheets() {
    var out = [];
    function walk(rules) {
      for (var i = 0; i < rules.length; i++) {
        var r = rules[i];
        if (r.cssRules && !r.selectorText) { try { if (!r.media || matchMedia(r.media.mediaText).matches) walk(r.cssRules); } catch (e) {} continue; }
        if (!r.selectorText || !r.style) continue;
        var bg = (r.style.backgroundImage || '') + ' ' + (r.style.background || '');
        if (!PAPER.test(bg)) continue;
        var sel = r.selectorText.split(',').map(function (x) { x = x.trim(); return /^html\b/.test(x) ? x.replace(/^html/, 'html.yk-noir') : 'html.yk-noir ' + x; }).join(',');
        out.push(sel + '{background-image:none!important}');
      }
    }
    [].forEach.call(D.styleSheets, function (sh) { if (sh.ownerNode === extra) return; try { walk(sh.cssRules); } catch (e) {} });
    extra.textContent = out.join('\n');
    if (!extra.parentNode) (D.head || H).appendChild(extra);
  }

  /* ── 표지 그림: 사건 네 개 · 본지 ── */
  var COV = { 'case-maria': 'mr_cover', 'case-jukcheomjeong': 'jk_cover', 'case-sonkijeong': 'sk_cover', 'case-baekbaekgyo': 'bb_cover' };
  function covers() {
    var k = null; for (var c in COV) if (path.indexOf('/' + c + '/') > -1) k = c;
    if (k) {
      var slides = D.querySelectorAll('img.hero-slide');
      if (slides.length) {
        var host = slides[0].parentElement; host.classList.add('yn-cov');
        [].forEach.call(slides, function (im, i) { if (i === 0) { im.src = BASE + 'assets/noir/' + COV[k] + '.jpg'; im.removeAttribute('srcset'); im.classList.add('yn-first'); } });
        if (!host.querySelector('.yn-tag')) { var t = D.createElement('span'); t.className = 'yn-tag'; t.textContent = '그림 · 재현'; host.appendChild(t); }
      }
    }
    var p1 = D.querySelector('.m-pg1 .m-in');
    if (p1 && !p1.querySelector('.yn-neg')) {
      var tb = p1.querySelector('.topbar'), ms = p1.querySelector('header.masthead'), tg = p1.querySelector('.tagline');
      if (ms) {
        var neg = D.createElement('div'); neg.className = 'yn-neg';
        p1.insertBefore(neg, tb || ms);
        [tb, ms, tg].forEach(function (x) { if (x) neg.appendChild(x); });
        var cap = D.createElement('span'); cap.className = 'yn-cap'; cap.textContent = '밤의 경성 · 그림 · 재현'; neg.appendChild(cap);
      }
    }
  }

  function start() {
    stripSheets(); covers(); sweep();
    var q = [], tm = null;
    if ('MutationObserver' in W) new MutationObserver(function (ms) {
      ms.forEach(function (m) { [].forEach.call(m.addedNodes, function (n) { if (n.nodeType === 1) q.push(n); }); });
      if (!tm) tm = setTimeout(function () { tm = null; var l = q.splice(0); l.forEach(function (n) { if (n.isConnected) sweep(n); }); }, 120);
    }).observe(D.body, { childList: true, subtree: true });
    setTimeout(function () { stripSheets(); covers(); sweep(); }, 1500);
    setTimeout(function () { sweep(); }, 4000);
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', start); else start();
})();
