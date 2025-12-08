function init(_g, container) {
	

	const target = container.querySelector("[data-target='sideFixedTarget']");
	if (!target) return;

	const fixedTarget = target.querySelector("[data-target='fixedTarget']");
	const contentsTarget = target.querySelector("[data-target='contentsTarget']");

	if (_g.console) console.log("__sideFixed loaded");

	_g.gsap.to(fixedTarget, {
		scrollTrigger: {
			trigger: fixedTarget,
			start: "top top",
			end: "bottom bottom",
			pin: true,
			pinSpacing: true,
			scrub: true,
		}
	});
}

export { init };
