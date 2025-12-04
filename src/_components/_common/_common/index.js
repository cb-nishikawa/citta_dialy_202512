
function init(_g) {
	bodyScroll(_g);
}

function bodyScroll(_g) {

	if (_g.console) console.log("__bodyScroll loaded");
	
	const lenis = new _g.Lenis({
		duration: 1.2,
		smooth: true,
	});

	_g.gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	_g.gsap.ticker.lagSmoothing(0);
}

// ここから外部用エクスポート
export { init };
