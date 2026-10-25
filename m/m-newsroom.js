/* 자정의 편집국 폰판 — 출입증 손맛(떨림 · 도장) · 문 앞에선 뒤 화면 잠금 (일하는 장치는 newsroom.js) */
(function (W, D) {
  'use strict';
  function start() {
    var $ = function (s) { return D.querySelector(s); };
    var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
    var tone = function (k) { if (W.mb && W.mb.tone) try { W.mb.tone(k); } catch (e) {} };
    var gate = $('#gate'), pass = $('#gateForm'), err = $('#gateErr'), H = D.documentElement;
    if (!gate) { H.classList.remove('mb-lock'); return; } /* 실린 긔사 보기 */
    var top = $('.nr-top'); if (top) top.insertAdjacentHTML('beforeend', '<span class="rt">그림 · 재현</span>');
    var side = $('.nr-side'); if (side) side.insertAdjacentHTML('beforebegin', '<figure class="mnr-fig"><img src="assets/nr3/m_desk2.jpg" alt="자정 넘은 편집국 책상 — 전등 아래 흩어진 원고 (그림 · 재현)" loading="lazy"><span class="rt">그림 · 재현</span><figcaption>자정이 넘으면 이 책상은 기자 차지. 다 쓴 원고는 아래 원고함에 쌓이오.</figcaption></figure>');
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
