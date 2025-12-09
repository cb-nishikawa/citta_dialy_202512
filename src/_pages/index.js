import { init as _topInit } from "./_top/";
import { init as _historyInit } from "./_history/";


function init(_g, container) {
	if (_g.console) console.log("_pagesInit loaded");


	_topInit(_g);
    _historyInit(_g);
}

// ここから外部用エクスポート
export { init };
