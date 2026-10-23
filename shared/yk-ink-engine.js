/**
 * 경성야록 (京城野錄) — 신문 활자 먹물 번짐(Ink Spread) 및 한자↔한글 전환 통합 엔진
 *
 * [엄격한 디자인 보존 규칙]
 * 1. 겹쳐 그리기(inline-grid)는 오직 '짧은 한 줄짜리 .hj'(태그 없고 12자 이하)에만 적용.
 * 2. 세로 제목(.vhead, .vc)은 엔진의 그리드 슬롯화에서 완전히 배제하고, index.html 고유의 세로(i태그) 배치 방식(setV)을 그대로 유지.
 * 3. 긴 글·여러 줄·문단(p, h2, h3, .desc, .sw, .hj.l 등)은 grid/nowrap 금지, 원래 줄바꿈·배치 그대로 부드러운 페이드 교체만 수행.
 * 4. 원본 HTML(안쪽 태그 포함)을 온전히 보존.
 * 5. 요청되지 않은 임의 UI(버튼 등) 주입 금지.
 */
(function (window, document) {
  'use strict';

  /* ── 0. 타이밍 상수 ── */
  var HOVER_DELAY = 150;      // 마우스를 올리고 머물러야 전환 시작 (ms)
  var FADE_MS = 250;          // 긴 글 블러/페이드 시간 (ms)
  var DISSOLVE_MS = 450;      // 짧은 단어 먹물 번짐 시간 (ms)
  var LEAVE_DELAY = 600;      // 마우스를 뗀 뒤 복귀 대기 시간 (ms)

  if (window.__ykInkEngineLoaded) return;
  window.__ykInkEngineLoaded = true;

  var isReduced = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var dissolveSec = isReduced ? '0.01s' : (DISSOLVE_MS / 1000).toFixed(2) + 's';
  var fadeSec = isReduced ? '0.01s' : (FADE_MS / 1000).toFixed(2) + 's';

  /* ── 1. 최소한의 전용 스타일 (기존 레이아웃 영향 0) ── */
  var style = document.createElement('style');
  style.id = 'yk-ink-style';
  style.textContent = [
    '/* 짧은 한 줄짜리 .hj 전용 겹쳐 그리기 슬롯 */',
    '.yk-ink-slot {',
    '  display: inline-grid;',
    '  grid-template-columns: 1fr;',
    '  grid-template-rows: 1fr;',
    '  vertical-align: baseline;',
    '  align-items: center;',
    '  cursor: help;',
    '  position: relative;',
    '}',
    '.yk-ink-slot > .yk-ink-layer {',
    '  grid-area: 1 / 1;',
    '  pointer-events: none;',
    '  white-space: nowrap;',
    '  transition: opacity ' + dissolveSec + ' ease, filter ' + dissolveSec + ' ease;',
    '}',
    '.yk-ink-slot > .yk-ink-hj { opacity: 1; filter: blur(0); }',
    '.yk-ink-slot > .yk-ink-ko { opacity: 0; filter: blur(3px); }',
    '.yk-ink-slot.yk-ink-show-ko > .yk-ink-hj { opacity: 0; filter: blur(3px); }',
    '.yk-ink-slot.yk-ink-show-ko > .yk-ink-ko { opacity: 1; filter: blur(0); }',
    '',
    '/* 긴 글 / 문단 / 제목용 부드러운 페이드 (줄바꿈·정렬 완전 보존) */',
    '.yk-ink-fade {',
    '  transition: opacity ' + fadeSec + ' ease, filter ' + fadeSec + ' ease;',
    '  cursor: help;',
    '}',
    '.yk-ink-fade.yk-ink-fading {',
    '  opacity: 0.15;',
    '  filter: blur(2.5px);',
    '}'
  ].join('\n');
  document.head.appendChild(style);

  /* ── 2. 요소 판별 및 초기화 ── */
  function isShortWord(el) {
    // 세로 제목 또는 그 안쪽 요소는 슬롯화 대상 아님
    if (el.closest('.vhead')) return false;

    // .l 또는 .long 클래스가 있으면 긴 글로 처리
    if (el.classList.contains('l') || el.classList.contains('long')) return false;

    // 문단, 제목, 설명글 컨테이너 자체이거나 직속이면 긴 글
    var tag = el.tagName.toLowerCase();
    if (tag === 'p' || tag === 'h1' || tag === 'h2' || tag === 'h3' || tag === 'h4' || tag === 'figcaption') return false;
    if (el.classList.contains('desc') || el.classList.contains('sw') || el.classList.contains('lead')) return false;

    // 안쪽에 다른 태그가 없어야 함
    if (el.children && el.children.length > 0) return false;

    // 텍스트 길이가 12자 이하
    var text = (el.textContent || '').trim();
    return text.length > 0 && text.length <= 12;
  }

  function initElement(el) {
    if (!el || el._inkInited) return;
    var ko = el.dataset.ko || el.dataset.k;
    if (!ko) return;

    el._inkInited = true;
    el.dataset.ko = ko;

    if (isShortWord(el)) {
      // 짧은 한자: 겹쳐 그리기(inline-grid) 슬롯 적용
      el._inkType = 'short';
      var origHj = el.textContent.trim();
      el.dataset.origHj = origHj;
      el.classList.add('yk-ink-slot');
      el.innerHTML = '<span class="yk-ink-layer yk-ink-hj" aria-hidden="false">' + origHj + '</span>' +
                     '<span class="yk-ink-layer yk-ink-ko" aria-hidden="true">' + ko + '</span>';
    } else {
      // 긴 글 / 문단 / 제목: 원래 innerHTML 그대로 보존, 페이드 방식 적용
      el._inkType = 'long';
      el._origInnerHTML = el.innerHTML;
      el.classList.add('yk-ink-fade');
    }
  }

  /* ── 3. 세로 제목 (.vhead) 전용 제어 ── */
  function updateVhead(vh, mode) {
    if (!vh) return;
    if (typeof window.setV === 'function') {
      window.setV(mode);
    } else {
      vh.querySelectorAll('.vc').forEach(function (c) {
        if (c.dataset[mode]) {
          c.innerHTML = Array.from(c.dataset[mode]).map(function (ch) {
            return ch === ' ' ? '<i class="sp"></i>' : '<i>' + ch + '</i>';
          }).join('');
        }
      });
    }
    vh.classList.toggle('gloss', mode === 'ko');
  }

  /* ── 4. 전환 처리 (Show / Hide) ── */
  function setElementState(el, showKo) {
    if (!el) return;
    initElement(el);

    if (el._inkType === 'short') {
      // 짧은 슬롯: 클래스로 전환
      el.classList.toggle('yk-ink-show-ko', showKo);
      var hj = el.querySelector('.yk-ink-hj');
      var ko = el.querySelector('.yk-ink-ko');
      if (hj) hj.setAttribute('aria-hidden', showKo ? 'true' : 'false');
      if (ko) ko.setAttribute('aria-hidden', showKo ? 'false' : 'true');
    } else if (el._inkType === 'long') {
      // 긴 글: 부드럽게 흐려졌다가 내용 교체 후 다시 선명하게
      if (el._inkFadeTimer) clearTimeout(el._inkFadeTimer);
      el.classList.add('yk-ink-fading');

      el._inkFadeTimer = setTimeout(function () {
        if (showKo) {
          el.innerHTML = el.dataset.ko;
        } else {
          el.innerHTML = el._origInnerHTML || el.textContent;
        }
        el.classList.remove('yk-ink-fading');
        el._inkFadeTimer = null;
      }, isReduced ? 10 : FADE_MS);
    }
  }

  /* ── 5. 마우스 이벤트 스케줄러 ── */
  function handleEnter(target) {
    if (!target) return;

    // 세로 제목인 경우
    var vhead = target.closest && target.closest('.vhead');
    if (vhead) {
      if (vhead._inkLeaveTimer) { clearTimeout(vhead._inkLeaveTimer); vhead._inkLeaveTimer = null; }
      if (vhead._isKo) return;
      if (vhead._inkEnterTimer) clearTimeout(vhead._inkEnterTimer);
      vhead._inkEnterTimer = setTimeout(function () {
        updateVhead(vhead, 'ko');
        vhead._isKo = true;
        vhead._inkEnterTimer = null;
      }, HOVER_DELAY);
      return;
    }

    // 일반 한자 요소
    var el = target.closest && target.closest('.hj[data-ko], .ykg-hj[data-ko]');
    if (!el) return;

    initElement(el);
    if (el._inkLeaveTimer) { clearTimeout(el._inkLeaveTimer); el._inkLeaveTimer = null; }
    if (el._isKo) return;

    if (el._inkEnterTimer) clearTimeout(el._inkEnterTimer);
    el._inkEnterTimer = setTimeout(function () {
      setElementState(el, true);
      el._isKo = true;
      el._inkEnterTimer = null;
    }, HOVER_DELAY);
  }

  function handleLeave(target) {
    if (!target) return;

    // 세로 제목인 경우
    var vhead = target.closest && target.closest('.vhead');
    if (vhead) {
      if (vhead._inkEnterTimer) { clearTimeout(vhead._inkEnterTimer); vhead._inkEnterTimer = null; }
      if (!vhead._isKo) return;
      if (vhead._inkLeaveTimer) clearTimeout(vhead._inkLeaveTimer);
      vhead._inkLeaveTimer = setTimeout(function () {
        updateVhead(vhead, 'hj');
        vhead._isKo = false;
        vhead._inkLeaveTimer = null;
      }, LEAVE_DELAY);
      return;
    }

    // 일반 한자 요소
    var el = target.closest && target.closest('.hj[data-ko], .ykg-hj[data-ko]');
    if (!el) return;

    if (el._inkEnterTimer) { clearTimeout(el._inkEnterTimer); el._inkEnterTimer = null; }
    if (!el._isKo) return;

    if (el._inkLeaveTimer) clearTimeout(el._inkLeaveTimer);
    el._inkLeaveTimer = setTimeout(function () {
      setElementState(el, false);
      el._isKo = false;
      el._inkLeaveTimer = null;
    }, LEAVE_DELAY);
  }

  function handleTap(target) {
    if (!target) return;

    var vhead = target.closest && target.closest('.vhead');
    if (vhead) {
      var nextMode = vhead._isKo ? 'hj' : 'ko';
      updateVhead(vhead, nextMode);
      vhead._isKo = !vhead._isKo;
      return;
    }

    var el = target.closest && target.closest('.hj[data-ko], .ykg-hj[data-ko]');
    if (!el) return;

    initElement(el);
    if (el._inkEnterTimer) { clearTimeout(el._inkEnterTimer); el._inkEnterTimer = null; }
    if (el._inkLeaveTimer) { clearTimeout(el._inkLeaveTimer); el._inkLeaveTimer = null; }

    var nextState = !el._isKo;
    setElementState(el, nextState);
    el._isKo = nextState;
  }

  /* ── 6. 이벤트 위임 리스너 ── */
  document.addEventListener('pointerenter', function (e) {
    if (e.pointerType === 'touch') return;
    handleEnter(e.target);
  }, true);

  document.addEventListener('pointerleave', function (e) {
    if (e.pointerType === 'touch') return;
    handleLeave(e.target);
  }, true);

  document.addEventListener('mouseover', function (e) {
    handleEnter(e.target);
  });

  document.addEventListener('mouseout', function (e) {
    handleLeave(e.target);
  });

  document.addEventListener('click', function (e) {
    handleTap(e.target);
  });

  /* ── 7. 전체 새로고침 및 일괄 토글 API (window.ykInk) ── */
  function refresh(root) {
    var base = root || document;
    var targets = base.querySelectorAll('.hj[data-ko], .ykg-hj[data-ko]');
    targets.forEach(function (el) {
      initElement(el);
    });
  }

  var allKoActive = false;
  function toggleAll(forceState) {
    allKoActive = typeof forceState === 'boolean' ? forceState : !allKoActive;
    refresh();

    var targets = document.querySelectorAll('.hj[data-ko], .ykg-hj[data-ko]');
    targets.forEach(function (el) {
      if (el._inkEnterTimer) { clearTimeout(el._inkEnterTimer); el._inkEnterTimer = null; }
      if (el._inkLeaveTimer) { clearTimeout(el._inkLeaveTimer); el._inkLeaveTimer = null; }
      setElementState(el, allKoActive);
      el._isKo = allKoActive;
    });

    var vheads = document.querySelectorAll('.vhead');
    vheads.forEach(function (vh) {
      updateVhead(vh, allKoActive ? 'ko' : 'hj');
      vh._isKo = allKoActive;
    });
  }

  // DOMContentLoaded 시 자동 준비
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      refresh();
    });
  } else {
    refresh();
  }

  // 외부 API
  window.ykInk = {
    refresh: refresh,
    toggleAll: toggleAll,
    setElementState: setElementState,
    constants: {
      HOVER_DELAY: HOVER_DELAY,
      FADE_MS: FADE_MS,
      DISSOLVE_MS: DISSOLVE_MS,
      LEAVE_DELAY: LEAVE_DELAY
    }
  };

})(window, document);
