"use strict";

// クラス変更監視プラグインにゃー
export function observeClassChange(targetEl, callback) {
	// これはMutationObserverのインスタンスにゃー
	const observer = new MutationObserver((mutationsList) => {
		for (const mutation of mutationsList) {
			if (mutation.type === "attributes" && mutation.attributeName === "class") {
				const newClass = targetEl.className;
				callback(newClass);
			}
		}
	});
	observer.observe(targetEl, { attributes: true, attributeFilter: ["class"] });

	// メモリ解放用のメソッドを持つオブジェクトを返すにゃー
	return {
		releaseObserver: function() {
			if (observer) {
				observer.disconnect();
			}
		}
	};
}
