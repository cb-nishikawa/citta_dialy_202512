import { _g as globalSet } from "../../_modules/";
const _g = globalSet();
_g.console = true; // コンソールログ有効化

import { init as _componentsInit } from "../../_components/";
import { init as _pagesInit } from "../../_pages/";

// 慣性スクロール
_g.inertialScroll(_g.gsap);
// 非同期ページ遷移
_g.asynchronousTransition({
  once(data, container) {
    initAll(container);
  },
  enter(data, container) {
    initAll(container);
  }
});
// ここから全体初期化処理
function initAll(container) {
  console.log("✅ initAll 実行");

  if (window.ScrollTrigger) {
    ScrollTrigger.getAll().forEach(st => st.kill());
    ScrollTrigger.refresh(true);
  }

  _componentsInit(_g, container);
  _pagesInit(_g, container);
}