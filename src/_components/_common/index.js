
import { init as _image } from "./_image/";
import { init as _sideFixed } from "./_sideFixed/";
import { init as _pageTitle } from "./_pageTitle/";
import { init as _header } from "./_header/";


function init(_g, container) {
	if (_g.console) console.log("_commonInit loaded");
	_image(_g);
	_header(_g);
	_sideFixed(_g, container);
	_pageTitle(_g);
}

// ここから外部用エクスポート
export { init };
