

function init(_g) {
	const target = document.querySelector("[data-target='topMainvisual01']");
	if (!target) return;

	if (_g.console) console.log("___01_mainvisual loaded");

	const contentsTarget = target.querySelector("[data-target='contentsTarget']");
	_g.gsap.to(target, {
		scrollTrigger: {
			trigger: contentsTarget,
			start: "top top",
			end: "bottom top", // 固定する距離
			pin: true,    // ピン止め
			scrub: true   // スクロール連動
		}
	});
}

// ここから外部用エクスポート
export { init };
