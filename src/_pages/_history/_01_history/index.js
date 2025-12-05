

function init(_g) {
	const target = document.querySelector("[data-target='historyHistory01']");

	if (!target) return;
	if (_g.console) console.log("__01_history loaded");

	const scrollTarget = target.querySelector("[data-target='scrollTarget']");
	const itemsTarget = scrollTarget.querySelector("[data-target='itemsTarget']");
	const items = itemsTarget.querySelectorAll("[data-target='item']");
	const num  = items.length;

	_g.gsap.set(itemsTarget, {
		ease: "none",
		scrollTrigger: {
			trigger: itemsTarget,
			start: "top top",
			end: "bottom top",
			onUpdate: (self) => {
				items.forEach((item, i) => {
					// 進行度に応じてactive付与
					if (self.progress >= i / num  && self.progress < (i + 1) / num) {
						item.classList.add("is-active");
					} else {
						// 下から上（逆方向）にスクロールした場合のみ削除
						if (self.direction === -1) {
							item.classList.remove("is-active");
						}
					}
				});
			},
			onLeave: () => {
				// target.classList.add("is-end");
			},
			onEnterBack: () => {
				// target.classList.remove("is-end");
			},
			onLeaveBack: () => {
				items.forEach((item, i) => {
					item.classList.remove("is-active");
				});
			},
			toggleClass: {
				targets: target, 
				className: "is-enter"
			},
		}
	});

	// _g.gsap.to(itemsTarget, {
	// 	ease: "none",
	// 	scrollTrigger: {
	// 		trigger: itemsTarget,
	// 		start: "top top",
	// 		end: "bottom top",
	// 		pin: true,
	// 		scrub: true,
	// 		toggleClass: {
	// 			targets: target, 
	// 			className: "is-active"
	// 		},
	// 	},
	// });
}

// ここから外部用エクスポート
export { init };