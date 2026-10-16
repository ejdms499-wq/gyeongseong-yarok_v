/* 자정의 편집국 폰판 — 출입증 손맛(떨림 · 도장) · 문 앞에선 뒤 화면 잠금 (일하는 장치는 newsroom.js) */
(function (W, D) {
  'use strict';
  function start() {
    var $ = function (s) { return D.querySelector(s); };
    var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
    var tone = function (k) { if (W.mb && W.mb.tone) try { W.mb.tone(k); } catch (e) {} };
    var gate = $('#gate'), pass = $('#gateForm'), err = $('#gateErr'), H = D.documentElement;
    if (!gate) { H.classList.remove('mb-lock'); return; } /* 실린 긔사 보기 */
    function lock() { var on = !gate.hidden && !D.body.classList.contains('nr-in') && !D.body.classList.contains('nr-quick'); H.classList.toggle('mb-lock', on); }
    lock();
    new MutationObserver(lock).observe(gate, { attributes: true, attributeFilter: ['hidden'] });
    new MutationObserver(function () {
      lock();
      if (D.body.classList.contains('nr-in') && !D.body.classList.contains('nr-quick')) {
        buzz([18, 70, 40]); tone('stamp');
        setTimeout(function () { W.scrollTo(0, 0); }, 850);
      }
    }).observe(D.body, { attributes: true, attributeFilter: ['class'] });
    /* 틀리면 출입증이 흔들림 */
    new MutationObserver(function () {
      if (!err.textContent.trim()) return;
      pass.classList.remove('bad'); void pass.offsetWidth; pass.classList.add('bad'); buzz([60, 40, 60]);
    }).observe(err, { childList: true, characterData: true, subtree: true });
    /* 자판이 올라오면 입력칸이 가려지지 안케 */
    ['#fName', '#fPass'].forEach(function (s) { var i = $(s); if (i) i.addEventListener('focus', function () { setTimeout(function () { i.scrollIntoView({ block: 'center', behavior: 'smooth' }); }, 280); }); });
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', function () { setTimeout(start, 0); }); else setTimeout(start, 0);
})(window, document);
