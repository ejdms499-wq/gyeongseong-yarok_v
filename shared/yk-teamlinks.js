/* 경성야록 · 길잡이 (yk-teamlinks.js) — 1026
   폴더를 나눠 정리하면서(exhibits/ · cases/) 옛 자리 이름으로 남은 링크를
   제자리(정리판 화면)로 고쳐 줌.
   - 예: seek.html → exhibits/seek/seek.html, case-maria/index.html → cases/maria/index.html
   - 화면 속 모든 링크(a)에 적용 · 새로 생기는 링크도 따라 고침
   - 404.html 도 같은 표(window.ykTeamPath)를 씀 */
(function (W, D) {
  'use strict';
  var EX = ['shop', 'seek', 'napryang', 'fair', 'expo', 'hogoe', 'newsroom', 'adcollection', 'appendix'];
  var CASES = ['jukcheomjeong', 'maria', 'sonkijeong', 'baekbaekgyo'];
  var TOP = ['index.html', 'opening.html', 'case-map.html', 'about.html', 'class.html', 'reader-room.html', 'dansin.html', '404.html'];

  /* 사이트 맨 위 주소 (이 파일 = <맨 위>/shared/yk-teamlinks.js) */
  var ROOT = (function () {
    try {
      var s = D.currentScript && D.currentScript.src;
      if (s) return new URL('../', s).href;
    } catch (e) {}
    var p = location.pathname, i = p.indexOf('/gyeongseong-yarok_v/');
    return location.origin + (i >= 0 ? p.slice(0, i) + '/gyeongseong-yarok_v/' : '/');
  })();

  var VALID = {};
  TOP.forEach(function (t) { VALID[t] = 1; });
  EX.forEach(function (k) { VALID['exhibits/' + k + '/' + k + '.html'] = 1; });
  CASES.forEach(function (c) { VALID['cases/' + c + '/index.html'] = 1; VALID['cases/' + c + '/m.html'] = 1; });
  VALID['sikjasil/index.html'] = 1;

  /* 맨 위 기준 경로(rel) → 정리판 경로 (고칠 필요 없으면 null) */
  function teamPath(rel) {
    rel = rel.replace(/^\/+/, '');
    if (!rel || rel === 'index.html') return null;
    if (VALID[rel]) return null;
    var phone = /^m\//.test(rel);
    var sub = phone ? rel.slice(2) : rel;
    /* 폰판 전용 화면(m-*.html 등)은 그대로 둠 */
    if (phone && (/^m-/.test(sub) || /\/m\.html$/.test(sub) || /^case\//.test(sub))) return null;
    var m = sub.match(/(?:^|\/)case-(jukcheomjeong|maria|sonkijeong|baekbaekgyo)\/(index|m)\.html$/);
    if (m) return 'cases/' + m[1] + '/' + m[2] + '.html';
    m = sub.match(/(?:^|\/)cases\/(jukcheomjeong|maria|sonkijeong|baekbaekgyo)\/(index|m)\.html$/);
    if (m) return 'cases/' + m[1] + '/' + m[2] + '.html';
    var base = sub.split('/').pop();
    var name = base.replace(/\.html$/, '');
    if (EX.indexOf(name) >= 0) return 'exhibits/' + name + '/' + name + '.html';
    if (TOP.indexOf(base) >= 0) return base;
    if (phone) return null;
    return null;
  }

  function fix(href) {
    try {
      var u = new URL(href, D.baseURI);
      if (u.href.indexOf(ROOT) !== 0) return null;
      if (!/\.html$/.test(u.pathname)) return null;
      var rel = decodeURIComponent(u.pathname.slice(new URL(ROOT).pathname.length));
      var t = teamPath(rel);
      return t ? ROOT + t + u.search + u.hash : null;
    } catch (e) { return null; }
  }

  function sweep(root) {
    var as = (root || D).querySelectorAll ? (root || D).querySelectorAll('a[href]') : [];
    for (var i = 0; i < as.length; i++) {
      var a = as[i], h = a.getAttribute('href');
      if (!h || h.charAt(0) === '#' || /^(javascript|mailto|tel):/i.test(h)) continue;
      var f = fix(h);
      if (f) a.setAttribute('href', f);
    }
  }

  W.ykTeamPath = teamPath;
  W.ykTeamFix = fix;
  if (W.__ykTeamOnly) return;   /* 404.html 은 표만 씀 */

  function start() {
    sweep(D);
    try {
      new MutationObserver(function (ms) {
        for (var i = 0; i < ms.length; i++) {
          var n = ms[i].addedNodes;
          for (var j = 0; j < n.length; j++) if (n[j].nodeType === 1) { if (n[j].tagName === 'A') sweep(n[j].parentNode || D); else sweep(n[j]); }
          if (ms[i].type === 'attributes' && ms[i].target.tagName === 'A') sweep(ms[i].target.parentNode || D);
        }
      }).observe(D.documentElement, { childList: true, subtree: true, attributes: true, attributeFilter: ['href'] });
    } catch (e) {}
  }
  /* 누르는 순간에도 한 번 더 */
  D.addEventListener('click', function (e) {
    var a = e.target && e.target.closest ? e.target.closest('a[href]') : null;
    if (!a) return;
    var f = fix(a.getAttribute('href'));
    if (f) a.setAttribute('href', f);
  }, true);
  if (D.readyState !== 'loading') start(); else D.addEventListener('DOMContentLoaded', start);
})(window, document);
