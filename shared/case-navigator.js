/* =========================================================
   경성야록 4대 사건 수사 일지 퀵 네비게이터 (Quick Case Drawer)
   - 4대 사건 및 3D 가상 식자실, 본지 간의 원클릭 쾌속 이동
   - 경량 슬림 탭 & Scroll-Hide & 단일 토스트 가드
   ========================================================= */

(function () {
  'use strict';

  function initCaseNavigator() {
    if (document.getElementById('caseNavDrawer')) return;

    // 1. document.currentScript 기반 동적 루트 경로 계산
    var root = (function () {
      try {
        var s = document.currentScript && document.currentScript.src;
        if (s) {
          return s.replace(/shared\/case-navigator\.js(\?.*)?$/, '');
        }
      } catch (e) {}
      var p = window.location.pathname.replace(/\\/g, '/');
      if (/\/(cases|exhibits)\/[^/]+\//.test(p)) return '../../';
      if (/\/(cases|exhibits|sikjasil|radio-device)\//.test(p)) return '../';
      return './';
    })();

    var path = window.location.pathname.replace(/\\/g, '/');

    var isMobile = (function () {
      if (window.matchMedia && window.matchMedia('(max-width: 600px)').matches) return true;
      if (path.indexOf('/m.html') !== -1) return true;
      return false;
    })();
    var casePage = isMobile ? 'm.html' : 'index.html';

    var cases = [
      {
        id: 'jukcheom',
        match: 'jukcheomjeong',
        readKey: 'jk',
        num: '사건 01',
        section: '사회면',
        title: "죽첨정 '단두 유아' 사건 (1933)",
        desc: "새벽 쓰레기장에서 발견된 어린 주검. 말이 사람을 죽이기까지의 비극.",
        url: root + 'cases/jukcheomjeong/' + casePage
      },
      {
        id: 'maria',
        match: 'maria',
        readKey: 'maria',
        num: '사건 02',
        section: '사회면',
        title: "부산 마리아 참살 사건 (1931)",
        desc: "철도국 관사에서 발생한 의문의 살인. 경찰서에 날아든 괴투서 두 통.",
        url: root + 'cases/maria/' + casePage
      },
      {
        id: 'sonkijeong',
        match: 'sonkijeong',
        readKey: 'sk',
        num: '사건 03',
        section: '문화예술면',
        title: "손기정과 지워진 일장기 (1936)",
        desc: "베를린 올림픽 마라톤 제패, 가슴의 일장기를 지운 278일간의 필화 사건.",
        url: root + 'cases/sonkijeong/' + casePage
      },
      {
        id: 'baekbaekgyo',
        match: 'baekbaekgyo',
        readKey: 'bb',
        num: '사건 04',
        section: '사회·경제면',
        title: "백백교 비밀 동굴 사건 (1937)",
        desc: "구원을 미끼로 수백 명을 살해한 사교단. 지하 비밀 본부의 잔혹한 진실.",
        url: root + 'cases/baekbaekgyo/' + casePage
      },
      {
        id: 'sikjasil',
        match: 'sikjasil',
        num: '3D 가상 공간',
        section: '체험 수사',
        title: "3D 인쇄소 식자실 (活字室)",
        desc: "1930년대 목조 식자실에서 사라진 활자와 시계 암호를 수색하고 탈출하세요.",
        url: root + 'sikjasil/index.html',
        special: 'special-sikja'
      },
      {
        id: 'main',
        match: 'index.html',
        num: '본지 1면',
        section: '종합 지면',
        title: "경성야록 본지 (京城野錄)",
        desc: "1930년대 지면 전체 개요 및 당시 신문 기사 목차로 돌아갑니다.",
        url: root + 'index.html'
      }
    ];

    // 현재 활성화된 페이지 판별
    var activeId = '';
    for (var i = 0; i < cases.length; i++) {
      if (path.indexOf(cases[i].match) !== -1) {
        activeId = cases[i].id;
        break;
      }
    }
    if (!activeId && (path.endsWith('/') || path.endsWith('index.html'))) {
      activeId = 'main';
    }

    // 2. 스타일시트 동적 주입
    if (!document.querySelector('link[href*="case-navigator.css"]')) {
      var link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = root + 'shared/case-navigator.css';
      document.head.appendChild(link);
    }

    // 3. 플로팅 슬림 탭 트리거 버튼 생성
    var trigger = document.createElement('button');
    trigger.id = 'caseNavTrigger';
    trigger.className = 'case-nav-trigger';
    trigger.setAttribute('type', 'button');
    trigger.setAttribute('aria-label', '4대 사건 수사 일지 열기');
    trigger.innerHTML = '<span class="icon">📂</span><span class="label">수사 일지</span><span class="tag">4대 사건</span>';
    document.body.appendChild(trigger);

    // 스크롤 시 자동 숨김 (Scroll-Hide) — 안내 중 보호 및 우측 상단 마우스 감지
    var lastScrollY = window.scrollY;
    var userScrolled = false;

    window.addEventListener('wheel', function () { userScrolled = true; }, { passive: true });
    window.addEventListener('touchmove', function () { userScrolled = true; }, { passive: true });
    window.addEventListener('keydown', function (e) {
      if (['ArrowDown', 'ArrowUp', 'PageDown', 'PageUp', 'Space'].indexOf(e.key) !== -1) {
        userScrolled = true;
      }
    }, { passive: true });

    function isGuideActive() {
      return Boolean(document.querySelector('.ykg-box, .ykg-backdrop, .ykg-run') || document.body.classList.contains('ykg-run'));
    }

    window.addEventListener('scroll', function () {
      var currentY = window.scrollY;
      var bgm = document.querySelector('.bgm-toggle, .yk-bgm');

      // 안내가 떠 있는 동안이나 자동 스크롤에는 숨기지 않음
      if (isGuideActive() || !userScrolled) {
        trigger.classList.remove('scroll-hidden');
        if (bgm) bgm.classList.remove('scroll-hidden');
        lastScrollY = currentY;
        return;
      }

      // 사람이 직접 충분히(200px 이상) 내릴 때만 숨김
      if (currentY > 200 && currentY > lastScrollY) {
        trigger.classList.add('scroll-hidden');
        if (bgm) bgm.classList.add('scroll-hidden');
      } else {
        trigger.classList.remove('scroll-hidden');
        if (bgm) bgm.classList.remove('scroll-hidden');
      }
      lastScrollY = currentY;
    }, { passive: true });

    // 마우스를 우측 상단에 가져가면 다시 보이게
    window.addEventListener('mousemove', function (e) {
      if (e.clientX >= window.innerWidth - 200 && e.clientY <= 120) {
        trigger.classList.remove('scroll-hidden');
        var bgm = document.querySelector('.bgm-toggle, .yk-bgm');
        if (bgm) bgm.classList.remove('scroll-hidden');
      }
    }, { passive: true });

    // 4. 오버레이 및 드로어 생성
    var overlay = document.createElement('div');
    overlay.className = 'case-nav-overlay';
    overlay.id = 'caseNavOverlay';

    var drawer = document.createElement('aside');
    drawer.className = 'case-nav-drawer';
    drawer.id = 'caseNavDrawer';
    drawer.setAttribute('aria-label', '4대 사건 수사 일지 퀵 서랍');

    // 식자실 유물 해금 여부 판별
    function getRelicCount() {
      try {
        var r = JSON.parse(localStorage.getItem('yk-relics') || '[]');
        if (Array.isArray(r)) return r.length;
      } catch (e) {}
      return 0;
    }

    function isSikjaUnlocked() {
      if (getRelicCount() >= 4) return true;
      try {
        if (sessionStorage.getItem('yk-relics-done') === '1' || localStorage.getItem('yk-sikjasil-unlocked') === '1') return true;
      } catch (e) {}
      return false;
    }

    var unlocked = isSikjaUnlocked();
    var relicCount = getRelicCount();
    var relicTooltip = '유물 ' + relicCount + '/4 수집됨 — 각 사건의 숨겨진 단서를 찾으시오';

    function getReadCases() {
      try { return JSON.parse(localStorage.getItem('yk-read') || '{}') || {}; } catch (e) { return {}; }
    }

    function renderCards() {
      var readMap = getReadCases();
      return cases.map(function (c) {
        var isActive = (c.id === activeId);
        var isRead = c.readKey && !!readMap[c.readKey];
        if (c.id === 'sikjasil' && !unlocked) {
          return '<div class="case-nav-card locked-easter-egg" id="lockedSikjaCard" role="button" tabindex="0" title="' + relicTooltip + '" aria-disabled="true">' +
                   '<div class="case-nav-card-top">' +
                     '<span class="case-nav-card-badge">3D 가상 공간 · 잠김</span>' +
                     '<span class="lock-stamp">🔒 유물 ' + relicCount + '/4 수집</span>' +
                   '</div>' +
                   '<h3 class="case-nav-card-title">3D 활판 식자실 (비밀 공간)</h3>' +
                   '<p class="case-nav-card-desc">깊은 밤 인쇄소의 문은 굳게 닫혀 있소. 지면 어딘가에 떨어진 식자공의 소지품 4개를 모두 수습하거나, 신문 기사 속 숨겨진 암호를 푼 자에게만 비밀의 문이 열리오.</p>' +
                   '<div class="hint-box">🗝️ <b>이스터 에그 힌트:</b> 본지 기사 위에 마우스를 차분히 머물러 보시압. 사라진 소지품 4개를 모으면 문이 열리오. (현재 ' + relicCount + ' / 4 수습됨)</div>' +
                 '</div>';
        }
        var cls = 'case-nav-card' + (isActive ? ' active' : '') + (c.special ? ' ' + c.special : '');
        var stampHtml = isActive
          ? '<span class="case-nav-stamp">수사 중</span>'
          : (isRead ? '<span class="case-nav-stamp done" style="color:#2d7a52;border-color:#2d7a52">취재 완료</span>' : '');
        return '<a href="' + c.url + '" class="' + cls + '">' +
                 '<div class="case-nav-card-top">' +
                   '<span class="case-nav-card-badge">' + c.num + ' · ' + c.section + '</span>' +
                   stampHtml +
                 '</div>' +
                 '<h3 class="case-nav-card-title">' + c.title + '</h3>' +
                 '<p class="case-nav-card-desc">' + c.desc + '</p>' +
               '</a>';
      }).join('');
    }

    var cardsHtml = renderCards();

    drawer.innerHTML =
      '<div class="case-nav-header">' +
        '<h2><span>📜</span>京城野錄 4大 事件 搜査 誌</h2>' +
        '<p>1930년대 4대 사건 수사 맵 및 3D 가상 식자실로 즉시 이동합니다.</p>' +
        '<button type="button" class="case-nav-close" id="caseNavClose">✕ 닫기</button>' +
      '</div>' +
      '<div class="case-nav-body">' +
        cardsHtml +
      '</div>' +
      '<div class="case-nav-footer">' +
        '<span>단축키: ESC 키로 닫기 | 바로가기 클릭 시 즉시 이동</span>' +
      '</div>';

    document.body.appendChild(overlay);
    document.body.appendChild(drawer);

    function openDrawer() {
      var bodyEl = drawer.querySelector('.case-nav-body');
      if (bodyEl) bodyEl.innerHTML = renderCards();
      overlay.classList.add('open');
      drawer.classList.add('open');
      trigger.setAttribute('aria-expanded', 'true');
    }

    function closeDrawer() {
      overlay.classList.remove('open');
      drawer.classList.remove('open');
      trigger.setAttribute('aria-expanded', 'false');
    }

    trigger.addEventListener('click', function (e) {
      e.stopPropagation();
      if (drawer.classList.contains('open')) closeDrawer();
      else openDrawer();
    });

    document.getElementById('caseNavClose').addEventListener('click', closeDrawer);
    overlay.addEventListener('click', closeDrawer);

    // 단일 토스트 가드
    var lockedCard = document.getElementById('lockedSikjaCard');
    if (lockedCard) {
      lockedCard.addEventListener('click', function (e) {
        e.preventDefault();
        var oldToast = document.getElementById('caseNavToast');
        if (oldToast) oldToast.remove();

        var toast = document.createElement('div');
        toast.id = 'caseNavToast';
        toast.style.cssText = 'position:fixed;bottom:30px;left:50%;transform:translateX(-50%);background:#1f160e;color:#eedcba;border:1.5px solid #8b251b;padding:12px 24px;border-radius:4px;font-family:"Nanum Myeongjo",serif;font-size:13.5px;font-weight:700;box-shadow:0 6px 25px rgba(0,0,0,0.85);z-index:2147483647;pointer-events:none;transition:opacity 0.4s ease;';
        toast.innerHTML = '🔒 <b>' + relicTooltip + '</b>';
        document.body.appendChild(toast);

        setTimeout(function () {
          toast.style.opacity = '0';
          setTimeout(function () { toast.remove(); }, 400);
        }, 2800);
      });
    }

    window.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && drawer.classList.contains('open')) {
        closeDrawer();
      }
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initCaseNavigator);
  } else {
    initCaseNavigator();
  }
})();
