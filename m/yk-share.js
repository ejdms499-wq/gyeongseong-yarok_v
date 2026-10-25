/* 경성야록 · 보내기 한 줄 (yk-share.js)
   폰의 공유 창(카카오톡 · 인스타그램 · 문자 · 메일 …)으로 그림째 보냄.
   카카오톡 · 인스타 안에서 연 창(앱 속 브라우저)은 공유 창이 막혀 잇으니 → 크롬 · 사파리로 열도록 안내.
   window.ykShare = { can(files), share({files,title,text,url}) → 'shared' | 'cancel' | 'fail' | 'none', inApp, android, ios, outUrl(), hintHtml() } */
(function (W, D) {
  'use strict';
  var UA = navigator.userAgent || '';
  var android = /Android/i.test(UA), ios = /iPhone|iPad|iPod/i.test(UA) || (/Macintosh/.test(UA) && 'ontouchend' in D);
  var inApp = /KAKAOTALK|Instagram|NAVER\(inapp|FBAN|FBAV|FB_IAB|Line\/|DaumApps|everytimeApp|; wv\)/i.test(UA);
  function can(files) {
    try {
      if (!navigator.share) return false;
      if (files && files.length) return !!(navigator.canShare && navigator.canShare({ files: files }));
      return true;
    } catch (e) { return false; }
  }
  function share(o) {
    o = o || {};
    return new Promise(function (ok) {
      try {
        var f = o.files && o.files.length ? o.files : null;
        var done = function () { ok('shared'); }, bad = function (e) { ok(e && e.name === 'AbortError' ? 'cancel' : 'fail'); };
        if (f && can(f)) return navigator.share({ files: f, title: o.title || '경성야록', text: o.text || '' }).then(done, bad);
        if (navigator.share) return navigator.share({ title: o.title || '경성야록', text: o.text || '', url: o.url || location.href }).then(done, bad);
      } catch (e) {}
      ok('none');
    });
  }
  /* 앱 속 창에서 바깥 브라우저로 — 안드로이드는 크롬을 바로 부름 */
  function outUrl(u) {
    u = u || location.href;
    if (android) { try { var a = D.createElement('a'); a.href = u; return 'intent://' + a.host + a.pathname + a.search + '#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=' + encodeURIComponent(u) + ';end'; } catch (e) {} }
    return u;
  }
  function hintHtml(u) {
    if (android) return '카카오톡 · 인스타 안에서 연 창이라 보내기가 막혀 잇소. <a class="yk-out" href="' + outUrl(u) + '">크롬으로 열기 →</a> 한 뒤 다시 누르시압.';
    if (ios) return '앱 안에서 연 창이라 보내기가 막혀 잇소. 아래 <b>⋯</b> 또는 <b>공유</b> 단추에서 「Safari로 열기」 한 뒤 다시 누르시압.';
    return '이 브라우저에는 공유 창이 업소. 그림을 저장해 올려 주시압.';
  }
  W.ykShare = { can: can, share: share, inApp: inApp, android: android, ios: ios, outUrl: outUrl, hintHtml: hintHtml };
})(window, document);
