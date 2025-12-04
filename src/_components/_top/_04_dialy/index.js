function init(_g) {
	const target = document.querySelector("[data-target='topDialy01']");
	if (!target) return;

	const scrollTarget = target.querySelector("[data-target='scrollTarget']");
	const contentsTarget = target.querySelector("[data-target='contentsTarget']");

	if (_g.console) console.log("__04_dialy loaded");

	_g.gsap.to(contentsTarget, {
		scrollTrigger: {
			trigger: contentsTarget,   // ✅ pinする要素と同じにする
			start: "center center",       // 画面中央で固定開始
			end: "bottom top",              // 600pxスクロールで解除（確実に効く）
			pin: true,
			pinSpacing: true,
			scrub: true,
		}
	});
}

export { init };
