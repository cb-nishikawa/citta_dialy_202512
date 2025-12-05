
import { init as _image } from "./_image/";
import { init as _sideFixed } from "./_sideFixed/";
import { init as _header } from "./_header/";


function init(_g) {
	if (_g.console) console.log("_commonInit loaded");
	_image(_g);
	_header(_g);
	_sideFixed(_g);
}

// ここから外部用エクスポート
export { init };
