import { init as _topSectionTitle01 } from "./_topSectionTitle01/";

import { init as _01_mainvisual } from "./_01_mainvisual/";
import { init as _02_concept } from "./_02_concept/";
import { init as _03_product } from "./_03_product/";
import { init as _04_dialy } from "./_04_dialy/";
import { init as _05_howto } from "./_05_howto/";

// _gを引数で受け取るように修正
function init(_g) {
	const target = document.querySelector("[data-page='top']");
	if (!target) return;
	
	if (_g.console) console.log("__topInit loaded");
	_topSectionTitle01(_g);
	_01_mainvisual(_g);
	_02_concept(_g);
	_03_product(_g);
	_04_dialy(_g);
	_05_howto(_g);


}

// ここから外部用エクスポート
export { init };
