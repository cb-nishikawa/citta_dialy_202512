function init(_g) {
	const target = document.querySelector("[data-target='topDialy01']");
	if (!target) return;

	const scrollTarget = target.querySelector("[data-target='scrollTarget']");
	const contentsTarget = target.querySelector("[data-target='contentsTarget']");

	if (_g.console) console.log("___04_dialy loaded");

	const leftArrow = target.querySelector("[data-target='leftArrow']");
	const rightArrow = target.querySelector("[data-target='rightArrow']");

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

	const leftArrowClassCtrl = new _g.classController(["[data-leftArrowCtrl]"]);
	const rightArrowClassCtrl = new _g.classController(["[data-rightArrowCtrl]"]);

	leftArrow.addEventListener("click", () => {
		leftArrowClassCtrl.order(["first", "second", "third"]);
		if (_g.console) console.log("left arrow clicked");
	});
	rightArrow.addEventListener("click", () => {
		rightArrowClassCtrl.order(["third", "second", "first"]);
		if (_g.console) console.log("right arrow clicked");
	});
	
}

export { init };
