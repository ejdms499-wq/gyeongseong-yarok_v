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
    if (!fromPop) { try { if (history.state && history.state.mb === id) history.back(); } catch (e) {} }
  }
  W.addEventListener('popstate', function () {
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
    if (!fromPop) { try { if (history.state && history.state.mbz) history.back(); } catch (e) {} }
  }
  W.mb.zoom = showZoom;

  /* ── 위 띠 · 목차 ── */
  function init() {
    var bar = $('.mb-bar'), prog = $('.mb-prog'), now = $('.mb-now'), cover = $('.mb-cover');
    var chs = $$('[data-ch]');
    var toc = $('#mbToc .mb-toc');
    if (toc) toc.innerHTML = chs.map(function (s, i) {
      return '<a href="#' + s.id + '" data-goto="' + s.id + '" data-i="' + i + '"><b>' + (s.getAttribute('data-no') || '') + '</b><span>' + s.getAttribute('data-ch') + '<small>' + (s.getAttribute('data-sub') || '') + '</small></span></a>';
    }).join('');
    var cur = -1, tick = false;
    function onScroll() {
      tick = false;
      var y = W.scrollY, h = D.documentElement.scrollHeight - W.innerHeight;
      if (bar) bar.classList.toggle('on', !cover || y > cover.offsetHeight - 60);
      if (prog) prog.style.width = (h > 0 ? Math.min(100, y / h * 100) : 0) + '%';
      var k = -1; chs.forEach(function (s, i) { if (s.getBoundingClientRect().top < 120) k = i; });
      if (k !== cur) {
        cur = k;
        if (now) now.innerHTML = k < 0 ? (now.getAttribute('data-def') || '') : '<b>' + (chs[k].getAttribute('data-kj') || '') + '</b>' + chs[k].getAttribute('data-ch');
        if (toc) $$('a', toc).forEach(function (a, i) { a.classList.toggle('on', i === k); });
      }
    }
    W.addEventListener('scroll', function () { if (!tick) { tick = true; requestAnimationFrame(onScroll); } }, { passive: true });
    onScroll();

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
          '<div class="mb-seg pp-seg three"><button data-m="scan" class="' + (mode === 'scan' ? 'on' : '') + '">원문 지면</button><button data-m="now" class="' + (mode === 'now' ? 'on' : '') + '">' + (W.ykNews26 ? '2026년 뉴스' : '오늘 말로 읽기') + '</button><button data-m="sum" class="' + (mode === 'sum' ? 'on' : '') + '">간추려 읽기</button></div>';
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
              (cfg.shop ? '<a class="pp-ad-go" href="' + cfg.shop + (AD.sk || key) + '">그 시절 광고 상뎜으로 →</a>' : '') + '</details>';
          }
        } else if (mode === 'sum') {
          var Q = ['이 보도의 요뎜은 무엇이오?', '그때 형편은 엇더하엿소?', '긔록에서 눈여겨볼 대목은 어대요?'];
          h += '<article class="pp-art pp-short"><p class="pp-sec">간추려 읽기 · ' + t0(a.d) + '</p><h3>' + a.title + '</h3><ol class="pp-sum big">' + a.sum.map(function (x) { return '<li>' + x + '</li>'; }).join('') + '</ol>' +
            '<h4>긔록에게 뭇다</h4><p class="pp-cap" style="margin:0 0 10px">이 긔사에 궁금한 것을 긔록과 함께 풀어 보시압. 물음을 누르면 답이 나오오.</p>' +
            (a.qa ? a.qa.map(function (x) { return '<details class="pp-qa"><summary><b>문</b>' + x[0] + '</summary><p><b>답</b>' + x[2] + '</p></details>'; }).join('') : Q.map(function (q, i) { return a.sum[i] ? '<details class="pp-qa"><summary><b>문</b>' + q + '</summary><p><b>답</b>' + a.sum[i] + '</p></details>' : ''; }).join('')) +
            '<p class="pp-warn">※ ' + yr + '년 ' + (a.paper || '동아일보') + ' 원문을 바탕으로 간추린 것입니다.</p></article>';
        } else if (W.ykNews26) {
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
    var ST = cfg.st, LO = 550, HI = 1500, built = false, ang = 0, lock = -1, card = -1;
    var fq = function (a) { return LO + ((a % 360) + 360) % 360 / 360 * (HI - LO); };
    var A = W.mb.audio, au = null, noise = null, an = null, raf = 0, open = false;
    function build() {
      built = true;
      $('#rdBody').innerHTML =
        '<div class="rx2"><div class="rx2-scr"><canvas id="rxWave"></canvas><div class="rx2-vis" id="rxVis"></div>' +
        '<div class="rx2-top"><span id="rxState">잡음뿐이오</span><span class="rx2-kc"><b id="rxKc">---</b> 키로</span></div></div>' +
        '<div class="rx2-scale"><div class="rd-nums"><span>550</span><span>700</span><span>900</span><span>1100</span><span>1300</span><span>1500</span></div><div class="rd-ticks"></div>' +
        ST.map(function (s) { return '<i class="rx2-st" style="left:' + ((fq(s.ang) - LO) / (HI - LO) * 100) + '%"></i>'; }).join('') + '<i class="rd-needle" id="rxNeedle"></i></div>' +
        '<div class="rx2-knobwrap"><p class="rx2-hint" id="rxHint">손잡이를 손가락으로 천천히 돌리시압</p><div class="rx2-knob" id="rxKnob"><img src="' + (cfg.dial || '') + '" alt="" draggable="false"><i></i></div></div>' +
        '<div class="rx2-jump">' + ST.map(function (s, i) { return '<button data-rj="' + i + '">' + s.y + '</button>'; }).join('') + '</div>' +
        '<div class="rd-card" id="rdCard"><p class="rd-hint">잡음 속 어딘가에, ' + ST.length + ' 개의 목소리가 숨어 잇소.</p></div></div>';
      var kn = $('#rxKnob'), last = null, c0 = null;
      function aAt(t) { var r = kn.getBoundingClientRect(); return Math.atan2(t.clientX - (r.left + r.width / 2), -(t.clientY - (r.top + r.height / 2))) * 180 / Math.PI; }
      function down(e) { var t = e.touches ? e.touches[0] : e; last = aAt(t); kn.classList.add('grab'); start(); }
      function move(e) { if (last === null) return; var t = e.touches ? e.touches[0] : e, a = aAt(t), d = a - last; if (d > 180) d -= 360; if (d < -180) d += 360; last = a; setAng(ang + d); if (e.cancelable) e.preventDefault(); }
      function up() { last = null; kn.classList.remove('grab'); }
      kn.addEventListener('touchstart', down, { passive: true }); kn.addEventListener('touchmove', move, { passive: false }); kn.addEventListener('touchend', up);
      kn.addEventListener('mousedown', down); W.addEventListener('mousemove', move); W.addEventListener('mouseup', up);
      $('#rdBody').addEventListener('click', function (e) { var j = e.target.closest('[data-rj]'); if (!j) return; start(); glide(ST[+j.dataset.rj].ang); });
      setAng(4);
    }
    function glide(to) { var from = ang, t0 = performance.now(); (function f(t) { var k = Math.min(1, (t - t0) / 1400), e = k < .5 ? 2 * k * k : 1 - Math.pow(-2 * k + 2, 2) / 2; setAng(from + (to - from) * e); if (k < 1) requestAnimationFrame(f); })(t0); }
    function setAng(a) {
      ang = Math.max(0, Math.min(359, a));
      $('#rxKnob img').style.transform = 'rotate(' + ang + 'deg)'; var f = fq(ang);
      $('#rxNeedle').style.left = ((f - LO) / (HI - LO) * 100) + '%'; $('#rxKc').textContent = Math.round(f);
      var best = -1, bd = 1e9; ST.forEach(function (s, i) { var d = Math.abs(fq(s.ang) - f); if (d < bd) { bd = d; best = i; } });
      var near = Math.max(0, 1 - bd / 70), on = bd < 14 ? best : -1;
      if (A) A.noiseLevel(.42 * (1 - near * .92));
      $('.rx2').style.setProperty('--near', near.toFixed(2));
      if (on !== lock) tuneTo(on);
      if (on < 0) between();
      if (au) au.volume = Math.min(1, Math.max(0, (near - .4) / .6));
    }
    var gap = -1, HILLS = '<svg class="rx2-hills" viewBox="0 0 300 60" preserveAspectRatio="none" aria-hidden="true"><path d="M0 46 L40 24 L76 40 L118 12 L160 38 L196 22 L236 42 L270 28 L300 38 L300 60 L0 60Z" fill="#1c1c1c"/><path d="M0 54 L60 42 L110 50 L160 40 L214 52 L260 44 L300 50 L300 60 L0 60Z" fill="#111"/></svg>';
    function between() {
      if (!cfg.gaps || !cfg.gaps.length) return;
      var n = ST.length, SP = 360 / n, m = function (a) { return ((a % 360) + 360) % 360; }, g = Math.floor(m(ang - ST[0].ang) / SP) % n; if (g === gap) return; gap = g;
      var G = cfg.gaps[g]; if (!G) return;
      $('#rxVis').innerHTML = '<span class="rx2-moon"></span>' + HILLS + '<p class="rx2-btw"><small>' + G[0] + ' ─── ' + G[1] + '</small>' + t0(G.slice ? (G.length > 2 ? G[2] : G) : G) + '</p>';
      $('#rxState').textContent = '주파수 사이 · ' + G[0] + ' → ' + G[1];
      if (card < 0) $('#rdCard').innerHTML = '<p class="rd-hint">두 칸 사이에서 이어지는 것을 드르시오. 바늘을 조금 더 돌리면 다음 이약이가 잡히오.</p>';
    }
    function tuneTo(i) {
      lock = i; var st = $('#rxState'), s = ST[i];
      if (i < 0) { st.textContent = '잡음뿐이오'; $('.rx2').classList.remove('lock'); if (au) { au.pause(); } gap = -1; return; }
      gap = -1;
      $('#rxVis').innerHTML = '<span class="rx2-moon" style="left:' + (s.moon || 60) + '%"></span>' + HILLS + (s.au ? '' : '<p class="rx2-nos">이 칸은 소리가 업소 — 지면만 남앗소</p>') + '<h4>' + (s.h || t0(s.t)) + '</h4>' +
        (s.card && cfg.cardBase ? '<button type="button" class="rx2-card" data-zoom="' + cfg.cardBase + s.card + '" data-cap="' + s.y + ' 카드뉴스"><img src="' + cfg.cardBase + s.card + '" alt="' + s.y + ' 카드뉴스"><span>크게</span></button>' : '');
      $('.rx2').classList.add('lock'); st.textContent = s.no + ' · 잡혓소';
      if (W.mb.tone) W.mb.tone('tick');
      if (card !== i) { card = i; showCard(i); }
      if (!W.__mbRd) { W.__mbRd = D.createElement('audio'); W.__mbRd.preload = 'auto'; W.__mbRd.setAttribute('playsinline', ''); D.body.appendChild(W.__mbRd); }
      au = W.__mbRd;
      if (s.au) { if (au.getAttribute('data-k') !== s.au) { au.src = cfg.audioBase + s.au; au.setAttribute('data-k', s.au); } try { W.dispatchEvent(new CustomEvent('mb:audio')); } catch (e) {} var p = au.play(); if (p && p.catch) p.catch(function () {}); }
      else { au.pause(); }
    }
    function showCard(i) {
      var s = ST[i];
      $('#rdCard').innerHTML = '<p class="rd-k">' + s.no + ' · ' + s.when + (s.au ? '' : ' · 녹음 업슴') + '</p><h3>' + t0(s.t) + '</h3><ul>' + s.b.map(function (x) { return '<li>' + t0(x) + '</li>'; }).join('') + '</ul>' +
        '<p class="rd-d">' + t0(s.d) + '</p>' + (s.link ? '<p class="rd-link"><b>' + (cfg.linkLabel || '겹치는 자리') + '</b>' + t0(s.link) + '</p>' : '') +
        (s.card && cfg.cardBase ? '<button type="button" class="rd-cardimg" data-zoom="' + cfg.cardBase + s.card + '" data-cap="' + s.y + ' 카드뉴스"><img src="' + cfg.cardBase + s.card + '" alt="' + s.y + ' 카드뉴스" loading="lazy"><span>카드뉴스 · 눌러 크게 보기</span></button>' : '') +
        (i === ST.length - 1 ? '<p class="mb-p" style="margin-top:18px;color:#d9d8d3">' + (cfg.endLine || '') + '</p>' : '<p class="rd-next">다이얼을 더 돌리면 — 주파수 사이에서, 이어지는 말이 들리오.</p>');
      $('#rdCard').classList.remove('in'); void $('#rdCard').offsetWidth; $('#rdCard').classList.add('in');
    }
    /* 화면의 물결 — 잡음이면 들쑥날쑥, 잡히면 느린 물결 */
    function draw() {
      var cv = $('#rxWave'); if (!cv || !open) { raf = 0; return; }
      var w = cv.clientWidth, h = cv.clientHeight; if (cv.width !== w) { cv.width = w; cv.height = h; }
      var x = cv.getContext('2d'); x.clearRect(0, 0, w, h); x.strokeStyle = lock >= 0 ? 'rgba(255,120,110,.85)' : 'rgba(220,220,215,.55)'; x.lineWidth = 1.4; x.beginPath();
      var t = performance.now() / 1000, nz = lock >= 0 ? .12 : .9;
      for (var i = 0; i <= w; i += 3) { var y = h / 2 + Math.sin(i / 22 + t * 3) * h * (lock >= 0 ? .22 : .06) + (Math.random() - .5) * h * .7 * nz; i ? x.lineTo(i, y) : x.moveTo(i, y); }
      x.stroke(); raf = requestAnimationFrame(draw);
    }
    function start() { if (A) A.noiseOn(); }
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
      for (var e = p; e && e !== root.parentNode; e = e.parentNode) { if (e.nodeType === 1 && (SKIP.test(e.nodeName) || (e.classList && (e.classList.contains('hj') || e.classList.contains('mb-bar') || e.classList.contains('mb-cover'))))) return 2; }
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
  D.addEventListener('click', function (e) {
    var sp = e.target.closest('.hj[data-ko]'); if (!sp || e.target.closest('button, a, [role="button"]')) return;
    flip(sp, !sp.classList.contains('ko'));
  });
  function init() {
    scan(D.body);
    var bar = D.querySelector('.mb-bar'), toc = bar && bar.querySelector('[data-open="mbToc"]');
    if (bar && toc) {
      var b = D.createElement('button'); b.type = 'button'; b.className = 'mb-ko'; b.innerHTML = '<b>가</b>오늘말'; b.setAttribute('aria-label', '오늘 말로 바꾸기');
      bar.insertBefore(b, toc);
      b.addEventListener('click', function () { all = !all; b.classList.toggle('on', all); b.innerHTML = all ? '<b>가</b>옛말' : '<b>가</b>오늘말'; D.querySelectorAll('.hj[data-ko]').forEach(function (sp) { flip(sp, all); }); });
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
    var sfx = {};
    W.mb.sfx = function (k, v) { var s = B.getAttribute('data-' + k); if (!s) return; try { var a = sfx[k] || (sfx[k] = new Audio(s)); a.volume = v || .5; a.currentTime = 0; var p = a.play(); if (p && p.catch) p.catch(function () {}); } catch (e) {} };
    W.addEventListener('mb:open', function (e) { if (e.detail !== 'mbToc') W.mb.sfx('whoosh', .35); });
    /* 파일 업는 소리 — 똑딱(tick) · 도장(stamp) · 망치(gavel) · 글자(type) */
    var AC = null;
    W.mb.muted = function () { return !!W.__mbOff; };
    W.mb.tone = function (k) {
      if (W.__mbOff) return;
      try {
        AC = (W.mb.ctx && W.mb.ctx()) || AC || new (W.AudioContext || W.webkitAudioContext)(); if (AC.state === 'suspended') AC.resume();
        var t = AC.currentTime, o = AC.createOscillator(), g = AC.createGain(), f = AC.createBiquadFilter();
        var P = { tick: [1800, .05, .04, 'square'], stamp: [90, .5, .22, 'sine'], gavel: [140, .7, .3, 'triangle'], type: [2400, .02, .015, 'square'] }[k] || [440, .2, .1, 'sine'];
        o.type = P[3]; o.frequency.setValueAtTime(P[0], t); if (k === 'stamp' || k === 'gavel') o.frequency.exponentialRampToValueAtTime(P[0] * .5, t + P[2]);
        f.type = 'lowpass'; f.frequency.value = k === 'tick' || k === 'type' ? 3000 : 600;
        g.gain.setValueAtTime(P[1] * (k === 'type' ? .25 : .6), t); g.gain.exponentialRampToValueAtTime(.0001, t + P[2]);
        o.connect(f); f.connect(g); g.connect(AC.destination); o.start(t); o.stop(t + P[2] + .02);
      } catch (e) {}
    };
    if (!src) return;
    var bgm = new Audio(src); bgm.loop = true; bgm.volume = .3; bgm.preload = 'auto';
    var off = false;
    var bar = D.querySelector('.mb-bar'), b = D.createElement('button'); b.type = 'button'; b.className = 'mb-snd'; b.setAttribute('aria-label', '배경 곡조 켜고 끄기'); b.innerHTML = '♪';
    if (bar) bar.insertBefore(b, bar.querySelector('.mb-now').nextSibling);
    function sync() { b.classList.toggle('on', !bgm.paused); }
    bgm.addEventListener('play', sync); bgm.addEventListener('pause', sync);
    b.addEventListener('click', function (e) { e.stopPropagation(); if (bgm.paused) { off = false; W.__mbOff = false; bgm.play().catch(function () {}); } else { off = true; W.__mbOff = true; bgm.pause(); } });
    function first(e) { if (e.target.closest && e.target.closest('.mb-snd')) return; ['pointerdown', 'touchstart', 'keydown'].forEach(function (t) { D.removeEventListener(t, first, true); }); if (!off) bgm.play().catch(function () {}); }
    ['pointerdown', 'touchstart', 'keydown'].forEach(function (t) { D.addEventListener(t, first, true); });
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
  function size() { var r = Math.min(2, W.devicePixelRatio || 1); w = W.innerWidth; h = W.innerHeight; cv.width = w * r; cv.height = h * r; x.setTransform(r, 0, 0, r, 0, 0); drops = []; for (var i = 0; i < Math.round(w * h / 2400); i++) drops.push(mk(true)); }
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
