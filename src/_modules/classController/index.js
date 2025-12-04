/**
 * @example
 * // ターゲット要素のセレクターを指定
 * const ctrl = new classController(["#myDiv", ".myClass", "[data-custom]"]); 
 * ctrl.add("active");          // クラス追加
 * ctrl.add("active, show");    // 複数クラス追加
 * ctrl.remove("active");       // クラス削除
 * ctrl.release();              // メモリ解放
 */

class classController {
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