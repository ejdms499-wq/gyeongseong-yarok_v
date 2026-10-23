/**
 * 경성야록 사건별 튜토리얼 공통 코어 모듈
 * 4대 사건(백백교, 죽첨정, 마리아, 손기정)의 지면 마커 및 설명 안내 로직을 모듈화하여 코드 중복을 제거합니다.
 */
(function (root, factory) {
  if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    root.CaseTutorialCore = factory();
  }
})(typeof window === 'object' ? window : globalThis, function () {
  'use strict';

  var D = typeof document !== 'undefined' ? document : null;
  var W = typeof window !== 'undefined' ? window : null;

  function esc(t) {
    return String(t).replace(/[&<>"]/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c];
    });
  }

  function H(o, k) {
    return k && k !== o
      ? '<span class="hj" tabindex="0" data-ko="' + esc(k) + '">' + o + '</span>'
      : '<span class="hj" tabindex="0">' + o + '</span>';
  }

  var DEFAULT_ICONS = {
    tap: '<i class="bt-ic tap" aria-hidden="true"></i>',
    down: '<i class="bt-ic down" aria-hidden="true"></i>',
    hover: '<i class="bt-ic hover" aria-hidden="true"></i>',
    lamp: '<i class="bt-ic lamp" aria-hidden="true"></i>'
  };

  function setup(marks, help, options) {
    if (!D) return;
    options = options || {};
    var icons = Object.assign({}, DEFAULT_ICONS, options.icons || {});
    var $ = function (s, r) { return (r || D).querySelector(s); };

    // 1. 지면 마커 렌더링
    (marks || []).forEach(function (m) {
      var el = $(m[0]);
      if (!el) return;
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';

      var b = D.createElement('span');
      b.className = 'bt-mark ' + m[1];
      b.setAttribute('aria-hidden', 'true');
      b.innerHTML = (icons[m[1]] || '') + '<b>' + H(m[2], m[3]) + '</b>';
      el.appendChild(b);

      var done = function () {
        if (b.classList.contains('did')) return;
        b.classList.add('did');
        b.innerHTML = '<b>' + H('해 봄', '해 봤어요') + '</b>';
        setTimeout(function () { b.classList.add('gone'); }, 2600);
      };

      var action = m[4];
      if (action === 'click') {
        el.addEventListener('click', function (e) {
          if (!e.target.closest('.bt-q')) done();
        });
      } else if (action === 'hover') {
        var t = 0;
        el.addEventListener('pointerenter', function () { t = setTimeout(done, 2000); });
        el.addEventListener('pointerleave', function () { clearTimeout(t); });
        el.addEventListener('touchstart', function () { setTimeout(done, 1200); }, { passive: true });
      } else if (action === 'scroll' || typeof IntersectionObserver !== 'undefined') {
        var io = new IntersectionObserver(function (es) {
          es.forEach(function (e) {
            if (e.isIntersecting && (e.intersectionRatio > 0.25 || e.intersectionRatio === undefined)) {
              setTimeout(done, 5000);
              io.disconnect();
            }
          });
        }, { threshold: [0.25] });
        io.observe(el);
      }
    });

    // 2. 설명 물음표 버튼 렌더링
    (help || []).forEach(function (h) {
      var el = $(h[0]);
      if (!el) return;
      if (getComputedStyle(el).position === 'static') el.style.position = 'relative';

      var q = D.createElement('button');
      q.type = 'button';
      q.className = 'bt-q';
      q.setAttribute('aria-label', h[2] + ' — 이 장치 설명 보기');
      q.innerHTML = '<i aria-hidden="true">？</i><b>' + H('이건 무어요', '이건 뭐예요') + '</b>';

      ['click', 'pointerdown', 'pointerup', 'mousedown'].forEach(function (ev) {
        q.addEventListener(ev, function (e) { e.stopPropagation(); });
      });

      q.addEventListener('click', function (e) {
        e.preventDefault();
        if (W && W.ykGuide) {
          W.ykGuide({ sel: h[0], t: [h[1], h[2]], b: [h[3], h[4]] });
        }
      });
      el.appendChild(q);
    });
  }

  return {
    esc: esc,
    H: H,
    setup: setup
  };
});
