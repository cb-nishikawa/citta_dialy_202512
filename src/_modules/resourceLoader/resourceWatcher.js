// リソース読み込み監視ライブラリ（ESM）
// - 関数化し、引数/戻り値を明確化
// - メモリは後片付けで解放（参照を null 化）

"use strict";

// 定数
const RE_BG_URL = /url\(("|'|)(.*?)\1\)/g; // background-imageのurl(...)抽出用
const EVENT_START = "loadingResources:start"; // 開始イベント名
const EVENT_PROGRESS = "loadingResources:progress"; // 進捗イベント名
const EVENT_FINISH = "loadingResources:finish"; // 完了イベント名
const EVENT_SKIP = "loadingResources:skip"; // スキップイベント名
const DEFAULT_OPTIONS = Object.freeze({
	// 背景画像も対象にするか
	includeBackground: true,
	// タイムアウト(ms)
	timeoutMs: 10000,
	// 進捗コールバック
	onProgress: null,
});


// すぐ使える初期化（自動実行ユーティリティ）
// 引数: root Document | HTMLElement（監視ルート）
// 引数: options { includeBackground?: boolean, timeoutMs?: number, onProgress?: (state: {loaded:number,total:number,errors:number,item?:any})=>void }
// 戻り値: Promise<{loaded:number,total:number,errors:number,timedOut:boolean}>
export function resourceWatcher(root, options) {
	// ここからwaitForResourcesを呼ぶだけの薄いユーティリティ
	return waitForResources(root || document, options);
}


// DOM内のリソース読み込みを監視する
// 引数: root Document | HTMLElement（監視範囲のルート）
// 引数: options { includeBackground?: boolean, timeoutMs?: number, onProgress?: (state: {loaded:number,total:number,errors:number,item?:any})=>void }
// 戻り値: Promise<{loaded:number,total:number,errors:number,timedOut:boolean}>
export function waitForResources(root, options) {
	// ここからオプション統合（デフォルト + ユーザ指定）
	const opt = Object.assign({}, DEFAULT_OPTIONS, options || {});
	// ここから監視スコープの決定（Document or 任意の要素）
	const scope = root && (root).querySelectorAll ? (root) : document;
	// 型: HTMLImageElement[]
	const imgEls = Array.from(scope.querySelectorAll("img")); // ここで全<img>を収集する


	// includeBackgroundがtrueなら全要素から背景画像URLも収集
	let bgUrls = []; // 型: string[]
	if (opt.includeBackground) {
		const allEls = Array.from(scope.querySelectorAll("*")); // ここから全要素を走査してbackground-imageのURLを集める処理
		for (const el of allEls) {
			const urls = getBackgroundImageUrls((el));
			if (urls.length) bgUrls.push(...urls);
		}
		bgUrls = Array.from(new Set(bgUrls)); // ここで重複URLを排除して無駄なロードを避ける
	}

	
	// ここから<img>と背景URLそれぞれのローダーを作成する処理(非同期読み込み開始)
	const loaders = [
		...imgEls.map((el) => createImageLoader(el)),
		...bgUrls.map((u) => createImageLoader(u)),
	];


	// 合計件数
	const total = loaders.length || 0;
	let loaded = 0;
	let errors = 0;
	let settled = false;

	// ここから既に読み込み済みのものを先にカウントする処理
	for (const l of loaders) {
		if (l.isComplete()) loaded++;
	}

	// 監視開始イベントを発火
	const startDetail = { loaded, total, errors, timedOut: false };
	const evStart = new CustomEvent(EVENT_START, { detail: startDetail });

	if (total > 0) {
		document.dispatchEvent(evStart);
	}

	emitProgress(null);

	// 画像読み込み完了を待つPromiseを返す
	return new Promise((resolve) => {
		
		// 監視対象が無い/全て既に読み込み済みの場合の即時完了処理
		if (loaded >= total) {
			// ここから即時完了（監視対象が無い/全て既に読み込み済み）の処理
			settled = true;
			const result = { loaded, total, errors, timedOut: false };
			const ev = new CustomEvent(EVENT_SKIP, { detail: result });
			document.dispatchEvent(ev);
			resolve(result); // 即時解決

			for (const l of loaders) l.dispose(); // リソース解放
			return;
		}


		// ここからload/errorのイベントハンドラ生成処理
		const onLoad = (l) => () => {
			if (settled) return;
			loaded++;
			emitProgress(l);
			if (loaded + errors >= total) finish(false);
		};
		const onError = (l) => () => {
			if (settled) return;
			errors++;
			emitProgress(l);
			if (loaded + errors >= total) finish(false);
		};
		// ここから各ローダーにイベントリスナをセットする処理
		for (const l of loaders) {
			if (!l.el) continue;
			if (!l.isComplete()) {
				l.el.addEventListener("load", onLoad(l), { once: true });
				l.el.addEventListener("error", onError(l), { once: true });
			}
		}


		// ここからタイムアウト監視の設定（timeoutMsが0以下なら無効）
		const timeout = Math.max(0, Number(opt.timeoutMs) || 0);
		let timerId = null;
		if (timeout > 0) {
			timerId = setTimeout(() => finish(true), timeout);
		}
		// ここからwindow.loadを保険として利用し、取りこぼしを防ぐ
		window.addEventListener(
			"load",
			() => {
				if (!settled) finish(false);
				if (timerId) clearTimeout(timerId);
				timerId = null; // 解放
			},
			{ once: true }
		);


		function finish(timedOut) {
			// ここから監視完了時の後処理（イベント通知・リソース解放）
			if (settled) return;
			settled = true;
			const result = { loaded, total, errors, timedOut: !!timedOut };
			const ev = new CustomEvent(EVENT_FINISH, { detail: result });
			document.dispatchEvent(ev);
			resolve(result); // 即時解決

			for (const l of loaders) l.dispose(); // リソース解放
		}
	});


	function emitProgress(item) {
		// ここから進捗をコールバックとカスタムイベントで通知する処理
		const detail = { loaded, total, errors, item };
		if (typeof opt.onProgress === "function") opt.onProgress(detail);
		const ev = new CustomEvent(EVENT_PROGRESS, { detail });
		document.dispatchEvent(ev);
	}
}






// 背景画像URLを computedStyle から抽出する
// 引数: el HTMLElement（対象要素）
// 戻り値: string[] の URL 配列
export function getBackgroundImageUrls(el) {
	// 型: string[]
	const urls = [];
	// ここからcomputed styleの取得処理
	const style = window.getComputedStyle(el);
	const bg = style.backgroundImage;
	if (bg && bg !== "none") {
		// ここからbackground-image内のurl("...") を抽出する処理
		let m;
		while ((m = RE_BG_URL.exec(bg)) !== null) {
			// マッチの2番目のキャプチャが実URL
			if (m[2]) urls.push(m[2]);
		}
	}
	return urls;
}




// 監視対象の画像ローダーを作成（<img> または URL）する
// 引数: target HTMLImageElement | string（img要素 または 画像URL）
// 戻り値: { el: HTMLImageElement|null, url: string|null, dispose: ()=>void, isComplete: ()=>boolean }
export function createImageLoader(target) {
	let imgEl = null;	// 型: HTMLImageElement|null
	let url = null;		// 型: string|null
	let owned = false;	// 自前で作成したImageかどうか

	if (typeof target === "string") {
		// ここからURLを直接読み込むImageオブジェクトを生成する処理
		url = target;
		imgEl = new Image();
		owned = true;
		imgEl.decoding = "async";
		imgEl.loading = "eager";
		imgEl.crossOrigin = "anonymous"; // 必要に応じてCORSを調整する
		imgEl.src = url;
	} else {
		// ここから既存<img>要素を対象にする処理
		imgEl = target;
		url = imgEl && typeof imgEl.src === "string" ? imgEl.src : null;
	}

	// 後片付けする
	function dispose() {
		// ここからイベントハンドラを解除して参照を切る処理
		if (!imgEl) return;
		imgEl.onload = null;
		imgEl.onerror = null;
		if (owned) {
			imgEl.src = "";
		}
		imgEl = null; // 参照解放
		url = null;
	}

	// 完了判定する
	function isComplete() {
		// naturalWidth>0 でエラー画像を除外、completeで読み込み済みを判定する
		return !!imgEl && imgEl.complete && imgEl.naturalWidth > 0;
	}

	return { el: imgEl, url, dispose, isComplete };
}










