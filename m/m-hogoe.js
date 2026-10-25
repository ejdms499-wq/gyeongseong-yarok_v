/* 독자 호외 폰판 — 단계 넘기기 · 손잡이 끌어 찍기 · 빨랫줄 (만드는 장치는 hogoe.js · hg-photo.js) */
(function (W, D) {
  'use strict';
  function start() {
  var $ = function (s, r) { return (r || D).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || D).querySelectorAll(s)); };
  var buzz = function (p) { if (navigator.vibrate) try { navigator.vibrate(p); } catch (e) {} };
  var tone = function (k) { if (W.mb && W.mb.tone) W.mb.tone(k); };

  var desk = $('#mhgDesk'), nav = $('#mhgSteps');
  var hp = $('#hpPart'); if (hp) hp.setAttribute('data-step', '사진');
  var parts = $$('.h2-part', desk);
  var PIC = { '활자': 'type', '사진': 'photo', '종이': 'paper', '잉크': 'ink', '원고': 'write', '찍기': 'press' };
  parts.forEach(function (p) { var k = PIC[p.dataset.step]; if (!k) return; var f = D.createElement('figure'); f.className = 'mhg-hd'; f.innerHTML = '<img src="assets/hg3/m_hg_' + k + '.jpg" alt=""><span class="rt">그림 · 재현</span>'; f.firstChild.onload = function () { fit(); }; p.insertBefore(f, p.firstChild); });
  nav.innerHTML = parts.map(function (p, i) { return '<button type="button" data-i="' + i + '"><b>' + (i + 1) + '</b>' + p.dataset.step + '</button>'; }).join('');
  var tabs = $$('button', nav), cur = -1;
  parts.forEach(function (p, i) {
    if (i < parts.length - 1) { var n = D.createElement('button'); n.type = 'button'; n.className = 'mhg-next'; n.innerHTML = '다음 — ' + parts[i + 1].dataset.step + ' →'; n.onclick = function () { go(i + 1); }; p.appendChild(n); }
  });
  function go(i) { desk.scrollTo({ left: parts[i].offsetLeft - desk.offsetLeft, behavior: 'smooth' }); }
  function fit() { var p = parts[Math.round(desk.scrollLeft / desk.clientWidth)]; if (p) desk.style.height = p.scrollHeight + 'px'; }
  function mark() { fit(); var k = Math.round(desk.scrollLeft / desk.clientWidth); if (k === cur) return; cur = k; tabs.forEach(function (t, j) { t.classList.toggle('on', j === k); t.classList.toggle('past', j < k); }); var t = tabs[k]; if (t) nav.scrollTo({ left: t.offsetLeft - nav.clientWidth / 2 + t.offsetWidth / 2, behavior: 'smooth' }); tone('tick'); }
  desk.addEventListener('scroll', function () { W.requestAnimationFrame(mark); }, { passive: true }); mark();
  nav.addEventListener('click', function (e) { var b = e.target.closest('button[data-i]'); if (b) go(+b.dataset.i); });
  /* 고르면 살짝 떨림 */
  desk.addEventListener('click', function (e) { if (e.target.closest('button[data-v], .types button, .hp-th, [data-l], [data-s]')) buzz(8); setTimeout(fit, 60); });
  W.addEventListener('resize', fit); setTimeout(fit, 300);

  $('#mhgGo').onclick = function () { var t = nav.getBoundingClientRect().top + W.scrollY - 48; W.scrollTo({ top: t, behavior: 'smooth' }); };

  /* ── 윤전기 손잡이 — 아래로 끌어 내리면 찍힘 ── */
  var lv = $('#mhgLever'), knob = $('#mhgKnob'), fill = $('#mhgFill'), press = $('#hgPress'), y0 = null, k = 0, H = 0;
  function setK(v) { k = Math.max(0, Math.min(1, v)); knob.style.transform = 'translate(-50%,' + (k * H).toFixed(1) + 'px)'; fill.style.transform = 'scaleY(' + k.toFixed(3) + ')'; }
  knob.addEventListener('pointerdown', function (e) { if (press.disabled) return; e.preventDefault(); H = lv.querySelector('.lv-rail').clientHeight - knob.offsetHeight; y0 = e.clientY - k * H; knob.setPointerCapture && knob.setPointerCapture(e.pointerId); knob.classList.add('hold'); buzz(10); });
  knob.addEventListener('pointermove', function (e) { if (y0 == null) return; e.preventDefault(); var before = Math.floor(k * 6); setK((e.clientY - y0) / H); if (Math.floor(k * 6) !== before) { buzz(6); tone('tick'); } if (k >= .97) fire(); });
  function release() { if (y0 == null) return; y0 = null; knob.classList.remove('hold'); knob.style.transition = 'transform .45s cubic-bezier(.3,1.4,.5,1)'; fill.style.transition = 'transform .45s ease'; setK(0); setTimeout(function () { knob.style.transition = ''; fill.style.transition = ''; }, 460); }
  knob.addEventListener('pointerup', release); knob.addEventListener('pointercancel', release);
  knob.addEventListener('click', function () { if (k < .1 && !press.disabled) { lv.classList.remove('nudge'); void lv.offsetWidth; lv.classList.add('nudge'); } });
  function fire() { if (press.disabled) return; release(); buzz([40, 60, 40, 60, 40, 60, 120]); press.click(); toSheet(); }
  press.addEventListener('click', function () { setTimeout(toSheet, 20); });
  function toSheet() { var s = $('#mhgSheet'); W.scrollTo({ top: s.getBoundingClientRect().top + W.scrollY - 52, behavior: 'smooth' }); }

  /* ── 찍은 뒤 아래 단추줄 — 보일 때 본문이 가려지지 안케 ── */
  var after = $('#hgAfter');
  new MutationObserver(function () { D.body.classList.toggle('mhg-done', !after.hidden); if (!after.hidden) { buzz(30); } }).observe(after, { attributes: true, attributeFilter: ['hidden'] });
  var shm = $('#hgShareBox');
  new MutationObserver(function () { D.documentElement.classList.toggle('mb-lock', !shm.hidden); }).observe(shm, { attributes: true, attributeFilter: ['hidden'] });

  /* ── 빨랫줄 — 이 폰에서 널은 호외 ── */
  function list() { try { return JSON.parse(localStorage.getItem('yk-hogoe') || '[]') || []; } catch (e) { return []; } }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function paintLine() {
    var L = list(), row = $('#mhgRow');
    row.innerHTML = L.length ? L.map(function (d, i) { return '<a class="ln-c ' + esc(d.style || 'classic') + '" href="m-hogoe.html?see=' + i + '" style="--r:' + ((i % 2 ? 1 : -1) * (1.5 + i % 3)) + 'deg"><i class="pin"></i><small>' + esc(d.no || '') + '</small><b>' + esc(d.head || '') + '</b><em>' + esc(d.by || '') + '</em></a>'; }).join('')
      : '<p class="ln-0">아즉 널린 호외가 업소. 한 장 찍어 「널기」를 누르시압.</p>';
  }
  W.HG_LINE = function () { setTimeout(function () { paintLine(); var l = $('#mhgLine'); W.scrollTo({ top: l.getBoundingClientRect().top + W.scrollY - 60, behavior: 'smooth' }); }, 60); return '빨랫줄에 널엇소 — 아래를 보시압.'; };
  paintLine();

  /* 받은 호외(#h=) · 널린 호외(?see=) 로 드러오면 바로 지면으로 */
  if (/#h=/.test(location.hash) || /[?&]see=/.test(location.search)) setTimeout(toSheet, 400);
  }
  if (D.readyState === 'loading') D.addEventListener('DOMContentLoaded', function () { setTimeout(start, 0); }); else setTimeout(start, 0);
})(window, document);
