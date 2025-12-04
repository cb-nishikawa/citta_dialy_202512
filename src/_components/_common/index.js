
import { init as _common } from "./_common/";
import { init as _header } from "./_header/";

function _commonInit(_g) {
	if (_g.console) console.log("_commonInit loaded");
	_common(_g);
	_header(_g);
}

// ここから外部用エクスポート
export { _commonInit };
