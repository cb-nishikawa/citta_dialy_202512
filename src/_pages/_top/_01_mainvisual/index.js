

function init(_g) {
	const target = document.querySelector("[data-target='topMainvisual01']");
	if (!target) return;

	if (_g.console) console.log("___01_mainvisual loaded");

	const contentsTarget = target.querySelector("[data-target='contentsTarget']");
	const images = target.querySelectorAll(".area.bg .item");
	const scrollDisc = target.querySelector(".area.scroll .disc");
	const btnArea = target.querySelector(".area.btn");

	const lineLineAnimationTime = 10;

	target.style.setProperty('--lineLineAnimationTime', `${lineLineAnimationTime}s`);

	// imagesの枚数分btnAreaにdiv.btnを追加
	images.forEach(() => {
		const btn = document.createElement('button');
		btn.classList.add('btn');
		btn.classList.add('image' + (btnArea.querySelectorAll('.btn').length + 1));
		const span = document.createElement('span');
		span.classList.add('pointerArea');
		btn.appendChild(span);

		const spanLine = document.createElement('span');
		spanLine.classList.add('line');
		btn.appendChild(spanLine);
		
		btnArea.appendChild(btn);
	});
	
	_g.gsap.to(contentsTarget, {
		scrollTrigger: {
			trigger: contentsTarget,
			start: "top top",
			end: "bottom top", // 固定する距離
			pin: true,    // ピン止め
			scrub: true,   // スクロール連動
			toggleClass: {
				targets: target, 
				className: "is-active"
			}
		}
	});

	_g.gsap.to(target, {
		scrollTrigger: {
			trigger: contentsTarget,
			start: "+40",
			toggleClass: {
				targets: target, 
				className: "is-scroll"
			}
		}
	});

	_g.gsap.to(target, {
		scrollTrigger: {
			trigger: target,
			start: "bottom top",
			onLeave: () => {
				target.classList.add("is-end");
			},
			onEnterBack: () => {
				target.classList.remove("is-end");
			}
		}
	});

	const imageClassCtrl = new _g.classController(["[data-imageCtrl]"]);
	const transitionendCtrl = new _g.classController(["[data-transitonEndCtrl]"]);
	
	let allImages = [];

	let lineAnimation = [];

	btnArea.querySelectorAll('.btn').forEach((btn, index) => {
		allImages.push(`image${index + 1}`);
	});


	btnArea.querySelectorAll('.btn').forEach((btn, index) => {
		btn.addEventListener('click', () => {
				imageClassCtrl.select({select:[`image${index + 1}`], all:allImages});
		});
		lineAnimation[index] = _g.gsap.fromTo(btn.querySelector('.line'), { scaleX: 0 }, {
			scaleX: 1,
			duration: lineLineAnimationTime,
			ease: 'linear',
			transformOrigin: 'left',
			paused: true,
			onComplete: () => {
				transitionendCtrl.order(allImages);
			}
		});
	});

	// contentsTargetのclass監視→対応btn.lineをGSAPでscaleXアニメーション
	const btnLines = btnArea.querySelectorAll('.btn .line');
	const contentsTargetObserver = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.attributeName === 'class') {
				const currentClassList = mutation.target.classList;
				btnLines.forEach((line, index) => {
					if (currentClassList.contains(`image${index + 1}`)) {
						lineAnimation[index].restart();
					} else {
						lineAnimation[index].pause(0);
					}
				});
			}
		});
	});
	contentsTargetObserver.observe(contentsTarget, { attributes: true });

	const targetObserver = new MutationObserver((mutations) => {
		mutations.forEach((mutation) => {
			if (mutation.attributeName === 'class') {
				const currentClassList = mutation.target.classList;
				if (currentClassList.contains('is-scroll')) {
					lineAnimation.forEach((animation) => {
						if (animation && typeof animation.pause === 'function') {
							animation.pause();
						}
					});
				} else {
					const activeIndex = allImages.findIndex(cls => contentsTarget.classList.contains(cls));
					if (lineAnimation[activeIndex] && typeof lineAnimation[activeIndex].play === 'function') {
						lineAnimation[activeIndex].play();
					}
				}
			}
		});
	});
	targetObserver.observe(target, { attributes: true });

	target.querySelectorAll('[data-imageCtrl]').forEach((ctrlTarget) => {
		setTimeout(() => {
			ctrlTarget.classList.add('image1');
		}, 100);
	});

	if (scrollDisc) {
		const discAnimDuration = 1.5;
		const discRect = scrollDisc.getBoundingClientRect();
		const discSize = Math.max(discRect.width, discRect.height);
		const discAnimDistance = discSize * 2.5;

		_g.gsap.set(scrollDisc, { y: 0, opacity: 1 });

		const discAnim = _g.gsap.to(scrollDisc, {
			y: discAnimDistance,
			opacity: 0,
			duration: discAnimDuration,
			ease: "power2.in",
			repeat: -1,
			repeatDelay: 0.3,
			onRepeat: function() {
				_g.gsap.fromTo(
					scrollDisc,
					{ y: 0, opacity: 0 },
					{ opacity: 1, duration: 0.4, ease: "power1.out" }
				);
			}
		});
	}
}

// ここから外部用エクスポート
export { init };
