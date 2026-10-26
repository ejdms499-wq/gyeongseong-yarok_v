/* 경성야록 · 심인 광고면(컴퓨터판) — 폰판에서 옮겨 온 것 (1020)
   · 현상 수배 제 이백륙십팔 호: 사진을 누르면 붉은 인주 발바닥이 찍힘 → 「268호의 경성 산책」으로 이어짐
   · 경성 산책에서 차즌 수를 수배지에 적어 둠 (localStorage yk-walk)
   · 자리를 비우면 제목이 부름 */
(function (W, D) {
  'use strict';
  var $ = function (s) { return D.querySelector(s); };
  var AC = W.AudioContext || W.webkitAudioContext, ctx = null;
  function meow(pitch) {
    if (!AC) return;
    try {
      ctx = ctx || new AC(); if (ctx.state === 'suspended') ctx.resume();
      var t = ctx.currentTime, d = .5 + Math.random() * .2, b = (pitch || 1) * (520 + Math.random() * 120), o = ctx.createOscillator(), f = ctx.createBiquadFilter(), g = ctx.createGain();
      o.type = 'sawtooth'; o.frequency.setValueAtTime(b * .8, t); o.frequency.linearRampToValueAtTime(b * 1.3, t + d * .35); o.frequency.exponentialRampToValueAtTime(b * .6, t + d);
      f.type = 'bandpass'; f.Q.value = 6; f.frequency.setValueAtTime(1900, t); f.frequency.linearRampToValueAtTime(700, t + d);
      g.gain.setValueAtTime(0, t); g.gain.linearRampToValueAtTime(.25, t + .05); g.gain.exponentialRampToValueAtTime(.001, t + d);
      o.connect(f); f.connect(g); g.connect(ctx.destination); o.start(t); o.stop(t + d + .05);
    } catch (e) {}
  }
  /* (1020) 수배 사진 → 지문이 찍히고 심묘한 산책(walk.html)으로 넘어감 */
  var go = function () { if (go.on) return; go.on = 1; location.href = 'https://ejdms499-wq.github.io/simmyo-walk/proto/road/index.html?from=yarok'; };
  var mug = $('#skMug');
  if (mug) {
    var ink = function () {
      if (mug.classList.contains('inked')) { go(); return; } mug.classList.add('inked'); meow(1.2); setTimeout(go, 1300);
      var c = $('#mugEm'); if (c) c.textContent = '지문 대조 결과 — 발바닥. 용의자 특정 실패.';
    };
    mug.setAttribute('role', 'button'); mug.tabIndex = 0; mug.setAttribute('aria-label', '수배 사진 — 누르면 지문을 뜨고 산책길이 열림');
    mug.addEventListener('click', ink);
    mug.addEventListener('keydown', function (e) { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); ink(); } });
  }
})(window, document);
