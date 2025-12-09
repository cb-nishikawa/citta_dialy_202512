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
      const wrapper = document.querySelector('[data-barba="wrapper"]');
      const transitionTarget = hooks.transitionTarget || document.getElementById('pageTransition');
      let resolved = false;
      return new Promise(resolve => {
        wrapper.classList.add('barba-leave-active', 'barba-leave');
        requestAnimationFrame(() => {
          wrapper.classList.add('barba-leave-to');
          if (transitionTarget) {
            transitionTarget.addEventListener('transitionend', function handler(e) {
              if (e.propertyName === 'opacity') {
                transitionTarget.removeEventListener('transitionend', handler);
                if (!resolved) {
                  wrapper.classList.remove('barba-leave-active', 'barba-leave', 'barba-leave-to');
                  resolve();
                  resolved = true;
                }
              }
            });
          } else {
            // 監視対象がなければ即resolve
            wrapper.classList.remove('barba-leave-active', 'barba-leave', 'barba-leave-to');
            resolve();
          }
        });
      });
		},

        // ✅ 遷移後（ここが超重要）
        async enter(data) {
          console.log('✅ 遷移後');
          const wrapper = document.querySelector('[data-barba="wrapper"]');
          wrapper.classList.add('barba-enter-active', 'barba-enter');
          requestAnimationFrame(() => {
            wrapper.classList.add('barba-enter-to');
            setTimeout(() => {
              wrapper.classList.remove('barba-enter-active', 'barba-enter', 'barba-enter-to');
              hooks.enter?.(data, wrapper);
            }, 500);
          });

          resetScroll();
          await waitForDomStable();
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
