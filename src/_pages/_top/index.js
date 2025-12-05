
import { init as _01_mainvisual } from "./_01_mainvisual/";
import { init as _02_concept } from "./_02_concept/";
import { init as _03_product } from "./_03_product/";
import { init as _04_dialy } from "./_04_dialy/";
import { init as _09_news } from "./_09_news/";

// _gを引数で受け取るように修正
function _topInit(_g) {
	if (_g.console) console.log("_topInit loaded");
	_01_mainvisual(_g);
	_02_concept(_g);
	_03_product(_g);
	_04_dialy(_g);
	_09_news(_g);
}

// ここから外部用エクスポート
export { _topInit };
