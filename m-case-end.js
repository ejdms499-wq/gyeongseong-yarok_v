/* 네 사건 폰판 공용 — 호외(비하인드 카드) · 다 읽으면 사건 도장 · 넷 다 모으면 기자 출입증 · 알리기
   흐름을 끊지 안케: 호외는 사건 첫머리를 지나면 한 번만 아래서 올라오고, 도장 · 출입증은 「다른 사건」 바로 우에 지면처럼 끼워 넣음 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var tone = function (k) { if (W.mb && W.mb.tone) try { W.mb.tone(k); } catch (e) {} };
  var esc = function (s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); };

  var CASES = [
    { k: 'jk', dir: 'case-jukcheomjeong', name: '죽첨정', full: '죽첨정 사건', sec: '사회면', no: '01', cover: 'jk_cover.jpg', cards: 4 },
    { k: 'maria', dir: 'case-maria', name: '마리아', full: '부산 마리아 참살사건', sec: '사회면', no: '02', cover: 'mr_cover.jpg', cards: 2 },
    { k: 'sk', dir: 'case-sonkijeong', name: '손긔정', full: '손긔정 군과 지워진 표지', sec: '문화예술면', no: '03', cover: 'sk_cover.jpg', cards: 1 },
    { k: 'bb', dir: 'case-baekbaekgyo', name: '백백교', full: '백백교 사건', sec: '경제면', no: '04', cover: 'bb_cover.jpg', cards: 3 }
  ];
  var path = location.pathname.replace(/\\/g, '/'), HERE = null;
  CASES.forEach(function (c) { if (path.indexOf('/' + c.dir + '/') > -1) HERE = c; });
  if (!HERE) return;
  var ROOT = '../';

  function read() { try { return JSON.parse(localStorage.getItem('yk-read') || '{}') || {}; } catch (e) { return {}; } }
  function n() { var o = read(), k = 0; CASES.forEach(function (c) { if (o[c.k]) k++; }); return k; }
  function myName() { try { return localStorage.getItem('yk-nr-name') || ''; } catch (e) { return ''; } }

  function start() {
    /* ═══ 1. 호외요, 호외! — 비하인드 카드 ═══ */
    var pics = []; for (var i = 1; i <= HERE.cards; i++) pics.push(ROOT + 'assets/behind/' + HERE.k + i + '.jpg');
    var old = $('#shHogoe'); if (old) old.remove();
    D.body.insertAdjacentHTML('beforeend',
      '<div class="mce-hg" id="mceHg" hidden role="dialog" aria-label="호외"><div class="mce-hg-in">' +
      '<div class="mce-hg-hd"><b>호외요, 호외!</b><span>경성야록 · ' + esc(HERE.full) + ' · 비하인드</span><button type="button" class="mce-hg-x" aria-label="닫기">×</button></div>' +
      '<div class="mce-hg-tr" id="mceTr">' + pics.map(function (p, j) { return '<img src="' + p + '" alt="' + esc(HERE.full) + ' 호외 ' + (j + 1) + '장 (재현 그림)" loading="lazy">'; }).join('') + '</div>' +
      '<p class="mce-hg-n" id="mceN">' + (pics.length > 1 ? '1 / ' + pics.length + ' · 옆으로 넘기시압' : '호외 한 장 · 재현 그림') + '</p>' +
      '<button type="button" class="mce-hg-ok">다 닑엇소 — 긔사로 도라가기</button></div></div>' +
      '<button type="button" class="mce-tab" id="mceTab" hidden aria-label="호외 다시 보기"><img src="' + pics[0] + '" alt=""><b>호외</b></button>');
    var hg = $('#mceHg'), tr = $('#mceTr'), tab = $('#mceTab');
    function openHg() { hg.hidden = false; D.documentElement.classList.add('mb-lock'); requestAnimationFrame(function () { hg.classList.add('on'); }); tr.scrollLeft = 0; buzz([30, 50, 30]); tone('stamp'); }
    function closeHg() { hg.classList.remove('on'); D.documentElement.classList.remove('mb-lock'); setTimeout(function () { hg.hidden = true; tab.hidden = false; tab.classList.add('in'); }, 380); }
    hg.addEventListener('click', function (e) { if (e.target === hg || e.target.closest('.mce-hg-x,.mce-hg-ok')) closeHg(); });
    tab.addEventListener('click', openHg);
    tr.addEventListener('scroll', function () { if (pics.length < 2) return; var k = Math.round(tr.scrollLeft / tr.clientWidth); $('#mceN').textContent = (k + 1) + ' / ' + pics.length + (k + 1 < pics.length ? ' · 옆으로 넘기시압' : ' · 끗'); }, { passive: true });
    D.addEventListener('click', function (e) { var b = e.target.closest('[data-open="shHogoe"]'); if (b) { e.preventDefault(); e.stopPropagation(); openHg(); } }, true);
    /* 사건 첫머리(표지 다음 한 장)를 지나면 한 번 — 다른 창이 떠 잇으면 기다렷다가 */
    var KEY = 'yk-behind-m-' + HERE.k, shown = false; try { shown = !!sessionStorage.getItem(KEY); } catch (e) {}
    if (shown) tab.hidden = false;
    else {
      var busy = function () { return D.querySelector('.mb-sheet.on, .mb-zoom.on') || D.documentElement.classList.contains('mb-lock'); };
      var trig = function () {
        if (shown) return; var h = D.documentElement.scrollHeight - innerHeight; if (h <= 0 || W.scrollY / h < .28) return;
        shown = true; try { sessionStorage.setItem(KEY, '1'); } catch (e) {} W.removeEventListener('scroll', trig);
        (function chk() { if (busy()) { setTimeout(chk, 1200); return; } openHg(); })();
      };
      W.addEventListener('scroll', trig, { passive: true });
    }

    /* ═══ 2. 끗 — 사건 도장 · 기자 출입증 · 알리기 ═══ */
    var at = $('#next') || $('.page-foot'); if (!at) return;
    var box = D.createElement('section'); box.className = 'mce'; box.id = 'mceEnd';
    at.parentNode.insertBefore(box, at);
    function paint(fresh) {
      var o = read(), k = n(), all = k >= 4, nx = null;
      for (var j = 1; j <= 4 && !nx; j++) { var c = CASES[(CASES.indexOf(HERE) + j) % 4]; if (!o[c.k]) nx = c; }
      var slots = CASES.map(function (c) {
        var on = !!o[c.k], me = c === HERE;
        return '<' + (on || me ? 'span' : 'a href="' + ROOT + c.dir + '/m.html"') + ' class="mce-s' + (on ? ' on' : '') + (me ? ' me' : '') + (me && fresh ? ' fresh' : '') + '"><i>' + (on ? '닑음' : c.no) + '</i><b>' + c.name + '</b></' + (on || me ? 'span' : 'a') + '>';
      }).join('');
      var pass = all
        ? '<div class="mce-pass' + (fresh ? ' fresh' : '') + '"><i class="mce-strap"></i><p class="mce-p-top"><b>경성야록 편집국</b><span>관계자 외 출입 금지</span></p>' +
          '<h3>기 자 출 입 증</h3><p class="mce-p-who">성명 <input id="mceName" maxlength="12" placeholder="여긔에 일홈을" value="' + esc(myName()) + '"></p>' +
          '<button type="button" class="mce-key" id="mceKey"><small>출입 암호 · 눌러서 보기</small><strong>자 정</strong></button>' +
          '<p class="mce-p-s">문 압 수위에게만 — 남에겐 비밀이오.</p><span class="mce-p-stamp">출입<br>허가</span></div>' +
          '<a class="mce-go" href="' + ROOT + 'm-newsroom.html">출입증 들고 편집국으로 →</a>'
        : '<p class="mce-left">도장 넷을 다 찍으면 <b>기자 출입증</b>이 나오오. 이제 <b>' + (4 - k) + '</b>개 남앗소.</p>' +
          (nx ? '<a class="mce-go" href="' + ROOT + nx.dir + '/m.html"><span class="ph" style="background-image:url(' + ROOT + 'assets/noir/' + nx.cover + ')"></span><span><small>다음 도장 · ' + nx.sec + ' ' + nx.no + '</small>' + nx.full + ' →</span></a>' : '');
      box.innerHTML =
        '<p class="mce-k">끗 · ' + esc(HERE.sec) + ' ' + HERE.no + '</p>' +
        '<h2>' + esc(HERE.full) + ',<br>끗까지 닑엇소.</h2>' +
        '<div class="mce-board"><p class="mce-bh"><b>사건 도장</b><span>' + k + ' / 4</span></p><div class="mce-slots">' + slots + '</div></div>' +
        pass +
        '<div class="mce-share"><button type="button" id="mceShare">' + (all ? '출입증 자랑하기' : '이 사건 알리기') + '</button><button type="button" id="mceHg2">호외 다시 보기</button></div>';
      $('#mceHg2', box).onclick = openHg;
      $('#mceShare', box).onclick = function () { share(all); };
      var key = $('#mceKey', box); if (key) key.onclick = function () { key.classList.add('on'); buzz(15); tone('stamp'); };
      var nm = $('#mceName', box); if (nm) nm.addEventListener('change', function () { try { localStorage.setItem('yk-nr-name', nm.value.trim()); } catch (e) {} });
    }
    /* 다 닑은 때 = 이 칸이 화면에 드러올 때 */
    var o0 = read(), had = !!o0[HERE.k];
    paint(false);
    if ('IntersectionObserver' in W) {
      var io = new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (!e.isIntersecting) return; io.disconnect();
          var was4 = n() >= 4;
          if (!had) { var o = read(); o[HERE.k] = 1; try { localStorage.setItem('yk-read', JSON.stringify(o)); } catch (x) {} try { W.dispatchEvent(new CustomEvent('yk:read', { detail: HERE.k })); } catch (x) {} }
          if (n() >= 4) { try { localStorage.setItem('yk-pass', '1'); } catch (x) {} }
          paint(!had);
          if (!had) setTimeout(function () { buzz(n() >= 4 && !was4 ? [40, 80, 40, 80, 120] : [40, 70, 30]); tone('stamp'); }, 380);
        });
      }, { threshold: .35 });
      io.observe(box);
    }

    /* 알리기 — 폰의 공유 창 (카톡 · 문자 · SNS). 출입증은 그림 한 장으로 */
    function share(all) {
      var url = 'https://ejdms499-wq.github.io/gyeongseong-yarok_v/' + HERE.dir + '/m.html';
      var text = all ? (($('#mceName') && $('#mceName').value.trim()) || '나') + ' — 경성야록 네 사건을 다 닑고 기자 출입증을 바닷소.' : '경성야록 · ' + HERE.full + ' — 신문 한 줄에서 시작되는 경성의 괴사';
      function plain() { if (navigator.share) navigator.share({ title: '경성야록', text: text, url: url }).catch(function () {}); else copy(); }
      function copy() { try { navigator.clipboard.writeText(text + ' ' + url).then(function () { say('주소를 복사햇소 — 카톡 대화창에 붓처 너흐시압.'); }); } catch (e) { say(url); } }
      buzz(10);
      if (!all || !navigator.share) return plain();
      passImage(function (blob) {
        try { var f = new File([blob], '경성야록-기자출입증.png', { type: 'image/png' });
          if (navigator.canShare && navigator.canShare({ files: [f] })) { navigator.share({ files: [f], title: '경성야록 기자 출입증', text: text + ' ' + url }).catch(function () {}); return; } } catch (e) {}
        plain();
      });
    }
    function say(t) { var p = $('.mce-say', box); if (!p) { p = D.createElement('p'); p.className = 'mce-say'; box.appendChild(p); } p.textContent = t; }
    function passImage(cb) {
      var c = D.createElement('canvas'), x = c.getContext('2d'), Wd = 900, Ht = 1200; c.width = Wd; c.height = Ht;
      x.fillStyle = '#0b0b0b'; x.fillRect(0, 0, Wd, Ht);
      x.fillStyle = '#f4f3f0'; x.fillRect(110, 170, 680, 900); x.strokeStyle = '#0e0e0e'; x.lineWidth = 4; x.strokeRect(126, 186, 648, 868);
      x.fillStyle = '#1a1a1a'; x.fillRect(434, 0, 32, 200); x.fillStyle = '#0e0e0e'; x.fillRect(410, 196, 80, 14);
      x.fillStyle = '#0e0e0e'; x.font = '800 24px "Noto Sans KR", sans-serif'; x.fillText('경성야록 편집국', 170, 270); x.fillStyle = '#b3261e'; x.font = '500 20px "Noto Sans KR", sans-serif'; x.textAlign = 'right'; x.fillText('관계자 외 출입 금지', 730, 270); x.textAlign = 'left';
      x.fillStyle = '#0e0e0e'; x.fillRect(170, 290, 560, 4);
      x.font = '900 64px "Noto Serif KR", serif'; x.textAlign = 'center'; x.fillText('기 자 출 입 증', 450, 400);
      var nm = ($('#mceName') && $('#mceName').value.trim()) || '무명 긔자';
      x.font = '400 24px "Noto Sans KR", sans-serif'; x.fillStyle = '#6b6b68'; x.fillText('성 명', 450, 490); x.fillStyle = '#0e0e0e'; x.font = '900 60px "Noto Serif KR", serif'; x.fillText(nm, 450, 570);
      x.fillStyle = '#6b6b68'; x.font = '400 22px "Noto Sans KR", sans-serif'; x.fillText('네 사건의 긔록을 끗까지 닑은 독자', 450, 640);
      CASES.forEach(function (cc, j) { var cx = 225 + j * 150, cy = 790; x.strokeStyle = '#b3261e'; x.lineWidth = 4; x.beginPath(); x.arc(cx, cy, 52, 0, Math.PI * 2); x.stroke(); x.fillStyle = '#b3261e'; x.font = '900 24px "Noto Serif KR", serif'; x.fillText(cc.name, cx, cy + 8); });
      x.fillStyle = '#6b6b68'; x.font = '400 20px "Noto Sans KR", sans-serif'; x.fillText('사건 도장 넷 · 출입 암호는 문 압 수위에게만', 450, 900);
      x.save(); x.translate(640, 420); x.rotate(-.2); x.strokeStyle = '#b3261e'; x.lineWidth = 6; x.strokeRect(-70, -50, 140, 100); x.fillStyle = '#b3261e'; x.font = '900 34px "Noto Serif KR", serif'; x.fillText('출입', 0, -6); x.fillText('허가', 0, 34); x.restore();
      x.fillStyle = '#8a8984'; x.font = '500 22px "Noto Sans KR", sans-serif'; x.fillText('경성야록 · 신문 한 줄에서 시작되는 경성의 괴사', 450, 1130);
      c.toBlob(cb, 'image/png');
    }
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', function () { setTimeout(start, 0); }); else setTimeout(start, 0);
})(window, document);
