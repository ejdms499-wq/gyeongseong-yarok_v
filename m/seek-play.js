/* 심인 광고면 (컴퓨터판) — 그림을 만지면 다음 장면이 이어 그려짐 (assets/seek3 · 재현 그림)
   폰판은 m-seek.js 가 가튼 일을 폰 손짓으로 함 */
(function (W, D) {
  'use strict';
  var $ = function (s, r) { return (r || D).querySelector(s); };
  function fig(name) { var im = $('figure.sk-mini img[src*="seek2/' + name + '."]'); return im ? im.closest('figure') : null; }
  function ad(f) { return f.closest('.sk-ad'); }
  function hint(f, t) { var h = f._h; if (!h) { h = f._h = D.createElement('p'); h.className = 'sk-hint'; f.parentNode.insertBefore(h, f.nextSibling); } h.textContent = t; h.classList.remove('pop'); void h.offsetWidth; h.classList.add('pop'); }
  function upd(a) { var b = $('.sk-upb', a); if (b && !a.classList.contains('upd')) b.click(); }
  function jolt(el) { el.classList.remove('jolt'); void el.offsetWidth; el.classList.add('jolt'); }
  function swap(img, src, cb) {   /* 가튼 그림의 다음 장면이 겹쳐 서서히 떠오름 */
    if (!img) return; var im = new Image();
    im.onload = function () {
      var o = img.cloneNode(); o.removeAttribute('loading'); o.src = src; o.classList.add('xf'); o.style.transform = 'none';
      img.parentNode.insertBefore(o, img.nextSibling);
      requestAnimationFrame(function () { requestAnimationFrame(function () { o.classList.add('on'); }); });
      setTimeout(function () { img.src = src; img.style.transform = ''; o.remove(); if (cb) cb(); }, 1500);
    };
    im.src = src;
  }
  var S3 = 'assets/seek3/';

  /* 원고 — 새를 세 번 쫓으면 */
  (function () { var f = fig('page'); if (!f) return; var n = 0; f.classList.add('sk-play'); hint(f, '☞ 그림 속 새를 쫓으시오 (세 번)');
    f.addEventListener('click', function () { if (n >= 3) return; n++; jolt(f);
      if (n < 3) hint(f, ['퍼덕! 원고를 노치 안소.', '퍼덕퍼덕! 조곰만 더.'][n - 1]);
      else { hint(f, '툭 — 떨어뜨렷소! …그런데 고양이 우에.'); swap($('img', f), S3 + 'page2.jpg', function () { upd(ad(f)); }); } }); })();
  /* 어제의 나 — 등불로 비추어 차즘 */
  (function () { var f = fig('me'); if (!f) return; var found = false, hold = 0; f.classList.add('sk-play', 'lamp'); hint(f, '☞ 마우스를 올려 등불로 어둠을 비추시오 — 「어제의 나」를 차즈시오');
    f.insertAdjacentHTML('beforeend', '<i class="sk-lamp"></i>');
    f.addEventListener('pointermove', function (e) { if (found) return; var r = f.getBoundingClientRect(), x = (e.clientX - r.left) / r.width, y = (e.clientY - r.top) / r.height;
      f.style.setProperty('--lx', (x * 100) + '%'); f.style.setProperty('--ly', (y * 100) + '%'); f.classList.add('lit');
      if (x < .33 && y > .45) { if (!hold) hold = setTimeout(function () { found = true; f.classList.add('found'); hint(f, '차잣소 — 이불 속에서 자고 잇섯소.'); upd(ad(f)); }, 700); } else { clearTimeout(hold); hold = 0; } });
    f.addEventListener('pointerleave', function () { clearTimeout(hold); hold = 0; f.classList.remove('lit'); }); })();
  /* 활자 고양이 */
  (function () { var f = fig('cattype'); if (!f) return; var n = 0, a = ad(f); hint(f, '☞ 고양이 광고를 누르시오 · 0/5');
    a.addEventListener('click', function (e) { if (e.target.closest('.hj') && e.detail === 0) return; n++; f.classList.remove('dash'); void f.offsetWidth; f.classList.add('dash'); hint(f, n < 5 ? '냐! 또 달아낫소 · ' + n + '/5' : '잡앗소 — 「ㄱ」은 입에 물고 잇소.'); }); })();
  /* 우산 — 책상 밑을 들여다봄 */
  (function () { var f = fig('umbrella'); if (!f) return; var done = false, img = $('img', f); f.classList.add('sk-play'); hint(f, '☞ 그림을 눌러 책상 밑을 들여다보시오');
    f.addEventListener('click', function () { if (done) return; done = true; img.style.transformOrigin = '56% 88%'; img.style.transform = 'scale(2.2)';
      setTimeout(function () { hint(f, '셋 다 책상 밑에 잇섯소!'); swap(img, S3 + 'umbrella2.jpg', function () { upd(ad(f)); }); }, 900); }); })();
  /* 편집장 의자 — 멸치로 협상 */
  (function () { var f = fig('chair'); if (!f) return; var n = 0, b = D.createElement('button'); b.type = 'button'; b.className = 'sk-act'; b.innerHTML = '멸치 한 줌 건네기 <i>0</i>';
    hint(f, '☞ 멸치를 건네 의자를 되차즈시오'); var adEl = f.closest('.sk-ad'), ub = adEl && adEl.querySelector('.sk-upb'); /* (1020) 멸치 단추는 칸 맨 아래 — 추보 단추 자리에 나란히 */ if (ub) adEl.insertBefore(b, ub); else f.parentNode.appendChild(b);
    var L = ['고양이가 멸치를 먹엇소. 의자는 그대로요.', '두 줌째. 고양이가 하품을 하오. 의자는 그대로요.', '세 줌째 — 고양이가 「두 줌만 더」라 하오. 협상 결렬.'];
    b.addEventListener('click', function () { if (n >= 3) return; hint(f, L[n]); n++; $('i', b).textContent = n; jolt(f); if (n === 3) { b.disabled = true; swap($('img', f), S3 + 'chair2.jpg'); upd(ad(f)); } }); })();
  /* 고양이 떼 — 가장자리 고양이 다섯을 잡으면 (seek.js 가 부름) */
  W.ykHerd = function () { var f = fig('herd'); if (!f) return; jolt(f); swap($('img', f), S3 + 'herd2.jpg'); hint(f, '다섯 마리 넘엇소 — 본사는 책임지지 아니하오.'); };
  (function () { var f = fig('herd'); if (f) hint(f, '☞ 광고 칸 가장자리에 고양이가 나오거든 누르시오 (다섯)'); })();

  /* 아래칸 */
  function lowImg(id) { var a = D.getElementById(id); return a ? $('.sk-l-img', a) : null; }
  (function () { var f = lowImg('adObit'), b = D.getElementById('obitB'); if (!f || !b) return; var n = 0; f.insertAdjacentHTML('beforeend', '<i class="sk-smoke"></i>');
    b.addEventListener('click', function () { n++; f.style.setProperty('--sm', Math.min(1, n / 6)); f.classList.remove('puff'); void f.offsetWidth; f.classList.add('puff');
      if (n === 10) setTimeout(function () { f.classList.add('alive'); swap($('img', f), S3 + 'obit2.jpg'); }, 300); }); })();
  (function () { var f = lowImg('adWanted'), b = D.getElementById('runB'); if (!f || !b) return; var n = 0, img = $('img', f);
    b.addEventListener('click', function () { n++; img.style.transformOrigin = '50% 40%'; img.style.transform = 'scale(' + (1 + Math.min(6, n) * .14).toFixed(2) + ')'; jolt(f); }); })();
  (function () { var a = D.getElementById('adSorry'), f = lowImg('adSorry'); if (!a || !f) return; var n = 0, T = ['엄지?', '장갑?', '귀?', '김 군?', '…아모도 업섯소', '항의 편지'];
    f.insertAdjacentHTML('beforeend', '<i class="sk-ring"><b></b></i>');
    a.addEventListener('click', function () { if (n >= T.length) return; var r = $('.sk-ring', f); r.classList.remove('on'); void r.offsetWidth; r.classList.add('on'); $('b', r).textContent = T[n]; n++;
      if (n === 5) { r.classList.remove('on'); swap($('img', f), S3 + 'ghost2.jpg'); } }); })();
  (function () { var a = D.getElementById('adKnock'), f = lowImg('adKnock'); if (!a || !f) return; var n = 0;
    a.addEventListener('click', function () { n++; jolt(f); if (n === 3) setTimeout(function () { jolt(f); }, 1500); if (n === 4) swap($('img', f), S3 + 'knock2.jpg'); }); })();
})(window, document);
