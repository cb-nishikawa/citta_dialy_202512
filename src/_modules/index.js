import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import keenslider from "keen-slider";

import Lenis from '@studio-freight/lenis'

import { debugSet } from "./_debugSet/";
import { resourceLoader } from "./_resourceLoader/";
import { observeClassChange } from "./_observeClassChange/";
import { classController } from "./_classController/";

const console = true;

gsap.registerPlugin(ScrollTrigger);

// ここからグローバルセットの生成
function globalSet() {
    return {
        gsap: gsap,
        Lenis: Lenis,

        debug: debugSet(),
        keenslider: keenslider,
        resourceLoader: resourceLoader,
        classController: classController,
        observeClassChange: observeClassChange,
        
        console: console,
    };
}

// ここから外部用エクスポート
export { globalSet as _g };