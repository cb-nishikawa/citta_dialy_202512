
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";

import keenslider from "keen-slider";

import { debugSet } from "./_debugSet/";
import { resourceLoader } from "./_resourceLoader/";
import { observeClassChange } from "./_observeClassChange/";
import { classController } from "./_classController/";
import { inertialScroll } from "./_inertialScroll/";
import { asynchronousTransition } from "./_asynchronousTransition/";

const console = true;

gsap.registerPlugin(ScrollTrigger);
gsap.registerPlugin(SplitText);

// ここからグローバルセットの生成
function globalSet() {
    return {
        gsap: gsap,
        ScrollTrigger: ScrollTrigger,
        SplitText: SplitText,
        debug: debugSet(),
        keenslider: keenslider,
        resourceLoader: resourceLoader,
        classController: classController,
        observeClassChange: observeClassChange,
        inertialScroll: inertialScroll,
        asynchronousTransition: asynchronousTransition,
        console: console,
    };
}

// ここから外部用エクスポート
export { globalSet as _g };