"use strict";
import barba from '@barba/core';

export function asynchronousTransition(hooks = {}) {
  barba.init({
    transitions: [
      {
        name: 'default',

        // ✅ 初回ロード
        once(data) {
          console.log('✅ 初回ロード');
          resetScroll();

          // ✅ 初回も next.container を渡す
          requestAnimationFrame(() => {
            hooks.once?.(data, data.next?.container || data.current?.container);
          });
        },

        // ✅ 遷移前
        leave(data) {
          console.log('✅ 遷移前');
          hooks.leave?.(data, data.current?.container);
        },

        // ✅ 遷移後（ここが超重要）
        async enter(data) {
          console.log('✅ 遷移後');

          resetScroll();

          // ✅ BarbaのDOM差し替え完了まで正しく待つ
          await waitForDomStable();

          // ✅ ✅ ✅ 必ず「次ページの container」を渡す
          hooks.enter?.(data, data.next.container);
        }
      }
    ]
  });
}


/* ============================
  ✅ DOM 安定待機
============================ */
function waitForDomStable() {
  return new Promise(resolve => {
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setTimeout(resolve, 30);
      });
    });
  });
}


/* ============================
  ✅ スクロールリセット（kill しない）
============================ */
function resetScroll() {
  if (window.lenis) {
    window.lenis.scrollTo(0, { immediate: true });
  } else {
    window.scrollTo(0, 0);
  }

  if (window.ScrollTrigger) {
    ScrollTrigger.refresh();
  }
}
