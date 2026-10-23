/* 네 사건 폰판 공용 — 아래 고정 두 단추: 왼편 「기자수첩」(장을 지날 때마다 취재 도장) · 오른편 「호외」(비하인드 카드)
   호외는 사건 첫머리를 지나면 한 번 저절로 올라옴 · 네 사건을 다 닑으면 수첩에 편집국 전보 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var tone = function (k) { if (W.mb && W.mb.tone) try { W.mb.tone(k); } catch (e) {} };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  var CASES = [
    { k: 'jk', dir: 'jukcheomjeong', name: '죽첨정', full: '죽첨정 사건', sec: '사회면', no: '01', cover: 'jk_cover.jpg', cards: 4 },
    { k: 'maria', dir: 'maria', name: '마리아', full: '부산 마리아 참살사건', sec: '사회면', no: '02', cover: 'mr_cover.jpg', cards: 2 },
    { k: 'sk', dir: 'sonkijeong', name: '손긔정', full: '손긔정 군과 지워진 표지', sec: '문화예술면', no: '03', cover: 'sk_cover.jpg', cards: 1 },
    { k: 'bb', dir: 'baekbaekgyo', name: '백백교', full: '백백교 사건', sec: '경제면', no: '04', cover: 'bb_cover.jpg', cards: 2 }
  ];
  var path = location.pathname.replace(/\\/g, '/'), HERE = null;
  CASES.forEach(function (c) { if (path.indexOf('/' + c.dir + '/') > -1) HERE = c; });
  if (!HERE) return;
  var ROOT = '../', TOP = '../../';
  W.YKP_MONO = true;
  var PROXY = D.createElement('div'); PROXY.className = 'notebook mce-proxy'; PROXY.hidden = true; D.body.appendChild(PROXY);
  function pressGot() { try { return !!(W.ykPress && W.ykPress.get()[HERE.k]); } catch (e) { return false; } }

  function read() { try { return JSON.parse(localStorage.getItem('yk-read') || '{}') || {}; } catch (e) { return {}; } }
  function n() { var o = read(), k = 0; CASES.forEach(function (c) { if (o[c.k]) k++; }); return k; }
  function myName() { try { return localStorage.getItem('yk-nr-name') || ''; } catch (e) { return ''; } }

  /* (1019) 표지에 소리 안내 한 줄 · 끗 문장 뒤엔 검은 화면 한 장 · 부록(다른 사건 · 사료)은 접어 둠 */
  function frame() {
    var cv = D.querySelector('.mb-cover .t');
    if (cv && !D.querySelector('.mce-snd')) { var p = D.createElement('p'); p.className = 'mce-snd'; p.setAttribute('data-noko', ''); p.innerHTML = '<i>♪</i> 이 지면은 소리가 잇소 — 소리를 켜 두시압'; var dn = cv.querySelector('.down'); cv.insertBefore(p, dn || null); }
    var fin = D.getElementById('finale'), nx = D.getElementById('next'), co = D.getElementById('colophon');
    if (fin && !D.querySelector('.mce-black')) {
      var bk = D.createElement('section'); bk.className = 'mce-black'; bk.setAttribute('aria-hidden', 'true'); bk.setAttribute('data-noko', '');
      bk.innerHTML = '<p>' + esc(fin.getAttribute('data-sub') || '') + '</p>';
      /* 끗 바로 뒤 — 덧붙임이 이어지는 사건(백백교)은 그 덧붙임 앞에 */
      fin.parentNode.insertBefore(bk, fin.nextSibling);
    }
    if (nx && !D.querySelector('.mce-fold')) {
      var fd = D.createElement('div'); fd.className = 'mce-fold'; nx.parentNode.insertBefore(fd, nx); fd.appendChild(nx); if (co) fd.appendChild(co);
      var bt = D.createElement('button'); bt.type = 'button'; bt.className = 'mce-unfold'; bt.innerHTML = '<small>덧붙임</small><b>다른 사건 · 그해의 지면 · 사료</b><i>펴기 ↓</i>';
      fd.parentNode.insertBefore(bt, fd);
      var open = function () { if (fd.classList.contains('open')) return; fd.classList.add('open'); bt.hidden = true; };
      bt.addEventListener('click', function () { open(); setTimeout(function () { W.scrollTo({ top: fd.getBoundingClientRect().top + W.scrollY - 50, behavior: 'smooth' }); }, 30); });
      D.addEventListener('click', function (e) { var g = e.target.closest('[data-goto],a[href^="#"]'); if (!g) return; var id = g.getAttribute('data-goto') || (g.getAttribute('href') || '').slice(1); var t = id && D.getElementById(id); if (t && fd.contains(t)) open(); }, true);
      if (/#(next|colophon)/.test(location.hash)) open();
    }
  }
  function start() {
    frame();
    /* ═══ 1. 호외요, 호외! — 비하인드 카드 ═══ */
    var pics = []; for (var i = 1; i <= HERE.cards; i++) pics.push(TOP + 'assets/behind/' + HERE.k + i + '.jpg');
    var old = $('#shHogoe'); if (old) old.remove();
    D.body.insertAdjacentHTML('beforeend',
      '<div class="mce-hg" id="mceHg" hidden role="dialog" aria-label="호외"><div class="mce-hg-in">' +
      '<div class="mce-hg-art" style="background-image:url(' + TOP + 'assets/mj/yk_newsboy.jpg)" aria-hidden="true"><span>그림 · 재현</span></div><div class="mce-hg-hd"><b>호외요, 호외!</b><span>경성야록 · ' + esc(HERE.full) + ' · 비하인드</span><button type="button" class="mce-hg-x" aria-label="닫기">×</button></div>' +
      '<div class="mce-hg-tr" id="mceTr">' + pics.map(function (p, j) { return '<figure class="mce-hg-sl"><img src="' + p + '" alt="' + esc(HERE.full) + ' 호외 ' + (j + 1) + '장 (재현 그림)" width="900" height="1124" decoding="async"></figure>'; }).join('') + '</div>' +
      '<p class="mce-hg-n" id="mceN">' + (pics.length > 1 ? '1 / ' + pics.length + ' · 옆으로 넘기시압' : '호외 한 장 · 재현 그림') + '</p>' +
      '<button type="button" class="mce-hg-ok">다 닑엇소 — 긔사로 도라가기</button></div></div>' +
      '<button type="button" class="mce-tab" id="mceTab" hidden aria-label="호외 다시 보기"><img src="' + pics[0] + '" alt=""><b>호외</b></button>');
    var hg = $('#mceHg'), tr = $('#mceTr'), tab = $('#mceTab');
    /* 호외요, 호외! — 종을 울리며 (파일 종 → 막히면 만든 종) · 첫 장부터 반듯하게 */
    function openHg() {
      if (W.mb && W.mb.prime) try { W.mb.prime(); } catch (e) {}
      hg.hidden = false; D.documentElement.classList.add('mb-lock'); tr.scrollLeft = 0; $('#mceN').textContent = pics.length > 1 ? '1 / ' + pics.length + ' · 옆으로 넘기시압' : '호외 한 장 · 재현 그림';
      requestAnimationFrame(function () { hg.classList.add('on'); tr.scrollLeft = 0; });
      buzz([30, 50, 30]); if (W.mb && W.mb.sfx) W.mb.sfx('bell', .5); else tone('stamp');
    }
    function closeHg() { hg.classList.remove('on'); D.documentElement.classList.remove('mb-lock'); setTimeout(function () { hg.hidden = true; tab.hidden = false; tab.classList.add('in'); }, 380); }
    hg.addEventListener('click', function (e) { if (e.target === hg || e.target.closest('.mce-hg-x,.mce-hg-ok')) closeHg(); });
    tab.addEventListener('click', openHg);
    tr.addEventListener('scroll', function () { if (pics.length < 2) return; var k = Math.round(tr.scrollLeft / tr.clientWidth); $('#mceN').textContent = (k + 1) + ' / ' + pics.length + (k + 1 < pics.length ? ' · 옆으로 넘기시압' : ' · 끗'); }, { passive: true });
    D.addEventListener('click', function (e) { var b = e.target.closest('[data-open="shHogoe"]'); if (b) { e.preventDefault(); e.stopPropagation(); openHg(); } }, true);
    /* 사건 첫머리(표지 다음 한 장)를 지나면 한 번 — 다른 창이 떠 잇으면 기다렷다가 */
    var KEY = 'yk-behind-m-' + HERE.k, shown = false; try { shown = !!sessionStorage.getItem(KEY); } catch (e) {}
    tab.hidden = false; if (shown) {}
    else {
      var busy = function () { return D.querySelector('.mb-sheet.on, .mb-zoom.on') || D.documentElement.classList.contains('mb-lock'); };
      var trig = function () {
        if (shown) return; var h = D.documentElement.scrollHeight - innerHeight; if (h <= 0 || W.scrollY / h < .28) return;
        shown = true; try { sessionStorage.setItem(KEY, '1'); } catch (e) {} W.removeEventListener('scroll', trig);
        (function chk() { if (busy()) { setTimeout(chk, 1200); return; } openHg(); })();
      };
      W.addEventListener('scroll', trig, { passive: true });
    }

    /* ═══ 2. 기자수첩 — 장을 지날 때마다 취재 도장 (아래 고정) ═══ */
    var BEATS = {
      jk: [['ch1', '현장'], ['ch2', '보도'], ['ch3', '의심'], ['ch4', '수사'], ['ch5', '진상'], ['ch6', '오보']],
      maria: [['c2', '현장'], ['c4', '보도'], ['c6', '투서'], ['c11', '판결']],
      sk: [['c1', '승전'], ['c2', '나무'], ['c3', '붓'], ['c4', '명부'], ['c5', '정간'], ['c6', '이름'], ['c7', '그 뒤']],
      bb: [['c0', '흰옷'], ['c1', '부고'], ['c2', '장부'], ['c3', '한집'], ['c4', '그밤'], ['c6', '산'], ['c7', '땅'], ['c11', '병']]
    }[HERE.k].filter(function (x) { return D.getElementById(x[0]); });
    var got = {}, NK = 'yk-nb-' + HERE.k;
    try { got = JSON.parse(sessionStorage.getItem(NK) || '{}') || {}; } catch (e) {}
    D.body.insertAdjacentHTML('beforeend',
      '<button type="button" class="mce-nb" id="mceNb" aria-label="기자수첩"><span class="mce-nb-i"></span><b>기자수첩</b><em id="mceNbN"></em></button>' +
      '<div class="mce-stp" id="mceStp" aria-hidden="true"><i></i></div>' +
      '<div class="mce-hg mce-book" id="mceBook" hidden role="dialog" aria-label="기자수첩"><div class="mce-hg-in">' +
      '<div class="mce-hg-art nb" style="background-image:url(' + TOP + 'assets/mj/yk_notebook.jpg)" aria-hidden="true"><span>그림 · 재현</span></div><div class="mce-hg-hd"><b>기자수첩</b><span>' + esc(HERE.sec) + ' ' + HERE.no + ' · ' + esc(HERE.full) + ' · 취재 도장</span><button type="button" class="mce-hg-x" aria-label="닫기">×</button></div>' +
      '<div class="mce-bk-bd" id="mceBkBd"></div></div></div>');
    var nbBtn = $('#mceNb'), book = $('#mceBook'), stp = $('#mceStp');
    function cnt() { return BEATS.filter(function (x) { return got[x[0]]; }).length; }
    /* (1019) 기자수첩 단추는 사건을 다 보고 난 뒤에야 켜짐 — 도장이 다 찍히거나, 끗에 닿거나, 이 사건을 닑은 것으로 긔록되면 */
    var ONK = 'yk-nbon-' + HERE.k, nbOn = false; try { nbOn = !!sessionStorage.getItem(ONK); } catch (e) {}
    function nbShow(fresh) {
      if (nbOn) { D.body.classList.add('mce-nb-on'); return; } nbOn = true; try { sessionStorage.setItem(ONK, '1'); } catch (e) {}
      D.body.classList.add('mce-nb-on');
      if (fresh) { nbBtn.classList.remove('pop'); void nbBtn.offsetWidth; nbBtn.classList.add('pop'); $('i', stp).textContent = '수첩'; stp.classList.remove('on'); void stp.offsetWidth; stp.classList.add('on'); if (W.__mceDock) W.__mceDock(true, 3600); }
    }
    if (nbOn) D.body.classList.add('mce-nb-on');
    function paintNb() {
      var c = cnt(), all = c >= BEATS.length; $('#mceNbN').textContent = all ? '취재 끗' : c + ' / ' + BEATS.length;
      nbBtn.classList.toggle('done', all); if (all) PROXY.classList.add('done');
      if (!nbOn && (all || read()[HERE.k])) nbShow(true);
      if (pressGot()) $('#mceNbN').textContent = '기자증';
      var o = read(), k = n();
      $('#mceBkBd').innerHTML =
        '<ol class="mce-bk">' + BEATS.map(function (x, i) { return '<li><button type="button" data-go="' + x[0] + '" class="' + (got[x[0]] ? 'on' : '') + '"><i>' + (got[x[0]] ? x[1] : i + 1) + '</i><small>' + x[1] + '</small></button></li>'; }).join('') + '</ol>' +
        '<p class="mce-bk-s">' + (all ? '이 사건의 취재를 다 마첫소.' : '장을 지나 내려가면 도장이 저절로 찍히오. 도장을 누르면 그 장으로 가오.') + '</p>' +
        '<div class="mce-bk-4"><p><b>네 사건</b><span>' + k + ' / 4</span></p><div>' + CASES.map(function (cc) { return (o[cc.k] || cc === HERE ? '<span' : '<a href="' + ROOT + cc.dir + '/m.html"') + ' class="' + (o[cc.k] ? 'on' : '') + (cc === HERE ? ' me' : '') + '"><i></i>' + cc.name + (o[cc.k] || cc === HERE ? '</span>' : '</a>'); }).join('') + '</div>' +
        '<p class="mce-bk-t">' + (k >= 4 ? '편집국에서 전보가 왓소 — 출입 암호는 <strong>자정</strong>. <a href="' + TOP + 'exhibits/newsroom/newsroom.html">편집국으로 →</a>' : '네 사건을 끗까지 닑으면 편집국에서 전보가 오오.') + '</p></div>' +
        (pressGot() ? '<button type="button" class="mce-press" id="mcePress">기자증 꺼내 보기 · 보내기</button>' : '<p class="mce-bk-p">도장을 다 찍으면 편집국이 <b>기자증</b>을 내주오.</p>') +
        '<div class="mce-share"><button type="button" id="mceShare">이 사건 알리기</button><button type="button" id="mceHg2">호외 보기</button></div>';
      $('#mceHg2').onclick = function () { closeBook(); setTimeout(openHg, 300); };
      $('#mceShare').onclick = share;
      var pb = $('#mcePress'); if (pb) pb.onclick = function () { closeBook(); setTimeout(function () { W.ykPress.show(''); }, 320); };
    }
    function openBook() { paintNb(); book.hidden = false; D.documentElement.classList.add('mb-lock'); requestAnimationFrame(function () { book.classList.add('on'); }); tone('tick'); }
    function closeBook() { book.classList.remove('on'); D.documentElement.classList.remove('mb-lock'); setTimeout(function () { book.hidden = true; }, 380); }
    nbBtn.addEventListener('click', openBook);
    book.addEventListener('click', function (e) {
      var g = e.target.closest('[data-go]'); if (g) { closeBook(); var t = D.getElementById(g.dataset.go); if (t) setTimeout(function () { W.scrollTo({ top: t.getBoundingClientRect().top + W.scrollY - 50, behavior: 'smooth' }); }, 300); return; }
      if (e.target === book || e.target.closest('.mce-hg-x')) closeBook();
    });
    function stamp(id, label) {
      if (got[id]) return; got[id] = 1; try { sessionStorage.setItem(NK, JSON.stringify(got)); } catch (e) {}
      paintNb(); var all = cnt() >= BEATS.length;
      $('i', stp).textContent = label; stp.classList.remove('on'); void stp.offsetWidth; stp.classList.add('on');
      nbBtn.classList.remove('pop'); void nbBtn.offsetWidth; nbBtn.classList.add('pop');
      buzz(all ? [30, 60, 30, 60, 90] : [25, 40, 15]); tone('stamp'); if (W.__mceDock) W.__mceDock(true, 2400);
    }
    /* 아래 두 단추는 내려 읽는 동안 숨고 — 올려 밀거나, 도장이 찍히거나, 맨 끝에 닿으면 잠깐 나옴 */
    var lastY = W.scrollY, hideT = 0;
    function dock(show, ms) { D.body.classList.toggle('mce-dock', !!show); clearTimeout(hideT); if (show && ms) hideT = setTimeout(function () { if (!nearEnd()) D.body.classList.remove('mce-dock'); }, ms); }
    function nearEnd() { return W.scrollY + innerHeight > D.documentElement.scrollHeight - 600; }
    W.addEventListener('scroll', function () { var y = W.scrollY, d = y - lastY; if (Math.abs(d) < 8) return; lastY = y; if (nearEnd() || y < 200) dock(true); else if (d < -30) dock(true, 2600); else if (d > 0) dock(false); if (!nbOn && nearEnd()) nbShow(true); }, { passive: true });
    dock(true, 3000);
    W.__mceDock = dock;
    paintNb();
    if ('IntersectionObserver' in W) {
      var io2 = new IntersectionObserver(function (es) { es.forEach(function (e) { if (!e.isIntersecting) return; var x = BEATS.filter(function (b) { return b[0] === e.target.id; })[0]; if (x) { stamp(x[0], x[1]); io2.unobserve(e.target); } }); }, { rootMargin: '0px 0px -55% 0px' });
      BEATS.forEach(function (x) { if (!got[x[0]]) io2.observe(D.getElementById(x[0])); });
    }
    W.addEventListener('yk:read', function () { setTimeout(paintNb, 50); });

    /* 알리기 — 폰의 공유 창 (카톡 · 문자 · SNS) */
    function share() {
      var url = 'https://ejdms499-wq.github.io/gyeongseong-yarok_v/' + HERE.dir + '/m.html', text = '경성야록 · ' + HERE.full + ' — 신문 한 줄에서 시작되는 경성의 괴사';
      buzz(10);
      if (W.ykShare && W.ykShare.inApp && !navigator.share) { var bx = $('#mceShare'); if (bx) { bx.insertAdjacentHTML('afterend', '<p class="mce-outhint">' + W.ykShare.hintHtml(url) + '</p>'); bx.hidden = true; } return; }
      if (navigator.share) { navigator.share({ title: '경성야록', text: text, url: url }).catch(function () {}); return; }
      try { navigator.clipboard.writeText(text + ' ' + url).then(function () { var b = $('#mceShare'); if (b) b.textContent = '주소를 복사햇소'; }); } catch (e) {}
    }
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', function () { setTimeout(start, 0); }); else setTimeout(start, 0);
})(window, document);
