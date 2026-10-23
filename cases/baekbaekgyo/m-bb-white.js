/* 경성야록 · 백백교 폰판 — 《백색의 계율》 장치 (1018)
   · 차례에 다섯 막 표시
   · 제1막 장 머리에 신도들이 외든 주문이 희미하게 되풀이됨 (아름다운 질서)
   · 제2막 장 머리 뒤에 그날 호외의 활자 결 (균열)
   · 제3막 뒤에 앞 장면의 잔상 (침식) · 곡조는 제3막에서 종막까지 천천히 잦아들어 흰 것에서 멎음 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };

  /* ── 차례 — 막 이름을 끼움 ── */
  var ACT = { c0: ['서막', '백색의 초대'], c1: ['제1막', '아름다운 질서'], c4: ['제2막', '균열'], c9: ['제3막', '침식'], finale: ['종막', '백색'], c12: ['그 뒤', '남은 긔록'] };
  var painting = false;
  function tocActs() {
    var toc = $('#mbToc .mb-toc'); if (!toc || toc.querySelector('.toc-act')) return;
    painting = true;
    $$('a[data-goto]', toc).forEach(function (a) {
      var k = a.getAttribute('data-goto'), act = ACT[k]; if (!act) return;
      var h = D.createElement('div'); h.className = 'toc-act'; h.setAttribute('data-noko', ''); h.innerHTML = '<small>' + act[0] + '</small><b>' + act[1] + '</b>'; toc.insertBefore(h, a);
    });
    painting = false;
  }
  /* 차례는 열 때마다 엔진이 새로 그리므로(innerHTML) — 그린 뒤에 끼워 넣고, 바뀌면 다시 끼움 */
  function watch() {
    var toc = $('#mbToc .mb-toc'); if (!toc) return;
    tocActs();
    if ('MutationObserver' in W) new MutationObserver(function () { if (!painting) tocActs(); }).observe(toc, { childList: true });
  }
  D.addEventListener('DOMContentLoaded', function () { setTimeout(watch, 80); });
  W.addEventListener('mb:open', function (e) { if (e.detail === 'mbToc') setTimeout(tocActs, 0); });
  if (D.readyState !== 'loading') setTimeout(watch, 120);

  /* ── 제1막 — 주문이 되풀이되는 띠 ── */
  var chant = $('#bbChant .ch-t'), line = chant ? chant.textContent.replace(/\s+/g, ' ').trim() : '';
  if (line) $$('.mb-open.act1').forEach(function (op) {
    for (var i = 0; i < 2; i++) { var p = D.createElement('p'); p.className = 'bb-chant-band'; p.setAttribute('aria-hidden', 'true'); p.setAttribute('data-noko', ''); p.textContent = (line + ' · ').repeat(6); op.appendChild(p); }
  });

  /* ── 제2막 — 장 머리 뒤에 그날 호외의 활자 결 ── */
  $$('.wh2').forEach(function (sec, i) {
    var np = D.createElement('i'); np.className = 'bb-np'; np.setAttribute('aria-hidden', 'true');
    np.style.backgroundImage = 'url(' + (i % 2 ? './img/scan/chosun_19370413_hoe.jpg' : './img/scan/19370413.jpg') + ')';
    sec.insertBefore(np, sec.firstChild);
  });

  /* ── 제3막 — 앞 장면의 잔상 (1019) 검은 바탕으로 돌아가며 뺏소 — 흰 바탕용 장치엿음 ── */

  /* ── 소리 — 제3막에 들어서면 곡조가 잦아들고, 흰 것에서 멎음 ── */
  (function () {
    var c9 = $('#c9'), fin = $('#finale'); if (!c9 || !fin) return;
    var base = .3, raf = 0;
    function calc() {
      raf = 0; var bgm = W.mb && W.mb.bgm; if (!bgm) return;
      var y = W.scrollY + W.innerHeight * .5, a = c9.getBoundingClientRect().top + W.scrollY, b = fin.getBoundingClientRect().top + W.scrollY + fin.offsetHeight * .62;
      var k = Math.max(0, Math.min(1, (y - a) / Math.max(1, b - a))), v = base * (1 - k * k);
      if (Math.abs(bgm.volume - v) > .005) bgm.volume = v;
    }
    W.addEventListener('scroll', function () { if (!raf) raf = requestAnimationFrame(calc); }, { passive: true });
    setTimeout(calc, 800);
  })();
})(window, document);
