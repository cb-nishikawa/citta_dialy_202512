import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import keenslider from "keen-slider";

import { debugSet } from "./_debugSet/";
import { resourceLoader } from "./_resourceLoader/";
import { observeClassChange } from "./_observeClassChange/";
import { classController } from "./_classController/";
import { smoothScroll } from "./_smoothScroll/";

const console = true;

gsap.registerPlugin(ScrollTrigger);

// ここからグローバルセットの生成
function globalSet() {
    return {
        gsap: gsap,
        debug: debugSet(),
        keenslider: keenslider,
        resourceLoader: resourceLoader,
        classController: classController,
        observeClassChange: observeClassChange,
        smoothScroll: smoothScroll,
        
        console: console,
    };
}

// ここから外部用エクスポート
export { globalSet as _g };