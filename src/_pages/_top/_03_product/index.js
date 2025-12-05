

function init(_g) {
	const target = document.querySelector("[data-target='topProduct01']");

	if (!target) return;
	if (_g.console) console.log("__03_product loaded");

	const leftTarget = target.querySelector("[data-target='leftTarget']");
	const rightTarget = target.querySelector("[data-target='rightTarget']");

	// rightTargetの.imageを取得
	const rightImages = rightTarget.querySelectorAll('.image');
	const items = rightTarget.querySelectorAll("[data-target='item']");

	// leftTargetにdiv.imagesを作成
	const imagesContainer = document.createElement('div');
	imagesContainer.classList.add('images');

	// rightTargetの.imageをimagesContainerに追加
	rightImages.forEach(img => {
		imagesContainer.appendChild(img.cloneNode(true));
	});

	// leftTargetにimagesContainerを追加
	leftTarget.appendChild(imagesContainer);
	const leftImages = imagesContainer.querySelectorAll('.image');
	
	_g.gsap.set(target, {
		ease: "none",
		scrollTrigger: {
			trigger: leftTarget,
			start: "top top",
			end: "bottom bottom",
			pin: true,
			scrub: true,
			toggleClass: {
				targets: target, 
				className: "is-active"
			}
		},
	});

	

	items.forEach((item, i) => {
		_g.gsap.set(leftImages[i], {
			ease: "none",
			scrollTrigger: {
				trigger: item,
				start: "top center",
				end: "bottom center",
				onUpdate: (self) => {
				},
				toggleClass: {
					targets: leftImages[i], 
					className: "is-active"
				}
				,
				onEnter: () => {
					if (i === items.length - 1) {
						target.classList.add('is-last-active');
					}
				},
				onLeaveBack: () => {
					if (i === items.length - 1) {
						target.classList.remove('is-last-active');
					}
				}
			}
		});
	});

	// スクロール時に各itemが表示エリアのどこにいるか取得
	window.addEventListener('scroll', () => {
		items.forEach((item, i) => {
			const rect = item.getBoundingClientRect();
			// 表示エリア内にいるか判定
			const inView = rect.top < window.innerHeight && rect.bottom > 0;
			if (inView) {
				// 画面上部からの距離と、画面中央との距離を取得
				const fromCenter = rect.top + rect.height / 2 - window.innerHeight / 2;
				const scrollPoint = item.querySelector('.scrollPoint');
				if (scrollPoint) {
					const halfWindow = window.innerHeight / 2;
					const threshold = 200; // 中央から±60px以内を1とする閾値
					let normalized;
					if (Math.abs(fromCenter) <= threshold) {
						normalized = 1;
					} else {
						// 閾値を超えたら0に向かって減衰
						const maxDist = halfWindow - threshold;
						normalized = 1 - Math.min(1, (Math.abs(fromCenter) - threshold) / maxDist);
						normalized = Math.max(0, normalized);
					}
					scrollPoint.textContent = `normalized: ${normalized.toFixed(2)}`;

					_g.gsap.to(item, {
						opacity: normalized.toFixed(2),
						ease: "none",
					});
				}
			}
		});
	});
}

// ここから外部用エクスポート
export { init };