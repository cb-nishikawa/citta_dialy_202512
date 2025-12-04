

function init(_g) {
	const targets = document.querySelectorAll("[data-target='bgWrapper01']");
	if (!targets) return;

	if (_g.console) console.log("__bgWrapper01 loaded");
	

	targets.forEach((target) => {

		let bgArea = target.querySelector("[data-target='bgArea']");
		if (!bgArea) {
			const bgDiv = document.createElement("div");
			bgDiv.className = "bg";
			bgDiv.setAttribute("data-target", "bgArea");
			target.appendChild(bgDiv);
			bgArea = bgDiv;
		}

		_g.gsap.to(target, {
			ease: "none",
			scrollTrigger: {
				trigger: bgArea,
				start: "top top",
				end: "bottom top",
				pin: true,
				scrub: true,
				toggleClass: {
					targets: target, 
					className: "is-active"
				},
			},
		});
	});

	
}

// ここから外部用エクスポート
export { init };
