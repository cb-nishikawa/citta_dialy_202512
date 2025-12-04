// デバッグ用FPS表示＆ログ出力セット関数にゃー

/**
 * @example
 */


export function debugSet() {
    let lastTime = performance.now();
    let frameCount = 0;
    let fps = 0;
    let animationFrameId = null;
    let enabled = true; // デフォルトは非表示

    // 表示制御用の変数
    let showMode = "none"; // "key"=キーで表示, "always"=常時表示, "none"=非表示
    let triggerKey = { meta: true, shift: true }; // コマンド＋シフト

    const MAIN_TARGET = document.getElementById("debugAreaTarget");
    if (!MAIN_TARGET) return;

    const FPS_TARGET = document.getElementById("debugArea_fps");
    const LOG_TARGET = document.getElementById("debugArea_log");
    const LOCAL_STORAGE_TARGET = document.getElementById("debugArea_localStorage");
    if (!FPS_TARGET || !LOG_TARGET) return;

    // ここからログ出力処理
    function log(text, toConsole = false) {
        if (!enabled) return; // 有効でなければ何もしない
        const logLine = document.createElement("div");
        const now = new Date();
        const pad = n => n.toString().padStart(2, '0');
        const timestamp = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}.${now.getMilliseconds().toString().padStart(3, '0')}`;
        logLine.textContent = `[${timestamp}] ` + (typeof text === "object" ? JSON.stringify(text) : String(text));
        LOG_TARGET.appendChild(logLine);
        // 最大50行まで表示
        while (LOG_TARGET.childNodes.length > 50) {
            LOG_TARGET.removeChild(LOG_TARGET.firstChild);
        }
        if (toConsole) {
            console.log(`[${timestamp}]`, text);
        }
    }

    function updateFps() {
        frameCount++;
        const now = performance.now();
        const delta = now - lastTime;
        if (delta >= 1000) {
            fps = Math.round((frameCount * 1000) / delta);
            FPS_TARGET.textContent = `${fps}`;
            frameCount = 0;
            lastTime = now;
        }
        animationFrameId = requestAnimationFrame(updateFps);
    }
    updateFps();

    function updateDisplay() {
        if (showMode === "always") {
            MAIN_TARGET.classList.add("is-active");
        } else if (showMode === "none") {
            MAIN_TARGET.classList.remove("is-active");
        }
        // "key"はキーイベントで制御
    }

    function onKeyDown(e) {
        if (showMode !== "key") return;
        if (triggerKey.meta && !e.metaKey) return;
        if (triggerKey.shift && !e.shiftKey) return;
        MAIN_TARGET.classList.add("is-active");
    }
    function onKeyUp(e) {
        if (showMode !== "key") return;
        if (!e.metaKey || !e.shiftKey) {
            MAIN_TARGET.classList.remove("is-active");
        }
    }
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);

    // localStorageの内容をコピーする変数
    const localStoreObj = {};
    for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        localStoreObj[key] = localStorage.getItem(key);
    }

    // Proxyで監視
    const localStrageProxy = new Proxy(localStoreObj, {
        set(target, prop, value) {
            target[prop] = value;
            localStorage.setItem(prop, value);
            showLocalStorage();
            return true;
        },
        deleteProperty(target, prop) {
            delete target[prop];
            localStorage.removeItem(prop);
            showLocalStorage();
            return true;
        }
    });

    // localStrage管理用のAPI
    const localStrage = {
        add(key, value) {
            localStrageProxy[key] = value;
        },
        get(key) {
            return localStrageProxy[key];
        },
        remove(key) {
            delete localStrageProxy[key];
        },
        getAll() {
            return { ...localStrageProxy };
        }
    };

    // localStorage内容表示機能にゃー
    function showLocalStorage() {
        if (!LOCAL_STORAGE_TARGET) return;
        LOCAL_STORAGE_TARGET.innerHTML = "";
        for (let key in localStrageProxy) {
            const p = document.createElement("p");
            p.textContent = `${key}: ${localStrageProxy[key]}`;
            LOCAL_STORAGE_TARGET.appendChild(p);
        }
    }

    showLocalStorage();

    // ここから外部用エクスポート
    return {
        log,
        showLocalStorage,
        localStrage,
        get enabled() { return enabled; },
        set enabled(val) { enabled = !!val; },
        get showMode() { return showMode; },
        set showMode(val) {
            showMode = val;
            updateDisplay();
        },
        setTriggerKey: function(opt) {
            triggerKey.meta = !!opt.meta;
            triggerKey.shift = !!opt.shift;
            // 他のキーも追加可能
        },
        release: function() {
            cancelAnimationFrame(animationFrameId);
            window.removeEventListener("keydown", onKeyDown);
            window.removeEventListener("keyup", onKeyUp);
            animationFrameId = null;
        }
    };
}
