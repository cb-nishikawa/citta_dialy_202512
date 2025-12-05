
import { init as _01_history } from "./_01_history/";

// _gを引数で受け取るように修正
function init(_g) {
	const target = document.querySelector("[data-page='history']");
	if (!target) return;

	if (_g.console) console.log("_historyInit loaded");
	_01_history(_g);
}

// ここから外部用エクスポート
export { init };
