

function init(_g) {
	const target = document.querySelectorAll("[data-target='topSectionTitle01']");
	if (!target) return;

	if (_g.console) console.log("___topSectionTitle01 loaded");

	target.forEach((tg) => {
		const title = _g.SplitText.create(tg.querySelector(".title"), { type: "words, chars" });
		const text = _g.SplitText.create(tg.querySelector(".text"), { type: "words, chars" });

		// titleアニメーション
		const tl = _g.gsap.timeline({
			scrollTrigger: {
				trigger: tg.querySelector(".title"),
				start: "top 80%",
				onEnter: () => tl.play(),
				onEnterBack: () => tl.play(),
				onLeave: () => {
					// 下に抜けるときは何もしない
					
				},
				toggleClass: {
					targets: tg,
					className: "is-active"
				},
				onLeaveBack: () => {
					// 上に戻るときはリバース
					tl.reverse();
				}
			},
			paused: true
		});

		tl.from(title.chars, {
			duration: 0.4, 
			y: 20,
			autoAlpha: 0,
			stagger: 0.05
		})
		.from(text.chars, {
			duration: 0.3, 
			y: 5,
			autoAlpha: 0,
			stagger: 0.02
		}, "-=0.15"); // 少し重ねて開始
	});

	
}

// ここから外部用エクスポート
export { init };
