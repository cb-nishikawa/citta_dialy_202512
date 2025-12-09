"use strict";

import Lenis from '@studio-freight/lenis'

export function inertialScroll(gsap) {
	const lenis = new Lenis({
		// duration: 1.2,         // スクロールアニメーションの持続時間（秒）
		// easing: (t) => t,      // イージング関数
		smooth: true,          // スムーススクロール有効
		// direction: 'vertical', // 'vertical' or 'horizontal'
		// gestureDirection: 'vertical', // ジェスチャー方向
		// mouseMultiplier: 1,    // マウスホイールの感度
		// touchMultiplier: 2,    // タッチスクロールの感度
		// wheelMultiplier: 1,    // ホイールスクロールの感度
		// infinite: false,       // 無限スクロール
		// lerp: 0.1,             // 補間係数（0〜1）
		// syncTouch: false,      // タッチイベントの同期
		// syncTouchLerp: 0.1,    // タッチ同期時の補間係数
		// autoResize: true,      // リサイズ時の自動調整
		// wrapper: window,       // スクロール対象
		// content: document.documentElement // スクロールするコンテンツ
	})

	gsap.ticker.add((time) => {
		lenis.raf(time * 1000);
	});

	gsap.ticker.lagSmoothing(0);
}
