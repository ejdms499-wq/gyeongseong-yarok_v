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
        h = '<div class="pp-hd"><small>' + (cfg.sec || '사회면') + ' | ' + t0(a.d) + ' | ' + t0(a.day) + '</small>' + (a.mark ? '<i class="stamp">' + a.mark + '</i>' : '') + '</div>' +
          '<div class="mb-seg pp-seg"><button data-m="scan" class="' + (mode === 'scan' ? 'on' : '') + '">원문 지면</button><button data-m="now" class="' + (mode === 'now' ? 'on' : '') + '">오늘 말로 읽기</button></div>';
        if (mode === 'scan') {
          h += '<button class="pp-scan" type="button" data-zoom="' + src + '" data-cap="동아일보 ' + a.date + ' 원문 지면"><img src="' + src + '" alt="동아일보 ' + a.date + ' 원문 지면"><span>눌러 크게 보기</span></button>' +
            '<p class="pp-cap">원 긔사 · 동아일보 · ' + cfg.era + ' ' + t0(a.d) + ' — 테두리 친 곳이 그날 실린 긔사이오.</p>';
        } else {
          h += '<article class="pp-art"><p class="pp-sec">경성야록뉴스 · 사회 › 사건·사고 › 아카이브</p><h3>' + a.title + '</h3>' +
            '<p class="pp-by">경성야록 아카이브팀 기자 · 입력 2026.' + a.date.slice(5) + ' 06:00 · 원 보도 동아일보 ' + a.date + '</p>' +
            '<p class="pp-lead">' + a.lead + '</p>' + a.body.map(function (p) { return '<p>' + p + '</p>'; }).join('') +
            '<p class="pp-tags">' + a.keys.map(function (k) { return '#' + k; }).join(' ') + '</p>' +
            '<h4>간추려 읽기</h4><ul class="pp-sum">' + a.sum.map(function (s) { return '<li>' + s + '</li>'; }).join('') + '</ul>' +
            '<p class="pp-warn">※ ' + yr + '년 동아일보 원문을 바탕으로, 오늘의 기사 형식으로 다시 쓴 것입니다. 실제 2026년 보도가 아닙니다.</p></article>';
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
      tabs();
      var on = $('#ppTabs .on'); if (on && on.scrollIntoView) on.scrollIntoView({ inline: 'center', block: 'nearest' });
    }
    D.addEventListener('click', function (e) {
      var t = e.target.closest('#ppTabs button'); if (t) { I = +t.dataset.i; render(); return; }
      var m = e.target.closest('.pp-seg button'); if (m) { mode = m.dataset.m; render(); return; }
      if (e.target.closest('#ppBody [data-next]')) { I = Math.min(A.length - 1, I + 1); render(); }
    });
    W.addEventListener('mb:open', function (e) { if (e.detail === 'shPaper') render(); });
    paintN();
    return { got: got };
  };

  /* ════ 공통 장치 ② 긔록 수신긔 (#shRadio · #rdScale · #rdNo · #rdWhen · #rdMeter · #rdPlay · #rdTime · #rdCard · #rdBody) ════
     cfg = { st, audioBase, staticSrc, endLine } · st[i] = { y, no, when, au?, moon, t[], b[](문자열 또는 [옛,오늘]), d[], link? } */
  W.mb.radio = function (cfg) {
    var ST = cfg.st, I = -1, au = null, stc = null, tm = null;
    function fmt(s) { s = Math.max(0, Math.floor(s || 0)); return ('0' + Math.floor(s / 60)).slice(-2) + ':' + ('0' + s % 60).slice(-2); }
    function scale() {
      var n = ST.length, nums = ['550', '700', '900', '1100', '1300', '1500'];
      $('#rdScale').innerHTML = '<div class="rd-nums">' + nums.map(function (x) { return '<span>' + x + '</span>'; }).join('') + '</div><div class="rd-ticks"></div><i class="rd-needle" id="rdNeedle"></i>' +
        '<div class="rd-st">' + ST.map(function (s, i) { return '<button data-r="' + i + '" class="' + (i === I ? 'on' : '') + '">' + s.y + '</button>'; }).join('') + '</div>';
      var nd = $('#rdNeedle'); if (nd) nd.style.left = (I < 0 ? 4 : ((I + .5) * 100 / n)) + '%';
    }
    function stop() { if (au) au.pause(); if (stc) stc.pause(); clearInterval(tm); var p = $('#rdPlay'); if (p && au) p.textContent = '▶ 듯기'; }
    function tune(i) {
      stop(); I = i; var s = ST[i]; scale();
      $('#rdNo').textContent = s.no + ' · ' + s.y; $('#rdWhen').textContent = s.when;
      var m = $('#rdMeter'); m.style.width = '0%'; setTimeout(function () { m.style.width = (s.moon || 60) + '%'; }, 60);
      try { if (!stc) { stc = new Audio(cfg.staticSrc); stc.volume = .35; } stc.currentTime = 0; stc.play().catch(function () {}); setTimeout(function () { if (stc) stc.pause(); }, 700); } catch (e) {}
      var p = $('#rdPlay'); p.disabled = !s.au; p.textContent = s.au ? '▶ 듯기' : '녹음 업슴';
      $('#rdTime').textContent = s.au ? '00:00 / --:--' : '이 칸은 녹음이 업소';
      au = s.au ? new Audio(cfg.audioBase + s.au) : null;
      if (au) { au.addEventListener('loadedmetadata', function () { $('#rdTime').textContent = '00:00 / ' + fmt(au.duration); }); au.addEventListener('ended', stop); }
      $('#rdCard').innerHTML = '<p class="rd-k">' + s.no + ' · ' + s.when + '</p><h3>' + t0(s.t) + '</h3><ul>' + s.b.map(function (x) { return '<li>' + t0(x) + '</li>'; }).join('') + '</ul>' +
        '<p class="rd-d">' + t0(s.d) + '</p>' + (s.link ? '<p class="mb-q" style="font-size:16.5px">' + t0(s.link) + '</p>' : '') +
        (ST[i + 1] ? '<button class="mb-btn ghost" data-r="' + (i + 1) + '">다음 주파수 · ' + ST[i + 1].y + ' →</button>' : '<p class="mb-p" style="margin-top:18px;color:#d9d8d3">' + (cfg.endLine || '') + '</p>');
    }
    D.addEventListener('click', function (e) {
      var r = e.target.closest('#shRadio [data-r]'); if (r) { tune(+r.dataset.r); if (r.closest('#rdCard')) $('#rdBody').scrollTop = 0; return; }
      if (e.target.closest('#rdPlay')) {
        if (!au) return;
        if (au.paused) { au.play().catch(function () {}); $('#rdPlay').textContent = '❚❚ 멈춤'; clearInterval(tm); tm = setInterval(function () { $('#rdTime').textContent = '방송 중이오 · ' + fmt(au.currentTime) + ' / ' + fmt(au.duration); }, 500); }
        else stop();
      }
    });
    W.addEventListener('mb:open', function (e) {
      if (e.detail !== 'shRadio') return; scale();
      if (I < 0) $('#rdCard').innerHTML = '<p class="rd-hint">우 ' + ST.length + ' 해 가운데 하나를 누르면 그 해의 주파수가 잡히오.<br>' + ST.map(function (s) { return s.y; }).join(' → ') + '</p>';
    });
    W.addEventListener('mb:close', function (e) { if (e.detail === 'shRadio') stop(); });
  };
})(window, document);
