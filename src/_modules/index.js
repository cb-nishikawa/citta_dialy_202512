import { debugSet } from "./debugSet/";
import { gsap } from "gsap";
import Lenis from '@studio-freight/lenis'
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { resourceLoader } from "./resourceLoader/";
import { observeClassChange } from "./observeClassChange/";
import { classController } from "./classController/";

const console = true;

gsap.registerPlugin(ScrollTrigger);

// ここからグローバルセットの生成
function globalSet() {
    return {
        debug: debugSet(),
        console: console,
        gsap: gsap,
        Lenis: Lenis,
        resourceLoader: resourceLoader,
        classController: classController,
        observeClassChange: observeClassChange,
        // 他のグローバル機能もここに追加できる
    };
}

// ここから外部用エクスポート
export { globalSet as _g };