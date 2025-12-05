
import 'lazysizes';
import 'lazysizes/plugins/bgset/ls.bgset';

function init(_g) {
	if (_g.console) console.log("_image loaded");
	lazySizes.init(); 
}

export { init };
