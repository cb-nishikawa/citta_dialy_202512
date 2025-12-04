import { _g as globalSet } from "../../_modules/";
const _g = globalSet();
_g.console = true; // コンソールログ有効化

import { _commonInit } from "../../_components/_common/";
import { _layoutInit } from "../../_components/_layout/";
import { _topInit } from "../../_components/_top/";


_commonInit(_g);
_layoutInit(_g);
_topInit(_g);
