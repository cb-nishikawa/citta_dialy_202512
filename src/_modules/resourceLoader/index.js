// resourceLoaderクラスを外部化したにゃー
import { classController } from "../classController/";
import { resourceWatcher } from "./resourceWatcher.js";

class resourceLoader {
    constructor(options = {}) {
        this.loadFocus = options.loadFocus || document;
        this.LOADING_CLASS = "is-loading";
        this.START_CLASS = "is-loading_start";
        this.FINISH_CLASS = "is-loading_finish";
        this.classCtrl = new classController(["[data-loaderClassCtr]"]);
        this.onInit = options.onInit || function() {};
        this.onStart = options.onStart || function() {};
        this.onProgress = options.onProgress || function() {};
        this.onFinish = options.onFinish || function() {};
        this.onSkip = options.onSkip || function() {};
        this.onWatcherProgress = options.onWatcherProgress || function() {};
    }

    init(options = {}) {
        if (typeof options.loadFocus !== "undefined") {
            this.loadFocus = options.loadFocus;
        }
        // classCtrlのターゲットを上書きできるように
        if (typeof options.classCtrlTargets !== "undefined") {
            // メモリ解放
            if (this.classCtrl) {
                this.classCtrl.release();
                this.classCtrl = null;
                delete this.classCtrl;
            }
            this.classCtrlTargets = options.classCtrlTargets;
            this.classCtrl = new classController(this.classCtrlTargets);
        }
        if (typeof options.setOnInit === "function") this.onInit = options.setOnInit;
        if (typeof options.setOnStart === "function") this.onStart = options.setOnStart;
        if (typeof options.setOnProgress === "function") this.onProgress = options.setOnProgress;
        if (typeof options.setOnFinish === "function") this.onFinish = options.setOnFinish;
        if (typeof options.setOnSkip === "function") this.onSkip = options.setOnSkip;
        if (typeof options.setOnWatcherProgress === "function") this.onWatcherProgress = options.setOnWatcherProgress;

        this.onInit();

        document.addEventListener("loadingResources:start", (e) => {
            this.classCtrl.add([this.LOADING_CLASS, this.START_CLASS]);
            if (typeof this.onStart === "function") this.onStart(e);
        });

        document.addEventListener("loadingResources:progress", (e) => {
            this.onProgress(e);
        });

        document.addEventListener("loadingResources:finish", (e) => {
            this.classCtrl.remove(this.LOADING_CLASS);
            this.classCtrl.add(this.FINISH_CLASS);
            this.onFinish(e);
        });

        document.addEventListener("loadingResources:skip", (e) => {
            this.onSkip(e);
        });

        resourceWatcher(this.loadFocus, {
            onProgress: (state) => {
                this.onWatcherProgress(state);
            },
        });
    }

    setLoadFocus(newFocus) {
        this.loadFocus = newFocus;
    }

    setOnInit(fn) { this.onInit = fn; }
    setOnStart(fn) { this.onStart = fn; }
    setOnProgress(fn) { this.onProgress = fn; }
    setOnFinish(fn) { this.onFinish = fn; }
    setOnSkip(fn) { this.onSkip = fn; }
    setOnWatcherProgress(fn) { this.onWatcherProgress = fn; }

    release() {
        this.classCtrl.release();
        this.classCtrl = null;
        delete this.classCtrl;
    }
}

export { resourceLoader };
