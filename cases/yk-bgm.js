/* 경성야록 · 들어오면 배경음악이 저절로 (1013)
   · 배경음악이 따로 업든 면(본지 · 박람회 · 편집국 · 호외 · 상점 · 부록)에 같은 곡조 하나를 틂
   · 브라우저가 소리를 막으면 → 처음 누르거나 · 키를 치거나 · 화면을 만지는 순간 바로 틂
   · 면을 옮겨도 곡이 끊긴 자리에서 이어서 (같은 창 안)
   · 오른쪽 아래 작은 축음기 단추로 끄고 켬 — 끄면 이 창에선 다시 저절로 켜지지 안음
   · 다른 소리(라디오 · 창가 · 영상 · 낭독)가 나면 잠시 멈췃다가, 끝나면 다시 이어 틂 */
(function () {
  'use strict';
  var W = window, D = document;
  if (W.__ykBgm) return; W.__ykBgm = true;
  var BASE = (function () {
    var m = location.pathname.replace(/\\/g, '/');
    if (/\/(cases|exhibits)\/[^/]+\//.test(m)) return '../../';
    if (/\/(cases|exhibits|sikjasil|radio-device)\//.test(m)) return '../';
    return '';
  })();
  var SRC = BASE + 'cases/jukcheomjeong/audio/jukcheomjeong-bgm.mp3';
  var VOL = .32, KEY_T = 'yk-bgm-t', KEY_OFF = 'yk-bgm-off';
  var off = false; try { off = sessionStorage.getItem(KEY_OFF) === '1'; } catch (e) {}
  var au = new Audio(SRC); au.loop = true; au.preload = 'auto'; au.volume = 0; au.setAttribute('data-yk-bgm', '');
  try { var t0 = parseFloat(sessionStorage.getItem(KEY_T)); if (t0 > 0) au.currentTime = t0; } catch (e) {}
  au.addEventListener('loadedmetadata', function () { try { var t = parseFloat(sessionStorage.getItem(KEY_T)); if (t > 0 && t < au.duration) au.currentTime = t; } catch (e) {} });

  var fadeT = 0;
  function fade(to, ms) { clearInterval(fadeT); var from = au.volume, n = 0, N = Math.max(1, Math.round(ms / 40)); fadeT = setInterval(function () { n++; au.volume = Math.max(0, Math.min(1, from + (to - from) * n / N)); if (n >= N) { clearInterval(fadeT); if (to === 0) au.pause(); } }, 40); }
  var held = false;   // 다른 소리 때문에 잠시 멈춤
  function play() { if (off || held) return; var p = au.play(); if (p && p.then) p.then(function () { fade(VOL, 1600); sync(); }, function () {}); else { fade(VOL, 1600); sync(); } }
  function stop() { fade(0, 600); sync(); }

  /* 단추 */
  var css = D.createElement('style');
  css.textContent = '.yk-bgm{position:fixed;right:16px;bottom:16px;z-index:2147481500;display:inline-flex;align-items:center;gap:7px;height:32px;padding:0 12px 0 9px;border:1px solid #3a3128;border-radius:16px;' +
    'background:#ece2cbee;color:#1e1913;font:700 12px/1 "Nanum Myeongjo","Noto Serif KR",serif;letter-spacing:.1em;cursor:pointer;box-shadow:0 6px 14px -8px rgba(0,0,0,.6)}' +
    '.yk-bgm i{position:relative;width:14px;height:14px;border-radius:50%;background:radial-gradient(circle,#ece2cb 0 18%,#1e1913 20% 100%)}' +
    '.yk-bgm.on i{animation:ykBgmSpin 2.4s linear infinite}@keyframes ykBgmSpin{to{transform:rotate(360deg)}}' +
    '.yk-bgm{padding:0 9px;gap:0}.yk-bgm span{max-width:0;overflow:hidden;white-space:nowrap;transition:max-width .4s,margin .4s}' +
    '.yk-bgm:hover span,.yk-bgm:focus-visible span{max-width:8em;margin-left:7px}' +
    '.yk-bgm:not(.on){opacity:.7}.yk-bgm:hover{opacity:1}' +
    '@media (prefers-reduced-motion:reduce){.yk-bgm.on i{animation:none}}@media print{.yk-bgm{display:none}}';
  D.head.appendChild(css);
  var btn = D.createElement('button'); btn.type = 'button'; btn.className = 'yk-bgm';
  function sync() { var on = !off && !au.paused; btn.classList.toggle('on', on); btn.innerHTML = '<i aria-hidden="true"></i><span>' + (on ? '축음긔 끄기' : '축음긔 켜기') + '</span>'; btn.setAttribute('aria-pressed', on ? 'true' : 'false'); btn.title = on ? '배경음악 끄기' : '배경음악 켜기'; }
  btn.addEventListener('click', function (e) {
    e.stopPropagation(); off = !(off || au.paused) ? true : false;
    try { sessionStorage.setItem(KEY_OFF, off ? '1' : '0'); } catch (x) {}
    if (off) stop(); else { held = false; play(); }
  });
  au.addEventListener('play', sync); au.addEventListener('pause', sync);
  function mount() { if (!btn.parentNode) D.body.appendChild(btn); sync(); }
  if (D.body) mount(); else D.addEventListener('DOMContentLoaded', mount);

  /* 들어오자마자 · 막히면 첫 손길에 */
  function first(e) {
    if (e && e.target && e.target.closest && e.target.closest('.yk-bgm')) return;
    ['pointerdown', 'keydown', 'touchstart', 'click'].forEach(function (t) { D.removeEventListener(t, first, true); });
    if (au.paused) play();
  }
  ['pointerdown', 'keydown', 'touchstart', 'click'].forEach(function (t) { D.addEventListener(t, first, true); });
  play();

  /* 다른 소리가 나면 비켜 줌 */
  var others = new Set();
  D.addEventListener('play', function (e) {
    var m = e.target; if (m === au || !(m instanceof HTMLMediaElement) || m.muted || m.volume === 0) return;
    others.add(m); held = true; if (!au.paused) fade(0, 500);
  }, true);
  function release(e) { var m = e.target; if (!others.has(m)) return; others.delete(m); if (others.size) return; held = false; setTimeout(function () { if (!others.size) play(); }, 900); }
  D.addEventListener('pause', release, true); D.addEventListener('ended', release, true);
  W.ykBgmHold = function (v) { held = !!v; if (v) fade(0, 500); else play(); };   // 다른 코드가 쓸 수 잇게

  /* 면을 옮길 때 곡 위치를 기억 */
  function save() { try { if (!au.paused) sessionStorage.setItem(KEY_T, String(au.currentTime)); } catch (e) {} }
  W.addEventListener('pagehide', save); setInterval(save, 2000);
  D.addEventListener('visibilitychange', function () { if (D.hidden) save(); });
})();
