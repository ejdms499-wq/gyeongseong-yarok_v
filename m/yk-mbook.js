/* 경성야록 · 폰판(mbook) 공통 동작
   - 위 띠(표지 지나면 나타남) · 읽은 만큼 붉은 줄 · 지금 장 이름
   - 목차 시트 · 장치 시트 열고 닫기(폰 「뒤로」 버튼으로도 닫힘)
   - 원문 그림 크게 보기 · 천천히 나타나기(한 번만) */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  W.mb = W.mb || {};

  /* ── 시트 ── */
  var stack = [];
  function lock() { D.documentElement.classList.toggle('mb-lock', stack.length > 0); }
  function open(id, push) {
    var s = D.getElementById(id); if (!s || s.classList.contains('on')) return;
    s.classList.add('on'); stack.push(id); lock();
    if (push !== false) { try { history.pushState({ mb: id }, ''); } catch (e) {} }
    var bd = $('.mb-sh-bd', s); if (bd && !s.dataset.keep) bd.scrollTop = 0;
    try { W.dispatchEvent(new CustomEvent('mb:open', { detail: id })); } catch (e) {}
  }
  function close(id, fromPop) {
    id = id || stack[stack.length - 1]; if (!id) return;
    var s = D.getElementById(id); if (s) s.classList.remove('on');
    stack = stack.filter(function (x) { return x !== id; }); lock();
    try { W.dispatchEvent(new CustomEvent('mb:close', { detail: id })); } catch (e) {}
    if (!fromPop) { try { if (history.state && history.state.mb === id) { skipPop++; history.back(); } } catch (e) {} }
  }
  var skipPop = 0;   /* 단추로 닫으며 부른 「뒤로」는 한 칸만 — 아래 시트까지 닫지 안케 */
  W.addEventListener('popstate', function () {
    if (skipPop > 0) { skipPop--; return; }
    if (zoomOn) { hideZoom(true); return; }
    if (stack.length) close(stack[stack.length - 1], true);
  });
  W.mb.open = open; W.mb.close = close;

  D.addEventListener('click', function (e) {
    var o = e.target.closest('[data-open]'); if (o) { e.preventDefault(); open(o.getAttribute('data-open')); return; }
    var c = e.target.closest('[data-close]'); if (c) { e.preventDefault(); close(c.closest('.mb-sheet') && c.closest('.mb-sheet').id); return; }
    var z = e.target.closest('[data-zoom]'); if (z) { e.preventDefault(); showZoom(z.getAttribute('data-zoom'), z.getAttribute('data-cap') || ''); return; }
    var g = e.target.closest('[data-goto]'); if (g) {
      e.preventDefault(); var t = D.getElementById(g.getAttribute('data-goto'));
      var sh = g.closest('.mb-sheet'); if (sh) close(sh.id);
      if (t) setTimeout(function () { W.scrollTo({ top: t.getBoundingClientRect().top + W.scrollY - 48, behavior: 'smooth' }); }, sh ? 380 : 0);
    }
  });

  /* ── 그림 크게 보기 ── */
  var zoomOn = false, zm;
  function showZoom(src, cap) {
    if (!zm) {
      zm = D.createElement('div'); zm.className = 'mb-zoom';
      zm.innerHTML = '<div class="zh"><span>원문 지면 · 손가락으로 밀어 보시압</span><button class="mb-sh-x" aria-label="닫기" style="color:#fff">×</button></div><div class="zb"><img alt=""></div><div class="zf"><span class="zc"></span><button class="zbig">크게</button></div>';
      D.body.appendChild(zm);
      $('.mb-sh-x', zm).onclick = function () { hideZoom(); };
      $('.zbig', zm).onclick = function () { zm.classList.toggle('big'); this.textContent = zm.classList.contains('big') ? '화면에 맞춤' : '크게'; };
    }
    $('img', zm).src = src; $('.zc', zm).textContent = cap; zm.classList.remove('big'); $('.zbig', zm).textContent = '크게';
    zm.classList.add('on'); zoomOn = true; D.documentElement.classList.add('mb-lock');
    try { history.pushState({ mbz: 1 }, ''); } catch (e) {}
  }
  function hideZoom(fromPop) {
    if (!zm) return; zm.classList.remove('on'); zoomOn = false; lock();
    if (!fromPop) { try { if (history.state && history.state.mbz) { skipPop++; history.back(); } } catch (e) {} }
  }
  W.mb.zoom = showZoom;

  /* ── 처음 온 이에게 한 번만 — 이 지면을 닑는 법 세 줄 ── */
  function firstTip() {
    try { if (localStorage.getItem('yk-tip1')) return; } catch (e) { return; }
    setTimeout(function () {
    var hasKo = D.querySelector('.hj[data-ko]'), hasMv = D.querySelector('.mv'), isCase = /\/case-/.test(location.pathname);
    var L = [];
    if (hasKo || isCase) L.push(['가', '<b>글은 그 시절 말</b> 그대로요. 오늘 말로 보려거든 ' + (D.querySelector('.mb-bar .mb-ko') ? '위의' : '☰ 안의') + ' 「가」를 누르시오 — 다시 누르면 도로.']);
    if (hasMv || isCase) L.push(['◐', '<b>사진은 누르면</b> 움직이오. 신문이 살아 잇소.']);
    if (isCase) L.push(['도', '<b>끗까지 닑으면</b> 기자수첩이 열리오. 네 사건을 다 모으면 기자증.']);
    L.push(['☰', '<b>오른쪽 우 ☰</b>는 장 지도 — 닑은 장이 보이오.']);
      var t = D.createElement('div'); t.className = 'mb-tip';
      t.innerHTML = '<p class="k">처음 오셧소 · 이 지면을 닑는 법</p><ul>' + L.map(function (x) { return '<li><i>' + x[0] + '</i><span>' + x[1] + '</span></li>'; }).join('') + '</ul><button type="button">알앗소</button>';
      D.body.appendChild(t); requestAnimationFrame(function () { requestAnimationFrame(function () { t.classList.add('on'); }); });
      var off = function () { t.classList.remove('on'); setTimeout(function () { t.remove(); }, 450); try { localStorage.setItem('yk-tip1', '1'); } catch (e) {} };
      t.querySelector('button').onclick = off;
    }, 1600);
  }

  /* ── 읽는 길 — 긴 사건을 폰에서 끗까지: 이어 닑기 · 장마다 자리와 남은 시간 · 장 지도 차례 · 장 끗의 다음 장 예고 ── */
  function readingPath(chsAll, toc) {
    var chs = chsAll.filter(function (s) { return s.id && !/^(next|colophon)$/.test(s.id) && !s.classList.contains('mb-cover'); });
    if (chs.length < 6) return;
    var KEY = location.pathname.replace(/[^a-z0-9]+/gi, '-'), PK = 'yk-pos' + KEY, SK = 'yk-seen' + KEY, N = chs.length;
    var mins = chs.map(function (c) { var t = (c.innerText || c.textContent || '').replace(/\s+/g, ''); return Math.max(1, Math.round(t.length / 360 + c.querySelectorAll('.mb-dev,[data-open]').length * 2)); });
    var left = function (i) { var m = 0; for (var k = i; k < N; k++) m += mins[k]; return m; };
    var seen = {}; try { seen = JSON.parse(localStorage.getItem(SK) || '{}') || {}; } catch (e) {}
    /* 장 첫머리 — 몃째 장 · 이 장 몃 분 · 남은 이야기 */
    chs.forEach(function (c, i) {
      /* (1019) 「이 장 약 몃 분 · 남은 이약이」 띠는 뺏소 */
      if (false && !c.querySelector(':scope > .mb-chp')) {
        var p = D.createElement('p'); p.className = 'mb-chp';
        p.innerHTML = '<span><b>' + (i + 1) + '</b> / ' + N + '</span><i><em style="width:' + ((i + 1) / N * 100).toFixed(1) + '%"></em></i><span>이 장 약 ' + mins[i] + '분 · 남은 이약이 약 ' + left(i) + '분</span>';
        c.insertBefore(p, c.firstChild);
      }
      /* 장 끗 — 다음 장 예고 */
      var nx = chs[i + 1];
      /* (1019) 장 끗의 「다음 장」 단추는 뺏소 — 내려 닑기만 */
      if (false && nx && !c.querySelector(':scope > .mb-nextch')) {
        var b = D.createElement('button'); b.type = 'button'; b.className = 'mb-nextch'; b.setAttribute('data-goto', nx.id);
        b.innerHTML = '<small>다음 장 · ' + (i + 2) + ' / ' + N + '</small><b>' + (nx.getAttribute('data-ch') || '') + '</b><i>↓</i>';
        c.appendChild(b);
      }
    });
    /* 지나간 장은 기록 → 차례에 도장 */
    var io = 'IntersectionObserver' in W ? new IntersectionObserver(function (es) { es.forEach(function (e) { if (e.isIntersecting) { seen[e.target.id] = 1; try { localStorage.setItem(SK, JSON.stringify(seen)); } catch (x) {} } }); }, { rootMargin: '0px 0px -60% 0px' }) : null;
    if (io) chs.forEach(function (c) { io.observe(c); });
    function paintToc() {
      if (!toc) return; var y = W.scrollY, cur = -1; chs.forEach(function (c, i) { if (c.getBoundingClientRect().top < 120) cur = i; });
      var html = '<p class="mb-toc-sum">' + Object.keys(seen).filter(function (k) { return chs.some(function (c) { return c.id === k; }); }).length + ' / ' + N + '장 닑음</p>';
      toc.innerHTML = html + chsAll.map(function (s) { var i = chs.indexOf(s), on = i === cur, sn = i > -1 && seen[s.id];
        return '<a href="#' + s.id + '" data-goto="' + s.id + '" class="' + (on ? 'on ' : '') + (sn ? 'seen' : '') + '"><b>' + (s.getAttribute('data-no') || '') + '</b><span>' + s.getAttribute('data-ch') + '<small>' + (s.getAttribute('data-sub') || '') + '' + '</small></span>' + (i > -1 ? '<em>' + (on ? '지금' : sn ? '닑음' : '') + '</em>' : '') + '</a>'; }).join('');
    }
    W.addEventListener('mb:open', function (e) { if (e.detail === 'mbToc') paintToc(); });
    paintToc();
    /* 이어 닑기 */
    var saveT = 0;
    W.addEventListener('scroll', function () { clearTimeout(saveT); saveT = setTimeout(function () {
      var y = W.scrollY, h = D.documentElement.scrollHeight - innerHeight, cur = -1; chs.forEach(function (c, i) { if (c.getBoundingClientRect().top < 120) cur = i; });
      try { if (y > h - 400) localStorage.removeItem(PK); else if (cur > -1) localStorage.setItem(PK, JSON.stringify({ id: chs[cur].id, y: y, t: Date.now() })); } catch (e) {}
    }, 800); }, { passive: true });
    var sv = null; try { sv = JSON.parse(localStorage.getItem(PK) || 'null'); } catch (e) {}
    if (sv && sv.y > 1500 && !location.hash && W.scrollY < 200) {
      var tgt = D.getElementById(sv.id), k = chs.indexOf(tgt);
      if (tgt && k > 0) {
        var bn = D.createElement('div'); bn.className = 'mb-resume';
        bn.innerHTML = '<div><small>지난번 ' + (k + 1) + ' / ' + N + '장까지 닑엇소</small><b>' + (tgt.getAttribute('data-ch') || '') + '</b></div><button type="button" class="go">이어서 →</button><button type="button" class="x" aria-label="처음부터">처음부터</button>';
        D.body.appendChild(bn); requestAnimationFrame(function () { requestAnimationFrame(function () { bn.classList.add('on'); }); });
        var off = function () { bn.classList.remove('on'); setTimeout(function () { bn.remove(); }, 400); };
        bn.querySelector('.go').onclick = function () { off(); W.scrollTo({ top: tgt.getBoundingClientRect().top + W.scrollY - 50, behavior: 'smooth' }); };
        bn.querySelector('.x').onclick = off; setTimeout(off, 12000);
      }
    }
  }

  /* ── 위 띠 · 목차 ── */
  function init() {
    var bar = $('.mb-bar'), prog = $('.mb-prog'), now = $('.mb-now'), cover = $('.mb-cover');
    var chs = $$('[data-ch]');
    var toc = $('#mbToc .mb-toc');
    if (toc) toc.innerHTML = chs.map(function (s, i) {
      return '<a href="#' + s.id + '" data-goto="' + s.id + '" data-i="' + i + '"><b>' + (s.getAttribute('data-no') || '') + '</b><span>' + s.getAttribute('data-ch') + '<small>' + (s.getAttribute('data-sub') || '') + '</small></span></a>';
    }).join('');
    var cur = -1, tick = false;
    var lastScan = 0, docH = 0, docT = 0, coverH = 0, barOn = null, progW = '', roOK = false;
    /* 문서 높이는 ResizeObserver로 — 스크롤마다 재지 않음 */
    if ('ResizeObserver' in W) { try { var ro = new ResizeObserver(function (es) { es.forEach(function (e) { if (e.target === D.body) docH = e.contentRect.height - W.innerHeight; else coverH = e.contentRect.height; }); roOK = true; }); ro.observe(D.body); if (cover) ro.observe(cover); } catch (e) {} }
    function onScroll() {
      tick = false;
      var y = W.scrollY, t = performance.now(), scan = t - lastScan >= 160, k = cur;
      /* 읽기 먼저, 쓰기는 뒤에 (강제 레이아웃 피하기) */
      if (!roOK && t - docT > 600) { docT = t; docH = D.documentElement.scrollHeight - W.innerHeight; coverH = cover ? cover.offsetHeight : 0; }
      if (scan) { lastScan = t; k = -1; for (var i = 0; i < chs.length; i++) { if (chs[i].getBoundingClientRect().top < 120) k = i; else break; } }
      var h = docH, on = !cover || y > coverH - 60;
      if (bar && on !== barOn) { barOn = on; bar.classList.toggle('on', on); }
      var pw = (h > 0 ? Math.min(100, y / h * 100) : 0).toFixed(1) + '%';
      if (prog && pw !== progW) { progW = pw; prog.style.width = pw; }
      if (k !== cur) {
        cur = k;
        if (now) now.innerHTML = k < 0 ? (now.getAttribute('data-def') || '') : '<b>' + (chs[k].getAttribute('data-kj') || '') + '</b>' + chs[k].getAttribute('data-ch');
        if (toc) $$('a', toc).forEach(function (a, i) { a.classList.toggle('on', i === k); });
      }
    }
    W.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();
    readingPath(chs, toc);
    firstTip();
    var tb = bar && bar.querySelector('[data-open="mbToc"]'); if (tb && !tb.querySelector('.mb-burger')) { tb.setAttribute('aria-label', '차례'); tb.innerHTML = '<i class="mb-burger"><i></i></i>'; }

    /* 나타나기 — 화면에 조금이라도 들어오면 (긴 칸도 막히지 않게) */
    var rv = $$('.mb-rv');
    if ('IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); } });
      }, { rootMargin: '0px 0px -8% 0px', threshold: 0 });
      rv.forEach(function (el) { io.observe(el); });
    } else rv.forEach(function (el) { el.classList.add('in'); });
    setTimeout(function () { rv.forEach(function (el) { if (el.getBoundingClientRect().top < W.innerHeight) el.classList.add('in'); }); }, 1200);
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init();
})(window, document);

/* ════ 공통 장치 ① 그날의 지면 (#shPaper · #ppTabs · #ppBody · #ppDots · .mbWordN) ════
   cfg = { arts, words?, imgBase, era:'소화 팔 년', zoomFirst? , goto:'ch5' }
   arts[i] = { d[], tag[], day[], date, img, title, lead, body[], sum[], keys[], mark?, sealed?, w?[], none?[], miss?[], hook?[] } */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var t0 = function (x) { return x == null ? '' : (Array.isArray(x) ? x[0] : x); };

  W.mb.paper = function (cfg) {
    var A = cfg.arts, WD = cfg.words || [], got = {}, I = 0, mode = 'scan';
    var N26 = cfg.n26 || { sec: '사회', sub: '사건·사고' };
    function paintN() {
      var n = Object.keys(got).length;
      $$('.mbWordN').forEach(function (el) { el.textContent = n; });
      var d = $('#ppDots'); if (d) d.innerHTML = WD.map(function (w, i) { return '<i class="' + (got[i] ? 'on' : '') + '"></i>'; }).join('');
    }
    function tabs() {
      $('#ppTabs').innerHTML = A.map(function (a, i) {
        return '<button type="button" data-i="' + i + '" class="' + (i === I ? 'on ' : '') + (a.sealed ? 'seal' : '') + '">' + t0(a.d) + '<small>' + (a.mark ? '● ' : '') + t0(a.tag) + '</small></button>';
      }).join('');
    }
    function render() {
      var a = A[I], h = '';
      if (a.sealed) {
        h = '<div class="pp-seal"><span class="sl">封<br>緘</span><b>' + (cfg.sealHead || '이 날의 지면은,<br>호외에서 뜨드시압.') + '</b><p>' + (cfg.sealText || '') + '</p>' +
          '<button class="mb-btn red" data-goto="' + cfg.goto + '" data-open-extra>' + (cfg.sealBtn || '호외로 →') + '</button></div>';
      } else {
        var src = cfg.imgBase + a.img, yr = a.date.slice(0, 4);
        h = '<div class="pp-hd"><small>' + (cfg.sec || '사회면') + ' | ' + t0(a.d) + ' | ' + t0(a.day) + '</small>' + (a.mark ? '<i class="stamp">' + a.mark + '</i>' : '') + '</div>' + (a.paper ? '<p class="pp-paper">' + (a.paper === '동아일보' ? '실제 동아일보 기사' : '실제 ' + a.paper + ' 기사') + '</p>' : '') + (a.note ? '<div class="pp-note"><b>알려 두오</b>' + t0(a.note) + '</div>' : '') +
          '<div class="mb-seg pp-seg ' + (W.ykNews26 ? 'four' : 'three') + '"><button data-m="scan" class="' + (mode === 'scan' ? 'on' : '') + '">원문 지면</button>' + (W.ykNews26 ? '<button data-m="n26" class="' + (mode === 'n26' ? 'on' : '') + '">2026 뉴스</button>' : '') + '<button data-m="now" class="' + (mode === 'now' ? 'on' : '') + '">오늘 말로</button><button data-m="sum" class="' + (mode === 'sum' ? 'on' : '') + '">간추려 읽기</button></div>';
        if (mode === 'scan') {
          var key = String(a.img).replace(/\.[a-z]+$/, '').replace(/_0\d$/, ''), AD = cfg.ads && cfg.ads[String(a.img).replace(/\.[a-z]+$/, '')];
          h += '<div class="pp-scanbox"><button class="pp-scan" type="button" data-zoom="' + src + '" data-cap="' + (a.paper || '동아일보') + ' ' + a.date + ' 원문 지면"><img src="' + src + '" alt="' + (a.paper || '동아일보') + ' ' + a.date + ' 원문 지면"><span>눌러 크게 보기</span></button>' +
            (W.ykNews26 ? '<div class="pp-cmp" id="ppCmp" style="--x:100%"><div class="pp-cmp-in">' + W.ykNews26({ a: a, arts: A, cur: I, paper: a.paper || '동아일보', sec: N26.sec, sub: N26.sub }) + '</div><button type="button" class="pp-cmp-h" id="ppCmpH" aria-label="당겨서 2026년 뉴스 보기"><i></i><span>당겨 보기<br>2026</span></button></div>' : '') +
            (AD ? '<button type="button" class="pp-cut" style="top:' + (AD.top * 100) + '%;height:' + (AD.h * 100) + '%" data-goad>아래칸 · 그날의 광고 ▾</button>' : '') + '</div>' +
            '<p class="pp-cap">원 긔사 · ' + (a.paper || '동아일보') + ' · ' + cfg.era + ' ' + t0(a.d) + ' — 테두리 친 곳이 그날 실린 긔사이오.' + (AD ? ' 붉은 절취선 안은 가튼 장 맨 아래칸의 광고요.' : '') + '</p>';
          if (AD) {
            var y = a.date.slice(0, 4), m = +a.date.slice(5, 7), dd = +a.date.slice(8, 10);
            h += '<details class="pp-ad" id="ppAd"><summary><b>아래칸 · 그날의 광고</b><span>눌러 펼치기</span></summary><p class="pp-ad-k">그날, 가튼 장 아래칸 · ' + y + '년 ' + m + '월 ' + dd + '일 · 동아일보</p>' +
              '<button type="button" class="pp-adimg" data-zoom="' + AD.img + '" data-cap="' + y + '년 ' + m + '월 ' + dd + '일 지면 맨 아래칸 광고"><img src="' + AD.img + '" alt="' + y + '년 ' + m + '월 ' + dd + '일 지면 아래칸 광고" loading="lazy"><span>눌러 크게 보기</span></button>' +
              '<p class="pp-ad-cap">' + (AD.cap || (y + '년 ' + m + '월 ' + dd + '일 지면, 그 맨 아래칸이오. 가튼 날 가튼 장에 실린 진짜 광고들이오.')) + '</p>' +
              '<p class="pp-ad-say">' + (AD.say || '가튼 장 우에선 사건을 쫏고, 아래칸에선 물건을 팔앗소.') + '</p>' +
              (cfg.shop ? '<a class="pp-ad-go" href="' + cfg.shop + (AD.sk || key) + '">이 아래칸 광고 — 상뎜에서 펼쳐 보기 →</a>' : '') + '</details>';
          }
        } else if (mode === 'sum') {
          var Q = ['이 보도의 요뎜은 무엇이오?', '그때 형편은 엇더하엿소?', '긔록에서 눈여겨볼 대목은 어대요?'];
          h += '<article class="pp-art pp-short"><p class="pp-sec">간추려 읽기 · ' + t0(a.d) + '</p><h3>' + a.title + '</h3><ol class="pp-sum big">' + a.sum.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>' +
            '<h4>긔록에게 뭇다</h4><p class="pp-cap" style="margin:0 0 10px">이 긔사에 궁금한 것을 긔록과 함께 풀어 보시압. 물음을 누르면 답이 나오오.</p>' +
            (a.qa ? a.qa.map(function (x) { return '<details class="pp-qa"><summary><b>문</b>' + x[0] + '</summary><p><b>답</b>' + x[2] + '</p></details>'; }).join('') : Q.map(function (q, i) { return a.sum[i] ? '<details class="pp-qa"><summary><b>문</b>' + q + '</summary><p><b>답</b>' + a.sum[i] + '</p></details>' : ''; }).join('')) +
            '<p class="pp-warn">※ ' + yr + '년 ' + (a.paper || '동아일보') + ' 원문을 바탕으로 간추린 것입니다.</p></article>';
        } else if (mode === 'n26' && W.ykNews26) {
          h += '<div class="pp-n26">' + W.ykNews26({ a: a, arts: A, cur: I, img: src, paper: a.paper || '동아일보', sec: N26.sec, sub: N26.sub }) + '</div>';
        } else {
          h += '<article class="pp-art"><p class="pp-sec">경성야록뉴스 · 사회 › 사건·사고 › 아카이브</p><h3>' + a.title + '</h3>' +
            '<p class="pp-by">경성야록 아카이브팀 기자 · 입력 2026.' + a.date.slice(5) + ' 06:00 · 원 보도 ' + (a.paper || '동아일보') + ' ' + a.date + '</p>' +
            '<p class="pp-lead">' + a.lead + '</p>' + a.body.map(function (p) { return '<p>' + p + '</p>'; }).join('') +
            '<p class="pp-tags">' + a.keys.map(function (k) { return '#' + k; }).join(' ') + '</p>' +
            '<h4>간추려 읽기</h4><ul class="pp-sum">' + a.sum.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>' +
            '<p class="pp-warn">※ ' + yr + '년 ' + (a.paper || '동아일보') + ' 원문을 바탕으로, 오늘의 기사 형식으로 다시 쓴 것입니다. 실제 2026년 보도가 아닙니다.</p></article>';
        }
        if (a.hook) h += '<div class="pp-words"><h4>이 날의 수수께끼</h4><p class="pp-none">' + t0(a.hook) + '</p></div>';
        if (a.w) {
          h += '<div class="pp-words"><h4>이날 지면에 오른 말</h4>';
          if (a.w.length) h += '<div class="pp-chips">' + a.w.map(function (k) { return '<span class="chip' + (got[k] ? ' had' : '') + '">' + t0(WD[k].w) + '</span>'; }).join('') + '</div><p class="pp-cap">모아 두엇소. 호외에서 다시 맛나리다.</p>';
          else h += '<p class="pp-none">' + t0(a.none) + '</p>';
          h += '</div>';
        }
        if (a.miss) h += '<div class="pp-words miss"><h4>이날 지면에 실리지 못한 것</h4><p class="pp-none">' + t0(a.miss) + '</p></div>';
        var nx = A[I + 1];
        if (nx) h += '<button class="mb-btn pp-next" data-next>' + t0(nx.d) + ' 지면 →</button>';
      }
      var bd = $('#ppBody'); bd.innerHTML = h; bd.scrollTop = 0;
      if (!a.sealed && a.w) {
        a.w.forEach(function (k) { got[k] = 1; });
        setTimeout(function () { $$('.pp-chips .chip', bd).forEach(function (c, i) { setTimeout(function () { c.classList.add('got'); }, i * 260); }); }, 250);
        paintN();
      }
      var cmp = $('#ppCmp', bd);
      if (cmp) {
        var hd = $('#ppCmpH', cmp), drag = false;
        var setX = function (x) { x = Math.max(0, Math.min(100, x)); cmp.style.setProperty('--x', x + '%'); cmp.classList.toggle('open', x < 92); };
        var pos = function (e) { var r = cmp.getBoundingClientRect(); setX((e.clientX - r.left) / r.width * 100); };
        hd.addEventListener('pointerdown', function (e) { drag = true; cmp.classList.add('drag', 'moved'); if (hd.setPointerCapture) hd.setPointerCapture(e.pointerId); e.preventDefault(); });
        hd.addEventListener('pointermove', function (e) { if (drag) pos(e); });
        var end = function () { drag = false; cmp.classList.remove('drag'); };
        hd.addEventListener('pointerup', end); hd.addEventListener('pointercancel', end);
        hd.addEventListener('click', function (e) { e.stopPropagation(); });
        if (!W.__ppHint) { W.__ppHint = 1; setTimeout(function () { if (!cmp.classList.contains('moved')) { cmp.classList.add('hint'); setTimeout(function () { cmp.classList.remove('hint'); }, 2400); } }, 900); }
      }
      tabs();
      var on = $('#ppTabs .on'); if (on && on.scrollIntoView) on.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
    D.addEventListener('click', function (e) {
      var t = e.target.closest('#ppTabs button'); if (t) { I = +t.dataset.i; render(); return; }
      var m = e.target.closest('.pp-seg button'); if (m) { mode = m.dataset.m; render(); return; }
      var rl = e.target.closest('#ppBody .n26-rel a[data-i]'); if (rl) { e.preventDefault(); I = +rl.dataset.i; render(); return; }
      if (e.target.closest('#ppBody [data-next]')) { I = Math.min(A.length - 1, I + 1); render(); return; }
      if (e.target.closest('#ppBody [data-goad]')) { e.preventDefault(); e.stopPropagation(); var ad = $('#ppAd'), bd = $('#ppBody'); if (ad) ad.open = true; if (ad) bd.scrollTo({ top: ad.offsetTop - 10, behavior: 'smooth' }); }
    });
    W.addEventListener('mb:open', function (e) { if (e.detail === 'shPaper') render(); });
    paintN();
    return { got: got };
  };

  /* ════ 공통 장치 ② 긔록 수신긔 (#shRadio · #rdScale · #rdNo · #rdWhen · #rdMeter · #rdPlay · #rdTime · #rdCard · #rdBody) ════
     cfg = { st, audioBase, staticSrc, endLine } · st[i] = { y, no, when, au?, moon, t[], b[](문자열 또는 [옛,오늘]), d[], link? } */
  W.mb.radio = function (cfg) {
    /* 다이얼을 손가락으로 돌림 → 잡음이 줄고 늘다가, 주파수에 닿으면 녹음이 저절로 흘러나옴 */
    var ST = cfg.st, LO = 550, HI = 1500, built = false, ang = 0, lock = -1, card = -1, TURNS = 3, MAXA = 360 * TURNS - 1, det = -1, vel = 0, spin = 0;
    var fq = function (a) { return LO + ((a % 360) + 360) % 360 / 360 * (HI - LO); }, fT = function (T) { return LO + T / (360 * TURNS) * (HI - LO); };
    var A = W.mb.audio, au = null, noise = null, an = null, raf = 0, open = false;
    /* (1019c) 톱니 — 손잡이를 돌리면 속의 톱니바퀴가 맛물려 돌고, 그 힘으로 바늘이 가오 */
    function gearSvg(n, R, r, cls) {
      var st = Math.PI * 2 / n, d = '', c = R + 2, P = function (a, rr) { return (c + Math.cos(a) * rr).toFixed(2) + ' ' + (c + Math.sin(a) * rr).toFixed(2); };
      for (var i = 0; i < n; i++) { var a = i * st; d += (i ? 'L' : 'M') + P(a, r) + 'L' + P(a + st * .18, R) + 'L' + P(a + st * .44, R) + 'L' + P(a + st * .62, r) + 'L' + P(a + st, r); }
      var sp = ''; for (var k = 0; k < 4; k++) { var b = k * Math.PI / 2; sp += '<line x1="' + P(b, r * .28) .replace(' ', '" y1="') + '" x2="' + P(b, r * .78).replace(' ', '" y2="') + '"/>'; }
      return '<svg class="rx2-g ' + cls + '" viewBox="0 0 ' + c * 2 + ' ' + c * 2 + '" width="' + c * 2 + '" height="' + c * 2 + '"><path d="' + d + 'Z"/><circle cx="' + c + '" cy="' + c + '" r="' + (r * .82).toFixed(1) + '" class="rim"/>' + sp + '<circle cx="' + c + '" cy="' + c + '" r="' + (r * .2).toFixed(1) + '" class="hub"/></svg>';
    }
    var GEARS = '<div class="rx2-gears" aria-hidden="true"><i class="rx2-cord"></i>' + gearSvg(18, 40, 33, 'ga') + gearSvg(12, 28, 21, 'gb') + gearSvg(9, 22, 15.5, 'gc') + gearSvg(24, 30, 25, 'gd') + '<span class="rx2-gl">속 · 톱니</span></div>';
    /* 손잡이는 딸깍딸깍 — 육 도마다 걸리고, 둘레 톱니가 작은 톱니 셋을 맛물려 돌림 */
    var gEls = null, gq = 0, gAng = 0, vStep = null, STEP = 6;
    function gearsTo(a) { gAng = a; if (gq) return; gq = requestAnimationFrame(function () { gq = 0; if (!gEls) gEls = [$('#rxKnob img'), $('#rxKnob .rx2-knurl'), $('#rxRing'), $('.rx2-pin.p1'), $('.rx2-pin.p2'), $('.rx2-pin.p3')];
      var v = Math.round(gAng / STEP) * STEP; if (v === vStep) return;
      if (vStep !== null) { if (navigator.vibrate) try { navigator.vibrate(4); } catch (x) {} if (W.mb.tone) W.mb.tone('type'); var kn = $('#rxKnob'); if (kn) { kn.classList.remove('tk'); void kn.offsetWidth; kn.classList.add('tk'); } }
      vStep = v; var r = [v, v, v, -v * 44 / 10 + 18, -v * 44 / 10 + 5, v * 44 / 10 * 10 / 8 + 11];
      gEls.forEach(function (e, i) { if (e) e.style.transform = 'rotate(' + r[i].toFixed(1) + 'deg)'; }); }); }
    function build() {
      built = true;
      $('#rdBody').innerHTML =
        '<div class="rx2"><div class="rx2-scr">' +
        '<div class="rx2-top"><span id="rxState">잡음뿐이오</span><span class="rx2-kc"><b id="rxKc">---</b> 키로</span></div>' +
        /* (1019) 화면 — 우에는 풍경(달 · 언덕 · 물결 · 흐릿한 해ㅅ수), 아래에는 글. 다이얼을 돌리면 언덕이 밀리고 달이 흐르고 해ㅅ수가 또렷해짐 */
        '<div class="rx2-scene" id="rxScene"><div class="rx2-ghost" id="rxGhost"></div><span class="rx2-moon" id="rxMoon"></span>' + HILLS + '<canvas id="rxWave"></canvas><i class="rx2-haze"></i></div>' +
        '<div class="rx2-vis" id="rxVis"></div></div>' +
        '<div class="rx2-scale"><div class="rd-nums"><span>550</span><span>700</span><span>900</span><span>1100</span><span>1300</span><span>1500</span></div><div class="rd-ticks"></div>' +
        ST.map(function (s) { return '<i class="rx2-st" style="left:' + ((fq(s.ang) - LO) / (HI - LO) * 100) + '%"></i>'; }).join('') + '<i class="rd-needle" id="rxNeedle"></i></div>' +
        '<div class="rx2-knobwrap"><div class="rx2-meter" aria-hidden="true"><svg viewBox="0 0 120 64"><path d="M10 58 A52 52 0 0 1 110 58" fill="none" stroke="#333" stroke-width="1.5"/><path class="rx2-arc" d="M78 13 A52 52 0 0 1 110 58" fill="none" stroke="currentColor" stroke-width="3"/>' + [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(function (k) { var a = Math.PI * (1 - k / 10), r1 = 52, r2 = k % 5 ? 47 : 43; return '<line x1="' + (60 + Math.cos(a) * r1).toFixed(1) + '" y1="' + (58 - Math.sin(a) * r1).toFixed(1) + '" x2="' + (60 + Math.cos(a) * r2).toFixed(1) + '" y2="' + (58 - Math.sin(a) * r2).toFixed(1) + '" stroke="#777" stroke-width="1"/>'; }).join('') + '</svg><i id="rxMeter"></i><span>신호</span></div>' +
        '<p class="rx2-hint" id="rxHint"><b>손잡이를 천천히 돌리시압</b>신호 바늘이 오른편 짙은 칸에 들면<br>손을 늦추고 조금씩 맞추시압</p>' +
        '<div class="rx2-mech"><span class="rx2-pin p1">' + gearSvg(10, 30, 23, 'gp') + '</span><span class="rx2-pin p2">' + gearSvg(10, 30, 23, 'gp') + '</span><span class="rx2-pin p3">' + gearSvg(8, 20, 14.5, 'gq') + '</span><div class="rx2-knob" id="rxKnob"><span class="rx2-ring" id="rxRing">' + gearSvg(44, 60, 55, 'gr') + '</span><img src="' + (cfg.dial || '') + '" alt="" draggable="false"><span class="rx2-knurl"></span><span class="rx2-shine"></span><i></i></div></div><p class="rx2-turn" id="rxTurn"></p></div>' +
        '<div class="rd-card" id="rdCard"><p class="rd-hint">잡음 속 어딘가에, ' + ST.length + ' 개의 목소리가 숨어 잇소.</p></div></div>';
      var kn = $('#rxKnob'), last = null, c0 = null;
      function aAt(t) { var r = kn.getBoundingClientRect(); return Math.atan2(t.clientX - (r.left + r.width / 2), -(t.clientY - (r.top + r.height / 2))) * 180 / Math.PI; }
      var lt = 0;
      var sLock = -1; function down(e) { var t = e.touches ? e.touches[0] : e; sLock = lock; last = aAt(t); lt = performance.now(); vel = 0; cancelAnimationFrame(spin); kn.classList.add('grab'); start(); }
      function move(e) { if (last === null) return; var t = e.touches ? e.touches[0] : e, a = aAt(t), d = a - last, now = performance.now(); if (d > 180) d -= 360; if (d < -180) d += 360; last = a;
        /* 손가락이 빠를수록 성글게, 느릴수록 곱게 — 주파수 가까이선 저절로 무거워짐 */
        var dt = Math.max(8, now - lt), sp = Math.abs(d) / dt, near = Math.max(0, 1 - nearKc() / 40), k = (sp < .08 ? .35 : 1) * (1 - near * .55);
        lt = now; vel = d * k / dt * 16; setAng(ang + d * k); if (e.cancelable) e.preventDefault(); }
      function up() { if (last === null) return; last = null; kn.classList.remove('grab');
        /* 가까우면 저절로 주파수에 딱 맛춤 · 손을 뗀 그 순간(폰이 소리를 허락하는 때)에 목소리를 틂 */
        var sn = snapIdx(); if (sn >= 0 && sn !== sLock) { vel = 0; glide(ST[sn].ang * TURNS, 520); } else coast();
        playNow(); }
      function coast() { cancelAnimationFrame(spin); (function f() { vel *= .9; if (Math.abs(vel) < .15 || ang <= 0 || ang >= MAXA || lock >= 0) return; setAng(ang + vel); spin = requestAnimationFrame(f); })(); }
      kn.addEventListener('touchstart', down, { passive: true }); kn.addEventListener('touchmove', move, { passive: false }); kn.addEventListener('touchend', up);
      kn.addEventListener('mousedown', down); W.addEventListener('mousemove', move); W.addEventListener('mouseup', up);
      setAng(12);
    }
    function snapIdx() { var f = fT(ang), b = -1, bd = 1e9; ST.forEach(function (s, i) { var d = Math.abs(fq(s.ang) - f); if (d < bd) { bd = d; b = i; } }); return bd < 22 ? b : -1; }
    function rdAu() { if (!W.__mbRd) { W.__mbRd = D.createElement('audio'); W.__mbRd.preload = 'auto'; W.__mbRd.setAttribute('playsinline', ''); D.body.appendChild(W.__mbRd);
        ['play', 'pause', 'ended'].forEach(function (t) { W.__mbRd.addEventListener(t, paintPlay); }); W.__mbRd.addEventListener('timeupdate', paintTime); }
      return W.__mbRd; }
    var want = -1;
    function playNow() { var i = lock >= 0 ? lock : want; if (i < 0 || !ST[i] || !ST[i].au) return; var a = rdAu(); if (a.getAttribute('data-k') !== ST[i].au) { a.src = cfg.audioBase + ST[i].au; a.setAttribute('data-k', ST[i].au); } if (!a.paused) return; a.volume = 1;
      try { W.dispatchEvent(new CustomEvent('mb:audio')); } catch (e) {} var p = a.play(); if (p && p.then) p.then(function () { $('.rx2') && $('.rx2').classList.remove('ask'); }, function () { var r = $('.rx2'); if (r) r.classList.add('ask'); }); }
    function paintPlay() { var b = $('#rdPlay'), a = W.__mbRd; if (!b || !a) return; var on = !a.paused && !a.ended; b.classList.toggle('on', on); b.innerHTML = on ? '<i>❚❚</i> 멈춤' : '<i>▶</i> ' + (a.currentTime > .5 && !a.ended ? '이어 듣기' : '목소리 듣기'); }
    function paintTime() { var a = W.__mbRd, t = $('#rdTime'); if (!a || !t) return; var d = a.duration || 0, c = a.currentTime || 0; t.style.setProperty('--p', d ? (c / d * 100).toFixed(1) + '%' : '0%'); }
    function glide(to, ms) { var from = ang, t0 = performance.now(); ms = ms || 1400; (function f(t) { var k = Math.min(1, (t - t0) / ms), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; setAng(from + (to - from) * e); if (k < 1) requestAnimationFrame(f); })(t0); }
    function nearKc() { var f = fT(ang), bd = 1e9; ST.forEach(function (s) { bd = Math.min(bd, Math.abs(fq(s.ang) - f)); }); return bd; }
    function setAng(a) {
      ang = Math.max(0, Math.min(MAXA, a));
      gearsTo(ang); var f = fT(ang);
      /* 딸깍 — 5 키로마다 손끗에 걸림 */

      var tn = $('#rxTurn'); if (tn) tn.textContent = (Math.floor(ang / 360) + 1) + ' 바퀴째' + (ang <= 0 ? ' · 왼편 끗' : ang >= MAXA ? ' · 오른편 끗' : '');
      $('#rxNeedle').style.left = ((f - LO) / (HI - LO) * 100) + '%'; $('#rxKc').textContent = Math.round(f);
      var best = -1, bd = 1e9; ST.forEach(function (s, i) { var d = Math.abs(fq(s.ang) - f); if (d < bd) { bd = d; best = i; } });
      /* 한 번 잡히면 조금 흔들려도 놋치지 안음 (잡힘 8 · 놋침 24 키로) */
      var near = Math.max(0, 1 - bd / 70), on = bd < 8 ? best : (lock >= 0 && lock === best && bd < 24 ? lock : -1);
      var mt = $('#rxMeter'); if (mt) mt.style.transform = 'rotate(' + (-62 + 124 * Math.pow(near, 1.6) + (Math.random() - .5) * (1 - near) * 6).toFixed(1) + 'deg)';
      if (A) A.noiseLevel(on >= 0 ? .015 : .42 * (1 - near * .92));
      var rx = $('.rx2'); rx.style.setProperty('--near', near.toFixed(2)); rx.style.setProperty('--ang', ang.toFixed(1));
      var gh = $('#rxGhost'); if (gh && best >= 0) { var gy = String(ST[best].y || ''); if (gh.textContent !== gy) gh.textContent = gy; gh.style.opacity = (Math.pow(near, 2) * .9).toFixed(2); gh.style.filter = 'blur(' + ((1 - near) * 9).toFixed(1) + 'px)'; }
      if (on !== lock) tuneTo(on);
      if (on < 0) between();
      if (au) au.volume = on >= 0 ? 1 : Math.min(1, Math.max(0, (near - .4) / .6));
    }
    var gap = -1, HILLS = '<svg class="rx2-hills b" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 46 L40 24 L76 40 L118 12 L160 38 L196 22 L236 42 L270 28 L300 38 L300 60 L0 60Z" fill="#1c1c1c"/></svg><svg class="rx2-hills f" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 54 L60 42 L110 50 L160 40 L214 52 L260 44 L300 50 L300 60 L0 60Z" fill="#0d0d0d"/></svg>';
    function between() {
      if (!cfg.gaps || !cfg.gaps.length) return;
      var n = ST.length, SP = 360 / n, m = function (a) { return ((a % 360) + 360) % 360; }, g = Math.floor(m(ang / TURNS - ST[0].ang) / SP) % n; if (g === gap) return; gap = g;
      var G = cfg.gaps[g]; if (!G) return;
      $('#rxVis').innerHTML = '<p class="rx2-btw"><small>' + G[0] + ' ─── ' + G[1] + '</small>' + t0(G.slice ? (G.length > 2 ? G[2] : G) : G) + '</p>';
      var mn = $('#rxMoon'); if (mn) mn.style.left = '';
      $('#rxState').textContent = '주파수 사이 · ' + G[0] + ' → ' + G[1];
      if (card < 0) $('#rdCard').innerHTML = '<p class="rd-hint">두 칸 사이에서 이어지는 것을 드르시오. 바늘을 조금 더 돌리면 다음 이약이가 잡히오.</p>';
    }
    function tuneTo(i) {
      lock = i; var st = $('#rxState'), s = ST[i];
      if (i < 0) { st.textContent = '잡음뿐이오'; $('.rx2').classList.remove('lock', 'ask'); if (au) { au.pause(); } want = -1; gap = -1; return; }
      gap = -1;
      var mn = $('#rxMoon'); if (mn) mn.style.left = (s.moon || 60) + '%';
      $('#rxVis').innerHTML = (s.au ? '' : '<p class="rx2-nos">이 칸은 소리가 업소 — 지면만 남앗소</p>') + '<h4>' + (s.h || t0(s.t)) + '</h4>' +
        (s.card && cfg.cardBase ? '<button type="button" class="rx2-card" data-zoom="' + cfg.cardBase + s.card + '" data-cap="' + s.y + ' 카드뉴스"><img src="' + cfg.cardBase + s.card + '" alt="' + s.y + ' 카드뉴스"><span>크게</span></button>' : '');
      $('.rx2').classList.add('lock'); st.textContent = s.no + ' · 잡혓소';
      if (W.mb.tone) W.mb.tone('stamp'); if (navigator.vibrate) try { navigator.vibrate([20, 40, 20]); } catch (x) {}
      if (card !== i) { card = i; showCard(i); }
      au = rdAu(); want = i;
      if (s.au) { if (au.getAttribute('data-k') !== s.au) { au.pause(); au.src = cfg.audioBase + s.au; au.setAttribute('data-k', s.au); } playNow(); }
      else { au.pause(); }
    }
    function showCard(i) {
      var s = ST[i];
      $('#rdCard').innerHTML = '<p class="rd-k">' + s.no + ' · ' + s.when + (s.au ? '' : ' · 녹음 업슴') + '</p>' + (s.au ? '<div class="rd-pl"><button type="button" class="rd-play" id="rdPlay"><i>▶</i> 목소리 듣기</button><span class="rd-time" id="rdTime"><i></i></span></div>' : '') + '<h3>' + t0(s.t) + '</h3><ul>' + s.b.map(function (x) { return '<li>' + t0(x) + '</li>'; }).join('') + '</ul>' +
        '<p class="rd-d">' + t0(s.d) + '</p>' + (s.link ? '<p class="rd-link"><b>' + (cfg.linkLabel || '겹치는 자리') + '</b>' + t0(s.link) + '</p>' : '') +
        (s.card && cfg.cardBase ? '<button type="button" class="rd-cardimg" data-zoom="' + cfg.cardBase + s.card + '" data-cap="' + s.y + ' 카드뉴스"><img src="' + cfg.cardBase + s.card + '" alt="' + s.y + ' 카드뉴스" loading="lazy"><span>카드뉴스 · 눌러 크게 보기</span></button>' : '') +
        (i === ST.length - 1 ? '<p class="mb-p" style="margin-top:18px;color:#d9d8d3">' + (cfg.endLine || '') + '</p>' : '<p class="rd-next">다이얼을 더 돌리면 — 주파수 사이에서, 이어지는 말이 들리오.</p>');
      $('#rdCard').classList.remove('in'); void $('#rdCard').offsetWidth; $('#rdCard').classList.add('in'); paintPlay(); paintTime();
      var pb = $('#rdPlay'); if (pb) pb.onclick = function () { var a = rdAu(); if (!a.paused) { a.pause(); return; } if (a.ended) a.currentTime = 0; want = card; playNow(); };
    }
    /* 화면의 물결 — 잡음이면 들쑥날쑥, 잡히면 느린 물결 */
    function draw() {
      var cv = $('#rxWave'); if (!cv || !open) { raf = 0; return; }
      var w = cv.clientWidth, h = cv.clientHeight; if (cv.width !== w) { cv.width = w; cv.height = h; }
      var x = cv.getContext('2d'); x.clearRect(0, 0, w, h); x.strokeStyle = lock >= 0 ? 'rgba(236,235,230,.9)' : 'rgba(220,220,215,.5)'; x.lineWidth = 1.4; x.beginPath();
      var t = performance.now() / 1000, nz = (lock >= 0 ? .12 : .9) + Math.min(.5, Math.abs(vel) * .04);
      for (var i = 0; i <= w; i += 3) { var y = h / 2 + Math.sin(i / 22 + t * 3) * h * (lock >= 0 ? .22 : .06) + (Math.random() - .5) * h * .7 * nz; i ? x.lineTo(i, y) : x.moveTo(i, y); }
      x.stroke(); raf = requestAnimationFrame(draw);
    }
    function start() { if (A) A.noiseOn(); }
    /* (1019) 본문 속 라듸오 카드 — 가만히 잇지 안케: 사진 아래에 눈금 띠와 바늘이 천천히 오가고, 주파수 점이 박힘 */
    function deco() {
      $$('.mb-dev[data-open="shRadio"]').forEach(function (b) {
        if (b.querySelector('.dv-rd')) return; var ph = b.querySelector('.ph'); if (!ph) return; b.classList.add('rd-live');
        var st = D.createElement('span'); st.className = 'dv-rd'; st.setAttribute('aria-hidden', 'true');
        st.innerHTML = '<span class="dv-rd-n"><b>550</b><b>700</b><b>900</b><b>1100</b><b>1300</b><b>1500</b></span>' + ST.map(function (x) { return '<i class="dv-rd-s" style="left:' + ((fq(x.ang) - LO) / (HI - LO) * 100).toFixed(1) + '%"></i>'; }).join('') + '<i class="dv-rd-nd"></i><em class="dv-rd-w"></em><b class="dv-rd-g">' + gearSvg(12, 14, 10.5, 'g1') + gearSvg(8, 10, 7, 'g2') + '</b>';
        ph.appendChild(st);
      });
    }
    var $$ = function (q) { return Array.prototype.slice.call(D.querySelectorAll(q)); };
    if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', deco); else deco();
    W.addEventListener('mb:open', function (e) {
      if (e.detail !== 'shRadio') return; open = true; if (!built) build(); start(); setAng(ang); if (!raf) raf = requestAnimationFrame(draw);
    });
    W.addEventListener('mb:close', function (e) { if (e.detail !== 'shRadio') return; open = false; if (au) au.pause(); if (A) A.noiseOff(); lock = -2; });
  };
})(window, document);

/* ════ 공통 ③ 옛말 → 오늘말 (낱말을 누르면 바뀜 · 위 띠 「가」 단추는 전부) ════
   window.MB_KO = { 옛말: 오늘말 } 이 잇으면 켜짐 */
(function (W, D) {
  'use strict';
  var MAP = W.MB_KO; if (!MAP) return;
  var keys = Object.keys(MAP).filter(function (k) { return k.length >= 2; }).sort(function (a, b) { return b.length - a.length; });
  if (!keys.length) return;
  var esc = function (t) { return t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); };
  var RX = new RegExp(keys.map(esc).join('|'), 'g');
  var SKIP = /^(SCRIPT|STYLE|BUTTON|TEXTAREA|svg|text|SUMMARY|TIME)$/;
  var all = false;
  function scan(root) {
    var tw = D.createTreeWalker(root, NodeFilter.SHOW_TEXT, { acceptNode: function (n) {
      var p = n.parentNode; if (!n.nodeValue || n.nodeValue.length < 2) return 2;
      for (var e = p; e && e !== root.parentNode; e = e.parentNode) { if (e.nodeType === 1 && (SKIP.test(e.nodeName) || (e.hasAttribute && e.hasAttribute('data-noko')) || (e.classList && (e.classList.contains('hj') || e.classList.contains('mb-bar') || e.classList.contains('mb-cover'))))) return 2; }
      RX.lastIndex = 0; return RX.test(n.nodeValue) ? 1 : 2; } });
    var list = []; while (tw.nextNode()) list.push(tw.currentNode);
    list.forEach(function (n) {
      var t = n.nodeValue, frag = D.createDocumentFragment(), last = 0; RX.lastIndex = 0; var m;
      while ((m = RX.exec(t))) {
        if (m.index > last) frag.appendChild(D.createTextNode(t.slice(last, m.index)));
        var sp = D.createElement('y-k'); sp.className = 'hj' + (all ? ' ko' : ''); sp.setAttribute('data-old', m[0]); sp.setAttribute('data-ko', MAP[m[0]]);
        sp.textContent = all ? MAP[m[0]] : m[0]; frag.appendChild(sp); last = m.index + m[0].length;
      }
      if (last < t.length) frag.appendChild(D.createTextNode(t.slice(last)));
      n.parentNode.replaceChild(frag, n);
    });
  }
  function flip(sp, on) { sp.classList.toggle('ko', on); sp.textContent = on ? sp.getAttribute('data-ko') : sp.getAttribute('data-old'); }
  /* (1019) 낱말을 눌러 하나씩 바꾸던 것도 뺏소 — 글은 옛말로 고정, 「가」 단추로만 전부 바뀜 */
  function init() {
    scan(D.body);
    var bar = D.querySelector('.mb-bar'), toc = bar && bar.querySelector('[data-open="mbToc"]');
    if (bar && toc) {
      var b = D.createElement('button'); b.type = 'button'; b.className = 'mb-ko'; b.innerHTML = '<b>가</b>'; b.setAttribute('aria-label', '옛말 · 오늘 말 바꾸기');
      bar.insertBefore(b, toc);
      b.addEventListener('click', function () { all = !all; b.classList.toggle('on', all); b.innerHTML = '<b>가</b>'; D.querySelectorAll('.hj[data-ko]').forEach(function (sp) { flip(sp, all); }); });
    }
    var tmr; var mo = new MutationObserver(function (ms) {
      clearTimeout(tmr); tmr = setTimeout(function () { var seen = []; ms.forEach(function (m) { var t = m.target; if (t.nodeType === 1 && seen.indexOf(t) < 0 && !t.closest('.hj')) { seen.push(t); } }); seen.forEach(scan); }, 30);
    });
    D.querySelectorAll('.mb-sheet .mb-sh-bd, .mb-sheet .mb-tabs, [data-ko-live]').forEach(function (el) { mo.observe(el, { childList: true, subtree: true }); });
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init();
})(window, document);

/* ════ 공통 ④ 소리 — 축음긔(배경 곡조) · 효과음 ════
   <body data-bgm="곡조.mp3" data-whoosh="…" data-bell="…"> · 처음 누르는 순간 곡조가 흐름 · 위 띠 ♪ 로 끄고 켬 */
(function (W, D) {
  'use strict';
  function init() {
    var B = D.body, src = B.getAttribute('data-bgm'); W.mb = W.mb || {};
    var sfx = {}, BUF = {}, LD = {};
    /* (1019) 효과음은 첫 손길에 미리 풀어 둠 — 폰은 손가락 업시 나중에 play() 하면 막으므로, 소리 엔진(AudioContext)에 미리 실어 두엇다가 거기서 울림. 못 실으면 파일로, 그마저 막히면 종은 만들어서라도 울림 */
    function ctx() { try { return W.mb.ctx ? W.mb.ctx() : null; } catch (e) { return null; } }
    function load(k) {
      var s = B.getAttribute('data-' + k); if (!s || BUF[k] || LD[k]) return; var c = ctx(); if (!c || !W.fetch) return; LD[k] = 1;
      W.fetch(s).then(function (r) { return r.arrayBuffer(); }).then(function (ab) { return new Promise(function (ok, no) { c.decodeAudioData(ab, ok, no); }); }).then(function (b) { BUF[k] = b; }).catch(function () { LD[k] = 0; });
    }
    W.mb.sfx = function (k, v) {
      var s = B.getAttribute('data-' + k); if (!s) { if (k === 'bell' && W.mb.tone) W.mb.tone('bell'); return; }
      var c = ctx();
      if (c && BUF[k] && c.state === 'running') { try { var src = c.createBufferSource(), g = c.createGain(); src.buffer = BUF[k]; g.gain.value = v || .5; src.connect(g); g.connect(c.destination); src.start(); return; } catch (e) {} }
      try { var a = sfx[k] || (sfx[k] = new Audio(s)); a.volume = v || .5; a.currentTime = 0; var p = a.play(); if (p && p.catch) p.catch(function () { if (k === 'bell' && W.mb.tone) W.mb.tone('bell'); }); } catch (e) { if (k === 'bell' && W.mb.tone) W.mb.tone('bell'); }
    };
    W.mb.prime = function () { ['bell', 'whoosh'].forEach(load); };
    var EVP = ['touchend', 'pointerup', 'click', 'keydown'];
    function primeOnce() { EVP.forEach(function (t) { D.removeEventListener(t, primeOnce, true); }); W.mb.prime(); }
    EVP.forEach(function (t) { D.addEventListener(t, primeOnce, true); });
    W.addEventListener('mb:open', function (e) { if (e.detail !== 'mbToc') W.mb.sfx('whoosh', .35); });
    /* 파일 업는 소리 — 똑딱(tick) · 도장(stamp) · 망치(gavel) · 글자(type) */
    var AC = null;
    W.mb.muted = function () { return !!W.__mbOff; };
    W.mb.tone = function (k) {
      if (W.__mbOff) return;
      try {
        AC = (W.mb.ctx && W.mb.ctx()) || AC || new (W.AudioContext || W.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume();
        var t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain(), f = AC.createBiquadFilter();
        if (k === 'bell') { /* 호외 종 — 손종 두 번 (파일이 업거나 막혓을 때) */
          [0, .42].forEach(function (d) { [[1046, .5, 1.6], [2093, .18, .9], [3136, .07, .5]].forEach(function (q) { var o2 = AC.createOscillator(), g2 = AC.createGain(); o2.type = 'sine'; o2.frequency.value = q[0]; g2.gain.setValueAtTime(.0001, t + d); g2.gain.exponentialRampToValueAtTime(q[1] * .5, t + d + .012); g2.gain.exponentialRampToValueAtTime(.0001, t + d + q[2]); o2.connect(g2); g2.connect(AC.destination); o2.start(t + d); o2.stop(t + d + q[2] + .05); }); });
          return;
        }
        var P = { tick: [1800, .05, .04, 'square'], stamp: [90, .5, .22, 'sine'], gavel: [140, .7, .3, 'triangle'], type: [2400, .02, .015, 'square'] }[k] || [440, .2, .1, 'sine'];
        o.type = P[3]; o.frequency.setValueAtTime(P[0], t); if (k === 'stamp' || k === 'gavel') o.frequency.exponentialRampToValueAtTime(P[0] * .5, t + P[2]);
        f.type = 'lowpass'; f.frequency.value = k === 'tick' || k === 'type' ? 3000 : 600;
        g.gain.setValueAtTime(P[1] * (k === 'type' ? .25 : .6), t); g.gain.exponentialRampToValueAtTime(.0001, t + P[2]);
        o.connect(f); f.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + P[2] + .02);
      } catch (e) {}
    };
    if (!src) return;
    var bgm = new Audio(src); bgm.loop = true; bgm.volume = .3; bgm.preload = 'none'; /* (1019) 미리 받지 안음 — 첫 손길에 받기 시작 */
    var off = false;
    var bar = D.querySelector('.mb-bar'), b = D.createElement('button'); b.type = 'button'; b.className = 'mb-snd'; b.setAttribute('aria-label', '배경 곡조 켜고 끄기'); b.innerHTML = '♪';
    if (bar) bar.insertBefore(b, bar.querySelector('.mb-now').nextSibling);
    function sync() { b.classList.toggle('on', !bgm.paused); }
    bgm.addEventListener('play', sync); bgm.addEventListener('pause', sync);
    b.addEventListener('click', function (e) { e.stopPropagation(); if (bgm.paused) { off = false; W.__mbOff = false; bgm.play().catch(function () {}); } else { off = true; W.__mbOff = true; bgm.pause(); } });
    /* 들어오자마자 곡조 — 폰이 막으면, 처음 「누르는」 순간 (밀어 내리기만으로는 폰이 소리를 허락하지 안음 · 될 때까지 다시 해 봄) */
    var EV = ['pointerdown', 'pointerup', 'touchend', 'click', 'keydown'];
    function stopTry() { EV.forEach(function (t) { D.removeEventListener(t, first, true); }); }
    function first(e) { if (e && e.target && e.target.closest && e.target.closest('.mb-snd')) return; if (off) { stopTry(); return; } if (!bgm.paused) { stopTry(); return; } var p = bgm.play(); if (p && p.then) p.then(stopTry, function () {}); }
    EV.forEach(function (t) { D.addEventListener(t, first, true); });
    bgm.addEventListener('playing', stopTry);
    setTimeout(function () { if (!off && bgm.paused) { var p = bgm.play(); if (p && p.catch) p.catch(function () { b.classList.add('ask'); }); } }, 300);
    W.addEventListener('mb:audio', function () { if (!bgm.paused) { bgm.pause(); W.__mbResume = !off; } });
    W.addEventListener('mb:close', function (e) { if (e.detail === 'shRadio' && W.__mbResume && !off) { W.__mbResume = false; bgm.play().catch(function () {}); } });
    W.mb.bgm = bgm;
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init();
})(window, document);

/* ════ 공통 ⑤ 소리 엔진 — 파일 업시 만드는 잡음(라듸오) · 빗소리 · 똑딱 고리 · 심장 · 낮은 울림 ════ */
(function (W, D) {
  'use strict';
  var AC = null, nz = null, nzG = null, rain = null, rainG = null, drone = null, tickT = 0, heartT = 0;
  function ac() { if (!AC) { var C = W.AudioContext || W.webkitAudioContext; if (!C) return null; AC = new C(); } if (AC.state === 'suspended') AC.resume(); return AC; }
  function noiseBuf(c, pink) {
    var len = c.sampleRate * 3, b = c.createBuffer(1, len, c.sampleRate), d = b.getChannelData(0), b0 = 0, b1 = 0, b2 = 0;
    for (var i = 0; i < len; i++) { var w = Math.random() * 2 - 1; if (pink) { b0 = .99765 * b0 + w * .099; b1 = .963 * b1 + w * .2965; b2 = .57 * b2 + w * 1.0527; d[i] = (b0 + b1 + b2 + w * .1848) * .11; } else d[i] = w * .5; }
    return b;
  }
  function chain(c, buf, f1, f2) { var s = c.createBufferSource(); s.buffer = buf; s.loop = true; var hp = c.createBiquadFilter(); hp.type = 'highpass'; hp.frequency.value = f1; var lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = f2; var g = c.createGain(); g.gain.value = 0; s.connect(hp); hp.connect(lp); lp.connect(g); g.connect(c.destination); s.start(); return g; }
  var off = function () { return !!W.__mbOff; };
  ['touchend', 'pointerup', 'click', 'keydown'].forEach(function (t) { D.addEventListener(t, function () { if (AC && AC.state === 'suspended') AC.resume(); }, true); });
  W.mb = W.mb || {};
  W.mb.ctx = ac;
  W.mb.audio = {
    noiseOn: function () { var c = ac(); if (!c) return; if (!nzG) nzG = chain(c, noiseBuf(c, false), 700, 4200); },
    noiseLevel: function (v) { if (!nzG || !AC) return; nzG.gain.setTargetAtTime(off() ? 0 : v * .5, AC.currentTime, .08); },
    noiseOff: function () { if (nzG && AC) nzG.gain.setTargetAtTime(0, AC.currentTime, .15); },
    rain: function (on) {
      var c = ac(); if (!c) return; if (!rainG) rainG = chain(c, noiseBuf(c, true), 380, 5200);
      rainG.gain.setTargetAtTime(on && !off() ? .5 : 0, c.currentTime, on ? .8 : .4);
    },
    drone: function (on) {
      var c = ac(); if (!c) return;
      if (on && !drone && !off()) {
        var g = c.createGain(); g.gain.value = 0; g.connect(c.destination);
        var o1 = c.createOscillator(), o2 = c.createOscillator(), lp = c.createBiquadFilter(); lp.type = 'lowpass'; lp.frequency.value = 220;
        o1.type = 'sawtooth'; o1.frequency.value = 55; o2.type = 'sine'; o2.frequency.value = 55.6; o1.connect(lp); o2.connect(lp); lp.connect(g); o1.start(); o2.start();
        g.gain.setTargetAtTime(.07, c.currentTime, 1.5); drone = { g: g, o: [o1, o2] };
      } else if (!on && drone) { var d = drone; drone = null; d.g.gain.setTargetAtTime(0, c.currentTime, .6); setTimeout(function () { d.o.forEach(function (o) { try { o.stop(); } catch (e) {} }); }, 2500); }
    },
    tick: function (on, ms) { clearInterval(tickT); tickT = 0; if (on) tickT = setInterval(function () { if (!off() && W.mb.tone) W.mb.tone('tick'); }, ms || 1000); },
    heart: function (on) {
      clearInterval(heartT); heartT = 0; if (!on) return;
      var beat = function () { if (off()) return; var c = ac(); if (!c) return; [0, .28].forEach(function (dt, k) { var t = c.currentTime + dt, o = c.createOscillator(), g = c.createGain(); o.type = 'sine'; o.frequency.setValueAtTime(k ? 52 : 60, t); o.frequency.exponentialRampToValueAtTime(34, t + .18); g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(k ? .35 : .5, t + .02); g.gain.exponentialRampToValueAtTime(.0001, t + .26); o.connect(g); g.connect(c.destination); o.start(t); o.stop(t + .3); }); };
      beat(); heartT = setInterval(beat, 1150);
    }
  };
})(window, document);

/* ════ 공통 ⑥ 비 — 화면 우에 빗줄기 (깜빡임 업시) ════ */
(function (W, D) {
  'use strict';
  var cv = null, x = null, drops = [], on = false, lvl = 0, raf = 0, last = 0, w = 0, h = 0;
  function size() { var r = 1; w = W.innerWidth; h = W.innerHeight; cv.width = w * r; cv.height = h * r; x.setTransform(r, 0, 0, r, 0, 0); drops = []; for (var i = 0; i < Math.round(w * h / 4200); i++) drops.push(mk(true)); }
  function mk(f) { var z = Math.random(); return { x: Math.random() * (w + 200) - 100, y: f ? Math.random() * h : -Math.random() * 200, z: z, v: 900 + z * 1500, l: 14 + z * 46, a: .1 + z * .32, lw: .6 + z * 1.1 }; }
  function frame(t) {
    var dt = Math.min(.05, (t - (last || t)) / 1000); last = t; lvl += ((on ? 1 : 0) - lvl) * Math.min(1, dt * 1.4); x.clearRect(0, 0, w, h);
    if (lvl > .01) { x.lineCap = 'round'; for (var i = 0; i < drops.length; i++) { var d = drops[i]; d.y += d.v * dt; d.x += d.v * .16 * dt; if (d.y > h) { drops[i] = mk(false); continue; } x.strokeStyle = 'rgba(226,226,220,' + (d.a * lvl).toFixed(3) + ')'; x.lineWidth = d.lw; x.beginPath(); x.moveTo(d.x, d.y); x.lineTo(d.x - d.l * .16, d.y - d.l); x.stroke(); } }
    if (on || lvl > .01) raf = requestAnimationFrame(frame); else { raf = 0; last = 0; x.clearRect(0, 0, w, h); }
  }
  W.mb = W.mb || {};
  W.mb.rain = function (v) {
    if (v === on) return; on = v;
    if (!cv) { cv = D.createElement('canvas'); cv.className = 'mb-rain'; D.body.appendChild(cv); x = cv.getContext('2d'); size(); W.addEventListener('resize', size); }
    if (W.mb.audio) W.mb.audio.rain(v);
    if (v && !raf) raf = requestAnimationFrame(frame);
  };
})(window, document);

/* ════ 공통 ④ 폰판 — 한자는 모다 한글로 · 손가락을 대면 그 단락이 통째로 오늘 말로 (컴퓨터판의 「마우스를 대면 현대어」와 같은 감각) ════ */
(function (W, D) {
  'use strict';
  var H = {"c":"一丁七三上下不世丙中丸丹主久之乙九也乳了事二五井亞京人介代以件任伏会似佐何作佳併供便係保信修個倒偏停健備催傳債僞價優儲元充兇光免兒入內全八公六其冊再冥凱出刊刑列判別利券則削前割創劇劑力加効動勝募勢勳勸化十卅半卒協南博印原參及取受口古史各合吉名君呈告周呪味命和品員哭唱商問啞喘器四回國園圓圖團土在地埋城基堂報場塡塵墓墨壤士壯壹夕外夜大天夫央奇奮女妖姿婦嫌嬰子字孫學完宗官定宜室宮害家容寂察實審寫寬寶封專尋小少就尹局屋屍展屠層山峰工差己巷市帖師幕平年幻幽序店庚府度座廉廊廢廣廷廿式引弘張強强弼彈彬影往待後徒復心快急性怨怪息患悳情惡意愚慘慶慾憑應戊成戾房所手才技投抹拘拾挾授掘採接控提揭搜擧擴支改放政故效敎數文料斬新斷於旋族旗日昌明映春昭時景暴曜書會月服朝期木未末本札李材束東某柱査校核格桂案梁森棺楊業極榮構槪樂樓標樹橋機橫檢欺歌止正死殖段殺殿毒氏氓水永求池決沈沒油治泉法波泣注洋洞活派流浪海消涼淋淸添湖源準演漢潘激濟灘火災炫無燈燐燒營爆版物特犯狀猫獄獨獻玄率玉王現理甑生産用由甲男町畜畫異當疊疑疾病症痛療發白百盜盡盤目直相盾眞眼着瞞瞰矛短硅確示社祐祝神票祭禁禎福禮私科秒秘稿突窓立章童競竹第筆等管範篇簿米粉精約紅納紙級索紹終組結絶經網緘線編縛總續罪置署美義羽習翼者聖聞聯聲職育肺脈脹腐膨臨自至致臺興舊舍舞般良芥花苑茸草菜萬落葉著葬蓮蔘藏藝藥虐處虛號血衆行術街表被裁補裝製西要見覧覺覽觀解言訃計記訣訪設訴詐詩話詳誇誌認誘語誤說調談論謝證識譜警議譽讀變讚谷豆豫貞貨販貫貳貴買賀資賣購贊跡路身車軍載輩輯轉辭返述迷追送通速進逸遂運過道遠選邪邱邸郞部郵都配酒醫里重野金釜鉛銀錄錢鎭鏡鐵鑑鑛長門閉開閱闇關闢防附限院除陰陳陸陽隆際雄集雜難雨雲零電霧靈靑面頃頭題顔顚類風食餘館首馬騷骨體高鬼魂魔鮮鳥鳳鳴鷄黃黑齋龍","r":["일","정","칠","삼","상","하","불","세","병","중","환","단","주","구","지","을","구","야","유","요","사","이","오","정","아","경","인","개","대","이","건","임","복","회","사","좌","하","작","가","병","공","편","계","보","신","수","개","도","편","정","건","비","최","전","채","위","가","우","저","원","충","흉","광","면","아","입","내","전","팔","공","육","기","책","재","명","개","출","간","형","열","판","별","이","권","칙","삭","전","할","창","극","제","역","가","효","동","승","모","세","훈","권","화","십","삽","반","졸","협","남","박","인","원","참","급","취","수","구","고","사","각","합","길","명","군","정","고","주","주","미","명","화","품","원","곡","창","상","문","아","천","기","사","회","국","원","원","도","단","토","재","지","매","성","기","당","보","장","전","진","묘","묵","양","사","장","일","석","외","야","대","천","부","앙","기","분","여","요","자","부","혐","영","자","자","손","학","완","종","관","정","의","실","궁","해","가","용","적","찰","실","심","사","관","보","봉","전","심","소","소","취","윤","국","옥","시","전","도","층","산","봉","공","차","기","항","시","첩","사","막","평","연","환","유","서","점","경","부","도","좌","염","낭","폐","광","정","입","식","인","홍","장","강","강","필","탄","빈","영","왕","대","후","도","복","심","쾌","급","성","원","괴","식","환","덕","정","악","의","우","참","경","욕","빙","응","무","성","여","방","소","수","재","기","투","말","구","습","협","수","굴","채","접","공","제","게","수","거","확","지","개","방","정","고","효","교","수","문","요","참","신","단","어","선","족","기","일","창","명","영","춘","소","시","경","폭","요","서","회","월","복","조","기","목","미","말","본","찰","이","재","속","동","모","주","사","교","핵","격","계","안","양","삼","관","양","업","극","영","구","개","낙","누","표","수","교","기","횡","검","기","가","지","정","사","식","단","살","전","독","씨","맹","수","영","구","지","결","침","몰","유","치","천","법","파","읍","주","양","동","활","파","유","낭","해","소","양","임","청","첨","호","원","준","연","한","반","격","제","탄","화","재","현","무","등","인","소","영","폭","판","물","특","범","상","묘","옥","독","헌","현","솔","옥","왕","현","이","증","생","산","용","유","갑","남","정","축","화","이","당","첩","의","질","병","증","통","요","발","백","백","도","진","반","목","직","상","순","진","안","착","만","감","모","단","규","확","시","사","우","축","신","표","제","금","정","복","예","사","과","초","비","고","돌","창","입","장","동","경","죽","제","필","등","관","범","편","부","미","분","정","약","홍","납","지","급","색","소","종","조","결","절","경","망","함","선","편","박","총","속","죄","치","서","미","의","우","습","익","자","성","문","연","성","직","육","폐","맥","창","부","팽","임","자","지","치","대","흥","구","사","무","반","양","개","화","원","용","초","채","만","낙","엽","저","장","연","삼","장","예","약","학","처","허","호","혈","중","행","술","가","표","피","재","보","장","제","서","요","견","남","각","남","관","해","언","부","계","기","결","방","설","소","사","시","화","상","과","지","인","유","어","오","설","조","담","논","사","증","식","보","경","의","예","독","변","찬","곡","두","예","정","화","판","관","이","귀","매","하","자","매","구","찬","적","노","신","차","군","재","배","집","전","사","반","술","미","추","송","통","속","진","일","수","운","과","도","원","선","사","구","저","낭","부","우","도","배","주","의","이","중","야","금","부","연","은","녹","전","진","경","철","감","광","장","문","폐","개","열","암","관","벽","방","부","한","원","제","음","진","육","양","융","제","웅","집","잡","난","우","운","영","전","무","영","청","면","경","두","제","안","전","유","풍","식","여","관","수","마","소","골","체","고","귀","혼","마","선","조","봉","명","계","황","흑","재","용"],"w":{"三年未解決":"삼년미해결","京城野錄":"경성야록","京城事件博覽會":"경성사건박람회","附錄":"부록","博覽會":"박람회","資料室":"자료실","陳列":"진렬","一九二九年":"일구이구년","資料":"자료","朝鮮博覽會":"조선박람회","觀覽案內":"관람안내","入場料":"입장료","觀覽法":"관람법","觀覽":"관람","當選謝禮":"당선사례","効力一等":"효력일등","當選淋藥":"당선림약","無料進呈":"무료진정","萬年筆":"만년필","合併症新療法":"합병증신료법","萬年號":"만년호","大陸":"대륙","何理由":"하리유","特別廉價提供":"특별렴가제공","昭和十一年":"소화십일년","大正十三年":"대정십삼년","一二三四五六七八九":"일이삼사오륙칠팔구","京城夜錄":"경성야록","納涼":"납량","殺人屠場埋屍敎徒詐欺白鑛山天苑罪惡鬼畜怪事件社會文化藝術人物記錄":"살인도장매시교도사기백광산천원죄악귀축괴사건사회문화예술인물기록","博覽會之章":"박람회지장","朝鮮博覽會之章":"조선박람회지장","第六章":"제륙장","草梁":"초량","下女":"하녀","六年":"육년","第六話":"제륙화","三年霧中":"삼년무중","井上修一郞":"정상수일랑","修一郞":"수일랑","採錄":"채록","八年":"팔년","其六":"기륙","一二三四五六七八九十":"일이삼사오륙칠팔구십","第六面":"제륙면","校了":"교료","返戾":"반려","六六":"육륙","道立師範校長":"도립사범교장","平原線鐵路":"평원선철로","死鬼血夜哭墓骨影怨魂闇獄呪殺刑屍冥幽靈陰燐棺葬泣慘斷首妖怪腐":"사귀혈야곡묘골영원혼암옥주살형시명유령음린관장읍참단수요괴부","一九三三年":"일구삼삼년","夜影燈紙墨舊巷雨月霧街門窓樓寂雲沈古":"야영등지묵구항우월무가문창루적운침고","納涼特輯":"납량특집","三百四十六":"삼백사십륙","二六":"이륙","二六年":"이륙년","野錄":"야록","完了":"완료","朝鮮博覽會案內":"조선박람회안내","昭和四年":"소화사년","鷄龍山":"계룡산","玄海灘激浪中":"현해탄격랑중","靑年男女":"청년남녀","無料":"무료","朝鮮博覽會鳥瞰圖":"조선박람회조감도","朝鮮博覽會場配置圖":"조선박람회장배치도","朝鮮博覽會會場案內圖":"조선박람회회장안내도","博覽會場":"박람회장","朝鮮博覧会":"조선박람회","慶會樓":"경회루","記錄":"기록","聲樂家":"성락가","目錄":"목록","關聯":"관련","言論":"언론","獨立運動家":"독립운동가","一九三六":"일구삼륙","草梁町":"초량정","少年":"소년","取調段落":"취조단락","往十里":"왕십리","事件記錄":"사건기록","下女房":"하녀방"}}, CM = {}, i;
  for (i = 0; i < H.c.length; i++) CM[H.c[i]] = H.r[i];
  var WK = Object.keys(H.w).sort(function (a, b) { return b.length - a.length; });
  var RX = /[㐀-䶿一-鿿豈-﫿]+/g;
  var NUM = { '一': 1, '二': 2, '三': 3, '四': 4, '五': 5, '六': 6, '七': 7, '八': 8, '九': 9 }, UNIT = { '章': '장', '話': '화', '號': '호', '回': '회', '面': '면', '日': '일', '年': '년', '月': '월' };
  function hn(x) { var n = 0, cur = 0; for (var q = 0; q < x.length; q++) { var ch = x[q]; if (ch === '十') { n += (cur || 1) * 10; cur = 0; } else if (ch === '百') { n += (cur || 1) * 100; cur = 0; } else if (NUM[ch]) cur = NUM[ch]; else if (ch === '〇' || ch === '零') cur = cur * 10; } return n + cur; }
  var RN = /第?([一二三四五六七八九十百〇]+)([章話號回])/g;
  function de(t) { RX.lastIndex = 0; if (!t || !RX.test(t)) { RX.lastIndex = 0; return t; } RX.lastIndex = 0; t = t.replace(RN, function (m, a, u) { return hn(a) + UNIT[u]; }).replace(/序章/g, '서장'); if (!RX.test(t)) { RX.lastIndex = 0; return t; } RX.lastIndex = 0; return t.replace(RX, function (m) { if (H.w[m]) return H.w[m]; var o = '', k = 0; while (k < m.length) { var hit = null; for (var j = 0; j < WK.length; j++) { var w = WK[j]; if (w.length > 1 && m.substr(k, w.length) === w) { hit = w; break; } } if (hit) { o += H.w[hit]; k += hit.length; } else { o += CM[m[k]] || m[k]; k++; } } return o; }); }
  W.mbDeHan = de;
  var SKIP = /^(SCRIPT|STYLE|TEXTAREA|NOSCRIPT|CANVAS|svg|SVG)$/, ATTR = ['alt', 'title', 'aria-label', 'data-ko', 'data-old', 'placeholder', 'data-cap'];
  function walk(root) {
    if (!root) return;
    if (root.nodeType === 3) { var v = de(root.nodeValue); if (v !== root.nodeValue) root.nodeValue = v; return; }
    if (root.nodeType !== 1 || SKIP.test(root.nodeName)) return;
    ATTR.forEach(function (a) { var x = root.getAttribute && root.getAttribute(a); if (x) { var y = de(x); if (y !== x) root.setAttribute(a, y); } });
    var tw = D.createTreeWalker(root, NodeFilter.SHOW_TEXT | NodeFilter.SHOW_ELEMENT, { acceptNode: function (n) { if (n.nodeType === 1) return SKIP.test(n.nodeName) ? 2 : 1; RX.lastIndex = 0; return RX.test(n.nodeValue) ? 1 : 3; } });
    var n, list = [];
    while ((n = tw.nextNode())) list.push(n);
    list.forEach(function (x) { if (x.nodeType === 3) { var v = de(x.nodeValue); if (v !== x.nodeValue) x.nodeValue = v; } else ATTR.forEach(function (a) { var t = x.getAttribute(a); if (t) { var y = de(t); if (y !== t) x.setAttribute(a, y); } }); });
  }
  function init() {
    walk(D.body); D.title = de(D.title);
    var q = [], tm = 0;
    new MutationObserver(function (ms) {
      ms.forEach(function (m) { if (m.type === 'characterData') q.push(m.target); else if (m.type === 'attributes') q.push(m.target); else m.addedNodes.forEach(function (a) { q.push(a); }); });
      if (!tm) tm = setTimeout(function () { tm = 0; var l = q; q = []; l.forEach(walk); }, 0);
    }).observe(D.body, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ATTR });

    /* (1019) 손가락을 대면 단락이 오늘 말로 바뀌던 것은 뺏소 — 글은 언제나 옛말로 고정, 바꾸는 길은 위 띠의 「가」 단추 하나뿐 */
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init();
})(window, document);

/* ════ (1019) 화면 밖 장은 그리지 안타가(content-visibility) 가까이 오면 그림 — 그때 장치들이 크기를 다시 재게 resize 를 한 번 울림 ════ */
(function (W, D) {
  'use strict';
  var t = 0;
  function ping() { clearTimeout(t); t = setTimeout(function () { try { W.dispatchEvent(new Event('resize')); } catch (e) {} }, 40); }
  function init() { D.querySelectorAll('.mb-sec,.mb-open,.bb-night2,.bb-fin2').forEach(function (s) { s.addEventListener('contentvisibilityautostatechange', function (e) { if (!e.skipped) ping(); }); }); }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', init); else init();
})(window, document);

/* ════ 공통 ⑤ 그림은 화면 가까이 올 때 불러옴 (data-lbg) ════ */
(function (W, D) {
  'use strict';
  function go() {
    var L = [].slice.call(D.querySelectorAll('[data-lbg]'));
    if (!('IntersectionObserver' in W)) { L.forEach(function (e) { e.style.backgroundImage = 'url(' + e.getAttribute('data-lbg') + ')'; }); return; }
    var io = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting) return; var t = e.target; t.style.backgroundImage = 'url(' + t.getAttribute('data-lbg') + ')'; t.removeAttribute('data-lbg'); io.unobserve(t); }); }, { rootMargin: '900px 0px' });
    L.forEach(function (e) { io.observe(e); });
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', go); else go();
})(window, document);

/* ════ (1020) 공통 ⑦ 작은 글씨 대비 — 어두운 바탕의 흐린 회색 · 밝은 바탕의 옅은 회색을, 읽히는 만큼만 끌어올림 ════
   14px 이하 글씨만 (큰 장식 글씨 · 흐릿하게 둔 연출은 손대지 안음) · 10.5px 보다 작으면 10.5px 로 */
(function (W, D) {
  'use strict';
  if (!/\/case-|\/m-/.test(location.pathname)) return;
  var SKIPC = /(rx2-ghost|bb-chant|ch-echo|dv-rd|rxWm|wm|ghost|wash|echo|blank|fade|dim|mute|ob-l|wp-names|roll|fzIn)/;
  function rgb(s) { var m = s && s.match(/rgba?\(([^)]+)\)/); if (!m) return null; var p = m[1].split(/[,\s/]+/).filter(Boolean).map(parseFloat); return [p[0], p[1], p[2], p.length > 3 ? p[3] : 1]; }
  function lum(c) { var f = function (v) { v /= 255; return v <= .03928 ? v / 12.92 : Math.pow((v + .055) / 1.055, 2.4); }; return .2126 * f(c[0]) + .7152 * f(c[1]) + .0722 * f(c[2]); }
  function cr(a, b) { var x = lum(a), y = lum(b); return (Math.max(x, y) + .05) / (Math.min(x, y) + .05); }
  function bgOf(el) {
    for (var e = el; e && e.nodeType === 1; e = e.parentElement) {
      var cs = getComputedStyle(e), c = rgb(cs.backgroundColor);
      if (c && c[3] > .55) return c;
      if (cs.backgroundImage && cs.backgroundImage !== 'none' && !/gradient/.test(cs.backgroundImage)) return [17, 17, 17, 1];
    }
    var b = rgb(getComputedStyle(D.body).backgroundColor); return b && b[3] > .5 ? b : [11, 11, 11, 1];
  }
  function own(el) { for (var n = el.firstChild; n; n = n.nextSibling) if (n.nodeType === 3 && n.nodeValue.trim().length > 1) return true; return false; }
  function fix(el) {
    if (el.__ykc || !own(el)) return; el.__ykc = 1;
    if (el.closest('svg,[aria-hidden="true"],.mb-bar,.mb-cover .bg,canvas,button,a,.mb-toc,.mce-bk,.mce-tab,.mce-nb,[contenteditable]')) return;
    if (SKIPC.test(el.className && el.className.baseVal === undefined ? el.className : '')) return;
    var cs = getComputedStyle(el), fs = parseFloat(cs.fontSize); if (!(fs <= 14.5)) return;
    if (parseFloat(cs.opacity) < .9) return;
    if (/color|all/.test(cs.transitionProperty) && parseFloat(cs.transitionDuration) > 0) return; /* 상태에 따라 빛이 바뀌는 글씨는 그대로 */
    var c = rgb(cs.color); if (!c || c[3] < .5) return;
    var bg = bgOf(el), need = fs < 12 ? 4.5 : 4, r = cr(c, bg);
    if (fs < 10.5) el.style.fontSize = '10.5px';
    if (r >= need) return;
    var dark = lum(bg) < .3, t = dark ? 255 : 0, k = 0, n = c.slice();
    while (cr(n, bg) < need && k < 20) { k++; n = [c[0] + (t - c[0]) * k / 20, c[1] + (t - c[1]) * k / 20, c[2] + (t - c[2]) * k / 20]; }
    el.style.color = 'rgb(' + n.map(function (v) { return Math.round(v); }).join(',') + ')';
  }
  function run(root) {
    var L = Array.prototype.slice.call((root || D.body).querySelectorAll('p,small,span,em,i,b,li,figcaption,dd,dt,a,label,strong,div,h4,h5,u,time,q,cite')), i = 0;
    (function chunk(dl) { var t = performance.now(); while (i < L.length && performance.now() - t < 8) fix(L[i++]); if (i < L.length) { if (W.requestIdleCallback) W.requestIdleCallback(chunk, { timeout: 400 }); else setTimeout(chunk, 60); } })();
  }
  function go() { setTimeout(function () { run(); }, 1800); }
  if (D.readyState === 'complete') go(); else W.addEventListener('load', go);
  W.addEventListener('mb:open', function (e) { var s = D.getElementById(e.detail); if (s) { setTimeout(function () { run(s); }, 500); setTimeout(function () { run(s); }, 2500); } });
})(window, document);
