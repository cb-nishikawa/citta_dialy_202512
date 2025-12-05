
function init(_g) {
	if (_g.console) console.log("___header loaded");
	headerFunc(_g);
}

function headerFunc(_g) {
	const target = document.querySelector("[data-target='globalHeader01']");
	if (!target) return;
	if (_g.console) console.log("____headerFunc loaded");

	header__colorChange(_g, target);
	header__hiddenChange(_g, target);
	header__humbergerBtn(_g, target);
	header__scrollHidden(_g, target);
	header__mainvisualOver(_g, target);
}

function header__scrollHidden(_g, _tg) {
	let lastScrollY = window.pageYOffset;
	let headerHeight = _tg.offsetHeight;
	let ticking = false;
	let mousemoveAdded = false;

	function updateHeaderHeight() {
		headerHeight = _tg.offsetHeight;
	}
	window.addEventListener("resize", updateHeaderHeight);

	function onMouseMove(e) {
		if (e.clientY <= headerHeight) {
			if (_tg.classList.contains("is-hidden")) {
				_tg.classList.remove("is-hidden");
				if (_g.console) console.log("is-hidden removed by mouse at top");
			}
		}
	}

	function handleScroll() {
		const currentScrollY = window.pageYOffset;

		if (currentScrollY > lastScrollY) {
			if (!_tg.classList.contains("is-hidden")) {
				_tg.classList.add("is-hidden");
				if (_g.console) console.log("is-hidden set to true");
			}
		} else {
			if (_tg.classList.contains("is-hidden")) {
				_tg.classList.remove("is-hidden");
				if (_g.console) console.log("is-hidden set to false");
			}
		}

		lastScrollY = currentScrollY;

		if (currentScrollY <= 0) {
			if (_tg.classList.contains("is-hidden")) {
				_tg.classList.remove("is-hidden");
				if (_g.console) console.log("is-hidden removed at top");
			}
		}

		// add mousemove listener only once
		if (!mousemoveAdded) {
			document.addEventListener("mousemove", onMouseMove);
			mousemoveAdded = true;
		}
	}

	function onScroll() {
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(() => {
				handleScroll();
				ticking = false;
			});
		}
	}

	window.addEventListener("scroll", onScroll);

	// initial check
	handleScroll();
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

		if (!container) return;

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

		if (!container) return;

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

		const isNowHidden = _tg.classList.contains("is-hidden_important");
		if (hidden && !isNowHidden) {
			_tg.classList.add("is-hidden_important");
			if (_g.console) console.log("is-hidden_important set to true");
		} else if (!hidden && isNowHidden) {
			_tg.classList.remove("is-hidden_important");
			if (_g.console) console.log("is-hidden_important set to false");
		}
	}

	window.addEventListener("scroll", init);
	window.addEventListener("resize", init);

	init();

}



function header__mainvisualOver(_g, _tg) {

	function init() {
		const container = document.querySelector("[data-target='containerTarget']");

		if (!container) return;
		const headerRect = _tg.getBoundingClientRect();
		const headerCenterY = headerRect.top + headerRect.height / 2;
		const mainvisual = container.querySelectorAll("[data-target='topMainvisual01']");
		let mv = false;

		if (!mainvisual.length && !container) return;

		mainvisual.forEach((el) => {
			const rect = el.getBoundingClientRect();
			if (headerCenterY >= rect.top && headerCenterY <= rect.bottom) {
				mv = true;
			} else {
				mv = mv || false;
			}
		});

		const isMv = _tg.classList.contains("is-mv");
		if (mv && !isMv) {
			_tg.classList.add("is-mv");
			if (_g.console) console.log("is-mv set to true");
		} else if (!mv && isMv) {
			_tg.classList.remove("is-mv");
			if (_g.console) console.log("is-hidden_important set to false");
		}
	}

	window.addEventListener("scroll", init);
	window.addEventListener("resize", init);

	init();

}

// ここから外部用エクスポート
export { init };
