import { init as _commonInit } from "./_common/";
import { init as _layoutInit } from "./_layout/";

function init(_g, container) {
	if (_g.console) console.log("_componentsInit loaded");
	_commonInit(_g, container);
    _layoutInit(_g);
}

// ここから外部用エクスポート
export { init };
