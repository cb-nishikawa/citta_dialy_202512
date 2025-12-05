import { _g as globalSet } from "../../_modules/";
const _g = globalSet();
_g.console = true; // コンソールログ有効化

import { init as _componentsInit } from "../../_components/";
import { init as _pagesInit } from "../../_pages/";

_componentsInit(_g);
_pagesInit(_g);