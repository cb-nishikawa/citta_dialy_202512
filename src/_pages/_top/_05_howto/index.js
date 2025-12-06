

function init(_g) {
	const target = document.querySelector("[data-target='topHowto01']");

	if (!target) return;
	if (_g.console) console.log("___05_howto loaded");

	// keen-sliderの初期化前にスライドを複製
	const slider = target.querySelector('.keen-slider');
	if (slider) {
		const slides = slider.querySelectorAll('.keen-slider__slide');
		const slideCount = slides.length;

		if (slideCount > 1) {
			// 最初と最後の3つずつを複製
			const first = slides[0];
			const second = slides[1];
			const third = slides[2];
			const last = slides[slideCount - 1];
			const secondLast = slides[slideCount - 2];
			const thirdLast = slides[slideCount - 3];

			const firstClone = first.cloneNode(true);
			const secondClone = second.cloneNode(true);
			const thirdClone = third.cloneNode(true);
			const lastClone = last.cloneNode(true);
			const secondLastClone = secondLast.cloneNode(true);
			const thirdLastClone = thirdLast.cloneNode(true);

			slider.insertBefore(thirdLastClone, first);
			slider.insertBefore(secondLastClone, first);
			slider.insertBefore(lastClone, first);
			slider.appendChild(firstClone);
			slider.appendChild(secondClone);
			slider.appendChild(thirdClone);

			// 3つ目のスライド（元4番目）を初期表示に
			slider.scrollLeft = first.offsetWidth * 3;

			// keen-sliderのイベントでループ時の位置を初期化
			let sliderInstance = null;
			const clones = 3;

			sliderInstance = new _g.keenslider(slider, {
				loop: true,
				mode: 'snap',
				created(s) {
					if (_g.console) console.log("keen-slider 初期化完了");
					s.moveToIdx(clones, 0, { duration: 0 });
				},
				slideChanged(s) {
					// スライドアニメーションが終わってから実行
					setTimeout(() => {
						const totalSlides = slideCount;
						const rel = s.track.details.rel;

						// 現在のスライド番号を表示
						let realIndex = rel - clones;
						if (realIndex < 0) {
							realIndex += totalSlides;
						} else if (realIndex >= totalSlides) {
							realIndex -= totalSlides;
						}

						if (realIndex == 0) {
							console.log("初期化へ戻る");
							s.moveToIdx(clones, 0, { duration: 0 });
						} else if (realIndex == totalSlides - 1) {
							console.log("最後のスライドから戻る");
							s.moveToIdx(totalSlides - 1 + clones, 0, { duration: 0 });
						}
					}, s.options.duration || 300); // keen-sliderのdurationに合わせて調整
				},
			});
		}

	}
}

// ここから外部用エクスポート
export { init };