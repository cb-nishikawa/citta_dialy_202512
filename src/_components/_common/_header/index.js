
import { init as _header } from "./_header/";

// _gを引数で受け取るように修正
function init(_g) {
	if (_g.console) console.log("__headerInit loaded");
	_header(_g);
}

// ここから外部用エクスポート
export { init };
