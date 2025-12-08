import { init as _topInit } from "./_top/";
import { init as _historyInit } from "./_history/";


function init(_g) {
	if (_g.console) console.log("_pagesInit loaded");
	
	// 慣性スクロール
	_g.smoothScroll(_g.gsap);

	_topInit(_g);
    _historyInit(_g);
}

// ここから外部用エクスポート
export { init };
