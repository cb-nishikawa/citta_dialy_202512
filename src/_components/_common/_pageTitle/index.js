

function init(_g) {
	const target = document.querySelector("[data-target='pageTitle01']");

	if (!target) return;

	if (_g.console) console.log("__pageTitle loaded");

	const contentsTarget = target.querySelector("[data-target='contentsTarget']");

	_g.gsap.to(target, {
		scrollTrigger: {
			trigger: contentsTarget,
			start: "top top",
			end: "bottom top-=100%", // 固定する距離
			pin: true,    // ピン止め
			scrub: true,   // スクロール連動
		},
		toggleClass: {
			targets: target, 
			className: "is-scroll"
		}
	});
}

export { init };
