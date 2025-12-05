function init(_g) {
	const target = document.querySelector("[data-target='topDialy01']");
	if (!target) return;

	const scrollTarget = target.querySelector("[data-target='scrollTarget']");
	const contentsTarget = target.querySelector("[data-target='contentsTarget']");

	if (_g.console) console.log("___04_dialy loaded");

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

	const leftArrow = target.querySelector("[data-target='leftArrow']");
	const rightArrow = target.querySelector("[data-target='rightArrow']");

	const leftArrowClassCtrl = new _g.classController(["[data-leftArrowCtrl]"]);
	const rightArrowClassCtrl = new _g.classController(["[data-rightArrowCtrl]"]);

	leftArrow.addEventListener("click", () => {
		rightArrowClassCtrl.order(["fifth", "fourth", "third", "second", "first"]);
		if (_g.console) console.log("left arrow clicked");
	});
	rightArrow.addEventListener("click", () => {
		leftArrowClassCtrl.order(["first", "second", "third", "fourth", "fifth"]);
		if (_g.console) console.log("right arrow clicked");
	});

	const colorBtn01 = target.querySelector("[data-target='color01']");
	const colorBtn02 = target.querySelector("[data-target='color02']");
	const colorBtn03 = target.querySelector("[data-target='color03']");
	const colorBtn04 = target.querySelector("[data-target='color04']");
	const colorBtn05 = target.querySelector("[data-target='color05']");

	const colorClassCtrl = new _g.classController(["[data-colorCtrl]"]);
	const allColors = ["color01", "color02", "color03", "color04", "color05"];

	colorBtn01.addEventListener("click", () => {
		colorClassCtrl.select({select:["color01"], all:allColors});
		if (_g.console) console.log("color 01 clicked");
	});
	colorBtn02.addEventListener("click", () => {
		colorClassCtrl.select({select:["color02"], all:allColors});
		if (_g.console) console.log("color 02 clicked");
	});
	colorBtn03.addEventListener("click", () => {
		colorClassCtrl.select({select:["color03"], all:allColors});
		if (_g.console) console.log("color 03 clicked");
	});
	colorBtn04.addEventListener("click", () => {
		colorClassCtrl.select({select:["color04"], all:allColors});
		if (_g.console) console.log("color 04 clicked");
	});
	colorBtn05.addEventListener("click", () => {
		colorClassCtrl.select({select:["color05"], all:allColors});
		if (_g.console) console.log("color 05 clicked");
	});
	
}

export { init };
