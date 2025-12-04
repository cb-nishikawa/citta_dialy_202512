
function init(_g) {
	if (_g.console) console.log("__header loaded");
	headerFunc(_g);
}

function headerFunc(_g) {
	const target = document.querySelector("[data-target='globalHeader01']");
	if (!target) return;
	if (_g.console) console.log("__headerFunc loaded");

	header__colorChange(_g, target);
	header__hiddenChange(_g, target);
	header__humbergerBtn(_g, target);
}

function header__humbergerBtn(_g, _tg) {
	function init() {
		const btn = _tg.querySelector("[data-target='btnTarget']");
		const menu = document.querySelector("[data-target='menuTarget']");
		
		if (!btn || !menu) return;

		const ctrl = new _g.classController(["[data-menuClassCtr]"]);

		btn.addEventListener("click", () => {
			ctrl.toggle("is-active");
		});
	}

	init();
}


function header__colorChange(_g, _tg) {
	
	function init() {
		const container = document.querySelector("[data-target='containerTarget']");
		const headerRect = _tg.getBoundingClientRect();
		const headerCenterY = headerRect.top + headerRect.height / 2;
		const menuColors = container.querySelectorAll("[data-menuColor]");
		let currentColor = null;

		if (!menuColors.length && !container) return;

		menuColors.forEach((el) => {
			const rect = el.getBoundingClientRect();
			if (headerCenterY >= rect.top && headerCenterY <= rect.bottom) {
				currentColor = el.getAttribute("data-menuColor");
			} else {
				currentColor = currentColor || null;
			}
		});


		const prevColor = _tg.style.getPropertyValue('--menu-color');
		if (currentColor && prevColor !== currentColor) {
			_tg.style.setProperty('--menu-color', currentColor);
			if (_g.console) console.log(`menu-color set to ${currentColor}`);
		} else if (!currentColor && prevColor !== 'inherit') {
			_tg.style.setProperty('--menu-color', 'inherit');
			if (_g.console) console.log(`menu-color set to inherit`);
		}
	}

	window.addEventListener("scroll", init);
	window.addEventListener("resize", init);

	init();
}

function header__hiddenChange(_g, _tg) {

	function init() {
		const container = document.querySelector("[data-target='containerTarget']");
		const headerRect = _tg.getBoundingClientRect();
		const headerCenterY = headerRect.top + headerRect.height / 2;
		const hiddenMenu = container.querySelectorAll("[data-hiddenMenu]");
		let hidden = false;

		if (!hiddenMenu.length && !container) return;

		hiddenMenu.forEach((el) => {
			const rect = el.getBoundingClientRect();
			if (headerCenterY >= rect.top && headerCenterY <= rect.bottom) {
				hidden = true;
			} else {
				hidden = hidden || false;
			}
		});

		const isNowHidden = _tg.classList.contains("is-hidden");
		if (hidden && !isNowHidden) {
			_tg.classList.add("is-hidden");
			if (_g.console) console.log("is-hidden set to true");
		} else if (!hidden && isNowHidden) {
			_tg.classList.remove("is-hidden");
			if (_g.console) console.log("is-hidden set to false");
		}
	}

	window.addEventListener("scroll", init);
	window.addEventListener("resize", init);

	init();

}

// ここから外部用エクスポート
export { init };
