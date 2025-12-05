/**
 * @example
 * // ターゲット要素のセレクターを指定
 * const ctrl = new classController(["#myDiv", ".myClass", "[data-custom]"]); 
 * ctrl.add("active");          // クラス追加
 * ctrl.add("active, show");    // 複数クラス追加
 * ctrl.toggle("active");       // クラス付与/削除切替
 * ctrl.order(["first", "second", "third"]); // 指定クラスのみを順番に付与
 * ctrl.remove("active");       // クラス削除
 * ctrl.release();              // メモリ解放
 */

class classController {
    /**
     * 指定したクラス配列で順番に切り替える（1つだけ付与、他は消す）
     * @param {string[]|Set<string>} classes - 付与するクラス名の配列またはSet
     */
    order(classes) {
        const classList = Array.isArray(classes)
            ? classes
            : (classes instanceof Set ? Array.from(classes) : [classes]);
        // 初回のみ、現在のクラスを判定してインデックスをセット
        if (typeof this._orderIndex !== 'number') {
            let foundIndex = -1;
            if (this.targets.length > 0) {
                const target = this.targets[0];
                for (let i = 0; i < classList.length; i++) {
                    if (target.classList.contains(classList[i])) {
                        foundIndex = i;
                        break;
                    }
                }
            }
            this._orderIndex = foundIndex >= 0 ? (foundIndex + 1) % classList.length : 0;
        }
        const currentClass = classList[this._orderIndex % classList.length];
        this.targets.forEach(target => {
            // すべての指定クラスを一度消す
            classList.forEach(cls => {
                if (cls && typeof cls === 'string') {
                    target.classList.remove(cls);
                }
            });
            // 現在のクラスだけ付与
            if (currentClass && typeof currentClass === 'string') {
                target.classList.add(currentClass);
            }
        });
        // 次回呼び出し時に次のクラスへ
        this._orderIndex = (this._orderIndex + 1) % classList.length;
    }
    constructor(selectors) {
        this.targets = [];
        selectors.forEach(sel => {
            if (typeof sel === "string") {
                if (sel.startsWith("#")) {
                    const el = document.getElementById(sel.slice(1));
                    if (el) this.targets.push(el);
                } else if (sel.startsWith(".")) {
                    const els = document.querySelectorAll(sel);
                    els.forEach(el => this.targets.push(el));
                } else if (sel.startsWith("[data-")) {
                    const els = document.querySelectorAll(sel);
                    els.forEach(el => this.targets.push(el));
                } else {
                    const el = document.getElementById(sel);
                    if (el) this.targets.push(el);
                }
            } else if (sel instanceof HTMLElement) {
                this.targets.push(sel);
            }
        });
    }

    add(classes) {
        const classList = Array.isArray(classes) ? classes : [classes];
        this.targets.forEach(target => {
            classList.forEach(cls => target.classList.add(cls));
        });
    }

    remove(classes) {
        const classList = Array.isArray(classes) ? classes : [classes];
        this.targets.forEach(target => {
            classList.forEach(cls => target.classList.remove(cls));
        });
    }

    toggle(classes) {
        const classList = Array.isArray(classes) ? classes : [classes];
        this.targets.forEach(target => {
            classList.forEach(cls => target.classList.toggle(cls));
        });
    }

    release() {
        this.targets = null;
    }


}

export { classController };