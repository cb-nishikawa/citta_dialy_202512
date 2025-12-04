function init(_g) {
	const target = document.querySelector("[data-target='topNews01']");
	if (!target) return;

	const menuTarget = target.querySelector("[data-target='menuTarget']");
	const contentsTarget = target.querySelector("[data-target='contentsTarget']");

	if (_g.console) console.log("__09_news loaded");

	_g.gsap.to(menuTarget, {
		scrollTrigger: {
			trigger: menuTarget,
			start: "top top",
			end: "bottom bottom",
			pin: true,
			pinSpacing: true,
			scrub: true,
		}
	});
}

export { init };
